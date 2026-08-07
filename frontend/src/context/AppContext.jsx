import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getIssue, getIssues, updateIssueStatus as apiUpdateIssueStatus, createIssue as apiCreateIssue } from '../api/issuesApi';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [activeRole, setActiveRole] = useState('Citizen');
  const [currentIssue, setCurrentIssue] = useState(null);
  const [allIssues, setAllIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchInitialData = useCallback(async () => {
    setLoading(true);
    try {
      const issues = await getIssues();
      setAllIssues(issues || []);
      if (issues && issues.length > 0) {
        // Default to issue-1 or the first issue
        const primary = issues.find(i => i.id === 'issue-1') || issues[0];
        setCurrentIssue(primary);
      }
    } catch (err) {
      console.error('Failed to load initial issue context:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInitialData();
  }, [fetchInitialData]);

  const refreshIssue = useCallback(async (id) => {
    const targetId = id || (currentIssue ? currentIssue.id : 'issue-1');
    try {
      const updated = await getIssue(targetId);
      if (updated) {
        setCurrentIssue(updated);
        setAllIssues(prev => prev.map(item => item.id === updated.id ? updated : item));
      }
    } catch (err) {
      console.error('Error refreshing issue:', err);
    }
  }, [currentIssue]);

  const updateIssueState = async (updates) => {
    if (!currentIssue) return;
    try {
      const updated = await apiUpdateIssueStatus(currentIssue.id, updates);
      setCurrentIssue(updated);
      setAllIssues(prev => prev.map(item => item.id === updated.id ? updated : item));
      return updated;
    } catch (err) {
      console.error('Failed to update issue in context:', err);
      throw err;
    }
  };

  const createNewIssueState = async (newIssueData) => {
    try {
      const created = await apiCreateIssue(newIssueData);
      setAllIssues(prev => [created, ...prev]);
      setCurrentIssue(created);
      return created;
    } catch (err) {
      console.error('Failed to create new issue:', err);
      throw err;
    }
  };

  return (
    <AppContext.Provider value={{
      activeRole,
      setActiveRole,
      currentIssue,
      setCurrentIssue,
      allIssues,
      loading,
      error,
      refreshIssue,
      updateIssueState,
      createNewIssueState
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
