// pages/api/gstin.js
import axios from "axios";

export default async function handler(req, res) {
  const { gstNumber } = req.query;
  if (req.method === "GET") {
    if (!gstNumber) {
      return res.status(400).json({ message: "GST number is required" });
    }
    const options = {
      method: "GET",
      url: "'https://gst-return-status.p.rapidapi.com/free/gstin/'".gstNumber,
      headers: {
        "Content-Type": "application/json",
        "X-RapidAPI-Key": "0fa9c17a7emshd00c5c49acb8cedp12c817jsn7720020ac05a",
        "X-RapidAPI-Host": "gst-return-status.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      res.status(200).json(response.data);
    } catch (error) {
      res.status(error.response.status || 500).json({ message: error.message });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
