import { Avatar, Box, Divider, Flex, Image, Text } from "@chakra-ui/react"
import { BsThreeDots } from "react-icons/bs"
import Actions from "../components/Actions"
import { useState } from "react"
import { Button } from "@chakra-ui/react"
import Comment from "../components/Comment"


const PostPage = () => {
    const[liked,setLiked] = useState(false)
  return (
    <>
    {/* Profile Image */}
    <Flex>
        <Flex w={"full"} alignItems={"center"} gap={3}>
            <Avatar src='../../public/zuck-avatar.png' size={"md"} name="MarkZukerBerg" />
            <Flex>
            <Text fontSize={"sm"} fontWeight={"bold"}>MarkZukerBerg</Text>
            <Image src="../../public/verified.png" w={4} h={4}  ml={4}/>
            </Flex>
        </Flex>
        <Flex gap={4}>
            <Text fontSize={"sm"} color={"gray.light"}>1d</Text>
            <BsThreeDots/>


        </Flex>
            
        
    </Flex>
    {/* Post Image */}
    <Text my={5}>Let&apos;s Talk About Threads</Text>
        <Box borderRadius={6} overflow={"hidden"} border={"1px solid"} borderColor={"gray.light"}>
            <Image src={"/post1.png"} w={"full"}/>
        </Box>
    <Flex gap={3} my={3}>
        <Actions liked={liked} setLiked={setLiked}/> 
    </Flex>
    <Flex alignItems={"center"}>
        <Text color={"gray.light"} fontSize={"sm"}>238 replies</Text>
        <Box w={0.5} h={0.5} borderRadius={"full"} bg={'gray.light'} mx={0.5}></Box>
        <Text color={"gray.light"} fontSize={"sm"}>
            {200 + (liked ? 1 :0) } likes
        </Text>
    </Flex>
    <Divider my={4} />
         <Flex justifyContent={"space-between"}>
            <Flex gap={2} alignItems={"center"}>
                <Text fontSize={"2xl"}>🤝</Text>
                <Text color={"gray.light"}>Get the App to like, reply and Post</Text>
            </Flex>
            <Button> Get </Button>
         </Flex>
    <Divider my={4}/> 
    <Comment
    comment="Looks Really Good"
    createdAt="2d"
    likes={400}
    username="johndoe"
    userAvatar="https://bit.ly/code-beast"

    />
   <Comment
    comment="Amazing"
    createdAt="12d"
    likes={100}
    username="allyoe"
    userAvatar="https://bit.ly/kent-c-dodds"

    />
    <Comment
    comment="Looks perfect"
    createdAt="3d"
    likes={300}
    username="ghrdoe"
    userAvatar="https://bit.ly/dan-abramov"

    />
    </>
  )
}

export default PostPage