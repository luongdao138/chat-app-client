import { useState, MouseEvent, useRef, useEffect } from 'react';
import { FaCaretDown, FaCaretUp, FaUserCircle } from 'react-icons/fa';
import { MdExitToApp, MdGroup, MdSearch } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { logout } from '../../features/auth/authSlice';
import useEventListener from '../../hooks/useEventListener';
import { MenuWrapper, Wrapper } from './ChatSidebar.styles';
import no_user from '../../assets/no_user.png';
import { useSocketContext } from '../../context/socket';
import { Spinner } from '../Spinner/Spinner.styles';
import axiosClient from '../../api/axiosClient';
import { search } from '../../features/channel/channelSlice';

interface Props {
  isAllChannel: boolean;
  setIsAllChannel: React.Dispatch<React.SetStateAction<boolean>>;
  isShowLeft: boolean;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  // setIsShowLeft: React.Dispatch<React.SetStateAction<boolean>>
}

const ChatSidebar = ({
  isShowLeft,
  isAllChannel,
  setIsAllChannel,
  loading,
  setLoading,
}: Props) => {
  const { selectedChannel, setSelectedChannel } = useSocketContext();
  const [isShowMenu, setIsShowMenu] = useState<boolean>(false);
  const [temp, setTemp] = useState<string>('');
  const ref = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const dispatch = useDispatch();
  const history = useHistory();

  const { user } = useAppSelector((state) => state.auth);
  const { list } = useAppSelector((state) => state.channel);
  const { detail: channelDetail } = useAppSelector(
    (state) => state.channelDetail
  );
  const { socket } = useSocketContext();

  const handleLogout = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    dispatch(logout());
    history.push('/login');
  };

  const handleJoinRoom = (channel_id: string) => {
    if (selectedChannel) {
      socket.emit('leaveChannel', {
        channel_id: selectedChannel,
        user_id: user._id,
      });
    }
    socket?.emit('joinChannel', { channel_id, user_id: user._id }, () => {
      setSelectedChannel(channel_id);
      setIsAllChannel(false);
    });
  };

  useEventListener('mousedown', window, (e) => {
    if (
      !ref.current?.contains(e.target) &&
      !buttonRef.current?.contains(e.target)
    ) {
      setIsShowMenu(false);
    }
  });

  useEffect(() => {
    const timeout = setTimeout(async () => {
      const res = await axiosClient().get('/channels/search', {
        params: {
          searchTerm: temp,
        },
      });
      dispatch(search(res.data));
      console.log(res);
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [temp]);

  if (loading) {
    return (
      <Wrapper isShowLeft={isShowLeft}>
        <div
          style={{
            display: 'flex',
            marginTop: '30px',
            width: '100%',
            justifyContent: 'center',
          }}
        >
          <Spinner />
        </div>
      </Wrapper>
    );
  }

  return (
    <Wrapper isShowLeft={isShowLeft}>
      {!isAllChannel ? (
        <>
          <p className='channel-name'>{channelDetail.name}</p>
          <p className='channel-desc'>{channelDetail.description}</p>
          <div className='channel-mems'>
            <p className='title'>Members</p>
            <div className='mems-wrapper'>
              {channelDetail.members?.map((member, index) => {
                return (
                  <div className='mems-item' key={member.user?._id || index}>
                    <img src={member.user?.photo || no_user} alt='' />
                    <span>{member.user?.display_name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className='search'>
            <input
              type='text'
              placeholder='Search'
              value={temp}
              onChange={(e) => setTemp(e.target.value)}
            />
            <MdSearch />
          </div>
          <div className='channels'>
            {list.map((channel) => {
              return (
                <div
                  className='channels-item'
                  key={channel._id}
                  onClick={() => handleJoinRoom(channel._id)}
                >
                  <span className='cap'>
                    {channel.name
                      .split(' ')
                      .map((w) => w.charAt(0))
                      .join('')}
                  </span>
                  <span className='name'>{channel.name}</span>
                </div>
              );
            })}
            <div
              className='channels-item'
              onClick={() => {
                if (selectedChannel) {
                  setSelectedChannel(null);
                  socket?.emit('leaveChannel', {
                    user_id: user._id,
                    channel_id: selectedChannel,
                  });
                }
              }}
            >
              <span className='cap'>W</span>
              <span className='name'>Welcome</span>
            </div>
          </div>
        </>
      )}
      <div className='user'>
        <button ref={buttonRef} onClick={() => setIsShowMenu((x) => !x)}>
          <span>
            <img src={user.photo || no_user} alt='' />
            <span>{user.display_name}</span>
          </span>
          {!isShowMenu ? <FaCaretDown /> : <FaCaretUp />}
        </button>
        {isShowMenu && (
          <MenuWrapper ref={ref}>
            <ul>
              <li>
                <Link to='/profile'>
                  <FaUserCircle />
                  <span>My profile</span>
                </Link>
              </li>
              <li>
                <Link to='/chat'>
                  <MdGroup />
                  <span>Group Chat</span>
                </Link>
              </li>
              <div className='divider'></div>
              <li>
                <Link
                  to='/'
                  style={{ color: '#EB5757' }}
                  onClick={handleLogout}
                >
                  <MdExitToApp />
                  <span>Logout</span>
                </Link>
              </li>
            </ul>
          </MenuWrapper>
        )}
      </div>
    </Wrapper>
  );
};

export default ChatSidebar;
