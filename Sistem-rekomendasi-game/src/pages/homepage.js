import '../styles/main.css';
import '../styles/login.css';
import { LoginPage } from './loginpage';

document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.getElementById('login-btn');
    loginBtn.addEventListener('click', () => {
        const app = document.getElementById('app');
        app.innerHTML = LoginPage();
    });
});

async function fetchDataGame() {
    const url = 'https://api.steampowered.com/ISteamApps/GetAppList/v2/';
    const response = await fetch(url);
    const gameData = await response.json();
    return gameData;
}

function createGameCard(game) {
    return `
    <div class="game-card">
        ${game.percentage ? `<div class="game-percent">${game.percentage}</div>` : ''}
        ${game.hot ? `<div class="hot-badge">HOT</div>` : ''}
        <h3>${game.title}</h3>
        <div class="game-genres">
            ${game.genres.map(genre => `<span class="genre-badge">${genre}</span>`).join('')}
        </div>
        <p class="game-description">${game.description}</p>
        <button class="detail-btn">Lihat Detail</button>
    </div>
    `;
}

async function render() {
  const app = document.getElementById('app');
  app.innerHTML = `
    <nav class="navbar">
        <div class="logo">
            <span class="logo-icon">🎮</span>
            GameMatch
        </div>
        <ul class="nav-links">
            <li>Beranda</li>
            <li>Eksplorasi</li>
            <li>Koleksi</li>
            <li>Tentang Kami</li>
            <li>Blog</li>
        </ul>
        <div class="auth-buttons">
          <button class="register-btn">Daftar</button>
          <button id="login-btn" class="login-btn">Masuk</button>
      </div>
    </nav>

    <section class="hero">
        <h1>Temukan Game Terbaik untuk Anda</h1>
        <p>Sistem rekomendasi game pintar yang memahami selera Anda dan menyarankan game yang akan Anda sukai.</p>
        <div class="search-bar">
            <input type="text" placeholder="Cari game atau masukkan game favorit Anda..." />
            <button class="search-btn">🔍</button>
        </div>
    </section>

    <div class="filter-bar">
      <div class="genre-filter">
        <span>Filter berdasarkan Genre :</span>
        <div class="genre-list">
          <button class="genre-btn active">Semua</button>
          <button class="genre-btn">Action</button>
          <button class="genre-btn">Adventure</button>
          <button class="genre-btn">RPG</button>
          <button class="genre-btn">Strategy</button>
          <button class="genre-btn">Simulation</button>
          <button class="genre-btn">Sports</button>
          <button class="genre-btn">Puzzle</button>
        </div>
      </div>
      <div class="platform-filter">
        <span>Platform :</span>
        <div class="platform-list">
          <button class="platform-btn">💻</button>
        </div>
      </div>
    </div>

        <main>
            <section class="recommend-section">
                <h2>Rekomendasi untuk Anda</h2>
                <div class="game-grid" id="recommendation-list"></div>
            </section>

            <section class="trending-section">
                <h2>Trending Minggu Ini</h2>
                <div class="game-grid" id="trending-list"></div>
            </section>

            <section class="signup-banner">
                <h2>Dapatkan Rekomendasi yang Lebih Personal</h2>
                <p>Buat akun untuk mendapatkan rekomendasi game yang disesuaikan dengan preferensi dan riwayat bermain Anda.</p>
                <button class="signup-btn">Buat Akun</button>
                <a href="#" class="learn-more">Pelajari Lebih Lanjut</a>
            </section>
        </main>
    </div>

    <footer class="footer">
        <div class="footer-columns">
            <div class="footer-col">
                <div class="footer-logo">
                    <span>🎮</span>
                    GameMatch
                </div>
                <p>Temukan game terbaik yang sesuai dengan selera Anda melalui sistem rekomendasi game pintar kami.</p>
            </div>
            
            <div class="footer-col">
                <h3>Navigasi</h3>
                <ul>
                    <li>Beranda</li>
                    <li>Eksplorasi</li>
                    <li>Koleksi</li>
                    <li>Tentang Kami</li>
                    <li>Blog</li>
                </ul>
            </div>

            <div class="footer-col">
                <h3>Genre</h3>
                <ul>
                    <li>Action</li>
                    <li>Adventure</li>
                    <li>RPG</li>
                    <li>Strategy</li>
                    <li>Sports</li>
                    <li>Simulation</li>
                </ul>
            </div>

            <div class="footer-col">
                <h3>Hubungi Kami</h3>
                <ul>
                    <li>info@gamematch.com</li>
                    <li>+62 123 4567 890</li>
                </ul>
                
                <h3 class="subscribe-title">Berlangganan</h3>
                <div class="subscribe-form">
                    <input type="email" placeholder="Email Anda" />
                    <button class="subscribe-btn">Kirim</button>
                </div>
            </div>
        </div>
        
        <div class="copyright">
            © 2023 GameMatch. Semua hak dilindungi.
        </div>
    </footer>
  `;

  // Add event listener after render
  const loginBtn = document.getElementById('login-btn');
  console.log('Login button:', loginBtn); // Debug log
  
  loginBtn.addEventListener('click', () => {
    console.log('Login button clicked!'); // Debug log
    const app = document.getElementById('app');
    console.log('App element:', app); // Debug log
    app.innerHTML = LoginPage();
  });

  // Game data
  const recommendations = [
    {
        title: "The Witcher 3",
        percentage: "98%",
        genres: ["RPG", "Adventure"],
        description: "Petualangan epik dalam dunia fantasi luas dengan pertarungan menantang dan cerita mendalam."
    },
    {
        title: "Red Dead Redemption 2",
        percentage: "95%",
        genres: ["Action", "Open World"],
        description: "Jelajahi Wild West dalam petualangan koboi yang realistis dengan grafis memukau."
    },
    {
        title: "Minecraft",
        percentage: "93%",
        genres: ["Sandbox", "Survival"],
        description: "Bangun, jelajahi, dan bertahan hidup di dunia blok yang dapat diubah sepenuhnya."
    },
    {
        title: "FIFA 23",
        percentage: "90%",
        genres: ["Sports", "Simulation"],
        description: "Pengalaman sepak bola paling realistis dengan grafis dan gameplay yang ditingkatkan."
    }
  ];

  const trending = [
    {
        title: "Elden Ring",
        hot: true,
        genres: ["Action", "RPG"],
        description: "Petualangan dunia terbuka yang menantang dengan pertempuran epik dan eksplorasi."
    },
    {
        title: "Valorant",
        hot: true,
        genres: ["FPS", "Tactical"],
        description: "Penembak taktikal 5v5 dengan karakter unik dan kemampuan khusus."
    },
    {
        title: "Fortnite",
        hot: true,
        genres: ["Battle Royale", "Action"],
        description: "Game battle royale populer dengan mekanik membangun dan event musiman."
    },
    {
        title: "Stardew Valley",
        hot: true,
        genres: ["Simulation", "RPG"],
        description: "Kelola pertanian Anda, bertemu penduduk desa, dan jelajahi gua misterius."
    }
  ];

  // Render games
  const recList = document.getElementById('recommendation-list');
  const trendList = document.getElementById('trending-list');

  recommendations.forEach(game => {
    recList.innerHTML += createGameCard({...game, percentage: game.percentage});
  });

  trending.forEach(game => {
    trendList.innerHTML += createGameCard({...game, hot: true});
  });
}

render();