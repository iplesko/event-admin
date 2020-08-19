import React, { ReactElement, useState } from 'react';
import EventsContext, { EventsContextType } from "./EventsContext";
import { Event } from '../../model/Event';
import useCounter from "./hooks/useCounter";

interface Props {
  children: ReactElement;
}

export default ({children} : Props): ReactElement => {
  const [ events, setEvents ] = useState<Event[]>([])
  const { getAndIncrement } = useCounter();

  // TODO: make this better readable
  const context: EventsContextType = {
    events: events,
    addEvent: (e: Event) => setEvents(previousEvents => ([ ...previousEvents, { ...e, id: getAndIncrement() } ])),
    removeEvent: (eventId: number) => setEvents(previousEvents => previousEvents.filter(pe => pe.id !== eventId)),
    updateEvent: (eventId: number, e: Event) => setEvents(previousEvents => [ ...previousEvents ].map(
        pe => pe.id === eventId ? e : pe
    ))
  }

  return (
      <EventsContext.Provider value={context}>
        {children}
      </EventsContext.Provider>
  );
}
