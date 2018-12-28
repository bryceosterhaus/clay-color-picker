import React, {useEffect, useRef} from 'react';
import PropTypes from 'prop-types';

Splotch.propTypes = {
	active: PropTypes.bool,
	size: PropTypes.number,
	value: PropTypes.string
};

function Splotch({active, size = 24, value, ...otherProps}) {
	const buttonEl = useRef(null);

	useEffect(
		() => {
			if (active) {
				buttonEl.current.focus();
			}
		},
		[active]
	);

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
			ref={buttonEl}
		/>
	);
}

export default Splotch;
