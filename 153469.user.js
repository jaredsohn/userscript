 // ==UserScript==
// @name           4chan Catalog Linker
// @version        1.5
// @namespace      snaptop
// @author         snaptop
// @description    Adds and dynamically modifies board navigation links on 4chan to point to catalog sites
// @include	http*://www.4chan.org/
// @include	http*://boards.4chan.org/*
// @include	http*://www.4chan.org/framesnav*
// @include	http*://catalog.neet.tv/*
// @include	http*://4index.gropes.us/*
// @include	http*://chanc.repa.info/*
// @run-at	document-end
// ==/UserScript==

(function() {

	var d, forEach, config, catalogNav, internalCatalog, preventNewTab, frontPage, inThread, onIndex, frames, board, iconDark, iconLight, chanSS;

	d = document;

	forEach = Array.prototype.forEach;

	internalCatalog = true; // set false to use external catalog sites
	
	catalogNavOn = false;

	preventNewTab = true;

	frontPage = /^https?:\/\/www\.4chan\.org\/$/.test(location.href);
	inThread = /res/.test(location.href);
	onIndex = /boards\.4chan\.org\/\w+^/.test(location.href);
	frames = /4chan\.org\/frames/.test(location.href);
	onCatalog = /4chan\.org\/.*catalog/.test(location.href);

	config = (frames) ? 'catalogNavFrames' : 'catalogNav';

	board = location.pathname.split('/')[1];

	iconDark = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wLAgYCD9L1jM8AAABCSURBVDjLY2CgJkhLS/uPTBMjx4RLIT4LkAEjPslZs2YxEpJjotTbFBvAiMuPMCcSIzewgGIvjEYjFhfgi2OaxD8AxzE41nb1hYQAAAAASUVORK5CYII="
	iconLight = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wLAgQkKcCiXngAAABCSURBVDjLY2CgJjhz5sx/ZJoYOSZcCvFZgAwY8UmamJgwEpJjotTbFBvAiMuPMCcSIzewgGIvjEYjFhfgi2OaxD8AY889nt8s8ZwAAAAASUVORK5CYII="
	
	chanSS = null;

	if (typeof(GM_getValue) === "undefined") {
		function GM_getValue(name, def) {
			return localStorage.getItem(name) || def;
		}
		function GM_setValue(name, value) {
			return localStorage.setItem(name, value);
		}
	}

	function toDefaultNav(a) {
		if (/javascript:;|^#$|void\(/.test(a.href))
			return
		var name = a.pathname.split('/')[1];
		if (/neet\.tv|gropes\.us|chanc\.repa|catalog/.test(a)) {
			a.href = '//boards.4chan.org/' + name + '/';
			if (chanSS  && !(frontPage)) {
				if (a.textContent == '/' + name + '/')
					a.textContent = name;
				a.title = a.title.replace(' +', '');
			}
		}
	}

	function toCatalogNav(a) {
		var name = (typeof a != 'string') ? 
			a.pathname.split('/')[1] : a;

		var href;
		switch (name) {
		case 'a':
		case 'c':
		case 'g':
		case 'co':
		case 'k':
		case 'm':
		case 'o':
		case 'p':
		case 'v':
		case 'vg':
		case 'w':
		case 'cm':
		case '3':
		case 'adv':
		case 'an':
		case 'cgl':
		case 'ck':
		case 'diy':
		case 'sp':
		case 'fa':
		case 'fit':
		case 'int':
		case 'jp':
		case 'mlp':
		case 'lit':
		case 'mu':
		case 'n':
		case 'po':
		case 'sci':
		case 'toy':
		case 'trv':
		case 'tv':
		case 'vp':
		case 'tg':
		case 'wsg':
		case 'x':
		case 'q':
			href = a.href = (internalCatalog) ? 'http://boards.4chan.org/' + name + '/catalog' :
											    'http://catalog.neet.tv/' + name + '/';
			break
		case 'd':
		case 'e':
		case 'gif':
		case 'h':
		case 'hr':
		case 'hc':
		case 'r9k':
		case 's':
		case 'pol':
		case 'soc':
		case 'u':
		case 'i':
		case 'ic':
		case 'hm':
		case 'r':
		case 'w':
		case 'wg':
		case 't':
		case 'y':
			href = a.href = (internalCatalog) ? 'http://boards.4chan.org/' + name + '/catalog' :
											    'http://4index.gropes.us/' + name + '/';
			break
		case 'b':
			href = a.href = (internalCatalog) ? 'http://boards.4chan.org/' + name + '/catalog' :
												'http://chanc.repa.info/' + name + '/';
			break
		default:
			return
		}
		if (chanSS && !(frontPage) && !(frames) && a.parentNode)
			if (a.parentNode.id == 'boardNavDesktopFoot') {
				a.title += ' +'
				a.textContent = '/' + name + '/';
				return
			}
		return href;
	}

	function changeNavLinks() {
		var func = (catalogNavOn) ? toDefaultNav : toCatalogNav;

		if (frames) {
			frameNavLinks = d.querySelectorAll('a');
			forEach.call(frameNavLinks, func);
		} else {
			var selector = (frontPage) ? 
				'.column a' : 'div[id*="boardNavDesktop"] a';
			forEach.call(d.querySelectorAll(selector), function(a) {
				if (a.className == 'return' || a.className == 'catalogLinkSnap')
					return
				func(a)});
		  }

		catalogNavOn = !(catalogNavOn);
			forEach.call(Buttons.buttons, function(button) {
				button.toggle();
			});
		return GM_setValue(config, catalogNavOn)
	}

	//Prevents threads from opening in new tab when on catalog sites
	function disableNewTab() {
		var threads = d.getElementById('threads');
		threads.addEventListener('click', function(e) {
			if (e.target.nodeName == 'IMG') {
				e.preventDefault();
				location.href = (e.target.nodeName == 'IMG') ?
			 	e.target.parentNode.href : e.target.href;
			}
		}, false);
	}

	function addProps(obj, props) {
		Object.keys(props).forEach(function(p) {
			if (typeof(props[p]) == 'object')
				addProps(obj[p], props[p]);
			else
				obj[p] = props[p];
		});
		return obj
	}

	function backgroundIsLight() {
		var current, rgb, brightness;

		current = getComputedStyle(document.body, '');
		rgb = current.backgroundColor.match(/[0-9]+/g)
				.map(function(n) {return n*n});

		brightness = Math.sqrt(rgb[0]*.241 + rgb[1]*.691 + rgb[2]*.068);
		return brightness < 130;
	}

	function createElement(el, props) {
		el = document.createElement(el);
		if (props)
			addProps(el, props);
		return el;
	}

	function ctn(data) {
		return d.createTextNode(data);
	}

	function appendChildren(node, nodes) {
		for (var i = 1; i < arguments.length; i++)
			node.appendChild(arguments[i]);
		return node;
	}

	function createButton(props) {
		var button = createElement('a', props);
		return button;
	}

	function Button(values, props) {
		this.on = false;
		this.prop = values[0];
		this.onValue = values[1];
		this.offValue = values[2];
		this.el = createButton(props);
		this.el[this.prop] = this.offValue;

		this.toggle = function() {
			this.el[this.prop] = (this.on) ? this.offValue : this.onValue
			this.on = !(this.on);
		}
	}

	Buttons = {};

	Buttons.init = function() {
		this.buttons = [];
		this.buttonProps =  {
			href: 'javascript:;', 
			onclick: changeNavLinks,
			className: 'catalogNavSnap',
		}

		this.linkProps = { 
			href: (this.cataloglink = toCatalogNav(board)), 
			className: 'catalogLinkSnap',
		};

		if (this.cataloglink)
			this.linkProps.title = '/' + board + '/ on ' + this.cataloglink.split('/')[2];

		if (chanSS)
			return setTimeout(Buttons.chanSS, 0);
		else
			Buttons.textButton();

		if ((inThread || onIndex) && this.cataloglink)
			this.catalogLink();
	}

	Buttons.toggle = function() {
		this.buttons.forEach(function(b) {
			b.toggle();
		});
	}

	Buttons.placeButton = function(place, el, border, style) {
		var s = createElement('span');
		s.setAttribute('style', (style = style || ''));
		if (border.length) {
			s.appendChild(el);
			appendChildren(s, ctn(border[0]), el, ctn(border[1]));
		} else
			s.appendChild(el);
		d.querySelector(place).appendChild(s);
	}


	Buttons.textButton = function() {
		var values, places, border, style, button;

		values = ['textContent', 'Catalog On', 'Catalog Off'];
		places = [];
		border = [];
		style = '';

		if (frontPage) {
			places.push('#boards');
			border = ['[', ']'];
			style = 'position: relative; left: .5%'
		} else if (frames) {
			places.push('ul');
			values[0] = 'innerHTML';
			values[1] = '<li>[Catalog On]</li>';
			values[2] = '<li>[Catalog Off]</li>';
		} else {
			places.push('#boardNavDesktop', '#boardNavDesktopFoot');
			border = ['[', ']'];
		}

		for (var i=0; i < places.length; i++) {
			button = new Button(values, this.buttonProps);
			Buttons.placeButton(places[i], button.el, border, style);
			this.buttons.push(button);
		}

	}

	Buttons.catalogLink = function() {
		var props, places, el, border;

		props = this.linkProps;
		props.textContent = 'Catalog';
		border = [' [', ']']; 

		if (inThread)
			places = ['.navLinks.desktop', '.navLinks.navLinksBot'];
		else if (onIndex)
			places = ['.pages'];
		
		places.forEach(function(place) {
			el = createElement('a', props);
			Buttons.placeButton(place, el, border);
		});

	}

	Buttons.chanSS = function() {
		if (oneechan = d.querySelector('#OneeChanLink')) {
			nav = d.querySelector('#boardNavDesktopFoot');
			nav.addEventListener('click', function(e) {
				if (e.target.nodeName != 'A')
					changeNavLinks();
			}, false)

		}

	Buttons.chanSSLink();

	}

	Buttons.chanSSLink = function() {
		if (!(this.linkProps.href))
			return;

		var link = createElement('a', this.linkProps),
			img = (backgroundIsLight()) ? iconLight : iconDark,
			nav = d.querySelector('#navtopright');

		if (oneechan = d.querySelector('#OneeChanLink'))
			link.innerHTML = '<img src=' + img + ' height ="15" style= "float: left; opacity: 0.6">';
		else // 4chan SS
			link.setAttribute('style', 'background: url(' + img + '); position: relative; float: left; top: 1px; right: 20%; opacity: 0.6;');

		link.addEventListener('mouseover', function(e) {
			e.target.style.opacity = '1.0';
		}, false);
		link.addEventListener('mouseout', function(e) {
			e.target.style.opacity = '0.6';
		}, false);

		nav.appendChild(link);
	}

	function initialize() {
		if ((not4chan = !(/4chan\.org/.test(location.href))) || onCatalog) {
			if (preventNewTab)
				disableNewTab();
			if (not4chan)
				return;
		}

		chanSS = d.querySelector('#ch4SS');

		Buttons.init();

		if (onCatalog && !(JSON.parse(GM_getValue(config, false))))
			changeNavLinks();

		if  (JSON.parse(GM_getValue(config, false)))
			changeNavLinks();

	}

	initialize();

})();