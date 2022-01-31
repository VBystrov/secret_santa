/* eslint-disable no-undef */
const apiUrl = `http://localhost:5000`;

const shuffle = async function () {
  try {
    const response = await axios.post(`${apiUrl}/shuffle`);
    return response.data.status;
  } catch (errors) {
    return errors;
  }
};

const getRecipient = async function (senderid) {
  try {
    const response = await axios.get(`${apiUrl}/pairs/${senderid}`);
    return response.data;
  } catch (errors) {
    return errors;
  }
};

export default { shuffle, getRecipient };
