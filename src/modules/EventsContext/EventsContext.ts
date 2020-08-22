import { createContext } from 'react';
import { Event } from '../../model/Event'

export interface EventsContextType {
  events: Event[],
  addEvent: (e: Event) => void;
  removeEvent: (eventId: number) => void;
  updateEvent: (e: Event) => void
}

export default createContext<EventsContextType>(undefined);
