import { Box, Text } from "@chakra-ui/layout";
import { IconButton, Spinner, useToast } from "@chakra-ui/react";
import { React, useEffect, useState, useRef, createContext, useContext } from "react";
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
        selectedChat,
        setSelectedChat,
        user,
        notification,
        setNotification,
        chats,
        setChats,
        activeButton, 
        setActiveButton
    } = ChatState();

    const menuButtonRef = useRef(null);

    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const history = useHistory();
    const [fetchAgain, setFetchAgain] = useState(false);
    
    const handleButtonClick = async (buttonId) => {
        await setActiveButton(buttonId);
        await console.log("active: ", buttonId);
    };
    // useEffect(() => {
    //     const handleOutsideClick = async () => {
    //       await setActiveButton(10);
    //     };
      
    //     window.addEventListener("click", handleOutsideClick);
      
    //     return () => {
    //       window.removeEventListener("click", handleOutsideClick);
    //     };
    //   }, []);
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
            backgroundColor="#1a78ff"
            // color="black"
            zIndex={999}
            borderRight="0.5px solid #d6d6cd"
        >   
            <Menu>
                {/* Menu for avatar and view profile */}
                <MenuButton
                    bg="#eaf4f4" 
                    // rightIcon={<ChevronDownIcon />
                    color="white"
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
                        bgGradient: "linear(to right, #e6f0ff,#e6f0ff)", 
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
                        bgGradient: "linear(to right, #e6f0ff,#e6f0ff)", 
                        transform: "scale(1.1)", 
                        color: "white",
                        borderRadius: "5px",
                        marginBottom: "15px",
                        marginTop: "10px",
                        marginLeft: "20px",
                        marginRight: "25px",
                    }}
                    onClick={() => handleButtonClick(1)}
                    {...(activeButton === 1 && {
                        width: "50px",
                        height: "50px",
                        marginLeft: "25px",
                        marginRight: "15px",
                        bgGradient: "linear(to right, #e6f0ff,#e6f0ff)", 
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
                    <ProfileModal user={user} loggedUser={user}>
                        <MenuItem
                            color="white"
                        >My Profile</MenuItem>{" "}
                    </ProfileModal>
                    <MenuDivider />
                    <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                    </MenuList>
            </Menu>
            
        {/* Các biểu tượng tùy chọn */}
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
                color="white"
                _hover={{
                        width: "40px",
                        marginLeft: "25px",
                        marginRight: "15px",
                        // backgroundColor: "00509d",
                        bgGradient: "linear(to right, #e6f0ff,#e6f0ff)", 
                        transform: "scale(1.1)", 
                        color: "#1a78ff"
                    }}
                _focus={{
                        width: "40px",
                        marginLeft: "25px",
                        marginRight: "15px",
                        // backgroundColor: "00509d",
                        bgGradient: "linear(to right, #e6f0ff,#e6f0ff)", 
                        transform: "scale(1.1)", 
                        color: "#1a78ff"
                    }}
                onClick={() => handleButtonClick(2)}
                {...(activeButton === 2 && {
                    width: "40px",
                    marginLeft: "25px",
                    marginRight: "15px",
                    bgGradient: "linear(to right, #e6f0ff,#e6f0ff)",
                    transform: "scale(1.1)",
                    color: "#1a78ff"
                })}
            >   
                <FontAwesomeIcon icon="fa-solid fa-message" size="xl" />                
            </Button>
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
                color="white"
                _hover={{
                        width: "40px",
                        marginLeft: "25px",
                        marginRight: "15px",
                        // backgroundColor: "00509d",
                        bgGradient: "linear(to right, #e6f0ff,#e6f0ff)", 
                        transform: "scale(1.1)", 
                        color: "#1a78ff"
                    }}
                _focus={{
                        width: "40px",
                        marginLeft: "25px",
                        marginRight: "15px",
                        // backgroundColor: "00509d",
                        bgGradient: "linear(to right, #e6f0ff,#e6f0ff)", 
                        transform: "scale(1.1)", 
                        color: "#1a78ff"
                    }}
                onClick={() => handleButtonClick(3)}
                {...(activeButton === 3 && {
                    width: "40px",
                    marginLeft: "25px",
                    marginRight: "15px",
                    bgGradient: "linear(to right, #e6f0ff,#e6f0ff)",
                    transform: "scale(1.1)",
                    color: "#1a78ff"
                })}
            >
                <FontAwesomeIcon icon="fa-solid fa-address-book" size="xl" />
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
                color="white"
                _hover={{
                        width: "40px",
                        marginLeft: "25px",
                        marginRight: "15px",
                        // backgroundColor: "00509d",
                        bgGradient: "linear(to right, #e6f0ff,#e6f0ff)", 
                        transform: "scale(1.1)", 
                        color: "#1a78ff"
                    }}
                _focus={{
                        width: "40px",
                        marginLeft: "25px",
                        marginRight: "15px",
                        // backgroundColor: "00509d",
                        bgGradient: "linear(to right, #e6f0ff,#e6f0ff)", 
                        transform: "scale(1.1)", 
                        color: "#1a78ff"
                }}
                onClick={() => handleButtonClick(4)}
                {...(activeButton === 4 && {
                    width: "40px",
                    marginLeft: "25px",
                    marginRight: "15px",
                    bgGradient: "linear(to right, #e6f0ff,#e6f0ff)",
                    transform: "scale(1.1)",
                    color: "#1a78ff"
                })}

            >
                <Menu>
            {/* Create the ring icon for notification */}
                <MenuButton p={1}>
                <NotificationBadge
                    count={notification.length}
                    effect={Effect.SCALE}
                />
                <FontAwesomeIcon icon="fa-solid fa-bell" size="xl" />
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
                color="white"
                _hover={{
                        width: "40px",
                        marginLeft: "25px",
                        marginRight: "15px",
                        // backgroundColor: "00509d",
                        bgGradient: "linear(to right, #e6f0ff,#e6f0ff)", 
                        transform: "scale(1.1)", 
                        color: "#1a78ff"
                    }}
                _focus={{
                        width: "40px",
                        marginLeft: "25px",
                        marginRight: "15px",
                        // backgroundColor: "00509d",
                        bgGradient: "linear(to right, #e6f0ff,#e6f0ff)", 
                        transform: "scale(1.1)", 
                        color: "#1a78ff"
                    }}
                onClick={() => handleButtonClick(5)}
                {...(activeButton === 5 && {
                    width: "40px",
                    marginLeft: "25px",
                    marginRight: "15px",
                    bgGradient: "linear(to right, #e6f0ff,#e6f0ff)",
                    transform: "scale(1.1)",
                    color: "#1a78ff"
                })}
            >
                <FontAwesomeIcon icon="fa-solid fa-gear" size="xl" />
            </Button>
        </Box>
    )
}

export default NavBar
