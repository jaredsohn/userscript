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
var id1='9761'
//name - 
var name1='jmarter'

//Friend 2
//ID - 
var id2='91035'
//name - 
var name2='RunOverYou'

//Friend 3
//ID - 
var id3='120573'
//name - 
var name3='Roren1'

//Friend 4
//ID - 
var id4='45225'
//name - 
var name4='jrogers79'

//Friend 5
//ID - 
var id5='37924'
//name - 
var name5='Forest21'

//Friend 6
//ID - 
var id6='1'
//name - 
var name6='Bort'

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
'<td><img src="' + avatar + id4 + '" width="75" height="75">' +
'<br><a href="' + 
friendlink + id4 + '">' + name4 + '</a></td>' +
'<td><img src="' + avatar + id5 + '" width="75" height="75">' +
'<br><a href="' + 
friendlink + id5 + '">' + name5 + '</a></td>' +
'<td><img src="' + avatar + id6 + '" width="75" height="75">' +
'<br><a href="' + 
friendlink + id6 + '">' + name6 + '</a></td>' +
'</tr></table>'

