import dynamic from "next/dynamic";
import { useState } from "react";

const InvoicePDF = dynamic(() => import("./react_pdf"), {
    ssr:false
});

const View = ( ) => {
    const [client, setClient] = useState(false);


    return(
        <InvoicePDF></InvoicePDF>
    )
}

export default View;