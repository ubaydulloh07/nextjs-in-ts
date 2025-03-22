import { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import Header from '@/components/Header';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/types/product';

const Home: NextPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [cartCount, setCartCount] = useState(0);
  const [sortConfig, setSortConfig] = useState<{
    type: 'price' | 'rating' | null;
    order: 'asc' | 'desc' | null;
  }>({ type: null, order: null });
  
  const productsPerPage = 8;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products?limit=100');
        const data = await response.json();
        setProducts(data.products);
        setFilteredProducts(data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    let result = [...products];

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(product => {
        if (!product) return false;
        return (
          product.title?.toLowerCase().includes(query) ||
          product.description?.toLowerCase().includes(query) ||
          product.brand?.toLowerCase().includes(query) ||
          product.category?.toLowerCase().includes(query)
        );
      });
    }

    // Apply sorting
    if (sortConfig.type && sortConfig.order) {
      result.sort((a, b) => {
        if (!a || !b) return 0;
        const valueA = a[sortConfig.type!];
        const valueB = b[sortConfig.type!];
        
        if (sortConfig.order === 'asc') {
          return valueA > valueB ? 1 : -1;
        } else {
          return valueA < valueB ? 1 : -1;
        }
      });
    }

    setFilteredProducts(result);
    setCurrentPage(1);
  }, [products, searchQuery, sortConfig]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleSort = (type: 'price' | 'rating', order: 'asc' | 'desc') => {
    setSortConfig({ type, order });
  };

  const handleAddToCart = () => {
    setCartCount(prev => prev + 1);
  };

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-text">Yuklanmoqda...</div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <Header onSearch={handleSearch} onSort={handleSort} cartCount={cartCount} />
      
      <main className="main-content">
        <div className="product-grid">
          {currentProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>

        {totalPages > 1 && (
          <div className="pagination">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`pagination-button ${currentPage === page ? 'active' : ''}`}
              >
                {page}
              </button>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
