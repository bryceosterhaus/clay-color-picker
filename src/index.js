import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import ColorPicker from './ColorPicker';

function App() {
	const [color, setColor] = useState();
	const [color2, setColor2] = useState();
	const [customColors, setCustoms] = useState([
		'#008000',
		'#00FFFF',
		'#0000FF'
	]);

	return (
		<div>
			<ColorPicker
				allowAny
				label="Default Colors"
				onValueChange={setColor}
				value={color}
			/>

			<ColorPicker
				colors={customColors}
				label="Custom Colors"
				onColorsChange={setCustoms}
				onValueChange={setColor2}
				value={color2}
			/>
		</div>
	);
}

ReactDOM.render(<App />, document.getElementById('root'));
