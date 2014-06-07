// ==UserScript==
// @name           gmail_tw_icon_off
// @namespace      gmail_tw_icon_off
// @include        https://mail.google.com/mail/*
// ==/UserScript==

(function (){

	var useComment = true

	var w = window, d = document;
	if (typeof unsafeWindow != "undefined") { w = unsafeWindow }
	function debug(arguments) { try{ w.console.log(arguments)   } catch(e) {} }
	function error(arguments) { try{ w.console.error(arguments) } catch(e) {} }

	w.addEventListener("load", function(e) {
    var nStyle = d.createElement('style');
    nStyle.type = 'text/css';
    var cssText = d.createTextNode('.tweets .thumbnail, .profile_thumb { display: none }');
    nStyle.appendChild(cssText);
    d.getElementsByTagName('head').item(0).appendChild(nStyle);
	}, true);

})()