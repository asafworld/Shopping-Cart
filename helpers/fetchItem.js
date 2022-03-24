const fetchItem = async (itemID) => {
  try { 
  const url = `https://api.mercadolibre.com/items/${itemID}`;
  const response = await fetch(url);
  const responseJson = await response.json();
  return responseJson;
 } catch (err) {
  return err;
 }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
