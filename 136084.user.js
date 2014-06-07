// ==UserScript==
// @name       Hignlight Keyword
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @match      http://www.mitbbs.com/*
// @copyright  2012+, Messiah Luo
// ==/UserScript==

function findKeyword (mykeyword) {
    var reg = new RegExp(mykeyword,"i");
    var links = document.getElementsByTagName('a');
    for (var i = 0; i < links.length; i++) {
        var result = reg.exec(links[i].innerHTML);
        if(result === null) {
        } 
        else {
            //alert(links[i].innerHTML);
            links[i].style.backgroundColor="#33b5e5";
        }
    }
}

var keyWords = Array('Air','boa','AA','里程','worldpoin','BA','delta','ua','fia','spg','amex','ac','af','qantas');
var i = 0;
var keyword = "";
for (var i = 0; i < keyWords.length - 1 ;i++) {
	keyword = keyword + keyWords[i] + "|";
}
keyword = keyword + keyWords[i];
findKeyword(keyword);