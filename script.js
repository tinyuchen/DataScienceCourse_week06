const $ = (id) => document.getElementById(id);

const products = [
  { id: "p1", emoji: "🧸", name: {zh:"奶油米白針織外套", ja:"クリームニットカーデ", en:"Cream Knit Cardigan"}, price: 1280, desc: {zh:"柔軟親膚、日常百搭。", ja:"やわらかくて着回し抜群。", en:"Soft and easy to style."}},
  { id: "p2", emoji: "🌸", name: {zh:"櫻花粉百褶裙", ja:"サクラピンクプリーツ", en:"Sakura Pink Pleated Skirt"}, price: 980, desc: {zh:"甜美可愛，修飾比例。", ja:"甘くて可愛い、脚長効果。", en:"Sweet look with flattering fit."}},
  { id: "p3", emoji: "🎀", name: {zh:"緞帶雪紡上衣", ja:"リボンシフォン", en:"Ribbon Chiffon Top"}, price: 890, desc: {zh:"輕透飄逸，上班約會都OK。", ja:"軽やかで上品。", en:"Light and elegant."}},
];

let cart = [];
let lang = "zh";

const i18n = {
  zh: {
    nav_products:"商品", nav_about:"關於我們", nav_faq:"常見問題", nav_contact:"聯絡",
    hero_pill:"粉色×米白｜可愛日系穿搭",
    hero_title:"把日常穿成溫柔的樣子",
    hero_sub:"線上選物店（目前無實體店面），支援手機版瀏覽、可切換多語系，未來可擴充海外銷售。",
    hero_cta_primary:"逛逛新品", hero_cta_secondary:"了解結帳方式",
    stat_ship_k:"出貨", stat_ship_v:"台灣宅配/超取",
    stat_style_k:"風格", stat_style_v:"日系甜美可愛",
    stat_support_k:"支援", stat_support_v:"多語＋可擴充金流",
    products_title:"精選商品", products_sub:"示範商品卡片（可替換為真實商品與照片）。",
    about_title:"關於我們",
    about_p1:"我們是日系衣物線上選物品牌，主打粉色與米白的溫柔可愛風格。現階段沒有實體店面，專注於線上體驗與服務。",
    about_p2:"（作業提醒：公開網站不建議直接放客戶手機/私人信箱；可改用聯絡表單或商用信箱。）",
    faq_title:"常見問題（客戶提問）", faq_sub:"把客戶問題用「可執行方案」回答，並可做成回報內容。",
    faq_domain_q:"Q：網址可以用我自己的名稱嗎？要選哪一種網址？",
    faq_domain_a:"可以。建議用品牌/姓名的「好記」拼法作為網域（例如 sakurabeigecloset.com 或 tingyucloset.com）。若以台灣為主可加買 .tw；若要海外銷售優先 .com 或 .shop。可同時買多個網域，統一導向主站。",
    faq_host_q:"Q：主機放國外會對國外排名更好嗎？",
    faq_host_a:"主機地點不是「直接加分排名」的關鍵。更重要的是：網站速度、內容品質、語言/地區設定（hreflang）、外部連結與使用者體驗。若未來要同時服務台灣與海外，建議使用 CDN（如 Cloudflare）搭配穩定主機，讓海外也能快速載入。",
    faq_rank_q:"Q：我想排名到第一頁，要買廣告嗎？",
    faq_rank_a:"SEO（自然排名）需要時間與內容經營；廣告（Google/Meta）能快速帶流量，但不等於自然排名第一。最實務做法：短期用小額廣告測試熱賣品＋關鍵字；長期做 SEO（商品頁標題、描述、部落格內容、內外部連結、結構化資料）。",
    faq_pay_q:"Q：要怎麼讓客戶在網路上結帳？",
    faq_pay_a:"最快上線：用 Shopify / WooCommerce 這類電商系統，直接具備購物車、金流、物流、訂單管理。台灣常用金流：綠界/藍新；海外可用 Stripe/PayPal。若只做形象站，可先做「下單表單＋轉帳/LINE」過渡，之後再升級正式金流。",
    faq_lang_q:"Q：可以做多國語言嗎？",
    faq_lang_a:"可以。本頁面已示範語言切換（中文/日文/英文）。正式上線建議每種語言都有獨立網址或路徑（/en /ja），並設定 hreflang，避免搜尋引擎誤判語系。",
    contact_title:"聯絡我們", contact_sub:"示範聯絡表單：你可以改成串接 EmailJS、Google Form 或後端 API。",
    contact_name:"姓名", contact_email:"Email", contact_msg:"留言", contact_send:"送出（示範）",
    cart_title:"購物車", cart_total:"小計", cart_checkout:"前往結帳（示範）",
    cart_note:"這是前端示範版。正式結帳建議導入 Shopify/WooCommerce 或串接金流（綠界/藍新/Stripe）。",
    add_to_cart:"加入購物車",
    checkout_hint:"已示範送出！正式版可串接 EmailJS/Google Form/後端。"
  },
  ja: {
    nav_products:"商品", nav_about:"私たちについて", nav_faq:"よくある質問", nav_contact:"お問い合わせ",
    hero_pill:"ピンク×ベージュ｜かわいい日本風",
    hero_title:"日常をやさしく可愛く",
    hero_sub:"オンラインセレクトショップ（実店舗なし）。スマホ対応＆多言語切替。将来は海外販売にも拡張可能。",
    hero_cta_primary:"新作を見る", hero_cta_secondary:"決済について",
    stat_ship_k:"配送", stat_ship_v:"台湾：宅配/コンビニ受取",
    stat_style_k:"スタイル", stat_style_v:"甘め・かわいい",
    stat_support_k:"対応", stat_support_v:"多言語＋決済拡張",
    products_title:"おすすめ商品", products_sub:"サンプル商品カード（写真に差し替え可能）。",
    about_title:"私たちについて",
    about_p1:"ピンクとベージュを基調にした、やさしい日本風コーデのオンラインセレクト。",
    about_p2:"（公開サイトに個人の電話/メールを載せるのは推奨しません。）",
    faq_title:"よくある質問（お客様の質問）", faq_sub:"実行可能な提案として回答します。",
    faq_domain_q:"Q：自分の名前でURLを使えますか？どのドメインが良い？",
    faq_domain_a:"可能です。覚えやすいブランド名/名前で .com または .shop を推奨。台湾中心なら .tw も取得し、主ドメインへ統一転送。",
    faq_host_q:"Q：海外サーバーは海外SEOに有利？",
    faq_host_a:"サーバー所在地より、表示速度・内容品質・言語/地域設定（hreflang）などが重要。CDN利用がおすすめ。",
    faq_rank_q:"Q：検索1ページ目にしたい。広告は必要？",
    faq_rank_a:"広告は短期で流入を増やせますが自然検索1位とは別。短期は広告で検証、長期はSEO（商品ページ・記事・構造化データ）で強化。",
    faq_pay_q:"Q：オンライン決済はどうする？",
    faq_pay_a:"最速は Shopify / WooCommerce。台湾は緑界/藍新、海外は Stripe/PayPal など。まずは注文フォーム→後日正式決済でも可。",
    faq_lang_q:"Q：多言語にできますか？",
    faq_lang_a:"可能です。本ページで切替をデモ。正式運用では /en /ja などと hreflang を推奨。",
    contact_title:"お問い合わせ", contact_sub:"デモフォーム（EmailJS/Google Form などに接続可能）。",
    contact_name:"お名前", contact_email:"メール", contact_msg:"メッセージ", contact_send:"送信（デモ）",
    cart_title:"カート", cart_total:"小計", cart_checkout:"決済へ（デモ）",
    cart_note:"フロントデモです。本番は Shopify/WooCommerce や決済連携を推奨。",
    add_to_cart:"カートに追加",
    checkout_hint:"送信デモ完了。本番はフォーム連携を追加。"
  },
  en: {
    nav_products:"Products", nav_about:"About", nav_faq:"FAQ", nav_contact:"Contact",
    hero_pill:"Pink × Beige | Kawaii Japanese Style",
    hero_title:"Dress your day in soft sweetness",
    hero_sub:"Online select shop (no physical store). Mobile-friendly, multilingual, and expandable for global sales.",
    hero_cta_primary:"Shop new arrivals", hero_cta_secondary:"Checkout options",
    stat_ship_k:"Shipping", stat_ship_v:"TW delivery / pickup",
    stat_style_k:"Style", stat_style_v:"Kawaii & soft",
    stat_support_k:"Support", stat_support_v:"Multilang + payments",
    products_title:"Featured Items", products_sub:"Sample product cards (replace with real photos).",
    about_title:"About",
    about_p1:"An online Japanese-style clothing boutique with a pink & beige palette.",
    about_p2:"(Do not publish private phone/email on a public site. Use a contact form.)",
    faq_title:"FAQ (Client Questions)", faq_sub:"Answers as actionable plans.",
    faq_domain_q:"Q: Can I use my name as the domain? Which domain should I choose?",
    faq_domain_a:"Yes. Prefer a memorable brand/name with .com or .shop. Add .tw for Taiwan, and redirect all to the primary domain.",
    faq_host_q:"Q: Does overseas hosting improve overseas ranking?",
    faq_host_a:"Server location is not the main ranking factor. Speed, content, hreflang, and UX matter more. Use a CDN for global reach.",
    faq_rank_q:"Q: I want page-1 ranking. Do I need ads?",
    faq_rank_a:"Ads bring traffic fast but are different from organic ranking. Use ads short-term for validation; build SEO long-term with content and structured data.",
    faq_pay_q:"Q: How can customers checkout online?",
    faq_pay_a:"Fastest: Shopify/WooCommerce. TW: NewebPay/ECPay; global: Stripe/PayPal. Start with order form as a temporary solution if needed.",
    faq_lang_q:"Q: Can we do multilingual?",
    faq_lang_a:"Yes. This page demos language switching. For production, use /en /ja and hreflang tags.",
    contact_title:"Contact", contact_sub:"Demo form (can connect to EmailJS/Google Form).",
    contact_name:"Name", contact_email:"Email", contact_msg:"Message", contact_send:"Send (Demo)",
    cart_title:"Cart", cart_total:"Subtotal", cart_checkout:"Checkout (Demo)",
    cart_note:"Front-end demo. Use Shopify/WooCommerce or payment gateways in production.",
    add_to_cart:"Add to cart",
    checkout_hint:"Submitted (demo). Connect to a real form/service in production."
  }
};

