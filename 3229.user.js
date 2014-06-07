// ==UserScript==
// @name		  OGame Banned Players
// @namespace	 OGame Banned Players
// @description   It replaces the help link with the link to the list of the banned players (tested in http://www.ogame.it/ and not tested with commander)
// @include	   http://*/game/leftmenu.php?session=*
// @exclude	   
// ==/UserScript==    

element = document.evaluate('/HTML[1]/BODY[1]/CENTER[1]/TABLE[1]/TBODY[1]/TR[18]/TD[1]/DIV[1]/FONT[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
element.innerHTML = '<a href="pranger.php" target="Hauptframe">Banned</a>';

//ogamebannedplayers.user.js

