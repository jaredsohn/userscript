// ==UserScript==
// @name	dice_concise for IP.Chat
// @namespace	Makaze
// @include	*
// @grant	none
// @version	0.1.9
// ==/UserScript==

// dice_concise / Based on Marcel Kossin's 'dice' RP Dice Simulator
//
// What is this?
//
// -- Marcel Kossin's notes: --
//
// I (mkossin) often Dungeon Master on our Neverwinternights Servers called 'Bund der
// alten Reiche' (eng. 'Alliance of the old realms') at bundderaltenreiche.de
// (German Site) Often idling in our Channel I thought it might be Fun to have
// a script to dice. Since I found nothing for irssi I wrote this little piece
// of script. The script assumes, that if a 'd' for english dice is given it
// should print the output in English. On the other hand if a 'w' for German
// 'Würfel' is given it prints the output in German.
//
// Usage.
//
// Anyone on the Channel kann ask '!roll' to toss the dice for him. He just has
// to say what dice he want to use. The notation should be well known from
// RP :-) Thus
//
// Write: !roll <quantity of dice>d[or w for german users]<sides on dice>
//
// Here are some examples
//
// !roll 2d20
// !roll 3d6
//
// OK, I think you got it already :-)
//
// Write: !roll version
// For Version Information
//
// Write: !roll help
// For Information about how to use it
//
// -- Makaze's notes: --
//
// [Changes in dice_concise:]
//
// Features added:
//
// [ ] Can add bonuses to the roll. e.g. "!roll 3d6+10"
// [ ] Output changed to one line only. e.g. "Makaze rolls the 3d6 and gets: 9 [4,
//     4, 1]"
// [ ] Corrected English grammar.
// [ ] Removed insults.
// [ ] Cleaner code with fewer nested if statements and true case switches.
// [ ] Errors call before the loop, saving clock cycles.
//
// Bugs fixed:
//
// [ ] Rolls within the correct range.*
//
// Edge cases added:
//
// [ ] Catch if rolling less than 1 dice.
// [ ] Catch if dice or sides are above 100 instead of 99.
//
// -----------------------------------------
//
// * [The original dice.pl rolled a number between 1 and (<number of sides> - 1)]
//   [instead of using the full range. e.g. "!roll 1d6" would output 1 through  ]
//   [5, but never 6.                                                           ]
//
// -----------------------------------------
//
// Original script 'dice.pl' by mkossin.
//
// Updated and ported script 'dice_concise.js' by Makaze.

// Classes constructor

function ClassHandler() {
	var self = this;

	this.classList = function(elem) {
		return elem.className.trim().split(/[\b\s]/);
	};

	this.hasClass = function(elem, className) {
		var classes = self.classList(elem),
		has = false,
		i = 0;

		for (i = 0; i < classes.length; i++) {
			if (classes[i] === className) {
				has = true;
				break;
			}
		}

		return (has);
	};

	this.addClass = function(elem, className) {
		var classes;

		if (!self.hasClass(elem, className)) {
			classes = self.classList(elem);
			classes.push(className);
			elem.className = classes.join(' ').trim();
		}

		return self;
	};

	this.removeClass = function(elem, className) {
		var classes = self.classList(elem),
		i = 0;

		for (i = 0; i < classes.length; i++) {
			if (classes[i] === className) {
				classes.splice(i, 1);
			}
		}

		elem.className = classes.join(' ').trim();

		return self;
	};

	this.toggleClass = function(elem, className) {
		var classes;

		if (self.hasClass(elem, className)) {
			self.removeClass(elem, className);
		} else {
			classes = self.classList(elem);
			classes.push(className);
			elem.className = classes.join(' ').trim();
		}

		return self;
	};
}

// Initialize

var Classes = new ClassHandler();

// End Classes constructor

function pushMsg(msg) {
	var keep = input.value;
	input.value = msg;
	submit.click();
	if (keep.length) {
		input.value = keep;
	}
}

