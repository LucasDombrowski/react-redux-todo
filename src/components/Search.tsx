import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { searchProducts, Product } from '../store/productSlice';
import { useNavigate } from 'react-router-dom';
import Select, { SingleValue } from 'react-select';
import { Search as SearchIcon } from 'lucide-react';

interface OptionType {
  value: number;
  label: string;
}

export default function Search({ className }: { className?: string }) {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { searchItems, isSearchLoading } = useSelector((state: RootState) => state.product);
    const [inputValue, setInputValue] = useState('');
  
    const options: OptionType[] = searchItems.map((product: Product) => ({
      value: product.id,
      label: product.title,
    }));
  
    const handleChange = (selectedOption: SingleValue<OptionType>) => {
      if (selectedOption) {
        navigate(`/products/${selectedOption.value}`);
      }
    };
  
    const handleInputChange = (value: string) => {
      setInputValue(value);
      dispatch(searchProducts(value));
    };
  
    return (
      <div className={`relative w-full max-w-xs lg:max-w-sm ${className}`}>
        <div className="flex items-center bg-white border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-blue-500">
          <SearchIcon className="w-5 h-5 text-gray-500 mr-2" />
          <Select
            className='w-full'
            inputValue={inputValue}
            onInputChange={handleInputChange}
            onChange={handleChange}
            options={options}
            isLoading={isSearchLoading}
            placeholder="Rechercher un produit..."
            noOptionsMessage={() => 'Aucun produit trouvé'}
            loadingMessage={() => 'Chargement...'}
            classNamePrefix="react-select"
            styles={{
              control: (provided) => ({
                ...provided,
                minHeight: 'unset',
                border: 'none',
                boxShadow: 'none',
                background: 'transparent',
                display: 'flex',
                alignItems: 'center',
                flexGrow: 1,
              }),
              valueContainer: (provided) => ({
                ...provided,
                padding: 0,
                width: '100%',
              }),
              input: (provided) => ({
                ...provided,
                margin: 0,
                padding: 0,
              }),
              dropdownIndicator: () => ({
                display: 'none',
              }),
              indicatorSeparator: () => ({
                display: 'none',
              }),
              menu: (provided) => ({
                ...provided,
                width: '100%', // Assure que le menu a la même largeur que le champ
                minWidth: '100%',
              }),
            }}
          />
        </div>
      </div>
    );
  }
  
  
