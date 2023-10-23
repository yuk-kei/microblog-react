import { NavLink } from 'react-router-dom';
import { useUser } from '../contexts/UserProvider';
import { Spinner, Image, Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';

export default function Header(){
    const { user, logout } = useUser();


    return(
        <Navbar bg="light" ticky="top" className="Header">
            <Container>
                <Navbar.Brand>Yukkei's Blog</Navbar.Brand>
                <Nav>
                {/* This is for the dropdown menu, the justify-content-end is for the dropdown menu 
                to be on the right side of the navbar */}   
                    <div className='justify-content-end'>
                        {user === undefined ?
                            <Spinner animation="border"/>
                        :
                            <>
                                {user !== null && 
                                    <NavDropdown title={
                                        <Image src={user.avatar_url + '&s=32'} roundedCircle />
                                    } align="end">
                                        <NavDropdown.Item as={NavLink} to={'/user/' + user.username}>
                                            Profile
                                        </NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item onClick={logout}>
                                            Logout
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                }
                            </>
                        }
                    </div>
                </Nav>
            </Container>
        </Navbar>
    );
}