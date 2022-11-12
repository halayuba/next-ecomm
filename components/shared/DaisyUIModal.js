import { useEffect, useState } from "react";
import ReactDOM from "react-dom";

const DaisyUIModal = ({ show, onClose, children, title }) => {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const handleClose = (e) => {
    e.preventDefault();
    onClose();
  };

  const modalContent = show ? (
    <div className="modal">
      <div className="modal-box relative">
        <label htmlFor="daisy-ui-modal" className="btn btn-sm btn-circle absolute right-2 top-2"
          onClick={handleClose}
        >✕</label>
        {title && <h3 className="text-lg font-bold">{title}</h3>}
        <p className="py-4">{children}</p>
      </div>
    </div>
  ) : null;

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById("daisy-ui-modal")
    );
  } else {
    return null;
  }

}

export default DaisyUIModal