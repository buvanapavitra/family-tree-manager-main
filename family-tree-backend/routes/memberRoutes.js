import express from "express";
import {
  getAllMembers,
  createMember,
  updateMember,
  deleteMember,
} from "../controllers/membersController.js";

const router = express.Router();

// GET /api/members - Get all members as a tree
router.get("/", getAllMembers);

// POST /api/members - Create a new member
router.post("/", createMember);

// PUT /api/members/:id - Update a member by ID
router.put("/:id", updateMember);

// DELETE /api/members/:id - Delete a member and all descendants
router.delete("/:id", deleteMember);

export default router;
