import { ChangeEvent } from 'react';
import Link from 'next/link';

interface HeaderProps {
  onSearch: (query: string) => void;
  onSort: (type: 'price' | 'rating', order: 'asc' | 'desc') => void;
  cartCount: number;
}

export default function Header({ onSearch, onSort, cartCount }: HeaderProps) {
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-content">
          <Link href="/" className="logo">
            Online Do'kon
          </Link>
          <form className="search-form" onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              className="search-input"
              placeholder="Mahsulotlarni qidirish..."
              onChange={handleSearchChange}
            />
          </form>
          <div className="sort-controls">
            <div className="sort-group">
              <select 
                className="sort-select" 
                onChange={(e) => {
                  const value = e.target.value;
                  if (value.startsWith('price')) {
                    onSort('price', value.endsWith('asc') ? 'asc' : 'desc');
                  }
                }}
                defaultValue=""
              >
                <option value="" disabled>Narx bo'yicha</option>
                <option value="price-asc">Arzondan qimmatga</option>
                <option value="price-desc">Qimmatdan arzonga</option>
              </select>
            </div>
            <div className="sort-group">
              <select 
                className="sort-select"
                onChange={(e) => {
                  const value = e.target.value;
                  if (value.startsWith('rating')) {
                    onSort('rating', value.endsWith('asc') ? 'asc' : 'desc');
                  }
                }}
                defaultValue=""
              >
                <option value="" disabled>Reyting bo'yicha</option>
                <option value="rating-desc">Yuqori reytingdan</option>
                <option value="rating-asc">Past reytingdan</option>
              </select>
            </div>
          </div>
          <div className="cart-container">
            <button className="cart-button">
              🛒 Savatcha
              {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
} 