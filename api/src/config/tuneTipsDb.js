const mongoose = require('mongoose');

const tuneTipsDb = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log('Sucessfully connected to DDBB');
  } catch (error) {
    console.error("Conection error: " + error.message);
  }
};

module.exports = { tuneTipsDb };