import React from 'react';

const TestimonialCard = ({ quote, author, featured = false }) => {
  return (
    <div className={`p-8 rounded-2xl ${featured ? 'bg-emerald-600 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="mb-6">
        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
          <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"/>
        </svg>
      </div>
      <p className={`text-lg mb-6 ${featured ? 'text-white' : 'text-gray-700'}`}>{quote}</p>
      <p className={`font-semibold ${featured ? 'text-emerald-100' : 'text-gray-900'}`}>- {author}</p>
    </div>
  );
};

export default TestimonialCard;