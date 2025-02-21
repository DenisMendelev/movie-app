import React from 'react';
import { Input } from 'antd';
import { debounce } from 'lodash';

const SearchInput = ({ onSearch }) => {
  const handleSearch = debounce((value) => {
    onSearch(value);
  }, 300);

  const onChange = (e) => {
    handleSearch(e.target.value);
  };

  return (
    <Input.Search
      placeholder="Type to search..."
      onChange={onChange}
      style={{ width: '100%', borderRadius: 8, maxWidth: '1010px' }}
      size="large"
    />
  );
};

export default SearchInput;
