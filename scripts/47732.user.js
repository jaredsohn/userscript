// ==UserScript==
// @name          Element Chart
// @namespace     http://userscripts.org/scripts/show/47732
// @description   Adds the Elemental Flowchart to the bottom of the character pane.
// @include       *kingdomofloathing.com/charpane.php*
// @include       *127.0.0.1:*/charpane.php*
// ==/UserScript==

var element = '<div style="margin: 1px;"><a href="charpane.php"><img src="http://kol.coldfront.net/thekolwiki/images/1/19/Elements2.gif" title="Elementary!" alt="element chart" style="width: 95%; border: none;" ></a></div>';
document.body.innerHTML += element;