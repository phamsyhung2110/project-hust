import { Box } from "@chakra-ui/layout";
import { useState, useContext } from "react";
import Chatbox from "../components/Chatbox";
import MyChats from "../components/MyChats";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import { ChatState } from "../Context/ChatProvider";
import NavBar, { ButtonState } from "../components/NavBar";
import MyFriends from "../components/MyFriends";
import ButtonProvider, {useButtonState} from "../Context/ButtonProvider";

const Chatpage = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();
  // const activeButton = ButtonState()
  const {activeButton} = useButtonState();

  console.log("Values is: ", activeButton);

  return (
      <div style={{ width: "100%" }}>
        <ButtonProvider>
          {user && <NavBar />}
        </ButtonProvider>
        
        <Box 
          d="flex"
          position="fixed"
          justifyContent="space-between" 
          w="100%" 
          h="100vh"
          top="0px"
          bottom="0vh"
          >
            {/* {user && <MyFriends />} */}
            {activeButton === 3 ? (
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
                {/* {user && <MyChats fetchAgain={fetchAgain} />} */}
                {user && <MyFriends />}
            </Box>
        ) : (
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
                {/* {user && <MyChats fetchAgain={fetchAgain} />} */}
            </Box>
        )}
          
          {user && (
            <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
          )}
        </Box>
    </div>
  );
};

export default Chatpage;
