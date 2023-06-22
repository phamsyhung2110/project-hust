import { Box, Text } from "@chakra-ui/layout";
import { IconButton, Spinner, useToast } from "@chakra-ui/react";
import { useEffect, useState, useRef } from "react";
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
import SideDrawer from "./miscellaneous/SideDrawer";

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
    const menuButtonRef = useRef(null);

    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const history = useHistory();

    
    const handleButtonClick = (buttonId) => {
        setActiveButton(buttonId);
    };
    useEffect(() => {
        const handleOutsideClick = () => {
          setActiveButton(null);
        };
      
        window.addEventListener("click", handleOutsideClick);
      
        return () => {
          window.removeEventListener("click", handleOutsideClick);
        };
      }, []);
    const logoutHandler = () => {
        localStorage.removeItem("userInfo");
        history.push("/");
    };

    return (
        <Box
            d={{ base: "block", md: "block" }}
            fontSize={{ base: "20px", md: "20px" }}
            fontFamily="Work sans"
            justifyContent="space-between"
            position="fixed"
            top="0"
            left="0"
            bottom="0"
            width="90px"
            height="match-parent"
            backgroundColor="#eaf4f4"
            color="black"
            // onClick={handleOutsideClick}
        >
                <Menu>
                    {/* Menu for avatar and view profile */}
                    <MenuButton
                        bg="#eaf4f4" 
                        // rightIcon={<ChevronDownIcon />}
                        color="#00509d"
                        width="40px"
                        marginTop="10px"
                        marginLeft="25px"
                        marginRight="25px"
                        marginBottom="25px"
                        transition="transform 0.5s"
                        bg="transparent"
                        border="none"
                        _hover={{
                            width: "50px",
                            height: "50px",
                            marginLeft: "25px",
                            marginRight: "15px",
                            bgGradient: "linear(to right, #00509d, #00509d)", 
                            transform: "scale(1.1)", 
                            color: "white",
                            borderRadius: "5px",
                            marginBottom: "15px",
                            marginTop: "10px",
                            marginLeft: "20px",
                            marginRight: "25px",
                        }}
                        _focus={{
                            width: "50px",
                            height: "50px",
                            marginLeft: "25px",
                            marginRight: "15px",
                            bgGradient: "linear(to right, #00509d, #00509d)", 
                            transform: "scale(1.1)", 
                            color: "white",
                            borderRadius: "5px",
                            marginBottom: "15px",
                            marginTop: "10px",
                            marginLeft: "20px",
                            marginRight: "25px",
                        }}
                        onClick={() => handleButtonClick(1)}
                        {...(activeButton === 2 && {
                            width: "50px",
                            height: "50px",
                            marginLeft: "25px",
                            marginRight: "15px",
                            bgGradient: "linear(to right, #00509d, #00509d)", 
                            transform: "scale(1.1)", 
                            color: "white",
                            borderRadius: "5px",
                            marginBottom: "15px",
                            marginTop: "10px",
                            marginLeft: "20px",
                            marginRight: "25px",
                        })}

                    >
                    <Avatar
                        cursor="pointer"
                        name={user.name}
                        src={user.pic}
                        width="40px"
                        height="40px"
                        border="3px solid #3a86ff"
                    />
                    </MenuButton>
                    {/* Menu for My profile or Logout */}
                    <MenuList>
                    {/* When click to my profile, display the ProfileModal from miscellanous/ */}
                    <ProfileModal user={user}>
                        <MenuItem
                            color="#00509d"
                            
                        >My Profile</MenuItem>{" "}
                    </ProfileModal>
                    <MenuDivider />
                    <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                    </MenuList>
                </Menu>
            
        {/* Các biểu tượng tùy chọn */}
            <Button 
                // ref={menuButtonRef}
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
                        width: "40px",
                        marginLeft: "25px",
                        marginRight: "15px",
                        // backgroundColor: "00509d",
                        bgGradient: "linear(to right, #00509d, #00509d)", 
                        transform: "scale(1.1)", 
                        color: "white"
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
            

            {/* Button for rintone icon */}
            <Button 
                variant="ghost" 
                width="60px"
                alignItems="center"
                marginBottom="10px"
                marginTop="10px"
                marginLeft="15px"
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
                        width: "40px",
                        marginLeft: "25px",
                        marginRight: "15px",
                        // backgroundColor: "00509d",
                        bgGradient: "linear(to right, #00509d, #00509d)", 
                        transform: "scale(1.1)", 
                        color: "white"
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
                <Menu>
            {/* Create the ring icon for notification */}
                <MenuButton p={1}>
                <NotificationBadge
                    count={notification.length}
                    effect={Effect.SCALE}
                />
                <BellIcon 
                    fontSize="2xl" 
                    m={1} 
                />
                </MenuButton>
                <MenuList pl={1}
                    color="black"
                >
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
            </Button>
        </Box>
    )
}

export default NavBar