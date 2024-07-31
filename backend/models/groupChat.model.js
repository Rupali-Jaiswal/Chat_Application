import mongoose from "mongoose";

const groupSchema = new mongoose.Schema(
  {
    groupName: { 
      type: String, 
      required: true, 
      unique: true,
      trim: true,
      validate: {
        validator: function(v) {
          return v.length > 0;
        },
        message: props => `${props.value} is not a valid group name!`
      }
    },
    groupDescription: {
      type: String,
    },
    groupImage: {
      type: String,
    },
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    groupMembers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: []
      },
    ],
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "GroupMessage",
      },
    ],
  },
  { timestamps: true }
);

const Group = mongoose.model("Group", groupSchema);

export default Group;