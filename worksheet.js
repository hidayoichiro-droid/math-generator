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

document.addEventListener('DOMContentLoaded', () => {
  try {
    const raw = localStorage.getItem('math_gen_worksheet');
    if (raw) { worksheetData = JSON.parse(raw); render(worksheetData); }
    else showError('問題データがありません。設定画面から「作成」を押してください。');
  } catch(e) { showError('データ読み込み失敗'); }

  document.getElementById('btn-print').addEventListener('click', ()=>window.print());
  document.getElementById('btn-save').addEventListener('click', saveAsHTML);
  document.getElementById('btn-regen').addEventListener('click', () => {
    if (!worksheetData?.settings) return;
    worksheetData.daions = generateAllProblems(worksheetData.settings.daionList);
    localStorage.setItem('math_gen_worksheet', JSON.stringify(worksheetData));
    render(worksheetData);
  });
  document.getElementById('btn-back').addEventListener('click', ()=>history.back());
  if (new URLSearchParams(location.search).get('save')==='1') setTimeout(saveAsHTML, 800);
});

function render(data) {
  const html = buildPageHTML(data);
  document.getElementById('a4-page').innerHTML = html;
  document.getElementById('print-page').innerHTML = `<div class="a4-page">${html}</div>`;
  document.title = buildTitle(data.settings);
}

function buildTitle(s) {
  const m=s.headerMonth||'__', d=s.headerDay||'__';
  return `算数問題用紙 ${m}月${d}日${s.headerWeekday?`(${s.headerWeekday})`:''}`;
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
  const cols = count<=2 ? count : 3;
  let fontSize, answerWidth;
  if      (count<=3)  { fontSize=maxDigit>=3?'19pt':'21pt'; answerWidth='80px'; }
  else if (count<=6)  { fontSize=maxDigit>=3?'17pt':'19pt'; answerWidth=maxDigit>=3?'72px':'78px'; }
  else if (count<=9)  { fontSize=maxDigit>=4?'14pt':maxDigit>=3?'15pt':'17pt'; answerWidth='68px'; }
  else if (count<=15) { fontSize=maxDigit>=3?'13pt':'15pt'; answerWidth='62px'; }
  else                { fontSize='12pt'; answerWidth='56px'; }
  return {cols, fontSize, answerWidth};
}

/**
 * 数値をHTML文字列に変換。hiddenPos の桁を □ に置き換える
 */
function numHTML(num, hiddenPos) {
  const str = String(num);
  if (!hiddenPos || hiddenPos.length === 0) return str;
  return str.split('').map((ch, i) =>
    hiddenPos.includes(i) ? '<span class="mushikui-box">□</span>' : ch
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

  const html = isWritten
    ? buildWrittenGrid(daion.problems, cfg)
    : buildNormalGrid(daion.problems, cfg);

  return `<div class="daion-section ${opClass}">
    <div class="daion-heading">
      <div class="daion-num-circle">${circNum}</div>
      <div class="daion-title-text">${label}</div>
      ${badge}
    </div>
    ${html}
  </div>`;
}

function buildNormalGrid(problems, cfg) {
  const style = `grid-template-columns:repeat(${cfg.cols},1fr);font-size:${cfg.fontSize};`;
  const cells = problems.map((p, i) => {
    const sym = OP_SYMBOLS_WS[p.operation]||'＋';
    const isMushikui = p.mushikuiLevel && p.mushikuiLevel !== 'off';

    if (isMushikui) {
      const aHTML = numHTML(p.a, p.aHidden);
      const bHTML = numHTML(p.b, p.bHidden);
      return `<div class="problem-cell">
        <span class="problem-num">(${i+1})</span>
        <span class="problem-expr">${aHTML}&nbsp;${sym}&nbsp;${bHTML}&nbsp;＝&nbsp;<span class="answer-shown">${p.answer}</span></span>
      </div>`;
    }
    return `<div class="problem-cell">
      <span class="problem-num">(${i+1})</span>
      <span class="problem-expr">${p.a}&nbsp;${sym}&nbsp;${p.b}&nbsp;＝&nbsp;<span class="answer-blank" style="width:${cfg.answerWidth||'56px'}"></span></span>
    </div>`;
  }).join('');
  return `<div class="problems-grid" style="${style}">${cells}</div>`;
}

function buildWrittenGrid(problems, cfg) {
  const style = `grid-template-columns:repeat(${cfg.cols},1fr);font-size:${cfg.fontSize};`;
  const cells = problems.map((p, i) => {
    const sym = OP_SYMBOLS_WS[p.operation]||'＋';
    const isMushikui = p.mushikuiLevel && p.mushikuiLevel !== 'off';

    if (isMushikui) {
      const aHTML = numHTML(p.a, p.aHidden);
      const bHTML = numHTML(p.b, p.bHidden);
      return `<div class="written-cell">
        <span class="written-problem-num">(${i+1})</span>
        <div class="written-a">${aHTML}</div>
        <div class="written-op-row">
          <span class="written-symbol">${sym}</span>
          <span class="written-b">${bHTML}</span>
        </div>
        <div class="written-answer-space written-answer-shown">${p.answer}</div>
      </div>`;
    }
    return `<div class="written-cell">
      <span class="written-problem-num">(${i+1})</span>
      <div class="written-a">${p.a}</div>
      <div class="written-op-row">
        <span class="written-symbol">${sym}</span>
        <span class="written-b">${p.b}</span>
      </div>
      <div class="written-answer-space"></div>
    </div>`;
  }).join('');
  return `<div class="written-grid" style="${style}">${cells}</div>`;
}

function showError(msg) {
  document.getElementById('a4-page').innerHTML=`<div style="padding:40px;text-align:center;color:#999;font-size:16px;">${msg}</div>`;
}

function saveAsHTML() {
  let css='';
  try{Array.from(document.styleSheets).forEach(s=>{try{Array.from(s.cssRules||[]).forEach(r=>{css+=r.cssText+'\n';});}catch(e){}});}catch(e){}
  const title=buildTitle(worksheetData.settings);
  const html=`<!DOCTYPE html><html lang="ja"><head><meta charset="UTF-8"><title>${title}</title>
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&display=swap" rel="stylesheet">
<style>*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}body{font-family:'Noto Sans JP',sans-serif;background:#fff}${css}
.a4-page{width:210mm;min-height:297mm;padding:13mm;margin:0 auto;background:#fff}
@media print{@page{size:A4 portrait;margin:13mm}}</style></head>
<body>${document.getElementById('print-page').innerHTML}</body></html>`;
  const a=Object.assign(document.createElement('a'),{
    href:URL.createObjectURL(new Blob([html],{type:'text/html;charset=utf-8'})),
    download:`${title.replace(/\s/g,'_')}.html`
  });
  document.body.appendChild(a);a.click();document.body.removeChild(a);
}
