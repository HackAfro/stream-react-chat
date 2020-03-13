import React, { useEffect, useState, useContext } from 'react';
import {
  Chat,
  Channel,
  ChannelHeader,
  Thread,
  Window
} from 'stream-chat-react';
import { MessageList, MessageInput } from 'stream-chat-react';
import { StreamChat } from 'stream-chat';

import { AppContext } from '../../contexts';
import { Redirect } from 'react-router-dom';

let chatClient;

const Home = () => {
  const { userData: user } = useContext(AppContext);
  const [channel, setChannel] = useState(undefined);

  const setUser = async ({ apiKey, user, token }) => {
    const { results: people } = await (
      await fetch('https://randomuser.me/api/?inc=picture')
    ).json();
    const [person] = people;
    const { picture } = person;

    chatClient = new StreamChat(apiKey);

    chatClient.setUser(
      {
        id: user._id,
        name: user.name.first,
        role: 'admin',
        image: picture.thumbnail
      },
      token
    );
    const channel = chatClient.channel('messaging', 'Chat');
    setChannel(channel);
  };

  useEffect(() => {
    if (user) {
      setUser(user);
    }
  }, []);

  if (!user) {
    return <Redirect to='/auth' />;
  }

  return channel ? (
    <div className='w-11/12 md:w-1/2 lg:w-1/3 mx-auto'>
      <Chat client={chatClient} theme={'messaging light'}>
        <Channel channel={channel}>
          <Window>
            <ChannelHeader />
            <MessageList />
            <MessageInput />
          </Window>
          <Thread />
        </Channel>
      </Chat>
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default Home;
