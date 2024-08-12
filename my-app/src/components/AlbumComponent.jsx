import CardGroup from 'react-bootstrap/CardGroup';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

export const AlbumComponent = () => {
  const sections = [
    {
      header: 'Películas',
      title: '🎥',
      text: '6 láminas posibles',
      btn: 'Ver Álbum',
      footer: 'x láminas obtenidas',
    },
    {
      header: 'Personajes',
      title: '⭐',
      text: '82 láminas posibles',
      btn: 'Ver Álbum',
      footer: 'x láminas obtenidas',
    },
    {
      header: 'Naves',
      title: '☄️',
      text: '36 láminas posibles',
      btn: 'Ver Álbum',
      footer: 'x láminas obtenidas',
    },
  ];

  const cards = sections.map((section) => (
    <CardGroup key={section.header}>
      <Card className="text-center">
        <Card.Header>{section.header}</Card.Header>
        <Card.Body>
          <Card.Title>{section.title}</Card.Title>
          <Card.Text>{section.text}</Card.Text>
          <Button variant="primary">{section.btn}</Button>
        </Card.Body>
        <Card.Footer className="text-muted">{section.footer}</Card.Footer>
      </Card>
    </CardGroup>
  ));

  return (
    <>
      <h1>Mi Álbum</h1>
      {cards}
    </>
  );
};
