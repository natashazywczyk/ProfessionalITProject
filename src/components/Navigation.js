//Imports necessary for navigation bar
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const Navigation = () => 
{
    return (
        //Updates URL depending on what link the user clicks
        <Navbar bg="dark" data-bs-theme="dark">
            <Container>
                <Navbar.Brand href="/">Trivia Quiz</Navbar.Brand>
                <Nav className="me-auto">
                    {/*Different links*/}
                    <Nav.Link href="/generalknowledge">Quizzes</Nav.Link>
                    <Nav.Link href="/playerstats">Player Statstics</Nav.Link>
                    <Nav.Link href="/customquiz">Add Quiz Deck</Nav.Link>
                    <Nav.Link href="/createprofile">Create Profile</Nav.Link>
                </Nav>
                <Nav className="ms-auto">
                    <Nav.Link href="/settings">Settings</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
}

export default Navigation;