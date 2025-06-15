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

function App() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [debouncedSearch] = useDebounce(search, 300)

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["note", debouncedSearch, page],
    queryFn: () => fetchNotes(debouncedSearch, page),
    placeholderData: keepPreviousData,
  });

  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false);
  const totalPages = data?.totalPages || 0;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={search} onSearch={setSearch} />
        {isSuccess && data?.totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            pageHandler={setPage}
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
      {isOpen && <NoteModal onClose={closeModal} />}
    </div>
  );
}

export default App;
