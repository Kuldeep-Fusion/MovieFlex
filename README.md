
# 🎬 MovieFlix — Next.js 

> Bhai ye koi Netflix clone nahi hai 💀

---

# 🧠 Project ka scene kya hai?

MovieFlix ek movie discovery website hai.

Basically:

```txt
User
 ↓
MovieFlix
 ↓
TMDB API
 ↓
Movie Data
 ↓
Beautiful UI
 ↓
User khush 🍿
````

TMDB se movies ka data aa raha hai.

Isme:

* Popular movies
* Top Rated
* Upcoming
* Now Playing
* Search
* Movie Details
* Cast
* Trailer
* Similar Movies

sab implement kiya hai.

---

# 🔥 Sabse pehle — TMDB API

Bhai yahan se asli maal aa raha hai 😂

Humne TMDB API use kari hai.

```txt
TMDB
 ↓
API Request
 ↓
JSON Response
 ↓
Next.js
 ↓
UI
```

API endpoints:

```txt
/movie/popular
/movie/top_rated
/movie/upcoming
/movie/now_playing

/movie/:id
/movie/:id/credits
/movie/:id/videos
/movie/:id/similar

/search/movie
```

---

# 🔐 API Key ko public mat kar dena bhai 💀

`.env.local`

```env
TMDB_BASE_URL=https://api.themoviedb.org/3
TMDB_API_KEY=your_api_key
```

Aur `.env.local` GitHub pe push nahi karna.

Agar API key GitHub pe chali gayi:

```txt
GitHub
   ↓
Someone finds API key
   ↓
API ko pel diya
   ↓
TMDB requests khatam 💀
```

So `.gitignore` mein:

```gitignore
.env
.env.local
.env.*.local
```

---

# 🛣️ Routing

Next.js ka App Router use kiya hai.

Ye sab static routes manually banane ki zarurat nahi:

```txt
/movies/popular
/movies/top-rated
/movies/upcoming
/movies/now-playing
```

Humne dynamic route banaya:

```txt
/movies/[category]
```

Ab:

```txt
/movies/popular
```

mein:

```ts
category = "popular"
```

aur:

```txt
/movies/top-rated
```

mein:

```ts
category = "top-rated"
```

Simple.

Ek page.

Multiple routes.

**Bhai ye hota hai dynamic routing. 😂**

---

# 🎬 Movie Detail Page

Movie ke liye:

```txt
/movie/[id]
```

Example:

```txt
/movie/550
```

Yahan `550` movie ID hai.

Page automatically dynamic hai.

Matlab:

```txt
/movie/550
/movie/603
/movie/155
```

sab same:

```txt
/movie/[id]/page.tsx
```

se handle honge.

Har movie ke liye alag page banane ki zarurat nahi.

Warna 10,000 movies ke 10,000 pages manually banane padte.

**Phir toh bhai developer nahi mazdoor ban jaate. 💀**

---

# 🔎 Search

SearchBar banaya.

User:

```txt
Avengers
```

type karta hai.

Enter:

```txt
/search?q=Avengers
```

Then Next.js:

```txt
searchParams
 ↓
query
 ↓
TMDB search API
 ↓
results
 ↓
MovieGrid
```

Abhi live search nahi rakha.

Matlab user har character pe API hit nahi karega.

Ye:

```txt
A
Av
Ave
Aven
Aveng
Avengers
```

6 requests bhejne ki bakchodi nahi.

Sirf Enter ke baad request.

---

# ⚡ Server Components

Next.js ka important concept.

Default mein pages:

```tsx
Server Component
```

hote hain.

Iska fayda:

```txt
Browser
  ❌ API key
  ❌ unnecessary API logic

Server
  ✅ API request
  ✅ API key
  ✅ data fetching

Browser
  ↓
Rendered UI
```

Basically sensitive/API related kaam server pe rakhna better.

---

# 🌐 API Client

Saari API calls idhar-udhar likhne ke bajaye:

```txt
src/
└── lib/
    └── tmdb/
        ├── client.js
        └── movies.js
