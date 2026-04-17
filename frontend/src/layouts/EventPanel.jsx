import {createSignal} from 'solid-js';
export function EventPanel(props) {
    const [title, setTitle] = createSignal("");
    const [description, setDescription] = createSignal("");
    const [message, setMessage] = createSignal("");

    const getEvents = () => {
        if (!props.selectedDate()) return [];
        return props.allEvents().filter(e => e.date === props.selectedDate());
    };

    const addEvent = async () => {
        try {
            await fetch('http://localhost:8000/events', {
               method: 'POST',
               headers: { 'Content-Type': 'application/json'},
               body: JSON.stringify({
                    title: title(),
                    date: props.selectedDate(),
                    description: description()
               }) 
            });
            setMessage("Event added");
            setTitle("");
            setDescription("");
            props.onEventChange();
        } catch (error) {
            setMessage("Event could not be added");
        }
    };
    const deleteEvent = async (event_id) => {
        try {
            await fetch(`http://localhost:8000/events/${event_id}`, {
                method: 'DELETE'
            });
            props.onEventChange();
        } catch(error) {
            setMessage("Event could not be deleted");
        }
    };

    return (
        <div class="event-panel">
            {!props.selectedDate() ? (
                <p class="no-date-selected"> Start adding events by clicking on a day </p>
            ) : (
                <div>
                    <h3> {props.selectedDate()} </h3>
                </div>
            )}
        </div>
    );

}
export default EventPanel;