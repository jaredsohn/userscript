// ==UserScript==
// @name           userstyles hide websites
// @namespace      http://choggi.dyndns.org
// @include        http://userstyles.org/*
// @include        http://www.userstyles.org/*
// ==/UserScript==

//edit to suit your tastes (i = ignore case)
var hideThese = [/facebook/i,/tumblr/i,/orkut/i,/jappy/i];

//list all links in page
var linkList = document.getElementsByTagName("a");
//loop through the links
for (var i = 0; i < linkList.length; i++){
    var link = linkList[i].firstChild.textContent;
    //then check with the user list
    for (var j = 0; j < hideThese.length; j++){
        if (link.match(hideThese[j]) != null){
            //hide it
            linkList[i].parentNode.style.display = "none";
            //linkList[i].parentNode.setAttribute("class","spamSite");
        }
    }
}