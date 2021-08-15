import { MdSend } from 'react-icons/md';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Message from '../Message';
import { Wrapper } from './ChatMessages.styles';
import no_user from '../../assets/no_user.png';
import { FormEvent, useEffect, useRef, useState } from 'react';
import axiosClient from '../../api/axiosClient';
import { add } from '../../features/message/messageSlice';
import axios from 'axios';
import { logout } from '../../features/auth/authSlice';
import { useHistory } from 'react-router';
import { useSocketContext } from '../../context/socket';
import { convertMessages, convertTime } from '../../helpers/convertTime';
import { Spinner } from '../Spinner/Spinner.styles';
import useEventListener from '../../hooks/useEventListener';

const ChatMessages = ({ loading }: { loading: boolean }) => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { socket, selectedChannel, currentTyping } = useSocketContext();
  const { list } = useAppSelector((state) => state.message);
  const { user } = useAppSelector((state) => state.auth);
  const [text, setText] = useState<string>('');
  const messagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesRef.current?.scroll({
      top: messagesRef.current?.scrollHeight,
      behavior: 'smooth',
    });
  }, [list, loading]);

  // useEventListener('DOMNodeInserted', messagesRef.current, (e) => {
  //   const { currentTarget: target } = e;
  //   target.scroll({
  //     top: target.scrollHeight,
  //     behavior: 'smooth',
  //   });
  // });

  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (!text || !text.trim().length) {
      return;
    }
    const messageData = {
      channel: selectedChannel,
      text,
    };
    try {
      const res = await axiosClient().post('/messages', messageData);
      dispatch(add(res.data));
      socket?.emit('sendMessage', {
        newMessage: res.data,
        channel_id: selectedChannel,
      });
      setText('');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          dispatch(logout());
          history.push('/login');
        }
      }
    }
  };

  const handleFocus = () => {
    socket?.emit('typing', { current_channel: selectedChannel });
  };
  const handleBlur = () => {
    socket?.emit('untyping', { current_channel: selectedChannel });
  };

  if (loading)
    return (
      <Wrapper>
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
  return (
    <Wrapper>
      {selectedChannel ? (
        <>
          <div className='mess-container' ref={messagesRef}>
            {convertMessages(list).map((item) => {
              return (
                <div key={item.time} className='mess-time'>
                  <div className='line-time'>
                    <div className='left'></div>
                    <span>{item.time}</span>
                    <div className='right'></div>
                  </div>
                  {item.messages.map((message) => {
                    return (
                      <Message
                        key={message._id}
                        photo={message.sender.photo || no_user}
                        text={message.text}
                        name={message.sender.display_name}
                        // time='yesterday at 2:28 am'
                        time={convertTime(message.createdAt)}
                        isOwn={message.sender._id === user._id}
                      />
                    );
                  })}
                </div>
              );
            })}
            {currentTyping > 0 && (
              <span style={{ color: '#828282', fontSize: '12px' }}>
                Someone is typing...
              </span>
            )}
          </div>
          <div className='send'>
            <form onSubmit={handleSendMessage}>
              <input
                type='text'
                placeholder='Type a message here'
                value={text}
                onChange={(e) => setText(e.target.value)}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </form>
            <span onClick={handleSendMessage}>
              <MdSend />
            </span>
          </div>
        </>
      ) : (
        <>
          <p style={{ color: '#e0e0e0' }}>
            Join a channel to chat with friends all around the world
          </p>
        </>
      )}
    </Wrapper>
  );
};

export default ChatMessages;
