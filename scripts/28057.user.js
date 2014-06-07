// ==UserScript==
// @name           Waiting List Position
// @namespace      Branden Guess
// @description    This adds your waiting list position to the home page.
// @include        http://goallineblitz.com/game/home.pl
// ==/UserScript==

GM_xmlhttpRequest({    method: 'GET',    url: 'http://goallineblitz.com/game/buy_team.pl',    headers: {        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',        'Accept': 'application/atom+xml,application/xml,text/xml',    },    onload: function(cash) {
var response1=cash.responseText
var position=response1.split('<b>Wait List Position:</b>')
var position1=position[1].split('<br>')
var positionfinal=position1[0]
var container=document.getElementById('my_account_content')
container.innerHTML = container.innerHTML + '<tr><td class="account_' +
'head">Waiting List Position:</td><td class="account_value">' + 
positionfinal + '</td></tr>'
}
});