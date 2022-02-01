/* eslint-disable no-undef */
const apiUrl = `http://localhost:5000`;

const shuffle = async function () {
  try {
    const response = await axios.post(`${apiUrl}/shuffle`);
    const { err, status } = response.data;
    if (err) {
      return err;
    }
    return status;
  } catch (errors) {
    return errors;
  }
};

const getRecipient = async function (senderid) {
  try {
    const response = await axios.get(`${apiUrl}/pairs/${senderid}`);

    const { err } = response.data;
    if (err) {
      return { err };
    }

    return response.data;
  } catch (errors) {
    return errors;
  }
};

export default { shuffle, getRecipient };
