import Group from "../models/groupChat.model.js"
import GroupMessage from "../models/groupmsg.model.js"
import User from "../models/user.model.js"

export const createGroup = async (req, res) => {
    try {
        const { name, description } = req.body
        const adminID = req.user._id
        const exits = await Group.findOne({ name })
        if (exits) {
            return res.status(400).json({ message: "Group with this name already exists" })
        }
        const admin = await User.findById(adminID)
        if (!admin) {
            return res.status(404).json({ message: "Admin not found" })
        }
        const newGroup = new Group({ name, description, admin })
        newGroup.members.push(adminID)
        await newGroup.save()
        await User.findByIdAndUpdate(admin, { $push: { groups: newGroup._id } })

        res.status(200).json({ message: "Group created successfully", group: newGroup })
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: "Failed to create group" })
    }
}


export const getGroupById = async (req, res) => {
    try {
        const { id: groupId } = req.params
        const group = await Group.findById(groupId).populate("members", "username");
        if (!group) {
            return res.status(404).json({ error: "Group not found" });
        }
        res.status(200).json(group);

    } catch (error) {
        res.status(500).json({ error: "Failed to get group" });
    }
}
export const getAllGroup = async (req, res) => {
    try {
        // Assuming req.user contains the authenticated user's information
        const userId = req.user._id;

        // Find the user and populate the groups field
        const user = await User.findById(userId).populate('groups', 'name description messages');

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        if (!user.groups || user.groups.length === 0) {
            return res.status(200).json({ message: "User is not a member of any groups", groups: [] });
        }

        res.status(200).json({ groups: user.groups });
    } catch (error) {
        console.error("Error in getAllGroup:", error);
        res.status(500).json({ error: "Failed to get groups" });
    }
};


export const addMemberToGroup = async (req, res) => {
    try {
        const memberId = req.body.id
        const {id: groupId }= req.params
        const group = await Group.findById(groupId)
        if (!group) {
            return res.status(404).json({ error: "Group not found" });
        }

        if (group.members.includes(memberId)) {
            return res.status(400).json({ error: "User is already a member of this group" });
        }

        group.members.push(memberId);
        await group.save();

        await User.findByIdAndUpdate(memberId, { $push: { groups: group._id } })

        res.status(200).json(group);
    } catch (error) {
        res.status(500).json({ error: "Failed to add member to group" });
    }

}


export const removeMemberFromGroup = async (req, res) => {
    try {
        const memberId = req.body.id
        const{id: groupId}= req.params
        const group = await Group.findById(groupId)
        if (!group) {
            return res.status(404).json({ error: "Group not found" });
        }
        if (!group.members.includes(memberId)) {
            return res.status(400).json({ error: "User is not a member of this group" })
        }
        group.members.pull(memberId);
        await group.save();
        await User.findByIdAndUpdate(memberId, { $pull: { groups: group._id } })
        res.status(200).json(group);
    } catch (error) {
        res.status(500).json({ error: "Failed to remove member to group" });
    }

}


export const sendGroupMessage = async (req, res) => {
    try {
        const { message } = req.body
        const sender = req.user._id
        const {id:groupId} = req.params
        const group = await Group.findById(groupId)
        if (!group) {
            return res.status(404).json({ error: "Group not found" });
        }
        const newMessage = new GroupMessage({
            sender: sender,
            message: message,
            group: group._id
        })
        await newMessage.save()
        group.messages.push(newMessage._id)
        await group.save()
        res.status(200).json(newMessage);
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: "Internal server error" })
    }
}


export const getGroupMessages = async (req, res) => {
    try {
        const {id:groupId }= req.params
        const group = await Group.findById(groupId).populate("messages")
        if (!group) {
            return res.status(404).json({ error: "Group not found" });
        }
        const messages = group.messages
        res.status(200).json(messages);
    } catch (error) {
        console.error("Error in getGroupMessages controller: ", error);
        res.status(500).json({ error: "Failed to get group messages" });
    }
}