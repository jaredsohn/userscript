// ==UserScript==
// @name              Loudsur13's Homepage
// @namespace         myspace.com/Loudsur13
// @description       Customized Homepage To Match Profile
// @include           http://*myspace.com/*=user
// @include           http://*myspace.com/*=user&*
// ==/UserScript==

if(location.href.match(/collect.*=user.*[^(commentForm)]*/)) location.href = 'http://myspace.com/index.cfm?fuseaction=user';

var friendid1 = document.getElementById('ctl00_Main_ctl00_Welcome1_ViewMyProfileHyperLink').href;
var friendid = friendid1.replace(/http.*friendid=/, '');

s = "body{background:url(http://img120.imageshack.us/img120/5689/graybgci8.png) center repeat-y #FFFFFF!important;}\n";
s+= "#header,#home_additionalLinks,#home_userURLInfo,#home_setHomePage,#home_schools,#home_searchAddressBook,#splash_coolNewPeople,#splash_profile,th,#footer, #squareAd {display:none;}\n";
s+= "div, table, tr, td, .heading{color:#000000!important; background-color:transparent!important;border:0px!important;}\n";
s+= "#topnav{background:#A3A3A3!important; color:#FFFFFF!important; padding-top:55px!important;}\n";
s+= "a{color:#A3A3A3!important;text-decoration:none!important;}\n";
s+= "a:hover{color:#000000!important;}\n";
s+= "#topnav a{color:#FFFFFF!important;}\n";
s+= "#topnav a:hover{color:000000!important;}\n";
s+= ".heading{border-bottom: 1px solid #000000!important; height:20!important; padding-bottom:0px!important; padding-top:0px!important; text-align:left;}\n";
s+= "#home_infoBar span, strong span{color:#000000!important;}\n";
s+= ".heading{font-size:12pt!important; line-height:18px!important; letter-spacing:1px;}\n";
s+= "#home_profileInfoLinks a, #ctl00_Main_ctl00_Bulletins1_HyperLink2 {padding-left:5px;border-left:10px solid; display:block;text-align:left;}\n";
s+= "#home_profileInfoLinks a:hover {padding-left:10px;border-left:10px solid; text-align:center; background-color:#a3a3a3;}\n";
s+= "#home_profileInfoLinks br{display:none;}\n";
s+= "#home_profileInfoLinks a{ width:120px;}\n";
s+= "#ctl00_Main_ctl00_Bulletins1_HyperLink2 {padding-right:5px;border-right:10px solid; text-align:center;}\n";
s+= "#ctl00_Main_ctl00_Bulletins1_HyperLink2:hover {letter-spacing:3px;}\n";
s+= "#main{min-height:0!important;height:0px!important}\n";
s+= ".indicator span {color:#a3a3a3;}\n";
s+= "#ctl00_Main_ctl00_Bulletins1_HyperLink2{position:relative; top:10px;}\n";
s+= "a img{border:1px solid #A3A3A3; opacity:0.7}\n";
s+= "a:hover img{border:1px solid  #000000; opacity:1.0;}\n";
s+= "#home_infoBar{position:absolute;top:735px;left:-346px; width:320px;}\n";
s+= "#home_friends{position:absolute; top:0px;}\n";
s+= "#squareAd {position:absolute; top:850px; left:-336px;}\n";
s+= "#home_profileInfo{position:relative; top:5px;}\n";
s+= "#ctl00_Main_ctl00_Welcome1_imgDefaultImage{ border: 1px solid #a3a3a3;}\n";
s+= "#home_bulletins table tr td {background:#a3a3a3;}\n";
s+= "#home_bulletins a { display:block; color:#a3a3a3;}\n";
s+= "#home_bulletins a:hover {text-align:center; color:#FFFFFF; background-color:#a3a3a3;}\n";
s+= "#ctl00_Main_ctl00_CMS_Tom_Announcement,#home_greybox, #splash_profile, #ctl00_Main_ctl00_InfoBar1_AdSpotImage {display:none;}\n";
s+= "#home_infoBar strong, #home_infoBar span, #home_infoBar a {display:block;}\n";
s+= "#home_infoBar br {display:none}\n";
s+= "#home_infoBar a:hover {background-color:#a3a3a3; color:#000000; letter-spacing:1px;}\n";
s+= "#home_infoBar strong {border-top:5px solid #FFFFFF;}\n";
s+= "#ctl00_Main_ctl00_Bulletins1_BulletinRepeater_ctl00_BulletinSenderHyperLink,\n";
s+= "#ctl00_Main_ctl00_Bulletins1_BulletinRepeater_ctl01_BulletinSenderHyperLink,\n";
s+= "#ctl00_Main_ctl00_Bulletins1_BulletinRepeater_ctl02_BulletinSenderHyperLink,\n";
s+= "#ctl00_Main_ctl00_Bulletins1_BulletinRepeater_ctl03_BulletinSenderHyperLink,\n";
s+= "#ctl00_Main_ctl00_Bulletins1_BulletinRepeater_ctl04_BulletinSenderHyperLink, {display:block; border:1px solid #a3a3a3;} \n";
s+= "table#bulletins td {border:1px solid #a3a3a3;}\n";
s+= "#ctl00_Main_ctl00_MessageCenter1_HelpHyperLink, #ctl00_Main_ctl00_MessageCenter1_HyperLink1,#ctl00_Main_ctl00_MessageCenter1_HyperLink2, #ctl00_Main_ctl00_MessageCenter1_HyperLink3 {display:block; background-color:#FFFFFF; border:1px solid #a3a3a3; height:20px; padding-top:5px; width:140px;}\n";
s+= "#ctl00_Main_ctl00_MessageCenter1_HelpHyperLink:hover, #ctl00_Main_ctl00_MessageCenter1_HyperLink1:hover, #ctl00_Main_ctl00_MessageCenter1_HyperLink2:hover, #ctl00_Main_ctl00_MessageCenter1_HyperLink3:hover {background-color:#a3a3a3; color:#FFFFFF;}\n";
s+= "td.tenpadleft {padding-left:12px;}\n";
s+= "table#bulletins td {vertical-align: middle;}\n";
s+= "ul#navlist { font-family: arial; }\n";
s+= "ul#navlist a {font-weight:bold ; display:block; border-left:10px;}\n";
s+= "ul#navlist, ul#navlist ul, ul#navlist li{margin: 0px;padding: 0px;list-style-type: none;}\n";
s+= "ul#navlist li { float: left; }\n";
s+= "ul#navlist li a {color: #FFFFFF;background-color: #FFFFFF;padding-left: 5px;border-left: 10px solid #a3a3a3; font-weight:bold}\n";
s+= "ul#navlist li a:hover{color: #000000;background-color: #a3a3a3;}\n";
s+= "ul#navlist li a:active{color: #a3a3a3;background-color: #FFFFFF;}\n";
s+= "ul#subnavlist { display: none; }\n";
s+= "ul#subnavlist li { float: none; }\n";
s+= "ul#subnavlist li a{padding: 0px;margin: 0px;}\n";
s+= "ul#navlist li:hover ul#subnavlist{display: block;position: absolute;font-size: 8pt;padding-top: 5px;}\n";
s+= "ul#navlist li:hover ul#subnavlist li a{display: block;width: 120px;border: none; border-left:10px solid #a3a3a3;font-weight:bold; padding-left:5px;}\n";
s+= "ul#navlist li:hover ul#subnavlist li a:hover {border-left:10px solid #000000;font-weight:bold}\n";
s+= "ul#navlist li:hover ul#subnavlist li {border:1px solid #FFFFFF; padding-left:10px}\n";
s+= "ul#navlist li:hover ul#subnavlist {background-color:#ffffff;}\n";

