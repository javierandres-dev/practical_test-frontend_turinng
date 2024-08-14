import { useContext, useEffect, useState } from 'react';
import CardGroup from 'react-bootstrap/CardGroup';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { GlobalContext } from '../contexts/GlobalContext';

export const AlbumComponent = () => {
  const { gAlb } = useContext(GlobalContext);
  const [album, setAlbum] = gAlb;
  const [sections, setSections] = useState([]);

  useEffect(() => {
    let nMovies = 0,
      nCharacters = 0,
      nNaves = 0;
    const arr = album.sort((a, b) => a.sheetNumber - b.sheetNumber);
    for (const item of arr) {
      if (item.albumSection === 'Películas') nMovies++;
      if (item.albumSection === 'Personajes') nCharacters++;
      if (item.albumSection === 'Naves') nNaves++;
    }
    setAlbum(arr);
    setSections([
      {
        header: 'Películas', // 🎥
        footer: `${nMovies} láminas obtenidas de 6 láminas posibles`,
      },
      {
        header: 'Personajes', // ⭐
        footer: `${nCharacters} láminas obtenidas de 82 láminas posibles`,
      },
      {
        header: 'Naves', // ☄️
        footer: `${nNaves} láminas obtenidas de 36 láminas posibles`,
      },
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sheets = sections.map((section) => (
    <CardGroup key={section.header}>
      <Card
        border={
          section.header === 'Películas'
            ? 'primary'
            : section.header === 'Personajes'
            ? 'info'
            : 'dark'
        }
        className="text-center my-3"
      >
        <Card.Header>{section.header}</Card.Header>
        <Card.Body>
          <div className="d-flex gap-2 flex-wrap">
            {album.map(
              (sheet) =>
                section.header === sheet.albumSection && (
                  <div
                    key={sheet.sheetId}
                    className={
                      sheet.albumSection === 'Películas'
                        ? 'border border-primary border-opacity-50 rounded rounded-3'
                        : sheet.albumSection === 'Personajes'
                        ? 'border border-info border-opacity-50 rounded rounded-3'
                        : 'border border-dark border-opacity-50 rounded rounded-3'
                    }
                    style={{
                      width: '300px',
                    }}
                  >
                    <ListGroup>
                      <ListGroup.Item>
                        # {sheet.sheetNumber} Lámina{' '}
                        <span
                          className={
                            sheet.categoryGroup === 'Especial'
                              ? 'text-primary'
                              : 'text-secondary'
                          }
                        >
                          {sheet.categoryGroup}
                        </span>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        {sheet.name || sheet.title}
                      </ListGroup.Item>
                    </ListGroup>
                  </div>
                )
            )}
          </div>
        </Card.Body>
        <Card.Footer className="text-muted">{section.footer}</Card.Footer>
      </Card>
    </CardGroup>
  ));

  return (
    <>
      <h1>Mi Álbum</h1>
      {sheets}
    </>
  );
};
