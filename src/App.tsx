import { ComponentPropsWithoutRef, useEffect } from "react";
import { useOverlay } from "./providers/overlay-provider.tsx";
import Modal from "@/components/modal.tsx";
import Drawer from "@/components/drawer.tsx";

const Button = (props: ComponentPropsWithoutRef<"button">) => {
  const { children, ...attributes } = props;

  return (
    <button
      {...attributes}
      className="w-[150px] h-[70px] rounded-md bg-slate-700 cursor-pointer text-white"
    >
      {children}
    </button>
  );
};

function App() {
  const overlay = useOverlay();

  const handlePrimaryButtonClick = async () => {
    try {
      const modal1 = await overlay.push("Modal1", Modal, { title: "Modal1" });
      alert(modal1);
    } catch (error) {
      console.error("오류 발생", error);
    }

    try {
      const modal2 = await overlay.push("Modal2", Modal, {
        title: "Modal2",
      });
      alert(modal2);
    } catch (error) {
      console.error("오류 발생", error);
    }
  };

  const handleSecondaryButtonClick = async () => {
    try {
      await overlay.push("Drawer", Drawer);
    } catch (error) {
      console.error(error);
    }
  };

  const initModal = async () => {
    try {
      const res1 = await overlay.push("test1", Modal, {});
      console.log(res1);
    } catch (error) {
      console.error("오류 발생", error);
    }
  };

  useEffect(() => {
    initModal();
  }, []);

  return (
    <div className="w-full h-full min-h-screen flex flex-col gap-4 items-center justify-center">
      <Button
        id="primary-button"
        data-test-id="primary-button"
        onClick={handlePrimaryButtonClick}
      >
        Open Modal
      </Button>
      <Button
        id="secondary-button"
        data-test-id="secondary-button"
        onClick={handleSecondaryButtonClick}
      >
        Open Drawer
      </Button>
    </div>
  );
}

export default App;
