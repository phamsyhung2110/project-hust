import { Box, Text } from "@chakra-ui/layout";
import { IconButton, Spinner, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { ArrowBackIcon } from "@chakra-ui/icons";

const NavBar = () => {
    return (
        <Box
            position="absolute"
            top="0"
            left="0"
            bottom="0"
            width="80px"
            height="match-parent"
            backgroundColor="#338AFF"
            color="#fff"
            
            
        >
        {/* Các biểu tượng tùy chọn */}
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                paddingTop="20px"
                paddingBottom="5px"
            >
                <Box
                    display="flex"
                    margin={3}
                >
                    <a href="#" className="active">
                        User
                    </a>
                </Box>
                <Box
                    display="flex"
                    margin={3}
                    bg="black"
                    borderRadius="10px"
                    fontSize={10}
                >
                <a href="#">
                <img
                    src=""
                />
                </a>
                </Box>
                
            </Box>
        </Box>
    )
}

export default NavBar