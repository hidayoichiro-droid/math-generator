// worksheet.js

const OP_CLASS = {addition:'op-addition',subtraction:'op-subtraction',multiplication:'op-multiplication',division:'op-division',written:'op-written'};
const OP_LABELS_WS = {addition:'たしざん',subtraction:'ひきざん',multiplication:'かけざん',division:'わりざん',written:'ひっさん'};
const OP_SYMBOLS_WS = {addition:'＋',subtraction:'－',multiplication:'×',division:'÷',written:'＋'};
const CIRCLES = ['①','②','③','④','⑤','⑥','⑦','⑧'];
const MUSHIKUI_BADGES = {
  easy:   { label:'虫食い（優）', color:'#16a34a' },
  normal: { label:'虫食い（普）', color:'#d97706' },
  hard:   { label:'虫食い（難）', color:'#dc2626' }
};

let worksheetData = null;
const ANSWER_MODE = new URLSearchParams(location.search).get('answers') === '1';

document.addEventListener('DOMContentLoaded', () => {
  try {
    const raw = localStorage.getItem('math_gen_worksheet');
    if (raw) { worksheetData = JSON.parse(raw); render(worksheetData); }
    else showError('問題データがありません。設定画面から「作成」を押してください。');
  } catch (e) { showError('データ読み込み失敗'); }

  // モードに応じてツールバー表示を更新
  document.body.classList.toggle('answer-mode', ANSWER_MODE);
  document.getElementById('toolbar-title').textContent = ANSWER_MODE ? '答え版プレビュー' : '問題用紙プレビュー';
  const btnMode = document.getElementById('btn-toggle-mode');
  btnMode.textContent = ANSWER_MODE ? '❓ 問題版' : '📝 答え版';
  btnMode.addEventListener('click', () => {
    location.href = ANSWER_MODE ? 'worksheet.html' : 'worksheet.html?answers=1';
  });

  document.getElementById('btn-print').addEventListener('click', () => window.print());
  document.getElementById('btn-save').addEventListener('click', saveAsHTML);
  document.getElementById('btn-regen').addEventListener('click', () => {
    if (!worksheetData?.settings) return;
    worksheetData.daions = generateAllProblems(worksheetData.settings.daionList);
    localStorage.setItem('math_gen_worksheet', JSON.stringify(worksheetData));
    render(worksheetData);
  });
  document.getElementById('btn-back').addEventListener('click', () => history.back());
  if (new URLSearchParams(location.search).get('save')==='1') setTimeout(saveAsHTML, 800);
});

function render(data) {
  const html = buildPageHTML(data);
  document.getElementById('a4-page').innerHTML = html;
  document.getElementById('print-page').innerHTML = `<div class="a4-page">${html}</div>`;
  document.title = buildTitle(data.settings);
  fitA4();
}

function fitA4() {
  const page = document.getElementById('a4-page');
  if (!page) return;
  page.style.zoom = '';
  const naturalW = page.offsetWidth || 794;
  const vw = window.innerWidth || document.documentElement.clientWidth;
  if (vw < naturalW + 16) {
    page.style.zoom = ((vw - 8) / naturalW).toFixed(4);
  }
}
window.addEventListener('resize', fitA4);
window.addEventListener('orientationchange', () => setTimeout(fitA4, 350));

function buildTitle(s) {
  const m=s.headerMonth||'__', d=s.headerDay||'__';
  const suffix = ANSWER_MODE ? '【答え】' : '';
  return `算数問題用紙${suffix} ${m}月${d}日${s.headerWeekday?`(${s.headerWeekday})`:''}`;
}

function buildPageHTML(data) {
  const s=data.settings;
  const m=s.headerMonth||'&emsp;', d=s.headerDay||'&emsp;';
  const w=s.headerWeekday?`（${s.headerWeekday}）`:'（&emsp;&emsp;）';
  const nl=s.headerNameLabel||'なまえ';
  let html=`
    <div class="ws-header">
      <div class="ws-date">${m}月&nbsp;${d}日&nbsp;${w}</div>
      <div class="ws-name-area"><span class="ws-name-label">${nl}</span><span class="ws-name-box"></span></div>
      <div class="ws-score-area"><span class="ws-score-box"></span><span class="ws-score-unit">てん</span></div>
    </div>`;
  data.daions.forEach((daion,i)=>{ html+=buildDaionSection(daion,i); });
  return html;
}

