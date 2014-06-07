// ==UserScript==
// @name TO1 Annoy-Free Forum V6.5
// @namespace http://userscripts.org/people/17268
// @description TO1 Annoy-Free Forum V6.5
// @include http://forum.myspace.com/*
// ==/UserScript==

//----------------------------------------------------------------
// All forum pages
//----------------------------------------------------------------

	s= 'Creator{ID:46188802;}\n';
	s+= 'body {display:block !important;padding:0!important;margin:0!important;}\n';
	s+= '#forumwide {position:relative; left:100;}\n';
	s+= '#side_google, #ad-wrap, #srch, #leaderboardRegion * {display:none;}\n';
	s+= 'a[href*="http://profile.myspace.com/index.cfm?fuseaction=user.viewprofile&friendID=47458423"] {color:black;}\n';

//----------------------------------------------------------------
// All topics page
//----------------------------------------------------------------
if(location.href.match(/forum\.myspace\.com.*messageboard.viewCategory*/))
{
	s+= 'td p {position:relative; left:-40; width:125px; overflow:hidden;}\n';
	s+= 'td h2 {max-height:75px; width:200px; overflow:hidden;}\n';
	s+= 'a[href*="viewThread"]:before {content:"*";}\n';
	s+= 'span a:before {content:""!important;}\n';
}

//----------------------------------------------------------------
// View topic page
//----------------------------------------------------------------
if(location.href.match(/forum\.myspace\.com.*messageboard.viewThread*/))
{
	s+= 'td.author a[href*="viewprofile"]:first-child {display:block; max-width:125; overflow:hidden;} td.author a img {position:relative; top:-10px;}\n';
	s+= 'td.author a img {max-width:90px;}\n';
	s+= 'blockquote:first-child {max-height:300; overflow:auto;}\n';
	s+= 'div.aboutuser {width:125; overflow:hidden;}\n';
	s+= '#topreplybtn {position:relative; z-index:10;}\n';
	s+= 'div.sidetwo {position:fixed; z-index:100000;}\n';
	s+= 'table#pipsez {margin-left:30;}\n';
	s+= 'div.postbody * img, div.postbody img {max-width:500; max-height:500; position:static !important; margin-top:0 !important; margin-left:0 !important; top:0% !important; left:0% !important;}\n';
}

GM_addStyle (s);