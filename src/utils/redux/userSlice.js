import { createSlice } from "@reduxjs/toolkit";


const userSlice = createSlice({
    name: "user",
    initialState: {
        user: {
            id: 0,
            firstName: "Guest",
            lastName: "",
            email: "",
        },
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        emptyUser: (state) => {
            state.user = {
                id: 0,
                firstName: "Guest",
                lastName: "",
                email: "",
            };
        },
    },
});


export const { setUser, emptyUser } = userSlice.actions;
export default userSlice.reducer;