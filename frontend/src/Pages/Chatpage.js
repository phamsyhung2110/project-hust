import { Box } from "@chakra-ui/layout";
import { useState } from "react";
import Chatbox from "../components/Chatbox";
import MyChats from "../components/MyChats";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import { ChatState } from "../Context/ChatProvider";
import NavBar from "../components/NavBar";

const Chatpage = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const { user } = ChatState();

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
          {user && <MyChats fetchAgain={fetchAgain} />}
          {user && (
            <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
          )}
        </Box>
    </div>
  );
};

export default Chatpage;
