# AlphaCore Frontend Quiz

## 📁 專案結構

```
src/
├── app/                    # Next.js App Router
│   ├── page.tsx           # 登入頁面
│   ├── table/             # 訂單表格頁面
│   │   ├── page.tsx       # 主頁面
│   │   ├── layout.tsx     # 佈局
│   │   └── Result.tsx     # 表格結果組件
│   └── layout.tsx         # 根佈局
├── components/            # 可重用組件
│   ├── CusPagination.tsx  # 自定義分頁組件
│   └── Filter.tsx         # 篩選器組件
├── constants/             # 常數定義
│   └── options.ts         # 選項常數
├── hooks/                 # 自定義 Hooks
│   └── useGetOrders.ts    # 訂單資料獲取 Hook
├── services/              # API 服務
│   ├── apiClient.ts       # API 客戶端配置
│   ├── fetcher.ts         # SWR fetcher
│   └── login.ts           # 登入服務
├── types/                 # TypeScript 類型定義
│   ├── app/
│   │   └── table.ts       # 表格相關類型
│   └── components/
│       └── filter.ts      # 篩選組件類型
└── utils/                 # 工具函數
    ├── formatters.ts      # 格式化工具
    └── logout.ts          # 登出工具
```

## 🚀 快速開始

### 環境需求

- Node.js v20.12.1 或更高版本
- npm, yarn, pnpm 或 bun

### 安裝依賴

```bash
# 使用 npm
npm install

# 使用 yarn
yarn install

# 使用 pnpm
pnpm install

# 使用 bun
bun install
```

### 開發環境運行

```bash
# 使用 npm
npm run dev

# 使用 yarn
yarn dev

# 使用 pnpm
pnpm dev

# 使用 bun
bun dev
```

開啟 [http://localhost:3000](http://localhost:3000) 在瀏覽器中查看結果。

### 生產環境建置

```bash
# 建置專案
npm run build

# 啟動生產伺服器
npm run start
```

## 📝 可用的 Scripts

- `npm run dev` - 啟動開發伺服器
- `npm run build` - 建置生產版本
- `npm run start` - 啟動生產伺服器
- `npm run lint` - 執行 ESLint 檢查
- `npm run format` - 使用 Prettier 格式化程式碼
- `npm run format:check` - 檢查程式碼格式
- `npm run ci` - 執行 CI 檢查 (格式檢查 + Lint + 建置)
