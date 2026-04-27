import React from 'react'
import '../css/Pagination.css'

const Pagination = ({ totalPokemons, pokemonPerPage, currentPage, setCurrentPage}) => {
    let pages = [];

    for (let i = 1; i <= Math.ceil(totalPokemons / pokemonPerPage); i++){
       pages.push(i)
    }
  return (
    <div className='pagination-container'>
      {pages.map((page, index) => (
        <button
          key={index}
          onClick={() => setCurrentPage(index + 1)}
          className={currentPage == index+1? 'pagination-button-active' : 'pagination-button'}
        >
          {page}
        </button>
      ))}
    </div>
  )
}

export default Pagination
