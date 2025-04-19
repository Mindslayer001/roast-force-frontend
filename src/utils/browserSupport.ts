export const browserSupport = {
  canShare: () => {
    return typeof navigator !== 'undefined' && 
           navigator.share && 
           navigator.canShare;
  },
  
  canvasSupport: () => {
    try {
      const canvas = document.createElement('canvas');
      return !!(canvas.getContext && canvas.getContext('2d'));
    } catch (e) {
      return false;
    }
  },

  downloadSupport: () => {
    const a = document.createElement('a');
    return 'download' in a;
  }
};