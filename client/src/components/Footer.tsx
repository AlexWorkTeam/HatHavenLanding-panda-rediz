export default function Footer() {
  return (
    <footer className="bg-black border-t border-gray-800 mt-auto">
      <div className="container mx-auto px-4 py-6 sm:py-8">
        {/* Disclaimer */}
        <div className="text-center mb-4 sm:mb-6">
          <p className="text-xs sm:text-sm text-gray-300 italic">
            Результаты не гарантированы, каждый случай уникален. Консультация не является юридической услугой.
          </p>
        </div>

        {/* Company Info */}
        <div className="text-center mb-3 sm:mb-4">
          <p className="text-xs sm:text-sm text-white mb-1">
            Copyright © 2025 All Rights Reserved
          </p>
          <p className="text-xs sm:text-sm text-gray-300">
            Address: 102 NE 2nd St, Boca Raton, FL 33432
          </p>
        </div>

        {/* Legal Links */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 text-xs sm:text-sm">
          <a 
            href="/privacy-policy" 
            className="text-white hover:underline"
            data-testid="link-privacy-policy"
          >
            Privacy Policy
          </a>
          <span className="text-gray-400">|</span>
          <a 
            href="/terms-of-use" 
            className="text-white hover:underline"
            data-testid="link-terms-of-use"
          >
            Terms of Use
          </a>
          <span className="text-gray-400">|</span>
          <a 
            href="/disclaimer" 
            className="text-white hover:underline"
            data-testid="link-disclaimer"
          >
            Disclaimer
          </a>
        </div>
      </div>
    </footer>
  );
}
