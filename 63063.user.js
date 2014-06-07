// ==UserScript==
// @name           decrapify computerworld 
// @namespace      http://userscripts.org/mbarkhau/ef-magazin
// @include        http://www.computerworld.com/*
// ==/UserScript==


var removeById = function(id) {
    var e = document.getElementById(id);
    e.parentNode.removeChild(e);
}

var removeByClass = function(className){
    var elems = document.getElementsByClassName(className);
    for (i in elems ){
        var elem = elems[i];
        elem.parentNode.removeChild(elem);
    }
}


removeById("leftColumn182");
removeById("addresources");
removeByClass("inset");
removeByClass("top_links");
removeByClass("right_col");
removeByClass("top-utility-space");
removeByClass("article_actions");

var e = document.getElementById("rightColumn782");
e.style.width = "100%";
e.style.float = "left";

e = document.getElementsByClassName("left_col")[0];
e.style.width = "100%";
