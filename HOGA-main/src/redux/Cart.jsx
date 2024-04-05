import {createSlice} from '@reduxjs/toolkit';
const Cart = createSlice({
  name: 'Cartitem',
  initialState:[],
  reducers: {
    addUser(state, action) {
      console.log(action.payload, 'datakareya');
      return action.payload

    },
  },
});

export default Cart.reducer;
export const {addUser} = Cart.actions;
