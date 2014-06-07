// ==UserScript==
// @name      HF WARNING LEVEL COLOUR CHANGE
// @namespace  M1N3RMΛN/WARNING_LEVEL_CHANGE
// @description  Script for Grouped to colour all leaders usernames.
// @include        http://www.hackforums.net/showthread.php?tid=*
// @include        http://hackforums.net/showthread.php?tid=*	
// @include        http://www.hackforums.net/member.php?action=profile&uid=*
// @include        http://hackforums.net/member.php?action=profile&uid=*
// @include        http://www.hackforums.net/usercp.php?action=options
// @include        http://hackforums.net/usercp.php?action=options
// ==/UserScript==

// HF WARNING LEVEL REMOVED COLOURS
// THIS USERSCRIPT WAS MADE BY M1N3RMΛN, DO NOT REMOVE ANY NAMES.

// ==VARIABLES==
var html = document.body.innerHTML;
// ==/VARIABLES==

// ==DO-NOT-REMOVE==
html = html.replace( /M1N3RMΛN/g, '<span style="text-shadow: 0px 2px 3px #000"><b>M1N3RMΛN</b></span>' );
// ==/DO-NOT-REMOVE==

html = html.replace( /10%/g, '<span style="color: #FFFFFF;"><b>10%</b></span>' );
html = html.replace( /20%/g, '<span style="color: #FFFFFF;"><b>20%</b></span>' );
html = html.replace( /30%/g, '<span style="color: #FFFFFF;"><b>30%</b></span>' );
html = html.replace( /40%/g, '<span style="color: #FFFFFF;"><b>40%</b></span>' );
html = html.replace( /50%/g, '<span style="color: #FFFFFF;"><b>50%</b></span>' );
html = html.replace( /60%/g, '<span style="color: #FFFFFF;"><b>60%</b></span>' );
html = html.replace( /70%/g, '<span style="color: #FFFFFF;"><b>70%</b></span>' );
html = html.replace( /80%/g, '<span style="color: #FFFFFF;"><b>80%</b></span>' );
html = html.replace( /90%/g, '<span style="color: #FFFFFF;"><b>90%</b></span>' );
html = html.replace( /10-%/g, '<span style="color: #FFFFFF;"><b>100%</b></span>' );


document.body.innerHTML = html;