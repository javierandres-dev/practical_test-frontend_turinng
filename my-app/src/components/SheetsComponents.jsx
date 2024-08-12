import axios from 'axios';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';

export const SheetsComponent = () => {
  const [data, setData] = useState([]);
  const [films, setFilms] = useState([]);
  const [people, setPeople] = useState([]);
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    axios.get(`${API}/films`).then((d) => setFilms(d.data.results));
    axios.get(`${API}/people`).then((d) => setPeople(d.data.results));
    axios.get(`${API}/vehicles`).then((d) => setVehicles(d.data.results));
  }, []);

  useEffect(() => {
    console.log('data:', data);
    console.log('films:', films);
    console.log('people:', people);
    console.log('vehicles:', vehicles);
  }, [data, films, people, vehicles]);

  const API = 'https://swapi.dev/api/';
  const envelopes = [
    {
      id: 1,
      sheets: [],
      btn: 'Abrir sobre 1',
    },
    {
      id: 2,
      sheets: [],
      btn: 'Abrir sobre 2',
    },
    {
      id: 3,
      sheets: [],
      btn: 'Abrir sobre 3',
    },
    {
      id: 4,
      sheets: [],
      btn: 'Abrir sobre 4',
    },
  ];

  const handleData = () => {
    console.log('handleData...');
    const configuration = Math.ceil(Math.random() * 2);
    console.log('configuration:', configuration);
    console.log('films.length:', films.length);
    console.log('people.length:', people.length);
    console.log('vehicles.length:', vehicles.length);
    const obj = { movie: [], characters: [], naves: [] };
    let idx = null;
    if (configuration === 1) {
      idx = Math.floor(Math.random() * films.length);
      console.log('idx:', idx);
      obj.movie.push(films[idx]);

      for (let i = 0; i < 3; i++) {
        idx = Math.floor(Math.random() * people.length);
        console.log('idx:', idx);
        obj.characters.push(people[idx]);
      }

      idx = Math.floor(Math.random() * vehicles.length);
      console.log('idx:', idx);
      obj.naves.push(vehicles[idx]);
    } else if (configuration === 2) {
      for (let i = 0; i < 3; i++) {
        idx = Math.floor(Math.random() * people.length);
        console.log('idx:', idx);
        obj.characters.push(people[idx]);
      }

      for (let i = 0; i < 2; i++) {
        idx = Math.floor(Math.random() * vehicles.length);
        console.log('idx:', idx);
        obj.naves.push(vehicles[idx]);
      }
    }
    setData(obj);
  };

  const getData = () => {
    console.log('getData...:');
    /* axios.get(`${API}/people`).then((d) => setPeople(d.data.results));
    axios.get(`${API}/vehicles`).then((d) => setVehicles(d.data.results)); */
  };

  const handleClick = (e) => {
    console.log('e:', e.target.id);
    handleData();
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
          <Button variant="primary" id={envelope.id} onClick={handleClick}>
            {envelope.btn}
          </Button>
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
    </>
  );
};
