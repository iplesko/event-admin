import React from 'react';
import EventList from "./modules/EventList/EventList";
import { EventsContextProvider } from "./modules/EventsContext/index";
import Layout from "./modules/Layout/Layout";

export default () => (
    <Layout>
      <EventsContextProvider>
        <EventList/>
      </EventsContextProvider>
    </Layout>
);
