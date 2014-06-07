// ==UserScript==
// @name           sueddeutsche.de Plus
// @namespace      http://www.sebastian-lang.net/
// @description    Centered content and some beautifications
//
// @include        http://sueddeutsche.de/*
// @include        http://*.sueddeutsche.de/*
// @include        https://sueddeutsche.de/*
// @include        https://*.sueddeutsche.de/*
//
// @author         Sebastian-Lang.net
// @copyright      Creative Commons Attribution-ShareAlike 3.0 Unported (CC-BY-SA 3.0)
// @license        http://creativecommons.org/licenses/by-sa/3.0/
// @version        0.1.0
// @lastupdated    2010-10-09
// 
// @history        0.1.0 Initial release
//
// ==/UserScript==

//Add CSS
GM_addStyle(<style><![CDATA[

body { 
	background-color:#444!important;
}
#sueddeutsche{  
	margin:0 auto;
}

]]></style>);
