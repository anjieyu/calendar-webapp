import {createSignal} from 'solid-js';
export function Calendar(props) {
    const current_date = new Date();
    const [year, setYear] = createSignal(current_date.getFullYear());
    const [month, setMonth] = createSignal(current_date.getMonth());

    return (
        <div class='calendar'>
            <div class='calendar-header'>
                <h2>{month()} {year()}</h2>
            </div>
        </div>
    );
}
export default Calendar;