import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  fetchCategories, createCategory, updateCategory, deleteCategory,
} from '../../features/categories/categoriesSlice';
import { Category } from '../../types';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Textarea } from '../../components/ui/Textarea';
import { Modal } from '../../components/ui/Modal';
import { EmptyState } from '../../components/ui/EmptyState';
import { TableSkeleton } from '../../components/ui/Skeleton';

const schema = z.object({
  name: z.string().min(1, 'Name required'),
  description: z.string().optional(),
});
type FormData = z.infer<typeof schema>;

export const CategoriesPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, loading } = useAppSelector(s => s.categories);
  const courses = useAppSelector(s => s.courses.items);

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Category | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const openCreate = () => { setEditing(null); reset({}); setModalOpen(true); };
  const openEdit = (cat: Category) => {
    setEditing(cat);
    reset({ name: cat.name, description: cat.description ?? '' });
    setModalOpen(true);
  };

  const onSubmit = async (data: FormData) => {
    setSubmitting(true);
    if (editing) await dispatch(updateCategory({ id: editing.id, data }));
    else await dispatch(createCategory(data));
    setSubmitting(false);
    setModalOpen(false);
  };

  const handleDelete = async (id: number) => {
    await dispatch(deleteCategory(id));
    setDeleteId(null);
  };

  const courseCount = (catId: number) => courses.filter(c => c.categoryId === catId).length;

  return (
    <div className="space-y-5 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Categories</h1>
          <p className="text-sm text-slate-500">{items.length} categories</p>
        </div>
        <Button onClick={openCreate}>+ New Category</Button>
      </div>

      {loading ? (
        <div className="bg-white rounded-xl border border-surface-200 shadow-card">
          <TableSkeleton />
        </div>
      ) : items.length === 0 ? (
        <div className="bg-white rounded-xl border border-surface-200 shadow-card">
          <EmptyState
            icon="🏷️"
            title="No categories yet"
            description="Organize your courses with categories."
            action={<Button onClick={openCreate} size="sm">+ New Category</Button>}
          />
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block bg-white rounded-xl border border-surface-200 shadow-card overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-surface-50 border-b border-surface-200">
                  <th className="text-left px-5 py-3 font-medium text-slate-500">Name</th>
                  <th className="text-left px-5 py-3 font-medium text-slate-500">Description</th>
                  <th className="text-left px-5 py-3 font-medium text-slate-500">Courses</th>
                  <th className="px-5 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-100">
                {items.map(cat => (
                  <tr key={cat.id} className="hover:bg-surface-50 transition-colors">
                    <td className="px-5 py-3.5 font-medium text-slate-900">{cat.name}</td>
                    <td className="px-5 py-3.5 text-slate-500 max-w-xs truncate">
                      {cat.description ?? '—'}
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-surface-100 text-slate-600">
                        {courseCount(cat.id)} courses
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2 justify-end">
                        <Button size="sm" variant="secondary" onClick={() => openEdit(cat)}>Edit</Button>
                        <Button size="sm" variant="danger" onClick={() => setDeleteId(cat.id)}>Delete</Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden grid gap-3">
            {items.map(cat => (
              <div key={cat.id} className="bg-white rounded-xl border border-surface-200 shadow-card p-4">
                <div className="flex items-start justify-between mb-1">
                  <p className="font-semibold text-slate-900">{cat.name}</p>
                  <span className="text-xs bg-surface-100 text-slate-500 rounded-full px-2 py-0.5">{courseCount(cat.id)} courses</span>
                </div>
                {cat.description && <p className="text-sm text-slate-400 mb-3">{cat.description}</p>}
                <div className="flex gap-2">
                  <Button size="sm" variant="secondary" onClick={() => openEdit(cat)} className="flex-1">Edit</Button>
                  <Button size="sm" variant="danger" onClick={() => setDeleteId(cat.id)} className="flex-1">Delete</Button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Category' : 'New Category'} size="sm">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input label="Name" placeholder="e.g. Web Development" error={errors.name?.message} {...register('name')} />
          <Textarea label="Description" placeholder="Optional description..." {...register('description')} />
          <div className="flex gap-3 pt-2">
            <Button type="button" variant="secondary" onClick={() => setModalOpen(false)} className="flex-1">Cancel</Button>
            <Button type="submit" loading={submitting} className="flex-1">
              {editing ? 'Save Changes' : 'Create'}
            </Button>
          </div>
        </form>
      </Modal>

      <Modal open={deleteId !== null} onClose={() => setDeleteId(null)} title="Delete Category" size="sm">
        <p className="text-sm text-slate-600 mb-5">Delete this category? Courses in it will become uncategorized.</p>
        <div className="flex gap-3">
          <Button variant="secondary" onClick={() => setDeleteId(null)} className="flex-1">Cancel</Button>
          <Button variant="danger" onClick={() => deleteId && handleDelete(deleteId)} className="flex-1">Delete</Button>
        </div>
      </Modal>
    </div>
  );
};