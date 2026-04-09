import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Course } from '../../types';
import { courseService } from '../../api/services';
import { getErrorMessage } from '../../utils/response';
import toast from 'react-hot-toast';

interface CoursesState {
  items: Course[];
  loading: boolean;
  error: string | null;
  lastFetched: number | null;
}

const initialState: CoursesState = {
  items: [],
  loading: false,
  error: null,
  lastFetched: null,
};

export const fetchCourses = createAsyncThunk(
  'courses/fetchAll',
  async (_, { getState, rejectWithValue }) => {
    const state = getState() as { courses: CoursesState };
    // Cache: skip if fetched within 60s
    if (state.courses.lastFetched && Date.now() - state.courses.lastFetched < 60000 && state.courses.items.length > 0) {
      return state.courses.items;
    }
    try {
      return await courseService.getAll();
    } catch (err) {
      return rejectWithValue(getErrorMessage(err));
    }
  }
);

export const createCourse = createAsyncThunk(
  'courses/create',
  async (data: Omit<Course, 'id'>, { rejectWithValue }) => {
    try {
      const course = await courseService.create(data);
      toast.success('Course created!');
      return course;
    } catch (err) {
      toast.error(getErrorMessage(err));
      return rejectWithValue(getErrorMessage(err));
    }
  }
);

export const updateCourse = createAsyncThunk(
  'courses/update',
  async ({ id, data }: { id: number; data: Partial<Course> }, { rejectWithValue }) => {
    try {
      const course = await courseService.update(id, data);
      toast.success('Course updated!');
      return course;
    } catch (err) {
      toast.error(getErrorMessage(err));
      return rejectWithValue(getErrorMessage(err));
    }
  }
);

export const deleteCourse = createAsyncThunk(
  'courses/delete',
  async (id: number, { rejectWithValue }) => {
    try {
      await courseService.delete(id);
      toast.success('Course deleted!');
      return id;
    } catch (err) {
      toast.error(getErrorMessage(err));
      return rejectWithValue(getErrorMessage(err));
    }
  }
);

const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    invalidateCache(state) { state.lastFetched = null; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.lastFetched = Date.now();
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createCourse.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(updateCourse.fulfilled, (state, action) => {
        const idx = state.items.findIndex(c => c.id === action.payload.id);
        if (idx !== -1) state.items[idx] = action.payload;
      })
      .addCase(deleteCourse.fulfilled, (state, action) => {
        state.items = state.items.filter(c => c.id !== action.payload);
      });
  },
});

export const { invalidateCache } = coursesSlice.actions;
export default coursesSlice.reducer;