import React, {useState} from 'react';
import PropTypes from 'prop-types';
import tinycolor from 'tinycolor2';
import Hue from './Hue';
import GradientSelector from './GradientSelector';
import './ColorPicker.css';

const DEFAULT_COLORS = [
	'#000000',
	'#5F5F5F',
	'#9A9A9A',
	'#CBCBCB',
	'#E1E1E1',
	'#FFFFFF',
	'#FF0D0D',
	'#FF8A1C',
	'#2BA676',
	'#006EF8',
	'#7F26FF',
	'#FF21A0',
	'#FF5F5F',
	'#FFB46E',
	'#50D2A0',
	'#4B9BFF',
	'#AF78FF',
	'#FF73C3',
	'#FFB1B1',
	'#FFDEC0',
	'#91E3C3',
	'#9DC8FF',
	'#DFCAFF',
	'#FFC5E6',
	'#FFD9D9',
	'#FFF3E8',
	'#B1EBD5',
	'#C5DFFF',
	'#F8F2FF',
	'#FFEDF7'
];

function Splotch({size = 24, value, ...otherProps}) {
	return (
		<button
			{...otherProps}
			style={{
				background: value,
				border: '1px solid #E7E7ED',
				borderRadius: 4,
				cursor: 'pointer',
				height: size,
				padding: 0,
				width: size
			}}
			title={value}
		/>
	);
}

function ColorPicker({
	colors,
	customColors,
	displayHex,
	label,
	onChange,
	onCustomColorsChange,
	value
}) {
	const [active, setActive] = useState(true);

	value = tinycolor(value);

	const {h, s, v} = value.toHsv();
	const {r, g, b} = value.toRgb();

	const rgbArr = [[r, 'R'], [g, 'G'], [b, 'B']];

	return (
		<React.Fragment>
			<div className="input-group" onClick={() => setActive(!active)}>
				<div
					className={`input-group-item input-group-item-shrink ${
						displayHex ? 'input-group-prepend' : ''
					}`}
				>
					<span
						className="input-group-text input-group-text-secondary"
						style={{padding: 0}}
					>
						<div className="open-control open-checkbox">
							<Splotch
								className="btn btn-secondary"
								value={value.toHexString()}
								size={28}
							/>
						</div>
					</span>
				</div>
				{displayHex && (
					<div className="input-group-append input-group-item">
						<input
							aria-label="Search for"
							className="form-control"
							value={value.toHexString()}
							readOnly
						/>
					</div>
				)}
			</div>

			{active && (
				<div
					className="color-picker"
					style={{
						border: '1px solid',
						display: 'inline-block',
						padding: 24,
						borderRadius: 4
					}}
				>
					{label && (
						<label
							style={{
								fontSize: 14,
								color: '#6B6C7E',
								marginBottom: 16
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
						{colors.map(hex => (
							<Splotch
								onClick={() => onChange(hex)}
								key={hex}
								value={hex}
							/>
						))}
					</div>

					<div>
						<label
							style={{
								fontSize: 14,
								color: '#6B6C7E',
								margin: '16px 0'
							}}
						>
							{'Custom Colors'}
						</label>

						<div
							style={{
								gridGap: 16,
								display: 'grid',
								gridTemplateColumns: 'repeat(6, 24px)'
							}}
						>
							{Array(12)
								.fill('#FFF')
								.map((hex, i) => (
									<Splotch
										onClick={() => {}}
										key={i}
										value={hex}
									/>
								))}
						</div>

						<div style={{display: 'flex', margin: '20px 0'}}>
							<GradientSelector
								hue={h}
								color={value}
								onChange={(saturation, visibility) =>
									onChange(
										tinycolor({
											h: h,
											s: saturation,
											v: visibility
										}).toHexString()
									)
								}
							/>

							<div style={{marginLeft: 16}}>
								{rgbArr.map(([val, name]) => (
									<input
										className="form-control"
										key={name}
										value={`${name}: ${val}`}
										readOnly
										style={{
											marginBottom: 16,
											width: 64,
											height: 32,
											padding: 8,
											fontSize: 14
										}}
									/>
								))}
							</div>
						</div>

						<Hue
							onChange={hue =>
								onChange(
									tinycolor({h: hue, s, v}).toHexString()
								)
							}
							value={h}
						/>

						<input
							className="form-control"
							value={value.toHexString().toUpperCase()}
							readOnly
							style={{marginTop: 20}}
						/>
					</div>
				</div>
			)}
		</React.Fragment>
	);
}

ColorPicker.propTypes = {
	colors: PropTypes.arrayOf(PropTypes.string),
	customColors: PropTypes.arrayOf(PropTypes.string),
	displayHex: PropTypes.bool,
	label: PropTypes.string,
	onChange: PropTypes.func,
	onCustomColorsChange: PropTypes.func,
	value: PropTypes.string
};

ColorPicker.defaultProps = {
	colors: DEFAULT_COLORS,
	customColors: [],
	displayHex: false,
	onChange: () => {},
	onCustomColorsChange: () => {},
	value: '#FFF'
};

export default ColorPicker;
