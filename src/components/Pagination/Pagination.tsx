import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";

interface PaginationProps {
  totalPages: number;
  onPageChange: (numberOfPage: number) => void;
  page: number;
}

export default function Pagination({ totalPages, onPageChange, page }: PaginationProps) {
  return (
    <ReactPaginate
      pageCount={totalPages ?? 0}
      pageRangeDisplayed={5}
      marginPagesDisplayed={1}
      onPageChange={({ selected }) => onPageChange(selected + 1)}
      forcePage={page - 1}
      containerClassName={css.pagination}
      activeClassName={css.active}
      nextLabel="→"
      previousLabel="←"
    />
  );
}
