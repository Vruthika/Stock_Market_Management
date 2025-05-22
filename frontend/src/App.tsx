import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import DashboardLayout from './components/DashboardLayout';
import { Sidebar } from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import { TradingPage } from './pages/TradingPage';
import { SocialTradingPage } from './pages/SocialTradingPage';
import { ChatPage } from './pages/ChatPage';
import { ProfilePage } from './pages/ProfilePage';
import { WatchlistPage } from './pages/WatchlistPage';
import { PortfolioPage } from './pages/PortfolioPage';
import { MarketAnalysisPage } from './components/MarketPage';
import NewsResearchPage from './components/News';
import { OrdersPage } from './components/Orders';
import { NotificationsPage } from './pages/Notifications';
import { SettingsPage } from './components/Settings';
import { Course } from './components/Course';
import { CourseDetails } from './components/CourseDetails';
import Sign from './pages/Sign';
import SignUp from './pages/SignUp';
import Landing from './pages/Landing';
import ChatBot from './pages/ChatBot';
import Footer from './components/Footer';
import { LearningPage } from './pages/Learning';

function App() {
  return (
    <Router>
      <Header />

      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<Landing />} />
        <Route path="/sign-in" element={<Sign />} />
        <Route path="/sign-up" element={<SignUp />} />

        {/* Authenticated Layout with Sidebar and Nested Routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="trading" element={<TradingPage />} />
          <Route path="social" element={<SocialTradingPage />} />
          <Route path="chat" element={<ChatPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="portfolio" element={<PortfolioPage />} />
          <Route path="market-analysis" element={<MarketAnalysisPage />} />
          <Route path="learning" element={<LearningPage />} />
          <Route path="learning/courses" element={<Course />} />
          <Route path="learning/courses/:courseId" element={<CourseDetails />} />
          <Route path="news" element={<NewsResearchPage />} />
          <Route path="orders" element={<OrdersPage />} />
          <Route path="watchlist" element={<WatchlistPage />} />
          <Route path="notifications" element={<NotificationsPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Routes>

      <ChatBot />
      <Footer />
    </Router>
  );
}

export default App;
