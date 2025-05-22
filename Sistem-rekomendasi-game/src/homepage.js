import './styles/main.css';

const gamesRekomendasi = [
    {
        title: "The Witcher 3",
        genres: ["RPG", "Adventure"],
        description: "Petualangan epik dalam dunia fantasi yang luas dengan pertarungan menantang dan cerita mendalam.",
        percent: 95,
        color: "#8f6be6",
        icon: "🎮"
    },
    {
        title: "Red Dead Redemption 2",
        genres: ["Action", "Open World"],
        description: "Jelajahi Wild West dalam petualangan koboi yang realistis dengan grafis memukau.",
        percent: 92,
        color: "#ff6b3d",
        icon: "▶️"
    },
    {
        title: "Minecraft",
        genres: ["Sandbox", "Survival"],
        description: "Bangun, jelajahi, dan bertahan hidup di dunia blok yang dapat diubah sepenuhnya.",
        percent: 88,
        color: "#2ad6a1",
        icon: "🕹️"
    },
    {
        title: "FIFA 23",
        genres: ["Sports", "Simulation"],
        description: "Pengalaman sepak bola paling realistis dengan grafis dan gameplay yang ditingkatkan.",
        percent: 90,
        color: "#ffb13d",
        icon: "🌍"
    }
];

const gamesTrending = [
    {
        title: "Elden Ring",
        genres: ["Action", "RPG"],
        description: "Petualangan dunia terbuka yang menantang dengan pertempuran epik dan eksplorasi.",
        hot: true,
        color: "#8f6be6",
        icon: "⭐"
    },
    {
        title: "Valorant",
        genres: ["FPS", "Tactical"],
        description: "Penembak taktik 5v5 dengan karakter unik dan kemampuan khusus.",
        hot: true,
        color: "#ff6b8b",
        icon: "✔️"
    },
    {
        title: "Fortnite",
        genres: ["Battle Royale", "Action"],
        description: "Game battle royale populer dengan mekanik membangun dan event musiman.",
        hot: true,
        color: "#3dbaff",
        icon: "🎵"
    },
    {
        title: "Stardew Valley",
        genres: ["Simulation", "RPG"],
        description: "Kelola pertanian Anda, bertemu penduduk desa, dan jelajahi gua misterius.",
        hot: true,
        color: "#2ad6a1",
        icon: "🗺️"
    }
];

const genres = ["Semua", "Action", "Adventure", "RPG", "Strategy", "Simulation", "Sports", "Puzzle"];
const platforms = [
    {icon: "🎮", label: "PC"},
    {icon: "🕹️", label: "Console"},
    {icon: "📱", label: "Mobile"},
    {icon: "🌐", label: "Web"}
];

async function renderDashboard() {
    const app = document.getElementById('app');
    app.innerHTML = `
    <nav class="navbar">
        <div class="logo"> <span class="logo-icon">🎮</span> <span class="logo-text">GameMatch</span></div>
        <ul class="nav-links">
            <li>Beranda</li>
            <li>Eksplorasi</li>
            <li>Koleksi</li>
            <li>Tentang</li>
        </ul>
        <button class="login-btn">Masuk</button>
    </nav>
    <section class="hero">
        <h1>Temukan Game Terbaik untuk Anda</h1>
        <p>Sistem rekomendasi game pintar yang memahami selera Anda dan menyarankan game yang akan Anda sukai.</p>
        <div class="search-bar">
            <input type="text" placeholder="Cari game atau masukkan game favorit Anda...">
            <button class="search-btn">🔍</button>
        </div>
    </section>
    <section class="filter-bar">
        <div class="genre-filter">
            <span>Filter berdasarkan Genre:</span>
            <div class="genre-list">
                ${genres.map((g, i) => `<button class="genre-btn${i===0?' active':''}">${g}</button>`).join('')}
            </div>
        </div>
        <div class="platform-filter">
            <span>Platform:</span>
            <div class="platform-list">
                ${platforms.map(p => `<button class="platform-btn">${p.icon}</button>`).join('')}
            </div>
        </div>
    </section>
    <section class="recommend-section">
        <h2>Rekomendasi untuk Anda</h2>
        <div class="game-row">
            ${gamesRekomendasi.map(game => `
                <div class="game-card" style="--card-accent: ${game.color}">
                    <div class="game-icon">${game.icon}</div>
                    <div class="game-percent">${game.percent}%</div>
                    <h3>${game.title}</h3>
                    <div class="game-genres">
                        ${game.genres.map(g => `<span class="genre-badge">${g}</span>`).join(' ')}
                    </div>
                    <p class="game-description">${game.description}</p>
                    <button class="detail-btn">Lihat Detail</button>
                </div>
            `).join('')}
        </div>
    </section>
    <section class="trending-section">
        <h2>Trending Minggu Ini</h2>
        <div class="game-row">
            ${gamesTrending.map(game => `
                <div class="game-card" style="--card-accent: ${game.color}">
                    <div class="game-icon">${game.icon}</div>
                    ${game.hot ? '<div class="hot-badge">HOT</div>' : ''}
                    <h3>${game.title}</h3>
                    <div class="game-genres">
                        ${game.genres.map(g => `<span class="genre-badge">${g}</span>`).join(' ')}
                    </div>
                    <p class="game-description">${game.description}</p>
                    <button class="detail-btn">Lihat Detail</button>
                </div>
            `).join('')}
        </div>
    </section>
    <section class="personal-recommendation">
        <div class="signup-banner">
            <h2>Dapatkan Rekomendasi yang Lebih Personal</h2>
            <p>Buat akun untuk mendapatkan rekomendasi game yang disesuaikan dengan preferensi dan riwayat bermain Anda.</p>
            <button class="signup-btn">Buat Akun</button>
            <a href="#" class="learn-more">Pelajari Lebih Lanjut</a>
        </div>
    </section>
    <footer class="footer">
        <div class="footer-columns">
            <div class="footer-col">
                <div class="footer-logo"><span class="logo-icon">🎮</span> GameMatch</div>
                <p>Temukan game terbaik yang sesuai dengan selera Anda melalui sistem rekomendasi game pintar kami.</p>
                <div class="footer-socials">
                    <span>🌐</span> <span>🐦</span> <span>📸</span> <span>▶️</span>
                </div>
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
                    <li class="subscribe">
                        <input type="email" placeholder="Email Anda">
                        <button>Kirim</button>
                    </li>
                </ul>
            </div>
        </div>
        <div class="copyright">
            © 2023 GameMatch. Semua hak dilindungi.
        </div>
    </footer>
    `;
}

document.addEventListener('DOMContentLoaded', renderDashboard);