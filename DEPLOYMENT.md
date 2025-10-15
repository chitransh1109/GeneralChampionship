# Championship Vortex - Vercel Deployment Guide

This guide will help you deploy both the frontend and backend to Vercel.

## Project Structure

- **Frontend**: React + Vite application (root directory)
- **Backend**: Express.js + MongoDB API (backend directory)

## Prerequisites

- GitHub repository with your code
- Vercel account
- MongoDB Atlas account (already configured)

## Deployment Steps

### 1. Deploy Backend (API)

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Configure the project:
   - **Project Name**: `championship-backend` (or any name you prefer)
   - **Root Directory**: `backend`
   - **Framework Preset**: Other
   - **Build Command**: Leave empty
   - **Output Directory**: Leave empty

5. Add Environment Variables:
   - Click "Environment Variables"
   - Add the following:
     ```
     MONGODB_URI=mongodb+srv://championship_admin:teO738gZq4T3HIhb@championship.x0hqvmw.mongodb.net/championship?retryWrites=true&w=majority&appName=championship
     ```

6. Click "Deploy"
7. Once deployed, copy the deployment URL (e.g., `https://championship-backend.vercel.app`)

### 2. Deploy Frontend

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New" → "Project"
3. Import your GitHub repository AGAIN (yes, same repo)
4. Configure the project:
   - **Project Name**: `championship-frontend` (or any name you prefer)
   - **Root Directory**: `.` (root)
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

5. Add Environment Variables:
   - Click "Environment Variables"
   - Add the following:
     ```
     VITE_API_URL=https://your-backend-url.vercel.app/api
     ```
   - Replace `your-backend-url.vercel.app` with the URL from Step 1.7

6. Click "Deploy"

### 3. Update Backend CORS (if needed)

If you encounter CORS errors, update the backend `server.js` to allow your frontend domain:

```javascript
app.use(cors({
  origin: ['https://your-frontend-url.vercel.app', 'http://localhost:8080'],
  credentials: true
}));
```

## Environment Variables Reference

### Backend (.env)
```
PORT=5001
MONGODB_URI=mongodb+srv://championship_admin:teO738gZq4T3HIhb@championship.x0hqvmw.mongodb.net/championship?retryWrites=true&w=majority&appName=championship
```

### Frontend (.env)
```
VITE_API_URL=https://your-backend-url.vercel.app/api
```

## Verification

After deployment:

1. **Backend Health Check**: Visit `https://your-backend-url.vercel.app/api/health`
   - Should return: `{"ok": true, "mongo": true}`

2. **Frontend**: Visit `https://your-frontend-url.vercel.app`
   - All pages should load correctly
   - Admin panel should connect to the backend

## Troubleshooting

### Build Errors
- Check build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`

### API Connection Issues
- Verify `VITE_API_URL` is set correctly in frontend environment variables
- Check CORS settings in backend

### MongoDB Connection Issues
- Verify `MONGODB_URI` is set correctly in backend environment variables
- Ensure your MongoDB Atlas IP whitelist includes `0.0.0.0/0` for Vercel

## Auto-Deployment

Both projects are now set up for automatic deployment:
- Push to GitHub → Vercel automatically rebuilds and deploys
- Different branches can have different deployments (preview deployments)

## Important Notes

1. **Never commit .env files** - They are already in `.gitignore`
2. **Use Vercel Environment Variables** for all sensitive data
3. **Each deployment** (frontend and backend) is a separate Vercel project
4. **MongoDB Atlas** must whitelist `0.0.0.0/0` or Vercel's IP ranges

## Support

For issues:
- Check Vercel deployment logs
- Verify environment variables are set correctly
- Ensure MongoDB Atlas is accessible
