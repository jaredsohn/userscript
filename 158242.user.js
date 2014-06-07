// ==UserScript==
// @name           	Bigger Play Name Box
// @namespace      	goallineblitz.com
// @description    	Make the box you edit your post in larger.
// @include        	http://goallineblitz.com/game/team_create_defense.pl?team_id=&play_id=*
// @version		2013.2.2
// @author		SeattleNiner
// ==/UserScript==

//document.getElementByType('text').style="width: 200px; //a larger number will make the box bigger

var snapTextFields = document.evaluate("//input[@type='text']",
		document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	snapTextFields.style = width: 200px;
