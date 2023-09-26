import { useState } from 'react';
import StyledSearchComponent from './StyledSearchComponent';

type SearchComponentProps = {
  onSearch: (value: string) => void;
};

const SearchComponent: React.FC<SearchComponentProps> = ({ onSearch }: SearchComponentProps) => {
  const [searchValue, setSearchValue] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.trim();
    setSearchValue(value);
    onSearch(value);
  };

  return (
    <StyledSearchComponent>
      <input
        type="search"
        className="serch-input"
        placeholder="Search"
        value={searchValue}
        onChange={handleChange}
      />
    </StyledSearchComponent>
  );
};

export default SearchComponent;
