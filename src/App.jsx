import { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const fetchProducts = async () => {
    const response = await fetch("https://dummyjson.com/products");
    const data = await response.json();
    setProducts(data.products);
    // console.log(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const selectedPageHandler = (selectedPage) => {
    setPage(selectedPage);
  };

  return (
    <>
      {<h1>Pagination</h1>}
      <div className="products">
        {products.slice(page * 10 - 10, page * 10).map((prod) => {
          return (
            <span className="product__single" key={prod.id}>
              <img src={prod.thumbnail} alt={prod.title} />
              <span className="title">{prod.title}</span>
            </span>
          );
        })}
      </div>
      <div>
        {
          <div className="pagination">
            <span>◀️</span>
           
              {[...Array(products.length / 10)].map((_, i) => {
                return (
                  <span
                    className={page === i + 1 ? "pagination__selected" : ""}
                    key={i}
                    onClick={() => selectedPageHandler(i + 1)}
                  >
                    {i + 1}
                  </span>
                );
              })}
            
            <span>▶️</span>
          </div>
        }
      </div>
    </>
  );
};
export default App;
