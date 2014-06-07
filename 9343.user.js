// ==UserScript==
//@name           eTeamz De-uglifier
//@namespace      http://www.flawlesswalrus.com
//@description    Makes eTeamz less ugly
//@include        http://eteamz.active.com*
// ==/UserScript==

function addGlobalStyle(css) {
	var head;
	var style;
    head = document.getElementsByTagName('head')[0];
    if(!head){
		return;
	}
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle(
'font {font-size: 11px;font-family:Verdana;}'+
'//td {background-color:#FFFFFF;border:1px solid black;color:black;}'+
'//td {padding:2px;margin:2px;}'+
'a {color:blue;text-decoration:none;}'
);

// JavaScript Document