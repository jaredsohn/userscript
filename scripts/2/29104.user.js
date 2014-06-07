// ==UserScript==
// @name GLB Team Expiration
// @description Adds the day ownership expires to the team profile page for the owner.
// @include http://goallineblitz.com/game/team.pl?team_id=637
// ==/UserScript==

GM_xmlhttpRequest({
method: 'GET',
url: 'http://goallineblitz.com/game/extend_team.pl?team_id=637&action=Select',
headers: {
'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
'Accept': 'application/atom+xml,application/xml,text/xml',
},
onload: function(expday) {
var response1=expday.responseText
var newmsg=response1.split('<b>Expiration Day:</b> ')
var newmsg1=newmsg[1].split('<br>')
var newmsgfinal=newmsg1[0]
var container=document.getElementById('team_owner')
container.innerHTML = '<b>Expiration Day:</b> ' + newmsgfinal + '<br>' + container.innerHTML
}
});