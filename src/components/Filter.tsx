interface FilterProps {
  onPriceChange: (min: number, max: number) => void;
  onRatingChange: (rating: number) => void;
}

const Filter = ({ onPriceChange, onRatingChange }: FilterProps) => {
  return (
    <div className="filter-container">
      <h3 className="filter-title">Filters</h3>
      
      <div className="filter-group">
        <h4 className="filter-label">Price Range</h4>
        <div className="filter-inputs">
          <input
            type="number"
            placeholder="Min"
            className="filter-input"
            onChange={(e) => onPriceChange(Number(e.target.value), 0)}
          />
          <input
            type="number"
            placeholder="Max"
            className="filter-input"
            onChange={(e) => onPriceChange(0, Number(e.target.value))}
          />
        </div>
      </div>

      <div className="filter-group">
        <h4 className="filter-label">Minimum Rating</h4>
        <select
          className="filter-select"
          onChange={(e) => onRatingChange(Number(e.target.value))}
        >
          <option value="0">Any Rating</option>
          <option value="4">4+ Stars</option>
          <option value="3">3+ Stars</option>
          <option value="2">2+ Stars</option>
          <option value="1">1+ Stars</option>
        </select>
      </div>
    </div>
  );
};

export default Filter; 