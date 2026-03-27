import {render} from 'solid-js/web';
import {createSignal, onMount} from 'solid-js';
import {Calendar} from './layouts/Calendar';
import './style.css';
 
function App() {
    const [currentPage, setCurrentPage] = createSignal('home');
    const [selectedDate, setSelectedDate] = createSignal(null);
    const [allEvents, setAllEvents] = createSignal([]);
    return (
        <div>
            <h1>My Calendar</h1>
            <div class='app-container'>
                <Calendar
                    selectedDate = {selectedDate}
                    onSelectDay = {setSelectedDate}
                    allEvents = {allEvents}
                />
            </div>
        </div>
    );
};
render(() => <App />, document.getElementById('root'));