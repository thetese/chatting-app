# SocialHub - Market Ready Social Media Application

A modern, fully-featured social media application built with React and JavaScript. Connect with friends, share content, discover new people, and engage with a vibrant community.

## Features

### Core Features

- **User Authentication**
  - User registration and login
  - Password validation and security
  - Session management
  - JWT token-based authentication

- **Social Feed**
  - Create and publish posts with text and media
  - Like and comment on posts
  - View posts from followed users
  - Stories feature (24-hour temporary content)

- **User Profiles**
  - View and edit user profiles
  - Profile customization with avatars and cover images
  - Public follower/following lists
  - User statistics (posts, followers, following)

- **Follow System**
  - Follow and unfollow users
  - Private and public accounts
  - Follower requests for private accounts

- **Direct Messaging**
  - Real-time messaging with other users
  - Conversation history
  - Message read receipts
  - Message attachments support

- **Notifications**
  - Activity notifications (likes, comments, follows)
  - Notifications center
  - Read/unread status
  - Action links from notifications

- **Content Discovery**
  - Search posts, users, and hashtags
  - Trending content feed
  - Explore page with recommendations
  - Hashtag support

- **Comments & Reactions**
  - Comment on posts
  - Reply to comments
  - Like system for posts and comments
  - Comment threads

## Project Structure

```
app/
├── components/              # Reusable React components
│   ├── home.js             # Home feed component
│   ├── explore.js          # Content discovery
│   ├── profile.js          # User profile
│   ├── messages.js         # Direct messaging
│   ├── create.js           # Post creation
│   ├── activity.js         # Notifications
│   ├── PostCard.js         # Individual post display
│   ├── CommentSection.js   # Comments management
│   ├── Story.js            # Story component
│   ├── FollowButton.js     # Follow/unfollow button
│   ├── MessageList.js      # Message display
│   └── MessageInput.js     # Message composition
│
├── pages/                   # Page containers
│   ├── home.js
│   ├── explore.js
│   ├── profile.js
│   ├── messages.js
│   ├── create.js
│   └── activity.js
│
├── entities/               # Data models
│   ├── User.js
│   ├── Post.js
│   ├── Comment.js
│   ├── Like.js
│   ├── Follow.js
│   ├── Message.js
│   ├── Story.js
│   └── Notification.js
│
├── utils/                  # Utility functions
│   ├── api.js             # API service for backend communication
│   ├── auth.js            # Authentication service
│   ├── helpers.js         # General helper functions
│   └── storage.js         # Local storage management
│
├── context/               # React context
│   └── AppContext.js      # Global app state management
│
├── styles/                # CSS stylesheets
│   ├── index.css          # Global styles
│   ├── app.css            # App layout
│   ├── auth.css           # Authentication pages
│   ├── navigation.css     # Navigation sidebar
│   ├── home.css
│   ├── explore.css
│   ├── profile.css
│   ├── messages.css
│   ├── postcard.css
│   ├── create.css
│   ├── activity.css
│   ├── commentsection.css
│   ├── story.css
│   ├── followbutton.css
│   ├── messagelist.css
│   ├── messageinput.css
│   └── pages.css
│
├── App.js                 # Main app component
├── Navigation.js          # Navigation component
├── Login.js              # Login page
├── Register.js           # Registration page
├── index.js              # App entry point
└── package.json          # Project dependencies
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd app
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file in the root directory
```bash
REACT_APP_API_URL=http://localhost:3000/api
```

### Running the Application

#### Development Mode
```bash
npm start
```
The app will open at `http://localhost:3000`

#### Production Build
```bash
npm run build
```

### Testing
```bash
npm test
```

## API Integration

The application is designed to work with a backend API. All API calls are handled through the `ApiService` class in `utils/api.js`.

### Required Endpoints

**Authentication**
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh` - Token refresh
- `GET /api/auth/me` - Get current user

**Users**
- `GET /api/users/:userId` - Get user profile
- `PUT /api/users/:userId` - Update profile
- `POST /api/users/:userId/follow` - Follow user
- `DELETE /api/users/:userId/follow` - Unfollow user
- `GET /api/users/:userId/followers` - Get followers
- `GET /api/users/:userId/following` - Get following list

**Posts**
- `GET /api/posts/feed` - Get user feed
- `GET /api/posts/:postId` - Get post details
- `POST /api/posts` - Create post
- `PUT /api/posts/:postId` - Update post
- `DELETE /api/posts/:postId` - Delete post
- `GET /api/users/:userId/posts` - Get user's posts

**Interactions**
- `POST /api/posts/:postId/likes` - Like post
- `DELETE /api/posts/:postId/likes` - Unlike post
- `GET /api/posts/:postId/comments` - Get comments
- `POST /api/posts/:postId/comments` - Add comment
- `DELETE /api/comments/:commentId` - Delete comment

**Messages**
- `GET /api/messages/conversations` - Get conversations
- `GET /api/messages/conversations/:conversationId` - Get messages
- `POST /api/messages/conversations/:conversationId` - Send message

**Notifications**
- `GET /api/notifications` - Get notifications
- `PATCH /api/notifications/:notificationId/read` - Mark as read

**Discovery**
- `GET /api/search` - Search content
- `GET /api/trending` - Get trending posts

**Stories**
- `GET /api/stories` - Get stories
- `POST /api/stories` - Create story
- `POST /api/stories/:storyId/view` - View story

## Authentication

The app uses JWT (JSON Web Tokens) for authentication. Tokens are stored in localStorage and included in API requests automatically.

### Login Flow
1. User enters email/password
2. `/api/auth/login` is called
3. Backend returns JWT token and user data
4. Token is stored in localStorage
5. User is redirected to home page
6. Token is included in subsequent API requests

## State Management

The application uses React Context API for global state management through `AppContext`. This manages:
- Current authenticated user
- Authentication status
- Notifications
- Theme settings
- Loading states

## Styling

The application uses CSS with CSS variables for theming. Key color variables:
- Primary color: `#1d9bf0` (Blue)
- Text primary: `#0f1419`
- Text secondary: `#536471` (Gray)
- Border color: `#eff3f4` (Light gray)

All components are fully responsive and mobile-friendly.

## Performance Optimizations

- Lazy loading of components
- Image optimization
- Debounced search
- Pagination for feeds
- Cached API responses
- Optimistic UI updates

## Security Features

- Password strength validation
- Email validation
- XSS protection through React
- CORS handling
- Secure token storage
- Protected routes

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Future Enhancements

- [ ] Dark mode theme
- [ ] Real-time notifications with WebSockets
- [ ] Video streaming
- [ ] Advanced analytics
- [ ] Multi-language support
- [ ] Push notifications
- [ ] Offline mode
- [ ] File sharing improvements
- [ ] Live video streaming
- [ ] Group chats

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email support@socialhub.com or create an issue in the repository.

## Deployment

### Deployment to Production

```bash
# Build the application
npm run build

# Deploy the build folder to your hosting service
# Popular options: Netlify, Vercel, AWS S3 + CloudFront, Heroku
```

### Environment Variables for Production

```
REACT_APP_API_URL=https://api.socialhub.com
REACT_APP_ENV=production
```

## Contact

- Email: contact@socialhub.com
- Website: www.socialhub.com
- Twitter: @SocialHub

---

**SocialHub** - Connect, Share, Inspire!
