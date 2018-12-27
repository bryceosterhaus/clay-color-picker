import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import ColorPicker from './ColorPicker';

function App() {
	const [color, setColor] = useState('#8B0000');
	const [customColors, setCustoms] = useState([
		'#008000',
		'#00FFFF',
		'#0000FF'
	]);

	return (
		<ColorPicker
			label="Default Colors"
			onChange={setColor}
			value={color}
			customColors={customColors}
			onCustomColorsChange={setCustoms}
		/>
	);
}

ReactDOM.render(<App />, document.getElementById('root'));
