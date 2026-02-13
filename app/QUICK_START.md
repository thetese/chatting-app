# SocialHub - Quick Start Guide 🚀

## 5-Minute Setup

### 1. Install Dependencies
```bash
cd /home/justice/app
npm install
```

### 2. Configure Environment
```bash
cp .env.example .env.local
# Edit .env.local:
# REACT_APP_API_URL=http://localhost:3000/api
```

### 3. Start Development Server
```bash
npm start
```
The app opens at `http://localhost:3000`

---

## Project Structure at a Glance

```
app/
├── components/      → UI components (13 total)
├── pages/          → Page containers (6 total)
├── entities/       → Data models (8 total)
├── utils/          → Helper functions & API
├── context/        → Global state
├── styles/         → CSS files (18 total)
├── public/         → Static assets
├── package.json    → Dependencies
└── [Documentation] → README.md, API_DOCUMENTATION.md, etc.
```

---

## Key Files to Know

### Main App Files
- `App.js` - Main component with routing
- `Navigation.js` - Sidebar navigation
- `index.js` - Entry point

### Authentication
- `Login.js` - Login page
- `Register.js` - Registration page

### Core Features
- `components/home.js` - Feed
- `components/messages.js` - Messaging
- `components/profile.js` - User profiles
- `components/explore.js` - Discovery

### Utilities
- `utils/api.js` - API client (40+ methods)
- `utils/auth.js` - Authentication logic
- `utils/helpers.js` - 30+ helper functions

---

## Common Tasks

### Create a New Component
1. Create file in `components/`
2. Add corresponding CSS in `styles/`
3. Import in parent component
4. Add to routing in `App.js` if it's a page

### Add API Endpoint
1. Add method to `utils/api.js`
2. Call in component using `await ApiService.methodName()`
3. Handle loading/error states

### Update Styling
- Global: `styles/index.css`
- Component: `styles/[component-name].css`
- Use CSS variables for colors

### Implement Feature
1. Create entity model in `entities/`
2. Build component in `components/`
3. Create page container in `pages/`
4. Add routing in `App.js`
5. Add styles in `styles/`

---

## Important Commands

```bash
# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test

# Check for issues
npm run lint
```

---

## API Integration Checklist

- [ ] Backend server running
- [ ] API URL configured in `.env.local`
- [ ] CORS enabled on backend
- [ ] All endpoints implemented from `API_DOCUMENTATION.md`
- [ ] Authentication token handling working
- [ ] Error responses formatted correctly
- [ ] API tested with Postman/Insomnia

---

## Deployment Checklist

- [ ] Build created (`npm run build`)
- [ ] Environment variables set
- [ ] API endpoint updated
- [ ] Build tested locally
- [ ] Choose deployment platform
- [ ] Follow platform-specific steps in `DEPLOYMENT.md`
- [ ] Domain configured
- [ ] SSL certificate installed
- [ ] Monitoring setup
- [ ] Database backups configured

---

## Debugging Tips

### Component Not Rendering
- Check routing in `App.js`
- Verify props are passed correctly
- Use React DevTools extension

### API Calls Failing
- Check `REACT_APP_API_URL` in `.env.local`
- Verify backend is running
- Check browser console for errors
- Use Network tab in DevTools

### Styling Issues
- Check CSS class names match
- Verify CSS file imported
- Use browser DevTools to inspect
- Check CSS specificity

### State Not Updating
- Ensure state updates in `AppContext`
- Check component uses context correctly
- Verify dependencies in useEffect
- Check for render loops

---

## Useful Resources

- [React Documentation](https://react.dev)
- [React Router Docs](https://reactrouter.com)
- [MDN Web Docs](https://developer.mozilla.org)
- [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) - API endpoints
- [DEVELOPMENT.md](./DEVELOPMENT.md) - Code standards
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Deployment guides

---

## File Locations Reference

| What | Where |
|------|-------|
| Pages | `pages/` |
| Components | `components/` |
| Data Models | `entities/` |
| API Client | `utils/api.js` |
| Auth Logic | `utils/auth.js` |
| Global State | `context/AppContext.js` |
| Styles | `styles/` |
| Environment | `.env.local` |

---

## Common Component Props

### PostCard
```javascript
<PostCard 
  post={post}
  currentUser={user}
  onLike={handleLike}
  onDelete={handleDelete}
/>
```

### FollowButton
```javascript
<FollowButton 
  userId={userId}
  currentUser={user}
  isFollowing={false}
  onFollowChange={handleFollow}
/>
```

### CommentSection
```javascript
<CommentSection 
  postId={postId}
  currentUser={user}
/>
```

---

## Features Overview

| Feature | Component | Page |
|---------|-----------|------|
| Feed | home.js | HomePage |
| Messages | messages.js | MessagesPage |
| Profiles | profile.js | ProfilePage |
| Search | explore.js | ExplorePage |
| Create Post | create.js | CreatePage |
| Notifications | activity.js | ActivityPage |
| Comments | CommentSection.js | (in PostCard) |
| Stories | Story.js | (in home) |

---

## Authentication Flow

1. User fills login form
2. `AuthService.login()` called
3. API call to `/auth/login`
4. Token & user stored in localStorage
5. User redirected to home page
6. Token included in all API requests

---

## State Management Flow

```
User Action
    ↓
Event Handler
    ↓
API Call (ApiService)
    ↓
Update State (useState or AppContext)
    ↓
Component Re-render
    ↓
UI Updates
```

---

## Responsive Design Breakpoints

- **Mobile**: < 480px
- **Tablet**: 481px - 768px  
- **Desktop**: 769px+

All components are mobile-first responsive!

---

## Performance Tips

1. Use React DevTools Profiler
2. Implement lazy loading
3. Use memoization for expensive computations
4. Optimize images
5. Monitor bundle size

---

## Security Reminders

- Never commit API keys
- Validate all inputs
- Use HTTPS in production
- Keep dependencies updated
- Review security logs regularly

---

## Need Help?

1. Check **DEVELOPMENT.md** for coding standards
2. Review **API_DOCUMENTATION.md** for endpoint details
3. Read **DEPLOYMENT.md** for hosting help
4. Look at component examples in code

---

## What's Next?

1. ✅ Setup complete
2. ⏭️ Build backend API (use API_DOCUMENTATION.md)
3. ⏭️ Connect frontend to backend
4. ⏭️ Test all features
5. ⏭️ Deploy to production

---

## Quick Deployment

### Netlify
```bash
npm run build
# Drag build/ folder to Netlify
```

### Vercel
```bash
npm install -g vercel
vercel
```

### Local Testing
```bash
npm run build
npm install -g serve
serve -s build
```

---

**You're all set! Happy coding! 🎉**

For more details, see the comprehensive documentation in the project root.
