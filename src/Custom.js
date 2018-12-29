import React, {useState} from 'react';
import PropTypes from 'prop-types';
import tinycolor from 'tinycolor2';
import Hue from './Hue';
import Splotch from './Splotch';
import GradientSelector from './GradientSelector';

function CustomColorIcon() {
	return (
		<svg
			width="12"
			height="17"
			viewBox="0 0 12 17"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M11 11C11 13.7614 8.76142 16 6 16C3.23858 16 1 13.7614 1 11C1 9.79197 1.58669 8.71677 2.65995 7.20346C2.85539 6.92789 3.06515 6.64012 3.28534 6.33805C4.11185 5.20415 5.08532 3.86863 6 2.22004C6.91468 3.86863 7.88816 5.20415 8.71467 6.33805C8.93485 6.64013 9.14461 6.92789 9.34005 7.20346C10.4133 8.71677 11 9.79197 11 11Z"
				stroke="#6B6C7E"
				strokeWidth="2"
			/>
			<path
				d="M12 11.0001C12 14.3138 9.31371 17.0001 6 17.0001C2.68629 17.0001 0 14.3138 0 11.0001C2 10 3.5 12.5001 6 11.0001C8.5 9.5 10 10 12 11.0001Z"
				fill="#6B6C7E"
			/>
		</svg>
	);
}

Custom.propTypes = {
	colors: PropTypes.arrayOf(PropTypes.string),
	label: PropTypes.string,
	onChange: PropTypes.func,
	onColorsChange: PropTypes.func,
	value: PropTypes.string
};

function Custom({colors, label, onChange, onColorsChange, value}) {
	const color = tinycolor(value);

	const [activeSplotchIndex, setActiveSplotchIndex] = useState(0);
	const [hue, setHue] = useState(0);
	const [editorActive, setEditorActive] = useState(false);
	const [inputVal, setInputValue] = useState(color.toHex());

	const {r, g, b} = color.toRgb();
	const {s, v} = color.toHsv();

	const rgbArr = [[r, 'R'], [g, 'G'], [b, 'B']];

	const setNewColor = (colorValue, setInput = true) => {
		const hexString = colorValue.toHexString();

		const newColors = [...colors];

		newColors[activeSplotchIndex] = hexString;

		onColorsChange(newColors);

		onChange(hexString);

		if (setInput) {
			setInputValue(colorValue.toHex());
		}
	};

	return (
		<div>
			{label && (
				<label
					style={{
						color: '#6B6C7E',
						display: 'flex',
						fontSize: 14,
						justifyContent: 'space-between',
						margin: '16px 0'
					}}
				>
					{label}

					<button
						onClick={() => setEditorActive(!editorActive)}
						className="btn btn-monospaced btn-sm"
						type="button"
						style={editorActive ? {background: '#F1F2F5'} : null}
					>
						<CustomColorIcon />
					</button>
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
						active={i === activeSplotchIndex}
						onClick={() => {
							if (hex === '#FFFFFF') {
								setEditorActive(true);
							}

							setActiveSplotchIndex(i);

							setHue(tinycolor(hex).toHsv().h);

							onChange(hex);
						}}
						key={i}
						value={hex}
					/>
				))}
			</div>

			{editorActive && (
				<React.Fragment>
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
									})
								);
							}}
						/>

						<div style={{marginLeft: 16}}>
							{rgbArr.map(([val, name]) => (
								<div
									className="form-group"
									style={{marginBottom: 16}}
									key={name}
								>
									<div className="input-group">
										<div className="input-group-item input-group-item-shrink input-group-prepend">
											<span
												className="input-group-text"
												style={{
													fontSize: 14,
													height: 32,
													lineHeight: 25,
													minWidth: 24,
													padding: 8
												}}
											>
												{name}
											</span>
										</div>
										<div className="input-group-append input-group-item">
											<input
												value={val}
												className="form-control"
												style={{
													fontSize: 14,
													height: 32,
													padding: 8,
													width: 60
												}}
												type="text"
												onChange={event => {
													const newVal = Number(
														event.target.value
													);

													const color = tinycolor({
														r:
															name === 'R'
																? newVal
																: r,
														g:
															name === 'G'
																? newVal
																: g,
														b:
															name === 'B'
																? newVal
																: b
													});

													setHue(color.toHsv().h);

													setNewColor(color);
												}}
											/>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>

					<Hue
						onChange={hue => {
							setHue(hue);

							setNewColor(tinycolor({h: hue, s, v}));
						}}
						value={hue}
					/>

					<div className="input-group" style={{marginTop: 20}}>
						<div className="input-group-item input-group-item-shrink input-group-prepend">
							<span className="input-group-text">{'#'}</span>
						</div>
						<div className="input-group-append input-group-item">
							<input
								value={inputVal.toUpperCase().substring(0, 6)}
								className="form-control"
								type="text"
								onChange={event => {
									const inputValue = event.target.value;

									setInputValue(inputValue);

									const newColor = tinycolor(inputValue);

									if (newColor.isValid()) {
										setHue(newColor.toHsv().h);
										setNewColor(newColor, false);
									}
								}}
								onBlur={event => {
									const newColor = tinycolor(
										event.target.value
									);

									if (newColor.isValid()) {
										setInputValue(newColor.toHex());
									} else {
										setInputValue(color.toHex());
									}
								}}
							/>
						</div>
					</div>
				</React.Fragment>
			)}
		</div>
	);
}

export default Custom;
