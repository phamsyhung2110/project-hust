import { ViewIcon } from "@chakra-ui/icons";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  IconButton,
  Text,
  Image,
} from "@chakra-ui/react";
import { Box,} from "@chakra-ui/layout";
import axios from "axios";
import { useToast } from "@chakra-ui/toast";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// User model template from chakra ui
const ProfileModal = ({ user, loggedUser, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const handleAddFriends = async (loggedUser) => {
    console.log("user", user.name)
    console.log("loggeduser", loggedUser.name)
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${loggedUser.token}`,
        },
      };
      const payload = {
        ...loggedUser,
        friendId: user._id,
      }
      await axios.post(
        "/api/user/addfriend",
        payload,
        config,
      );
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
  
  return (
    <>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <IconButton d={{ base: "flex" }} icon={<ViewIcon />} onClick={onOpen} />
      )}
      <Modal size="lg" onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent h="450px" alignItems="center" display="flex">
          <ModalHeader
            fontSize="40px"
            fontFamily="Work sans"
            justifyContent="center"
          >
            {user._id === loggedUser._id ? (
              null // Nếu user._id == loggedUser._id, không hiển thị gì cả
            ) : user.friends.includes(loggedUser._id) ? (
              <Text>Friend</Text>
            ) : user.friendRequests.includes(loggedUser._id) ? (
              <Button marginRight={10} >
                Requested
              </Button>
            ) : (
              // Nút add friend trong profile modal
              <Button 
                marginRight={10}
                onClick={() => handleAddFriends(loggedUser)}
              >
                <FontAwesomeIcon icon="fa-solid fa-user-plus" />
              </Button>
            )}
            <Box>{user.name}</Box>
            
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            d="flex"
            flexDir="column"
            alignItems="center"
            justifyContent="space-between"
          >
            <Image
              borderRadius="full"
              boxSize="150px"
              src={user.pic}
              alt={user.name}
            />
            <Text
              fontSize={{ base: "28px", md: "30px" }}
              fontFamily="Work sans"
            >
              Email: {user.email}
            </Text>
          </ModalBody>
          <ModalFooter>
            {user._id === loggedUser._id ? (
              null // Nếu user._id == loggedUser._id, không hiển thị gì cả
            ) : (
              <>
                <Button bg="red.300" marginLeft= "10px" marginRight="10px">Block</Button>
                <Button bg="red.100" marginRight= "10px">Unfriend</Button>
              </>
            )}
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileModal;
