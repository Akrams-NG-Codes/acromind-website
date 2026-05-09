# 🎪 AcroMind Admin Dashboard Setup Guide

This guide walks you through setting up the complete admin dashboard for managing events, programs, gallery, and blog posts.

## ✅ **Setup Checklist**

- [x] Environment variables configured
- [ ] Database schema created in Supabase
- [ ] Storage bucket created in Supabase
- [ ] Admin user account created
- [ ] Login to dashboard and manage content

---

## 📋 **Step 1: Database Setup (Supabase)**

### What to do:
1. Go to **[Supabase Dashboard](https://supabase.com/dashboard)**
2. Select your project: **gpzefahctyefldkmmcmi**
3. Navigate to **SQL Editor** (left sidebar)
4. Click **"New Query"**
5. Copy the entire contents of `DATABASE_SETUP.sql` from your project
6. Paste it into the SQL Editor
7. Click **"Run"** button
8. You should see success messages for all tables created

### Tables Created:
- `programs` - Manage your circus programs
- `events` - Manage events and workshops
- `gallery` - Manage photo galleries
- `blog_posts` - Manage blog content

---

## 🪣 **Step 2: Storage Bucket Setup (Supabase)**

### What to do:
1. In **Supabase Dashboard**, go to **Storage** (left sidebar)
2. Click **"Create a new bucket"**
3. Bucket name: **`acromind-images`**
4. ✅ Check **"Make the bucket public"**
5. Click **"Create bucket"**

This bucket stores all your images for events, gallery, and blog posts.

---

## 👥 **Step 3: Create Your Admin Account**

### What to do:
1. Make sure the development server is running:
   ```bash
   npm run dev
   ```
2. Open your browser to: **`http://localhost:3000/admin/create-user`**
3. Fill out the form:
   - **Full Name**: Your name
   - **Email**: Your email (e.g., plusmycode@gmail.com)
   - **Password**: Choose a strong password (minimum 6 characters)
4. Click **"Create Admin User"**
5. You'll see: **"Admin user created successfully!"**
6. **Check your email** for a confirmation link from Supabase
7. Click the confirmation link to verify your account

### Troubleshooting:
- If you get an error, check that:
  - The development server is running (`npm run dev`)
  - Your Supabase credentials are correct in `.env.local`
  - You can open `http://localhost:3000` without errors

---

## 🔐 **Step 4: Login to Dashboard**

### What to do:
1. Go to: **`http://localhost:3000/admin/login`**
2. Enter your email and password (from Step 3)
3. Click **"Sign In"**
4. You should see the admin dashboard

### What's on the Dashboard:
- 📅 **Manage Events** - Add/edit/delete events
- 🎪 **Manage Programs** - Manage your circus programs
- 🖼️ **Manage Gallery** - Upload and organize photos
- ✍️ **Manage Blog** - Write and publish blog posts

---

## 🚀 **Step 5: Start Managing Content**

Once logged in, you can:

### **Add Events**
1. Click **"Manage Events"** or go to `/admin/events`
2. Click **"+ New Event"**
3. Fill out event details (title, date, location, description, image)
4. Click **"Save Event"**

### **Add Programs**
1. Click **"Manage Programs"** or go to `/admin/programs`
2. Click **"+ New Program"**
3. Fill out program details
4. Click **"Save Program"**

### **Add Gallery Images**
1. Click **"Manage Gallery"** or go to `/admin/gallery`
2. Click **"+ New Image"**
3. Upload an image
4. Fill out details
5. Click **"Save Image"**

### **Write Blog Posts**
1. Click **"Manage Blog"** or go to `/admin/blog`
2. Click **"+ New Post"**
3. Write your blog post
4. Click **"Publish"** if you want it live, or keep as draft
5. Click **"Save Post"**

---

## 🔗 **Quick Links**

During development:
- **Home**: `http://localhost:3000`
- **Create Admin**: `http://localhost:3000/admin/create-user`
- **Login**: `http://localhost:3000/admin/login`
- **Dashboard**: `http://localhost:3000/admin/dashboard`
- **Manage Events**: `http://localhost:3000/admin/events`
- **Manage Programs**: `http://localhost:3000/admin/programs`
- **Manage Gallery**: `http://localhost:3000/admin/gallery`
- **Manage Blog**: `http://localhost:3000/admin/blog`

---

## 🆘 **Troubleshooting**

### "Page Not Found" errors
- Make sure the dev server is running: `npm run dev`
- Try refreshing the page
- Check that you're using the correct URLs

### "Cannot connect to database" errors
- Verify your Supabase URL and keys in `.env.local`
- Check that the database tables were created in Step 1
- Ensure your Supabase project is active

### Login not working
- Check that you confirmed your email
- Verify you're using the correct email and password
- Clear browser cookies and try again

### Images not uploading
- Check that you created the `acromind-images` storage bucket
- Verify the bucket is set to **public**
- Try uploading a smaller image file

---

## 📝 **Environment Variables**

Your `.env.local` should contain:
```
NEXT_PUBLIC_SUPABASE_URL=https://gpzefahctyefldkmmcmi.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
NEXT_PUBLIC_APP_NAME=AcroMind Initiative
```

These are already configured for you!

---

## 🎯 **Next Steps**

1. ✅ Complete all setup steps above
2. 🎪 Start adding your events, programs, and gallery content
3. 📝 Write blog posts about your initiatives
4. 🚀 Deploy to production when ready

---

**Need help?** Check the error messages in your browser console (F12) or the terminal running `npm run dev` for more details.
