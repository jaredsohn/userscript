// ==UserScript==
// @name	IP.Chat - Nickname Users
// @namespace	Makaze
// @include	*
// @grant	none
// @version	1.0
// ==/UserScript==

var MakazeScriptStyles,
IPChatMenuItems,
reference,
nicknamedUsersMenu,
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

function nickname(userID, nick, elem, isNicknamed) {
	var currRef,
	nickInList,
	username,
	opts = (localStorage.getItem('MakazeScriptOptions')) ? JSON.parse(localStorage.getItem('MakazeScriptOptions')) : {},
	nicknameList = (opts.hasOwnProperty('ipc_nickname_list')) ? opts.ipc_nickname_list : [],
	i = 0,
	j = 0;

	if (typeof isNicknamed === 'undefined') {
		isNicknamed = false;

		for (i = 0; i < nicknameList.length; i++) {
			if (nicknameList[i].user === userID) {
				isNicknamed = true;
				break;
			}
		}
	}

	if (arguments.length > 2) {
		currRef = elem;
	} else {
		currRef = document.getElementById(document.getElementById('nickname_' + userID).parentNode.parentNode.id.split('_menucontent')[0]);
	}

	nickInList = currRef.getElementsByClassName('nickname')[0];

	if (nickInList != null) {
		nickInList.childNodes[0].nodeValue = nick;
	} else {
		currRef.appendChild(document.createTextNode(' '));
		currRef.appendChild(createElement('span', function(span) {
			span.className = 'nickname';
			span.appendChild(document.createTextNode(nick));
		}));
	}

	for (j = 0; j < document.getElementsByClassName('nicknamedUser' + userID).length; j++) {
		document.getElementsByClassName('nicknamedUser' + userID)[j].childNodes[0].nodeValue = nick;
	}

	if (isNicknamed) {
		nicknameList[i].nick = nick;
	} else {
		username = currRef.getElementsByTagName('span')[0].textContent.trim();

		nicknameList.push({ 'user': userID, 'name': username, 'nick': nick });
	}

	document.getElementById('unnickname_' + userID).style.display = '';

	opts.ipc_nickname_list = nicknameList;
	localStorage.setItem('MakazeScriptOptions', JSON.stringify(opts));
	
	getNicknamedUsers();
}

function removeNick(userID, elem) {
	var currRef,
	nickInList,
	opts = (localStorage.getItem('MakazeScriptOptions')) ? JSON.parse(localStorage.getItem('MakazeScriptOptions')) : {},
	nicknameList = (opts.hasOwnProperty('ipc_nickname_list')) ? opts.ipc_nickname_list : [],
	i = 0;

	for (i = 0; i < nicknameList.length; i++) {
		if (nicknameList[i].user === userID) {
			break;
		}
	}

	if (arguments.length > 2) {
		currRef = elem;
	} else {
		currRef = document.getElementById(document.getElementById('nickname_' + userID).parentNode.parentNode.id.split('_menucontent')[0]);
	}

	nickInList = currRef.getElementsByClassName('nickname')[0];

	if (nickInList != null) {
		nickInList.remove();
	}

	while (document.getElementsByClassName('nicknamedUser' + userID)[0] != null) {
		document.getElementsByClassName('nicknamedUser' + userID)[0].previousSibling.nodeValue = document.getElementsByClassName('nicknamedUser' + userID)[0].previousSibling.nodeValue.slice(0, -1);
		document.getElementsByClassName('nicknamedUser' + userID)[0].remove();
	}

	document.getElementById('unnickname_' + userID).style.display = 'none';

	opts.ipc_nickname_list.splice(i, 1);

	localStorage.setItem('MakazeScriptOptions', JSON.stringify(opts));
	
	getNicknamedUsers();
}

