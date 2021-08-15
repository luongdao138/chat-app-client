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
  const [loadingData, setLoadingData] = useState(false);

  useEffect(() => {
    dispatch(getChannels());

    return () => {
      if (selectedChannel) {
        console.log('OK');
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
      const getData = async () => {
        setLoadingData(true);
        const res1 = await axiosClient().get(`/channels/${selectedChannel}`);
        const res2 = await axiosClient().get(`/messages/${selectedChannel}`);
        dispatch(fetch(res1.data));
        dispatch(fetchAll(res2.data));
        setLoadingData(false);
      };
      getData();
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
          loading={loadingData}
          setLoading={setLoadingData}
        />
        <ChatMessages loading={loadingData} />
      </Content>
    </>
  );
};

export default ChatPage;
