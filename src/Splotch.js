import React from 'react';
import PropTypes from 'prop-types';
import tinycolor from 'tinycolor2';

Splotch.propTypes = {
	active: PropTypes.bool,
	size: PropTypes.number,
	value: PropTypes.string
};

function Splotch({active, size = 24, value, ...otherProps}) {
	const requireBorder = tinycolor.readability('#FFF', value) < 1.1;

	return (
		<button
			{...otherProps}
			style={{
				...(active ? {outline: 'auto 3px #55ADFF'} : {}),
				...(requireBorder
					? {border: '1px solid #E7E7ED'}
					: {borderWidth: 0}),
				background: value,
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

export default Splotch;
