// ==UserScript==
// @name           Popmundo Superquick Language Switcher
// @namespace      http://popodeus.com
// @description    Switches your Popmundo game interface language with a simple to click popup menu
// @require        http://sizzlemctwizzle.com/updater.php?id=75249&days=1
// @include        http://www*.popmundo.com/Common/*
// @exclude       http://www*.popmundo.com/Common/cn.asp*
// @exclude       http://www*.popmundo.com/Common/menuforum.asp*
// @exclude       http://www*.popmundo.com/Common/defaultconf.asp
// @exclude       http://www*.popmundo.com/Common/includes/*
// @exclude       http://www*.popmundo.com/Common/ForumTop.asp
// @exclude       http://www*.popmundo.com/Common/PerformanceLIVE.asp*
// @exclude       http://www*.popmundo.com/Common/*MoveAction*
// @exclude       http://www*.popmundo.com/Common/*Remove*
// @copyright      http://popodeus.com/ All rights reserved
// ==/UserScript==

if (!typeof(GM_getValue)) GM_getValue = function() { return ''; }
if (!typeof(GM_setValue)) GM_setValue = function() {  }

//var keys = GM_listValues(); for (var i=0, key=null; key=keys[i]; i++) GM_deleteValue(key);
function addEventSimple(obj,evt,fn) {
	if (obj.addEventListener) obj.addEventListener(evt,fn,false);
	else if (obj.attachEvent) obj.attachEvent('on'+evt,fn);
}

function removeEventSimple(obj,evt,fn) {
	if (obj.removeEventListener) obj.removeEventListener(evt,fn,false);
	else if (obj.detachEvent) obj.detachEvent('on'+evt,fn);
}

function buildURL(languageid) {
	return 'http://www'+location.href.match(/www(\d+)\./)[1]+'.popmundo.com/Common/Entry.asp?action=languageSwitch&LanguageID=' + languageid
}
function hideLangList() {
	var e = document.getElementById('x-quicklang');
	if (e) {
		document.body.removeChild(e);
		setTimeout(function() { document.getElementById('x-quicklang-openclose').style.display = 'block'; }, 50);
	}
}
function updateFavs(lang) {
	//GM_log('Update favs: ' + lang);
	var x = GM_getValue('favorites', '').split(',');
	for (var i=0; i<x.length; i++) {
		if (x[i] == lang) return;
	}
	x.unshift(lang);
	if (x.length >= 4) x.pop();
	GM_setValue('favorites', x.join(','));
	//GM_log('Favorites are now: ' + GM_getValue('favorites'));
}
function setLang(e) {
	var u = buildURL(e.target.title);
	/*
	var tmp = new Image();
	addEventSimple(tmp, 'load', function() { updateFavs(e.target.title); hideLangList(); location.reload(); }, false);
	tmp.src = u;
	*/
	GM_xmlhttpRequest({
		method:'GET',
		url:u,
		onload: function() { updateFavs(e.target.title); hideLangList(); location.reload(); },
		onerror: function() { hideLangList(); }
	});
}

var langs = {
	2: "US English",
	1: "Svenska",
	3: "Deutsch",
	24: "UK English",
	4: "Italiano",
	5: "Français",
	19: "Türkçe",
	6: "Español",
	7: "Norsk",
	8: "Dansk",
	9: "Suomi",
	10: "Nederlands",
	11: "Português",
	13: "Polski",
	14: "Русский (Russian)",
	23: "Romanian",
	15: "中文",
	32: "Srpski",
	33: "Magyar",
	36: "Estonian",
	38: "Indonesian",
	39: "Hrvatski",
	43: "Bulgarian",
	50: "Português, Brasil",
	51: "Español Lat.Am.",
	56: "Lietuvių",
	57: "Ukrainian",
	58: "Bosnian",
	66: "Català",
	100: "Azerbaijani",
	105: "Tagalog",
	106: "中文大陆"
}

var head = document.getElementsByTagName('head')[0];
var csslink = document.createElement('link');
csslink.type = 'text/css';
csslink.rel = 'stylesheet';
csslink.href = 'http://res2.popodeus.com/theme/script-language-switch.css';
head.appendChild(csslink);

