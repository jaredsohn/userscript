// ==UserScript==
// @name           MusicBrainz: re-lookup Disc ID
// @description    This adds a link next to the CD TOC on a disc ID’s page, so you can add the disc ID to another release. (NGS+Test+Classic)
// @version        2011-12-09_1447
// @author         Tristan DANIEL (jesus2099) the above description was stolen to stars
// @contact        http://miaou.ions.fr
// @licence        GPL (http://www.gnu.org/copyleft/gpl.html)
// @namespace      http://userscripts.org/scripts/show/104480
// @include        http://*musicbrainz.org/cdtoc/*
// @include        http://classic.musicbrainz.org/show/cdtoc/*
// @exclude        http://*musicbrainz.org/cdtoc/attach*
// ==/UserScript==

(function () {
var relookup = "re-lookup";
if (!self.location.href.match(/\/classic\./i)) {
	var dapage = document.getElementById("page");
	var cdtocdisp = dapage.getElementsByTagName("td")[0];
	var cdtoctab = dapage.getElementsByTagName("table")[1];
	var cdtoctrs = cdtoctab.getElementsByTagName("tr");
	var DATOC = cdtoctrs[2].getElementsByTagName("td")[0].firstChild.nodeValue+"%20"+cdtoctrs[cdtoctrs.length-1].getElementsByTagName("td")[0].firstChild.nodeValue+"%20"+cdtoctrs[cdtoctrs.length-1].getElementsByTagName("td")[6].firstChild.nodeValue;/*this should be 1%20totaltracks%20lastsector*/
	for (var i=2; i < cdtoctrs.length; i++) {
		DATOC += "%20"+cdtoctrs[i].getElementsByTagName("td")[2].firstChild.nodeValue;
	}
	cdtocdisp.appendChild(document.createTextNode(" ("));
	cdtocdisp.appendChild(createA(relookup, "/cdtoc/attach?toc="+DATOC));
	cdtocdisp.appendChild(document.createTextNode(")"));
} else { /* classic from nikki http://userscripts.org/scripts/show/68755 */
	var e = document.getElementsByClassName("formstyle")[0].getElementsByTagName("td")[1];
	e.appendChild(document.createTextNode(" ("));
	e.appendChild(createA(relookup, "/bare/cdlookup.html?toc="+e.firstChild.nodeValue));
	e.appendChild(document.createTextNode(")"));
}
function createA(text, link) {
	var a = document.createElement("a");
	if (link) { a.setAttribute("href", link); }
	else { a.style.cursor = "pointer"; }
	a.appendChild(document.createTextNode(text));
	return a;
}
})();