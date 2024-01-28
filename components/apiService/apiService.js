export const getUser = async () => {
  const userId = localStorage.getItem('id').replace(/^"(.*)"$/, '$1');
  try {
    const response = await fetch(`https://tunetips-api.onrender.com/api/users/${userId}`)
    if (!response.ok) {
      throw new Error(`Error en la petición. Código de estado: ${response.status}`);
    }
    const data = await response.json();
    return data

  } catch (error) {
    console.error(`Error al realizar la petición: ${error.message}`);
  }
};