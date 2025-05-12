import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getBooks, getCategories } from '../api/bookService'
import BookCard from '../components/BookCard'
import { FaSearch, FaSpinner } from 'react-icons/fa'

const Home = () => {
  const [featuredBooks, setFeaturedBooks] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        // Get featured books (most recent)
        const booksData = await getBooks({ limit: 6 })
        setFeaturedBooks(booksData.books || [])
        
        // Get categories
        const categoriesData = await getCategories()
        setCategories(categoriesData || [])
      } catch (err) {
        console.error('Error fetching data:', err)
        setError('Failed to load data. Please try again later.')
      } finally {
        setLoading(false)
      }
    }
    
    fetchData()
  }, [])
  
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-6">Welcome to BookLibrary</h1>
            <p className="text-xl mb-8">
              Discover and manage your books with our modern library management system
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                to="/books" 
                className="btn bg-white text-primary-700 hover:bg-gray-100"
              >
                Browse Books
              </Link>
              <Link 
                to="/register" 
                className="btn bg-accent-500 text-white hover:bg-accent-600"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Books */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">Featured Books</h2>
            <p className="mt-2 text-lg text-gray-600">Explore our latest collection</p>
          </div>
          
          {loading ? (
            <div className="flex justify-center">
              <FaSpinner className="animate-spin h-8 w-8 text-primary-500" />
            </div>
          ) : error ? (
            <div className="text-center text-red-500">{error}</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredBooks.map(book => (
                <BookCard key={book._id} book={book} />
              ))}
            </div>
          )}
          
          <div className="text-center mt-10">
            <Link 
              to="/books" 
              className="btn btn-primary"
            >
              View All Books
            </Link>
          </div>
        </div>
      </section>
      
      {/* Categories */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">Browse by Category</h2>
            <p className="mt-2 text-lg text-gray-600">Find books in your favorite genre</p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {categories.map(category => (
              <Link 
                key={category._id} 
                to={`/books?category=${category.name}`}
                className="bg-gray-100 hover:bg-primary-50 hover:border-primary-500 border-2 border-transparent rounded-lg p-4 text-center transition duration-300"
              >
                <div className="text-primary-500 text-xl mb-2">{category.icon || '📚'}</div>
                <h3 className="font-medium text-gray-900">{category.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{category.count || 0} books</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Search Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold">Looking for something specific?</h2>
            <p className="mt-2 text-lg text-gray-300">Search our extensive collection of books</p>
          </div>
          
          <div className="max-w-xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for books, authors, or genres..."
                className="w-full py-3 px-4 pl-12 rounded-full bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
            </div>
            
            <div className="text-center mt-4">
              <Link 
                to="/books" 
                className="text-primary-300 hover:text-primary-200 font-medium"
              >
                Advanced Search Options
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home