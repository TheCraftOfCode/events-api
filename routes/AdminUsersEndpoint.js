const Express = require("express");
const router = Express.Router();
const _ = require("lodash");
const AuthenticateUser = require("../middleware/AuthenticateUser");
const CheckAdminUser = require("../middleware/AuthAdminUser");
const { Events } = require("../models/Events");

router.get(
  "/",
  [AuthenticateUser, CheckAdminUser],
  async (request, response) => {
    //get request is made return the list of all the events happening
    const AllEvents = await Events.find({});
    var SelectedAttributedForCardView = [];
    AllEvents.forEach((event) => {
      SelectedAttributedForCardView.push(
        _.pick(event, ["_id", "ImageUrl", "Title", "Category", "Date"])
      );
    });
    return response.status(200).send(SelectedAttributedForCardView);
  }
);

//expanded event details view admin side
router.get(
  "/:SelectedEventId",
  [AuthenticateUser, CheckAdminUser],
  async (request, response) => {
    const SelectedEvent = await Events.find({
      _id: request.params.SelectedEventId,
    });

    if (!SelectedEvent) {
      return response.status(400).send("Bad Request..!");
    }
    response.status(200).send(SelectedEvent);
  }
);

//admins are allowed to make post requests then new events can be added
router.post(
  "/",
  [AuthenticateUser, CheckAdminUser],
  async (request, response) => {
    const event = new Events({
      ImageUrl: request.body.ImageUrl,
      Title: request.body.Title,
      Description: request.body.Description,
      Category: request.body.OrganizingClub,
      location: request.body.Venue,
      RegistrationLink: request.body.RegistrationLink,
      Prerequisites: request.body.Prerequisites,
    });

    const StatusSave = await event.save();
    //debugging purposes
    //console.log(event);
    response.status(200).send("Event Successfully Created...!");
  }
);

// Delete requests
router.delete(
  "/:DeleteEventId",
  [AuthenticateUser, CheckAdminUser],
  async (request, response) => {
    //delete the event with the id provided in the params
    const DeleteEvent = await Events.findByIdAndRemove(
      request.params.DeleteEventId
    );
    if (!DeleteEvent)
      return response.status(400).send("Sorry..! .Event Not found...!");

    response.status(200).send(DeleteEvent);
  }
);

router.put(
  "/:id",
  [AuthenticateUser, CheckAdminUser],
  async (request, response) => {
    const UpdateEvent = await Events.findByIdAndUpdate(
      request.params.id,
      request.body
    );
    if (!UpdateEvent)
      return response.status(400).send("Sorry..! .Event Not found...!");

    response.status(200).send(UpdateEvent);
  }
);

module.exports = router;
