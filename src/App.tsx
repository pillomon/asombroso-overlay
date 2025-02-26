import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {useOverlay} from "./providers/overlay-provider.tsx";

const Test = ({resolve, reject, title}: {resolve: (value: any) => void; reject: (value: any) => void;title: string;}) => {
  return (
    <dialog
      style={{
        width: '300px',
        height: '300px',
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <h1>{title}</h1>
      <button onClick={() => resolve('hello')}>resolve</button>
      <button onClick={() => reject('hello')}>reject</button>
    </dialog>
  );
}

function App() {
  const [count, setCount] = useState(0);
  const modal = useOverlay();

  const handleButtonClick = async () => {
    const res1 = await modal.push('test', Test, {title: 'eddie'})
    alert(res1);
    const res2 = await modal.push('test', Test, {title: 'eddie'})
    alert(res2);
  }

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        {/*<button onClick={() => setCount((count) => count + 1)}>*/}
        <button onClick={handleButtonClick}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
