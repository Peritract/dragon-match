function CardStruct(value) {
	//All necessary information about a card.
	this.value = value;
	this.flipped = false;
	this.matched = false;
	this.image = "./assets/dragons-svg/dragon-" + value % 30 + ".svg";
}

class CardIcon extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.componentDidMount = this.componentDidMount.bind(this);
	}
	componentDidMount() {
		let that = this;
		fetch(this.props.url).then(function (data) {
			data.text().then(function (svg) {
				that.setState({ icon: svg });
			});
		});
	}
	createInnerHtml() {
		return {
			__html: this.state.icon
		};
	}
	render() {
		let classes = "image";
		if (this.props.classes) {
			classes = classes + " " + this.props.classes;
		}
		return React.createElement("div", { className: classes, dangerouslySetInnerHTML: this.createInnerHtml() });
	}
}

class Splash extends React.Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}
	handleClick() {
		this.props.reset(this.props.win);
	}
	render() {
		if (this.props.visible) {
			if (this.props.gamesLost === 0 && this.props.gamesWon === 0) {
				return React.createElement(
					"div",
					{ className: "splash_container" },
					React.createElement(
						"div",
						{ className: "splash" },
						React.createElement(
							"div",
							{ className: "ui_element" },
							React.createElement(
								"h1",
								null,
								"DRAGON MATCH"
							)
						),
						React.createElement(
							"div",
							{ className: "ui_element" },
							React.createElement(
								"h2",
								null,
								"FLIP CARDS; MATCH DRAGONS"
							)
						),
						React.createElement(
							"div",
							{ className: "ui_element button", onClick: this.handleClick },
							React.createElement(
								"h2",
								null,
								"START GAME"
							)
						)
					)
				);
			} else {
				let message = "";
				let option = "";
				let timing = ["Time left: " + Math.floor(this.props.time / 60) + " minutes, " + this.props.time % 60 + " seconds", "Cards in deck: " + this.props.deck];
				if (this.props.win) {
					option = "NEXT LEVEL";
					message = "VICTORY!";
				} else {
					option = "RETRY";
					message = "DEFEAT!";
				}
				return React.createElement(
					"div",
					{ className: "splash_container" },
					React.createElement(
						"div",
						{ className: "splash" },
						React.createElement(
							"div",
							{ className: "ui_element" },
							React.createElement(
								"h1",
								null,
								message
							)
						),
						React.createElement(
							"div",
							{ className: "ui_element" },
							React.createElement(
								"h2",
								null,
								timing[0],
								React.createElement("br", null),
								timing[1]
							)
						),
						React.createElement(
							"div",
							{ className: "ui_element button", onClick: this.handleClick },
							React.createElement(
								"h2",
								null,
								option
							)
						)
					)
				);
			}
		} else return React.createElement("div", null);
	}
}

class Timer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			timerID: null
		};
		this.tick = this.tick.bind(this);
	}

	tick() {
		this.props.tick();
	}

	componentDidMount() {
		this.state.timerID = setInterval(() => this.tick(), 1000);
	}

	componentWillUnmount() {
		clearInterval(this.state.timerID);
	}

	render() {
		if (this.props.time < 15) {
			return React.createElement(
				"div",
				{ className: "ui_element warning" },
				React.createElement(
					"h2",
					null,
					Math.floor(this.props.time / 60),
					":",
					("0" + this.props.time % 60).slice(-2)
				)
			);
		}
		return React.createElement(
			"div",
			{ className: "ui_element" },
			React.createElement(
				"h2",
				null,
				Math.floor(this.props.time / 60),
				":",
				("0" + this.props.time % 60).slice(-2)
			)
		);
	}
}

class Reset extends React.Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}
	handleClick() {
		this.props.reset();
	}
	render() {
		return React.createElement(
			"div",
			{ className: "ui_element button", onClick: this.handleClick },
			React.createElement(
				"h2",
				null,
				"RESET"
			)
		);
	}
}

