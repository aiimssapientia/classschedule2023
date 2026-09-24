/**
 * ============================================================================
 * AIIMS Bhubaneswar MBBS Batch 2023 (7th Semester) - app.js
 * Comprehensive Interactive Calendar & Timetable Engine
 * ============================================================================
 */

/* ---------- CONFIGURATION & THEMES ---------- */
const DAYS        = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const DAY_SHORT   = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June',
                     'July', 'August', 'September', 'October', 'November', 'December'];
const GRID_START  = 8;   // 08:00 AM
const GRID_END    = 18;  // 06:00 PM
const SLOT_HEIGHT = 64;  // Height in px per hour row

// Department Theme Tokens
const DEPT_THEMES = {
  'Ophthalmology': {
    bg: 'var(--opht-bg)',
    border: 'var(--opht-border)',
    accent: 'var(--opht-accent)',
    text: 'var(--opht-text)',
    short: 'Opht'
  },
  'Community Medicine & Family Medicine': {
    bg: 'var(--cmfm-bg)',
    border: 'var(--cmfm-border)',
    accent: 'var(--cmfm-accent)',
    text: 'var(--cmfm-text)',
    short: 'CMFM'
  },
  'General Medicine': {
    bg: 'var(--med-bg)',
    border: 'var(--med-border)',
    accent: 'var(--med-accent)',
    text: 'var(--med-text)',
    short: 'Medicine'
  },
  'General Surgery': {
    bg: 'var(--surg-bg)',
    border: 'var(--surg-border)',
    accent: 'var(--surg-accent)',
    text: 'var(--surg-text)',
    short: 'Surgery'
  },
  'Obstetrics & Gynaecology': {
    bg: 'var(--obg-bg)',
    border: 'var(--obg-border)',
    accent: 'var(--obg-accent)',
    text: 'var(--obg-text)',
    short: 'OBG'
  },
  'ENT': {
    bg: 'var(--ent-bg)',
    border: 'var(--ent-border)',
    accent: 'var(--ent-accent)',
    text: 'var(--ent-text)',
    short: 'ENT'
  },
  'Paediatrics': {
    bg: 'var(--paed-bg)',
    border: 'var(--paed-border)',
    accent: 'var(--paed-accent)',
    text: 'var(--paed-text)',
    short: 'Paediatrics'
  }
};

function getDeptTheme(dept) {
  return DEPT_THEMES[dept] || {
    bg: '#F1F5F9',
    border: '#CBD5E1',
    accent: '#475569',
    text: '#0F172A',
    short: dept || 'Class'
  };
}

