import { useRouter } from 'next/router'
import { encode, decode } from 'shopify-gid'
import { client } from '../../utils/shopify'
import { useState } from 'react'
import { Button, Container, Grid, Header, Image, Segment, Menu, Sidebar, Visibility, List, Input } from 'semantic-ui-react'

const { Row, Column } = Grid

const Post = ({ product }) => {
    const [image, setImage] = useState(product.images[0]);
    const [quantity, setQuantity] = useState(0);
    const addToCart = async () => {
        const storage = window.localStorage
        let checkoutId = storage.getItem('checkoutId');
        console.log("🚀 ~ file: [productid].js ~ line 15 ~ addToCart ~ checkoutId", checkoutId)
        if (!checkoutId) {
            const checkout = await client.checkout.create();
            checkoutId = checkout.id
        }
        storage.setItem('checkoutId', checkoutId);
        const cart = await client.checkout.addLineItems(checkoutId, [
            {
                variantId: product.variants[0].id,
                quantity
            }
        ])
        storage.setItem('cart', JSON.stringify(cart))
    }
    return (
        <Container>
            <br />
            <br />
            <br />
            <Grid centered>
                <Row column={2}>
                    <Column width={10}>
                        <Row>
                            <h1>
                                {product.title}
                            </h1>
                            <Image src={image.src}></Image>
                        </Row>
                        <Row>
                            <List horizontal divided>
                                {product.images.map((image, index) => {
                                    return (
                                        <List.Item onClick={() => {
                                            setImage(image)
                                        }}>
                                            <Image size={'small'} src={image.src}></Image>
                                        </List.Item>
                                    )
                                })}
                            </List>
                        </Row>
                    </Column>
                    <Column width={6}>
                        <Row>
                            <Input
                                action={{
                                    color: "teal",
                                    labelPosition: "left",
                                    icon: "cart",
                                    onClick: addToCart,
                                    content: "Checkout",
                                }}
                                onChange={(e, { value }) => setQuantity(Number(value))}
                                type="number"
                                actionPosition='left'
                                placeholder='Search...'
                                defaultValue='52.03'
                            />
                        </Row>
                    </Column>
                </Row>
            </Grid>
        </Container>
    )
}

export async function getServerSideProps({ query }) {
    const productId = query.productid
    const product = await client.product.fetch(`gid://shopify/Product/${productId}`);

    return { props: { product: JSON.parse(JSON.stringify(product)) } }
}

export default Post

