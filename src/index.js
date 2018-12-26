import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import ColorPicker from './ColorPicker';

function App() {
	const [color, setColor] = useState();

	return <ColorPicker onChange={setColor} value={color} />;
}

ReactDOM.render(<App />, document.getElementById('root'));
