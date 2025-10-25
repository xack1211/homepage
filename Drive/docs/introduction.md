# File Management System 檔案管理系統

## Introduction 簡介

This is a modern web-based file management system that allows you to access and manage files from multiple storage providers in one unified interface. With support for Google Drive, local storage, and SFTP connections, it provides a seamless way to browse, preview, and download files across different storage solutions.

呢個係一個現代化嘅網頁檔案管理系統，可以喺同一個界面入面存取同管理唔同儲存服務嘅檔案。系統支援 Google Drive、本地儲存同 SFTP 連接，令你可以無縫咁喺唔同嘅儲存方案之間瀏覽、預覽同下載檔案。

## Key Features 主要功能

### Multiple Storage Providers 多個儲存供應商
- Google Drive integration (OAuth2.0)
  Google Drive 整合（OAuth2.0認證）
- Local disk access
  本地硬碟存取
- SFTP remote connections
  SFTP 遠端連接

### Modern Interface 現代化界面
- Clean, intuitive design
  簡潔、直覺嘅設計
- Dark/Light theme support
  支援深色/淺色主題
- Responsive layout
  自適應佈局

### Security 安全性
- JWT-based authentication
  基於 JWT 嘅身份驗證
- Role-based access control
  基於角色嘅存取控制
- Secure file transfers
  安全嘅檔案傳輸

### Admin Features 管理功能
- User management
  用戶管理
- Provider configuration
  供應商設定
- Access control
  存取控制

## Technical Stack 技術棧

### Frontend 前端
- React (Vite)
- Modern CSS (CSS Modules)
- React Router
- React Icons

### Backend 後端
- Vercel Serverless Functions
- PostgreSQL Database
- JWT Authentication
- Provider SDKs (Google Drive API, ssh2-sftp-client)

## Getting Started 入門指南

### Prerequisites 前置要求
- Node.js 16+
- PostgreSQL database
- Google OAuth2.0 credentials (for Google Drive)
  Google OAuth2.0 憑證（用於 Google Drive）
- SFTP server details (optional)
  SFTP 伺服器詳情（可選）

### Environment Variables 環境變數
```
DATABASE_URL=postgresql://...
JWT_SECRET=your-secret-key
GOOGLE_CLIENT_ID=your-client-id
GOOGLE_CLIENT_SECRET=your-client-secret
```

### Development Setup 開發環境設定

1. Clone the repository 克隆倉庫
```bash
git clone https://github.com/yourusername/file-manager.git
cd file-manager
```

2. Install dependencies 安裝依賴
```bash
npm install
```

3. Set up environment variables 設定環境變數
```bash
cp .env.example .env
# Edit .env with your credentials 用你嘅憑證編輯 .env
```

4. Run migrations 執行資料庫遷移
```bash
npm run migrate
```

5. Start development server 啟動開發伺服器
```bash
npm run dev
```

The application will be available at http://localhost:3000
應用程式將會喺 http://localhost:3000 運行

## Development Commands 開發命令

### `npm run dev`

Runs the app in development mode.
以開發模式運行應用程式。

### `npm run build`

Builds the app for production deployment.
構建應用程式以進行生產部署。

### `npm run preview`

Preview the production build locally.
在本地預覽生產構建。

## Deployment 部署

This application is designed to be deployed on Vercel with a PostgreSQL database. Follow these steps:

呢個應用程式設計係用嚟喺 Vercel 上面部署，並使用 PostgreSQL 資料庫。跟住以下步驟：

1. Push to GitHub 推送至 GitHub
2. Create new Vercel project 創建新嘅 Vercel 項目
3. Configure environment variables 配置環境變數
4. Deploy! 部署！

## Contributing 貢獻

We welcome contributions! Please see our contributing guidelines for more details.

歡迎貢獻！請參閱我哋嘅貢獻指南了解更多詳情。

## License 授權

MIT License - see LICENSE file for details.

MIT 授權 - 詳情請參閱 LICENSE 文件。