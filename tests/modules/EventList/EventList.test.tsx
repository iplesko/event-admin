import React from 'react'
import { render } from "@testing-library/react";
import EventList from "../../../src/modules/EventList/EventList";
import { useEventsContext } from "../../../src/modules/EventsContext/index";

jest.mock('../../../src/modules/EventsContext/index')

describe('EventList', () => {
  beforeEach(() => {
    (useEventsContext as jest.Mock).mockReturnValue({
      events: [ {
        description: "test event description",
        from: new Date(12345678),
        id: 123,
        name: "test event name",
        to: new Date(87654321)
      } ],
      addEvent: jest.fn(),
      removeEvent: jest.fn(),
      updateEvent: jest.fn(),
    })
  });

  test("should render correctly", () => {
    const { baseElement } = render(<EventList/>);

    expect(baseElement).toMatchSnapshot();
  });

  // TODO: test CRUD operations
})
