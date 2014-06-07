// ==UserScript==
// @name		AntiGameOrigin
// @namespace	francolino
// @grant		GM_getValue
// @grant		GM_setValue
// @grant		GM_deleteValue
// @grant		GM_log
// @grant		GM_getResourceURL
// @description	Enhances OGame for experienced users with many features.
// @version		4.19.0
// @author		Francolino & Origin.team
// @include		http://*.ogame.*/game/index.php?*page=*
// @icon		http://antigame.de/_img/favicon32.ico
// ==/UserScript==


var AGO_extension;

(function () {

			var contentNode, listNode, buttonNode, labelNode;

			contentNode									= document.getElementById('menuTableTools');
			if (contentNode) {

				listNode								= document.createElement('li');

				buttonNode								= listNode.appendChild( document.createElement('span') );
				buttonNode.className					= 'menu_icon';

				buttonNode								= listNode.appendChild( document.createElement('a') );
				buttonNode.id							= 'ago_menu';
				buttonNode.className					= 'menubutton tooltip';
				buttonNode.href							= 'http://antigame.de/';
				buttonNode.target						= '_blank';
				buttonNode.title						= 'Please install the AntiGameOrigin extension instead of the userscript';

				labelNode								= buttonNode.appendChild( document.createElement('span') );
				labelNode.className						= 'textlabel';
				labelNode.style.color					= 'orange';
				labelNode.textContent					= 'AntiGameOrigin';

				contentNode.appendChild( listNode );
			}

} () );
