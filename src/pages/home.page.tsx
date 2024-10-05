import {
  Button,
  Modal,
  ModalAlert,
  Pagination,
  PostForm,
  PostRow,
  Table,
} from "@components";
import { useModal, usePagination } from "@hooks";
import { ERole, IPost } from "@interfaces";
import { deletePost, fetchPosts } from "@redux/slices/post.slice";
import { RootState, useAppDispatch } from "@redux/store";
import { COLUMNS_POST } from "@utils/constants";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export function Home(): JSX.Element {
  const dispatch = useAppDispatch();
  const { posts, loading } = useSelector((state: RootState) => state.post);
  const { user } = useSelector((state: RootState) => state.auth);
  const formModal = useModal();
  const deleteModal = useModal();
  const itemsPerPage = 5;
  const { currentPage, totalPages, paginate, currentItems } = usePagination(
    posts,
    itemsPerPage
  );
  const [currentPost, setCurrentPost] = useState<IPost | null>(null);

  const columns =
    user?.role === ERole.Admin
      ? [...COLUMNS_POST, { Header: "Acciones", accessor: "actions" }]
      : COLUMNS_POST;

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleDelete = (post: IPost) => {
    setCurrentPost(post);
    deleteModal.openModal();
  };

  const handleEdit = (post: IPost) => {
    formModal.openModal();
    setCurrentPost(post);
  };

  const handleCreate = () => {
    setCurrentPost(null);
    formModal.openModal();
  };

  const renderCustomRow = (row: IPost) => (
    <PostRow
      key={row.id}
      row={row}
      showActions={user?.role === ERole.Admin}
      onDelete={() => handleDelete(row)}
      onEdit={() => handleEdit(row)}
    />
  );

  const handleConfirmDelete = async () => {
    try {
      if (currentPost) await dispatch(deletePost(currentPost.id)).unwrap();
      toast.success(`Se eliminó el post de forma exitosa `);
    } catch (error) {
      console.error(error);
      toast.error(`Ocurrió un error eliminando el post `);
    } finally {
      deleteModal.closeModal();
    }
  };

  return (
    <div className='container mx-auto p-6'>
      <div className='flex justify-between'>
        <h1 className='text-2xl font-bold mb-4'>Lista de publicaciones</h1>
        {user?.role === ERole.Admin && (
          <div>
            <Button onClick={handleCreate}>Crear Post</Button>
          </div>
        )}
      </div>
      <Table
        data={currentItems()}
        columns={columns}
        renderRow={renderCustomRow}
        isLoading={loading}
      />
      {!loading && (
        <div className='w-full flex justify-center mt-5'>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            paginate={paginate}
          />
        </div>
      )}

      <Modal
        isOpen={formModal.isOpen}
        onClose={() => {
          formModal.closeModal();
        }}
        title={currentPost ? "Editar publicación" : "Crear publicación"}
      >
        <PostForm
          post={currentPost}
          onClose={() => {
            formModal.closeModal();
          }}
        />
      </Modal>
      <ModalAlert
        isOpen={deleteModal.isOpen}
        onClose={deleteModal.closeModal}
        title='Eliminar Post'
        description='seguro que desea eliminar el post?'
        onOk={handleConfirmDelete}
      />
    </div>
  );
}
