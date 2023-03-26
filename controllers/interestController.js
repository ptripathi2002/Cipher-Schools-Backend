const asyncHandler = require("express-async-handler");
const Interest = require("../models/interestModel");

const createInterest = asyncHandler(async (req, res) => {
  const { name, description } = req.body;

  //Validation

  if (!name || !description) {
    res.status(400);
    throw new Error("Please fill all the Required Fields");
  }

  const interest = await Interest.create({
    user: req.user.id,
    name,
    description,
  });

  res.status(201).json(interest);
});

const getAllInterests = asyncHandler(async (req, res) => {
  const interests = await Interest.find({ user: req.user.id }).sort(
    "-createdAt"
  );
  res.status(200).json(interests);
});

const getSingleInterest = asyncHandler(async (req, res) => {
  const interest = await Interest.findById(req.params.id);
  if (!interest) {
    res.status(404);
    throw new Error("Interest Not Found");
  }
  if (interest.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User Not Authorized");
  }
  res.status(200).json(interest);
});

const deleteInterest = asyncHandler(async (req, res) => {
  const deleteInterest = await Interest.findById(req.params.id);
  if (!deleteInterest) {
    res.status(404);
    throw new Error("Interest Not Found");
  }

  if (deleteInterest.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User Not Authorized");
  }
  await deleteInterest.remove();
  res.status(200).json({ message: "Interest Deleted Successfully" });
});

const updateInterest = asyncHandler(async (req, res) => {
  const { name, description } = req.body;
  const { id } = req.params;

  const interest = await Interest.findById(id);

  if (!interest) {
    res.status(404);
    throw new Error("Interest not found");
  }

  if (interest.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const updatedInterest = await Interest.findByIdAndUpdate(
    { _id: id },
    {
      name,

      description,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json(updatedInterest);
});

module.exports = {
  createInterest,
  getAllInterests,
  getSingleInterest,
  deleteInterest,
  updateInterest,
};
