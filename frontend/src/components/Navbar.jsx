import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const baseLinkStyle = {
    paddingLeft: '0.75rem', // px-3
    paddingRight: '0.75rem', // px-3
    paddingTop: '0.5rem', // py-2
    paddingBottom: '0.5rem', // py-2
    borderRadius: '0.375rem', // rounded-md
    fontSize: '0.875rem', // text-sm
    fontWeight: '500', // font-medium
    textDecoration: 'none',
    transition: 'background-color 0.3s ease, color 0.3s ease',
  };

  const activeLinkStyle = {
    backgroundColor: '#1d4ed8', // bg-primary-700
    color: '#ffffff', // text-white
  };

  const inactiveLinkStyle = {
    color: '#d1d5db', // text-gray-300
    backgroundColor: 'transparent',
  };

  return (
    <nav style={{ backgroundColor: '#1e3a8a', color: '#ffffff', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}> {/* bg-primary-900 text-white shadow-md */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', paddingLeft: '1rem', paddingRight: '1rem' }}> {/* max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '4rem' }}> {/* flex items-center justify-between h-16 */}
          <div style={{ display: 'flex', alignItems: 'center' }}> {/* flex items-center */}
            <NavLink to="/dashboard" style={{ fontSize: '1.5rem', fontWeight: '700', color: '#ffffff', textDecoration: 'none' }}>Xeno</NavLink> {/* text-2xl font-bold text-white */}
          </div>
          <div style={{ display: 'block' }}> {/* hidden md:block */}
            <div style={{ marginLeft: '2.5rem', display: 'flex', alignItems: 'baseline', gap: '1rem' }}> {/* ml-10 flex items-baseline space-x-4 */}
              <NavLink to="/dashboard" style={({ isActive }) => ({ ...baseLinkStyle, ...(isActive ? activeLinkStyle : inactiveLinkStyle), ...(isActive ? {} : { ':hover': { backgroundColor: '#1e40af', color: '#ffffff' } }) })}>Dashboard</NavLink>
              <NavLink to="/audience" style={({ isActive }) => ({ ...baseLinkStyle, ...(isActive ? activeLinkStyle : inactiveLinkStyle), ...(isActive ? {} : { ':hover': { backgroundColor: '#1e40af', color: '#ffffff' } }) })}>Audience</NavLink>
              <NavLink to="/segments" style={({ isActive }) => ({ ...baseLinkStyle, ...(isActive ? activeLinkStyle : inactiveLinkStyle), ...(isActive ? {} : { ':hover': { backgroundColor: '#1e40af', color: '#ffffff' } }) })}>Segment Builder</NavLink>
              <NavLink to="/campaigns" style={({ isActive }) => ({ ...baseLinkStyle, ...(isActive ? activeLinkStyle : inactiveLinkStyle), ...(isActive ? {} : { ':hover': { backgroundColor: '#1e40af', color: '#ffffff' } }) })}>Campaign History</NavLink>
              <NavLink to="/login" style={({ isActive }) => ({ ...baseLinkStyle, ...(isActive ? activeLinkStyle : inactiveLinkStyle), ...(isActive ? {} : { ':hover': { backgroundColor: '#1e40af', color: '#ffffff' } }) })}>Login</NavLink>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;