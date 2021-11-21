import './Searchmodal.css';
import Modal from 'react-bootstrap/Modal';
import "bootstrap/dist/css/bootstrap.min.css";
import DaumPostCode from 'react-daum-postcode';

function Searchbar(props) {
  const handleComplete = (data) => {
    let fullAddress = data.address;
      let extraAddress = '';
      if (data.addressType === 'R') {
        if (data.bname !== '') {
          extraAddress += data.bname;
        }
        if (data.buildingName !== '') {
          extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
        }
      fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
    }
    //fullAddress -> 전체 주소반환
  }
  
  return (
    <> 
      <Modal show={props.show} onHide={() => props.setShow(false)}>
        <DaumPostCode onComplete={handleComplete} />
      </Modal>
    </>
  );
}
  
export default Searchbar;