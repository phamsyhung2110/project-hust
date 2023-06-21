import { Box, Text } from "@chakra-ui/layout";
import { IconButton, Spinner, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from "@chakra-ui/button";

const NavBar = () => {
    const [activeButton, setActiveButton] = useState(null);

    const handleButtonClick = (buttonId) => {
        setActiveButton(buttonId);
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
            backgroundColor="white"
            // bgGradient="linear(to bottom,white)"
            color="black"
            overflow="hidden"
            // borderRight="1px solid black"
        >   
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