// ==UserScript==
// @name	IP.Chat - Convert Smilies to Text
// @namespace	Makaze
// @include	*
// @grant	none
// @version	1.0
// ==/UserScript==

var opts,
keep_colons,
show_small_smilies,
style,
smilies,
rows,
text,
image,
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

function createElement(type, callback) {
	var element = document.createElement(type);

	callback(element);

	return element;
}

function replaceImage(img, alt) {
	img.parentNode.insertBefore(createElement('span', function(text) {
		if (style) {
			text.setAttribute('style', style);
		}
		text.appendChild(document.createTextNode(alt));
	}), img);
	img.style.display = 'none';
}

if (document.body.id === 'ipboard_body' && document.getElementById('storage_chatroom') != null) {
	opts = (localStorage.getItem('MakazeScriptOptions')) ? JSON.parse(localStorage.getItem('MakazeScriptOptions')) : {};
	keep_colons = (opts.hasOwnProperty('ipc_replace_smilies_keep_colons')) ? opts.ipc_replace_smilies_keep_colons : true;
	show_small_smilies = (opts.hasOwnProperty('ipc_replace_smilies_show_small_smilies')) ? opts.ipc_replace_smilies_show_small_smilies : true;
	style = (opts.hasOwnProperty('ipc_replace_smilies_style')) ? opts.ipc_replace_smilies_style : false;
	smilies = {};

	if (document.getElementById('emoticons_custom_menu_menucontent').childNodes[0] != null) {
		for (i = 0, rows = document.getElementById('emoticons_custom_menu_menucontent').getElementsByTagName('tr'); i < rows.length; i++) {
			text = rows[i].getElementsByTagName('td')[0].textContent.trim();
			image = rows[i].getElementsByTagName('td')[1].getElementsByTagName('img')[0].src;

			smilies[image] = (keep_colons) ? text : text.replace(/^:/, '').replace(/:$/, '');
		}
	} else {
		document.getElementById('emoticons_custom_menu').click();
		var checkForSmilies = setInterval(function() {
			if (document.getElementById('emoticons_custom_menu_menucontent').getElementsByTagName('img')[0] != null) {
				document.getElementById('emoticons_custom_menu').click();

				for (i = 0, rows = document.getElementById('emoticons_custom_menu_menucontent').getElementsByTagName('tr'); i < rows.length; i++) {
					text = rows[i].getElementsByTagName('td')[0].textContent.trim();
					image = rows[i].getElementsByTagName('td')[1].getElementsByTagName('img')[0].src;

					smilies[image] = (keep_colons) ? text : text.replace(/^:/, '').replace(/:$/, '');
				}

				clearTimeout(checkForSmilies);
			}
		}, 1);
	}

	document.addEventListener('DOMNodeInserted', function(event) {
		var latestMessage,
		images,
		image,
		fontSize,
		i = 0;

		if (event.target.nodeType !== 1 || event.target.id !== 'storage_chatroom') {
			return false;
		}

		latestMessage = event.target.parentNode.getElementsByTagName('div')[event.target.parentNode.getElementsByTagName('div').length - 1];
		fontSize = Number(window.getComputedStyle(latestMessage).fontSize.split('px')[0]);

		if (!Classes.hasClass(latestMessage.parentNode, 'post')) {
			return false;
		}

		if (latestMessage.getElementsByTagName('img')[0] == null) {
			return false;
		}

		for (i = 0, images = latestMessage.getElementsByTagName('img'); i < images.length; i++) {
			image = images[i];
			smiley = (smilies.hasOwnProperty(image.src)) ? smilies[image.src] : image.src.split('/')[image.src.split('/').length - 1];

			if (!show_small_smilies || image.height > fontSize) {
				replaceImage(image, smiley);
			}
		}
	}, false);
}