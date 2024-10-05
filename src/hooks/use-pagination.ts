import { useState } from "react";

export function usePagination<T>(initialItems: T[], itemsPerPage: number) {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const totalPages = Math.ceil(initialItems?.length / itemsPerPage);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const currentItems = () => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return initialItems?.slice(indexOfFirstItem, indexOfLastItem);
  };

  return {
    currentPage,
    totalPages,
    paginate,
    currentItems,
  };
}
