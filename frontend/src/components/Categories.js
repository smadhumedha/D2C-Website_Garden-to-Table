import React from "react";
import "./Categories.css"; // Import the CSS file

const categories = [
  { name: "Milk & Coconut Water", img: "/images/coco.jpg" },
  { name: "Fresh Vegetables", img: "/images/veg.jpg" },
  { name: "Fresh Fruits", img: "/images/fruits.jpg" },
  { name: "Milk Products", img: "/images/milk prod.jpg" },
  { name: "Ghee & Oils", img: "/images/ghee.jpg" },
  { name: "Eggs", img: "/images/eggs.jpg" },
  { name: "Pulses", img: "/images/pulses.jpg" },
  { name: "Dry Fruits & Seeds", img: "/images/dry fruits.jpg" },
  { name: "Breads", img: "/images/breads.jpg" },
  { name: "Cereals & Millets", img: "/images/cereals.jpg" },
  { name: "Atta & Rice", img: "/images/rice.jpg" },
  { name: "Salt & Sugar", img: "/images/salt and sugar.jpg" },
  { name: "Pickle", img: "/images/pickle.jpg" },
  { name: "Spices", img: "/images/spices.jpg" },
  { name: "Coffee", img: "/images/coffee.jpg" },
  { name: "Honey", img: "/images/honey.jpg" },
];

const Categories = () => {
  return (
    <div className="categories-container">
      <div className="categories-grid">
        {categories.map((category, index) => (
          <div key={index} className="category-item">
            <div className="category-img">
              <img src={category.img} alt={category.name} />
            </div>
            <p>{category.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
