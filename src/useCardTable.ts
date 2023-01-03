import cardTable from '@src/json/card_table.json';
import { useMemo, useState } from 'react';

export interface Row {
  ID: string;
  レア度: string;
  Lv: string;
  二つ名: string;
  サポート名: string;
  得意トレ: string;
  グループ: string;
  特殊固有: string;
  友情ボナ: string;
  やる気効果: string;
  スピボナ: string;
  スタボナ: string;
  パワボナ: string;
  根性ボナ: string;
  賢さボナ: string;
  トレ効果: string;
  初期スピ: string;
  初期スタ: string;
  初期パワ: string;
  初期根性: string;
  初期賢さ: string;
  初期絆: string;
  レースボナ: string;
  ファンボナ: string;
  ヒントLv: string;
  ヒント率: string;
  得意率: string;
  イベ回復: string;
  イベ効果: string;
  失敗率: string;
  体力消費: string;
  Spボナ: string;
  友情回復: string;
  スキル個数: string;
  固有1: string;
  固有2: string;
  固有1効果量: string;
  固有2効果量: string;
}

const useCardTable = () => {
  const [selectedRare, setSelectedRare] = useState<string>();
  const [selectedSpecialtyTraining, setSpecialtyTraining] = useState<string>();
  const [selectedSupportName, setSupportName] = useState<string>();
  const [selectedOtherName, setOtherName] = useState<string>();
  const [selectedTrainingType, setTrainingType] = useState<string>();
  const [selectedGroupSpecialtyTraining, setGroupSpecialtyTraining] =
    useState<string>();
  const [selectedPeculiar, setPeculiar] = useState<string>('');

  const rares = useMemo(() => {
    return Array.from(new Set(cardTable.map((c) => c['レア度'])));
  }, []);

  const specialtyTrainings = useMemo(() => {
    return ['スピード', 'スタミナ', 'パワー', '賢さ', '友人', 'グループ'];
  }, []);

  const groupSpecialtyTrainings = useMemo(() => {
    return ['スピード', 'スタミナ', 'パワー', '賢さ'];
  }, []);

  const supportNames = useMemo(() => {
    return Array.from(
      new Set(
        cardTable
          .filter((c) => selectedRare === c['レア度'])
          .filter((c) => selectedSpecialtyTraining === c['得意トレ'])
          .map((c) => c['サポート名'])
      )
    );
  }, [selectedRare, selectedSpecialtyTraining]);

  const otherNames = useMemo(() => {
    return Array.from(
      new Set(
        cardTable
          .filter((c) => selectedRare === c['レア度'])
          .filter((c) => selectedSpecialtyTraining === c['得意トレ'])
          .filter((c) => selectedSupportName === c['サポート名'])
          .map((c) => c['二つ名'])
      )
    );
  }, [selectedRare, selectedSpecialtyTraining, selectedSupportName]);

  const peculiars = useMemo(() => {
    return Array.from(
      new Set(
        cardTable
          .filter((c) => selectedRare === c['レア度'])
          .filter((c) => selectedSpecialtyTraining === c['得意トレ'])
          .filter((c) => selectedSupportName === c['サポート名'])
          .filter((c) => selectedOtherName === c['二つ名'])
          .map((c) => c['特殊固有'])
          .filter((c) => c)
      )
    );
  }, [
    selectedOtherName,
    selectedRare,
    selectedSpecialtyTraining,
    selectedSupportName,
  ]);

  const selected = useMemo(() => {
    const target = cardTable
      .filter((c) => selectedSupportName === c['サポート名'])
      .filter((c) => selectedOtherName === c['二つ名'])
      .filter((c) => selectedPeculiar === c['特殊固有']);
    return target[target.length - 1];
  }, [selectedOtherName, selectedPeculiar, selectedSupportName]);

  const trainingTypes = [
    'スピメインLv1',
    'スピメインLv2',
    'スピメインLv3',
    'スピメインLv4',
    'スピメインLv5',
    'スピサブ1Lv1',
    'スピサブ1Lv2',
    'スピサブ1Lv3',
    'スピサブ1Lv4',
    'スピサブ1Lv5',
    'スピサブ2Lv1',
    'スピサブ2Lv2',
    'スピサブ2Lv3',
    'スピサブ2Lv4',
    'スピサブ2Lv5',
    'スピ合計値Lv1',
    'スピ合計値Lv2',
    'スピ合計値Lv3',
    'スピ合計値Lv4',
    'スピ合計値Lv5',
    'スタメインLv1',
    'スタメインLv2',
    'スタメインLv3',
    'スタメインLv4',
    'スタメインLv5',
    'スタサブ1Lv1',
    'スタサブ1Lv2',
    'スタサブ1Lv3',
    'スタサブ1Lv4',
    'スタサブ1Lv5',
    'スタサブ2Lv1',
    'スタサブ2Lv2',
    'スタサブ2Lv3',
    'スタサブ2Lv4',
    'スタサブ2Lv5',
    'スタ合計値Lv1',
    'スタ合計値Lv2',
    'スタ合計値Lv3',
    'スタ合計値Lv4',
    'スタ合計値Lv5',
    'パワメインLv1',
    'パワメインLv2',
    'パワメインLv3',
    'パワメインLv4',
    'パワメインLv5',
    'パワサブ1Lv1',
    'パワサブ1Lv2',
    'パワサブ1Lv3',
    'パワサブ1Lv4',
    'パワサブ1Lv5',
    'パワサブ2Lv1',
    'パワサブ2Lv2',
    'パワサブ2Lv3',
    'パワサブ2Lv4',
    'パワサブ2Lv5',
    'パワ合計値Lv1',
    'パワ合計値Lv2',
    'パワ合計値Lv3',
    'パワ合計値Lv4',
    'パワ合計値Lv5',
    '根性メインLv1',
    '根性メインLv2',
    '根性メインLv3',
    '根性メインLv4',
    '根性メインLv5',
    '根性サブ1Lv1',
    '根性サブ1Lv2',
    '根性サブ1Lv3',
    '根性サブ1Lv4',
    '根性サブ1Lv5',
    '根性サブ2Lv1',
    '根性サブ2Lv2',
    '根性サブ2Lv3',
    '根性サブ2Lv4',
    '根性サブ2Lv5',
    '根性サブ3Lv1',
    '根性サブ3Lv2',
    '根性サブ3Lv3',
    '根性サブ3Lv4',
    '根性サブ3Lv5',
    '根性合計値Lv1',
    '根性合計値Lv2',
    '根性合計値Lv3',
    '根性合計値Lv4',
    '根性合計値Lv5',
    '賢さメインLv1',
    '賢さメインLv2',
    '賢さメインLv3',
    '賢さメインLv4',
    '賢さメインLv5',
    '賢さサブ1Lv1',
    '賢さサブ1Lv2',
    '賢さサブ1Lv3',
    '賢さサブ1Lv4',
    '賢さサブ1Lv5',
    '賢さサブ2Lv1',
    '賢さサブ2Lv2',
    '賢さサブ2Lv3',
    '賢さサブ2Lv4',
    '賢さサブ2Lv5',
    '賢さ合計値Lv1',
    '賢さ合計値Lv2',
    '賢さ合計値Lv3',
    '賢さ合計値Lv4',
    '賢さ合計値Lv5',
    '友情メインLv1',
    '友情メインLv2',
    '友情メインLv3',
    '友情メインLv4',
    '友情メインLv5',
    '友情サブ1Lv1',
    '友情サブ1Lv2',
    '友情サブ1Lv3',
    '友情サブ1Lv4',
    '友情サブ1Lv5',
    '友情サブ2Lv1',
    '友情サブ2Lv2',
    '友情サブ2Lv3',
    '友情サブ2Lv4',
    '友情サブ2Lv5',
    '友情サブ3Lv1',
    '友情サブ3Lv2',
    '友情サブ3Lv3',
    '友情サブ3Lv4',
    '友情サブ3Lv5',
    '友情合計値Lv1',
    '友情合計値Lv2',
    '友情合計値Lv3',
    '友情合計値Lv4',
    '友情合計値Lv5',
    'スピメインLv1期待値',
    'スピメインLv2期待値',
    'スピメインLv3期待値',
    'スピメインLv4期待値',
    'スピメインLv5期待値',
    'スピサブ1Lv1期待値',
    'スピサブ1Lv2期待値',
    'スピサブ1Lv3期待値',
    'スピサブ1Lv4期待値',
    'スピサブ1Lv5期待値',
    'スピサブ2Lv1期待値',
    'スピサブ2Lv2期待値',
    'スピサブ2Lv3期待値',
    'スピサブ2Lv4期待値',
    'スピサブ2Lv5期待値',
    'スピ合計値Lv1期待値',
    'スピ合計値Lv2期待値',
    'スピ合計値Lv3期待値',
    'スピ合計値Lv4期待値',
    'スピ合計値Lv5期待値',
    'スタメインLv1期待値',
    'スタメインLv2期待値',
    'スタメインLv3期待値',
    'スタメインLv4期待値',
    'スタメインLv5期待値',
    'スタサブ1Lv1期待値',
    'スタサブ1Lv2期待値',
    'スタサブ1Lv3期待値',
    'スタサブ1Lv4期待値',
    'スタサブ1Lv5期待値',
    'スタサブ2Lv1期待値',
    'スタサブ2Lv2期待値',
    'スタサブ2Lv3期待値',
    'スタサブ2Lv4期待値',
    'スタサブ2Lv5期待値',
    'スタ合計値Lv1期待値',
    'スタ合計値Lv2期待値',
    'スタ合計値Lv3期待値',
    'スタ合計値Lv4期待値',
    'スタ合計値Lv5期待値',
    'パワメインLv1期待値',
    'パワメインLv2期待値',
    'パワメインLv3期待値',
    'パワメインLv4期待値',
    'パワメインLv5期待値',
    'パワサブ1Lv1期待値',
    'パワサブ1Lv2期待値',
    'パワサブ1Lv3期待値',
    'パワサブ1Lv4期待値',
    'パワサブ1Lv5期待値',
    'パワサブ2Lv1期待値',
    'パワサブ2Lv2期待値',
    'パワサブ2Lv3期待値',
    'パワサブ2Lv4期待値',
    'パワサブ2Lv5期待値',
    'パワ合計値Lv1期待値',
    'パワ合計値Lv2期待値',
    'パワ合計値Lv3期待値',
    'パワ合計値Lv4期待値',
    'パワ合計値Lv5期待値',
    '根性メインLv1期待値',
    '根性メインLv2期待値',
    '根性メインLv3期待値',
    '根性メインLv4期待値',
    '根性メインLv5期待値',
    '根性サブ1Lv1期待値',
    '根性サブ1Lv2期待値',
    '根性サブ1Lv3期待値',
    '根性サブ1Lv4期待値',
    '根性サブ1Lv5期待値',
    '根性サブ2Lv1期待値',
    '根性サブ2Lv2期待値',
    '根性サブ2Lv3期待値',
    '根性サブ2Lv4期待値',
    '根性サブ2Lv5期待値',
    '根性サブ3Lv1期待値',
    '根性サブ3Lv2期待値',
    '根性サブ3Lv3期待値',
    '根性サブ3Lv4期待値',
    '根性サブ3Lv5期待値',
    '根性合計値Lv1期待値',
    '根性合計値Lv2期待値',
    '根性合計値Lv3期待値',
    '根性合計値Lv4期待値',
    '根性合計値Lv5期待値',
    '賢さメインLv1期待値',
    '賢さメインLv2期待値',
    '賢さメインLv3期待値',
    '賢さメインLv4期待値',
    '賢さメインLv5期待値',
    '賢さサブ1Lv1期待値',
    '賢さサブ1Lv2期待値',
    '賢さサブ1Lv3期待値',
    '賢さサブ1Lv4期待値',
    '賢さサブ1Lv5期待値',
    '賢さサブ2Lv1期待値',
    '賢さサブ2Lv2期待値',
    '賢さサブ2Lv3期待値',
    '賢さサブ2Lv4期待値',
    '賢さサブ2Lv5期待値',
    '賢さ合計値Lv1期待値',
    '賢さ合計値Lv2期待値',
    '賢さ合計値Lv3期待値',
    '賢さ合計値Lv4期待値',
    '賢さ合計値Lv5期待値',
    '得意メインLv1期待値',
    '得意メインLv2期待値',
    '得意メインLv3期待値',
    '得意メインLv4期待値',
    '得意メインLv5期待値',
    '得意サブ1Lv1期待値',
    '得意サブ1Lv2期待値',
    '得意サブ1Lv3期待値',
    '得意サブ1Lv4期待値',
    '得意サブ1Lv5期待値',
    '得意サブ2Lv1期待値',
    '得意サブ2Lv2期待値',
    '得意サブ2Lv3期待値',
    '得意サブ2Lv4期待値',
    '得意サブ2Lv5期待値',
    '得意サブ3Lv1期待値',
    '得意サブ3Lv2期待値',
    '得意サブ3Lv3期待値',
    '得意サブ3Lv4期待値',
    '得意サブ3Lv5期待値',
    '得意合計値Lv1期待値',
    '得意合計値Lv2期待値',
    '得意合計値Lv3期待値',
    '得意合計値Lv4期待値',
    '得意合計値Lv5期待値',
    'スピード期待値Lv1',
    'スピード期待値Lv2',
    'スピード期待値Lv3',
    'スピード期待値Lv4',
    'スピード期待値Lv5',
    'スタミナ期待値Lv1',
    'スタミナ期待値Lv2',
    'スタミナ期待値Lv3',
    'スタミナ期待値Lv4',
    'スタミナ期待値Lv5',
    'パワー期待値Lv1',
    'パワー期待値Lv2',
    'パワー期待値Lv3',
    'パワー期待値Lv4',
    'パワー期待値Lv5',
    '根性期待値Lv1',
    '根性期待値Lv2',
    '根性期待値Lv3',
    '根性期待値Lv4',
    '根性期待値Lv5',
    '賢さ期待値Lv1',
    '賢さ期待値Lv2',
    '賢さ期待値Lv3',
    '賢さ期待値Lv4',
    '賢さ期待値Lv5',
    'Sp期待値Lv1',
    'Sp期待値Lv2',
    'Sp期待値Lv3',
    'Sp期待値Lv4',
    'Sp期待値Lv5',
    '得意外期待値Lv1',
    '得意外期待値Lv2',
    '得意外期待値Lv3',
    '得意外期待値Lv4',
    '得意外期待値Lv5',
    '得意値',
    '得意練出現率',
    '非得意練出現率',
    'ヒント率',
    'スキル獲得率',
    '必要絆',
    '絆必要ターン',
  ];

  return {
    cardTable,
    selected,
    rares,
    specialtyTrainings,
    supportNames,
    otherNames,
    trainingTypes,
    groupSpecialtyTrainings,
    peculiars,
    selectedRare,
    setSelectedRare,
    selectedSpecialtyTraining,
    setSpecialtyTraining,
    selectedSupportName,
    setSupportName,
    selectedOtherName,
    setOtherName,
    selectedTrainingType,
    setTrainingType,
    selectedGroupSpecialtyTraining,
    setGroupSpecialtyTraining,
    selectedPeculiar,
    setPeculiar,
  };
};

export default useCardTable;
