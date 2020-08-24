import React from 'react';
import { shallow } from 'enzyme';
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
    const wrapper = shallow(<EventForm
      displayedEvent={testEvent}
      toggleVisibility={jest.fn()}
      visible
      buttonText="Test button text"
      heading="Test heading"
      onConfirm={jest.fn()}
    />);

    expect(wrapper.debug()).toMatchSnapshot();
  });

  it('should call callback and close modal on confirm', () => {
    const callbackMock = jest.fn();
    const toggleVisibilityMock = jest.fn();

    const wrapper = shallow(<EventForm
      displayedEvent={testEvent}
      toggleVisibility={toggleVisibilityMock}
      visible
      buttonText="Test button text"
      heading="Test heading"
      onConfirm={callbackMock}
    />);

    wrapper.find('Input[id="name"]').simulate('change', { target: { id: 'name', value: 'changed name' } });
    wrapper.find('Input[id="from"]').simulate('change', { target: { id: 'from', value: '2021-05-06' } });
    wrapper.find('Input[id="to"]').simulate('change', { target: { id: 'to', value: '2021-05-07' } });
    wrapper.find('Input[id="description"]').simulate('change', { target: { id: 'description', value: 'changed description' } });

    const preventDefaultMock = jest.fn();
    wrapper.find('form').simulate('submit', { preventDefault: preventDefaultMock });

    expect(callbackMock).toHaveBeenCalledWith({
      name: 'changed name',
      from: new Date('2021-05-06'),
      to: new Date('2021-05-07'),
      description: 'changed description',
    } as Event);
    expect(toggleVisibilityMock).toHaveBeenCalled();
    expect(preventDefaultMock).toHaveBeenCalled();
  });

  it('should correct from date, when to date is set', () => {
    const wrapper = shallow(<EventForm
      toggleVisibility={jest.fn()}
      visible
      buttonText="Test button text"
      heading="Test heading"
      onConfirm={jest.fn()}
    />);

    wrapper.find('Input[id="from"]').simulate('change', { target: { id: 'from', value: '2020-05-06' } });
    wrapper.find('Input[id="to"]').simulate('change', { target: { id: 'to', value: '2020-03-31' } });

    const from = wrapper.find('Input[id="from"]').prop('value');
    expect(from).toBe('2020-03-31');
  });

  it('should correct to date, when from date is set', () => {
    const wrapper = shallow(<EventForm
      toggleVisibility={jest.fn()}
      visible
      buttonText="Test button text"
      heading="Test heading"
      onConfirm={jest.fn()}
    />);

    wrapper.find('Input[id="to"]').simulate('change', { target: { id: 'to', value: '2020-05-06' } });
    wrapper.find('Input[id="from"]').simulate('change', { target: { id: 'from', value: '2020-10-20' } });

    const from = wrapper.find('Input[id="to"]').prop('value');
    expect(from).toBe('2020-10-20');
  });
});
