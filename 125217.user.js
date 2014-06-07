// ==UserScript==
// @name           Older Posts Button
// @namespace      Fun
// @description    Add older posts button to old hotpages.
// @include        http://9gag.com/hot/*
// ==/UserScript==

// get new page
cpage = document.getElementById("more_button").getAttribute("currpage");
npage = cpage - 11;

// modify old link
document.getElementById("next_button").setAttribute("style", "width: 300px; float:left;");

// create new link
nlink = document.createElement("a");
nlink.setAttribute("class", "next");
nlink.setAttribute("style", "width: 380px;");
nlink.setAttribute("href", "http://9gag.com/hot/" + npage);
nlink.innerHTML = "Older Posts";

// add new link
document.getElementById("pagination").appendChild(nlink);