import { ToolTip } from "@components/tooltip";
import { IPost } from "@interfaces/post.interface";
import { MdDeleteOutline, MdOutlineEdit } from "react-icons/md";

interface IPostRowProps {
  row: IPost;
  showActions: boolean;
  onEdit: (post: IPost) => void;
  onDelete: (post: IPost) => void;
}

export function PostRow({
  row,
  showActions,
  onEdit,
  onDelete,
}: IPostRowProps): JSX.Element {
  return (
    <>
      <td className='px-4 py-3'>{row.id}</td>
      <td className='px-4 py-3'>{row.title}</td>
      <td className='px-4 py-3'>{row.body}</td>
      {showActions && (
        <td className='px-4 py-3'>
          <ToolTip content="Editar">
            <button
              onClick={() => onEdit(row)}
              className='mr-2 text-blue-600 hover:underline'
            >
              <MdOutlineEdit size={20} />
            </button>
          </ToolTip>
          <ToolTip content="Eliminar">
            <button
              onClick={() => onDelete(row)}
              className='text-red-600 hover:underline'
            >
              <MdDeleteOutline size={20} />
            </button>
          </ToolTip>
        </td>
      )}
    </>
  );
}
