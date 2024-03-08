# 安裝步驟與 push 到 GitHub

## 安裝步驟

### 1. 複製專案到自己的電腦資料夾：

```bash
git clone https://github.com/pophoan/mfee44-final_project_esp.git
```

### 2. 建立自己的開發分支（命名規則：自己的名字，例如：hong）：
   
```bash
git checkout -b 自己的名字
```

### 3. 推送到 GitHub（推送的是自己的分支）：
```bash
git push -u origin 自己分支名
```


# 接著測試client環境（確保自己在client的終端機）

### 1.下載 package.json 的數據包回來：
```bash
npm i
```

### 2.執行環境：
```bash
npm run dev
```

### 3.查看網址能否正常顯示畫面：

<img width="1179" alt="image" src="https://github.com/pophoan/mfee44-final_project_esp/assets/138667312/0a60e6a0-399a-47f5-8062-a2d28c38a9f0">









# 專案規則 client（前端部分）

### 1. /components 資料夾
大家管理自己開發頁面的組件，若有需要套用他人的組件，請與對方溝通了解該組件功能，確認可以在其他頁面套用才套到自己的頁面。
資料夾命名規則：例如購物車 = myCart/


<img width="414" alt="image" src="https://github.com/pophoan/mfee44-final_project_esp/assets/138667312/669ef6fa-a0c2-41f3-913b-0f3b9a840cd1">


### 2. /pages 資料夾
管理自己頁面 layout，拼湊自己 components 組件在頁面等等。
資料夾命名規則：例如購物車 = cart/；已經有幫大家先建立基本的資料夾了。


<img width="424" alt="image" src="https://github.com/pophoan/mfee44-final_project_esp/assets/138667312/4273d10c-c0c0-49e9-9756-124ed1adee89">


### 3. 以下為公共資料盡量不要在自己的分支動，若有需要更改裡面文件內容，跟吉鴻溝通，由他統一將資料更新的 main 分支，避免公共資料污染與衝突。


/pages/_app.js


/styles/globals.scss


/components/layout/default-layout


### 4.樣式指南
http://localhost:3000/style-guide 這個是我們當初 figma 建立的公用樣式；色票/背景色/字體 h1~h6 已經寫在 globals.scss 全域下了，頁面上直接 className 套用就會有效果。


<img width="1183" alt="image" src="https://github.com/pophoan/mfee44-final_project_esp/assets/138667312/1d432f51-d875-463b-9b2c-324c3bcb7f71">

### 5. SCSS and CSS的 class(react叫className)命名規範
請使用烤肉串命名法命名,烤肉串命名（Kebab case）是一種命名規範，常用於文件名稱、CSS類名、URL等。在烤肉串命名中，單詞之間使用連字符（-）來連接，所有字母都小寫。這種命名法的名稱來自於其外觀類似於串在烤肉串上的肉塊，每個單詞就像是串在一起的肉塊，而連字符（-）則是肉串之間的空隙。
ex: cart-container or container-cart

### 6. 資料庫欄位 命名規範
資料庫欄位設計請使用 "蛇行命名（Snake case）"
蛇行命名是一種在編程和文件命名中常見的命名規範，特點是單詞之間使用下劃線（_）來連接，且所有字母通常都小寫。這種命名方法因其外觀類似於蛇的蜿蜒前進，而得名蛇行命名。

在資料庫設計中，蛇行命名被用於表名和字段名，以增強SQL查詢的可讀性。例如：user_id, account_balance。

