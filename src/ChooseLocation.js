import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import Select from "react-select";
import { availableLocationsData } from "./data/CityCountyData";

const locations = availableLocationsData.reduce((needElements, item) => {
  needElements.push({ value: item.stationName, label: item.cityName });
  return needElements;
}, []);

const customStyles = {
  container: (provided) => ({
    width: "100%",
  }),
  menu: () => ({
    width: "100%",
  }),
  menuList: () => ({
    // none of react-select's styles are passed to <Control />
    width: "100%",
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = "opacity 300ms";

    return { ...provided, opacity, transition };
  },
};

function MyVerticallyCenteredModal({
  locateupdate,
  show,
  modalClose,
  getLocate,
}) {
  const [selected, setSelected] = useState({});
  const handleChange = (newValue) => {
    console.group("Value Changed");
    setSelected({ cityName: newValue.label, stationName: newValue.value });
    console.groupEnd();
  };
  return (
    <Modal
      show={show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={modalClose}
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          變更所在位置
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h6>請選擇欲查詢地區</h6>
        <Select
          styles={customStyles}
          isClearable
          options={locations}
          onChange={handleChange}
          // onInputChange={handleInputChange}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="outline-primary"
          onClick={() => {
            getLocate();
          }}
        >
          依所在位置查詢
        </Button>{" "}
        <Button
          onClick={() => {
            locateupdate(selected);
          }}
        >
          查詢
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default MyVerticallyCenteredModal;
