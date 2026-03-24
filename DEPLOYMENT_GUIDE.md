# How to Deploy Nitro-Gen to the Internet

The absolute easiest, fastest, and most professional way to host a modern React (Vite) application like this is using a service called **Vercel**. It is free, built specifically for frameworks like yours, and takes about 5 minutes.

Here is the step-by-step guide.

---

### Step 1: Create a GitHub Account (If you don't have one)
Vercel works by connecting to your code repository.
1. Go to [github.com](https://github.com/) and create a free account.
2. Once logged in, click the **"+"** icon in the top right and select **New repository**.
3. Name it `nitro-gen-website`.
4. Keep it **Private** or **Public** (your choice).
5. Click **Create repository**.
6. Leave that tab open; we'll need it in Step 2.

### Step 2: Push Your Code to GitHub
You need to send the code on your laptop up to that GitHub repository.
Open a new Terminal window on your Mac, and run these commands one by one:

```bash
# Move into your project folder
cd /Users/omar/Documents/Nitrowebsite1

# Initialize the code tracker
git init

# Add all your files (the period is important!)
git add .

# Save your first version
git commit -m "Initial commit of Nitro-Gen Cinematic Site"

# Connect your local folder to GitHub (Replace 'YOUR_USERNAME' with your actual GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/nitro-gen-website.git

# Push the code up to the internet
git branch -M main
git push -u origin main
```
*(Note: If Git asks you to log in, follow the prompts to authenticate via your browser).*

### Step 3: Deploy on Vercel
1. Go to [vercel.com](https://vercel.com/) and sign up for a free account. **Important:** Sign up using the "Continue with GitHub" button.
2. Once logged into the Vercel dashboard, click **Add New...** and select **Project**.
3. You will see a list of your GitHub repositories. Find `nitro-gen-website` and click **Import**.
4. You don't need to change *any* of the settings on the next screen. Vercel automatically detects that you are using Vite and React.
5. Click the big **Deploy** button.

### That's it! 🚀
Vercel will now spend about 30 seconds building your app. Once it’s done, you will get a live `.vercel.app` URL (e.g., `nitro-gen-website.vercel.app`) that you can immediately send to anyone in the world.

### Step 4 (Optional): Add Your Custom Domain
If you own `nitro-gen.com` (or similar), you can link it easily:
1. In your Vercel project dashboard, click **Settings**.
2. Go to **Domains**.
3. Type in your custom domain and click **Add**.
4. Vercel will give you a couple of DNS records (like an A Record or CNAME) to copy and paste into whoever you bought the domain from (GoDaddy, Namecheap, Google Domains).
5. Once pasted, Vercel will automatically generate a free SSL certificate (`https://`) and link your site!
