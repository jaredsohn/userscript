// ==UserScript==
// @name	IP.Chat Pings + Highlight
// @namespace	Makaze
// @include	*
// @grant	none
// @version	2.3.7
// ==/UserScript==

var titlePing,
highlightPings,
pingSound,
audiblePingFile,
audiblePingOnFocus,
audiblePing,
hasFocus = true,
MakazeScriptStyles,
IPChatMenuItems,
pingMenu,
menuButton,
styleElem,
defaultStyle =
	'font-weight: bolder;\n' +
	'font-size: 120%;\n' +
	'color: #f24;\n' +
	'text-shadow: 0px 1px #222;',
opts,
pingStyle,
pings,
userPings,
userName;

// Global variable constructor

function GlobalHandler() {
	var output;

	this.receiveEvent = function(event) {
		output = event.detail;
	};

	this.dispatch = function(variable, name) {
		document.dispatchEvent(
			new CustomEvent('getGlobalVar_' + name, {
				detail: variable
			})
		);
	};

	this.get = function(variable) {
		document.addEventListener('getGlobalVar_' + variable, this.receiveEvent, false);
		var getGlobalScript = document.createElement('script');
		getGlobalScript.type = 'text/javascript';
		getGlobalScript.id = 'getGlobalScript';
		getGlobalScript.appendChild(
			document.createTextNode(
				'(' + this.dispatch.toString() + ')(' + variable + ', \'' + variable + '\');'
				+ 'document.getElementById(\'getGlobalScript\').remove();'
			)
		);
		(document.body || document.documentElement).appendChild(getGlobalScript);
		document.removeEventListener('getGlobalVar_' + variable, this.receiveEvent, false);
		return output;
	};

	this.set = function(variable, value) {
		switch (typeof value) {
			case 'string':
				value = '\'' + value + '\'';
			break;
		}

		var setGlobalScript = document.createElement('script');
		setGlobalScript.type = 'text/javascript';
		setGlobalScript.id = 'setGlobalScript';
		setGlobalScript.appendChild(
			document.createTextNode(
				variable + ' = ' + value + ';'
				+ 'document.getElementById(\'setGlobalScript\').remove();'
			)
		);
		(document.body || document.documentElement).appendChild(setGlobalScript);
	};
}

// Initialize

var Globals = new GlobalHandler();

// End global variable constructor

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

function fade(elem, type, speed) {
	var defaultOpacity,
	currentDisplay = elem.style.display || window.getComputedStyle(elem).display;

	elem.style.opacity = '';
	defaultOpacity = window.getComputedStyle(elem).opacity;
	elem.style.opacity = 0;

	// Default values:

	switch (arguments.length) {
		case 1:
			type = 'toggle';
		case 2:
			speed = 300;
		break;
	}

	switch (type) {
		case 'in':
			elem.style.display = '';
			setTimeout(function() {
				elem.style.transition = 'all ' + speed + 'ms ease-in-out';
				elem.style.opacity = defaultOpacity;
				setTimeout(function() {
					elem.style.transition = '';
					elem.style.opacity = '';
				}, speed + 10);
			}, 1);
		break;
		case 'out':
			elem.style.transition = '';
			elem.style.opacity = defaultOpacity;
			elem.style.transition = 'all ' + speed + 'ms ease-in-out';
			elem.style.opacity = 0;
			setTimeout(function() {
				elem.style.display = 'none';
				elem.style.transition = '';
				elem.style.opacity = '';
			}, speed + 10);
		break;
		case 'toggle':
		default:
			if (currentDisplay === 'none') {
				elem.style.display = '';
				setTimeout(function() {
					elem.style.transition = 'all ' + speed + 'ms ease-in-out';
					elem.style.opacity = defaultOpacity;
					setTimeout(function() {
						elem.style.transition = '';
						elem.style.opacity = '';
					}, speed + 10);
				}, 1);
			} else {
				elem.style.transition = '';
				elem.style.opacity = defaultOpacity;
				elem.style.transition = 'all ' + speed + 'ms ease-in-out';
				elem.style.opacity = 0;
				setTimeout(function() {
					elem.style.display = 'none';
					elem.style.transition = '';
					elem.style.opacity = '';
				}, speed + 10);
			}
	}
}

function createElement(type, callback) {
	var element = document.createElement(type);

	callback(element);

	return element;
}

