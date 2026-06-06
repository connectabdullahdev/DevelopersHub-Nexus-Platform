import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useState } from 'react';

const CalendarPage = () => {
  const [events, setEvents] = useState([
    { title: 'Meeting with Investor', date: '2026-06-05', backgroundColor: '#3b82f6' },
    { title: 'Startup Review', date: '2026-06-08', backgroundColor: '#10b981' },
    { title: 'Demo Day', date: '2026-06-12', backgroundColor: '#f59e0b' },
  ]);

  const handleDateClick = (arg: any) => {
    const title = prompt('Meeting title:');
    if (title) {
      setEvents([...events, { title, date: arg.dateStr, backgroundColor: '#3b82f6' }]);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">Meeting Calendar</h1>
      <p className="text-gray-500 mb-6">Click any date to add a meeting</p>
      <div className="bg-white rounded-xl shadow p-6">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek'
          }}
          events={events}
          dateClick={handleDateClick}
          height="auto"
        />
      </div>
    </div>
  );
};

export default CalendarPage;