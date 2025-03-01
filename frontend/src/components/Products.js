import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Products.module.css"; // Import the CSS Module

const Products = () => {
  const navigate = useNavigate();

  const categories = [
    { name: "Fresh Produce", img: "/images/freshproduce.jpg", path: "/fresh-produce" },
    { name: "Dairy & Eggs", img: "/images/dairyandeggs.jpg", path: "/dairy-eggs" },
    { name: "Organic Staples", img: "/images/organicstaples.jpg", path: "/organic-staples" }
  ];

  return (
    <div className={styles.productsContainer}> {/* Use styles from the CSS Module */}
      <h2 className={styles.productsTitle}>Shop by Category</h2>
      <div className={styles.productsGrid}>
        {categories.map((category, index) => (
          <div
            key={index}
            className={styles.productCard}
            onClick={() => navigate(category.path)}
          >
            <h3>{category.name} <span className={styles.arrow}>→</span></h3>
            <img src={category.img} alt={category.name} className={styles.productImage} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;