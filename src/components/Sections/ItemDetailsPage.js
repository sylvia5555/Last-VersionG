import React from "react";
import { useParams } from "react-router-dom";
import items from "./Detaisldata";
import "./Sections.css"; 
import RelatedSlider from "./Slider";

const ItemDetails = () => {
  const { id } = useParams();
  const element = items.find((el) => el.id === Number(id));

  if (!element) {
    return <h2 style={{ textAlign: "center", marginTop: "150px" }}>Item Not Found</h2>;
  }

  const relatedItems = items.filter(
    (el) => el.sectionId === element.sectionId && el.id !== element.id
  );

  return (
    <div className="item-details-container">
      {/* صورة العنصر */}
      <div className="main-image-wrapper">
        <img src={element.image} alt={element.name} className="main-image" />
      </div>

      {/* المحتوى */}
      <div className="dcontent-wrapper">
        <h2 className="head">{element.name}</h2>
<p className="desc">
  An iconic and majestic artifact known as <strong>{element.name}</strong>, celebrated for its cultural and historical significance. This piece reflects the artistic mastery and religious symbolism of the ancient Egyptian civilization, offering insights into the beliefs and values of its time.
</p>


        <div className="details-box">
          <h3 style={{color:" #986711",fontWeight:"bold"}}>Details :</h3>
          <ul>
            <li><strong>Dynasty:</strong> {element.dynasty}</li>
            <li><strong>Period:</strong> c. 1279–1213 BC</li>
            <li><strong>Material:</strong> {element.material}</li>
            <li><strong>Height:</strong> 10 feet (3 meters)</li>
            <li><strong>Current Location:</strong> Egyptian Museum, Cairo</li>
          </ul>
        </div>

        <div className="context-box">
          <h3 style={{color:" #986711",fontWeight:"bold"}}>Historical Context:</h3>
          <p>
            {element.name.split(" ")[2]} was known for architectural accomplishments and military campaigns...
          </p>
        </div>
      </div>

      {/* السلايدر في الآخر */}
      <div className="related-slider-wrapper">
        <h3 style={{textAlign:"center",color:"var(--main)"}} className="head">Related Artifacts</h3>
        <RelatedSlider items={relatedItems} />
      </div>
    </div>
  );
};

export default ItemDetails;
