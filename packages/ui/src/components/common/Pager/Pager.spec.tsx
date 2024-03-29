import { mount, shallow } from 'enzyme';
import * as React from 'react';
import Pager from './Pager';

describe('Pager', () => {
  it('renders without crashing', () => {
    const component = shallow(<Pager />);
    expect(component).toBeDefined();
  });

  it('mounts without crash', () => {
    const component = mount(<Pager />);
    expect(component).toBeDefined();
  });
});
