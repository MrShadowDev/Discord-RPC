// Follow https://github.com/slowwdev/Discord-Selfbot-RPC/wiki/Installation to learn how to use app ID and image keys.

module.exports = {
  // Available modes: "spotify", "game", "twitch"
  mode: "game",

  // Available statuses: "dnd", "online", "idle"
  status: "idle",

  game: {
    applicationID: "1056514288182894672",
    name: "", // Title
    details: "", // First row below title
    state: "", // Second row below title
    largeImageKey: "", // Large image
    largeImageText: "", // Text to display when the large image is hovered over
    smallImageKey: "", // Small image
    smallImageText: "", // Text to display when the small image is hovered over
    startTimestamp: "", // Date.now() epoch timestamp indicating the time elapsed since this timestamp (increases)
    endTimestamp: "", // Date.now() epoch timestamp indicating the time left since this timestamp (decreases)
  },

  twitch: {
    applicationID: "",
    url: "", // Twitch channel link
    details: "", // Title
    state: "", // First row below title (e.g. "Playing ...")
    largeImageKey: "", // In dev portal, upload an image and name it with the name you want to appear when the image is surrounded
    largeImageText: "", // Use this to replace text when the large image is surrounded; this will also be the second row below the title. If you don't want the row, leave this empty and set the text via the dev portal (using the image name).
    smallImageKey: "",
    smallImageText: "",
    startTimestamp: "",
    endTimestamp: "",
  },

  spotify: {
    name: "", // Displayed as "Listening to {name}" instead of "Listening to Spotify"
    details: "", // Title
    state: "", // Second row below title
    largeImageKey: "", // See https://github.com/mewzax/Discord-RPC-Selfbot/wiki/Spotify-API
    largeImageText: "", // Text to display when the large image is hovered over; also displayed as the second row below the title
    smallImageKey: "",
    smallImageText: "",
    startTimestamp: "",
    endTimestamp: "",
  },
};
