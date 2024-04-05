import {configureStore} from '@reduxjs/toolkit';
import Profilelist from './Profilelist';
import Cart from './Cart';


const Store = configureStore({
  reducer: {
     Profiledata: Profilelist,
     Cartitem: Cart
  },
});
export default Store;
