import React from 'react';
import PropTypes from 'prop-types';

class GradientSelector extends React.Component {
	constructor(props) {
		super(props);

		this._container = React.createRef();

		this.state = {
			left: 0,
			top: 0
		};
	}

	componentDidMount() {
		this.setInitialCoordinates(this.props.color);
	}

	componentWillReceiveProps(nextProps) {
		this.setInitialCoordinates(nextProps.color);
	}

	setInitialCoordinates(color) {
		const container = this._container.current;

		const containerRect = container.getBoundingClientRect();

		const {s, v} = color.toHsv();

		const newLeft = Math.round((s * 100 * containerRect.width) / 100);
		const newTop = Math.round(
			((v * 100 - 100) * -1 * containerRect.height) / 100
		);

		this.setState({
			left: newLeft,
			top: newTop
		});
	}

	componentWillUnmount() {
		this.unbindEventListeners();
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

		const y =
			typeof event.pageY === 'number'
				? event.pageY
				: event.touches[0].pageY;

		let top = y - (containerRect.top + window.pageYOffset);

		top =
			top < 0
				? 0
				: top > containerRect.height
				? containerRect.height
				: top;

		const saturation = Math.round((left * 100) / containerRect.width);
		const visibility = Math.round(
			-((top * 100) / containerRect.height) + 100
		);

		this.props.onChange(saturation, visibility);

		this.setState({
			left,
			top
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
		const {left, top} = this.state;
		const {color, hue} = this.props;

		return (
			<div
				style={{
					position: 'relative',
					background: `hsl(${hue}, 100%, 50%)`,
					width: 144,
					height: 128
				}}
				ref={this._container}
				onMouseDown={this.handleMouseDown}
				onTouchMove={this.handleChange}
				onTouchStart={this.handleChange}
			>
				<div
					style={{
						background:
							'linear-gradient(to right, #fff, rgba(255,255,255,0)',
						position: 'absolute',
						top: 0,
						right: 0,
						bottom: 0,
						left: 0
					}}
				/>
				<div
					style={{
						background:
							'linear-gradient(to top, #000, rgba(0,0,0,0))',
						position: 'absolute',
						top: 0,
						right: 0,
						bottom: 0,
						left: 0
					}}
				/>

				<span
					style={{
						top: top - 7,
						left: left - 7,
						background: color.toHexString(),
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

GradientSelector.propTypes = {
	onChange: PropTypes.func,
	hue: PropTypes.number
};

GradientSelector.defaultProps = {
	onChange: () => {},
	hue: 0
};

export default GradientSelector;