function getGridConfig(count, maxDigit, isWritten) {
  if (isWritten) {
    if (count<=2) return {cols:count, fontSize:'21pt'};
    if (count<=6) return {cols:3,     fontSize:'21pt'};
    if (count<=9) return {cols:3,     fontSize:'17pt'};
    return               {cols:3,     fontSize:'14pt'};
  }
  // 通常問題: 桁数に応じて列数を決定（4桁以上は2列）
  let cols;
  if (count <= 2) cols = count;
  else if (maxDigit >= 4) cols = 2;
  else cols = 3;

  // フォントサイズと答え欄幅（桁数で固定値を採用）
  let fontSize, answerWidth;
  if (maxDigit >= 4) {
    // 4桁以上: 2列レイアウト
    if      (count <= 4)  fontSize = '18pt';
    else if (count <= 8)  fontSize = '16pt';
    else if (count <= 12) fontSize = '14pt';
    else                  fontSize = '12pt';
    answerWidth = '95px';   // 4桁書ける幅
  } else if (maxDigit === 3) {
    // 3桁: 3列レイアウト
    if      (count <= 3)  fontSize = '19pt';
    else if (count <= 6)  fontSize = '16pt';
    else if (count <= 9)  fontSize = '14pt';
    else if (count <= 15) fontSize = '12pt';
    else                  fontSize = '11pt';
    answerWidth = '75px';   // 3桁書ける幅
  } else {
    // 1〜2桁: 3列レイアウト
    if      (count <= 3)  fontSize = '21pt';
    else if (count <= 6)  fontSize = '19pt';
    else if (count <= 9)  fontSize = '17pt';
    else if (count <= 15) fontSize = '15pt';
    else                  fontSize = '13pt';
    answerWidth = '78px';
  }
  return {cols, fontSize, answerWidth};
}

function numHTML(num, hiddenPos) {
  const str = String(num);
  if (!hiddenPos || hiddenPos.length === 0) return str;
  if (ANSWER_MODE) {
    // 答え版: 隠した桁は赤字で表示
    return str.split('').map((ch, i) =>
      hiddenPos.includes(i) ? `<span class="answer-filled">${ch}</span>` : ch
    ).join('');
  }
  return str.split('').map((ch, i) =>
    hiddenPos.includes(i) ? '<span class="mushikui-box"></span>' : ch
  ).join('');
}

function buildDaionSection(daion, idx) {
  const opClass  = OP_CLASS[daion.operation]||'op-addition';
  const label    = OP_LABELS_WS[daion.operation]||daion.operation;
  const circNum  = CIRCLES[idx]||`(${idx+1})`;
  const maxDigit = Array.isArray(daion.digits)?Math.max(...daion.digits):(daion.digits||2);
  const isWritten= daion.operation==='written';
  const cfg      = getGridConfig(daion.problems.length, maxDigit, isWritten);
  const lvl      = daion.mushikuiLevel;
  const badge    = lvl && lvl!=='off' && MUSHIKUI_BADGES[lvl]
    ? `<span class="mushikui-badge" style="background:${MUSHIKUI_BADGES[lvl].color}">🐛 ${MUSHIKUI_BADGES[lvl].label}</span>`
    : '';
  const html = isWritten ? buildWrittenGrid(daion.problems, cfg) : buildNormalGrid(daion.problems, cfg);
  return `<div class="daion-section ${opClass}">
    <div class="daion-heading"><div class="daion-num-circle">${circNum}</div><div class="daion-title-text">${label}</div>${badge}</div>
    ${html}</div>`;
}

