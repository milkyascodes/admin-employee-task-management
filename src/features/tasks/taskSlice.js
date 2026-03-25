import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import supabase from "../../supabaseClient";

export const createTask = createAsyncThunk(
  "tasks/createTask",
  async ({ title, description, assigned_to }, thunkAPI) => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    const { data, error } = await supabase
      .from("tasks")
      .insert({
        title,
        description,
        assigned_to,
        created_by: session.user.id,
      })
      .select() // <--- CRITICAL: Add this to get the created task back!
      .single();
    if (error) return thunkAPI.rejectWithValue(error.message);

    return data;
  },
);

export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async (_, thunkAPI) => {
    // 1. Get the current session
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) return thunkAPI.rejectWithValue("No session found");

    // 2. Fetch the user's role from your 'profiles' table
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", session.user.id)
      .single();

    // 3. Start building the query
    let query = supabase.from("tasks").select("*");

    // 4. If NOT an admin, apply the "assigned_to" filter
    if (profile?.role !== "admin") {
      query = query.eq("assigned_to", session.user.id);
    }

    // 5. Execute the query
    const { data, error } = await query;

    if (error) return thunkAPI.rejectWithValue(error.message);

    console.log("Admin or User data:", data);
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
      .addCase(createTask.rejected, (state, action) => {
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
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default taskSlice.reducer;
