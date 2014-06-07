// ==UserScript==
// @name           Blognone No Apple
// @namespace      blognone-no-apple
// @include        http://*blognone.com/*
// ==/UserScript==

function getElementsByClassName(classname, node)  {
    if(!node) node = document.getElementsByTagName("body")[0];
    var a = [];
    var re = new RegExp('\\b' + classname + '\\b');
    var els = node.getElementsByTagName("*");
    for(var i=0,j=els.length; i<j; i++)
        if(re.test(els[i].className))a.push(els[i]);
    return a;
}

var content = document.getElementById("content");
var appleTags = document.getElementsByClassName("taxonomy_term_17",content);

for(var i=0,j=appleTags.length; i<j; i++) {
	var appleTag = appleTags[i];
	var appleNode = appleTag.parentNode.parentNode.parentNode;

	appleNode.style.display = "none";	
}


