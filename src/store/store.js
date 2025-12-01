import {configureStore} from '@reduxjs/toolkit';
import authSlice from './authSlice'; // Assuming you have an authSlice defined in authSlice.js
const store = configureStore({
    reducer: {
      auth: authSlice, 
    },

});
export default store;