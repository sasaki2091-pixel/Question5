// ===== 設定 =====
const names = [
"伏見商会 松尾 様",
"伏見商会 岡　孝信 様",
"有限会社伏見商会 今村大輔 様",
"株式会社ヤブ原福岡支店 牛島健裕 様",
"株式会社ヤヒロ 長野大輔 様",
"株式会社　オチアイ 原田　厚 様",
"（株）九州恵商会 原　広志 様",
"日曹商事 岩沢 様",
"ヤブ原 柴崎 様",
"（株）オチアイ 古賀和浩 様",
"株式会社茶甚 玉寄秀和 様",
"ニシイ 関野譲二 様",
"株式会社茶甚 喜納康太 様",
"ヤマエ久野株式会社 北崎　琢磨 様",
"ヤマエ久野(株) 太田ひかり 様",
"ヤマエ久野 松元　英樹 様",
"株式会社 オチアイ 野口東吾 様",
"株式会社ニシイ　大分営業所 園田亮 様",
"（株）熊井産業 島村 様",
"アビックス 高木順次 様",
"株式会社アビックス 小川大将 様",
"株式会社 三九商会 竹本慎治 様",
"（株）三九商会 藤野龍也 様",
"アビックス 髙﨑弘明 様",
"ニシイ 柴田英則 様",
"株式会社ニシイ 栗原　秀樹 様",
"金忠 有村忠士 様",
"オチアイ 陣内　均 様",
"（株）ニシイ　北九州支店第一グループ 岡田　賢弥 様",
"株式会社熊井産業 鵜川秀樹 様",
"新洋 森伊吹 様",
"株式会社　ニシイ　 筒井 様",
"（株）新洋 山内愼之介 様",
"（株）新洋 石原昌尚 様",
"株式会社アビックス 阪倉聖人 様",
"株式会社三九商会 田中　国敏 様",
"株式会社オチアイ 竹谷昇悟 様",
"九州恵商会 實本英治 様",
"株式会社マルシン 林　芳雄 様",
"株式会社アビックス 海老原光豊 様",
"株式会社オチアイ 米光勇樹 様",
"株式会社ニシイ 海切千怜 様",
"株式会社　ニシイ 原田　優貴 様",
"株式会社　茶甚 小山 幹太 様",
"株式会社マルシン 小牧　司 様",
"株式会社マルシン 福山修平 様",
"九州恵商会 井口翔平 様",
"（株）オチアイ 亀崎浩二 様",
"九州恵商会 山浦謙次 様",
"志岐産業株式会社 志岐和重 様",
"ヤヒロ 八尋大八 様",
"野原グループ 頼金　大起 様",
"九州恵商会 平野孝 様",
"マルシン 裏川照夫 様",
"野原グループ 上田和明 様",
"野原グループ 倉本 様",
"株式会社中園 中園将太 様",
"㈱中園 高瀬恵治 様",
];


const list = document.getElementById("list");
const startBtn = document.getElementById("startBtn");
const overlay = document.getElementById("winnerOverlay");
const winnerName = document.getElementById("winnerName");

// ===== リスト生成（無限スクロール用）=====
for (let i = 0; i < 10; i++) {
  names.forEach(name => {
    const div = document.createElement("div");
    div.className = "item";
    div.textContent = name;
    list.appendChild(div);
  });
}

let position = 0;
let speed = 300;
let timer = null;

// ===== スタート =====
startBtn.addEventListener("click", start);
function start() {
  clearInterval(timer);
  speed = 100;
  overlay.classList.add("hidden");

  const items = document.querySelectorAll(".item");
  const itemHeight = items[0].offsetHeight;

  // ランダムな開始位置
  const randomIndex = Math.floor(Math.random() * names.length);
  position = -randomIndex * itemHeight;
  list.style.top = position + "px";

  timer = setInterval(() => {
    position -= speed;
    list.style.top = position + "px";

    // 無限スクロール
    if (Math.abs(position) > list.offsetHeight / 2) {
      position = 0;
    }

    // 減速処理（変更なし）
    if (speed > 10) {
      speed *= 0.985;
    } else if (speed > 1) {
      speed *= 0.993;
    } else {
      // ===== 中央停止フェーズ（ここだけ修正） =====
      if (Math.abs(position % itemHeight) < speed) {
        clearInterval(timer);

        // ▼ ここでは一切 position を動かさない
        // ▼ すでに中央に来た瞬間なのでそのまま止める

        setTimeout(() => {
          decideWinner();
        }, 500);
      }
    }
  }, 16);
}

// function start() {
//   clearInterval(timer);
//   speed = 100;
//   overlay.classList.add("hidden");

//   const items = document.querySelectorAll(".item");
//   const itemHeight = items[0].offsetHeight;


// // ランダムな開始位置
// const randomIndex = Math.floor(Math.random() * names.length);
// position = -randomIndex * itemHeight;
// list.style.top = position + "px";

// timer = setInterval(() => {
//   position -= speed;
//   list.style.top = position + "px";

//   // 無限スクロール
//   if (Math.abs(position) > list.offsetHeight / 2) {
//     position = 0;
//   }

//   // 減速処理
//   if (speed > 10) {
//     speed *= 0.985;
//   } else if (speed > 1) {
//     speed *= 0.993;
//   } else {
//     // ===== 完全停止フェーズ =====
//     clearInterval(timer);

//     // ▼ 中央に一番近い行を計算
//     const offset = position % itemHeight;
//     position -= offset;

//     // ▼ ピタッと中央に吸着
//     list.style.top = position + "px";

//     // ▼「止まった感」を作る間
//     setTimeout(() => {
//       decideWinner();
//     }, 500);
//   }
// }, 16);
// }


// ===== 当選判定 =====
function decideWinner() {
  const frame = document.querySelector(".frame");
  const frameRect = frame.getBoundingClientRect();
  const lineY = frameRect.top + frameRect.height / 2;

  const items = document.querySelectorAll(".item");

  let closest = null;
  let minDiff = Infinity;

  items.forEach(item => {
    const rect = item.getBoundingClientRect();
    const center = rect.top + rect.height / 2;
    const diff = Math.abs(center - lineY);

    if (diff < minDiff) {
      minDiff = diff;
      closest = item;
    }
  });

  showWinner(closest.textContent);
}

// ===== 当選演出 =====
function showWinner(name) {
  winnerName.textContent = name;
  overlay.classList.remove("hidden");
}

