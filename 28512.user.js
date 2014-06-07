// ==UserScript==
// @name           Paintball 2 Ban List: Add Player IDs
// @version        1.0.0
// @namespace      http://sk89q.therisenrealm.com
// @description    Adds player IDs to the Digital Paint: Paintball 2 ban list page
// @copyright      (c) 2009 sk89q (http://sk89q.therisenrealm.com)
// @include        http://dplogin.com/gbl/banlist.php
// @include        http://www.dplogin.com/gbl/banlist.php
// @include        https://dplogin.com/gbl/banlist.php
// @include        https://www.dplogin.com/gbl/banlist.php
// ==/UserScript==

var links = document.getElementsByTagName('a');
for (var i = 0; i < links.length; i++) {
    if (links[i].hasAttribute('href')) {
        var m;
        if (m = links[i].getAttribute('href').match(/^http:\/\/dplogin\.com\/index\.php\?action=viewmember&playerid=([0-9]+)$/)) {
            var idElement = document.createElement('span');
            idElement.appendChild(document.createTextNode('(#'+m[1]+')'));
            with (idElement.style) {
                background = '#000000';
                color = '#CCCCCC';
                margin = '0 0 0 10px';
            }
            links[i].parentNode.insertBefore(idElement, links[i].nextSibling);
        }
    }
}