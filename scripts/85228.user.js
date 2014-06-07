// ==UserScript==
// @name           kinobaza.tv
// @namespace      kinobaza.tv.extender
// @description    kinobaza.tv extender
// @include        *kinobaza.tv/top-*
// ==/UserScript==


function clearByClass(d){
	for(var a=0;a<d.length;a++) {
		var e=d[a];
		e.parentNode.parentNode.parentNode.setAttribute("style", "display:none");
	}
}

function clearByQ(d){
	for(var a=0;a<d.length;a++) {
		var e=d[a];
		var q5=e.parentNode.getElementsByClassName("quality  five")[0];
		var qhd=e.parentNode.getElementsByClassName("quality  hd")[0];
	
		if (!q5 && !qhd) e.parentNode.parentNode.setAttribute("style", "display:none");

}

}

clearByClass(document.getElementsByClassName("watched on"));
clearByClass(document.getElementsByClassName("delete-film on"));

clearByQ(document.getElementsByClassName("quality  three"));
clearByQ(document.getElementsByClassName("quality  unknown"));


