// ==UserScript==
// @name YouTube Tags
// @description My first userscript, restores tags in the YouTube description.
// @include http://www.youtube.com/watch?*
// @include https://www.youtube.com/watch?*
// @match http://www.youtube.com/watch?*
// @match https://www.youtube.com/watch?*
// @version 1.0
// @license MIT
// ==/UserScript==

function main() {
    var metas = document.getElementsByTagName('meta'); 
    var tags = "";
  
    for (var i = 0; i < metas.length; i++) { 
        if (metas[i].getAttribute("name") == "keywords") { 
            tags = metas[i].getAttribute("content"); 
        } 
    }   
    
    var extras_section = document.getElementsByClassName("watch-extras-section")[0];
    extras_section.innerHTML += "<li id=\"tags\"><h4 class=\"title\">Tags</h4><div class=\"content\" id=\"tags_content\">" + tags + "</div></li>";
}

document.addEventListener('DOMContentLoaded', main, false);