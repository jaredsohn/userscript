// ==UserScript==
// @name        Dumpert No Flash / Dumpert Geen Flash
// @namespace   net.schmiggetyschmoo
// @description Play Dumpert.nl movies without the Adobe Flash Player. Replaces the flv with a nonflash embedded movie.
// @downloadURL https://userscripts.org/scripts/source/178433.user.js
// @updateURL   https://userscripts.org/scripts/source/178433.user.js
// @include     http://www.dumpert.nl/mediabase*
// @version     0.2
// @grant       none
// ==/UserScript==

// ========== EXECUTING SCRIPT ==========

makeMoviesEmbedded();

// ========== INITIALIZATION ==========

// Replace the original video-link by an embedded element of the following format:
// <div class="embed"><iframe src="http://www.dumpert.nl/embed/6562944/ff20d03b/dumpert_random_shit_compi_9.html" width="480" height="272" class="dumpertembed" frameborder="0"></iframe></div>
function makeMoviesEmbedded() {
    var originalMovieElement = document.getElementById("item1");
    if (!originalMovieElement){
        originalMovieElement = document.getElementById("item2");
    }
    
    // Exit if the element is not a video element.
    var classOfElement = originalMovieElement.getAttribute("class")
    if (classOfElement === "foto" || classOfElement === "audio"){
        return
    }
    
    var movieWidth = document.defaultView.getComputedStyle(originalMovieElement,null).getPropertyValue("width").replace("px" , "");
    var movieHeight = document.defaultView.getComputedStyle(originalMovieElement,null).getPropertyValue("height").replace("px" , "");
    
    var parentOfOriginalMovieElement = originalMovieElement.parentNode;
 
    // Create the new embedded element.
    var embeddedMovieElement = document.createElement("div");
    embeddedMovieElement.className = "embed";
    var iframeElement = document.createElement("iframe");
    iframeElement.setAttribute("src", document.documentURI.replace("mediabase", "embed"));
    iframeElement.setAttribute("width", movieWidth);
    iframeElement.setAttribute("height", movieHeight);
    iframeElement.setAttribute("class", "dumpertembed");
    iframeElement.setAttribute("frameborder", "0");
    embeddedMovieElement.appendChild(iframeElement);
         
    parentOfOriginalMovieElement.replaceChild(embeddedMovieElement, originalMovieElement);
}