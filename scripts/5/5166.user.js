// If you want to install this script, then (if you don't have them already) you'll need to install [http://www.mozilla.org/firefox/ Firefox] and [http://greasemonkey.mozdev.org/ Greasemonkey], then restart Firefox and return to this page.<br>
// Then, just click on <span class="plainlinks">[http://www.hrwiki.org/index.php?title=User:Phlip/Greasemonkey&action=raw&ctype=text/javascript&fakeextension=.user.js this link]</span> to install the script.<br>
// To upgrade a new version when it's updated, just click the install link again &ndash; it'll automagically replace the old version. If the option is enabled, the script will automatically check for updates for you. <pre>

// Homestar All-In-One
// version 3.2
// 2006-09-27
// Copyright (c) Phillip Bradbury, Loafing, T Rice, Jesse Ruderman
//
// A combination of several useful scripts for Homestar Runner cartoons:
//  Homestar-Fullon, a greasemonkey script for making H*R cartoons fullscreen.
//  Seek Bar, a bookmarklet that adds a progress bar to flash cartoons
//   (with modifications).
//  Previous/Next buttons for Strong Bad Emails, TGS, Marzipan's
//   Answering Machine, Biz Cas Fri, Puppet Jams and main pages.
//  An HRWiki link on all pages.
//  The ability, if you turn on the "fullscreen" option, to keep the actual
//   stage the same size (so you can see "outside the frame").
//  Turning everything upside-down, like on April Fools Day, 2006.
//  A plain-HTML navbar, to replace the Flash one. This is mostly for me
//   as the navbar doesn't work right on my computer (font problems).
//   It could also be useful for others, letting you middle-click the navbar
//   to open things in new tabs.
//  Loading subtitles from the wiki and displaying them beneath the toon.
// All of these can easily be turned on or off with the "Preferences" box
//  in the top left.
//
// Released under the GPL.
//
// Homestar-Fullon written by T Rice <timgm@bcheck.net> and is
//  released under the GPL.
//  http://dana.ucc.nau.edu/~tsr22/apps/greasemonkey/
//
// Seek bar written by Jesse Ruderman <jruderman@hmc.edu> and is
//  distributed with permission ("You may modify and/or distribute
//  up to three bookmarklets from this site in any way you want.")
//  http://www.squarefree.com/bookmarklets/
//  Originally it was just the Pause button and the seek bar,
//  I modified it to add a frame counter, frame step buttons and zoom buttons.
//  I also modified it so the Pause button automatically updates when the flash
//  movie pauses itself (eg at the end of the toon).
//
// Previous/Next buttons written by Phillip Bradbury, but inspired by
//  StrongBad Emails: Prev & Next from http://userscripts.org/scripts/show/1015
//
// HRWiki link also written by Phillip Bradbury, but inspired by an attempt
//  by Tom Preuss to do the same thing - except it did the translation from
//  URL to Wiki page name in the script, this does it at the HRWiki server
//  so that when a new toon comes out, the script doesn't need to be changed.
//  http://www.hrwiki.org/index.php/User:Tom/Greasemonkey_Script
//
// Subtitles written in collaboration with "Loafing"
//  http://www.hrwiki.org/index.php/User:Loafing
//
// Direct any comments to
//  http://www.hrwiki.org/index.php/User_talk:Phlip/Greasemonkey
//
// --------------------------------------------------------------------
//
// WARNING: This script explicitly avoids use of one of Greasemonkey's security
//  features. THIS SCRIPT SHOULD NOT BE USED on ANY page where you do not trust
//  the page writer. Not that it would make sense to anyway, given it's rather
//  Homestar-specific. Your use of this script is stating that you trust
//  The Brothers Chaps to not insert malicious code into the Homestar Runner site,
//  and the HRWiki admins to not put any on the mirror.
//
// One of the security features of Greasemonkey, used to plug its holes in
//  previous versions, is Mozilla's XPCNativeWrapper, which is used to ensure
//  that you're calling the real functions of objects on the page, and not
//  weird and potentially hazardous ones written by the page designer. However
//  this also blocks functions like flashmovie.CurrentFrame() which are needed
//  by the seek bar. Thus to make the seek bar work, I needed to turn this off.
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
// select "Homestar All-In-One", and click Uninstall.
//
// --------------------------------------------------------------------
//
// This program is free software; you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation; either version 2 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program; if not, write to the Free Software
// Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA  02111-1307  USA
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Homestar All-In-One
// @namespace     http://www.hrwiki.org/
// @description	  Combination of many Homestar Runner scripts. Version 3.2.
// @include       http://homestarrunner.com/*
// @include       http://www.homestarrunner.com/*
// @include       http://podstar.homestarrunner.com/*
// @include       http://videlectrix.com/*
// @include       http://www.videlectrix.com/*
// @include       http://hrwiki.org/mirror/*
// @include       http://www.hrwiki.org/mirror/*
// @include       https://secure.homestarrunner.com/heythanks.html*
// ==/UserScript==

// Returned by Special:Getversion
// <versionstring>3.2.1=http://www.hrwiki.org/index.php?title=User:Phlip/Greasemonkey&action=raw&ctype=text/javascript&fakeextension=.user.js</versionstring>
var currentversion = [3,2,1];

