// ==UserScript==
// @name           MB. all cover arts get thickbox
// @version        2012-08-14_1212
// @description    Adds big picture popup link to non-CAA cover arts in release page sidebar (including Amazon, Encyclopédisque, cdbaby, Jamendo, other URL)
// @namespace      http://userscripts.org/scripts/show/140026
// @author         Tristan DANIEL (jesus2099)
// @contact        http://miaou.ions.fr
// @licence        GPL (http://www.gnu.org/copyleft/gpl.html)
// @include        http://*musicbrainz.org/release/*
// ==/UserScript==
function userjs140026injected() {
	if (typeof tb_init == "function" && (pic = document.querySelector("div#sidebar > div.cover-art > img"))) {
		var a = document.createElement("a");
		var src = pic.getAttribute("src");
		var href = src;
		/*expand potential ASIN thumbnails (cf. Oliver in MBS-5085)
		//TOTO find such ASIN thumbnailed release
		//TOTO find "has cover pic at" release to test non-CAA non-ASIN releases*/
		if (src.indexOf("amazon.")>0) { href = src.replace(/(\._[^/.]+_)\.([a-z]{3})$/, ".$2"); }
		else if (src.indexOf("encyclopedisque.fr")>0) { href = src.replace(/\/thumb[0-9]+\//, "/main/"); }
		else if (src.indexOf("cdbaby.name")>0) { href = src.replace(/\/([^/]+)\.([a-z]{3})$/, "/$1_large.$2"); }
		else if (src.indexOf("imgjam.com")>0) { href = src.replace(/\/([^/]+)\.[0-9]+\.([a-z]{3})$/, "/$1.0.$2"); }
		a.setAttribute("href", href);
		a.setAttribute("title", (href != src?"<a href="+src+"><del>"+src.match(/[^/]+$/)+"</del></a> \u2192 ":"")+"<a href="+href+"><ins>"+href.match(/[^/]+$/)+"</ins></a>");
		pic.parentNode.replaceChild(a.appendChild(pic.cloneNode(true)).parentNode, pic);
		tb_init(a);
	}
}
var userjs140026 = document.createElement("script");
userjs140026.appendChild(document.createTextNode("("+userjs140026injected+")();"));
document.getElementsByTagName("body")[0].appendChild(userjs140026);