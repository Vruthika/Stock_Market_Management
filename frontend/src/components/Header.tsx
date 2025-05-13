import { useEffect, useState } from 'react';
import { Bell, User, LineChart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [hasNotification, setHasNotification] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate loading delay
    setTimeout(() => setIsLoading(false), 1000);

    // Check if user is authenticated
    const token = localStorage.getItem('authToken');
    const isLoggedIn = !!token;
    setIsAuthenticated(isLoggedIn);
    setHasNotification(!isLoggedIn); // No notification if user is logged in

    // Handle scroll effect
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
    navigate('/sign-in');
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all border-b border-gray-700 ${
        isScrolled ? 'backdrop-blur-md bg-gray-800 bg-opacity-80' : 'bg-gray-800'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center space-x-2 px-4 py-3">
            <LineChart className="h-8 w-8 text-indigo-500" />
            <div className="text-white text-xl font-bold">SVS Textiles</div>
          </div>

          {/* Right-side Actions */}
          <div className="flex items-center space-x-4">
            {/* Notification Bell */}
            {isLoading ? (
              <div className="w-10 h-10 bg-gray-700 animate-pulse rounded-md"></div>
            ) : (
              <button className="relative p-2 text-gray-400 hover:text-gray-300">
                <Bell className="h-6 w-6" />
                {hasNotification && (
                  <>
                    <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full animate-ping" />
                    <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full" />
                  </>
                )}
              </button>
            )}

            {/* User Icon */}
            {isLoading ? (
              <div className="w-10 h-10 bg-gray-700 animate-pulse rounded-md"></div>
            ) : (
              <button className="p-2 text-gray-400 hover:text-gray-300">
                <User className="h-6 w-6" />
              </button>
            )}

            {/* Sign In / Sign Out Button */}
            {isLoading ? (
              <div className="w-20 h-10 bg-gray-700 animate-pulse rounded-md"></div>
            ) : isAuthenticated ? (
              <button
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                onClick={handleSignOut}
              >
                Sign Out
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
