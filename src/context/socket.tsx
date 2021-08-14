import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import io from 'socket.io-client';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { join } from '../features/channelDetail/channelDetailSlice';
import { Message } from '../features/message/interface';
import { add } from '../features/message/messageSlice';

interface ContextState {
  socket: any;
  selectedChannel: string | null;
  setSelectedChannel: React.Dispatch<React.SetStateAction<string | null>>;
  currentTyping: number;
}

const Context = createContext<ContextState>({ socket: null } as ContextState);
interface Props {
  children: ReactNode;
}
const SocketProvider = ({ children }: Props) => {
  const [socket, setSocket] = useState<any>(null);
  const [selectedChannel, setSelectedChannel] = useState<string | null>(null);
  const [currentTyping, setCurrentTyping] = useState<number>(0);
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  useEffect(() => {
    if (user._id) {
      setSocket(
        io('https://luong-chat-app.herokuapp.com', {
          path: '/chat-app-socket.io',
        })
      );
    }

    return () => {
      socket?.disconnect();
    };
  }, [user]);

  useEffect(() => {
    socket?.on('joinChannel', (data: any) => {
      console.log(data);
      console.log('Ok');
      // if (data.channel_id === selectedChannel) {
      dispatch(join(data.members));
      // }
    });

    socket?.on('sendMessage', (newMessage: Message) => {
      dispatch(add(newMessage));
    });

    socket?.on('typing', () => {
      console.log('typing server');
      setCurrentTyping(currentTyping + 1);
    });

    socket?.on('untyping', () => {
      console.log('untyping server');
      setCurrentTyping(currentTyping - 1);

      // setCurrentTyping((x) => {
      //   if (x >= 1) {
      //     return x - 1;
      //   }
      //   return 0;
      // });
    });
  }, [socket]);

  return (
    <Context.Provider
      value={{ socket, selectedChannel, setSelectedChannel, currentTyping }}
    >
      {children}
    </Context.Provider>
  );
};

export const useSocketContext = () => useContext(Context);

export default SocketProvider;
