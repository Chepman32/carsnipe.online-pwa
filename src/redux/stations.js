import { getImageUrl } from "../config/assets";

// Music tracks are now served from Firebase Storage
const Track1 =
  "https://storage.googleapis.com/carsnipe-online.firebasestorage.app/music/Joey%20Valence%20%26%20Brae%20-%20HOOLIGANG.mp3";
const Track2 =
  "https://storage.googleapis.com/carsnipe-online.firebasestorage.app/music/SPARK%20MASTER%20TAPE%20-%20KKONKKRETE%20(OFFICIAL%20AUDIO).mp3";
const Track3 =
  "https://storage.googleapis.com/carsnipe-online.firebasestorage.app/music/ZHU%2C%20partywithray%20-%20Came%20For%20The%20Low.mp3";
const Track4 =
  "https://storage.googleapis.com/carsnipe-online.firebasestorage.app/music/Fergie%20-%20M.I.L.F.%20%24%20(Audio%20Version).mp3";
const Track5 =
  "https://storage.googleapis.com/carsnipe-online.firebasestorage.app/music/Feel%20Good%20Inc.%20Gorillaz.mp3";
const Track6 =
  "https://storage.googleapis.com/carsnipe-online.firebasestorage.app/music/Renegades%20Of%20Funk.mp3";
const Track7 =
  "https://storage.googleapis.com/carsnipe-online.firebasestorage.app/music/Son%20of%20augustine%20-%20Ask%20Me%20How.mp3";
const Track8 =
  "https://storage.googleapis.com/carsnipe-online.firebasestorage.app/music/Benny%20Benassi%20-%20Inside%20of%20Me%20HQ.mp3";

export const stations = [
  {
    id: "hiphop",
    name: "Hip Hop",
    tracks: [
      { id: 1, name: "Joey Valence & Brae - HOOLIGANG", url: Track1 },
      {
        id: 2,
        name: "SPARK MASTER TAPE - KKONKKRETE (OFFICIAL AUDIO)",
        url: Track2,
      },
    ],
    icon: getImageUrl("radio/Hip Hop"),
  },
  {
    id: "electronic",
    name: "Electronic",
    tracks: [
      { id: 3, name: "ZHU, partywithray - Came For The Low", url: Track3 },
      { id: 8, name: "Benny Benassi - Inside of Me HQ", url: Track8 },
    ],
    icon: getImageUrl("radio/Electronic"),
  },
  {
    id: "pop",
    name: "Pop",
    tracks: [
      { id: 4, name: "Fergie - M.I.L.F. $ (Audio Version)", url: Track4 },
      { id: 5, name: "Feel Good Inc. Gorillaz", url: Track5 },
    ],
    icon: getImageUrl("radio/Pop"),
  },
  {
    id: "rock",
    name: "Rock",
    tracks: [
      { id: 6, name: "Renegades Of Funk", url: Track6 },
      { id: 7, name: "Son of Augustine - Ask Me How", url: Track7 },
    ],
    icon: getImageUrl("radio/Rock"),
  },
  // Add more stations as needed
];
