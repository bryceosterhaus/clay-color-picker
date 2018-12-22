import React, {useState} from 'react';
import PropTypes from 'prop-types';
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
				background: `#${value}`,
				border: '1px solid #E7E7ED',
				borderRadius: 4,
				cursor: 'pointer',
				height: size,
				padding: 0,
				width: size
			}}
			title={`#${value}`}
		/>
	);
}

function ColorPicker({colors, displayHex, type}) {
	const [selectedHex, setHex] = useState('FFFFFF');
	const [active, setActive] = useState(true);

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
						<div className="custom-control custom-checkbox">
							<Splotch
								className="btn btn-secondary"
								value={selectedHex}
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
							value={`#${selectedHex}`}
							readOnly
						/>
					</div>
				)}
			</div>

			{active &&
				type === 'defined' && (
					<div
						className="color-picker"
						style={{
							border: '1px solid',
							display: 'inline-block',
							padding: 24,
							borderRadius: 4
						}}
					>
						<div
							style={{
								gridGap: 16,
								display: 'grid',
								gridTemplateColumns: 'repeat(6, 24px)'
							}}
						>
							{colors.map(hex => (
								<Splotch
									onClick={() => setHex(hex)}
									key={hex}
									value={hex}
								/>
							))}
						</div>
					</div>
				)}
		</React.Fragment>
	);
}

ColorPicker.propTypes = {
	colors: PropTypes.arrayOf(PropTypes.string),
	displayHex: PropTypes.bool,
	type: PropTypes.oneOf(['defined', 'custom'])
};

ColorPicker.defaultProps = {
	colors: DEFAULT_COLORS,
	displayHex: false,
	type: 'defined'
};

export default ColorPicker;