function createNicknameOptions(reference) {
	if (document.getElementById(reference.id + '_menucontent').getElementsByTagName('a')[0] == null) {
		return false;
	}

	var userID = reference.parentNode.parentNode.getElementsByTagName('a')[0].id.split('link_')[1],
	opts = (localStorage.getItem('MakazeScriptOptions')) ? JSON.parse(localStorage.getItem('MakazeScriptOptions')) : {},
	nicknameList = (opts.hasOwnProperty('ipc_nickname_list')) ? opts.ipc_nickname_list : [],
	changeNicknameOption,
	removeNicknameOption,
	menuParent = document.getElementById(reference.id + '_menucontent'),
	username = reference.getElementsByTagName('span')[0].textContent.trim(),
	isNicknamed = false,
	i = 0;

	changeNicknameOption = createElement('li', function(option) {
		option.setAttribute('style', 'z-index: 10000;');
		option.appendChild(createElement('a', function(link) {
			link.href = 'javascript:void(0)';
			link.className = 'nickname_user';
			link.id = 'nickname_' + userID;
			link.title = 'Add/Change Nickname';
			link.setAttribute('style', 'z-index: 10000;');

			link.appendChild(createElement('img', function(icon) {
				icon.src = 'http://i.minus.com/iRdCI3MO4Vlvn.png';
				icon.alt = 'Icon';
				icon.style.zIndex = 10000;
				icon.style.height = '16px';
			}));

			link.appendChild(document.createTextNode(' Add/Change Nickname'));

			link.onclick = function() {
				var user = this.id.split('nickname_')[1],
				nickRequest = createElement('div', function(request) {
					request.id = 'nick_request';
					request.className = 'MakazeScriptMenu';
					request.style.display = 'none';

					request.appendChild(createElement('h3', function(title) {
						title.appendChild(document.createTextNode('New nickname for: '));
						title.appendChild(createElement('span', function(usrname) {
							usrname.id = 'nick_request_user';
							usrname.appendChild(document.createTextNode(username));
						}));
					}));

					request.appendChild(createElement('div', function(cont) {
						cont.appendChild(createElement('input', function(input) {
							input.id = 'nick_request-new_nick';
							input.type = 'text';
							input.style.width = '100%';
							input.placeholder = 'New nickname';
							input.addEventListener('keydown', function(e) {
								if (e.keyCode === 13) {
									document.getElementById('nick_request_submit').click();
								}
							}, false);
						}));
					}));

					request.appendChild(createElement('div', function(footer) {
						footer.className = 'submitButtons';

						footer.appendChild(createElement('a', function(okay) {
							okay.id = 'nick_request_submit';
							okay.className = 'ipsButton_secondary';
							okay.style.marginRight = '5px';
							okay.href = 'javascript:void(0)';
							okay.title = 'OK';
							okay.appendChild(document.createTextNode('OK'));
							okay.onclick = function() {
								nickname(user, document.getElementById('nick_request-new_nick').value, reference);

								fade(document.getElementById('nick_request'), 'out');
								setTimeout(function() {
									document.getElementById('nick_request').remove();
								}, 310);
							};
						}));

						footer.appendChild(createElement('a', function(cancel) {
							cancel.className = 'ipsButton_secondary';
							cancel.href = 'javascript:void(0)';
							cancel.title = 'Cancel';
							cancel.appendChild(document.createTextNode('Cancel'));
							cancel.onclick = function() {
								fade(document.getElementById('nick_request'), 'out');
								setTimeout(function() {
									document.getElementById('nick_request').remove();
								}, 310);
							};
						}));
					}));
				});
				
				document.body.appendChild(nickRequest);

				fade(document.getElementById('nick_request'), 'in');

				document.getElementById('nick_request-new_nick').focus();
			};
		}));
	});

	for (i = 0; i < nicknameList.length; i++) {
		if (nicknameList[i].user === userID) {
			isNicknamed = true;
			break;
		}
	}

	menuParent.appendChild(changeNicknameOption);

	removeNicknameOption = createElement('li', function(option) {
		option.setAttribute('style', 'z-index: 10000;');
		option.appendChild(createElement('a', function(link) {
			link.href = 'javascript:void(0)';
			link.className = 'unnickname_user';
			link.id = 'unnickname_' + userID;
			link.title = 'Remove Nickname';
			link.setAttribute('style', 'z-index: 10000;');
			link.style.display = (isNicknamed) ? '' : 'none';

			link.appendChild(createElement('img', function(icon) {
				icon.src = leaveImgSrc;
				icon.alt = 'Icon';
				icon.style.zIndex = 10000;
			}));

			link.appendChild(document.createTextNode(' Remove Nickname'));

			link.onclick = function() {
				var user = this.id.split('unnickname_')[1];
				removeNick(user, reference);
			};
		}));	
	});

	menuParent.appendChild(removeNicknameOption);

	if (isNicknamed) {
		reference.appendChild(document.createTextNode(' '));
		reference.appendChild(createElement('span', function(span) {
			span.className = 'nickname';
			span.appendChild(document.createTextNode(nicknameList[i].nick));
		}));

		if (nicknameList[i].name !== username) {
			opts.ipc_nickname_list[i].name = username;
			localStorage.setItem('MakazeScriptOptions', JSON.stringify(opts));
		}
	}
}

