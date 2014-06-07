// ==UserScript==
// @name           GMX goto Posteingang
// @namespace      http://www.gmx.net
// @description    Nach dem GMX Login wird man direkt in seinen Posteingang weitergeleitet.
// @include        http://service.gmx.net/de/cgi/g.fcgi/startpage?site=*
// @version        1.1
// @copyright      Sascha Üreten aka suzhi
// ==/UserScript==

function goToPosteingang() {		
		var href = new String(window.location);
		var count1 = href.search('CUSTOMERNO=') + 11;
		var count2 = href.search('&lALIAS');
		href = href.slice(count1,count2);
		window.location.href = "http://service.gmx.net/de/cgi/g.fcgi/mail/index?CUSTOMERNO=" + href + "&FOLDER=inbox";
}

goToPosteingang();