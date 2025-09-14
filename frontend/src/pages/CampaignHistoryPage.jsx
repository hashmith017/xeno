import { useState } from 'react';
import { PlusIcon } from '@heroicons/react/24/solid';

const CampaignHistoryPage = () => {
  const [campaigns, setCampaigns] = useState([
    { id: 1, name: 'Black Friday Deals', audience_size: 1200, status: 'SENT', created_at: '2025-09-12', sent_by: 'John Doe' },
    { id: 2, name: 'Cyber Monday Flash Sale', audience_size: 2500, status: 'SENT', created_at: '2025-09-10', sent_by: 'Jane Smith' },
    { id: 3, name: 'Christmas Countdown', audience_size: 5000, status: 'DRAFT', created_at: '2025-09-08', sent_by: 'Peter Jones' },
    { id: 4, name: 'New Year, New You', audience_size: 3000, status: 'SENT', created_at: '2025-09-05', sent_by: 'John Doe' },
    { id: 5, name: 'Valentines Day Special', audience_size: 1800, status: 'FAILED', created_at: '2025-09-02', sent_by: 'Jane Smith' },
    { id: 6, name: 'Summer Kick-off', audience_size: 4500, status: 'SENT', created_at: '2025-08-28', sent_by: 'Peter Jones' },
    { id: 7, name: 'Back to School Promo', audience_size: 2200, status: 'SENT', created_at: '2025-08-25', sent_by: 'John Doe' },
    { id: 8, name: 'Halloween Spooktacular', audience_size: 3200, status: 'DRAFT', created_at: '2025-08-20', sent_by: 'Jane Smith' },
    { id: 9, name: 'Thanksgiving Gratitude', audience_size: 1500, status: 'SENT', created_at: '2025-08-15', sent_by: 'Peter Jones' },
    { id: 10, name: 'End of Season Clearance', audience_size: 6000, status: 'SENT', created_at: '2025-08-10', sent_by: 'John Doe' },
  ]);

  // Dynamic styles for the status badges
  const statusStyles = {
    SENT: { backgroundColor: '#dcfce7', color: '#166534' },
    DRAFT: { backgroundColor: '#fef9c3', color: '#854d0e' },
    FAILED: { backgroundColor: '#fee2e2', color: '#991b1b' },
  };

  // Static styles object for readability
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
      backgroundColor: '#4f46e5', // Equivalent to 'bg-primary-600' (indigo)
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
    tableInnerWrapper: { display: 'inline-block', minWidth: '100%', padding: '0.5rem 0', verticalAlign: 'middle' },
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
    thFirst: { paddingLeft: '1.5rem' }, // sm:pl-6
    tbody: { backgroundColor: 'white' },
    tableRowBorder: { borderTop: '1px solid #e5e7eb' },
    tableCell: { whiteSpace: 'nowrap', padding: '1rem 0.75rem', fontSize: '0.875rem', color: '#6b7280' },
    tableCellFirst: {
      paddingLeft: '1.5rem', // sm:pl-6
      fontWeight: '500',
      color: '#11182c',
    },
    statusBadgeBase: {
      display: 'inline-flex',
      alignItems: 'center',
      padding: '0.125rem 0.625rem',
      borderRadius: '9999px',
      fontSize: '0.75rem',
      fontWeight: '500',
    },
  };

  return (
    <div>
      <div style={styles.header}>
        <div style={styles.headerTitle}>
          <h1 style={styles.mainHeading}>Campaign History</h1>
          <p style={styles.subHeading}>
            A list of all the campaigns that have been sent, are in draft, or have failed.
          </p>
        </div>
        <div style={styles.buttonContainer}>
          <button type="button" style={styles.button}>
            <PlusIcon style={styles.plusIcon} aria-hidden="true" />
            New campaign
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
                    <th scope="col" style={{...styles.th, ...styles.thFirst}}>Campaign Name</th>
                    <th scope="col" style={styles.th}>Audience Size</th>
                    <th scope="col" style={styles.th}>Status</th>
                    <th scope="col" style={styles.th}>Created At</th>
                    <th scope="col" style={styles.th}>Sent By</th>
                  </tr>
                </thead>
                <tbody style={styles.tbody}>
                  {campaigns.map((campaign, index) => (
                    <tr key={campaign.id} style={index > 0 ? styles.tableRowBorder : {}}>
                      <td style={{...styles.tableCell, ...styles.tableCellFirst}}>{campaign.name}</td>
                      <td style={styles.tableCell}>{campaign.audience_size.toLocaleString()}</td>
                      <td style={styles.tableCell}>
                        <span style={{ ...styles.statusBadgeBase, ...statusStyles[campaign.status] }}>
                          {campaign.status}
                        </span>
                      </td>
                      <td style={styles.tableCell}>{campaign.created_at}</td>
                      <td style={styles.tableCell}>{campaign.sent_by}</td>
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

export default CampaignHistoryPage;