// ==UserScript==
// @name           FC_Style
// @namespace      Styles
// @include        http://www.fakeclub.com/forum/*
// ==/UserScript==

/*
*  -Author: X-Odox
*  -Version: 1.1
*/


window.addEventListener('load', init, true);

function init() {

	var new_style = document.createElement("<style>");
	new_style.innerHTML = "body,table { background-color: #000000; font: 12px verdana,arial,helvetica; color: #D8D8D8; }"+
".bline { background-color: #000000; border: 2px #ffffff solid; }"+
"a:link,a:visited { text-decoration: none; color: #003366; }"+
"a:hover { text-decoration: underline; color: #000000; }"+
"input	{ border-top-width: 1px; border-left-width: 1px; border-bottom-width: 1px; border-right-width: 1px; font: 12px verdana,arial,helvetica; }"+
"textarea{ border-top-width: 1px; border-left-width: 1px; border-bottom-width: 1px; border-right-width: 1px; font: 12px verdana,arial,helvetica; }"+
"select	{ border-top-width: 1px; border-left-width: 1px; border-bottom-width: 1px; border-right-width: 1px; font: 12px verdana,arial,helvetica; }"+

".thead { font: 16px verdana,arial,helvetica; color: #ffffff; font-weight: bold; letter-spacing: 1px; }"+
"a.thead { text-decoration: none; color: #ffffff; }"+
"a.thead:link,a.thead:visited { color: #ffffff; }"+
".tmenu { font: 12px verdana,arial,helvetica; color: #ffffff; line-height: 140%; }"+
"a.tmenu { text-decoration: none; color: #ffffff; }"+
"a.tmenu:link,a.tmenu:visited { color: #ffffff; }"+
"a.tmenu:hover { text-decoration: underline; }"+

".forum { background-color: #242483; font-family: verdana,arial,helvetica; font-size: 12px; color: #ffffff; padding-left: 5px; padding-right: 5px; line-height: 150%; }"+
".forumhead { background-color: #0B0B61; font-family: verdana,arial,helvetica; font-size: 9px; color: #ffffff; text-align: center; font-weight: bold; }"+
"a.forum { text-decoration: none; color: #ffffff; }"+
"a.forum:link,a.forum:visited { text-decoration: none; color: #ffffff; }"+
"a.forum:hover { text-decoration: underline; }"+
"a.forummore { background-color: #000000; font-size: 9px; color: #ffffff; text-align: center; text-decoration: none; font-weight: bold; }"+
"a.forummore:link,a.forummore:visited { color: #ffffff; }"+

".topic { background-color: #000000; font: 12px verdana,arial,helvetica; color: #ffffff; padding-left: 4px; padding-right: 3px; }"+
"a.topic { text-decoration: none; color: #ffffff; }"+
"a.topic:visited { text-decoration: none; color: #ffffff; }"+
"a.topic:hover { text-decoration: underline; color: #ffffff; }"+
".topicrow2 { font: 9px verdana,arial,helvetica; color: #ffffff; text-align: center; line-height: 9px; white-space: nowrap; }"+
"a.topicrow2 { text-decoration: none; color: #ffffff; }"+
"a.topicrow2:link,a.topicrow2:visited { color: #ffffff; }"+
"a.topicrow2:hover { text-decoration: underline; }"+
".topichead { font-family: verdana,arial,helvetica; font-size: 12px; color: #ffffff; }"+
"a.topichead { text-decoration: none; color: #ffffff; }"+
"a.topichead:link,a.topichead:visited { color: #ffffff; }"+
".topicspace { background-color: #ffffff; height: 2px; border: 0px solid #ffffff; }"+
".topicpost { line-height: 17px; }"+
".topicname { font-size: 12px; color: #ffffff; font-weight: bold;}"+
".topicgroup { font-size: 9px; color: #ffffff; }"+
".topicavatar { margin-top: 6px; margin-bottom: 0px; }"+
".topicdate { font-size: 9px; color: #ffffff; }"+
".topicmenu { font-size: 9px; color: #ffffff; }"+
"a.topicmenu { text-decoration: none; color: #ffffff; }"+
"a.topicmenu:link,a.topicmenu:visited { color: #ffffff; }"+

".td1 { background-color: #0B0B61; font: 12px verdana,arial,helvetica; color: #ffffff; font-weight: bold; text-align: center; line-height: 150%; }"+
".td2 { background-color: #000000; font: 12px verdana,arial,helvetica; color: #ffffff; }"+
".td3 { background-color: #000000; }"
".tderr { color: #ffffff; border-top-color: #c00000; border-left-color: #c00000; border-right-color: #c00000; border-bottom-color: #c00000; border-style: dashed; border-width: 1px; }"+

".font1 { font-family: verdana,arial,helvetica; font-size: 9px; color: #50585c; vertical-align: top; }"+
".btime { font-family: verdana,arial,helvetica; font-size: 9px; color: #b0b8bc; }"+
".bage { font-family: verdana,arial,helvetica; font-size: 9px; color: #e07070; font-weight: bold; }"+
".bver { font-family: verdana,arial,helvetica; font-size: 9px; color: #b0b8bc; }"+

".bar1 { background-color: #0B0B61; border-bottom-color: #ffffff; border-left-color: #ffffff; border-right-color: #ffffff; border-style: solid; border-top-color: #ffffff; border-width: 1px; color: #ffffff; cursor: hand; font-family: verdana,arial,helvetica; font-weight: bold; font-size: 12px; text-align: center; padding: 3px; }"+
"a.bar2:link,a.bar2:visited { background-color: #0B0B61; text-decoration: none; color: #ffffff; }"+

".but1 { background-color: #0B0B61; border: 1px solid #ffffff; color: #ffffff; font-weight: bold; font-size: 12px; text-align: center; padding-bottom: 1px; padding-left: 5px; padding-right: 5px; padding-top: 2px; }"+

".code { background-color: #f6f6ff; font: 12px courier,'courier new'; color: #006600; border-width: 1px; border: 1px solid #b0b0c0; padding-left: 5px; padding-right: 5px; }"+
".quote { color: #304080; }";


	document.getElementsByTagName("head")[0].appendChild(new_style);
	//document.getElementsByTagName("link")[0].href = "";
}






