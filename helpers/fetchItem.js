const fetchItem = async (itemID) => {
  try { 
  const url = `https://api.mercadolibre.com/items/${itemID}`;
  const response = await fetch(url);
  const responseJson = await response.json();
  console.log(responseJson);
  return responseJson;
 } catch (err) {
  return err;
 }
};
console.log(fetchItem('MLB1341706310'));
if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
