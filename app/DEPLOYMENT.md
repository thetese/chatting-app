# Deployment Guide

This guide covers how to deploy SocialHub to production.

## Prerequisites

- Node.js and npm installed
- Git account
- A backend server (Node.js, Python, or other)
- Database setup (PostgreSQL, MongoDB, etc.)
- CDN or static file hosting (S3, Cloudflare, etc.)

## 1. Prepare for Production

### Update Environment Variables

Create a `.env.production` file:

```
REACT_APP_API_URL=https://api.yourdomain.com
REACT_APP_ENV=production
```

### Optimize the Build

```bash
npm run build
```

This creates an optimized production build in the `build/` folder.

## 2. Deployment Options

### Option A: Netlify (Recommended for Beginners)

1. **Connect Repository**
   ```bash
   # Push your code to GitHub, GitLab, or Bitbucket
   git push origin main
   ```

2. **Create Netlify Account**
   - Go to https://netlify.com
   - Sign up/login with your Git provider

3. **Deploy**
   - Click "New site from Git"
   - Select your repository
   - Build command: `npm run build`
   - Publish directory: `build`
   - Click "Deploy"

4. **Configure Domain**
   - Go to Site settings
   - Add your custom domain
   - Configure DNS

5. **Set Environment Variables**
   - Site settings → Build & deploy → Environment
   - Add your production variables

### Option B: Vercel

1. **Connect Repository**
   ```bash
   npm install -g vercel
   vercel
   ```

2. **Follow prompts**
   - Select project directory
   - Confirm build settings
   - Set environment variables

3. **Deploy**
   - Your site is live at `https://your-project.vercel.app`

### Option C: AWS S3 + CloudFront

1. **Build the App**
   ```bash
   npm run build
   ```

2. **Create S3 Bucket**
   - Go to AWS S3 console
   - Create bucket (e.g., `socialhub-frontend`)
   - Enable static website hosting

3. **Upload Files**
   ```bash
   aws s3 sync build/ s3://socialhub-frontend/
   ```

4. **Create CloudFront Distribution**
   - Source domain: Your S3 bucket
   - Default root object: `index.html`
   - Create distribution

5. **Configure Domain**
   - Add custom domain via Route 53

### Option D: Docker + Heroku

1. **Create Dockerfile**
   ```dockerfile
   FROM node:16-alpine
   WORKDIR /app
   COPY package*.json ./
   RUN npm install
   COPY . .
   RUN npm run build
   
   FROM node:16-alpine
   WORKDIR /app
   RUN npm install -g serve
   COPY --from=0 /app/build ./build
   EXPOSE 3000
   CMD ["serve", "-s", "build", "-l", "3000"]
   ```

2. **Deploy to Heroku**
   ```bash
   heroku create socialhub-app
   git push heroku main
   ```

### Option E: Traditional VPS (Ubuntu)

1. **SSH into Server**
   ```bash
   ssh user@your-server.com
   ```

2. **Install Dependencies**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
   sudo apt-get install -y nodejs
   sudo apt-get install -y nginx
   ```

3. **Clone Repository**
   ```bash
   git clone https://github.com/yourusername/socialhub.git
   cd socialhub
   ```

4. **Install and Build**
   ```bash
   npm install
   npm run build
   ```

5. **Setup Nginx**
   ```bash
   sudo nano /etc/nginx/sites-available/socialhub
   ```

   ```nginx
   server {
     listen 80;
     server_name yourdomain.com;

     location / {
       root /home/ubuntu/socialhub/build;
       index index.html;
       try_files $uri /index.html;
     }

     location /api {
       proxy_pass http://localhost:3001;
     }
   }
   ```

6. **Enable Site**
   ```bash
   sudo ln -s /etc/nginx/sites-available/socialhub /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

7. **Setup HTTPS with Let's Encrypt**
   ```bash
   sudo apt-get install -y certbot python3-certbot-nginx
   sudo certbot --nginx -d yourdomain.com
   ```

## 3. Post-Deployment Configuration

### Update API Endpoint

Ensure your API service is pointing to the correct backend:

```javascript
// utils/api.js
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://api.yourdomain.com';
```

### Setup CORS on Backend

Your backend must allow requests from your frontend domain:

```javascript
// Backend CORS configuration
app.use(cors({
  origin: 'https://yourdomain.com',
  credentials: true
}));
```

### Configure SSL/TLS Certificate

- Ensure your domain uses HTTPS
- Use Let's Encrypt for free certificates
- Keep certificates updated

## 4. Continuous Integration/Deployment (CI/CD)

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Install dependencies
      run: npm install
    
    - name: Build
      run: npm run build
    
    - name: Deploy
      run: |
        aws s3 sync build/ s3://${{ secrets.S3_BUCKET }}/
        aws cloudfront create-invalidation --distribution-id ${{ secrets.CLOUDFRONT_ID }} --paths "/*"
```

## 5. Monitoring & Analytics

### Setup Error Tracking

```javascript
// Add to App.js
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "YOUR_SENTRY_DSN",
  environment: "production",
  tracesSampleRate: 1.0,
});
```

### Setup Analytics

```javascript
// Google Analytics
import ReactGA from 'react-ga4';

ReactGA.initialize('YOUR_GA_ID');
```

## 6. Performance Optimization

### Enable Caching

Configure cache headers on your CDN/server:

```nginx
location ~* \.js$ {
  expires 31536000s;
  add_header Cache-Control "public, immutable";
}

location / {
  expires 3600s;
  add_header Cache-Control "public, must-revalidate";
}
```

### Enable Gzip Compression

```nginx
gzip on;
gzip_types text/plain text/css application/json application/javascript;
gzip_min_length 1000;
```

### Optimize Images

```bash
npm install --save imagemin
# Then configure in build process
```

## 7. Security Checklist

- [ ] Enable HTTPS/SSL
- [ ] Set secure headers (CSP, X-Frame-Options, etc.)
- [ ] Configure firewall rules
- [ ] Enable DDoS protection
- [ ] Setup WAF (Web Application Firewall)
- [ ] Regular security audits
- [ ] Implement rate limiting
- [ ] Secure API keys and secrets

## 8. Monitoring & Maintenance

### Health Checks

```javascript
// Implement health check endpoint
// GET /health
```

### Uptime Monitoring

Use services like:
- UptimeRobot
- Pingdom
- New Relic

### Log Aggregation

Setup centralized logging:
- CloudWatch (AWS)
- ELK Stack
- Datadog
- Splunk

## 9. Rollback Procedure

```bash
# If deployment fails, rollback to previous version
git revert HEAD
npm run build
# Re-deploy
```

## 10. Post-Launch Monitoring

1. **Monitor Error Rates**
2. **Track User Analytics**
3. **Monitor API Performance**
4. **Check Server Resources**
5. **Review Security Logs**

## Troubleshooting

### Build Fails
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
npm run build
```

### API Connection Issues
- Check `REACT_APP_API_URL` environment variable
- Verify CORS configuration on backend
- Check network tab in browser DevTools

### Performance Issues
- Enable caching
- Optimize images
- Use CDN
- Enable compression
- Lazy load components

## Support

For deployment issues, contact:
- support@socialhub.com
- GitHub Issues
- Community Discord

---

**Happy Deploying!** 🚀
