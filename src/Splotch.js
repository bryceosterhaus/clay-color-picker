import React from 'react';
import PropTypes from 'prop-types';

Splotch.propTypes = {
	active: PropTypes.bool,
	size: PropTypes.number,
	value: PropTypes.string
};

function Splotch({active, size = 24, value, ...otherProps}) {
	return (
		<button
			{...otherProps}
			style={{
				...(active ? {outline: 'auto 3px #55ADFF'} : {}),
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

export default Splotch;
