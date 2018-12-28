import React, {useState} from 'react';
import PropTypes from 'prop-types';
import tinycolor from 'tinycolor2';
import Hue from './Hue';
import Splotch from './Splotch';
import GradientSelector from './GradientSelector';

Custom.propTypes = {
	colors: PropTypes.arrayOf(PropTypes.string),
	label: PropTypes.string,
	onChange: PropTypes.func,
	onColorsChange: PropTypes.func,
	value: PropTypes.string
};

function Custom({colors, label, onChange, onColorsChange, value}) {
	const [activeColor, setActiveColor] = useState(0);
	const [hue, setHue] = useState(0);

	const color = tinycolor(value);

	const {r, g, b} = color.toRgb();
	const {s, v} = color.toHsv();

	const rgbArr = [[r, 'R'], [g, 'G'], [b, 'B']];

	const setNewColor = newColorHex => {
		const newColors = [...colors];

		newColors[activeColor] = newColorHex;

		onColorsChange(newColors);

		onChange(newColorHex);
	};

	return (
		<div>
			{label && (
				<label
					style={{
						fontSize: 14,
						color: '#6B6C7E',
						margin: '16px 0'
					}}
				>
					{label}
				</label>
			)}

			<div
				style={{
					gridGap: 16,
					display: 'grid',
					gridTemplateColumns: 'repeat(6, 24px)'
				}}
			>
				{colors.map((hex, i) => (
					<Splotch
						active={hex === value}
						onClick={() => {
							setActiveColor(i);

							setHue(tinycolor(hex).toHsv().h);

							onChange(hex);
						}}
						key={i}
						value={hex}
					/>
				))}
			</div>

			<div style={{display: 'flex', margin: '20px 0'}}>
				<GradientSelector
					hue={hue}
					color={color}
					onChange={(saturation, visibility) => {
						setNewColor(
							tinycolor({
								h: hue,
								s: saturation,
								v: visibility
							}).toHexString()
						);
					}}
				/>

				<div style={{marginLeft: 16}}>
					{rgbArr.map(([val, name]) => (
						<React.Fragment key={name}>
							<label>{name}</label>

							<input
								className="form-control"
								value={val}
								onChange={event => {
									const newVal = Number(event.target.value);

									const color = tinycolor({
										r: name === 'R' ? newVal : r,
										g: name === 'G' ? newVal : g,
										b: name === 'B' ? newVal : b
									});

									setHue(color.toHsv().h);

									setNewColor(color.toHexString());
								}}
								style={{
									marginBottom: 16,
									width: 64,
									height: 32,
									padding: 8,
									fontSize: 14
								}}
							/>
						</React.Fragment>
					))}
				</div>
			</div>

			<Hue
				onChange={hue => {
					setHue(hue);

					setNewColor(tinycolor({h: hue, s, v}).toHexString());
				}}
				value={hue}
			/>

			<input
				className="form-control"
				value={color.toHexString().toUpperCase()}
				readOnly
				style={{marginTop: 20}}
			/>
		</div>
	);
}

export default Custom;
