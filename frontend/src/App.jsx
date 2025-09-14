import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SegmentBuilderPage from './pages/SegmentBuilderPage';
import CampaignHistoryPage from './pages/CampaignHistoryPage';
import DashboardPage from './pages/DashboardPage';
import AudiencePage from './pages/AudiencePage';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/segments" element={<SegmentBuilderPage />} />
          <Route path="/campaigns" element={<CampaignHistoryPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/audience" element={<AudiencePage />} />
          <Route path="/" element={<DashboardPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;