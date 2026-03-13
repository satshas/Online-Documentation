import { useEffect } from 'react';
 
export const useOutsideClick = (ref, onOutsideClick) => {
  // Define the handler
  const handleClickOutside = (event) => {
    // Only trigger if ref exists and the click is outside
    if (ref.current && !ref.current.contains(event.target)) {
      onOutsideClick(event); // Call the user-provided callback
    }
    //console.log('lala')
  };
 
  // Add/remove listener
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, onOutsideClick]); // Re-run if ref or onOutsideClick changes
};