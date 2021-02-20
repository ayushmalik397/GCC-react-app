import "./style.css";
import { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";

function Right(props) {
  const [show, setShow] = useState(false);
  const [mTitle, setMTitle] = useState("");
  const [mDesc, setMDesc] = useState("");
  const [mId, setMId] = useState(0);
  const [edit, setEdit] = useState(false);
  const [uTitle, setUTitle] = useState("");
  const [uDesc, setUDesc] = useState("");

  const handleClose = () => {
    setEdit(false);
    setShow(false);
  };
  const handleShow = () => setShow(true);

  function openModal(event) {
    setMTitle(props.formData[event.target.id].title);
    setMDesc(props.formData[event.target.id].desc);
    setMId(event.target.id);
    handleShow();
  }

  function changeToEdit() {
    setUTitle(mTitle);
    setUDesc(mDesc);
    setEdit(true);
  }

  function deleteNote() {
    props.updateFormData({ ops: "delete", id: mId });
    handleClose();
  }

  function updateNote() {
    setMTitle(uTitle)
    setMDesc(uDesc)
    setEdit(false);
    props.updateFormData({
      ops: "update",
      id: mId,
      title: uTitle,
      desc: uDesc,
    });
  }

  let cg = document.getElementById("card-grid");
  if (cg) cg.remove();
  let cardGrid = document.createElement("div");
cardGrid.id = "card-grid";
  if (props.formData?.length) {
    props.formData.forEach((el, index) => {
      let div = document.createElement("div");
      div.className = "card";
      div.id = index;
      div.innerHTML = "Title: " + el.title;
      let dateDiv = document.createElement("div");
      dateDiv.className = "date-section";
      dateDiv.id = index;
      dateDiv.innerHTML = "Date: " + el.dDate;
      div.onclick = openModal;
      div.append(dateDiv);
      cardGrid.append(div);
    });
  }

  useEffect(() => {
    let rightDiv = document.getElementById("right");
    rightDiv.appendChild(cardGrid);
  }, [props.formData, show, edit, uTitle, uDesc])
  return (
    <>
      <div className="right" id="right"></div>
      <Modal show={show} onHide={handleClose}>
        {edit ? (
          <div>
            <Modal.Header closeButton>
              <Modal.Title>
                <input
                  value={uTitle}
                  onChange={(e) => setUTitle(e.target.value)}
                />
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <textarea
              className='desc-area'
                value={uDesc}
                onChange={(e) => setUDesc(e.target.value)}
              />
            </Modal.Body>
          </div>
        ) : (
          <div>
            <Modal.Header closeButton>
              <Modal.Title>{mTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{mDesc}</Modal.Body>
          </div>
        )}
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {edit ? (
            <Button variant="primary" onClick={updateNote}>
              Save Changes
            </Button>
          ) : (
            <Button variant="primary" onClick={changeToEdit}>
              Edit
            </Button>
          )}
          {edit ? (
            <Button variant="primary" onClick={deleteNote}>
              Delete
            </Button>
          ) : (
            ""
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Right;
