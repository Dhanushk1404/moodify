const axios = require("axios");

// Retrieve mood and language from command-line arguments
// Usage: node youtubeSearch.js <mood> <language>
// Example: node youtubeSearch.js happy tamil
const mood = process.argv[2] || "happy";
const language = process.argv[3] || "english";

// Your YouTube Data API key
const API_KEY = "AIzaSyBJblVWwmnO_qWn5STmLixlXmU2tIblF-o"; // Replace with your actual API key

// Construct the search query (e.g., "happy tamil songs playlist")
const query = `${mood} ${language} songs playlist`;

// Construct the YouTube Data API URL
const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=playlist&key=${API_KEY}`;

async function fetchPlaylists() {
  try {
    const response = await axios.get(url);
    const playlists = response.data.items;

    if (!playlists || playlists.length === 0) {
      console.log(`No playlists found for "${query}".`);
      return;
    }

    console.log(`Playlists for "${query}":\n`);
    playlists.forEach((playlist, index) => {
      const title = playlist.snippet.title;
      const description = playlist.snippet.description;
      const thumbnail = playlist.snippet.thumbnails?.default?.url || "No image";
      const playlistId = playlist.id.playlistId;
      const playlistUrl = `https://www.youtube.com/playlist?list=${playlistId}`;

      console.log(`${index + 1}. ${title}`);
      console.log(`   Description: ${description}`);
      console.log(`   Thumbnail: ${thumbnail}`);
      console.log(`   Link: ${playlistUrl}\n`);
    });
  } catch (error) {
    console.error("Error fetching playlists:", error.response ? error.response.data : error.message);
  }
}

fetchPlaylists();
