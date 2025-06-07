export function formatDate(dateString) {
  if (!dateString) return 'N/A';
  return new Date(dateString).toLocaleDateString();
}

export function formatDateForTable(dateString) {
  if (!dateString) return '';
  // Convert to YYYY-MM-DD format for input
  return dateString.split('T')[0];
}
