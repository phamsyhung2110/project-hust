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
import SideDrawer from "./miscellaneous/SideDrawer";
import { Tooltip } from "@chakra-ui/tooltip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar } from "@chakra-ui/avatar";

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

      const { data } = await axios.get("http://localhost:5000/api/chat", config);
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
    <>
      {/* Tạo Box Mychat, hiển thị các đoạn chat và nút tạo groupchat */}
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        fontFamily="Work sans"
        d="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
        marginLeft={0}
        marginBottom={0}
        paddingTop={2}
        borderBottom="1.5px solid"
        borderColor="#d9dce8"
        bg="#e9ecef"
      >
        {user && <SideDrawer />}
        {/* Hiển thị cửa sổ tạo groupchat */}
        <GroupChatModal>
            <Tooltip 
            label="Create group chat1" 
            hasArrow placement="bottom-end"
            >
            <Button
              d="flex"
              fontSize={{ base: "17px", md: "10px", lg: "17px" }}
              bgColor="white"
              w="30px"
            >
              <FontAwesomeIcon icon="fa-solid fa-user-group" size="lg" />
            </Button>
          </Tooltip>
        </GroupChatModal>
      </Box>
      

      {/* Tạo box hiển thị các đoạn chat, trong box này, có các box con cho từng đoạn chat */}
      <Box
        d="flex"
        flexDir="column"
        p={2}
        bg="#e2e4e5"
        w="100%"
        h="match parent"
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
                bg={selectedChat === chat ? "#a1a1c6" : "white"}
                color={selectedChat === chat ? "white" : "black"}
                px={3}
                py={2}
                borderRadius="lg"
                key={chat._id}
                display="flex"
                // w="00px"
              >
                
                <Text
                >
                  <Avatar
                    position="relative"
                    // mt="15px 15px 15px 15px"
                    w="40px"
                    h="40px"
                    cursor="pointer"
                    src={getSenderFull(loggedUser, chat.users).pic}
                    border="2px solid #3a86ff"
                    marginRight="10px"
                />
                </Text>
                  <Box flex="1">
                    {!chat.isGroupChat
                    ? getSender(loggedUser, chat.users)
                    : chat.chatName}
                    <Box >
                      {chat.latestMessage && (
                        <Text fontSize="xs"
                          display="flex"
                        >
                          <Box flex={1}>{chat.latestMessage.sender.name} : 
                          {chat.latestMessage.content.length > 30
                            ? chat.latestMessage.content.substring(0, 31) + "..."
                            : chat.latestMessage.content}
                          </Box>
                          <Box marginLeft="10">
                            {new Date(chat.latestMessage.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </Box>
                        </Text>
                      )}
                    </Box>
                  </Box>
                
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </>
  );
};

export default MyChats;
