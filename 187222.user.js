// ==UserScript==
// @name		Steam tweaks
// @namespace		Steam
// @description		Фоны стима
// @author		Kleho
// @version		0.0.1
// @date		2013-08-07
// @include		http://steamcommunity.com/*
// ==/UserScript==

var css = [];

css.push(".maincontent		{padding:25px !important;background-color:rgba(32, 32, 32, 0.7) !important;}");
css.push(".pagecontent		{background-color:#000000 !important;}");
css.push("#footer		{background-color:#000000 !important;}");
css.push("body			{background-color:#000000 !important;}");
css.push(".gameListRowItem	{background-color:rgb(32,32,32) !important;}");

css = css.join("\n");

if (lsTest()) {

	var name;
	var timeout	= 1000*60*60*24*7;
	var now		= (new Date()).getTime();
	var ts		= now + timeout;

	if (name = /http:\/\/steamcommunity.com\/(?:id|profiles)\/([^\/]+)\/?$/.exec(window.location.href)) {

		var divs=document.getElementsByTagName('div');
		for (var i in divs) {
			var o = divs[i];
			if (o.className.indexOf('has_profile_background') != -1 && o.className.indexOf('profile_page') != -1) {
				localStorage['bg-'+name[1]] = o.style.backgroundImage;
				localStorage['ts-'+name[1]] = ts;
				break;
			}
		}

		var as=document.getElementsByTagName('a');
		for (var i in as) {
			var o = as[i];
			if (o.href.indexOf('/edit') != -1) {
				localStorage['myname'] = name[1];
				break;
			}
		}

	} else if (name = /http:\/\/steamcommunity.com\/(?:id|profiles)\/([^\/]+)\//.exec(window.location.href)) {

		set_bg(name[1]);

	} else if (/http:\/\/steamcommunity.com\//.test(window.location.href)) {

		set_bg(localStorage['myname']);

	}

	// delete old values
	for (var i in localStorage) {
		if (i.indexOf('ts-') == 0 && localStorage[i] < now) {
			var name = i.substr(3);
			localStorage.removeItem('ts-'+name);
			localStorage.removeItem('bg-'+name);
		}
	}

}

function lsTest(){
	try {		return 'localStorage' in window && window['localStorage'] !== null;
	} catch (e) {	return false;
	}
}

function set_bg(name) {

	var bg = localStorage['bg-'+name];

	if (bg) {

		var head	= document.getElementsByTagName('head')[0];
		var style	= document.createElement('style');

		style.type = 'text/css';
		if (style.styleSheet) {	style.styleSheet.cssText = css;
		} else {		style.appendChild(document.createTextNode(css));
		}
		head.appendChild(style);

		localStorage['ts-'+name] = ts;

		var divs = document.getElementsByTagName('div');

		for (var i in divs) {
			var o = divs[i];
			if (o.className && o.className.indexOf('pagecontent') != -1) {
				o.style.backgroundImage = localStorage['bg-'+name];
				//o.style.backgroundColor = '#000000';
				//document.getElementById('footer').style.backgroundColor = '#000000';
				//document.getElementsByTagName('body')[0].style.backgroundColor = '#000000';
				break;
			}
		}

	}
}