```

banaya.

`client.js`

common API logic handle karta hai.

`movies.js`

movie-specific functions:

```js
getPopularMovies()
getNowPlayingMovies()
getTopRatedMovies()
getUpcomingMovies()

getMovieById()
searchMovies()
getMovieCredits()
getSimilarMovies()
getRecommendations()
getMovieVideos()
```

Ab page mein:

```js
getPopularMovies()
```

bas.

API ka poora URL baar-baar likhne ki zarurat nahi.

---

# 🚀 Parallel API Requests

Movie detail page mein multiple APIs chahiye:

```txt
Movie
Credits
Videos
Similar Movies
```

Agar sequential karoge:

```txt
Movie
 ↓
wait
 ↓
Credits
 ↓
wait
 ↓
Videos
 ↓
wait
 ↓
Similar
```

Bhai slow af 💀

Isliye:

```js
Promise.all([
  getMovieById(id),
  getMovieCredits(id),
  getMovieVideos(id),
  getSimilarMovies(id),
]);
```

Matlab:

```txt
Movie ──────┐
Credits ────┤
Videos ─────┼──→ Together
Similar ────┘
```

Jo independent requests hain unko parallel chalao.

---

# 🖼️ next/image

Normal:

```html
<img />
```

ke jagah:

```tsx
<Image />
```

use kiya.

Reason:

```txt
Image optimization
Responsive loading
Better performance
Lazy loading
```

TMDB images ke liye:

```ts
next.config.ts
```

mein domain allow kiya:

```txt
image.tmdb.org
```

Warna Next.js bolega:

> Bhai ye image domain kaun hai? 💀

---

# 🎠 Carousel

Movie rows ke liye:

```txt
shadcn/ui
+
Embla Carousel
```

use kiya.

Example:

```txt
Popular Movies
────────────────────────────────

[Movie] [Movie] [Movie] [Movie] [Movie] →
```

Desktop pe arrows.

Mobile pe swipe.

Clean.

---

# ⏳ Loading UI

Next.js mein:

```txt
loading.tsx
```

use kiya.

Jab data load ho raha:

```txt
API request
   ↓
Loading UI
   ↓
Data
   ↓
Actual page
```

User ko blank screen nahi milegi.

Blank screen:

```txt
😐
```

Skeleton:

```txt
😎
```

---

# 🚨 Error Handling

Agar API fail ho gayi:

```txt
TMDB
 ↓
💥 Error
```

toh website poori maa-behen nahi hogi 😂

`error.tsx`

handle karega.

User ko:

```txt
Something Went Wrong

Try Again
```

type proper UI milega.

---

# 404 / Not Found

Agar user bakchodi kare:

```txt
/movies/abcdxyz
```

aur category exist hi nahi karti.

Toh:

```txt
not-found.tsx
```

handle karega.

Instead of:

```txt
undefined
undefined
undefined 💀
```

proper 404 page.

---

# 🧠 Dynamic Metadata

SEO ke liye metadata bhi dynamic.

Example:

```txt
Popular Movies | MovieFlix

Top Rated Movies | MovieFlix

"Batman" Search Results | MovieFlix
```

Movie pages bhi dynamically metadata generate kar sakte hain.

Matlab har page:

```txt
same title
```

nahi.

SEO bhi thoda serious rakha hai bhai. 😎

---

# 📱 Responsive Design

Tailwind CSS use kiya.

Website:

```txt
📱 Mobile
📱 Tablet
💻 Laptop
🖥️ Desktop
```

sab pe adjust hoti hai.

Movie grid:

```txt
Mobile
[ ] [ ]

Tablet
[ ] [ ] [ ]

