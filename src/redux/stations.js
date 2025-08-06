import { getImageUrl } from "../config/assets";

// Music tracks are now served from Firebase Storage
const FIREBASE_STORAGE_BASE =
  "https://firebasestorage.googleapis.com/v0/b/carsnipe-online.firebasestorage.app/o";

const Track1 = `${FIREBASE_STORAGE_BASE}/${encodeURIComponent(
  "music/Joey Valence & Brae - HOOLIGANG.mp3"
)}?alt=media`;
const Track2 = `${FIREBASE_STORAGE_BASE}/${encodeURIComponent(
  "music/SPARK MASTER TAPE - KKONKKRETE (OFFICIAL AUDIO).mp3"
)}?alt=media`;
const Track3 = `${FIREBASE_STORAGE_BASE}/${encodeURIComponent(
  "music/ZHU, partywithray - Came For The Low.mp3"
)}?alt=media`;
const Track4 = `${FIREBASE_STORAGE_BASE}/${encodeURIComponent(
  "music/Fergie - M.I.L.F. $ (Audio Version).mp3"
)}?alt=media`;
const Track5 = `${FIREBASE_STORAGE_BASE}/${encodeURIComponent(
  "music/Feel Good Inc. Gorillaz.mp3"
)}?alt=media`;
const Track6 = `${FIREBASE_STORAGE_BASE}/${encodeURIComponent(
  "music/Renegades Of Funk.mp3"
)}?alt=media`;
const Track7 = `${FIREBASE_STORAGE_BASE}/${encodeURIComponent(
  "music/Son of augustine - Ask Me How.mp3"
)}?alt=media`;
const Track8 = `${FIREBASE_STORAGE_BASE}/${encodeURIComponent(
  "music/Benny Benassi - Inside of Me HQ.mp3"
)}?alt=media`;

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
