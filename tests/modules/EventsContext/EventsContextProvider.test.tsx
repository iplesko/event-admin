import React from 'react';
import { act } from '@testing-library/react';
import { mount } from 'enzyme';
import { EventsContextProvider } from '../../../src/modules/EventsContext';
import EventsContext, { EventsContextType } from '../../../src/modules/EventsContext/EventsContext';

// TODO: figure out how to extract mount() to method, id doesn't work for some reason 🤷‍
describe('EventsContextProvider component', () => {
  it('should perform CRUD operations correctly', () => {
    let contextValue: EventsContextType;
    mount(
      <EventsContextProvider>
        <EventsContext.Consumer>
          {(context) => {
            contextValue = context;
            return null;
          }}
        </EventsContext.Consumer>
      </EventsContextProvider>,
    );

    // read
    expect(contextValue.events).toHaveLength(0);

    const testEvent = {
      name: 'First event',
      from: new Date('2020-05-15'),
      to: new Date('2020-05-16'),
      description: 'First event decription',
    };

    // create
    act(() => {
      contextValue.addEvent(testEvent);
    });
    expect(contextValue.events).toStrictEqual([{ ...testEvent, id: 0 }]);

    // update
    act(() => {
      contextValue.updateEvent({ ...testEvent, id: 0, name: 'Changed name' });
    });
    expect(contextValue.events).toStrictEqual([{ ...testEvent, name: 'Changed name', id: 0 }]);

    // remove
    act(() => {
      contextValue.removeEvent(0);
    });
    expect(contextValue.events).toHaveLength(0);
  });

  it('should sort new events by from date descending', () => {
    let contextValue: EventsContextType;
    mount(
      <EventsContextProvider>
        <EventsContext.Consumer>
          {(context) => {
            contextValue = context;
            return null;
          }}
        </EventsContext.Consumer>
      </EventsContextProvider>,
    );

    const e1 = {
      name: 'Event 1', from: new Date('2020-05-10'), to: new Date('2020-05-10'), description: '',
    };
    const e2 = {
      name: 'Event 1', from: new Date('2021-05-10'), to: new Date('2020-05-10'), description: '',
    };

    act(() => {
      contextValue.addEvent(e1);
    });
    act(() => {
      contextValue.addEvent(e2);
    });

    expect(contextValue.events).toStrictEqual([{ ...e2, id: 1 }, { ...e1, id: 0 }]);
  });

  it('should sort edited events by from date descending', () => {
    let contextValue: EventsContextType;
    mount(
      <EventsContextProvider>
        <EventsContext.Consumer>
          {(context) => {
            contextValue = context;
            return null;
          }}
        </EventsContext.Consumer>
      </EventsContextProvider>,
    );

    const e1 = {
      name: 'Event 1', from: new Date('2020-05-10'), to: new Date('2020-05-10'), description: '',
    };
    const e2 = {
      name: 'Event 1', from: new Date('2021-05-10'), to: new Date('2020-05-10'), description: '',
    };

    act(() => {
      contextValue.addEvent(e1);
    });
    act(() => {
      contextValue.addEvent(e2);
    });
    act(() => {
      contextValue.updateEvent({ ...e1, id: 0, from: new Date('2022-10-20') });
    });

    expect(contextValue.events).toStrictEqual([{ ...e1, id: 0, from: new Date('2022-10-20') }, { ...e2, id: 1 }]);
  });
});
