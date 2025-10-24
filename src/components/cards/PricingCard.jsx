import React from 'react';
import { CheckCircle } from 'lucide-react';

const PricingCard = ({ title, price, period, description, variant = 'default' }) => {
  const isMuted = variant === 'muted';
  const isFeatured = variant === 'featured';

  const containerClasses = [
    'rounded-2xl p-6 flex items-center justify-between transition',
    isMuted ? 'bg-gray-100 border border-gray-200 text-gray-700' : '',
    isFeatured ? 'bg-emerald-600 text-white border border-emerald-600' : 'border-2 border-gray-200 hover:border-emerald-600',
  ].join(' ');

  return (
    <div className={containerClasses}>
      <div className="flex items-center space-x-4">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${isFeatured ? 'bg-white/10' : 'border-2 border-gray-300'}`}>
          <CheckCircle className={`w-6 h-6 ${isFeatured ? 'text-white' : 'text-green-400'}`} />
        </div>
        <div>
          <h3 className={`text-xl font-bold ${isFeatured ? 'text-white' : 'text-gray-900'}`}>{title}</h3>
          <p className={`${isFeatured ? 'text-emerald-100' : 'text-gray-600'} text-sm`}>{description}</p>
        </div>
      </div>
      <div className="text-right">
        <div className="flex items-baseline">
          <span className={`text-3xl font-bold ${isFeatured ? 'text-white' : 'text-gray-900'}`}>{price}</span>
          <span className={`${isFeatured ? 'text-emerald-100' : 'text-gray-600'} ml-1`}>{period}</span>
        </div>
      </div>
    </div>
  );
};

export default PricingCard;