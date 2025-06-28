'use client';

import { FileText, Linkedin, Mail, ArrowUp } from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="bg-gray-100  p-4">
      {/* Left - Logo Section */}
      <div className="p-8 flex flex-col gap-4 md:p-12 md:grid md:grid-cols-2 items-center">
        <div className="hidden md:flex gap-2 items-center justify-center">
          <FileText className="w-5 h-5 lg:w-8 lg:h-8 text-gray-900 hover:rotate-12 transform transition duration-200 ease-in-out" />
          <span className="font-extrabold lg:text-xl text-gray-900">
            Summaire
          </span>
        </div>

        {/* Center - Contact Section */}
        <div className="flex gap-4 items-center justify-center">
          <span className="animate-pulse">Contact me</span>

          <Link
            href="https://www.linkedin.com/in/faraaz-ashraf-831796204/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 border border-gray-500 rounded-full cursor-pointer hover:text-blue-400 transition-colors"
          >
            <Linkedin size={20} />
          </Link>

          <a
            href="mailto:farazashraf1523@gmail.com"
            className="p-3 border border-gray-500 rounded-full cursor-pointer hover:text-red-400 transition-colors"
          >
            <Mail size={20} />
          </a>
        </div>
      </div>

      {/* Developed By and Scroll to Top */}
      <div className="flex flex-col items-center justify-center gap-1.5 bg-gray-100">
        <div className="flex items-center gap-2 justify-center">
          <span>Developed by</span>
          <span className="text-muted-foreground">Faraaz Ashraf</span>
        </div>
        <div className="flex items-center justify-center gap-2">
          <p>
            © 2025 <span className="text-muted-foreground">Summaire</span>. All
            Rights reserved
          </p>
          <button
            onClick={scrollToTop}
            className="border border-gray-500 p-2 rounded-full bg-black cursor-pointer hover:bg-gray-800 transition"
          >
            <ArrowUp color="white" size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