function buildNormalGrid(problems, cfg) {
  const style = `grid-template-columns:repeat(${cfg.cols},1fr);font-size:${cfg.fontSize};`;
  const cells = problems.map((p, i) => {
    const sym = OP_SYMBOLS_WS[p.operation]||'＋';
    const isMu = p.mushikuiLevel && p.mushikuiLevel !== 'off';
    if (isMu) {
      const aH = numHTML(p.a, p.aHidden);
      const bH = numHTML(p.b, p.bHidden);
      return `<div class="problem-cell">
        <span class="problem-num">(${i+1})</span>
        <span class="problem-expr">${aH}&nbsp;${sym}&nbsp;${bH}&nbsp;＝&nbsp;<span class="answer-shown">${p.answer}</span></span>
      </div>`;
    }
    // 通常問題（答え版なら赤字で答え表示）
    const answerHTML = ANSWER_MODE
      ? `<span class="answer-filled" style="min-width:${cfg.answerWidth||'56px'};display:inline-block;text-align:left">${p.answer}</span>`
      : `<span class="answer-blank" style="width:${cfg.answerWidth||'56px'}"></span>`;
    return `<div class="problem-cell">
      <span class="problem-num">(${i+1})</span>
      <span class="problem-expr">${p.a}&nbsp;${sym}&nbsp;${p.b}&nbsp;＝&nbsp;${answerHTML}</span>
    </div>`;
  }).join('');
  return `<div class="problems-grid" style="${style}">${cells}</div>`;
}

function buildWrittenGrid(problems, cfg) {
  const style = `grid-template-columns:repeat(${cfg.cols},1fr);font-size:${cfg.fontSize};`;
  const cells = problems.map((p, i) => {
    const sym = OP_SYMBOLS_WS[p.operation]||'＋';
    const isMu = p.mushikuiLevel && p.mushikuiLevel !== 'off';
    if (isMu) {
      const aH = numHTML(p.a, p.aHidden);
      const bH = numHTML(p.b, p.bHidden);
      return `<div class="written-cell">
        <span class="written-problem-num">(${i+1})</span>
        <div class="written-a">${aH}</div>
        <div class="written-op-row"><span class="written-symbol">${sym}</span><span class="written-b">${bH}</span></div>
        <div class="written-answer-space written-answer-shown">${p.answer}</div>
      </div>`;
    }
    // 通常筆算（答え版なら答えを赤字で表示）
    const answerHTML = ANSWER_MODE
      ? `<div class="written-answer-space written-answer-shown answer-filled">${p.answer}</div>`
      : `<div class="written-answer-space"></div>`;
    return `<div class="written-cell">
      <span class="written-problem-num">(${i+1})</span>
      <div class="written-a">${p.a}</div>
      <div class="written-op-row"><span class="written-symbol">${sym}</span><span class="written-b">${p.b}</span></div>
      ${answerHTML}
    </div>`;
  }).join('');
  return `<div class="written-grid" style="${style}">${cells}</div>`;
}

function showError(msg) {
  document.getElementById('a4-page').innerHTML = `<div style="padding:40px;text-align:center;color:#999;font-size:16px;">${msg}</div>`;
}

function saveAsHTML() {
  let css='';
  try{Array.from(document.styleSheets).forEach(s=>{try{Array.from(s.cssRules||[]).forEach(r=>{css+=r.cssText+'\n';});}catch(e){}});}catch(e){}
  const title = buildTitle(worksheetData.settings);
  const html = `<!DOCTYPE html><html lang="ja"><head><meta charset="UTF-8"><title>${title}</title>
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&display=swap" rel="stylesheet">
<style>*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}body{font-family:'Noto Sans JP',sans-serif;background:#fff}${css}
.a4-page{width:210mm;min-height:297mm;padding:13mm;margin:0 auto;background:#fff}
@media print{@page{size:A4 portrait;margin:13mm}}</style></head>
<body>${document.getElementById('print-page').innerHTML}</body></html>`;
  const a = Object.assign(document.createElement('a'), {
    href: URL.createObjectURL(new Blob([html],{type:'text/html;charset=utf-8'})),
    download: `${title.replace(/\s/g,'_')}.html`
  });
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
}
