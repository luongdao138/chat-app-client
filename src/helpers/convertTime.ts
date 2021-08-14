import moment from 'moment';
import { Message } from '../features/message/interface';

interface MessageResult {
  time: string;
  messages: Message[];
}

export const convertTime = (date: Date): string => {
  const result =
    moment(date).format('MMM DD') + ' at ' + moment(date).format('h:mm a');

  return result;
};

export const convertMessages = (messages: Message[]): MessageResult[] => {
  let result = [] as MessageResult[];

  messages.forEach((message) => {
    const time = moment(message.createdAt).format('MMMM D, yyyy');
    const isExist = result.find((x) => x.time === time);
    if (isExist) {
      isExist.messages.push(message);
    } else {
      result.push({
        messages: [],
        time,
      });
    }
  });
  return result;
};
