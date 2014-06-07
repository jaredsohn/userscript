// ==UserScript==
// @name        Home Page
// @namespace   StillHaveNone@nowebspace.com
// @description  New Homepage
// @include       http://home.myspace.com/index.cfm?fuseaction=user*MyToken*
// @include       http://home.myspace.com/index.cfm?fuseaction=user
// ==/UserScript==


//style sheet

s=   '';
s+= '#ctl00_Main_ctl00_InfoBar1_pnlAdSpot {display:none;}';
s+= '.col {display:none;}';
s+= '#home_bulletins {position:absolute;left:50%;margin-left:240px;top:5px;z-index:3;overflow-y:auto;width:325px;background:transparent !important}';
s+= '#home_friends span {font-size:19pt !important;font-family:Candice !important;font-weight:normal !important;color:#860000 !important;}';
s+= '#headerlinks {display:none;}';
s+= 'form {display:none;}';
s+= '#footer {display:none;}';
s+= '#topnav {visibility:hidden;}';
s+= '#topnav a {visibility:visible !important;}';
s+= 'body {background-image:url(http://i69.photobucket.com/albums/i47/chrgid/b.jpg);background-repeat:repeat;background-position:center center;background-attachment:fixed;background-color:#000000;overflow:hidden;}';
s+= '#ctl00_Main_ctl00_Welcome1_imgDefaultImage {max-height:150px !important;}';
s+= '#home_image img {position:relative;top:-10px;}';
s+= '#home_friends div {position:relative;top:20px;}';
s+= 'table, tr, td, th,span,div, .left, .heading {background:black !important}';
s+= '#main{border: 5px double white !important;}';
s+= '* {font-family:silkscreen !important;font-size:7pt !important;text-transform:capitalize !important;font-weight:lighter !important;border:none !important;}';
s+= '.bulletinDate {color:#FFFFFF !important;}';
s+= 'a {color:#FFFFFF !important;}';
s+= 'img {filter:-moz-opacity:0.65;opacity:0.65;}';
s+= 'a:hover img {opacity:1.0;-moz-opacity:1.0;}';
s+= 'a:hover {text-decoration:none !important;}';
s+= '.left, center, th, #home_bulletinMaintenance {color:#FFFFFF !important}';
s+= 'li {color:#FFFFFF!important;text-align:left !important;}';
s+= '#topnav span {display:none;}';
s+= '#home_profileInfo {position:relative;top:6px;}';
s+= '.txtRed {font-size:6pt !important;color:#FFFFFF !important;}';
s+= '#home_messages {position:relative !important;top:-50px !important;height:215px;width:340px;overflow-y:auto;}';
s+= '#indicatorMail a img, #indicatorFriendRequest a img, #indicatorComments a img, #indicatorImageComments a img, #indicatorBlogComments a img, #indicatorBlogs a img, #indicatorEvents a img, #indicatorBirthday a img {max-height:10px !important;}';
s+= '#indicatorMail a, #indicatorFriendRequest a, #indicatorComments a, #indicatorImageComments a, #indicatorBlogComments a, #indicatorBlogs a, #indicatorEvents a, #indicatorBirthday a {font-size:6pt !important;}';
s+= '#home_friends {position:relative;top:128px;}';
s+= '#home_friends h5 {position:relative;right:15px;width:400px !important;}';
s+= '#home_friends h5 span {position:relative;top:-15px;color:#860000 !important;}';
s+= '#home_friends a img {max-height:115px;position:relative;top:-35px;border-width:3px 3px 15px 3px !important;border-color:#FFFFFF !important;border-style:solid !important;}';
s+= '#home_schools {display:none;}';
s+= '#home_searchAddressBook {display:none;}';
s+= '#home_additionalLinks {display:none;}';
s+= '#home_userURLInfo {display:none;}';
s+= '#home_setHomePage {display:none;}';
s+= '#home_announcements {display:none;}';
s+= '.lnxDIV{ position: absolute; left: 50%; top:500px; margin-left:-385px; height: 15px; width: 165px; background-color:transparent; z-index:2;}';
s+= '#ctl00_Main_ctl00_Bulletins1_HyperLink2 {display:none;}';
s+= '.heading {border-bottom:3px white double !important;width:315px;text-align:left;}';
s+= '#home_bulletins td {text-align:center;}';
s+= '#home_bulletins a img {max-height:20px;}';
s+= '#topnav {font-size:9pt;font-family:Arial;letter-spacing:1px;}';
s+= 'h4 {font-size:25pt !important;font-family:Candice !important;font-weight:normal !important;color:#860000 !important;}';
s+= 'h5 {font-size:19pt !important;font-family:Candice !important;font-weight:normal !important;color:#860000 !important;}';
s+= ' td li {white-space:nowrap;}';
s+= '#squareAd, #home_infoBar, iframe {display:none;}';
s+= '#splash_coolNewPeople, #splash_coolNewPeopleBrowse {display:none;}';
s+= 'strong {display:none;}';
s+= '#ctl00_Main_ctl00_FriendSpace1_Panel1, #ctl00_Main_ctl00_FriendSpace1_Tr1 {display:none;}';
s+= 'h5 a, center {display:none;}';
s+= '#UserDataNode0, #UserDataNode1, #UserDataNode2, #UserDataNode3 {display:none;}';
s+= '#ctl00_Main_ctl00_FriendSpace1_FriendRepeater_ctl04_friendLink, #ctl00_Main_ctl00_FriendSpace1_FriendRepeater_ctl05_friendLink, #ctl00_Main_ctl00_FriendSpace1_FriendRepeater_ctl06_friendLink, #ctl00_Main_ctl00_FriendSpace1_FriendRepeater_ctl07_friendLink, #ctl00_Main_ctl00_FriendSpace1_FriendRepeater_ctl01_friendLink, #ctl00_Main_ctl00_FriendSpace1_FriendRepeater_ctl00_friendLink, #ctl00_Main_ctl00_FriendSpace1_FriendRepeater_ctl02_friendLink, #ctl00_Main_ctl00_FriendSpace1_FriendRepeater_ctl03_friendLink {display:none;}';

