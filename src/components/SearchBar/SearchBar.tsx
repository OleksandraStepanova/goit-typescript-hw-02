import { FiSearch } from 'react-icons/fi'
import toast from 'react-hot-toast';
import css from './SearchBar.module.css'
import { FormEvent } from 'react';

type SearchBarProps = {
    onSubmit: (value: string) => void;
}

export default function SearchBar({ onSubmit }: SearchBarProps) {
      const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();    

        const formData = new FormData(e.currentTarget); 
        const value = formData.get('query') as string;      
        
        if (!value.trim()) {            
            toast.error('Enter your query!');
            return;
        }
        onSubmit(value.trim());       
    }



    return (
        <header className={css.header}>
            <form className={css.form} onSubmit={handleSubmit}>
                <input
                    className={css.input}
                    name='query'
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                />
                <button className={css.btn} type="submit"> <FiSearch size="16px" /></button>
            </form>
        </header>
    )
}