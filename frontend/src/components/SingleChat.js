import { FormControl } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Box, Text } from "@chakra-ui/layout";
import "./styles.css";
import { IconButton, Spinner, useToast } from "@chakra-ui/react";
import { getSender, getSenderFull } from "../config/ChatLogics";
import { useEffect, useState } from "react";
import axios from "axios";
import { ArrowBackIcon } from "@chakra-ui/icons";
import ProfileModal from "./miscellaneous/ProfileModal";
import ScrollableChat from "./ScrollableChat";
import Lottie from "react-lottie";
import animationData from "../animations/typing.json";
import io from "socket.io-client";
import UpdateGroupChatModal from "./miscellaneous/UpdateGroupChatModal";
import { ChatState } from "../Context/ChatProvider";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from "@chakra-ui/button";
import { Avatar } from "@chakra-ui/avatar";
import { PhoneIcon } from "@chakra-ui/icons";
import { useDisclosure } from "@chakra-ui/react";

// const ENDPOINT = process.env.REACT_APP_API_URL; 
const ENDPOINT = "http://localhost:5000"

var socket, selectedChatCompare;

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);
  const [seen, setSeen] = useState(false);
  const toast = useToast(); 
  // const [activeButton, setActiveButton] = useState(null);

  // const handleButtonClick = (buttonId) => {
  //       setActiveButton(buttonId);
  //   };
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const { selectedChat, setSelectedChat, user, notification, setNotification, chats } =
    ChatState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { onOpen } = useDisclosure();
  const handleAvatarClick = () => {
      setIsModalOpen(true);
      onOpen();
  };
  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      setLoading(true);

      const { data } = await axios.get(
        `/api/message/${selectedChat._id}`,
        config
      );
      setMessages(data);
      setLoading(false);

      socket.emit("join chat", selectedChat._id);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Messages",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessage) {
      socket.emit("stop typing", selectedChat._id);
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        setNewMessage("");
        const { data } = await axios.post(
          "/api/message",
          {
            content: newMessage,
            chatId: selectedChat,
          },
          config
        );
        socket.emit("new message", data);
        setMessages([...messages, data]);
      } catch (error) {
        toast({
          title: "Error Occured!",
          description: "Failed to send the Message",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
    }
  };

  useEffect(() => {
    socket = io(ENDPOINT, {
      // path: "/be",
      transports: ['polling','websocket' ]});
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));

  }, []);

  useEffect(() => {
    fetchMessages();

    selectedChatCompare = selectedChat;
    // eslint-disable-next-line
  }, [selectedChat]);

  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      if (
        !selectedChatCompare || // if chat is not selected or doesn't match current chat
        selectedChatCompare._id !== newMessageRecieved.chat._id
      ) {
        if (!notification.includes(newMessageRecieved)) {
          setNotification([newMessageRecieved, ...notification]);
          setFetchAgain(!fetchAgain);
        }
      } else {
        setMessages([...messages, newMessageRecieved]);
      }
    });
  });

  const markMessageAsSeen = async () => {
    if (selectedChat && messages.length > 0) {
      const latestMessage = messages[messages.length - 1];
      if (latestMessage && latestMessage.sender._id !== user._id && !latestMessage.seenBy.includes(user._id)) {
        try {
          await axios.put(`/messages/${latestMessage._id}/seen`);
          setMessages((prevMessages) => {
            const updatedMessages = [...prevMessages];
            const updatedMessageIndex = updatedMessages.findIndex((message) => message._id === latestMessage._id);
            if (updatedMessageIndex !== -1) {
              updatedMessages[updatedMessageIndex].seenBy.push(user._id);
            }
            setSeen(true);
            return updatedMessages;
            
          });
        } catch (error) {
          console.error("Error marking message as seen:", error);
        }
      }
    }
  };

  useEffect(() => {
    markMessageAsSeen();
  }, [selectedChat, messages]);

  const typingHandler = (e) => {
    setNewMessage(e.target.value);

    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };

  return (
    <>
      {selectedChat ? (
        <>
          <Box 
            fontSize={{ base: "20px", md: "25px" }}
            fontWeight="bold" 
            pb={3}
            px={2}
            w="100%"
            fontFamily="Work sans"
            d="flex"
            justifyContent={{ base: "space-between" }}
            alignItems="center"
            padding="20px 20px 20px 20px"
            borderBottom="1.5px solid"
            // bg="black"
            borderColor="#e2e4e5"

          >
          {messages &&
              (!selectedChat.isGroupChat ? (
                <>
                  {/* Avatar ở trên, hiển thị tên và avt người đang nhắn tin */}
                  <Box>
                      <ProfileModal 
                        user={getSenderFull(user, selectedChat.users)}
                        loggedUser={user}
                        onClose={() => setIsModalOpen(false)}>
                          <Avatar
                            mt="15px 15px 15px 15px"
                            w="60px"
                            h="60px"
                            cursor="pointer"
                            src={getSenderFull(user, selectedChat.users).pic}
                            border="3px solid #3a86ff"
                            marginRight="10px"
                            onClick={handleAvatarClick}
                        />
                      </ProfileModal>
                  </Box>
                    {/* Box hiển thị tên người đang chat */}
                    <Box paddingBottom="10px" flex="1">
                      {getSender(user, selectedChat.users)}
                      <Box fontSize={15}>Online</Box>
                    </Box>
                    {/* Các nút phía góc phải */}
                    <Button marginRight={5} bg="transparent" border="none">
                      <FontAwesomeIcon icon="fa-solid fa-video" />
                    </Button>
                    <Button marginRight={5} bg="transparent" border="none">
                      <FontAwesomeIcon icon="fa-solid fa-phone" />
                    </Button>
                    <Button bg="transparent" border="none">
                      <FontAwesomeIcon icon="fa-solid fa-play" />
                    </Button>
                </>
              ) : (
                <>
                  <Box
                    w="60px"
                    h="60px"
                    d="flex" 
                    alignItems="center"
                  >
                    <Avatar
                      mt="15px 15px 15px 15px"
                      w="60px"
                      h="60px"
                      cursor="pointer"
                      border="1px solid #3a86ff"
                      marginRight="10px"
                      marginBottom="0px"
                    />
                    <Box paddingBottom="30px" flex="1" display="flex" alignItems="center" >
                      {selectedChat.chatName.toUpperCase()}
                      <Box>
                        <UpdateGroupChatModal
                            fetchMessages={fetchMessages}
                            fetchAgain={fetchAgain}
                            setFetchAgain={setFetchAgain}
                          />
                      </Box>
                    </Box>
                    {/* Nút Update group chat */}
                  </Box>
                    
                  
                </>
              ))}
          </Box>

            
          <Box
            d="flex"
            flexDir="column"
            justifyContent="flex-end"
            p={3}
            bg="white"
            w="100%"
            h="100%"
            overflowY="hidden"
          >
            {loading ? (
              <Spinner
                size="xl"
                w={20}
                h={20}
                alignSelf="center"
                margin="auto"
              />
            ) : (
              <div className="messages">
                <ScrollableChat
                  messages={messages} />
              </div>
            )}
          </Box>
          <FormControl
              onKeyDown={sendMessage}
              id="first-name"
              isRequired
              mt={3}
            >
              {istyping ? (
                <div>
                  <Lottie
                    options={defaultOptions}
                    // height={50}
                    width={70}
                    style={{ marginBottom: 15, marginLeft: 0 }}
                  />
                </div>
              ) : (
                <></>
              )}
                <Input
                  variant="filled"
                  bg="white"
                  // borderColor="black"
                  borderRadius="0px"
                  borderTop="1px solid"
                  placeholder="Enter a message.."
                  value={newMessage}
                  onChange={typingHandler}
                  position="relative"
                  right="0"
                  left="0"
                  bottom="0vh"
                  paddingTop="30px"
                  paddingBottom="30px"
                  // marginTop="0"
                  marginBottom="50"
                >
                  
                </Input>
              
            </FormControl>  
        </>
      ) : (
        // to get socket.io on same page
        <Box 
          d="flex" 
          alignItems="center" 
          justifyContent="center" h="100%">
          <Text fontSize="3xl" pb={3} fontFamily="Work sans">
            Click on a user to start chatting
          </Text>
        </Box>
      )}
    </>
  );
};

export default SingleChat;
