import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { User } from '../../types';
import { userService } from '../../api/services';
import { getErrorMessage } from '../../utils/response';

interface UsersState {
  items: User[];
  loading: boolean;
  error: string | null;
}

const initialState: UsersState = { items: [], loading: false, error: null };

export const fetchUsers = createAsyncThunk(
  'users/fetchAll',
  async (_, { getState, rejectWithValue }) => {
    const state = getState() as { users: UsersState };
    if (state.users.items.length > 0) return state.users.items;
    try {
      return await userService.getAll();
    } catch (err) {
      return rejectWithValue(getErrorMessage(err));
    }
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => { state.loading = true; })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default usersSlice.reducer;