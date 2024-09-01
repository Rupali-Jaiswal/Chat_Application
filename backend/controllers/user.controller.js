import User from "../models/user.model.js";

export const getAllUsers = async (req, res) => {
	try {
		const loggedInUserId = req.user._id;

		const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

		res.status(200).json(filteredUsers);
	} catch (error) {
		console.error("Error in getUsersForSidebar: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};


export const getUserById = async (req, res) => {
    let userId = req.params.id;
    let user;
    try {
        user = await User.findById(userId).populate('friends', '_id username');
        res.json(user);
    } catch (err) {
        res.status(404).json({
            message: 'User not found'
        })
    }
}

export const addFriend = async (req, res) => {
    
    let username = req.body.username;

     try {
		const loggedINuserID=req.user._id
        let loggedInUser = await User.findById(loggedINuserID).populate('friends', '_id username');
        const user = await User.findOne({ $or: [{ fullName: username }, { username: username }] }).populate('friends', '_id username');
		if (!user) {
			return res.status(404).json({ message: 'User with this name not found' });
			}

        if (user && loggedInUser) {
            if((
                loggedInUser.friends.length !== 0 &&
                loggedInUser.friends.findIndex( friend => friend._id.equals(user._id)) !== -1
                ) || (
                user.friends.length !== 0 && 
                user.friends.findIndex( friend => friend._id.equals(loggedInUser._id)) !== -1
            )){
                return res.status(400).json({
                    message: "Already added!"
                })
            }
            loggedInUser.friends.push(user);
            loggedInUser.save();
            user.friends.push(loggedInUser);
            user.save();
            res.status(200).json(loggedInUser)
        }
    } catch (err) {
		console.log(err)
        res.status(400).json({
            message: "Internal server Error!!"
        })
    }
}

export const deleteFriend = async (req, res) => {
    let username = req.body.username;
    
    try {
		const {id:loddedINuserID}=req.params
        let loggedInUser = await User.findById(loddedINuserID).populate('friends', '_id username');
        if(!loddedINuserID){
            return res.status(400).json({msg:"You are not logged in"})
        }
        const user = await User.findOne({ $or: [{ fullName: username }, { username: username }] }).populate('friends', '_id username');
        if(!user){
            return res.status(404).json({ message: 'User with this name not found' });
        }
            loggedInUser.friends.splice(loggedInUser.friends.findIndex(friend => friend._id.equals(user._id)), 1);
            loggedInUser.save();
            user.friends.splice(user.friends.findIndex(friend => friend._id.equals(user._id)), 1);
            user.save();
            res.status(200).json(loggedInUser)
    } catch (err) {
        res.status(400).json({
            message: "User not found."
        })
    }
}

