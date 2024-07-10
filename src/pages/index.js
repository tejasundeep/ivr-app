import { useState } from "react";

export default function Home() {
    const [calling, setCalling] = useState(false);
    const [callSid, setCallSid] = useState(null);
    const [error, setError] = useState(null);

    const makeCall = async () => {
        setCalling(true);
        setError(null);
        try {
            const response = await fetch("/api/call", {
                method: "POST",
            });
            const data = await response.json();
            if (response.ok) {
                setCallSid(data.callSid);
            } else {
                setError(data.error);
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setCalling(false);
        }
    };

    return (
        <div>
            <h1>IVR Calling Service</h1>
            <button onClick={makeCall} disabled={calling}>
                {calling ? "Calling..." : "Make a Call"}
            </button>
            {callSid && <p>Call SID: {callSid}</p>}
            {error && <p>Error: {error}</p>}
        </div>
    );
}
