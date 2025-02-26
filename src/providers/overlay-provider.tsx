import React, {createContext, useContext, useState} from 'react';
import OverlayController from "../controllers/overlay-controller.ts";
import OverlayContainer from "../components/portal.tsx";

interface ProviderType {
  children: React.ReactNode
}

const OverlayContext = createContext<OverlayController | null>(null);

export default function OverlayProvider({ children }: ProviderType) {
  const flagState = useState(1);
  const [overlayController] = useState(() => new OverlayController(flagState))

  return (
    <OverlayContext.Provider value={overlayController}>
      {children}
      <OverlayContainer />
    </OverlayContext.Provider>
  );
}
// eslint-disable-next-line react-refresh/only-export-components
export const useOverlay = () => {
  const data = useContext(OverlayContext);

  if (data === null)
    throw new Error(
      'ContextAPI initialize error.',
    );

  return data;
};
