// ==UserScript==
// @name           GLB Agent Activity
// @namespace      GLB
// @description    Show Agent Activity on Player Page
// @include        http://goallineblitz.com/game/player.pl?player_id=*
// ==/UserScript==
// 
// 


var links = document.getElementsByTagName('a');
var playerlink = '';
var linkitem = 0;
for (var q=0;q<links.length;q++) {
    if (links[q].href.indexOf('home.pl?user_id')>-1) {
        linkitem = q;
        playerlink = links[q].href;
    }
}
GM_xmlhttpRequest({
	method: 'GET',
	url: playerlink,
	headers: {
		'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
		'Accept': 'application/atom+xml,application/xml,text/xml',
	},
	onload: function(opteam) {
         var outputtext = opteam.responseText;
         var itemsplit = outputtext.split('<td class="account_value">');
         if(itemsplit[1].indexOf('Last Action:')>-1) {
             var lastactioninfo = itemsplit[2].substring(0,itemsplit[2].indexOf('</td>'));
             links[linkitem].parentNode.innerHTML += ' (' + lastactioninfo + ')';
             if (itemsplit[1].indexOf('<b><i>(banned)</i></b>')>-1) {
                 links[linkitem].parentNode.innerHTML += '<br><b><i>(banned)</i></b>';
             }
         }
    }
});
