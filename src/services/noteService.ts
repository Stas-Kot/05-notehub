import axios from "axios";
import type { NewNote, Note } from "../types/note";

interface GetNotesRes {
  notes: Note[];
  totalPages: number;
}
axios.defaults.baseURL = "https://notehub-public.goit.study/api/notes";
const myKey = import.meta.env.VITE_NOTEHUB_TOKEN;
const PER_PAGE = 12;

const fetchNotes = async (
  search: string,
  page: number
): Promise<GetNotesRes> => {
  try {
    const response = await axios.get<GetNotesRes>("/", {
      params: {
        page,
        perPage: PER_PAGE,
        ...(search !== "" && { search: search }),
      },
      headers: {
        Authorization: `Bearer ${myKey}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch notes:", error);
    throw new Error("Failed to fetch notes. Please try again later.");
  }
};

const deleteNote = async (noteId: number): Promise<Note> => {
  try {
    const response = await axios.delete<Note>(`/${noteId}`, {
      headers: {
        Authorization: `Bearer ${myKey}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to delete note:", error);
    throw new Error("Failed to delete note. Please try again later.");
  }
};

const createNote = async (newNote: NewNote): Promise<Note> => {
  try {
    const response = await axios.post<Note>("/", newNote, {
      headers: {
        Authorization: `Bearer ${myKey}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to create note:", error);
    throw new Error("Failed to create note. Please try again later.");
  }
};

export { fetchNotes, deleteNote, createNote };
