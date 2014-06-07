// ==UserScript==
// @name Empornium and PureTNA Direct Downloads
// @namespace http://www.userscripts.org
// @description relinks emp/ptna links
// @include *puretna.com/details.php?*
// @include *empornium.us/browse.php*
// @include *empornium.us/details.php?*
// ==/UserScript==
// version 20090807

(function (){
	var pageLinks = document.getElementsByTagName("a");
	for (var i=0; i<pageLinks.length; i++){
		if (pageLinks[i].href.match(/dlwin2/)){
			pageLinks[i].href = pageLinks[i].href.replace('www.', '').replace('empornium', 'down.empornium').replace('dlwin2.php', 'download.php');
		}
		else if (pageLinks[i].href.match(/dlpage/)){
			pageLinks[i].href = pageLinks[i].href.replace('www.', '').replace('puretna', 'down.puretna').replace('dlpage', 'download').replace('id=', 'i=');
		}
	}	
})();