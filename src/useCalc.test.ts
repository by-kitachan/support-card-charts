import { tokuiMainValue } from './useCalc';
import cardTable from './json/card_table.json';

// const id = '鼓動が速まるクールダウン45';
const id = '爽快！ウイニングショット！50';
const target = cardTable.find((c) => c['ID'] === id)!;

test('得意練習 Sp以外合計 Lv5 得意率加味', () => {
  const result = tokuiMainValue({
    card: target,
    training: 'konjo',
    lv: 5,
  });
  // const result = notTokuiExceptSpSumAndYujo({
  //   card: target,
  //   training: 'speed',
  //   lv: 5,
  // });
  // const result = notTokui({
  //   card: target,
  //   training: 'speed',
  //   subUpStatus: 'sp',
  //   lv: 5,
  // });
  // expect(Math.round(result * 100) / 100).toBeCloseTo(439.08);
  expect(result).toBeCloseTo(6.804);
});

// test('得意練出現率', () => {
//   const result = tokuiOccurRate(target);
//   expect(Math.round(result * 100) / 100).toBeCloseTo(23.08);
// });
