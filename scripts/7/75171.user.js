// ==UserScript==
// @name           DSEditLinks
// @namespace      de.staemme.limone
// @version        1.0
// @author         LimonE
// @description    Korrigiert Links im DS internen Forum
// @include        http://*.*staemme.*/forum.php*
// @include        http://*.*staemme.*/game.php*
// ==/UserScript==

var url = location.href;

if (url.match('forum.php')) {
	var links = document.getElementsByTagName('a');
	var t = /t=(\d+)/.exec(url);
	var regex = new RegExp('villageid' + ((t) ? t[1] : '0') + '=(.*?)(?:;|$)','');
	var vid = regex.exec(document.cookie)[1];
	for (var i = 0; i < links.length; i++) {
		if (/info_*/.test(links[i].href)) {
			links[i].href = links[i].href + '&village=' + vid;
		}
  	}
} else {
	var vid = /village=(\d+)/.exec(url)[1];
	var t = /t=(\d+)/.exec(url);
	document.cookie ='villageid' + ((t) ? t[1] : '0') + '=' + vid + ';';
}