import {render} from 'solid-js/web';
import {createSignal} from 'solid-js';
import {Calendar} from './layouts/Calendar';
import './style.css';
 
function App() {
    const [currentPage, setCurrentPage] = createSignal('home');
    return (
        <div>
            <h1>My Calendar</h1>
            <div class='app-container'>
                <Calendar/>
            </div>
        </div>
    );
};
render(() => <App />, document.getElementById('root'));