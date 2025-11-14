# Offline Mode Setup - Canara Gym

## Overview
The client application is now configured to run **completely independently without a backend server**. This allows you to host the client on Vercel while still being able to access and demo the dashboard.

## ✅ How It Works

### 1. **Demo Login Credentials**
- **Email:** `user@gmail.com`
- **Password:** `1234`

The login form is pre-filled with these credentials for quick access.

### 2. **Login Flow**
When you click "Login":

1. **Demo Credentials Check** (First Priority)
   - If you use `user@gmail.com` / `1234`, instant offline login
   - Creates a mock JWT token and stores it in localStorage
   - Redirects to dashboard immediately

2. **Server Connection** (Fallback)
   - If you use different credentials, tries to connect to backend
   - If server is unavailable, shows a helpful message
   - Allows offline login with demo credentials as alternative

### 3. **Dashboard**
- Displays 6 mock gym slots when a date is selected
- Each slot shows:
  - Time slot (e.g., "06:00 AM - 07:00 AM")
  - Capacity information (booked/total)
  - Equipment available
  - Status (Available, Almost Full, or Full)

- **Booking in Offline Mode:**
  - Clicking "Book Slot" stores the booking in local state
  - Shows success message with "(offline mode)" indicator
  - Tracks which slots you've already booked

### 4. **Server Connection Fallback**
If the backend server is running:
- App attempts to fetch real slots from `/api/slots?date={date}`
- Real booking goes to `/api/bookings`
- If connection fails, automatically falls back to mock data

## 🚀 Deployment on Vercel

No special configuration needed! The client works as-is:

1. Deploy to Vercel as usual (no backend required)
2. Users can login with demo credentials
3. Users can see and interact with mock gym slots
4. Perfect for demos and prototypes

## 📝 Running Locally

```bash
cd /home/prateekprakashkini/Project/canaragym/client
npm start
```

The app will:
- Open at http://localhost:3000
- Show login page with demo credentials pre-filled
- Work completely offline
- Optionally connect to backend if available

## 🔧 Files Modified

### Client Files Updated:
1. **`src/pages/Login.js`**
   - Added offline demo login
   - Automatic fallback when server unavailable
   - Better error messages

2. **`src/pages/Dashboard.js`**
   - Added mock slot data (6 demo slots)
   - Offline mode with local booking state
   - Automatic fallback from API to mock data
   - Offline mode badge shown to users

3. **`src/components/SlotCard.js`**
   - Updated to support both API format and mock format
   - Shows "Already Booked" status for booked slots
   - Handles both `booked` and `bookedCount` properties

### Backend (Optional):
- Still works if running
- Will be used automatically if available
- Not required for basic functionality

## 🎯 Features

✅ No server required for basic functionality
✅ Demo credentials for instant access
✅ Mock gym slots for testing
✅ Book slots in offline mode
✅ Automatic server fallback
✅ Better error handling
✅ Works perfectly on Vercel

## 📱 Demo Workflow

1. Visit the deployed app
2. Login with: `user@gmail.com` / `1234`
3. Select a date (tomorrow or later)
4. View available gym slots
5. Click "Book Slot" to make a booking
6. See confirmation message

## 💡 Future Enhancements

When backend is ready:
- Just ensure MongoDB URI in `.env`
- Start the server
- Client will automatically use real API endpoints
- No code changes needed in client!

## 🆘 Troubleshooting

**Q: Getting "Invalid credentials" error?**
A: Make sure you're using exactly: `user@gmail.com` and `1234`

**Q: Slots not loading after date selection?**
A: This is normal in offline mode. App shows demo slots automatically.

**Q: Want to connect to real backend?**
A: Set `REACT_APP_API_URL` environment variable in `.env.local`

---

**Status:** ✅ Ready for Vercel deployment
**Last Updated:** November 14, 2025