GM_addStyle(s);

name = document.body.innerHTML.replace(/Hello.*!/, 'Hola, Mateo');
document.body.innerHTML = name;
TehDiv = document.createElement("div");
TehDiv.setAttribute("class", "lnxDIV");
document.getElementById('body').appendChild(TehDiv);
TehDiv.innerHTML = '<h5 class="heading">My Links</h5><br /><table cellpadding="5" cellspacing="5"><tr><td><li type="circle"><a href="http://profile.myspace.com/index.cfm?fuseaction=user.viewprofile&friendid=35098663">View Profile</a></li></td><td><li type="circle"><a href="http://comments.myspace.com/index.cfm?fuseaction=user.HomeComments&friendID=35098663">View Comments</a></li></td></tr><tr><td><li type="circle"><a href="http://groups.myspace.com/index.cfm?fuseaction=groups.myGroups&userid=35098663">My Groups</a></li></td><td><li type="circle"><a href="http://bulletin.myspace.com/index.cfm?fuseaction=bulletin.ShowMyBulletins">My Bulletins</a></li></td></tr><tr><td><li type="circle"><a href="http://collect.myspace.com/index.cfm?fuseaction=user.editTopFriends&friendID=35098663">Change Top Friends</a></li></td><td><li type="circle"><a href="http://home.myspace.com/index.cfm?fuseaction=user.viewfriends&friendID=35098663">View Friends</a></li></td></tr><tr><td><li type="circle"><a href="http://collect.myspace.com/index.cfm?fuseaction=user.birthdays&friendID=35098663">View Upcoming Birthdays</a></li></td><td><li type="circle"><a href="http://forum.myspace.com/index.cfm?fuseaction=messageboard.viewCategory&CategoryID=68">Teh Forum</a></li></td></tr><tr><td><li type="circle"><a href="http://bulletin.myspace.com/index.cfm?fuseaction=bulletin">View Bulletins</a></li></td><td><li type="circle"><a href="http://collect.myspace.com/index.cfm?fuseaction=signout">Sign Out</a></li></td></tr></table>';

