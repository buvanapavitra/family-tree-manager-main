import mongoose from "mongoose";

const memberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  parent_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Member",
    default: null,
  },
});

const Member = mongoose.model("Member", memberSchema);
export default Member;
