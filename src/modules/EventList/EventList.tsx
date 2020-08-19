import React from 'react';
import './style.scss';
import { useEventsContext } from "../EventsContext/index";
import { Event } from '../../model/Event';

export default (): React.ReactElement => {
  const { events, updateEvent, removeEvent, addEvent } = useEventsContext();

  const add = () => addEvent({
    name: "e1n",
    description: "e1d",
    from: new Date(),
    to: new Date(),
  })

  const update = (eventId: number, event: Event) => updateEvent(eventId, {...event, description: "updated"})

  return (
      <div>
        <button onClick={add}>A</button>
        <ul className="test">
          {events.map(e => (
              <li key={e.id}>
                {e.id}, {e.name}, {e.description},
                <button onClick={() => removeEvent(e.id)}>R</button>
                <button onClick={() => update(e.id, e)}>U</button>
              </li>
          ))}
        </ul>
      </div>
  );
}
