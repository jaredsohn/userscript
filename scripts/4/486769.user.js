// ==UserScript==
// @name       pr0gramm HaX
// @namespace  http://use.i.E.your.homepage/
// @version    0.3
// @description  something useful
// @match      http://pr0gramm.com/*
// @copyright  2012+, zucker?!
// ==/UserScript==
document.getElementById("head").style.left = "30%"
document.getElementById("page").style.left = "15%"
document.getElementById("stream-prev").setAttribute("style", "display:none");
document.getElementById("stream-next").setAttribute("style", "display:none");
function modifyComments() { 
    if(document.getElementsByClassName("item-comments").length>0) 
    {
        if(document.getElementById("pr0HaX")) {
           document.getElementById("pr0HaX").parentElement.removeChild(document.getElementById("pr0HaX"));
           }
        var comments = document.getElementsByClassName("item-comments")[0];
    	console.log(document.getElementsByClassName("item-comments").length);  
        var commNew = document.createElement("div");
        commNew.id = "pr0HaX";
        commNew.style.position="fixed";
        commNew.style.overflow="auto";
        commNew.style.left="0%";
        commNew.style.width="30%";
        commNew.style.top = "0%";
        commNew.style.height = "100%";
        commNew.appendChild(comments);
        document.body.appendChild(commNew);
    }
    
}
 var storedHref = window.location.href;
    window.setInterval(function () {
        if (window.location.href != storedHref) {
            storedHref = window.location.href;
            loadComments();
        }
    }, 100);
function loadComments() {
	window.setTimeout(modifyComments,100);
}
loadComments();