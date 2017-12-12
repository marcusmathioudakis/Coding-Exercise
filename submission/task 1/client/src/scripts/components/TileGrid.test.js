import React from 'react';
import ReactDOM from 'react-dom';
import TileGrid from './TileGrid';
import { shallow } from 'enzyme';


it('shallow render without crashing', () => {
  const div = document.createElement('div');
  shallow(<TileGrid episodes={[]}/>);
});
