import { Box, Text } from "@chakra-ui/layout";
import { IconButton, Spinner, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from "@chakra-ui/button";
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
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { useHistory } from "react-router-dom";
import { ChatState } from "../Context/ChatProvider";
import { getSender } from "../config/ChatLogics";
import { useDisclosure } from "@chakra-ui/hooks";
import NotificationBadge from "react-notification-badge";
import { Effect } from "react-notification-badge";
import { Avatar } from "@chakra-ui/avatar";
import ProfileModal from "./miscellaneous/ProfileModal";

const NavBar = () => {
    const {
        setSelectedChat,
        user,
        notification,
        setNotification,
        chats,
        setChats,
    } = ChatState();

    const [activeButton, setActiveButton] = useState(null);
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const history = useHistory();

    const handleButtonClick = (buttonId) => {
        setActiveButton(buttonId);
    };
    const logoutHandler = () => {
        localStorage.removeItem("userInfo");
        history.push("/");
    };

    return (
        <Box
            fontSize={{ base: "20px", md: "20px" }}
            fontFamily="Work sans"
            justifyContent="space-between"
            // display="flex"
            position="fixed"
            // allignItems="center"
            top="0"
            left="0"
            bottom="0"
            width="90px"
            height="match-parent"
            // backgroundColor="#583ea1"
            backgroundColor="#eaf4f4"
            // bgGradient="linear(to bottom,white)"
            color="black"
            overflow="hidden"
            // borderRight="1px solid black"
        >
            <div>
            <Menu>
            {/* Create the ring icon for notification */}
                <MenuButton p={1}>
                <NotificationBadge
                    count={notification.length}
                    effect={Effect.SCALE}
                />
                <BellIcon fontSize="2xl" m={1} />
                </MenuButton>
                <MenuList pl={2}>
                {!notification.length && "No New Messages"}
                {notification.map((notif) => (
                    <MenuItem
                    key={notif._id}
                    onClick={() => {
                        setSelectedChat(notif.chat);
                        setNotification(notification.filter((n) => n !== notif));
                    }}
                    >
                    {notif.chat.isGroupChat
                        ? `New Message in ${notif.chat.chatName}`
                        : `New Message from ${getSender(user, notif.chat.users)}`}
                    </MenuItem>
                ))}
                </MenuList>
            </Menu>
            <Menu>
                {/* Menu for avatar and view profile */}
                <MenuButton as={Button} bg="white" rightIcon={<ChevronDownIcon />}>
                <Avatar
                    size="sm"
                    cursor="pointer"
                    name={user.name}
                    src={user.pic}
                />
                </MenuButton>

                {/* Menu for My profile or Logout */}
                <MenuList>
                {/* When click to my profile, display the ProfileModal from miscellanous/ */}
                <ProfileModal user={user}>
                    <MenuItem>My Profile</MenuItem>{" "}
                </ProfileModal>
                <MenuDivider />
                <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                </MenuList>
            </Menu>
            </div>
        {/* Các biểu tượng tùy chọn */}
            <Button 
                variant="ghost" 
                // onClick={onOpen} 
                // bg="#a1a1c6" 
                width="60px"
                alignItems="center"
                // paddingRight=""
                marginBottom="10px"
                marginTop="10px"
                marginLeft="15px"
                // marginRight="35px"
                transition="transform 0.5s"
                bg="transparent"
                border="none"
                color="#00509d"
                _hover={{
                        width: "40px",
                        marginLeft: "25px",
                        marginRight: "15px",
                        // backgroundColor: "00509d",
                        bgGradient: "linear(to right, #00509d, #00509d)", 
                        transform: "scale(1.1)", 
                        color: "white"
                    }}
                _focus={{
                        border: "none",
                        boxShadow: "none",
                        focusBorderColor: "transparent",
                        focusRing: "0",
                        transform: "scale(1.1)",
                        color: "white",
                        // marginTop: "10px",
                        // marginLeft: "25px",
                        // margin: "15px"
                    }}
                onClick={() => handleButtonClick(1)}
                {...(activeButton === 1 && {
                    width: "40px",
                    marginLeft: "25px",
                    marginRight: "15px",
                    bgGradient: "linear(to right, #00509d, #00509d)",
                    transform: "scale(1.1)",
                    color: "white"
                })}
            >
                <FontAwesomeIcon icon="fa-solid fa-house" />
            </Button>
            <Button 
                variant="ghost" 
                // onClick={onOpen} 
                // bg="#a1a1c6" 
                width="60px"
                alignItems="center"
                // paddingRight=""
                marginBottom="10px"
                marginTop="10px"
                marginLeft="15px"
                // marginRight="35px"
                transition="transform 0.5s"
                bg="transparent"
                border="none"
                color="#00509d"
                _hover={{
                        width: "40px",
                        marginLeft: "25px",
                        marginRight: "15px",
                        // backgroundColor: "00509d",
                        bgGradient: "linear(to right, #00509d, #00509d)", 
                        transform: "scale(1.1)", 
                        color: "white"
                    }}
                _focus={{
                        border: "none",
                        boxShadow: "none",
                        focusBorderColor: "transparent",
                        focusRing: "0",
                        transform: "scale(1.1)",
                        color: "white",
                        // marginTop: "10px",
                        // marginLeft: "25px",
                        // margin: "15px"
                    }}
                onClick={() => handleButtonClick(2)}
                {...(activeButton === 2 && {
                    width: "40px",
                    marginLeft: "25px",
                    marginRight: "15px",
                    bgGradient: "linear(to right, #00509d, #00509d)",
                    transform: "scale(1.1)",
                    color: "white"
                })}
            >
                <FontAwesomeIcon icon="fa-solid fa-house" />
            </Button>
            <Button 
                variant="ghost" 
                // onClick={onOpen} 
                // bg="#a1a1c6" 
                width="60px"
                alignItems="center"
                // paddingRight=""
                marginBottom="10px"
                marginTop="10px"
                marginLeft="15px"
                // marginRight="35px"
                transition="transform 0.5s"
                bg="transparent"
                border="none"
                color="#00509d"
                _hover={{
                        width: "40px",
                        marginLeft: "25px",
                        marginRight: "15px",
                        // backgroundColor: "00509d",
                        bgGradient: "linear(to right, #00509d, #00509d)", 
                        transform: "scale(1.1)", 
                        color: "white"
                    }}
                _focus={{
                        border: "none",
                        boxShadow: "none",
                        focusBorderColor: "transparent",
                        focusRing: "0",
                        transform: "scale(1.1)",
                        color: "white",
                        // marginTop: "10px",
                        // marginLeft: "25px",
                        // margin: "15px"
                    }}
                onClick={() => handleButtonClick(3)}
                {...(activeButton === 3 && {
                    width: "40px",
                    marginLeft: "25px",
                    marginRight: "15px",
                    bgGradient: "linear(to right, #00509d, #00509d)",
                    transform: "scale(1.1)",
                    color: "white"
                })}
            >
                <FontAwesomeIcon icon="fa-solid fa-house" />
            </Button>
        </Box>
    )
}

export default NavBar