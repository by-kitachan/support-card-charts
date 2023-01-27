import { Row } from '@src/useCardTable';
import { useMemo, useState } from 'react';

// 見やすい色を生成する関数
const getRandomColor = () => {
  // HSV色空間を使用するため、H(色相)、S(彩度)、V(明度)をランダムに生成する
  const h = Math.floor(Math.random() * 360);
  const s = Math.floor(Math.random() * 75) + 25; // 25〜100の範囲で生成する
  const v = Math.floor(Math.random() * 75) + 25; // 25〜100の範囲で生成する

  // HSV色空間からRGB色空間に変換する
  const c = (v / 100) * (s / 100);
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = v / 100 - c;
  let r = 0;
  let g = 0;
  let b = 0;
  if (h >= 0 && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (h >= 60 && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (h >= 120 && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (h >= 180 && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (h >= 240 && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (h >= 300 && h < 360) {
    r = c;
    g = 0;
    b = x;
  }

  // RGB値を0〜255の範囲に変換する
  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  return `rgb(${r}, ${g}, ${b})`;
};

type Base = 'speed' | 'stamina' | 'power' | 'konjo' | 'kashikosa';
type CardType = Base | 'group';
type Status = Base | 'sp';
type TrainingType = Base;

const tokuiNameToTrainingType = (
  card: Row,
  selectedTokui?: TrainingType
): TrainingType | undefined => {
  switch (card['得意トレ']) {
    case 'スピード':
      return 'speed';
    case 'スタミナ':
      return 'stamina';
    case 'パワー':
      return 'power';
    case '根性':
      return 'konjo';
    case '賢さ':
      return 'stamina';
    case '友人':
      return selectedTokui as Base;
    case 'グループ':
      return selectedTokui as Base;
  }
};

type BonusName =
  | 'スピボナ'
  | 'スタボナ'
  | 'パワボナ'
  | '根性ボナ'
  | '賢さボナ'
  | 'Spボナ';

const statusToBonusName = (status: Status): BonusName => {
  switch (status) {
    case 'speed':
      return 'スピボナ';
    case 'stamina':
      return 'スタボナ';
    case 'power':
      return 'パワボナ';
    case 'konjo':
      return '根性ボナ';
    case 'kashikosa':
      return '賢さボナ';
    case 'sp':
      return 'Spボナ';
  }
};

const trainingBasePoint: {
  [key: string]: {
    speed: number;
    power: number;
    stamina: number;
    konjo: number;
    kashikosa: number;
    sp: number;
    bonusNames: BonusName[];
  };
} = {
  speed5: {
    speed: 12,
    power: 6,
    stamina: 0,
    konjo: 0,
    kashikosa: 0,
    sp: 4,
    bonusNames: ['スピボナ', 'パワボナ', 'Spボナ'],
  },
  stamina5: {
    speed: 0,
    power: 0,
    stamina: 12,
    konjo: 8,
    kashikosa: 0,
    sp: 4,
    bonusNames: ['スタボナ', '根性ボナ', 'Spボナ'],
  },
  power5: {
    speed: 0,
    power: 13,
    stamina: 6,
    konjo: 0,
    kashikosa: 0,
    sp: 4,
    bonusNames: ['スタボナ', 'パワボナ', 'Spボナ'],
  },
  konjo5: {
    konjo: 11,
    speed: 3,
    power: 3,
    stamina: 0,
    kashikosa: 0,
    sp: 4,
    bonusNames: ['根性ボナ', 'スピボナ', 'パワボナ', 'Spボナ'],
  },
  kashikosa5: {
    kashikosa: 10,
    speed: 4,
    power: 0,
    stamina: 0,
    konjo: 0,
    sp: 5,
    bonusNames: ['賢さボナ', 'スピボナ', 'Spボナ'],
  },
};

// 必要絆
const requireKizuna = (card: Row) => {
  const kizuna1 =
    card['固有1'] === '初期絆' ? parseInt(card['固有1効果量']) : 0;
  const kizuna2 =
    card['固有2'] === '初期絆' ? parseInt(card['固有2効果量']) : 0;
  //G352
  if (card['固有必要絆']) {
    return (
      parseInt(card['固有必要絆']) -
      parseInt(card['初期絆']) -
      kizuna1 -
      kizuna2
    );
  } else if (
    !card['固有必要絆'] &&
    (card['得意トレ'] === 'グループ' || card['得意トレ'] === '友人')
  ) {
    return 0;
  } else {
    return 80 - parseInt(card['初期絆']) - kizuna1 - kizuna2;
  }
};

// 得意値
const tokuiValue = (card: Row) => {
  const koyu1 = card['固有1'] === '得意率' ? parseInt(card['固有1効果量']) : 0;
  const koyu2 = card['固有2'] === '得意率' ? parseInt(card['固有2効果量']) : 0;
  return 100 + parseInt(card['得意率']) * (1 + koyu1 / 100) * (1 + koyu2 / 100);
};

// 得意練習出現率%
export const tokuiOccurRate = (card: Row) => {
  if (card['得意トレ'] === 'グループ' || card['得意トレ'] === '友人') {
    return (tokuiValue(card) / (tokuiValue(card) + 500)) * 100;
  } else {
    return (tokuiValue(card) / (tokuiValue(card) + 450)) * 100;
  }
};

// 非得意練習出現率%
const notTokuiOccurRate = (card: Row) => {
  if (card['得意トレ'] === 'グループ' || card['得意トレ'] === '友人') {
    return (100 / (tokuiValue(card) + 500)) * 100;
  } else {
    return (100 / (tokuiValue(card) + 450)) * 100;
  }
};

// ヒントイベント発生率%
// G349
const hintEventOccurRate = (card: Row) => {
  const koyu1 =
    card['固有1'] === 'ヒント率' ? parseInt(card['固有1効果量']) : 0;
  const koyu2 =
    card['固有2'] === 'ヒント率' ? parseInt(card['固有2効果量']) : 0;
  return parseInt(card['スキル個数']) === 0
    ? 0
    : 2.5 +
        5 *
          (1 + parseInt(card['ヒント率']) / 100) *
          (1 + koyu1 / 100) *
          (1 + koyu2 / 100);
};

// 絆貯め必要ターン
// G352, H352
const requireKizunaTurn = (card: Row) => {
  return requireKizuna(card) === 0
    ? 0
    : requireKizuna(card) /
        ((7 + 5 * (hintEventOccurRate(card) / 100)) *
          (tokuiOccurRate(card) / 100 + notTokuiOccurRate(card) / 100));
};

// トレ効果倍率
const trainingEffRate = (card: Row) => {
  const koyu1 =
    card['固有1'] === 'トレ効果' ? parseInt(card['固有1効果量']) : 0;
  const koyu2 =
    card['固有2'] === 'トレ効果' ? parseInt(card['固有2効果量']) : 0;
  return 1 + (parseInt(card['トレ効果']) + koyu1 + koyu2) / 100;
};

// やる気倍率
const yarukiRate = (card: Row) => {
  const koyu1 =
    card['固有1'] === 'やる気効果' ? parseInt(card['固有1効果量']) : 0;
  const koyu2 =
    card['固有2'] === 'やる気効果' ? parseInt(card['固有2効果量']) : 0;
  return 1 + (0.2 * (parseInt(card['やる気効果']) + koyu1 + koyu2)) / 100;
};

// 通常トレ倍率
const tujoTrainingRate = (card: Row) =>
  yarukiRate(card) * trainingEffRate(card) * 1.05;

// 友情倍率
// "通常トレ倍率
// ×
// (1+友情ボナ÷100)
// ×
// (1+固有1友情ボナ÷100)
// ×
// (1+固有2友情ボナ÷100)"
export const yujoRate = (card: Row) => {
  const koyu1 =
    card['固有1'] === '友情ボナ' ? parseInt(card['固有1効果量']) : 0;
  const koyu2 =
    card['固有2'] === '友情ボナ' ? parseInt(card['固有2効果量']) : 0;
  return (
    tujoTrainingRate(card) *
    (1 + parseInt(card['友情ボナ']) / 100) *
    (1 + koyu1 / 100) *
    (1 + koyu2 / 100)
  );
};

// 例: スピード練習・スピード・Lv5・得意率無視
// G96
export const notTokui = ({
  card,
  training,
  subUpStatus,
  lv,
}: {
  card: Row;
  training: TrainingType;
  subUpStatus: Status;
  lv: 5;
}) => {
  const base = trainingBasePoint[`${training}${lv}`];
  const koyu1 =
    statusToBonusName(subUpStatus) === (card['固有1'] as BonusName)
      ? parseInt(card['固有1効果量'])
      : 0;
  const koyu2 =
    statusToBonusName(subUpStatus) === (card['固有2'] as BonusName)
      ? parseInt(card['固有2効果量'])
      : 0;
  return (
    (base[subUpStatus] +
      parseInt(card[statusToBonusName(subUpStatus)]) +
      koyu1 +
      koyu2) *
    tujoTrainingRate(card)
  );
};

// 例: スピード練習・Sp以外合計・Lv5・得意率無視
// G91
export const notTokuiExceptSpSum = ({
  card,
  training,
  lv,
}: {
  card: Row;
  training: TrainingType;
  lv: 5;
}) => {
  switch (training) {
    case 'speed': {
      return (
        notTokui({ card, training, subUpStatus: 'speed', lv }) +
        notTokui({ card, training, subUpStatus: 'power', lv })
      );
    }
    case 'stamina': {
      return (
        notTokui({ card, training, subUpStatus: 'stamina', lv }) +
        notTokui({ card, training, subUpStatus: 'konjo', lv })
      );
    }
    case 'power': {
      return (
        notTokui({ card, training, subUpStatus: 'power', lv }) +
        notTokui({ card, training, subUpStatus: 'stamina', lv })
      );
    }
    case 'konjo': {
      return (
        notTokui({ card, training, subUpStatus: 'konjo', lv }) +
        notTokui({ card, training, subUpStatus: 'speed', lv }) +
        notTokui({ card, training, subUpStatus: 'power', lv })
      );
    }
    case 'kashikosa': {
      return (
        notTokui({ card, training, subUpStatus: 'kashikosa', lv }) +
        notTokui({ card, training, subUpStatus: 'speed', lv })
      );
    }
  }
};

// 例: 友情練習・Sp以外合計・Lv5・得意率無視
// G61
export const notTokuiRateExceptSpSumAndYujo = ({
  card,
  training,
  lv,
}: {
  card: Row;
  training: TrainingType;
  lv: 5;
}) => {
  return notTokuiExceptSpSum({ card, training, lv }) * yujoRate(card);
};

// 例: スピード練習・合計・Lv5・得意率無視
// G86
const notTokuiRateWithSpSumAndTraining = ({
  card,
  training,
  lv,
}: {
  card: Row;
  training: TrainingType;
  lv: 5;
}) => {
  switch (training) {
    case 'speed': {
      return (
        notTokui({ card, training, subUpStatus: 'speed', lv }) +
        notTokui({ card, training, subUpStatus: 'power', lv }) +
        notTokui({ card, training, subUpStatus: 'sp', lv })
      );
    }
    case 'stamina': {
      return (
        notTokui({ card, training, subUpStatus: 'stamina', lv }) +
        notTokui({ card, training, subUpStatus: 'konjo', lv }) +
        notTokui({ card, training, subUpStatus: 'sp', lv })
      );
    }
    case 'power': {
      return (
        notTokui({ card, training, subUpStatus: 'power', lv }) +
        notTokui({ card, training, subUpStatus: 'stamina', lv }) +
        notTokui({ card, training, subUpStatus: 'sp', lv })
      );
    }
    case 'konjo': {
      return (
        notTokui({ card, training, subUpStatus: 'konjo', lv }) +
        notTokui({ card, training, subUpStatus: 'speed', lv }) +
        notTokui({ card, training, subUpStatus: 'power', lv }) +
        notTokui({ card, training, subUpStatus: 'sp', lv })
      );
    }
    case 'kashikosa': {
      return (
        notTokui({ card, training, subUpStatus: 'kashikosa', lv }) +
        notTokui({ card, training, subUpStatus: 'speed', lv }) +
        notTokui({ card, training, subUpStatus: 'sp', lv })
      );
    }
  }
};

// 得意練習・Sp以外合計・Lv5・得意率加味
// G11
export const tokuiMainValue = ({
  card,
  training,
  lv,
}: {
  card: Row;
  training: TrainingType;
  lv: 5;
}) => {
  return (
    notTokuiRateExceptSpSumAndYujo({ card, training, lv }) *
      (60 - requireKizunaTurn(card)) * // TODO 育成ターン
      (tokuiOccurRate(card) / 100) +
    notTokuiExceptSpSum({ card, training, lv }) *
      requireKizunaTurn(card) *
      (tokuiOccurRate(card) / 100)
  );
};

const useCalc = ({
  selected,
  selectedTokui,
}: {
  selected: Row[][];
  selectedTokui?: Base;
}) => {
  const [colors, setColors] = useState<{ id: string; value: string }[]>([]);

  const results = useMemo(() => {
    const results = [];
    for (const cards of selected) {
      const tokuiMain = [];
      const tokuiOccur = [];
      for (const card of cards) {
        tokuiMain.push(
          tokuiMainValue({
            card,
            training: tokuiNameToTrainingType(
              card,
              selectedTokui
            ) as TrainingType,
            lv: 5,
          })
        );
        tokuiOccur.push(tokuiOccurRate(card));
      }
      let color = colors.find((c) => c.id === cards[0]['ID']);
      if (!color) {
        color = { id: cards[0]['ID'], value: getRandomColor() };
        setColors((p) => [...p, color!]);
      }
      results.push({
        tokuiMain,
        card: cards[0],
        tokuiOccur,
        borderColor: color.value,
      });
    }
    return results;
  }, [colors, selected, selectedTokui]);

  // <Tab>得意Sp抜Lv5期待値</Tab>
  // <Tab>得意練習出現率</Tab>
  // <Tab>スキル獲得率</Tab>
  // <Tab>レースボーナス</Tab>
  return results;
};

export default useCalc;
