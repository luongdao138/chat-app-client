export interface Message {
  _id: string;
  channel: string;
  createdAt: Date;
  text: string;
  sender: {
    display_name: string;
    photo: string;
    _id: string;
  };
}

export interface SliceType {
  list: Message[];
}
