import React, { ReactElement, useState } from 'react';
import EventsContext, { EventsContextType } from "./EventsContext";
import { Event } from '../../model/Event';
import useCounter from "./hooks/useCounter";

interface Props {
  children: ReactElement;
}

const compareEvents = (a: Event, b: Event): number => {
  if (a.from === b.from) {
    return 0;
  }

  return a.from > b.from ? -1 : 1;
}

export default ({ children }: Props): ReactElement => {
  const [ events, setEvents ] = useState<Event[]>([])
  const { getAndIncrement } = useCounter();

  // TODO: make this better readable
  const context: EventsContextType = {
    events: events,
    addEvent: (e: Event) => setEvents(previousEvents => ([
      ...previousEvents, { ...e, id: getAndIncrement() }
    ].sort(compareEvents))),
    removeEvent: (eventId: number) => setEvents(previousEvents => previousEvents.filter(pe => pe.id !== eventId)),
    updateEvent: (e: Event) => setEvents(previousEvents => [ ...previousEvents ].map(
        pe => pe.id === e.id ? e : pe
    ).sort(compareEvents))
  }

  return (
      <EventsContext.Provider value={context}>
        {children}
      </EventsContext.Provider>
  );
}