// Podstar/Videlectrix (stock IIS), HRWiki and stock Apache error pages, respectively. Don't do anything on those pages.
if (document.title != "The page cannot be found" && document.title != "Homestar Runner Wiki - 404 Not Found" && document.title != "404 Not Found")
{
	var whichsite = 0;
	if (location.hostname.indexOf("podstar") >= 0) whichsite = 1;
	if (location.hostname.indexOf("videlectrix") >= 0) whichsite = 2;
	if (location.pathname.indexOf("/mirror/") >= 0) whichsite = 3;
	
	// icons, as Base64-encoded PNG files.
	// the hrwiki one used to hotlink http://www.hrwiki.org/favicon.ico but now
	// use "data:" to avoid bandwidth-leeching (even this minor)
	var image_hrwiki = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQ" +
		"CAMAAAAoLQ9TAAAAzFBMVEXsFQgrPqLjBgDQDw7yAwA8PrbBGhr/AABCRcLfHBvTIiHBKy5" +
		"OVKvCNTj/HRS8S1T/MzPgR0b2Q0Rcf611d7jSWGG9Ynd6fc5fkdPpZW5mmcybhaekgqK2fJ" +
		"SWlXF4lctlnt3/ZmbbdXqFlMWSkbi5kkqVnIN9ncvYfIeToaqhmrCApNaolruNoc/Ij53/f" +
		"Xy1p2eFqty1qX+Tr8/0jpSgsteftdDCr8q4ud3Wtanqq6qtweLrtMDVwszsxb3M1eLu59j7" +
		"9PT///8lJce4h/WNAAAAAXRSTlMAQObYZgAAAAFiS0dEAIgFHUgAAAAJcEhZcwAACxMAAAs" +
		"TAQCanBgAAAAHdElNRQfWBRkTLxz1P7v8AAAAyklEQVQY02XP23aCMBAF0DQaIxUjBrCjEi" +
		"9oRIWotRUrWC/w//9kIssn5+GsOXvNyyD0NnI/MqnnBTaRcrH+WS92FUmPzCMV5XEs/KfIV" +
		"VkSL73nS2Z9GpGjsvk1uxdF1k96T5Ckmdp/xc0KYGUgGrhEefZH2g1c10YIklMylgd1Gl90" +
		"bEADdxSKz3x4zc/MB33CqYDDlvoDNcW6Iwgo/84Yrqsj6xhA4LB/3l7S7BcPKxDMwUIxp96" +
		"G6htguAWTkNbEC0KzgtUw/QHI7xdXgqr/KgAAAABJRU5ErkJggg==";
	var image_prefs = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQC" +
		"AMAAAAoLQ9TAAAAllBMVEUAGQASEhIfHx8fJy8pKSk2NjZBQUFJR0ZQUE9RUVFSUlJNX3No" +
		"aGhsaWdramlycG1meY98fHx+fn5wgpV0iqKKh4R4jaR9jJx8kad9kad/mbONmaWEnrmEnrq" +
		"koZy3t7fIx8bKyMHT0c3S0dDU09DV1NPP1t3W1dXY2Njb2tfe29bf3tzj4uHr6+js6+r39/" +
		"f5+PgAAABrL3yvAAAAAXRSTlMAQObYZgAAAAFiS0dEAIgFHUgAAAAJcEhZcwAACxMAAAsTA" +
		"QCanBgAAAAHdElNRQfWBRoFKh31UQ8DAAAAgUlEQVQY022OxxLCMAwFRSc4BEIPJZQQ08v+" +
		"/8+RsTExDDpIe3ijfSJ/hx9g62Dt4GaAI+8YT0t27+BxxvvE/no5pYT10lGFrE34Ja40W3g" +
		"1oMGmW7YZ6hnCYexKTPVkXivuvWe1Cz1aKqPNI3N0slI2TNYZiARJX30qERc7wBPKC4WRDz" +
		"WdWHfmAAAAAElFTkSuQmCC";
	var image_close = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQC" +
		"AQAAAC1+jfqAAAAAmJLR0QA/4ePzL8AAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQfW" +
		"BRkTNhxuPxLkAAAAHXRFWHRDb21tZW50AENyZWF0ZWQgd2l0aCBUaGUgR0lNUO9kJW4AAAE" +
		"KSURBVCjPhdGxSgNBFAXQMzpgYWwsLEQUDBJBQgqFIChZEPR7/DA/QCGQTgQtJE1ENoWohY" +
		"UgbGKQyFjErNv52nObe19wqGWg7z0l5YVgVdOu+wUt507tqIVQ4Zodp861ooELe15M5KFI6" +
		"Zfr9u25MIj6Jl4cmSIPBWrq2o5cufO4aOJDYSozNTa2pK4t03PtwUdMKRRykAmW0dTRcyNX" +
		"pBQpI8GJDTR050zkNzK0bMMZLvUNZ8yCfy6Wvbc1NVyi4dloXjqWvds6uvp41pFmpVOKJWd" +
		"6bgwxkmTMIotWKpwrfBkZl7uMonUHf5wSlV2+fUZrjnXdzrmyy7djD8GWTW9e51z557o1Tz" +
		"85FH/WkOkaHQAAAABJRU5ErkJggg==";
	var image_update = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEYAAABG" +
		"CAMAAABG8BK2AAAC8VBMVEUAAAD/AAD+AQH/AQH/AgL+AwP/AwP+BAT/BAT/BQX+Bgb/Bgb" +
		"/Bwf+CAj/CAj/CQn/Cgr+Cwv/Cwv+DAz/DAz/DQ3/Dg7+Dw//Dw//EBD+ERH/ERH/EhL/Ex" +
		"P+FBT/FRX/Fhb/Fxf+GBj/GBj/GRn/Ghr/Gxv/HBz/HR3/Hh7/Hx//ICD+ISH/ISH/IiL/I" +
		"yP/JCT/JSX/Jib/Jyf/KSn/Kyv/LCz/LS3/Ly//MDD/MTH+MjL/MjL/MzP/NDT/NTX/Njb+" +
		"Nzf/Nzf/ODj+OTn/OTn/Ojr/PDz/Pj7/Pz//QUH/QkL+Q0P/RUX/Rkb/R0f/SEj/SUn/Skr" +
		"/S0v/TEz/TU3/Tk7/T0//UFD/UVH/UlL/VFT/VVX/Vlb/WFj/WVn/Wlr/W1v/XFz/XV3/Xl" +
		"7/X1//YGD/YWH/YmL/Y2P/ZWX/Zmb/Z2f/aGj/aWn/amr/a2v/bGz/bW3/bm7/b2//cHD/c" +
		"XH/cnL/dHT/dnb/d3f/eHj/eXn/e3v/fX3/fn7/f3//gID/gYH/goL/g4P/hIT/hob/h4f/" +
		"iIj/iYn/ior/i4v/jIz/jY3/jo7+kJD/kJD/kZH/kpL/lJT/lpb/l5f/mJj/mZn/mpr/m5v" +
		"/nJz/nZ3/n5//oKD/oaH/oqL/o6P/pqb/p6f/qKj/qan/qqr/q6v/rKz/ra3/r6//sLD/sb" +
		"H/srL/s7P/tLT/tbX/trb/t7f/uLj/urr/u7v/vLz/vb3/vr7/v7//wMD/wcH/wsL/w8P/x" +
		"MT/xcX/xsb+x8f/x8f/yMj/ycn/ysr/y8v/zMz/zc3/zs7/z8//0ND/0dH/0tL/09P+1NT/" +
		"1NT/1tb/19f+2Nj/2Nj/2dn/29v/3Nz/3d3/39//4OD/4eH/4uL/4+P/5OT/5eX/5ub/5+f" +
		"/6Oj/6en/6ur/6+v/7Oz/7e3/7u7/7+/+8PD/8fH/8vL/8/P/9PT/9fX/9vb/9/f/+Pj/+f" +
		"n/+vr/+/v//Pz//f3+/v7//v7////+AAA5GkRyAAAAAXRSTlMAQObYZgAAAAFiS0dEAIgFH" +
		"UgAAAAJcEhZcwAADzoAAA+IAUHKF/gAAAAHdElNRQfXCRYICgxGxxkcAAAEL0lEQVRYw63X" +
		"e1wURRwA8Pm1G0KcHdGBkKAYjxC0yLJITUl7cr7RUjAos4AuraCH2pWCVlZaRpD5AEXDwAe" +
		"mQRFdmgQeCgWUPKTk4JJHomAq5PBXu/fC2zt2Z7fdf+Y38/nc9zPz+83M7iEQ9VBDjCNxSt" +
		"KGG5xJSBSjWPV+c3m0nxNFDEP/XBf3ZkPLuvGOigiG2oLrhyvVJX26abdzFXKGWtrUPRXA5" +
		"aasRjyD5ijkzJjd/2aMNkXqhCiKoxAzU9bg3nmDdXe1V4iZJIzTBnvhH9xrpxAzKbj1cYDY" +
		"2Ww8AMuOL7NTiBg6koZX2rruhFhjLJsVP5iv8bFTSBj6xxo/CHqxXftwYxFTKwhY/aj9iog" +
		"YOgfrRwCM/vr0qXOmpUQ0pXAVYYZa19tuymc8xqvY1u0nnOXCUQQZ6vnf/p5jiibpqgOYxq" +
		"cctwRwFUEmqrD/1VvMYWppjGrUE7/ghkAHRYhxy8QdG6x79u2DBbru/mLHuQgyr+H9HYatC" +
		"kvv2U3Hdmv9nSgCzKyW/MnBpW1HvSz9gRHsMUAiGe/1OA5A9XlX/TQv7pkmZtzB/Y1UNvBM" +
		"P2NIDOVTeJjpT49lJNOjXHHq/Mb7eRQe5pnavAm2W3jRt33Fjw2t8C3qG3z8AWvsOnFba6Y" +
		"bNZTCw9yYYsg2qkfabqpZPkPOhXc2ET2bk3FpAvDXSJBxbSsZ29O1fz2BwrtvVlzSNb60vX" +
		"5ruEJI4WVUxxoTISSp46hWJaA4MtSw2dlVRXlq5jy6H65hRzw+XasSUBwYOu2rC4YO/bmWM" +
		"0EesPRQsGnsZiGFy9AlVbmRzG9dQrMr1NSEE1OEs+uEoXbivUGW+EBrIGh3KYkUDuP7bu3J" +
		"PZ7mOKSsgFr4ggeRwmE87/FfW9Pqbb74vqgOg3Ay5XqGmpRe9+U7vsvL/0oybZRE9rIhU65" +
		"j6Az9tZL0ffn3jdtyadNdzEAaTiZVBhn6O9y+YBxAUw64fnR+hxoUVXg5qWJjqBzcFsbutY" +
		"rDwwBWHvr9rUrc5E+q2JjQExceYduHruQqBgAe3NhvLBhDrNiYyD79agXzTtXg98xs9CIvc" +
		"sXGRPzQc7F68R23NlxZQtk+pZEohnoyBuDuqI9P99Y244rhJPeLMyZQ90exJgyUU/dgfPEp" +
		"KYp5UeHak83fT2Tf0pXX8hMlKMj6Znu57HIMcwjmZmCcI15BVICvWfLK7ExmKnzbPH3fJ6I" +
		"V9NzZLG/LKo4Y49kmOHKUaAVB2T8h1pzGGMeLrrSVmX71iPUzaOafMyRk15Lios4EixONl0" +
		"hU2ErldW82O5rOORIVU8ELDZ8xDq2sPRsmUTHvm8LuyvjFr/+Kc30kKpbtt6OuC+OefSOlK" +
		"rYTHqf5MNVPsoLs/2QjGZj/oSB5FCSPguRRkDwKkkdB8ihIHgXJoyB5FCSPguRRkDzKf7Z6" +
		"NUd33kmjAAAAAElFTkSuQmCC";
	
	settingnames = [
		{name: 'resize',    title: 'Resize flash to full-screen',            tooltip: 'Resizes the toon so it fills the entire window',                              def: 1},
		{name: 'noscale',   title: ' Show outside-the-frame action',         tooltip: 'Lets you see what\'s happening beyond the frames',                            def: 0},
		// {name: 'showmenu',  title: 'Enable right-click menu',                tooltip: 'Enables the right-click context menu',                                        def: 1},
		{name: 'seekbar',   title: 'Show seek bar',                          tooltip: 'Lets you fast forward and rewind',                                            def: 1},
		{name: 'frames',    title: ' Show frame counter on seek bar',        tooltip: 'Shows you exactly where you are',                                             def: 1},
		{name: 'hrwiki',    title: 'Add HRWiki link',                        tooltip: 'Adds a link to the appropriate page on the Homestar Runner Wiki',             def: 1},
		{name: 'prevnext',  title: 'Show previous/next buttons',             tooltip: 'Lets you easily move through SBEmails, TGS, etc',                             def: 1},
		{name: 'checknext', title: ' Check if next exists',                  tooltip: 'Doesn\'t add a "next" link on the latest SBEmail, etc',                       def: 0},
		{name: 'flipper',   title: 'Turn everything upside-down',            tooltip: 'Relive the mania of inverted April Fools Day Homestar Runner',                def: 0},
		{name: 'navbar',    title: 'Plain HTML navbar',                      tooltip: 'Replaces the flash navbar with normal links... so you can open in tabs, etc', def: 0},
		{name: 'randot',    title: ' Include Big Toons in rando',            tooltip: 'Limit the "rando" function to what you like to watch',                        def: 1},
		{name: 'randosh',   title: ' Include Shorts in rando',               tooltip: 'Limit the "rando" function to what you like to watch',                        def: 1},
		{name: 'randoho',   title: ' Include Holiday toons in rando',        tooltip: 'Limit the "rando" function to what you like to watch',                        def: 1},
		{name: 'randop',    title: ' Include Puppet Stuff in rando',         tooltip: 'Limit the "rando" function to what you like to watch',                        def: 1},
		{name: 'randoteh',  title: ' Include Powered by The Cheat in rando', tooltip: 'Limit the "rando" function to what you like to watch',                        def: 1},
		{name: 'randosb',   title: ' Include Strong Bad Emails in rando',    tooltip: 'Limit the "rando" function to what you like to watch',                        def: 1},
		{name: 'randoam',   title: ' Include Answering Machine in rando',    tooltip: 'Limit the "rando" function to what you like to watch',                        def: 1},
		{name: 'randotgs',  title: ' Include Teen Girl Squad in rando',      tooltip: 'Limit the "rando" function to what you like to watch',                        def: 1},
		{name: 'subtitles', title: 'Show subtitles',                         tooltip: 'Shows subtitles or captions below the toon, if any are available',            def: 0},
		{name: 'captions',  title: ' Show captions',                         tooltip: 'Include sound effects in the subtitles',                                      def: 1},
		{name: 'colours',   title: ' Use colours',                           tooltip: 'Distinguish characters by colour effects (turn off if colourblind)',          def: 1},
		{name: 'testsubs',  title: ' Test subtitles script',                 tooltip: 'Use this to test a subtitles script (copy/paste into a text box)',            def: 0},
		{name: 'updates',   title: 'Check for updates',                      tooltip: 'Regularly check for updates to the All-in-one script',                        def: 1}
	];
	settings = {};
	for (i = 0; i < settingnames.length; i++)
		settings[settingnames[i].name] = GM_getValue(settingnames[i].name, settingnames[i].def) != 0;
	settings['language'] = GM_getValue('language', 'en');
	defaultxmlfile = escape('<?xml version="1.0" encoding="utf-8"?>\n<transcript xml:lang="en-us">\n<line start="" end="" speaker=""></line>\n</transcript>');
	settings['testsubsdata'] = unescape(GM_getValue('testsubsdata', defaultxmlfile));
	settings['names'] = GM_getValue('names', 0);
	extrasettings = [];
	
	addsettingsbox();
	
	document.body.style.margin = "0px";
	
	// find flash objects
	switch (whichsite)
	{
		case 0: // www.homestarrunner.com
			var objs = document.getElementsByTagName("EMBED");
			if (objs && objs.length >= 2)
			{
				var flashmovie = objs[0];
				var navbar = objs[1];
			}
			else if (objs && objs.length >= 1)
			{
				var flashmovie = objs[0];
				var navbar = false;
			}
			else
			{
				var flashmovie = false;
				var navbar = false;
			}
			if (!flashmovie)
			{
				objs = document.getElementsByTagName("OBJECT");
				if (objs && objs.length >= 1)
					var flashmovie = objs[0];
			}
			break;
		case 1: // podstar.homestarrunner.com
			var objs = document.getElementsByTagName("EMBED");
			var flashmovie = false;
			if (objs && objs.length >= 1)
				var navbar = objs[0];
			else
				var navbar = false;
			break;
		case 2: // videlectrix
			var objs = document.getElementsByTagName("EMBED");
			var navbar = false;
			if (objs && objs.length >= 1)
				var flashmovie = objs[0];
			else
				var flashmovie = false;
			settings.navbar = false;
			break;
		case 3: // mirror
			var objs = document.getElementsByTagName("EMBED");
			var flashmovie = false;
			if (objs && objs.length >= 1)
				var flashmovie = objs[0];
			if (!flashmovie)
			{
				objs = document.getElementsByTagName("OBJECT");
				if (objs && objs.length >= 1)
					var flashmovie = objs[0];
			}
			navbar = document.getElementById('navbar');
			if (!navbar)
				settings.navbar = false;
			var flashcontainer = document.getElementById('flash');
			if (flashcontainer)
				flashcontainer.style.width = "auto";
			break;
	}
	if (flashmovie)
	{
		//expose Flash plugin-added methods
		flashmovie = flashmovie.wrappedJSObject;
		
		// confirm that this is really a flash file
		// and not (for example) the embedded background sound on SB's website
		if (flashmovie.nodeName.toLowerCase() == "object")
		{
			var src = flashmovie.getAttribute('src');
			if (src)
			{
				if (src.substring(src.length - 4).toLowerCase() != ".swf")
					flashmovie = false;
			}
			else
			{
				a = flashmovie.getElementsByTagName('param').namedItem("movie");
				if (!a || a.value.substring(a.value.length - 4).toLowerCase() != ".swf")
					flashmovie = false;
			}
		}
		else if (flashmovie.nodeName.toLowerCase() == "embed")
		{
			var src = flashmovie.getAttribute('src');
			if (!src || src.substring(src.length - 4).toLowerCase() != ".swf")
				flashmovie = false;
		}
	}
	
	if (!flashmovie)
		settings.resize = settings.seekbar = settings.frames = settings.flipper = settings.noscale = settings.showmenu = settings.subtitles = false;
	if (settings.flipper)
		settings.seekbar = settings.subtitles = false;
	
	// globals
	var settingsbox;
	var seekbar;
	var isPercentage = false;
	var aspect = 1.0;
	var randolink;
	var randourls = [];
	var subtitleholder;
	var transcript = [];
	var nosubtitles = document.createComment("");
	var currentsubtitles = nosubtitles;
	var characters = {
		"sfx": {
			"color": "#FFF",
			"sfx": true,
			"name": {"en": ""}
		}
	};
	var transcriptErrors;
	var subtitleLoop = false;
	
	// used by wikilink, prevnext, flipper... put it out here.
	var filename = location.pathname.toLowerCase();
	i = filename.lastIndexOf('/');
	if (i >= 0)
		filename = filename.substr(i + 1);
	i = filename.lastIndexOf('.');
	if (i >= 0)
		filename = filename.substr(0,i);
	
	// pull puppet stuff out of its background
	if ((settings.flipper || settings.seekbar || settings.subtitles) && flashmovie.src=="puppet_background.swf")
	{
		var flashvars = getFlashVars();
		if (flashvars.videoName)
			replaceFlash(flashvars.videoName);
	}
	
	if (settings.navbar)
		replacenavbar();
	if (settings.subtitles)
		setupSubtitles();
	if (settings.seekbar)
		addFlashControls(flashmovie);
	if (settings.resize)
		resize();
	if (settings.resize && settings.noscale)
		noscale();
	//if (settings.showmenu)
	//	showmenu();
	if (settings.hrwiki)
		wikilink();
	if (settings.prevnext)
		prevnext();
	if (settings.flipper && whichsite == 0)
		flipper();
	if (settings.updates)
		checkupdates();
	
	// mess with popup windows - make them bigger and resizeable
	var oldopen = unsafeWindow.open;
	unsafeWindow.open = function(a,b,c)
	{
		c = c.split(/,/);
		var opts = {};
		for (var i = 0; i < c.length; i++)
		{
			var d = c[i].split(/=/);
			if (d.length == 2)
				opts[d[0]] = d[1];
		}
		opts["width"] = window.screen.width * 0.8;
		opts["height"] = window.screen.height * 0.8;
		opts["resizeable"] = "yes";
		c = "";
		for (var i in opts)
		{
			c += i + "=" + opts[i] + ",";
		}
		return oldopen(a,b,c);
	}
}

