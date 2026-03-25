import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import supabase from "../../supabaseClient";

export const createTask = createAsyncThunk(
  "tasks/createTask",
  async ({ title, description, assigned_to }, thunkAPI) => {
    console.log("assigned to 2", assigned_to);
    const {
      data: { session },
    } = await supabase.auth.getSession();
    const { data, error } = await supabase.from("tasks").insert({
      title,
      description,
      assigned_to,
      created_by: session.user.id,
    });
    if (error) return thunkAPI.rejectWithValue(error.message);

    return data;
  },
);

export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async (_, thunkAPI) => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .eq("assigned_to", session.user.id);
    if (error) return thunkAPI.rejectWithValue(error.message);

    return data;
  },
);
const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks.push(action.payload);
      })
      .addCase(createTask.rejected, (state) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default taskSlice.reducer;
