import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

// eslint-disable-next-line react/prop-types
export const SheetComponent = ({ envelope, showModal, closeModal }) => {
  const handleClick = (sheet) => {
    console.log('handleClick...sheet:', sheet);
  };
  //console.log(envelope);
  // eslint-disable-next-line react/prop-types
  const content = envelope.map((sheet, i) => (
    <ListGroup key={i}>
      <ListGroup.Item>Número: {sheet.sheetNumber}</ListGroup.Item>
      <ListGroup.Item>Nombre: {sheet.name || sheet.title}</ListGroup.Item>
      <ListGroup.Item>Sección: {sheet.albumSection}</ListGroup.Item>
      <ListGroup.Item>Categoría: {sheet.categoryGroup}</ListGroup.Item>
      <Button variant="primary" onClick={() => handleClick(sheet)}>
        Agregar / Descartar
      </Button>
    </ListGroup>
  ));

  return (
    <Modal show={showModal} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Láminas</Modal.Title>
      </Modal.Header>
      <Modal.Body>{content}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
