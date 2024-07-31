import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
	{
		fullName: {
			type: String,
			required: true,
		},
		username: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
			minlength: 3,
		},
		gender: {
			type: String,
			required: true,
			enum: ["male", "female"],
		},
		profilePic: {
			type: String,
		},
		friends: [{
			type: mongoose.Schema.Types.ObjectId, 
			ref: "User",
		}],
		groups: [{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Group",
		}]
	},
	{ timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
