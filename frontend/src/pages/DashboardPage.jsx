import React from 'react';
import { ArrowUpIcon, UsersIcon, CurrencyDollarIcon, EnvelopeOpenIcon } from '@heroicons/react/24/outline';

const DashboardPage = () => {
  const stats = [
    { name: 'Total Campaigns', stat: '25', icon: EnvelopeOpenIcon, change: '12%', changeType: 'increase' },
    { name: 'Total Customers', stat: '15,234', icon: UsersIcon, change: '3.2%', changeType: 'increase' },
    { name: 'Total Revenue', stat: '$75,432', icon: CurrencyDollarIcon, change: '8.1%', changeType: 'increase' },
    { name: 'Avg. Open Rate', stat: '25.4%', icon: ArrowUpIcon, change: '1.8%', changeType: 'decrease' },
  ];

  const getChangeStyle = (changeType) => {
    const baseStyle = {
      marginLeft: '0.5rem', // ml-2
      display: 'flex',
      alignItems: 'baseline',
      fontSize: '0.875rem', // text-sm
      fontWeight: '600', // font-semibold
    };
    if (changeType === 'increase') {
      return { ...baseStyle, color: '#16a34a' }; // text-green-600
    } else {
      return { ...baseStyle, color: '#dc2626' }; // text-red-600
    }
  };

  const getIconStyle = (changeType) => {
    const baseStyle = {
      alignSelf: 'center',
      flexShrink: 0,
      height: '1.25rem', // h-5
      width: '1.25rem', // w-5
    };
    if (changeType === 'increase') {
      return { ...baseStyle, color: '#22c55e' }; // text-green-500
    } else {
      return { ...baseStyle, color: '#ef4444' }; // text-red-500
    }
  };

  return (
    <div style={{ paddingLeft: '1rem', paddingRight: '1rem', paddingTop: '2rem', paddingBottom: '2rem' }}> {/* container mx-auto px-4 sm:px-6 lg:px-8 py-8 */}
      <h1 style={{ fontSize: '1.875rem', fontWeight: '700', color: '#1F2937', marginBottom: '1.5rem' }}>Dashboard</h1> {/* text-3xl font-bold text-gray-900 */}
      <div style={{ marginTop: '1.5rem' }}> {/* mt-6 */}
        <dl style={{ display: 'grid', gridTemplateColumns: 'repeat(1, minmax(0, 1fr))', gap: '1.25rem' }}> {/* grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 */}
          {stats.map((item) => (
            <div key={item.name} style={{ position: 'relative', backgroundColor: '#ffffff', paddingTop: '1.25rem', paddingLeft: '1rem', paddingRight: '1rem', paddingBottom: '3rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)', borderRadius: '0.5rem', overflow: 'hidden' }}> {/* relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden */} 
              <dt>
                <div style={{ position: 'absolute', backgroundColor: '#3b82f6', borderRadius: '0.375rem', padding: '0.75rem' }}> {/* absolute bg-primary-500 rounded-md p-3 */} 
                  <item.icon style={{ height: '1.5rem', width: '1.5rem', color: '#ffffff' }} aria-hidden="true" /> {/* h-6 w-6 text-white */} 
                </div>
                <p style={{ marginLeft: '4rem', fontSize: '0.875rem', fontWeight: '500', color: '#6b7280', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.name}</p> {/* ml-16 text-sm font-medium text-gray-500 truncate */} 
              </dt>
              <dd style={{ marginLeft: '4rem', paddingBottom: '1.5rem', display: 'flex', alignItems: 'baseline' }}> {/* ml-16 pb-6 flex items-baseline sm:pb-7 */} 
                <p style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1F2937' }}>{item.stat}</p> {/* text-2xl font-semibold text-gray-900 */} 
                <p style={getChangeStyle(item.changeType)}>
                  {item.changeType === 'increase' ? (
                    <ArrowUpIcon style={getIconStyle(item.changeType)} aria-hidden="true" />
                  ) : (
                    <ArrowUpIcon style={{ ...getIconStyle(item.changeType), transform: 'rotate(180deg)' }} aria-hidden="true" />
                  )}
                  <span style={{ screenReaderOnly: true }}>{item.changeType === 'increase' ? 'Increased' : 'Decreased'} by</span>
                  {item.change}
                </p>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
};

export default DashboardPage;