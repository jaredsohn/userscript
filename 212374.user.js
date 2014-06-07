// ==UserScript==
// @name	IP.Board Post Auto-Saving + Management
// @namespace	Makaze
// @include	*
// @grant	none
// @version	4.0.0
// ==/UserScript==

var GREEN_OPEN = 'http://i.minus.com/i3FmZuRl9edMv.png',
GREEN_CLOSED = 'http://i.minus.com/irSU8O8Tdghd9.png',
BLUE_OPEN = 'http://i.minus.com/iyk5uCne4V6fF.png',
BLUE_CLOSED = 'http://i.minus.com/i5qOrdsGxNJD.png',
CAPACITY = 5242880,
MakazeScriptStyles,
styleElem;

function dateAndTime() {
	var currentdate = new Date();
	var output = (((currentdate.getMonth() + 1) < 10) ? '0' + (currentdate.getMonth() + 1)  : (currentdate.getMonth() + 1)) + "/"
		+ ((currentdate.getDate() < 10) ? '0' + currentdate.getDate() : currentdate.getDate()) + "/"
		+ currentdate.getFullYear() + " @ "
		+ ((currentdate.getHours() < 10) ? '0' + currentdate.getHours() : currentdate.getHours()) + ":"
		+ ((currentdate.getMinutes() < 10) ? '0' + currentdate.getMinutes() : currentdate.getMinutes()) + ":"
		+ ((currentdate.getSeconds() < 10) ? '0' + currentdate.getSeconds() : currentdate.getSeconds());
	return output;
}

function roundToNthDecimal(d, n) {
	return Math.round(d * Math.pow(10, n)) / Math.pow(10, n);
}

function empty(elem) {
	while (elem.hasChildNodes()) {
		elem.removeChild(elem.lastChild);
	}
}

function createElement(type, callback) {
	var element = document.createElement(type);

	callback(element);

	return element;
}

function moveCaret(win, charCount) {
	var sel, range;
	if (win.getSelection) {
		sel = win.getSelection();
		if (sel.rangeCount > 0) {
			var textNode = sel.focusNode;
			var newOffset = sel.focusOffset + charCount;
			sel.collapse(textNode, Math.min(textNode.length, newOffset));
		}
	} else if ( (sel = win.document.selection) ) {
		if (sel.type != "Control") {
			range = sel.createRange();
			range.move("character", charCount);
			range.select();
		}
	}
}

