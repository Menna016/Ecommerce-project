import React, { useEffect, useState } from 'react';
import { CirclesWithBar } from 'react-loader-spinner';

export default function Loader() {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    console.log('Mounting');
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-15 z-50">
      <CirclesWithBar
        height="100"
        width="100"
        color="#4fa94d"
        outerCircleColor="#4fa94d"
        innerCircleColor="#4fa94d"
        barColor="#4fa94d"
        ariaLabel="circles-with-bar-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
}
