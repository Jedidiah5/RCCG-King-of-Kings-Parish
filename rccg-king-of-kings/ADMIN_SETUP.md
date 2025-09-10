# Admin Setup Guide

## Firebase Admin Setup

Your Firebase admin system is now ready! Here's how to get started:

### 1. Firebase Console Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `rccg-king-of-kings-c670a`
3. Enable Authentication:
   - Go to Authentication > Sign-in method
   - Enable Email/Password authentication
4. Set up Firestore Database:
   - Go to Firestore Database
   - Create database in production mode
   - Set up security rules (see below)

### 2. Create Admin User

1. Go to Authentication > Users in Firebase Console
2. Click "Add user"
3. Enter admin email and password
4. This user can now log in to the admin dashboard

### 3. Firestore Security Rules

Add these security rules to your Firestore database:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read access to all collections for public content
    match /events/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    match /sermons/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    match /announcements/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

### 4. Access Admin Dashboard

1. Start your development server: `npm run dev`
2. Navigate to `/admin/login`
3. Log in with your admin credentials
4. You'll be redirected to the admin dashboard

### 5. Admin Features

The admin dashboard allows you to:

- **Events Management**: Add, edit, and delete upcoming events
- **Sermons Management**: Add new sermon recordings with YouTube links
- **Announcements**: Create priority announcements (normal, high, urgent)

### 6. Content Display

All content added through the admin dashboard will automatically appear on the main website:

- Events appear in the "Upcoming Events" section
- Sermons appear in the "Recent Sermons" section  
- Announcements appear prominently on the homepage

### 7. Navigation

- Admin link appears in the navbar when logged in
- Access admin dashboard at `/admin`
- Logout functionality available in the admin dashboard

## Security Notes

- Only authenticated users can modify content
- All content is publicly readable (as intended for a church website)
- Admin authentication is handled by Firebase Auth
- Routes are protected - non-authenticated users are redirected to login

## Troubleshooting

If you encounter issues:

1. Check Firebase Console for authentication and database setup
2. Verify Firestore security rules are properly configured
3. Ensure your Firebase config is correctly set in `src/firebase/config.js`
4. Check browser console for any error messages

## Next Steps

Consider adding:
- Image upload functionality for events
- Bulk import/export features
- User role management
- Content scheduling
- Analytics integration
