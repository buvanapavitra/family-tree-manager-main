import Member from "../models/Member.js";

// Recursive function to build nested family tree
const buildTree = (list, parentId = null) => {
  return list
    .filter((member) => String(member.parent_id) === String(parentId))
    .map((member) => ({
      ...member,
      children: buildTree(list, member._id),
    }));
};

// GET all members as a tree
export const getAllMembers = async (req, res) => {
  try {
    const members = await Member.find().lean();
    const mapped = members.map((m) => ({
      ...m,
      id: m._id,
    }));
    res.json(buildTree(mapped));
  } catch (error) {
    console.error("Error fetching members:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// POST: Create a new member
export const createMember = async (req, res) => {
  const { name, age, parent_id } = req.body;
  if (age > 120) {
    return res.status(400).json({ message: "Age cannot be more than 120" });
  }
  if (!name || age == null) {
    return res.status(400).json({ error: "Name and age are required." });
  }

  try {
    const member = new Member({
      name,
      age,
      parent_id: parent_id || null,
    });
    await member.save();
    res.status(201).json({ message: "Member created", memberId: member._id });
  } catch (error) {
    console.error("Error creating member:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// PUT: Update member by ID
export const updateMember = async (req, res) => {
  const { name, age } = req.body;
  const { id } = req.params;
  if (age > 120) {
    return res.status(400).json({ message: "Age cannot be more than 120" });
  }
  if (!name || age == null) {
    return res.status(400).json({ error: "Name and age are required." });
  }

  try {
    const result = await Member.findByIdAndUpdate(
      id,
      { name, age },
      { new: true }
    );
    if (!result) {
      return res.status(404).json({ error: "Member not found" });
    }
    res.json({ message: "Member updated" });
  } catch (error) {
    console.error("Error updating member:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Recursive function to delete member and their descendants
const deleteDescendants = async (id) => {
  const children = await Member.find({ parent_id: id });
  for (const child of children) {
    await deleteDescendants(child._id);
  }
  await Member.findByIdAndDelete(id);
};

// DELETE: Remove member and all descendants
export const deleteMember = async (req, res) => {
  const { id } = req.params;

  try {
    await deleteDescendants(id);
    res.json({ message: "Member and descendants deleted" });
  } catch (error) {
    console.error("Error deleting member:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
