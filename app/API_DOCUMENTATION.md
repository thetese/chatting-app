# API Documentation

## Base URL

```
http://localhost:3000/api
```

For production, update the `REACT_APP_API_URL` environment variable.

## Authentication

All endpoints except `/auth/register` and `/auth/login` require the following header:

```
Authorization: Bearer {token}
```

## Error Responses

All error responses follow this format:

```json
{
  "success": false,
  "message": "Error message",
  "errors": [
    "Specific error details"
  ]
}
```

## Endpoints

### Authentication

#### Register User
```
POST /auth/register

Body:
{
  "username": "string",
  "email": "string",
  "password": "string",
  "fullName": "string"
}

Response (201):
{
  "success": true,
  "token": "jwt-token",
  "user": {
    "id": "uuid",
    "username": "string",
    "email": "string",
    "fullName": "string",
    "createdAt": "timestamp"
  }
}
```

#### Login
```
POST /auth/login

Body:
{
  "email": "string",
  "password": "string"
}

Response (200):
{
  "success": true,
  "token": "jwt-token",
  "user": { ... }
}
```

#### Refresh Token
```
POST /auth/refresh

Response (200):
{
  "success": true,
  "token": "new-jwt-token"
}
```

#### Get Current User
```
GET /auth/me

Response (200):
{
  "success": true,
  "user": { ... }
}
```

### Users

#### Get User Profile
```
GET /users/{userId}

Response (200):
{
  "success": true,
  "user": {
    "id": "uuid",
    "username": "string",
    "email": "string",
    "fullName": "string",
    "bio": "string",
    "profileImage": "url",
    "coverImage": "url",
    "website": "url",
    "location": "string",
    "isVerified": boolean,
    "isPrivate": boolean,
    "followerCount": number,
    "followingCount": number,
    "postCount": number,
    "createdAt": "timestamp"
  }
}
```

#### Update Profile
```
PUT /users/{userId}

Body:
{
  "fullName": "string",
  "bio": "string",
  "website": "url",
  "location": "string",
  "profileImage": "url",
  "coverImage": "url",
  "isPrivate": boolean
}

Response (200):
{
  "success": true,
  "user": { ... }
}
```

#### Follow User
```
POST /users/{userId}/follow

Response (201):
{
  "success": true,
  "message": "User followed successfully"
}
```

#### Unfollow User
```
DELETE /users/{userId}/follow

Response (200):
{
  "success": true,
  "message": "User unfollowed successfully"
}
```

#### Get Followers
```
GET /users/{userId}/followers?limit=20&offset=0

Response (200):
{
  "success": true,
  "followers": [...],
  "total": number
}
```

#### Get Following
```
GET /users/{userId}/following?limit=20&offset=0

Response (200):
{
  "success": true,
  "following": [...],
  "total": number
}
```

### Posts

#### Get Feed
```
GET /posts/feed?limit=20&offset=0

Response (200):
{
  "success": true,
  "posts": [...],
  "total": number
}
```

#### Get Single Post
```
GET /posts/{postId}

Response (200):
{
  "success": true,
  "post": {
    "id": "uuid",
    "userId": "uuid",
    "author": { ... },
    "content": "string",
    "images": ["url"],
    "videos": ["url"],
    "likes": ["uuid"],
    "likeCount": number,
    "comments": [...],
    "commentCount": number,
    "visibility": "public|friends|private",
    "createdAt": "timestamp"
  }
}
```

#### Create Post
```
POST /posts

Body (form-data):
{
  "content": "string",
  "images": [files],
  "videos": [files],
  "visibility": "public|friends|private"
}

Response (201):
{
  "success": true,
  "post": { ... }
}
```

#### Update Post
```
PUT /posts/{postId}

Body:
{
  "content": "string",
  "visibility": "string"
}

Response (200):
{
  "success": true,
  "post": { ... }
}
```

#### Delete Post
```
DELETE /posts/{postId}

Response (200):
{
  "success": true,
  "message": "Post deleted successfully"
}
```

#### Get User Posts
```
GET /users/{userId}/posts?limit=20&offset=0

Response (200):
{
  "success": true,
  "posts": [...],
  "total": number
}
```

