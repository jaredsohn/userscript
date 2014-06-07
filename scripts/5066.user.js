// ==UserScript==
// @name          TSC Marker
// @namespace     http://userscripts.org/scripts/source/5066.user.js
// @description   Marks TSC posts by your favorite authors
// @include       http://techcomedy.com/*
// @include       http://www.techcomedy.com/*
// ==/UserScript==
// These are the posters you want marked
var posters=['RiffRaff', 'SwedishChef', 'CommanderData'];

var pst="("+posters.join("|")+")";
pst = new RegExp(pst, "gi");
var els = document.evaluate('//*', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var el,i=0;
var thisURL = document.URL;
postNum = thisURL.replace(/.+=/, "");
var visited_color = "#aa0000";
var unvisited_color = "#ff0000";
while (el=els.snapshotItem(i++)) {
	// Skip if not <a> tag
	if ('A'!=el.tagName) continue;

	for (var j=0; j<el.childNodes.length; j++) {
		if (pst.test(el.childNodes[j].textContent)) {
			// Change the style
			var targNum = el.href;
			targNum = targNum.replace(/^.+=/, "");
			if (getCookie(targNum)) {
				el.style.color = visited_color
			} else {
				el.style.color = unvisited_color;
			}
		}
	}
}
setCookie(postNum, 1, "", "/");


function setCookie(name, value, expires, path, domain, secure) {
  var curCookie = name + "=" + escape(value) +
      ((expires) ? "; expires=" + expires.toGMTString() : "") +
      ((path) ? "; path=" + path : "") +
      ((domain) ? "; domain=" + domain : "") +
      ((secure) ? "; secure" : "");
  document.cookie = curCookie;
}

function getCookie(name) {
  var dc = document.cookie;
  var prefix = name + "=";
  var begin = dc.indexOf("; " + prefix);
  if (begin == -1) {
    begin = dc.indexOf(prefix);
    if (begin != 0) return null;
  } else
    begin += 2;
  var end = document.cookie.indexOf(";", begin);
  if (end == -1)
    end = dc.length;
  return unescape(dc.substring(begin + prefix.length, end));
}