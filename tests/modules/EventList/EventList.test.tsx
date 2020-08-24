import React from 'react';
import { shallow } from 'enzyme';
import { Button, Card } from 'reactstrap';
import EventList from '../../../src/modules/EventList/EventList';
import { useEventsContext } from '../../../src/modules/EventsContext';
import EventForm from '../../../src/modules/EventForm';
import { Event } from '../../../src/model/Event';

jest.mock('../../../src/modules/EventsContext');

describe('EventList', () => {
  let addEventMock: jest.Mock;
  let updateEventMock: jest.Mock;
  let removeEventMock: jest.Mock;
  let testEvent: Event;

  beforeEach(() => {
    testEvent = {
      id: 123,
      name: 'test event name',
      from: new Date(12345678),
      to: new Date(87654321),
      description: 'test event description',
    };
    addEventMock = jest.fn();
    updateEventMock = jest.fn();
    removeEventMock = jest.fn();

    (useEventsContext as jest.Mock).mockReturnValue({
      events: [testEvent],
      addEvent: addEventMock,
      removeEvent: removeEventMock,
      updateEvent: updateEventMock,
    });
  });

  it('should render correctly', () => {
    const wrapper = shallow(<EventList />);

    expect(wrapper.debug()).toMatchSnapshot();
  });

  it('should add new event', () => {
    const wrapper = shallow(<EventList />);

    wrapper.find(EventForm).at(0).prop('onConfirm')(testEvent);

    expect(addEventMock).toHaveBeenCalledWith(testEvent);
  });

  it('should edit event', () => {
    const wrapper = shallow(<EventList />);

    wrapper.find(EventForm).at(1).prop('onConfirm')(testEvent);

    expect(updateEventMock).toHaveBeenCalledWith(testEvent);
  });

  it('should delete event', () => {
    const wrapper = shallow(<EventList />);

    wrapper.find(Button)
      .filterWhere((button) => button.prop('color') === 'danger')
      .simulate('click');

    expect(removeEventMock).toHaveBeenCalledWith(123);
  });

  it('should render future and past event', () => {
    Date.now = jest.fn().mockReturnValue(new Date('2020-07-21').getTime());

    (useEventsContext as jest.Mock).mockReturnValue({
      events: [{
        id: 1,
        name: 'future event',
        from: new Date('2020-07-21'),
        to: new Date('2020-07-21'),
      }, {
        id: 2,
        name: 'past event',
        from: new Date('2020-07-19'),
        to: new Date('2020-07-19'),
      }],
      addEvent: addEventMock,
      removeEvent: removeEventMock,
      updateEvent: updateEventMock,
    });

    const wrapper = shallow(<EventList />);

    const cards = wrapper.find(Card);
    expect(cards.at(0).prop('className')).not.toContain('past-event');
    expect(cards.at(1).prop('className')).toContain('past-event');
  });

  it('should display add event modal', () => {
    const wrapper = shallow(<EventList />);

    wrapper.find(Button)
      .filterWhere((button) => button.prop('color') === 'success')
      .simulate('click');

    expect(wrapper.find(EventForm).at(0).prop('visible')).toBeTruthy();
  });

  it('should display edit event modal', () => {
    const wrapper = shallow(<EventList />);

    wrapper.find(Card)
      .at(0)
      .find('Button')
      .filterWhere((button) => button.prop('color') === 'primary')
      .simulate('click');

    expect(wrapper.find(EventForm).at(1).prop('visible')).toBeTruthy();
  });
});