function rand(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

if (document.body.id == 'ipboard_body' && document.getElementById('chat-form') != null) {
	var NAME = 'dice_concise',
	VERSION = '0.1.9';

	var latestMessage,
	latestMessageTxt,
	nick,
	curr,
	opts = (localStorage.getItem('MakazeScriptOptions')) ? JSON.parse(localStorage.getItem('MakazeScriptOptions')) : {},
	key = (opts.hasOwnProperty('dice_concise_key')) ? opts.dice_concise_key.toUpperCase() : '!ROLL';

	console.log(NAME, VERSION, 'loaded.');

	var input = document.getElementById('message_textarea');
	var submit = document.getElementById('chat-submit');

	document.addEventListener('DOMNodeInserted', function(event) {
		if (event.target.nodeType !== 1 || event.target.id !== 'storage_chatroom') {
			return false;
		}

		latestMessage = event.target.parentNode.getElementsByTagName('div')[event.target.parentNode.getElementsByTagName('div').length - 1];

		if (!Classes.hasClass(latestMessage.parentNode, 'post')) {
			return false;
		}

		if (!Classes.hasClass(latestMessage.parentNode, 'chat-message')) {
			return false;
		}

		latestMessageTxt = latestMessage.textContent;
		
		if (!latestMessageTxt.length) {
			return false;
		}
		
		if (latestMessageTxt.substr(0, key.length).toLowerCase() !== key.toLowerCase()) {
			return false;
		}

		curr = latestMessage.parentNode;
		nick = null;

		while (nick === null) {
			if (curr.getElementsByTagName('label').length) {
				nick = curr.getElementsByTagName('label')[0].textContent;
			} else {
				curr = curr.previousSibling;
			}
		}

		if (latestMessageTxt.match(/\d[dw]\d/i)) {
			var rnd,
			forloop = 0,
			lang,
			roll = latestMessageTxt.split(/\s/)[1],
			values = roll.split(/[dw\+\-\*\/]/i),
			dice = parseInt(values[0]),
			sides = parseInt(values[1]),
			modifiers = roll.match(/[\+\-\*\/]\d+/g),
			modifyType,
			modifyVal,
			modifyErrors = roll.match(/[\+\-\*\/][^\d\+\-\*\/]+/g),
			value = 0,
			// Modifier support added
			rolls = [];

			if (roll.match(/\d[w]\d//i)) {
				lang = 'DE';
			} else {
				lang = 'EN';
			}

			if (dice < 1) {
				switch (lang) {
					case 'DE':
						pushMsg('/me [b]' + nick + '[/b] macht nichts... Würfeln funktioniert am besten mit Würfeln.');
					break;
					case 'EN':
					default:
						pushMsg('/me [b]' + nick + '[/b] does nothing... Rolling dice works best with dice.');
					break;
				}
				return false;
			} else if (dice > 100) {
				switch (lang) {
					case 'DE':
						pushMsg('/me [b]' + nick + '[/b] scheitert den ' + roll + ' zu werfen... Versuch es mit weniger Würfeln.');
					break;
					case 'EN':
					default:
						pushMsg('/me [b]' + nick + '[/b] fails to roll the ' + roll + '... Try fewer dice.');
					break;
				}
				return false;
			} else if (sides <= 1) {
				if (sides == 0) {
					switch (lang) {
						case 'DE':
							pushMsg('/me [b]' + nick + '[/b] verursacht ein Paradox... Oder hat jemand schon mal einen Würfel ohne Seiten gesehen?');
						break;
						case 'EN':
						default:
							pushMsg('/me [b]' + nick + '[/b] causes a paradox... Or has anybody ever seen a die without sides?');
						break;
					}
					return false;
				} else if (sides == 1) {
					switch (lang) {
						case 'DE':
							pushMsg('/me [b]' + nick + '[/b] verursacht ein Paradox... Oder hat jemand schon mal einen Würfel mit nur einer Seite gesehen?');
						break;
						case 'EN':
						default:
							pushMsg('/me [b]' + nick + '[/b] causes a paradox... Or has anybody ever seen a die with only one side?');
						break;
					}
					return false;
				}
			} else if (sides > 100) {
				switch (lang) {
					case 'DE':
						pushMsg('/me [b]' + nick + '[/b] scheitert den ' + roll + ' zu werfen... Versuch es mit weniger Augen.');
					break;
					case 'EN':
					default:
						pushMsg('/me [b]' + nick + '[/b] fails to roll the ' + roll + '... Try fewer sides.');
					break;
				}
				return false;
			}
			for (forloop = 0; forloop < dice; forloop++) {
				rnd = rand(1, sides);
				value += rnd;
				rolls[forloop] = rnd;
			}
			if (modifiers) {
				for (var i = 0; i < modifiers.length; i++) {
					modifyType = modifiers[i].match(/[\+\-\*\/]/)[0];
					modifyVal = parseInt(modifiers[i].match(/\d+/)[0]);
					switch (modifyType) {
						case '*':
							value = value * modifyVal;
						break;
						case '/':
							value = value / modifyVal;
						break;
						case '+':
							value = value + modifyVal;
						break;
						case '-':
							value = value - modifyVal;
						break;
					}
				}
			}
			switch (lang) {
				case 'DE':
					pushMsg('/me [b]' + nick + '[/b] würfelt mit dem ' + roll + ' und erhält: ' + value + ' [' + rolls.join(', ') + ']');
				break;
				case 'EN':
				default:
					pushMsg('/me [b]' + nick + '[/b] rolls the ' + roll + ' and gets: ' + value + ' [' + rolls.join(', ') + ']');
				break;
			}
			if (modifyErrors) {
				switch (lang) {
					case 'DE':
						pushMsg('/me [b]' + nick + '[/b] scheitert ihr Ergebnis zu ändern. Versuch es mit Zahlen. [' + modifyErrors.join(', ') + ']');
					break;
					case 'EN':
					default:
						pushMsg('/me [b]' + nick + '[/b] fails to modify their result. Try using numbers. [' + modifyErrors.join(', ') + ']');
					break;
				}
			}
			return true;
		} else if (latestMessageTxt.substr(0, key.length + 1 + 7).toLowerCase() === key.toLowerCase() + ' version') {
			pushMsg('/me [b]' + NAME + '[/b]: Version ' + VERSION + ' for IP.Chat by [b]Makaze[/b] [inspired by [b]mkossin[/b]]');
			return false;
		} else if (latestMessageTxt.substr(0, key.length + 1 + 4).toLowerCase() === key.toLowerCase() + ' help') {
			pushMsg('/me [b]Syntax[/b]: "!roll <quantity of dice>d<sides on dice>[<+-*/>modifier]" - e.g. "!roll 2d20", "!roll 2d20*2+10"');
			return false;
		} else if (latestMessageTxt.substr(0, key.length + 1 + 5).toLowerCase() === key.toLowerCase() + ' hilfe') {
			pushMsg('/me [b]Syntax[/b]: "!roll <Anzahl der Würfel>w<Augen des Würfels>[<+-*/>Modifikator]" - z.B. "!roll 2w20", "!roll 2w20*2+10"');
			return false;
		} else {
			pushMsg(
				'/me "!roll help"  - gives the English help' +
				'\n' +
				'"!roll hilfe" - zeigt die deutsche Hilfe an'
			);
			return false;
		}
	});
}