html = document.body.innerHTML.replace(/Hello,/, "Was Krackin"); 
document.body.innerHTML = html;

html = document.body.innerHTML.replace(/classifieds.myspace.*Classifieds/, 'viewmorepics.myspace.com/index.cfm?fuseaction=signout">Signout');
document.body.innerHTML = html;

html = document.body.innerHTML.replace(/vids.myspace.*Videos/, 'comments.myspace.com/index.cfm?fuseaction=user.homeComments&friendID='+friendid+'">Comments');
document.body.innerHTML = html;

html = document.body.innerHTML.replace(/ My Friend Space/, "The Young Hustlas"); 
document.body.innerHTML = html;

document.getElementById('home_profileInfoLinks').innerHTML = '<table width="120" cellpadding="1" cellspacing="0"><tr><td><div id="navcontainer"><ul id="navlist"><li id="active"><a href="http://profileedit.myspace.com/index.cfm?fuseaction=profile.interests" id="current">Edit Profile</a><ul id="subnavlist"><li id="subactive"><a href="http://profileedit.myspace.com/index.cfm?fuseaction=profile.names">Name</a></li><li><a href="http://profileedit.myspace.com/index.cfm?fuseaction=profile.basic">Basic Info</a></li><li><a href="http://profileedit.myspace.com/index.cfm?fuseaction=profile.lifestyle">Background</a></li><li><a href="http://profileedit.myspace.com/index.cfm?fuseaction=profile.schools">Schools</a></li><li><a href="http://profileedit.myspace.com/index.cfm?fuseaction=profile.companies">Companies</a></li><li><a href="http://profileedit.myspace.com/index.cfm?fuseaction=profile.networking">Networking</a></li><li><a href="http://profileedit.myspace.com/index.cfm?fuseaction=profile.editprofilesongs">Songs</a></li></ul></ul></div></td></tr><tr><td></td></tr><tr><td><a href="http://comment.myspace.com/index.cfm?fuseaction=user.viewComments&friendID='+friendid+'">Edit Comments</a></td></tr><tr><td><a href="http://editprofile.myspace.com/index.cfm?fuseaction=profile.safemode">Safe Mode</a></td></tr><tr><td><a href="http://settings.myspace.com/index.cfm?fuseaction=user.accountSetting">Account Settings</a></td></tr><tr><td></td></tr><tr><td><a href="http://photo.myspace.com/index.cfm?fuseaction=user.uploadphoto">Add/Edit Photos</a></td></tr><tr><td><a href="http://vids.myspace.com/index.cfm?fuseaction=vids.myvideos">Add/Change Videos</a></td></tr><tr><td></td></tr><tr><td><a href="http://events.myspace.com/index.cfm?fuseaction=mycalendar">Manage Calendar</a></td></tr><tr><td><a href="http://blog.myspace.com/index.cfm?fuseaction=blog.controlcenter">Manage Blog</a></td></tr><tr><td><a href="http://addressbook.myspace.com/index.cfm?fuseaction=adb">Manage Address Book</a></td></tr></table>';

GM_addStyle(s);
