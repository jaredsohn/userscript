// OIFY Fix
// version 1.1
// 2006-09-24
// Copyright (c) 2006, Tristan Pemble
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "OIFY Fix", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          OIFY Fix
// @namespace     http://forums.facepunchstudios.com/forumdisplay.php?f=56
// @description   NOT MADE BY ME, MADE BY TRISTAN PEMBLE, AS INDICATED, gets rid of annoying flashing in OIFY
// @include       http://forums.facepunchstudios.com/*
// ==/UserScript==

var allOIFYLinks, thisOIFYLink;

var TopBar = '<!-- breadcrumb, login, pm info -->' +
'<div style="background: url( \'/logo-t.gif\' ); margin-left: 1px; height: 50px; background-position: bottom left; background-repeat: no-repeat; ">	' +
'</div>' +
'<table class="tborder" cellpadding="0" cellspacing="0" border="0" width="100%" align="center" style="border-bottom: 1px solid #888;">' +
'<tr>' +
'	<td class="alt1" cellpadding=0 style="border-left: 1px solid #888;" valign=top rowspan=2>' +
'	<img src="/logo-b2.gif" height=82 width=125>' +
'	</td>' +
'	<td class="alt1" width="100%" style="border: 1px solid #888; border-left: 0px; padding: 5px;">' +
'	' +
'		' +
'			<table cellpadding="0" cellspacing="0" border="0">' +
'			<tr valign="bottom">' +
'				<td><a href="#" onclick="history.back(1); return false;"><img src="/images/as/misc/navbits_start.gif" alt="Go Back" border="0" /></a></td>' +
'				<td>&nbsp;</td>' +
'				<td width="100%"><span class="navbar"><a href="index.php" accesskey="1">Facepunch Studios</a></span> ' +
'	<span class="navbar">&gt; <a href="/forumdisplay.php?f=3">Shitface Studios</a></span>' +
'</td>' +
'			</tr>' +
'			<tr>' +
'				<td class="navbar" style="font-size:10pt; padding-top:1px" colspan="3"><a href="/forumdisplay.php?f=56"><img class="inlineimg" src="/images/as/misc/navbits_finallink.gif" alt="Reload this Page" border="0" /></a> <strong>' +
'	OIFY' +
'</strong></td>' +
'			</tr>' +
'			</table>			' +
'		' +
'	</td>	' +
'	' +
'	' +
'	' +
'		<td class="alt2" valign="top" nowrap="nowrap" style="border: 1px solid #888; border-left: 0px; padding: 5px;">' +
'		<div class="smallfont">' +
'			<strong>Welcome, OIFYer.</strong><br />' +
'			You\'ve come here before.' +
'			<br /><a href="private.php">Private Messages</a>' +
'		</div>' +
'		</td>' +
'		' +
'		' +
'	' +
'</tr>' +
'<tr>' +
' <td colspan=2 id="toolbar" style="border-left: 1px solid #888; border-right: 1px solid #888;">' +
' <ul>' +
'			' +
'				<li id="tblogout" style="float:right;"><a href="login.php?do=logout">Log Out</a></li>' +
'				<li style="float:right;"><img src="images/as/navsep2.gif" alt="" /></li>' +
'			' +
'		<li id="tbhome"><a href="/">Home</a></li>' +
'		<li><img src="images/as/navsep2.gif" alt="" /></li>' +
'		' +
'		' +
'			<li id="tbucp"><a href="/usercp.php?">User CP</a></li>' +
'		' +
'		' +
'				' +
'			' +
'<li class="tbsearch" id="navbar_search"><a href="search.php?" accesskey="4">Search</a> </li>' +
'<li id="tbcal"><a href="/showbans.php?">Ban List</a></li>' +
'  </ul>' +
'</td>' +
'</tr>' +
'</table>' +
'<!-- / breadcrumb, login, pm info -->';

allOIFYLinks = document.evaluate(
    "//link[@href='/OIFY.css']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
    

if ( allOIFYLinks.snapshotLength == 0 ) { exit; }

for (var i = 0; i < allOIFYLinks.snapshotLength; i++) {
    thisOIFYLink = allOIFYLinks.snapshotItem(i);
    thisOIFYLink.href = 'styles.css?6';
}

var allOIFYBanners, thisOIFYBanner;

allOIFYBanners = document.evaluate(
    "//center/a[@href='http://forums.facepunchstudios.com/forumdisplay.php?f=56']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
    
for (var i = 0; i < allOIFYBanners.snapshotLength; i++) {
    thisOIFYBanner = allOIFYBanners.snapshotItem(i);
    thisOIFYBanner.parentNode.parentNode.removeChild(thisOIFYBanner.parentNode);
}

var allHeaders, thisHeader;

allHeaders = document.evaluate(
    "//div[@class='page']/div[1]",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
    
thisHeader = allHeaders.snapshotItem(0);

var newElement = document.createElement('p');
newElement.innerHTML = TopBar;

thisHeader.parentNode.insertBefore(newElement, thisHeader);

