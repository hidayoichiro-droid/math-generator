// app.js

let daionList = [], daionCounter = 0;

const OP_COLORS = {addition:'op-addition',subtraction:'op-subtraction',multiplication:'op-multiplication',division:'op-division',written:'op-written'};
const OP_LABELS = {addition:'たしざん',subtraction:'ひきざん',multiplication:'かけざん',division:'わりざん',written:'ひっさん'};
const CIRCLES   = ['①','②','③','④','⑤','⑥','⑦','⑧'];

const MUSHIKUI_OPTIONS = [
  { value:'off',    label:'なし',        color:'' },
  { value:'easy',   label:'優（1文字）', color:'#16a34a' },
  { value:'normal', label:'普（2文字）', color:'#d97706' },
  { value:'hard',   label:'難（3文字〜）',color:'#dc2626' }
];

document.addEventListener('DOMContentLoaded', () => {
  addDaion('addition',       [2], 5, ['addition'],       'off');
  addDaion('subtraction',    [2], 5, ['subtraction'],    'off');
  addDaion('multiplication', [1], 5, ['multiplication'], 'off');
  addDaion('written',        [2], 5, ['addition'],       'off');
  renderPresets();
  const last = getLastSettings();
  if (last) restoreSettings(last);

  document.getElementById('btn-add-daion').addEventListener('click', () => {
    if (daionList.length >= 8) { showToast('大問は最大8問です'); return; }
    addDaion('addition', [2], 5, ['addition'], 'off');
  });
  document.getElementById('btn-create').addEventListener('click', handleCreate);
  document.getElementById('btn-print').addEventListener('click', handlePrint);
  document.getElementById('btn-save').addEventListener('click', handleSave);
});

function addDaion(op='addition', digits=[2], count=5, writtenOps=['addition'], mushikuiLevel='off') {
  const id = ++daionCounter;
  daionList.push({ id, operation:op, digits:Array.isArray(digits)?digits:[digits],
    count, writtenOps:Array.isArray(writtenOps)?writtenOps:[writtenOps],
    mushikuiLevel: mushikuiLevel||'off' });
  renderDaionList();
}
function removeDaion(id) {
  if (daionList.length<=1) { showToast('大問は最低1問必要です'); return; }
  daionList = daionList.filter(d=>d.id!==id);
  renderDaionList();
}

