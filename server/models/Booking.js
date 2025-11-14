// const mongoose = require('mongoose');

// const BookingSchema = new mongoose.Schema(
//   {
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'User',
//       required: true,
//     },
//     date: {
//       type: String,
//       required: true,
//     },
//     slotTime: {
//       type: String,
//       required: true,
//     },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model('Booking', BookingSchema);



const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  userId: String,
  slotId: String,
  date: String,
});

module.exports = mongoose.model("Booking", bookingSchema);
