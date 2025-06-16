import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import css from "./App.module.css";
import { fetchNotes } from "../../services/noteService";
import NoteList from "../NoteList/NoteList";
import NoteModal from "../NoteModal/NoteModal";
import Pagination from "../Pagination/Pagination";
import SearchBox from "../SearchBox/SearchBox";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { Toaster } from "react-hot-toast";

function App() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [debouncedSearch] = useDebounce(search, 300);

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["note", debouncedSearch, page],
    queryFn: () => fetchNotes(debouncedSearch, page),
    placeholderData: keepPreviousData,
  });

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const totalPages = data?.totalPages || 0;
  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };
  const handlePageChange = (value: number) => {setPage(value);}

  return (
    <div className={css.app}>
      <Toaster />
      <header className={css.toolbar}>
        <SearchBox value={search} onSearch={handleSearch} />
        {isSuccess && data?.totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            onPageChange={handlePageChange}
            page={page}
          />
        )}
        {
          <button className={css.button} onClick={openModal}>
            Create note +
          </button>
        }
      </header>
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {isSuccess && data.notes.length > 0 && <NoteList notes={data.notes} />}
      {isOpen && <NoteModal onClose={closeModal} isLoading={isLoading} />}
    </div>
  );
}

export default App;
