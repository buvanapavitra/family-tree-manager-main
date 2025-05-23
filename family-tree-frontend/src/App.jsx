import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Accordion from "./components/Accordion";
import MemberModal from "./components/MemberModal";
import DeleteModal from "./components/DeleteModal";
import {
  fetchMembers,
  addMember,
  updateMember,
  deleteMember,
} from "./redux/actions";

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import Diversity1Icon from '@mui/icons-material/Diversity1';

import "./App.css";

function App() {
  const dispatch = useDispatch();
  const members = useSelector((state) => state.members);

  const [modalOpen, setModalOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [deleteMemberData, setDeleteMemberData] = useState(null);
  const [aboutOpen, setAboutOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchMembers());
  }, [dispatch]);

  const handleEdit = (member) => {
    setEditData(member);
    setModalOpen(true);
  };

  const handleDelete = (member) => {
    setDeleteMemberData(member);
    setDeleteOpen(true);
  };

  return (
    <Box className="app-background">
      {/* Top Navigation Bar */}
      <AppBar position="fixed" className="app-bar">
        <Toolbar className="toolbar">
          <Box className="empty-box" />
          <Box className="title-box">
            <Box className="title-icon">
              <Diversity1Icon fontSize="large" sx={{ color: "#fff", marginRight: "8px" }} />
              <Typography variant="h5" className="family-title" noWrap>
                Family Tree Manager
              </Typography>
            </Box>
            <Typography variant="subtitle1" className="family-subtitle">
              Connect Generations, One Click at a Time.
            </Typography>
          </Box>
          <Box className="about-box">
            <Button
              variant="outlined"
              color="inherit"
              size="small"
              className="about-button"
              onClick={() => setAboutOpen(true)}
            >
              About
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Spacer */}
      <Toolbar />

      {/* Add Member Button */}
      <Box className="add-member-button-box">
        <Button
          variant="contained"
          color="success"
          className="add-member-button"
          startIcon={<AddIcon />}
          onClick={() => {
            setEditData(null);
            setModalOpen(true);
          }}
        >
          Add Member
        </Button>
      </Box>

      {/* Main Content */}
      <Container maxWidth="lg" className="content-container">
        <Box className="accordion-wrapper">
          <Accordion
            members={members}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </Box>
      </Container>

      {/* Add/Edit Modal */}
      <MemberModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={(data) => {
          editData ? dispatch(updateMember(data)) : dispatch(addMember(data));
          setModalOpen(false);
        }}
        members={members}
        editData={editData}
      />

      {/* Delete Modal */}
      <DeleteModal
        isOpen={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={(id) => dispatch(deleteMember(id))}
        member={deleteMemberData}
      />

      {/* About Dialog */}
      <Dialog open={aboutOpen} onClose={() => setAboutOpen(false)}>
        <DialogTitle>About</DialogTitle>
        <DialogContent>
          <Typography>
            <strong>Family Tree Manager</strong> is an app developed using React,
            Redux, Node.js, and MongoDB to manage and visualize family
            relationships. You can add, edit, and delete members in a nested
            accordion view. Background Image Credits: pngtree
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAboutOpen(false)} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default App;
