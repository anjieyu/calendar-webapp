import {render} from 'solid-js/web';
import {createSignal} from 'solid-js';

function App() {
    const [currentPage, setCurrentPage] = createSignal('home');
    return (
        <div>
            <h1>My Calendar</h1>
        </div>
    );
};
render(() => <App />, document.getElementById('root'));