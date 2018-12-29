import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Custom from './Custom';
import Basic from './Basic';
import Splotch from './Splotch';
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

ColorPicker.propTypes = {
	colors: PropTypes.arrayOf(PropTypes.string),
	displayHex: PropTypes.bool,
	label: PropTypes.string,
	onColorsChange: PropTypes.func,
	onValueChange: PropTypes.func,
	value: PropTypes.string
};

ColorPicker.defaultProps = {
	colors: null,
	displayHex: true,
	label: 'Colors',
	onColorsChange: null,
	onValueChange: () => {},
	value: '#FFFFFF'
};

function ColorPicker({
	colors,
	displayHex,
	label,
	onColorsChange,
	onValueChange,
	value
}) {
	const [active, setActive] = useState(false);

	return (
		<div style={{position: 'relative'}}>
			<div
				className="input-group"
				onClick={() => setActive(!active)}
				style={{maxWidth: 157}}
			>
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
								value={value}
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
							value={value.toUpperCase()}
							readOnly
						/>
					</div>
				)}
			</div>

			{active && (
				<div
					className="color-picker"
					style={{
						background: '#FFF',
						boxShadow: '0px 4px 8px rgba(39, 40, 51, 0.12)',
						display: 'inline-block',
						padding: 24,
						position: 'absolute',
						borderRadius: 4,
						zIndex: 5000
					}}
				>
					{!onColorsChange && (
						<Basic
							colors={colors || DEFAULT_COLORS}
							label={label}
							onChange={onValueChange}
							value={value}
						/>
					)}

					{onColorsChange && (
						<Custom
							colors={colors.concat(
								Array(12 - colors.length).fill('#FFFFFF')
							)}
							label={label}
							onChange={onValueChange}
							onColorsChange={onColorsChange}
							value={value}
						/>
					)}
				</div>
			)}
		</div>
	);
}

export default ColorPicker;
