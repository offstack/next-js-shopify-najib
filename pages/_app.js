import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router';
import { Button, Container, Grid, Header, Image, Segment, Menu, Sidebar, Visibility } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import '../styles/globals.css'

const Navbar = () => {
  const [fixed, setFixed] = useState(false)
  return (
    < Visibility
      once={false}
      onBottomPassed={() => setFixed(true)}
      onBottomPassedReverse={() => setFixed(false)}
    >
      <Segment
        inverted
        textAlign='center'
        style={{ minHeight: 50, padding: '1em 2em' }}

      >
        <Menu
          fixed={fixed ? `top` : null}
          inverted={!fixed}
          pointing={!fixed}
          secondary={!fixed}
          size={'medium'}
        >
          <Container>
            <Link href="/">
              <Menu.Item active>
                Home
              </Menu.Item>
            </Link>
            <Link href="/about">
              <Menu.Item>
                About Us
              </Menu.Item>
            </Link>
            <Menu.Item position='right'>
              <Button onClick={() => {
                const storage = window.localStorage;
                const cart = JSON.parse(storage.getItem('cart'));
                window.location.href = cart.webUrl
              }}>Checkout</Button>
            </Menu.Item>

          </Container>
        </Menu>
      </Segment>
    </Visibility >

  )
}

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
