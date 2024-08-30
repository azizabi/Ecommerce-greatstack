import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortOption, setSortOption] = useState("relevent");

  const toggleCategory = (e) => {
    const value = e.target.value;
    setCategory((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  const toggleSubCategory = (e) => {
    const value = e.target.value;
    setSubCategory((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  const sortProducts = (productsToSort) => {
    switch (sortOption) {
      case "low-high":
        return [...productsToSort].sort((a, b) => a.price - b.price);
      case "high-low":
        return [...productsToSort].sort((a, b) => b.price - a.price);
      default:
        return productsToSort; // Relevant sorting can be customized
    }
  };

  useEffect(() => {
    let filtered = products;

    // Apply search filter if search is active
    if (showSearch && search) {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Apply category filter
    if (category.length > 0) {
      filtered = filtered.filter((product) => category.includes(product.category));
    }

    // Apply sub-category filter
    if (subCategory.length > 0) {
      filtered = filtered.filter((product) => subCategory.includes(product.subCategory));
    }

    // Apply sorting
    setFilterProducts(sortProducts(filtered));
  }, [category, subCategory, products, sortOption, search, showSearch]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* Filter */}
      <div className="min-w-60">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
        >
          FILTERS
          <img
            className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`}
            src={assets.dropdown_icon}
            alt="Dropdown Icon"
          />
        </p>

        {/* Responsive Filter Container */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? "block" : "hidden"} sm:block`}>
          {/* Category Filter */}
          <div className="border border-gray-300 pl-5 py-3 my-5">
            <p className="mb-3 text-sm font-medium">CATEGORIES</p>
            <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
              {["Men", "Women", "Kids"].map((cat) => (
                <p className="flex gap-2" key={cat}>
                  <input
                    type="checkbox"
                    className="w-3"
                    value={cat}
                    onChange={toggleCategory}
                  />
                  {cat}
                </p>
              ))}
            </div>
          </div>

          {/* Sub Category Filter */}
          <div className="border border-gray-300 pl-5 py-3 my-5">
            <p className="mb-3 text-sm font-medium">TYPE</p>
            <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
              {["Topwear", "Bottomwear", "Winterwear"].map((subCat) => (
                <p className="flex gap-2" key={subCat}>
                  <input
                    type="checkbox"
                    className="w-3"
                    value={subCat}
                    onChange={toggleSubCategory}
                  />
                  {subCat}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Products */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={"ALL"} text2={"COLLECTION"} />

          {/* Product Sort */}
          <select
            className="border-2 border-gray-300 text-sm px-2"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="relevent">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low-High</option>
            <option value="high-low">Sort by: High-Low</option>
          </select>
        </div>

        {/* Map Products */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filterProducts.map((item, index) => (
            <ProductItem
              key={index}
              id={item._id}
              name={item.name}
              image={item.image}
              price={item.price}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
