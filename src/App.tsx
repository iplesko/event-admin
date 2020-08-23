import React, { ReactElement } from 'react';
import EventList from './modules/EventList/EventList';
import { EventsContextProvider } from './modules/EventsContext';
import Layout from './modules/Layout/Layout';

export default (): ReactElement => (
  <Layout>
    <EventsContextProvider>
      <EventList />
    </EventsContextProvider>
  </Layout>
);
