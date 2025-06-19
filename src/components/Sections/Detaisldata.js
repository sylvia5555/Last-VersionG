import s11 from "../../Assets/s11.jpg"
import s12 from "../../Assets/s12.jpg"
import s13 from "../../Assets/s13.avif"
import s14 from "../../Assets/s14.webp"
//2
import s21 from "../../Assets/s21.jpg"
import s22 from "../../Assets/s22.webp"
import s23 from "../../Assets/s23.jpg"
import s24 from "../../Assets/s24.jpg"
//3
import s31 from "../../Assets/s31.jpg"
import s32 from "../../Assets/s32.jpg"
import s33 from "../../Assets/s33.jpeg"
import s34 from "../../Assets/s34.webp"
//4
import s41 from "../../Assets/s41.jpg"
import s42 from "../../Assets/s42.jpg"
import s43 from "../../Assets/s43.jpg"
import s44 from "../../Assets/s44.jpg"
//5
import s51 from "../../Assets/s51.jpg"
import s52 from "../../Assets/s52.jpg"
import s53 from "../../Assets/s53.jpg"
import s54 from "../../Assets/s54.webp"
//6
import s61 from "../../Assets/s61.jpg"
import s62 from "../../Assets/s62.webp"
import s63 from "../../Assets/s63.jpg"
import s64 from "../../Assets/s64.jpg"
//7
import s71 from "../../Assets/s71.png"
import s72 from "../../Assets/s72.webp"
import s73 from "../../Assets/s73.png"
import s74 from "../../Assets/s74.jpg"
export const items = [
  // قسم 1
  {
    id: 1,
    name: "Statue of Ramses II",
    image: s11,
    material: "Granite",
    dynasty: "19th Dynasty",
    sectionId: 1,
  },
  {
    id: 2,
    name: "Statue of Akhenaten",
    image: s12,
    material: "Limestone",
    dynasty: "18th Dynasty",
    sectionId: 1,
  },
  {
    id: 3,
    name: "Statue of Tutankhamun",
    image: s13,
    material: "Gold",
    dynasty: "18th Dynasty",
    sectionId: 1,
  },
  {
    id: 4,
    name: "Statue of Cleopatra",
    image: s14,
    material: "Marble",
    dynasty: "Ptolemaic Dynasty",
    sectionId: 1,
  },

  // قسم 2
  {
    id: 5,
    name: "Wooden Model of Workers",
    image: s21,
    material: "Painted Wood",
    dynasty: "11th Dynasty",
    sectionId: 2,
  },
  {
    id: 6,
    name: "Middle Kingdom Stela",
    image: s22,
    material: "Limestone",
    dynasty: "12th Dynasty",
    sectionId: 2,
  },
  {
    id: 7,
    name: "Jewelry of Princess Khnumet",
    image: s23,
    material: "Gold and Semi-Precious Stones",
    dynasty: "12th Dynasty",
    sectionId: 2,
  },
  {
    id: 8,
    name: "Statue of Senusret III",
    image: s24,
    material: "Black Granite",
    dynasty: "12th Dynasty",
    sectionId: 2,
  },

  // قسم 3
  {
    id: 9,
    name: "Temple of Karnak",
    image: s31,
    material: "Sandstone",
    dynasty: "18th–20th Dynasties",
    sectionId: 3,
  },
  {
    id: 10,
    name: "Obelisk of Hatshepsut",
    image: s32,
    material: "Red Granite",
    dynasty: "18th Dynasty",
    sectionId: 3,
  },
  {
    id: 11,
    name: "Statue of Amenhotep III",
    image: s33,
    material: "Quartzite",
    dynasty: "18th Dynasty",
    sectionId: 3,
  },
  {
    id: 12,
    name: "Great Temple of Abu Simbel",
    image: s34,
    material: "Rock-cut Sandstone",
    dynasty: "19th Dynasty",
    sectionId: 3,
  },

  // قسم 4
  {
    id: 13,
    name: "Mummy of Ramses II",
    image: s41,
    material: "Preserved Body and Linen",
    dynasty: "19th Dynasty",
    sectionId: 4,
  },
  {
    id: 14,
    name: "Mummy of Seti I",
    image: s42,
    material: "Preserved Body and Resin",
    dynasty: "19th Dynasty",
    sectionId: 4,
  },
  {
    id: 15,
    name: "Mummy of Queen Ahmose-Nefertari",
    image: s43,
    material: "Linen Wrappings",
    dynasty: "18th Dynasty",
    sectionId: 4,
  },
  {
    id: 16,
    name: "Mummy of Thutmose III",
    image: s44,
    material: "Resin and Linen",
    dynasty: "18th Dynasty",
    sectionId: 4,
  },

  // قسم 5
  {
    id: 17,
    name: "Book of the Dead Papyrus",
    image: s51,
    material: "Papyrus and Ink",
    dynasty: "New Kingdom",
    sectionId: 5,
  },
  {
    id: 18,
    name: "Ptolemaic Silver Coin",
    image: s53,
    material: "Silver",
    dynasty: "Ptolemaic",
    sectionId: 5,
  },
  {
    id: 19,
    name: "Religious Papyrus Scroll",
    image: s52,
    material: "Papyrus",
    dynasty: "Late Period",
    sectionId: 5,
  },
  {
    id: 20,
    name: "Golden Pharaoh Coin",
    image: s54,
    material: "Gold",
    dynasty: "Late Period",
    sectionId: 5,
  },

  // قسم 6
  {
    id: 21,
    name: "Sarcophagus of Tutankhamun",
    image: s61,
    material: "Gold and Wood",
    dynasty: "18th Dynasty",
    sectionId: 6,
  },
  {
    id: 22,
    name: "Granite Statue of Sekhmet",
    image: s62,
    material: "Granite",
    dynasty: "New Kingdom",
    sectionId: 6,
  },
  {
    id: 23,
    name: "Wooden Sarcophagus of Priest",
    image: s63,
    material: "Wood and Paint",
    dynasty: "Late Period",
    sectionId: 6,
  },
  {
    id: 24,
    name: "Bust of Nefertiti (Replica)",
    image: s64,
    material: "Limestone and Paint",
    dynasty: "18th Dynasty",
    sectionId: 6,
  },

  // قسم 7
  {
    id: 25,
    name: "Tutankhamun's Golden Mask",
    image: s71,
    material: "Gold and Lapis Lazuli",
    dynasty: "18th Dynasty",
    sectionId: 7,
  },
  {
    id: 26,
    name: "Royal Necklace",
    image: s72,
    material: "Gold and Semi-Precious Stones",
    dynasty: "New Kingdom",
    sectionId: 7,
  },
  {
    id: 27,
    name: "Bracelet of Shoshenq I",
    image: s73,
    material: "Gold and Carnelian",
    dynasty: "22nd Dynasty",
    sectionId: 7,
  },
  {
    id: 28,
    name: "Golden Earrings of a Princess",
    image: s74,
    material: "Gold",
    dynasty: "New Kingdom",
    sectionId: 7,
  },
];


export default items;