const axios = require("axios");
const dotenv = require('dotenv');


const mood = process.argv[2] || "happy";
const language = process.argv[3] || "english";

dotenv.config();
const apiKey = process.env.API_KEY;

const query = `${mood} ${language} songs playlist`;


const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=playlist&key=${apiKey}`;

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
