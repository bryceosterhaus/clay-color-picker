import React from 'react';
import PropTypes from 'prop-types';

class Hue extends React.Component {
	constructor(props) {
		super(props);

		this._container = React.createRef();

		this.state = {
			left: 0
		};
	}

	componentWillUnmount() {
		this.unbindEventListeners();
	}

	componentWillReceiveProps(nextProps) {
		const container = this._container.current;

		const containerRect = container.getBoundingClientRect();

		const newLeft = (nextProps.value / 360) * containerRect.width;

		this.setState({
			left: newLeft
		});
	}

	handleChange = (event, skip) => {
		const container = this._container.current;

		const containerRect = container.getBoundingClientRect();

		const x =
			typeof event.pageX === 'number'
				? event.pageX
				: event.touches[0].pageX;

		let left = x - (containerRect.left + window.pageXOffset);

		left =
			left < 0
				? 0
				: left > containerRect.width
				? containerRect.width
				: left;

		const selectedHue = (left / containerRect.width) * 360;

		this.props.onChange(selectedHue);

		this.setState({
			left: left
		});
	};

	handleMouseDown = event => {
		this.handleChange(event, true);

		window.addEventListener('mousemove', this.handleChange);
		window.addEventListener('mouseup', this.handleMouseUp);
	};

	handleMouseUp = () => {
		this.unbindEventListeners();
	};

	unbindEventListeners = () => {
		window.removeEventListener('mousemove', this.handleChange);
		window.removeEventListener('mouseup', this.handleMouseUp);
	};

	render() {
		const {left} = this.state;
		const {value} = this.props;

		return (
			<div
				style={{
					background:
						'linear-gradient(270deg, #FC0D1B 0%, #FC22D6 18.23%, #1824FB 34.25%, #2BF6FD 50.28%, #2BFD2E 67.58%, #FCFD37 81.22%, #FC121B 100%)',
					borderRadius: 4,
					margin: 4,
					height: 8,
					position: 'relative'
				}}
				onMouseDown={this.handleMouseDown}
				onTouchMove={this.handleChange}
				onTouchStart={this.handleChange}
				ref={this._container}
			>
				<span
					style={{
						top: '-50%',
						left: left - 7,
						background: `hsl(${value}, 100%, 50%)`,
						border: '2px solid #FFF',
						height: 14,
						borderRadius: '50%',
						width: 14,
						position: 'absolute'
					}}
				/>
			</div>
		);
	}
}

Hue.propTypes = {
	value: PropTypes.number,
	onChange: PropTypes.func
};

Hue.defaultProps = {
	value: 0,
	onChange: () => {}
};

export default Hue;
