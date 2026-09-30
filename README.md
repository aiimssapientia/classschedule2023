# 🩺 AIIMS Bhubaneswar MBBS Batch 2023 Class Calendar (7th Semester)

An editorial, responsive, interactive weekly timetable and academic calendar web application for **AIIMS Bhubaneswar MBBS Batch 2023 (7th Semester, September – November 2026)**.

Built with pure **HTML5, Modern CSS3, and Vanilla JavaScript (ES6+)** with zero external frameworks or heavy dependencies. Fast, mobile-first, offline-capable, and ready to host for free on **GitHub Pages**.

---

## ✨ Features

- **Triple View Engine (Fully Mobile Optimized)**:
  - **📱 Agenda View**: Touch-optimized vertical card stream with sticky day headers, colored subject badges, faculty info, and timing pills.
  - **🗓️ 7-Day Timetable Grid**: Full 8:00 AM to 6:00 PM timetable matrix with sticky time/day headers, touch-friendly day jump strip (Mon–Sun), and horizontal swipe.
  - **⚡ Both View (Split/Combined)**: View both the 7-day grid and daily agenda stream simultaneously on mobile or desktop.
- **105 Verified Classes, Clinical Postings & Skill Lab Sessions**:
  - 👁️ **Ophthalmology** (21 Classes: 20 in LT-4/LT-3 + 1 Nov session)
  - 🩺 **Community Medicine & Family Medicine** (38 Sessions: 29 Theory + 9 Practicals for Groups A & B)
  - 🔬 **General Surgery** (12 Sessions: 9 Theory + 3 Skill Lab Sessions)
  - 🤰 **Obstetrics & Gynaecology** (9 Theory Classes in LT-4/LT-3)
  - 👂 **ENT (Otorhinolaryngology)** (9 Theory Classes in LT-4/LT-3)
  - 💊 **General Medicine** (10 Sessions: 7 Theory + 3 Skill Lab Sessions)
  - 👶 **Paediatrics** (6 Theory Classes in LT-4/LT-3)
- **📅 Interactive Multi-Month Calendar Modal**:
  - Visual dot indicators on every date showing the exact departments conducting sessions.
  - Month Switcher (navigate seamlessly across September, October, and November 2026).
  - Day Inspector Drawer: Click any day to see the full schedule for that date.
- **🔍 Instant Live Search**:
  - Filter instantly by topic (e.g. *Esophagus*, *Granulomatous*, *Zoonosis*, *Dengue*, *Retina*), faculty name, or venue.
- **🏷️ Multi-Filter System**:
  - Filter by **Department** (Ophthalmology, Medicine, Surgery, CMFM, Paediatrics, ENT, OBG).
  - Filter by **Type** (Theory vs. Practical).
  - Filter by **Cohort** (Group A vs. Group B).
- **📲 1-Click Phone Calendar Sync (`.ics`)**:
  - Export standard RFC 5545 `.ics` file (`batch2023.ics`).
  - Import all 105 classes and skill lab sessions with topics, faculty names, and 15-minute reminders into **Google Calendar, Apple Calendar, or Microsoft Outlook**.

---

## 🌐 Live Website

The schedule is hosted live on GitHub Pages:  
👉 **[https://aiimssapientia.github.io/classschedule2023/](https://aiimssapientia.github.io/classschedule2023/)**

---

## 🚀 How to Push Updates to GitHub Pages

Open **PowerShell** or **Command Prompt** on your computer and run these commands:

```bash
cd "c:\Users\MOULIK GORAI\Desktop\website\batch2023-calendar"
git add .
git commit -m "Update October & November 2026 schedule with mobile grid optimizations"
git push origin main
```

Your live site at **`https://aiimssapientia.github.io/classschedule2023/`** will update automatically within 1–2 minutes!

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
