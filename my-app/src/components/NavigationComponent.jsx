import Nav from 'react-bootstrap/Nav';

export const NavigationComponent = () => {
  return (
    <Nav className="justify-content-center my-5" activeKey="/">
      <Nav.Item>
        <Nav.Link href="/">Inicio</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="mi-album" href="/mi-album">
          Mi Álbum
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="obtener-laminas" href="/obtener-laminas">
          Obtener Láminas
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
};
