import { useState } from 'react';

const LoginPage = () => {
  // 1. State to manage the user's login status. null means logged out.
  const [user, setUser] = useState(null);

  // 2. A function to simulate a user logging in
  const handleLogin = () => {
    // In a real app, this would trigger the Google OAuth flow.
    // For this demo, we'll just set a mock user object in the state.
    setUser({ name: 'Demo User', email: 'demo@xeno.com' });
  };

  // 3. A function to log the user out
  const handleLogout = () => {
    setUser(null);
  };

  // Grouping styles for better readability
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 'calc(100vh - 4rem)',
      backgroundColor: '#f3f4f6', // gray-100
      padding: '2rem',
    },
    card: {
      backgroundColor: '#ffffff',
      padding: '2.5rem',
      borderRadius: '0.5rem',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      textAlign: 'center',
      width: '100%',
      maxWidth: '400px',
    },
    heading: {
      fontSize: '1.875rem',
      fontWeight: '700',
      color: '#1F2937',
      marginBottom: '1.5rem',
    },
    button: {
      backgroundColor: '#2563eb', // bg-primary-600
      color: '#ffffff',
      fontWeight: '600',
      padding: '0.75rem 1.5rem',
      borderRadius: '0.375rem',
      border: 'none',
      cursor: 'pointer',
      fontSize: '1rem',
      boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      transition: 'background-color 0.2s ease-in-out',
    },
    infoText: {
      marginTop: '1rem',
      fontSize: '0.875rem',
      color: '#4B5563'
    }
  };


  // 4. Conditional rendering based on the user's login state
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {user ? (
          // --- LOGGED-IN VIEW ---
          <>
            <h1 style={styles.heading}>Welcome, {user.name}!</h1>
            <p style={styles.infoText}>You have successfully signed in.</p>
            <button
              onClick={handleLogout}
              style={{...styles.button, backgroundColor: '#dc2626', marginTop: '1.5rem' }} // A red color for logout
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#b91c1c'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#dc2626'}
            >
              Logout
            </button>
          </>
        ) : (
          // --- LOGGED-OUT VIEW ---
          <>
            <h1 style={styles.heading}>Login to Xeno</h1>
            <button
              onClick={handleLogin}
              style={styles.button}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1d4ed8'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
            >
              Sign in with Google
            </button>
            <p style={styles.infoText}>You will be redirected to Google to complete the sign-in process.</p>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginPage;