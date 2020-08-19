import React from 'react'
import { render } from "@testing-library/react";
import DemoModule from "../../../src/modules/DemoModule/DemoModule";

describe('DemoModule', () => {
  test("should render correctly", () => {
    const { baseElement } = render(<DemoModule/>);

    expect(baseElement).toMatchSnapshot();
  })
})