/* ---------- EMBEDDED SCHEDULE DATASET (OFFLINE & FILE:// SAFE) ---------- */
const EMBEDDED_SCHEDULE = [
  // --- 1. OPHTHALMOLOGY (14 classes) ---
  { id: "opht-01", department: "Ophthalmology", subject: "Ophthalmology", class_type: "Theory", topic: "Amblyopia and BSV", faculty: "Dr S Parija", room: "LT-3", date: "2026-09-03", day: "Thursday", start_time: "16:00", end_time: "17:00", group: "all", notes: "Dept. of Ophthalmology • 7th Semester MBBS 2023" },
  { id: "opht-02", department: "Ophthalmology", subject: "Ophthalmology", class_type: "Theory", topic: "Thyroid Eye Disease", faculty: "Dr B Panda", room: "LT-3", date: "2026-09-04", day: "Friday", start_time: "08:00", end_time: "09:00", group: "all", notes: "Dept. of Ophthalmology • 7th Semester MBBS 2023" },
  { id: "opht-03", department: "Ophthalmology", subject: "Ophthalmology", class_type: "Theory", topic: "Eye Banking", faculty: "Dr B Nayak", room: "LT-3", date: "2026-09-07", day: "Monday", start_time: "08:00", end_time: "09:00", group: "all", notes: "Dept. of Ophthalmology • 7th Semester MBBS 2023" },
  { id: "opht-04", department: "Ophthalmology", subject: "Ophthalmology", class_type: "Theory", topic: "ROP (Retinopathy of Prematurity)", faculty: "Dr S K Sahu", room: "LT-3", date: "2026-09-10", day: "Thursday", start_time: "16:00", end_time: "17:00", group: "all", notes: "Dept. of Ophthalmology • 7th Semester MBBS 2023" },
  { id: "opht-05", department: "Ophthalmology", subject: "Ophthalmology", class_type: "Theory", topic: "Orbitocellulities and CV thrombocix", faculty: "Dr B Panda", room: "LT-3", date: "2026-09-11", day: "Friday", start_time: "08:00", end_time: "09:00", group: "all", notes: "Dept. of Ophthalmology • 7th Semester MBBS 2023" },
  { id: "opht-06", department: "Ophthalmology", subject: "Ophthalmology", class_type: "Theory", topic: "Surgical aspects of retinal disease", faculty: "Dr P Mishra", room: "LT-3", date: "2026-09-11", day: "Friday", start_time: "14:00", end_time: "15:00", group: "all", notes: "Dept. of Ophthalmology • 7th Semester MBBS 2023" },
  { id: "opht-07", department: "Ophthalmology", subject: "Ophthalmology", class_type: "Theory", topic: "Anatomy of Visual pathway and its lesions", faculty: "Dr B Nayak", room: "LT-3", date: "2026-09-14", day: "Monday", start_time: "08:00", end_time: "09:00", group: "all", notes: "Dept. of Ophthalmology • 7th Semester MBBS 2023" },
  { id: "opht-08", department: "Ophthalmology", subject: "Ophthalmology", class_type: "Theory", topic: "Vascular Disorders of Retina", faculty: "Dr B Maharana", room: "LT-3", date: "2026-09-17", day: "Thursday", start_time: "16:00", end_time: "17:00", group: "all", notes: "Dept. of Ophthalmology • 7th Semester MBBS 2023" },
  { id: "opht-09", department: "Ophthalmology", subject: "Ophthalmology", class_type: "Theory", topic: "Pupillary reflections and its anomalies", faculty: "Dr P Mishra", room: "LT-3", date: "2026-09-18", day: "Friday", start_time: "08:00", end_time: "09:00", group: "all", notes: "Dept. of Ophthalmology • 7th Semester MBBS 2023" },
  { id: "opht-10", department: "Ophthalmology", subject: "Ophthalmology", class_type: "Theory", topic: "Mucormycosis", faculty: "Dr S K Sahu", room: "LT-3", date: "2026-09-21", day: "Monday", start_time: "08:00", end_time: "09:00", group: "all", notes: "Dept. of Ophthalmology • 7th Semester MBBS 2023" },
  { id: "opht-11", department: "Ophthalmology", subject: "Ophthalmology", class_type: "Theory", topic: "Nystagmus", faculty: "Dr P Mishra", room: "LT-3", date: "2026-09-24", day: "Thursday", start_time: "16:00", end_time: "17:00", group: "all", notes: "Dept. of Ophthalmology • 7th Semester MBBS 2023" },
  { id: "opht-12", department: "Ophthalmology", subject: "Ophthalmology", class_type: "Theory", topic: "Disease of Vitreous", faculty: "Dr B Maharana", room: "LT-3", date: "2026-09-25", day: "Friday", start_time: "08:00", end_time: "09:00", group: "all", notes: "Dept. of Ophthalmology • 7th Semester MBBS 2023" },
  { id: "opht-13", department: "Ophthalmology", subject: "Ophthalmology", class_type: "Theory", topic: "Eye in systemic disorders", faculty: "Dr B Nayak", room: "LT-3", date: "2026-09-25", day: "Friday", start_time: "14:00", end_time: "15:00", group: "all", notes: "Dept. of Ophthalmology • 7th Semester MBBS 2023" },
  { id: "opht-14", department: "Ophthalmology", subject: "Ophthalmology", class_type: "Theory", topic: "Orbital Tumors", faculty: "Dr B Panda", room: "LT-3", date: "2026-09-28", day: "Monday", start_time: "08:00", end_time: "09:00", group: "all", notes: "Dept. of Ophthalmology • 7th Semester MBBS 2023" },

  // --- 2. OBSTETRICS & GYNAECOLOGY (OBG) (4 classes) ---
  { id: "obg-01", department: "Obstetrics & Gynaecology", subject: "OBG", class_type: "Theory", topic: "Induction and augmentation of labour", faculty: "Dr S. Mitra", room: "LT-3", date: "2026-09-04", day: "Friday", start_time: "16:00", end_time: "17:00", group: "all", notes: "Dept. of Obstetrics & Gynaecology • Batch 2023 7th Sem" },
  { id: "obg-02", department: "Obstetrics & Gynaecology", subject: "OBG", class_type: "Theory", topic: "Antepartum fetal assessment", faculty: "Dr I. Mohapatra", room: "LT-3", date: "2026-09-11", day: "Friday", start_time: "16:00", end_time: "17:00", group: "all", notes: "Dept. of Obstetrics & Gynaecology • Batch 2023 7th Sem" },
  { id: "obg-03", department: "Obstetrics & Gynaecology", subject: "OBG", class_type: "Theory", topic: "Intrapartum fetal assessment", faculty: "Dr Deepthi", room: "LT-3", date: "2026-09-18", day: "Friday", start_time: "16:00", end_time: "17:00", group: "all", notes: "Dept. of Obstetrics & Gynaecology • Batch 2023 7th Sem" },
  { id: "obg-04", department: "Obstetrics & Gynaecology", subject: "OBG", class_type: "Theory", topic: "Placenta Previa", faculty: "Dr S. Singh", room: "LT-3", date: "2026-09-25", day: "Friday", start_time: "16:00", end_time: "17:00", group: "all", notes: "Dept. of Obstetrics & Gynaecology • Batch 2023 7th Sem" },

  // --- 3. GENERAL MEDICINE (6 classes) ---
  { id: "med-01", department: "General Medicine", subject: "Medicine", class_type: "Theory", topic: "Bronchiectasis and Lung Abscess Part 1", faculty: "Dr. Anupama", room: "LT-3", date: "2026-09-01", day: "Tuesday", start_time: "08:00", end_time: "09:00", group: "all", notes: "Dept. of General Medicine • 7th Semester (Batch 2023)" },
  { id: "med-02", department: "General Medicine", subject: "Medicine", class_type: "Theory", topic: "Pneumonia Part 1", faculty: "Dr. Anupam", room: "LT-3", date: "2026-09-05", day: "Saturday", start_time: "08:00", end_time: "09:00", group: "all", notes: "Dept. of General Medicine • 7th Semester (Batch 2023)" },
  { id: "med-03", department: "General Medicine", subject: "Medicine", class_type: "Theory", topic: "Pleural Diseases Part 1", faculty: "Dr. Rashmi", room: "LT-3", date: "2026-09-12", day: "Saturday", start_time: "08:00", end_time: "09:00", group: "all", notes: "Dept. of General Medicine • 7th Semester (Batch 2023)" },
  { id: "med-04", department: "General Medicine", subject: "Medicine", class_type: "Theory", topic: "Pleural Diseases Part 2", faculty: "Dr. Rashmi", room: "LT-3", date: "2026-09-15", day: "Tuesday", start_time: "08:00", end_time: "09:00", group: "all", notes: "Dept. of General Medicine • 7th Semester (Batch 2023)" },
  { id: "med-05", department: "General Medicine", subject: "Medicine", class_type: "Theory", topic: "Pneumonia Part 2", faculty: "Dr. Anupam", room: "LT-3", date: "2026-09-19", day: "Saturday", start_time: "08:00", end_time: "09:00", group: "all", notes: "Dept. of General Medicine • 7th Semester (Batch 2023)" },
  { id: "med-06", department: "General Medicine", subject: "Medicine", class_type: "Theory", topic: "Bronchiectasis and Lung Abscess Part 2", faculty: "Dr. Anupama", room: "LT-3", date: "2026-09-26", day: "Saturday", start_time: "08:00", end_time: "09:00", group: "all", notes: "Dept. of General Medicine • 7th Semester (Batch 2023)" },

  // --- 4. GENERAL SURGERY (5 classes) ---
  { id: "surg-01", department: "General Surgery", subject: "Surgery", class_type: "Theory", topic: "System specific post-operative complications and management", faculty: "Dr. Shantanu Kumar Sahu", room: "LT-3", date: "2026-09-02", day: "Wednesday", start_time: "08:00", end_time: "09:00", group: "all", notes: "Dept. of General Surgery • MBBS batch 2023 7th Sem" },
  { id: "surg-02", department: "General Surgery", subject: "Surgery", class_type: "Theory", topic: "Urinary symptoms", faculty: "Dr Monica Gureh", room: "LT-3", date: "2026-09-09", day: "Wednesday", start_time: "08:00", end_time: "09:00", group: "all", notes: "Dept. of General Surgery • MBBS batch 2023 7th Sem" },
  { id: "surg-03", department: "General Surgery", subject: "Surgery", class_type: "Theory", topic: "Trauma & Emergency Medicine (T & EM)", faculty: "T & EM Faculty", room: "LT-3", date: "2026-09-16", day: "Wednesday", start_time: "08:00", end_time: "09:00", group: "all", notes: "Dept. of General Surgery / T & EM • MBBS batch 2023 7th Sem" },
  { id: "surg-04", department: "General Surgery", subject: "Surgery", class_type: "Theory", topic: "Thyroid IV (Mechanism and role of RAI in thyroid disorders)", faculty: "Dr Sai Patro (Nuclear Medicine)", room: "LT-3", date: "2026-09-23", day: "Wednesday", start_time: "08:00", end_time: "09:00", group: "all", notes: "Dept. of General Surgery & Nuclear Medicine • MBBS batch 2023 7th Sem" },
  { id: "surg-05", department: "General Surgery", subject: "Surgery", class_type: "Theory", topic: "Trauma & Emergency Medicine (T & EM)", faculty: "T & EM Faculty", room: "LT-3", date: "2026-09-30", day: "Wednesday", start_time: "08:00", end_time: "09:00", group: "all", notes: "Dept. of General Surgery / T & EM • MBBS batch 2023 7th Sem" },

  // --- 5. CMFM THEORY (14 classes) ---
  { id: "cmfm-t-01", department: "Community Medicine & Family Medicine", subject: "CMFM", class_type: "Theory", topic: "Health Planning & Management-IV", faculty: "Dr Sonu H Subba", room: "LT-3", date: "2026-09-03", day: "Thursday", start_time: "08:00", end_time: "09:00", group: "all", notes: "Dept. of Community Medicine & Family Medicine • 7th Sem MBBS 2023" },
  { id: "cmfm-t-02", department: "Community Medicine & Family Medicine", subject: "CMFM", class_type: "Theory", topic: "ASHA, AWW and MPHW/ANM", faculty: "Dr Binod Kumar Behera", room: "LT-3", date: "2026-09-03", day: "Thursday", start_time: "14:00", end_time: "15:00", group: "all", notes: "Dept. of Community Medicine & Family Medicine • 7th Sem MBBS 2023" },
  { id: "cmfm-t-03", department: "Community Medicine & Family Medicine", subject: "CMFM", class_type: "Theory", topic: "Health Facility Assessment & Quality Assurance", faculty: "Dr Arvind Kumar Singh", room: "LT-3", date: "2026-09-04", day: "Friday", start_time: "14:00", end_time: "15:00", group: "all", notes: "Dept. of Community Medicine & Family Medicine • 7th Sem MBBS 2023" },
  { id: "cmfm-t-04", department: "Community Medicine & Family Medicine", subject: "CMFM", class_type: "Theory", topic: "PCT / Revision Planning & Management", faculty: "Dr Sonu H Subba", room: "LT-3", date: "2026-09-04", day: "Friday", start_time: "15:00", end_time: "16:00", group: "all", notes: "Dept. of Community Medicine & Family Medicine • 7th Sem MBBS 2023" },
  { id: "cmfm-t-05", department: "Community Medicine & Family Medicine", subject: "CMFM", class_type: "Theory", topic: "Community based Rehabilitation", faculty: "Dr Arvind Kumar Singh", room: "LT-3", date: "2026-09-10", day: "Thursday", start_time: "08:00", end_time: "09:00", group: "all", notes: "Dept. of Community Medicine & Family Medicine • 7th Sem MBBS 2023" },
  { id: "cmfm-t-06", department: "Community Medicine & Family Medicine", subject: "CMFM", class_type: "Theory", topic: "RMNCHA Overview", faculty: "Dr Swayam Pragyan Parida", room: "LT-3", date: "2026-09-10", day: "Thursday", start_time: "14:00", end_time: "15:00", group: "all", notes: "Dept. of Community Medicine & Family Medicine • 7th Sem MBBS 2023" },
  { id: "cmfm-t-07", department: "Community Medicine & Family Medicine", subject: "CMFM", class_type: "Theory", topic: "Respiratory Infections (Influenza)", faculty: "Dr Arvind Kumar Singh", room: "LT-3", date: "2026-09-11", day: "Friday", start_time: "15:00", end_time: "16:00", group: "all", notes: "Dept. of Community Medicine & Family Medicine • 7th Sem MBBS 2023" },
  { id: "cmfm-t-08", department: "Community Medicine & Family Medicine", subject: "CMFM", class_type: "Theory", topic: "National Programs on Nutrition of Mothers & Children", faculty: "Dr Arvind Kumar Singh", room: "LT-3", date: "2026-09-17", day: "Thursday", start_time: "08:00", end_time: "09:00", group: "all", notes: "Dept. of Community Medicine & Family Medicine • 7th Sem MBBS 2023" },
  { id: "cmfm-t-09", department: "Community Medicine & Family Medicine", subject: "CMFM", class_type: "Theory", topic: "Family Medicine", faculty: "Dr Sonu H Subba", room: "LT-3", date: "2026-09-17", day: "Thursday", start_time: "14:00", end_time: "15:00", group: "all", notes: "Dept. of Community Medicine & Family Medicine • 7th Sem MBBS 2023" },
  { id: "cmfm-t-10", department: "Community Medicine & Family Medicine", subject: "CMFM", class_type: "Theory", topic: "PCT 2", faculty: "Dr Swayam Pragyan Parida", room: "LT-3", date: "2026-09-18", day: "Friday", start_time: "14:00", end_time: "15:00", group: "all", notes: "Dept. of Community Medicine & Family Medicine • 7th Sem MBBS 2023" },
  { id: "cmfm-t-11", department: "Community Medicine & Family Medicine", subject: "CMFM", class_type: "Theory", topic: "NITI Aayog", faculty: "Dr Binod Kumar Behera", room: "LT-3", date: "2026-09-18", day: "Friday", start_time: "15:00", end_time: "16:00", group: "all", notes: "Dept. of Community Medicine & Family Medicine • 7th Sem MBBS 2023" },
  { id: "cmfm-t-12", department: "Community Medicine & Family Medicine", subject: "CMFM", class_type: "Theory", topic: "Intestinal Infections (Cholera, Typhoid)", faculty: "Dr Swayam Pragyan Parida", room: "LT-3", date: "2026-09-24", day: "Thursday", start_time: "08:00", end_time: "09:00", group: "all", notes: "Dept. of Community Medicine & Family Medicine • 7th Sem MBBS 2023" },
  { id: "cmfm-t-13", department: "Community Medicine & Family Medicine", subject: "CMFM", class_type: "Theory", topic: "Zoonosis (Taeniasis, Leishmaniasis and Hydatid)", faculty: "Dr Arvind Kumar Singh", room: "LT-3", date: "2026-09-24", day: "Thursday", start_time: "14:00", end_time: "15:00", group: "all", notes: "Dept. of Community Medicine & Family Medicine • 7th Sem MBBS 2023" },
  { id: "cmfm-t-14", department: "Community Medicine & Family Medicine", subject: "CMFM", class_type: "Theory", topic: "Zoonosis (KFD, Chikungunya, Salmonellosis)", faculty: "Dr Arvind Kumar Singh", room: "LT-3", date: "2026-09-25", day: "Friday", start_time: "15:00", end_time: "16:00", group: "all", notes: "Dept. of Community Medicine & Family Medicine • 7th Sem MBBS 2023" },

  // --- 6. PAEDIATRICS (3 classes) ---
  { id: "paed-01", department: "Paediatrics", subject: "Paediatrics", class_type: "Theory", topic: "Dengue", faculty: "Prof. Dr. Bhagirathi Dwibedi", room: "LT-3", date: "2026-09-08", day: "Tuesday", start_time: "08:00", end_time: "09:00", group: "all", notes: "Dept. of Paediatrics • 7th Semester (2023 BATCH)" },
  { id: "paed-02", department: "Paediatrics", subject: "Paediatrics", class_type: "Theory", topic: "Common bacterial infection in children", faculty: "Prof. Dr. Rashmi Ranjan Das", room: "LT-3", date: "2026-09-22", day: "Tuesday", start_time: "08:00", end_time: "09:00", group: "all", notes: "Dept. of Paediatrics • 7th Semester (2023 BATCH)" },
  { id: "paed-03", department: "Paediatrics", subject: "Paediatrics", class_type: "Theory", topic: "Pneumonia", faculty: "Prof. Dr. Rashmi Ranjan Das", room: "LT-3", date: "2026-09-29", day: "Tuesday", start_time: "08:00", end_time: "09:00", group: "all", notes: "Dept. of Paediatrics • 7th Semester (2023 BATCH)" },

  // --- 7. ENT (OTORHINOLARYNGOLOGY) (4 classes) ---
  { id: "ent-01", department: "ENT", subject: "ENT", class_type: "Theory", topic: "Anatomy of nose and paranasal sinuses", faculty: "Dr Dillip Kumar Samal", room: "LT-3", date: "2026-09-03", day: "Thursday", start_time: "15:00", end_time: "16:00", group: "all", notes: "Dept. of ENT • 7th Semester MBBS 2023 Batch" },
  { id: "ent-02", department: "ENT", subject: "ENT", class_type: "Theory", topic: "Nasal septum and its disorder", faculty: "Dr Pradipta Kumar Parida / Dr Abhijeet Mishra", room: "LT-3", date: "2026-09-10", day: "Thursday", start_time: "15:00", end_time: "16:00", group: "all", notes: "Dept. of ENT • 7th Semester MBBS 2023 Batch" },
  { id: "ent-03", department: "ENT", subject: "ENT", class_type: "Theory", topic: "Epistaxis and its management", faculty: "Dr Jyoti Ranjan Das", room: "LT-3", date: "2026-09-17", day: "Thursday", start_time: "15:00", end_time: "16:00", group: "all", notes: "Dept. of ENT • 7th Semester MBBS 2023 Batch" },
  { id: "ent-04", department: "ENT", subject: "ENT", class_type: "Theory", topic: "Chronic rhinosinusitis with nasal polyposis", faculty: "Dr. Santosh Kumar Swain", room: "LT-3", date: "2026-09-24", day: "Thursday", start_time: "15:00", end_time: "16:00", group: "all", notes: "Dept. of ENT • 7th Semester MBBS 2023 Batch" },

  // --- 8. CMFM PRACTICALS (9 sessions) ---
  { id: "cmfm-p-01", department: "Community Medicine & Family Medicine", subject: "CMFM Practical", class_type: "Practical", topic: "Balanced Diet (ANC, PNC, DM, HTN)", faculty: "Dr Binod Kumar Behera / SR", room: "CMFM Lab / Field", date: "2026-09-01", day: "Tuesday", start_time: "14:00", end_time: "17:00", group: "Group B", notes: "Practical Postings • Group B • Dept. of CMFM" },
  { id: "cmfm-p-02", department: "Community Medicine & Family Medicine", subject: "CMFM Practical", class_type: "Practical", topic: "RCT (Randomized Controlled Trials)", faculty: "Dr Swayam Pragyan Parida / SR", room: "CMFM Lab / Field", date: "2026-09-07", day: "Monday", start_time: "14:00", end_time: "17:00", group: "Group A", notes: "Practical Postings • Group A • Dept. of CMFM" },
  { id: "cmfm-p-03", department: "Community Medicine & Family Medicine", subject: "CMFM Practical", class_type: "Practical", topic: "RCT (Randomized Controlled Trials)", faculty: "Dr Swayam Pragyan Parida / SR", room: "CMFM Lab / Field", date: "2026-09-08", day: "Tuesday", start_time: "14:00", end_time: "17:00", group: "Group B", notes: "Practical Postings • Group B • Dept. of CMFM" },
  { id: "cmfm-p-04", department: "Community Medicine & Family Medicine", subject: "CMFM Practical", class_type: "Practical", topic: "Normal Distribution Curve, Confidence Interval, hypothesis Testing & Test of significance", faculty: "Dr Arvind Kumar Singh / SR", room: "CMFM Lab / Field", date: "2026-09-14", day: "Monday", start_time: "14:00", end_time: "17:00", group: "Group A", notes: "Practical Postings • Group A • Dept. of CMFM" },
  { id: "cmfm-p-05", department: "Community Medicine & Family Medicine", subject: "CMFM Practical", class_type: "Practical", topic: "Normal Distribution Curve, Confidence Interval, hypothesis Testing & Test of significance", faculty: "Dr Arvind Kumar Singh / SR", room: "CMFM Lab / Field", date: "2026-09-15", day: "Tuesday", start_time: "14:00", end_time: "17:00", group: "Group B", notes: "Practical Postings • Group B • Dept. of CMFM" },
  { id: "cmfm-p-06", department: "Community Medicine & Family Medicine", subject: "CMFM Practical", class_type: "Practical", topic: "National Immunization Schedule & Vaccine requirement Calculation", faculty: "Dr Swayam Pragyan Parida / SR", room: "CMFM Lab / Field", date: "2026-09-21", day: "Monday", start_time: "14:00", end_time: "17:00", group: "Group A", notes: "Practical Postings • Group A • Dept. of CMFM" },
  { id: "cmfm-p-07", department: "Community Medicine & Family Medicine", subject: "CMFM Practical", class_type: "Practical", topic: "National Immunization Schedule & Vaccine requirement Calculation", faculty: "Dr Swayam Pragyan Parida / SR", room: "CMFM Lab / Field", date: "2026-09-22", day: "Tuesday", start_time: "14:00", end_time: "17:00", group: "Group B", notes: "Practical Postings • Group B • Dept. of CMFM" },
  { id: "cmfm-p-08", department: "Community Medicine & Family Medicine", subject: "CMFM Practical", class_type: "Practical", topic: "Management Exercises", faculty: "Dr Sonu H Subba / SR", room: "CMFM Lab / Field", date: "2026-09-28", day: "Monday", start_time: "14:00", end_time: "17:00", group: "Group A", notes: "Practical Postings • Group A • Dept. of CMFM" },
  { id: "cmfm-p-09", department: "Community Medicine & Family Medicine", subject: "CMFM Practical", class_type: "Practical", topic: "Management Exercises", faculty: "Dr Sonu H Subba / SR", room: "CMFM Lab / Field", date: "2026-09-29", day: "Tuesday", start_time: "14:00", end_time: "17:00", group: "Group B", notes: "Practical Postings • Group B • Dept. of CMFM" }
];

