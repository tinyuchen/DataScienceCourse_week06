# 實務初階2｜RWD 網頁 + APP（PWA/APK）＋商品後台同步

## 1. 專案簡介
本專案為「日系衣物網站」的 RWD 響應式網站，並可打包成手機 APP（PWA / Android APK）。  
為解決「網站與 APP 內容無法同步」的痛點，本專案採用「單一資料來源」策略：  
**客戶只需要更新後台（Google Sheet），網站與 APP 即可同步更新商品。**

---

## 2. 展示連結（必填）
- GitHub Repo：https://github.com/tinyuchen/DataScienceCourse_week06
- GitHub Pages（網站）：https://tinyuchen.github.io/DataScienceCourse_week06/
- PWA 安裝：https://tinyuchen.github.io/DataScienceCourse_week06/
- APK 下載位置：https://github.com/tinyuchen/DataScienceCourse_week06/releases/tag/ver0

---

## 3. 客戶需求與解決方案（需求分析）
### 3.1 客戶需求
1) 網站風格：粉色＋米白、日系可愛風。  
2) 手機可用：需要 RWD，手機看不會跑版。  
3) 想要「像 APP 一樣」：手機可加入主畫面、可打包 APK。  
4) 客戶不會操作網站後台：希望能自己上架商品與照片。  
5) 同一份商品內容要同步到網站與 APP，不想改兩次。

### 3.2 解決方案
- **RWD 網站**：純 HTML/CSS/JS，使用斷點設計（桌機/平板/手機）完成版面自動適配。  
- **APP（PWA + APK）**：加入 Web App Manifest + Service Worker，可安裝到手機主畫面；並使用 PWABuilder 打包 Android APK。  
- **商品後台同步**：以 Google Sheet 作為簡易後台（客戶只需填表格即可上架/下架），並由 GitHub Actions 定期同步產生 `data/products.json`，網站與 APP 都讀取同一份 JSON 資料。

---

## 4. 專案結構
/index.html
/styles.css
/script.js
/manifest.webmanifest
/service-worker.js
/data/products.json
/scripts/sync_products.py
/.github/workflows/sync_products.yml
/assets/icons/icon-192.png
/assets/icons/icon-512.png
/assets/screenshots/screen1.png
/assets/screenshots/screen2.png

---

## 5. 商品後台（Google Sheet）使用方式（必交：後台帳密或網址）
### 5.1 後台網址（Demo）
- Google Sheet 後台網址：【貼上 Google Sheet 連結】
- Demo 帳號：【demo@gmail.com】
- Demo 密碼：【demo_password】

> Demo 帳號僅供作業驗收使用，驗收完成可更改密碼或移除分享。

### 5.2 Sheet 欄位（Products 工作表）
後台以 `Products` 工作表管理商品，欄位如下：

| 欄位 | 說明 |
|---|---|
| id | 商品 ID（p001/p002…） |
| name_zh / name_ja / name_en | 商品名稱（中/日/英） |
| price | 價格（數字） |
| desc_zh / desc_ja / desc_en | 商品描述（中/日/英） |
| image_url | 商品圖片網址 |
| active | 1=上架，0=下架 |

### 5.3 更新流程（客戶操作）
1) 客戶登入 Demo 帳號 → 打開 Google Sheet  
2) 新增或修改商品列  
3) `active=1` 上架、`active=0` 下架  
4) 等待 GitHub Actions 同步（或手動 Run）  
5) 網站與 APP 會自動更新商品

---

## 6. GitHub Actions 同步機制（網站與 APP 同步的核心）
### 6.1 功能
- Workflow：`Sync Products from Google Sheet`  
- 會定期下載 Google Sheet 發佈的 CSV，轉成 `data/products.json` 並 commit 回 repo。

### 6.2 需要設定的 Secret
Repo → Settings → Secrets and variables → Actions  
新增：
- `SHEET_CSV_URL`：Google Sheet「發佈到網路（CSV）」的網址

### 6.3 手動同步
Repo → Actions → Sync Products from Google Sheet → Run workflow

---

## 7. PWA / APK（APP）說明
### 7.1 PWA 安裝
- Android：Chrome 開啟 Pages 網址 → 右上角 ⋮ → Install app / 加到主畫面  
- iPhone：Safari 開啟 Pages 網址 → 分享 → 加入主畫面

### 7.2 APK 打包（PWABuilder）
1) 前往 PWABuilder：https://www.pwabuilder.com/  
2) 貼上 GitHub Pages 網址 → Report Card  
3) 確認 Manifest 與 Service Worker 皆通過  
4) 下載 Android Test Package（APK）  
5) 下載後上傳到 GitHub Release 或 Google Drive，並在本 README 填上 APK 連結

---

## 8. RWD 檢查項目
- 桌機：三欄商品卡、上方導覽列完整顯示  
- 平板：兩欄商品卡  
- 手機：單欄商品卡、導覽列改為漢堡選單  

---

## 9. 已完成項目（交付核對）
- [x] RWD 網頁（GitHub Pages 可瀏覽）  
- [x] 商品後台（Google Sheet）可操作  
- [x] GitHub Actions 同步 `data/products.json`  
- [x] 網站與 APP 讀取同一份商品資料（同步更新）  
- [x] PWA（manifest + service worker）可安裝  
- [x] APK（PWABuilder 打包）可下載並安裝（或提供下載連結）

---

## 10. 備註（風險與建議）
- Google Sheet 發佈的 CSV 是「公開可讀」，請勿放個資（電話、地址等）。  
- 若要正式營運：建議改用真正後台（例如 Shopify / WooCommerce / Firebase）並加上正式金流。  
- GitHub Pages 部署若失敗，可加 `.nojekyll` 停用 Jekyll。
