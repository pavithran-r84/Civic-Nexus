const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export async function getIssues() {
  try {
    const res = await fetch(`${BASE_URL}/issues`);
    if (!res.ok) throw new Error('Failed to fetch issues');
    return await res.json();
  } catch (err) {
    console.warn('API error (getIssues), using fallback:', err);
    return [];
  }
}

export async function getIssue(id) {
  try {
    const res = await fetch(`${BASE_URL}/issues/${id}`);
    if (!res.ok) throw new Error(`Failed to fetch issue ${id}`);
    return await res.json();
  } catch (err) {
    console.warn(`API error (getIssue ${id}), using fallback:`, err);
    return null;
  }
}

export async function createIssue(issueData) {
  try {
    const res = await fetch(`${BASE_URL}/issues`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(issueData)
    });
    if (!res.ok) throw new Error('Failed to create issue');
    return await res.json();
  } catch (err) {
    console.error('API error (createIssue):', err);
    throw err;
  }
}

export async function updateIssueStatus(id, updates) {
  try {
    const res = await fetch(`${BASE_URL}/issues/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    });
    if (!res.ok) throw new Error(`Failed to update issue ${id}`);
    return await res.json();
  } catch (err) {
    console.error(`API error (updateIssueStatus ${id}):`, err);
    throw err;
  }
}

export async function getCommunityStats() {
  try {
    const res = await fetch(`${BASE_URL}/communityStats`);
    if (!res.ok) throw new Error('Failed to fetch stats');
    return await res.json();
  } catch (err) {
    console.warn('API error (getCommunityStats):', err);
    return {
      totalIssues: 142,
      resolvedIssues: 118,
      pendingIssues: 24,
      avgResolutionTime: "5.2h",
      topIssue: "Garbage"
    };
  }
}

export async function getStakeholders() {
  try {
    const res = await fetch(`${BASE_URL}/stakeholders`);
    if (!res.ok) throw new Error('Failed to fetch stakeholders');
    return await res.json();
  } catch (err) {
    console.warn('API error (getStakeholders):', err);
    return [];
  }
}
