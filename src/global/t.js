export const t = (text) => text;

if (typeof window !== 'undefined') {
  window.t = t;
}

export default t;

