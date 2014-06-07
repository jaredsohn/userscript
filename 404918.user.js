// ==UserScript==
// @name	IP.Chat Logs
// @namespace	Makaze
// @include	*
// @grant	none
// @version	1.3.2
// ==/UserScript==

var IPChatMenuItems,
menuButton,
logs,
CAPACITY = 5242880,
filled = 0,
occupied = 0,
i = 0;

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

function dateAndTime(which) {
	var currentdate = new Date(),
	output;

	which = which || 'default';
	
	switch (which) {
		case 'time':
			output = ((currentdate.getHours() < 10) ? '0' + currentdate.getHours() : currentdate.getHours()) + ":"
				+ ((currentdate.getMinutes() < 10) ? '0' + currentdate.getMinutes() : currentdate.getMinutes()) + ":"
				+ ((currentdate.getSeconds() < 10) ? '0' + currentdate.getSeconds() : currentdate.getSeconds());
		break;
		case 'date':
			output = (((currentdate.getMonth() + 1) < 10) ? '0' + (currentdate.getMonth() + 1)  : (currentdate.getMonth() + 1)) + "/"
				+ ((currentdate.getDate() < 10) ? '0' + currentdate.getDate() : currentdate.getDate()) + "/"
				+ currentdate.getFullYear();
		break;
		default:
			output = ((currentdate.getHours() < 10) ? '0' + currentdate.getHours() : currentdate.getHours()) + ":"
				+ ((currentdate.getMinutes() < 10) ? '0' + currentdate.getMinutes() : currentdate.getMinutes()) + ":"
				+ ((currentdate.getSeconds() < 10) ? '0' + currentdate.getSeconds() : currentdate.getSeconds())
				+ ' on '
				+ (((currentdate.getMonth() + 1) < 10) ? '0' + (currentdate.getMonth() + 1)  : (currentdate.getMonth() + 1)) + "/"
				+ ((currentdate.getDate() < 10) ? '0' + currentdate.getDate() : currentdate.getDate()) + "/"
				+ currentdate.getFullYear();
	}
	return output;
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

function roundToNthDecimal(d, n) {
	return Math.round(d * Math.pow(10, n)) / Math.pow(10, n);
}

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

function createLog(logs, i) {
	return createElement('div', function(el) {
		el.className = 'log';

		el.appendChild(createElement('div', function(del) {
			del.className = 'delete';
			del.appendChild(document.createTextNode('Delete'));
			del.onclick = function() {
				deleteLog(this.parentNode, logs[i].initiated);
			};
		}));

		el.appendChild(document.createTextNode('-----\nLog started at [' + logs[i].initiated + ']\n-----\n'));

		el.appendChild(createElement('span', function(content) {
			content.innerHTML = logs[i].log;
		}));
	});
}

function deleteLog(logElement, date) {
	var logs = JSON.parse(localStorage.getItem('IP.Chat Logs')),
	CAPACITY = 5242880,
	filled = 0;

	var confirmContent = createElement('span', function(cont) {
		cont.appendChild(document.createTextNode('Are you sure? '));

		cont.appendChild(createElement('a', function(yes) {
			yes.id = 'yes';
			yes.href = 'javascript:void(0)';
			yes.appendChild(document.createTextNode('[Yes]'));
			yes.onclick = function() {
				var i = 0;

				document.getElementById('confirm').style.opacity = 0;
				document.getElementById('screen').style.opacity = 0;
				setTimeout(function() {
					document.getElementById('confirm').style.display = 'none';
					document.getElementById('screen').style.display = 'none';
				}, 300);

				for (i = 0; i < logs.length; i++) {
					if (logs[i].initiated === date) {
						logs.splice(i, 1);
						localStorage.setItem('IP.Chat Logs', JSON.stringify(logs));
						break;
					}
				}

				for (i = 0; i < localStorage.length; i++) {
					filled += localStorage.getItem(localStorage.key(i)).length;
				}
				occupied = roundToNthDecimal((filled / CAPACITY) * 100, 1);
				document.getElementById('space').childNodes[0].nodeValue = occupied + '% full';

				logElement.className = logElement.className + ' deleted';
				if (logElement.nextSibling) {
					logElement.nextSibling.remove();
				} else {
					logElement.previousSibling.remove();
				}
				setTimeout(function() {
					logElement.remove();
				}, 500);
			};
		}));

		cont.appendChild(document.createTextNode(' '));

		cont.appendChild(createElement('a', function(no) {
			no.id = 'no';
			no.href = 'javascript:void(0)';
			no.appendChild(document.createTextNode('[Cancel]'));
			no.onclick = function() {
				document.getElementById('confirm').style.opacity = 0;
				document.getElementById('screen').style.opacity = 0;
				setTimeout(function() {
					document.getElementById('confirm').style.display = 'none';
					document.getElementById('screen').style.display = 'none';
				}, 300);
			};
		}));
	});

	empty(document.getElementById('confirm'));

	document.getElementById('confirm').appendChild(confirmContent);

	document.getElementById('screen').style.display = 'block';
	document.getElementById('confirm').style.display = 'block';
	setTimeout(function() {
		document.getElementById('screen').style.opacity = 1;
		document.getElementById('confirm').style.opacity = 1;
	}, 1);
}

function deleteAllLogs() {
	var CAPACITY = 5242880,
	filled = 0,
	logElement;

	var confirmContent = createElement('span', function(cont) {
		cont.appendChild(document.createTextNode('Are you sure? '));

		cont.appendChild(createElement('a', function(yes) {
			yes.id = 'yes';
			yes.href = 'javascript:void(0)';
			yes.appendChild(document.createTextNode('[Yes]'));
			yes.onclick = function() {
				var i = 0;
				document.getElementById('confirm').style.opacity = 0;
				document.getElementById('screen').style.opacity = 0;
				setTimeout(function() {
					document.getElementById('confirm').style.display = 'none';
					document.getElementById('screen').style.display = 'none';
				}, 300);

				localStorage.removeItem('IP.Chat Logs');

				for (i = 0; i < localStorage.length; i++) {
					filled += localStorage.getItem(localStorage.key(i)).length;
				}
				occupied = roundToNthDecimal((filled / CAPACITY) * 100, 1);
				document.getElementById('space').childNodes[0].nodeValue = occupied + '% full';

				var waitHandler = function() {
					logElement.remove();
				};

				for (i = 0; i < document.getElementsByClassName('log').length; i++) {
					logElement = document.getElementsByClassName('log')[i];
					logElement.className = logElement.className + ' deleted';
					if (logElement.nextSibling) {
						logElement.nextSibling.remove();
					} else {
						logElement.previousSibling.remove();
					}
					setTimeout(waitHandler, 500);
				}
			};
		}));

		cont.appendChild(document.createTextNode(' '));

		cont.appendChild(createElement('a', function(no) {
			no.id = 'no';
			no.href = 'javascript:void(0)';
			no.appendChild(document.createTextNode('[Cancel]'));
			no.onclick = function() {
				document.getElementById('confirm').style.opacity = 0;
				document.getElementById('screen').style.opacity = 0;
				setTimeout(function() {
					document.getElementById('confirm').style.display = 'none';
					document.getElementById('screen').style.display = 'none';
				}, 300);
			};
		}));
	});

	empty(document.getElementById('confirm'));

	document.getElementById('confirm').appendChild(confirmContent);

	document.getElementById('screen').style.display = 'block';
	document.getElementById('confirm').style.display = 'block';
	setTimeout(function() {
		document.getElementById('screen').style.opacity = 1;
		document.getElementById('confirm').style.opacity = 1;
	}, 1);
}

if (document.body.id === 'ipboard_body' && document.getElementById('chat-form') != null) {
	var nick,
	curr,
	append = '';

	logs = (localStorage.getItem('IP.Chat Logs')) ? JSON.parse(localStorage.getItem('IP.Chat Logs')) : [];

	for (i = 0; i < localStorage.length; i++) {
		filled += localStorage.getItem(localStorage.key(i)).length;
	}

	if (filled + JSON.stringify({'initiated': dateAndTime(), 'log': ''}).length >= CAPACITY) {
		logs.splice(0, 1);
	}

	logs.push({'initiated': dateAndTime(), 'log': ''});

	localStorage.setItem('IP.Chat Logs', JSON.stringify(logs));

	document.addEventListener('DOMNodeInserted', function(event) {
		if (event.target.nodeType !== 1 || event.target.id !== 'storage_chatroom') {
			return false;
		}

		var latestMessage,
		latestMessageText,
		logs = JSON.parse(localStorage.getItem('IP.Chat Logs')),
		CAPACITY = 5242880,
		filled = 0,
		i = 0;

		latestMessage = event.target.parentNode.getElementsByTagName('div')[event.target.parentNode.getElementsByTagName('div').length - 1];

		if (!Classes.hasClass(latestMessage.parentNode, 'post')) {
			return false;
		}

		latestMessageText = latestMessage.innerHTML.replace(/<br>/gi, '<br>\t');

		if (!latestMessageText.length) {
			return false;
		}

		nick = null;

		if (Classes.hasClass(latestMessage.parentNode, 'chat-moderator')) {
			if (latestMessage.parentNode.getElementsByTagName('label')[0] != null) {
				nick = latestMessage.parentNode.getElementsByTagName('label')[0].innerHTML;
			} else {
				nick = '';
			}
		}

		curr = latestMessage.parentNode;

		while (nick === null) {
			if (curr.getElementsByTagName('label').length) {
				nick = curr.getElementsByTagName('label')[0].innerHTML;
			} else {
				curr = curr.previousSibling;
			}
		}

		for (i = 0; i < localStorage.length; i++) {
			filled += localStorage.getItem(localStorage.key(i)).length;
		}

		if (Classes.hasClass(latestMessage.parentNode, 'chat-me')) {
			append = '\n[' + dateAndTime('time') + '] **' + nick + ' ' + latestMessageText.substr(2, latestMessageText.length - 4) + '**';
		} else if (Classes.hasClass(latestMessage.parentNode, 'chat-notice')) {
			append = '\n[' + dateAndTime('time') + '] ' + nick + ' ' + latestMessageText.substr(2, latestMessageText.length - 2);
		} else if (Classes.hasClass(latestMessage.parentNode, 'chat-message')) {
			append = '\n[' + dateAndTime('time') + '] ' + nick + ': ' + latestMessageText;
		} else {
			if (nick.length) {
				append = '\n[' + dateAndTime('time') + '] ' + nick + ' ' + latestMessageText;
			} else {
				append = '\n[' + dateAndTime('time') + '] ' + latestMessageText;
			}
		}

		logs[logs.length - 1].log += append;

		if (filled + append.length >= CAPACITY) {
			logs.splice(0, 1);
		}
		localStorage.setItem('IP.Chat Logs', JSON.stringify(logs));
	});

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
		button.id = 'viewIPChatLogs';
		button.className = 'ipsButton_secondary';
		button.href = window.location.origin + '/IP.Chat_Logs';
		button.target = '_blank';
		button.style.marginTop = '10px';
		button.appendChild(document.createTextNode('View Logs'));
	});

	document.getElementById('IPChatMenuItems').appendChild(menuButton);
}

