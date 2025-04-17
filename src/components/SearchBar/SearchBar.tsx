import { useState, ChangeEvent, FormEvent, FC } from 'react';
import css from './SearchBar.module.css';
import toast from 'react-hot-toast';
import { SearchBarProps } from './SearchBar.types';

const SearchBar: FC<SearchBarProps> = ({ setQuery }: SearchBarProps) => {
  const [inputValue, setInputValue] = useState<string>(""); 

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const newValue: string = event.target.value;
    setInputValue(newValue); 
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    if (inputValue.trim() === "") {
      toast.error("Порожне поле пошуку!");
      return;
    }

    const trimmedQuery: string = inputValue.trim();
    setQuery(trimmedQuery); 
  };

  return (
    <header className={css.searchbar}>
      <form className={css.form} onSubmit={onSubmit}>
        <input
          className={css.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images..."
          value={inputValue}
          onChange={handleChange}
        />
        <button type="submit" className={css.button}>Search</button>
      </form>
    </header>
  );
};

export default SearchBar;