/* eslint-disable no-undef */

const apiUrl = `http://localhost:5000`;

const register = async function (userData) {
  try {
    const response = await axios.post(`${apiUrl}/user`, userData);

    const userid = response.data;

    return userid;
  } catch (errors) {
    return errors;
  }
};

const search = async function (userId) {
  axios.get(`${apiUrl}/user/${userId}`);
};

export default { register, search };
