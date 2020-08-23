import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import App from '../src/App';

describe('App component', () => {
  it('should render correctly', () => {
    const renderer = ShallowRenderer.createRenderer();
    renderer.render(<App />);

    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });
});
