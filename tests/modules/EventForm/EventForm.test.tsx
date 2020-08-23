import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import EventForm from '../../../src/modules/EventForm';
import { Event } from '../../../src/model/Event';

describe('EventForm component', () => {
  let testEvent: Event;

  beforeEach(() => {
    testEvent = {
      description: 'Test event description',
      from: new Date(2020, 3, 4),
      id: 123,
      name: 'Test event name',
      to: new Date(2020, 3, 6),
    };
  });

  it('should render correctly', () => {
    const { baseElement } = render(<EventForm
      displayedEvent={testEvent}
      toggleVisibility={jest.fn()}
      visible
      buttonText="Test button text"
      heading="Test heading"
      onConfirm={jest.fn()}
    />);

    expect(baseElement).toMatchSnapshot();
  });

  it('should call callback and close modal on confirm', () => {
    const callbackMock = jest.fn();
    const toggleVisibilityMock = jest.fn();

    const { baseElement } = render(<EventForm
      displayedEvent={testEvent}
      toggleVisibility={toggleVisibilityMock}
      visible
      buttonText="Test button text"
      heading="Test heading"
      onConfirm={callbackMock}
    />);

    userEvent.type(baseElement.querySelector("input[id='name']"), ' changed');
    userEvent.type(baseElement.querySelector("input[id='from']"), '2021-05-06');
    userEvent.type(baseElement.querySelector("input[id='to']"), '2021-05-07');
    userEvent.type(baseElement.querySelector("textarea[id='description']"), ' changed');
    userEvent.click(baseElement.querySelector("button[type='submit']"));

    expect(callbackMock).toHaveBeenCalledWith({
      id: 123,
      name: 'Test event name changed',
      from: new Date('2021-05-06'),
      to: new Date('2021-05-07'),
      description: 'Test event description changed',
    } as Event);
    expect(toggleVisibilityMock).toHaveBeenCalled();
  });

  it('should correct from date, when to date is set', () => {
    const { baseElement } = render(<EventForm
      toggleVisibility={jest.fn()}
      visible
      buttonText="Test button text"
      heading="Test heading"
      onConfirm={jest.fn()}
    />);

    userEvent.type(baseElement.querySelector("input[id='from']"), '2020-05-06');
    userEvent.type(baseElement.querySelector("input[id='to']"), '2020-03-31');

    const from = baseElement.querySelector("input[id='from']").getAttribute('value');
    expect(from).toBe('2020-03-31');
  });

  it('should correct to date, when from date is set', () => {
    const { baseElement } = render(<EventForm
      toggleVisibility={jest.fn()}
      visible
      buttonText="Test button text"
      heading="Test heading"
      onConfirm={jest.fn()}
    />);

    userEvent.type(baseElement.querySelector("input[id='to']"), '2020-05-06');
    userEvent.type(baseElement.querySelector("input[id='from']"), '2020-10-20');

    const from = baseElement.querySelector("input[id='to']").getAttribute('value');
    expect(from).toBe('2020-10-20');
  });
});
