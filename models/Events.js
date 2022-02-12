const Joi = require("joi");
const mongoose = require("mongoose");
const { Contacts } = require("../models/ContactDetails");
const EventSchema = mongoose.Schema({
  ImageUrl: {
    type: String,
    required: true,
  },
  Title: {
    type: String,
    required: true,
  },
  Caption: {
    type: String,
    required: true,
  },
  Description: {
    type: String,
    required: true,
  },
  OrganizingClub: {
    type: String,
    required: true,
  },
  Date: {
    type: Date,
    required: true,
  },
  Venue: {
    type: String,
    required: true,
  },
  RegistrationLink: {
    type: String,
    required: true,
  },
  Note: {
    type: String,
  },
  ContactDetails: {
    type: [Contacts],
  },
  // Status: {
  //   type: String,
  //   enum: ["Completed", "Upcoming", "Ongoing"],
  // },
});

//creating a model for this mongo schema
const Events = mongoose.model("Event", EventSchema);

module.exports = {
  Events: Events,
};
