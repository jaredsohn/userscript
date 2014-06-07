// ==UserScript==
// @name	IP.Board - Plaintext BBCode
// @namespace	Makaze
// @include	*
// @grant	none
// @version	5.0.2
// ==/UserScript==

var MakazeScriptStyles,
styleElem;

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

function getPosition(element) {
	var xPosition = 0,
	yPosition = 0;

	while (element) {
		xPosition += (element.offsetLeft
			+ element.clientLeft);
		yPosition += (element.offsetTop
			+ element.clientTop);
		element = element.offsetParent;
	}
	return {x: xPosition, y: yPosition};
}

function runInGlobal(code) {
	var scripts = document.createElement('script');
	scripts.type = 'text/javascript';
	scripts.id = 'runInGlobal';
	scripts.appendChild(document.createTextNode(
		'(function() { ' + code + '})();' +
		'\n\n' +
		'document.getElementById(\'runInGlobal\').remove();'
	));

	(document.head || document.body || document.documentElement).appendChild(scripts);
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

// Event handler constructor

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

// End Event handler constructor

function isChildOf(selector, element) {
	switch (selector.charAt(0)) {
		case '.':
			if (document.getElementsByClassName(selector.slice(1))[0] == null) {
				return false;
			}

			while (element.getElementsByClassName(selector.slice(1))[0] == null && element.parentNode) {
				if (Classes.hasClass(element, selector.slice(1))) {
					return true;
				}
				element = element.parentNode;
			}
		break;
		case '#':
			if (document.getElementById(selector.slice(1)) == null) {
				return false;
			}

			while (element.parentNode) {
				if (element.id === selector.slice(1)) {
					return true;
				}
				element = element.parentNode;
			}
		break;
		default:
			if (document.getElementsByTagName(selector)[0] == null) {
				return false;
			}

			while (element.getElementsByTagName(selector) == null && element.parentNode) {
				if (element.tagName === selector.toUpperCase()) {
					return true;
				}
				element = element.parentNode;
			}
	}
	return false;
}

function getParent(selector, element) {
	switch (selector.charAt(0)) {
		case '.':
			if (document.getElementsByClassName(selector.slice(1))[0] == null) {
				return false;
			}

			while (element.getElementsByClassName(selector.slice(1))[0] == null && element.parentNode) {
				if (Classes.hasClass(element, selector.slice(1))) {
					return element;
				}
				element = element.parentNode;
			}
		break;
		case '#':
			if (document.getElementById(selector.slice(1)) == null) {
				return false;
			}

			while (element.parentNode) {
				if (element.id === selector.slice(1)) {
					return element;
				}
				element = element.parentNode;
			}
		break;
		default:
			if (document.getElementsByTagName(selector)[0] == null) {
				return false;
			}

			while (element.getElementsByTagName(selector) == null && element.parentNode) {
				if (element.tagName === selector.toUpperCase()) {
					return element;
				}
				element = element.parentNode;
			}
	}
}

function getSubmit(request) {
	var i,
	select;
	for (i = 0; i < request.getElementsByClassName('cke_dialog_ui_button').length; i++) {
		select = request.getElementsByClassName('cke_dialog_ui_button')[i];
		if (select.title === 'OK') {
			return select;
		}
	}
}

function getCancel(request) {
	var i,
	select;
	for (i = 0; i < request.getElementsByClassName('cke_dialog_ui_button').length; i++) {
		select = request.getElementsByClassName('cke_dialog_ui_button')[i];
		if (select.title === 'Cancel') {
			return select;
		}
	}
}

function getClose(request) {
	return request.getElementsByClassName('cke_dialog_close_button')[0];
}

function getSelection(elem) {
	var start = elem.selectionStart,
	end = elem.selectionEnd,
	selectedText = elem.value.substring(start, end);

	return selectedText;
}

function selectRange(elem, start, end) {
	var range;

	if (elem.setSelectionRange) {
		elem.focus();
		elem.setSelectionRange(start, end);
	} else if (elem.createTextRange) {
		range = elem.createTextRange();
		range.collapse(true);
		range.moveEnd('character', end);
		range.moveStart('character', start);
		range.select();
	}
}

function wrapText(elementSelector, openTag, closeTag, contentField) {
	var textArea = elementSelector,
	len = textArea.value.length,
	start = textArea.selectionStart,
	end = textArea.selectionEnd,
	selectedText = textArea.value.substring(start, end),
	replacement,
	paste = document.createEvent('TextEvent');
	if (contentField != null) {
		replacement = openTag + contentField.value + closeTag;
	} else {
		replacement = openTag + selectedText + closeTag;
	}
	if (paste.initTextEvent) {
		paste.initTextEvent('textInput', true, true, null, replacement);
		textArea.dispatchEvent(paste);
	} else {
		textArea.value = textArea.value.substring(0, start) + replacement + textArea.value.substring(end, len);
	}
	selectRange(textArea, start + openTag.length, start + replacement.length - closeTag.length);
}

function removeListeners(element, callback, deleteElement) {
	var elementClone = element.cloneNode(true),
	elementParent = element.parentNode,
	fullValue = element.value,
	start = element.selectionStart,
	end = element.selectionEnd,
	newElement,
	thisChild,
	i = 0;

	callback(element, elementClone);

	elementClone.setAttribute('data-listenersRemoved', '');
	elementParent.insertBefore(elementClone, element);
	element.style.display = 'none';
	if (deleteElement) {
		elementParent.replaceChild(elementClone, element);
	}
	for (i = 0; i < elementParent.childNodes.length; i++) {
		thisChild = elementParent.childNodes[i];
		if (thisChild.hasAttribute('data-listenersRemoved')) {
			newElement = thisChild;
			thisChild.removeAttribute('data-listenersRemoved');
			break;
		}
	}
	newElement.focus();
	newElement.value = fullValue;
	selectRange(newElement, start, end);
}

Events.selector(document).add('keydown', 'plaintext_shortcuts', function(event) {
	var element = event.target;

	if (!element.className || !Classes.hasClass(element, 'cke_source')) {
		return false;
	}

	if (!element.hasAttribute('data-shortcutsenabled')) {
		removeListeners(element, function(element, removed) {
			var postFormParent = element.parentNode,
			inputs,
			thisInput,
			i = 0;

			removed.setAttribute('data-shortcutsenabled', '');

			Events.selector(removed).add('input propertychange', 'edit', function() {
				element.value = removed.value;
			}, false);

			while (postFormParent.getElementsByClassName('input_submit')[0] == null && postFormParent.parentNode) {
				postFormParent = postFormParent.parentNode;
			}

			inputs = postFormParent.getElementsByClassName('input_submit');

			// On submits

			var deleteCloneListener = function() {
				var texts = postFormParent.getElementsByTagName('textarea'),
				thisOne,
				i = 0;

				for (i = 0; i < texts.length; i++) {
					thisOne = texts[i];
					if (thisOne.hasAttribute('data-shortcutsenabled')) {
						thisOne.remove();
						break;
					}
				}

				element.style.display = '';

				Events.selector(this).remove('click', 'deleteClone', deleteCloneListener, false);
			};

			for (i = 0; i < inputs.length; i++) {
				thisInput = inputs[i];
				Events.selector(thisInput).add('click', 'deleteClone', deleteCloneListener, false);
			}
		}, false);
	}

	if (event.ctrlKey || event.metaKey) {
		switch (event.keyCode) {
			case 66:
				event.preventDefault();
				wrapText(element, '[b]', '[/b]');
			break;
			case 73:
				event.preventDefault();
				wrapText(element, '[i]', '[/i]');
			break;
			case 85:
				event.preventDefault();
				wrapText(element, '[u]', '[/u]');
			break;
		}
	}
}, false);

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

styleElem.childNodes[0].nodeValue +=
	'#request-background {\n' +
		'position: fixed;\n' +
		'z-index: 9999998;\n' +
		'top: 0px;\n' +
		'left: 0px;\n' +
		'opacity: 0.5;\n' +
		'width: 100%;\n' +
		'height: 100%;\n' +
		'display: none;\n' +
	'}\n\n' +

	'.plaintextBBCodeRequest {\n' +
		'z-index: 9999999;\n' +
	'}\n\n' +

	'.sp_BBCode_desc {\n' +
		'color: #666 ! important;\n' +
		'white-space: normal ! important;\n' +
		'word-wrap: break-word;\n' +
	'}\n\n' +

	'.plaintextBBCode-dropdown {\n' +
		'position: absolute;\n' +
		'z-index: 9999;\n' +
		'overflow-y: auto;\n' +
		'background-color: #fff;\n' +
		'border-top-left-radius: 0px;\n' +
		'border-top-right-radius: 3px;\n' +
		'border-bottom-right-radius: 3px;\n' +
		'border-bottom-left-radius: 3px;\n' +
		'border: 1px solid #aaa;\n' +
		'color: #222;\n' +
		'font-family: \'Helvetica Neue\', Arial, Verdana, sans-serif;\n' +
		'display: none;\n' +
	'}\n\n' +

	'#font-dropdown {\n' +
		'width: 300px;\n' +
		'height: 170px;\n' +
	'}\n\n' +

	'#size-dropdown {\n' +
		'width: 120px;\n' +
		'height: 170px;\n' +
	'}\n\n' +

	'#color-dropdown {\n' +
		'width: 154px;\n' +
		'height: 134px;\n' +
	'}\n\n' +

	'.dropdown-link {\n' +
		'padding: 2px;\n' +
		'display: block;\n' +
		'border: 1px solid #fff;\n' +
		'color: inherit !important;\n' +
		'text-decoration: none;\n' +
		'overflow: hidden;\n' +
		'text-overflow: ellipsis;\n' +
	'}';

function getBackgroundColor(elem) {
	var bg;

	function hex(x) {
		return ("0" + parseInt(x).toString(16)).slice(-2);
	}

	if (elem.currentStyle) {
		bg = elem.currentStyle.backgroundColor;
	} else if (window.getComputedStyle) {
		bg = document.defaultView.getComputedStyle(elem, null).getPropertyValue("background-color");
		if (bg.search("rgb") == -1) {
			return bg;
		} else {
			bg = bg.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
			return "#" + hex(bg[1]) + hex(bg[2]) + hex(bg[3]);
		}
	}
}

function createDialogCSS() {
	var dialogcss = false,
	dialogStyle,
	links = document.getElementsByTagName('link'),
	i = 0;

	for (i = 0; i < links.length; i++) {
		if (links[i].href.match(/dialog\.css/)) {
			dialogcss = true;
			break;
		}
	}

	if (!dialogcss) {
		dialogStyle = createElement('link', function(css) {
			css.setAttribute('rel', 'stylesheet');
			css.setAttribute('media', 'screen,print');
			css.type = 'text/css';
			css.href = 'public/js/3rd_party/ckeditor/skins/ips/dialog.css';
		});
		
		document.head.appendChild(dialogStyle);
	}
}

function createRequestBackground() {
	if (document.getElementById('request-background') == null) {
		var requestbackground = createElement('div', function(bg) {
			bg.id = 'request-background';
			bg.className = 'cke_dialog_background_cover';
		});
		document.body.appendChild(requestbackground);
	}
}

function createRequest() {
	createDialogCSS();

	var requestDialog = createElement('div', function(request) {
		request.className = 'cke_skin_ips plaintextBBCodeRequest';
		request.id = 'plaintext-request';
		request.style.display = 'none';
		request.style.position = 'fixed';
		request.style.top = '0px'; 
		request.style.left = '0px'; 
		request.style.width = '400px';
		request.style.backgroundColor = '#fff';

		request.appendChild(createElement('div', function(body) {
			body.className = 'cke_dialog_body';

			body.appendChild(createElement('div', function(handle) {
				handle.className = 'request-type cke_dialog_title';
				handle.appendChild(document.createTextNode('Link'));
			}));

			body.appendChild(createElement('a', function(close) {
				close.className = 'cke_dialog_close_button';
				close.href = 'javascript:void(0)';
				close.title = 'Close';

				close.appendChild(createElement('span', function(label) {
					label.className = 'cke_label';
					label.appendChild(document.createTextNode('X'));
				}));
			}));

			body.appendChild(createElement('div', function(contents) {
				contents.className = 'cke_dialog_contents';

				contents.appendChild(createElement('div', function(spec) {
					spec.className = 'spec';
					spec.style.marginTop = '5px';
					spec.appendChild(document.createTextNode('URL'));
				}));

				contents.appendChild(createElement('div', function(fields) {
					fields.className = 'fields';
					fields.style.lineHeight = '14px';
					fields.style.verticalAlign = 'middle';

					fields.appendChild(createElement('div', function(cont) {
						cont.className = 'cke_dialog_ui_input_text';
						cont.appendChild(createElement('input', function(input) {
							input.className = 'cke_dialog_ui_input_text';
							input.type = 'text';
						}));
					}));
				}));

				contents.appendChild(createElement('div', function(footer) {
					footer.className = 'cke_dialog_footer cke_dialog_footer_buttons';
					footer.style.float = 'right';
					footer.style.marginRight = '0px';
					footer.style.marginTop = '10px';

					footer.appendChild(createElement('a', function(okay) {
						okay.className = 'cke_dialog_ui_button';
						okay.setAttribute('hidefocus', 'true');
						okay.title = 'OK';
						okay.href = 'javascript:void(0)';

						okay.appendChild(createElement('span', function(span) {
							span.className = 'cke_dialog_ui_button';
							span.style.marginBottom = '5px';
							span.appendChild(document.createTextNode('OK'));
						}));
					}));

					footer.appendChild(createElement('a', function(cancel) {
						cancel.className = 'cke_dialog_ui_button';
						cancel.setAttribute('hidefocus', 'true');
						cancel.title = 'Cancel';
						cancel.href = 'javascript:void(0)';
						cancel.style.marginLeft = '10px';

						cancel.appendChild(createElement('span', function(span) {
							span.className = 'cke_dialog_ui_button';
							span.style.marginBottom = '5px';
							span.appendChild(document.createTextNode('Cancel'));
						}));
					}));
				}));
			}));
		}));
	});

	document.body.appendChild(requestDialog);

	runInGlobal('requestDrag = new Draggable(\'plaintext-request\', { handle: \'request-type\', starteffect: null, endeffect: null });');

	createRequestBackground();

	var requestClickHandler = function() {
			fade(document.getElementById('plaintext-request'), 'out');
			fade(document.getElementById('request-background'), 'out');
	};

	Events.selector(document.getElementById('plaintext-request').getElementsByClassName('cke_dialog_close_button')[0]).add('click', 'plaintextRequest_fade', requestClickHandler, false);
	Events.selector(document.getElementById('plaintext-request').getElementsByClassName('cke_dialog_footer')[0].getElementsByTagName('a')[0]).add('click', 'plaintextRequest_fade', requestClickHandler, false);
	Events.selector(document.getElementById('plaintext-request').getElementsByClassName('cke_dialog_footer')[0].getElementsByTagName('a')[1]).add('click', 'plaintextRequest_fade', requestClickHandler, false);
}

function createFontDropdown() {
	function createFont(name, family) {
		return createElement('li', function(font) {
			font.className = 'cke_panel_listItem';

			font.appendChild(createElement('a', function(link) {
				link.className = 'dropdown-link';
				link.href = 'javascript:void(\'' + name + '\')';
				link.title = name;
				link.appendChild(createElement('span', function(span) {
					span.style.fontSize = '14px';
					span.style.fontFamily = family;
					span.appendChild(document.createTextNode(name));
				}));
			}));
		});
	}

	var fontDropdown = createElement('div', function(dropdown) {
		dropdown.id = 'font-dropdown';
		dropdown.className = 'cke_panel cke_ltr cke_rcombopanel font-dropdown plaintextBBCode-dropdown';

		dropdown.appendChild(createElement('div', function(block) {
			block.className = 'cke_panel_block';

			block.appendChild(createElement('h1', function(title) {
				title.className = 'cke_panel_grouptitle';
				title.appendChild(document.createTextNode('Font Name'));
			}));

			block.appendChild(createElement('ul', function(list) {
				list.className = 'cke_panel_list';

				list.appendChild(createFont('Arial', 'arial,helvetica,sans-serif'));
				list.appendChild(createFont('Comic Sans MS', 'comic sans ms,cursive'));
				list.appendChild(createFont('Courier New', 'courier new,courier,monospace'));
				list.appendChild(createFont('Georgia', 'georgia,serif'));
				list.appendChild(createFont('Lucida Sans Unicode', 'lucida sans unicode,lucida grande,sans-serif'));
				list.appendChild(createFont('Tahoma', 'tahoma,geneva,sans-serif'));
				list.appendChild(createFont('Times New Roman', 'times new roman,times,serif'));
				list.appendChild(createFont('Trebuchet MS', 'trebuchet ms,helvetica,sans-serif'));
				list.appendChild(createFont('Verdana', 'verdana,geneva,sans-serif'));
			}));
		}));
	});

	document.body.appendChild(fontDropdown);
}

function createSizeDropdown() {
	function createSize(size, id) {
		return createElement('li', function(font) {
			font.className = 'cke_panel_listItem';

			font.appendChild(createElement('a', function(link) {
				link.className = 'dropdown-link';
				link.href = 'javascript:void(\'' + size.toString() + '\')';
				link.title = size.toString();
				link.id = 'Size_' + id;
				link.appendChild(createElement('span', function(span) {
					span.style.fontSize = size + 'px';
					span.appendChild(document.createTextNode(size.toString()));
				}));
			}));
		});
	}

	var sizeDropdown = createElement('div', function(dropdown) {
		dropdown.id = 'size-dropdown';
		dropdown.className = 'cke_panel cke_ltr cke_rcombopanel size-dropdown plaintextBBCode-dropdown';

		dropdown.appendChild(createElement('div', function(block) {
			block.className = 'cke_panel_block';

			block.appendChild(createElement('h1', function(title) {
				title.className = 'cke_panel_grouptitle';
				title.appendChild(document.createTextNode('Font Size'));
			}));

			block.appendChild(createElement('ul', function(list) {
				list.className = 'cke_panel_list';

				list.appendChild(createSize(8, 1));
				list.appendChild(createSize(10, 2));
				list.appendChild(createSize(12, 3));
				list.appendChild(createSize(14, 4));
				list.appendChild(createSize(18, 5));
				list.appendChild(createSize(24, 6));
				list.appendChild(createSize(36, 7));
				list.appendChild(createSize(48, 8));
			}));
		}));
	});

	document.body.appendChild(sizeDropdown);
}

function createColorDropdown() {
	function createColor(name, color) {
		return createElement('td', function(cell) {
			cell.style.padding = '0px';
			cell.appendChild(createElement('a', function(link) {
				link.className = 'cke_colorbox';
				link.title = name;
				link.href = 'javascript:void(\'' + name + '\')';
				link.appendChild(createElement('span', function(value) {
					value.className = 'cke_colorbox';
					value.style.backgroundColor = color;
				}));
			}));
		});
	}

	var colors = [ { 'title': 'Black', 'color': '#000000' }, { 'title': 'Maroon', 'color': '#800000' }, { 'title': 'Saddle Brown', 'color': '#8b4513' }, { 'title': 'Dark Slate Gray', 'color': '#2f4f4f' }, { 'title': 'Teal', 'color': '#008080' }, { 'title': 'Navy', 'color': '#000080' }, { 'title': 'Indigo', 'color': '#4b0082' }, { 'title': 'Dark Gray', 'color': '#696969' }, { 'title': 'Fire Brick', 'color': '#b22222' }, { 'title': 'Brown', 'color': '#a52a2a' }, { 'title': 'Golden Rod', 'color': '#daa520' }, { 'title': 'Dark Green', 'color': '#006400' }, { 'title': 'Turquoise', 'color': '#40e0d0' }, { 'title': 'Medium Blue', 'color': '#0000cd' }, { 'title': 'Purple', 'color': '#800080' }, { 'title': 'Gray', 'color': '#808080' }, { 'title': 'Red', 'color': '#ff0000' }, { 'title': 'Dark Orange', 'color': '#ff8c00' }, { 'title': 'Gold', 'color': '#ffd700' }, { 'title': 'Green', 'color': '#008000' }, { 'title': 'Cyan', 'color': '#00ffff' }, { 'title': 'Blue', 'color': '#0000ff' }, { 'title': 'Violet', 'color': '#ee82ee' }, { 'title': 'Dim Gray', 'color': '#a9a9a9' }, { 'title': 'Light Salmon', 'color': '#ffa07a' }, { 'title': 'Orange', 'color': '#ffa500' }, { 'title': 'Yellow', 'color': '#ffff00' }, { 'title': 'Lime', 'color': '#00ff00' }, { 'title': 'Pale Turquoise', 'color': '#afeeee' }, { 'title': 'Light Blue', 'color': '#add8e6' }, { 'title': 'Plum', 'color': '#dda0dd' }, { 'title': 'Light Gray', 'color': '#d3d3d3' }, { 'title': 'Lavender Blush', 'color': '#fff0f5' }, { 'title': 'Antique White', 'color': '#faebd7' }, { 'title': 'Light Yellow', 'color': '#ffffe0' }, { 'title': 'Honeydew', 'color': '#f0fff0' }, { 'title': 'Azure', 'color': '#f0ffff' }, { 'title': 'Alice Blue', 'color': '#f0f8ff' }, { 'title': 'Lavender', 'color': '#e6e6fa' }, { 'title': 'White', 'color': '#ffffff' } ],
	buffer = [0, 8],
	i = 0;

	var colorDropdown = createElement('div', function(dropdown) {
		dropdown.id = 'color-dropdown';
		dropdown.className = 'cke_panel cke_ltr color-dropdown plaintextBBCode-dropdown';

		dropdown.appendChild(createElement('div', function(block) {
			block.className = 'cke_panel_block cke_colorblock cke_frameLoaded';

			block.appendChild(createElement('a', function(auto) {
				auto.className = 'cke_colorauto';
				auto.title = 'Automatic';
				auto.href = 'javascript:void(\'Automatic\')';

				auto.appendChild(createElement('table', function(table) {
					table.setAttribute('cellspacing', 0);
					table.setAttribute('cellpadding', 0);
					table.width = '100%';

					table.appendChild(createElement('tbody', function(tbody) {
						tbody.appendChild(createElement('tr', function(row) {
							row.appendChild(createElement('td', function(color) {
								color.style.padding = '0px';

								color.appendChild(createElement('span', function(span) {
									span.className = 'cke_colorbox';
									span.style.backgroundColor = '#222222';
								}));
							}));

							row.appendChild(createElement('td', function(name) {
								name.style.padding = '0px';
								name.setAttribute('colspan', 7);
								name.align = 'center';
								name.appendChild(document.createTextNode('Automatic'));
							}));
						}));
					}));
				}));
			}));

			block.appendChild(createElement('table', function(colorstable) {
				colorstable.setAttribute('cellspacing', 0);
				colorstable.setAttribute('cellpadding', 0);
				colorstable.width = '100%';

				colorstable.appendChild(createElement('tbody', function(body) {
					body.appendChild(createElement('tr', function(row) {
						for (i = buffer[0]; i < buffer[1]; i++) {
							row.appendChild(createColor(colors[i].title, colors[i].color));
						}
					}));

					buffer[0] += 8;
					buffer[1] += 8;

					body.appendChild(createElement('tr', function(row) {
						for (i = buffer[0]; i < buffer[1]; i++) {
							row.appendChild(createColor(colors[i].title, colors[i].color));
						}
					}));

					buffer[0] += 8;
					buffer[1] += 8;

					body.appendChild(createElement('tr', function(row) {
						for (i = buffer[0]; i < buffer[1]; i++) {
							row.appendChild(createColor(colors[i].title, colors[i].color));
						}
					}));

					buffer[0] += 8;
					buffer[1] += 8;

					body.appendChild(createElement('tr', function(row) {
						for (i = buffer[0]; i < buffer[1]; i++) {
							row.appendChild(createColor(colors[i].title, colors[i].color));
						}
					}));

					buffer[0] += 8;
					buffer[1] += 8;

					body.appendChild(createElement('tr', function(row) {
						for (i = buffer[0]; i < buffer[1]; i++) {
							row.appendChild(createColor(colors[i].title, colors[i].color));
						}
					}));

					body.appendChild(createElement('tr', function(row) {
						row.appendChild(createElement('td', function(colormore) {
							colormore.style.padding = '0px';
							colormore.setAttribute('colspan', 8);
							colormore.align = 'center';

							colormore.appendChild(createElement('a', function(link) {
								link.className = 'cke_colormore';
								link.title = 'More Colors...';
								link.href = 'javascript:void(\'More Colors...\')';
								link.appendChild(document.createTextNode('More Colors...'));
							}));
						}));
					}));
				}));
			}));
		}));
	});

	document.body.appendChild(colorDropdown);
}

function createColorMoreRequest() {
	function createColorMore(color) {
		return createElement('td', function(colorMore) {
			colorMore.className = 'ColorCell';
			colorMore.style.backgroundColor = color;
			colorMore.style.border = '1px solid ' + color;
			colorMore.style.width = '14px';
			colorMore.style.height = '14px';
			colorMore.appendChild(createElement('span', function(value) {
				value.className = 'cke_voice_label';
				value.appendChild(document.createTextNode(color));
			}));
		});
	}

	createDialogCSS();
	
	var colors = [ { 'color': '#000000' }, { 'color': '#003300' }, { 'color': '#006600' }, { 'color': '#009900' }, { 'color': '#00cc00' }, { 'color': '#00ff00' }, { 'color': '#330000' }, { 'color': '#333300' }, { 'color': '#336600' }, { 'color': '#339900' }, { 'color': '#33cc00' }, { 'color': '#33ff00' }, { 'color': '#660000' }, { 'color': '#663300' }, { 'color': '#666600' }, { 'color': '#669900' }, { 'color': '#66cc00' }, { 'color': '#66ff00' }, { 'color': '#000033' }, { 'color': '#003333' }, { 'color': '#006633' }, { 'color': '#009933' }, { 'color': '#00cc33' }, { 'color': '#00ff33' }, { 'color': '#330033' }, { 'color': '#333333' }, { 'color': '#336633' }, { 'color': '#339933' }, { 'color': '#33cc33' }, { 'color': '#33ff33' }, { 'color': '#660033' }, { 'color': '#663333' }, { 'color': '#666633' }, { 'color': '#669933' }, { 'color': '#66cc33' }, { 'color': '#66ff33' }, { 'color': '#000066' }, { 'color': '#003366' }, { 'color': '#006666' }, { 'color': '#009966' }, { 'color': '#00cc66' }, { 'color': '#00ff66' }, { 'color': '#330066' }, { 'color': '#333366' }, { 'color': '#336666' }, { 'color': '#339966' }, { 'color': '#33cc66' }, { 'color': '#33ff66' }, { 'color': '#660066' }, { 'color': '#663366' }, { 'color': '#666666' }, { 'color': '#669966' }, { 'color': '#66cc66' }, { 'color': '#66ff66' }, { 'color': '#000099' }, { 'color': '#003399' }, { 'color': '#006699' }, { 'color': '#009999' }, { 'color': '#00cc99' }, { 'color': '#00ff99' }, { 'color': '#330099' }, { 'color': '#333399' }, { 'color': '#336699' }, { 'color': '#339999' }, { 'color': '#33cc99' }, { 'color': '#33ff99' }, { 'color': '#660099' }, { 'color': '#663399' }, { 'color': '#666699' }, { 'color': '#669999' }, { 'color': '#66cc99' }, { 'color': '#66ff99' }, { 'color': '#0000cc' }, { 'color': '#0033cc' }, { 'color': '#0066cc' }, { 'color': '#0099cc' }, { 'color': '#00cccc' }, { 'color': '#00ffcc' }, { 'color': '#3300cc' }, { 'color': '#3333cc' }, { 'color': '#3366cc' }, { 'color': '#3399cc' }, { 'color': '#33cccc' }, { 'color': '#33ffcc' }, { 'color': '#6600cc' }, { 'color': '#6633cc' }, { 'color': '#6666cc' }, { 'color': '#6699cc' }, { 'color': '#66cccc' }, { 'color': '#66ffcc' }, { 'color': '#0000ff' }, { 'color': '#0033ff' }, { 'color': '#0066ff' }, { 'color': '#0099ff' }, { 'color': '#00ccff' }, { 'color': '#00ffff' }, { 'color': '#3300ff' }, { 'color': '#3333ff' }, { 'color': '#3366ff' }, { 'color': '#3399ff' }, { 'color': '#33ccff' }, { 'color': '#33ffff' }, { 'color': '#6600ff' }, { 'color': '#6633ff' }, { 'color': '#6666ff' }, { 'color': '#6699ff' }, { 'color': '#66ccff' }, { 'color': '#66ffff' }, { 'color': '#990000' }, { 'color': '#993300' }, { 'color': '#996600' }, { 'color': '#999900' }, { 'color': '#99cc00' }, { 'color': '#99ff00' }, { 'color': '#cc0000' }, { 'color': '#cc3300' }, { 'color': '#cc6600' }, { 'color': '#cc9900' }, { 'color': '#cccc00' }, { 'color': '#ccff00' }, { 'color': '#ff0000' }, { 'color': '#ff3300' }, { 'color': '#ff6600' }, { 'color': '#ff9900' }, { 'color': '#ffcc00' }, { 'color': '#ffff00' }, { 'color': '#990033' }, { 'color': '#993333' }, { 'color': '#996633' }, { 'color': '#999933' }, { 'color': '#99cc33' }, { 'color': '#99ff33' }, { 'color': '#cc0033' }, { 'color': '#cc3333' }, { 'color': '#cc6633' }, { 'color': '#cc9933' }, { 'color': '#cccc33' }, { 'color': '#ccff33' }, { 'color': '#ff0033' }, { 'color': '#ff3333' }, { 'color': '#ff6633' }, { 'color': '#ff9933' }, { 'color': '#ffcc33' }, { 'color': '#ffff33' }, { 'color': '#990066' }, { 'color': '#993366' }, { 'color': '#996666' }, { 'color': '#999966' }, { 'color': '#99cc66' }, { 'color': '#99ff66' }, { 'color': '#cc0066' }, { 'color': '#cc3366' }, { 'color': '#cc6666' }, { 'color': '#cc9966' }, { 'color': '#cccc66' }, { 'color': '#ccff66' }, { 'color': '#ff0066' }, { 'color': '#ff3366' }, { 'color': '#ff6666' }, { 'color': '#ff9966' }, { 'color': '#ffcc66' }, { 'color': '#ffff66' }, { 'color': '#990099' }, { 'color': '#993399' }, { 'color': '#996699' }, { 'color': '#999999' }, { 'color': '#99cc99' }, { 'color': '#99ff99' }, { 'color': '#cc0099' }, { 'color': '#cc3399' }, { 'color': '#cc6699' }, { 'color': '#cc9999' }, { 'color': '#cccc99' }, { 'color': '#ccff99' }, { 'color': '#ff0099' }, { 'color': '#ff3399' }, { 'color': '#ff6699' }, { 'color': '#ff9999' }, { 'color': '#ffcc99' }, { 'color': '#ffff99' }, { 'color': '#9900cc' }, { 'color': '#9933cc' }, { 'color': '#9966cc' }, { 'color': '#9999cc' }, { 'color': '#99cccc' }, { 'color': '#99ffcc' }, { 'color': '#cc00cc' }, { 'color': '#cc33cc' }, { 'color': '#cc66cc' }, { 'color': '#cc99cc' }, { 'color': '#cccccc' }, { 'color': '#ccffcc' }, { 'color': '#ff00cc' }, { 'color': '#ff33cc' }, { 'color': '#ff66cc' }, { 'color': '#ff99cc' }, { 'color': '#ffcccc' }, { 'color': '#ffffcc' }, { 'color': '#9900ff' }, { 'color': '#9933ff' }, { 'color': '#9966ff' }, { 'color': '#9999ff' }, { 'color': '#99ccff' }, { 'color': '#99ffff' }, { 'color': '#cc00ff' }, { 'color': '#cc33ff' }, { 'color': '#cc66ff' }, { 'color': '#cc99ff' }, { 'color': '#ccccff' }, { 'color': '#ccffff' }, { 'color': '#ff00ff' }, { 'color': '#ff33ff' }, { 'color': '#ff66ff' }, { 'color': '#ff99ff' }, { 'color': '#ffccff' }, { 'color': '#ffffff' }, { 'color': '#000000' }, { 'color': '#333333' }, { 'color': '#666666' }, { 'color': '#999999' }, { 'color': '#cccccc' }, { 'color': '#ffffff' }, { 'color': '#000000' }, { 'color': '#000000' }, { 'color': '#000000' }, { 'color': '#000000' }, { 'color': '#000000' }, { 'color': '#000000' }, { 'color': '#000000' }, { 'color': '#000000' }, { 'color': '#000000' }, { 'color': '#000000' }, { 'color': '#000000' }, { 'color': '#000000' } ],
	buffer = [0, 18],
	i = 0;

	var colorMoreRequest = createElement('div', function(request) {
		request.className = 'cke_skin_ips plaintextBBCodeRequest';
		request.id = 'colorMore-request';
		request.style.display = 'none';
		request.style.position = 'fixed';
		request.style.top = '0px'; 
		request.style.left = '0px'; 
		request.style.width = '400px';
		request.style.backgroundColor = '#fff';

		request.appendChild(createElement('div', function(body) {
			body.className = 'cke_dialog_body';

			body.appendChild(createElement('div', function(handle) {
				handle.className = 'request-type cke_dialog_title';
				handle.appendChild(document.createTextNode('Select color'));
			}));

			body.appendChild(createElement('a', function(close) {
				close.className = 'cke_dialog_close_button';
				close.href = 'javascript:void(0)';
				close.title = 'Close';
				close.appendChild(createElement('span', function(span) {
					span.className = 'cke_label';
					span.appendChild(document.createTextNode('X'));
				}));
			}));

			body.appendChild(createElement('div', function(content_table) {
				content_table.className = 'cke_dialog_contents';
				content_table.appendChild(createElement('tbody', function(content_tbody) {
					content_tbody.appendChild(createElement('tr', function(content_row) {
						content_row.appendChild(createElement('td', function(content_cell) {
							content_cell.className = 'cke_dialog_contents';
							content_cell.style.width = '360px';
							content_cell.style.height = '220px';
							content_cell.appendChild(createElement('div', function(content_page) {
								content_page.className = 'cke_dialog_ui_vbox cke_dialog_page_contents';
								content_page.style.width = '100%';
								content_page.style.height = '100%';
								content_page.appendChild(createElement('table', function(content_page_table) {
									content_page_table.align = 'left';
									content_page_table.border = '0';
									content_page_table.setAttribute('cellspacing', '0');
									content_page_table.style.width = '100%';
									content_page_table.appendChild(createElement('tbody', function(content_page_tbody) {
										content_page_tbody.appendChild(createElement('tr', function(content_page_row) {
											content_page_row.appendChild(createElement('td', function(content_page_cell) {
												content_page_cell.className = 'cke_dialog_ui_vbox_child';
												content_page_cell.appendChild(createElement('table', function(content_page_cell_table) {
													content_page_cell_table.className = 'cke_dialog_ui_hbox';
													content_page_cell_table.appendChild(createElement('tbody', function(content_page_cell_tbody) {
														content_page_cell_tbody.appendChild(createElement('tr', function(content_page_cell_row) {
															content_page_cell_row.className = 'cke_dialog_ui_hbox';
															content_page_cell_row.appendChild(createElement('td', function(content_page_cell_cell) {
																content_page_cell_cell.className = 'cke_dialog_ui_hbox_first';
																content_page_cell_cell.style.width = '70%';
																content_page_cell_cell.style.padding = '0';
																content_page_cell_cell.appendChild(createElement('div', function(content_page_cell_cell_box) {
																	content_page_cell_cell_box.className = 'cke_dialog_ui_html';
																	content_page_cell_cell_box.appendChild(createElement('table', function(content_page_cell_cell_table) {
																		content_page_cell_cell_table.setAttribute('cellspacing', '0');
																		content_page_cell_cell_table.setAttribute('style', 'border-collapse: separate;');

																		content_page_cell_cell_table.appendChild(createElement('caption', function(caption) {
																			caption.className = 'cke_voice_label';
																			caption.appendChild(document.createTextNode('Color Options'));
																		}));

																		content_page_cell_cell_table.appendChild(createElement('tbody', function(content_page_cell_cell_tbody) {
																			content_page_cell_cell_tbody.appendChild(createElement('tr', function(color_row) {
																				for (i = buffer[0]; i < buffer[1]; i++) {
																					color_row.appendChild(createColorMore(colors[i].color));
																				}
																			}));

																			buffer[0] += 18;
																			buffer[1] += 18;

																			content_page_cell_cell_tbody.appendChild(createElement('tr', function(color_row) {
																				for (i = buffer[0]; i < buffer[1]; i++) {
																					color_row.appendChild(createColorMore(colors[i].color));
																				}
																			}));

																			buffer[0] += 18;
																			buffer[1] += 18;

																			content_page_cell_cell_tbody.appendChild(createElement('tr', function(color_row) {
																				for (i = buffer[0]; i < buffer[1]; i++) {
																					color_row.appendChild(createColorMore(colors[i].color));
																				}
																			}));

																			buffer[0] += 18;
																			buffer[1] += 18;

																			content_page_cell_cell_tbody.appendChild(createElement('tr', function(color_row) {
																				for (i = buffer[0]; i < buffer[1]; i++) {
																					color_row.appendChild(createColorMore(colors[i].color));
																				}
																			}));

																			buffer[0] += 18;
																			buffer[1] += 18;

																			content_page_cell_cell_tbody.appendChild(createElement('tr', function(color_row) {
																				for (i = buffer[0]; i < buffer[1]; i++) {
																					color_row.appendChild(createColorMore(colors[i].color));
																				}
																			}));

																			buffer[0] += 18;
																			buffer[1] += 18;

																			content_page_cell_cell_tbody.appendChild(createElement('tr', function(color_row) {
																				for (i = buffer[0]; i < buffer[1]; i++) {
																					color_row.appendChild(createColorMore(colors[i].color));
																				}
																			}));

																			buffer[0] += 18;
																			buffer[1] += 18;

																			content_page_cell_cell_tbody.appendChild(createElement('tr', function(color_row) {
																				for (i = buffer[0]; i < buffer[1]; i++) {
																					color_row.appendChild(createColorMore(colors[i].color));
																				}
																			}));

																			buffer[0] += 18;
																			buffer[1] += 18;

																			content_page_cell_cell_tbody.appendChild(createElement('tr', function(color_row) {
																				for (i = buffer[0]; i < buffer[1]; i++) {
																					color_row.appendChild(createColorMore(colors[i].color));
																				}
																			}));

																			buffer[0] += 18;
																			buffer[1] += 18;

																			content_page_cell_cell_tbody.appendChild(createElement('tr', function(color_row) {
																				for (i = buffer[0]; i < buffer[1]; i++) {
																					color_row.appendChild(createColorMore(colors[i].color));
																				}
																			}));

																			buffer[0] += 18;
																			buffer[1] += 18;

																			content_page_cell_cell_tbody.appendChild(createElement('tr', function(color_row) {
																				for (i = buffer[0]; i < buffer[1]; i++) {
																					color_row.appendChild(createColorMore(colors[i].color));
																				}
																			}));

																			buffer[0] += 18;
																			buffer[1] += 18;

																			content_page_cell_cell_tbody.appendChild(createElement('tr', function(color_row) {
																				for (i = buffer[0]; i < buffer[1]; i++) {
																					color_row.appendChild(createColorMore(colors[i].color));
																				}
																			}));

																			buffer[0] += 18;
																			buffer[1] += 18;

																			content_page_cell_cell_tbody.appendChild(createElement('tr', function(color_row) {
																				for (i = buffer[0]; i < buffer[1]; i++) {
																					color_row.appendChild(createColorMore(colors[i].color));
																				}
																			}));

																			buffer[0] += 18;
																			buffer[1] += 18;

																			content_page_cell_cell_tbody.appendChild(createElement('tr', function(color_row) {
																				for (i = buffer[0]; i < buffer[1]; i++) {
																					color_row.appendChild(createColorMore(colors[i].color));
																				}
																			}));
																		}));
																	}));
																}));
															}));
															
															content_page_cell_row.appendChild(createElement('td', function(content_page_cell_cell) {
																content_page_cell_cell.className = 'cke_dialog_ui_hbox_child';
																content_page_cell_cell.style.width = '10%';
																content_page_cell_cell.style.padding = '0';
																content_page_cell_cell.appendChild(createElement('span', function(span) {
																	span.className = 'cke_dialog_ui_html';
																	span.appendChild(document.createTextNode('\u00a0'));
																}));
															}));

															content_page_cell_row.appendChild(createElement('td', function(content_page_cell_cell) {
																content_page_cell_cell.className = 'cke_dialog_ui_hbox_last';
																content_page_cell_cell.style.width = '30%';
																content_page_cell_cell.style.padding = '0';
																content_page_cell_cell.appendChild(createElement('div', function(content_page_cell_cell_box) {
																	content_page_cell_cell_box.className = 'cke_dialog_ui_vbox';
																	content_page_cell_cell_box.appendChild(createElement('table', function(content_page_cell_cell_table) {
																		content_page_cell_cell_table.align = 'left';
																		content_page_cell_cell_table.border = '0';
																		content_page_cell_cell_table.setAttribute('cellspacing', '0');
																		content_page_cell_cell_table.style.width = '100%';
																		content_page_cell_cell_table.appendChild(createElement('tbody', function(content_page_cell_cell_tbody) {
																			content_page_cell_cell_tbody.appendChild(createElement('tr', function(content_page_cell_cell_row) {
																				content_page_cell_cell_row.appendChild(createElement('td', function(content_page_cell_cell_cell) {
																					content_page_cell_cell_cell.className = 'cke_dialog_ui_vbox_child';
																					content_page_cell_cell_cell.style.padding = '0';
																					content_page_cell_cell_cell.appendChild(createElement('span', function(span) {
																						span.className = 'cke_dialog_ui_html';
																						span.appendChild(document.createTextNode('Highlight'));
																					}));

																					content_page_cell_cell_cell.appendChild(createElement('div', function(previewbox) {
																						previewbox.className = 'color-preview';
																						previewbox.style.border = '1px solid';
																						previewbox.style.width = '74px';
																						previewbox.style.height = '74px';
																						previewbox.style.backgroundColor = '#000';
																					}));

																					content_page_cell_cell_cell.appendChild(createElement('div', function(previewvalue) {
																						previewvalue.id = 'colorMore-preview-value';
																						previewvalue.appendChild(document.createTextNode('#000000'));
																					}));

																					content_page_cell_cell_cell.appendChild(createElement('span', function(span) {
																						span.appendChild(document.createTextNode('Selected Color'));
																					}));

																					content_page_cell_cell_cell.appendChild(createElement('div', function(selectedbox) {
																						selectedbox.className = 'selected-preview';
																						selectedbox.style.border = '1px solid';
																						selectedbox.style.width = '74px';
																						selectedbox.style.height = '20px';
																					}));
																				}));
																			}));

																			content_page_cell_cell_tbody.appendChild(createElement('tr', function(content_page_cell_cell_row) {
																				content_page_cell_cell_row.appendChild(createElement('td', function(content_page_cell_cell_cell) {
																					content_page_cell_cell_cell.className = 'cke_dialog_ui_vbox_child';
																					content_page_cell_cell_cell.style.padding = '0';
																					content_page_cell_cell_cell.appendChild(createElement('div', function(selectedcont) {
																						selectedcont.className = 'cke_dialog_ui_text';
																						selectedcont.style.width = '74px';
																						selectedcont.appendChild(createElement('label', function(selectedlabel) {
																							selectedlabel.className = 'cke_dialog_ui_labeled_label';
																							selectedlabel.style.display = 'none';
																							selectedlabel.appendChild(document.createTextNode('Selected Color'));
																						}));

																						selectedcont.appendChild(createElement('div', function(labelcontent) {
																							labelcontent.className = 'cke_dialog_ui_labeled_content';
																							labelcontent.appendChild(createElement('div', function(inputcont) {
																								inputcont.className = 'cke_dialog_ui_input_text';
																								inputcont.appendChild(createElement('input', function(input) {
																									input.id = 'colorMore-input';
																									input.className = 'cke_dialog_ui_input_text';
																									input.type = 'text';
																								}));
																							}));
																						}));
																					}));
																				}));
																			}));

																			content_page_cell_cell_tbody.appendChild(createElement('tr', function(content_page_cell_cell_row) {
																				content_page_cell_cell_row.appendChild(createElement('td', function(content_page_cell_cell_cell) {
																					content_page_cell_cell_cell.className = 'cke_dialog_ui_vbox_child';
																					content_page_cell_cell_cell.style.padding = '0';
																					content_page_cell_cell_cell.appendChild(createElement('span', function(span) {
																						span.className = 'cke_dialog_ui_html';
																						span.appendChild(document.createTextNode('\u00a0'));
																					}));
																				}));
																			}));

																			content_page_cell_cell_tbody.appendChild(createElement('tr', function(content_page_cell_cell_row) {
																				content_page_cell_cell_row.appendChild(createElement('td', function(content_page_cell_cell_cell) {
																					content_page_cell_cell_cell.className = 'cke_dialog_ui_vbox_child';
																					content_page_cell_cell_cell.style.padding = '0';
																					content_page_cell_cell_cell.appendChild(createElement('a', function(clear) {
																						clear.className = 'cke_dialog_ui_button clear_button';
																						clear.href = 'javascript:void(0)';
																						clear.style.marginTop = '5px';
																						clear.title = 'Clear';
																						clear.appendChild(createElement('span', function(span) {
																							span.className = 'cke_dialog_ui_button';
																							span.appendChild(document.createTextNode('Clear'));
																						}));
																					}));
																				}));
																			}));
																		}));
																	}));
																}));
															}));
														}));
													}));
												}));
											}));
										}));
									}));
								}));
							}));
						}));
					}));

					content_tbody.appendChild(createElement('tr', function(content_row) {
						content_row.appendChild(createElement('td', function(content_cell) {
							content_cell.className = 'cke_dialog_footer';
							content_cell.appendChild(createElement('table', function(footer) {
								footer.className = 'cke_dialog_ui_hbox cke_dialog_footer_buttons';
								footer.appendChild(createElement('tbody', function(footer_tbody) {
									footer_tbody.appendChild(createElement('tr', function(footer_row) {
										footer_row.className = 'cke_dialog_ui_hbox';
										footer_row.appendChild(createElement('td', function(okay) {
											okay.className = 'cke_dialog_ui_hbox_first';
											okay.style.paddingRight = '10px';
											okay.appendChild(createElement('a', function(button) {
												button.className = 'cke_dialog_ui_button cke_dialog_ui_button_ok';
												button.href = 'javascript:void(0)';
												button.title = 'OK';
												button.appendChild(createElement('span', function(span) {
													span.className = 'cke_dialog_ui_button';
													span.appendChild(document.createTextNode('OK'));
												}));
											}));
										}));

										footer_row.appendChild(createElement('td', function(cancel) {
											cancel.className = 'cke_dialog_ui_hbox_first';
											cancel.appendChild(createElement('a', function(button) {
												button.className = 'cke_dialog_ui_button cke_dialog_ui_button_cancel';
												button.href = 'javascript:void(0)';
												button.title = 'Cancel';
												button.appendChild(createElement('span', function(span) {
													span.className = 'cke_dialog_ui_button';
													span.appendChild(document.createTextNode('Cancel'));
												}));
											}));
										}));
									}));
								}));
							}));
						}));
					}));
				}));
			}));
		}));
	});

	// Prepend

	document.body.appendChild(colorMoreRequest);

	runInGlobal('colorMoreRequestDrag = new Draggable(\'colorMore-request\', { handle: \'request-type\', starteffect: null, endeffect: null });');

	createRequestBackground();

	var ColorCellHightlightHandler = function() {
		var colorPreview = document.getElementById('colorMore-request').getElementsByClassName('color-preview')[0],
		color = this.getElementsByTagName('span')[0].childNodes[0].nodeValue;

		colorPreview.style.backgroundColor = color;
		colorPreview.nextSibling.childNodes[0].nodeValue = color;
	};

	var ColorCellSelectHandler = function() {
		var selectedCell = document.getElementById('colorMore-request').getElementsByClassName('selected-cell')[0] || null,
		newColor = this.getElementsByTagName('span')[0].childNodes[0].nodeValue;

		if (selectedCell != null) {
			selectedCell.style.border = '1px solid ' + selectedCell.style.backgroundColor;
			Classes.removeClass(selectedCell, 'selected-cell');
		}

		document.getElementById('colorMore-request').getElementsByClassName('selected-preview')[0].style.backgroundColor = newColor;
		document.getElementById('colorMore-input').value = newColor;

		this.style.border = '1px dotted #fff';
		Classes.addClass(this, 'selected-cell');
		this.focus();
	};

	var clearHandler = function() {
		var selectedCell = document.getElementById('colorMore-request').getElementsByClassName('selected-cell')[0];

		selectedCell.style.border = '1px solid ' + selectedCell.style.backgroundColor;
		selectedCell.blur();
		Classes.removeClass(selectedCell, 'selected-cell');

		document.getElementById('colorMore-request').getElementsByClassName('selected-preview')[0].style.backgroundColor = '';
		document.getElementById('colorMore-input').value = '';
	};

	var cells = document.getElementById('colorMore-request').getElementsByClassName('ColorCell'),
	cell;

	for (i = 0; i < cells.length; i++) {
		cell = cells[i];
		Events.selector(cell).add('mouseenter', 'highlightColor', ColorCellHightlightHandler, false);
		Events.selector(cell).add('click', 'selectColor', ColorCellSelectHandler, false);
	}

	Events.selector(document.getElementById('colorMore-request').getElementsByClassName('clear_button')[0]).add('click', 'clearColor', clearHandler, false);

	var requestClickHandler = function() {
			fade(document.getElementById('colorMore-request'), 'out');
			fade(document.getElementById('request-background'), 'out');
	};

	Events.selector(document.getElementById('colorMore-request').getElementsByClassName('cke_dialog_close_button')[0]).add('click', 'colorMoreRequest_fade', requestClickHandler, false);
	Events.selector(document.getElementById('colorMore-request').getElementsByClassName('cke_dialog_footer')[0].getElementsByTagName('a')[0]).add('click', 'colorMoreRequest_fade', requestClickHandler, false);
	Events.selector(document.getElementById('colorMore-request').getElementsByClassName('cke_dialog_footer')[0].getElementsByTagName('a')[1]).add('click', 'colorMoreRequest_fade', requestClickHandler, false);
}

function plaintextParser(editor) {
	var buttons = editor.getElementsByClassName('cke_button'),
	dropdowns = editor.getElementsByClassName('cke_rcombo'),
	i = 0;

	var plaintextBBCodeHandler = function() {
		if (editor.getElementsByClassName('cke_source')[0] != null) {
			var top = '0px',
			self = this,
			request,
			dropdown,
			buttonOffset,
			buttonHeight,
			windowScroll,
			windowHeight,
			dropdownHeight,
			textArea = editor.getElementsByClassName('cke_source')[0],
			selectedText;

			switch (self.title) {
				case 'Special BBCode':
					if (request == null) {
						createRequest();
					}

					request = document.getElementById('plaintext-request');

					request.getElementsByClassName('request-type')[0].childNodes[0].nodeValue = 'Special BBCode';
					request.getElementsByClassName('spec')[0].childNodes[0].nodeValue = 'BBCode';

					empty(request.getElementsByClassName('fields')[0]);

					// Make fields

					var specialSelect = createElement('select', function(select) {
						select.className = 'cke_dialog_ui_input_select sp_BBCode';
						select.options[0] = new Option(' Please select', 'Default', true);
						select.options[1] = new Option(' Acronym', 'Acronym');
						select.options[2] = new Option(' Background-color', 'Background-color');
						select.options[3] = new Option(' Horizontal Rule', 'Horizontal Rule');
						select.options[4] = new Option(' Media', 'Media');
						select.options[5] = new Option(' Member', 'Member');
						select.options[6] = new Option(' Post Link', 'Post Link');
						select.options[7] = new Option(' Spoiler', 'Spoiler');
						select.options[8] = new Option(' Topic Link', 'Topic Link');
						select.options[9] = new Option(' Twitter', 'Twitter');
					}),
					specialFields = createElement('div', function(fields) {
						fields.className = 'sp_BBCode_fields';
						fields.style.paddingTop = '5px';
					});

					request.getElementsByClassName('fields')[0].appendChild(specialSelect);
					request.getElementsByClassName('fields')[0].appendChild(specialFields);

					// Event

					var selectSpecialBBCodeHandler = function() {
						var select = this;

						empty(select.nextSibling);

						switch (select.options[select.selectedIndex].value) {
							case 'Acronym':
								(function () {
									var descript = createElement('div', function(el) {
										el.className = 'cke_dialog_ui_vbox_child sp_BBCode_desc';
										el.appendChild(document.createTextNode('Allows you to make an acronym that will display a description when moused over.'));
									}),
									inputbox = createElement('div', function(el) {
										el.className = 'cke_dialog_ui_vbox_child';
										el.appendChild(document.createTextNode('Enter the description for this acronym (EG: Laugh Out Loud)'));
										el.appendChild(createElement('div', function(cont) {
											cont.className = 'cke_dialog_ui_input_text';
											cont.appendChild(createElement('input', function(input) {
												input.className = 'cke_dialog_ui_input_text';
												input.type = 'text';
											}));
										}));
									}),
									textbox = createElement('div', function(el) {
										el.className = 'cke_dialog_ui_vbox_child';
										el.style.paddingBottom = '0px';
										el.appendChild(document.createTextNode('Enter the acronym (EG: lol)'));
										el.appendChild(createElement('div', function(cont) {
											cont.className = 'cke_dialog_ui_input_textarea';
											cont.appendChild(createElement('textarea', function(text) {
												text.className = 'cke_dialog_ui_input_textarea';
												text.rows = 5;
												text.cols = 20;
											}));
										}));
									});

									select.nextSibling.appendChild(descript);
									select.nextSibling.appendChild(inputbox);
									select.nextSibling.appendChild(textbox);
								})();
							break;
							case 'Background-color':
								(function () {
									var descript = createElement('div', function(el) {
										el.className = 'cke_dialog_ui_vbox_child sp_BBCode_desc';
										el.appendChild(document.createTextNode('Adds a background color behind the text.'));
									}),
									inputbox = createElement('div', function(el) {
										el.className = 'cke_dialog_ui_vbox_child';
										el.appendChild(document.createTextNode('Option'));
										el.appendChild(createElement('div', function(cont) {
											cont.className = 'cke_dialog_ui_input_text';
											cont.appendChild(createElement('input', function(input) {
												input.className = 'cke_dialog_ui_input_text';
												input.type = 'text';
											}));
										}));
									}),
									textbox = createElement('div', function(el) {
										el.className = 'cke_dialog_ui_vbox_child';
										el.style.paddingBottom = '0px';
										el.appendChild(document.createTextNode('Content'));
										el.appendChild(createElement('div', function(cont) {
											cont.className = 'cke_dialog_ui_input_textarea';
											cont.appendChild(createElement('textarea', function(text) {
												text.className = 'cke_dialog_ui_input_textarea';
												text.rows = 5;
												text.cols = 20;
											}));
										}));
									});

									select.nextSibling.appendChild(descript);
									select.nextSibling.appendChild(inputbox);
									select.nextSibling.appendChild(textbox);
								})();
							break;
							case 'Horizontal Rule':
								(function () {
									var descript = createElement('div', function(el) {
										el.className = 'cke_dialog_ui_vbox_child sp_BBCode_desc';
										el.appendChild(document.createTextNode('Adds a horizontal rule to separate text.'));
									});

									select.nextSibling.appendChild(descript);
								})();
							break;
							case 'Media':
								(function () {
									var descript = createElement('div', function(el) {
										el.className = 'cke_dialog_ui_vbox_child sp_BBCode_desc';
										el.appendChild(document.createTextNode('Allows a user to post media content from certain common media sites.'));
									}),
									inputbox = createElement('div', function(el) {
										el.className = 'cke_dialog_ui_vbox_child';
										el.appendChild(document.createTextNode('Dimensions (Flash Only)'));
										el.appendChild(createElement('div', function(cont) {
											cont.className = 'cke_dialog_ui_input_text';
											cont.appendChild(createElement('input', function(input) {
												input.className = 'cke_dialog_ui_input_text';
												input.type = 'text';
											}));
										}));
									}),
									textbox = createElement('div', function(el) {
										el.className = 'cke_dialog_ui_vbox_child';
										el.style.paddingBottom = '0px';
										el.appendChild(document.createTextNode('Media URL'));
										el.appendChild(createElement('div', function(cont) {
											cont.className = 'cke_dialog_ui_input_textarea';
											cont.appendChild(createElement('textarea', function(text) {
												text.className = 'cke_dialog_ui_input_textarea';
												text.rows = 5;
												text.cols = 20;
											}));
										}));
									});

									select.nextSibling.appendChild(descript);
									select.nextSibling.appendChild(inputbox);
									select.nextSibling.appendChild(textbox);
								})();
							break;
							case 'Member':
								(function () {
									var descript = createElement('div', function(el) {
										el.className = 'cke_dialog_ui_vbox_child sp_BBCode_desc';
										el.appendChild(document.createTextNode('Given a member name, a link is automatically generated to the member\'s profile.'));
									}),
									inputbox = createElement('div', function(el) {
										el.className = 'cke_dialog_ui_vbox_child';
										el.appendChild(document.createTextNode('Member Name'));
										el.appendChild(createElement('div', function(cont) {
											cont.className = 'cke_dialog_ui_input_text';
											cont.appendChild(createElement('input', function(input) {
												input.className = 'cke_dialog_ui_input_text';
												input.type = 'text';
											}));
										}));
									});

									select.nextSibling.appendChild(descript);
									select.nextSibling.appendChild(inputbox);
								})();
							break;
							case 'Post Link':
								(function () {
									var descript = createElement('div', function(el) {
										el.className = 'cke_dialog_ui_vbox_child sp_BBCode_desc';
										el.appendChild(document.createTextNode('This tag provides an easy way to link to a post.'));
									}),
									inputbox = createElement('div', function(el) {
										el.className = 'cke_dialog_ui_vbox_child';
										el.appendChild(document.createTextNode('Enter the Post ID'));
										el.appendChild(createElement('div', function(cont) {
											cont.className = 'cke_dialog_ui_input_text';
											cont.appendChild(createElement('input', function(input) {
												input.className = 'cke_dialog_ui_input_text';
												input.type = 'text';
											}));
										}));
									}),
									textbox = createElement('div', function(el) {
										el.className = 'cke_dialog_ui_vbox_child';
										el.style.paddingBottom = '0px';
										el.appendChild(document.createTextNode('Enter the title for this link'));
										el.appendChild(createElement('div', function(cont) {
											cont.className = 'cke_dialog_ui_input_textarea';
											cont.appendChild(createElement('textarea', function(text) {
												text.className = 'cke_dialog_ui_input_textarea';
												text.rows = 5;
												text.cols = 20;
											}));
										}));
									});

									select.nextSibling.appendChild(descript);
									select.nextSibling.appendChild(inputbox);
									select.nextSibling.appendChild(textbox);
								})();
							break;
							case 'Spoiler':
								(function () {
									var descript = createElement('div', function(el) {
										el.className = 'cke_dialog_ui_vbox_child sp_BBCode_desc';
										el.appendChild(document.createTextNode('Spoiler tag.'));
									}),
									inputbox = createElement('div', function(el) {
										el.className = 'cke_dialog_ui_vbox_child';
										el.appendChild(document.createTextNode('Option'));
										el.appendChild(createElement('div', function(cont) {
											cont.className = 'cke_dialog_ui_input_text';
											cont.appendChild(createElement('input', function(input) {
												input.className = 'cke_dialog_ui_input_text';
												input.type = 'text';
											}));
										}));
									}),
									textbox = createElement('div', function(el) {
										el.className = 'cke_dialog_ui_vbox_child';
										el.style.paddingBottom = '0px';
										el.appendChild(document.createTextNode('Enter the text to be masked'));
										el.appendChild(createElement('div', function(cont) {
											cont.className = 'cke_dialog_ui_input_textarea';
											cont.appendChild(createElement('textarea', function(text) {
												text.className = 'cke_dialog_ui_input_textarea';
												text.rows = 5;
												text.cols = 20;
											}));
										}));
									});

									select.nextSibling.appendChild(descript);
									select.nextSibling.appendChild(inputbox);
									select.nextSibling.appendChild(textbox);
								})();
							break;
							case 'Topic Link':
								(function () {
									var descript = createElement('div', function(el) {
										el.className = 'cke_dialog_ui_vbox_child sp_BBCode_desc';
										el.appendChild(document.createTextNode('This tag provides an easy way to link to a topic.'));
									}),
									inputbox = createElement('div', function(el) {
										el.className = 'cke_dialog_ui_vbox_child';
										el.appendChild(document.createTextNode('Enter the Topic ID'));
										el.appendChild(createElement('div', function(cont) {
											cont.className = 'cke_dialog_ui_input_text';
											cont.appendChild(createElement('input', function(input) {
												input.className = 'cke_dialog_ui_input_text';
												input.type = 'text';
											}));
										}));
									}),
									textbox = createElement('div', function(el) {
										el.className = 'cke_dialog_ui_vbox_child';
										el.style.paddingBottom = '0px';
										el.appendChild(document.createTextNode('Enter the title for this link'));
										el.appendChild(createElement('div', function(cont) {
											cont.className = 'cke_dialog_ui_input_textarea';
											cont.appendChild(createElement('textarea', function(text) {
												text.className = 'cke_dialog_ui_input_textarea';
												text.rows = 5;
												text.cols = 20;
											}));
										}));
									});

									select.nextSibling.appendChild(descript);
									select.nextSibling.appendChild(inputbox);
									select.nextSibling.appendChild(textbox);
								})();
							break;
							case 'Twitter':
								(function () {
									var descript = createElement('div', function(el) {
										el.className = 'cke_dialog_ui_vbox_child sp_BBCode_desc';
										el.appendChild(document.createTextNode('A tag to link to a user\'s twitter account.'));
									}),
									textbox = createElement('div', function(el) {
										el.className = 'cke_dialog_ui_vbox_child';
										el.style.paddingBottom = '0px';
										el.appendChild(document.createTextNode('Twitter Username'));
										el.appendChild(createElement('div', function(cont) {
											cont.className = 'cke_dialog_ui_input_textarea';
											cont.appendChild(createElement('textarea', function(text) {
												text.className = 'cke_dialog_ui_input_textarea';
												text.rows = 5;
												text.cols = 20;
											}));
										}));
									});

									select.nextSibling.appendChild(descript);
									select.nextSibling.appendChild(textbox);
								})();
							break;	
						}

						selectedText = getSelection(editor.getElementsByClassName('cke_source')[0]);

						if (select.nextSibling.getElementsByTagName('textarea')[0] != null && selectedText.length) {
							select.nextSibling.getElementsByTagName('textarea')[0].value = selectedText;
						}
					};

					Events.selector(request.getElementsByClassName('sp_BBCode')[0]).add('change', 'selectSpecialBBCode', selectSpecialBBCodeHandler, false);

					var SpecialBBCodeSubmitHandler = function() {
						var select = request.getElementsByClassName('sp_BBCode')[0],
						fields = select.nextSibling,
						input,
						textarea;

						switch (select.options[select.selectedIndex].value) {
							case 'Acronym':
								input = fields.getElementsByTagName('input')[0].value;
								textarea = fields.getElementsByTagName('textarea')[0];
								wrapText(editor.getElementsByClassName('cke_source')[0], '[acronym=' + input + ']', '[/acronym]', textarea);
							break;
							case 'Background-color':
								input = fields.getElementsByTagName('input')[0].value;
								textarea = fields.getElementsByTagName('textarea')[0];
								wrapText(editor.getElementsByClassName('cke_source')[0], '[background=' + input + ']', '[/background]', textarea);
							break;
							case 'Horizontal Rule':
								wrapText(editor.getElementsByClassName('cke_source')[0], '[hr]', '');
							break;
							case 'Media':
								input = fields.getElementsByTagName('input')[0].value;
								textarea = fields.getElementsByTagName('textarea')[0];
								wrapText(editor.getElementsByClassName('cke_source')[0], '[media=' + input + ']', '[/media]', textarea);
							break;
							case 'Member':
								input = fields.getElementsByTagName('input')[0].value;
								wrapText(editor.getElementsByClassName('cke_source')[0], '[member=' + input + ']', '');
							break;
							case 'Post Link':
								input = fields.getElementsByTagName('input')[0].value;
								textarea = fields.getElementsByTagName('textarea')[0];
								wrapText(editor.getElementsByClassName('cke_source')[0], '[post=' + input + ']', '[/post]', textarea);
							break;
							case 'Spoiler':
								input = fields.getElementsByTagName('input')[0].value;
								textarea = fields.getElementsByTagName('textarea')[0];
								if (input.length) {
									wrapText(editor.getElementsByClassName('cke_source')[0], '[spoiler=' + input + ']', '[/spoiler]', textarea);
								} else {
									wrapText(editor.getElementsByClassName('cke_source')[0], '[spoiler]', '[/spoiler]', textarea);
								}
							break;
							case 'Topic Link':
								input = fields.getElementsByTagName('input')[0].value;
								textarea = fields.getElementsByTagName('textarea')[0];
								wrapText(editor.getElementsByClassName('cke_source')[0], '[topic=' + input + ']', '[/topic]', textarea);
							break;
							case 'Twitter':
								textarea = fields.getElementsByTagName('textarea')[0];
								wrapText(editor.getElementsByClassName('cke_source')[0], '[twitter]', '[/twitter]', textarea);
							break;
						}

						Events.getEventsByName('submitSpecialBBCode').remove();
						Events.getEventsByName('removeSpecialBBCodeSubmit').remove();
					};

					var removeSpecialBBCodeHandlers = function() {
						Events.getEventsByName('submitSpecialBBCode').remove();
						Events.getEventsByName('removeSpecialBBCodeSubmit').remove();
					};

					Events.selector(getSubmit(request)).add('click', 'submitSpecialBBCode', SpecialBBCodeSubmitHandler, false);

					Events.selector(getCancel(request)).add('click', 'removeSpecialBBCodeSubmit', removeSpecialBBCodeHandlers, false);

					Events.selector(getClose(request)).add('click', 'removeSpecialBBCodeSubmit', removeSpecialBBCodeHandlers, false);

					fade(document.getElementById('request-background'), 'in');
					fade(document.getElementById('plaintext-request'), 'in');

					if (window.innerHeight > request.offsetHeight) {
						top = (window.innerHeight / 2) - (request.offsetHeight / 2) + 'px';
					}

					request.style.top = top;
					request.style.left = (window.innerWidth / 2) - 200 + 'px';
					request.style.width = '400px';

					request.getElementsByClassName('sp_BBCode')[0].focus();
				break;
			
				case 'Font Name':
					if (document.getElementById('font-dropdown') == null) {
						createFontDropdown();
					}

					dropdown = document.getElementById('font-dropdown');

					var fonts = dropdown.getElementsByTagName('a');

					var applyFontHandler = function() {
						wrapText(editor.getElementsByClassName('cke_source')[0], '[font=' + this.getElementsByTagName('span')[0].style.fontFamily.replace(/'/g, "").replace(/, /g, ",") + ']', '[/font]');

						Classes.removeClass(self.parentNode, 'cke_on');
						Classes.addClass(self.parentNode, 'cke_off');

						Events.getEventsByName('applyFont').remove();

						dropdown.style.display = 'none';

						document.getElementById('dropdown-click-background').remove();
					};
					
					if (window.getComputedStyle(dropdown).display === 'none') {
						Classes.removeClass(self.parentNode, 'cke_off');
						Classes.addClass(self.parentNode, 'cke_on');

						for (i = 0; i < fonts.length; i++) {
							Events.selector(fonts[i]).add('click', 'applyFont', applyFontHandler, false);
						}

						dropdown.style.display = 'block';

						document.body.appendChild(createElement('div', function(click) {
							click.id = 'dropdown-click-background';
							click.style.position = 'fixed';
							click.style.width = '100%';
							click.style.height = '100%';
							click.style.top = '0px';
							click.style.left = '0px';
							click.style.zIndex = '9998';

							click.onclick = function() {
								Classes.removeClass(self.parentNode, 'cke_on');
								Classes.addClass(self.parentNode, 'cke_off');

								Events.getEventsByName('applyFont').remove();

								dropdown.style.display = 'none';
								this.remove();
								editor.getElementsByClassName('cke_source')[0].focus();
							};
						}));
					}

					buttonOffset = getPosition(self).y;
					buttonHeight = self.offsetHeight;
					windowScroll = window.scrollY;
					windowHeight = window.innerHeight;
					dropdownHeight = dropdown.offsetHeight;

					if ((windowScroll + windowHeight) - (buttonOffset + buttonHeight - 1) >= dropdownHeight) {
						top = buttonOffset + buttonHeight - 1 + 'px';
					} else if ((windowScroll + windowHeight) - (buttonOffset + buttonHeight - 1) < dropdownHeight && (buttonOffset + buttonHeight - 1) - windowScroll > dropdownHeight) {
						top = buttonOffset + buttonHeight - 1 - dropdownHeight + 'px';
					} else {
						top = windowScroll + 'px';
					}

					dropdown.style.top = top;
					dropdown.style.left = getPosition(self).x + 'px';
				break;

				case 'Font Size':
					if (document.getElementById('size-dropdown') == null) {
						createSizeDropdown();
					}

					dropdown = document.getElementById('size-dropdown');

					var sizes = dropdown.getElementsByTagName('a');

					var applySizeHandler = function() {
						wrapText(editor.getElementsByClassName('cke_source')[0], '[size=' + this.id.split('Size_')[1] + ']', '[/size]');

						Classes.removeClass(self.parentNode, 'cke_on');
						Classes.addClass(self.parentNode, 'cke_off');

						Events.getEventsByName('applySize').remove();

						dropdown.style.display = 'none';

						document.getElementById('dropdown-click-background').remove();
					};
					
					if (window.getComputedStyle(dropdown).display === 'none') {
						Classes.removeClass(self.parentNode, 'cke_off');
						Classes.addClass(self.parentNode, 'cke_on');

						for (i = 0; i < sizes.length; i++) {
							Events.selector(sizes[i]).add('click', 'applySize', applySizeHandler, false);
						}

						dropdown.style.display = 'block';

						document.body.appendChild(createElement('div', function(click) {
							click.id = 'dropdown-click-background';
							click.style.position = 'fixed';
							click.style.width = '100%';
							click.style.height = '100%';
							click.style.top = '0px';
							click.style.left = '0px';
							click.style.zIndex = '9998';

							click.onclick = function() {
								Classes.removeClass(self.parentNode, 'cke_on');
								Classes.addClass(self.parentNode, 'cke_off');

								Events.getEventsByName('applySize').remove();

								dropdown.style.display = 'none';
								this.remove();
								editor.getElementsByClassName('cke_source')[0].focus();
							};
						}));
					}

					buttonOffset = getPosition(self).y;
					buttonHeight = self.offsetHeight;
					windowScroll = window.scrollY;
					windowHeight = window.innerHeight;
					dropdownHeight = dropdown.offsetHeight;

					if ((windowScroll + windowHeight) - (buttonOffset + buttonHeight - 1) >= dropdownHeight) {
						top = buttonOffset + buttonHeight - 1 + 'px';
					} else if ((windowScroll + windowHeight) - (buttonOffset + buttonHeight - 1) < dropdownHeight && (buttonOffset + buttonHeight - 1) - windowScroll > dropdownHeight) {
						top = buttonOffset + buttonHeight - 1 - dropdownHeight + 'px';
					} else {
						top = windowScroll + 'px';
					}

					dropdown.style.top = top;
					dropdown.style.left = getPosition(self).x + 'px';
				break;

				case 'Text Color':
					if (document.getElementById('color-dropdown') == null) {
						createColorDropdown();
					}

					dropdown = document.getElementById('color-dropdown');

					var colors = dropdown.getElementsByClassName('cke_colorbox');

					var colorBoxHandler = function() {
						wrapText(editor.getElementsByClassName('cke_source')[0], '[color=' + getBackgroundColor(this.getElementsByTagName('span')[0]) + ']', '[/color]');

						Classes.removeClass(self.parentNode, 'cke_on');
						Classes.addClass(self.parentNode, 'cke_off');

						Events.getEventsByName('applyColor').remove();

						dropdown.style.display = 'none';

						document.getElementById('dropdown-click-background').remove();
					};

					var colorMoreHandler = function() {
						if (document.getElementById('colorMore-request') == null) {
							createColorMoreRequest();
						}

						var request = document.getElementById('colorMore-request');

						var submitColorMoreHandler = function() {
							var color = document.getElementById('colorMore-input').value;
							wrapText(editor.getElementsByClassName('cke_source')[0], '[color=' + color + ']', '[/color]');

							Events.getEventsByName('submitColorMore').remove();
							Events.getEventsByName('removeColorMoreSubmit').remove();
						};

						var removeColorMoreHandlers = function() {
							Events.getEventsByName('submitColorMore').remove();
							Events.getEventsByName('removeColorMoreSubmit').remove();
						};

						Events.selector(getSubmit(request)).add('click', 'submitColorMore', submitColorMoreHandler, false);

						Events.selector(getCancel(request)).add('click', 'removeColorMoreSubmit', removeColorMoreHandlers, false);

						Events.selector(getClose(request)).add('click', 'removeColorMoreSubmit', removeColorMoreHandlers, false);

						fade(document.getElementById('request-background'), 'in');
						fade(document.getElementById('colorMore-request'), 'in');

						if (window.innerHeight > request.offsetHeight) {
							top = (window.innerHeight / 2) - (request.offsetHeight / 2) + 'px';
						}

						request.style.top = top;
						request.style.left = (window.innerWidth / 2) - 190 + 'px';

						if (request.getElementsByClassName('selected-cell')[0] != null) {
							request.getElementsByClassName('selected-cell')[0].style.border = '1px solid ' + request.getElementsByClassName('selected-cell')[0].style.backgroundColor;
							request.getElementsByClassName('selected-cell')[0].blur();
							Classes.removeClass(request.getElementsByClassName('selected-cell')[0], 'selected-cell');
						}

						request.getElementsByClassName('ColorCell')[0].style.border = '1px dotted #fff';
						Classes.addClass(request.getElementsByClassName('ColorCell')[0], 'selected-cell');
						request.getElementsByClassName('ColorCell')[0].focus();

						Classes.removeClass(self.parentNode, 'cke_on');
						Classes.addClass(self.parentNode, 'cke_off');

						Events.getEventsByName('applyColor').remove();

						dropdown.style.display = 'none';

						document.getElementById('dropdown-click-background').remove();
					};

					if (window.getComputedStyle(dropdown).display === 'none') {
						Classes.removeClass(self.parentNode, 'cke_off');
						Classes.addClass(self.parentNode, 'cke_on');

						Events.selector(dropdown.getElementsByClassName('cke_colorauto')[0]).add('click', 'applyColor', colorBoxHandler, false);

						for (i = 0; i < colors.length; i++) {
							if (colors[i].tagName === 'A') {
								Events.selector(colors[i]).add('click', 'applyColor', colorBoxHandler, false);
							}
						}

						Events.selector(dropdown.getElementsByClassName('cke_colormore')[0]).add('click', 'applyColor', colorMoreHandler, false);

						dropdown.style.display = 'block';

						document.body.appendChild(createElement('div', function(click) {
							click.id = 'dropdown-click-background';
							click.style.position = 'fixed';
							click.style.width = '100%';
							click.style.height = '100%';
							click.style.top = '0px';
							click.style.left = '0px';
							click.style.zIndex = '9998';

							click.onclick = function() {
								Classes.removeClass(self.parentNode, 'cke_on');
								Classes.addClass(self.parentNode, 'cke_off');

								Events.getEventsByName('applyColor').remove();

								dropdown.style.display = 'none';
								this.remove();
								editor.getElementsByClassName('cke_source')[0].focus();
							};
						}));
					}

					buttonOffset = getPosition(self).y;
					buttonHeight = self.offsetHeight;
					windowScroll = window.scrollY;
					windowHeight = window.innerHeight;
					dropdownHeight = dropdown.offsetHeight;

					if ((windowScroll + windowHeight) - (buttonOffset + buttonHeight - 1) >= dropdownHeight) {
						top = buttonOffset + buttonHeight - 1 + 'px';
					} else if ((windowScroll + windowHeight) - (buttonOffset + buttonHeight - 1) < dropdownHeight && (buttonOffset + buttonHeight - 1) - windowScroll > dropdownHeight) {
						top = buttonOffset + buttonHeight - 1 - dropdownHeight + 'px';
					} else {
						top = windowScroll + 'px';
					}

					dropdown.style.top = top;
					dropdown.style.left = getPosition(self).x + 'px';
				break;

				case 'Smiley':
					var smileyTray;

					if (editor.parentNode.parentNode.parentNode.parentNode.getElementsByClassName('ipsSmileyTray')[0] == null) {
						var restoreContent = textArea.value,
						RestoreStart = textArea.selectionStart,
						RestoreEnd = textArea.selectionEnd;

						editor.getElementsByClassName('cke_button_ipssource')[0].click();

						var smileyMain = setInterval(function() {
							if (editor.getElementsByClassName('cke_button_ipssource')[0].getAttribute('aria-pressed') !== 'true' && !Classes.hasClass(editor.getElementsByClassName('cke_button_removeFormat')[0], 'cke_disabled')) {
								editor.getElementsByClassName('cke_button_ipsemoticon')[0].click();

								var smiliesHandler = function(event) {
									if (event.target.nodeType !== 1 || event.target.tagName !== 'IMG') {
										return false;
									}

									wrapText(editor.getElementsByClassName('cke_source')[0], event.target.title, '');
								};

								smileyTray = editor.parentNode.parentNode.parentNode.parentNode.getElementsByClassName('ipsSmileyTray')[0];

								Events.selector(smileyTray).add('click', 'addSmiley', smiliesHandler, false);

								editor.getElementsByClassName('cke_button_ipssource')[0].click();
								smileyTray.nextSibling.remove();

								var checker = setInterval(function() {
									if (editor.getElementsByClassName('cke_button_ipssource')[0].getAttribute('aria-pressed') === 'true' && Classes.hasClass(editor.getElementsByClassName('cke_button_removeFormat')[0], 'cke_disabled')) {
										Classes.removeClass(editor.getElementsByClassName('cke_button_ipsbbcode')[0], 'cke_disabled');
										Classes.removeClass(editor.getElementsByClassName('cke_font')[0], 'cke_disabled');
										Classes.removeClass(editor.getElementsByClassName('cke_fontSize')[0], 'cke_disabled');
										Classes.removeClass(editor.getElementsByClassName('cke_button_textcolor')[0], 'cke_disabled');
										Classes.removeClass(editor.getElementsByClassName('cke_button_ipsemoticon')[0], 'cke_disabled');
										Classes.removeClass(editor.getElementsByClassName('cke_button_bold')[0], 'cke_disabled');
										Classes.removeClass(editor.getElementsByClassName('cke_button_italic')[0], 'cke_disabled');
										Classes.removeClass(editor.getElementsByClassName('cke_button_underline')[0], 'cke_disabled');
										Classes.removeClass(editor.getElementsByClassName('cke_button_strike')[0], 'cke_disabled');
										Classes.removeClass(editor.getElementsByClassName('cke_button_subscript')[0], 'cke_disabled');
										Classes.removeClass(editor.getElementsByClassName('cke_button_superscript')[0], 'cke_disabled');
										Classes.removeClass(editor.getElementsByClassName('cke_button_bulletedlist')[0], 'cke_disabled');
										Classes.removeClass(editor.getElementsByClassName('cke_button_numberedlist')[0], 'cke_disabled');
										Classes.removeClass(editor.getElementsByClassName('cke_button_link')[0], 'cke_disabled');
										Classes.removeClass(editor.getElementsByClassName('cke_button_image')[0], 'cke_disabled');
										Classes.removeClass(editor.getElementsByClassName('cke_button_ipscode')[0], 'cke_disabled');
										Classes.removeClass(editor.getElementsByClassName('cke_button_ipsquote')[0], 'cke_disabled');
										Classes.removeClass(editor.getElementsByClassName('cke_button_indent')[0], 'cke_disabled');
										Classes.removeClass(editor.getElementsByClassName('cke_button_justifycenter')[0], 'cke_disabled');
										Classes.removeClass(editor.getElementsByClassName('cke_button_justifyright')[0], 'cke_disabled');
										fade(smileyTray, 'in', 100);
										clearTimeout(checker);
									}
								}, 1000);

								if (editor.getElementsByClassName('cke_source')[0] != null) {
									editor.getElementsByClassName('cke_source')[0].focus();
									editor.getElementsByClassName('cke_source')[0].value = restoreContent;
									selectRange(editor.getElementsByClassName('cke_source')[0], RestoreStart, RestoreEnd);
								}

								clearTimeout(smileyMain);
							}
						}, 1000);
					} else {
						smileyTray = editor.parentNode.parentNode.parentNode.parentNode.getElementsByClassName('ipsSmileyTray')[0];
						fade(smileyTray, 'toggle', 100);
					}
				break;

				case 'Bold':
					wrapText(editor.getElementsByClassName('cke_source')[0], '[b]', '[/b]');
				break;

				case 'Italic':
					wrapText(editor.getElementsByClassName('cke_source')[0], '[i]', '[/i]');
				break;

				case 'Underline':
					wrapText(editor.getElementsByClassName('cke_source')[0], '[u]', '[/u]');
				break;

				case 'Strike Through':
					wrapText(editor.getElementsByClassName('cke_source')[0], '[s]', '[/s]');
				break;

				case 'Subscript':
					wrapText(editor.getElementsByClassName('cke_source')[0], '[sub]', '[/sub]');
				break;

				case 'Superscript':
					wrapText(editor.getElementsByClassName('cke_source')[0], '[sup]', '[/sup]');
				break;
				
				case 'Insert/Remove Bulleted List':
					wrapText(editor.getElementsByClassName('cke_source')[0], '[list]\n[*]', '[/*]\n[/list]');
				break;

				case 'Insert/Remove Numbered List':
					wrapText(editor.getElementsByClassName('cke_source')[0], '[list=1]\n[*]', '[/*]\n[/list]');
				break;

				case 'Link':
					selectedText = getSelection(textArea);

					if (selectedText.length && selectedText.substr(0, 4) === 'http') {
						wrapText(editor.getElementsByClassName('cke_source')[0], '[url=' + selectedText + ']', '[/url]');
					} else {
						if (document.getElementById('plaintext-request') == null) {
							createRequest();
						}

						request = document.getElementById('plaintext-request');

						request.getElementsByClassName('request-type')[0].childNodes[0].nodeValue = 'Link';

						empty(request.getElementsByClassName('spec')[0]);
						request.getElementsByClassName('spec')[0].appendChild(createElement('span', function(el) {
							el.style.fontWeight = 'bolder';
							el.appendChild(document.createTextNode('URL'));
						}));

						empty(request.getElementsByClassName('fields')[0]);
						request.getElementsByClassName('fields')[0].appendChild(createElement('div', function(el) {
							el.className = 'cke_dialog_ui_input_text';
							el.appendChild(createElement('input', function(input) {
								input.className = 'cke_dialog_ui_input_text';
								input.type = 'text';
							}));
						}));

						var submitLinkHandler = function() {
							var link = request.getElementsByClassName('fields')[0].getElementsByTagName('input')[0].value;

							selectedText = getSelection(textArea);

							if (selectedText.length) {
								wrapText(editor.getElementsByClassName('cke_source')[0], '[url=' + link + ']', '[/url]');
							} else {
								wrapText(editor.getElementsByClassName('cke_source')[0], '[url=' + link + ']' + link, '[/url]');
							}

							Events.getEventsByName('applyLinkRequest').remove();
							Events.getEventsByName('removeLinkSubmit').remove();
						};

						var removeLinkHandlers = function() {
							Events.getEventsByName('applyLinkRequest').remove();
							Events.getEventsByName('removeLinkSubmit').remove();
						};

						Events.selector(getSubmit(request)).add('click', 'applyLinkRequest', submitLinkHandler, false);

						Events.selector(getCancel(request)).add('click', 'removeLinkSubmit', removeLinkHandlers, false);

						Events.selector(getClose(request)).add('click', 'removeLinkSubmit', removeLinkHandlers, false);

						fade(document.getElementById('request-background'), 'in');
						fade(document.getElementById('plaintext-request'), 'in');

						if (window.innerHeight > request.offsetHeight) {
							top = (window.innerHeight / 2) - (request.offsetHeight / 2) + 'px';
						}

						request.style.top = top;
						request.style.left = (window.innerWidth / 2) - 200 + 'px';
						request.style.width = '400px';

						request.getElementsByClassName('fields')[0].getElementsByTagName('input')[0].focus();
					}
				break;

				case 'Image':
					selectedText = getSelection(textArea);

					if (selectedText.length && selectedText.substr(0, 4) === 'http') {
						wrapText(editor.getElementsByClassName('cke_source')[0], '[img=', ']');
					} else {
						if (document.getElementById('plaintext-request') == null) {
							createRequest();
						}

						request = document.getElementById('plaintext-request');

						request.getElementsByClassName('request-type')[0].childNodes[0].nodeValue = 'Image';

						empty(request.getElementsByClassName('spec')[0]);
						request.getElementsByClassName('spec')[0].appendChild(createElement('span', function(el) {
							el.style.fontWeight = 'bolder';
							el.appendChild(document.createTextNode('URL'));
						}));

						empty(request.getElementsByClassName('fields')[0]);
						request.getElementsByClassName('fields')[0].appendChild(createElement('div', function(el) {
							el.className = 'cke_dialog_ui_input_text';
							el.appendChild(createElement('input', function(input) {
								input.className = 'cke_dialog_ui_input_text';
								input.type = 'text';
							}));
						}));

						var submitImageHandler = function() {
							var link = request.getElementsByClassName('fields')[0].getElementsByTagName('input')[0].value;

							selectedText = getSelection(textArea);

							wrapText(editor.getElementsByClassName('cke_source')[0], '[img=' + link + ']', '');

							Events.getEventsByName('applyImageRequest').remove();
							Events.getEventsByName('removeImageSubmit').remove();
						};

						var removeImageHandlers = function() {
							Events.getEventsByName('applyImageRequest').remove();
							Events.getEventsByName('removeImageSubmit').remove();
						};

						Events.selector(getSubmit(request)).add('click', 'applyImageRequest', submitImageHandler, false);

						Events.selector(getCancel(request)).add('click', 'removeImageSubmit', removeImageHandlers, false);

						Events.selector(getClose(request)).add('click', 'removeImageSubmit', removeImageHandlers, false);

						fade(document.getElementById('request-background'), 'in');
						fade(document.getElementById('plaintext-request'), 'in');

						if (window.innerHeight > request.offsetHeight) {
							top = (window.innerHeight / 2) - (request.offsetHeight / 2) + 'px';
						}

						request.style.top = top;
						request.style.left = (window.innerWidth / 2) - 200 + 'px';
						request.style.width = '400px';

						request.getElementsByClassName('fields')[0].getElementsByTagName('input')[0].focus();
					}
				break;

				case 'Code':
					selectedText = getSelection(textArea);

					if (selectedText.length) {
						wrapText(editor.getElementsByClassName('cke_source')[0], '[code=auto:0]', '[/code]');
					} else {
						if (document.getElementById('plaintext-request') == null) {
							createRequest();
						}

						request = document.getElementById('plaintext-request');
						request.getElementsByClassName('request-type')[0].childNodes[0].nodeValue = 'Code';

						empty(request.getElementsByClassName('spec')[0]);
						request.getElementsByClassName('spec')[0].appendChild(createElement('span', function(el) {
							el.style.fontWeight = 'bolder';
							el.appendChild(document.createTextNode('Code Type'));
						}));

						empty(request.getElementsByClassName('fields')[0]);

						request.getElementsByClassName('fields')[0].appendChild(createElement('select', function(select) {
							select.className = 'cke_dialog_ui_input_select';

							select.options[0] = new Option(' PHP/Generic/Auto Detect', 'auto', true);
							select.options[1] = new Option(' Javascript', 'js');
							select.options[2] = new Option(' HTML', 'html');
							select.options[3] = new Option(' SQL', 'sql');
							select.options[4] = new Option(' CSS', 'css');
							select.options[5] = new Option(' XML', 'xml');
							select.options[6] = new Option(' None', 'nocode');
						}));

						request.getElementsByClassName('fields')[0].appendChild(createElement('div', function(cont) {
							cont.className = 'cke_dialog_ui_vbox_child';

							cont.appendChild(document.createTextNode('Starting Line Number'));

							cont.appendChild(createElement('div', function(box) {
								box.className = 'cke_dialog_ui_input_text';
								box.appendChild(createElement('input', function(input) {
									input.className = 'cke_dialog_ui_input_text code-line-number';
									input.type = 'text';
								}));
							}));

							cont.appendChild(createElement('div', function(box) {
								box.className = 'cke_dialog_ui_vbox_child';
								box.style.paddingBottom = '0px';

								box.appendChild(createElement('div', function(textcont) {
									textcont.className = 'cke_dialog_ui_input_textarea';

									textcont.appendChild(createElement('textarea', function(text) {
										text.className = 'cke_dialog_ui_input_textarea code-body';
										text.rows = 5;
										text.cols = 20;
										text.style.height = '240px';
										text.style.direction = 'ltr';
										text.style.fontFamily = 'monospace';
										text.style.fontSize = '13px';
									}));
								}));
							}));
						}));

						var submitCodeHandler = function() {
							var type = request.getElementsByClassName('fields')[0].getElementsByTagName('select')[0].options[request.getElementsByClassName('fields')[0].getElementsByTagName('select')[0].selectedIndex].value,
							line = request.getElementsByClassName('fields')[0].getElementsByClassName('code-line-number')[0].value,
							body = request.getElementsByClassName('fields')[0].getElementsByClassName('code-body')[0].value;

							if (!line.length) {
								line = 0;
							}

							wrapText(editor.getElementsByClassName('cke_source')[0], '[code=' + type + ':' + line + ']' + body + '[/code]', '');

							Events.getEventsByName('applyCodeRequest').remove();
							Events.getEventsByName('removeCodeSubmit').remove();
						};

						var removeCodeHandlers = function() {
							Events.getEventsByName('applyCodeRequest').remove();
							Events.getEventsByName('removeCodeSubmit').remove();
						};

						Events.selector(getSubmit(request)).add('click', 'applyCodeRequest', submitCodeHandler, false);

						Events.selector(getCancel(request)).add('click', 'removeCodeSubmit', removeCodeHandlers, false);

						Events.selector(getClose(request)).add('click', 'removeCodeSubmit', removeCodeHandlers, false);

						fade(document.getElementById('request-background'), 'in');
						fade(document.getElementById('plaintext-request'), 'in');

						if (window.innerHeight > request.offsetHeight) {
							top = (window.innerHeight / 2) - (request.offsetHeight / 2) + 'px';
						}

						request.style.top = top;
						request.style.left = (window.innerWidth / 2) - 385 + 'px';
						request.style.width = '770px';

						request.getElementsByClassName('fields')[0].getElementsByClassName('code-body')[0].focus();
					}
				break;

				case 'Quote':
					wrapText(editor.getElementsByClassName('cke_source')[0], '[quote]', '[/quote]');
				break;

				case 'Increase Indent':
					wrapText(editor.getElementsByClassName('cke_source')[0], '[indent=1]', '[/indent]');
				break;

				case 'Center':
					wrapText(editor.getElementsByClassName('cke_source')[0], '[center]', '[/center]');
				break;

				case 'Align Right':
					wrapText(editor.getElementsByClassName('cke_source')[0], '[right]', '[/right]');
				break;

				default:
					return false;
			}
		}
	};

	for (i = 0; i < buttons.length; i++) {
		Events.selector(buttons[i].getElementsByTagName('a')[0]).add('click', 'Plaintext_BBCode', plaintextBBCodeHandler, false);
	}

	for (i = 0; i < dropdowns.length; i++) {
		Events.selector(dropdowns[i].getElementsByTagName('a')[0]).add('click', 'Plaintext_BBCode', plaintextBBCodeHandler, false);
	}

	Classes.addClass(editor.getElementsByClassName('cke_button_ipssource')[0], 'bbcode-parsed');
}

function plaintextBBCode(editor) {
	if (Classes.hasClass(editor.getElementsByClassName('cke_button_ipssource')[0], 'cke_on')) {
		Classes.removeClass(editor.getElementsByClassName('cke_button_ipsbbcode')[0], 'cke_disabled');
		Classes.removeClass(editor.getElementsByClassName('cke_font')[0], 'cke_disabled');
		Classes.removeClass(editor.getElementsByClassName('cke_fontSize')[0], 'cke_disabled');
		Classes.removeClass(editor.getElementsByClassName('cke_button_textcolor')[0], 'cke_disabled');
		Classes.removeClass(editor.getElementsByClassName('cke_button_ipsemoticon')[0], 'cke_disabled');
		Classes.removeClass(editor.getElementsByClassName('cke_button_bold')[0], 'cke_disabled');
		Classes.removeClass(editor.getElementsByClassName('cke_button_italic')[0], 'cke_disabled');
		Classes.removeClass(editor.getElementsByClassName('cke_button_underline')[0], 'cke_disabled');
		Classes.removeClass(editor.getElementsByClassName('cke_button_strike')[0], 'cke_disabled');
		Classes.removeClass(editor.getElementsByClassName('cke_button_subscript')[0], 'cke_disabled');
		Classes.removeClass(editor.getElementsByClassName('cke_button_superscript')[0], 'cke_disabled');
		Classes.removeClass(editor.getElementsByClassName('cke_button_bulletedlist')[0], 'cke_disabled');
		Classes.removeClass(editor.getElementsByClassName('cke_button_numberedlist')[0], 'cke_disabled');
		Classes.removeClass(editor.getElementsByClassName('cke_button_link')[0], 'cke_disabled');
		Classes.removeClass(editor.getElementsByClassName('cke_button_image')[0], 'cke_disabled');
		Classes.removeClass(editor.getElementsByClassName('cke_button_ipscode')[0], 'cke_disabled');
		Classes.removeClass(editor.getElementsByClassName('cke_button_ipsquote')[0], 'cke_disabled');
		Classes.removeClass(editor.getElementsByClassName('cke_button_indent')[0], 'cke_disabled');
		Classes.removeClass(editor.getElementsByClassName('cke_button_justifycenter')[0], 'cke_disabled');
		Classes.removeClass(editor.getElementsByClassName('cke_button_justifyright')[0], 'cke_disabled');

		if (!Classes.hasClass(editor.getElementsByClassName('cke_button_ipssource')[0], 'bbcode-parsed')) {
			plaintextParser(editor);
		}
	}

	var buttonParseHandler = function() {
		setTimeout(function() {
			var checker = setInterval(function() {
				if (Classes.hasClass(editor.getElementsByClassName('cke_button_ipssource')[0], 'cke_on')) {
					Classes.removeClass(editor.getElementsByClassName('cke_button_ipsbbcode')[0], 'cke_disabled');
					Classes.removeClass(editor.getElementsByClassName('cke_font')[0], 'cke_disabled');
					Classes.removeClass(editor.getElementsByClassName('cke_fontSize')[0], 'cke_disabled');
					Classes.removeClass(editor.getElementsByClassName('cke_button_textcolor')[0], 'cke_disabled');
					Classes.removeClass(editor.getElementsByClassName('cke_button_ipsemoticon')[0], 'cke_disabled');
					Classes.removeClass(editor.getElementsByClassName('cke_button_bold')[0], 'cke_disabled');
					Classes.removeClass(editor.getElementsByClassName('cke_button_italic')[0], 'cke_disabled');
					Classes.removeClass(editor.getElementsByClassName('cke_button_underline')[0], 'cke_disabled');
					Classes.removeClass(editor.getElementsByClassName('cke_button_strike')[0], 'cke_disabled');
					Classes.removeClass(editor.getElementsByClassName('cke_button_subscript')[0], 'cke_disabled');
					Classes.removeClass(editor.getElementsByClassName('cke_button_superscript')[0], 'cke_disabled');
					Classes.removeClass(editor.getElementsByClassName('cke_button_bulletedlist')[0], 'cke_disabled');
					Classes.removeClass(editor.getElementsByClassName('cke_button_numberedlist')[0], 'cke_disabled');
					Classes.removeClass(editor.getElementsByClassName('cke_button_link')[0], 'cke_disabled');
					Classes.removeClass(editor.getElementsByClassName('cke_button_image')[0], 'cke_disabled');
					Classes.removeClass(editor.getElementsByClassName('cke_button_ipscode')[0], 'cke_disabled');
					Classes.removeClass(editor.getElementsByClassName('cke_button_ipsquote')[0], 'cke_disabled');
					Classes.removeClass(editor.getElementsByClassName('cke_button_indent')[0], 'cke_disabled');
					Classes.removeClass(editor.getElementsByClassName('cke_button_justifycenter')[0], 'cke_disabled');
					Classes.removeClass(editor.getElementsByClassName('cke_button_justifyright')[0], 'cke_disabled');

					if (!Classes.hasClass(editor.getElementsByClassName('cke_button_ipssource')[0], 'bbcode-parsed')) {
						plaintextParser(editor);
					}
					clearTimeout(checker);
				}
			}, 10);
		}, 100);
		
		var smileyTray = editor.parentNode.parentNode.parentNode.parentNode.getElementsByClassName('ipsSmileyTray')[0];

		if (smileyTray != null) {
			fade(smileyTray, 'out', 100);
		}
	};

	Events.selector(editor.getElementsByClassName('cke_button_ipssource')[0]).add('click', 'parseBBCode', buttonParseHandler, false);
}

var initBBCodeHandler = function(event) {
	var instance;

	if (isChildOf('.cke_editor', event.target)) {
		instance = getParent('.cke_editor', event.target);
	} else {
		return false;
	}

	if (Classes.hasClass(instance, 'plaintextBBCode')) {
		return false;
	}

	if (Classes.hasClass(instance.getElementsByClassName('cke_button_ipssource')[0], 'cke_on') && Classes.hasClass(instance.getElementsByClassName('cke_button_bold')[0], 'cke_disabled')) {
		plaintextBBCode(instance);
		console.log('Plaintext BBCode initilized on:', instance);
		Classes.addClass(instance, 'plaintextBBCode');
	}
};

if (document.body.id === 'ipboard_body') {
	Events.selector(document).add('mouseover', 'initBBCode', initBBCodeHandler, false);
}