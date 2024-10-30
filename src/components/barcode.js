import React, {useState } from "react";
import { QRCodeCanvas } from 'qrcode.react';
import { v4 as uuidv4 } from 'uuid';
const Barcode = () => {
    const [print, Changeprint] = useState(false);
    const uuid = uuidv4();

    const handleprint = () => {
        Changeprint(true);
    }
    return(
        <div>
        <button type="button" className="btn btn-primary" onClick={handleprint}>QRCode Generator</button>
        {
            print && (
                <div style={{ textAlign: 'center', marginTop: '20px' }}>

                    <QRCodeCanvas value={uuid} size={100} level="H" />
                    <p>UUID: {uuid}</p>
                </div>
            )
        }
        </div>
    )
}
export default Barcode