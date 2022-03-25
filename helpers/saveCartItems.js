const saveCartItems = (addedCartItems) => localStorage.setItem('cartItems', addedCartItems);

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