function replaceFlash(url)
{
	where = flashmovie;
	while (where && where.parentNode && where.parentNode.nodeName.toLowerCase() == "object")
		where = where.parentNode;
	var newFlash=document.createElement("object");
	newFlash.setAttribute("width",flashmovie.width);
	newFlash.setAttribute("height",flashmovie.height);
	newFlash.setAttribute("type","application/x-shockwave-flash");
	newFlash.setAttribute("bgcolor",flashmovie.bgcolor ? flashmovie.bgcolor : "#FFFFFF");
	newFlash.setAttribute("data",url);
	
	where.parentNode.replaceChild(newFlash,where);
	
	flashmovie=newFlash.wrappedJSObject;
}
function getSWFFilename()
{
	// try to find the filename
	var a = flashmovie.src;
	if (!a)
		a = flashmovie.data;
	if (!a)
	{
		a = flashmovie.getElementsByTagName('param').namedItem('movie');
		if (a)
			a = a.value;
	}
	return a;
}
function getFlashVars()
{
	var flashvars = new Object();
	var flashvarsstring = flashmovie.getAttribute("FlashVars");
	if (!flashvarsstring)
	{
		flashvarsstring = flashmovie.getElementsByTagName('param').namedItem('FlashVars');
		if (flashvarsstring)
			flashvarsstring = flashvarsstring.value;
	}
	// parse the string
	if (flashvarsstring)
	{
		var flashvarsparts = flashvarsstring.split('&');
		for (var i = 0; i < flashvarsparts.length; i++)
		{
			var a = flashvarsparts[i].split('=');
			if (a.length == 2)
				flashvars[unescape(a[0])] = unescape(a[1]);
		}
	}
	var filename = getSWFFilename();
	var i = filename.indexOf('?');
	if (i >= 0)
	var flashvarsstring = filename.substring(i + 1);
	if (flashvarsstring)
	{
		var flashvarsparts = flashvarsstring.split('&');
		for (var i = 0; i < flashvarsparts.length; i++)
		{
			var a = flashvarsparts[i].split('=');
			if (a.length == 2)
				flashvars[unescape(a[0])] = unescape(a[1]);
		}
	}
	return flashvars;
}

