import ReactDOM         from 'react-dom';
import { MainProvider } from './MainContext';
import App              from './App';


ReactDOM.render(<MainProvider><App /></MainProvider>, document.getElementById('root'));