/* ---------- APPLICATION STATE ---------- */
let allEvents       = [];
// Base reference Monday: Week 1 of September 2026 (starting Monday 31 Aug 2026)
const BASE_MONDAY   = new Date(2026, 7, 31); // 31 Aug 2026 (Month is 0-indexed: 7 = Aug)

/**
 * Calculates week offset dynamically so the app always displays the present date by default
 * rather than hardcoding to the 1st of the month.
 */
function calculateCurrentWeekOffset() {
  const now = new Date();
  // Monday = 0, Tuesday = 1, ... Sunday = 6
  const dow = (now.getDay() + 6) % 7;
  const currentMonday = new Date(now);
  currentMonday.setDate(now.getDate() - dow);
  currentMonday.setHours(0, 0, 0, 0);

  const base = new Date(BASE_MONDAY);
  base.setHours(0, 0, 0, 0);

  const diffMs = currentMonday.getTime() - base.getTime();
  const calculatedOffset = Math.round(diffMs / (7 * 24 * 60 * 60 * 1000));

  // If user date is within September 2026 weeks (0 to 4), use it:
  if (calculatedOffset >= 0 && calculatedOffset <= 4) {
    return calculatedOffset;
  }
  // If beyond September 2026, default to Week 4 (offset 3) where active teaching was
  return (calculatedOffset > 4) ? 3 : 0;
}

