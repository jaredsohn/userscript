// ==UserScript==
// @name        last.fm links to local lastfm
// @version     2011-05-23_1632
// @description Replaces any lastfm link by the desired language "www.lastfm.xx"/last.fm link
// @author      jesus2099
// @contact     http://miaou.ions.fr
// @licence     GPL (http://www.gnu.org/copyleft/gpl.html)

// @exclude     http://www.last.fm/*
// @exclude     http://cn.last.fm/*
// @exclude     http://www.lastfm.*
// ==/UserScript==

(function () {
/* Put your desired local lastfm URL prefix in j2lfl setting below. 
Ex.: "http://www.lastfm.fr", "http://cn.last.fm" or "http://www.last.fm". 
You can also put "http://last.fm" ifor minimalistic auto-lang-switcher links. */

var j2lfl = "http://last.fm"; 

/* possible values, as of 16:46 23/05/2011
en http://www.last.fm
de http://www.lastfm.de
fr http://www.lastfm.fr
it http://www.lastfm.it
ja http://www.lastfm.jp
pl http://www.lastfm.pl
pt http://www.lastfm.com.br
ru http://www.lastfm.ru
sv http://www.lastfm.se
tr http://www.lastfm.com.tr
cn http://cn.last.fm
*/

var as = document.getElementsByTagName("a");
for (var i=0; i < as.length; i++) {
	var href = as[i].getAttribute("href");
	if (href && href.match(/http:\/\/((cn|www)\.)?last(fm)?\.[^/]{2,6}(\/|$)/i)) {
		as[i].setAttribute("href", href.replace(/http:\/\/[^/]+(\/|$)/i, j2lfl+"/"));
		if (typeof opera != "undefined") opera.postError("29156: "+href+" \u2192 "+as[i].getAttribute("href"));
	}
}

})();