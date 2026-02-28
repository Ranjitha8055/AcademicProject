# 🚀 Quick Start Guide - Authentication System

## ✅ What's Been Implemented

### Authentication Features
- ✅ User Registration (Signup)
- ✅ User Login
- ✅ Admin Login (pre-configured)
- ✅ Protected Routes (Authorization)
- ✅ User Profile Management
- ✅ Logout Functionality
- ✅ Session Persistence
- ✅ Dynamic Navbar Based on Auth Status
- ✅ Anonymous User Access

---

## 📦 New Files Created

```
src/context/
├── AuthContext.jsx       - Authentication provider & global state
├── useAuth.js           - Custom hook for auth
└── ProtectedRoute.jsx   - Protected route component

Documentation/
├── AUTH_DOCUMENTATION.md           - User guide
└── AUTHENTICATION_TECHNICAL.md     - Technical details
```

---

## 🎯 How to Test

### 1. **Test Anonymous Access (No Login)**
   1. Start the app: `npm run dev`
   2. Visit `http://localhost:5173/`
   3. See the landing page (Frontpage) - **Works without login**
   4. Click "GET STARTED" button
   5. **Should redirect to Login** (since HomePage1 is protected)

### 2. **Test User Signup**
   1. Click "Signup" button
   2. Fill in:
      - Username: `john_doe`
      - Email: `john@example.com`
      - Password: `password123`
      - Confirm Password: `password123`
   3. Click "Sign Up"
   4. **Should redirect to Login page**
   5. Check browser DevTools → Application → localStorage → see `users` array

### 3. **Test User Login**
   1. On Login page, enter:
      - Username: `john_doe`
      - Password: `password123`
   2. Click "Login"
   3. **Should redirect to HomePage1**
   4. Check navbar - profile icon should be visible
   5. Check localStorage - see `currentUser` key

### 4. **Test Profile Dropdown**
   1. Click the **profile icon** in navbar (top right)
   2. See dropdown menu with:
      - User's username
      - User's email
      - "Profile" button
      - "Logout" button
   3. Click "Profile" → Goes to User Dashboard

### 5. **Test User Dashboard**
   1. Navigate to `/UserDash` or click Profile in dropdown
   2. See three views:
      - **Home**: Welcome message
      - **Update Profile**: Edit user info
      - **Order Details**: View orders
   3. Edit profile and save → Data persists in localStorage

### 6. **Test Logout**
   1. Click profile icon → Click "Logout"
   2. **Should redirect to home page**
   3. Check localStorage - `currentUser` should be gone
   4. Navbar should show "Login" and "Signup" buttons again

### 7. **Test Protected Routes**
   1. After logout
   2. Try to visit `/UserDash` directly in URL
   3. **Should redirect to Login page** (protected)
   4. Try to visit `/Menu1`, `/Cart`, etc.
   5. **All should redirect to Login** (protected)

### 8. **Test Admin Login**
   1. Go to `/Login`
   2. Username: `admin`
   3. Password: `admin123`
   4. Click "Login"
   5. **Should redirect to Admin page** (`/Admin`)
   6. Check localStorage - `currentUser.role` should be `"admin"`

### 9. **Test Session Persistence**
   1. Login as user
   2. Refresh page (F5)
   3. **Should remain logged in** (session persists)
   4. Check localStorage - `currentUser` still exists
   5. Close tab, reopen → Still logged in

### 10. **Test Non-Admin Accessing Admin Route**
   1. Login as regular user
   2. Try to visit `/Admin`
   3. **Should redirect to home page** (not admin)

---

## 🧑‍💻 Code Examples - How to Use in Your Components

### Example 1: Show User Info
```jsx
import { useAuth } from "../src/context/useAuth";

export default function UserInfo() {
  const { user } = useAuth();

  return <p>Welcome {user.username}!</p>;
}
```

### Example 2: Conditional Rendering
```jsx
import { useAuth } from "../src/context/useAuth";

export default function Header() {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <header>
      {isAuthenticated ? (
        <>
          <p>{user.username}</p>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <p>Please log in</p>
      )}
    </header>
  );
}
```

### Example 3: Protect Component Content
```jsx
import { useAuth } from "../src/context/useAuth";
import { Navigate } from "react-router-dom";

export default function SecretComponent() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/Login" />;
  }

  return <div>This only shows for logged-in users</div>;
}
```

### Example 4: Admin-Only Content
```jsx
import { useAuth } from "../src/context/useAuth";

export default function AdminPanel() {
  const { isAdmin } = useAuth();

  if (!isAdmin) {
    return <div>You don't have admin access</div>;
  }

  return <div>Admin Dashboard</div>;
}
```

