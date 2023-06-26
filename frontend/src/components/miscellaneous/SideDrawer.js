import { Button } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { Input } from "@chakra-ui/input";
import { Box, Text } from "@chakra-ui/layout";
import {
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/menu";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/modal";
import { Tooltip } from "@chakra-ui/tooltip";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Avatar } from "@chakra-ui/avatar";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/toast";
import ChatLoading from "../ChatLoading";
import { Spinner } from "@chakra-ui/spinner";
import ProfileModal from "./ProfileModal";
import NotificationBadge from "react-notification-badge";
import { Effect } from "react-notification-badge";
import { getSender } from "../../config/ChatLogics";
import UserListItem from "../userAvatar/UserListItem";
import { ChatState } from "../../Context/ChatProvider";
import { IconButton } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// import testImg from './background.png';

function SideDrawer() {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);

  const {
    setSelectedChat,
    user,
    notification,
    setNotification,
    chats,
    setChats,
  } = ChatState();

  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const history = useHistory();

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    history.push("/");
  };

  // Hàm tìm kiếm user
  // Báo lỗi khi không nhập gì mà nhấn search
  const handleSearch = async () => {
    if (!search) {
      toast({
        title: "Please Enter something in search",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }

    try {
      setLoading(true);
      
      // Auth với API để có quyền get user
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`/api/user?search=${search}`, config);

      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  // Hàm truy cập vào đoạn chat với user đã tìm thấy
  // Hàm accessChat trong file chatController trong backend
  const accessChat = async (userId) => {
    console.log(userId);

    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      // Gửi post request đến chat api để tạo đoạn chat
      const { data } = await axios.post(`/api/chat`, { userId }, config);

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      
      // Set lại setLoading thành false khi không còn load
      // Set lại setSelectedChat truyền vào data để render ChatProvider
      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      toast({
        title: "Error fetching the chat",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  return (
    <>
        <Tooltip 
          label="Search Users to chat" 
          hasArrow placement="bottom-end"
        >
          <Button 
            variant="ghost"
            onClick={onOpen} 
            bg="#e6f0ff"  
            width="250px"
            alignItems="center"
            // paddingRight=""
            marginLeft={0}
            >
            
          {/* import icon from font awesome icon */}
            {/* <i className="fa-duotone fa-house fa-beat"></i> */}
            {/* <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" beat /> */}
            
            <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
            <Text d={{ base: "none", md: "flex" }} px={4}
              marginLeft={0}
            >
              Search
            </Text>
          </Button>
        </Tooltip>

      
      {/* Hiện lên cừa sổ khi bấm vào search user */}
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
          <DrawerBody>
            {/* Nhập vào text để search */}
            <Box d="flex" pb={2} >
              <Input
                placeholder="Search by name or email"
                mr={2}
                value={search}
                onKeyDown={handleSearch}
                onChange={(e) => setSearch(e.target.value)}
              />
              
              <Button 
                onClick={handleSearch}
                onKeyDown={handleSearch}
              >Go</Button>
            </Box>
            {/* Nếu loading thì render ChatLoading, nếu không thì
            hiển thị danh sách user tìm thấy */}
            {loading ? (
              <ChatLoading />
            ) : (
              searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              ))
            )}
            {loadingChat && <Spinner ml="auto" d="flex" />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      {/* Thanh navbar phía trái */}
      
    </>
  );
}

export default SideDrawer;
