import { useState, useEffect } from 'react';
import axios from 'axios';

const SegmentBuilderPage = () => {
  const [rules, setRules] = useState([{ field: 'total_spends', operator: '>', value: '' }]);
  const [logic, setLogic] = useState('AND');
  const [audienceSize, setAudienceSize] = useState(null);
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [objective, setObjective] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/customers')
      .then(response => {
        setCustomers(response.data);
      })
      .catch(error => {
        console.error('Error fetching customers:', error);
      });
  }, []);

  // ... (component logic remains the same)

  const handleRuleChange = (index, field, value) => {
    const newRules = [...rules];
    newRules[index][field] = value;
    setRules(newRules);
  };

  const addRule = () => {
    setRules([...rules, { field: 'total_spends', operator: '>', value: '' }]);
  };

  const checkAudience = () => {
    let filtered = customers;
    if (logic === 'AND') {
      filtered = customers.filter(customer =>
        rules.every(rule => {
          const customerValue = customer[rule.field];
          let ruleValue = rule.value;
          if (rule.field === 'total_spends' || rule.field === 'visits') {
            ruleValue = parseInt(rule.value, 10);
            if (isNaN(ruleValue)) return false;
          }
          if (rule.field === 'last_visited_at') {
            return new Date(customerValue) > new Date(ruleValue);
          }
          switch (rule.operator) {
            case '>': return customerValue > ruleValue;
            case '<': return customerValue < ruleValue;
            case '=': return customerValue == ruleValue;
            default: return false;
          }
        })
      );
    } else { // OR logic
      filtered = customers.filter(customer =>
        rules.some(rule => {
          const customerValue = customer[rule.field];
          let ruleValue = rule.value;
          if (rule.field === 'total_spends' || rule.field === 'visits') {
            ruleValue = parseInt(rule.value, 10);
            if (isNaN(ruleValue)) return false;
          }
          if (rule.field === 'last_visited_at') {
            return new Date(customerValue) > new Date(ruleValue);
          }
          switch (rule.operator) {
            case '>': return customerValue > ruleValue;
            case '<': return customerValue < ruleValue;
            case '=': return customerValue == ruleValue;
            default: return false;
          }
        })
      );
    }
    setAudienceSize(filtered.length);
    setFilteredCustomers(filtered);
  };

  const getSuggestions = () => {
    axios.post('http://localhost:3001/api/suggest-messages', { objective })
      .then(response => {
        setSuggestions(response.data.suggestions);
      })
      .catch(error => {
        console.error('Error getting suggestions:', error);
      });
  };

  const styles = {
    container: { maxWidth: '1280px', marginLeft: 'auto', marginRight: 'auto', padding: '2rem 1rem' },
    mainHeading: { fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem' },
    card: { backgroundColor: '#ffffff', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)', marginTop: '2rem' },
    cardHeader: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' },
    subHeading: { fontSize: '1.125rem', fontWeight: '600' },
    flexCenter: { display: 'flex', alignItems: 'center' },
    logicLabel: { marginRight: '0.5rem' },
    select: { border: '1px solid #d1d5db', borderRadius: '0.375rem', padding: '0.5rem', marginRight: '0.5rem' },
    logicSelect: { border: '1px solid #d1d5db', borderRadius: '0.375rem', padding: '0.25rem' },
    input: { border: '1px solid #d1d5db', borderRadius: '0.375rem', padding: '0.5rem', width: '100%' },
    ruleRow: { display: 'flex', alignItems: 'center', marginBottom: '0.5rem' },
    addRuleButton: { color: '#3b82f6', marginTop: '0.5rem', background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontSize: 'inherit' },
    buttonContainer: { marginTop: '1.5rem' },
    primaryButton: { backgroundColor: '#3b82f6', color: 'white', fontWeight: '700', padding: '0.5rem 1rem', borderRadius: '0.375rem', border: 'none', cursor: 'pointer' },
    greenButton: { backgroundColor: '#22c55e', color: 'white', fontWeight: '700', padding: '0.5rem 1rem', borderRadius: '0.375rem', border: 'none', cursor: 'pointer', whiteSpace: 'nowrap' },
    audienceText: { marginTop: '1rem' },
    bold: { fontWeight: '700' },
    tableWrapper: { boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)', overflow: 'hidden', borderBottom: '1px solid #e5e7eb', borderRadius: '0.5rem' },
    table: { minWidth: '100%', borderCollapse: 'collapse' },
    tableHead: { backgroundColor: '#1f2937', color: 'white' },
    tableTh: { padding: '0.75rem 1.5rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.05em' },
    tableBody: { backgroundColor: 'white' },
    tableRowBorder: { borderTop: '1px solid #e5e7eb' },
    tableCell: { padding: '1rem 1.5rem', whiteSpace: 'nowrap' },
    suggestionList: { listStyleType: 'disc', paddingLeft: '1.25rem' },
    suggestionItem: { marginBottom: '0.5rem' },
  };


  return (
    <div style={styles.container}>
      <h1 style={styles.mainHeading}>Segment Builder</h1>

      <div style={{ ...styles.card, marginTop: 0 }}> {/* First card has no top margin */}
        <div style={styles.cardHeader}>
          <h2 style={styles.subHeading}>Create Segment</h2>
          <div style={styles.flexCenter}>
            <span style={styles.logicLabel}>Logic:</span>
            <select value={logic} onChange={(e) => setLogic(e.target.value)} style={styles.logicSelect}>
              <option value="AND">AND</option>
              <option value="OR">OR</option>
            </select>
          </div>
        </div>

        {rules.map((rule, index) => (
          <div key={index} style={styles.ruleRow}>
            <select value={rule.field} onChange={(e) => handleRuleChange(index, 'field', e.target.value)} style={styles.select}>
              <option value="total_spends">Total Spends</option>
              <option value="visits">Number of Visits</option>
              <option value="last_visited_at">Last Visited At</option>
              <option value="location">Location</option>
            </select>
            <select value={rule.operator} onChange={(e) => handleRuleChange(index, 'operator', e.target.value)} style={styles.select}>
              <option value=">">&gt;</option>
              <option value="<">&lt;</option>
              <option value="=">=</option>
            </select>
            <input
              type={rule.field === 'last_visited_at' ? 'date' : rule.field === 'location' ? 'text' : 'number'}
              value={rule.value}
              onChange={(e) => handleRuleChange(index, 'value', e.target.value)}
              placeholder="Value"
              style={styles.input}
            />
          </div>
        ))}

        <button onClick={addRule} style={styles.addRuleButton}>+ Add Rule</button>

        <div style={styles.buttonContainer}>
          <button onClick={checkAudience} style={styles.primaryButton}>
            Preview Audience
          </button>
          {audienceSize !== null && (
            <p style={styles.audienceText}>
              Estimated Audience Size: <span style={styles.bold}>{audienceSize}</span>
            </p>
          )}
        </div>
      </div>

      {filteredCustomers.length > 0 && (
        <div style={styles.card}>
          <h2 style={styles.subHeading}>Matching Customers</h2>
          <div style={styles.tableWrapper}>
            <table style={styles.table}>
              <thead style={styles.tableHead}>
                <tr>
                  <th scope="col" style={styles.tableTh}>Name</th>
                  <th scope="col" style={styles.tableTh}>Email</th>
                  <th scope="col" style={styles.tableTh}>Location</th>
                  <th scope="col" style={styles.tableTh}>Total Spends</th>
                  <th scope="col" style={styles.tableTh}>Visits</th>
                  <th scope="col" style={styles.tableTh}>Last Visited</th>
                </tr>
              </thead>
              <tbody style={styles.tableBody}>
                {filteredCustomers.map((customer, index) => (
                  <tr key={customer.id} style={index > 0 ? styles.tableRowBorder : {}}>
                    <td style={styles.tableCell}>{customer.name}</td>
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
      )}

      <div style={styles.card}>
        <h2 style={{ ...styles.subHeading, marginBottom: '1rem' }}>AI Message Suggestions</h2>
        <div style={styles.flexCenter}>
          <input
            type="text"
            value={objective}
            onChange={(e) => setObjective(e.target.value)}
            placeholder="Enter campaign objective (e.g., bring back inactive users)"
            style={{ ...styles.input, marginRight: '0.5rem' }}
          />
          <button onClick={getSuggestions} style={styles.greenButton}>
            Get Suggestions
          </button>
        </div>
        {suggestions.length > 0 && (
          <div style={{ marginTop: '1rem' }}>
            <h3 style={{ ...styles.subHeading, fontSize: '1rem', marginBottom: '0.5rem' }}>Suggested Messages:</h3>
            <ul style={styles.suggestionList}>
              {suggestions.map((suggestion, index) => (
                <li key={index} style={styles.suggestionItem}>{suggestion}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default SegmentBuilderPage;