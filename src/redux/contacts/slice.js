import { fetchContacts, addContact, deleteContact } from '../operations';
const { createSlice } = require('@reduxjs/toolkit');

const contactsInitialState = {
  items: [],
  isLoading: false,
  error: null,
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: contactsInitialState,
  reducers: {},
  extraReducers: {
    [fetchContacts.pending](state) {
      state.isLoading = true;
    },

    [fetchContacts.fulfilled](state, { payload }) {
      state.isLoading = false;
      state.error = null;
      state.items = payload;
    },

    [fetchContacts.rejected](state, { payload }) {
      state.isLoading = false;
      state.error = payload;
    },

    [addContact.pending](state) {
      state.isLoading = true;
    },

    [addContact.fulfilled](state, { payload }) {
      state.isLoading = false;
      state.error = null;
      state.items.push(payload);
    },

    [addContact.rejected](state, { payload }) {
      state.isLoading = false;
      state.error = payload;
    },

    [deleteContact.pending](state) {
      state.isLoading = true;
    },

    [deleteContact.fulfilled](state, { payload }) {
      state.isLoading = false;
      state.error = null;
      const idx = state.items.findIndex(contact => contact.id === payload);
      state.items.splice(idx, 1);
    },

    [deleteContact.rejected](state, { payload }) {
      state.isLoading = false;
      state.error = payload;
    },
  },
});

export const contactsReducer = contactsSlice.reducer;