var openclose = document.createElement('div');
openclose.id = 'x-quicklang-openclose';
var opencloseimg = document.createElement('img');
opencloseimg.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABh0RVh0U29mdHdhcmUAQWRv' +
					  'YmUgRmlyZXdvcmtzT7MfTgAAABZ0RVh0Q3JlYXRpb24gVGltZQAwMi8wMi8wOC2QtvAAAAGdSURBVFiFzZfNLgRBFIW/LmU8Bt5gJAiRwRsQaxsSYmdCbPxkxu9G0HYyFjYWVsIbYBZ+E/0GzGNgVFkY' +
					  'tJnpqkGny0lq03Vun3P73uru62mtCeN2cr0NyAIDQJp4EADngN9VWHgMb3hhA7eT6z4wHZNoFHa7CgvZGgM3E2v3xJexDUH3/mIHgKiI7yQoDpCuaOJdj6+0AQ8JiofRLlEq50gcICe11kk++mqkJYb' +
					  'ad+7N05SSf1J4fS5zN7URaUCYgptSEoSRYoYQ1gRk9YuoBkpxNbb8K/2eg/f2Mmn8Ib144NyARFlKADTE+WW8vQcw17AR/Ose+PEh7z1cNe5fji79zEDcJajHNcVLlLLftRGOiWuId94Dzg38hx6I+U' +
					  'VUj2uId18CK0MI+o5C33PLifjGFcLKl/o1mlB+ekG2NFs9RkIpyk8vmDS84shckr/j1QgE6AA0jlYgtCavNThaeZE53iyB9h1k72eON0ufo1lxeDbR0SxzsvU1mgFULvgJiPsf4lA1HQNcDM208j6eD' +
					  'xLveH4G+P2n26XwxhtjEif/sUDlHwAAAABJRU5ErkJggg==';
opencloseimg.alt = "Select Language";
opencloseimg.title = "Select Language";

var favs = GM_getValue('favorites', '');
//GM_log(favs.length + ': "' + favs + '"');
if (favs.length >= 1) {
	var x = favs.split(',');
	for (var i=0; i < x.length; i++) {
		var lang = x[i];
		if (lang) {
			var favdiv = document.createElement('div');
			favdiv.className = 'favdiv';
			favdiv.innerHTML = langs[lang];
			favdiv.title = lang;
			favdiv.addEventListener('click', setLang, false);
			openclose.appendChild(favdiv);
		}
	}
}
openclose.appendChild(opencloseimg);

openclose.style.right = GM_getValue('popup.right', '10px');
openclose.style.bottom = GM_getValue('popup.bottom', '10px');

function showMenu() {
	openclose.style.display = 'none';
	setTimeout(function() {
		var popup = document.createElement('div');
		popup.id = 'x-quicklang';
		popup.style.right = GM_getValue('popup.right', '10px');
		popup.style.bottom = GM_getValue('popup.bottom', '10px');
		
		var banner = document.createElement('div');
		banner.className = 'thebanner';
		
		var dragbar = document.createElement('div');
		dragbar.id = 'x-lang-dragbar';
		dragbar.className = 'x-dragbar';
		dragbar.innerHTML = "&nbsp;";

		var closebutton = document.createElement('div');
		closebutton.innerHTML = " X ";
		closebutton.className = 'x-closebutton';
		addEventSimple(closebutton, 'click', hideLangList);
		
		var link = document.createElement('a');
		link.href = 'http://userscripts.org/scripts/show/75249'; 
		link.target = '_blank';
		link.innerHTML = 'Superquick Language Switcher - by Popodeus.com';

		banner.appendChild(dragbar);
		banner.appendChild(link) 
		banner.appendChild(closebutton);
		
		popup.appendChild(banner);
		
		var languageul = document.createElement('ul');
		for (var langid in langs) {
			var li = document.createElement('li');
			li.title = langid;
			li.className = 'lang-'+langid;
			li.innerHTML = langs[langid];
			addEventSimple(li, 'click', setLang);
			languageul.appendChild(li);
		}
		popup.appendChild(languageul);
		document.body.appendChild(popup);
		
	}, 200);
}
document.body.appendChild(openclose);

addEventSimple(opencloseimg, 'click', showMenu);
