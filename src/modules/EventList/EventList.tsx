import React from 'react';
import './style.scss';
import { useEventsContext } from "../EventsContext/index";
import { Event } from '../../model/Event';
import { Button, Card, CardBody, CardSubtitle, CardText, CardTitle, Col, Row } from 'reactstrap';

export default (): React.ReactElement => {
  const { events, updateEvent, removeEvent, addEvent } = useEventsContext();

  const add = () => addEvent({
    name: "e1n",
    description: "e1d",
    from: new Date(),
    to: new Date(),
  })

  const update = (eventId: number, event: Event) => updateEvent(eventId, { ...event, description: "updated" })

  return (
      <>
        <Row>
          <Col>
            <Button onClick={add} color="success">Add event</Button>
          </Col>
        </Row>

        <Row className="event-list">
          {events.map(e => (
              <Col sm={4} key={e.id}>
                <Card>
                  <CardBody>
                    <CardTitle>{e.name}</CardTitle>
                    <CardSubtitle className="text-muted">{e.from.toUTCString()} - {e.to.toUTCString()}</CardSubtitle>
                    <CardText>{e.description}</CardText>
                    <Button color="primary" onClick={() => update(e.id, e)}>Edit</Button>
                    <Button color="danger" onClick={() => removeEvent(e.id)}>Remove</Button>
                  </CardBody>
                </Card>
              </Col>
          ))}
        </Row>
      </>
  );
}
