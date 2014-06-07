// ==UserScript==
// @name           IMPAwards Reloaded
// @namespace      IMPAwards
// @description    Some options for the viewing of IMPAwards website.
// @include        http://www.impawards.com/*
// @include        http://impawards.com/*
// @author         I I I
// ==/UserScript==

GM_addStyle(<><![CDATA[
	ul#imdbintl { float: left; width: auto; padding: 0; }
	ul#imdbintl li { margin: 0px 2px 4px; list-style: none; text-indent: -100em; overflow: hidden; float: left; }
	ul#imdbintl li a { display: block; cursor: pointer; background-image: url(http://www.imdb.com/images/flagsprite.png); width: 26px; height: 14px; border: 1px solid #bcbcbc; filter:alpha(opacity = 30); opacity: 0.3; -moz-opacity: 0.3; }
	ul#imdbintl li a:hover, ul#imdbintl li a.current { filter:alpha(opacity = 100); opacity: 1; -moz-opacity: 1; }
	span#imdbother a { cursor: pointer; }
	span#imdbother a.current, ul#imdbintl li a.current { color: #fff; cursor: default; }
	div#thumb { width: 63px; overflow: auto !important; position: absolute; left: -66px; cursor: default; color: #b7b7b7; }
	div#thumb img { margin: 0 2px 2px; float: right; filter:alpha(opacity = 40); opacity: 0.4; -moz-opacity: 0.4; }
	div#thumb img:hover, div#thumb img.current { filter:alpha(opacity = 100); opacity: 1; -moz-opacity: 1; }
	div#thumb img.current { border-left: 3px double; }
	div#config { background: #1b1b1b; float: left; margin: 0; padding: 8px; text-align: left; }
	div#about .content, div#contact .content, div#puzzle .content { min-height: 0px; }
]]></>.toString());

/**
 * Settings.
 */
