// ==UserScript==
// @name                       BILD-Links ausblenden
// @author                     Danzelot
// @namespace                  http://userscripts.org/users/danzelot
// @include                    http://forum.mods.de/bb/thread.php?TID=*
// @gawd_of_teh_javascripts    Kambfhase
// ==/UserScript==

links = GM_getValue('blockedlinks', 'bild.de,bz-berlin.de').split(',');

function setLinks() {
	var newlinks = window.prompt('Zu blockende Adressen mit Komma getrennt eingeben.', links);
	GM_setValue('blockedlinks', newlinks);
	document.location.reload();
}

GM_registerMenuCommand('Geblockte Adressen ändern', function() {setLinks()});


var postselector = '';
var linkselector = '';

for( var i in links) {
	postselector += ".posttext > a[href*='"+links[i]+"']"+(i<links.length-1?',':'');
	linkselector += ".posttext > a[href*='"+links[i]+"']"+(i<links.length-1?',':'');
}
Array.forEach(document.querySelectorAll("tr[username]"), function(tr) {
    if(tr.querySelector(postselector)) {
        tr.style.display = "none";
        tr.nextElementSibling.style.display = "none";
    }
});
Array.forEach(document.querySelectorAll(linkselector), function(a) {
	a.style.display = "none";
});