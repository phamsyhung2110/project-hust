import { Box } from "@chakra-ui/layout";
import { useState, useContext, useEffect } from "react";
import Chatbox from "../components/Chatbox";
import MyChats from "../components/MyChats";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import { ChatState } from "../Context/ChatProvider";
import NavBar from "../components/NavBar";
import MyFriends from "../components/MyFriends";


const Chatpage = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const { selectedChat, setSelectedChat, 
    user, chats, setChats, activeButton,
  } = ChatState();

  const [page, setPage] = useState();
  const setButtonId = (buttonId) => {
    setPage(buttonId);
  }

  useEffect(async () => {
      await setButtonId(activeButton);
    }, [activeButton]);


  console.log("Values is: ", page);

  return (
      <div style={{ width: "100%" }}>
          {user && <NavBar />}
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
            {page === 2 ? (
            <Box
                // d={{ base: selectedChat ? "none" : "flex", md: "flex" }}
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
                {/* {user && <MyFriends />} */}
                MyChat
            </Box>
        ) : page === 3 ? (
            <Box
                // d={{ base: selectedChat ? "none" : "flex", md: "flex" }}
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
                  {user && <MyFriends />}
                  Friend
                {/* {user && <MyChats fetchAgain={fetchAgain} />} */}
            </Box>
        ) : (
          <Box
                // d={{ base: selectedChat ? "none" : "flex", md: "flex" }}
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
            Not Render
          </Box>
        )
      
        }
          
          {user && (
            <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
          )}
        </Box>
    </div>
  );
};

export default Chatpage;
