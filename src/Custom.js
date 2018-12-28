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
						@
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
