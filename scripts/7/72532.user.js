// ==UserScript==
// @name           Front Page Tabs
// @namespace      http://reddit.com
// @description    Add (and optionally remove) top-level tabs to the Reddit Front Page
// @includes       http://reddit.com/*
// @includes       http://reddit.com
// ==/UserScript==

(function() {

var menu = document.getElementsByClassName('tabmenu')[0];

/*
var oldtabs = menu.getElementsByTagName('li');
for (var i = 0; i < oldtabs.length; i++) {
  if (oldtabs[i].innerHTML.match(/controversial/)) {
    menu.removeChild(oldtabs[i]);
  }
}
*/

var newtabs = new Array()
	newtabs[0] = "http://www.reddit.com/r/ideasfortheadmins+help+modtalk+modhelp+futureofreddit+needamod+bugs/new";
	newtabs[1] = "javascript:(function%20f(){var%20u=$(\"#siteTable%20.hide-button%20a\");if(u.length){setTimeout(f,500);u[0].onclick()}%20})()";

var titles = new Array()
	titles[0] = "help reddits";
	titles[1] = "hide all";

for (var i = 0; i < newtabs.length; i++) {

	var li = document.createElement('li');
	var a = document.createElement('a');
	var text = document.createTextNode(titles[i]);

	a.setAttribute('href', newtabs[i]);
	a.appendChild(text);
	li.appendChild(a);
	menu.appendChild(li);
}

})();
