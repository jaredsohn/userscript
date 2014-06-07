// ==UserScript==
// @name           Google404
// @namespace      Google404
// @description   404 Beautyfier , Powered By ATI
// @include        *
// ==/UserScript==

var body = document.getElementsByTagName('body');
	if (body[0].innerHTML.indexOf('was not found on this server') > 0) {
	body[0].innerHTML='<h1>Not Found</h1><p>The requested URL ' + location.href.substring(location.href.indexOf("")+7).substring(0,location.href.substring(location.href.indexOf("")+7).lastIndexOf('/',0) + ' was not found on this server. ROxx</p><hr></hr>';
}