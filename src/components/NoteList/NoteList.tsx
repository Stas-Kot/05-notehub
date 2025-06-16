import css from "./NoteList.module.css";
import type { Note } from "../../types/note";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNote } from "../../services/noteService";
import { useState } from "react";
import toast from "react-hot-toast";

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();
  const [loadingNoteId, setLoadingNoteId] = useState<number | null>(null);

  const { mutate, isPending } = useMutation({
    mutationFn: (id: number) => deleteNote(id),
    onMutate: (id: number) => {
      setLoadingNoteId(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["note"] });
      setLoadingNoteId(null);
    },
    onError: () => {
      setLoadingNoteId(null);
      toast.error("Something went wrong...Try again, please");
    },
  });

  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li key={note.id} className={css.listItem}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>
            <button
              className={css.button}
              onClick={() => mutate(note.id)}
              disabled={isPending && loadingNoteId === note.id}
            >
              {isPending && loadingNoteId === note.id ? "Deleting..." : "Delete"}
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
