import { useContext } from 'react';
import EventsContext, { EventsContextType } from '../EventsContext';

export default (): EventsContextType => useContext<EventsContextType>(EventsContext);
