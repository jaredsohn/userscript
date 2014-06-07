// ==UserScript==
// @name           GLB Friends List
// @namespace      Branden Guess
// @description    This will add a friends list to your home page on GLB
// @include        http://goallineblitz.com/game/home.pl
// ==/UserScript==

var container=document.getElementById('content');
var avatar='http://goallineblitz.com/game/user_pic.pl?user_id=';
var friendlink='http://goallineblitz.com/game/home.pl?user_id=';
var htmlFriends = "";

var friends = new Array(new Array('16398','Coach Blunderkopf'),
				new Array('10406','Phisch'),
				new Array('21370','DaRockShow'),
				new Array('19257','SergeStorms'),
				new Array('128521','slappdogg'),
				new Array('69985','Skyrek'),
				new Array('117105','wulfgar61'),
				new Array('101567','primtim'));

htmlFriends += '<div class="medium_head">' + 'My Friends</div>' + '<table><tr>';

for(i=0;i<friends.length;i++) {
	htmlFriends += '<td><a href="' + 
				friendlink + friends[i][0] + '" style="text-decoration:none"><img src="' + avatar + friends[i][0] + '" border="0" width="75" height="75">' +
				'<br>' + friends[i][1] + '</a></td>';
}

container.innerHTML +=  htmlFriends + '</tr></table>';