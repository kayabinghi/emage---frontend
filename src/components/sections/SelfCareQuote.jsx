import React from 'react';
import { useState, useEffect } from 'react';

const SelfCareQuote = () => {
  const [quote, setQuote] = useState(null);
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  
  useEffect(() => {
  fetch('https://api.allorigins.win/raw?url=http://api.forismatic.com/api/1.0/?method=getQuote%26format=json%26lang=en')
    .then(res => res.json())
    .then(data => {
      setQuote(data.quoteText);
      setAuthor(data.quoteAuthor);
    })
    .catch(err => console.error('Error fetching quote:', err));
}, []);

  if (!quote) return (
    <section id="selfcare" className="py-20 px-6 bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-xl text-gray-400">Loading quote...</p>
      </div>
    </section>
  );

  return (
    <section id="selfcare" className="py-20 px-6 bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto text-center">
        <blockquote className="text-3xl md:text-4xl font-light leading-relaxed">
          <p className="mb-4">"{quote.q}"</p>
          <footer className="text-xl text-gray-400">— {quote.a}</footer>      
        </blockquote>
      </div>
    </section>
  );
}; 

export default SelfCareQuote;