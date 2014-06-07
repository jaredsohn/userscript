// ==UserScript==
// @name           Shoutcast Focuser
// @namespace      http://www.planb-security.net/userscripts/
// @description    Moves the focus to the Search form of Shoutcast.com, since that extra click is just so maddening.
// @include        http://www.shoutcast.com/
// @include        http://www.shoutcast.com/directory/index.phtml
// ==/UserScript==

(function () {
	var searchFormInput;
	searchFormInput = document.forms[1].elements[0];
	if (searchFormInput.name == 's') {
  	searchFormInput.value = 'baroque'; // Your favorite genre here
  	searchFormInput.focus();
	} else {
		var oopsMessage = document.createElement('span');
		oopsMessage.innerHTML = '<span style="font-size:8;background-color:yellow;color:red;">Eek! This isn\'t it!</span>';
		searchFormInput.parentNode.insertBefore(oopsMessage, searchFormInput.nextSibling);
	}
})();
