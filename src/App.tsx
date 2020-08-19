import React from 'react';
import EventList from "./modules/EventList/EventList";
import { EventsContextProvider } from "./modules/EventsContext/index";

export default () => (
    <EventsContextProvider>
      <EventList />
    </EventsContextProvider>
);