function fade(elem, type, speed) {
	function defaultStyle(tag) {
		var defaultStyles = {},
		testElem = document.createElement(tag),
		getStyle = 'getComputedStyle' in window,
		styles;

		document.body.appendChild(testElem);

		styles = (getStyle) ? window.getComputedStyle(testElem) : testElem.currentStyle;

		for (var prop in styles) {
			defaultStyles[prop] = styles[prop];
		}

		document.body.removeChild(testElem);

		return defaultStyles;
	}

	var defaults = defaultStyle(elem.tagName),
	defaultOpacity,
	defaultDisplay,
	currentDisplay = (elem.style.display.length) ? elem.style.display : window.getComputedStyle(elem).display;

	if (elem.style.display.length) {
		elem.style.display = '';
	}

	defaultDisplay = (window.getComputedStyle(elem).display === 'none') ? defaults.display : window.getComputedStyle(elem).display;

	elem.style.display = currentDisplay;

	if (elem.style.display.length) {
		elem.style.opacity = '';
	}

	defaultOpacity = (window.getComputedStyle(elem).opacity === '0') ? defaults.opacity : window.getComputedStyle(elem).opacity;

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
			elem.style.display = defaultDisplay;
			setTimeout(function() {
				elem.style.transition = 'all ' + speed + 'ms ease-in-out';
				elem.style.opacity = defaultOpacity;
				setTimeout(function() {
					elem.style.transition = '';
				}, speed + 10);
			}, 0);
		break;
		case 'out':
			elem.style.transition = 'none';
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
				elem.style.display = defaultDisplay;
				setTimeout(function() {
					elem.style.transition = 'all ' + speed + 'ms ease-in-out';
					elem.style.opacity = defaultOpacity;
					setTimeout(function() {
						elem.style.transition = '';
					}, speed + 10);
				}, 0);
			} else {
				elem.style.transition = 'none';
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

// Initilize

var Classes = new ClassHandler();

// End Classes constructor

// Event constructor

function EventHandler() {
	var events = [],
	matchedEvents = [],
	selector = document,
	self = this;

	this.selector = function(toSelect) {
		selector = toSelect;
		return self;
	};

	this.add = function(types, namespace, listener, useCapture) {
		var type,
		event,
		i = 0;

		types = types.split(/[\b\s]/);

		events.push({'selector': selector, 'namespace': namespace, 'types': types, 'listener': listener, 'useCapture': useCapture});
		event = events[events.length - 1];

		for (i = 0; i < event.types.length; i++) {
			type = event.types[i];
			selector.addEventListener(type, listener, useCapture);
		}

		return self;
	};

	this.remove = function(types, namespace, listener, useCapture) {
		var event,
		eventType,
		eventTypes,
		type,
		i = 0,
		j = 0,
		k = 0;

		if (!arguments.length) {
			if (matchedEvents.length) {
				for (i = 0; i < matchedEvents.length; i++) {
					event = matchedEvents[i];
					for (j = 0; j < event.types.length; j++) {
						type = event.types[j];
						event.selector.removeEventListener(type, event.listener, event.useCapture);
					}
				}
			} else {
				self.getEventsBySelector(selector).remove();
			}
		} else {
			types = types.split(/[\b\s]/);

			for (i = 0; i < events.length; i++) {
				event = events[i];
				if (event.selector == selector && event.namespace === namespace && event.useCapture === useCapture && event.listener === listener) {
					eventTypes = event.types;
					for (j = 0; j < eventTypes.length; j++) {
						eventType = eventTypes[j];
						for (k = 0; k < event.types.length; k++) {
							type = types[k];
							if (type === eventType) {
								selector.removeEventListener(type, event.listener, event.useCapture);
							}
						}
					}
					break;
				}
			}
		}

		matchedEvents = [];

		return self;
	};

	this.output = function() {
		if (!matchedEvents.length) {
			self.getAllEvents().output();
		} else {
			var output = matchedEvents;
			matchedEvents = [];
			return output;
		}
	};

	this.getAllEvents = function() {
		matchedEvents = events;
		return self;
	};

	this.getEventsBySelector = function(getSelector) {
		var event,
		i = 0;

		if (matchedEvents.length) {
			for (i = 0; i < matchedEvents.length; i++) {
				event = matchedEvents[i];
				if (event.selector != getSelector) {
					matchedEvents.splice(i, 1);
				}
			}
		} else {
			for (i = 0; i < events.length; i++) {
				event = events[i];
				if (event.selector == getSelector) {
					matchedEvents.push(event);
				}
			}
		}

		return self;
	};

	this.getEventsByType = function(types) {
		var eventTypes,
		eventType,
		event,
		type,
		hasType = false,
		i = 0,
		j = 0,
		k = 0;

		types = types.split(/[\b\s]/);

		if (matchedEvents.length) {
			for (i = 0; i < matchedEvents.length; i++) {
				event = matchedEvents[i];
				for (j = 0; j < eventTypes.length; j++) {
					eventType = eventTypes[j];
					for (k = 0; k < event.types.length; k++) {
						type = types[k];
						if (type === eventType) {
							hasType = true;
							break;
						}
					}
					if (hasType) {
						break;
					}
				}
				if (hasType) {
					matchedEvents.splice(i, 1);
				}
			}
		} else {
			for (i = 0; i < events.length; i++) {
				event = events[i];
				for (j = 0; j < eventTypes.length; j++) {
					eventType = eventTypes[j];
					for (k = 0; k < event.types.length; k++) {
						type = types[k];
						if (type === eventType) {
							hasType = true;
							break;
						}
					}
					if (hasType) {
						break;
					}
				}
				if (hasType) {
					matchedEvents.push(event);
				}
			}
		}
		
		return self;
	};

	this.getEventsByName = function(namespace) {
		var event,
		i = 0;

		if (matchedEvents.length) {
			for (i = 0; i < matchedEvents.length; i++) {
				event = matchedEvents[i];
				if (event.namespace !== namespace) {
					matchedEvents.splice(i, 1);
				}
			}
		} else {
			for (i = 0; i < events.length; i++) {
				event = events[i];
				if (event.namespace === namespace) {
					matchedEvents.push(event);
				}
			}
		}

		return self;
	};

	this.getEventsByListener = function(listener) {
		var event,
		i = 0;

		if (matchedEvents.length) {
			for (i = 0; i < matchedEvents.length; i++) {
				event = matchedEvents[i];
				if (event.listener !== listener) {
					matchedEvents.splice(i, 1);
				}
			}
		} else {
			for (i = 0; i < events.length; i++) {
				event = events[i];
				if (event.listener === listener) {
					matchedEvents.push(event);
				}
			}
		}

		return self;
	};
}

// Initialize

var Events = new EventHandler();

// End Event constructor

function refresh() {
	function createLogItem(source, i) {
		return createElement('div', function(log) {
			log.id = source[i].id;
			log.className = 'log-item';
			log.name = i;

			log.appendChild(createElement('div', function(header) {
				header.className = 'log-item-header';
				header.appendChild(createElement('a', function(link) {
					link.className = 'header-link';
					link.appendChild(createElement('img', function(icon) {
						icon.src = selectedIcon;
						icon.className = 'folderIcon';
					}));

					if (source[i].hasOwnProperty('name')) {
						link.appendChild(createElement('span', function(name) {
							name.className = 'name';
							name.appendChild(document.createTextNode(source[i].name));
						}));
						link.appendChild(document.createTextNode(' | '));
					}

					link.appendChild(document.createTextNode(source[i].date));
				}));

				header.appendChild(createElement('del', function(del) {
					del.className = 'delete';
					del.appendChild(document.createTextNode('Delete'));
				}));

				if (selected === 'defaultFolder') {
					header.appendChild(createElement('del', function(save) {
						save.className = 'save';
						save.appendChild(document.createTextNode('Move to Saved '));
						save.appendChild(createElement('img', function(icon) {
							icon.src = BLUE_OPEN;
							icon.className = 'folderIcon';
						}));
					}));
				} else {
					header.appendChild(createElement('del', function(rename) {
						rename.className = 'rename';
						rename.appendChild(document.createTextNode('Rename'));
					}));
				}

				header.appendChild(createElement('del', function(load) {
					load.className = 'load';
					load.appendChild(document.createTextNode('Load'));
				}));
			}));

			log.appendChild(createElement('div', function(msg) {
				msg.className = 'msg-content';
				msg.innerHTML = source[i].msg.replace(/\n/g, '<br />');
			}));
		});
	}

	var selected = document.getElementsByClassName('folderSelected')[0].title.toLowerCase() + 'Folder',
	source = (localStorage.getItem(selected)) ? JSON.parse(localStorage.getItem(selected)) : [],
	selectedIcon = (selected === 'defaultFolder') ? GREEN_CLOSED : BLUE_CLOSED,
	currentLength = 0,
	occupied,
	defaultFull,
	savedFull,
	queue = document.getElementById('SavedPostsMenu-queue'),
	capacity = document.getElementById('capacity'),
	capacityText = document.getElementById('capacity-text'),
	i = 0;

	document.getElementById('trash').getElementsByTagName('span')[0].childNodes[0].nodeValue = 0;

	empty(queue);

	if (source.length) {
		source.sort(function(a, b) {
			var dateA = new Date(a.date.replace(/@/g, '')),
			dateB = new Date(b.date.replace(/@/g, ''));
			return dateB - dateA;
		});

		for (i = 0; i < source.length; i++) {
			queue.appendChild(createLogItem(source, i));
		}
	} else {
		queue.appendChild(createElement('div', function(cont) {
			cont.appendChild(createElement('div', function(error) {
				error.className = 'error_notice';
				error.style.padding = '5px 0';
				error.appendChild(document.createTextNode('No messages to display.'));
			}));
		}));
	}

	if (!localStorage.length) {
		capacity.getElementsByTagName('div')[0].style.width = 0 + '%';
		capacityText.childNodes[0].nodeValue = 0 + '% full';
	} else {
		for (i = 0; i < localStorage.length; i++) {
			currentLength += localStorage.getItem(localStorage.key(i)).length;
		}
		occupied = (currentLength / CAPACITY) * 100;
		defaultFull = (localStorage.getItem('defaultFolder')) ? (localStorage.getItem('defaultFolder').length / CAPACITY) : 0;
		savedFull = (localStorage.getItem('savedFolder')) ? (localStorage.getItem('savedFolder').length / CAPACITY) + defaultFull : 0;
		document.getElementById('defaultFolder').style.width = defaultFull + '%';
		document.getElementById('savedFolder').style.width = savedFull + '%';
		occupied = roundToNthDecimal(occupied, 1);
		capacityText.childNodes[0].nodeValue = occupied + '% full';
		if (occupied >= 95 && !Classes.hasClass(capacity, 'full')) {
			Classes.addClass(capacity, 'full');
			Classes.addClass(capacityText, 'full');
		} else if (Classes.hasClass(capacity, 'full')) {
			Classes.removeClass(capacity, 'full');
			Classes.removeClass(capacityText, 'full');
		}
	}
}

function manageSavedPosts() {
	var alreadyExists = false,
	SavedPostsMenu,
	menu;

	// The menu

	if (document.getElementById('SavedPostsMenu') == null) {
		SavedPostsMenu = createElement('div', function(menu) {
			menu.id = 'SavedPostsMenu';
			menu.appendChild(createElement('div', function(padded) {
				padded.className = 'padded';
				padded.appendChild(createElement('div', function(close) {
					close.id = 'close-SavedPostsMenu';
					close.appendChild(createElement('span', function(span) {
						span.appendChild(document.createTextNode('x'));
					}));
				}));

				padded.appendChild(createElement('div', function(trash) {
					trash.id = 'trash';
					trash.appendChild(document.createTextNode('Empty Trash ('));
					trash.appendChild(createElement('span', function(span) {
						span.appendChild(document.createTextNode('0'));
					}));
					trash.appendChild(document.createTextNode(' Items)'));
				}));

				padded.appendChild(createElement('div', function(cap) {
					cap.id = 'capacity';
					cap.appendChild(createElement('div', function(folderCap) {
						folderCap.id = 'defaultFolder';
					}));

					cap.appendChild(createElement('div', function(folderCap) {
						folderCap.id = 'savedFolder';
					}));
				}));

				padded.appendChild(createElement('div', function(mass) {
					mass.id = 'mass-functions';
					mass.appendChild(createElement('span', function(cap_text) {
						cap_text.id = 'capacity-text';
						cap_text.appendChild(document.createTextNode('0% full'));
					}));

					mass.appendChild(createElement('a', function(refresh) {
						refresh.name = 'refresh';
						refresh.appendChild(document.createTextNode('Refresh'));
					}));
					mass.appendChild(document.createTextNode(' | '));
					mass.appendChild(createElement('a', function(toggle) {
						toggle.name = 'toggle-all';
						toggle.appendChild(document.createTextNode('Toggle All'));
					}));
					mass.appendChild(document.createTextNode(' | '));
					mass.appendChild(createElement('a', function(restore) {
						restore.name = 'restore-all';
						restore.appendChild(document.createTextNode('Restore All'));
					}));
					mass.appendChild(document.createTextNode(' | '));
					mass.appendChild(createElement('a', function(del) {
						del.name = 'delete-all';
						del.appendChild(document.createTextNode('Delete All'));
					}));
				}));

				padded.appendChild(createElement('div', function(select) {
					select.id = 'folderSelect';
					select.appendChild(createElement('img', function(icon) {
						icon.title = 'Default';
						icon.src = GREEN_OPEN;
						icon.className = 'folderSelected';
					}));

					select.appendChild(createElement('img', function(icon) {
						icon.title = 'Saved';
						icon.src = BLUE_CLOSED;
					}));
				}));

				padded.appendChild(createElement('div', function(folder) {
					folder.id = 'folderName';
					folder.appendChild(document.createTextNode('Default'));
				}));

				padded.appendChild(createElement('div', function(queue) {
					queue.id = 'SavedPostsMenu-queue';
				}));
			}));
		});

		document.body.appendChild(SavedPostsMenu);
	} else {
		alreadyExists = true;
	}

	menu = document.getElementById('SavedPostsMenu');

	refresh();

	// Kill the process if the menu already exists

	if (alreadyExists) {
		fade(menu, 'in');
		return false;
	}

	// Events

	// Handlers

	var closeHandler = function() {
		fade(menu, 'out');
	};

	var selectFolderHandler = function(event) {
		if (event.target.tagName !== 'IMG') {
			return false;
		}

		var folder = event.target.title,
		selected,
		folderName;

		if (Classes.hasClass(event.target, 'folderSelected')) {
			refresh();
			return false;
		}

		selected = document.getElementsByClassName('folderSelected')[0];
		folderName = document.getElementById('folderName');

		if (folder === 'Default') {
			event.target.src = GREEN_OPEN;
			selected.src = BLUE_CLOSED;
		} else {
			event.target.src = BLUE_OPEN;
			selected.src = GREEN_CLOSED;
		}

		Classes.removeClass(selected, 'folderSelected');
		Classes.addClass(event.target, 'folderSelected');
		Classes.toggleClass(folderName, 'savedFolderText');
		folderName.childNodes[0].nodeValue = folder;
		refresh();
	};

	var trashHandler = function() {
		var trash = document.getElementById('trash'),
		selected = document.getElementsByClassName('folderSelected')[0].title.toLowerCase() + 'Folder',
		selectedLog = JSON.parse(localStorage.getItem(selected)),
		logItems = document.getElementsByClassName('log-item'),
		thisLog,
		idToDelete,
		idToCompare,
		start,
		i = 0,
		messageNum;

		for (i = 0; i < logItems.length; i++) {
			thisLog = logItems[i];

			if (thisLog.hasAttribute('delete')) {
				idToDelete = thisLog.id;

				for (messageNum = 0; messageNum < selectedLog.length; messageNum++) {
					idToCompare = selectedLog[messageNum].id;
					if (idToCompare === idToDelete) {
						start = messageNum;
						break;
					}
				}

				selectedLog.splice(start, 1);
			}
		}

		trash.getElementsByTagName('span')[0].childNodes[0].nodeValue = 0;
		localStorage.setItem(selected, JSON.stringify(selectedLog));
	};

	var massHandler = function(event) {
		if (event.target.tagName !== 'A') {
			return false;
		}

		var logItems = document.getElementsByClassName('log-item'),
		trash = document.getElementById('trash'),
		thisLog,
		headers,
		i = 0;

		switch (event.target.name) {
			case 'refresh':
				refresh();
			break;
			case 'toggle-all':
				headers = document.getElementsByClassName('header-link');
				for (i = 0; i < headers.length; i++) {
					headers[i].click();
				}
			break;
			case 'restore-all':
				for (i = 0; i < logItems.length; i++) {
					thisLog = logItems[i];

					if (thisLog.hasAttribute('delete')) {
						thisLog.removeAttribute('delete');
						fade(thisLog, 'in', 100);
						trash.getElementsByTagName('span')[0].childNodes[0].nodeValue = parseInt(trash.getElementsByTagName('span')[0].childNodes[0].nodeValue) - 1;
					}
				}
			break;
			case 'delete-all':
				for (i = 0; i < logItems.length; i++) {
					thisLog = logItems[i];

					if (!thisLog.hasAttribute('delete')) {
						thisLog.getElementsByClassName('delete')[0].click();
					}
				}
			break;
		}
	};

	var selectMessageHandler = function(event) {
		if (!event.target.className || !Classes.hasClass(event.target, 'load')) {
			return false;
		}

		var toSelect = event.target.parentNode.nextSibling,
		idToLoad = toSelect.parentNode.id,
		msgToLoad,
		selected = document.getElementsByClassName('folderSelected')[0].title.toLowerCase() + 'Folder',
		selectedLog,
		idToCompare,
		iteration,
		range;

		if (document.selection) {
			range = document.body.createTextRange();
			range.moveToElementText(toSelect);
			range.select();
		} else if (window.getSelection()) {
			range = document.createRange();
			range.selectNode(toSelect);
			window.getSelection().removeAllRanges();
			window.getSelection().addRange(range);
		}

		// Nested click handler

		var loadMessageRichClickHandler = function(event) {
			var cursored = window.parent.document.getElementsByClassName('selectableForLoad'),
			thisCursored,
			i = 0,
			messageNum = 0;

			selectedLog = JSON.parse(localStorage.getItem(selected));

			for (messageNum = 0; messageNum < selectedLog.length; messageNum++) {
				idToCompare = selectedLog[messageNum].id;
				if (idToCompare === idToLoad) {
					iteration = messageNum;
					break;
				}
			}

			msgToLoad = selectedLog[iteration].msg;

			if (event.target.getElementsByTagName('body')[0].textContent.length) {
				event.target.getElementsByTagName('body')[0].innerHTML += msgToLoad;
			} else {
				event.target.getElementsByTagName('body')[0].innerHTML = msgToLoad;
			}

			for (i = 0; i < cursored.length; i++) {
				thisCursored = cursored[i];

				if (thisCursored.tagName === 'TEXTAREA') {
					thisCursored.style.cursor = '';
				} else {
					thisCursored.contentWindow.document.documentElement.style.cursor = '';
				}

				Classes.removeClass(thisCursored, 'selectableForLoad');
			}

			Events.getEventsByName('loadMessage').remove();

			fade(window.parent.document.getElementById('noticeBar'), 'out');
		};

		var loadMessageRichMouseoverHandler = function(event) {
			if (event.target.tagName !== 'IFRAME' || !event.target.title || !event.target.title.match('Rich text editor')) {
				return false;
			}

			event.target.contentWindow.document.documentElement.style.cursor = 'crosshair';

			Classes.addClass(event.target, 'selectableForLoad');
			Events.selector(event.target.contentWindow.document.documentElement).add('click', 'loadMessage', loadMessageRichClickHandler, false);

			Events.getEventsByName('loadMessageRich').remove();
		};

		var loadMessageClickHandler = function(event) {
			if (!event.target.className || !Classes.hasClass(event.target, 'cke_source')) {
				return false;
			}

			selectedLog = JSON.parse(localStorage.getItem(selected));

			var cursored = document.getElementsByClassName('selectableForLoad'),
			thisCursored,
			messageNum = 0,
			i = 0;

			for (messageNum = 0; messageNum < selectedLog.length; messageNum++) {
				idToCompare = selectedLog[messageNum].id;
				if (idToCompare === idToLoad) {
					iteration = messageNum;
					break;
				}
			}

			msgToLoad = selectedLog[iteration].msg;
			
			event.target.value += msgToLoad;

			for (i = 0; i < cursored.length; i++) {
				thisCursored = cursored[i];

				if (thisCursored.tagName === 'TEXTAREA') {
					thisCursored.style.cursor = '';
				} else {
					thisCursored.contentWindow.document.documentElement.style.cursor = '';
				}

				Classes.removeClass(thisCursored, 'selectableForLoad');
			}

			Events.getEventsByName('loadMessage').remove();

			fade(document.getElementById('noticeBar'), 'out');
		};

		var loadMessageMouseoverHandler = function(event) {
			if (!event.target.className || !Classes.hasClass(event.target, 'cke_source')) {
				return false;
			}

			event.target.style.cursor = 'crosshair';
			Classes.addClass(event.target, 'selectableForLoad');
		};

		Events.selector(document).add('mouseover', 'loadMessage', loadMessageMouseoverHandler, false);

		Events.selector(document).add('click', 'loadMessage', loadMessageClickHandler, false);

		Events.selector(document).add('mouseover', 'loadMessageRich', loadMessageRichMouseoverHandler, false);

		if (document.getElementById('noticeBar') == null) {
			document.body.appendChild(createElement('div', function(bar) {
				bar.id = 'noticeBar';
				bar.appendChild(document.createTextNode(''));
			}));
		}

		document.getElementById('noticeBar').childNodes[0].nodeValue = 'Click a post field to load this post.';

		fade(document.getElementById('noticeBar'), 'in');
	};

	var moveToSavedHandler = function(event) {
		if (!event.target.className || !Classes.hasClass(event.target, 'save')) {
			return false;
		}

		var defaultLog = JSON.parse(localStorage.getItem('defaultFolder')),
		savedLog = (localStorage.getItem('savedFolder')) ? JSON.parse(localStorage.getItem('savedFolder')) : [],
		msgToMove = event.target.parentNode.parentNode.id,
		msgToCompare,
		iteration,
		savedName,
		toHide = event.target.parentNode.parentNode;

		var moveAndRenameKeydownHandler = function(event) {
			var messageNum = 0;

			if (event.target.tagName === 'INPUT') {
				if (event.keyCode === 13) {
					savedName = event.target.value;
					for (messageNum = 0; messageNum < defaultLog.length; messageNum++) {
						msgToCompare = defaultLog[messageNum].id;
						if (msgToCompare === msgToMove) {
							iteration = messageNum;
							break;
						}
					}
					defaultLog[iteration].name = savedName;
					savedLog.push(defaultLog[iteration]);
					defaultLog.splice(iteration, 1);
					localStorage.setItem('defaultFolder', JSON.stringify(defaultLog));
					localStorage.setItem('savedFolder', JSON.stringify(savedLog));
					fade(toHide, 'out');
					fade(event.target.parentNode, 'out');
					Events.selector(document.getElementById('renameDialog')).remove('keydown', 'moveAndRenameKeydown', moveAndRenameKeydownHandler, false);
				}
			}
		};

		if (document.getElementById('renameDialog') == null) {
			document.body.appendChild(createElement('div', function(rename) {
				rename.id = 'renameDialog';
				rename.appendChild(document.createTextNode('Name this Message'));
				rename.appendChild(document.createElement('br'));
				rename.appendChild(createElement('inpty', function(input) {
					input.type = 'text';
					input.placeholder = 'Press enter to submit';
				}));
			}));
		}

		document.getElementById('renameDialog').getElementsByTagName('input')[0].value = '';

		fade(document.getElementById('renameDialog'), 'in');

		Events.selector(document.getElementById('renameDialog')).add('keydown', 'moveAndRenameKeydown', moveAndRenameKeydownHandler, false);
	};

	var renameHandler = function(event) {
		if (!event.target.className || !Classes.hasClass(event.target, 'rename')) {
			return false;
		}

		var renaming = event.target.parentNode.parentNode.getElementsByClassName('name')[0],
		savedLog = JSON.parse(localStorage.getItem('savedFolder')),
		msgToRename = event.target.parentNode.parentNode.id,
		msgToCompare,
		iteration,
		newName;

		if (renaming.hasAttribute('contenteditable')) {
			renaming.removeAttribute('contenteditable');
			renaming.removeAttribute('style');
			return false;
		}

		renaming.setAttribute('contenteditable', 'true');
		renaming.setAttribute('style', 'outline: none; background-color: rgba(255, 255, 255, .7); padding: 3px; cursor: text;');
		renaming.focus();
		moveCaret(window, renaming.textContent.length);

		var renameKeydownHandler = function(event) {
			if (event.keyCode == 13) {
				event.target.removeAttribute('contenteditable');
				event.target.removeAttribute('style');
				newName = event.target.textContent;
				for (var messageNum = 0; messageNum < savedLog.length; messageNum++) {
					msgToCompare = savedLog[messageNum].id;
					if (msgToCompare === msgToRename) {
						iteration = messageNum;
						break;
					}
				}
				savedLog[iteration].name = newName;
				localStorage.setItem('savedFolder', JSON.stringify(savedLog));
				Events.selector(event.target).remove('keydown', 'renameKeydown', renameKeydownHandler, false);
			}
		};

		Events.selector(renaming).add('keydown', 'renameKeydown', renameKeydownHandler, false);
	};

	var deleteHandler = function(event) {
		if (!event.target.className || !Classes.hasClass(event.target, 'delete')) {
			return false;
		}

		var parentLog = event.target.parentNode.parentNode;

		fade(parentLog, 'out', 100);
		parentLog.setAttribute('delete', '');
		document.getElementById('trash').getElementsByTagName('span')[0].childNodes[0].nodeValue = parseInt(document.getElementById('trash').getElementsByTagName('span')[0].childNodes[0].nodeValue) + 1;
	};

	var showMsgContentHandler = function(event) {
		if (!event.target.className || !(Classes.hasClass(event.target, 'header-link') || Classes.hasClass(event.target.parentNode, 'header-link'))) {
			return false;
		}

		var thisTarget = (Classes.hasClass(event.target, 'header-link')) ? event.target : event.target.parentNode,
		selected = document.getElementsByClassName('folderSelected')[0].title.toLowerCase() + 'Folder',
		folderIcon = thisTarget.getElementsByClassName('folderIcon')[0],
		parent = thisTarget.parentNode,
		selectedIcon,
		dels,
		i = 0;

		if (Classes.hasClass(folderIcon, 'isOpen')) {
			selectedIcon = (selected === 'defaultFolder') ? GREEN_CLOSED : BLUE_CLOSED;
		} else {
			selectedIcon = (selected === 'defaultFolder') ? GREEN_OPEN : BLUE_OPEN;
		}

		folderIcon.src = selectedIcon;
		Classes.toggleClass(folderIcon, 'isOpen');
		fade(parent.nextSibling, 'toggle', 100);
		for (i = 0, dels = parent.getElementsByTagName('del'); i < dels.length; i++) {
			fade(dels[i], 'toggle', 100);
		}
	};

	// Add events

	Events.selector(document.getElementById('close-SavedPostsMenu').getElementsByTagName('span')[0]).add('click', 'close', closeHandler, false);

	Events.selector(document.getElementById('folderSelect')).add('click', 'selectFolder', selectFolderHandler, false);

	Events.selector(document.getElementById('trash')).add('click', 'empty', trashHandler, false);

	Events.selector(document.getElementById('mass-functions')).add('click', 'mass', massHandler, false);

	Events.selector(menu).add('click', 'select', selectMessageHandler, false);

	Events.selector(menu).add('click', 'moveToSaved', moveToSavedHandler, false);

	Events.selector(menu).add('click', 'rename', renameHandler, false);

	Events.selector(menu).add('click', 'delete', deleteHandler, false);

	Events.selector(menu).add('click', 'showMsgContent', showMsgContentHandler, false);
}

if (document.getElementsByTagName('body')[0].id === 'ipboard_body') {
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

	styleElem.childNodes[0].nodeValue += '#SavedPostsMenu { background-color: rgba(240, 240, 240, 0.8); width: 50%; height: 100%; position: fixed; z-index: 99999999; top: 0px; left: 25%; box-shadow: 0px 0px 3px #444; color: #222; overflow-y: auto; }  #SavedPostsMenu .padded { padding: 25px; }  #close-SavedPostsMenu { text-align: right; height: 0px; }  #close-SavedPostsMenu span { background-color: #222; color: #fff; font-size: 110%; display: inline-block; width: 25px; height: 25px; text-align: center; line-height: 25px; border-radius: 25px; opacity: 0.9; cursor: pointer; }  #trash { text-align: center; font-weight: bolder; background-color: rgba(250, 250, 245, 0.9); color: rgb(68, 68, 68); text-shadow: 0px 0px 2px rgb(170, 170, 170); box-shadow: 0px 0px 2px rgb(119, 119, 119); padding: 15px; margin: 0 100px; border-radius: 10px; font-size: 150%; margin-bottom: 15px; cursor: pointer; }  #mass-functions { text-align: right; text-shadow: 1px 1px rgb(255, 255, 255); font-weight: bolder; padding: 10px; font-style: oblique; background-color: rgba(255, 255, 255, .9); font-size: 120%; border-radius: 3px; margin-bottom: 10px; }  .log-item { margin: 5px 0; }  .log-item-header { margin: 10px 0; }  #SavedPostsMenu a, #SavedPostsMenu del, #SavedPostsMenu .undo, #SavedPostsMenu .error_notice { text-shadow: 1px 1px #FFF; font-weight: bolder; cursor: pointer; margin: 0 10px; }  #SavedPostsMenu del { text-decoration: none; float: right; display: none; }  .msg-content { background-color: rgba(255, 255, 255, .8); border-radius: 5px; box-shadow: 0px 0px 3px #777; padding: 15px; display: none; }  #SavedPostsMenu ol { list-style: decimal; padding-left: 40px; }  #SavedPostsMenu il { list-style: disc; padding-left: 40px; }  .log-item .undo { background-color: rgba(255, 255, 255, .7); font-style: oblique; margin: 0 7px; padding: 3px; border-radius: 3px; display: none; }  .log-item .error_notice { font-size: 120%; cursor: auto; }  #capacity { background-color: rgba(255, 255, 255, .7); border-radius: 3px; margin-bottom: 10px; overflow: hidden; }  #capacity > div { height: 10px; border-radius: 3px; -webkit-transition: all .2s ease-in-out; -moz-transition: all .2s ease-in-out; -o-transition: all .2s ease-in-out; transition: all .2s ease-in-out; }  #capacity > div#defaultFolder { background-color: #7f3; border-bottom: 1px solid #7C3; border-right: 1px solid #7C3; position: absolute; }  #capacity.full > div#savedFolder { background-color: #3cf; border-bottom: 1px solid #39C; border-right: 1px solid #39C; }  #capacity.full > div { background-color: #F11; border-bottom: 1px solid #C11; border-right: 1px solid #C11; }  #capacity-text { float: left; -webkit-transition: all .2s ease-in-out; -moz-transition: all .2s ease-in-out; -o-transition: all .2s ease-in-out; transition: all .2s ease-in-out; }  #capacity-text.full { color: #F11; text-shadow: 1px 1px #C11; }  .saved-notice-footer { float: left; background-color: rgba(255, 255, 255, 0.4) ! important; color: #676767 ! important; padding: 3px 5px ! important; border-radius: 5px; }  .last-saved { color: inherit ! important; }  .saved-warning { color: #F11 ! important; }  .saved-warning > strong { font-weight: bolder ! important; }  .open-SavedPostsMenu { text-decoration: underline ! important; cursor: pointer ! important; }  .open-SavedPostsMenu:hover { text-decoration: none ! important; }  #folderSelect { text-align: center; }  #folderSelect > img { height: 25px; cursor: pointer; padding: 5px; border: 1px dashed transparent; }  #folderSelect > img:not(:last-of-type) { margin-right: 5px; }  #SavedPostsMenu .folderSelected { padding: 5px; border-radius: 5px; border: 1px dashed #aaa ! important; }  #folderName { font-weight: bolder; padding-top: 5px; font-size: 130%; }  #SavedPostsMenu .savedFolderText { color: #3cf; text-shadow: 1px 1px #39C; }  #SavedPostsMenu img.folderIcon { height: 15px; }  #SavedPostsMenu .header-link > img.folderIcon { margin-right: 5px; }  #noticeBar { position: fixed; z-index: 9999999999; bottom: 0px; text-align: center; width: 100%; background-color: rgba(50, 50, 50, .9); color: #fff; box-shadow: 0px 0px 5px #111; font-size: 25px; font-weight: bolder; padding: 20px 0px; display: none; }  #renameDialog { position: fixed; z-index: 999999999; top: 50%; left: 50%; padding: 3px; height: 40px; width: 200px; margin-top: -24px; margin-left: -79px; background-color: #f8f8f8; border: 1px solid #ccc; border-radius: 5px; text-align: center; font-weight: bolder; display: none; }  #renameDialog > input { margin: 3px 0px; width: 95%; }';

	var autoSavePostHandler = function(event) {
		var editor,
		editorContainer,
		editorSubmitParent,
		editorContents,
		editorID,
		editorType,
		editor_bottom,
		footer;

		if (!event.target.tagName) {
			return false;
		}

		switch (event.target.tagName) {
			case 'TEXTAREA':
				if (event.target.hasAttribute('aria-label') && event.target.getAttribute('aria-label').match('Rich text editor')) {
					editor = event.target;
					editorContainer = event.target.parentNode.parentNode.parentNode.parentNode;
				} else {
					return false;
				}
			break;
			case 'IFRAME':
				if (event.target.title && event.target.title.match('Rich text editor')) {
					editor = event.target;
					editorContainer = event.target.parentNode.parentNode.parentNode.parentNode;
				} else {
					return false;
				}
			break;
			default:
				return false;
		}

		if (editorContainer.hasAttribute('auto-saving')) {
			return false;
		}

		editorContents = editorContainer.getElementsByClassName('cke_contents')[0];

		if (editorContents.id.match('editor')) {
			editorID = editorContents.id.split('editor_')[1];
			editorType = 'editor_';
		} else if (!editorContents.id.match('editor') && editorContents.id.match('edit')) {
			editorID = editorContents.id.split('edit-')[1];
			editorType = 'edit-';
		}

		editor_bottom = document.getElementById('cke_bottom_' + editorType + editorID);

		console.log('Saving from:', editor);

		footer = createElement('div', function(footer) {
			footer.className = 'saved-notice-footer';
			footer.appendChild(createElement('span', function(last_saved) {
				last_saved.className = 'last-saved';
			}));

			footer.appendChild(document.createTextNode(' '));

			footer.appendChild(createElement('a', function(open_menu) {
				open_menu.className = 'open-SavedPostsMenu';
				open_menu.appendChild(document.createTextNode('{Menu}'));
			}));
		});

		editor_bottom.insertBefore(footer, editor_bottom.firstChild);

		var openMenuHandler = function() {
			manageSavedPosts();
		};

		Events.selector(editor_bottom.getElementsByClassName('open-SavedPostsMenu')[0]).add('click', 'open_menu', openMenuHandler, false);

		function fireInterval(elemID, context) {
			var timeStamp = dateAndTime(),
			elem,
			saveState,
			elems,
			newEntry,
			i = 0;

			if (context.getElementsByTagName('textarea')[0] != null) {
				for (i = 0, elems = context.getElementsByTagName('textarea'); i < elems.length; i++) {
					if (elems[i].getAttribute('aria-label').match(elemID)) {
						elem = elems[i];
						if (!elem.value.length) {
							return false;
						}

						saveState = elem.value;
					}
				}
			} else {
				for (i = 0, elems = context.getElementsByTagName('iframe'); i < elems.length; i++) {
					if (elems[i].title.match(elemID)) {
						elem = elems[i];
						if (!elem.contentWindow.document.body.textContent.length) {
							return false;
						}

						saveState = elem.contentWindow.document.body.innerHTML;
					}
				}
			}

			newEntry = { 'id': elemID, 'date': timeStamp, 'msg': saveState };

			// The meat
			
			var defaultLog = (localStorage.getItem('defaultFolder')) ? JSON.parse(localStorage.getItem('defaultFolder')) : [],
			lastSavedElem = document.getElementById('cke_bottom_' + editorType + editorID).getElementsByClassName('last-saved')[0],
			newMessage = true,
			messageID,
			messageToEdit,
			currentLength = 0,
			entryLength,
			occupied,
			difference,
			normalSave = false,
			messageNum = 0,
			savedWarning,
			warningClass,
			warningText,
			kill = false;

			if (defaultLog.length) {
				for (messageNum = 0; messageNum < defaultLog.length; messageNum++) {
					messageID = defaultLog[messageNum].id;
					if (messageID === elemID) {
						newMessage = false;
						messageToEdit = messageNum;
						break;
					}
				}
			}

			if (!newMessage && saveState === defaultLog[messageToEdit].msg) {
				return false;
			}

			// Begin capacity check

			if (localStorage.length) {
				for (i = 0; i < localStorage.length; i++) {
					currentLength += localStorage.getItem(localStorage.key(i)).length;
				}
			}

			entryLength = JSON.stringify(newEntry).length;
			occupied = roundToNthDecimal((currentLength / CAPACITY) * 100, 1);

			if (newMessage) {
				if (((currentLength + entryLength) / CAPACITY) * 100 >= 95) {
					if (currentLength + entryLength > CAPACITY) {
						warningClass = 'over-capacity';
						warningText = ' Capacity reached. Delete old messages to continue saving.';
						kill = true;
					} else if (currentLength + entryLength === CAPACITY) {
						warningClass = 'full';
						warningText = ' Capacity reached. Delete old messages to continue saving.';
					} else {
						warningClass = 'full';
						warningText = ' ' + roundToNthDecimal(((currentLength + entryLength) / CAPACITY) * 100, 1) + '% full.';
					}
				} else {
					normalSave = true;
				}
			} else {
				difference = entryLength - JSON.stringify(defaultLog[messageToEdit]).length;

				if (((currentLength + difference) / CAPACITY) * 100 >= 95) {
					if (currentLength + difference > CAPACITY) {
						warningClass = 'over-capacity';
						warningText = ' Capacity reached. Delete old messages to continue saving.';
						kill = true;
					} else if (currentLength + difference === CAPACITY) {
						warningClass = 'full';
						warningText = ' Capacity reached. Delete old messages to continue saving.';
					} else {
						warningClass = 'full';
						warningText = ' ' + roundToNthDecimal(((currentLength + difference) / CAPACITY) * 100, 1) + '% full.';
					}
				} else {
					normalSave = true;
				}
			}

			// End capacity check

			empty(lastSavedElem);

			if (normalSave) {
				lastSavedElem.appendChild(document.createTextNode('Last saved: ' + timeStamp));
			} else {
				savedWarning = createElement('span', function(warning) {
					warning.className = 'saved-warning ' + warningClass;
					warning.appendChild(createElement('strong', function(type) {
						type.appendChild(document.createTextNode('Warning:'));
					}));

					warning.appendChild(document.createTextNode(warningText));
				});
				
				if (kill) {
					lastSavedElem.appendChild(savedWarning);
					return false;
				}

				lastSavedElem.appendChild(document.createTextNode('Last saved: ' + timeStamp + ' | '));
				lastSavedElem.appendChild(savedWarning);
			}

			if (newMessage) {
				defaultLog.push(newEntry);
			} else {
				defaultLog[messageToEdit].msg = saveState;
			}

			localStorage.setItem('defaultFolder', JSON.stringify(defaultLog));
		}

		var saveAtInterval = setInterval(function() {
			if (document.getElementById('cke_bottom_' + editorType + editorID) == null) {
				clearTimeout(saveAtInterval);
				return false;
			}
			fireInterval(editorID, editorContainer);
		}, 15000);

		editorContainer.setAttribute('auto-saving', '');

		editorSubmitParent = editor;

		while (editorSubmitParent.getElementsByClassName('input_submit')[0] == null && editorSubmitParent.parentNode) {
			editorSubmitParent = editorSubmitParent.parentNode;
		}

		var submitSavedPostHandler = function(event) {
			if (!event.target.className || event.target.className !== 'input-submit') {
				return false;
			}

			var defaultLog = JSON.parse(localStorage.getItem('defaultFolder')),
			messageID,
			messageNum  = 0;

			for (messageNum = 0; messageNum < defaultLog.length; messageNum++) {
				messageID = defaultLog[messageNum].id;
				if (messageID === editorID) {
					defaultLog.splice(messageNum, 1);
					localStorage.setItem('defaultFolder', JSON.stringify(defaultLog));
					break;
				}
			}
		};

		Events.selector(editorSubmitParent).add('click', 'submitSavedPost', submitSavedPostHandler, false);
	};

	Events.selector(document).add('mouseover', 'saveStart', autoSavePostHandler, false);
}