const mongoose = require("mongoose");

const interestSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    name: {
      type: String,
      required: [true, "Please Add a name"],
      trim: true,
    },

    description: {
      type: String,
      required: [true, "Please provide the Description"],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Interest = mongoose.model("Interest", interestSchema);

module.exports = Interest;
