import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, thunkAPI) => {
    try {
      const data = await fetch(
        'https://6496330b83d4c69925a2ae66.mockapi.io/contacts/contacts/'
      );
      const response = await data.json();
      return response;
    } catch (e) {
      thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (text, thunkAPI) => {
    console.log(JSON.stringify({ name: text.name, number: text.number }));
    try {
      const data = await fetch(
        'https://6496330b83d4c69925a2ae66.mockapi.io/contacts/contacts/',
        {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ name: text.name, number: text.number })
        }
      );
      const response = await data.json();
      
      return response;
    } catch (e) {
      thunkAPI.rejectWithValue(e.message);
    }
  }
);
