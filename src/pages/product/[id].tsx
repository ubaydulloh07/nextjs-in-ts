import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import { GetServerSideProps } from 'next';
import { Product } from '@/types/product';

interface ProductDetailProps {
  product: Product;
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  try {
    const response = await fetch(`https://dummyjson.com/products/${params?.id}`);
    const product = await response.json();

    return {
      props: {
        product,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

export default function ProductDetail({ product }: ProductDetailProps) {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState(product.thumbnail);

  if (router.isFallback) {
    return <div>Yuklanmoqda...</div>;
  }

  return (
    <div className="product-detail-container">
      <button onClick={() => router.back()} className="back-button">
        ← Orqaga
      </button>

      <div className="product-detail">
        <div className="product-detail-grid">
          <div className="product-detail-images">
            <div className="main-image-container">
              <Image
                src={selectedImage}
                alt={product.title}
                fill
                className="main-image"
              />
            </div>
            <div className="thumbnail-grid">
              {[product.thumbnail, ...product.images].map((image, index) => (
                <div
                  key={index}
                  className={`thumbnail-container ${selectedImage === image ? 'active' : ''}`}
                  onClick={() => setSelectedImage(image)}
                >
                  <Image
                    src={image}
                    alt={`${product.title} - ${index + 1}`}
                    fill
                    className="thumbnail-image"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="product-detail-info">
            <h1 className="detail-title">{product.title}</h1>
            <div className="detail-price">${product.price}</div>
            <div className="detail-rating">
              <span className="detail-label">Reyting:</span>
              <span>⭐ {product.rating}</span>
            </div>
            <p className="detail-description">{product.description}</p>
            <div className="detail-meta">
              <div className="detail-meta-item">
                <span className="detail-label">Brend:</span>
                <span className="detail-value">{product.brand}</span>
              </div>
              <div className="detail-meta-item">
                <span className="detail-label">Kategoriya:</span>
                <span className="detail-value">{product.category}</span>
              </div>
              <div className="detail-meta-item">
                <span className="detail-label">Chegirma:</span>
                <span className="detail-value">{product.discountPercentage}%</span>
              </div>
              <div className="detail-meta-item">
                <span className="detail-label">Qolgan soni:</span>
                <span className="detail-value">{product.stock}</span>
              </div>
            </div>
            <button className="buy-button">
              Savatchaga qo'shish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 