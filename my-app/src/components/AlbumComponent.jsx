import { useContext, useEffect, useState } from 'react';
import CardGroup from 'react-bootstrap/CardGroup';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Accordion from 'react-bootstrap/Accordion';
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
    setAlbum(arr);
    const filmsSheets = new Array(6).fill(null),
      peopleSheets = new Array(82).fill(null),
      vehiclesSheets = new Array(39).fill(null);
    for (const item of arr) {
      if (item.albumSection === 'Películas') {
        filmsSheets[item.sheetNumber - 1] = item;
        nMovies++;
      }
      if (item.albumSection === 'Personajes') {
        peopleSheets[item.sheetNumber - 1] = item;
        nCharacters++;
      }
      if (item.albumSection === 'Naves') {
        if (vehiclesSheets[item.sheetNumber - 1] > 39) {
          vehiclesSheets.push(item);
        } else {
          vehiclesSheets[item.sheetNumber - 1] = item;
        }
        nNaves++;
      }
    }
    setSections([
      {
        header: 'Películas',
        sheets: filmsSheets,
        footer: `${nMovies} láminas obtenidas de ${filmsSheets.length} láminas posibles`,
      },
      {
        header: 'Personajes',
        sheets: peopleSheets,
        footer: `${nCharacters} láminas obtenidas de ${peopleSheets.length} láminas posibles`,
      },
      {
        header: 'Naves',
        sheets: vehiclesSheets,
        footer: `${nNaves} láminas obtenidas de 39 láminas referenciadas + otras láminas fuera de serie`,
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
          <div className="d-flex gap-2 flex-wrap justify-content-center">
            {section.sheets.map((sheet, i) =>
              sheet ? (
                section.header === sheet.albumSection && (
                  <div
                    key={sheet.sheetId}
                    style={{
                      width: '300px',
                    }}
                    className={`rounded rounded-3 border-opacity-75 border border-${
                      section.header === 'Películas'
                        ? 'primary'
                        : section.header === 'Personajes'
                        ? 'info'
                        : 'dark'
                    }`}
                  >
                    <Accordion>
                      <Accordion.Item eventKey={i}>
                        <Accordion.Header>
                          Lámina #{sheet.sheetNumber}
                        </Accordion.Header>
                        <Accordion.Body>
                          <ListGroup>
                            <ListGroup.Item active>
                              Lámina # {sheet.sheetNumber}
                            </ListGroup.Item>
                            <ListGroup.Item
                              variant={
                                sheet.albumSection === 'Películas'
                                  ? 'primary'
                                  : sheet.albumSection === 'Personajes'
                                  ? 'info'
                                  : 'dark'
                              }
                            >
                              Sección: {sheet.albumSection}
                            </ListGroup.Item>
                            <ListGroup.Item>
                              Categoría:{' '}
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
                            <ListGroup.Item className="mb-3">
                              Nombre: {sheet.name || sheet.title}
                            </ListGroup.Item>
                          </ListGroup>
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  </div>
                )
              ) : (
                <div
                  key={i + 1}
                  style={{
                    width: '300px',
                    height: '54px',
                  }}
                  className={`bg-secondary text-white rounded rounded-3 border-opacity-25 border border-${
                    section.header === 'Películas'
                      ? 'primary'
                      : section.header === 'Personajes'
                      ? 'info'
                      : 'dark'
                  }`}
                >
                  <ListGroup>
                    <ListGroup.Item>Lámina #{i + 1}</ListGroup.Item>
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
      <h1 className="text-center">Mi Álbum</h1>
      {sheets}
    </>
  );
};
