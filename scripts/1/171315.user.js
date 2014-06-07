// ==UserScript==
// @name           Edmazur
// @namespace      Alan
// @include        http://edmazur.com/game/battle.php*
// @include        http://edmazur.com/game/battlerealm.php
// ==/UserScript==

if(location.href=='edmazur.com/game/battle.php') {
	var formsCollection = document.getElementsByTagName("form");
		for(var i=0;i<formsCollection.length;i++)
		{
			if(formsCollection[i].action == 'processBattle.php') {
alert('found');
				formsCollection[i].submit();
			}
		}
}
