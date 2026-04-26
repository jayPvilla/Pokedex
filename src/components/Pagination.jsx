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
          className='pagination-button'
          style={{
            background: currentPage == index+1? 'rgba(4, 107, 190, 0.8)' : 'white',
            color: currentPage == index+1? 'white' : 'black',
            transform: currentPage == index+1? 'scale(1.1)' : 'scale(1)'
        }}>
          {page}
        </button>
      ))}
    </div>
  )
}

export default Pagination
