# Deployment Guide for New Emarald Frinters Website

This guide covers multiple deployment options for the Lanka Shipping website. Choose the platform that best fits your needs.

## Prerequisites

Before deploying, ensure:
- All code is committed to your Git repository
- The application builds successfully locally: `cd lanka-shipping && npm run build`
- You have accounts on your chosen deployment platform(s)

## Deployment Options

### Option 1: Vercel (Recommended - Easiest)

Vercel provides the fastest and easiest deployment for Vite applications with zero configuration.

#### Deploy via Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Navigate to the project directory:
   ```bash
   cd lanka-shipping
   ```

3. Deploy:
   ```bash
   vercel
   ```

4. Follow the prompts:
   - Set up and deploy? **Y**
   - Which scope? Select your account
   - Link to existing project? **N**
   - What's your project's name? **lanka-shipping** (or your choice)
   - In which directory is your code located? **.**
   - Want to override settings? **N**

5. For production deployment:
   ```bash
   vercel --prod
   ```

#### Deploy via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New Project"
3. Import your GitHub repository
4. Configure build settings:
   - **Framework Preset**: Vite
   - **Root Directory**: `lanka-shipping`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install --legacy-peer-deps`
5. Click "Deploy"

The `vercel.json` configuration file is already set up in the `lanka-shipping` directory.

### Option 2: Netlify

Netlify offers great features including form handling and serverless functions.

#### Deploy via Netlify CLI

1. Install Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```

2. Navigate to the project directory:
   ```bash
   cd lanka-shipping
   ```

3. Login to Netlify:
   ```bash
   netlify login
   ```

4. Initialize and deploy:
   ```bash
   netlify init
   ```

5. Follow the prompts to create a new site and deploy

#### Deploy via Netlify Dashboard

