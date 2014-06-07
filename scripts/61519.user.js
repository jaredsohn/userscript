// ==UserScript==
// @name           There is no facebook dislike button.
// @namespace      facebook
// @description    Nor will there ever be.
// @include        http://*.facebook.com/*
// ==/UserScript==

var likes = document.getElementsByClassName("like_component_not_exists");
for(var i = 0; i < likes.length; i++){
unsafeWindow.document.hdlb = function(x) {
	var d = document.getElementById("dlb_" + x);
	d.parentNode.removeChild(d);
}
var s = likes[i].parentNode.parentNode.innerHTML;
s = s.replace('title="Click here to like this item">Like</a>', 'title="Click here to like this item">Like</a> · <a id="dlb_' + i.toString() + '" name="dlb_' + i.toString() + '" href="#" onclick="if(document.dlc>=2){document.hdlb(' + i.toString() + ');return false;}document.dlc=isNaN(document.dlc)?0:document.dlc+1;alert(document.dlc == 0 ? \'Stop it!\' : (document.dlc == 1 ? \'Yeah, because doing it again changes everything.\' : \'We get it.\'));return false;" title="Click here to dislike this item">Dislike</a>');
likes[i].parentNode.parentNode.innerHTML = s;
}