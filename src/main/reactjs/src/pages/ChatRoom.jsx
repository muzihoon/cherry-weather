import React, { useState, useEffect, useRef } from 'react';
import Layout from '../common/Layout';
import '../style/ChatRoomStyle.css';
import * as ncloudchat from 'ncloudchat';
import { useParams } from 'react-router-dom';
import { User, Button } from "@nextui-org/react";
import { IoIosArrowBack } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";

const ChatRoom = () => {
    const [ncloud, setNcloud] = useState('');
    const { channelId } = useParams();
    const [channels, setChannels] = useState([]);
    const [currentChannelId, setCurrentChannelId] = useState('');
    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState('');
    const messagesEndRef = useRef(null);

    useEffect(() => {
        const initializeChat = async () => {
            const chat = new ncloudchat.Chat();
            await chat.initialize("2eec90a6-59fb-4abd-99b4-f002d5d9a0cf");
            setNcloud(chat);
            console.log("ncloud : " + ncloud);
            chat.bind('onMessageReceived', async function (channel, message) {
                setMessages((prevMessages) => {
                    const isDuplicate = prevMessages.some((prevMessage) => prevMessage.message_id === message.message_id);
                    if (isDuplicate) {
                        return prevMessages;
                    }
                    return [...prevMessages, message];
                });
            });
            await chat.connect({
                id: 'dbsgusgh2004@naver.com',
                name: 'Admin',
                profile: 'dbsgusgh2004@naver.com',
                customField: 'json',
                // id: 'yoon1994@naver.com',
                // name: 'yoon',
                // profile: 'yoon1994@naver.com',
                // customField: 'json',
            });

            // 채널 목록 가져오기
            const filter = { state: true };
            const sort = { created_at: -1 };
            const option = { offset: 0, per_page: 100 };
            const response = await chat.getChannels(filter, sort, option);
            const channelsData = response.edges ? response.edges : {};
            const fetchedChannels = channelsData.map(edge => edge.node);
            setChannels(fetchedChannels);

            await chat.subscribe(channelId);

            // 채널 메세지 가져오기
            const fetchedMessages = await fetchChannelMessages(chat, channelId);
            setMessages(fetchedMessages);
            console.log("messages : " + messages);
            // await chat.subscribe(channelId);
            // await chat.addUsers(channelId, [res2.data.uemail, res3.data.uemail]);
            // const existingChannelId = channelId;


        };
        initializeChat();
    }, []);

    const fetchChannelMessages = async (chat, channelId) => {
        try {
            // 필터와 정렬 옵션 설정
            const filter = { channel_id: channelId };
            const sort = { created_at: 1 };
            let offset = 0;
            const per_page = 100; // 한 번에 가져올 대화 개수
            let allMessages = [];
            while (true) {
                const option = { offset, per_page };
                const channelMessages = await chat.getMessages(filter, sort, option);
                console.log("channelMessages : " + channelMessages);
                const messagesData = channelMessages.edges ? channelMessages.edges : {};
                const messages = messagesData.map((edge) => edge.node);
                allMessages = allMessages.concat(messages);
                if (messages.length < per_page) {
                    // 더 이상 가져올 대화 내용이 없으면 반복문 종료
                    break;
                }
                offset += per_page;
            }
            return allMessages;
        } catch (error) {
            console.error('Error fetching channel messages:', error);
            return []; // 메시지 목록 불러오기 실패 시 빈 배열 반환
        }
    };

    // 메시지 전송

    const handleUserInput = (e) => {
        setUserInput(e.target.value);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (userInput.trim() !== '') {
            try {
                if (!ncloud) {
                    throw new Error('Chat is not initialized');
                }
                // await nc.subscribe(channelId);
                const response = await ncloud.sendMessage(channelId, {
                    type: 'text',
                    message: userInput,
                });
                // 메시지 전송 후 상태 변경하지 않도록 수정
                // setMessages(prevMessages => [...prevMessages, response]);
                setUserInput('');
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };

    useEffect(() => {
        // 메시지 목록이 업데이트될 때마다 실행되는 useEffect
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]); // 메시지 목록이 변경될 때마다 스크롤 이동

    useEffect(() => {
        const disconnectChat = async () => {
            if (ncloud) {
                await ncloud.disconnect();
            }
        };

        window.addEventListener('beforeunload', disconnectChat);

        // When component unmounts, disconnect
        return () => {
            window.removeEventListener('beforeunload', disconnectChat);
            disconnectChat();
        };
    }, [ncloud]);

    return (
        <Layout>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="user_chat_data">
                            <div className="chat_section msg_history" id="chat-messages" >
                                <div className='chat-nav'>
                                    <span>
                                        <IoIosArrowBack
                                            style={{ fontSize: '30px', cursor: 'pointer' }} />
                                    </span>
                                    <span>
                                        <GiHamburgerMenu
                                            style={{ float: 'right', cursor: 'pointer', fontSize: '30px' }} />
                                    </span>
                                </div>

                                {/* 현재 채널의 메시지 표시 */}
                                {messages.map && messages.map((message, index) => (

                                    <div key={index} style={{ textAlign: message.sender.profile === "dbsgusgh2004@naver.com" ? 'right' : 'left', margin: '10px' }}>
                                        {/* data.email */}
                                        {
                                            message.sender.profile !== "dbsgusgh2004@naver.com" ?
                                                <User
                                                    className={message.sender.profile === "dbsgusgh2004@naver.com" ? "sent-message" : "received-message"}

                                                    avatarProps={{
                                                        src: "https://i.pravatar.cc/150?u=a04258114e29026702d"
                                                    }}
                                                    style={{ fontSize: '8px', color: 'gray' }}
                                                />
                                                : null
                                        }

                                        <div style={{ backgroundColor: message.sender.profile === "dbsgusgh2004@naver.com" ? 'lightblue' : 'lightgreen', padding: '5px', borderRadius: '4px', display: 'inline-block' }}>

                                            <strong>{message.sender.name}</strong>
                                            <div>{message.content}</div>
                                            <div style={{ fontSize: '12px', color: 'gray' }}>{new Date(message.created_at).toLocaleString()}</div>
                                        </div>
                                    </div>
                                ))}
                                <div ref={messagesEndRef} />

                            </div>
                            {/* 메시지 입력 및 전송 UI */}
                            <div className="type_msg" style={{ position: 'fixed', bottom: '50px', width: '600px' }}>
                                <div className="input_msg_write">
                                    <form onSubmit={handleSubmit}>
                                        <input type="text" className="write_msg" placeholder="Type a message"
                                            value={userInput}
                                            onChange={handleUserInput} />
                                        <Button size="sm" type='submit' className='msg_send_btn'>
                                            Send
                                        </Button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default ChatRoom;