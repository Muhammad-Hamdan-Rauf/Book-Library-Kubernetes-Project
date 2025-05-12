import React from 'react'
import { Link } from 'react-router-dom'
import { FaBookOpen, FaCalendarAlt, FaUser } from 'react-icons/fa'

const BookCard = ({ book }) => {
  return (
    <div className="card group">
      <div className="relative overflow-hidden">
        <img 
          src={book.coverImage || 'https://via.placeholder.com/300x450?text=No+Cover'} 
          alt={book.title}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-0 right-0 bg-accent-500 text-white px-2 py-1 text-xs font-bold">
          {book.category}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold line-clamp-2 mb-2">{book.title}</h3>
        
        <div className="flex items-center text-sm text-gray-600 mb-2">
          <FaUser className="mr-1" />
          <span>{book.author}</span>
        </div>
        
        <div className="flex items-center text-sm text-gray-600 mb-2">
          <FaCalendarAlt className="mr-1" />
          <span>{new Date(book.publishedDate).getFullYear()}</span>
        </div>
        
        <p className="text-sm text-gray-500 line-clamp-2 mb-4">{book.description}</p>
        
        <div className="flex justify-between items-center mt-auto">
          <span className={`text-sm font-medium ${book.available ? 'text-green-500' : 'text-red-500'}`}>
            {book.available ? 'Available' : 'Borrowed'}
          </span>
          
          <Link to={`/books/${book._id}`} className="btn btn-primary text-sm">
            View Details
          </Link>
        </div>
      </div>
    </div>
  )
}

export default BookCard