/**
 * Resolves the default view mode:
 * On mobile devices (screen width <= 768px), defaults to 'grid' view as requested.
 * On desktop devices, defaults to 'agenda' view.
 */
function getDefaultViewMode() {
  if (typeof window !== 'undefined' && window.innerWidth <= 768) {
    return 'grid';
  }
  return 'agenda';
}

let weekOffset      = calculateCurrentWeekOffset(); // Automatically defaults to today!
let activeDept      = 'all';
let activeType      = 'all';
let activeCohort    = 'all';
let activeView      = getDefaultViewMode(); // Defaults to grid on mobile!
let searchQuery     = '';
let activeEvent     = null;
let calViewDate     = new Date(2026, 8, 1);  // September 2026 (8 = Sep)
let calSelectedDate = toDateKey(new Date());

/* ---------- UTILITY FUNCTIONS ---------- */
function toMinutes(timeStr) {
  if (!timeStr) return 0;
  const [h, m] = timeStr.split(':').map(Number);
  return h * 60 + m;
}

function formatTime(timeStr) {
  if (!timeStr) return '';
  const [h, m] = timeStr.split(':').map(Number);
  const suffix = h >= 12 ? 'PM' : 'AM';
  const hour   = h % 12 || 12;
  return `${hour}:${m.toString().padStart(2, '0')} ${suffix}`;
}

function parseDate(dateStr) {
  if (!dateStr) return new Date();
  const [y, m, d] = dateStr.split('-').map(Number);
  return new Date(y, m - 1, d);
}

function addDays(date, n) {
  const d = new Date(date);
  d.setDate(d.getDate() + n);
  return d;
}

