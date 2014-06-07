// ==UserScript==
// @name		GEmpire Buttons v1.1
// @namespace	Dimix
// @grant		GM_getValue
// @grant		GM_setValue
// @grant		GM_deleteValue
// @grant		GM_log
// @grant		GM_getResourceURL
// @description	Quick acces to relevant stuff for the GEmpire
// @version		1.0
// @author		Dimix
// @updateURL      http://userscripts.org/scripts/show/486620.meta.js
// @downloadURL    http://userscripts.org/scripts/show/486620.user.js
// @include		http://*.ogame.*/game/index.php?*page=*
// @icon		http://i58.servimg.com/u/f58/18/79/83/55/110.png
// ==/UserScript==


var GEmpire ;

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
				buttonNode.href							= 'http://g-empire.webs.com/';
				buttonNode.target						= '_blank';
				buttonNode.title						= 'GEmpire Web';

				labelNode								= buttonNode.appendChild( document.createElement('span') );
				labelNode.className						= 'textlabel';
				labelNode.style.color					= 'white';
				labelNode.textContent					= 'GEmpire Web';

				contentNode.appendChild( listNode );
			}

} () );

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
				buttonNode.href							= 'http://g-empire.weebly.com/';
				buttonNode.target						= '_blank';
				buttonNode.title						= 'Chat';

				labelNode								= buttonNode.appendChild( document.createElement('span') );
				labelNode.className						= 'textlabel';
				labelNode.style.color					= 'white';
				labelNode.textContent					= 'Chat';

				contentNode.appendChild( listNode );
			}

} () );


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
				buttonNode.href							= 'http://gempire.forumotion.co.uk/forum';
				buttonNode.target						= '_blank';
				buttonNode.title						= 'Forum';

				labelNode								= buttonNode.appendChild( document.createElement('span') );
				labelNode.className						= 'textlabel';
				labelNode.style.color					= 'white';
				labelNode.textContent					= 'Forum';

				contentNode.appendChild( listNode );
			}

} () );

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
				buttonNode.href							= 'http://en.galaxytool-hosting.eu/gempire/secret/index.php';
				buttonNode.target						= '_blank';
				buttonNode.title						= 'Galaxytool';

				labelNode								= buttonNode.appendChild( document.createElement('span') );
				labelNode.className						= 'textlabel';
				labelNode.style.color					= 'white';
				labelNode.textContent					= 'Galaxytool';

				contentNode.appendChild( listNode );
			}

} () );