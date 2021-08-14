import { useState } from 'react';
import { MdAdd, MdChevronLeft, MdMenu, MdClose } from 'react-icons/md';
import { useAppSelector } from '../../app/hooks';
import { useSocketContext } from '../../context/socket';
import AddChannelForm from '../AddChannelForm';
import { Left, Right, Wrapper } from './ChatHeader.styles';

interface Props {
  isAllChannel: boolean;
  setIsAllChannel: React.Dispatch<React.SetStateAction<boolean>>;
  isShowLeft: boolean;
  setIsShowLeft: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChatHeader = ({
  isAllChannel,
  setIsAllChannel,
  isShowLeft,
  setIsShowLeft,
}: Props) => {
  const [isOpenForm, setIsOpenForm] = useState<boolean>(false);
  const { detail } = useAppSelector((state) => state.channelDetail);
  const { selectedChannel } = useSocketContext();

  return (
    <Wrapper>
      <AddChannelForm
        isOpen={isOpenForm}
        onClose={() => setIsOpenForm(false)}
      />
      <Left isShowLeft={isShowLeft}>
        {isAllChannel ? (
          <>
            <span className='title'>Channels</span>
            <span className='add' onClick={() => setIsOpenForm(true)}>
              <MdAdd />
            </span>
          </>
        ) : (
          <button onClick={() => setIsAllChannel(true)}>
            <MdChevronLeft />
            <span>All channels</span>
          </button>
        )}
        <span className='close'>
          <MdClose onClick={() => setIsShowLeft(false)} />
        </span>
      </Left>
      <Right>
        <MdMenu
          style={{ cursor: 'pointer' }}
          onClick={() => setIsShowLeft((x) => !x)}
        />
        <span className='name'>
          {selectedChannel ? detail.name : 'Welcome'}
        </span>
      </Right>
    </Wrapper>
  );
};

export default ChatHeader;
