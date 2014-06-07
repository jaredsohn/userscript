// ==UserScript==
// @name       	VDR-Portal yaVDR-Filter
// @description Entfernung der yaVDR-Beiträge aus der Portalansicht von www.vdr-portal.de
// @namespace  	default
// @include    	http://www.vdr-portal.de/index.php?page=Portal
// @copyright  	2011+, joker4791
// @license    	GPL version 3 oder jede spätere Version; http://www.gnu.org/copyleft/gpl.html
// @author     	joker4791
// @info       	Entfernung der yaVDR-Beiträge aus der Portalansicht von www.vdr-portal.de
// @info2      	<kein>
// @version    	2011-03-29 09:00
// ==/UserScript==

hideBoardThreads("http://www.vdr-portal.de/board60-linux/board14-betriebssystem/board96-yavdr/");

function hideBoardThreads( hrefString ){
	var aTags = document.getElementsByTagName("a");
	
	for (i = 0; i < aTags.length; i++){
		href = aTags[i].getAttribute("href");
		if (href && href.substring(0,hrefString.length) == hrefString){
			var box = aTags[i];
			var limit = 10;
			while (box && box.tagName != "TR" && box.parentNode && limit > 0){
				box = box.parentNode;
				limit--;
			}
			if (box && box.tagName == "TR"){
			   box.style.display = "none";
			}
		}
	}
}