1. Go to [netlify.com](https://netlify.com) and sign in
2. Click "Add new site" → "Import an existing project"
3. Connect to your Git provider and select the repository
4. Configure build settings:
   - **Base directory**: `lanka-shipping`
   - **Build command**: `npm run build`
   - **Publish directory**: `lanka-shipping/dist`
   - **Build environment variables**: Add `NPM_FLAGS` with value `--legacy-peer-deps`
5. Click "Deploy site"

The `netlify.toml` configuration file is already set up in the `lanka-shipping` directory.

### Option 3: GitHub Pages

GitHub Pages is free and integrated with your GitHub repository.

#### Setup Instructions

1. **Enable GitHub Pages in Repository Settings**:
   - Go to your repository on GitHub
   - Navigate to Settings → Pages
   - Under "Build and deployment", select:
     - **Source**: GitHub Actions
   
2. **Trigger Deployment**:
   - The workflow is already configured in `.github/workflows/deploy-github-pages.yml`
   - Push to the `main` branch or manually trigger the workflow
   - Go to the "Actions" tab to monitor the deployment

3. **Configure Base Path** (if using repository name in URL):
   - If your site will be at `https://username.github.io/repository-name/`
   - Update the build command in the workflow to include base path:
     ```yaml
     - name: Build
       working-directory: ./lanka-shipping
       run: VITE_BASE_PATH=/repository-name/ npm run build
     ```

4. **Access Your Site**:
   - After successful deployment, your site will be available at:
     - `https://username.github.io/repository-name/` (for project sites)
     - `https://username.github.io/` (for user/org sites)

#### Custom Domain for GitHub Pages

1. Add a `CNAME` file in `lanka-shipping/public/` with your domain:
   ```
   yourdomain.com
   ```

2. Configure DNS settings at your domain registrar:
   - Add an `A` record pointing to GitHub's IPs:
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`
   - Or add a `CNAME` record pointing to `username.github.io`

3. Enable HTTPS in repository settings → Pages

## Environment Variables

For production deployments, configure these environment variables in your deployment platform:

### Required for Full Functionality

```bash
# API Configuration (if using backend)
VITE_API_URL=https://your-api-url.com/api

# Payment Gateway (PayHere for Sri Lanka)
VITE_PAYHERE_MERCHANT_ID=your_merchant_id
VITE_PAYHERE_MODE=live

# Google Maps (for location features)
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_key

# Analytics (optional)
VITE_GA_TRACKING_ID=your_ga_tracking_id
```

### Setting Environment Variables

**Vercel**:
- Dashboard: Settings → Environment Variables
- CLI: `vercel env add VITE_API_URL`

**Netlify**:
- Dashboard: Site settings → Environment variables
- CLI: `netlify env:set VITE_API_URL value`

**GitHub Pages**:
- Repository → Settings → Secrets and variables → Actions
- Add as secrets, then reference in workflow:
  ```yaml
  env:
    VITE_API_URL: ${{ secrets.VITE_API_URL }}
  ```

## Post-Deployment Checklist

After deployment, verify:

- [ ] Site loads correctly at the deployment URL
- [ ] All pages are accessible (Home, Services, Tracking, Quote, About, Contact, FAQ)
- [ ] Navigation works (both desktop and mobile menu)
- [ ] Forms work (contact form, quote calculator)
- [ ] Tracking feature works with sample tracking numbers
- [ ] Mobile responsiveness (test on different screen sizes)
- [ ] Images and assets load properly
- [ ] SSL certificate is active (HTTPS)

## Continuous Deployment

All three platforms support automatic deployments:

- **Vercel & Netlify**: Auto-deploy on every push to connected branch
- **GitHub Pages**: Auto-deploy via GitHub Actions workflow on push to `main`

To disable auto-deployment:
- **Vercel**: Dashboard → Settings → Git → Disable auto-deployment
- **Netlify**: Dashboard → Site settings → Build & deploy → Stop auto publishing
- **GitHub Pages**: Remove or disable the workflow file

## Troubleshooting

### Build Fails with Peer Dependency Errors

Ensure the install command uses `--legacy-peer-deps` flag:
- Vercel: Already configured in `vercel.json`
- Netlify: Already configured in `netlify.toml`
- GitHub Actions: Already configured in workflow

### 404 Errors on Page Refresh

This is normal for SPAs. The configuration files already include redirects:
- Vercel: `vercel.json` rewrites all routes to `index.html`
- Netlify: `netlify.toml` redirects all routes to `index.html`
- GitHub Pages: May need `.nojekyll` file (automatically handled by actions/configure-pages)

### Assets Not Loading

Check that the base path is correctly configured:
- For root deployments: `base: '/'`
- For subdirectory deployments: `base: '/your-repo-name/'`

### Environment Variables Not Working

Remember that Vite only exposes environment variables prefixed with `VITE_`:
- ✅ `VITE_API_URL`
- ❌ `API_URL`

## Performance Optimization

After deployment, consider:

1. **Enable Compression**: Already configured in Netlify headers
2. **Add Caching**: Configure in hosting platform settings
3. **Optimize Images**: Use WebP format and lazy loading
4. **Code Splitting**: Vite handles this automatically
5. **CDN**: Vercel and Netlify include CDN by default

## Monitoring

Set up monitoring for your production site:

1. **Uptime Monitoring**: Use services like UptimeRobot or Pingdom
2. **Analytics**: Configure Google Analytics (variable already in `.env.example`)
3. **Error Tracking**: Consider Sentry or similar service
4. **Performance**: Use Lighthouse CI or WebPageTest

## Support

For deployment issues:
- Check platform-specific documentation
- Review build logs in your deployment platform
- Ensure all prerequisites are met
- Verify environment variables are set correctly

## Quick Deploy Summary

| Platform | Time to Deploy | Difficulty | Cost | Best For |
|----------|---------------|------------|------|----------|
| Vercel | 5 minutes | ⭐ Easy | Free tier available | Quick deployments, preview URLs |
| Netlify | 5 minutes | ⭐ Easy | Free tier available | Form handling, serverless functions |
| GitHub Pages | 10 minutes | ⭐⭐ Medium | Free | GitHub-hosted projects |

Choose **Vercel** if you want the fastest deployment with excellent developer experience.
Choose **Netlify** if you need built-in form handling and serverless capabilities.
Choose **GitHub Pages** if you want free hosting integrated with your repository.

---

Happy deploying! 🚀
