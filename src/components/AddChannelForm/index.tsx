import axios from 'axios';
import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useHistory } from 'react-router';
import axiosClient from '../../api/axiosClient';
import { useAppDispatch } from '../../app/hooks';
import { logout } from '../../features/auth/authSlice';
import { add } from '../../features/channel/channelSlice';
import { AddChannelFormType } from '../../features/channel/interface';
import useEventListener from '../../hooks/useEventListener';
import { Wrapper, Content } from './AddChannelForm.styles';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}
type ChangeEventType = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

const AddChannelForm = ({ isOpen, onClose }: Props) => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const ref = useRef<HTMLDivElement | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [values, setValues] = useState<AddChannelFormType>({
    name: '',
    description: '',
  });
  useEventListener('mousedown', window, (e) => {
    if (!ref.current?.contains(e.target)) {
      setValues({ name: '', description: '' });
      onClose();
    }
  });
  const handleChange = (e: ChangeEventType) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axiosClient().post('/channels', values);
      dispatch(add(res.data));
      setValues({ name: '', description: '' });
      onClose();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          dispatch(logout());
          history.push('/login');
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return isOpen
    ? createPortal(
        <Wrapper>
          <Content ref={ref}>
            <p className='title'>New channel</p>
            <form onSubmit={handleSubmit}>
              <input
                type='text'
                placeholder='Channel name'
                name='name'
                value={values.name}
                onChange={handleChange}
              />
              <textarea
                placeholder='Channel Description'
                name='description'
                value={values.description}
                onChange={handleChange}
              />
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button type='submit'>Save</button>
              </div>
            </form>
          </Content>
        </Wrapper>,
        document.getElementById('portal') as Element
      )
    : null;
};

export default AddChannelForm;
