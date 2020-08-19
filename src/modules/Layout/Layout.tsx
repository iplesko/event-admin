import React, { ReactElement } from 'react';
import { Col, Row, Container } from "reactstrap";
import './style.scss';

interface Props {
  children: ReactElement;
}

export default ({ children }: Props): ReactElement => (
    <Container>
      <Row>
        <Col>
          <h1>Event admin</h1>
          <hr />
          {children}
        </Col>
      </Row>
    </Container>
);
