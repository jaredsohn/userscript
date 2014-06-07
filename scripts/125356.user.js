// ==UserScript==
// @name           9gag old hotpage navigation 
// @namespace      Fun
// @description    Add next and previous posts button to old hotpages.
// @include        http://9gag.com/hot/*
// ==/UserScript==

// get new page
cpage = document.getElementById("more_button").getAttribute("currpage");
ppage = cpage - 1;
npage = ++cpage;

// create new link
plink = document.createElement("a");
plink.setAttribute("class", "next");
plink.setAttribute("style", "width: 340px; float:left;");
plink.setAttribute("href", "http://9gag.com/hot/" + ppage);
plink.innerHTML = "Previous";

// create new link
nlink = document.createElement("a");
nlink.setAttribute("class", "next");
nlink.setAttribute("style", "width: 340px; float:right;");
nlink.setAttribute("href", "http://9gag.com/hot/" + npage);
nlink.innerHTML = "Next";

// add new link
document.getElementById("pagination").appendChild(nlink);
document.getElementById("pagination").appendChild(plink);

// remove start over button

document.getElementById("pagination").removeChild(next_button);
document.getElementById("pagination").removeChild(more_img);