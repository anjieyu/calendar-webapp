import {createSignal} from 'solid-js';
export function Calendar(props) {
    const current_date = new Date();
    const [year, setYear] = createSignal(current_date.getFullYear());
    const [month, setMonth] = createSignal(current_date.getMonth());
    const current_day = current_date.toISOString().split('T')[0];

    const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August","September","October", "November","December"];
    const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const first_day = () => new Date(year(), month(), 1).getDay();
    const days_in_month = () => new Date(year(), month()+1, 0).getDate();
    const format_date = (day) => {
        const mm = String(month()+1).padStart(2, '0');
        const dd = String(day).padStart(2, '0');
        return `${year()}-${mm}-${dd}`;
    }

    return (
        <div class='calendar'>
            <div class='calendar-header'>
                <h2>{MONTH_NAMES[month()]} {year()} {current_day}</h2>
            </div>
            <div class='calendar-grid'>
                {DAY_NAMES.map(name => (
                    <div class='day-header'>{name}</div>
                ))}
                {Array(first_day()).fill(null).map(() => (
                    <div class='day-cell empty'></div>
                ))}
                {Array(days_in_month()).fill(null).map((_, i) => {
                    const day = i+1;
                    const date = format_date(day);
                    const is_today = date === current_day;
                    return(
                        <div class={`day-cell ${is_today ? 'today' : 'date'}`}>{day}</div>
                    );
                })}
            </div>
        </div>
    );
}
export default Calendar;