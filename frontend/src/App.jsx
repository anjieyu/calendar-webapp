import {render} from 'solid-js/web';
import {createSignal, onMount} from 'solid-js';
import {Calendar} from './layouts/Calendar';
import './style.css';
import {EventPanel} from './layouts/EventPanel';
 
function App() {
    const [selectedDate, setSelectedDate] = createSignal(null);
    const [allEvents, setAllEvents] = createSignal([]);
    
    const fetchAllEvents = async () => {
        try {
            const response = await fetch('https://calendar-api.anjieyu.net/events');
            const data = await response.json();
            setAllEvents(data);
        } catch(error) {
            console.error("could not load events");
        }
    };

    onMount(fetchAllEvents);

    return (
        <div>
            <h1>My Calendar</h1>
            <div class='app-container'>
                <Calendar
                    selectedDate = {selectedDate}
                    onSelectDay = {setSelectedDate}
                    allEvents = {allEvents}
                />
                <EventPanel
                    selectedDate = {selectedDate}
                    allEvents = {allEvents}
                    onEventChange = {fetchAllEvents}
                />
            </div>
        </div>
    );
};
render(() => <App />, document.getElementById('root'));