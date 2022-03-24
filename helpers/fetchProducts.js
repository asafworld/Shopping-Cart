const fetchProducts = async (product) => {
 try {
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${product}`;
  const response = await fetch(url);
  const responseJson = await response.json();
  return responseJson.results;
 } catch (err) {
  return err;
 }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
