// templates.js — 学年別テンプレート（学習指導要領に準拠）

const GRADE_TEMPLATES = {
  1: {
    icon: '🌱',
    label: '1年生',
    color: '#fef3c7',
    topics: [
      {
        id: '1-add-10', name: 'たしざん（10まで）',
        desc: '1けた＋1けた（10までの数）',
        daions: [
          { operation:'addition', digits:[1], count:15, writtenOps:['addition'], mushikuiLevel:'off' }
        ]
      },
      {
        id: '1-sub-10', name: 'ひきざん（10まで）',
        desc: '1けたー1けた（10までの数）',
        daions: [
          { operation:'subtraction', digits:[1], count:15, writtenOps:['subtraction'], mushikuiLevel:'off' }
        ]
      },
      {
        id: '1-mix', name: 'たしざん・ひきざんミックス',
        desc: '1けたの たしざんと ひきざん',
        daions: [
          { operation:'addition',    digits:[1], count:8, writtenOps:['addition'],    mushikuiLevel:'off' },
          { operation:'subtraction', digits:[1], count:8, writtenOps:['subtraction'], mushikuiLevel:'off' }
        ]
      },
      {
        id: '1-mushikui', name: 'たしざん虫食い（やさしい）',
        desc: '虫食い（優）でちょっとチャレンジ',
        daions: [
          { operation:'addition',    digits:[1], count:8, writtenOps:['addition'],    mushikuiLevel:'easy' },
          { operation:'subtraction', digits:[1], count:8, writtenOps:['subtraction'], mushikuiLevel:'easy' }
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
          { operation:'multiplication', digits:[1], count:25, writtenOps:['multiplication'], mushikuiLevel:'off' }
        ]
      },
      {
        id: '2-add-2d', name: '2桁のたし算（暗算・筆算）',
        desc: '2桁＋2桁',
        daions: [
          { operation:'addition', digits:[2], count:6, writtenOps:['addition'], mushikuiLevel:'off' },
          { operation:'written',  digits:[2], count:6, writtenOps:['addition'], mushikuiLevel:'off' }
        ]
      },
      {
        id: '2-sub-2d', name: '2桁のひき算（暗算・筆算）',
        desc: '2桁ー2桁',
        daions: [
          { operation:'subtraction', digits:[2], count:6, writtenOps:['subtraction'], mushikuiLevel:'off' },
          { operation:'written',     digits:[2], count:6, writtenOps:['subtraction'], mushikuiLevel:'off' }
        ]
      },
      {
        id: '2-fu-mix', name: '2桁の筆算（たし算・ひき算）',
        desc: '筆算で たし算とひき算',
        daions: [
          { operation:'written', digits:[2], count:9, writtenOps:['addition','subtraction'], mushikuiLevel:'off' }
        ]
      },
      {
        id: '2-all', name: '2年生 総合',
        desc: 'たし算・ひき算・九九',
        daions: [
          { operation:'addition',       digits:[2], count:5, writtenOps:['addition'],       mushikuiLevel:'off' },
          { operation:'subtraction',    digits:[2], count:5, writtenOps:['subtraction'],    mushikuiLevel:'off' },
          { operation:'multiplication', digits:[1], count:10,writtenOps:['multiplication'], mushikuiLevel:'off' }
        ]
      },
      {
        id: '2-mushikui', name: '2年生 虫食い練習',
        desc: '虫食い（優）',
        daions: [
          { operation:'addition',       digits:[2], count:5, writtenOps:['addition'],       mushikuiLevel:'easy' },
          { operation:'subtraction',    digits:[2], count:5, writtenOps:['subtraction'],    mushikuiLevel:'easy' },
          { operation:'multiplication', digits:[1], count:8, writtenOps:['multiplication'], mushikuiLevel:'easy' }
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
        id: '3-3d-add', name: '3桁のたし算（筆算）',
        desc: '3桁＋3桁の筆算',
        daions: [
          { operation:'written', digits:[3], count:6, writtenOps:['addition'], mushikuiLevel:'off' }
        ]
      },
      {
        id: '3-3d-sub', name: '3桁のひき算（筆算）',
        desc: '3桁ー3桁の筆算',
        daions: [
          { operation:'written', digits:[3], count:6, writtenOps:['subtraction'], mushikuiLevel:'off' }
        ]
      },
      {
        id: '3-mul-fu', name: 'かけ算筆算（2桁×1桁）',
        desc: '2桁×1桁の筆算',
        daions: [
          { operation:'written', digits:[2], count:9, writtenOps:['multiplication'], mushikuiLevel:'off' }
        ]
      },
      {
        id: '3-div', name: 'わり算（九九の範囲）',
        desc: '九九でできるわり算',
        daions: [
          { operation:'division', digits:[2], count:15, writtenOps:['division'], mushikuiLevel:'off' }
        ]
      },
      {
        id: '3-all', name: '3年生 総合',
        desc: '3桁計算・かけ算筆算・わり算',
        daions: [
          { operation:'written',  digits:[3], count:4, writtenOps:['addition','subtraction'], mushikuiLevel:'off' },
          { operation:'written',  digits:[2], count:4, writtenOps:['multiplication'],          mushikuiLevel:'off' },
          { operation:'division', digits:[2], count:6, writtenOps:['division'],                mushikuiLevel:'off' }
        ]
      },
      {
        id: '3-mushikui', name: '3年生 虫食い練習',
        desc: '虫食い（優）',
        daions: [
          { operation:'written',  digits:[3], count:4, writtenOps:['addition','subtraction'], mushikuiLevel:'easy' },
          { operation:'written',  digits:[2], count:4, writtenOps:['multiplication'],          mushikuiLevel:'easy' },
          { operation:'division', digits:[2], count:6, writtenOps:['division'],                mushikuiLevel:'easy' }
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
        id: '4-4d-add-sub', name: '4桁のたし算・ひき算',
        desc: '4桁＋4桁、4桁−4桁',
        daions: [
          { operation:'addition',    digits:[4], count:4, writtenOps:['addition'],    mushikuiLevel:'off' },
          { operation:'subtraction', digits:[4], count:4, writtenOps:['subtraction'], mushikuiLevel:'off' }
        ]
      },
      {
        id: '4-mul-2x2', name: 'かけ算筆算（2桁×2桁）',
        desc: '2桁×2桁の筆算',
        daions: [
          { operation:'written', digits:[2], count:9, writtenOps:['multiplication'], mushikuiLevel:'off' }
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
        id: '4-div', name: 'わり算（3桁÷1桁）',
        desc: '九九を使った大きなわり算',
        daions: [
          { operation:'division', digits:[3], count:9, writtenOps:['division'], mushikuiLevel:'off' }
        ]
      },
      {
        id: '4-all', name: '4年生 総合',
        desc: '4桁四則計算',
        daions: [
          { operation:'addition',    digits:[3,4], count:4, writtenOps:['addition'],       mushikuiLevel:'off' },
          { operation:'subtraction', digits:[3,4], count:4, writtenOps:['subtraction'],    mushikuiLevel:'off' },
          { operation:'written',     digits:[2,3], count:4, writtenOps:['multiplication'], mushikuiLevel:'off' },
          { operation:'division',    digits:[3],   count:4, writtenOps:['division'],       mushikuiLevel:'off' }
        ]
      },
      {
        id: '4-mushikui', name: '4年生 虫食い練習（普）',
        desc: '虫食い（普）で力試し',
        daions: [
          { operation:'addition',    digits:[3], count:4, writtenOps:['addition'],       mushikuiLevel:'normal' },
          { operation:'subtraction', digits:[3], count:4, writtenOps:['subtraction'],    mushikuiLevel:'normal' },
          { operation:'written',     digits:[2], count:4, writtenOps:['multiplication'], mushikuiLevel:'normal' }
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
        id: '5-big-add-sub', name: '大きな数のたし算・ひき算',
        desc: '4〜5桁の整数計算',
        daions: [
          { operation:'addition',    digits:[4], count:5, writtenOps:['addition'],    mushikuiLevel:'off' },
          { operation:'subtraction', digits:[4], count:5, writtenOps:['subtraction'], mushikuiLevel:'off' }
        ]
      },
      {
        id: '5-mul-3x2', name: 'かけ算筆算（3桁×2桁）',
        desc: '3桁×2桁の筆算',
        daions: [
          { operation:'written', digits:[3], count:9, writtenOps:['multiplication'], mushikuiLevel:'off' }
        ]
      },
      {
        id: '5-div-3d', name: 'わり算（3桁÷1桁）',
        desc: '3桁を割るわり算',
        daions: [
          { operation:'division', digits:[3], count:12, writtenOps:['division'], mushikuiLevel:'off' }
        ]
      },
      {
        id: '5-all', name: '5年生 整数 総合',
        desc: '4桁の四則計算（整数）',
        daions: [
          { operation:'addition',    digits:[3,4], count:4, writtenOps:['addition'],       mushikuiLevel:'off' },
          { operation:'subtraction', digits:[3,4], count:4, writtenOps:['subtraction'],    mushikuiLevel:'off' },
          { operation:'written',     digits:[3],   count:4, writtenOps:['multiplication'], mushikuiLevel:'off' },
          { operation:'division',    digits:[3],   count:4, writtenOps:['division'],       mushikuiLevel:'off' }
        ]
      },
      {
        id: '5-mushikui', name: '5年生 虫食い練習（普）',
        desc: '虫食い（普）3桁中心',
        daions: [
          { operation:'addition',    digits:[3], count:4, writtenOps:['addition'],       mushikuiLevel:'normal' },
          { operation:'subtraction', digits:[3], count:4, writtenOps:['subtraction'],    mushikuiLevel:'normal' },
          { operation:'written',     digits:[2], count:4, writtenOps:['multiplication'], mushikuiLevel:'normal' },
          { operation:'division',    digits:[3], count:4, writtenOps:['division'],       mushikuiLevel:'easy' }
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
        id: '6-all-4d', name: '6年生 4桁の四則総合',
        desc: '4桁の整数四則計算',
        daions: [
          { operation:'addition',    digits:[4],   count:4, writtenOps:['addition'],       mushikuiLevel:'off' },
          { operation:'subtraction', digits:[4],   count:4, writtenOps:['subtraction'],    mushikuiLevel:'off' },
          { operation:'written',     digits:[3],   count:4, writtenOps:['multiplication'], mushikuiLevel:'off' },
          { operation:'division',    digits:[3,4], count:4, writtenOps:['division'],       mushikuiLevel:'off' }
        ]
      },
      {
        id: '6-mul-big', name: '大きなかけ算（3桁×3桁）',
        desc: '3桁×3桁の筆算',
        daions: [
          { operation:'written', digits:[3], count:6, writtenOps:['multiplication'], mushikuiLevel:'off' }
        ]
      },
      {
        id: '6-div-big', name: '大きなわり算（4桁÷2桁）',
        desc: '4桁÷2桁',
        daions: [
          { operation:'division', digits:[4], count:9, writtenOps:['division'], mushikuiLevel:'off' }
        ]
      },
      {
        id: '6-mushikui-mid', name: '6年生 虫食い練習（普）',
        desc: '虫食い（普）で総復習',
        daions: [
          { operation:'addition',    digits:[3,4], count:4, writtenOps:['addition'],       mushikuiLevel:'normal' },
          { operation:'subtraction', digits:[3,4], count:4, writtenOps:['subtraction'],    mushikuiLevel:'normal' },
          { operation:'written',     digits:[3],   count:4, writtenOps:['multiplication'], mushikuiLevel:'normal' },
          { operation:'division',    digits:[3],   count:4, writtenOps:['division'],       mushikuiLevel:'normal' }
        ]
      },
      {
        id: '6-mushikui-hard', name: '6年生 虫食い挑戦（難）',
        desc: '虫食い（難）— 3桁中心の高難度',
        daions: [
          { operation:'addition',    digits:[3], count:4, writtenOps:['addition'],       mushikuiLevel:'hard' },
          { operation:'subtraction', digits:[3], count:4, writtenOps:['subtraction'],    mushikuiLevel:'hard' },
          { operation:'written',     digits:[3], count:4, writtenOps:['multiplication'], mushikuiLevel:'normal' },
          { operation:'division',    digits:[3], count:4, writtenOps:['division'],       mushikuiLevel:'normal' }
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
