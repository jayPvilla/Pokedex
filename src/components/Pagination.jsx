import React from 'react'
import '../css/Pagination.css'

const Pagination = ({ totalPokemons, pokemonPerPage, setCurrentPage}) => {
    let pages = [];

    for (let i = 1; i <= Math.ceil(totalPokemons / pokemonPerPage); i++){
        pages.push(i)
    }
  return (
    <div className='pagination-container'>
      {pages.map((page, index) => (
        <button key={index} onClick={() => setCurrentPage(index)} className='pagination-button'>{page}</button>
      ))}
    </div>
  )
}

export default Pagination
