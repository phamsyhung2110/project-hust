import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { ChatState } from "../Context/ChatProvider";
import { useToast } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { Avatar } from "@chakra-ui/react";

export const MyFriends = () => {
    const toast = useToast();
    const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();
    const [friends, setFriends] = useState([]);

    const listFriends = async () => {
    try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
    const response = await axios.get(
          `/api/user/allfriend/${user._id}`,
          config,
        );
    return response.data;

    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
}
    
    useEffect(() => {
        const fetchFriends = async () => {
            const friendList = await listFriends();
            setFriends(friendList);
            console.log("Friends::", friendList);
        };
        fetchFriends();
    }, []);

    return (
            <Box
                bg="gray"
            >
                {friends.length === 0 ? (
                    <h1>No friend</h1>
                    ) : (
                        <>
                        {friends.map((friend) => {
                            <Box
                            cursor="pointer"
                            px={3}
                            py={2}
                            borderRadius="lg"
                            key={friend._id}
                          >
                            <Avatar
                            position="relative"
                            // mt="15px 15px 15px 15px"
                            w="40px"
                            h="40px"
                            cursor="pointer"
                            // src={getSenderFull(loggedUser, chat.users).pic}
                            border="2px solid #3a86ff"
                            marginRight="10px"
                        />
                            Friend
                        </Box>
                        })}
                        </>
                )}
                
            </Box>
        )

}

export default MyFriends
