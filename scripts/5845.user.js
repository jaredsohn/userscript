// ============================
// == USERSCRIPT INFORMATION ==
// ============================

// ==UserScript==
// @name          Beth's Myspace Homepage Hack
// @namespace     myspace.com/starhaze
// @description	  Original codes by Filthy Jesus. Modified and cleaned-up by me.
// @include       http://*myspace.com/*=user
// @include       http://*myspace.com/*=user&*
// @exclude       http://comments.myspace.com/*
// ==/UserScript==


// ================
// == STYLESHEET ==
// ================

s= "/* Cleaned CSS: */\n";
s+= "\n";
s+= "/*---------------------------------------------------\n";
s+= "css by myspace.com/starhaze\n";
s+= "-----------------------------------------------------*/\n";
s+= "body {	\n";
s+= "	background: url() #FFFFFF fixed; \n";
s+= "	margin-top:-50px;\n";
s+= "	}\n";
s+= "\n";
s+= "\n";
s+= "* {\n";
s+= "	font-family:tahoma\n";
s+= "	}\n";
s+= "\n";
s+= "a:link, a:active, a:visited {\n";
s+= "	color:269DD4!important;\n";
s+= "	font:bold 7pt tahoma!important;\n";
s+= "	}\n";
s+= "\n";
s+= "a:hover {\n";
s+= "	text-decoration:none; \n";
s+= "	color:269DD4!important; \n";
s+= "	background-color:FFFFFF!important;\n";
s+= "	}\n";
s+= "\n";
s+= "a[id*='friendImageLink'] img {\n";
s+= "	border:3px solid #FFFFFF;margin:5px;\n";
s+= "	}\n";
s+= "\n";
s+= "a[id*='friendImageLink']:hover img {\n";
s+= "	border:3px solid #269DD4!important;\n";
s+= "	background-color:transparent!important;\n";
s+= "	}\n";
s+= "\n";
s+= "div, table, td, th, .heading {	\n";
s+= "	background:transparent!important; \n";
s+= "	border:none!important;\n";
s+= "	}\n";
s+= "\n";
s+= "#header {\n";
s+= "	visibility:hidden\n";
s+= "	}\n";
s+= "\n";
s+= "#topnav {\n";
s+= "	border:0px solid #FFFFFF!important;\n";
s+= "	background-color:ECECEC!important;\n";
s+= "	padding:10px; \n";
s+= "	margin-bottom:10px; \n";
s+= "	color:303030\n";
s+= "	}\n";
s+= "\n";
s+= "#topnav a {\n";
s+= "	font:bold 8pt arial!important; \n";
s+= "	color:808080!important; \n";
s+= "	text-transform:uppercase!important;\n";
s+= "	}\n";
s+= "\n";
s+= "#topnav a:hover {\n";
s+= "	color:269DD4!important;\n";
s+= "	}\n";
s+= "\n";
s+= "#nav {	\n";
s+= "	position:absolute; \n";
s+= "	right:5\n";
s+= "	}\n";
s+= "\n";
s+= "#content {	\n";
s+= "	position:absolute; \n";
s+= "	left:5\n";
s+= "	}\n";
s+= "\n";
s+= "#main{\n";
s+= "	min-height:0;\n";
s+= "	height:0!important\n";
s+= "	}\n";
s+= "\n";
s+= "#home_profileInfo .heading {\n";
s+= "	font-size:11pt!important;\n";
s+= "	font-weight:bold!important;\n";
s+= "	color:808080\n";
s+= "	}\n";
s+= "\n";
s+= "#home_profileInfo img, #home_profileInfoLinks {\n";
s+= "	padding-top:7px;\n";
s+= "	}\n";
s+= "\n";
s+= "#home_bulletins th {\n";
s+= "	color:808080!important;\n";
s+= "	font-weight:bold!important;\n";
s+= "	}\n";
s+= "\n";
s+= "#home_bulletins td {\n";
s+= "	padding:3px;\n";
s+= "	}\n";
s+= "\n";
s+= "#home_friends .heading {\n";
s+= "	visibility:visible;\n";
s+= "	}\n";
s+= " \n";
s+= "#home_friends .heading a {\n";
s+= "	visibility:visible;\n";
s+= "	}\n";
s+= "\n";
s+= ".section {\n";
s+= "	border:0px solid #FFFFFF!important;\n";
s+= "	background-color:ECECEC!important;\n";
s+= "	padding:5px;\n";
s+= "	}\n";
s+= "\n";
s+= ".heading, .mar5 strong, h5 .heading .left {\n";
s+= "	font:bold 10pt tahoma!important;\n";
s+= "	color:808080!important;\n";
s+= "	border:none!important;\n";
s+= "	-moz-border-radius:10px;\n";
s+= "	display:inline;\n";
s+= "	background-color:ececec!important;\n";
s+= "	\n";
s+= "	}\n";
s+= "\n";
s+= ".left center {\n";
s+= "	color:808080!important;\n";
s+= "	}\n";
s+= "\n";
s+= ".indicator img {\n";
s+= "	display:display\n";
s+= "	}\n";
s+= "\n";
s+= ".indicator {\n";
s+= "	margin-left:10px\n";
s+= "	}\n";
s+= "\n";
s+= ".indicator a, .txtRed {\n";
s+= "	color:808080!important;\n";
s+= "	font-weight:bold!important\n";
s+= "	}\n";
s+= "\n";
s+= "a:hover .indicator {\n";
s+= "	border:display!important;\n";
s+= "	\n";
s+= "	}\n";
s+= "\n";
s+= "td.bulletinDate {\n";
s+= "	color:808080!important;\n";
s+= "	font-size:6pt!important;\n";
s+= "	\n";
s+= "	}\n";
s+= "\n";
s+= ".left span a {\n";
s+= "	color:269DD4!important;\n";
s+= "	font-weight:bold!important\n";
s+= "	}\n";
s+= "\n";
s+= ".w120 {\n";
s+= "	text-align:center;\n";
s+= "	}\n";
s+= "\n";
s+= ".w120 a {\n";
s+= "	background-image:none\n";
s+= "	}\n";
s+= "\n";
s+= "a[id*='friendLink'] img {\n";
s+= "	display:none\n";
s+= "	}\n";
s+= "\n";
s+= ".clear {\n";
s+= "	font-size:0\n";
s+= "	}\n";
s+= "\n";
s+= "#home_greybox, #home_greybox col, \n";
s+= "#squareAd, #ctl00_Main_ctl00_InfoBar1_pnlAdSpot, \n";
s+= "#splash_coolNewPeople, #splash_coolNewPeopleBrowse, \n";
s+= "#home_infoBar, #home_userURLInfo, #home_additionalLinks, \n";
s+= "#home_setHomePage, #home_schools, #home_searchAddressBook, \n";
s+= "iframe, #footer, a[href*='invite.history']{\n";
s+= "	display:none;\n";
s+= "	visibility:hidden;\n";
s+= "	}\n";
s+= "\n";


