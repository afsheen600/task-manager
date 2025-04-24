import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask, fetchTodo, toggleCompleted } from "../features/taskSlice";
import {
  Button,
  Box,
  Typography,
  FormControl,
  Checkbox,
  Select,
  MenuItem,
  Grid,
} from "@mui/material";
import AddTask from "../components/AddTask";

const TaskList = () => {
  const [selectedFilter, setSelectedFilter] = useState("");
  const [taskToEdit, setTaskToEdit] = useState(null);
  const tasks = useSelector((state) => state.tasks.tasks);
  const loading = useSelector((state) => state.tasks.loading);
  const error = useSelector((state) => state.tasks.error);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodo());
  }, [dispatch]);

  if (loading) {
    return <p>Tasks loading....</p>;
  }
  if (error) {
    return <p>There is an error: {error}</p>;
  }

  const handleDeleteTask = (id) => {
    dispatch(deleteTask(id));
  };

  const handleToggleCompleted = (id) => {
    dispatch(toggleCompleted(id));
  };

  const updateFilter = (e) => {
    setSelectedFilter(e.target.value);
  };

  const filteredTasks = selectedFilter
    ? tasks.filter((task) => task.status === selectedFilter)
    : tasks;

  return (
    <Box sx={{ padding: { xs: 0, sm: 2 } }}>
      <Grid container spacing={2}>
        <Grid item xs={12} >
          <AddTask
            taskToEdit={taskToEdit}
            onComplete={() => setTaskToEdit(null)}
          />
        </Grid>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ mt: "30px", fontWeight: "bold" }}
        >
          Tasks
        </Typography>
        <Grid item xs={12} sm={6} md={6}>
          <FormControl
            fullWidth
            margin="normal"
            sx={{ d: "flex", justifyContent: "end", alignItems: "end" }}
          >
            <Select
              value={selectedFilter}
              onChange={updateFilter}
              displayEmpty
              sx={{ width: "100%", maxWidth: "200px", marginBottom: "10px" }}
            >
              <MenuItem value="">All Tasks</MenuItem>
              <MenuItem value="To Do">To Do</MenuItem>
              <MenuItem value="In Progress">In Progress</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          {filteredTasks.map((task) => (
            <Grid
              key={task.id}
              container
              spacing={3}
              sx={{
                border: "1px solid #ddd",
                borderRadius: 2,
                padding: 1,
                mb: 5,
              }}
              alignContent="center"
            >
              <Grid xs={12} sm={6}>
                <Typography variant="body1">{task.title}</Typography>
                {task.description && (
                  <Typography variant="body2" color="textSecondary">
                    {task.description}
                  </Typography>
                )}
                <Typography variant="caption" color="textSecondary">
                  Status: {task.status}
                </Typography>
              </Grid>
              <Grid xs={12} sm={6}>
                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    justifyContent: "end",
                  }}
                >
                  <Button
                    variant="contained"
                    onClick={() => setTaskToEdit(task)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDeleteTask(task.id)}
                  >
                    Delete
                  </Button>
                  <Checkbox
                    checked={task.completed}
                    onChange={() => handleToggleCompleted(task.id)}
                  />
                </Box>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
};

export default TaskList;
