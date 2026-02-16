# Deployment Instructions

## GitHub Repository
✅ **Repository created:** https://github.com/cocobot34/virtual-office
✅ **Code pushed to main branch**

## Deploy to Vercel

### Option 1: Via Vercel Dashboard (Recommended)
1. Go to https://vercel.com/new
2. Click "Import Project" or "Add New Project"
3. Select "Import Git Repository"
4. Search for or select `cocobot34/virtual-office`
5. Click "Import"
6. Vercel will auto-detect Next.js settings
7. Click "Deploy"
8. Wait for deployment to complete (~2 minutes)
9. Copy the production URL

### Option 2: Via Vercel CLI
If you're authenticated with Vercel CLI:

```bash
cd /Users/cocobot/.openclaw/workspace/virtual-office
vercel deploy --prod
```

### Option 3: Auto-Deploy Setup
Vercel can auto-deploy on every push to main:
1. Connect the repo via Vercel dashboard
2. Enable "Auto-Deploy" in project settings
3. Every push to main will trigger a new deployment

## Environment Variables
No environment variables needed for the MVP - it uses mock data.

## Post-Deployment
After deployment, the live URL will be something like:
`https://virtual-office-xxx.vercel.app`

You can set up a custom domain in Vercel project settings if desired.
