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
var id1='143832'
//name - 
var name1='Phil'

//Friend 2
//ID - 
var id2='144166'
//name - 
var name2='Anthony'

//Friend 3
//ID - 
var id3='96861'
//name - 
var name3='Jake'

//Friend 4
//ID - 
var id4='83690'
//name - 
var name4='windnite'

//Friend 5
//ID - 
var id5='79335'
//name - 
var name5='DDB'

//Friend 6
//ID - 
var id6='81535'
//name - 
var name6='SkidMark'

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