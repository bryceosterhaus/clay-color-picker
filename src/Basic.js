import React from 'react';
import PropTypes from 'prop-types';
import Splotch from './Splotch';

Basic.propTypes = {
	colors: PropTypes.arrayOf(PropTypes.string),
	label: PropTypes.string,
	onChange: PropTypes.func,
	value: PropTypes.string
};

function Basic({colors, label, onChange, value}) {
	return (
		<React.Fragment>
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
		</React.Fragment>
	);
}

Basic.propTypes = {
	colors: PropTypes.arrayOf(PropTypes.string),
	label: PropTypes.string,
	onChange: PropTypes.func,
	value: PropTypes.string
};

export default Basic;
