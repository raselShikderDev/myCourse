import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchCourses, createCourse, updateCourse, deleteCourse } from '../../features/courses/coursesSlice';
import { fetchCategories } from '../../features/categories/categoriesSlice';
import { Course } from '../../types';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Modal } from '../../components/ui/Modal';
import { Select } from '../../components/ui/Select';
import { Textarea } from '../../components/ui/Textarea';
import { EmptyState } from '../../components/ui/EmptyState';
import { TableSkeleton } from '../../components/ui/Skeleton';
import { Badge } from '../../components/ui/Badge';

const schema = z.object({
  title: z.string().min(1, 'Title required').max(150, 'Max 150 chars'),
  description: z.string().optional(),
  categoryId: z.coerce.number().min(1, 'Category required'),
  price: z.coerce.number().min(0, 'Must be ≥ 0').optional(),
  durationHours: z.coerce.number().min(0).optional(),
  lectures: z.coerce.number().min(0).optional(),
  startAt: z.string().optional(),
  endAt: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export const CoursesPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items: courses, loading } = useAppSelector(s => s.courses);
  const { items: categories } = useAppSelector(s => s.categories);

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Course | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [filterCat, setFilterCat] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    dispatch(fetchCourses());
    dispatch(fetchCategories());
  }, [dispatch]);

  const openCreate = () => { setEditing(null); reset({}); setModalOpen(true); };
  const openEdit = (course: Course) => {
    setEditing(course);
    reset({
      title: course.title,
      description: course.description ?? '',
      categoryId: course.categoryId,
      price: course.price,
      durationHours: course.durationHours,
      lectures: course.lectures,
      startAt: course.startAt?.slice(0, 10) ?? '',
      endAt: course.endAt?.slice(0, 10) ?? '',
    });
    setModalOpen(true);
  };

  const onSubmit = async (data: FormData) => {
    setSubmitting(true);
    if (editing) {
      await dispatch(updateCourse({ id: editing.id, data }));
    } else {
      await dispatch(createCourse(data as Omit<Course, 'id'>));
    }
    setSubmitting(false);
    setModalOpen(false);
    reset({});
  };

  const handleDelete = async (id: number) => {
    await dispatch(deleteCourse(id));
    setDeleteId(null);
  };

  const filtered = filterCat
    ? courses.filter(c => c.categoryId === Number(filterCat))
    : courses;

  const catOptions = categories.map(c => ({ value: c.id, label: c.name }));
  const filterOptions = [{ value: '', label: 'All Categories' }, ...catOptions];

  return (
    <div className="space-y-5 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Courses</h1>
          <p className="text-sm text-slate-500">{courses.length} total courses</p>
        </div>
        <Button onClick={openCreate}>+ New Course</Button>
      </div>

      {/* Filter */}
      <div className="flex items-center gap-3">
        <select
          value={filterCat}
          onChange={e => setFilterCat(e.target.value)}
          className="text-sm border border-surface-300 rounded-lg px-3 py-2 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
        >
          {filterOptions.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        {filterCat && (
          <button
            onClick={() => setFilterCat('')}
            className="text-xs text-slate-400 hover:text-slate-600"
          >Clear ✕</button>
        )}
      </div>

      {/* Content */}
      {loading ? (
        <div className="bg-white rounded-xl border border-surface-200 shadow-card">
          <TableSkeleton />
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-xl border border-surface-200 shadow-card">
          <EmptyState
            icon="📚"
            title="No courses yet"
            description="Create your first course to get started."
            action={<Button onClick={openCreate} size="sm">+ New Course</Button>}
          />
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block bg-white rounded-xl border border-surface-200 shadow-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-surface-50 border-b border-surface-200">
                    <th className="text-left px-5 py-3 font-medium text-slate-500">Title</th>
                    <th className="text-left px-5 py-3 font-medium text-slate-500">Category</th>
                    <th className="text-left px-5 py-3 font-medium text-slate-500">Price</th>
                    <th className="text-left px-5 py-3 font-medium text-slate-500">Duration</th>
                    <th className="text-left px-5 py-3 font-medium text-slate-500">Lectures</th>
                    <th className="px-5 py-3" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-100">
                  {filtered.map(course => {
                    const cat = categories.find(c => c.id === course.categoryId);
                    return (
                      <tr key={course.id} className="hover:bg-surface-50 transition-colors">
                        <td className="px-5 py-3.5">
                          <p className="font-medium text-slate-900 truncate max-w-[200px]">{course.title}</p>
                          {course.description && (
                            <p className="text-xs text-slate-400 truncate max-w-[200px]">{course.description}</p>
                          )}
                        </td>
                        <td className="px-5 py-3.5">
                          {cat ? <Badge variant="info">{cat.name}</Badge> : <Badge>—</Badge>}
                        </td>
                        <td className="px-5 py-3.5 text-slate-700">
                          {course.price !== undefined ? `$${course.price}` : '—'}
                        </td>
                        <td className="px-5 py-3.5 text-slate-700">
                          {course.durationHours !== undefined ? `${course.durationHours}h` : '—'}
                        </td>
                        <td className="px-5 py-3.5 text-slate-700">
                          {course.lectures ?? '—'}
                        </td>
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-2 justify-end">
                            <Button size="sm" variant="secondary" onClick={() => openEdit(course)}>Edit</Button>
                            <Button size="sm" variant="danger" onClick={() => setDeleteId(course.id)}>Delete</Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden grid gap-3">
            {filtered.map(course => {
              const cat = categories.find(c => c.id === course.categoryId);
              return (
                <div key={course.id} className="bg-white rounded-xl border border-surface-200 shadow-card p-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="min-w-0">
                      <p className="font-semibold text-slate-900 truncate">{course.title}</p>
                      {cat && <Badge variant="info" >{cat.name}</Badge>}
                    </div>
                    {course.price !== undefined && (
                      <span className="text-sm font-bold text-emerald-600 shrink-0">${course.price}</span>
                    )}
                  </div>
                  {course.description && (
                    <p className="text-xs text-slate-400 mb-3 line-clamp-2">{course.description}</p>
                  )}
                  <div className="flex items-center gap-3 text-xs text-slate-400 mb-3">
                    {course.durationHours !== undefined && <span>⏱ {course.durationHours}h</span>}
                    {course.lectures !== undefined && <span>📖 {course.lectures} lectures</span>}
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="secondary" onClick={() => openEdit(course)} className="flex-1">Edit</Button>
                    <Button size="sm" variant="danger" onClick={() => setDeleteId(course.id)} className="flex-1">Delete</Button>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* Create/Edit Modal */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? 'Edit Course' : 'New Course'}
        size="lg"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input label="Title" placeholder="e.g. React for Beginners" error={errors.title?.message} {...register('title')} />
          <Textarea label="Description" placeholder="Brief overview..." {...register('description')} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select
              label="Category"
              options={catOptions}
              placeholder="Select category"
              error={errors.categoryId?.message}
              {...register('categoryId')}
            />
            <Input label="Price ($)" type="number" step="0.01" placeholder="0.00" error={errors.price?.message} {...register('price')} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Duration (hours)" type="number" placeholder="e.g. 10" {...register('durationHours')} />
            <Input label="Lectures" type="number" placeholder="e.g. 24" {...register('lectures')} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Start Date" type="date" {...register('startAt')} />
            <Input label="End Date" type="date" {...register('endAt')} />
          </div>
          <div className="flex gap-3 pt-2">
            <Button type="button" variant="secondary" onClick={() => setModalOpen(false)} className="flex-1">Cancel</Button>
            <Button type="submit" loading={submitting} className="flex-1">
              {editing ? 'Save Changes' : 'Create Course'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirm Modal */}
      <Modal open={deleteId !== null} onClose={() => setDeleteId(null)} title="Delete Course" size="sm">
        <p className="text-sm text-slate-600 mb-5">
          Are you sure you want to delete this course? This action cannot be undone.
        </p>
        <div className="flex gap-3">
          <Button variant="secondary" onClick={() => setDeleteId(null)} className="flex-1">Cancel</Button>
          <Button variant="danger" onClick={() => deleteId && handleDelete(deleteId)} className="flex-1">Delete</Button>
        </div>
      </Modal>
    </div>
  );
};