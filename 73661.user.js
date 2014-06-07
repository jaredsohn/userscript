// ==UserScript==
// @name           PageWordCount
// @namespace      FFYa
// @description    Counts words in all visible posts.
// @include        http://forum.ffya.org/*
// ==/UserScript==

var TC = document.createElement("TotalWordCount");
TC.innerHTML = " <FONT COLOR='RED'>(Words: " + getPageWordCount() + ")</FONT>";
var ThreadTitle = document.getElementById("pageheader");
if (ThreadTitle != null) ThreadTitle.appendChild(TC);

var allHTMLTags = document.getElementsByTagName("*");
for (i=0; i<allHTMLTags.length; i++){
    if (allHTMLTags[i].className=="titles") {
        allHTMLTags[i].appendChild(TC);
        i = allHTMLTags.length;
    }
}

function getPageWordCount() {
    var wordcount = 0;
    var allHTMLTags = document.getElementsByTagName("*");

    for (i=0; i<allHTMLTags.length; i++) {
       if (allHTMLTags[i].className=="postbody") {
           var words = get_text(allHTMLTags[i]);
           var count = words.split(' ').length
        wordcount += count;
        var elem = document.createElement("wordCount"+i);
           elem.innerHTML = " <FONT COLOR='RED'>(Words: " + count + ")</FONT>";
        allHTMLTags[i].appendChild(elem);
       }
    }
    return wordcount;
}

function get_text(el) {
    if(el == null) return 0;
    ret = "";
    var length = el.childNodes.length;
    for(var i = 0; i < length; i++) {
        var node = el.childNodes[i];
        if(node.nodeType != 8) {
            ret += node.nodeType != 1 ? node.nodeValue : get_text(node);
        }
    }
    return ret;
}