function applyI18n() {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const k = el.getAttribute("data-i18n");
    const v = i18n[lang]?.[k];
    if (v) el.textContent = v;
  });
}

function renderProducts() {
  const grid = $("productGrid");
  grid.innerHTML = "";
  products.forEach(p => {
    const card = document.createElement("article");
    card.className = "product";
    card.innerHTML = `
      <div class="product__img" aria-hidden="true">${p.emoji}</div>
      <div class="product__name">${p.name[lang] || p.name.zh}</div>
      <div class="product__desc">${p.desc[lang] || p.desc.zh}</div>
      <div class="product__row">
        <div class="price">$${p.price}</div>
        <button class="btn" data-add="${p.id}">${i18n[lang].add_to_cart}</button>
      </div>
    `;
    grid.appendChild(card);
  });

  grid.querySelectorAll("[data-add]").forEach(btn => {
    btn.addEventListener("click", () => addToCart(btn.getAttribute("data-add")));
  });
}

function addToCart(id) {
  const p = products.find(x => x.id === id);
  if (!p) return;
  const found = cart.find(x => x.id === id);
  if (found) found.qty += 1;
  else cart.push({ id, qty: 1 });

  updateCartUI();
  openDrawer();
}

function removeFromCart(id) {
  cart = cart.filter(x => x.id !== id);
  updateCartUI();
}

