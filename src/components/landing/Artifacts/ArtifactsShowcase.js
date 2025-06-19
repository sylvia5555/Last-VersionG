import React from "react";
import "./ArtifactsShowcase.css";
import artifact1 from "../../../Assets/gallery/art1.jpg";
import artifact2 from "../../../Assets/gallery/artifact2.jpg";
import artifact3 from "../../../Assets/gallery/artifact3.jpg";
import artifact4 from "../../../Assets/gallery/artifact4.jpg";
import artifact5 from "../../../Assets/gallery/artifact5.jpg";
import artifact6 from "../../../Assets/gallery/artifact6.jpg";
import artifact7 from "../../../Assets/gallery/ar7.jpg";
import artifact8 from "../../../Assets/gallery/ar8.jpg";
const artifacts = [
  {
    id: 1,
    name: "Tutankhamun's Mask",
    description: "A gold funerary mask from ancient Egypt.",
    image: artifact1,
  },
  {
    id: 2,
    name: "Rosetta Stone",
    description: "An ancient stone inscribed with hieroglyphs.",
    image: artifact2,
  },
  {
    id: 3,
    name: "Canopic Jars",
    description: "Ceramic jars used in mummification.",
    image: artifact3,
  },
  {
    id: 4,
    name: "Scarab Beetle Amulet",
    description: "A symbol of rebirth and protection.",
    image:artifact4,
  },
  {
    id: 5,
    name: "Nefertiti Bust",
    description: "A stunning sculpture of Queen Nefertiti.",
    image: artifact5,
  },
  {
    id: 6,
    name: "Ankh Symbol",
    description: "A symbol representing life in ancient Egypt.",
    image:artifact6,
  },


  {
    id: 7,
    name: "hatshepsut",
    description: "A symbol representing Queen hatshepsut.",
    image:artifact7,
  },


  {
    id: 8,
    name: "Egyption Coins",
    description: "Golden Treasures of Ancient Egypt 36 Silver Coins.",
    image:artifact8,
  },


];

const ArtifactsShowcase = () => {
  return (
    <section className="artifacts-section">
      <h2 className="section-title head">Egyptian Artifacts</h2>
      <div className="artifacts-container">
        {artifacts.map((artifact) => (
          <div key={artifact.id} className="artifact-card">
            <div className="artifact-inner">
              <div className="artifact-front">
                <img src={artifact.image} alt={artifact.name} />
                <h3>{artifact.name}</h3>
              </div>
              <div className="artifact-back">
                <h3 className="head">{artifact.name}</h3>
                <p>{artifact.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ArtifactsShowcase;
