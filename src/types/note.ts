export interface Note {
  id: number;
  title: string;
  content: string;
  tag: Tag;
}

export interface NewNote {
  title: string;
  content?: string;
  tag: Tag;
}

export type Tag = "Work" | "Todo" | "Personal" | "Meeting" | "Shopping";