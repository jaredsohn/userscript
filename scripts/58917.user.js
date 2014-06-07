// ==UserScript==
// @name           DrudgeReport.com Makeover v0.41
// @namespace      http://www.geeknik.com/
// @description    This script cleans up DrudgeReport.com, makes it easier on the eyes, changes font to Segoe UI and removes crap from top of page. :)
// @include        http*://*drudgereport.com/*
// ==/UserScript==
// 	Version History:
// 	0.1 -   initial release.
// 	0.2 -   removed the column seperators, removed update code, increased font size to 16pt, cleaned up code.
// 	0.3 - 	more code clean up.
//  0.4 -   changed the font from 16pt Calibri to 14pt Segoe UI with fallback to Tahoma, etc. Minor Tweaks
//  0.41 -  cleaned up the source code.
function addGlobalStyle(css) {var head, style; head = document.getElementsByTagName('head')[0]; if (!head) { return; } style = document.createElement('style'); style.type = 'text/css'; style.innerHTML = css; head.appendChild(style);}
/* Centers the top story headline */
addGlobalStyle( '#drudgeTopHeadlines {text-align:center}');
/* Changes the tag styles */
addGlobalStyle( 'a {font-family:Segoe UI, Tahoma, Verdana;font-size:14pt;font-weight:normal }' + 'a:link {text-decoration: none; border-bottom:0px;}' + 'a:visited {text-decoration: none; border-bottom:0px;}' + 'a:hover {text-decoration: none; border-bottom:0px;}' + 'td {background-color:#EEEEEE;width:33%;padding:10px;border:1px solid #555555;}' + 'table {border-spacing: 10px;}' + 'table.agTable {display:none;}' + 'table * img {display:block; margin:auto;margin-bottom:-1.5em;width:100%;max-width:300px;max-height:500px;}');
/* Changes the readability of the story links */
var members = document.getElementsByTagName('img');
if (members.length > 0){ for(var i=0; i< members.length; i++){ if(members[i].src.indexOf('gray.gif') > 0){ members[i].parentNode.removeChild(members[i]);	}	}	}
/* Added code to remove the column seperators */
var members = document.getElementsByTagName('td');
if (members.length > 0){ for(var i=0; i< members.length; i++){ if(members[i].width == 3){ members[i].parentNode.removeChild(members[i]);}	}	}
/* Removes the ad stuff at the top center of the page */
(function() { var widget = document.getElementsByTagName( 'center' ); var num = widget.length; widget[0].parentNode.removeChild( widget[0] );})();
/* More to come later! Let me know if you want anything else added/changed*/