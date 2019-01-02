import React, {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import Custom from './Custom';
import Basic from './Basic';
import Splotch from './Splotch';
import {sub} from './util';
import './ColorPicker.scss';

const ESC_KEY_CODE = 27;

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

const DEFAULT_ARIA_LABELS = {
	selectionIs: 'Color selection is {0}',
	selectColor: 'Select a color'
};

ColorPicker.propTypes = {
	ariaLabels: PropTypes.shape({
		selectionIs: PropTypes.string,
		selectColor: PropTypes.string
	}),
	colors: PropTypes.arrayOf(PropTypes.string),
	displayHex: PropTypes.bool,
	label: PropTypes.string,
	onColorsChange: PropTypes.func,
	onValueChange: PropTypes.func,
	value: PropTypes.string
};

ColorPicker.defaultProps = {
	ariaLabels: DEFAULT_ARIA_LABELS,
	colors: null,
	displayHex: true,
	onColorsChange: null,
	onValueChange: () => {},
	value: '#FFFFFF'
};

function ColorPicker({
	ariaLabels,
	colors,
	displayHex,
	label,
	onColorsChange,
	onValueChange,
	value
}) {
	const containerRef = useRef(null);
	const [active, setActive] = useState(false);

	useEffect(() => {
		const handleClick = event => {
			if (
				containerRef.current &&
				!containerRef.current.contains(event.target)
			) {
				setActive(false);
			}
		};

		const handleEsc = event => {
			if (event.keyCode === ESC_KEY_CODE) {
				setActive(false);
			}
		};

		window.addEventListener('mousedown', handleClick, false);
		window.addEventListener('keydown', handleEsc, false);

		return () => {
			window.removeEventListener('keydown', handleEsc, false);
		};
	}, []);

	return (
		<div className="clay-color-picker" ref={containerRef}>
			<div className="input-group" onClick={() => setActive(!active)}>
				<div
					className={`input-group-item input-group-item-shrink${
						displayHex ? ' input-group-prepend' : ''
					}`}
				>
					<span className="input-group-text input-group-text-secondary">
						<div className="open-control open-checkbox">
							<Splotch
								aria-label={ariaLabels.selectColor}
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
							aria-label={sub(ariaLabels.selectionIs, [value])}
							className="form-control"
							value={value.toUpperCase()}
							readOnly
						/>
					</div>
				)}
			</div>

			{active && (
				<div className="picker-overlay">
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
