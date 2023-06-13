import { AddIcon } from "@chakra-ui/icons";
import { Box, Stack, Text } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { useEffect, useState } from "react";
import { getSender } from "../config/ChatLogics";
import ChatLoading from "./ChatLoading";
import GroupChatModal from "./miscellaneous/GroupChatModal";
import { Button } from "@chakra-ui/react";
import { ChatState } from "../Context/ChatProvider";
import { getSenderFull } from "../config/ChatLogics";
import ProfileModal from "./miscellaneous/ProfileModal";
import testImg from './background.png';

const MyChats = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState();

  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();

  const toast = useToast();

  const fetchChats = async () => {
    // console.log(user._id);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get("/api/chat", config);
      setChats(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
    // eslint-disable-next-line
  }, [fetchAgain]);
  

  //Nếu chọn 1 đoạn chat thì hiển thị ra khung chat(flex), nếu không sẽ ẩn đi(none)
  return (
    <Box
      d={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p={3}
      bg="white"
      position="fixed"
      top="0"
      left="0"
      overflow="hidden"
      w={{ base: "100%", md: "31%" }}
      h="100%"
      borderWidth="0.5px"
      borderColor="#BFC9CA"
      marginLeft={20}
      marginRight={20}
    >
      {/* Tạo Box Mychat, hiển thị các đoạn chat và nút tạo groupchat */}
      <Box
        pb={3}
        px={3}
        bg="#33ACFF"
        borderRadius="8px"
        fontSize={{ base: "28px", md: "30px" }}
        fontFamily="Work sans"
        d="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
        marginLeft={1}
        marginBottom={3}
        paddingTop={2}
      >
        My Chats

        {/* Hiển thị cửa sổ tạo groupchat */}
        <GroupChatModal>
          <Button
            d="flex"
            fontSize={{ base: "17px", md: "10px", lg: "17px" }}
            rightIcon={<AddIcon />}
          >
            New Group Chat
          </Button>
        </GroupChatModal>
      </Box>

      {/* Tạo box hiển thị các đoạn chat, trong box này, có các box con cho từng đoạn chat */}
      <Box
        d="flex"
        flexDir="column"
        p={3}
        bg="white"
        w="100%"
        h="match parent"
        borderRadius="lg"
        overflowY="hidden"
      >
        {chats ? (
          <Stack overflowY="scroll">
            {chats.map((chat) => (
              <Box
                onClick={() => setSelectedChat(chat)}
                cursor="pointer"
                // Nếu bấm chọn đoạn chat, nó sẽ đổi sang màu khác,
                // chữ trong box hiển thị đoạn chat đó sẽ đổi màu đen
                bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                color={selectedChat === chat ? "white" : "black"}
                px={3}
                py={2}
                borderRadius="lg"
                key={chat._id}
              >
                <Text>
                  {/* Hiển thị tên user đang chat trong đoạn chat, 
                  nếu đó là groupchat thì hiển thị tên group
                   */}
                  {!chat.isGroupChat
                    ? getSender(loggedUser, chat.users)
                    : chat.chatName}
                </Text>
                {chat.latestMessage && (
                  <Text fontSize="xs">
                    <b>{chat.latestMessage.sender.name} : </b>
                    {chat.latestMessage.content.length > 50
                      ? chat.latestMessage.content.substring(0, 51) + "..."
                      : chat.latestMessage.content}
                  </Text>
                )}
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
    
  );
};

export default MyChats;
