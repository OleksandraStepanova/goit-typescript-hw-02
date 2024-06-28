import { FiSearch } from 'react-icons/fi'
import toast from 'react-hot-toast';
import css from './SearchBar.module.css'
import { FormEvent } from 'react';

type SearchBarProps = {
    onSubmit: (value: string) => void;
}

export default function SearchBar({ onSubmit }:SearchBarProps) {

    const handleSubmit = (e:FormEvent<HTMLFormElement>):void => {
        e.preventDefault();
        const value = e.target.query.value.trim();
        if (!value) {            
            toast.error('Enter your query!');
            return;
        }
        onSubmit(value)
        e.target.reset();
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