// ==UserScript==
// @name           GLB Friends List
// @namespace      Branden Guess
// @description    This will add a friends list to your home page on GLB
// @include        http://goallineblitz.com/game/home.pl
// ==/UserScript==

var container=document.getElementById('content')
var avatar='http://goallineblitz.com/game/user_pic.pl?user_id='
var friendlink='http://goallineblitz.com/game/home.pl?user_id='
//Friend 1
//ID -
var id1='3327'
//name - 
var name1='Spencer'

//Friend 2
//ID - 
var id2='23671'
//name - 
var name2='Texaninma'

//Friend 3
//ID - 
var id3='4367'
//name - 
var name3='Tilly'


container.innerHTML = container.innerHTML + '<div class="medium_head">' +
'My Friends</div>' +
'<table><tr>' +
'<td><img src="' + avatar + id1 + '" width="75" height="75">' +
'<br><a href="' + 
friendlink + id1 + '">' + name1 + '</a></td>' +
'<td><img src="' + avatar + id2 + '" width="75" height="75">' +
'<br><a href="' + 
friendlink + id2 + '">' + name2 + '</a></td>' + 
'<td><img src="' + avatar + id3 + '" width="75" height="75">' +
'<br><a href="' + 
friendlink + id3 + '">' + name3 + '</a></td>' +
'</tr></table>'