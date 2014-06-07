// ==UserScript==
// @name           HackForums Star Remover
// @namespace      
// @description    Don't display stars in posts on HackForums
// @match          *://*.hackforums.net/*
// @match          *://hackforums.net/*
// @author         dumblr
// @version        1.0
// @downloadURL    
// @updateURL      
// ==/UserScript==
function removeStars(){
    var images = document.getElementsByTagName('img');
    for (var n = images.length; n--> 0;) {
      var img = images[n];
        if(img.getAttribute("src")==="http://x.hackforums.net/images/blackreign/star.gif" || img.getAttribute("src")==="http://x.hackforums.net/images/blackreign/ub3rstar.gif"){
            img.parentNode.removeChild(img);
        };
    };
};
var interValID = setInterval(removeStars, 10);