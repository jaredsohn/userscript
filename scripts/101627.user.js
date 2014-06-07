// ==UserScript==
// @name           iwatchsimpsonsonline tidy up
// @namespace      http://userscripts.org/users/304720
// @include        http://www.iwatchsimpsonsonline.com/
// @include        http://www.iwatchsimpsonsonline.com/*
// ==/UserScript==

//remove adverts,login section & footer
document.getElementById("google-left").style.display = "none";
document.getElementById("sidebar").style.display = "none";
document.getElementById("footerContainer").style.display = "none";


//centers main content
document.getElementById("left-column-single").style.cssFloat = "none";
document.getElementById("left-column-single").style.marginRight = "auto";
document.getElementById("left-column-single").style.marginLeft = "auto";

//removes banner ads
if (document.getElementById("commentsHeader")) {
document.getElementById("left-column-single").getElementsByTagName("div")[5].style.display = "none";
document.getElementById("left-column-single").getElementsByTagName("div")[8].style.display = "none";
} else {
document.getElementById("left-column-inner").getElementsByTagName("div")[1].style.display = "none";
}

//removes comment section
document.getElementById("comments").style.display = "none";

