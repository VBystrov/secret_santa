/* eslint-disable no-undef */

const apiUrl = `http://localhost:5000`;

const register = async function (userData) {
  try {
    const response = await axios.post(`${apiUrl}/user`, userData);
    const { userid, err } = response.data;
    if (err) {
      return err;
    }
    return `Your id is ${userid}. Please remember it.`;
  } catch (errors) {
    return errors;
  }
};

export default { register };
