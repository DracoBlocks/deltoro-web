import React, { useEffect, useRef, useState } from 'react';
import { renderIcon } from '@download/blockies';

const BlockieIdenticon = ({ address, diameter, alt }) => {
  const [dataUrl, setDataUrl] = useState(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    renderIcon({ seed: address.toLowerCase() }, canvas);
    const updatedDataUrl = canvas.toDataURL();

    if (updatedDataUrl !== dataUrl) {
      setDataUrl(updatedDataUrl);
    }
  }, [dataUrl, address]);

  return (
    <>
      <canvas ref={canvasRef} style={{ display: "none" }} />
      <img src={dataUrl} height={diameter} width={diameter} alt={alt || ""} />
    </>
  );
};

export default BlockieIdenticon;