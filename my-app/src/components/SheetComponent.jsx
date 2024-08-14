import { useContext, useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { GlobalContext } from '../contexts/GlobalContext';

// eslint-disable-next-line react/prop-types
export const SheetComponent = ({ envelope, showModal, closeModal }) => {
  const { gAlb } = useContext(GlobalContext);
  const [album, setAlbum] = gAlb;
  const [added, setAdded] = useState([]);
  const [discarded, setDiscarded] = useState([]);

  const addSheet = (sheet) => {
    setAlbum([...album, sheet]);
    setAdded([...added, sheet]);
  };
  const dismissSheet = (sheet) => setDiscarded([...discarded, sheet]);

  // eslint-disable-next-line react/prop-types
  const content = envelope.map((sheet, i) => (
    <div
      key={i}
      style={{
        flex: '1 1 0px',
      }}
      className=""
    >
      <ListGroup>
        <ListGroup.Item active>Lámina # {sheet.sheetNumber}</ListGroup.Item>
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
        {added.includes(sheet) && (
          <Button variant="secondary" disabled>
            Agregada
          </Button>
        )}
        {discarded.includes(sheet) && (
          <Button variant="secondary" disabled>
            Descartada
          </Button>
        )}
        {!discarded.includes(sheet) &&
          !added.includes(sheet) &&
          album.some((s) => sheet.sheetId === s.sheetId) && (
            <Button variant="warning" onClick={() => dismissSheet(sheet)}>
              Descartar
            </Button>
          )}
        {!album.some((s) => sheet.sheetId === s.sheetId) && (
          <Button variant="success" onClick={() => addSheet(sheet)}>
            Agregar al álbum
          </Button>
        )}
      </ListGroup>
    </div>
  ));

  return (
    <Modal show={showModal} onHide={closeModal} className="modal-xl">
      <Modal.Header closeButton>
        <Modal.Title>Láminas</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex gap-2">{content}</div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Cerrar sobre
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