function Settings() {
	this.version = '0.4.1';
	this.imdb = null;
	this.removeAds = GM_getValue('removeAds', null);
	this.numberOfAds = 3;
	this.altDesigns = GM_getValue('altDesigns', null);
	this.currentPage = null;

	this.updateIMDb = function() {
		this.imdb = eval(GM_getValue('imdb', null));
	}
	this.setCurrentPage = function() {
		if ((location.pathname.match(/\/directors\//) && location.pathname.match(/\/directors\/(.*)\.html/)[1].length > 1
				|| location.pathname.match(/\/actors\//) && location.pathname.match(/\/actors\/(.*)\.html/)[1].length > 1)
				&& !location.href.match(/\/index\.html$/))
			return 'people';
		else if (location.pathname.match(/\/contact\.html$/))
			return 'contact';
		else if (document.getElementsByClassName('name').length > 0)
			return 'poster';
		else if (document.getElementsByClassName('box_office').length > 0)
			return 'main';
		else if (document.getElementById('about'))
			return 'list';
		return 'other';
	}
	this.currentPage = this.setCurrentPage();
}
var settings = new Settings();
settings.updateIMDb();

/**
 * IMDb configuration.
 */
function IMDb(title, abbr, link) {
	this.title = title;
	this.abbr = abbr;
	this.link = link;
}
var imdbintl = new Array(
		{ 'title':'United Kingdom', 'style':'background-position: 0px;', 'abbr':'uk', 'link':'uk.imdb.com' },
		{ 'title':'United States', 'style':'background-position: 156px;', 'abbr':'usa', 'link':'www.imdb.com' },
		{ 'title':'Germany', 'style':'background-position: 130px;', 'abbr':'de', 'link':'www.imdb.de' },
		{ 'title':'Spain', 'style':'background-position: 104px;', 'abbr':'es', 'link':'www.imdb.es' },
		{ 'title':'Italy', 'style':'background-position: 78px;', 'abbr':'it', 'link':'www.imdb.it' },
		{ 'title':'France', 'style':'background-position: 52px;', 'abbr':'fr', 'link':'www.imdb.fr' },
		{ 'title':'Portugal', 'style':'background-position: 26px;', 'abbr':'pt', 'link':'www.imdb.pt' },
		{ 'title':'All AKAs', 'abbr':'akas', 'link':'akas.imdb.com' }
);

/**
 * Removes Ads in any page.
 */
if (settings.removeAds)
	for (i = 1; i != settings.numberOfAds + 1; ++i)
		removeAds('banner_' + i);

/**
 * Main pages.
 */
if (settings.currentPage == 'main') {
	with (document.getElementById('right_content')) {
		with (insertBefore(document.createElement('div'), getElementsByClassName('title')[1])) {
			setAttribute('class', 'title');
			setAttribute('style', 'background-position: ' + randomNumber(1005) + 'px bottom;');
			appendChild(document.createElement('h1')).appendChild(document.createTextNode('IMPAwards Reloaded'));
		}
		with (insertBefore(document.createElement('div'), getElementsByClassName('title')[2]))
			setAttribute('id', 'config');
	}
	generateOptions(document.getElementById('config'));
}

/**
 * Poster pages.
 */
else if (settings.currentPage == 'poster') {
	if (settings.altDesigns) {
		changeAltDesigns();
		window.addEventListener("load", function() { completeAltDesigns(); }, false);
	}

	/**
	 * Configure sidebar.
	 */
	with (document.getElementById('right_half')) {
		innerHTML = innerHTML.replace('IMDB', 'IMDb').replace('AMAZON', 'Amazon');
		updateIMDbLink(getElementsByClassName('gb')[1].getElementsByTagName('a')[0]);
		generateOptions(getElementsByClassName('gb')[1]);
	}
}

/**
 * Other list, contact and people pages.
 */
else if (settings.currentPage == 'list' || settings.currentPage == 'contact' || settings.currentPage == 'people') {
	/**
	 * Contact page.
	 */
	if (settings.currentPage == 'contact')
		while (document.getElementById('about').childNodes.length > 0)
			with (document.getElementById('about'))
				removeChild(firstChild);
	/**
	 * People pages.
	 */
	else if (settings.currentPage == 'people')
		updateIMDbLink(document.getElementById('contact').getElementsByTagName('a')[0]);

	/**
	 * All other list pages.
	 */
	with (document.getElementById('about')) {
		with (appendChild(document.createElement('div'))) {
			setAttribute('class', 'title');
			setAttribute('style', 'background-position: ' + randomNumber(1005) + 'px bottom;');
			appendChild(document.createElement('h4')).appendChild(document.createTextNode('IMPAwards Reloaded'));
		}
		with (appendChild(document.createElement('div'))) {
			setAttribute('id', 'config');
			setAttribute('style', 'width: 343px');
		}
	}
	generateOptions(document.getElementById('config'));
}

function randomNumber(x) {
	return Math.floor(Math.random() * x);
}

function generateOptions(el) {
	with (el.appendChild(document.createElement('p'))) {
		setAttribute('id', 'imdbalt');
		if (settings.currentPage != 'poster')
			setAttribute('style', 'margin: 0px;');
		with (appendChild(document.createElement('span'))) {
			appendChild(document.createTextNode('IMDb international:'));
			setAttribute('style', 'float: left; ' + (settings.currentPage == 'poster' ? 'margin-right: 2px;' : 'margin-bottom: 2px;'));
		}
		if (settings.currentPage != 'poster')
			appendChild(document.createElement('br'));
		with (appendChild(document.createElement('ul'))) {
			setAttribute('id', 'imdbintl');
			if (settings.currentPage != 'poster')
				setAttribute('style', 'margin-left: 14px;');
			for (i = 0; i != imdbintl.length - 1; ++i)
				with (appendChild(document.createElement('li')).appendChild(document.createElement('a'))) {
					setAttribute('style', imdbintl[i].style);
					if (settings.imdb && settings.imdb.abbr == imdbintl[i].abbr)
						setAttribute('class', 'current');
					setAttribute('title', imdbintl[i].title); setAttribute('alt', imdbintl[i].title);
					imdbintlLink(i);
				}
		}
		if (settings.currentPage != 'poster') {
			appendChild(document.createElement('br'));
			if (settings.currentPage == 'list' || settings.currentPage == 'contact' || settings.currentPage == 'people')
				appendChild(document.createElement('br'));
		}
		with (appendChild(document.createElement('span'))) {
			if (settings.currentPage == 'poster')
				setAttribute('style', 'margin-left: 16px;');
			appendChild(document.createTextNode('Other: '));
			setAttribute('id', 'imdbother');
			with (appendChild(document.createElement('a'))) {
				if (settings.imdb && settings.imdb.abbr == imdbintl[i].abbr)
					setAttribute('class', 'current');
				appendChild(document.createTextNode(imdbintl[i].title));
				imdbintlLink(i);
			}
		}
	}
	with (el.appendChild(document.createElement('p'))) {
		with (appendChild(document.createElement('input'))) {
			setAttribute('type', 'checkbox');
			setAttribute('id', 'checkbox1');
			checked = settings.removeAds;
			addEventListener('change', function() { GM_setValue('removeAds', checked); }, false);
		}
		with (appendChild(document.createElement('label'))) {
			setAttribute('for', previousSibling.getAttribute('id'));
			appendChild(document.createTextNode('Remove ads'));
		}
		appendChild(document.createElement('br'));
		with (appendChild(document.createElement('input'))) {
			setAttribute('type', 'checkbox');
			setAttribute('id', 'checkbox2');
			checked = settings.altDesigns;
			addEventListener('change', function() { GM_setValue('altDesigns', checked); }, false);
		}
		with (appendChild(document.createElement('label'))) {
			setAttribute('for', previousSibling.getAttribute('id'));
			appendChild(document.createTextNode('Change alternate designs'));
		}
	}
}

/**
 * Update IMDb link in sidebar.
 */
function updateIMDbLink(el) {
	if (settings.imdb)
		with (el) {
			innerHTML = 'IMDb ' + settings.imdb.title;
			if (href.match(/\/title\//))
				href = href.replace(href.match(/http\:\/\/(.*)\/title\/tt/)[1], settings.imdb.link);
			else if (href.match(/\/Name\?/))
				href = href.replace(href.match(/http\:\/\/(.*)\/Name\?/)[1], settings.imdb.link);
			setAttribute('title', 'View movie in IMDb ' + settings.imdb.title);
		}
}
/**
 * Generate IMDb international links.
 */
function imdbintlLink(i) {
	var el = null;
	if (i == imdbintl.length - 1)
		el = document.getElementById('imdbother').lastChild;
	else
		el = document.getElementById('imdbintl').childNodes[i].firstChild;
	el.addEventListener('click', function() {
			if (!this.getAttribute('class')) {
				if (settings.imdb)
					with (document.getElementById('imdbalt').getElementsByClassName('current')[0])
						removeAttribute('class');
				setIMDb(new IMDb(imdbintl[i].title, imdbintl[i].abbr, imdbintl[i].link));
				if (settings.currentPage == 'poster' || settings.currentPage == 'people')
					updateIMDbLink(document.getElementById('right_half').getElementsByClassName('gb')[1].getElementsByTagName('a')[0]);
				this.setAttribute('class', 'current');
			}
	}, false);
}
/**
 * Save IMDb link configuration.
 */
function setIMDb(imdb) {
	GM_setValue('imdb', uneval(imdb));
	settings.updateIMDb();
}

/**
 * Removes Ads on elements with given class name.
 */
function removeAds(className) {
	while (document.getElementsByClassName(className).length > 0)
		document.getElementsByClassName(className)[0].parentNode.removeChild(document.getElementsByClassName(className)[0]);
}

/**
 * Change alternate designs' place.
 */
function changeAltDesigns() {
	with (document.getElementById('left_half')) {
		var _altdesigns = document.getElementById('altdesigns');
		with (insertBefore(document.createElement('div'), firstChild)) {
			setAttribute('style', 'height: 14px;');
			setAttribute('id', 'thumb');
			with (appendChild(document.createElement('span')))
				appendChild(document.createTextNode('Loading...'));
			if (_altdesigns)
				while (_altdesigns.childNodes.length > 0)
					with (appendChild(_altdesigns.childNodes[0]))
						if (childNodes.length > 0)
							with (childNodes[0]) {
								removeAttribute('height');
								setAttribute('width', '40');
							}
						else {
							removeAttribute('height');
							setAttribute('width', '40');
							setAttribute('class', 'current');
						}
		}
		if (_altdesigns)
			with (_altdesigns.parentNode)
				for (i = 0; i != 3 * 2; ++i)
					removeChild(lastChild);
	}
}

/**
 * Completes alternate designs' new place.
 */
function completeAltDesigns() {
	with (document.getElementById('thumb')) {
		if (childNodes.length > 1)
			removeChild(firstChild);
		else
			replaceChild(document.createTextNode('Only poster'), firstChild);
		setAttribute('style', 'height: ' + (parentNode.getElementsByTagName('img')[childNodes.length].height + 2) + 'px');
	}
}
