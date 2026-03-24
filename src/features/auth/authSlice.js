import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "../../supabaseClient";

// functions
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, thunkAPI) => {
    const { data, error } = supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) return thunkAPI.rejectWithValue(error.message);

    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", data.user.id)
      .single();

    return { user: data.user, role: profile.role };
  },
);

export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  await supabase.auth.signOut();
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    role: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.role = action.payload.role;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loginUser.rejected, (state) => {})
      .addCase(logoutUser.fulfilled, (state) => {
        ((state.user = null), (state.role = null));
      });
  },
});

export default authSlice.reducer;
