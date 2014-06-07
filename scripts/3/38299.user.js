// ==UserScript==
// @name          MySpaceHax (Mastered)
// @namespace     
// @description   Places ALL necessary links on the RIGHT side of ALL user pages for quick and easy use
// @include       http://*.myspace.com/index.cfm?fuseaction=*&friendid=*
// @include       http://www.myspace.com/*
// ==/UserScript==

//      Made By: Unknown (email me to add thanks)
//	Improvements By:	AngusTB
//	UserScript Profile:	http://userscripts.org/users/58389

// find friendID

var path = location.href;
var query = '';
if(path.indexOf('friendID=') > 0)
	query = 'friendID=';
if(path.indexOf('friendid=') > 0)
	query = 'friendid=';
var section = path.split(query);
var friendID = '';
if(section.length > 1)
        friendID = section[1];
section = friendID.split('&');
if(section.length > 1)
        friendID = section[0];
//alert('|'+path+'|'+friendID+'|');

// add menu

var myHaxMenu = document.createElement("div");
myHaxMenu.innerHTML = '<style type="text/css">'
+'<!--'
+'#myhaxlayer #table1 a {'
+'text-decoration: none !important;'
+'color: #000000 !important;'
+'font-family: Verdana, Arial, Helvetica, sans-serif !important;'
+'font-size: 10px !important;'
+'font-weight: bold !important;'
+'font-style: normal !important;'
+'}'
+'#myhaxlayer #table1 a:hover {'
+'text-decoration: none !important;'
+'color: #0000FF !important;'
+'font-family: Verdana, Arial, Helvetica, sans-serif !important;'
+'font-size: 10px !important;'
+'font-weight: bold !important;'
+'font-style: normal !important;'
+'}'
+'#myhaxlayer #table1 {'
+'background-color: #CCCCCC !important;'
+'}'
+'-->'
+'</style>'
+'<div style="position: absolute; width: 65px; height: 100px; z-index: 1; right; top: 0pt; right: 0pt" id="myhaxlayer">'
+'<table border="0" width="100%" id="table1" bgcolor="#C0C0C0">'
+'<tr><td><p align="left">'
+'<font color="white">Actions</font><br>'
+'<a href="http://collect.myspace.com/index.cfm?fuseaction=invite.addfriend_verify&friendID='+friendID+'"">..Add</a><br>'
+'<a href="http://messaging.myspace.com/index.cfm?fuseaction=mail.message&friendID='+friendID+'">..Message</a><br>'
+'<a href="http://comment.myspace.com/index.cfm?fuseaction=user.viewProfile_commentForm&friendID='+friendID+'">..Comment</a><br>'
+'<a href="http://collect.myspace.com/index.cfm?fuseaction=user.addToFavorite&friendID='+friendID+'&public=0">..Favorite</a><br>'
+'<a href="http://friends.myspace.com/index.cfm?fuseaction=block.blockUser&userID='+friendID+'">..Block</a><br><br>'
+'<font color="white">View</font><br>'
+'<a href="http://profile.myspace.com/index.cfm?fuseaction=user.viewprofile&friendid='+friendID+'">..Profile</a><br>'
+'<a href="http://viewmorepics.myspace.com/index.cfm?fuseaction=user.viewAlbums2&friendID='+friendID+'&view=true">..Pictures</a><br>'
+'<a href="http://comments.myspace.com/index.cfm?fuseaction=user.viewComments&friendID='+friendID+'">..Comments</a><br>'
+'<a href="http://home.myspace.com/index.cfm?fuseaction=user.viewfriends&friendID='+friendID+'">..Friends</a><br>'
+'<a href="http://blog.myspace.com/index.cfm?fuseaction=blog.ListAll&friendID='+friendID+'">..Blogs</a><br>'
+'</font></td></tr></table></div>';
document.body.insertBefore(myHaxMenu, document.body.firstChild);
