import React, { useState, useEffect } from "react";
import {
  Button,
  MenuItem,
  Select,
  TextField,
  Box,
  Grid,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { addTask, editTask } from "../features/taskSlice";
import { v4 as uuidv4 } from "uuid";

const AddTask = ({ taskToEdit = null, onComplete }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("To Do");
  const dispatch = useDispatch();
  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description);
      setStatus(taskToEdit.status);
    }
  }, [taskToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (taskToEdit) {
      const updatedTask = {
        ...taskToEdit,
        title,
        description,
        status,
      };
      dispatch(editTask(updatedTask));
      setTitle("");
      setDescription("");
      setStatus("");
      onComplete();
    } else {
      const newTask = {
        id: uuidv4(),
        title,
        description,
        status,
      };
      dispatch(addTask(newTask));
    }

    setTitle("");
    setDescription("");
    setStatus("All");
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        padding: 3,
        border: "1px solid #ddd",
        borderRadius: 2,
        maxWidth: "600px",
        margin: "auto",
      }}
    >
      <Typography variant="h5" gutterBottom>
        {taskToEdit ? "Edit Task" : "Add New Task"}
      </Typography>

      <Grid container spacing={2}>
        {/* Task Title */}
        <Grid item xs={12}>
          <TextField
            label="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            required
          />
        </Grid>

        {/* Task Description */}
        <Grid item xs={12}>
          <TextField
            label="Task Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            multiline
            rows={4}
          />
        </Grid>
        <Grid item xs={12}>
          <Select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            fullWidth
          >
            <MenuItem value="To Do">To Do</MenuItem>
            <MenuItem value="In Progress">In Progress</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
          </Select>
        </Grid>

        {/* Submit Button */}
        <Grid item xs={12}>
          <Button
            variant="contained"
            type="submit"
            fullWidth
            sx={{ marginTop: 2 }}
          >
            {taskToEdit ? "Update Task" : "Add Task"}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AddTask;
