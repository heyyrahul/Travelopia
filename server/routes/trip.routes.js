const express = require("express");
const { Trip } = require("../model/trip.model");
const { auth } = require("../middlewares/auth.middleware");
const tripRouter = express.Router();
const { access } = require("../middlewares/access.middleware");
const { UserModel } = require("../model/user.model"); // Import the UserModel

tripRouter.post("/", auth, async (req, res) => {
  const { destination, interests, travelers, budget } = req.body;
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
    // Iterate over each trip and fetch the associated user's username
    const tripsWithUsername = await Promise.all(trips.map(async (trip) => {
      const user = await UserModel.findById(trip.userId);
      const username = user ? user.username : 'Unknown'; // Set default username if user not found
      return { ...trip.toObject(), username }; // Add username to the trip object
    }));
    res.status(200).json({ trips: tripsWithUsername });
  } catch (e) {     
    res.status(400).json({ e });
  }
});

module.exports = {
  tripRouter
};
