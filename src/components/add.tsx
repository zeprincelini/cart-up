import { Box, FormControl, FormLabel, FormErrorMessage, 
         VStack, Input, Button, Center, Divider, Heading,
         Alert, AlertDescription, AlertIcon, CloseButton, useToast} from '@chakra-ui/react';
import React, { FC, ReactElement, useState, Dispatch, SetStateAction } from 'react';

type AddProp = {
    counter: () => void
}

const Add = ({counter}: AddProp) => {
    const [product, setProduct] = useState('');
    const [price, setPrice] = useState('');
    const [img, setImg] = useState<any>(null);

    const [success, setSuccess] = useState(false);
    const [failure, setFailure] = useState(false);
    const toast = useToast();
    
    const handler = (e:any) => {
        setImg(e.target.files[0])
    }
    
    const submit = (e: any) => {
        e.preventDefault();
        if(!product || !price){
            alert('Fields cannot be empty!')
            return
        }
        let formData = new FormData();
        formData.append('product', product);
        formData.append('price', price);
        formData.append('img', img);
        upload(formData);
    }

    const upload = async (data: any) => {
        await fetch('/api/products', {
            method: 'POST',
            body: data
        }).then((response) => {
            console.log(response);
            setSuccess(true);
            setProduct("");
            setPrice("");
            setImg(null);
            counter();
        }).catch((err) => {
            console.log(err);
            setFailure(true)
        });
    }
    
    return(
        <Box>
            <VStack mt ={5} mb ={6}>
                <Heading fontSize="xl" color="teal.400">
                    Add New Product
                </Heading>
                <Divider w="400px"/>
                {success && <Alert status="success" w="400px">
                    <AlertIcon />
                    <AlertDescription>Product added successfully</AlertDescription>
                    {/* <CloseButton position="absolute" right="8px" top="8px" /> */}
                </Alert>}
                {failure && <Alert status="error" w="400px">
                    <AlertIcon />
                    <AlertDescription>Failed to add Product</AlertDescription>
                </Alert>}
                <form encType ="multipart/form-data" onSubmit = {submit}>
                    <FormControl id="product_name" mb={2}>
                        <FormLabel>Enter Name</FormLabel>
                        <Input type="text" w="400px" name="product" value ={product} 
                        onChange={(e) => {setProduct(e.target.value)}}/>
                    </FormControl>
                    <FormControl id="product_price" mb={3}>
                        <FormLabel>Enter Price </FormLabel>
                        <Input type="number" name="price" value = {price} 
                        onChange={(e) =>{setPrice(e.target.value)}}/>
                    </FormControl>
                    <FormControl id="product_img">
                        <Input type="file" name="img" onChange={handler}/>
                    </FormControl>
                    <Center>
                        <Button colorScheme="teal" mt= {8} w="full" type="submit">
                            Save Product
                        </Button>
                    </Center>
                </form>
            </VStack>
        </Box>
    )
}

export default Add;