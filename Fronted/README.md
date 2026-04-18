# SkillSwap

A modern platform for exchanging skills and services with other professionals. Buy and sell expertise in a secure, seamless marketplace.

![React](https://img.shields.io/badge/React-18.3-blue)
![Vite](https://img.shields.io/badge/Vite-8-purple)
![License](https://img.shields.io/badge/License-MIT-green)

## 🎯 Features

### User Authentication & Profiles
- Secure login and registration with strong validation
- Complete user profiles with bio, skills, and ratings
- Account type management (Provider/Consumer)
- Profile editing with real-time validation

### Skills Marketplace
- Browse and search available skills
- List your own skills with hourly rates and descriptions
- Skill categories (Development, Design, Data Science, Marketing, Writing)
- Rating and review system

### Wallet & Transactions
- Secure digital wallet with balance tracking
- Top-up wallet with multiple payment options
- Withdraw earnings to bank accounts
- Complete transaction history
- Real-time balance updates

### Bookings & Requests
- Request skills from other providers
- Accept or decline booking requests
- Track booking status
- Schedule management

### Dashboard
- Personalized dashboard with key metrics
- Total earnings, skills listed, ratings, completed bookings
- Quick access to all features
- Loading overlays for smooth UX

### Security Features
- Protected routes requiring authentication
- JWT-based authorization
- Request/response interceptors for token management
- Graceful offline mode with demo data fallback

## 🛠️ Tech Stack

### Frontend
- **React 18.3** - UI framework
- **Vite 8** - Build tool and dev server
- **React Router v6** - Client-side routing
- **Axios** - HTTP client with interceptors
- **Context API** - Global state management

### Styling
- **CSS 3** - Custom properties and animations
- **Dark Theme** - Pre-configured color scheme
- **Responsive Design** - Mobile and desktop optimized

### Development Tools
- **ESLint** - Code quality and consistency
- **PostCSS** - CSS processing
- **JavaScript (ES6+)** - Modern JavaScript syntax

## 📋 Requirements

- **Node.js**: v16 or higher
- **npm**: v8 or higher
- **Backend API**: Configured at `VITE_API_BASE_URL` environment variable

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/skillswap.git
cd skillswap
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Create a `.env` file in the root directory:
```env
VITE_API_BASE_URL=http://localhost:8080
```

Replace with your backend API base URL. If not set, the app defaults to `http://localhost:8080`.

## ⚙️ Development

### Start Development Server
```bash
npm run dev
```
The app will be available at `http://localhost:5173`

### Build for Production
```bash
npm run build
```
Creates optimized production build in `dist/` folder.

### Lint Code
```bash
npm run lint
```
Checks code quality with ESLint.

## 📂 Project Structure

```
skillswap/
├── src/
│   ├── api/               # API client and endpoints
│   │   ├── axiosInstance.js
│   │   └── index.js
│   ├── assets/            # Static files and fonts
│   ├── components/        # Reusable React components
│   │   ├── common/        # Common components (LoadingOverlay, ToastContainer)
│   │   ├── layout/        # Layout components (AppLayout, Sidebar, Topbar, ProtectedRoute)
│   │   ├── modals/        # Modal components (AddSkillModal, TopUpModal, WithdrawModal)
│   │   └── ui/            # UI components (Button, Badge, Modal, Avatar)
│   ├── context/           # React Context for global state
│   │   └── AppContext.jsx # Auth, user, wallet, toast state management
│   ├── data/              # Demo and static data
│   ├── hooks/             # Custom React hooks
│   │   └── useApi.js
│   ├── pages/             # Page components
│   │   ├── Auth/          # Login/Register page
│   │   ├── Dashboard/     # Main dashboard
│   │   ├── Skills/        # Skills marketplace
│   │   ├── Bookings/      # Booking management
│   │   ├── Requests/      # Skill requests
│   │   ├── Wallet/        # Wallet management
│   │   ├── Transactions/  # Transaction history
│   │   └── Profile/       # User profile
│   ├── styles/            # Global styles and animations
│   ├── utils/             # Utility functions
│   │   └── validators.js  # Form validation rules
│   ├── App.jsx            # Root component with routing
│   └── main.jsx           # Entry point
├── public/                # Static assets
├── vite.config.js         # Vite configuration
├── eslint.config.js       # ESLint configuration
├── postcss.config.mjs     # PostCSS configuration
└── package.json           # Project dependencies
```

## 🔐 Authentication Flow

1. **Public Pages**: Landing page (`/`) accessible without authentication
2. **Auth Page**: (`/auth`) - Login and registration forms
3. **Protected Routes**: (`/dashboard/*`) - Requires valid authentication token
4. **Token Management**: JWT stored in localStorage, automatically injected in API headers
5. **Auto Logout**: Invalid or expired tokens trigger automatic redirect to login

## 📡 API Integration

### Authentication Endpoints
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - New user registration

### Skills Endpoints
- `GET /api/skills` - List all skills
- `POST /api/skills` - Add new skill
- `GET /api/skills/{id}` - Get skill details

### Wallet Endpoints
- `GET /api/wallet/balance` - Get wallet balance
- `POST /api/wallet/topup` - Top-up wallet
- `POST /api/wallet/withdraw` - Withdraw funds
- `GET /api/transactions` - Transaction history

### User Endpoints
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update profile

### Bookings & Requests
- `GET /api/bookings` - List user bookings
- `POST /api/requests` - Create skill request
- `GET /api/requests` - List requests

## ✅ Validation

All forms include comprehensive client-side validation:

### Auth Form
- **Email**: Valid email format required
- **Password**: Minimum 8 characters, uppercase, lowercase, and number
- **Name**: 2-100 characters, letters/spaces/hyphens only
- **Phone**: Valid phone format (regex pattern)

### Skill Form
- **Title**: 3-100 characters
- **Rate**: ₹50-₹100,000 per hour
- **Description**: 10-500 characters

### Wallet Forms
- **Top-up Amount**: ₹1-₹1,000,000
- **Withdrawal Amount**: ₹100-₹100,000
- **Bank Account**: Required selection

### Profile Form
- **Name**: 2-100 characters
- **Email**: Valid format
- **Phone**: Valid pattern
- **City**: 2-100 characters
- **Bio**: 0-500 characters

## 🎨 Theming

The app uses a sophisticated dark theme system with CSS custom properties:

```css
--color-bg          /* Primary background */
--color-surface     /* Secondary surface */
--color-accent      /* Action color */
--color-red         /* Error/danger */
--color-green       /* Success */
--color-text        /* Primary text */
--color-text2       /* Secondary text */
```

### Animations
- **popIn** - Entrance animation with scale and opacity
- **float** - Continuous floating motion
- **slideUp** - Slide up entrance
- **spin** - Loading spinner rotation

## 🐛 Error Handling

### API Errors
- Network failures trigger demo mode with sample data
- 401 Unauthorized automatically clears token and redirects to login
- Error toasts display user-friendly messages
- Graceful fallbacks maintain app functionality

### Form Errors
- Real-time validation prevents invalid submissions
- Clear error messages guide users
- Red border highlights on invalid fields
- Errors clear on field modification

## 🔄 State Management

**Context API** manages:
- Authentication state (token, user data, isAuthenticated)
- User profile and wallet balance
- Toast notifications (success, error, info)
- Loading overlay state
- Global API calls with error handling

## 📦 Build & Deployment

### Production Build
```bash
npm run build
```
Output: `dist/` folder ready for deployment

### Build Specifications
- **Total Size**: ~317 KB (96 modules)
- **Gzip**: ~97 KB
- **Format**: Modern ES modules
- **Assets**: Optimized CSS and JavaScript

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/awesome-feature`
2. Commit changes: `git commit -m 'Add awesome feature'`
3. Push to branch: `git push origin feature/awesome-feature`
4. Open a Pull Request

### Code Standards
- Follow ESLint configuration
- Use consistent naming conventions
- Add validation for new forms
- Update this README for new features

## 📝 Notes

- Demo data available in `src/data/demoData.js` for offline testing
- API base URL defaults to `http://localhost:8080` if not configured
- All API responses automatically logged for debugging
- Loading states managed globally via AppContext

## 📄 License

MIT License - feel free to use this project for personal and commercial purposes.

## 👨‍💻 Author

**SkillSwap Development Team**

---

**Happy Skill Swapping! 🚀**
