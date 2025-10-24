import React from 'react';
import { ChevronDown } from 'lucide-react';

const FAQItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <button
        className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition"
        onClick={onClick}
      >
        <span className="font-semibold text-gray-900">{question}</span>
        <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="px-6 pb-5 text-gray-600">
          {answer}
        </div>
      )}
    </div>
  );
};

export default FAQItem;