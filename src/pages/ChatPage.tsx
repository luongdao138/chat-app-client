import { useEffect, useState } from 'react';
import axiosClient from '../api/axiosClient';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import ChatHeader from '../components/ChatHeader';
import ChatMessages from '../components/ChatMessages';
import ChatSidebar from '../components/ChatSidebar';
import Loading from '../components/Loading';
import { useSocketContext } from '../context/socket';
import { getChannels } from '../features/channel/action';
import { fetch } from '../features/channelDetail/channelDetailSlice';
import { fetchAll } from '../features/message/messageSlice';
import useFetchUser from '../hooks/useFetchUser';
import { Content } from './styles/ChatStyle';

const ChatPage = () => {
  const { loading } = useFetchUser();
  const [isAllChannel, setIsAllChannel] = useState<boolean>(true);
  const [isShowLeft, setIsShowLeft] = useState<boolean>(false);
  const { selectedChannel, setSelectedChannel, socket } = useSocketContext();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getChannels());

    return () => {
      if (selectedChannel) {
        setSelectedChannel(null);
        socket?.emit('leaveChannel', {
          user_id: user._id,
          channel_id: selectedChannel,
        });
      }
    };
  }, [dispatch]);

  useEffect(() => {
    if (selectedChannel) {
      const getChannelDetail = async () => {
        const res = await axiosClient().get(`/channels/${selectedChannel}`);
        dispatch(fetch(res.data));
      };
      const getMessages = async () => {
        const res = await axiosClient().get(`/messages/${selectedChannel}`);
        dispatch(fetchAll(res.data));
      };

      getChannelDetail();
      getMessages();
    }
  }, [selectedChannel, dispatch]);

  if (loading) return <Loading />;
  return (
    <>
      <ChatHeader
        isAllChannel={isAllChannel}
        setIsAllChannel={setIsAllChannel}
        isShowLeft={isShowLeft}
        setIsShowLeft={setIsShowLeft}
      />
      <Content>
        <ChatSidebar
          isShowLeft={isShowLeft}
          isAllChannel={isAllChannel}
          setIsAllChannel={setIsAllChannel}
        />
        <ChatMessages />
      </Content>
    </>
  );
};

export default ChatPage;