function toDateKey(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function formatShortDate(date) {
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}

function formatNiceDate(dateInput) {
  if (!dateInput) return '';
  const d = (typeof dateInput === 'string') ? parseDate(dateInput) : dateInput;
  return d.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' });
}

function getWeekStart(offset = 0) {
  const d = new Date(BASE_MONDAY);
  d.setDate(d.getDate() + (offset * 7));
  d.setHours(0, 0, 0, 0);
  return d;
}

function escapeHtml(str) {
  return String(str || '').replace(/[&<>"']/g, m => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[m] || m));
}

/**
 * Updates the persistent Today Banner at top of page
 */
function updateTodayBanner() {
  const banner = document.getElementById('today-callout-banner');
  if (!banner) return;

  const now = new Date();
  const todayKey = toDateKey(now);
  const dateStr = now.toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  const dateEl = document.getElementById('today-banner-date');
  if (dateEl) dateEl.textContent = dateStr;

  const todayClasses = allEvents.filter(e => e.date === todayKey);
  const statusEl = document.getElementById('today-banner-status');
  if (statusEl) {
    if (todayClasses.length > 0) {
      statusEl.textContent = `${todayClasses.length} ${todayClasses.length === 1 ? 'class' : 'classes'} today`;
      statusEl.className = 'today-status-badge has-classes';
    } else {
      statusEl.textContent = 'No classes today';
      statusEl.className = 'today-status-badge no-classes';
    }
  }
}

/**
 * Scrolls smoothly to today's card block (Agenda) or today's column (Grid)
 */
function scrollToToday(smooth = true) {
  const behavior = smooth ? 'smooth' : 'auto';

  if (activeView === 'agenda') {
    const todayBlock = document.getElementById('agenda-today-card') || document.querySelector('.agenda-day-block.is-today-block');
    if (todayBlock) {
      todayBlock.scrollIntoView({ behavior, block: 'start' });
      todayBlock.classList.remove('pulse-highlight');
      void todayBlock.offsetWidth;
      todayBlock.classList.add('pulse-highlight');
    }
  } else if (activeView === 'grid') {
    const todayCol = document.querySelector('.grid-day-header.is-today-col');
    const gridContainer = document.getElementById('grid-view-container');
    if (todayCol && gridContainer) {
      const timeColWidth = window.innerWidth <= 768 ? 50 : 60;
      const scrollTarget = todayCol.offsetLeft - timeColWidth;
      gridContainer.scrollTo({ left: Math.max(0, scrollTarget), behavior });
      if (todayCol.dataset.dayIndex !== undefined) {
        const idx = parseInt(todayCol.dataset.dayIndex, 10);
        document.querySelectorAll('#grid-day-jump-strip .day-jump-chip').forEach(b => {
          b.classList.toggle('active', parseInt(b.dataset.dayIdx, 10) === idx);
        });
      }
    }
  }
}

/* ---------- FILTERING ENGINE ---------- */
function filterEvents(eventsList) {
  return eventsList.filter(evt => {
    // 1. Department Filter
    if (activeDept !== 'all' && evt.department !== activeDept) return false;

    // 2. Class Type Filter (Theory vs Practical)
    if (activeType !== 'all' && evt.class_type !== activeType) return false;

    // 3. Cohort Filter (Group A vs Group B)
    if (activeCohort !== 'all') {
      if (evt.class_type === 'Practical') {
        if (evt.group !== activeCohort) return false;
      }
    }

    // 4. Search Query Filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const topicMatch   = (evt.topic || '').toLowerCase().includes(q);
      const facultyMatch = (evt.faculty || '').toLowerCase().includes(q);
      const deptMatch    = (evt.department || '').toLowerCase().includes(q);
      const roomMatch    = (evt.room || '').toLowerCase().includes(q);
      if (!topicMatch && !facultyMatch && !deptMatch && !roomMatch) return false;
    }

    return true;
  });
}

function getVisibleEventsThisWeek(weekStart) {
  const weekEnd = addDays(weekStart, 6);
  const startKey = toDateKey(weekStart);
  const endKey   = toDateKey(weekEnd);

  const filtered = filterEvents(allEvents);
  return filtered.filter(evt => {
    if (!evt.date) return false;
    return evt.date >= startKey && evt.date <= endKey;
  });
}

/* ---------- RENDER VIEWS ---------- */
function renderAllViews() {
  const weekStart = getWeekStart(weekOffset);
  const weekEnd   = addDays(weekStart, 6);
  const today     = new Date();
  today.setHours(0, 0, 0, 0);

  // 1. Update Week Label in Navbar
  const weekLabelEl = document.getElementById('week-label');
  if (weekLabelEl) {
    const yStart = weekStart.getFullYear();
    const yEnd   = weekEnd.getFullYear();
    const yearStr = (yStart === yEnd) ? yStart : `${yStart} – ${yEnd}`;
    weekLabelEl.textContent = `${formatShortDate(weekStart)} – ${formatShortDate(weekEnd)}, ${yearStr}`;
  }

  // 2. Filter Events for this week
  const visibleEvents = getVisibleEventsThisWeek(weekStart);
  const totalFiltered = filterEvents(allEvents);

  // 3. Update Counter Pill
  const countPill = document.getElementById('session-count-pill');
  if (countPill) {
    countPill.textContent = `Showing ${visibleEvents.length} this week (${totalFiltered.length} total)`;
  }

  // 4. Render Grid & Agenda Views
  renderGridView(visibleEvents, weekStart, today);
  renderAgendaView(visibleEvents, weekStart, today);

  // 5. Toggle View Containers
  const gridSectionWrap     = document.getElementById('grid-section-wrap');
  const agendaSectionWrap   = document.getElementById('agenda-section-wrap');
  const gridSectionHeader   = document.getElementById('grid-section-header');
  const agendaSectionHeader = document.getElementById('agenda-section-header');
  const emptyState          = document.getElementById('empty-state');

  if (activeView === 'grid') {
    gridSectionWrap?.classList.remove('hidden');
    agendaSectionWrap?.classList.add('hidden');
    gridSectionHeader?.classList.add('hidden');
    agendaSectionHeader?.classList.add('hidden');
  } else if (activeView === 'both') {
    gridSectionWrap?.classList.remove('hidden');
    agendaSectionWrap?.classList.remove('hidden');
    gridSectionHeader?.classList.remove('hidden');
    agendaSectionHeader?.classList.remove('hidden');
  } else {
    // Default 'agenda'
    gridSectionWrap?.classList.add('hidden');
    agendaSectionWrap?.classList.remove('hidden');
    gridSectionHeader?.classList.add('hidden');
    agendaSectionHeader?.classList.add('hidden');
  }

  // Sync View Switcher Buttons
  document.querySelectorAll('#view-mode-selector .segmented-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.view === activeView);
  });

  // 6. Handle Empty State
  if (emptyState) {
    if (visibleEvents.length === 0) {
      emptyState.classList.remove('hidden');
    } else {
      emptyState.classList.add('hidden');
    }
  }
}

/** Render Timetable Grid (8:00 AM - 6:00 PM) */
function renderGridView(visibleEvents, weekStart, today) {
  const grid = document.getElementById('timetable-grid');
  if (!grid) return;
  grid.innerHTML = '';

  const weekDayDates = DAYS.map((_, i) => addDays(weekStart, i));

  // Top-left Corner Cell
  const corner = document.createElement('div');
  corner.className = 'grid-corner-cell';
  corner.textContent = 'TIME';
  grid.appendChild(corner);

  // 7 Day Headers
  DAYS.forEach((day, i) => {
    const dayDate = weekDayDates[i];
    const isToday = (dayDate.toDateString() === today.toDateString());

    const header = document.createElement('div');
    header.className = `grid-day-header${isToday ? ' is-today-col' : ''}`;
    header.dataset.dayIndex = i;
    header.dataset.date = toDateKey(dayDate);
    header.innerHTML = `
      <div class="grid-day-name">${DAY_SHORT[i]}</div>
      <div class="grid-day-date">${formatShortDate(dayDate)}</div>
    `;
    grid.appendChild(header);
  });

  // Sync mobile day jump strip active indicator
  const todayIdx = weekDayDates.findIndex(d => d.toDateString() === today.toDateString());
  const initialActiveIdx = (todayIdx !== -1) ? todayIdx : 0;
  document.querySelectorAll('#grid-day-jump-strip .day-jump-chip').forEach(b => {
    b.classList.toggle('active', parseInt(b.dataset.dayIdx, 10) === initialActiveIdx);
  });

  // Hour Rows (8 to 17)
  for (let h = GRID_START; h < GRID_END; h++) {
    const timeLabel = document.createElement('div');
    timeLabel.className = 'time-slot-label';
    timeLabel.style.height = `${SLOT_HEIGHT}px`;
    timeLabel.textContent = `${String(h).padStart(2, '0')}:00`;
    grid.appendChild(timeLabel);

    DAYS.forEach((day, i) => {
      const dayDate = weekDayDates[i];
      const isToday = (dayDate.toDateString() === today.toDateString());

      const cell = document.createElement('div');
      cell.className = `grid-day-cell${isToday ? ' is-today-col' : ''}`;
      cell.style.height = `${SLOT_HEIGHT}px`;
      cell.dataset.day = day;
      cell.dataset.hour = h;
      cell.dataset.date = toDateKey(dayDate);
      grid.appendChild(cell);
    });
  }

  // Place Event Cards on the Grid
  visibleEvents.forEach(evt => {
    const startMin = toMinutes(evt.start_time);
    const endMin   = toMinutes(evt.end_time);

    if (startMin < GRID_START * 60 || endMin > (GRID_END + 1) * 60 || endMin <= startMin) return;

    const startHour = Math.floor(startMin / 60);
    const minuteWithinHour = startMin % 60;
    const durationMinutes  = endMin - startMin;

    const topPx    = (minuteWithinHour / 60) * SLOT_HEIGHT + 2;
    const heightPx = Math.max((durationMinutes / 60) * SLOT_HEIGHT - 4, 38);

    const cellSelector = `[data-date="${evt.date}"][data-hour="${startHour}"]`;
    const anchorCell = grid.querySelector(cellSelector);
    if (!anchorCell) return;

    const theme = getDeptTheme(evt.department);
    const card = document.createElement('div');
    card.className = 'grid-event-card';
    card.style.setProperty('--card-accent', theme.accent);
    card.style.setProperty('--card-bg', theme.bg);
    card.style.setProperty('--card-border', theme.border);
    card.style.setProperty('--card-text', theme.text);
    card.style.top = `${topPx}px`;
    card.style.height = `${heightPx}px`;

    card.innerHTML = `
      <div class="card-top-tag">${escapeHtml(theme.short)} • ${escapeHtml(evt.class_type)}</div>
      <div class="card-topic-line">${escapeHtml(evt.topic)}</div>
      ${heightPx >= 52 ? `<div class="card-faculty-line">👨‍⚕️ ${escapeHtml(evt.faculty)}</div>` : ''}
    `;

    card.addEventListener('click', (e) => {
      e.stopPropagation();
      openDetailModal(evt, theme, evt.day);
    });

    anchorCell.appendChild(card);
  });
}

/** Render Mobile Agenda View (Card Stream) */
function renderAgendaView(visibleEvents, weekStart, today) {
  const container = document.getElementById('agenda-view-container');
  if (!container) return;
  container.innerHTML = '';

  const weekDayDates = DAYS.map((_, i) => addDays(weekStart, i));

  weekDayDates.forEach((dayDate, i) => {
    const dateKey = toDateKey(dayDate);
    const dayName = DAYS[i];
    const isToday = (dayDate.toDateString() === today.toDateString());

    const dayEvents = visibleEvents.filter(e => e.date === dateKey);
    if (dayEvents.length === 0) return; // Only show days with classes in this view

    // Sort by start time
    dayEvents.sort((a, b) => toMinutes(a.start_time) - toMinutes(b.start_time));

    const dayBlock = document.createElement('div');
    dayBlock.className = `agenda-day-block${isToday ? ' is-today-block' : ''}`;
    if (isToday) {
      dayBlock.id = 'agenda-today-card';
    }

    const header = document.createElement('div');
    header.className = 'agenda-day-header';
    header.innerHTML = `
      <div class="agenda-day-title">
        <span>${formatNiceDate(dayDate)}</span>
        ${isToday ? `<span class="agenda-today-tag">🔴 TODAY</span>` : ''}
      </div>
      <div class="agenda-day-count">${dayEvents.length} ${dayEvents.length === 1 ? 'class' : 'classes'}</div>
    `;
    dayBlock.appendChild(header);

    const cardsList = document.createElement('div');
    cardsList.className = 'agenda-cards-list';

    dayEvents.forEach(evt => {
      const theme = getDeptTheme(evt.department);
      const isPractical = (evt.class_type === 'Practical');

      const card = document.createElement('div');
      card.className = 'agenda-event-card';
      card.style.setProperty('--card-accent', theme.accent);
      card.style.setProperty('--card-bg', theme.bg);
      card.style.setProperty('--card-border', theme.border);
      card.style.setProperty('--card-text', theme.text);

      card.innerHTML = `
        <div class="agenda-main-col">
          <div class="agenda-meta-row">
            <span class="dept-pill" style="background:${theme.bg}; color:${theme.text}; border:1px solid ${theme.border};">
              ${escapeHtml(theme.short)}
            </span>
            <span class="type-pill ${isPractical ? 'practical' : 'theory'}">
              ${isPractical ? '🔬 Practical' : '📚 Theory'}
            </span>
            ${evt.group && evt.group !== 'all' ? `<span class="cohort-pill">${escapeHtml(evt.group)}</span>` : ''}
          </div>
          <h4 class="agenda-topic-title">${escapeHtml(evt.topic)}</h4>
          <div class="agenda-faculty-line">
            <span>👨‍⚕️</span>
            <span class="agenda-faculty-name">${escapeHtml(evt.faculty)}</span>
          </div>
        </div>

        <div class="agenda-side-col">
          <div class="agenda-time-pill">${formatTime(evt.start_time)} – ${formatTime(evt.end_time)}</div>
          <div class="agenda-venue-pill">📍 ${escapeHtml(evt.room || 'LT-3')}</div>
        </div>
      `;

      card.addEventListener('click', () => {
        openDetailModal(evt, theme, dayName);
      });

      cardsList.appendChild(card);
    });

    dayBlock.appendChild(cardsList);
    container.appendChild(dayBlock);
  });
}

/* ---------- EVENT DETAIL MODAL ---------- */
function openDetailModal(evt, theme, dayName) {
  activeEvent = evt;
  const isPractical = (evt.class_type === 'Practical');

  document.getElementById('modal-color-bar').style.background = theme.accent;

  const deptBadge = document.getElementById('modal-dept-badge');
  deptBadge.textContent = evt.department;
  deptBadge.style.background = theme.bg;
  deptBadge.style.color = theme.text;
  deptBadge.style.border = `1px solid ${theme.border}`;

  const typeBadge = document.getElementById('modal-type-badge');
  typeBadge.textContent = isPractical ? '🔬 Practical Session' : '📚 Theory Lecture';
  typeBadge.className = `modal-badge ${isPractical ? 'type-practical' : 'type-theory'}`;

  const cohortBadge = document.getElementById('modal-cohort-badge');
  if (evt.group && evt.group !== 'all') {
    cohortBadge.textContent = evt.group;
    cohortBadge.classList.remove('hidden');
  } else {
    cohortBadge.classList.add('hidden');
  }

  document.getElementById('modal-topic-title').textContent = evt.topic || 'Class Session';
  document.getElementById('modal-faculty-val').textContent = evt.faculty || 'Faculty Member';
  
  const niceDate = evt.date ? formatNiceDate(evt.date) : (dayName || '');
  document.getElementById('modal-time-val').textContent = `${niceDate} • ${formatTime(evt.start_time)} – ${formatTime(evt.end_time)}`;
  document.getElementById('modal-venue-val').textContent = evt.room || 'Lecture Theatre 3 (LT-3)';
  document.getElementById('modal-notes-val').textContent = evt.notes || 'AIIMS Bhubaneswar MBBS Batch 2023 (7th Semester)';

  // Build Google Calendar Web Link
  const gcalBtn = document.getElementById('modal-gcal-link');
  if (gcalBtn && evt.date && evt.start_time && evt.end_time) {
    const startIso = evt.date.replace(/-/g, '') + 'T' + evt.start_time.replace(/:/g, '') + '00';
    const endIso   = evt.date.replace(/-/g, '') + 'T' + evt.end_time.replace(/:/g, '') + '00';
    const text     = encodeURIComponent(`[${evt.department}] ${evt.topic}`);
    const details  = encodeURIComponent(`Faculty: ${evt.faculty}\nRoom: ${evt.room}\nDetails: ${evt.notes}`);
    const location = encodeURIComponent(`${evt.room || 'LT-3'}, AIIMS Bhubaneswar`);
    gcalBtn.href = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${startIso}/${endIso}&details=${details}&location=${location}`;
  }

  document.getElementById('event-detail-modal').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeDetailModal() {
  document.getElementById('event-detail-modal').classList.add('hidden');
  document.body.style.overflow = '';
  activeEvent = null;
}

/* ---------- MONTHLY CALENDAR MODAL ---------- */
function openCalendarModal() {
  calViewDate = new Date(2026, 8, 1); // Set to September 2026
  renderMonthlyCalendar();
  document.getElementById('calendar-modal').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeCalendarModal() {
  document.getElementById('calendar-modal').classList.add('hidden');
  document.body.style.overflow = '';
}

function renderMonthlyCalendar() {
  const grid = document.getElementById('cal-days-grid');
  if (!grid) return;
  grid.innerHTML = '';

  const year  = calViewDate.getFullYear();
  const month = calViewDate.getMonth();

  const firstDay = new Date(year, month, 1);
  const lastDay  = new Date(year, month + 1, 0);
  const totalDays = lastDay.getDate();

  // First day of week (Monday = 0)
  const firstDow = (firstDay.getDay() + 6) % 7;

  // Blank padding cells for days before the 1st
  for (let b = 0; b < firstDow; b++) {
    const blank = document.createElement('div');
    blank.className = 'cal-day-cell is-empty';
    grid.appendChild(blank);
  }

  // Active month cells
  for (let d = 1; d <= totalDays; d++) {
    const dayDate = new Date(year, month, d);
    const dateKey = toDateKey(dayDate);
    const dayClasses = allEvents.filter(e => e.date === dateKey);

    const cell = document.createElement('div');
    cell.className = 'cal-day-cell';
    if (dateKey === calSelectedDate) cell.classList.add('is-selected');

    // Build department dot indicators
    let dotsHtml = '';
    const distinctDepts = [...new Set(dayClasses.map(e => e.department))];
    distinctDepts.slice(0, 4).forEach(dept => {
      const theme = getDeptTheme(dept);
      dotsHtml += `<span class="cal-dot" style="background:${theme.accent};"></span>`;
    });

    cell.innerHTML = `
      <span class="cal-day-num">${d}</span>
      <div class="cal-dots-row">${dotsHtml}</div>
    `;

    cell.addEventListener('click', () => {
      document.querySelectorAll('.cal-day-cell').forEach(c => c.classList.remove('is-selected'));
      cell.classList.add('is-selected');
      calSelectedDate = dateKey;
      inspectCalendarDate(dateKey, dayClasses);
    });

    grid.appendChild(cell);
  }

  // Default inspector to 1st September or current selection
  const initialSelection = allEvents.filter(e => e.date === calSelectedDate);
  inspectCalendarDate(calSelectedDate, initialSelection);
}

function inspectCalendarDate(dateKey, dayClasses) {
  const labelEl = document.getElementById('inspector-date-label');
  const subEl   = document.getElementById('inspector-date-sub');
  const countEl = document.getElementById('inspector-count-badge');
  const listEl  = document.getElementById('inspector-list');

  const parsed = parseDate(dateKey);
  if (labelEl) labelEl.textContent = formatNiceDate(parsed);
  if (subEl) subEl.textContent = `${dayClasses.length} ${dayClasses.length === 1 ? 'class session' : 'class sessions'} scheduled`;
  if (countEl) countEl.textContent = `${dayClasses.length} Classes`;

  if (listEl) {
    listEl.innerHTML = '';
    if (dayClasses.length === 0) {
      listEl.innerHTML = `<p class="inspector-empty-text">No lectures or practical postings on this date.</p>`;
      return;
    }

    dayClasses.sort((a, b) => toMinutes(a.start_time) - toMinutes(b.start_time));
    dayClasses.forEach(evt => {
      const theme = getDeptTheme(evt.department);
      const item = document.createElement('div');
      item.className = 'inspector-item';
      item.style.setProperty('--card-accent', theme.accent);
      item.innerHTML = `
        <div style="flex:1;">
          <div class="inspector-item-main">[${escapeHtml(theme.short)}] ${escapeHtml(evt.topic)}</div>
          <div style="font-size:0.7rem; color:#64748B;">👨‍⚕️ ${escapeHtml(evt.faculty)} • 📍 ${escapeHtml(evt.room || 'LT-3')}</div>
        </div>
        <div class="inspector-item-time">${formatTime(evt.start_time)} – ${formatTime(evt.end_time)}</div>
      `;
      item.addEventListener('click', () => {
        closeCalendarModal();
        jumpToDate(evt.date);
        openDetailModal(evt, theme, evt.day);
      });
      listEl.appendChild(item);
    });
  }
}

/* ---------- DATE JUMP & FINDER ENGINE ---------- */
function jumpToDate(targetDateStr) {
  if (!targetDateStr) return;
  const targetDate = parseDate(targetDateStr);
  const dow = (targetDate.getDay() + 6) % 7;
  const targetMonday = new Date(targetDate);
  targetMonday.setDate(targetDate.getDate() - dow);
  targetMonday.setHours(0, 0, 0, 0);

  const diffMs = targetMonday.getTime() - BASE_MONDAY.getTime();
  const diffWeeks = Math.round(diffMs / (7 * 24 * 60 * 60 * 1000));
  weekOffset = diffWeeks;

  renderAllViews();
}

/* ---------- SEARCH ENGINE ---------- */
function handleKeywordSearch(query) {
  searchQuery = (query || '').trim();
  const banner = document.getElementById('search-status-banner');
  const bannerText = document.getElementById('search-status-text');
  const clearBtn = document.getElementById('clear-search-btn');

  if (clearBtn) {
    clearBtn.classList.toggle('hidden', !searchQuery);
  }

  if (searchQuery) {
    const matches = filterEvents(allEvents);
    if (banner && bannerText) {
      bannerText.textContent = `Found ${matches.length} classes matching "${searchQuery}"`;
      banner.classList.remove('hidden');
    }
  } else {
    if (banner) banner.classList.add('hidden');
  }

  renderAllViews();
}

/* ---------- GITHUB & PRINT MODALS ---------- */
function openGitHubModal() {
  document.getElementById('github-modal').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeGitHubModal() {
  document.getElementById('github-modal').classList.add('hidden');
  document.body.style.overflow = '';
}


/* ---------- PHONE CALENDAR SYNC (.ICS EXPORT) ---------- */
function pad(n) { return String(n).padStart(2, '0'); }

function toICSDate(dateStr, timeStr) {
  const [y, mo, d] = dateStr.split('-');
  const [h, m]     = timeStr.split(':');
  return `${y}${pad(mo)}${pad(d)}T${pad(h)}${pad(m)}00`;
}

function downloadICS() {
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//AIIMS Bhubaneswar//MBBS Batch 2023 7th Sem Class Schedule//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'X-WR-CALNAME:MBBS Batch 2023 (7th Sem) AIIMS Bhubaneswar',
    'X-WR-TIMEZONE:Asia/Kolkata'
  ];

  const nowStamp = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

  allEvents.forEach((evt, idx) => {
    if (!evt.date || !evt.start_time || !evt.end_time) return;
    const dtStart = toICSDate(evt.date, evt.start_time);
    const dtEnd   = toICSDate(evt.date, evt.end_time);
    const summary = `[${evt.subject || evt.department}] ${evt.topic}`;
    const desc    = `Department: ${evt.department}\\nFaculty: ${evt.faculty}\\nTopic: ${evt.topic}\\nType: ${evt.class_type}\\nGroup: ${evt.group || 'All'}\\nVenue: ${evt.room || 'LT-3'}`;
    const loc     = `${evt.room || 'LT-3'}, AIIMS Bhubaneswar`;

    lines.push(
      'BEGIN:VEVENT',
      `UID:aiims-batch2023-7thsem-${idx+1}-${evt.id || Date.now()}@aiimsbbsr`,
      `DTSTAMP:${nowStamp}`,
      `DTSTART:${dtStart}`,
      `DTEND:${dtEnd}`,
      `SUMMARY:${summary}`,
      `DESCRIPTION:${desc}`,
      `LOCATION:${loc}`,
      `CATEGORIES:${evt.department},${evt.class_type}`,
      'STATUS:CONFIRMED',
      'BEGIN:VALARM',
      'TRIGGER:-PT15M',
      'ACTION:DISPLAY',
      `DESCRIPTION:Class Reminder: ${summary} in 15 mins`,
      'END:VALARM',
      'END:VEVENT'
    );
  });

  lines.push('END:VCALENDAR');
  const content = lines.join('\r\n');
  const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'aiims-mbbs-batch2023-september-schedule.ics';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/* ---------- INITIALIZATION & EVENT LISTENERS ---------- */
async function initializeSchedule() {
  // Always initialize from embedded array first (instant offline/file:// guarantee)
  allEvents = [...EMBEDDED_SCHEDULE];

  // Try fetching live JSON for any live updates
  try {
    const res = await fetch('./schedule.json?t=' + Date.now());
    if (res.ok) {
      const data = await res.json();
      if (data && data.events && data.events.length > 0) {
        allEvents = data.events;
      }
    }
  } catch (err) {
    console.log('Using pre-bundled schedule dataset.');
  }

  // Establish default view (Mobile = Grid, Desktop = Agenda)
  activeView = getDefaultViewMode();

  updateTodayBanner();
  renderAllViews();

  // Smoothly position on today's classes on initial page load
  setTimeout(() => {
    scrollToToday(false);
  }, 120);
}

document.addEventListener('DOMContentLoaded', () => {
  initializeSchedule();

  // Week Navigation
  document.getElementById('prev-week')?.addEventListener('click', () => {
    weekOffset--;
    renderAllViews();
  });

  document.getElementById('next-week')?.addEventListener('click', () => {
    weekOffset++;
    renderAllViews();
  });

  // Jump directly to Present Date (Today)
  const jumpToTodaySchedule = () => {
    weekOffset = calculateCurrentWeekOffset();
    renderAllViews();
    scrollToToday(true);
  };
  document.getElementById('today-btn')?.addEventListener('click', jumpToTodaySchedule);
  document.getElementById('jump-today-btn')?.addEventListener('click', jumpToTodaySchedule);

  // View Switcher (Agenda vs Grid)
  document.querySelectorAll('#view-mode-selector .segmented-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#view-mode-selector .segmented-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeView = btn.dataset.view;
      renderAllViews();
      if (activeView === 'grid') {
        setTimeout(() => scrollToToday(true), 60);
      }
    });
  });

  // Simplified Department Filter Dropdown
  document.getElementById('dept-filter-select')?.addEventListener('change', (e) => {
    activeDept = e.target.value;
    renderAllViews();
  });

  // Secondary Filters Drawer Toggle
  const moreFiltersBtn = document.getElementById('toggle-more-filters-btn');
  const secDrawer = document.getElementById('secondary-filters-drawer');
  moreFiltersBtn?.addEventListener('click', () => {
    if (secDrawer) {
      const isHidden = secDrawer.classList.toggle('hidden');
      moreFiltersBtn.classList.toggle('active', !isHidden);
    }
  });

  // Session Type Dropdown Filter
  document.getElementById('type-filter-select')?.addEventListener('change', (e) => {
    activeType = e.target.value;
    renderAllViews();
  });

  // Practical Cohort Dropdown Filter
  document.getElementById('cohort-filter-select')?.addEventListener('change', (e) => {
    activeCohort = e.target.value;
    renderAllViews();
  });

  // Live Search
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => handleKeywordSearch(e.target.value));
  }
  document.getElementById('clear-search-btn')?.addEventListener('click', () => {
    if (searchInput) {
      searchInput.value = '';
      handleKeywordSearch('');
    }
  });
  document.getElementById('dismiss-search-btn')?.addEventListener('click', () => {
    if (searchInput) searchInput.value = '';
    handleKeywordSearch('');
  });

  // Reset Filters Button
  document.getElementById('reset-filters-btn')?.addEventListener('click', () => {
    activeDept   = 'all';
    activeType   = 'all';
    activeCohort = 'all';
    searchQuery  = '';
    if (searchInput) searchInput.value = '';
    const deptSelect = document.getElementById('dept-filter-select');
    if (deptSelect) deptSelect.value = 'all';
    const typeSelect = document.getElementById('type-filter-select');
    if (typeSelect) typeSelect.value = 'all';
    const cohortSelect = document.getElementById('cohort-filter-select');
    if (cohortSelect) cohortSelect.value = 'all';
    renderAllViews();
  });

  // Modals
  document.getElementById('modal-close')?.addEventListener('click', closeDetailModal);
  document.getElementById('modal-dismiss-btn')?.addEventListener('click', closeDetailModal);
  document.getElementById('event-detail-modal')?.addEventListener('click', (e) => {
    if (e.target.id === 'event-detail-modal') closeDetailModal();
  });

  document.getElementById('open-cal-modal-btn')?.addEventListener('click', openCalendarModal);
  document.getElementById('cal-modal-close')?.addEventListener('click', closeCalendarModal);
  document.getElementById('calendar-modal')?.addEventListener('click', (e) => {
    if (e.target.id === 'calendar-modal') closeCalendarModal();
  });

  document.getElementById('open-github-btn')?.addEventListener('click', openGitHubModal);
  document.getElementById('footer-github-btn')?.addEventListener('click', openGitHubModal);
  document.getElementById('github-modal-close')?.addEventListener('click', closeGitHubModal);
  document.getElementById('github-close-btn')?.addEventListener('click', closeGitHubModal);
  document.getElementById('github-modal')?.addEventListener('click', (e) => {
    if (e.target.id === 'github-modal') closeGitHubModal();
  });

  // Sync Phone Calendar (.ICS)
  document.getElementById('sync-phone-btn')?.addEventListener('click', downloadICS);
  document.getElementById('footer-sync-btn')?.addEventListener('click', downloadICS);

  // Mobile Grid Day Jump Buttons
  document.querySelectorAll('#grid-day-jump-strip .day-jump-chip').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.dataset.dayIdx, 10);
      document.querySelectorAll('#grid-day-jump-strip .day-jump-chip').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const gridContainer = document.getElementById('grid-view-container');
      if (gridContainer) {
        const header = gridContainer.querySelector(`.grid-day-header[data-day-index="${idx}"]`);
        if (header) {
          const timeColWidth = window.innerWidth <= 768 ? 50 : 60;
          const scrollTarget = header.offsetLeft - timeColWidth;
          gridContainer.scrollTo({ left: Math.max(0, scrollTarget), behavior: 'smooth' });
        }
      }
    });
  });

  // Track horizontal scroll in grid to update active day jump chip
  const gridOuter = document.getElementById('grid-view-container');
  if (gridOuter) {
    let scrollTimer;
    gridOuter.addEventListener('scroll', () => {
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        const timeColWidth = window.innerWidth <= 768 ? 50 : 60;
        const currentLeft = gridOuter.scrollLeft + timeColWidth + 10;
        const headers = Array.from(gridOuter.querySelectorAll('.grid-day-header'));
        let activeIdx = 0;
        let minDiff = Infinity;
        headers.forEach((h) => {
          const diff = Math.abs(h.offsetLeft - currentLeft);
          if (diff < minDiff) {
            minDiff = diff;
            activeIdx = parseInt(h.dataset.dayIndex, 10);
          }
        });
        document.querySelectorAll('#grid-day-jump-strip .day-jump-chip').forEach(b => {
          b.classList.toggle('active', parseInt(b.dataset.dayIdx, 10) === activeIdx);
        });
      }, 60);
    }, { passive: true });
  }

  // Keyboard Shortcuts (Escape to dismiss, Arrow keys for weeks)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeDetailModal();
      closeCalendarModal();
      closeGitHubModal();
    } else if (e.altKey && e.key === 'ArrowLeft') {
      weekOffset--;
      renderAllViews();
    } else if (e.altKey && e.key === 'ArrowRight') {
      weekOffset++;
      renderAllViews();
    }
  });
});
