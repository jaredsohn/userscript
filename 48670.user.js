// ==UserScript==
// @name highlight_text
// @namespace hattrick.org
// @description    highlights text
// @include        http://*.hattrick.org/*
// ==/UserScript==

var i = 0;
var re_hl = /(text|text2|etc|foo|bar)/gi;
var usercolor = "deeppink";
function getElementsByClass(searchClass,node,tag) {
	try {
        var classElements = new Array();
        if ( node == null )
            node = document;
        if ( tag == null )
            tag = '*';
        var els = node.getElementsByTagName(tag);
        var elsLen = els.length;
        var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
        for (i = 0, j = 0; i < elsLen; i++) {
            if ( pattern.test(els[i].className) ) {
                classElements[j] = els[i];
                j++;
            }
        }
        return classElements;
    }
    catch(e) {
        alert(e);
    }
}  

try {
    var divs  = getElementsByClass("message", document );
    for (i=0; i < divs.length; i++) {
        divs[i].innerHTML = divs[i].innerHTML.replace(re_hl, "<font color="+ usercolor + "><b>$1</b></font>");
    }
}
catch (ee) {alert(ee);};

try {
    var divs  = getElementsByClass("signature-trunc", document );
    for (i=0; i < divs.length; i++) {
        divs[i].innerHTML = divs[i].innerHTML.replace(re_hl, "<font color="+ usercolor + "><b>$1</b></font>");
    }
}
catch (ee) {alert(ee);};

try {
    var divs  = getElementsByClass("signature", document );
    for (i=0; i < divs.length; i++) {
        divs[i].innerHTML = divs[i].innerHTML.replace(re_hl, "<font color="+ usercolor + "><b>$1</b></font>");
    }
}
catch (ee) {alert(ee);};