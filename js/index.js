var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}function CardStruct(value) {
	//All necessary information about a card.
	this.value = value;
	this.flipped = false;
	this.matched = false;
	this.image = "/assets/dragons-svg/dragon-" + value % 30 + ".svg";
	this.back = "https://raw.githubusercontent.com/Peritract/matching-game/master/assets/rune.png";
}var

Splash = function (_React$Component) {_inherits(Splash, _React$Component);
	function Splash(props) {_classCallCheck(this, Splash);var _this = _possibleConstructorReturn(this, (Splash.__proto__ || Object.getPrototypeOf(Splash)).call(this,
		props));
		_this.handleClick = _this.handleClick.bind(_this);return _this;
	}_createClass(Splash, [{ key: "handleClick", value: function handleClick()
		{
			this.props.reset(this.props.win);
		} }, { key: "render", value: function render()
		{
			if (this.props.visible) {
				var message = "";
				var details = ["Time left: " + Math.floor(this.props.time / 60) + " minutes, " + this.props.time % 60 + " seconds", "Cards in deck: " + this.props.deck];
				if (this.props.win) {
					message = "VICTORY!";
				} else {
					message = "DEFEAT!";
				}
				return React.createElement("div", { className: "splash_container" },
					React.createElement("div", { className: "splash" },
						React.createElement("div", { className: "splash_message" }, React.createElement("h1", null, message)),
						React.createElement("div", { className: "splash_message" }, React.createElement("h3", null, details[0], React.createElement("br", null), details[1])),
						React.createElement("div", { className: "splash_button button", onClick: this.handleClick }, React.createElement("h3", null, "NEW GAME"))));


			} else
			return React.createElement("div", null);
		} }]);return Splash;}(React.Component);var


Timer = function (_React$Component2) {_inherits(Timer, _React$Component2);
	function Timer(props) {_classCallCheck(this, Timer);var _this2 = _possibleConstructorReturn(this, (Timer.__proto__ || Object.getPrototypeOf(Timer)).call(this,
		props));
		_this2.state = {
			timerID: null };

		_this2.tick = _this2.tick.bind(_this2);return _this2;
	}_createClass(Timer, [{ key: "tick", value: function tick()

		{
			this.props.tick();
		} }, { key: "componentDidMount", value: function componentDidMount()

		{var _this3 = this;
			this.state.timerID = setInterval(
			function () {return _this3.tick();},
			1000);

		} }, { key: "componentWillUnmount", value: function componentWillUnmount()

		{
			clearInterval(this.state.timerID);
		} }, { key: "render", value: function render()

		{
			return React.createElement("div", { className: "ui-element" }, React.createElement("h3", null, Math.floor(this.props.time / 60), ":", ("0" + this.props.time % 60).slice(-2)));
		} }]);return Timer;}(React.Component);var


Reset = function (_React$Component3) {_inherits(Reset, _React$Component3);
	function Reset(props) {_classCallCheck(this, Reset);var _this4 = _possibleConstructorReturn(this, (Reset.__proto__ || Object.getPrototypeOf(Reset)).call(this,
		props));
		_this4.handleClick = _this4.handleClick.bind(_this4);return _this4;
	}_createClass(Reset, [{ key: "handleClick", value: function handleClick()
		{
			this.props.reset();
		} }, { key: "render", value: function render()
		{
			return React.createElement("div", { className: "ui-element button", onClick: this.handleClick }, React.createElement("h3", null, "RESET"));
		} }]);return Reset;}(React.Component);var


Card = function (_React$Component4) {_inherits(Card, _React$Component4);
	function Card(props) {_classCallCheck(this, Card);var _this5 = _possibleConstructorReturn(this, (Card.__proto__ || Object.getPrototypeOf(Card)).call(this,
		props));

		_this5.handleClick = _this5.handleClick.bind(_this5);
		_this5.flipOver = _this5.flipOver.bind(_this5);
		_this5.state = {
			element: "card-" + _this5.props.index + "-" };return _this5;

	}_createClass(Card, [{ key: "flipOver", value: function flipOver()
		{
			document.querySelector("#" + this.state.element + "detail").classList.toggle("card_turn");
			document.querySelector("#" + this.state.element + "front").classList.toggle("card_hidden");
			document.querySelector("#" + this.state.element + "back").classList.toggle("card_hidden");
		} }, { key: "handleClick", value: function handleClick()

		{
			if (this.props.cardsShown < 2 && !this.props.matched && !this.props.flipped) {
				this.flipOver();
				this.props.flipCard(this.props.index, this.flipOver);
			}
		} }, { key: "render", value: function render()

		{
			return React.createElement("div", { className: "card_container", id: this.state.element + "container", onClick: this.handleClick },
				React.createElement("div", { className: "card", id: this.state.element + "detail" },
					React.createElement("div", { className: "card_front card_side card_hidden", id: this.state.element + "front" },
						React.createElement("object", { className: "card_image", data: this.props.image, type: "image/svg+xml" },
							React.createElement("img", { src: "yourfallback.jpg" }))),


					React.createElement("div", { className: "card-back card_side", id: this.state.element + "back" },
						React.createElement("img", { className: "card_image", src: this.props.back }))));



		} }]);return Card;}(React.Component);var


