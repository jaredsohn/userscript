// ==UserScript==
// @name           Twitterrific iPhoto GoogleMaps Link
// @namespace      jk.twitter
// @description    Places a link to GoogleMaps
// @include        http://twitter.com/*
// @version		   1.0

// By Jens Kohl (jens.kohl+greasemonky AT gmail DOT com)
// ==/UserScript==

function trim (tmpString) {
  return tmpString.replace (/^\s+/, '').replace (/\s+$/, '');
}

var regexLocation = /iPhone:(.*)/;
var regexNickname = /(.*)$/;
var nickname;

for each (var entry in document.getElementsByTagName('span')) {
	if (entry.className == 'fn') {
		nickname = trim(entry.innerHTML);
	}
}


var ellist = document.getElementsByTagName("span");

for (var i = 0; i < ellist.length; i++) {
    if (ellist[i].className == "adr") {
		if (regexLocation.test(ellist[i].innerHTML)) {
			regexLocation.exec(ellist[i].innerHTML);
        	ellist[i].innerHTML = "<a href=\"http://maps.google.de/maps?f=q&hl=de&geocode=&q="+trim(RegExp.$1)+"+("+nickname+")&ie=UTF8&t=h&z=16&iwloc=addr\" target=\"_blank\">" + ellist[i].innerHTML + "</a>";
		}
    }
}
