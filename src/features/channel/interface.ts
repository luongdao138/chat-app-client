export interface Channel {
  _id: string;
  name: string;
}

export interface SliceType {
  list: Channel[];
  loading: boolean;
  error: string | null;
}

export interface AddChannelFormType {
  name: string;
  description: string;
}