DragonMatch = function (_React$Component5) {_inherits(DragonMatch, _React$Component5);
	function DragonMatch(props) {_classCallCheck(this, DragonMatch);var _this6 = _possibleConstructorReturn(this, (DragonMatch.__proto__ || Object.getPrototypeOf(DragonMatch)).call(this,
		props));
		_this6.newDeck = _this6.newDeck.bind(_this6);
		_this6.shuffle = _this6.shuffle.bind(_this6);
		_this6.renderCards = _this6.renderCards.bind(_this6);
		_this6.flipCard = _this6.flipCard.bind(_this6);
		_this6.tick = _this6.tick.bind(_this6);
		_this6.endCheck = _this6.endCheck.bind(_this6);
		_this6.reset = _this6.reset.bind(_this6);

		_this6.state = {
			deck: _this6.shuffle(_this6.newDeck(4)),
			cardsShown: 0,
			lastCard: null,
			time: 150,
			playing: true,
			gamesWon: 0,
			clear: false,
			win: false,
			bannerVisible: false };return _this6;

	}_createClass(DragonMatch, [{ key: "renderCards", value: function renderCards(

		deck) {var _this7 = this;
			return deck.map(function (card, index) {
				return React.createElement(Card, { value: card.value, flipped: card.flipped, matched: card.matched, image: card.image, back: card.back, index: index, cardsShown: _this7.state.cardsShown, flipCard: _this7.flipCard });
			});
		} }, { key: "flipCard", value: function flipCard(

		index, flipOver) {var _this8 = this;
			this.setState({ cardsShown: this.state.cardsShown + 1 });
			this.state.deck[index].flipped = true;
			setTimeout(function () {
				if (!_this8.state.lastCard) {
					_this8.setState({ lastCard: [index, flipOver] });
				} else if (_this8.state.deck[_this8.state.lastCard[0]].value == _this8.state.deck[index].value) {
					_this8.state.deck[_this8.state.lastCard[0]].matched = true;
					_this8.state.deck[index].matched = true;
					_this8.state.deck[_this8.state.lastCard[0]].flipped = true;
					_this8.state.deck[index].flipped = true;
					_this8.setState({ lastCard: null, cardsShown: 0 });
					_this8.endCheck();
				} else {
					_this8.state.deck[_this8.state.lastCard[0]].flipped = false;
					_this8.state.deck[index].flipped = false;
					_this8.state.lastCard[1]();
					flipOver();
					_this8.setState({ lastCard: null, cardsShown: 0 });
				}
			}, 1000);
		} }, { key: "newDeck", value: function newDeck(

		num) {
			//Creates a new deck (array of CardStructs) consisting of pairs.
			var deck = [];
			for (var i = 0; i < Math.floor(num / 2); i++) {
				deck.push(new CardStruct(i));
				deck.push(new CardStruct(i));
			}
			return deck;
		} }, { key: "shuffle", value: function shuffle(

		deck) {
			//Rearranges an array and returns it.
			var index = deck.length;
			var temp = void 0,rand = void 0;
			while (index > 0) {
				rand = Math.floor(Math.random() * index);
				index -= 1;
				temp = deck[index];
				deck[index] = deck[rand];
				deck[rand] = temp;
			}
			return deck;
		} }, { key: "reset", value: function reset()


		{var levelUp = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
			var num = this.state.deck.length;
			var time = this.state.time;
			if (levelUp) {
				if (num < 29) num += 2;
			}
			this.setState({ deck: this.shuffle(this.newDeck(num)), playing: true, time: time, clear: true, cardsShown: 0, win: false, bannerVisible: false });
		} }, { key: "endCheck", value: function endCheck()

		{
			var win = true;
			for (var i = 0; i < this.state.deck.length; i++) {
				if (!this.state.deck[i].matched) {
					win = false;
				}
			}
			if (win) {
				this.setState({ gamesWon: this.state.gamesWon + 1, playing: false, win: true, bannerVisible: true });
			} else if (this.state.time < 1) {
				this.setState({ playing: false, win: false, bannerVisible: true });
			}
		} }, { key: "tick", value: function tick()

		{
			if (this.state.time > 0 && this.state.playing) {
				this.setState({ time: this.state.time - 1 });
			} else if (this.state.playing) {
				this.endCheck();
			}
		} }, { key: "render", value: function render()

		{
			if (this.state.clear) {
				this.setState({ clear: false });
				return React.createElement("div", { className: "game" },
					React.createElement("div", { className: "card_table" }),

					React.createElement(Timer, { time: this.state.time, tick: this.tick }));

			}
			return React.createElement("div", { className: "game" },
				React.createElement("div", { className: "card_table" },
					this.renderCards(this.state.deck)),

				React.createElement(Reset, { reset: this.reset }),
				React.createElement(Timer, { time: this.state.time, tick: this.tick }),
				React.createElement(Splash, { win: this.state.win, visible: this.state.bannerVisible, time: this.state.time, deck: this.state.deck.length, reset: this.reset }));

		} }]);return DragonMatch;}(React.Component);


ReactDOM.render(React.createElement(DragonMatch, null), document.getElementById("root"));
