const { Events } = require("../models/Events");

const Express = require("express");
const _ = require("lodash");
const router = Express.Router();

//importing middle ware
const AuthenticateUser = require("../middleware/AuthenticateUser");
const RedirectAdminUser = require("../middleware/RedirectAdminUser");

router.get("/", AuthenticateUser, async (request, response) => {
  const Events = await Events.find({});

  const cateories = [];
  Events.forEach((event) => {
    if (!categories.includes(event.Category)) {
      clubs.push(event.Category);
    }
  });

  response.status(200).send(categories);
});

router.get(
  "/fetchEvents/:Category",
  AuthenticateUser,
  async (request, response) => {
    const Category = request.params.Category;
    const EventsConductedCategory = await Events.find({
      Category: Category,
    });

    //for debugging purposes
    response.status(200).send(EventsConductedCategory);
  }
);

module.exports = router;
