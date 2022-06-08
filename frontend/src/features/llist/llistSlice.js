import firebaseApp from "../../firebaseInit";
import { getAuth } from "firebase/auth";

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import llistService from './llistService';

const auth = getAuth(firebaseApp);

const initialState = {
  llist: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  isUploading: false,
  isDeleting: false,
  message: '',
  llistSort: 'newest',
};

export const createL = createAsyncThunk('llist/create', async (LData, { getState, thunkAPI }) => {
  try {
    let currentUserToken = await auth.currentUser.getIdToken(true);
    let idToken = currentUserToken;

    return await llistService.createL(LData, idToken);

  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  };
});

export const getLlist = createAsyncThunk('llist/get', async (_, thunkAPI) => {
  try {
    return await llistService.getLlist();
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  };
});

export const deleteL = createAsyncThunk('llist/delete', async (id, thunkAPI) => {
  try {
    let currentUserToken = await auth.currentUser.getIdToken(true);
    let idToken = currentUserToken;

    return await llistService.deleteL(id, idToken);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  };
});

export const editL = createAsyncThunk('llist/edit', async (LData, thunkAPI) => {
  try {
    let currentUserToken = await auth.currentUser.getIdToken(true);
    let idToken = currentUserToken;

    return await llistService.editL(LData, idToken);

  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  };

});

export const uploadContentL = createAsyncThunk('llist/uploadingLContent', async (LData, thunkAPI) => {
  try {
    let currentUserToken = await auth.currentUser.getIdToken(true);
    let idToken = currentUserToken;

    return await llistService.uploadContentL(LData, idToken);

  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  };
});

export const llistSlice = createSlice({
  name: 'llist',
  initialState,
  reducers: {
    clearLlist: (state) => initialState,
    sortLlistNewest: (state) => {
      state.llist.sort().reverse();
      state.llistSort = 'newest';
    },
    sortLlistOldest: (state) => {
      state.llist.sort().reverse();
      state.llistSort = 'oldest';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createL.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.isUploading = true;
      })
      .addCase(createL.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.isUploading = false;
        if (state.llistSort === 'newest') {
          state.llist.unshift(action.payload);
        } else {
          state.llist.push(action.payload);
        }
      })
      .addCase(createL.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getLlist.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(getLlist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.llist = action.payload;
      })
      .addCase(getLlist.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteL.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.isDeleting = true;
      })
      .addCase(deleteL.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.isDeleting = false;
        state.llist = state.llist.filter((L) => L.l_id !== action.payload.id);
      })
      .addCase(deleteL.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(editL.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(editL.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.llist = state.llist.map((L) => {
          if (L.l_id === action.payload.l_id) {
            return action.payload;
          }
          return L;
        });
      })
      .addCase(editL.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(uploadContentL.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.isUploading = true;
      })
      .addCase(uploadContentL.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.isUploading = false;
      })
      .addCase(uploadContentL.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { clearLlist, sortLlistNewest, sortLlistOldest } = llistSlice.actions;
export default llistSlice.reducer;