import React, { useState } from 'react';
import './style.scss';
import {
  Badge, Button, Card, CardBody, CardSubtitle, CardText, CardTitle, Col, Row,
} from 'reactstrap';
import { useEventsContext } from '../EventsContext';
import { Event } from '../../model/Event';
import EventForm from '../EventForm';
import formatDate from '../../function/formatDate';

export default (): React.ReactElement => {
  const {
    events, updateEvent, removeEvent, addEvent,
  } = useEventsContext();

  const [addFormVisible, setAddFormVisible] = useState<boolean>(false);
  const toggleAddFormVisible = () => setAddFormVisible(!addFormVisible);

  const [editEvent, setEditEvent] = useState<Event>(null);
  const toggleEditFormVisible = () => setEditEvent(null);

  return (
    <>
      <EventForm
        heading="Add event"
        buttonText="Add"
        onConfirm={addEvent}
        visible={addFormVisible}
        toggleVisibility={toggleAddFormVisible}
      />
      <EventForm
        heading="Edit event"
        buttonText="Save"
        onConfirm={updateEvent}
        visible={editEvent !== null}
        toggleVisibility={toggleEditFormVisible}
        displayedEvent={editEvent}
      />

      <Row>
        <Col>
          <Button onClick={toggleAddFormVisible} color="success">Add event</Button>
        </Col>
      </Row>

      <Row className="event-list">
        {events.map((e) => {
          const now = new Date(Date.now());
          const past = e.from < new Date(now.setDate(now.getDate() - 1));
          return (
            <Col sm={4} key={e.id}>
              <Card className={past ? 'past-event' : ''}>
                <CardBody>
                  <CardTitle>
                    {`${e.name} `}
                    {past && <Badge color="info">Past event</Badge>}
                  </CardTitle>
                  <CardSubtitle className="text-muted">
                    {`${formatDate(e.from)} - ${formatDate(e.to)}`}
                  </CardSubtitle>
                  <CardText>{e.description}</CardText>
                  <Button color="primary" onClick={() => setEditEvent(e)}>Edit</Button>
                  <Button color="danger" onClick={() => removeEvent(e.id)}>Remove</Button>
                </CardBody>
              </Card>
            </Col>
          );
        })}
      </Row>
    </>
  );
};