class Card extends React.Component {
	constructor(props) {
		super(props);

		this.handleClick = this.handleClick.bind(this);
		this.flipOver = this.flipOver.bind(this);
		this.selectColour = this.selectColour.bind(this);
		this.state = {
			element: "card_" + this.props.index + "_"
		};
	}

	selectColour() {
		if (this.props.matched) {
			return "white";
		} else {
			return ["black", "red", "green", "blue", "purple"][this.props.value % 5];
		}
	}

	flipOver() {
		document.querySelector("#" + this.state.element + "detail").classList.toggle("card_turn");
		document.querySelector("#" + this.state.element + "front").classList.toggle("card_hidden");
		document.querySelector("#" + this.state.element + "back").classList.toggle("card_hidden");
	}

	handleClick() {
		if (this.props.cardsShown < 2 && !this.props.matched && !this.props.flipped) {
			this.flipOver();
			this.props.flipCard(this.props.index, this.flipOver);
		}
	}

	render() {
		let colour = "card_" + this.selectColour();
		return React.createElement(
			"div",
			{ className: "card_container", id: this.state.element + "container" },
			React.createElement(
				"div",
				{ className: "card", id: this.state.element + "detail" },
				React.createElement(
					"div",
					{ className: "card_front card_side card_hidden", id: this.state.element + "front" },
					React.createElement("div", { className: "card_click", onClick: this.handleClick }),
					React.createElement(CardIcon, { url: this.props.image, classes: colour })
				),
				React.createElement(
					"div",
					{ className: "card-back card_side", id: this.state.element + "back" },
					React.createElement("div", { className: "card_click", onClick: this.handleClick }),
					React.createElement(CardIcon, { url: "./assets/other-svg/viking-ship.svg" })
				)
			)
		);
	}
}

class DragonMatch extends React.Component {
	constructor(props) {
		super(props);
		this.newDeck = this.newDeck.bind(this);
		this.shuffle = this.shuffle.bind(this);
		this.renderCards = this.renderCards.bind(this);
		this.flipCard = this.flipCard.bind(this);
		this.tick = this.tick.bind(this);
		this.endCheck = this.endCheck.bind(this);
		this.reset = this.reset.bind(this);
		this.setupGrid = this.setupGrid.bind(this);

		this.state = {
			deck: this.shuffle(this.newDeck(4)),
			cardsShown: 0,
			lastCard: null,
			time: 150,
			playing: false,
			gamesWon: 0,
			clear: false,
			win: false,
			splashVisible: true,
			gamesLost: 0
		};
	}

	setupGrid() {
		let num = this.state.deck.length;
		let columns;
		if (num < 5) {
			columns = 2;
		} else if (num < 17) {
			columns = 4;
		} else if (num < 37) {
			columns = 6;
		} else if (num < 65) {
			columns = 8;
		} else {
			columns = 10;
		}
		let rows = Math.ceil(num / columns);

		document.body.style.setProperty('--grid-rows', rows);
		document.body.style.setProperty('--grid-columns', columns);
	}

	renderCards(deck) {
		return deck.map((card, index) => {
			return React.createElement(Card, { value: card.value, flipped: card.flipped, matched: card.matched, image: card.image, index: index, cardsShown: this.state.cardsShown, flipCard: this.flipCard });
		});
	}

	flipCard(index, flipOver) {
		this.setState({ cardsShown: this.state.cardsShown + 1 });
		this.state.deck[index].flipped = true;
		setTimeout(() => {
			if (!this.state.lastCard) {
				this.setState({ lastCard: [index, flipOver] });
			} else if (this.state.deck[this.state.lastCard[0]].value == this.state.deck[index].value) {
				this.state.deck[this.state.lastCard[0]].matched = true;
				this.state.deck[index].matched = true;
				this.state.deck[this.state.lastCard[0]].flipped = true;
				this.state.deck[index].flipped = true;
				this.setState({ lastCard: null, cardsShown: 0 });
				this.endCheck();
			} else {
				this.state.deck[this.state.lastCard[0]].flipped = false;
				this.state.deck[index].flipped = false;
				this.state.lastCard[1]();
				flipOver();
				this.setState({ lastCard: null, cardsShown: 0 });
			}
		}, 1000);
	}