function renderDaionList() {
  const container = document.getElementById('daion-list');
  container.innerHTML = '';

  daionList.forEach((daion, idx) => {
    const div = document.createElement('div');
    div.className = `daion-card ${OP_COLORS[daion.operation]}`;

    const digitPills = [1,2,3,4].map(d=>`
      <label class="check-pill">
        <input type="checkbox" class="digit-cb" data-id="${daion.id}" data-digit="${d}"
          ${daion.digits.includes(d)?'checked':''}>
        ${d}桁
      </label>`).join('');

    const writtenPills = [
      {val:'addition',label:'たしざん'},{val:'subtraction',label:'ひきざん'},{val:'multiplication',label:'かけざん'}
    ].map(op=>`
      <label class="check-pill">
        <input type="checkbox" class="wop-cb" data-id="${daion.id}" data-op="${op.val}"
          ${daion.writtenOps.includes(op.val)?'checked':''}>
        ${op.label}
      </label>`).join('');

    // 虫食い難易度ラジオ（:has()不使用・active classで制御）
    const mushikuiPills = MUSHIKUI_OPTIONS.map(opt => {
      const isActive = daion.mushikuiLevel === opt.value;
      const activeClass = isActive ? `active-${opt.value}` : '';
      return `<label class="check-pill mushikui-level-pill ${activeClass}" data-val="${opt.value}">
        <input type="radio" class="mushikui-radio" name="mushikui-${daion.id}"
          data-id="${daion.id}" value="${opt.value}" ${isActive?'checked':''}>
        ${opt.label}
      </label>`;
    }).join('');

    div.innerHTML = `
      <div class="daion-header">
        <div class="daion-num">${CIRCLES[idx]||idx+1}</div>
        <div class="daion-lbl">${OP_LABELS[daion.operation]}</div>
        <button class="btn-remove" data-id="${daion.id}">✕</button>
      </div>
      <div class="daion-row">
        <div class="form-group">
          <label>演算の種類</label>
          <select class="input op-sel" data-id="${daion.id}">
            <option value="addition"       ${daion.operation==='addition'?'selected':''}>➕ たしざん</option>
            <option value="subtraction"    ${daion.operation==='subtraction'?'selected':''}>➖ ひきざん</option>
            <option value="multiplication" ${daion.operation==='multiplication'?'selected':''}>✖ かけざん</option>
            <option value="division"       ${daion.operation==='division'?'selected':''}>➗ わりざん</option>
            <option value="written"        ${daion.operation==='written'?'selected':''}>📝 ひっさん</option>
          </select>
        </div>
        <div class="form-group daion-count-group">
          <label>小問数</label>
          <input type="number" class="input count-inp" data-id="${daion.id}" min="1" max="30" value="${daion.count}">
        </div>
      </div>
      <div class="check-row">
        <span class="check-row-label">桁数（複数選択可）</span>
        <div class="check-pills">${digitPills}</div>
      </div>
      ${daion.operation==='written'?`
      <div class="check-row">
        <span class="check-row-label">筆算の演算種類（複数選択可）</span>
        <div class="check-pills">${writtenPills}</div>
      </div>`:''}
      <div class="check-row">
        <span class="check-row-label">🐛 虫食い難易度</span>
        <div class="check-pills">${mushikuiPills}</div>
      </div>`;

    container.appendChild(div);
  });

  // ── イベント ──
  container.querySelectorAll('.btn-remove').forEach(b =>
    b.addEventListener('click', ()=>removeDaion(Number(b.dataset.id))));

  container.querySelectorAll('.op-sel').forEach(s =>
    s.addEventListener('change', e => {
      const d=daionList.find(d=>d.id===Number(e.target.dataset.id));
      if(d){d.operation=e.target.value;renderDaionList();}
    }));

  container.querySelectorAll('.count-inp').forEach(i =>
    i.addEventListener('change', e => {
      const d=daionList.find(d=>d.id===Number(e.target.dataset.id));
      if(d)d.count=Math.max(1,Math.min(30,Number(e.target.value)));
    }));

  container.querySelectorAll('.digit-cb').forEach(cb =>
    cb.addEventListener('change', e => {
      const d=daionList.find(d=>d.id===Number(e.target.dataset.id));
      const v=Number(e.target.dataset.digit);
      if(!d)return;
      if(e.target.checked){if(!d.digits.includes(v))d.digits.push(v);}
      else{
        if(d.digits.length<=1){e.target.checked=true;showToast('桁数を最低1つ選んでください');return;}
        d.digits=d.digits.filter(x=>x!==v);
      }
      d.digits.sort((a,b)=>a-b);
    }));

  container.querySelectorAll('.wop-cb').forEach(cb =>
    cb.addEventListener('change', e => {
      const d=daionList.find(d=>d.id===Number(e.target.dataset.id));
      const v=e.target.dataset.op;
      if(!d)return;
      if(e.target.checked){if(!d.writtenOps.includes(v))d.writtenOps.push(v);}
      else{
        if(d.writtenOps.length<=1){e.target.checked=true;showToast('演算種類を最低1つ選んでください');return;}
        d.writtenOps=d.writtenOps.filter(x=>x!==v);
      }
    }));

  // 虫食いラジオ: 選択時に active class を付け替え
  container.querySelectorAll('.mushikui-radio').forEach(radio =>
    radio.addEventListener('change', e => {
      const d = daionList.find(d => d.id === Number(e.target.dataset.id));
      if (!d) return;
      d.mushikuiLevel = e.target.value;
      // 同じグループのピルの active class を更新
      const pills = e.target.closest('.check-pills').querySelectorAll('.mushikui-level-pill');
      pills.forEach(pill => {
        // 全 active-* クラスを除去
        MUSHIKUI_OPTIONS.forEach(o => pill.classList.remove('active-' + o.value));
        const inp = pill.querySelector('input');
        if (inp && inp.checked) {
          pill.classList.add('active-' + inp.value);
        }
      });
    }));

  document.getElementById('btn-add-daion').disabled = daionList.length>=8;
}