function getUserName(context, userPings) {
	var userID = context.getElementsByClassName('ipsUserPhotoLink')[0].id.split('link_')[1],
	userName = context.getElementsByClassName('names')[0].getElementsByTagName('span')[0].title,
	newUserPings = [],
	i = 0,
	thisUserID,
	thisUserName;

	for (i = 0; i < userPings.length; i++) {
		newUserPings.push({'id': userPings[i].id, 'name': (userPings[i].hasOwnProperty('name')) ? userPings[i].name : null});
		thisUserID = newUserPings[i].id;
		thisUserName = newUserPings[i].name;
		if (userID === thisUserID) {
			if (userName !== thisUserName) {
				newUserPings[i].name = userName;
			}
		}
	}

	return newUserPings;
}

if (document.body.id === 'ipboard_body' && document.getElementById('storage_chatroom') != null) {
	var i = 0;

	userName = Globals.get('userName');
	opts = (localStorage.getItem('MakazeScriptOptions')) ? JSON.parse(localStorage.getItem('MakazeScriptOptions')) : {};
	pingStyle = (opts.hasOwnProperty('ipc_ping_style')) ? opts.ipc_ping_style : defaultStyle;
	pings = (opts.hasOwnProperty('ipc_pings')) ? opts.ipc_pings : [userName];
	userPings = (opts.hasOwnProperty('ipc_user_pings')) ? opts.ipc_user_pings : [];
	audiblePing = (opts.hasOwnProperty('ipc_audible_ping')) ? opts.ipc_audible_ping : true;
	titlePing = (opts.hasOwnProperty('ipc_pings_in_title')) ? opts.ipc_pings_in_title : true;
	highlightPings = (opts.hasOwnProperty('ipc_highlight_pings')) ? opts.ipc_highlight_pings : true;
	audiblePingFile = (opts.hasOwnProperty('ipc_audible_ping_file')) ? opts.ipc_audible_ping_file : 'https://dl.dropboxusercontent.com/u/45569424/Saved_FE7.mp3';
	audiblePingOnFocus = (opts.hasOwnProperty('ipc_audible_ping_on_focus')) ? opts.ipc_audible_ping_on_focus : false;

	pingSound = new Audio(audiblePingFile);

	// Styling

	if (document.getElementById('MakazeScriptStyles') == null) {
		MakazeScriptStyles = createElement('style', function(style) {
			style.id = 'MakazeScriptStyles';
			style.type = 'text/css';
		});
		document.head.appendChild(MakazeScriptStyles);
	}

	styleElem = document.getElementById('MakazeScriptStyles');

	if (styleElem.hasChildNodes()) {
		styleElem.childNodes[0].nodeValue += '\n\n';
	} else {
		styleElem.appendChild(document.createTextNode(''));
	}

	if (!styleElem.childNodes[0].nodeValue.match('.MakazeScriptMenu')) {
		styleElem.childNodes[0].nodeValue += '.MakazeScriptMenu { position: fixed; z-index: 99999; top: 50%; left: 50%; padding: 10px; background-color: rgba(255, 255, 255, .85); box-shadow: 0px 0px 3px #888; border-radius: 5px; }  .MakazeScriptMenu th { font-weight: bolder; }  .MakazeScriptMenu th, .MakazeScriptMenu td { padding: 3px; }  .MakazeScriptMenu .menu-save { text-align: center; margin-top: 6px; }  .MakazeScriptMenu .menu-save > a { padding: 2px 10px; border: 1px solid #ccc; border-radius: 3px; font-weight: bolder; cursor: pointer; }  .MakazeScriptMenu .menuTitle { margin-bottom: 10px; font-weight: bolder; }  .MakazeScriptMenu .scrollableContent { width: 312px; height: 150px; overflow: auto; padding: 2px; }  .MakazeScriptMenu textarea, .MakazeScriptMenu input[type=text], .MakazeScriptMenu input[type=number] { font-family: Consolas, Ubuntu Mono, sans-serif; font-size: 10px; color: #333; padding: 3px; box-sizing: border-box; }\n\n';
	}

	styleElem.childNodes[0].nodeValue +=
		'#pingsettings {\n' +
			'margin-top: -162px;\n' +
			'margin-left: -250px;\n' +
		'}\n\n' +

		'#pingsettings textarea {\n' +
			'width: 144px;\n' +
			'height: 144px;\n' +
		'}\n\n' +

		'#pingsettings input {\n' +
			'vertical-align: middle;\n' +
		'}';

	// Menu creation

	var pingMenu_options = createElement('table', function(table) {
		table.appendChild(createElement('thead', function(thead) {
			thead.appendChild(createElement('tr', function(row) {
				row.appendChild(createElement('th', function(cell) {
					cell.appendChild(document.createTextNode('Style'));
				}));

				row.appendChild(createElement('th', function(cell) {
					cell.appendChild(document.createTextNode('Pings'));
				}));

				row.appendChild(createElement('th', function(cell) {
					cell.appendChild(document.createTextNode('Pinged Users'));
				}));
			}));
		}));

		table.appendChild(createElement('tbody', function(tbody) {
			tbody.appendChild(createElement('tr', function(row) {
				row.appendChild(createElement('td', function(cell) {
					cell.appendChild(createElement('textarea', function(input) {
						input.id = 'pingStyle';
						input.placeholder = 'Enter CSS for pinged word';
						input.value = pingStyle;
					}));
				}));

				row.appendChild(createElement('td', function(cell) {
					cell.appendChild(createElement('textarea', function(input) {
						input.id = 'pingList';
						input.placeholder = 'Enter words to ping seperated by newlines';
						input.value = pings.join('\n');
					}));
				}));

				row.appendChild(createElement('td', function(cell) {
					cell.appendChild(createElement('textarea', function(input) {
						input.id = 'userPingList';
						input.placeholder = 'Enter users to ping on join seperated by newlines';

						var tempUserPingList = [];

						for (i = 0; i < userPings.length; i++) {
							if (!userPings[i].hasOwnProperty('name') || userPings[i].name === null) {
								tempUserPingList.push(userPings[i].id);
							} else {
								tempUserPingList.push(userPings[i].id + '//' + userPings[i].name);
							}
						}

						input.value = tempUserPingList.join('\n');
					}));
				}));
			}));

			tbody.appendChild(createElement('tr', function(row) {
				row.appendChild(createElement('td', function(cell) {
					cell.setAttribute('colspan', 3);
					cell.style.textAlign = 'center';

					cell.appendChild(createElement('div', function(cont) {
						cont.style.display = 'inline-block';
						cont.style.textAlign = 'left';

						cont.appendChild(createElement('div', function(field) {
							field.appendChild(createElement('input', function(input) {
								input.id = 'audiblePingSwitch';
								input.type = 'checkbox';
								input.checked = audiblePing;
							}));

							field.appendChild(document.createTextNode(' Play sound when pinged'));
						}));

						cont.appendChild(createElement('div', function(field) {
							field.appendChild(createElement('input', function(input) {
								input.id = 'titlePingSwitch';
								input.type = 'checkbox';
								input.checked = titlePing;
							}));

							field.appendChild(document.createTextNode(' Change page title when pinged'));
						}));

						cont.appendChild(createElement('div', function(field) {
							field.appendChild(createElement('input', function(input) {
								input.id = 'highlightPingsSwitch';
								input.type = 'checkbox';
								input.checked = highlightPings;
							}));

							field.appendChild(document.createTextNode(' Highlight pings in the chat'));
						}));

						cont.appendChild(createElement('div', function(field) {
							field.appendChild(createElement('input', function(input) {
								input.id = 'audiblePingOnFocusSwitch';
								input.type = 'checkbox';
								input.checked = audiblePingOnFocus;
							}));

							field.appendChild(document.createTextNode(' Play audible ping when the page is focused'));
						}));

						cont.appendChild(createElement('div', function(field) {
							field.style.display = 'table';
							field.style.width = '100%';
							field.style.marginTop = '1em';

							field.appendChild(createElement('span', function(name) {
								name.style.display = 'table-cell';
								name.style.whiteSpace = 'pre';
								name.appendChild(document.createTextNode('Audible ping file: '));
							}));

							field.appendChild(createElement('span', function(content) {
								content.style.display = 'table-cell';
								content.style.width = '100%';

								content.appendChild(createElement('input', function(input) {
									input.id = 'audiblePingFile';
									input.type = 'text';
									input.placeholder = 'Enter a sound file to play when pinged';
									input.style.width = '100%';
									input.value = audiblePingFile;
								}));
							}));
						}));
					}));
				}));
			}));
		}));
	}),

	pingMenu_save = createElement('div', function(cont) {
		cont.className = 'menu-save';

		cont.appendChild(createElement('a', function(link) {
			link.href = 'javascript:void(0)';
			link.id = 'pingsettings_save';
			link.appendChild(document.createTextNode('Save'));
			link.onclick = function() {
				var opts = (localStorage.getItem('MakazeScriptOptions')) ? JSON.parse(localStorage.getItem('MakazeScriptOptions')) : {},
				pingList = document.getElementById('pingList').value.split(/[\n\r]/),
				userPingList = document.getElementById('userPingList').value.split(/[\n\r]/),
				offset,
				split,
				elems,
				userElem,
				i = 0;

				if (styleElem.hasChildNodes()) {
					styleElem.childNodes[0].nodeValue += '\n\n';
				} else {
					styleElem.appendChild(document.createTextNode(''));
				}
				
				styleElem.childNodes[0].nodeValue = styleElem.childNodes[0].nodeValue.replace(/\.ipc_highlight\s{[^]+?}/gi, '.ipc_highlight {\n' + document.getElementById('pingStyle').value + '\n' + '}');


				for (i = 0, offset = 0; i < pingList.length; i++) {
					if (!pingList[i - offset].length) {
						pingList.splice(i - offset, 1);
						offset++;
					}
				}

				document.getElementById('pingList').value = pingList.join('\n');

				// Make array of users

				for (i = 0, offset = 0; i < userPingList.length; i++) {
					if (!userPingList[i - offset].length) {
						userPingList.splice(i - offset, 1);
						offset++;
					}
					if (userPingList.length) {
						if (userPingList[i].match('//')) {
							split = userPingList[i].split('//');
							userPingList[i] = {'id': split[0], 'name': split[1]};
						} else {
							userPingList[i] = {'id': userPingList[i]};
						}
					}
				}

				// Get usernames

				for (i = 0, elems = document.getElementById('chatters-online').getElementsByTagName('li'); i < elems.length; i++) {
					userElem = elems[i];
					userPingList = getUserName(userElem, userPingList);
				}

				// Make array into list

				var tempUserPingList = [];

				for (i = 0; i < userPingList.length; i++) {
					if (!userPingList[i].hasOwnProperty('name') || userPingList[i].name === null) {
						tempUserPingList.push(userPingList[i].id);
					} else {
						tempUserPingList.push(userPingList[i].id + '//' + userPingList[i].name);
					}
				}

				// Output to menu

				document.getElementById('userPingList').value = tempUserPingList.join('\n');

				opts.ipc_ping_style = document.getElementById('pingStyle').value;
				opts.ipc_pings = pingList;
				opts.ipc_user_pings = userPingList;
				opts.ipc_audible_ping = document.getElementById('audiblePingSwitch').checked;
				opts.ipc_pings_in_title = document.getElementById('titlePingSwitch').checked;
				opts.ipc_highlight_pings = document.getElementById('highlightPingsSwitch').checked;
				opts.ipc_audible_ping_on_focus = document.getElementById('audiblePingOnFocusSwitch').checked;
				opts.ipc_audible_ping_file = document.getElementById('audiblePingFile').value;
				localStorage.setItem('MakazeScriptOptions', JSON.stringify(opts));

				if (document.getElementById('audiblePingSwitch').checked) {
					pingSound = new Audio(document.getElementById('audiblePingFile').value);
				}

				fade(this.parentNode.parentNode, 'out');
			};
		}));
	});

	pingMenu = createElement('div', function(menu) {
		menu.id = 'pingsettings';
		menu.className = 'MakazeScriptMenu';
		menu.style.display = 'none';

		menu.appendChild(pingMenu_options);
		menu.appendChild(pingMenu_save);
	});

	document.body.appendChild(pingMenu);

	// Button creation

	if (document.getElementById('IPChatMenuItems') == null) {
		IPChatMenuItems = createElement('div', function(menu) {
			menu.id = 'IPChatMenuItems';
			menu.style.textAlign = 'right';
		});
		document.getElementById('chatters-online-wrap').nextSibling.nextSibling.getElementsByTagName('ul')[0].appendChild(IPChatMenuItems);
	}

	if (document.getElementById('IPChatMenuItems').hasChildNodes()) {
		document.getElementById('IPChatMenuItems').appendChild(document.createElement('br'));
	}

	menuButton = createElement('a', function(button) {
		button.id = 'pingMenuButton';
		button.className = 'ipsButton_secondary';
		button.href = 'javascript:void(0)';
		button.style.marginTop = '10px';
		button.appendChild(document.createTextNode('Ping Settings'));

		button.onclick = function() {
			fade(document.getElementById('pingsettings'));
		};
	});
	
	document.getElementById('IPChatMenuItems').appendChild(menuButton); 

	// Apply highlight style

	if (highlightPings) {
		if (styleElem.hasChildNodes()) {
			styleElem.childNodes[0].nodeValue += '\n\n';
		} else {
			styleElem.appendChild(document.createTextNode(''));
		}
		styleElem.childNodes[0].nodeValue +=
			'.ipc_highlight {\n' +
				pingStyle + '\n' +
			'}';
	}

	document.addEventListener('DOMNodeInserted', function(event) {
		if (event.target.nodeType !== 1) {
			return false;
		}

		var opts,
		userPings;

		// Get usernames for user pings on joins

		if (event.target.id.substr(0, 5) === 'user_') {
			opts = (localStorage.getItem('MakazeScriptOptions')) ? JSON.parse(localStorage.getItem('MakazeScriptOptions')) : {};
			userPings = (opts.hasOwnProperty('ipc_user_pings')) ? opts.ipc_user_pings : [];
			newUserPings = getUserName(event.target, userPings);
			opts.ipc_user_pings = newUserPings;
			localStorage.setItem('MakazeScriptOptions', JSON.stringify(opts));	
			return false;
		}

		if (event.target.id !== 'storage_chatroom') {
			return false;
		}

		opts = (localStorage.getItem('MakazeScriptOptions')) ? JSON.parse(localStorage.getItem('MakazeScriptOptions')) : {};
		userPings = (opts.hasOwnProperty('ipc_user_pings')) ? opts.ipc_user_pings : [];

		var latestMessage,
		textToCheck,
		pings = (opts.hasOwnProperty('ipc_pings')) ? opts.ipc_pings : [userName],
		audiblePing = (opts.hasOwnProperty('ipc_audible_ping')) ? opts.ipc_audible_ping : true,
		titlePing = (opts.hasOwnProperty('ipc_pings_in_title')) ? opts.ipc_pings_in_title : true,
		highlightPings = (opts.hasOwnProperty('ipc_highlight_pings')) ? opts.ipc_highlight_pings : true,
		audiblePingOnFocus = (opts.hasOwnProperty('ipc_audible_ping_on_focus')) ? opts.ipc_audible_ping_on_focus : false,
		ping,
		userPing,
		newUserPings,
		nameToCheck,
		nameNode,
		playSound = false,
		i = 0;

		latestMessage = event.target.parentNode.getElementsByTagName('div')[event.target.parentNode.getElementsByTagName('div').length - 1];

		if (!Classes.hasClass(latestMessage.parentNode, 'post')) {
			return false;
		}

		if (Classes.hasClass(latestMessage.parentNode, 'chat-myown')) {
			return false;
		}

		textToCheck = latestMessage.innerHTML;

		if (Classes.hasClass(latestMessage.parentNode, 'chat-notice')) {
			if (!userPings.length) {
				return false;
			}

			if (textToCheck !== '  has entered the room') {
				return false;
			}

			nameNode = latestMessage.parentNode.getElementsByTagName('label')[0];

			while (typeof nameToCheck === 'undefined') {
				if (nameNode.hasChildNodes()) {
					nameNode = nameNode.lastChild;
				} else {
					nameToCheck = nameNode.nodeValue;
				}
			}

			for (i = 0; i < userPings.length; i++) {
				if (nameToCheck === userPings[i].name) {
					userPing = new RegExp('(' + userPings[i].name + ')', "g");
					if (titlePing) {
						if (!hasFocus) {
							if (document.title.match(/\(P:/g)) {
								if (!document.title.match(userPing)) {
									document.title = document.title.replace(/\(P:\s(.*?)\)/g, '(P: $1 ' + userPings[i].name + ')');
								}
							} else {
								document.title = '(P: ' + userPings[i].name + ') ' + document.title;
							}
						}
					}

					if (highlightPings) {
						latestMessage.parentNode.className += ' ipc_highlight';
					}

					if (audiblePing) {
						playSound = true;
					}
				}
			}

			if (playSound) {
				if (!hasFocus || audiblePingOnFocus) {
					pingSound.play();
				}
			}

			return false;
		}

		for (i = 0; i < pings.length; i++) {
			ping = new RegExp('(' + pings[i] + ')', "gi");
			if (textToCheck.match(ping)) {
				if (titlePing) {
					if (!hasFocus) {
						if (document.title.match(/\(P:/g)) {
							if (!document.title.match(ping)) {
								document.title = document.title.replace(/\(P:\s(.*?)\)/g, '(P: $1 ' + pings[i] + ')');
							}
						} else {
							document.title = '(P: ' + pings[i] + ') ' + document.title;
						}
					}
				}

				if (highlightPings) {
					Classes.addClass(latestMessage.parentNode, 'chat-myown');
					latestMessage.innerHTML = latestMessage.innerHTML.replace(ping, '<span class="ipc_highlight">$1</span>');
				}

				if (audiblePing) {
					playSound = true;
				}
			}
		}

		if (playSound) {
			if (!hasFocus || audiblePingOnFocus) {
				pingSound.play();
			}
		}
	});

	window.onblur = function() {
		hasFocus = false;
	};

	window.onfocus = function() {
		hasFocus = true;
		if (document.title.match(/\(P:/gi)) {
			document.title = document.title.replace(/\(P:\s.*?\)\s/gi, '');
		}
	};
}