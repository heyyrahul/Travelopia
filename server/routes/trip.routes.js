const express = require("express");
const { Trip } = require("../model/trip.model");
const { auth } = require("../middlewares/auth.middleware");
const tripRouter = express.Router();
const { access } = require("../middlewares/access.middleware");

tripRouter.post("/",auth, async (req, res) => {
  const {destination,interests,travelers,budget} = req.body;
  const userId = req.id.toString();
  console.log("body", req.body);
  try {
    const trip = new Trip({
      destination,
      interests,
      travelers,
      budget,
      userId
    });
    console.log("trip", trip);

    await trip.save();
   
    res.status(200).json({ msg: "Trip created" });
  } catch (e) {
    res.status(400).json({ e });
  }
});

tripRouter.get("/", auth, access("admin"), async (req, res) => {
  try {
    const trips = await Trip.find();
    res.status(200).json({ trips });
  } catch (e) {     
    res.status(400).json({ e });
  }
});



module.exports = {
  tripRouter
};
