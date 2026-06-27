# 🎓 Academic Map

**學術體系關係圖 (Academic System Relationship Map)**

一個基於 **SolidStart** 與 **Cytoscape.js** 構建的高效能學術領域關係視覺化平台。本專案旨在清晰呈現各學術學門、學系、研究方向之間的錯綜複雜關係（如先修關係、跨領域合作、隸屬架構等）。

## ✨ 核心特性

- ⚡ **極致效能**：基於 SolidJS 的細粒度響應式更新，即使處理大量學術節點也毫不卡頓。
- 🌐 **全端架構**：利用 SolidStart 的全端能力，輕鬆整合 API 路由與資料庫查詢。
- 🎨 **互動式畫布**：支援節點拖曳、縮放、自動物理佈局（COSE）與點擊選取。
- 📱 **響應式 UI**：整合 Tailwind CSS，配備動態側邊資訊欄，點擊節點即時展現詳細學術背景。

## 🛠️ 技術棧

- **前端框架**：[SolidJS](https://solidjs.com)
- **全端/路由框架**：[SolidStart](https://solidjs.com)
- **視覺化引擎**：[Cytoscape.js](https://cytoscape.org)
- **樣式設計**：[Tailwind CSS](https://tailwindcss.com)

## 🚀 快速開始

### 1. 複製專案與安裝依賴

```bash
# 複製此專案 (請替換為你的 repository URL)
git clone https://github.com
cd academic-map

# 使用 Bun 安裝套件
bun install
```

### 2. 開發環境啟動

啟動本地開發伺服器：

```bash
bun run dev
```
打開瀏覽器訪問 `http://localhost:3000` 即可看到關係圖。

### 3. 生產環境打包

```bash
# 打包專案
bun run build

# 本地預覽生產環境版本
bun start
```

## 📂 專案架構

```text
├── src/
│   ├── components/
│   │   └── AcademicMap.tsx    # 核心關係圖畫布與 Cytoscape 初始化元件
│   ├── routes/
│   │   ├── api/               # API 路由（未來可在此串接資料庫）
│   │   │   └── nodes.ts
│   │   └── index.tsx          # 網站主頁入口
│   ├── app.css                # 全域樣式與 Tailwind 設定
│   └── entry-client.tsx
│   └── entry-server.tsx
├── package.json
└── tailwind.config.js
```

## 📊 數據結構說明

專案內部的學術數據（節點與連線）主要依循以下格式：

```typescript
const elements = [
  // 節點 (Nodes)：代表學院、科系或知識點
  { data: { id: "math", label: "數學系" } },
  { data: { id: "cs", label: "計算機科學" } },
  
  // 連線 (Edges)：代表學術關聯、先修或應用關係
  { data: { id: "e1", source: "math", target: "cs", label: "基礎基礎" } }
];
```

## 🗺️ 未來展望

- [ ] 串接圖資料庫 (Graph Database) 如 Neo4j，以支援更龐大的學術網絡。
- [ ] 增加進階篩選功能（按學群、年份、學分權重過濾）。
- [ ] 支援 3D 視角切換 (整合 Cytoscape 3D 插件)。
