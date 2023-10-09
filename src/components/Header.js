import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

export default function Header(){
    return(
        <Navbar bg="light" ticky="top" className="Header">
            <Container>
                <Navbar.Brand>Yukkei's Blog</Navbar.Brand>
            </Container>
        </Navbar>
    );
}