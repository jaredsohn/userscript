// ==UserScript==
// @name           g2loq
// @namespace      http://camptocamp.org/forums/*
// @description    ne plus afficher les messages des gens qu'on a pas envie de lire...
// @include        http://www.camptocamp.org/forums/*
// ==/UserScript==
var tmp = document.getElementsByClassName("blockpost"); 
var Exp = new RegExp("J2LH|antoineb2|Belle et mince"); // ajouter ici les pseudos séparés par des | 
var toDelete= new Array();

for (var i = 0; i < tmp.length; i++) {
    var aname=tmp[i].childNodes;
    for (var j = 0; j < aname.length; j++) {
	if (aname[j].className == "box"){
	    var bbox = aname[j].childNodes;
	    for (var k = 0; k < bbox.length; k++) {
         	if (bbox[k].className == "inbox"){
		    var inbox = bbox[k].childNodes;
		    for (var l = 0; l < inbox.length; l++) {
			if (inbox[l].className == "postleft"){
			    var txt = inbox[l].innerHTML;
			    if (Exp.test(txt)) {
				toDelete.push(tmp[i]);
			    }
			}
		    }
		}
	    }
	} 
    }
}
for (var i = 0; i < toDelete.length; i++){
    var nn = toDelete[i];
    nn.parentNode.removeChild(nn);
}
