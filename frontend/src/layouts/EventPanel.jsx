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
            await fetch('https://api.calendar.anjieyu.net/events', {
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
            await fetch(`https://api.calendar.anjieyu.net/events/${event_id}`, {
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
                    <ul class="event-list">
                        {getEvents().length === 0 && (
                            <li><em>No events yet</em></li>
                        )}
                        {getEvents().map(event => (
                            <li class="event-item">
                                <div>
                                    <div class="event-title">{event.title}</div>
                                    {event.description && (
                                        <div class="event-description">{event.description}</div>
                                    )}
                                </div>
                                <button class="delete-button" onClick={() => deleteEvent(event.id)}> X </button> 
                            </li>
                        ))}
                    </ul>

                    <div class="add-event">
                        <h4> Add event </h4>
                        <input
                            type="text"
                            placeholder="title"
                            value={title()}
                            onInput={e => setTitle(e.target.value)}>
                        </input>
                        <input
                            type="text"
                            placeholder="description"
                            value={description()}
                            onInput={e => setDescription(e.target.value)}>
                        </input>
                        <button onClick={addEvent}> Add Event </button>
                        {message() && <p class="event-message"> {message()} </p>}
                    </div>
                </div>
            )}
        </div>
    );

}
export default EventPanel;