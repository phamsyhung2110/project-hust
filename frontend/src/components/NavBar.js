import { Box, Text } from "@chakra-ui/layout";
import { IconButton, Spinner, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from "@chakra-ui/button";

const NavBar = () => {
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
            width="80px"
            height="match-parent"
            // backgroundColor="#583ea1"
            backgroundColor="white"
            color="black"
            overflow="hidden"
            // borderRight="1px solid black"
        >   
        {/* Các biểu tượng tùy chọn */}
            <Button 
                variant="ghost" 
                // onClick={onOpen} 
                bg="#a1a1c6" 
                width="80px"
                alignItems="center"
                // paddingRight=""
                marginBottom="10px"
                _hover={{ backgroundColor: "yellow" }}
            >
                <FontAwesomeIcon icon="fa-solid fa-house" />
            </Button>
            <Button 
                variant="ghost" 
                // onClick={onOpen} 
                bg="yellow" 
                width="80px"
                alignItems="center"
                // paddingRight=""
                marginBottom="10px"
            >
                <FontAwesomeIcon icon="fa-solid fa-house" />
            </Button>
            <Button 
                variant="ghost" 
                // onClick={onOpen} 
                bg="green" 
                width="80px"
                alignItems="center"
                // paddingRight=""
                marginBottom="10px"
            >
                <FontAwesomeIcon icon="fa-solid fa-house" />
            </Button> 
        </Box>
    )
}

export default NavBar