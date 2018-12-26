import React from 'react';
import PropTypes from 'prop-types';
import tinycolor from 'tinycolor2';

class Hue extends React.Component {
	constructor(props) {
		super(props);

		this._container = React.createRef();

		this.state = {
			left: 0,
			selectedColor: this.props.initialValue
		};
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

		const selectedHue = (left / containerRect.width) * 360;

		this.props.onChange(selectedHue);

		this.setState({
			selectedColor: tinycolor(
				`hsl(${selectedHue}, 100%, 50%)`
			).toHexString(),
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
		const {left, selectedColor} = this.state;

		return (
			<div style={{position: 'relative'}} ref={this._container}>
				<div
					style={{
						background:
							'linear-gradient(270deg, #FC0D1B 0%, #FC22D6 18.23%, #1824FB 34.25%, #2BF6FD 50.28%, #2BFD2E 67.58%, #FCFD37 81.22%, #FC121B 100%)',
						borderRadius: 4,
						margin: 4,
						height: 8
					}}
				/>

				<span
					style={{
						top: '-50%',
						left: left - 8,
						background: selectedColor,
						border: '2px solid #FFF',
						height: 16,
						borderRadius: '50%',
						width: 16,
						position: 'absolute'
					}}
					onMouseDown={this.handleMouseDown}
					onTouchMove={this.handleChange}
					onTouchStart={this.handleChange}
				/>
			</div>
		);
	}
}

Hue.propTypes = {
	initialValue: PropTypes.number,
	onChange: PropTypes.func
};

Hue.defaultProps = {
	initialValue: tinycolor(`hsl(0, 100%, 50%)`).toHexString(),
	onChange: () => {}
};

export default Hue;
