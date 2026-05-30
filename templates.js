// templates.js — 学年別テンプレート定義

const GRADE_TEMPLATES = {
  1: {
    icon: '🌱',
    label: '1年生',
    color: '#fef3c7',
    topics: [
      {
        id: '1-add-10', name: 'たしざん（1けた）',
        desc: '1けた＋1けたの たしざん',
        daions: [
          { operation:'addition', digits:[1], count:10, writtenOps:['addition'], mushikuiLevel:'off' }
        ]
      },
      {
        id: '1-sub-10', name: 'ひきざん（1けた）',
        desc: '1けた−1けたの ひきざん',
        daions: [
          { operation:'subtraction', digits:[1], count:10, writtenOps:['subtraction'], mushikuiLevel:'off' }
        ]
      },
      {
        id: '1-mix', name: 'たし算・ひき算ミックス',
        desc: '1けたの たしざんと ひきざん',
        daions: [
          { operation:'addition',    digits:[1], count:6, writtenOps:['addition'],    mushikuiLevel:'off' },
          { operation:'subtraction', digits:[1], count:6, writtenOps:['subtraction'], mushikuiLevel:'off' }
        ]
      },
      {
        id: '1-mushikui', name: 'たし算・ひき算（虫食い）',
        desc: '虫食い（優）でちょっとチャレンジ',
        daions: [
          { operation:'addition',    digits:[1], count:6, writtenOps:['addition'],    mushikuiLevel:'easy' },
          { operation:'subtraction', digits:[1], count:6, writtenOps:['subtraction'], mushikuiLevel:'easy' }
        ]
      }
    ]
  },
  2: {
    icon: '🌿',
    label: '2年生',
    color: '#d1fae5',
    topics: [
      {
        id: '2-kuku', name: '九九（1〜9のだん）',
        desc: 'かけ算九九 1×1〜9×9',
        daions: [
          { operation:'multiplication', digits:[1], count:20, writtenOps:['multiplication'], mushikuiLevel:'off' }
        ]
      },
      {
        id: '2-add-fu', name: '2桁の筆算（たし算）',
        desc: '2桁＋2桁の筆算',
        daions: [
          { operation:'written', digits:[2], count:6, writtenOps:['addition'], mushikuiLevel:'off' }
        ]
      },
      {
        id: '2-sub-fu', name: '2桁の筆算（ひき算）',
        desc: '2桁−2桁の筆算',
        daions: [
          { operation:'written', digits:[2], count:6, writtenOps:['subtraction'], mushikuiLevel:'off' }
        ]
      },
      {
        id: '2-fu-mix', name: '2桁の筆算（混合）',
        desc: 'たし算とひき算の筆算',
        daions: [
          { operation:'written', digits:[2], count:6, writtenOps:['addition','subtraction'], mushikuiLevel:'off' }
        ]
      },
      {
        id: '2-all', name: '2年生 総合',
        desc: 'たし算・ひき算・九九の総合',
        daions: [
          { operation:'addition',       digits:[2], count:5, writtenOps:['addition'],       mushikuiLevel:'off' },
          { operation:'subtraction',    digits:[2], count:5, writtenOps:['subtraction'],    mushikuiLevel:'off' },
          { operation:'multiplication', digits:[1], count:10,writtenOps:['multiplication'], mushikuiLevel:'off' }
        ]
      }
    ]
  },
  3: {
    icon: '🌳',
    label: '3年生',
    color: '#dbeafe',
    topics: [
      {
        id: '3-3d-add-sub', name: '3桁のたし算・ひき算',
        desc: '3桁の筆算',
        daions: [
          { operation:'written', digits:[3], count:3, writtenOps:['addition'],    mushikuiLevel:'off' },
          { operation:'written', digits:[3], count:3, writtenOps:['subtraction'], mushikuiLevel:'off' }
        ]
      },
      {
        id: '3-mul-fu', name: 'かけ算筆算（2桁×1桁）',
        desc: '2桁×1桁の筆算',
        daions: [
          { operation:'written', digits:[2], count:6, writtenOps:['multiplication'], mushikuiLevel:'off' }
        ]
      },
      {
        id: '3-div-basic', name: 'わり算（基本）',
        desc: '九九の範囲のわり算',
        daions: [
          { operation:'division', digits:[2], count:10, writtenOps:['division'], mushikuiLevel:'off' }
        ]
      },
      {
        id: '3-all', name: '3年生 総合',
        desc: '3桁計算・かけ算・わり算',
        daions: [
          { operation:'written',  digits:[3], count:3, writtenOps:['addition','subtraction'], mushikuiLevel:'off' },
          { operation:'written',  digits:[2], count:3, writtenOps:['multiplication'],         mushikuiLevel:'off' },
          { operation:'division', digits:[2], count:6, writtenOps:['division'],               mushikuiLevel:'off' }
        ]
      }
    ]
  },
  4: {
    icon: '🌲',
    label: '4年生',
    color: '#fce7f3',
    topics: [
      {
        id: '4-mul-2x2', name: 'かけ算筆算（2桁×2桁）',
        desc: '2桁×2桁の筆算',
        daions: [
          { operation:'written', digits:[2], count:6, writtenOps:['multiplication'], mushikuiLevel:'off' }
        ]
      },
      {
        id: '4-mul-3x2', name: 'かけ算筆算（3桁×2桁）',
        desc: '3桁×2桁の筆算',
        daions: [
          { operation:'written', digits:[3], count:6, writtenOps:['multiplication'], mushikuiLevel:'off' }
        ]
      },
      {
        id: '4-div-fu', name: 'わり算（3桁÷1桁）',
        desc: '3桁を1桁で割る',
        daions: [
          { operation:'division', digits:[3], count:8, writtenOps:['division'], mushikuiLevel:'off' }
        ]
      },
      {
        id: '4-all', name: '4年生 総合',
        desc: '4桁の四則計算',
        daions: [
          { operation:'addition',    digits:[3,4], count:4, writtenOps:['addition'],       mushikuiLevel:'off' },
          { operation:'subtraction', digits:[3,4], count:4, writtenOps:['subtraction'],    mushikuiLevel:'off' },
          { operation:'written',     digits:[2,3], count:4, writtenOps:['multiplication'], mushikuiLevel:'off' },
          { operation:'division',    digits:[3],   count:4, writtenOps:['division'],       mushikuiLevel:'off' }
        ]
      },
      {
        id: '4-mushikui', name: '4年生 虫食い挑戦',
        desc: '思考力を伸ばす虫食い問題',
        daions: [
          { operation:'addition',    digits:[3], count:5, writtenOps:['addition'],    mushikuiLevel:'normal' },
          { operation:'subtraction', digits:[3], count:5, writtenOps:['subtraction'], mushikuiLevel:'normal' },
          { operation:'written',     digits:[2], count:5, writtenOps:['multiplication'], mushikuiLevel:'easy' }
        ]
      }
    ]
  },
  5: {
    icon: '🍀',
    label: '5年生',
    color: '#cffafe',
    topics: [
      {
        id: '5-big-add', name: '大きな数のたし算',
        desc: '4桁＋4桁',
        daions: [
          { operation:'addition', digits:[4], count:8, writtenOps:['addition'], mushikuiLevel:'off' }
        ]
      },
      {
        id: '5-big-sub', name: '大きな数のひき算',
        desc: '4桁−4桁',
        daions: [
          { operation:'subtraction', digits:[4], count:8, writtenOps:['subtraction'], mushikuiLevel:'off' }
        ]
      },
      {
        id: '5-all', name: '5年生 総合（整数）',
        desc: '4桁の四則計算',
        daions: [
          { operation:'addition',    digits:[3,4], count:5, writtenOps:['addition'],       mushikuiLevel:'off' },
          { operation:'subtraction', digits:[3,4], count:5, writtenOps:['subtraction'],    mushikuiLevel:'off' },
          { operation:'written',     digits:[3],   count:5, writtenOps:['multiplication'], mushikuiLevel:'off' },
          { operation:'division',    digits:[3],   count:5, writtenOps:['division'],       mushikuiLevel:'off' }
        ]
      },
      {
        id: '5-mushikui', name: '5年生 虫食い挑戦',
        desc: '虫食い（普）で力試し',
        daions: [
          { operation:'addition',    digits:[3,4], count:5, writtenOps:['addition'],       mushikuiLevel:'normal' },
          { operation:'subtraction', digits:[3,4], count:5, writtenOps:['subtraction'],    mushikuiLevel:'normal' },
          { operation:'written',     digits:[3],   count:5, writtenOps:['multiplication'], mushikuiLevel:'easy' }
        ]
      }
    ]
  },
  6: {
    icon: '🎓',
    label: '6年生',
    color: '#ede9fe',
    topics: [
      {
        id: '6-all', name: '6年生 総合（整数）',
        desc: '総合的な計算問題',
        daions: [
          { operation:'addition',    digits:[3,4], count:5, writtenOps:['addition'],       mushikuiLevel:'off' },
          { operation:'subtraction', digits:[3,4], count:5, writtenOps:['subtraction'],    mushikuiLevel:'off' },
          { operation:'written',     digits:[3],   count:5, writtenOps:['multiplication'], mushikuiLevel:'off' },
          { operation:'division',    digits:[3,4], count:5, writtenOps:['division'],       mushikuiLevel:'off' }
        ]
      },
      {
        id: '6-mushikui-hard', name: '6年生 虫食い（高難度）',
        desc: '虫食い（難）で挑戦',
        daions: [
          { operation:'addition',    digits:[3,4], count:5, writtenOps:['addition'],       mushikuiLevel:'hard' },
          { operation:'subtraction', digits:[3,4], count:5, writtenOps:['subtraction'],    mushikuiLevel:'hard' },
          { operation:'written',     digits:[3],   count:5, writtenOps:['multiplication'], mushikuiLevel:'normal' },
          { operation:'division',    digits:[3],   count:5, writtenOps:['division'],       mushikuiLevel:'normal' }
        ]
      },
      {
        id: '6-mid-test', name: '中学準備テスト（20問）',
        desc: '中学に向けた総合テスト',
        daions: [
          { operation:'addition',    digits:[3,4], count:5, writtenOps:['addition'],       mushikuiLevel:'off' },
          { operation:'subtraction', digits:[3,4], count:5, writtenOps:['subtraction'],    mushikuiLevel:'off' },
          { operation:'written',     digits:[2,3], count:5, writtenOps:['multiplication'], mushikuiLevel:'off' },
          { operation:'division',    digits:[3],   count:5, writtenOps:['division'],       mushikuiLevel:'off' }
        ]
      }
    ]
  }
};
