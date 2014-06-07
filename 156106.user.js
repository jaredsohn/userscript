// ==UserScript==
// @name         binsearch.info NZB highlighter
// @namespace    http://bronosky.com/
// @version      0.1
// @description  highlights NZBs that are in the 300-799MB range by teevee@4u.tv
// @match        http://binsearch.info/*
// @copyright    2012+, Richard Bronosky
// ==/UserScript==


var size;
var re=/[^0-9][3-7][0-9]{2}(\.[0-9]{2})?( |&nbsp;)MB/;
var spans = document.getElementsByTagName('span');
for (var i=0; i<spans.length; i++){
    size = spans[i].innerHTML.match(re);
    if (size){
        spans[i].innerHTML = spans[i].innerHTML.replace(size[0], "<strong style='color:#f00; background-color:#ffc'>"+size[0]+"</strong>");
    }
}

var links = document.getElementsByTagName('a');
for (var i=0; i<links.length; i++ ){
    if (links[i].href.indexOf('teevee%404u.tv') > -1){
        links[i].style.color = "#f00";
        links[i].style.backgroundColor = "#ffc";
        links[i].style.fontWeight = "bold";
    }
}
