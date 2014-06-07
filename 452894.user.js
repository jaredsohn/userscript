// ==UserScript==
// @name       deviantART Custom Profile CSS
// @namespace  http://devilishdb.deviantart.com
// @version    1.2.5
// @description  Finds a special reference to a custom CSS file on deviantART profiles, then applies it to that page.
// @match      http://*.deviantart.com/
// @copyright  2014+, David Bailey "DevilishDB"
// ==/UserScript==

var html = document.getElementById('aboutme-bio').innerHTML;

function alertStuff(what) {
	var elem = document.createElement('div');
	elem.setAttribute('style', 'position: fixed; left: 0; bottom: 0; width: calc(100% - 32px); background: #404040; color: #fff; font-size: 36px; font-family: Arial, sans-serif !important; transition: 0.25s; z-index: 10000; padding: 16px;');
	elem.innerHTML = what;
	document.body.appendChild(elem);
	window.setTimeout(function() {
		elem.setAttribute('style', 'position: fixed; left: 0; bottom: -80px; width: calc(100% - 32px); background: #404040; color: #fff; font-size: 36px; font-family: Arial, sans-serif !important; transition: 0.25s; z-index: 10000; padding: 16px;');
	}, 3000);
}

if(html.indexOf(':special-css') >= 0){
	alertStuff("This person has custom CSS! I'm loading it up now...");
	var changed1 = html.replace(':special-css:', ':special-css:<span id="special-css">http://');
	var changed = changed1.replace(':/special-css:', '</span>:/special-css:');
	document.getElementById('aboutme-bio').innerHTML = changed;

	var url = document.getElementById('special-css').innerHTML;
	var css = document.createElement('link');
	css.setAttribute('rel', 'stylesheet');
	css.setAttribute('href', url);
	document.head.appendChild(css);
} else {
	alertStuff("This person doesn't have custom CSS");
}