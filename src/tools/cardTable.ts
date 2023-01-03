import { parse } from 'fast-csv';
import * as fs from 'fs';
import * as path from 'path';

interface Row {
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

const cardTable = async () => {
  const result: Row[] = [];
  await new Promise((resolve, reject) => {
    const csvStr = fs.readFileSync(path.join(__dirname, 'card_table.csv'));
    const stream = parse({ headers: true, skipRows: 0 })
      .on('error', (error) => reject(error))
      .on('data', (row) => result.push(row))
      .on('end', () => resolve(undefined));
    stream.write(csvStr);
    stream.end();
  });

  fs.writeFileSync(
    path.join(__dirname, '../card_table.json'),
    JSON.stringify(result)
  );
};

cardTable();
