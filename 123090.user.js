// ==UserScript==
// @name           MusicBrainz: Show IPI/ISWC links
// @version        2013-10-15_01
// @namespace      http://userscripts.org/users/378544
// @description    Show links to various copyright collection societies next to IPI/ISWC codes
// @include        http*://*musicbrainz.org/artist/*
// @include        http*://*musicbrainz.org/work/*
// @include        http*://localhost:*/artist/*
// @include        http*://localhost:*/work/*
// ==/UserScript==

// The original version (2012-01-17_01) is by me, this (greatly improved)
// version was contributed by jesus2099 (http://userscripts.org/users/jesus2099).

(function () {
	var searches = {
		"iswc": {
			"CISAC": {
				"href": "http://iswcnet.cisac.org/iswcnet/MWI/search.do?firstCriteria=iswcFirstCriteria&firstCriteriaType=E&firstCriteriaInput=%iswc%",
				"img": "http://iswcnet.cisac.org/iswcnet/favicon.ico",
			},
			"GEMA": {
				"href": "https://online.gema.de/werke/pageLink.do?searchText=%iswc%&searchKind=exact&searchOption=iswc&lan=en",
				"img": "http://www.gema.de/favicon.ico",
			},
			"SACEM": {
				"href": "http://www.sacem.fr/oeuvres/oeuvre/rechercheOeuvre.do?searchoption=exact&fwkLangue=en&q=%iswc%",
				"replace": ["[-.]", "", "g"],
				"img": "http://www.sacem.fr/favicon.ico",
			},
			"JASRAC": {
				"href": "http://www2.jasrac.or.jp/eJwid/main.jsp?trxID=A00401-3&IN_DEFAULT_WORKS_KOUHO_MAX=100&IN_DEFAULT_WORKS_KOUHO_SEQ=1&IN_ISWC=%iswc%&IN_DEFAULT_SEARCH_WORKS_NAIGAI=0&RESULT_CURRENT_PAGE=1",
				"replace": ["^T-", "T-+"],
				/* created with http://www.askapache.com/online-tools/base64-image-converter */
				"img": "data:;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAB3RJTUUH3AcbCzQhZwZ2MgAAAAlwSFlzAABOIAAATiABFn2Z3gAAAARnQU1BAACxjwv8YQUAAADzUExURf8A/+vr6+np6efn5+Xl5eHj4d/f393d3dvb29nZ2dfX19XV1dPT09HR0c/Pz+3t7fv7+/r6+vn5+fj4+Pf39/f19fb09PX19fT09PPz8/Ly8/Ly8u/v7/z8/Pj39/ehofZbW/VVVfSTk/Pv7/Hx8fmXl/g0NPcvL/YqKvUkJPR9ff39/fv8+/vn5/pISPk7Ovg1NfUqKvTV1f7+/vzS0vtGRvpAQPk7O/g2NvcwMPYrK/W7u/T19f3q6vxVVfpBQfk7PPc3N/ba2v2qqvxLS/tHR/pBQvk8PPiUk/b29v////27u/x+f/t5efqvr/39/uHj45GLT74AAAABdFJOUwBA5thmAAAAsUlEQVR42oWPxwKCMBAF14oiIiAaYog11tix967Y//9rDGcPzG3m8nYBfEEeGDPbTgWCofAX0P3uOM6HU6rpRtqMiiCcP56vt1DXlAB5fjydL9eb6SI35gW+3oy3u9n+gCwkA3Y4HY0n09l8sbTwKgGM03an2+vXG4MhJpYCjGqaXq3VG80WJgQrYFNdN/KFYqlcIYwRFVJiXgxmssjCOSKCd14kKsXickJJqqrq/9sfP0YUF15JsWMzAAAAAElFTkSuQmCC",
			},
		},
		"ipi": {
			"CISAC": {
				"href": "http://iswcnet.cisac.org/iswcnet/MWI/search.do?firstCriteria=ipNameNumberFirstCriteria&firstCriteriaType=E&firstCriteriaInput=%ipi%&rowsPerPage=100&timeOut=55",
				"img": "http://iswcnet.cisac.org/iswcnet/favicon.ico",
			},
		},
	};
	function createImageLink(name, href, src) {
		var a = document.createElement("a");
		a.setAttribute("href", href);
		var img = document.createElement("img");
		img.setAttribute("src", src);
		img.setAttribute("width", "12");
		img.setAttribute("height", "12");
		img.setAttribute("alt", name);
		img.setAttribute("title", name);
		a.appendChild(img);
		return a;
	}
	var spans = document.querySelectorAll("span[property='mo:iswc'], span[property='mo:ipi']");
	for (var i = 0; i < spans.length; i++) {
		if ((type = spans[i].getAttribute("property").match(/^mo:([a-z]+)$/)) && (type = type[1]) && (id = spans[i].textContent)) {
			for (is in searches[type]) {
				if (searches[type].hasOwnProperty(is)) {
					var q = id;
					if (searches[type][is].replace) {
						q = q.replace(new RegExp(searches[type][is].replace[0], searches[type][is].replace[2]), searches[type][is].replace[1])
					}
					var par = spans[i].parentNode;
					if (par.tagName.toLowerCase() == "a") { par = par.parentNode; }
					par.appendChild(document.createTextNode(" "));
					par.appendChild(createImageLink(is, searches[type][is].href.replace(new RegExp("%"+type+"%"), q), searches[type][is].img));
				}
			}
		}
	}
})();
