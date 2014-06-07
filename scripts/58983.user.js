/*
* Antispam, Version: 0.1, Date: 2009-10-02
* Copyright (C) 2009 Frank Rechenberger <revvar@gmx.de>
* Released under the GPL license
* http://www.gnu.org/copyleft/gpl.html
*
* This program is free software; you can redistribute it and/or modify
* it under the terms of the GNU General Public License version 2 as
* published by the Free Software Foundation.
*
* This program is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty
* of MERCHANTABILITY or FITNESS FOR A PARTICULAR * PURPOSE.
* See the GNU General Public License for more details.
*/

// ==UserScript==
// @name           Antispam
// @namespace      revvar
// @description    Removes spam from Wikipedia pages (version 0.1 works on german wikipedia only).
// @include        http://*.wikipedia.org/*
// ==/UserScript==

(function() {
	GM_registerMenuCommand('Antispam: Nutzernamen...',function() {userInput();});
	
	function init()
	{
		const X_USER = /^.+[\/=]Benutzer:(.+?)(\&.*|$)/;
		var user = GM_getValue('wpas_userlist','').split(',');
		
		var url=document.location.toString();
		for (var k = 0 ; k < user.length; k++) {
			if ((url.search('Benutzer:'+user[k]) > 0) || (url.search('Benutzer_Diskussion:'+user[k]) > 0))  {
				document.getElementById('bodyContent').innerHTML = '<img alt="Datei:Zeichen 206.svg" src="http://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Zeichen_206.svg/600px-Zeichen_206.svg.png" width="600" height="600">';
				return;
			}
		}
		
		var al = document.getElementsByTagName("a");
		for (var i = 0; i < al.length; i++) {
			if (al[i].href.search(X_USER) == 0 ) {
				var username = al[i].href.replace(X_USER, "$1");
				for (var k = 0 ; k < user.length; k++) {
					if (user[k] == username) {
						var node = al[i].parentNode;
						while (node != null) {
							if (node.tagName && node.tagName.search(/^(P|LI|DD)$/i) == 0) {
								node.setAttribute("style","visibility:hidden;height:0;width:0;");
								var orgDepth = getDepthOut(node);
								var nextnode = node.nextSibling;
								while (nextnode != null) {
									if ((nextnode.nodeType && nextnode.nodeType == 3) ||
										(nextnode.tagName && nextnode.tagName.search(/^(P)$/i) == 0 &&
										nextnode.firstChild && nextnode.firstChild.tagName && nextnode.firstChild.tagName.search(/^(BR)$/i) == 0)
									) {
										nextnode = nextnode.nextSibling;
									} else if (nextnode.tagName && (nextnode.tagName.search(/^(DL)$/i) == 0) && (getDepthIn(nextnode) > orgDepth)) {
										nextnode.setAttribute("style","visibility:hidden;height:0;width:0;");
										nextnode = nextnode.nextSibling;
									} else break;
								}
								break;
							} else {
								node = node.parentNode;
							}
						}
						break;
					}
				}
			}
		}
	}
	init(); 
	
	function userInput() {
		var lInput = prompt('Bitte gib die Namen der zu erkennenden Nutzer kommagetrennt ein:', GM_getValue('wpas_userlist',''));
		if ((lInput != null) && (lInput != '')) {
			GM_setValue('wpas_userlist', lInput);
		}
	}
	
	function getDepthOut(oNode) {
		var result = 0;
		var pNode = oNode;
		while (pNode) {
			if (pNode.tagName && pNode.tagName.search(/^(DL)$/i) == 0) result++;
			pNode = pNode.parentNode;
		}
		//oNode.setAttribute('class',result);
		return result;
	}
	
	function getDepthIn(oNode) {
		var result = 0;
		var pNode = oNode;
		while (pNode) {
			while (pNode && pNode.nodeType &&pNode.nodeType == 3) pNode = pNode.nextSibling;
			if (pNode) {
				if (pNode.tagName && pNode.tagName.search(/^(DL)$/i) == 0) result++;
				pNode = pNode.firstChild;
			}
		}
		//oNode.setAttribute('class',result);
		return result;
	}
	
})();