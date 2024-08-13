import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { GlobalContext } from '../contexts/GlobalContext';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

export const SheetsComponent = () => {
  const { gTim, gOpe } = useContext(GlobalContext);
  const [timer, setTimer] = gTim;
  const [openedEnvelopes, setOpenedEnvelopes] = gOpe;
  const [envelope, setEnvelope] = useState([]);
  const [films, setFilms] = useState([]);
  const [people, setPeople] = useState([]);
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    axios.get(`${API}/films`).then((d) => setFilms(d.data.results));
    axios.get(`${API}/people`).then((d) => setPeople(d.data.results));
    axios.get(`${API}/vehicles`).then((d) => setVehicles(d.data.results));
  }, []);

  useEffect(() => {
    console.log('envelope:', envelope);
    console.log('openedEnvelopes:', openedEnvelopes);
  }, [envelope, openedEnvelopes]);

  const API = 'https://swapi.dev/api/';
  const envelopes = [
    {
      id: 1,
      sheets: [],
    },
    {
      id: 2,
      sheets: [],
    },
    {
      id: 3,
      sheets: [],
    },
    {
      id: 4,
      sheets: [],
    },
  ];

  const openEnvelope = (e) => {
    const obj = { movie: [], characters: [], naves: [] };
    const configuration = Math.ceil(Math.random() * 2);
    if (configuration === 1) {
      obj.movie.push(films[Math.floor(Math.random() * films.length)]);
      for (let i = 0; i < 3; i++)
        obj.characters.push(people[Math.floor(Math.random() * people.length)]);
      obj.naves.push(vehicles[Math.floor(Math.random() * vehicles.length)]);
    } else if (configuration === 2) {
      for (let i = 0; i < 3; i++)
        obj.characters.push(people[Math.floor(Math.random() * people.length)]);
      for (let i = 0; i < 2; i++)
        obj.naves.push(vehicles[Math.floor(Math.random() * vehicles.length)]);
    }
    setEnvelope(obj);
    setOpenedEnvelopes([...openedEnvelopes, +e.target.id]);
    setTimer(6);
  };

  const getData = () => {
    console.log('getData...:');
    /* axios.get(`${API}/people`).then((d) => setPeople(d.data.results));
    axios.get(`${API}/vehicles`).then((d) => setVehicles(d.data.results)); */
  };

  const cards = envelopes.map((envelope) => (
    <Col key={envelope.id}>
      <Card style={{ width: '150px' }}>
        <Card.Img
          variant="top"
          src="/src/assets/sheets.png"
          alt="Imagen sobre"
        />
        <Card.Body>
          {openedEnvelopes.includes(envelope.id) ? (
            <Button variant="secondary" id={envelope.id} disabled>
              Sobre #{envelope.id}
            </Button>
          ) : (
            <Button
              variant="primary"
              id={envelope.id}
              onClick={openEnvelope}
              disabled={timer ? true : false}
            >
              Abir sobre #{envelope.id}
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
    </>
  );
};
