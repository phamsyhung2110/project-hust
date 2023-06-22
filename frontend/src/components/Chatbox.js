import { Box } from "@chakra-ui/layout";
import "./styles.css";
import SingleChat from "./SingleChat";
import { ChatState } from "../Context/ChatProvider";
import NavBar from "./NavBar";

const Chatbox = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat } = ChatState();

  return (
    <Box
      d={{ base: selectedChat ? "flex" : "none", md: "flex" }}
      alignItems="center"
      flexDir="column"
      // p={3}
      bg="white"
      w={{ base: "100%", md: "70%" }}
      h="100vh"
      right="0vh"
      borderWidth="0.1px"
      borderColor="#e2e4e5"
    >
      {/* <NavBar /> */}
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Box>
  );
};

export default Chatbox;
