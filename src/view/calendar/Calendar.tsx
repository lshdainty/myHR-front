import CalendarSideBar from '@/components/calendar/SideBar';
import CalendarContent from '@/components/calendar';

import '@/view/calendar/calendar.scss';

const Calendar: React.FC = () => {
  return (
    <div className='calendar'>
      <CalendarSideBar />
      <CalendarContent />
    </div>
  );
}

export default Calendar;