# NewsGuard AI - Fake News Detection using NLP (website)

React (frontend) + Django (backend) + PostgreSQL (database) + scikit-learn model (TF-IDF + Passive-Aggressive).

```
NewsGuardAI/
├── backend/            Django project
│   ├── newsguard/      settings, urls
│   ├── detector/       API: analyze, login, history, stats  (models.py, views.py, ml.py, extract.py)
│   └── ml_model/       trained_model.pkl, metrics.json, preprocess.py, sample_texts.json
└── frontend/           React (Vite) website
```

## Features
- Check news by **pasting text**, a **.txt file** or a **news link**
- Result: REAL / FAKE, model score, "not sure" and "short text" warnings
- **Sign up / Log in**, personal **History** (saved in PostgreSQL)
- **Admin dashboard** (staff users): total checks, users, FAKE/REAL count, last 14 days

## Requirements
Python 3.10+, Node.js 18+, PostgreSQL 14+.

## 1. Database (PostgreSQL)
Create an empty database once (in psql or pgAdmin):
```sql
CREATE DATABASE newsguard;
```

## 2. Backend
```bash
cd backend
python -m venv venv
venv\Scripts\activate            # Windows      (Mac/Linux: source venv/bin/activate)
pip install -r requirements.txt
copy .env.example .env           # Mac/Linux: cp .env.example .env   -> put your PostgreSQL password in .env
python manage.py makemigrations detector
python manage.py migrate
python manage.py createsuperuser # this account gets the Dashboard page (use an email as username)
python manage.py runserver       # http://127.0.0.1:8000
```
Note: the website logs in with **email**. For the superuser, enter your email as the username.

## 3. Frontend
```bash
cd frontend
npm install
npm run dev                      # http://localhost:5173
```
Open http://localhost:5173 . Vite forwards `/api/...` calls to Django on port 8000, so keep both running.

## API (for the viva)
| Method | URL | What it does |
|---|---|---|
| POST | /api/analyze/ | `{"text": ...}` or `{"url": ...}` or multipart `file`; returns label and score |
| POST | /api/auth/register/ , /api/auth/login/ | create account / log in (returns a token) |
| GET | /api/history/ , /api/stats/ | your checks and counts (login needed) |
| GET | /api/admin/stats/ | site-wide counts (admin only) |
| GET | /api/model-info/ , /api/samples/ | measured results, sample texts |

## Honest notes
- The model is the one from the Fake News Detection mini project: **95.63% accuracy on its own held-out test set**
  (915 articles); about 70% on headlines only; unreliable on other topics. It estimates writing style, not truth.
  The website says this on the result card and on the About page.
- The model file needs scikit-learn **1.9.1** (pinned in requirements.txt). If loading fails, retrain with the
  mini project's `train_model.py` and replace `backend/ml_model/trained_model.pkl`.
- "Link" mode reads one web page from the server. Private/local addresses are blocked on purpose.
- This is a college project setup (`DEBUG=True`, token login). Change `DJANGO_SECRET_KEY` and use HTTPS before any real deployment.