### Likes

#### Like Post
```
POST /posts/{postId}/likes

Response (201):
{
  "success": true,
  "message": "Post liked"
}
```

#### Unlike Post
```
DELETE /posts/{postId}/likes

Response (200):
{
  "success": true,
  "message": "Like removed"
}
```

### Comments

#### Get Comments
```
GET /posts/{postId}/comments?limit=20&offset=0

Response (200):
{
  "success": true,
  "comments": [...],
  "total": number
}
```

#### Add Comment
```
POST /posts/{postId}/comments

Body:
{
  "content": "string"
}

Response (201):
{
  "success": true,
  "comment": {
    "id": "uuid",
    "postId": "uuid",
    "userId": "uuid",
    "author": { ... },
    "content": "string",
    "likes": [],
    "likeCount": 0,
    "createdAt": "timestamp"
  }
}
```

#### Delete Comment
```
DELETE /comments/{commentId}

Response (200):
{
  "success": true,
  "message": "Comment deleted"
}
```

### Messages

#### Get Conversations
```
GET /messages/conversations?limit=20&offset=0

Response (200):
{
  "success": true,
  "conversations": [...],
  "total": number
}
```

#### Get Messages
```
GET /messages/conversations/{conversationId}?limit=50&offset=0

Response (200):
{
  "success": true,
  "messages": [...],
  "total": number
}
```

#### Send Message
```
POST /messages/conversations/{conversationId}

Body:
{
  "content": "string",
  "attachments": [urls]
}

Response (201):
{
  "success": true,
  "message": {
    "id": "uuid",
    "conversationId": "uuid",
    "senderId": "uuid",
    "receiverId": "uuid",
    "content": "string",
    "attachments": [],
    "isRead": false,
    "createdAt": "timestamp"
  }
}
```

### Notifications

#### Get Notifications
```
GET /notifications?limit=20&offset=0

Response (200):
{
  "success": true,
  "notifications": [...],
  "total": number
}
```

#### Mark as Read
```
PATCH /notifications/{notificationId}/read

Response (200):
{
  "success": true,
  "notification": { ... }
}
```

### Discovery

#### Search
```
GET /search?q=query&type=all|posts|users|hashtags&limit=20&offset=0

Response (200):
{
  "success": true,
  "results": {
    "posts": [...],
    "users": [...],
    "hashtags": [...]
  },
  "total": number
}
```

#### Trending
```
GET /trending?limit=20

Response (200):
{
  "success": true,
  "trending": [
    {
      "id": "uuid",
      "type": "post|hashtag|user",
      "data": { ... },
      "engagement": number
    }
  ]
}
```

### Stories

#### Get Stories
```
GET /stories

Response (200):
{
  "success": true,
  "stories": [...]
}
```

#### Create Story
```
POST /stories

Body (form-data):
{
  "media": [file],
  "mediaType": "image|video",
  "content": "string",
  "visibility": "public|friends|private"
}

Response (201):
{
  "success": true,
  "story": { ... }
}
```

#### View Story
```
POST /stories/{storyId}/view

Response (200):
{
  "success": true,
  "message": "Story viewed"
}
```

## Rate Limiting

API requests are rate limited to prevent abuse:
- 100 requests per minute for authenticated users
- 10 requests per minute for unauthenticated users

Rate limit headers:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1234567890
```

## Pagination

Most list endpoints support pagination:

```
?limit=20&offset=0
```

- `limit`: Number of items per page (default: 20, max: 100)
- `offset`: Number of items to skip (default: 0)

## Filtering & Sorting

Endpoints support filtering and sorting:

```
?sort=createdAt&order=desc&filter[visibility]=public
```

## Webhook Events

(For future real-time updates)

- `post.created`
- `post.liked`
- `comment.added`
- `user.followed`
- `message.sent`
- `notification.created`

## Client SDK

For easier integration, use the provided `ApiService` class in `utils/api.js`.

```javascript
import ApiService from './utils/api';

// Make API calls
const posts = await ApiService.getFeed();
const user = await ApiService.getUser(userId);
const newPost = await ApiService.createPost(postData);
```
