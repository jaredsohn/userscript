// ==UserScript==
// @name           Travian WhoIs?
// @author         Rayl
// @namespace      http://leonardosite.it/
// @version        0.1
// @description    SOLO per la versione T3.6
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js
// @include        http://*.travian.*/build.php?id=39*
// @include        http://*.travian.*/build.php?gid=16*
// ==/UserScript==

var nameLink = $a('???',[['href',jsVoid]]);
	nameLink.addEventListener('click', prepareGetAttakers, false);
	var newSP = ver4FL ? $ee('DIV',nameLink,[['style',"position:absolute;margin:5px -30px;"]]):
		$em('SPAN',[' | ',nameLink]);
	if( ver4FL ) tmenu.insertBefore(newSP,tmenu.firstChild); else tmenu.appendChild(newSP);

	if( ver4FL ) {
		var attFI = $ee('BUTTON',trImg('iReport iReport1'),[['class',"iconFilter"],['onClick',jsNone]]);
		attFI.addEventListener('click', filterIncomeTroops, false);
		tmenu.insertBefore(attFI,tmenu.firstChild.nextSibling);