function addsettingsbox()
{
	settingsbox = document.createElement('div');
	settingsbox.style.borderRight = settingsbox.style.borderBottom = '1px solid #666';
	settingsbox.style.background = '#EEE';
	settingsbox.style.color = '#000';
	settingsbox.style.position = 'fixed';
	settingsbox.style.left = 0;
	settingsbox.style.top = 0;
	settingsbox.style.width = '350px';
	settingsbox.style.font = '12px sans-serif';
	settingsbox.style.textAlign = 'left';
	settingsbox.style.display = 'none';
	settingsbox.style.zIndex = 2;
	document.body.appendChild(settingsbox);
	var titlebar = document.createElement('div');
	titlebar.style.fontWeight = "bolder";
	titlebar.style.background = "#CCC";
	titlebar.style.borderBottom = "1px solid #666";
	titlebar.style.padding = '3px';
	settingsbox.appendChild(titlebar);
	var closebutton = document.createElement('img');
	closebutton.src = image_close;
	closebutton.title = "Click to hide preferences";
	closebutton.style.cssFloat = "right";
	closebutton.style.verticalAlign = "text-bottom";
	closebutton.style.cursor = "pointer";
	closebutton.style.display = "block";
	closebutton.addEventListener('click', function(){settingsbox.style.display = "none"; settingslink.style.display = "block";}, false);
	titlebar.appendChild(closebutton);
	var prefslogo = document.createElement('img');
	prefslogo.src = image_prefs;
	prefslogo.style.verticalAlign = "text-bottom";
	titlebar.appendChild(prefslogo);
	titlebar.appendChild(document.createTextNode(" Preferences"));
	var settingsform = document.createElement('form');
	settingsform.style.margin = 0;
	settingsform.style.padding = '3px';
	settingsbox.appendChild(settingsform);
	var settingslist = document.createElement('ul');
	settingslist.style.listStyle = "none";
	var a = window.innerHeight - 75;
	if (a < 40) a = 40;
	settingslist.style.maxHeight = a + 'px';
	settingslist.style.overflow = 'auto'; // vertical scrollbar if needed
	window.addEventListener('resize', function()
	{
		var a = window.innerHeight - 75;
		if (a < 40) a = 40;
		settingslist.style.maxHeight = a + 'px';
	}, false);
	settingslist.style.padding = settingslist.style.margin = 0;
	settingsform.appendChild(settingslist);
	for (i = 0; i < settingnames.length; i++)
	{
		var settingrow = document.createElement('li');
		settingnames[i].li = settingrow;
		var settingcheckbox = document.createElement('input');
		settingcheckbox.type = "checkbox";
		settingcheckbox.checked = settings[settingnames[i].name];
		settingcheckbox.title = settingnames[i].tooltip;
		settingcheckbox.id = "setting_" + settingnames[i].name;
		settingcheckbox.addEventListener('click', enabledisable, false);
		settingrow.appendChild(settingcheckbox);
		settingnames[i].checkbox = settingcheckbox;
		var settinglabel = document.createElement('label');
		settinglabel.htmlFor = "setting_" + settingnames[i].name;
		settinglabel.appendChild(document.createTextNode(' ' + settingnames[i].title));
		settinglabel.title = settingnames[i].tooltip;
		settingrow.appendChild(settinglabel);
		settingnames[i].label = settinglabel;
		
		if (settingnames[i].title.charAt(0) == ' ')
		{
			// get number of spaces;
			var numspaces = 1;
			while (settingnames[i].title.charAt(numspaces) == ' ') numspaces++;
			var previousindex = i - 1;
			while (previousindex > 0 && settingnames[previousindex].title.substring(0, numspaces).match(/^ +$/))
				previousindex--;
			if (previousindex >= 0)
			{
				settingnames[i].parent = settingnames[previousindex];
				if (!settingnames[previousindex].ul)
				{
					settingnames[previousindex].ul = document.createElement('ul');
					settingnames[previousindex].ul.style.listStyle = "none";
					settingnames[previousindex].ul.style.padding = settingnames[previousindex].ul.style.margin = 0;
					settingnames[previousindex].ul.style.marginLeft = "2em";
					settingnames[previousindex].li.appendChild(settingnames[previousindex].ul);
				}
				settingnames[previousindex].ul.appendChild(settingrow);
			}
			else
				settingslist.appendChild(settingrow);
		}
		else
			settingslist.appendChild(settingrow);
	}
	var div = document.createElement('div');
	div.style.textAlign = "center";
	settingsform.appendChild(div);
	var savebutton = document.createElement('input');
	savebutton.type = "submit";
	savebutton.value = "Save and Apply";
	div.appendChild(savebutton);
	var nocachebutton = document.createElement('input');
	nocachebutton.type = "submit";
	nocachebutton.value = "Clear subtitles cache";
	nocachebutton.addEventListener("click", function(){GM_setValue("cachedodge", Math.random().toString())}, false);
	div.appendChild(document.createTextNode(" "));
	div.appendChild(nocachebutton);
	settingsform.addEventListener("submit", savesettings, false);
	
	var settingslink = document.createElement('div');
	settingslink.style.borderRight = settingslink.style.borderBottom = '1px solid #666';
	settingslink.style.background = '#EEE';
	settingslink.style.display = "block";
	settingslink.style.position = 'fixed';
	settingslink.style.left = '0px';
	settingslink.style.top = '0px';
	settingslink.style.padding = '3px';
	settingslink.style.zIndex = 2;
	var settingslinkimage = document.createElement('img');
	settingslinkimage.src = image_prefs;
	settingslinkimage.title = "Click to show preferences";
	settingslinkimage.style.cursor = "pointer";
	settingslinkimage.style.display = "block";
	settingslinkimage.addEventListener('click', function(){settingsbox.style.display = "block"; settingslink.style.display = "none";}, false);
	settingslink.appendChild(settingslinkimage);
	document.body.appendChild(settingslink);
	
	// add some extra settings other than checkboxes that aren't handled in the structure above
	extrasettings[0] = {'name': 'language'};
	var settingrow = document.createElement('li');
	extrasettings[0].li = settingrow;
	var settinglabel = document.createElement('label');
	settinglabel.htmlFor = "setting_language";
	settinglabel.appendChild(document.createTextNode('Subtitle Language: '));
	settinglabel.title = 'Display subtitles in this language, if any';
	settingrow.appendChild(settinglabel);
	extrasettings[0].label = settinglabel;
	var settingselect = document.createElement('select');
	settingselect.title = 'Display subtitles in this language, if any';
	settingselect.id = "setting_language";
	settingrow.appendChild(settingselect);
	extrasettings[0].select = settingselect;
	for (i = 0; i < settingnames.length; i++)
	{
		if (settingnames[i].name == "subtitles")
		{
			extrasettings[0].parent = settingnames[i];
			settingnames[i].ul.insertBefore(settingrow, settingnames[i].ul.firstChild);
		}
	}
	extrasettings[0].populated = false;
	
	extrasettings[1] = {'name': 'testsubsdata'};
	var div = document.createElement('div');
	div.style.display = "block";
	div.style.margin = "5px 10px 5px 2em";
	div.style.textAlign = "center";
	extrasettings[1].div = div;
	var settingtextarea = document.createElement('textarea');
	settingtextarea.title = 'Paste your XML data here';
	settingtextarea.id = "setting_testsubsdata";
	settingtextarea.rows = 10;
	settingtextarea.style.width = "100%";
	settingtextarea.style.fontSize = "10px";
	settingtextarea.style.textAlign = "left";
	settingtextarea.appendChild(document.createTextNode(settings['testsubsdata']));
	div.appendChild(settingtextarea);
	extrasettings[1].textarea = settingtextarea;
	// only enable the refresh option if we're already set up for testing subtitles
	//  - I'm not sure if it's robust otherwise.
	//
	// The interface for this thing is kinda confusing, so it's not in the script by default
	// change the "false" to a "true" to include it.
	if (settings.testsubs && false)
	{
		var settingbutton = document.createElement('input');
		settingbutton.type = 'button';
		settingbutton.title = 'Reload test XML data';
		settingbutton.value = 'Reload Subtitles';
		settingbutton.addEventListener('click', reloadSubtitles, false);
		div.appendChild(settingbutton);
		extrasettings[1].button = settingbutton;
	}
	for (i = 0; i < settingnames.length; i++)
	{
		if (settingnames[i].name == "testsubs")
		{
			extrasettings[1].parent = settingnames[i];
			settingnames[i].li.appendChild(div);
		}
	}
	
	extrasettings[2] = {'name': 'names'};
	var settingrow = document.createElement('li');
	extrasettings[2].li = settingrow;
	var settinglabel = document.createElement('label');
	settinglabel.htmlFor = "setting_names";
	settinglabel.appendChild(document.createTextNode('Show speakers\' names: '));
	settinglabel.title = 'Show the speakers\' names before their lines';
	settingrow.appendChild(settinglabel);
	extrasettings[2].label = settinglabel;
	var settingselect = document.createElement('select');
	settingselect.title = 'Show the speakers\' names before their lines';
	settingselect.id = "setting_names";
	settingrow.appendChild(settingselect);
	extrasettings[2].select = settingselect;
	var option = document.createElement('option');
	option.value = "0";
	option.appendChild(document.createTextNode("Never"));
	if (settings['names'] == 0)
		option.selected = true;
	settingselect.appendChild(option);
	var option = document.createElement('option');
	option.value = "1";
	option.appendChild(document.createTextNode("On voiceovers"));
	if (settings['names'] == 1)
		option.selected = true;
	settingselect.appendChild(option);
	var option = document.createElement('option');
	option.value = "2";
	option.appendChild(document.createTextNode("Always"));
	if (settings['names'] == 2)
		option.selected = true;
	settingselect.appendChild(option);
	for (i = 0; i < settingnames.length; i++)
	{
		if (settingnames[i].name == "colours")
		{
			extrasettings[2].parent = settingnames[i].parent;
			settingnames[i].parent.ul.insertBefore(settingrow, settingnames[i].li.nextSibling);
		}
	}
	
	enabledisable();
}
function enabledisable()
{
	for (i = 0; i < settingnames.length; i++)
	{
		if (!settingnames[i].parent)
			continue;
		enabled = true;
		p = settingnames[i].parent;
		while(p)
		{
			if (!p.checkbox.checked)
			{
				enabled = false;
				break;
			}
			p = p.parent;
		}
		settingnames[i].checkbox.disabled = !enabled;
		settingnames[i].label.style.color = enabled ? "inherit" : "#666";
	}
	
	enabled = true;
	p = extrasettings[0].parent;
	while(p)
	{
		if (!p.checkbox.checked)
		{
			enabled = false;
			break;
		}
		p = p.parent;
	}
	extrasettings[0].select.disabled = !enabled;
	extrasettings[0].label.style.color = enabled ? "inherit" : "#666";
	if (enabled && !extrasettings[0].populated)
		downloadxmlfromwiki("Subtitles:Languages", populatelanguagelist);

	
	enabled = true;
	p = extrasettings[1].parent;
	while(p)
	{
		if (!p.checkbox.checked)
		{
			enabled = false;
			break;
		}
		p = p.parent;
	}
	extrasettings[1].textarea.disabled = !enabled;
	if (extrasettings[1].button)
		extrasettings[1].button.disabled = !enabled;
	// hide it entirely if immediate parent is disabled
	extrasettings[1].div.style.display = extrasettings[1].parent.checkbox.checked ? "block" : "none";
	settingsbox.style.width = extrasettings[1].parent.checkbox.checked ? "500px" : "350px";

	enabled = true;
	p = extrasettings[2].parent;
	while(p)
	{
		if (!p.checkbox.checked)
		{
			enabled = false;
			break;
		}
		p = p.parent;
	}
	extrasettings[2].select.disabled = !enabled;
	extrasettings[2].label.style.color = enabled ? "inherit" : "#666";
}
function savesettings(e)
{
	for (i = 0; i < settingnames.length; i++)
	{
		settingbox = settingnames[i].checkbox;
		if (settingbox)
		{
			settings[settingnames[i].name] = settingbox.checked;
			GM_setValue(settingnames[i].name, settingbox.checked ? 1 : 0);
		}
	}
	
	if (extrasettings[0].populated)
	{
		settings['language'] = extrasettings[0].select.value;
		GM_setValue('language', extrasettings[0].select.value);
	}
	settings['testsubsdata'] = extrasettings[1].textarea.value;
	GM_setValue('testsubsdata', escape(extrasettings[1].textarea.value));
	// stop the form from actually being submitted
	if (e && e.preventDefault)
	{
		location.reload();
		e.preventDefault();
	}
	settings['names'] = extrasettings[2].select.value;
	GM_setValue('names', extrasettings[2].select.value);
}

