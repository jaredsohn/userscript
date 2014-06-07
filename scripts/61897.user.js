// ==UserScript==
// @name Pennergame StadtPortal blockt bild und stellt wieder das men? her fuer Berlin / Hamburg
// @namespace   by newman by basti1012
// @description    blockt das schoene bild die tolle erfindung von pennergame
// @include        http://*pennergame.de/city/
// ==/UserScript==

document.getElementsByClassName('listshop')[0].removeChild(document.getElementsByClassName('listshop')[0].getElementsByTagName('script')[0]);
document.getElementById('content').removeChild(document.getElementById('content').getElementsByTagName('script')[0]);
document.getElementsByClassName('listshop')[0].removeChild(document.getElementsByClassName('listshop')[0].getElementsByTagName("object")[0]);

// copyright by diamonddog  by newman  und by bast1012