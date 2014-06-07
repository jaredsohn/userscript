// ==UserScript==
// @name          Brooke's Myspace Homepage Skin
// @namespace     myspace.com/starhaze
// @description	  Original codes by Filthy Jesus, fixed for girls who like pink and blue! also removes COOL NEW PEOPLE.
// @include       http://*myspace.com/*=user
// @include       http://*myspace.com/*=user&*
// @exclude       http://comments.myspace.com/*
// ==/UserScript==

s = "#nav {position:absolute; right:5}\n";
s+= "#content {position:absolute; left:5}\n";
s+= "body {background:url('http://img.photobucket.com/albums/v179/brookisan/pinkbluestars2.gif'); bgcolor: deeppink; background-attachment:fixed; margin-top:-50px;}\n";
s+= "div, table, td, th, .heading{background:transparent!important; border:none!important;}\n";
s+= "*{font-family:comic sans ms}\n";
s+= "a:link, a:active, a:visited {color:deepskyblue!important;font:bold 8pt comic sans ms!important;}\n";
s+= "a:hover {text-decoration:none; color:deepskyblue!important; background-color:deeppink!important;}\n";
s+= "a[id*='friendImageLink']:hover img {border:2px solid deeppink!important;}\n";
s+= "a[id*='friendImageLink'] img {border:2px solid deeppink;margin:5px;}\n";
s+= "#header {visibility:hidden}\n";
s+= "#header .right {visibility:visible; color:deepskyblue; position:relative; top:118px;}\n";
s+= "#header .right a {font-weight:normal!important}\n";
s+= "#topnav {border:0px solid #FFFFFF!important;background-color:black!important;padding:10px; margin-bottom:10px; color:deepskyblue}\n";
s+= "#topnav a {font: 7pt comic sans ms!important; color:white!important; text-transform:uppercase!important;}\n";
s+= "#topnav a:hover {color:deepskyblue!important;}\n";
s+= ".section {border:0px solid #FFFFFF!important;background-color:black!important;padding:5px;}\n";
s+= ".heading, #splash_coolNewPeople h5.heading, .mar5 strong {font:bold 10pt comic sans ms!important;color:white;border:none!important;-moz-border-radius:10px;display:inline;padding:2!important;background-color:black!important;}\n";
s+= "#home_profileInfo .heading {font-size:15pt!important; font-weight:bold!important; color:white}\n";
s+= "#home_profileInfo img {padding-top:3px;}\n";
s+= ".left center {color:white}\n";
s+= ".indicator img {display:display}\n";
s+= ".indicator {margin-left:10px}\n";
s+= ".indicator a, .txtRed {color:white!important; font-weight:bold!important}\n";
s+= "a:hover .indicator {border:display!important;}\n";
s+= "#home_bulletins th {color:deeppink!important;font-weight:bold!important; border:1px solid deepskyblue;}\n";
s+= "#home_bulletins td {padding:1px; border:1px solid deepskyblue;}\n";
s+= "td.bulletinDate {color:white!important;font-size:6pt!important;}\n";
s+= "#home_infoBar {text-align:center;position:absolute; right:-7px; background:transparent;}\n";
s+= "#home_infoBar {width:100%;height:185px;margin:0; background:transparent;}\n";
s+= "#home_infoBar strong {display:block; color:white; font-weight:bold; margin-top:3px; background:transparent;}\n";
s+= "#home_infoBar span {color:white}\n";
s+= "#home_infoBar br {display:none;}\n";
s+= "#home_infoBar .heading {display:block;width:100%;}\n";
s+= "a[href*='.listAds']:after, a[href*='=rateImage']:after, a[href*='ShowMyBulletins']:after {content:' : '; background:black; color:white; font-weight:normal}\n";
s+= "#home_friends .heading {position:absolute;visibility:hidden;}\n";
s+= "#home_greybox, #home_greybox col {position:absolute;visibility:hidden;}\n";
s+= "#ctl00_Main_ctl00_InfoBar1_pnlAdSpot {position:absolute;visibility:hidden;}\n";
s+= ".left span a {color:deepskyblue!important; font-weight:bold!important}\n";
s+= "#splash_coolNewPeople {height:170px; text-align:left; visibility:hidden;}\n";
s+= ".w120 {text-align:center;}\n";
s+= ".w120 a {background-image:none}\n";
s+= "#splash_coolNewPeopleBrowse {text-align:center; color:black; visibility:hidden;}\n";
s+= "#home_friends .heading a {visibility:visible;}\n";
s+= "a[id*='friendLink'] img {display:none}\n";
s+= ".clear {font-size:0}\n";
s+= "#main{min-height:0; height:0!important}\n";
s+= "#home_additionalLinks,#home_setHomePage, #home_userURLInfo,#home_schools, #home_searchAddressBook,#squareAd, iframe, #footer, a[href*='invite.history']{display:none}\n";


function getupdate() {
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://home.myspace.com/index.cfm?fuseaction=user',
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
			'Accept': 'text/xml',
		},
		onload: function(responseDetails) {

			// Update Message/Friend Request/etc indicators
			var html = responseDetails.responseText.replace(/\r/g,'');
			RegExp.lastIndex=0;
			var r=/id="(\w+)" class="show/g;
			while((a=r.exec(html))!=null) {
				for(var i=1;i<a.length;i++){
					document.getElementById(a[i]).style.display = "block";
				}
			}
			RegExp.lastIndex=0;
			var r=/id="(\w+)" class="hide/g;
			while((a=r.exec(html))!=null) {
				for(var i=1;i<a.length;i++){
					document.getElementById(a[i]).style.display = "none";
				}
			}
		}
	});
	setTimeout(getupdate, 15000);
}

getupdate();


GM_addStyle(s);

var SignOutLink = document.createElement("div");
SignOutLink.innerHTML = '<style type="text/css">'
+'<!--'
+'#SignOutLink #table1 a {'
+'text-decoration: none !important;'
+'color: #FFFFFF !important;'
+'font-family: Comic sans ms, Verdana, Arial, Helvetica, sans-serif !important;'
+'font-size: 12px !important;'
+'font-weight: bold !important;'
+'font-style: normal !important;'
+'}'
+'#SignOutLink #table1 a:hover {'
+'text-decoration: none !important;'
+'color: #FFFFFFF !important;'
+'font-family: Comic sans ms, Verdana, Arial, Helvetica, sans-serif !important;'
+'font-size: 12px !important;'
+'font-weight: bold !important;'
+'font-style: normal !important;'
+'}'
+'#SignOutLink #table1 {'
+'background-color: black !important;'
+'}'
+'-->'
+'</style>'
+'<div style="position: absolute; width: 50px; height: 50px; z-index: 1; right; top: 0pt; right: 0pt" id="SignOutLink">'
+'<table border="0" width="100%" id="table1" bgcolor="#990000">'
+'<tr><td><p align="left">'
+'<a href="http://collect.myspace.com/index.cfm?fuseaction=signout">Sign Out</a><br>'
+'</font></td></tr></table></div>';
document.body.insertBefore(SignOutLink, document.body.firstChild);

