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

// 配列をシャッフル
function shuffle(arr) {
  for (let i=arr.length-1; i>0; i--) {
    const j = Math.floor(Math.random()*(i+1));
    [arr[i],arr[j]] = [arr[j],arr[i]];
  }
  return arr;
}

/**
 * 難易度に応じて a・b の隠す桁インデックスを決定する
 * level: 'easy'(1桁) | 'normal'(2桁) | 'hard'(3桁以上)
 * 返り値: { aHidden: number[], bHidden: number[] }
 */
function calcHiddenDigits(a, b, level) {
  const aStr = String(a), bStr = String(b);
  const totalDigits = aStr.length + bStr.length;

  // 隠す桁数
  let numToHide;
  if (level === 'easy')   numToHide = 1;
  else if (level === 'normal') numToHide = Math.min(2, totalDigits);
  else /* hard */         numToHide = Math.min(Math.max(3, aStr.length + bStr.length), totalDigits);

  // 全桁の位置リスト [{num:'a',pos:0}, ...]
  const allPos = [];
  for (let i=0; i<aStr.length; i++) allPos.push({num:'a', pos:i});
  for (let i=0; i<bStr.length; i++) allPos.push({num:'b', pos:i});

  const selected = shuffle([...allPos]).slice(0, numToHide);
  return {
    aHidden: selected.filter(p=>p.num==='a').map(p=>p.pos).sort(),
    bHidden: selected.filter(p=>p.num==='b').map(p=>p.pos).sort()
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
    case 'addition':
      a=randomByDigits(digits); b=randomByDigits(digits); answer=a+b; break;
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
    default:
      a=randomByDigits(digits); b=randomByDigits(digits); answer=a+b; actualOp='addition';
  }

  // 虫食い桁計算
  const isMushikui = mushikuiLevel && mushikuiLevel !== 'off';
  const hiddenDigits = isMushikui ? calcHiddenDigits(a, b, mushikuiLevel) : { aHidden:[], bHidden:[] };

  return {
    a, b, answer,
    operation: actualOp, isWritten,
    symbol: OPERATION_SYMBOLS[actualOp],
    mushikuiLevel: mushikuiLevel || 'off',
    aHidden: hiddenDigits.aHidden,
    bHidden: hiddenDigits.bHidden
  };
}

function generateDaionProblems(daionConfig) {
  const { operation, digits, count, writtenOps, mushikuiLevel } = daionConfig;
  return Array.from({length:count}, () =>
    generateProblem(operation, digits, writtenOps, mushikuiLevel || 'off'));
}

function generateAllProblems(daionList) {
  return daionList.map((daion, index) => ({
    index: index+1,
    label: OPERATION_LABELS[daion.operation],
    operation: daion.operation,
    mushikuiLevel: daion.mushikuiLevel || 'off',
    problems: generateDaionProblems(daion)
  }));
}

if (typeof module !== 'undefined') {
  module.exports = { generateAllProblems, generateProblem, OPERATION_LABELS, OPERATION_SYMBOLS };
}
