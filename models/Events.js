const mongoose = require("mongoose");

const EventSchema = mongoose.Schema({
  ImageUrl: {
    type: String,
    required: true,
  },
  Title: {
    type: String,
    required: true,
  },
  Description: {
    type: String,
    required: true,
  },
  Date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  RegistrationLink: {
    type: String,
    required: true,
  },
  StarCount: {
    type: Number,
    default: 0,
  },
  Category: {
    type: String,
  },
  lastedited: {
    type: Date,
    default: Date.now,
  },
  Prerequisites: {
    type: String,
  },
  // },
  // ContactDetails: {
  //   type: [Contacts],
  // },
});

//creating a model for this mongo schema
const Events = mongoose.model("Event", EventSchema);

module.exports = {
  Events: Events,
};
