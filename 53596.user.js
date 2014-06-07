// ==UserScript==
// @name           NZ self link
// @namespace      NZ
// @author           MJ
// @description    Makes your province name at the top into a link, removes stupid NZ profiles links
// @include        http://www.nukezone.nu/*
// @include        http://www.nukezone.se/*
// @exclude    http://www.nukezone.nu/forum/*
// @exclude    http://www.nukezone.se/forum/*
// ==/UserScript==
function nextNode(node){
	var next = node.nextSibling;
	while(next.nodeType != 1 && next.nextSibling) next = next.nextSibling;
	if(next.nodeType != 1) next = null;
	return next;
}
var spans = document.getElementsByTagName("span");
for (var i = 0; i < spans.length; ++i) {
	var span = spans[i];
	if(span.className == "BigText") {
		var pname = span.innerHTML;
		var id = pname.slice(pname.search(/#/) + 1, pname.search(/\)/));
		span.innerHTML = '<a href="/show.asp?Action=Players&X=' + id + '">' + pname + '</a>';
		break;
	}
}
if(window.location.toString().search(/show.asp\?Action=Players&X=/) != -1){
	for(var i = 0, a, anchors = document.getElementsByTagName('a'); a = anchors[i]; i++) if (a.href.search(/http:\/\/profiles\.nukezone\.info\//)!=-1) {
		a.parentNode.parentNode.removeChild(nextNode(a.parentNode));
		a.parentNode.parentNode.removeChild(nextNode(a.parentNode));
		a.parentNode.parentNode.removeChild(a.parentNode);
		break;
	}
}