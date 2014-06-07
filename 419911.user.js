// ==UserScript==
// @name	IP.Chat Ignore
// @namespace	Makaze
// @include	*
// @grant	none
// @version	1.1.7
// ==/UserScript==

var MakazeScriptStyles,
IPChatMenuItems,
reference,
ignoredUsersMenu,
menuButton,
styleElem,
leaveImgSrc,
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

function toggleIgnoreStatus(userID, elem) {
	var currRef,
	ignoreLink,
	isIgnored = false,
	name,
	opts = (localStorage.getItem('MakazeScriptOptions')) ? JSON.parse(localStorage.getItem('MakazeScriptOptions')) : {},
	ignoreList = (opts.hasOwnProperty('ipc_ignores')) ? opts.ipc_ignores : [],
	i = 0,
	j = 0;

	for (i = 0; i < ignoreList.length; i++) {
		if (ignoreList[i].user === userID) {
			isIgnored = true;
			break;
		}
	}

	ignoreLink = document.getElementById('block_all_' + userID);

	if (ignoreLink != null) {
		if (arguments.length > 1) {
			currRef = elem;
		} else {
			currRef = document.getElementById(ignoreLink.parentNode.parentNode.id.split('_menucontent')[0]);
		}

		if (isIgnored) {
			currRef.style.textDecoration = '';
			currRef.style.fontStyle = '';
			ignoreLink.childNodes[1].nodeValue = ' Ignore All Chats';
		} else {
			currRef.style.textDecoration = 'line-through';
			currRef.style.fontStyle = 'oblique';
			ignoreLink.childNodes[1].nodeValue = ' Stop Ignoring All Chats';
		}
	}

	if (isIgnored) {
		for (j = 0; j < document.getElementsByClassName('ignoredUser' + userID).length; j++) {
			document.getElementsByClassName('ignoredUser' + userID)[j].style.display = '';
			Classes.removeClass(document.getElementsByClassName('ignoredUser' + userID)[j], 'ignoredUser' + userID);
		}

		opts.ipc_ignores.splice(i, 1);

		localStorage.setItem('MakazeScriptOptions', JSON.stringify(opts));
	} else {
		if (arguments.length > 1) {
			currRef = elem;
		} else {
			currRef = document.getElementById(ignoreLink.parentNode.parentNode.id.split('_menucontent')[0]);
		}

		name = currRef.getElementsByTagName('span')[0].textContent.trim();

		opts.ipc_ignores.push({ 'user': userID, 'name': name });

		localStorage.setItem('MakazeScriptOptions', JSON.stringify(opts));
	}
	
	getIgnoredUsers();
}

function createIgnoreLink(reference) {
	if (document.getElementById(reference.id + '_menucontent').getElementsByTagName('a')[0] == null) {
		return false;
	}

	var userID = reference.parentNode.parentNode.getElementsByTagName('a')[0].id.split('link_')[1],
	opts = (localStorage.getItem('MakazeScriptOptions')) ? JSON.parse(localStorage.getItem('MakazeScriptOptions')) : {},
	ignoreList = (opts.hasOwnProperty('ipc_ignores')) ? opts.ipc_ignores : [],
	blockCloneSrc = document.getElementById(reference.id + '_menucontent').getElementsByClassName('block_user')[0] || document.getElementById(reference.id + '_menucontent').getElementsByClassName('unblock_user')[0],
	blockClone = blockCloneSrc.parentNode.cloneNode(true),
	blockCloneParent = blockCloneSrc.parentNode.parentNode,
	ignoreLink = blockClone.getElementsByTagName('a')[0],
	name = reference.getElementsByTagName('span')[0].textContent.trim(),
	isIgnored = false,
	i = 0;

	ignoreLink.onclick = null;
	ignoreLink.href = 'javascript:void(0)';
	ignoreLink.className = 'block_all_user';
	ignoreLink.id = 'block_all_' + userID;
	ignoreLink.title = 'Ignore All Chats';

	for (i = 0; i < ignoreList.length; i++) {
		if (ignoreList[i].user === userID) {
			isIgnored = true;
			reference.style.textDecoration = 'line-through';
			reference.style.fontStyle = 'oblique';
			if (ignoreList.name !== name) {
				opts.ipc_ignores[i].name = name;
				localStorage.setItem('MakazeScriptOptions', JSON.stringify(opts));
			}
			break;
		}
	}

	ignoreLink.childNodes[1].nodeValue = (isIgnored) ? ' Stop Ignoring All Chats' : ' Ignore All Chats';

	ignoreLink.onclick = function() {
		var user = this.id.split('block_all_')[1];
		toggleIgnoreStatus(user, reference);
	};

	blockCloneParent.appendChild(blockClone);
}

function getIgnoredUsers() {
	var container = document.getElementById('ignoredUsers').getElementsByClassName('scrollableContent')[0],
	opts = (localStorage.getItem('MakazeScriptOptions')) ? JSON.parse(localStorage.getItem('MakazeScriptOptions')) : {},
	ignoreList = (opts.hasOwnProperty('ipc_ignores')) ? opts.ipc_ignores : [],
	ignoredUsrID,
	ignoredUsrName,
	i = 0;

	empty(container);

	function createUnignore(id, name) {
		return createElement('a', function(link) {
			link.setAttribute('data-userid', id);
			link.href = 'javascript:void(0)';
			link.title = 'Unignore this user';

			link.appendChild(createElement('img', function(img) {
				img.src = leaveImgSrc;
			}));

			link.appendChild(document.createTextNode(' ' + name));

			link.onclick = function() {
				toggleIgnoreStatus(id);
				fade(this, 'out');
			};
		});
	}

	for (i = 0; i < ignoreList.length; i++) {
		ignoredUsrID = ignoreList[i].user;
		ignoredUsrName = ignoreList[i].name;

		container.appendChild(createUnignore(ignoredUsrID, ignoredUsrName));
	}
}

