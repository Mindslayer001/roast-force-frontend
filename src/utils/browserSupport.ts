export const browserSupport = {
  canShare: () => {
    return typeof navigator !== 'undefined' && 
           typeof navigator.share !== 'undefined' && 
           navigator.canShare;
  },
  
  canvasSupport: () => {
    try {
      const canvas = document.createElement('canvas');
      return !!(canvas.getContext && canvas.getContext('2d'));
    } catch (e) {
      alert(`Canvas not supported in this browser. Please use a modern browser.${e}`);
      return false;
    }
  },

  downloadSupport: () => {
    const a = document.createElement('a');
    return 'download' in a;
  }
};