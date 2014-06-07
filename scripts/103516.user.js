// ==UserScript==
// @name           Userscripts Secure Login
// @namespace      scripts.seabreeze.tk
// @version        0.0.5 alpha
// @history        0.0.5 Added @updateURL for Scriptish (https://addons.mozilla.org/firefox/addon/scriptish)
// @history        0.0.4 Added support for query strings following /login? and /login#
// @history        0.0.3 Bugfix: script now checks location.href instead of location. Works again.
// @description    Automatically log in via secure connection, so that others won't steal your password!
// @tags           USO,UserScripts,UserScripts.org
// @include        http://userscripts.org/login
// @include        http://userscripts.org/login?
// @include        http://userscripts.org/login?*
// @include        http://userscripts.org/login#
// @include        http://userscripts.org/login#*
// @include        http://userscripts.org./login
// @include        http://userscripts.org./login?
// @include        http://userscripts.org./login?*
// @include        http://userscripts.org./login#
// @include        http://userscripts.org./login#*
// @updateURL      https://userscripts.org/scripts/source/103516.meta.js
// ==/UserScript==
if(window.location.href.indexOf('http://userscripts.org./')===0){
	window.location.replace(window.location.href.replace('http://userscripts.org./','https://userscripts.org/'));
}else{
	window.location.replace(window.location.href.replace('http:','https:'));
}
/*
	IMPORTANT: this script is untested (5 minutes work). Feel free to report bugs at the discussion section.
*/