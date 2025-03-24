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
  const [sortConfig, setSortConfig] = useState<{
    type: 'price' | 'rating' | null;
    order: 'asc' | 'desc' | null;
  }>({ type: null, order: null });

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
  }, [products, searchQuery, sortConfig]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleSort = (type: 'price' | 'rating', order: 'asc' | 'desc') => {
    setSortConfig({ type, order });
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-text">Yuklanmoqda...</div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <Header onSearch={handleSearch} onSort={handleSort} />
      
      <main className="main-content">
        <div className="product-grid">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;
