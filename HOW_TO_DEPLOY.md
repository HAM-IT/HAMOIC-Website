# 🚀 How to Push Updates to habomic.com

Every time you make changes to your website code, you need to run **3 commands** in your terminal to push them live. That's it.

---

## The 3 Commands

Open **Terminal** on your Mac and run these one by one:

```bash
cd /Users/omar/Documents/Nitrowebsite1

git add .

git commit -m "describe what you changed here"

git push
```

### What each command does:

| Command | What it does |
|---|---|
| `cd /Users/omar/Documents/Nitrowebsite1` | Moves into your project folder (only needed if you just opened Terminal) |
| `git add .` | Stages all your file changes (the `.` means "everything") |
| `git commit -m "your message"` | Saves a snapshot with a description of what you changed |
| `git push` | Sends the code to GitHub → Vercel auto-deploys → habomic.com updates |

---

## Example

Let's say you just updated the hero text. You'd run:

```bash
cd /Users/omar/Documents/Nitrowebsite1
git add .
git commit -m "Updated hero section text"
git push
```

**Within 30–60 seconds**, Vercel rebuilds and your live site at **habomic.com** is updated. No extra steps needed.

---

## Quick Reference (Copy-Paste Ready)

If you just want to push fast, copy this entire block:

```bash
cd /Users/omar/Documents/Nitrowebsite1 && git add . && git commit -m "Website update" && git push
```

This runs all 4 commands in one line.

---

## How It Works (Behind the Scenes)

```
You edit code → git push → GitHub receives code → Vercel detects change → Builds automatically → habomic.com is updated
```

You never need to touch Vercel, Cloudflare, or any dashboard. Just `git push` and it's live.

---

## Common Issues

### "Nothing to commit, working tree clean"
This means you haven't saved any changes in your code editor. Save your files first, then try again.

### "Please tell me who you are" (first time only)
Run these two commands once:
```bash
git config --global user.name "Omar"
git config --global user.email "omarabouelouafa303@gmail.com"
```

### "Permission denied" or authentication error
Git may ask you to log in to GitHub. Follow the browser prompt to authenticate.

---

## Summary

**Every time you change anything on the website:**

```bash
cd /Users/omar/Documents/Nitrowebsite1
git add .
git commit -m "What I changed"
git push
```

**That's it. 3 commands. 30 seconds. Site is live.** 🍌
