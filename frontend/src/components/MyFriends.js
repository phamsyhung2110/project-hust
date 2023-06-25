import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { ChatState } from "../Context/ChatProvider";
import { Button, useToast } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { Avatar } from "@chakra-ui/react";
import { Stack } from "@chakra-ui/react";
import ProfileModal from "./miscellaneous/ProfileModal";
import { getSenderFull } from "../config/ChatLogics";

export const MyFriends = () => {
    const toast = useToast();
    const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();
    const [friends, setFriends] = useState([]);
    const [friendRequest, setFriendRequest] = useState([]);
    const [requested, setRequested] = useState([]);

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
    console.log("list friends", response.data);

    setRequested(response.data.requested);
    setFriends(response.data.friends);
    setFriendRequest(response.data.friendRequest);
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
    // useEffect(() => {
    //     setFriends(listFriends());
    //     console.log("Friends::", friends);
    // }, []);
    useEffect(() => {
        const fetchFriends = async () => {
          const friendList = await listFriends();
          if (friendList) {
            setRequested(friendList.requested);
            setFriends(friendList.friends);
            setFriendRequest(friendList.friendRequests);
            console.log("Friends::", friendList.friends);
            console.log("FriendsRequest::", friendList.friendRequests);
            console.log("Requested::", friendList.requested);
          }
        };
        fetchFriends();
    }, []);

    return (
        <Box
          pb={3}
          px={3}
          bg="#e9ecef"
          fontSize={{ base: "28px", md: "30px" }}
          fontFamily="Work sans"
          d="flex"
          w="100%"
          justifyContent="space-between"
          alignItems="center"
          marginLeft={0}
          marginBottom={0}
          paddingTop={2}
          borderBottom="1.5px solid"
          borderColor="#d9dce8"
        >
          <Box
            d="flex"
            flexDir="column"
            p={2}
            bg="#e2e4e5"
            w="100%"
            h="match parent"
            overflowY="hidden"
          >
                {requested.length === 0 ? (
                    <h1>No friend</h1>
                    ) : (
                      <Stack overflowY="scroll">
                        <Box>Friend Request</Box>
                        {requested.map((request) => {
                          return (
                            <Box
                              cursor="pointer"
                              // Nếu bấm chọn đoạn chat, nó sẽ đổi sang màu khác,
                              // chữ trong box hiển thị đoạn chat đó sẽ đổi màu đen
                              px={3}
                              py={2}
                              borderRadius="lg"
                              key={request._id}
                              bg="white"
                              display="flex"
                              alignItems="center"
                          >
                            <Avatar
                            position="relative"
                            // mt="15px 15px 15px 15px"
                            w="40px"
                            h="40px"
                            cursor="pointer"
                            src={request.pic}
                            border="2px solid #3a86ff"
                            marginRight="10px"
                        >
                        </Avatar>
                            <Box flex="1">
                              <h3>{request.name}</h3>
                            </Box>
                            <ProfileModal
                              marginLeft="10px"
                              user={request}
                              loggedUser={user}
                            />
                            <Button
                              marginLeft="10px"
                            ></Button>
                            <Button
                              marginLeft="10px"
                            ></Button>
                            
                        </Box>
                          )
                        })}
                      </Stack>
                )}
              </Box>
            </Box>
            
        )

}

export default MyFriends
