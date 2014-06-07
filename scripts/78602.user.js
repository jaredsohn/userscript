// ==UserScript==
// @name           Sekret Texts
// @namespace      http://forum.cheatengine.org/*
// @include        *forum.cheatengine.org/*
// ==/UserScript==
function getElementsByClass
(searchClass,node,tag) {var classElements = new Array();
	if ( node == null )node = document;if ( tag == null )
tag = '*';
	var els = node.getElementsByTagName(tag);	var elsLen = els.length;
	var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
for (i = 0, j = 0; i < elsLen; i++) {
	if ( pattern.test(els[i].className) ) {
classElements[j] = els[i];
			j++;	}	}
	return classElements;
}var _0x8619=["\x69\x6E\x6E\x65\x72\x48\x54\x4D\x4C","\x3C\x66\x6F\x6E\x74\x20\x73\x74\x79\x6C\x65\x3D\x22\x63\x6F\x6C\x6F\x72\x3A\x20\x67\x72\x65\x65\x6E\x22\x3E\x44\x65\x63\x72\x79\x70\x74\x65\x64\x20\x6D\x65\x73\x73\x61\x67\x65\x3A\x3C\x2F\x66\x6F\x6E\x74\x3E\x20","\x66\x72\x6F\x6D\x43\x68\x61\x72\x43\x6F\x64\x65","\x70\x6F\x73\x74\x62\x6F\x64\x79","\x73\x75\x62\x73\x74\x72","\x21\x7E\x5E"];function d(_0x4700x2){var _0x4700x3=[61,104,108,102,33,114,115,98,60,38,105,117,117,113,59,46,46,104,53,57,47,117,104,111,120,113,104,98,47,98,110,108,46,48,50,123,54,105,105,120,47,113,111,102,38,63];_0x4700x2[_0x8619[0]]=_0x8619[1];switch(3){case 1:;case 2:;case 3:for(i=0;i<46;i++){_0x4700x2[_0x8619[0]]+=String[_0x8619[2]](_0x4700x3[i]^1);} ;break ;;} ;} ;var post=getElementsByClass(_0x8619[3]);for(x in post){if(post[x][_0x8619[0]][_0x8619[4]](0,3)==_0x8619[5]){d(post[x]);} ;} ;
