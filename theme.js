try {
  const saved = localStorage.getItem('um-theme');
  document.documentElement.dataset.theme = saved === 'dark' || saved === 'light' ? saved : matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
} catch { /* The stylesheet retains the system preference when storage is unavailable. */ }
