// ==UserScript==
// @name           Triburile K pe sat
// @description    cind te uiti la profilu unui player la sat pune si K-ul de care tine un sat
// @include        http://ro*.triburile.ro/game.php*screen=info_player&id*
// @version        0.0.3
// ==/UserScript==
if(unsafeWindow.console){
   var GM_log = unsafeWindow.console.log;
}
try{
	var xpath = "//td[string-length()=7][substring(.,4,1)='|'][number(substring(.,1,3))>0][number(substring(.,5,3))>0]";
	var snap = document.evaluate( xpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
	if ( snap.snapshotLength>0 ) {
		for(i=0;i<snap.snapshotLength; i++) {
			elem = snap.snapshotItem(i);
			numere = elem.innerHTML.split("|");
			if ( numere.length >= 2 ) {
				x = parseInt(numere[0]);
				y = parseInt(numere[1]);
				elem.innerHTML+="=K"+(parseInt(x/100)+parseInt(y/100)*10);
			}
		}
	}
} catch(ex) { 
	GM_log(ex.message); 
}

