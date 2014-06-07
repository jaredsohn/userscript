// ==UserScript==
// @name           Pro404
// @namespace      Pro404
// @description   404 Beautyfier , Powered By ATI
// @include        *
// ==/UserScript==

var title = document.getElementsByTagName('title');
var body = document.getElementsByTagName('body');
	if (body[0].innerHTML.indexOf('was not found on this server') > 0 && title[0].innerHTML == '404 Not Found') {
	body[0].innerHTML='<h1><font color="#ff0000">Not Found</font></h1><img src="http://www.tunitech.net/forum/wcf/images/smilies/00001439.gif"></img><p>The requested URL ' + location.href.substring(location.href.indexOf("")+7) + ' was not found on this server. </p><P align="right"><STRONG><FONT face="Courier New" size="2" color=#006600>Powered By ATI </FONT></STRONG><IMG src="http://www.tunitech.net/forum/wcf/images/smilies/5774_256.gif"></img></P><hr></hr>';
}

