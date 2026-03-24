import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "../../supabaseClient";

// functions

export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async ({ email, password }, thunkAPI) => {
    console.log("ddd", email, password);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    console.log("data", data);
    console.log("error", error);

    if (error) return thunkAPI.rejectWithValue(error.message);
    // 2️⃣ Immediately create a profile
    const makeAdmin =
      email.toLowerCase() === "miki@gmail.com" ? "admin" : "employee";
    const { error: profileError } = await supabase.from("profiles").insert([
      { id: data.user.id, email: data.user.email, role: makeAdmin }, // default role
    ]);

    if (profileError) return thunkAPI.rejectWithValue(profileError.message);

    return data.user;
  },
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, thunkAPI) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) return thunkAPI.rejectWithValue(error.message);

    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", data.user.id)
      .maybeSingle();

    console.log("profile:", profile);
    console.log("role:", profile?.role);
    console.log("profile>>>>>>", data.user);

    if (!profile) {
      console.log("null>>>>>>", data.user);
      // fallback: create profile if missing
      await supabase.from("profiles").insert([
        {
          id: data.user.id,
          email: data.user.email,
          role: data.user.email === "miki@gmail.com" ? "admin" : "employee",
        },
      ]);

      return {
        user: data.user,
        role: data.user.email === "miki@gmail.com" ? "admin" : "employee",
      };
    }
    console.log("user", data.user);

    return { user: data.user, role: profile.role };
  },
);

export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  await supabase.auth.signOut();
});

// authSlice.js
export const getCurrentUser = createAsyncThunk(
  "auth/getCurrentUser",
  async (_, thunkAPI) => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) return null;

    const user = session.user;

    // fetch role from profiles
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .maybeSingle();

    return {
      user,
      role: profile?.role || "employee",
    };
  },
);
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
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        console.log("pend", state);
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        console.log("fulfillled", action.payload);
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(signupUser.rejected, (state, action) => {
        console.log("rejected", action.payload);

        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        console.log("uuu", action.payload);

        state.user = action.payload.user;
        state.role = action.payload.role;
      })
      .addCase(loginUser.rejected, (state, action) => {
        console.log("failed", action.payload);

        state.loading = false;
        state.error = action.payload;
      })

      .addCase(logoutUser.fulfilled, (state) => {
        ((state.user = null), (state.role = null));
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        if (action.payload) {
          state.user = action.payload.user;
          state.role = action.payload.role;
        }
      });
  },
});

export default authSlice.reducer;
