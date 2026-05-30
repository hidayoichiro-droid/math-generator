// generator.js

const OPERATION_LABELS = {
  addition:'たしざん', subtraction:'ひきざん',
  multiplication:'かけざん', division:'わりざん', written:'ひっさん'
};
const OPERATION_SYMBOLS = {
  addition:'＋', subtraction:'－', multiplication:'×', division:'÷', written:'＋'
};

function randomByDigits(digits) {
  const d = Array.isArray(digits) ? digits[Math.floor(Math.random()*digits.length)] : digits;
  if (d===1) return Math.floor(Math.random()*9)+1;
  if (d===2) return Math.floor(Math.random()*90)+10;
  if (d===3) return Math.floor(Math.random()*900)+100;
  if (d===4) return Math.floor(Math.random()*9000)+1000;
  return Math.floor(Math.random()*9)+1;
}

function shuffle(arr) {
  for (let i=arr.length-1; i>0; i--) {
    const j = Math.floor(Math.random()*(i+1));
    [arr[i],arr[j]] = [arr[j],arr[i]];
  }
  return arr;
}

function calcHiddenDigits(a, b, level) {
  const aStr = String(a), bStr = String(b);
  const total = aStr.length + bStr.length;
  let n;
  if (level === 'easy')   n = 1;
  else if (level === 'normal') n = Math.min(2, total);
  else                    n = Math.min(Math.max(3, aStr.length + bStr.length), total);
  const all = [];
  for (let i=0; i<aStr.length; i++) all.push({num:'a', pos:i});
  for (let i=0; i<bStr.length; i++) all.push({num:'b', pos:i});
  const sel = shuffle([...all]).slice(0, n);
  return {
    aHidden: sel.filter(p=>p.num==='a').map(p=>p.pos).sort(),
    bHidden: sel.filter(p=>p.num==='b').map(p=>p.pos).sort()
  };
}

function generateProblem(operation, digits, writtenOps, mushikuiLevel) {
  let a, b, answer;
  const isWritten = operation === 'written';
  let actualOp;
  if (isWritten) {
    const ops = Array.isArray(writtenOps) ? writtenOps : [writtenOps||'addition'];
    actualOp = ops[Math.floor(Math.random()*ops.length)];
  } else {
    actualOp = operation;
  }
  switch (actualOp) {
    case 'addition': a=randomByDigits(digits); b=randomByDigits(digits); answer=a+b; break;
    case 'subtraction':
      a=randomByDigits(digits); b=randomByDigits(digits);
      if(a<b)[a,b]=[b,a]; if(a===b)b=Math.max(1,b-1);
      answer=a-b; break;
    case 'multiplication':
      a=randomByDigits(digits);
      b=randomByDigits(Array.isArray(digits)?digits.map(d=>Math.min(d,2)):Math.min(digits,2));
      answer=a*b; break;
    case 'division':
      b=randomByDigits(1); const q=randomByDigits(digits); a=b*q; answer=q; break;
    default: a=randomByDigits(digits); b=randomByDigits(digits); answer=a+b; actualOp='addition';
  }
  const isMushikui = mushikuiLevel && mushikuiLevel !== 'off';
  const hidden = isMushikui ? calcHiddenDigits(a, b, mushikuiLevel) : { aHidden:[], bHidden:[] };
  return {
    a, b, answer,
    operation: actualOp, isWritten,
    symbol: OPERATION_SYMBOLS[actualOp],
    mushikuiLevel: mushikuiLevel || 'off',
    aHidden: hidden.aHidden, bHidden: hidden.bHidden
  };
}

function generateDaionProblems(c) {
  return Array.from({length: c.count}, () =>
    generateProblem(c.operation, c.digits, c.writtenOps, c.mushikuiLevel || 'off'));
}

function generateAllProblems(daionList) {
  return daionList.map((d, i) => ({
    index: i+1, label: OPERATION_LABELS[d.operation],
    operation: d.operation, mushikuiLevel: d.mushikuiLevel || 'off',
    problems: generateDaionProblems(d)
  }));
}

if (typeof module !== 'undefined') module.exports = { generateAllProblems, generateProblem };