function renderPresets() {
  const presets=getPresets();
  const container=document.getElementById('preset-list');
  container.innerHTML='';
  for(let i=0;i<5;i++){
    const p=presets[i]||null;
    const row=document.createElement('div');
    row.className=`preset-row ${p?'has-data':''}`;
    row.innerHTML=`
      <span class="preset-idx">${i+1}</span>
      <input type="text" class="preset-name" data-i="${i}" value="${p?esc(p.name):''}" placeholder="プリセット名">
      <button class="preset-btn save-btn" data-i="${i}">保存</button>
      <button class="preset-btn load-btn" data-i="${i}" ${!p?'disabled':''}>読込</button>
      <button class="preset-btn del-btn"  data-i="${i}" ${!p?'disabled':''}>削除</button>`;
    container.appendChild(row);
  }
  container.querySelectorAll('.save-btn').forEach(b=>b.addEventListener('click',()=>{
    const i=Number(b.dataset.i);
    const name=container.querySelector(`.preset-name[data-i="${i}"]`).value.trim()||`プリセット${i+1}`;
    savePreset(i,name,getCurrentSettings());showToast(`「${name}」を保存しました`);renderPresets();
  }));
  container.querySelectorAll('.load-btn').forEach(b=>b.addEventListener('click',()=>{
    const p=getPresets()[Number(b.dataset.i)];
    if(p){restoreSettings(p.settings);showToast(`「${p.name}」を読み込みました`);}
  }));
  container.querySelectorAll('.del-btn').forEach(b=>b.addEventListener('click',()=>{
    deletePreset(Number(b.dataset.i));showToast('削除しました');renderPresets();
  }));
}

function getCurrentSettings() {
  daionList.forEach(d=>{
    const ci=document.querySelector(`.count-inp[data-id="${d.id}"]`);
    if(ci)d.count=Number(ci.value);
    const dcs=document.querySelectorAll(`.digit-cb[data-id="${d.id}"]:checked`);
    if(dcs.length)d.digits=Array.from(dcs).map(c=>Number(c.dataset.digit)).sort((a,b)=>a-b);
    const wcs=document.querySelectorAll(`.wop-cb[data-id="${d.id}"]:checked`);
    if(wcs.length)d.writtenOps=Array.from(wcs).map(c=>c.dataset.op);
    const mr=document.querySelector(`.mushikui-radio[data-id="${d.id}"]:checked`);
    if(mr)d.mushikuiLevel=mr.value;
  });
  return {
    headerMonth:    document.getElementById('header-month').value,
    headerDay:      document.getElementById('header-day').value,
    headerWeekday:  document.getElementById('header-weekday').value,
    headerNameLabel:document.getElementById('header-namelabel').value,
    daionList: daionList.map(({operation,digits,count,writtenOps,mushikuiLevel})=>
      ({operation,digits,count,writtenOps,mushikuiLevel:mushikuiLevel||'off'}))
  };
}

function restoreSettings(s) {
  if(!s)return;
  if(s.headerMonth)    document.getElementById('header-month').value    =s.headerMonth;
  if(s.headerDay)      document.getElementById('header-day').value      =s.headerDay;
  if(s.headerWeekday)  document.getElementById('header-weekday').value  =s.headerWeekday;
  if(s.headerNameLabel)document.getElementById('header-namelabel').value=s.headerNameLabel;
  if(s.daionList?.length){
    daionList=[];daionCounter=0;
    s.daionList.forEach(d=>addDaion(d.operation,
      Array.isArray(d.digits)?d.digits:[d.digits||2], d.count,
      Array.isArray(d.writtenOps)?d.writtenOps:[d.writtenOps||'addition'],
      // 旧形式(mushikui:bool)との互換性
      d.mushikuiLevel || (d.mushikui?'easy':'off')));
  }
}

function handleCreate() {
  const settings=getCurrentSettings();
  if(!settings.daionList.length){showToast('大問を1つ以上追加してください');return;}
  const data={settings,daions:generateAllProblems(settings.daionList)};
  localStorage.setItem('math_gen_worksheet',JSON.stringify(data));
  saveLastSettings(settings);
  document.getElementById('btn-print').disabled=false;
  document.getElementById('btn-save').disabled=false;
  window.open('worksheet.html','_blank');
  showToast('問題を作成しました！');
}
function handlePrint() {
  if(!localStorage.getItem('math_gen_worksheet')){showToast('先に「作成」を押してください');return;}
  const w=window.open('worksheet.html','_blank');
  if(w)setTimeout(()=>w.print(),1200);
}
function handleSave() {
  if(!localStorage.getItem('math_gen_worksheet')){showToast('先に「作成」を押してください');return;}
  window.open('worksheet.html?save=1','_blank');
}
function showToast(msg){
  const t=document.getElementById('toast');
  t.textContent=msg;t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'),2200);
}
function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}

if('serviceWorker'in navigator){
  window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));
}
