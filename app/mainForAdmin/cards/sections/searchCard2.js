// Screen1.js
import React from 'react';
import * as S from './sectionsStyle';
import { FontAwesome } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';


const SearchCard2 = ({ value, onChangeText, onSearch }) =>  {
  const { t } = useTranslation();


  return (
        <S.SearchContainer>

            <S.SearchButton onPress={onSearch}>
              <FontAwesome name="search" size={20} color="#73224B" />

            
              <S.SearchInput
              placeholder={t('nameOfClient')}
              value={value}
              onChangeText={onChangeText}
              />

           
            </S.SearchButton>


       </S.SearchContainer>

    
  );
};


SearchCard2.propTypes = {
    value: PropTypes.string.isRequired,
    onChangeText: PropTypes.func.isRequired,
    onSearch: PropTypes.func.isRequired,
  };

export default SearchCard2;