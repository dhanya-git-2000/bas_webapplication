import React from "react";
import { useLocation } from 'react-router-dom';
import image from '../images/BAS-logo-1.jpg'
import { useNavigate } from "react-router-dom";

const View = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const selectedItem = location.state?.selectedItem;
    const handlePreviouspage=()=>{
        navigate("/");
    }

    return (

        <div style={{ width: "100%", backgroundColor: "white", overflow: "auto" }}>
            <div className="header">
                <img src={image} className="image" />
                <span className="button-group">

                    <button className="btn" onClick={handlePreviouspage} >
                        Back
                    </button>

                </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: "0rem 4rem" }}>

                <div style={{ textAlign: 'start', maxWidth: '2000px', textJustify: "auto", paddingLeft: "1rem"}}>
                    <h3>DELL INSPIRON 5584-N1268-SLR 15.6" FHD Laptop</h3>
                    <p>
                        The DELL INSPIRON 5584-N1268-SLR 15.6" FHD Laptop is a powerful and versatile laptop designed for both work and entertainment. Equipped with a 15.6-inch Full HD display, it delivers crisp visuals and a vibrant viewing experience, perfect for productivity tasks, media consumption, and gaming. Its Intel Core i5 processor ensures smooth performance, handling everyday applications and multitasking with ease.
                    </p>
                </div>

            </div>
            <div style={{ display: "flex", flexDirection: "row", alignItems: "flex-start" }}>
                {/* Image Section */}
                <div style={{ width: "150px", marginRight: "2rem", textAlign: "center", padding: "0rem 4rem ", marginTop: "2rem" }}>
                    <img src={process.env.PUBLIC_URL + selectedItem.image} alt={selectedItem.ItemName} width="500" />
                </div>

                {/* Details Section */}
                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", width: "100rem", paddingLeft: "30rem", marginTop: "1rem" }}>
                    {[
                        { label: "UUID", value: selectedItem.Uuid },
                        { label: "Item Name", value: selectedItem.ItemName },
                        { label: "Posting Date", value: selectedItem.PostingDate },
                        { label: "Quantity", value: selectedItem.Quantity },
                        { label: "Asset Value", value: selectedItem.AssetValue },
                        { label: "Business Transaction Type", value: selectedItem.BusTransType },
                        { label: "Company Code", value: selectedItem.CompanyCode },
                        { label: "Asset Type", value: selectedItem.AssetType },
                        { label: "Business Unit", value: selectedItem.BusUnit },
                        { label: "Currency", value: selectedItem.Currency },
                        { label: "Trading Partner", value: selectedItem.TradPartner },
                        { label: "Base Unit Code", value: selectedItem.BaseUnitCode },
                    ].map(({ label, value }, index) => (
                        <div key={index} style={{ flex: "1 1 45%", textAlign: "start", marginBottom: "1rem", fontSize: "15px" }}>
                            <p style={{ marginBottom: "0", fontWeight: "bold" }}>{label}:</p>
                            <p>{value}</p>
                        </div>
                    ))}
                </div>

                {/* <div
                    className="modal-body"
                    style={{
                        paddingLeft: '30rem',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        textAlign:"center",
                        fontSize:"13px"
                    }}
                >
                    <p>UUID: {selectedItem.Uuid}</p>
                    <p>Item Name: {selectedItem.ItemName}</p>
                    <p>Posting Date: {selectedItem.PostingDate}</p>
                    <p>Quantity: {selectedItem.Quantity}</p>
                    <p>Asset Value: {selectedItem.AssetValue}</p>
                    <p>Business Transaction Type: {selectedItem.BusTransType}</p>
                    <p>Company Code: {selectedItem.CompanyCode}</p>
                    <p>Asset Type: {selectedItem.AssetType}</p>
                    <p>Business Unit: {selectedItem.BusUnit}</p>
                    <p>Currency: {selectedItem.Currency}</p>
                    <p>Trading Partner: {selectedItem.TradPartner}</p>
                    <p>Base Unit Code: {selectedItem.BaseUnitCode}</p>
                </div> */}
            </div>

        </div>

    )

}

export default View 