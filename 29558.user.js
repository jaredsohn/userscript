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
var id1='42776'
//name - 
var name1='Chief31'

//Friend 2
//ID - 
var id2='109540'
//name - 
var name2='Bedgood42'

//Friend 3
//ID - 
var id3='130285'
//name - 
var name3='Garidan'

//Friend 4
//ID - 
var id4='129173'
//name - 
var name4='bmculloch21'

//Friend 5
//ID - 
var id5='137857'
//name - 
var name5='TNK'

//Friend 6
//ID - 
var id6='128428'
//name - 
var name6='LilD12'

//Friend 7
//ID - 
var id7='112529'
//name - 
var name7='montclaire'

//Friend 8
//ID - 
var id8='93013'
//name - 
var name8='Wally Smith'

//Friend 9
//ID - 
var id9='68223'
//name - 
var name9='Lewis55'

//Friend 10
//ID - 
var id10='17390'
//name - 
var name10='timufcwwf'

//Friend 11
//ID - 
var id11='30286'
//name - 
var name11='kretchfoop'

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
friendlink + id6 + '">' + name6 + 
'<td><img src="' + avatar + id7 + '" width="75" height="75">' +
'<br><a href="' + 
friendlink + id7 + '">' + name7 + '</a></td>' + 
'<td><img src="' + avatar + id8 + '" width="75" height="75">' +
'<br><a href="' + 
friendlink + id8 + '">' + name8 + '</a></td>' + 
'<td><img src="' + avatar + id9 + '" width="75" height="75">' +
'<br><a href="' + 
friendlink + id9 + '">' + name9 + '</a></td>' + 
'<td><img src="' + avatar + id10 + '" width="75" height="75">' +
'<br><a href="' + 
friendlink + id10 + '">' + name10 + '</a></td>' + 
'<td><img src="' + avatar + id11 + '" width="75" height="75">' +
'<br><a href="' + 
friendlink + id11 + '">' + name11 + '</a></td>' + 
'</tr></table>'