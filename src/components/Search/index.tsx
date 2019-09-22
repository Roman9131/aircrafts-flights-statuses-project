import * as React from 'react';

import './styles.sass';

interface ISearchProps {
  value: string;
  placeholder: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Search = ({ value, onChange, placeholder }: ISearchProps) => (
  <div className="search">
    <div className="search-wrapper">
      <input type="text" value={value} placeholder={placeholder} onChange={onChange} />
    </div>
  </div>
);

export default Search;
