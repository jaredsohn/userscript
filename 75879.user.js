// ==UserScript==
// @name           bestimmte posts ausblenden
// @author      Kambfhase
// @include        http://forum.mods.de/bb/thread.php?*
// ==/UserScript==
var posts = document.evaluate("//tr[@username and .//a[contains(@href,'bild.de')]]", document, null, 6, null),
i=0;
for(; i< posts.snapshotLength; ++i){
    posts.snapshotItem(i).className += " nichtzeigen";//.style.display = "none";
}

GM_addStyle('tr.nichtzeigen , tr.nichtzeigen+tr { display:none;}');