// modified from Homestar-Fullon
function doResize()
{
	var dw = window.innerWidth;
	var dh = window.innerHeight - 15; // things get weird sometimes... -15 to make sure we don't get scrollbars.
	if (navbar)
	{
		// parseInt will take the number part at the start, turning eg "10px" into 10
		a = document.defaultView.getComputedStyle(navbar, null);
		dh -= parseInt(a.height,10);
		dh -= parseInt(a.marginTop,10);
		dh -= parseInt(a.marginBottom,10);
	}
	if (seekbar)
	{
		a = document.defaultView.getComputedStyle(seekbar, null)
		dh -= parseInt(a.height,10);
		dh -= parseInt(a.marginTop,10);
		dh -= parseInt(a.marginBottom,10);
	}
	if (subtitleholder)
	{
		a = document.defaultView.getComputedStyle(subtitleholder, null)
		dh -= parseInt(a.height,10);
		dh -= parseInt(a.marginTop,10);
		dh -= parseInt(a.marginBottom,10);
	}
	if (transcriptErrors)
	{
		a = document.defaultView.getComputedStyle(transcriptErrors, null)
		dh -= parseInt(a.height,10);
		dh -= parseInt(a.marginTop,10);
		dh -= parseInt(a.marginBottom,10);
	}
	// enforce a (rather small) minimum size, regardless of how much crap is squeezed below the frame
	if (dw < 100) dw = 100;
	if (dh < 100) dh = 100;
	// if it was a percentage size, or we're looking outside the frame, just fill the whole window.
	// otherwise, keep the aspect ratio correct... "touch inside" style.
	if (!isPercentage && !settings.noscale)
	{
		if(dw/aspect <= dh)
			dh = Math.floor(dw / aspect);
		else
			dw = Math.floor(dh * aspect);
	}

	// set embed's size
	flashmovie.width = dw;
	flashmovie.height = dh;
	if (seekbar)
		seekbar.style.width = Math.max(dw, 450) + "px";
}
function resize()
{
	if (flashmovie.width.toString().indexOf('%') >= 0 || flashmovie.width.toString().indexOf('%') >= 0)
		isPercentage = true;
	else
		aspect = flashmovie.width/flashmovie.height;
	window.addEventListener('resize', doResize, false);
	doResize();
}

// modified from the seek bar bookmarklet
function addFlashControls(flash)
{
	seekbar=document.createElement("div");
	seekbar.style.width=Math.max(parseInt(flash.width)||0,450) + "px";
	seekbar.style.margin = "0 auto";
	var where=flash;
	while(where.parentNode.tagName.toLowerCase()=="object")
		where=where.parentNode;
	where.parentNode.insertBefore(seekbar,where.nextSibling);
	var table=document.createElement("table");
	table.style.width="100%";
	seekbar.appendChild(table);
	var row=table.insertRow(-1);
	var pauseButton=document.createElement("button");
	pauseButton.appendChild(document.createTextNode("Pause"));
	var buttonCell=row.insertCell(-1);
	buttonCell.appendChild(pauseButton);
	var rewindCell=row.insertCell(-1);
	var rewindButton=document.createElement("button");
	rewindButton.appendChild(document.createTextNode("<<"));
	rewindCell.appendChild(rewindButton);
	var prevCell=row.insertCell(-1);
	var prevButton=document.createElement("button");
	prevButton.appendChild(document.createTextNode("|<"));
	prevCell.appendChild(prevButton);
	var slider=row.insertCell(-1);
	slider.width="100%";
	var visibleSlider=document.createElement("div");
	visibleSlider.style.position="relative";
	visibleSlider.style.height="10px";
	visibleSlider.style.width="100%";
	visibleSlider.style.MozBorderRadius="4px";
	visibleSlider.style.background="#333";
	slider.appendChild(visibleSlider);
	var loadmeter=document.createElement("div");
	loadmeter.style.position="absolute";
	loadmeter.style.top=loadmeter.style.left = "0";
	loadmeter.style.height="10px";
	loadmeter.style.width="0px";
	loadmeter.style.MozBorderRadius="4px";
	loadmeter.style.background="#aaa";
	visibleSlider.appendChild(loadmeter);
	var thumb=document.createElement("div");
	thumb.style.position="absolute";
	thumb.style.height="20px";
	thumb.style.width="10px";
	thumb.style.top="-5px";
	thumb.style.MozBorderRadius="4px";
	thumb.style.background="#666";
	visibleSlider.appendChild(thumb);
	var nextCell=row.insertCell(-1);
	var nextButton=document.createElement("button");
	nextButton.appendChild(document.createTextNode(">|"));
	nextCell.appendChild(nextButton);
	var ffCell=row.insertCell(-1);
	var ffButton=document.createElement("button");
	ffButton.appendChild(document.createTextNode(">>"));
	ffCell.appendChild(ffButton);
	if (settings.frames)
	{
		var frameCell=row.insertCell(-1);
		var framecounter=document.createElement("div");
		framecounter.style.background="#ccc";
		framecounter.style.color="#000";
		framecounter.style.fontWeight="bold";
		framecounter.style.padding = "0 5px";
		frameCell.appendChild(framecounter);
		framecountertext=document.createTextNode("");
		framecounter.appendChild(framecountertext);
	}
	else
		framecountertext = false;
	if (!settings.noscale)
	{
		var zoomOutCell=row.insertCell(-1);
		var zoomOutButton=document.createElement("button");
		// \u2212 is &minus;
		zoomOutButton.appendChild(document.createTextNode("\u2212"));
		zoomOutCell.appendChild(zoomOutButton);
		var zoomNormalCell=row.insertCell(-1);
		var zoomNormalButton=document.createElement("button");
		zoomNormalButton.appendChild(document.createTextNode("0"));
		zoomNormalCell.appendChild(zoomNormalButton);
		var zoomInCell=row.insertCell(-1);
		var zoomInButton=document.createElement("button");
		zoomInButton.appendChild(document.createTextNode("+"));
		zoomInCell.appendChild(zoomInButton);
	}
	var sliderWidth;
	var paused=false;
	var dragging=false;
	var lastframe=-1;
	addEvent(pauseButton,"click",pauseUnpause);
	addEvent(rewindButton,"click",rewind);
	addEvent(prevButton,"click",prevFrame);
	addEvent(nextButton,"click",nextFrame);
	addEvent(ffButton,"click",fastforward);
	if (!settings.noscale)
	{
		addEvent(zoomOutButton,"click",zoomOut);
		addEvent(zoomNormalButton,"click",zoomNormal);
		addEvent(zoomInButton,"click",zoomIn);
	}
	addEvent(slider,"mousedown",drag);
	addEvent(slider,"drag",function(){return false;});
	window.setInterval(update,50);
	function pauseUnpause(){paused=flash.IsPlaying();pauseButton.style.borderStyle=paused?"inset":"";if(paused)flash.StopPlay();else flash.Play();}
	function rewind(){flash.GotoFrame(0); flash.Play();}
	function fastforward(){flash.GotoFrame(totalFrames() - 1);}
	function prevFrame(){flash.GotoFrame(flash.CurrentFrame()-1);}
	function nextFrame(){flash.GotoFrame(flash.CurrentFrame()+1);}
	function zoomIn(){flash.Zoom(67);}
	function zoomOut(){flash.Zoom(150);}
	function zoomNormal(){flash.Zoom(0);}
	function update()
	{
		var fullSliderWidth=parseInt(getWidth(slider));
		sliderWidth=parseInt(fullSliderWidth-getWidth(thumb));
		var tot=totalFrames();
		if (tot > 0)
		{
			var frame=flash.CurrentFrame();
			if (frame < 0)
				frame = 0;
			if (framecountertext)
			{
				var a = tot.toString();
				var b = (frame+1).toString();
				while (b.length < a.length)
					b = "\u2007" + b; // U+2007 FIGURE SPACE
				framecountertext.nodeValue=b+"/"+a;
			}
			if(!dragging)
			{
				if (tot > 1)
					thumb.style.left=(frame/(tot - 1)*sliderWidth)+"px";
				else
					thumb.style.left="0px";
				paused=!flash.IsPlaying();
				pauseButton.style.borderStyle=paused?"inset":"";
			}
			frame=flash.TGetProperty('/', 12); // property 12 is _framesloaded
			loadmeter.style.width=(frame/tot*fullSliderWidth)+"px";
		}
		else if (framecountertext)
		{
			framecountertext.nodeValue="Loading...";
		}
	}
	function dragMousemove(e)
	{
		var pageX=e.clientX+document.body.scrollLeft;
		var pos=bounds(0,pageX-getX(slider)-5,sliderWidth);
		t = totalFrames();
		if (t > 1)
		{
			var frame=bounds(0,Math.round((t - 1)*pos/sliderWidth),t - 1);
			flash.GotoFrame(frame);
		}
		thumb.style.left=pos+"px";
	}
	function release(e){removeEvent(document,"mousemove",dragMousemove);removeEvent(document,"mouseup",release);if(!paused)flash.Play();dragging=false;}
	function drag(e){addEvent(document,"mousemove",dragMousemove);addEvent(document,"mouseup",release);dragging=true;dragMousemove(e);}
	function bounds(min,val,max){return Math.min(Math.max(min,val),max);}
	function totalFrames(){if(typeof flash.TotalFrames=="number")return flash.TotalFrames;else if(typeof flash.TotalFrames=="function")return flash.TotalFrames();else return 1;}
	function getWidth(elem){if(document.defaultView&&document.defaultView.getComputedStyle)return parseFloat(document.defaultView.getComputedStyle(elem,null).getPropertyValue("width"));else return parseFloat(elem.offsetWidth);}
	function getX(elem){if(!elem) return 0;return(elem.offsetLeft)+getX(elem.offsetParent);}
	function addEvent(elem,eventName,fun){if(elem.addEventListener)elem.addEventListener(eventName,fun,false);else elem.attachEvent("on"+eventName,fun);}
	function removeEvent(elem,eventName,fun){if(elem.addEventListener)elem.removeEventListener(eventName,fun,false);else elem.detachEvent("on"+eventName,fun);}
}

function noscale()
{
	// have to wait until the Flash has loaded, otherwise SetVariable will fail.
	// best way I have found to test this, is if the current frame is >= 0...
	// before it's loaded, it's -1.
	// Before Flash itself initialises, CurrentFrame doesn't exist, so check for that too.
	var a = flashmovie.CurrentFrame;
	if (typeof(a) == "function")
		a = flashmovie.CurrentFrame();
	if (typeof(a) == "number" && a >= 0 && flashmovie.SetVariable)
		flashmovie.SetVariable("Stage.scaleMode", "noScale");
	else
		setTimeout(noscale, 10);
}
function showmenu()
{
	var a = flashmovie.CurrentFrame;
	if (typeof(a) == "function")
		a = flashmovie.CurrentFrame();
	if (typeof(a) == "number" && a >= 0 && flashmovie.SetVariable)
		flashmovie.SetVariable("Stage.showMenu", 1);
	else
		setTimeout(showmenu, 10);
}

