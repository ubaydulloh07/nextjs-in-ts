import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Link href={`/product/${product.id}`} className="product-card-link">
      <div className="product-card">
        <div className="product-image-container">
          <Image
            src={product.thumbnail}
            alt={product.title}
            width={200}
            height={200}
            className="product-image"
          />
        </div>
        <div className="product-info">
          <h3 className="product-title">{product.title}</h3>
          <div className="product-details">
            <div className="product-price">
              <span className="label">Narx:</span> ${product.price}
            </div>
            <div className="product-rating">
              <span className="label">Reyting:</span> ⭐ {product.rating}
            </div>
            <div className="product-brand">
              <span className="label">Brend:</span> {product.brand}
            </div>
            <div className="product-category">
              <span className="label">Kategoriya:</span> {product.category}
            </div>
            <div className="product-description">
              <span className="label">Tavsif:</span> {product.description}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard; 