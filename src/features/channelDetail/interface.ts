export interface ChannelDetail {
  _id: string;
  name: string;
  description: string;
  members: [
    {
      user: {
        display_name: string;
        photo: string;
        _id: string;
      };
      socket: string;
    }
  ];
}

export interface SliceType {
  detail: ChannelDetail;
}
