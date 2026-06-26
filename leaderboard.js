// ===== ハロプロ早押しクイズ：オンラインランキング（Firebase Firestore） =====
// このファイルは <script type="module"> で読み込む。
// 読み込み完了後に window.HaroLB が使えるようになり、harolb-ready イベントが発火する。
//
// ・window.HaroLB.submit(group, name, score) … スコアを登録（Promise）
// ・window.HaroLB.top(group, n)             … 上位n件を取得（Promise→配列）
//
// グループごとにコレクション（lb_mm, lb_ag …）を分けているので、
// クエリは「スコア降順で上位n件」だけ。複合インデックスの作成は不要。

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getFirestore, collection, addDoc, getDocs, query, orderBy, limit, serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// 公開してよい設定値（秘密ではない。安全性はFirestoreのアクセスルールで担保している）
const firebaseConfig = {
  apiKey: "AIzaSyA0UwQ6v_uXx5ym_ncIFTZr68ShTzJPBl4",
  authDomain: "haropro-intro-quiz.firebaseapp.com",
  projectId: "haropro-intro-quiz",
  storageBucket: "haropro-intro-quiz.firebasestorage.app",
  messagingSenderId: "894138844098",
  appId: "1:894138844098:web:96df6141b6c01774ab4c5b"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// グループキー → コレクション名
const colName = (group) => "lb_" + String(group).toLowerCase();

window.HaroLB = {
  // スコアを登録する。名前は12文字まで、スコアは0〜100000の整数に丸める（ルールに合わせる）
  async submit(group, name, score) {
    name = String(name || "").trim().slice(0, 12);
    score = Math.max(0, Math.min(100000, Math.round(Number(score) || 0)));
    if (name.length < 1) throw new Error("名前が空です");
    await addDoc(collection(db, colName(group)), {
      name: name,
      score: score,
      createdAt: serverTimestamp()
    });
  },
  // 上位n件をスコアの高い順で取得
  async top(group, n = 20) {
    const q = query(collection(db, colName(group)), orderBy("score", "desc"), limit(n));
    const snap = await getDocs(q);
    return snap.docs.map((d) => d.data());
  }
};

// 読み込み完了を通知（呼び出し側はこのイベントを待ってからUIを出す）
window.HaroLBReady = true;
window.dispatchEvent(new Event("harolb-ready"));
