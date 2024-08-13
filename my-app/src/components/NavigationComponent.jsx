import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';

export const NavigationComponent = () => {
  return (
    <Nav className="justify-content-center my-5" activeKey="/">
      <Nav.Item>
        <Nav.Link as={Link} to="/">
          Inicio
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} eventKey="mi-album" to="/mi-album">
          Mi Álbum
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} eventKey="obtener-laminas" to="/obtener-laminas">
          Obtener Láminas
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
};
