import axios from "axios";

const serverAPI = "https://image-ar-matcher.onrender.com/api";

export const getCallExists = async (callID) => {
  const response = await axios.get(`${serverAPI}/call-exists/${callID}`);
  return response.data;
};