function addHRWikiLink(pagename, isurl)
{
	div = document.createElement("div")
	div.style.borderLeft = div.style.borderBottom = '1px solid #666';
	div.style.background = '#EEE';
	div.style.position = "fixed";
	div.style.right = "0px";
	div.style.top = "0px";
	div.style.padding = "3px";
	link = document.createElement("a");
	if (isurl)
		link.href = pagename;
	else
		link.href = "http://www.hrwiki.org/index.php/" + escape(pagename.replace(/ /g, '_'));
	link.title = "See the HRWiki article for this page";
	link.style.display = "block";
	link.style.textDecoration = "none"
	div.appendChild(link);
	img=document.createElement("img");
	img.style.border="0px";
	img.style.display="block";
	img.src=image_hrwiki;
	link.appendChild(img);
	if (settings.subtitles)
	{
		link = document.createElement("a");
		link.href = "http://www.hrwiki.org/index.php/Subtitles:" + escape(filename.replace(/ /g, '_')) + "/" + escape(settings.language);
		link.title = "See the HRWiki article for this page's subtitles";
		link.style.display = "block";
		link.style.textDecoration = "none"
		link.style.textAlign = "center";
		link.style.fontSize = link.style.lineHeight = "16px";
		link.style.marginTop = "3px";
		div.appendChild(link);
		link.appendChild(document.createTextNode('S'));
	}
	document.body.appendChild(div);
}
function wikilink()
{
	// many pages on the mirror have an "info" link in the navbar (thanks Tom!)... use that
	if (whichsite == 3)
	{
		var a = document.getElementById("navbar");
		if (a) a = a.getElementsByTagName("a");
		if (a)
		{
			for (i = 0; i < a.length; i++)
			{
				if (a[i].firstChild.nodeType == 3 && a[i].firstChild.nodeValue == "info")
				{
					addHRWikiLink(a[i].href, true);
					return;
				}
			}
		}
	}
	
	// pull the filename from the url, use it as a link to HRWiki
	// all the filenames except a couple of special-cases are
	//  redirects to their articles
	// don't link to certain pages, they aren't redirects, but already existing pages
	// also detect a 404 error and special-case Strong Sad's Lament
	     if (document.title == "Oops! You bwoke it.")
		addHRWikiLink("404'd");
	else if (filename == "interview")
		addHRWikiLink("The_Interview");
	else if (filename == "fhqwhgads")
		addHRWikiLink("Everybody_to_the_Limit");
	else if (filename == "trogdor")
		addHRWikiLink("TROGDOR%21");
	else if (filename == "marshie")
		addHRWikiLink("Meet_Marshie");
	else if (filename == "eggs")
		addHRWikiLink("Eggs_(toon)");
	else if (filename == "fireworks")
		addHRWikiLink("Happy_Fireworks");
	else if (location.pathname.substr(0, 12) == "/sadjournal/" && filename != "wonderyears" && filename != "super8")
		addHRWikiLink("Strong_Sad%27s_Lament");
	else if (location.pathname.substr(0,5) == "/vii/" && (filename == "" || filename == "index"))
		addHRWikiLink("Viidelectrix");
	else if (filename == "" || filename == "index")
	{
		     if (whichsite == 0)
			addHRWikiLink("Index_Page");
		else if (whichsite == 1)
			addHRWikiLink("Podstar_Runner");
		else if (whichsite == 2)
			addHRWikiLink("Videlectrix");
		else if (whichsite == 3)
			; // this will be a 403 page - do nothing.
	}
	else
		addHRWikiLink(filename);
}

// Prev/Next links
function addprevnextlinks(prefix,number)
{
	if (number > 1)
	{
		var prevnum = (number - 1).toString();
		var link = document.createElement("a");
		if (prefix == "sbemail" && number == 101)
			link.href="sbemailahundred.html";
		else if (prefix == "sbemail" && number == 152)
			link.href="kotpoptoon.html";
		else
			link.href=prefix+prevnum+".html";
		link.style.position="fixed";
		link.style.left="0px";
		link.style.bottom="0px";
		link.style.padding="3px";
		link.style.background="white";
		link.style.border="1px solid black";
		link.style.textDecoration="none";
		link.appendChild(document.createTextNode('<'));
		document.body.appendChild(link);
	}

	var nextnum = (number + 1).toString();
	var link = document.createElement("a");
	if (prefix == "sbemail" && number == 99)
		link.href="sbemailahundred.html";
	else if (prefix == "sbemail" && number == 150)
		link.href="kotpoptoon.html";
	else
		link.href=prefix+nextnum+".html";
	link.style.position="fixed";
	link.style.right="0px";
	link.style.bottom="0px";
	link.style.padding="3px";
	link.style.background="white";
	link.style.border="1px solid black";
	link.style.textDecoration="none";
	link.appendChild(document.createTextNode('>'));
	if (settings['checknext'])
	{
		GM_xmlhttpRequest({
			method: "HEAD",
			url: link.href + "?cachedodge=" + GM_getValue('cachedodge', 0),
			onload: function (results)
			{
				if (results.status == 200 && results.responseHeaders.indexOf("404error.html") < 0)
					document.body.appendChild(link);
			}
		});
	}
	else
		document.body.appendChild(link);
}
function prevnext()
{
	// this is coded like this instead of just looking for /(\d+)/ so that it
	// doesn't find pages like commandos3 or xmas04
	var result;
	if ((result = filename.match(/^(sbemail|tgs|answer|bizcasfri|puppetjam|main)(\d+)$/)))
	{
		// sbemail100 isn't actually a sbemail
		if (result[1] != "sbemail" || result[2] != "100")
			addprevnextlinks(result[1],parseInt(result[2],10));
	}
	else if (filename == "sbemailahundred")
		addprevnextlinks("sbemail", 100);
	else if (filename == "kotpoptoon")
		addprevnextlinks("sbemail", 151);
	else if (filename == "dween_tgs")
		addprevnextlinks("tgs", 6);
}

function flipper()
{
	a = getSWFFilename();
	if (!a)
		return;
	     if (filename == "toons")
		replaceFlash("theyCallHimFlipperToons.swf?contentURL=" + escape(a));
	else if (filename == "games")
		replaceFlash("theyCallHimFlipperGames.swf?contentURL=" + escape(a));
	else if (filename == "payplus")
		replaceFlash("theyCallHimFlipperPayPlus.swf?contentURL=" + escape(a));
	else if (filename == "main22")
		replaceFlash("theyCallHimFlipperVirusMain.swf?contentURL=" + escape(a));
	else if (filename == "sbemail118")
		// virus *wasn't* flipped correctly originally, but I think having it work is better than
		// preserving the glitch.
		replaceFlash("theyCallHimFlipperVirusMain.swf?contentURL=" + escape(a));
	else if (filename == "sbemailahundred")
		replaceFlash("theyCallHimFlipperHundred.swf?contentURL=" + escape(a));
	else
		replaceFlash("theyCallHimFlipper.swf?contentURL=" + escape(a));
}

function addnavbarlink(ul,href,title)
{
	var li = document.createElement("li");
	var link = document.createElement("a");
	link.href = href;
	link.appendChild(document.createTextNode(title));
	li.appendChild(link);
	ul.appendChild(li);
	return link;
}
function replacenavbar()
{
	// need to add the styles as a stylesheet, rather than inline styles
	// so that we can use :hover
	GM_addStyle(
		"#newnavbar { margin: 0; padding: 0; text-align: center; text-transform: lowercase; } " +
		"#newnavbar li { margin: 0; padding: 0; display: inline; } " +
		"#newnavbar :link, #newnavbar :visited { color: #666; font-family: sans-serif; text-decoration: none; padding: 0 1em; } " +
		"#newnavbar :link:hover, #newnavbar :visited:hover { color: #CCC; } " +
		// for overriding podstar's settings:
		"#newnavbar :link, #newnavbar :visited { font-weight: normal; } " +
		"#newnavbar :link:hover, #newnavbar :visited:hover { background: transparent; font-weight: normal; } "
	);
	var newnavbar = document.createElement("ul");
	newnavbar.id = "newnavbar";
	newnavbar.style.height = newnavbar.style.fontSize = newnavbar.style.lineHeight = "10px";
	if (!settings.seekbar)
		newnavbar.style.marginTop = "10px";
	if (navbar)
	{
		var where = navbar;
		while(where.parentNode.tagName.toLowerCase() == "object")
			where = where.parentNode;
		where.parentNode.insertBefore(newnavbar, where);
		if (whichsite == 3)
			where.style.display = "none";
		else
			where.parentNode.removeChild(where);
	}
	else
		document.body.appendChild(newnavbar);
	mainlink = addnavbarlink(newnavbar, "http://www.homestarrunner.com/main" + Math.floor(Math.random() * 24 + 1) + ".html", "Main");
	// just for fun, re-randomise on each mouse-over (for the status bar)
	mainlink.addEventListener("mouseover",function(){mainlink.href="http://www.homestarrunner.com/main" + Math.floor(Math.random() * 24 + 1) + ".html"}, false);
	addnavbarlink(newnavbar, "http://www.homestarrunner.com/toons.html", "Toons");
	addnavbarlink(newnavbar, "http://www.homestarrunner.com/games.html", "Games");
	addnavbarlink(newnavbar, "http://www.homestarrunner.com/characters2.html", "Characters");
	addnavbarlink(newnavbar, "http://www.homestarrunner.com/downloads.html", "Downloads");
	addnavbarlink(newnavbar, "http://homestarrunner.stores.yahoo.net/", "Store");
	addnavbarlink(newnavbar, "http://www.homestarrunner.com/sbemail.html", "SB Emails");
	addnavbarlink(newnavbar, "http://www.homestarrunner.com/email.html", "Contact");
	addnavbarlink(newnavbar, "http://podstar.homestarrunner.com/", "Podcast");
	addnavbarlink(newnavbar, "http://www.homestarrunner.com/legal.html", "Legal");
	randolink = addnavbarlink(newnavbar, "javascript:alert('rando.xml not loaded yet... be patient')", "Rando");
	// load rando.xml and handle all that jazz
	GM_xmlhttpRequest({
		method: "GET",
		url: "http://www.homestarrunner.com/rando.xml?cachedodge=" + GM_getValue('cachedodge', 0),
		onload: randoxml_loaded
	});
	
	navbar = newnavbar;
}
function randoxml_loaded(results)
{
	// info on DOMParser stole from http://www.webreference.com/programming/javascript/domwrapper/3.html
	// Greasemonkey workaround from http://greaseblog.blogspot.com/2005/12/workarounds-for-missing-xmlhttprequest.html
	// (oh noes! unsafeWindow!)
	var parser = new unsafeWindow.DOMParser();
	// fix invalid XML...
	// add missing root element
	var doc = results.responseText.replace(/<\?xml.*?\?>/g, ""); // strip <?xml ?> tag
	doc = "<?xml version=\"1.0\" encoding=\"iso-8859-1\"?>\n<rando>" + doc + "</rando>";
	// fix bad ampersands
	doc = doc.replace(/&(?!\w*;)/g, "&amp;");
	doc = parser.parseFromString(doc, "application/xml");
	var sbemailcounter = 0;
	for (i = 0; i < doc.documentElement.childNodes.length; i++)
	{
		if (doc.documentElement.childNodes[i].nodeType == 1)
		{
			var type = doc.documentElement.childNodes[i].nodeName.toLowerCase();
			if (settings['rando' + type] == false) // == false so that it's considered "true" for undefined... if they add a new toon type
				continue;
			var u = doc.documentElement.childNodes[i].getAttribute('u');
			var n = doc.documentElement.childNodes[i].getAttribute('n');
			if (!n) n = "Untitled";
			if (type == "sb")
			{
				sbemailcounter++;
				n = "SBEmail: " + n;
			}
			if (u)
				randourls[randourls.length] = {u: "http://www.homestarrunner.com/" + u, n: n};
			else
				randourls[randourls.length] = {u: "http://www.homestarrunner.com/sbemail" + sbemailcounter + ".html", n: n};
		}
	}
	newrandolink()
	// just for fun, re-randomise on each mouse-over (for the status bar)
	randolink.addEventListener('mouseover', newrandolink, false);
}
function newrandolink()
{
	if (randourls.length > 0)
	{
		var r = randourls[Math.floor(Math.random() * randourls.length)];
		randolink.href = r.u;
		randolink.title = r.n;
	}
	else
	{
		randolink.href = "javascript:alert('Nothing to choose from')";
		randolink.title = "Nothing to choose from";
	}
}

