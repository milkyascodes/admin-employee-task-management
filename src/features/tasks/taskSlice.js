import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import supabase from "../../supabaseClient";

export const createTask = createAsyncThunk(
  "tasks/createTask",
  async ({ title, description, assigned_to }, thunkAPI) => {
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
      .addCase(createTask.pending, (state) => {})
      .addCase(createTask.fulfilled, (state, action) => {})
      .addCase(createTask.rejected, (state) => {});
  },
});

export default taskSlice.reducer;