if (window.location.href === window.location.origin + '/IP.Chat_Logs' && localStorage.getItem('IP.Chat Logs')) {
	var style,
	funcs;

	logs = JSON.parse(localStorage.getItem('IP.Chat Logs'));

	style = createElement('style', function(el) {
		el.type = 'text/css';
		el.appendChild(document.createTextNode(
			'#screen {\n' +
				'position: fixed;\n' +
				'height: 100%;\n' +
				'width: 100%;\n' +
				'background-color: rgba(0, 0, 0, .7);\n' +
				'top: 0px;\n' +
				'left: 0px;\n' +
				'transition: all .3s ease-in-out;\n' +
				'opacity: 0;\n' +
				'display: none;\n' +
			'}\n\n' +

			'#confirm {\n' +
				'position: fixed;\n' +
				'font-size: 3em;\n' +
				'background-color: rgba(255, 255, 255, .9);\n' +
				'box-shadow: 0px 0px 3px;\n' +
				'height: 40px;\n' +
				'line-height: 40px;\n' +
				'width: 620px;\n' +
				'text-align: center;\n' +
				'top: 50%;\n' +
				'left: 50%;\n' +
				'margin-top: -32px;\n' +
				'margin-left: -350px;\n' +
				'padding: 10px 20px;\n' +
				'border-radius: 5px;\n' +
				'transition: all .3s ease-in-out;\n' +
				'opacity: 0;\n' +
				'display: none;\n' +
			'}\n\n' +

			'#space {\n' +
				'font-size: 20px;\n' +
			'}\n\n' +

			'#logs {\n' +
				'margin: 8px 0;\n' +
				'padding: 10px;\n' +
				'background-color: #fcfcfc;\n' +
			'}\n\n' +

			'#logs img.bbc {\n' +
				'vertical-align: middle;\n' +
			'}\n\n' +

			'#logs > .log {\n' +
				'transition: all .3s ease-in-out;\n' +
				'overflow: hidden;\n' +
			'}\n\n' +

			'#logs > .log:hover {\n' +
			//	'background-color: #f5f5f5;\n' +
			'}\n\n' +

			'.delete {\n' +
			//	'display: none;\n' +
				'float: right;\n' +
				'background-color: #444;\n' +
				'padding: 3px 5px;\n' +
				'color: #eee;\n' +
				'font-size: 15px;\n' +
				'letter-spacing: 2px;\n' +
				'text-transform: uppercase;\n' +
				'cursor: pointer;\n' +
			'}\n\n' +

			'.delete:hover {\n' +
				'background-color: #222;\n' +
			'}\n\n' +

			'.deleted {\n' +
				'background-color: #222 ! important;\n' +
				'color: #eee ! important;\n' +
				'font-size: 0px ! important;\n' +
			'}\n\n' +

			'.deleted > * {\n' +
				'display: none;\n' +
			'}'
		));
	});

	document.title = 'IP.Chat Logs';
	document.body.style.fontFamily = 'monospace';
	document.head.appendChild(style);

	// Body creation

	empty(document.body);

	document.body.appendChild(createElement('div', function(filter) {
		filter.id = 'screen';
	}));

	document.body.appendChild(createElement('div', function(confirm) {
		confirm.id = 'confirm';
	}));

	document.body.appendChild(createElement('div', function(space) {
		space.id = 'space';

		space.appendChild(document.createTextNode('0% full'));

		space.appendChild(createElement('span', function(delete_all) {
			delete_all.id = 'delete_all';
			delete_all.className = 'delete';
			delete_all.appendChild(document.createTextNode('Delete All'));
			delete_all.onclick = deleteAllLogs;
		}));

		space.appendChild(createElement('span', function(hide) {
			hide.id = 'hide_non-logs';
			hide.className = 'delete';
			hide.style.marginRight = '10px';
			hide.appendChild(document.createTextNode('Hide Non-Logs'));
			hide.onclick = function() {
				var i = 0,
				deletes;

				fade(document.getElementById('space'), 'out');
				for (i = 0, deletes = document.getElementsByClassName('delete'); i < deletes.length; i++) {
					fade(deletes[i], 'out');
				}
			};
		}));
	}));

	document.body.appendChild(createElement('pre', function(pre) {
		pre.id = 'logs';
	}));

	for (i = 0; i < localStorage.length; i++) {
		filled += localStorage.getItem(localStorage.key(i)).length;
	}
	occupied = roundToNthDecimal((filled / CAPACITY) * 100, 1);
	document.getElementById('space').childNodes[0].nodeValue = occupied + '% full';

	for (i = 0; i < logs.length; i++) {
		if (document.getElementById('logs').hasChildNodes()) {
			document.getElementById('logs').appendChild(document.createTextNode('\n'));
		}

		document.getElementById('logs').appendChild(createLog(logs, i));
	}
}