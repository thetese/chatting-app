# Development Guidelines

## Code Style & Standards

### JavaScript/React Conventions

1. **File Naming**
   - Components: PascalCase (e.g., `PostCard.js`)
   - Utilities: camelCase (e.g., `api.js`, `helpers.js`)
   - Styles: kebab-case (e.g., `post-card.css`)

2. **Import Organization**
   ```javascript
   // React and external libraries first
   import React, { useState } from 'react';
   import { useRouter } from 'react-router-dom';
   
   // Internal imports
   import ApiService from '../utils/api';
   import './component.css';
   
   // Components
   export default MyComponent;
   ```

3. **Component Structure**
   ```javascript
   /**
    * Component Description
    * What it does and its purpose
    */
   const MyComponent = ({ prop1, prop2 }) => {
     const [state, setState] = useState(null);

     const handleEvent = () => {
       // Event handler logic
     };

     return (
       <div className="my-component">
         {/* JSX content */}
       </div>
     );
   };

   export default MyComponent;
   ```

4. **Props & Destructuring**
   - Always destructure props at the function level
   - Use prop-types or TypeScript for validation
   - Provide default values

5. **Hooks Usage**
   - Place hooks at the top of component
   - Follow Rules of Hooks
   - Use custom hooks for reusable logic

### CSS Standards

1. **Class Naming (BEM Convention)**
   ```css
   .block { }
   .block__element { }
   .block__element--modifier { }
   ```

2. **CSS Variables**
   ```css
   :root {
     --primary-color: #1d9bf0;
     --spacing-unit: 8px;
   }

   .component {
     color: var(--primary-color);
     margin: calc(var(--spacing-unit) * 2);
   }
   ```

3. **Responsive Design**
   ```css
   /* Mobile-first approach */
   .component {
     /* Base mobile styles */
   }

   @media (min-width: 768px) {
     .component {
       /* Tablet styles */
     }
   }

   @media (min-width: 1024px) {
     .component {
       /* Desktop styles */
     }
   }
   ```

## Git Workflow

### Branch Naming
```
feature/feature-name
bugfix/bug-description
hotfix/critical-issue
docs/documentation-update
```

### Commit Messages
```
[TYPE] Brief description

Detailed explanation of changes if needed.

- Related changes
- Implementation details

Closes #123
```

Types: `feat`, `fix`, `refactor`, `style`, `docs`, `test`, `chore`

### Pull Request Template
```markdown
## Description
What does this PR do?

## Changes
- Change 1
- Change 2

## Testing
How to test these changes?

## Screenshots
(if applicable)

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex logic
- [ ] No new warnings generated
- [ ] Tests pass locally
```

## Testing

### Unit Tests
```javascript
import { formatDate } from '../helpers';

describe('formatDate', () => {
  it('formats date correctly', () => {
    const date = new Date('2024-01-01');
    expect(formatDate(date)).toEqual('Jan 1, 2024');
  });
});
```

### Component Tests
```javascript
import { render, screen } from '@testing-library/react';
import PostCard from '../PostCard';

describe('PostCard', () => {
  it('renders post content', () => {
    const post = { id: 1, content: 'Test' };
    render(<PostCard post={post} />);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });
});
```

### Run Tests
```bash
npm test
```

## Performance Best Practices

1. **Code Splitting**
   ```javascript
   const Home = lazy(() => import('./pages/home'));
   
   <Suspense fallback={<Loading />}>
     <Home />
   </Suspense>
   ```

2. **Memoization**
   ```javascript
   const MyComponent = React.memo(({ data }) => {
     return <div>{data}</div>;
   });
   ```

3. **useCallback for Handlers**
   ```javascript
   const handleClick = useCallback(() => {
     // Handler logic
   }, [dependencies]);
   ```

4. **Image Optimization**
   - Use WebP format when possible
   - Lazy load images
   - Responsive images with srcset

## State Management Guidelines

1. **Local State**
   - Use useState for component-specific state
   - Keep state close to where it's used

2. **Global State**
   - Use Context API for global state
   - Avoid prop drilling
   - Consider Redux for complex apps

3. **API Data Caching**
   - Implement request deduplication
   - Cache API responses
   - Invalidate cache when appropriate

## Error Handling

```javascript
try {
  const response = await ApiService.getPost(postId);
  setPost(response);
} catch (error) {
  console.error('Failed to fetch post:', error);
  setError('Failed to load post. Please try again.');
}
```

