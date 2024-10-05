import { MAX_BUTTONS } from "@utils/constants";

interface IPaginationProps {
  currentPage: number;
  totalPages: number;
  paginate: (pageNumber: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  paginate,
}: IPaginationProps): JSX.Element {
  const halfMaxButtons = Math.floor(MAX_BUTTONS / 2);

  let startPage = Math.max(1, currentPage - halfMaxButtons);
  let endPage = Math.min(totalPages, currentPage + halfMaxButtons);

  if (endPage - startPage < MAX_BUTTONS - 1) {
    if (startPage === 1) {
      endPage = Math.min(MAX_BUTTONS, totalPages);
    } else if (endPage === totalPages) {
      startPage = Math.max(1, totalPages - MAX_BUTTONS + 1);
    }
  }

  return (
    <nav aria-label='Page navigation example'>
      <ul className='inline-flex -space-x-px text-sm'>
        <li>
          <a
            onClick={() => paginate(currentPage - 1)}
            className={`flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg cursor-pointer hover:bg-gray-100 hover:text-gray-700 ${
              currentPage === 1 ? "cursor-not-allowed text-gray-300" : ""
            }`}
            aria-disabled={currentPage === 1}
          >
            Previous
          </a>
        </li>
        {startPage > 1 && (
          <>
            <li>
              <a
                onClick={() => paginate(1)}
                className='flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 '
              >
                1
              </a>
            </li>
            {startPage > 2 && (
              <span className='flex items-center justify-center px-4 h-10 text-gray-500'>
                ...
              </span>
            )}
          </>
        )}
        {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
          <li key={startPage + index}>
            <a
              onClick={() => paginate(startPage + index)}
              className={`flex items-center justify-center px-4 h-10 leading-tight ${
                currentPage === startPage + index
                  ? "text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700"
                  : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
              } `}
            >
              {startPage + index}
            </a>
          </li>
        ))}
        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && (
              <span className='flex items-center justify-center px-4 h-10 text-gray-500'>
                ...
              </span>
            )}
            <li>
              <a
                onClick={() => paginate(totalPages)}
                className='flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 '
              >
                {totalPages}
              </a>
            </li>
          </>
        )}
        <li>
          <a
            onClick={() => paginate(currentPage + 1)}
            className={`flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg cursor-pointer hover:bg-gray-100 hover:text-gray-700 ${
              currentPage === totalPages
                ? "cursor-not-allowed text-gray-300"
                : ""
            }`}
            aria-disabled={currentPage === totalPages}
          >
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
}