---

## 🗄️ localStorage Data Format

After signup and login, check DevTools → Application → localStorage:

### `users` key (after signup):
```json
[
  {
    "username": "john_doe",
    "email": "john@example.com",
    "password": "password123",
    "role": "user",
    "id": 1704067200000
  }
]
```

### `currentUser` key (after login):
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "user",
  "id": 1704067200000
}
```

### `profile` key (after updating profile):
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+91 98765 43210",
  "address": "Bangalore, Karnataka"
}
```

---

## 🔗 Key Routes Summary

| Route | Auth Required | Access Level | Purpose |
|-------|---------------|--------------|---------|
| `/` | ❌ No | Public | Landing page |
| `/Login` | ❌ No | Public | Login page |
| `/Signup` | ❌ No | Public | Signup page |
| `/Homepage1` | ✅ Yes | User | Main home |
| `/Menu1` | ✅ Yes | User | Menu page |
| `/Cart` | ✅ Yes | User | Shopping cart |
| `/TableOrder` | ✅ Yes | User | Book table |
| `/PaymentDetails` | ✅ Yes | User | Payment |
| `/UserDash` | ✅ Yes | User | User dashboard |
| `/Admin` | ✅ Yes | Admin | Admin panel |

---

## 🐛 Troubleshooting

### Problem: Can't login
**Solution:**
1. Check DevTools Console for errors
2. Verify email/username in localStorage `users` array
3. Clear localStorage and signup again

### Problem: Session lost after refresh
**Solution:**
1. Check if localStorage is enabled in browser
2. Check localStorage for `currentUser` key
3. Make sure AuthProvider wraps the Router

### Problem: Protected routes not working
**Solution:**
1. Verify ProtectedRoute is imported in App.jsx
2. Check that component is wrapped: `<ProtectedRoute><YourComponent /></ProtectedRoute>`
3. Clear cache and rebuild: `npm run build`

### Problem: Admin login not working
**Solution:**
1. Login might have created default admin on first load
2. Check localStorage `admins` key
3. Default credentials: admin / admin123

### Problem: Navbar not updating after login
**Solution:**
1. Make sure HomePage1 is using `useAuth` hook
2. Check that `setMenuOpen` state is properly managed
3. Clear browser cache and refresh

---

## 🚀 Next Steps - Enhancements

### Recommended Enhancements:
1. **Email Verification**: Send verification email on signup
2. **Password Reset**: Add "Forgot Password" functionality
3. **Two-Factor Authentication**: Add 2FA for security
4. **User Roles**: Add more role types (staff, manager, etc.)
5. **Profile Picture**: Allow users to upload avatar
6. **Email Notifications**: Send order confirmations
7. **Backend Integration**: Move from localStorage to database
8. **JWT Tokens**: Implement secure token-based auth
9. **Social Login**: Add Google, GitHub login options
10. **Audit Logs**: Track user activities

---

## 📚 File Locations

**Authentication System Files:**
- `src/context/AuthContext.jsx` - Core auth logic
- `src/context/useAuth.js` - Auth hook
- `src/context/ProtectedRoute.jsx` - Route protection
- `src/App.jsx` - Auth provider setup

**Updated Component Files:**
- `Login/Login.jsx` - Updated with auth context
- `Login/Signup.jsx` - Updated with auth context
- `Home/HomePage1.jsx` - Updated navbar with auth
- `UserDash/UserDash.jsx` - Integrated with auth

**Documentation:**
- `AUTH_DOCUMENTATION.md` - User guide
- `AUTHENTICATION_TECHNICAL.md` - Technical details
- `QUICKSTART.md` - This file!

---

## ✨ Key Features Summary

| Feature | Status | Details |
|---------|--------|---------|
| User Signup | ✅ | Email validation, password confirmation |
| User Login | ✅ | Secure login with email/username |
| Admin Login | ✅ | Pre-configured admin account |
| Protected Routes | ✅ | Auto-redirect to login if not auth |
| Session Persistence | ✅ | Stays logged in after refresh |
| Role-Based Access | ✅ | Admin routes separate from user routes |
| Logout | ✅ | Clear session and redirect |
| Profile Management | ✅ | Update user info in dashboard |
| Dynamic Navbar | ✅ | Changes based on auth status |
| Error Messages | ✅ | User-friendly error handling |

---

**Start testing and let me know if you need any adjustments! 🎉**
