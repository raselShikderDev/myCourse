import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Category } from '../../types';
import { categoryService } from '../../api/services';
import { getErrorMessage } from '../../utils/response';
import toast from 'react-hot-toast';

interface CategoriesState {
  items: Category[];
  loading: boolean;
  error: string | null;
}

const initialState: CategoriesState = { items: [], loading: false, error: null };

export const fetchCategories = createAsyncThunk(
  'categories/fetchAll',
  async (_, { getState, rejectWithValue }) => {
    const state = getState() as { categories: CategoriesState };
    if (state.categories.items.length > 0) return state.categories.items;
    try {
      return await categoryService.getAll();
    } catch (err) {
      return rejectWithValue(getErrorMessage(err));
    }
  }
);

export const createCategory = createAsyncThunk(
  'categories/create',
  async (data: Omit<Category, 'id'>, { rejectWithValue }) => {
    try {
      const cat = await categoryService.create(data);
      toast.success('Category created!');
      return cat;
    } catch (err) {
      toast.error(getErrorMessage(err));
      return rejectWithValue(getErrorMessage(err));
    }
  }
);

export const updateCategory = createAsyncThunk(
  'categories/update',
  async ({ id, data }: { id: number; data: Partial<Category> }, { rejectWithValue }) => {
    try {
      const cat = await categoryService.update(id, data);
      toast.success('Category updated!');
      return cat;
    } catch (err) {
      toast.error(getErrorMessage(err));
      return rejectWithValue(getErrorMessage(err));
    }
  }
);

export const deleteCategory = createAsyncThunk(
  'categories/delete',
  async (id: number, { rejectWithValue }) => {
    try {
      await categoryService.delete(id);
      toast.success('Category deleted!');
      return id;
    } catch (err) {
      toast.error(getErrorMessage(err));
      return rejectWithValue(getErrorMessage(err));
    }
  }
);

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    invalidateCategoriesCache(state) { state.items = []; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => { state.loading = true; })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        const idx = state.items.findIndex(c => c.id === action.payload.id);
        if (idx !== -1) state.items[idx] = action.payload;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.items = state.items.filter(c => c.id !== action.payload);
      });
  },
});

export const { invalidateCategoriesCache } = categoriesSlice.actions;
export default categoriesSlice.reducer;