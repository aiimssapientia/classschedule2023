# 🩺 AIIMS Bhubaneswar MBBS Batch 2023 Class Calendar (7th Semester)

An editorial, responsive, interactive weekly timetable and academic calendar web application for **AIIMS Bhubaneswar MBBS Batch 2023 (7th Semester, September 2026)**.

Built with pure **HTML5, Modern CSS3, and Vanilla JavaScript (ES6+)** with zero external frameworks or heavy dependencies. Fast, mobile-first, offline-capable, and ready to host for free on **GitHub Pages**.

---

## ✨ Features

- **Dual View Engine**:
  - **📱 Mobile Agenda View**: Touch-optimized vertical card feed with clean subject pills, faculty badges, and timing indicators.
  - **🖥️ 7-Day Timetable Grid**: 8:00 AM to 6:00 PM timetable matrix showcasing how Ophthalmology, CMFM, ENT, OBG, Surgery, and Medicine seamlessly interlock.
- **59 Verified Classes & Clinical Postings**:
  - 👁️ **Ophthalmology** (14 Theory Classes)
  - 🩺 **Community Medicine & Family Medicine** (14 Theory + 9 Practicals for Groups A & B)
  - 💊 **General Medicine** (6 Theory Classes in LT-3)
  - 🔬 **General Surgery** (5 Theory Classes in LT-3)
  - 🤰 **Obstetrics & Gynaecology** (4 Theory Classes in LT-3)
  - 👂 **ENT (Otorhinolaryngology)** (4 Theory Classes in LT-3)
  - 👶 **Paediatrics** (3 Theory Classes in LT-3)
- **📅 Interactive Month Calendar Modal**:
  - Visual dot indicators on every date showing the exact departments conducting sessions.
  - Day Inspector Drawer: Click any day to see the full schedule for that date.
- **🔍 Instant Live Search**:
  - Filter instantly by topic (e.g. *Dengue*, *Retina*, *RCT*, *Vaccine*), faculty name, or venue.
- **🏷️ Multi-Filter System**:
  - Filter by **Department** (Ophthalmology, Medicine, Surgery, CMFM, Paediatrics, ENT, OBG).
  - Filter by **Type** (Theory vs. Practical).
  - Filter by **Cohort** (Group A vs. Group B).
- **📲 1-Click Phone Calendar Sync (`.ics`)**:
  - Export standard RFC 5545 `.ics` file (`batch2023.ics`).
  - Import all 59 classes with topics, faculty names, and 15-minute reminders into **Google Calendar, Apple Calendar, or Microsoft Outlook**.
- **🖨️ Publication-Grade Print & PDF View**:
  - Formal institutional letterhead with official crest, Ref. No., weekly matrix, and 3-column signatory stamps.

---

## 🚀 How to Host on GitHub Pages (Free)

Follow these 3 simple steps to host this calendar on GitHub at `https://<your-username>.github.io/batch2023-calendar/`:

### Step 1: Create a GitHub Repository
1. Log into your GitHub account at [github.com](https://github.com).
2. Click the **`+`** icon in the top right corner and choose **"New repository"**.
3. Repository name: `batch2023-calendar` (or any name you choose).
4. Set it to **Public**.
5. Leave "Add a README file" **unchecked** (we already have one).
6. Click **"Create repository"**.

### Step 2: Push your code from your computer
Open **PowerShell** or **Command Prompt** on your computer and run these commands:

```bash
cd "c:\Users\MOULIK GORAI\Desktop\website\batch2023-calendar"
git init
git add .
git commit -m "AIIMS Bhubaneswar MBBS Batch 2023 Class Calendar"
git branch -M main
git remote add origin https://github.com/<YOUR-USERNAME>/batch2023-calendar.git
git push -u origin main
```
*(Replace `<YOUR-USERNAME>` with your actual GitHub username).*

### Step 3: Enable GitHub Pages
1. Go to your repository on GitHub (`https://github.com/<YOUR-USERNAME>/batch2023-calendar`).
2. Click **Settings** (tab at the top).
3. In the left sidebar, click **Pages**.
4. Under **Build and deployment > Branch**:
   - Select branch: `main`
   - Select folder: `/(root)`
   - Click **Save**.
5. Within 1 minute, your website will be live at:  
   👉 **`https://<YOUR-USERNAME>.github.io/batch2023-calendar/`**

---

## 📱 How to Sync with Google Calendar / iPhone Calendar

1. Click the **"Sync Phone (.ICS)"** button in the website header or footer.
2. An `aiims-mbbs-batch2023-september-schedule.ics` file will download.
3. **On iPhone / Mac**:
   - Double-click the file to open **Apple Calendar**, choose your target calendar, and click **Add All**.
4. **On Android / Google Calendar**:
   - Open [calendar.google.com](https://calendar.google.com) on your browser.
   - Click the gear icon ⚙️ > **Settings** > **Import & Export**.
   - Select the `.ics` file and click **Import**.
   - All 59 lectures and clinical postings will now show up with automatic 15-minute reminders before every class!

---

## ⚡ Instant Local Testing (Without GitHub)

You can also run it instantly on your computer:
1. Double-click `index.html` to open it directly in Chrome, Edge, Safari, or Firefox.
2. Or run a lightweight local Python server:
   ```bash
   cd "c:\Users\MOULIK GORAI\Desktop\website\batch2023-calendar"
   python -m http.server 8080
   ```
   Then visit [http://localhost:8080](http://localhost:8080).