function downloadxmlfromwiki(url, callback)
{
	url = escape(url.replace(/ /g, '_'));
	GM_xmlhttpRequest({
		method: "GET",
		url: "http://www.hrwiki.org/index.php?title=" + url + "&action=raw&cachedodge=" + GM_getValue('cachedodge', 0),
		onload: function(x) { xmldownloaded(x, callback, false, false); }
	});
}
function xmldownloaded(results, callback, redirected, showerrors)
{
	var text = results.responseText;
	// strip various things - templates and <pre> tags for wiki formatting, and <noinclude> sections...
	// <includeonly> tags are stripped (but their contents kept) for consistancy.
	text = text.replace(/{{.*?}}/g, "");
	text = text.replace(/<\/?pre[^>]*>/g, "");
	text = text.replace(/<noinclude[^>]*>.*?<\/noinclude[^>]*>/g, "");
	text = text.replace(/<includeonly[^>]*>(.*?)<\/includeonly[^>]*>/g, "$1");
	text = text.replace(/^\s+/g, "");
	// check for redirects
	var matches = text.match(/^#REDIRECT\s*\[\[(.*)\]\]/i);
	if (matches)
	{
		if (redirected) // trap double-redirects
		{	
			removeSubtitles();
			return;
		}
		text = matches[1];
		if (matches = text.match(/^(.*)\|/))
			text = matches[1];
		if (matches = text.match(/^(.*)\#/))
			text = matches[1];
		text = text.replace(/^\s+|\s+$/g, '');
		text = text.replace(/ /g, '_');
		GM_xmlhttpRequest({
			method: "GET",
			url: "http://www.hrwiki.org/index.php?title=" + escape(text) + "&action=raw&cachedodge=" + GM_getValue('cachedodge', 0),
			onload: function(x) { xmldownloaded(x, callback, true, showerrors); }
		});
		return;
	}
	var parser = new unsafeWindow.DOMParser();
	try
	{
		var doc = parser.parseFromString(text, "application/xml");
	}
	catch (e)
	{
		if (showerrors)
		{
			transcriptError("Error in test subtitles:");
			var pre = document.createElement("pre");
			pre.style.font = "inherit";
			pre.style.margin = "0.5em 0 0";
			pre.appendChild(document.createTextNode(e.toString()))
			transcriptErrors.appendChild(pre);
		}
		removeSubtitles();
		return;
	}
	// check if returned document is an error message
	if (doc.documentElement.lastChild && doc.documentElement.lastChild.nodeName == 'sourcetext')
	{
		// the xml document looks like
		// <parsererror>Error details<sourcetext>Source text</sourcetext></parsererror>
		if (showerrors)
		{
			transcriptError("Error in test subtitles:");
			var pre = document.createElement("pre");
			pre.style.font = "inherit";
			pre.style.margin = "0.5em 0 0";
			pre.appendChild(document.createTextNode(doc.documentElement.firstChild.nodeValue.replace(/Location: .*\n/, "")))
			transcriptErrors.appendChild(pre);
			pre = document.createElement("pre");
			pre.style.margin = "0.5em 0 0";
			pre.appendChild(document.createTextNode(doc.documentElement.lastChild.firstChild.nodeValue))
			transcriptErrors.appendChild(pre);
		}
		removeSubtitles();
		return;
	}
	callback(doc);
}

function populatelanguagelist(xml)
{
	while (extrasettings[0].select.firstChild)
		extrasettings[0].select.removeChild(extrasettings[0].select.firstChild);
	a = xml.getElementsByTagName('language');
	for (i = 0; i < a.length; i++)
	{
		// sanity-check the node
		if (a[i].hasAttribute('xml:lang') && a[i].firstChild && (a[i].firstChild.nodeType == xml.TEXT_NODE || a[i].firstChild.nodeType == xml.CDATA_SECTION_NODE))
		{
			option = document.createElement('option');
			option.appendChild(document.createTextNode(a[i].firstChild.nodeValue));
			option.lang = option.value = a[i].getAttribute('xml:lang');
			if (option.lang == settings['language'])
				option.selected = true;
			option.dir = "ltr";
			if (a[i].hasAttribute('dir'))
				option.dir = a[i].getAttribute('dir');
			extrasettings[0].select.appendChild(option);
		}
	}
	extrasettings[0].populated = true;
}

function setupSubtitles()
{
	subtitleholder = document.createElement('div');
	subtitleholder.style.color = "white";
	subtitleholder.style.font = "20px/25px sans-serif";
	subtitleholder.style.backgroundColor = "black";
	subtitleholder.style.height = "100px";
	//subtitleholder.style.marginTop = "10px";
	subtitleholder.style.textAlign = "center";
	where = flashmovie;
	while(where.parentNode.tagName.toLowerCase() == "object")
		where = where.parentNode;
	where.parentNode.insertBefore(subtitleholder, where.nextSibling);
	
	GM_addStyle(
		'.italic { font-style: italic; } ' +
		'.italic em, .italic cite, .italic i { font-style: normal; }'
	);
	
	subtitleholder.appendChild(currentsubtitles = document.createTextNode("Loading subtitles..."));
	
	downloadxmlfromwiki('Subtitles:Characters', charactersLoaded);
}
function removeSubtitles()
{
	if (subtitleholder)
		subtitleholder.parentNode.removeChild(subtitleholder);
	subtitleholder = false;
	if (settings.resize)
		doResize();
}
function reloadSubtitles()
{
	savesettings(false);
	
	if (!subtitleholder)
	{
		subtitleholder = document.createElement('div');
		subtitleholder.style.color = "white";
		subtitleholder.style.font = "20px/25px sans-serif";
		subtitleholder.style.backgroundColor = "black";
		subtitleholder.style.height = "100px";
		//subtitleholder.style.marginTop = "10px";
		subtitleholder.style.textAlign = "center";
		where = flashmovie;
		while(where.parentNode.tagName.toLowerCase() == "object")
			where = where.parentNode;
		where.parentNode.insertBefore(subtitleholder, where.nextSibling);
		subtitleholder.appendChild(currentsubtitles = nosubtitles);
	}
	if (transcriptErrors)
	{
		transcriptErrors.parentNode.removeChild(transcriptErrors);
		transcriptErrors = false;
	}
	transcript = [];
	if (subtitleLoop)
		clearInterval(subtitleLoop);
	subtitleLoop = false;
	
	xmldownloaded({'responseText': settings.testsubsdata}, transcriptLoaded, false, true);
}

function charactersLoaded(doc)
{
	var speakers = doc.getElementsByTagName("speaker");
	for (var i = 0; i < speakers.length; i++)
	{
		var speakername = speakers[i].getAttribute("id");
		characters[speakername] = {"color": speakers[i].getAttribute("color"), "sfx": speakers[i].hasAttribute("sfx"), "name": {"en": ""}};
		var names = speakers[i].getElementsByTagName("name");
		for (var j = 0; j < names.length; j++)
		{
			var lang = names[j].getAttribute("xml:lang");
			if (names[j].firstChild && (names[j].firstChild.nodeType == doc.TEXT_NODE || names[j].firstChild.nodeType == doc.CDATA_SECTION_NODE))
				characters[speakername].name[lang] = names[j].firstChild.nodeValue;
		}
	}
	if (!settings.testsubs)
		downloadxmlfromwiki('Subtitles:' + filename + '/' + settings.language, transcriptLoaded);
	else
		xmldownloaded({'responseText': settings.testsubsdata}, transcriptLoaded, false, true);
}

function transcriptLoaded(doc)
{
	// set some defaults
	if (!doc.documentElement.getAttribute("xml:lang")) doc.documentElement.setAttribute("xml:lang", "en");
	if (!doc.documentElement.getAttribute("dir"))      doc.documentElement.setAttribute("dir",      "ltr");
	// inherit languages to all subnodes
	inheritLanguages(doc.documentElement);
	// now parse the lines into divs and get start and end frames
	var lines = doc.getElementsByTagName("line");
	var previousEnd = NaN;
	for (var i = 0; i < lines.length; i++)
	{
		var line = new Object();
		// ignore lines with missing start/end values
		// so you can add all the lines and not worry about timing them until later
		if (!lines[i].getAttribute("start") || !lines[i].getAttribute("end"))
			continue;
		line.start = parseInt(lines[i].getAttribute("start"), 10);
		line.end = parseInt(lines[i].getAttribute("end"), 10);
		if (settings.testsubs)
		{
			if (isNaN(line.start))
				transcriptError("Start value \"" + lines[i].getAttribute("start") + "\" is not a number");
			if (isNaN(line.end))
				transcriptError("End value \"" + lines[i].getAttribute("end") + "\" is not a number");
			if (line.end < line.start)
				transcriptError("Line beginning frame " + line.start + " ends before it begins.");
			if (line.start < previousEnd)
				transcriptError("Line beginning frame " + line.start + " starts before the previous frame ends.");
			previousEnd = line.end;
		}
		line.text = importNodes(lines[i]);
		transcript.push(line);
	}
	
	
	if (settings.resize)
		doResize();
	
	subtitleLoop = setInterval(refreshSubtitles, 50);
}
function inheritLanguages(node)
{
	for (var i = node.firstChild; i; i = i.nextSibling)
	{
		if (i.nodeType == i.ELEMENT_NODE)
		{
			if (!i.hasAttribute("xml:lang")) i.setAttribute("xml:lang", node.getAttribute("xml:lang"));
			if (!i.hasAttribute("dir"))      i.setAttribute("dir",      node.getAttribute("dir"));
			inheritLanguages(i);
		}
	}
}
// replacement for document.importNode() that actually works properly
// turning eg <span> into an HTML span element, rather than an unknown element
// that happens to be called "span".
function importNodes(node)
{
	var name = node.nodeName.toLowerCase();
	if (characters[name])
	{
		node.setAttribute("speaker", name);
		name = "speaker";
	}
	if (name == "line" || name == "speaker")
	{
		// format the speaker appropriately as a div
		var speaker = node.getAttribute("speaker");
		if (!settings.captions && (speaker == "sfx" || node.hasAttribute("sfx")))
			return document.createComment(""); // return nothing
		newNode = document.createElement("div");
		var char = characters[speaker];
		if (!char)
		{
			if (settings.testsubs && speaker)
			{
				line = node;
				while (line && line.nodeName != "line")
					line = line.parentNode;
				if (line)
					transcriptError("Line beginning frame " + line.getAttribute("start") + " has an unrecognised speaker name \"" + speaker + '"');
			}
			char = {"color": "#FFF", "name": {"en": ""}};
		}
		if (settings.colours)
			newNode.style.color = char.color;
		if (node.hasAttribute("voiceover"))
			newNode.className = "italic";
		if (node.hasAttribute("volume"))
		{
			newNode.style.fontSize = (node.getAttribute("volume") * 100) + "%";
			newNode.style.lineHeight = "1.25em";
		}
		newNode.lang = node.getAttribute("xml:lang");
		newNode.dir = node.getAttribute("dir");
		var hasSpeakerChildren = false;
		for (var i = node.firstChild; i; i = i.nextSibling)
		{
			if (i.nodeType == i.ELEMENT_NODE)
			{
				newNode.appendChild(importNodes(i));
				var a = i.nodeName.toLowerCase();
				if (i == "line" || i == "speaker" || characters[i])
					hasSpeakerChildren = true;
			}
			else if (i.nodeType == i.TEXT_NODE || i.nodeType == i.CDATA_SECTION_NODE)
				newNode.appendChild(document.importNode(i, true));
		}
		if (!hasSpeakerChildren)
		{
			// this is a normal text node - do some extra text stuff
			if (char.sfx || node.hasAttribute("sfx"))
			{
				newNode.insertBefore(document.createTextNode('('), newNode.firstChild);
				newNode.appendChild(document.createTextNode(')'))
				newNode.className = "italic";
			}
			if (settings.names == 2 || (node.hasAttribute("voiceover") && settings.names == 1))
			{
				// find the language with the longest prefix match
				// fall back to "en" if none found
				var bestmatch = "en";
				var langbits = node.getAttribute("xml:lang").split("-");
				for (i = langbits.length; i >= 1; i--)
				{
					var lang = langbits.slice(0, i).join("-");
					if (char.name[lang])
					{
						bestmatch = lang;
						break;
					}
				}
				if (char.name[bestmatch] != '')
					newNode.insertBefore(document.createTextNode(char.name[bestmatch] + ": "), newNode.firstChild);
			}
		}
		return newNode;
	}
	else
	{
		// check element blacklist
		if (name == "script" ||
		    name == "style"  ||
		    name == "object" ||
		    name == "param"  ||
		    name == "embed"  ||
		    name == "a"      ||
		    name == "img"    ||
		    name == "applet" ||
		    name == "map"    ||
		    name == "frame"  ||
		    name == "iframe" ||
		    name == "meta"   ||
		    name == "link"   ||
		    name == "form"   ||
		    name == "input")
		{
			if (settings.testsubs)
				transcriptError("Blacklisted element \"" + name + "\" stripped.");
			return document.createComment(""); // return nothing
		}
		var newNode = document.createElement(name);
		// copy across attributes
		for (var i = 0; i < node.attributes.length; i++)
		{
			name = node.attributes[i].nodeName.toLowerCase();
			// check attribute blacklist
			// javascript, and anything that might load stuff from offsite
			if (name != "href" && name != "src" && name.substring(0, 2) != "on")
			{
				if (name == "style")
				{
					// regex taken from MediaWiki Sanitizer.php
					if (!node.attributes[i].nodeValue.match(/(expression|tps*:\/\/|url\\s*\()/i))
						newNode.setAttribute("style", node.attributes[i].nodeValue);
				}
				else if (name == "xml:lang")
				{
					newNode.lang = node.attributes[i].nodeValue;
				}
				else
					newNode.setAttribute(node.attributes[i].nodeName, node.attributes[i].nodeValue);
			}
			else if (settings.testsubs)
				transcriptError("Blacklisted attribute \"" + name + "\" stripped.");
		}
		// copy across children
		for (var i = node.firstChild; i; i = i.nextSibling)
		{
			if (i.nodeType == i.ELEMENT_NODE)
				newNode.appendChild(importNodes(i));
			else if (i.nodeType == i.TEXT_NODE || i.nodeType == i.CDATA_SECTION_NODE)
				newNode.appendChild(document.importNode(i, true));
		}
		return newNode;
	}
	document.createComment(""); // fallthrough
}

function setSubtitles(node)
{
	if (!node)
		node = nosubtitles;
	if (currentsubtitles != node)
	{
		subtitleholder.replaceChild(node, subtitleholder.firstChild);
		currentsubtitles = node;
	}
}
function refreshSubtitles()
{
	var frame = false;
	if (!flashmovie)
		return;
	if (typeof(flashmovie.CurrentFrame) == "function")
		frame = flashmovie.CurrentFrame();
	if (typeof(frame) == "number" && frame >= 0)
	{
		// change from native 0-based to more friendly 1-based
		frame++;
		// binary search to find the right transcript line
		var first = 0;
		var last = transcript.length;
		while(first < (last - 1))
		{
			var mid = (first + last) >> 1;
			if (frame >= transcript[mid].start)
				first = mid;
			else
				last = mid;
		}
		// should we actually show the line?
		if(transcript[first].start <= frame && transcript[first].end >= frame)
			setSubtitles(transcript[first].text);
		else
			setSubtitles(false);
	}
}
function transcriptError(str)
{
	if (!transcriptErrors)
	{
		transcriptErrors = document.createElement('div')
		transcriptErrors.style.color = "red";
		transcriptErrors.style.background = "black";
		transcriptErrors.style.font = "12pt sans-serif";
		transcriptErrors.style.textAlign = "left";
		transcriptErrors.style.margin = "0.5em";
		document.body.appendChild(transcriptErrors);
	}
	else
		transcriptErrors.appendChild(document.createElement('br'));
	transcriptErrors.appendChild(document.createTextNode(str));
}

function checkupdates()
{
	var now = new Date().getTime();
	var then = new Number(GM_getValue('lastchecktime', 0));
	if (now - then > 86400000) // only check at most once per day
	{
		GM_xmlhttpRequest({
			method: "GET",
			url: "http://www.hrwiki.org/index.php/Special:Getversion/User:Phlip/Greasemonkey?cachedodge=" + Math.random(),
			onload: function(r){GM_setValue('lastchecktime', ""+now);GM_setValue('lastcheckstring', r.responseText);return updatesstr_loaded(r.responseText);}
		});
	}
	else
		updatesstr_loaded(GM_getValue('lastcheckstring', ''));
}
function updatesstr_loaded(str)
{
	var parts = str.split("@@");
	for (var i = 0; i < parts.length; i++)
	{
		var matches = parts[i].match(/^(\d+)\.(\d+)\.(\d+)=(.*)$/);
		if (!matches) continue;
		if (matches[1] > currentversion[0] ||
		    (matches[1] == currentversion[0] && matches[2] > currentversion[1]) ||
		    (matches[1] == currentversion[0] && matches[2] == currentversion[1] && matches[3] > currentversion[2]))
		{
			var updatelink = document.createElement('a');
			updatelink.href=matches[4];
			updatelink.style.display = "block";
			updatelink.style.position = 'fixed';
			updatelink.style.left = '0px';
			updatelink.style.top = '0px';
			updatelink.style.border = 'none';
			updatelink.style.zIndex = 1;
			var updatelinkimage = document.createElement('img');
			updatelinkimage.src = image_update;
			var oldversionstr = currentversion[0] + "." + currentversion[1] + "." + currentversion[2];
			var newversionstr = matches[1] + "." + matches[2] + "." + matches[3];
			updatelinkimage.title = "Click here to update from script version " + oldversionstr + " to " + newversionstr;
			updatelinkimage.style.display = "block";
			updatelinkimage.style.border = 'none';
			updatelink.appendChild(updatelinkimage);
			document.body.appendChild(updatelink);
			return;
		}
	}
}
//</pre>