	newDeck(num) {
		//Creates a new deck (array of CardStructs) consisting of pairs.
		let deck = [];
		for (let i = 0; i < Math.floor(num / 2); i++) {
			deck.push(new CardStruct(i));
			deck.push(new CardStruct(i));
		}
		return deck;
	}

	shuffle(deck) {
		//Rearranges an array and returns it.
		let index = deck.length;
		let temp, rand;
		while (index > 0) {
			rand = Math.floor(Math.random() * index);
			index -= 1;
			temp = deck[index];
			deck[index] = deck[rand];
			deck[rand] = temp;
		}
		return deck;
	}

	reset(levelUp = false) {
		let num = this.state.deck.length;
		let time = 150;
		if (levelUp) {
			if (num < 59) num += 4;
		}
		this.setState({ deck: this.shuffle(this.newDeck(num)), playing: true, time: time, clear: true, cardsShown: 0, win: false, splashVisible: false });
	}

	endCheck() {
		let win = true;
		for (let i = 0; i < this.state.deck.length; i++) {
			if (!this.state.deck[i].matched) {
				win = false;
			}
		}
		if (win) {
			setTimeout(this.setState({ gamesWon: this.state.gamesWon + 1, playing: false, win: true, splashVisible: true }), 1000);
		} else if (this.state.time < 1) {
			setTimeout(this.setState({ playing: false, gamesLost: this.state.gamesLost + 1, win: false, splashVisible: true }), 1000);
		}
	}

	tick() {
		if (this.state.time > 0 && this.state.playing) {
			this.setState({ time: this.state.time - 1 });
		} else if (this.state.playing) {
			this.endCheck();
		}
	}

	render() {
		this.setupGrid();
		if (this.state.clear) {
			this.setState({ clear: false });
			return React.createElement(
				"div",
				{ className: "game" },
				React.createElement("div", { className: "card_table" }),
				React.createElement(Timer, { time: this.state.time, tick: this.tick })
			);
		}
		return React.createElement(
			"div",
			{ className: "game" },
			React.createElement(
				"div",
				{ className: "ui_container" },
				React.createElement(
					"div",
					{ className: "ui_element" },
					React.createElement(
						"h1",
						null,
						"DRAGON MATCH"
					)
				)
			),
			React.createElement(
				"div",
				{ className: "ui_container" },
				React.createElement(
					"div",
					{ className: "card_table" },
					this.renderCards(this.state.deck)
				)
			),
			React.createElement(
				"div",
				{ className: "ui_container" },
				React.createElement(Reset, { reset: this.reset }),
				React.createElement(Timer, { time: this.state.time, tick: this.tick }),
				React.createElement(
					"div",
					{ className: "ui_element" },
					React.createElement(
						"p",
						null,
						"Made by ",
						React.createElement(
							"a",
							{ href: "https://peritract.github.io", target: "blank" },
							"Peritract"
						),
						React.createElement("br", null),
						"Icons made by ",
						React.createElement(
							"a",
							{ href: "https://www.flaticon.com/authors/freepik" },
							"Freepik"
						),
						" from ",
						React.createElement(
							"a",
							{ href: "https://www.flaticon.com" },
							"FlatIcon"
						)
					)
				)
			),
			React.createElement(Splash, { win: this.state.win, visible: this.state.splashVisible, time: this.state.time, deck: this.state.deck.length, reset: this.reset, gamesWon: this.state.gamesWon, gamesLost: this.state.gamesLost })
		);
	}
}

ReactDOM.render(React.createElement(DragonMatch, null), document.getElementById("root"));
