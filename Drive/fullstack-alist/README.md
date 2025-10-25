# fullstack-alist

Minimal fullstack JavaScript file manager that supports multiple providers (Local disk, Raspberry Pi via SFTP, Google Drive stub).

Quick start (Windows PowerShell):

1. Server

```powershell
cd fullstack-alist/server
npm install
# create a config from the example and fill secrets
copy .\config.example.json .\config.json
# edit config.json to set localRoot and raspi/google credentials
npm start
```

Server runs on http://localhost:4000

2. Client

```powershell
cd fullstack-alist/client
npm install
npm run dev
```

Client runs on http://localho   st:5173

Notes
- Fill in Google OAuth and Raspi SFTP credentials in `server/config.json`.
- The Google Drive provider is implemented. After you create a Google OAuth client and paste clientId/clientSecret/redirectUri into `server/config.json` (copy from `config.example.json`), open the auth URL returned by `/api/gdrive/auth` to grant access. Tokens will be saved to `server/gdrive-tokens.json`.
- Token and config files are added to `.gitignore` by default; do not commit secrets.
- The local provider and Raspi SFTP basic listing/downloads are implemented.
