import { Box } from "@chakra-ui/layout";
import { useState } from "react";
import Chatbox from "../components/Chatbox";
import MyChats from "../components/MyChats";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import { ChatState } from "../Context/ChatProvider";
import NavBar from "../components/NavBar";

const Chatpage = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();

  return (
      <div style={{ width: "100%" }}>
        {user && <NavBar />}
        <Box 
          d="flex"
          position="fixed"
          justifyContent="space-between" 
          w="100%" 
          h="100vh"
          // marginLeft="50px"
          top="0px"
          // left=" 50px"
          bottom="0vh"
          >
            <Box
              d={{ base: selectedChat ? "none" : "flex", md: "flex" }}
              flexDir="column"
              alignItems="center"
              p={0}
              bg="white"
              left="0"
              overflow="hidden"
              w={{ base: "100%", md: "26%" }}
              h="100%"
              marginLeft={90}
            >
              {user && <MyChats fetchAgain={fetchAgain} />}
            </Box>
          
          {user && (
            <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
          )}
        </Box>
    </div>
  );
};

export default Chatpage;
