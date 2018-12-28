import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Splotch from './Splotch';

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
						active={value === hex}
						onClick={() => onChange(hex)}
						key={hex}
						value={hex}
					/>
				))}
			</div>
		</React.Fragment>
	);
}

export default Basic;
