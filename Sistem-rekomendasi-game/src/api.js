export async function fetchDataGame() {
    const url = 'https://api.steampowered.com/ISteamApps/GetAppList/v2/';
    const response = await fetch(url);
    const gameData = await response.json();
    return gameData;
}
    
