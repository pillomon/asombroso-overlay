'use client';

import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import {useOverlay} from "../providers/overlay-provider.tsx";

const OverlayId = 'portal';

// const Overlay = () => {
//   return (
//     <div
//       id="overlay"
//       className="h-full w-full bg-alpha-black-50 backdrop-blur-md"
//     />
//   );
// };

export default function OverlayContainer() {
  const overlay = useOverlay();
  const topComponentInfo = overlay.top;
  const OverlayElement = document.getElementById(OverlayId);

  useEffect(() => {
    if (document.getElementById(OverlayId)) return;

    const OverlayElement = document.createElement('div');
    OverlayElement.id = OverlayId;
    document.body.append(OverlayElement);

    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // useEffect(() => {
  //   console.log(topComponentInfo);
  // }, [topComponentInfo]);


  if (!topComponentInfo || !OverlayElement) return <></>;

  return ReactDOM.createPortal(
    <div
      style={{
        width: '100vw',
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
      }}
    >
      <topComponentInfo.Component
        resolve={topComponentInfo.resolve}
        reject={topComponentInfo.reject}
        {...(topComponentInfo?.props ?? {})}
      />
    </div>,
    OverlayElement,
  );
}
