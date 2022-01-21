import { useState } from "react";
import PropTypes from 'prop-types';
import { warnToast } from '../../services/notify';

import { 
    Header,
    SearchForm,
    SearchFormButton,
    SearchFormButtonLabel,
    SearchFormInput
 } from './Searchbar.styled';



export default function Searchbar ({onSubmit}) {
    const [query, setQuery] = useState('');


    const handleQuery = (event) => {
        setQuery(event.currentTarget.value.toLowerCase());
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if(query.trim() === ''){
            warnToast("Go there, I don’t know where, bring that, I don’t know what. Be polite, type something!");     
            return;
        }
        onSubmit(query);
        setQuery('');
    }

        return (      
            <Header>
                <SearchForm onSubmit={handleSubmit}>
                    <SearchFormButton  type="submit">
                        <SearchFormButtonLabel>Search</SearchFormButtonLabel>
                    </SearchFormButton>
                    <SearchFormInput
                        type="text"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                        value={query}
                        onChange={handleQuery}
                    />
                </SearchForm>
            </Header>
        )
}

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};