Desktop
[ ] [ ] [ ] [ ] [ ] [ ]
```

---

# 🧩 Reusable Components

Har jagah same code copy-paste nahi.

Components:

```txt
Navbar
Footer
Hero
MovieCard
MovieGrid
MovieCarousel
SearchBar
```

Example:

```jsx
<MovieCard movie={movie} />
```

Bas.

Har movie ke liye same component.

**Copy-paste coding = future mein khud ki gaand todna. 💀**

---

# 🗂️ Project Structure

```txt
movie-explorer/
│
├── public/
│
├── src/
│   ├── app/
│   │
│   │   ├── (Home)/
│   │   │   │
│   │   │   ├── movie/
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx
│   │   │   │
│   │   │   ├── movies/
│   │   │   │   └── [category]/
│   │   │   │       └── page.tsx
│   │   │   │
│   │   │   ├── search/
│   │   │   │   └── page.tsx
│   │   │   │
│   │   │   └── page.tsx
│   │   │
│   │   ├── error.tsx
│   │   ├── loading.tsx
│   │   ├── not-found.tsx
│   │   └── layout.tsx
│   │
│   ├── components/
│   │
│   └── lib/
│       └── tmdb/
│           ├── client.js
│           └── movies.js
│
├── next.config.ts
├── package.json
├── .gitignore
└── README.md
```

---

# 🧪 Main Next.js concepts jo seekhe

```txt
✓ App Router
✓ Server Components
✓ Client Components
✓ Dynamic Routes
✓ Route Groups
✓ Search Params
✓ API Integration
✓ Server-side Fetching
✓ Promise.all()
✓ Loading UI
✓ Error UI
✓ Not Found UI
✓ Metadata
✓ SEO
✓ next/image
✓ Responsive Design
✓ Reusable Components
✓ Environment Variables
✓ Vercel Deployment
```

---

# 💀 Jo cheezein seekhte waqt dimaag khayi

```txt
TMDB API
   ↓
"API key missing"

Next Image
   ↓
"Invalid src"

Dynamic Route
   ↓
"params kya hai bhai?"

TypeScript
   ↓
"Property does not exist 💀"

Tailwind
   ↓
"Class apply kyun nahi ho rahi?"

Git
   ↓
"fatal: not a git repository"

Vercel
   ↓
"Build failed"

Developer
   ↓
🙂
```

Aur fir:

```txt
Fix
 ↓
Run
 ↓
Error
 ↓
Google
 ↓
Fix
 ↓
Another Error
 ↓
Fix
 ↓
Finally works
 ↓
🔥
```

---

# 🚀 Deployment

GitHub:

```txt
git add .
git commit -m "build MovieFlix"
git push
```

Then:

```txt
GitHub
   ↓
Vercel
   ↓
Environment Variables
   ↓
Build
   ↓
Deploy
```

Production mein:

```env
TMDB_BASE_URL=...
TMDB_API_KEY=...
```

Vercel mein add karna.

---

# 📚 Main takeaway

Is project se main ye samjha:

```txt
Next.js sirf React + routing nahi hai.
```

Actual game hai:

```txt
Routing
+
Server
+
Data Fetching
+
Rendering
+
SEO
+
Performance
+
Error Handling
+
Architecture
```

Aur sabse important:

> **Tutorial dekh ke samajhna alag cheez hai.
> Khud error kha ke samajhna alag level hai. 😂**

---

# 🔮 Next kya seekhna hai?

MovieFlix ke baad:

```txt
→ Better TypeScript
→ Caching
→ Revalidation
→ Pagination
→ Authentication
→ Database
→ Watchlist
→ Favorites
→ User Profiles
→ Advanced Search
→ Filters
→ Performance Optimization
```

Basically:

```txt
Next.js Beginner
      ↓
MovieFlix
      ↓
More Errors 💀
      ↓
More Debugging
      ↓
Production Concepts
      ↓
Next.js Developer 🚀
```

---

# 👨‍💻 Built By

**Kuldeep Kumar**

Frontend Developer
Currently learning **Next.js + MERN + Full Stack Development**

