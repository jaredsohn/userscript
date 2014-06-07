// ==UserScript==
// @name        Pop-up blocker lite
// @namespace   http://userscripts.org/users/521514
// @description Asks the user if a pop-up should be blocked before opening it. It also includes a GUI to add URLs to whitelist or blacklist.
// @require     http://userscripts.org/scripts/source/171198.user.js
// @include     *
// @run-at      document-start
// @grant       GM_setValue
// @grant       GM_getValue
// @grant       GM_registerMenuCommand
// @version     0.1.1
// ==/UserScript==

USP.theScriptName = 'Pop-up blocker lite';
USP.init(
	{theName:'blockedURLs', theText:'URLs to block:', theDefault:[]},
	{theName:'allowedURLs', theText:'URLs to allow:', theDefault:[]}
);
GM_registerMenuCommand('Preferences for ~'+USP.theScriptName+'~', USP.invoke);

var list = {
	allowedURLs: USP.getValue('allowedURLs'),
	blockedURLs: USP.getValue('blockedURLs')
};

var _winOpen = unsafeWindow.open;
unsafeWindow.open = function(URL,title,options){
	function getURL(URL){
		var a = document.createElement('a');
		a.href = URL;
		return a.href;
	}
	function push(listName, el){
		list[listName].push(el);
		setTimeout(function() {
			GM_setValue(listName, JSON.stringify(list[listName]));
		}, 0);
	}
	URL = getURL(URL);
	if(list.blockedURLs.indexOf(URL) !== -1){ return false; }
	if(list.allowedURLs.indexOf(URL) === -1){
		var answer = prompt('Do you want to BLOCK the following pop-up?\n'
			+ '\n‣URL: '+URL
			+ '\n‣Title: '+title
			+ '\n‣Options: '+options
			+ '\n\nBlock always the following URL:', URL);
		if(answer !== null){
			if(answer !== ''){
				push('blockedURLs',answer);
			}
			return false;
		}
	}
	_winOpen(URL,title,options);
}
