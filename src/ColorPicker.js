import React, {useState} from 'react';
import PropTypes from 'prop-types';
import tinycolor from 'tinycolor2';
import Hue from './Hue';
import Saturation from './Saturation';
import './ColorPicker.css';

const DEFAULT_COLORS = [
	'000000',
	'5F5F5F',
	'9A9A9A',
	'CBCBCB',
	'E1E1E1',
	'FFFFFF',
	'FF0D0D',
	'FF8A1C',
	'2BA676',
	'006EF8',
	'7F26FF',
	'FF21A0',
	'FF5F5F',
	'FFB46E',
	'50D2A0',
	'4B9BFF',
	'AF78FF',
	'FF73C3',
	'FFB1B1',
	'FFDEC0',
	'91E3C3',
	'9DC8FF',
	'DFCAFF',
	'FFC5E6',
	'FFD9D9',
	'FFF3E8',
	'B1EBD5',
	'C5DFFF',
	'F8F2FF',
	'FFEDF7'
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

function ColorPicker({colors, displayHex, type, value, onChange}) {
	const [active, setActive] = useState(true);

	const {r, g, b} = value.toRgb();
	const {h, s, v} = value.toHsv();

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
					{type === 'restricted' && (
						<div
							style={{
								gridGap: 16,
								display: 'grid',
								gridTemplateColumns: 'repeat(6, 24px)'
							}}
						>
							{colors.map(hex => (
								<Splotch
									onClick={() => onChange(tinycolor(hex))}
									key={hex}
									value={hex}
								/>
							))}
						</div>
					)}

					{type === 'open' && (
						<div>
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

							<div style={{display: 'flex'}}>
								<Saturation
									hue={h}
									color={value}
									onChange={(saturation, visibility) => {
										onChange(
											tinycolor({
												h,
												s: saturation,
												v: visibility
											})
										);
									}}
								/>

								<div>
									<div>R: {r}</div>

									<div>G: {g}</div>

									<div>B: {b}</div>
								</div>
							</div>

							<Hue
								onChange={hue => {
									onChange(
										tinycolor(`hsl(${hue}, 100%, 50%)`)
									);
								}}
								value={h}
							/>
						</div>
					)}
				</div>
			)}
		</React.Fragment>
	);
}

ColorPicker.propTypes = {
	colors: PropTypes.arrayOf(PropTypes.string),
	displayHex: PropTypes.bool,
	type: PropTypes.oneOf(['restricted', 'open'])
};

ColorPicker.defaultProps = {
	colors: DEFAULT_COLORS,
	displayHex: false,
	type: 'open',

	value: tinycolor('#FFF'),
	onChange: () => {}
};

export default ColorPicker;
