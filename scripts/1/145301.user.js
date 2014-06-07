// ==UserScript==
// @id             39
// @name           tabun-spoilers
// @version        1.5
// @author         Zayka
// @include        http://tabun.everypony.ru/*
// @include        https://tabun.everypony.ru/*
// @include        http://www.tabun.everypony.ru/*
// @include        https://www.tabun.everypony.ru/*
// @include        http://forum.everypony.ru/*
// @updateURL	   http://userscripts.org/scripts/source/145301.user.js
// @run-at         document-end
// ==/UserScript==
//console.log(document);
if (document.domain=="forum.everypony.ru"){
	document.styleSheets[1].insertRule('.spoiler {background-color: #CCC;color: #000;}',document.styleSheets[1].cssRules.length);
	dcument.styleSheets[1].insertRule('.spoiler a.postlink, .spoiler a.postlink:visited {color: #368AD2;}',document.styleSheets[1].cssRules.length);
}
else { 
	document.styleSheets[0].insertRule('.spoiler-gray {background-color: #CCC;color: #000;}',document.styleSheets[0].cssRules.length);
	document.styleSheets[0].insertRule('.spoiler-gray a {color: #09F;}',document.styleSheets[0].cssRules.length);
}