import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { MdOutlineAddBox } from 'react-icons/md';
import BooksTable from '../components/home/BooksTable';
import BooksCard from '../components/home/BooksCard';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState('table');

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5555/books')
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className='container mx-auto p-8 bg-gray-100 rounded-lg shadow-md'>
      <div className='flex justify-end space-x-4 mb-4'>
        <button
          className={`${
            showType === 'table' ? 'bg-teal-600' : 'bg-teal-400'
          } hover:bg-teal-700 text-white px-6 py-2 rounded-full transition-all focus:outline-none`}
          onClick={() => setShowType('table')}
        >
          Table View
        </button>
        <button
          className={`${
            showType === 'card' ? 'bg-teal-600' : 'bg-teal-400'
          } hover:bg-teal-700 text-white px-6 py-2 rounded-full transition-all focus:outline-none`}
          onClick={() => setShowType('card')}
        >
          Card View
        </button>
      </div>
      <div className='flex justify-between items-center mb-8'>
        <h1 className='text-4xl font-bold text-teal-800'>book worm~</h1>
        <Link to='/books/create'>
          <MdOutlineAddBox className='text-teal-800 text-4xl' />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : showType === 'table' ? (
        <BooksTable books={books} />
      ) : (
        <BooksCard books={books} />
      )}
    </div>
  );
};

export default Home;