if (document.body.id === 'ipboard_body' && document.getElementById('storage_chatroom') != null) {
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
		'#ignoredUsers {\n' +
			'margin-left: -168px;\n' +
			'margin-top: -110px;\n' +
		'}\n\n' +

		'#ignoredUsers .scrollableContent > a {\n' +
			'display: inline-block;\n' +
			'background-color: #eee;\n' +
			'box-shadow: 0px 0px 3px #aaa;\n' +
			'border: 2px solid #fff;\n' +
			'padding: 1px 4px;\n' +
			'border-radius: 2px;\n' +
			'margin-right: 10px;\n' +
			'margin-bottom: 10px;\n' +
			'font-size: 10px;\n' +
		'}\n\n' +

		'#ignoredUsers .scrollableContent > a > img {\n' +
			'height: 12px;\n' +
		'}';

	// Menu creation

	ignoredUsersMenu = createElement('div', function(menu) {
		menu.id = 'ignoredUsers';
		menu.className = 'MakazeScriptMenu';
		menu.style.display = 'none';

		menu.appendChild(createElement('div', function(title) {
			title.className = 'menuTitle';
			title.appendChild(document.createTextNode('Ignored Users'));
		}));

		menu.appendChild(createElement('div', function(scroll) {
			scroll.className = 'scrollableContent';
		}));

		menu.appendChild(createElement('div', function(save) {
			save.className = 'menu-save';

			save.appendChild(createElement('a', function(link) {
				link.href = 'javascript:void(0)';
				link.id = 'ignoredUsers_close';
				link.appendChild(document.createTextNode('Close'));
				link.onclick = function() {
					fade(this.parentNode.parentNode, 'out');
				};
			}));
		}));
	});

	document.body.appendChild(ignoredUsersMenu);

	getIgnoredUsers();

	// Button creation

	if (document.getElementById('IPChatMenuItems') == null) {
		IPChatMenuItems = createElement('div', function(menu) {
			menu.id = 'IPChatMenuItems';
			menu.style.textAlign = 'right';
		});
		document.getElementById('chatters-online-wrap').nextSibling.nextSibling.getElementsByTagName('ul')[0].appendChild(IPChatMenuItems);
	}

	if (document.getElementById('IPChatMenuItems').innerHTML.length) {
		document.getElementById('IPChatMenuItems').appendChild(document.createElement('br'));
	}

	menuButton = createElement('a', function(button) {
		button.id = 'gnoredUsersMenuButton';
		button.className = 'ipsButton_secondary';
		button.href = 'javascript:void(0)';
		button.style.marginTop = '10px';
		button.appendChild(document.createTextNode('Manage Ignored Users'));

		button.onclick = function() {
			var menu = document.getElementById('ignoredUsers');
			if (menu.style.display === 'none') {
				getIgnoredUsers();
			}
			fade(menu);
		};
	});
	
	document.getElementById('IPChatMenuItems').appendChild(menuButton);

	// Get leaving image source

	leaveImgSrc = document.getElementById('leave_room').getElementsByTagName('img')[0].src;

	// Add ignore links

	if (document.getElementById('chatters-online-wrap') != null) {
		for (i = 0; i < document.getElementById('chatters-online-wrap').getElementsByClassName('chatmodmenu').length; i++) {
			reference = document.getElementById('chatters-online-wrap').getElementsByClassName('chatmodmenu')[i];
			createIgnoreLink(reference);
		}
	}

	document.addEventListener('DOMNodeInserted', function(event) {
		// Add ignore link to new users

		if (event.target.nodeType === 1 && Classes.hasClass(event.target, 'kickmenu')) {
			var checkForPartner = setInterval(function() {
				var link = document.getElementById(event.target.id.split('_menucontent')[0]);
				if (link != null) {
					createIgnoreLink(link);
					clearTimeout(checkForPartner);
				}
			}, 1);
			return false;
		}

		// Ignore messages in chat

		if (event.target.nodeType !== 1 || event.target.id !== 'storage_chatroom') {
			return false;
		}

		var nick,
		curr,
		opts = (localStorage.getItem('MakazeScriptOptions')) ? JSON.parse(localStorage.getItem('MakazeScriptOptions')) : {},
		ignoreList = (opts.hasOwnProperty('ipc_ignores')) ? opts.ipc_ignores : [],
		latestMessage,
		i = 0;

		if (!ignoreList.length) {
			return false;
		}

		latestMessage = event.target.parentNode.getElementsByTagName('div')[event.target.parentNode.getElementsByTagName('div').length - 1];

		if (!Classes.hasClass(latestMessage.parentNode, 'post')) {
			return false;
		}

		if (Classes.hasClass(latestMessage.parentNode, 'chat-moderator')) {
			return false;
		}

		nick = null;

		curr = latestMessage.parentNode;

		while (nick === null) {
			if (curr.getElementsByTagName('label').length) {
				nick = curr.getElementsByTagName('label')[0].textContent;
			} else {
				curr = curr.previousSibling;
			}
		}

		for (i = 0; i < ignoreList.length; i++) {
			if (ignoreList[i].name === nick) {
				latestMessage.parentNode.style.display = 'none';
				Classes.addClass(latestMessage.parentNode, 'ignoredUser' + ignoreList[i].user);
				break;
			}
		}
	});
}