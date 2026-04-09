import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Enrollment } from '../../types';
import { enrollmentService } from '../../api/services';
import { getErrorMessage } from '../../utils/response';
import toast from 'react-hot-toast';

interface EnrollmentsState {
  items: Enrollment[];
  loading: boolean;
  error: string | null;
}

const initialState: EnrollmentsState = { items: [], loading: false, error: null };

export const fetchEnrollments = createAsyncThunk(
  'enrollments/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      return await enrollmentService.getAll();
    } catch (err) {
      return rejectWithValue(getErrorMessage(err));
    }
  }
);

export const enrollInCourse = createAsyncThunk(
  'enrollments/enroll',
  async (courseId: number, { rejectWithValue }) => {
    try {
      const enrollment = await enrollmentService.enroll(courseId);
      toast.success('Enrolled successfully!');
      return enrollment;
    } catch (err) {
      toast.error(getErrorMessage(err));
      return rejectWithValue(getErrorMessage(err));
    }
  }
);

const enrollmentsSlice = createSlice({
  name: 'enrollments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEnrollments.pending, (state) => { state.loading = true; })
      .addCase(fetchEnrollments.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchEnrollments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(enrollInCourse.fulfilled, (state, action) => {
        state.items.push(action.payload);
      });
  },
});

export default enrollmentsSlice.reducer;