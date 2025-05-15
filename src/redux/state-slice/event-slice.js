
import {createSlice} from "@reduxjs/toolkit";

export const eventSlice= createSlice ({
  name: "event",
    initialState: {
      All: [],
    },
    reducers: {
      SetAll: (state, action) => {
          state.All = action.payload;
      }
    }
})

export const {SetAll} = eventSlice.actions;

export default eventSlice.reducer;