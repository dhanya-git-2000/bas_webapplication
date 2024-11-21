import React, { useState, useRef, useCallback, useEffect } from "react";
import Form from "./form";
import Webcam from 'react-webcam';
import { BsQrCode } from "react-icons/bs";
import { QrReader } from 'react-qr-reader';
import image from '../images/BAS-logo-1.jpg'
import jsQR from 'jsqr';
import { QRCodeCanvas } from 'qrcode.react';
import { FaEye } from "react-icons/fa";
import { Items } from "../constants";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";


const Barcode = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [formData, setFormData] = useState({
        image: "",
        Uuid: " ",
        ItemName: " ",
        Quantity: " ",
        PostingDate: " ",
        AssetValue: " ",
        BusTransType: " ",
        CompanyCode: " ",
        AssetType: " ",
        BusUnit: " ",
        Currency: " ",
        TradPartner: " ",
        BaseUnitCode: " "
    })
    
    const allValues = location.state;
    const [print, Changeprint] = useState(false);
    // const webcamRef = useRef(null);
    // const [scanResult, setScanResult] = React.useState('');
    // const [imageSrc, setImageSrc] = React.useState('');
    const [isScanning, setIsScanning] = useState(false);
    const [scanResult, setScanResult] = useState('');
    const [lastResult, setLastResult] = useState('');
    const [Details, setDetails] = useState(Items);
    const [uuid, setuuid] = useState("");
    const [selectedItem, setSelectedItem] = useState([]);
    const username = 'BPINST';
    const qrRef = useRef(null);
    const password = 'Welcome1';
    const authHeader = `Basic ${btoa(`${username}:${password}`)}`;
    const odataUrl = 'https://3.88.119.37:44300/sap/opu/odata/sap/ZDEMO_BTP_HR_SRV/$metadata';
    const apiUrl = process.env.REACT_APP_API_URL;
    const handlePrint = (Uuid) => {
        setuuid(Uuid);
        Changeprint(true);
        setIsScanning(false);
        openModal();

    }
    const handleScanning = () => {
        setIsScanning(!isScanning);
        Changeprint(false);
    }
   
    const handleScan = (result) => {
        if (result) {
            setScanResult(result.text); // Update scan result with the text property
            setIsScanning(false); // Optionally stop scanning after a successful scan

        }
    };
    useEffect(() => {
        if (allValues) {
            const newFormData = {
                image: "/images/laptop1.jpg",
                Uuid: "3",
                ItemName: allValues[0],
                Quantity: allValues[2],
                PostingDate: allValues[1],
                AssetValue: allValues[3],
                BusTransType: allValues[4],
                CompanyCode: allValues[5],
                AssetType: allValues[6],
                BusUnit: allValues[7],
                Currency: allValues[8],
                TradPartner: allValues[9],
                BaseUnitCode: allValues[10]
            }
            
            setDetails((prevDetails) => {
                const updatedDetails = [...prevDetails, newFormData];
                console.log("Updated Details:", updatedDetails); // Log to verify
                console.log(prevDetails);
                return updatedDetails;
            });
            
            
        }
    }, [allValues]);
   

    const openModal = () => {
        const modal = document.getElementById('exampleModal');
        if (modal) {
            modal.classList.add('show');
            modal.style.display = 'block';
            modal.setAttribute('aria-modal', 'true');
            modal.removeAttribute('aria-hidden');
        }
    };
    const closeModal = () => {
        const modal = document.getElementById('exampleModal');
        if (modal) {
            modal.classList.remove('show');
            modal.style.display = 'none';
            modal.setAttribute('aria-hidden', 'true');
            modal.removeAttribute('aria-modal');
        }
    };

    const handleError = (err) => {
        console.error(err); // Log any errors during scanning
    };


    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {

    //             const response = await axios.get('/sap/opu/odata/sap/ZDEMO_BTP_HR_SRV/ZBTP_DETAILSSet', {
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                     // 'x-csrf-token': csrfToken,
    //                     'Authorization': authHeader, // Replace with actual auth header if needed
    //                 },
    //             });
    //             setDetails(response.data.d.results);
    //         } catch (error) {
    //             console.error('Error fetching data:', error.message);
    //             if (error.response) {
    //                 console.error('Response data:', error.response.data);
    //                 console.error('Status code:', error.response.status);
    //             }
    //             if (error.request) {
    //                 console.error('No response received:', error.request);
    //             }
    //         }
    //     };

    //     fetchData();
    // }, []);
    const handleDownload = () => {
        // Get the QR code canvas element using the ref
        const canvas = qrRef.current.querySelector('canvas');

        if (canvas) {
            const imageUrl = canvas.toDataURL('image/png'); // Convert canvas to image URL
            const link = document.createElement('a'); // Create an anchor element
            link.href = imageUrl;
            link.download = 'QRCode.png'; // Set the download file name
            link.click(); // Trigger the download
        }
    };
    const handleView = (Item) => {
        setSelectedItem(Item);
        navigate('/view', { state: { selectedItem: Item } });
    }
    const handleNewAsset = () => {
        navigate('/form');

    }



    return (
        <div className="barcodepage">
            <div className="header">
                <img src={image} className="image" />

                {isScanning && (
                    <div>
                        <QrReader
                            delay={300}
                            onError={handleError}
                            onResult={handleScan}
                            style={{ width: '100%' }} // Styling for the QR Reader
                        />
                        <p style={{ marginTop: '10px' }}>Scanning...</p> {/* Indication of scanning */}
                    </div>
                )}


                {/* <button type="button" className="scanner" onClick={capture}>Scan</button> */}

                {/* {
                    print && (
                        <div>
                            <QRCodeCanvas value={uuid} size={100} level="H" />
                            <p>UUID: {uuid}</p>
                        </div>
                    )
                } */}
                <span className="button-group">

                    <button className="btn" onClick={handleScanning} >
                        {isScanning ? 'Stop Scanning' : 'Start Scanning'}
                    </button>
                    <button className="btn" onClick={handleNewAsset}>Add Asset</button>
                </span>



            </div>
            <div className="barcode">
                <div className="table">
                    <table className="employee-table">
                        <thead>
                            <tr>
                                <th></th>
                                <th>UUID</th>
                                <th>Item Name</th>
                                <th>Posting Date</th>
                                <th>Quantity</th>
                                <th>Asset Value</th>
                                <th>Business Transaction Type</th>
                                <th>Company Code</th>
                                <th>Asset Type</th>
                                <th>Business Unit</th>
                                <th>Currency</th>
                                <th>Trading Partner</th>
                                <th>Base Unit Code</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* <tr >
                                {allValues.map((value, index) => (
                                    <td key={index}>{value}</td>
                                ))}
                            </tr> */}
                            {Details.map((Item, index) => (
                                scanResult === Item.Uuid ? (
                                    <tr key={index} className="active">
                                        <td><img src={process.env.PUBLIC_URL + Item.image} alt={Item.ItemName} width="130" /></td>
                                        <td>{Item.Uuid}</td>
                                        <td>{Item.ItemName}</td>
                                        <td>{Item.PostingDate}</td>
                                        <td>{Item.Quantity}</td>
                                        <td>{Item.AssetValue}</td>
                                        <td>{Item.BusTransType}</td>
                                        <td>{Item.CompanyCode}</td>
                                        <td>{Item.AssetType}</td>
                                        <td>{Item.BusUnit}</td>
                                        <td>{Item.Currency}</td>
                                        <td>{Item.TradPartner}</td>
                                        <td>{Item.BaseUnitCode}</td>
                                        {/* <td><button type="button" className="btn" onClick={() => handlePrint(Item.Uuid)}  > Generate</button></td> */}
                                        <td><BsQrCode size={30} onClick={() => handlePrint(Item.Uuid)} /></td>
                                        <td><FaEye onClick={() => handleView(Item)} /></td>
                                    </tr>
                                ) : (
                                    <tr key={index}>
                                        <td><img src={process.env.PUBLIC_URL + Item.image} alt={Item.ItemName} width="130" /></td>
                                        <td>{Item.Uuid}</td>
                                        <td>{Item.ItemName}</td>
                                        <td>{Item.PostingDate}</td>
                                        <td>{Item.Quantity}</td>
                                        <td>{Item.AssetValue}</td>
                                        <td>{Item.BusTransType}</td>
                                        <td>{Item.CompanyCode}</td>
                                        <td>{Item.AssetType}</td>
                                        <td>{Item.BusUnit}</td>
                                        <td>{Item.Currency}</td>
                                        <td>{Item.TradPartner}</td>
                                        <td>{Item.BaseUnitCode}</td>
                                        {/* <td><button type="button" className="btn" onClick={() => handlePrint(Item.Uuid)}  > Generate</button></td> */}
                                        <td><BsQrCode size={30} onClick={() => handlePrint(Item.Uuid)} /></td>
                                        <td ><FaEye onClick={() => handleView(Item)} /></td>
                                    </tr>

                                )
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" width="1rem">
                <div className="modal-dialog">
                    <div className="modal-content" ref={qrRef}>

                        <div className="modal-body" style={{ paddingLeft: '12rem', display: 'flex', alignItems: 'center' }}>
                            <QRCodeCanvas value={uuid} size={120} level="H" />
                            {/* <div><p>UUID: {uuid}</p></div> */}

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleDownload}>Print</button>
                        </div>

                    </div>
                </div>
            </div>


        </div>

    )
}
export default Barcode