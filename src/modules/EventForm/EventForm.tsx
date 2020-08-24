import React, {
  ChangeEvent, FormEvent, ReactElement, useEffect, useState,
} from 'react';
import {
  Button, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader,
} from 'reactstrap';
import { Event } from '../../model/Event';
import formatDate from '../../function/formatDate';

interface Props {
  heading: string;
  buttonText: string;
  onConfirm: (e: Event) => void;
  visible: boolean;
  toggleVisibility: () => void;
  displayedEvent?: Event;
}

const empty = () => ({
  name: '', from: new Date(), to: new Date(), description: '',
});

export default ({
  heading, buttonText, onConfirm, visible, toggleVisibility, displayedEvent,
}: Props): ReactElement => {
  const [event, setEvent] = useState<Event>(empty());

  const handleChangeText = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setEvent((prevState) => ({ ...prevState, [id]: value }));
  };

  const handleChangeDateRange = (e: ChangeEvent<HTMLInputElement>) => {
    let from: Date;
    let to: Date;

    const { id, value } = e.target;
    if (id === 'to') {
      to = new Date(value);
      from = event.from > to ? to : event.from;
    } else {
      from = new Date(value);
      to = from > event.to ? from : event.to;
    }
    setEvent((prevState) => ({ ...prevState, from, to }));
  };

  const confirm = (e: FormEvent) => {
    onConfirm(event);
    toggleVisibility();
    e.preventDefault();
  };

  useEffect(() => {
    if (visible) {
      setEvent(displayedEvent || empty());
    }
  }, [visible]);

  return (
    <Modal isOpen={visible} toggle={toggleVisibility}>
      <form onSubmit={confirm}>
        <ModalHeader toggle={toggleVisibility}>{heading}</ModalHeader>
        <ModalBody>

          <FormGroup required>
            <Label for="name">Event name *</Label>
            <Input required type="text" id="name" value={event.name} onChange={handleChangeText} />
          </FormGroup>

          <FormGroup required>
            <Label for="from">From *</Label>
            <Input required type="date" id="from" value={formatDate(event.from)} onChange={handleChangeDateRange} />
          </FormGroup>

          <FormGroup required>
            <Label for="to">To *</Label>
            <Input required type="date" id="to" value={formatDate(event.to)} onChange={handleChangeDateRange} />
          </FormGroup>

          <FormGroup>
            <Label for="description">Description</Label>
            <Input type="textarea" id="description" value={event.description} onChange={handleChangeText} />
          </FormGroup>

        </ModalBody>
        <ModalFooter>
          <Button color="primary" type="submit">{buttonText}</Button>
          {' '}
          <Button color="secondary" onClick={toggleVisibility}>Cancel</Button>
        </ModalFooter>
      </form>
    </Modal>
  );
};
