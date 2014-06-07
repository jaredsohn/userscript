// ==UserScript==
// @name          draugiem.lv - No Say
// @description   Removes say box
// @include       http://www.draugiem.lv/*
// @include       http://draugiem.lv/*
// ==/UserScript==

var node = document.getElementById("say");
if (node != null){
    node.parentNode.removeChild(node);
};

var tmp = document.getElementsByTagName("div");
for (var i=0,j=tmp.length; i<j; i++){
	if (tmp[i].className == "say bx"){
		tmp[i].parentNode.removeChild(tmp[i]);
	}
}