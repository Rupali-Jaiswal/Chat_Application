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
			default: "",
		},
		friends: [{
			type: mongoose.Schema.Types.ObjectId, 
			ref: "User",
		}],
		groups: [{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Group",
		}]
		// Add this to your existing User model

		// createdAt, updatedAt => Member since <createdAt>
	},
	{ timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
