const getSavedCartItems = (func) => {
  const savedCartItems = localStorage.getItem('cartItems');
  const cartItemsOl = document.querySelector('ol.cart__items');
  cartItemsOl.innerHTML = savedCartItems;
  cartItemsOl.addEventListener('click', func);
  return cartItemsOl;
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
