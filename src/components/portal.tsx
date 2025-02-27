'use client';

import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import {useOverlay} from "../providers/overlay-provider.tsx";

const OverlayId = 'portal';

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

  if (!topComponentInfo || !OverlayElement) return <></>;

  return ReactDOM.createPortal(
    <div
      className="w-screen backdrop-blur-md h-screen fixed top-0 left-0 z-[9999] flex items-center justify-center bg-black/50"
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