// =======================
// == INDICATOR UPDATER ==
// =======================

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


// ===================
// == SIGN-OUT LINK ==
// ===================

GM_addStyle(s);

var SignOutLink = document.createElement("div");

SignOutLink.innerHTML = 
'<style type="text/css">\n'
+'<!--\n'
+'#SignOutLink {\n'
+'	position: absolute; \n'
+'	width: 50px; height: 50px; \n'
+'	z-index: 1; right;\n'
+'	top: 0pt; right: 0pt\n'
+'	}\n'
+'\n'
+'#SignOutLink #table1 a {\n'
+'	text-decoration: none !important;\n'
+'	color:269DD4!important;\n'
+'	font:bold 7pt tahoma!important;\n'
+'	}\n'
+'\n'
+'#SignOutLink #table1 a:hover {\n'
+'	text-decoration: none !important;\n'
+'	color:FFFFFF!important;\n'
+'	font:bold 7pt tahoma!important;\n'
+'	}\n'
+'\n'
+'#SignOutLink #table1 {\n'
+'	background-color:ECECEC!important;\n'
+'	}\n'
+'-->\n'
+'</style>\n'
+'<div id="SignOutLink">\n'
+'<table border="0" width="100%" id="table1" bgcolor="ECECEC">\n'
+'<tr><td><p align="left">\n'
+'<a href="http://collect.myspace.com/index.cfm?fuseaction=signout">Sign Out</a><br>\n'
+'</font></td></tr></table></div>';\n'

document.body.insertBefore(SignOutLink, document.body.firstChild);