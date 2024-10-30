import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Fields } from "../constants";
import { useNavigate } from "react-router-dom";

const Form = () => {
    const navigate = useNavigate();
    const [itemName, setItemName] = useState("");
    const [postingDate, setPostingDate] = useState("");
    const [quantity, setQuantity] = useState("");
    const [assetValue, setAssetValue] = useState("");
    const [dropdownValues, setDropdownValues] = useState(Fields.map(() => "")); // Store dropdown selections
    

    const isFormValid = () => {
        return (
            itemName &&
            postingDate &&
            quantity &&
            assetValue &&
            dropdownValues.every(value => value !== "")
        );
    };
    const handleDropdownChange = (index, value) => {
        const newDropdownValues = [...dropdownValues];
        newDropdownValues[index] = value;
        setDropdownValues(newDropdownValues);
    };

    // Open modal by directly manipulating the DOM
    const openModal = () => {
        const modal = document.getElementById('exampleModal');
        if (modal) {
            modal.classList.add('show');
            modal.style.display = 'block';
            modal.setAttribute('aria-modal', 'true');
            modal.removeAttribute('aria-hidden');
        }
    };

    // Close modal by directly manipulating the DOM
    const closeModal = () => {
        const modal = document.getElementById('exampleModal');
        if (modal) {
            modal.classList.remove('show');
            modal.style.display = 'none';
            modal.setAttribute('aria-hidden', 'true');
            modal.removeAttribute('aria-modal');
        }
    };

    const handleprint = () => {
        // Changeprint(true);
        navigate('/barcode');
    }

    return (
        <form>
            <div className="container mt-2">
                <div className="form-container">
                    <div className="row">
                        <label htmlFor="itemName" className="col-6 col-sm-6 col-md-3 col-form-label text-start">Item Name</label>
                        <div className="col-sm-6 col-md-3">
                            <input
                                type="text"
                                className="form-control"
                                id="itemName"
                                placeholder="Enter Item Name"
                                value={itemName}
                                onChange={(e) => setItemName(e.target.value)}
                            />
                        </div>
                        <label htmlFor="date" className="col-sm-6 col-md-2 col-form-label text-start">Posting Date</label>
                        <div className="col-sm-6 col-md-4">
                            <input
                                type="date"
                                className="form-control"
                                id="date"
                                value={postingDate}
                                onChange={(e) => setPostingDate(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="row">
                        <label htmlFor="quantity" className="col-sm-6 col-md-3 col-form-label text-start">Quantity</label>
                        <div className="col-sm-6 col-md-3">
                            <input
                                type="number"
                                className="form-control"
                                id="quantity"
                                placeholder="Enter Quantity"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                            />
                        </div>
                        <label htmlFor="assetValue" className="col-sm-6 col-md-2 col-form-label text-start">Asset Value</label>
                        <div className="col-sm-6 col-md-4">
                            <input
                                type="number"
                                className="form-control"
                                id="assetValue"
                                placeholder="Enter Asset Value"
                                value={assetValue}
                                onChange={(e) => setAssetValue(e.target.value)}
                            />
                        </div>
                    </div>




                    {Fields.map((field, index) => {
                        if (index % 2 === 0) {
                            return (
                                <div className="row mb-3" key={index}>
                                    <label htmlFor={`dropdown-${index}`} className="col-sm-6 col-md-3 col-form-label text-start">
                                        {field.fieldItems}
                                    </label>
                                    <div className="col-sm-6 col-md-3">
                                        <select
                                            className="form-control"
                                            id={`dropdown-${index}`}
                                            value={dropdownValues[index]}
                                            onChange={(e) => handleDropdownChange(index, e.target.value)}
                                        >
                                            <option value="">Select an option</option>
                                            {field.dropdown.map((option, subIndex) => (
                                                <option key={subIndex} value={option.fieldItems}>
                                                    {option.fieldItems}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    {index + 1 < Fields.length && (
                                        <>
                                            <label htmlFor={`dropdown-${index + 1}`} className="col-sm-6 col-md-2 col-form-label text-start">
                                                {Fields[index + 1].fieldItems}
                                            </label>
                                            <div className="col-sm-6 col-md-4">
                                                <select
                                                    className="form-control"
                                                    id={`dropdown-${index + 1}`}
                                                    value={dropdownValues[index + 1]}
                                                    onChange={(e) => handleDropdownChange(index + 1, e.target.value)}
                                                >
                                                    <option value="">Select an option</option>
                                                    {Fields[index + 1].dropdown.map((option, subIndex) => (
                                                        <option key={subIndex} value={option.fieldItems}>
                                                            {option.fieldItems}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </>
                                    )}
                                </div>
                            );
                        }
                        return null;
                    })}
                    <div>
                        <input
                            onClick={openModal}
                            type="button"
                            className="submit"
                            id="submit"
                            value="Submit"
                            disabled={!isFormValid()}
                        />
                    </div>
                </div>

                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                           
                            <div className="modal-body" style={{ padding: '20px', display: 'flex', alignItems: 'center' }}>
                                <FontAwesomeIcon icon={faCircleCheck} style={{ color: 'green', fontSize: '2rem', marginRight: '10px' }} />
                                <span style={{ fontSize: '1.25rem', color: '#000' }}>Success</span>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={closeModal}>Ok</button>
                                <button type="button" className="btn btn-primary" onClick={handleprint}>QRCode Generator</button>
                            </div>
                        </div>
                    </div>
                </div>



                
            </div>
        </form >
    );
}

export default Form;


