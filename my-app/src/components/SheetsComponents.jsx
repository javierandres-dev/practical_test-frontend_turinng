import { useContext, useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { GlobalContext } from '../contexts/GlobalContext';
import { SheetComponent } from './SheetComponent';

export const SheetsComponent = () => {
  const { gTim, gOpe } = useContext(GlobalContext);
  const [timer, setTimer] = gTim;
  const [openedEnvelopes, setOpenedEnvelopes] = gOpe;
  const [envelope, setEnvelope] = useState([]);
  const [films, setFilms] = useState([]);
  const [people, setPeople] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const API = 'https://swapi.dev/api/';
  const envelopes = [1, 2, 3, 4];

  useEffect(() => {
    getData(true);
  }, []);

  useEffect(() => {
    console.log('openedEnvelopes:', openedEnvelopes);
  }, [openedEnvelopes]);

  const closeModal = () => setShowModal(false);
  const openModal = () => setShowModal(true);

  const getSheetNumber = (url, key) => url.split(`${key}/`)[1].slice(0, -1);

  const openEnvelope = (e) => {
    const arr = [];
    for (let i = 0; i < 3; i++) {
      const character = people[Math.floor(Math.random() * people.length)];
      const sheetNumber = getSheetNumber(character.url, 'people');
      arr.push({
        ...character,
        albumSection: 'Personajes ⭐',
        categoryGroup: sheetNumber > 20 ? 'Regular' : 'Especial',
        sheetNumber,
      });
    }
    const nave = vehicles[Math.floor(Math.random() * vehicles.length)];
    const sheetNumber = getSheetNumber(nave.url, 'vehicles');
    arr.push({
      ...nave,
      albumSection: 'Naves ☄️',
      categoryGroup: sheetNumber > 10 ? 'Regular' : 'Especial',
      sheetNumber,
    });
    const configuration = Math.ceil(Math.random() * 2);
    if (configuration === 1) {
      const movie = films[Math.floor(Math.random() * films.length)];
      const sheetNumber = getSheetNumber(movie.url, 'films');
      arr.push({
        ...movie,
        albumSection: 'Películas 🎥',
        categoryGroup: 'Especial',
        sheetNumber,
      });
    } else if (configuration === 2) {
      const nave = vehicles[Math.floor(Math.random() * vehicles.length)];
      const sheetNumber = getSheetNumber(nave.url, 'vehicles');
      arr.push({
        ...nave,
        albumSection: 'Naves ☄️',
        categoryGroup: sheetNumber > 10 ? 'Regular' : 'Especial',
        sheetNumber,
      });
    }
    setEnvelope(arr);
    setOpenedEnvelopes([...openedEnvelopes, +e.target.id]);
    openModal();
    getData();
    setTimer(6);
  };

  const getData = (firstTime = false) => {
    if (firstTime)
      axios.get(`${API}/films`).then((d) => setFilms(d.data.results));
    axios
      .get(`${API}/people/?page=${Math.ceil(Math.random() * 9)}`)
      .then((d) => setPeople(d.data.results));
    axios
      .get(`${API}/vehicles/?page=${Math.ceil(Math.random() * 4)}`)
      .then((d) => setVehicles(d.data.results));
  };

  const cards = envelopes.map((envelope) => (
    <Col key={envelope}>
      <Card style={{ width: '150px' }}>
        <Card.Img
          variant="top"
          src="/src/assets/sheets.png"
          alt="Imagen sobre"
        />
        <Card.Body>
          {openedEnvelopes.includes(envelope) ? (
            <Button variant="secondary" id={envelope} disabled>
              Sobre #{envelope} no disponible
            </Button>
          ) : (
            <Button
              variant="primary"
              id={envelope}
              onClick={openEnvelope}
              disabled={timer ? true : false}
            >
              Abir sobre #{envelope}
            </Button>
          )}
        </Card.Body>
      </Card>
    </Col>
  ));

  return (
    <>
      <h1>Obtener Láminas</h1>
      <p>
        Solo se puede abrir un sobre a la vez, cada sobre contiene 5 láminas
      </p>
      <p>Las láminas pueden venir en 2 configuraciones:</p>
      <ol>
        <li>
          La primera configuración contiene 1 película, 3 personajes y 1 nave.
        </li>
        <li>La segunda configuración contiene 3 personajes y 2 naves.</li>
      </ol>
      <p>
        Tanto la configuración del sobre como las láminas que contienen son
        aleatorias.
      </p>
      <Row>{cards}</Row>
      {timer > 0 ? (
        <>
          <h2>
            Podrás abrir un nuevo sobre en
            <span>
              {timer === 60
                ? ' 1 minuto'
                : timer > 1
                ? ` ${timer} segundos`
                : ` ${timer} segundo`}
            </span>
          </h2>
        </>
      ) : null}
      <SheetComponent
        envelope={envelope}
        showModal={showModal}
        closeModal={closeModal}
      />
    </>
  );
};