## Common Patterns

### Loading States
```javascript
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);

if (loading) return <Loading />;
if (error) return <ErrorMessage message={error} />;
```

### Form Handling
```javascript
const [formData, setFormData] = useState({});

const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData(prev => ({
    ...prev,
    [name]: value
  }));
};

const handleSubmit = async (e) => {
  e.preventDefault();
  // Submit logic
};
```

### API Integration
```javascript
useEffect(() => {
  const fetchData = async () => {
    try {
      const data = await ApiService.getFeed();
      setData(data);
    } catch (error) {
      setError(error.message);
    }
  };
  
  fetchData();
}, [dependencies]);
```

## Accessibility (A11y)

1. **Semantic HTML**
   ```html
   <button>Click me</button>
   <nav>Navigation</nav>
   <article>Content</article>
   ```

2. **ARIA Labels**
   ```jsx
   <button aria-label="Close menu">×</button>
   <div role="alert">{message}</div>
   ```

3. **Keyboard Navigation**
   - All interactive elements should be keyboard accessible
   - Use logical tab order
   - Provide focus indicators

4. **Color Contrast**
   - Text contrast ratio minimum 4.5:1
   - Don't rely on color alone

## Security Best Practices

1. **Input Validation**
   ```javascript
   const sanitizeInput = (input) => {
     return input.trim().replace(/<[^>]*>/g, '');
   };
   ```

2. **XSS Prevention**
   - React auto-escapes by default
   - Use dangerouslySetInnerHTML only when necessary

3. **CSRF Protection**
   - Include CSRF tokens in forms
   - Validate on backend

4. **Secure Storage**
   - Don't store sensitive data in localStorage
   - Use httpOnly cookies for tokens

5. **API Security**
   - Use HTTPS
   - Validate API responses
   - Implement rate limiting

## Documentation

### JSDoc Comments
```javascript
/**
 * Fetches a post by ID
 * @param {string} postId - The post ID
 * @returns {Promise<Object>} The post object
 * @throws {Error} If post not found
 */
const getPost = async (postId) => {
  // Implementation
};
```

### README for Components
Create a `COMPONENT_GUIDE.md` documenting:
- Component props
- Usage examples
- Common patterns
- Props validation

## Debugging

### Browser DevTools
1. React DevTools extension
2. Redux DevTools (if using Redux)
3. Console for logging
4. Network tab for API calls

### Logging
```javascript
// Use descriptive log messages
console.error('Failed to load user profile:', error);
console.warn('Deprecated API endpoint used');
console.info('User logged in successfully');
```

## Performance Monitoring

### Lighthouse Audits
```bash
npm install -g lighthouse
lighthouse https://yourdomain.com
```

### Web Vitals
```javascript
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

getCLS(console.log);
getFID(console.log);
getFCP(console.log);
getLCP(console.log);
getTTFB(console.log);
```

## Useful Resources

- [React Documentation](https://react.dev)
- [JavaScript Standards](https://google.github.io/styleguide/jsguide.html)
- [MDN Web Docs](https://developer.mozilla.org)
- [CSS Tricks](https://css-tricks.com)
- [Web Accessibility Guidelines](https://www.w3.org/WAI/)

## Dependencies to Know

- **react-router-dom**: Routing
- **axios**: HTTP client
- **date-fns**: Date utilities
- **lodash**: Utility functions
- **clsx**: Conditional classnames

## Common Issues & Solutions

### Memory Leaks
```javascript
useEffect(() => {
  const subscription = observable.subscribe();
  
  return () => {
    subscription.unsubscribe(); // Cleanup
  };
}, []);
```

### Re-rendering Issues
```javascript
// Use useMemo to prevent unnecessary re-renders
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);

// Use useCallback to maintain referential equality
const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);
```

### Infinite Loops in useEffect
```javascript
// Always include proper dependency array
useEffect(() => {
  // This code runs on mount and when [dependencies] change
}, [dependencies]);
```

## Release Checklist

Before each release:
- [ ] Run all tests
- [ ] Update version in package.json
- [ ] Update CHANGELOG
- [ ] Build production version
- [ ] Test production build locally
- [ ] Update documentation
- [ ] Create git tag
- [ ] Deploy to staging
- [ ] Final testing on staging
- [ ] Deploy to production
- [ ] Monitor error tracking
- [ ] Announce release

---

Happy coding! 🎉
