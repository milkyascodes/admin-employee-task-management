import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import usersReducer from "../features/users/userSlice";
import tasksReducer from "../features/tasks/taskSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    tasks: tasksReducer,
  },
});
