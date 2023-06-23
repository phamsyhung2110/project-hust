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
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${loggedUser.token}`,
        },
      };

      const { data } = await axios.post(
        "/api/user/addfriend",
        //friendID
        config
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
        <ModalContent h="410px">
          <ModalHeader
            fontSize="40px"
            fontFamily="Work sans"
            // d="flex"
            justifyContent="center"
          >
            {user._id === loggedUser._id ? (
              null // Nếu user._id == loggedUser._id, không hiển thị gì cả
            ) : (
              <Button 
                marginRight={10}
                onClick={() => handleAddFriends(user)}
              >
                <FontAwesomeIcon icon="fa-solid fa-user-plus" />
              </Button>
            )}

            {user.name}
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
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileModal;
