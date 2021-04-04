import { Box, Flex, Link, Center } from "@chakra-ui/react";

type paginationProps = {
    totalProducts: number,
    productAmount: number,
    paginate: (no: any) => void
}
const Pagination = ({ totalProducts, productAmount, paginate }: paginationProps) => {
    const pageNumbers : any = [];

    for(let i = 1; i <= Math.ceil(totalProducts/productAmount); i++){
        pageNumbers.push(i)
    }
    return (
        <Flex mt ={5}>
            {pageNumbers.map((no: any) => (
                <Box boxShadow="base" key ={no}>
                    <Center w={30} h={30}>
                        <Link color="teal.500" href="#" onClick = {() => paginate(no)}>
                            {no}
                        </Link>
                    </Center>
                </Box>
            ))}
        </Flex>
    )
}

export default Pagination;