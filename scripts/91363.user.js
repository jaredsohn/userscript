// ==UserScript==
// @name           إعادة الهجوم مرة أخرى بنفس الجيش
// @namespace      Die Stämme
// @author         تعريب: محمد احمد 20
// @description    هذا السيكربت يقوم بإعادة الهجوم مرة أخرى بنفس الجيش عن طريق الضغط على زر m 
// @include        http://ae*tribalwars.ae/game.php?*screen=report*&view=*
// ==/UserScript==

// ================ Einstellungen ========================
var taste = 'M';		// Die Taste, die den Link ausloesen soll. ACHTUNG: Hier unbedingt einen Großbuchstaben angeben!
var ascii = false;		// Gibt an, ob die Taste als ASCII-Wert (true) oder als normales Zeichen (false) angegeben ist.
var open_new = true;	// true, wenn ein neuer Tab geöffnet werden soll; false, wenn die Seite im aktuellen Tab geladen werden soll
// =======================================================



(function main(){
if(!location.href.match("http://.+\..+tribalwars\ae+/game\.php\?.+screen=report.+&view=")) return;

var lnk = null, lnks = document.getElementsByTagName("a");
for(var i=0;i<lnks.length;i++){
	if(lnks[i].href.match("screen=place&try=confirm&type=same&report_id=")){
		lnk = lnks[i];
		break;
	}
}
if(!lnk) return;

function listener(e){
	var key = e.which;
	if((ascii && parseInt(taste) == key) || (!ascii && taste.charCodeAt(0) == key)){
		if(open_new)
			var f = window.open(lnk.href,"");
		else
			location.href = lnk.href;
	}
}

document.addEventListener("keyup",listener,false);

})();