// ==UserScript==
// @name          jtxdriggers
// @namespace     myspace.com/
// @description	  myspace homepage
// @include       http://*myspace.com/*=user
// @include       http://*myspace.com/*=user&*
// ==/UserScript==

if (document.forms.length > 0) {

var pattern = "//div[@class=\"section\"]//div//center//a";
	var vl = document.evaluate( pattern, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
	var pl = vl.snapshotItem(0);
	if (pl)	{
		var friendID = pl.href.split("friendid=");
		var bloglink = document.createElement('a');
		bloglink.href = "http://blog.myspace.com/index.cfm?fuseaction=blog.ListAll&friendID="+friendID[1];
		bloglink.innerHTML = 'Blog';

		var frndlink = document.createElement('a');
		frndlink.href = "http://Home.myspace.com/index.cfm?fuseaction=user.viewfriends&friendID="+friendID[1];
		frndlink.innerHTML = 'Friends';

		var breakit = document.createElement('br');

		var spaceit = document.createElement('span');
		spaceit.innerHTML = '&nbsp;|&nbsp;';

		var cmtlink = document.getElementById('ctl00_Main_ctl00_Welcome1_ViewMyBlogHyperLink');
		cmtlink.href = "http://comments.myspace.com/index.cfm?fuseaction=user.HomeComments&friendID="+friendID[1];
		cmtlink.innerHTML = 'Comments'

		cmtlink.parentNode.insertBefore(bloglink, cmtlink);
		cmtlink.parentNode.insertBefore(breakit, cmtlink);
		cmtlink.parentNode.insertBefore(frndlink, cmtlink);
		cmtlink.parentNode.insertBefore(spaceit, cmtlink);
	}

	var pattern2 = "//div[@id=\"home_profileInfoLinks\"]//a";
	var wl = document.evaluate( pattern2, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
	var ql = wl.snapshotItem(0);
	if (ql)	{
		var editlink = document.createElement('a');
		editlink.href = "http://profileedit.myspace.com/index.cfm?fuseaction=profile.interests";
		editlink.innerHTML = 'Edit Profile';

		var seperate = document.createElement('span');
		seperate.innerHTML = '&nbsp;|';

		var smode = document.getElementById('ctl00_Main_ctl00_Welcome1_EditMyProfileHyperLink');
		smode.href = "http://editprofile.myspace.com/index.cfm?fuseaction=profile.safemode";
		smode.innerHTML = 'Safe Mode';

		smode.parentNode.insertBefore(editlink, smode);
		smode.parentNode.insertBefore(seperate, smode);
	}

	var pattern3 = "//div[@id=\"contentWrap\"]//div";
	var xl = document.evaluate( pattern3, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
	var rl = wl.snapshotItem(0);
	if (rl)	{
		var friendID = pl.href.split("friendid=");
		var ifrm = document.createElement("iframe");
		ifrm.setAttribute("src", "http://comments.myspace.com/index.cfm?fuseaction=user.HomeComments&friendID="+friendID[1]);
		ifrm.setAttribute("style", "border:1px solid white;background:black;position:relative;top:-13px;");
		ifrm.style.width = 431+"px";
		ifrm.style.height = 396+"px";

		var frndiv = document.getElementById('home_friends');
		frndiv.parentNode.insertBefore(ifrm, frndiv);
		frndiv.parentNode.removeChild(frndiv);
	}
}

s = "body{background:url(http://ihave.goldbananas.com/others/blueclouds.jpg) fixed center no-repeat #000!important;}\n";
s+= "#header,#home_additionalLinks,#home_userURLInfo,#home_setHomePage,#home_schools,#home_searchAddressBook,#splash_coolNewPeople,#splash_profile,#footer,#indicatorComments,#home_announcements{display:none;}\n";
s+= "#main{margin-top:40px!important;}\n";
s+= "table, td, tr{font-family:arial, tahoma, sans-serif; font-size:7pt; color:white!important; background-color:black!important;border:0px!important;}\n";
s+= "div{font-family:arial, tahoma, sans-serif; font-size:7pt; color:white!important; background-color:transparent!important;border:0px!important;}\n";
s+= "div div {font-family:arial, tahoma, sans-serif; font-size:7pt; color:white!important; background-color:transparent!important;border:0px!important;}\n";
s+= "div div div {font-family:arial, tahoma, sans-serif; font-size:7pt; color:white!important; background-color:transparent!important;border:0px solid white!important;}\n";
s+= "div div div div {font-family:arial, tahoma, sans-serif; font-size:7pt; color:white!important; background-color:black!important;border:1px solid white!important;}\n";
s+= "div div div div div {font-family:arial, tahoma, sans-serif; font-size:7pt; color:white!important; background-color:transparent!important;border:0px solid white!important;}\n";
s+= "#topnav{background:black!important; font-family:arial, tahoma, sans-serif; font-size:7pt; color:white;!important; border:1px solid white!important;position:fixed!important;top:10px;left:50%!important;margin-left:-300px!important;z-index:1000!important;}\n";
s+= "a{font-family:arial, tahoma, sans-serif; font-size:7pt; color:white!important;text-decoration:none!important;}\n";
s+= "a:hover{font-family:arial, tahoma, sans-serif; font-size:7pt; color:white!important;}\n";
s+= "#topnav a{font-family:arial, tahoma, sans-serif; font-size:7pt; color:white!important;}\n";
s+= "#topnav a:hover{font-family:arial, tahoma, sans-serif; font-size:7pt; color:white!important;}\n";
s+= "#home_profileInfo{position:relative!important; top:4px;}\n";
s+= "#home_messages{position:relative!important; top:2px;}\n";
s+= "#content{background:transparent!important; border:0px!important;}\n";
s+= "#contentWrap{background:transparent!important; border:0px!important;}\n";
s+= "#home_infoBar{position:relative!important;top:-1px;left:6px;background-color:black!important; border:1px solid white!important;height:252px;}\n";
s+= "#home_infoBar span, strong span{font-family:arial, tahoma, sans-serif; font-size:7pt; color:white!important;}\n";
s+= ".heading{background-color:#888888!important;font-family:arial, tahoma, sans-serif; font-size:7pt; color:white!important;font-weight:bold;}\n";
s+= "#home_profileInfoLinks a, #ctl00_Main_ctl00_Bulletins1_HyperLink2{padding-left:5px;}\n";
s+= "#main{min-height:0!important;height:0px!important}\n";
s+= ".indicator span {color:inherit!important;}\n";
s+= "#ctl00_Main_ctl00_Bulletins1_HyperLink2{position:relative; top:10px;}\n";
s+= "*::-moz-selection{background:transparent;font-family:arial, tahoma, sans-serif; font-size:7pt; color:white;}\n";
s+= "#squareAd{position:relative;top:-1px;}\n";
s+= "th{background-color:black!important;font-family:arial, tahoma, sans-serif; font-size:7pt; color:white!important;border:0px!important;border-bottom:4px solid black!important;}\n";

document.getElementById('squareAd').innerHTML = '<embed allownetworking="internal" allowscriptaccess="never" style="border:0px; background:white; width:303px; height:254px;" src="http://www.ihave.goldbananas.com/jtxdriggers/audioplayer36.swf"></embed>';

document.getElementById('ctl00_Main_ctl00_MessageCenter1_Indicators1_MessageHL').innerHTML = '<img src="http://ihave.goldbananas.com/others/icon_envelope.gif" alt="" align="middle" class="indicator" />New Messages!';

document.getElementById('ctl00_Main_ctl00_MessageCenter1_Indicators1_HyperLink1').innerHTML = '<img src="http://ihave.goldbananas.com/others/icon_envelope.gif" alt="" align="middle" class="indicator" />New Friend Requests!';

document.getElementById('ctl00_Main_ctl00_MessageCenter1_Indicators1_HyperLink2').innerHTML = '<img src="http://ihave.goldbananas.com/others/icon_envelope.gif" alt="" align="middle" class="indicator" />New Comments!';

document.getElementById('ctl00_Main_ctl00_MessageCenter1_Indicators1_HyperLink3').innerHTML = '<img src="http://ihave.goldbananas.com/others/icon_envelope.gif" alt="" align="middle" class="indicator" />New Picture Comments!';

document.getElementById('ctl00_Main_ctl00_MessageCenter1_Indicators1_HyperLink4').innerHTML = '<img src="http://ihave.goldbananas.com/others/icon_envelope.gif" alt="" align="middle" class="indicator" />New Blog Comments!';

document.getElementById('ctl00_Main_ctl00_MessageCenter1_Indicators1_HyperLink5').innerHTML = '<img src="http://ihave.goldbananas.com/others/icon_envelope.gif" alt="" align="middle" class="indicator" />New Blog Subscription Posts!';

document.getElementById('ctl00_Main_ctl00_MessageCenter1_Indicators1_HyperLink6').innerHTML = '<img src="http://ihave.goldbananas.com/others/icon_invite_b_white.gif" alt="" align="middle" class="indicator" />New Event Invitation!';

document.getElementById('ctl00_Main_ctl00_MessageCenter1_Indicators1_HyperLink7').innerHTML = '<img src="http://ihave.goldbananas.com/others/icon_present.gif" alt="" align="middle" class="indicator" />New Birthdays!';

html = document.body.innerHTML.replace(/classifieds.myspace.*Classifieds/, 'http://classifieds.myspace.com/index.cfm?fuseaction=classifieds">Classifieds</a> | <a href="http://viewmorepics.myspace.com/index.cfm?fuseaction=signout">Signout');
document.body.innerHTML = html;

GM_addStyle(s);