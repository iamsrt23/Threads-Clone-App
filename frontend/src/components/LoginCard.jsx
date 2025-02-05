import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link,
  } from '@chakra-ui/react'
  import { useState } from 'react'
  import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { useSetRecoilState } from 'recoil'
import authScreenAtom from '../atoms/authAtom'

import useShowToast from '../hooks/useShowToast'
  
  export default function LoginCard() {
    const [showPassword, setShowPassword] = useState(false)
    const setAuthScreen = useSetRecoilState(authScreenAtom)
    const [inputs,setInputs] = useState({
        username:"",
        password:""
    })
    const showToast = useShowToast()

    const handleLogin = async()=>{
        try {

            const response = await fetch('/api/users/login',{
                method:"POST",
                headers:{
                    "Content-Type" :"application/json",
                },
                body:JSON.stringify(inputs),
            })
            const data = await response.json()
            if (!response.ok) {
                showToast("Error", data.error || "Login failed", "error");
                return;
            }
            showToast("Success", "Login successful!", "success");
    
            // console.log(inputs)
            
        } catch (error) {
            showToast("Error", "Something went wrong", "error");
            console.error("Login Error:", error);
    
        }
    }

  
    return (
      <Flex
        
        align={'center'}
        justify={'center'}
        >
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={14} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'} textAlign={'center'}>
              Login
            </Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
              to enjoy all of our cool features ✌️
            </Text>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}
            w={{
                base:"full",
                sm:"400px"
            }}>
            <Stack spacing={4}>
              
                <FormControl isRequired>
                <FormLabel>User Name</FormLabel>
                <Input type="text" onChange={(e)=>setInputs({...inputs,username:e.target.value})}
                value={inputs.username}/>
                </FormControl>
            
              <FormControl  isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input type={showPassword ? 'text' : 'password'} onChange={(e)=>setInputs({...inputs,password:e.target.value})} value={inputs.password}/>
                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() => setShowPassword((showPassword) => !showPassword)}>
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  loadingText="Submitting"
                  size="lg"
                  bg={useColorModeValue('gray.700','gray.800')}
                  color={'white'}
                  _hover={{
                    bg: useColorModeValue('gray.900','gray.900'),
                  }} 
                  onClick={handleLogin}>
                  Login 
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={'center'}>
                  Don&apos;t have an account <Link color={'blue.400'}
                  onClick={()=>setAuthScreen('signup')}>Signup</Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    )
  }