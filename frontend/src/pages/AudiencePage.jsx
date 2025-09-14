import { useState, useEffect } from 'react';
import axios from 'axios';
import { PlusIcon } from '@heroicons/react/24/solid';

const AudiencePage = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/customers')
      .then(response => {
        setCustomers(response.data);
      })
      .catch(error => {
        console.error('Error fetching customers:', error);
      });
  }, []);

  const styles = {
    header: { display: 'flex', alignItems: 'center' },
    headerTitle: { flex: '1 1 auto' },
    mainHeading: { fontSize: '1.875rem', fontWeight: '700', color: '#11182c' },
    subHeading: { marginTop: '0.5rem', fontSize: '0.875rem', color: '#374151' },
    buttonContainer: { marginTop: '1rem', marginLeft: '4rem', flex: 'none' },
    button: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '0.375rem',
      border: '1px solid transparent',
      backgroundColor: '#4f46e5', // Assumes 'primary-600' is indigo
      padding: '0.5rem 1rem',
      fontSize: '0.875rem',
      fontWeight: '500',
      color: 'white',
      boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
      cursor: 'pointer',
    },
    plusIcon: { marginLeft: '-0.25rem', marginRight: '0.5rem', height: '1.25rem', width: '1.25rem' },
    tableContainer: { marginTop: '2rem', display: 'flex', flexDirection: 'column' },
    tableWrapper: { overflowX: 'auto', margin: '-0.5rem -1rem' },
    tableInnerWrapper: { display: 'inline-block', minWidth: '100%', padding: '0.5rem 1.5rem', verticalAlign: 'middle' },
    tableShadow: {
      overflow: 'hidden',
      boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
      border: '1px solid rgba(0, 0, 0, 0.05)',
      borderRadius: '0.5rem',
    },
    table: { minWidth: '100%', borderCollapse: 'collapse' },
    thead: { backgroundColor: '#f9fafb' },
    th: {
      padding: '0.875rem 0.75rem',
      textAlign: 'left',
      fontSize: '0.875rem',
      fontWeight: '600',
      color: '#11182c',
    },
    thFirst: { paddingLeft: '1.5rem' },
    tbody: { backgroundColor: 'white' },
    tableRowBorder: { borderTop: '1px solid #e5e7eb' },
    tableCell: { whiteSpace: 'nowrap', padding: '1rem 0.75rem', fontSize: '0.875rem', color: '#6b7280' },
    tableCellFirst: {
      paddingLeft: '1.5rem',
      fontWeight: '500',
      color: '#11182c',
    },
  };

  return (
    <div>
      <div style={styles.header}>
        <div style={styles.headerTitle}>
          <h1 style={styles.mainHeading}>Audience</h1>
          <p style={styles.subHeading}>
            A list of all the customers in your account including their name, email, location, total spends, visits and last visited at.
          </p>
        </div>
        <div style={styles.buttonContainer}>
          <button type="button" style={styles.button}>
            <PlusIcon style={styles.plusIcon} aria-hidden="true" />
            Add customer
          </button>
        </div>
      </div>
      <div style={styles.tableContainer}>
        <div style={styles.tableWrapper}>
          <div style={styles.tableInnerWrapper}>
            <div style={styles.tableShadow}>
              <table style={styles.table}>
                <thead style={styles.thead}>
                  <tr>
                    <th scope="col" style={{...styles.th, ...styles.thFirst}}>Name</th>
                    <th scope="col" style={styles.th}>Email</th>
                    <th scope="col" style={styles.th}>Location</th>
                    <th scope="col" style={styles.th}>Total Spends</th>
                    <th scope="col" style={styles.th}>Visits</th>
                    <th scope="col" style={styles.th}>Last Visited</th>
                  </tr>
                </thead>
                <tbody style={styles.tbody}>
                  {customers.map((customer, index) => (
                    <tr key={customer.id} style={index > 0 ? styles.tableRowBorder : {}}>
                      <td style={{...styles.tableCell, ...styles.tableCellFirst}}>{customer.name}</td>
                      <td style={styles.tableCell}>{customer.email}</td>
                      <td style={styles.tableCell}>{customer.location}</td>
                      <td style={styles.tableCell}>{customer.total_spends}</td>
                      <td style={styles.tableCell}>{customer.visits}</td>
                      <td style={styles.tableCell}>{new Date(customer.last_visited_at).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudiencePage;