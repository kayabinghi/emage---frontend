import React, { useEffect, useState, useRef } from 'react';
import TestimonialCard from '../cards/TestimonialCard';

const testimonials = [
  {
    quote: "Working with this team helped me find balance again. Their practical guidance made a real difference.",
    author: 'Wanjiru Mwangi',
    featured: true,
  },
  {
    quote: "I learned tools to manage stress and be kinder to myself. I recommend EMAGE to everyone.",
    author: 'Kevin Ouma',
  },
  {
    quote: "The sessions were warm and easy to follow. I saw change within weeks.",
    author: 'Achieng Odhiambo',
  },
  {
    quote: "Support that feels local and real — thank you for being a safe place.",
    author: 'David Kamau',
  },
];

const TestimonialsSection = () => {
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);
  const delay = 5000; // 5s autoplay

  useEffect(() => {
    // autoplay
    timeoutRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length);
    }, delay);
    return () => clearInterval(timeoutRef.current);
  }, []);

  const prev = () => {
    clearInterval(timeoutRef.current);
    setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);
  };

  const next = () => {
    clearInterval(timeoutRef.current);
    setIndex((i) => (i + 1) % testimonials.length);
  };

  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section id="testimonials" className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <p className="text-emerald-600 font-semibold mb-2">TESTIMONIALS</p>
          <h2 className="text-4xl font-bold text-gray-900">Healing Words — Stories of Change</h2>
        </div>

        <div className="relative">
          <div className="mx-auto max-w-3xl">
            <div className="transition-all duration-500">
              <TestimonialCard
                quote={testimonials[index].quote}
                author={testimonials[index].author}
                featured={testimonials[index].featured}
              />
            </div>
          </div>

          {/* Controls */}
          <button
            aria-label="Previous testimonial"
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white px-3 py-2 rounded-full shadow-md ml-4"
          >
            ‹
          </button>

          <button
            aria-label="Next testimonial"
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white px-3 py-2 rounded-full shadow-md mr-4"
          >
            ›
          </button>

          {/* Dots */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  clearInterval(timeoutRef.current);
                  setIndex(i);
                }}
                aria-label={`Go to testimonial ${i + 1}`}
                className={`w-3 h-3 rounded-full ${i === index ? 'bg-emerald-600' : 'bg-gray-300'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;