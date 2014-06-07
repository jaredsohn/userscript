// ==UserScript==
// @name           test
// @namespace      GLB
// @include        http://goallineblitz.com/game/home.pl?user_id=42039
// ==/UserScript==

var image = document.getElementById('my_account')
var id = document.location.href
var id = id.split('user_id=')[1];
image.innerHTML = ""
for(var i=0,j=250; i<j; i++){      
image.innerHTML = image.innerHTML + '<a href="/game/home.pl?user_id=' + id + '"><img width="75" height="75" src="/game/user_pic.pl?user_id=' + id + '"></a>'
id++
}
var teams = document.getElementById('players_teams')
teams.innerHTML = ""