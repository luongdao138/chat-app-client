import { Wrapper } from './Message.styles';

interface Props {
  photo: string;
  name: string;
  time: string;
  text: string;
  isOwn: boolean;
}

const Message = ({ photo, name, time, text, isOwn }: Props) => {
  return (
    <Wrapper isOwn={isOwn}>
      <div className='photo'>
        <img src={photo} alt='' />
      </div>

      <div className='content'>
        <div className='top'>
          <span className='name'>{name}</span>
          <span className='time'>{time}</span>
        </div>
        <div className='bottom'>{text}</div>
      </div>
    </Wrapper>
  );
};

export default Message;
