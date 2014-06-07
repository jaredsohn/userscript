// ==UserScript==
// @name	IP.Chat-Specific Theme
// @namespace	Makaze
// @include	*
// @version	1.1.3
// ==/UserScript==

function updateSkin(skinID) {
	var logo,
	i = 0;

	for (i = 0; i < document.getElementsByTagName('link').length; i++) {
		if (document.getElementsByTagName('link')[i].getAttribute('rel') === 'stylesheet' && document.getElementsByTagName('link')[i].href.match(/css_\d+/gi)) {
			document.getElementsByTagName('link')[i].href = document.getElementsByTagName('link')[i].href.replace(/css_\d+/gi, 'css_' + skinID);
		}
	}
	switch (skinID) {
		case 29:
			logo = 'http://serenesforest.net/forums/public/style_images/29_sflogoblue.png';
		break;
		case 27:
			logo = 'http://serenesforest.net/forums/public/style_images/27_serenes_forest_forums_banner.jpg';
		break;
		case 28:
			logo = 'http://serenesforest.net/forums/public/style_images/28_sflogopurp.png';
	}
	document.getElementById('logo').getElementsByTagName('img')[0].src = logo;
}

function insertAfter(referenceNode, newNode) {
	referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
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

function clonedThemeChanger() {
	var buttonToClone = document.getElementById('new_skin'),
	menuToClone = document.getElementById('new_skin_menucontent'),
	clonedButton = buttonToClone.clone(true),
	clonedMenu = menuToClone.clone(true),
	container = document.createElement('li'),
	opts,
	i = 0;

	clonedButton.id = 'new_ipc_skin';
	clonedButton.innerHTML = 'Change IP.Chat Theme';
	clonedButton.href = 'javascript:void(0)';

	clonedMenu.id = 'new_ipc_skin_menucontent';

	container.id = 'ipc_themechanger';
	insertAfter(buttonToClone.parentNode, container);

	document.getElementById('ipc_themechanger').appendChild(clonedButton);
	document.getElementById('ipc_themechanger').appendChild(clonedMenu);
	document.getElementById('rss_feed').onload = function() {
		buttonToClone.click();
		setTimeout(function() {
			buttonToClone.click();
		}, 300);
	};

	document.getElementById('new_ipc_skin').onclick = function() {
		var menu = document.getElementById('new_ipc_skin_menucontent'),
		widthOff = document.getElementById('new_skin').offsetWidth,
		top = document.getElementById('new_skin_menucontent').style.top.split('px')[0],
		left = document.getElementById('new_skin_menucontent').style.left.split('px')[0];
		if (menu.style.display === 'none') {
			this.className = 'menu_active';
			fade(menu, 'in');
			menu.style.top = parseFloat(top) + 'px';
			menu.style.left = parseFloat(left) + widthOff + 6 + 'px';
		} else {
			this.className = '';
			fade(menu, 'out');
		}
	};

	var ipcThemeChangerHandler = function() {
		var nameToLoad = this.textContent,
		idToLoad = parseFloat(this.getAttribute('data-skinid')),
		menu = this.parentNode.parentNode,
		newOpt,
		oldOpts;

		menu.getElementsByClassName('selected')[0].className = '';
		this.parentNode.className = 'selected';

		updateSkin(idToLoad);

		if (localStorage.getItem('MakazeScriptOptions')) {
			oldOpts = JSON.parse(localStorage.getItem('MakazeScriptOptions'));
			oldOpts.ipc_theme_name = nameToLoad;
			oldOpts.ipc_theme_id = idToLoad;
			localStorage.setItem('MakazeScriptOptions', JSON.stringify(oldOpts));
		} else {
			newOpt = {'ipc_theme_name': nameToLoad, 'ipc_theme_id': idToLoad};
			localStorage.setItem('MakazeScriptOptions', JSON.stringify(newOpt));
		}

		menu.style.opacity = 0;
		setTimeout(function() {
			menu.style.display = 'none';
		}, 350);

		document.getElementById('new_ipc_skin').className = '';
	};

	for (i = 0; i < document.getElementById('new_ipc_skin_menucontent').getElementsByTagName('a').length; i++) {
		var menu = document.getElementById('new_ipc_skin_menucontent');
		document.getElementById('new_ipc_skin_menucontent').getElementsByTagName('a')[i].href = 'javascript:void(0)';
		if (localStorage.getItem('MakazeScriptOptions') && JSON.parse(localStorage.getItem('MakazeScriptOptions')).hasOwnProperty('ipc_theme_id')) {
			opts = JSON.parse(localStorage.getItem('MakazeScriptOptions'));
			if (opts.ipc_theme_id === document.getElementById('new_ipc_skin_menucontent').getElementsByTagName('a')[i].getAttribute('data-skinid')) {
				menu.getElementsByClassName('selected')[0].className = '';
				document.getElementById('new_ipc_skin_menucontent').getElementsByTagName('a')[i].parentNode.className = 'selected';
			}
		}
		document.getElementById('new_ipc_skin_menucontent').getElementsByTagName('a')[i].onclick = ipcThemeChangerHandler;
	}
}

if (document.body.id == 'ipboard_body' && document.getElementById('chat-form') != null) {
	var opts,
	detectedTheme,
	forumTheme = document.getElementById('new_skin_menucontent').getElementsByClassName('selected')[0].getAttribute('data-skinid'),
	clonedScript;

	if (localStorage.getItem('MakazeScriptOptions') && JSON.parse(localStorage.getItem('MakazeScriptOptions')).hasOwnProperty('ipc_theme_id')) {
		opts = JSON.parse(localStorage.getItem('MakazeScriptOptions'));
		detectedTheme = opts.ipc_theme_id;
		if (detectedTheme !== forumTheme) {
			updateSkin(detectedTheme);
		}
	}

	clonedScript = document.createElement('script');
	clonedScript.setAttribute('type', 'text/javascript');
	clonedScript.innerHTML = updateSkin.toString() + insertAfter.toString() + fade.toString() + clonedThemeChanger.toString() + 'clonedThemeChanger();';
	document.body.appendChild(clonedScript);
}