function updateCartUI() {
  const count = cart.reduce((a,c)=>a+c.qty,0);
  $("cartCount").textContent = String(count);

  const items = $("cartItems");
  items.innerHTML = "";

  let total = 0;
  cart.forEach(ci => {
    const p = products.find(x => x.id === ci.id);
    if (!p) return;
    total += p.price * ci.qty;

    const row = document.createElement("div");
    row.className = "cartItem";
    row.innerHTML = `
      <div>
        <b>${p.name[lang] || p.name.zh}</b>
        <div class="muted">qty: ${ci.qty} · $${p.price} / item</div>
      </div>
      <div>
        <div style="text-align:right;"><b>$${p.price * ci.qty}</b></div>
        <button data-del="${ci.id}">Remove</button>
      </div>
    `;
    items.appendChild(row);
  });

  items.querySelectorAll("[data-del]").forEach(b=>{
    b.addEventListener("click", ()=>removeFromCart(b.getAttribute("data-del")));
  });

  $("cartTotal").textContent = `$${total}`;
}

function openDrawer() {
  $("drawer").setAttribute("aria-hidden", "false");
}
function closeDrawer() {
  $("drawer").setAttribute("aria-hidden", "true");
}

function init() {
  $("year").textContent = new Date().getFullYear();

  // mobile menu
  $("menuBtn").addEventListener("click", () => {
    const nav = $("nav");
    const open = nav.classList.toggle("nav--open");
    $("menuBtn").setAttribute("aria-expanded", open ? "true" : "false");
  });

  // language
  $("lang").addEventListener("change", (e) => {
    lang = e.target.value;
    applyI18n();
    renderProducts();
    updateCartUI();
  });

  // cart drawer
  $("cartBtn").addEventListener("click", openDrawer);
  $("closeDrawer").addEventListener("click", closeDrawer);
  $("drawer").addEventListener("click", (e) => {
    if (e.target.id === "drawer") closeDrawer();
  });

  // fake submit
  $("fakeSubmit").addEventListener("click", () => {
    $("submitHint").textContent = i18n[lang].checkout_hint;
  });

  // checkout
  $("checkoutBtn").addEventListener("click", () => {
    alert(
      "【結帳示範】\n\n" +
      "正式上線建議：\n" +
      "1) Shopify（最快）或 WooCommerce（可自架）\n" +
      "2) 台灣金流：綠界/藍新；海外：Stripe/PayPal\n" +
      "3) 串接物流與訂單管理\n"
    );
  });

  applyI18n();
  renderProducts();
  updateCartUI();
}

init();