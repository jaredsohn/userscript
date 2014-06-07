// ==UserScript==
// @name 				ReadablePirate4x4Forums
// @namespace 	helloChameleon.com
// @description	Recolors the Pirate4x4 Forums for better readability. Very much a work in progress.
// @include 		http://*pirate4x4.com/forum*
// @include 		http://www.pirate4x4.com/forum*
// @version     0.9
// ==/UserScript==

var badStyle = document.getElementById('vbulletin_css'),
		betterStyle = document.createElement('style'),
		headerTable = document.getElementsByTagName('center')[0].getElementsByTagName('table')[0],
		noScriptStyles = document.getElementsByClassName('psa_add_styles')[0],
		centerDiv;

headerTable.parentNode.removeChild(headerTable);
noScriptStyles.parentNode.removeChild(noScriptStyles);
/*
centerDiv = document.getElementsByTagName('center')[0].getElementsByTagName('table')[0]
centerDiv.firstChild.style.background='none!important';*/

badStyle.innerHTML = '';
betterStyle.innerHTML='body{ background: #e3e5c5 none repeat scroll 0 0!important; color: #333!important; }';
betterStyle.innerHTML+='a {color:#000!important; text-decoration:none;}';
betterStyle.innerHTML+='.thead, .vbmenu_control { background: none repeat scroll 0 0 #D6D1A5 !important; border: 0 solid; color: #000000 !important; font-size: 0.84em; padding: 6px; text-transform: uppercase;}'
betterStyle.innerHTML+='.page{background: rgba(0,0,0,0) none repeat scroll 0 0!important;}';
betterStyle.innerHTML+='.alt2,.alt2Active{background: none repeat scroll 0 0 #B6B28D !important; color: #3E3A19 !important;}';
betterStyle.innerHTML+='.panel{background: #ddd none repeat scroll 0 0!important; border: 2px outset!important; color: #f5f5f5!important; padding: 10px!important;}';
betterStyle.innerHTML+='a:visited, body_avisited{color: #333!important; text-decoration: none!important;}';
betterStyle.innerHTML+='a:hover{border-bottom:1px dotted;}';
betterStyle.innerHTML+='.tcat{background-color:#bbb36b !important;}';
betterStyle.innerHTML+='.tborder td { border-bottom: 1px solid #f9f9f9; border-spacing: 1px; }';
betterStyle.innerHTML+='.tborder { border-spacing: 0; }';
betterStyle.innerHTML+='center > table {background: none repeat scroll 0 0 #4C431F!important; margin-top:-9px;}';
betterStyle.innerHTML+='center table table td a:hover {border:none!important;}';
betterStyle.innerHTML+='.smallfont{;}';
// Hide ads
betterStyle.innerHTML+='iframe {display:none!important;}';
document.body.appendChild(betterStyle);