function getNicknamedUsers() {
	var container = document.getElementById('nicknamedUsers').getElementsByClassName('scrollableContent')[0],
	opts = (localStorage.getItem('MakazeScriptOptions')) ? JSON.parse(localStorage.getItem('MakazeScriptOptions')) : {},
	nicknameList = (opts.hasOwnProperty('ipc_nickname_list')) ? opts.ipc_nickname_list : [],
	ID,
	username,
	nick,
	i = 0;

	empty(container);

	function createNick(id, name, nick) {
		return createElement('a', function(link) {
			link.setAttribute('data-userid', id);
			link.href = 'javascript:void(0)';
			link.title = 'Remove Nickname';
			link.style.whiteSpace = 'pre';

			link.appendChild(createElement('img', function(img) {
				img.src = leaveImgSrc;
			}));

			link.appendChild(document.createTextNode(' ' + nick + ' => ' + name));

			link.onclick = function() {
				removeNick(id);
				fade(this, 'out');
			};
		});
	}

	for (i = 0; i < nicknameList.length; i++) {
		ID = nicknameList[i].user;
		username = nicknameList[i].name;
		nick = nicknameList[i].nick;

		container.appendChild(createNick(ID, username, nick));
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
		'#nicknamedUsers {\n' +
			'margin-left: -168px;\n' +
			'margin-top: -110px;\n' +
		'}\n\n' +

		'#nicknamedUsers .scrollableContent > a {\n' +
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

		'#nicknamedUsers .scrollableContent > a > img {\n' +
			'height: 12px;\n' +
		'}\n\n' +

		'.nickname {\n' +
			'font-weight: lighter;\n' +
		'}\n\n' +

		'.nickname:before {\n' +
			'content: \'(\'\n' +
		'}\n\n' +

		'.nickname:after {\n' +
			'content: \')\'\n' +
		'}\n\n' +

		'#nick_request {\n' +
			'width: 250px;\n' +
			'margin-left: -135px;\n' +
			'margin-top: -52px;\n' +
		'}\n\n' +

		'#nick_request h3 {\n' +
			'margin-bottom: 1em;\n' +
		'}\n\n' +

		'#nick_request .submitButtons {\n' +
			'text-align: right;\n' +
			'margin-top: 10px;\n' +
		'}';

	// Menu creation

	nicknamedUsersMenu = createElement('div', function(menu) {
		menu.id = 'nicknamedUsers';
		menu.className = 'MakazeScriptMenu';
		menu.style.display = 'none';

		menu.appendChild(createElement('div', function(title) {
			title.className = 'menuTitle';
			title.appendChild(document.createTextNode('Nicknames'));
		}));

		menu.appendChild(createElement('div', function(scroll) {
			scroll.className = 'scrollableContent';
		}));

		menu.appendChild(createElement('div', function(save) {
			save.className = 'menu-save';

			save.appendChild(createElement('a', function(link) {
				link.href = 'javascript:void(0)';
				link.id = 'nicknamedUsers_close';
				link.appendChild(document.createTextNode('Close'));
				link.onclick = function() {
					fade(this.parentNode.parentNode, 'out');
				};
			}));
		}));
	});

	document.body.appendChild(nicknamedUsersMenu);

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
		button.id = 'nicknamedUsersMenuButton';
		button.className = 'ipsButton_secondary';
		button.href = 'javascript:void(0)';
		button.style.marginTop = '10px';
		button.appendChild(document.createTextNode('Manage Nicknames'));

		button.onclick = function() {
			var menu = document.getElementById('nicknamedUsers');

			if (menu.style.display === 'none') {
				getNicknamedUsers();
			}

			fade(menu);
		};
	});
	
	document.getElementById('IPChatMenuItems').appendChild(menuButton);

	// Get leaving image source

	leaveImgSrc = document.getElementById('leave_room').getElementsByTagName('img')[0].src;

	// Add nicknaming links

	if (document.getElementById('chatters-online-wrap') != null) {
		for (i = 0; i < document.getElementById('chatters-online-wrap').getElementsByClassName('chatmodmenu').length; i++) {
			reference = document.getElementById('chatters-online-wrap').getElementsByClassName('chatmodmenu')[i];
			createNicknameOptions(reference);
		}
	}

	document.addEventListener('DOMNodeInserted', function(event) {
		// Add nicknaming links to new users

		if (event.target.nodeType === 1 && Classes.hasClass(event.target, 'kickmenu')) {
			var checkForPartner = setInterval(function() {
				var link = document.getElementById(event.target.id.split('_menucontent')[0]);
				if (link != null) {
					createNicknameOptions(link);
					clearTimeout(checkForPartner);
				}
			}, 1);
			return false;
		}

		// Nickname users in chat

		if (event.target.nodeType !== 1 || event.target.id !== 'storage_chatroom') {
			return false;
		}

		var opts = (localStorage.getItem('MakazeScriptOptions')) ? JSON.parse(localStorage.getItem('MakazeScriptOptions')) : {},
		nicknameList = (opts.hasOwnProperty('ipc_nickname_list')) ? opts.ipc_nickname_list : [],
		latestNick,
		i = 0;

		if (!nicknameList.length) {
			return false;
		}

		latestNick = event.target.parentNode.getElementsByTagName('label')[event.target.parentNode.getElementsByTagName('label').length - 1];

		if (!Classes.hasClass(latestNick.parentNode, 'post')) {
			return false;
		}

		if (latestNick.getElementsByClassName('nickname')[0] != null) {
			return false;
		}

		function createNickInChat(index) {
			return createElement('span', function(span) {
				span.className = 'nickname nicknamedUser' + nicknameList[index].user;
				span.appendChild(document.createTextNode(nicknameList[index].nick));
			});
		}

		for (i = 0; i < nicknameList.length; i++) {
			if (nicknameList[i].name === latestNick.textContent.trim()) {
				latestNick.appendChild(document.createTextNode(' '));
				latestNick.appendChild(createNickInChat(i));
				break;
			}
		}
	});
}