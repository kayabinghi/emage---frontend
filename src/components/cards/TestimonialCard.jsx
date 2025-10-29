import React from 'react';
import Avatar from 'boring-avatars';

const TestimonialCard = ({ quote, author, featured = false }) => {
  return (
    <div className={`p-8 rounded-2xl ${featured ? 'bg-emerald-600 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="mb-6">
        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
          <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"/>
        </svg>
      </div>
      <p className={`text-lg mb-6 ${featured ? 'text-white' : 'text-gray-700'}`}>{quote}</p>

      <div className="flex items-center gap-4 mt-4">
        <Avatar
          size={48}
          name={author}
          variant="beam"
          colors={featured ? ['#bbf7d0', '#86efac', '#16a34a', '#059669', '#064e3b'] : ['#d1fae5', '#86efac', '#34d399', '#10b981', '#065f46']}
        />
        <p className={`font-semibold ${featured ? 'text-emerald-100' : 'text-gray-900'}`}>- {author}</p>
      </div>
    </div>
  );
};

export default TestimonialCard;