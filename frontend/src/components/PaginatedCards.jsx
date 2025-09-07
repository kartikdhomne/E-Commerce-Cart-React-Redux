import { useState } from "react";
import { Link } from "react-router-dom";
import ProductListItem from "./ProductListItem";
import { Button } from "./ui/button";

function PaginatedCards({ filtered }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(6);

  // total pages
  const totalPages = Math.ceil(filtered.length / productsPerPage);

  // slice products for current page
  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = filtered.slice(indexOfFirst, indexOfLast);

  return (
    <div>
      {/* Products */}
      <ul className="space-y-4">
        {currentProducts.map((product) => (
          <li key={product.id}>
            <Link to={`/product/${product.id}`}>
              <ProductListItem product={product} />
            </Link>
          </li>
        ))}
      </ul>
      {/* Pagination controls */}
      <div className="flex flex-col items-center space-y-3 mt-6">
        {/* Items per page */}
        <div className="mb-2">
          <label className="mr-2 font-medium">Items per page:</label>
          <select
            value={productsPerPage}
            onChange={(e) => {
              setProductsPerPage(Number(e.target.value));
              setCurrentPage(1); // reset to first page
            }}
            className="border rounded px-2 py-1"
          >
            <option value={6}>6</option>
            <option value={12}>12</option>
            <option value={24}>24</option>
          </select>
        </div>

        <div className="flex justify-center items-center space-x-2">
          {/* Prev */}
          <Button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="px-2 rounded-full md:rounded py-1 bg-black disabled:opacity-50 cursor-pointer"
          >
            ⬅️
          </Button>

          {/* Page numbers */}
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-2 md:px-3 py-1 rounded-full ${
                currentPage === i + 1 ? "bg-black text-white" : "bg-gray-200"
              }`}
            >
              {i + 1}
            </button>
          ))}

          {/* Next */}
          <Button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="px-2 py-1 bg-black rounded-full md:rounded disabled:opacity-50 cursor-pointer"
          >
            ➡️
          </Button>
        </div>
      </div>
    </div>
  );
}

export default PaginatedCards;
