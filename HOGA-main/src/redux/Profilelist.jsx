import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getAllData = createAsyncThunk(
  "Items",
  async (args, { rejectWithValue }) => {
    try {
      const res = await fetch(
        "https://hogamilan-374c2-default-rtdb.firebaseio.com/hogamilan.json"
      );
      const response = await res.json();
      const usersWithId = Object.entries(response).map(([key, value]) => ({
        id: key,
        ...value,
      }));
      return usersWithId;
    } catch (error) {
      return rejectWithValue("data not found");
    }
  }
);

export const Profilelist = createSlice({
  name: "Items",
  initialState: [],
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  
  reducers: [],
  extraReducers: (builder) => {
    builder
      .addCase(getAllData.pending, (state) => {
        state.loading = true; 
      })
      .addCase(getAllData.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(getAllData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; // Accessing error message from action.error
      });
  }
});

export default Profilelist.reducer;
// https://jsonplaceholder.typicode.com/posts
// export default Mainslice.reducer;
// export const {addUser, removeUser} = Mainslice.actions;


// 