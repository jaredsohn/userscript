// ==UserScript==
// @name       Ynet Unlike
// @namespace  http://hmemcpy.com/
// @version    0.1
// @description  Removes "Like us to view content" from Ynet articles on Facebook.
// @match      https://www.facebook.com/ynetnews/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @copyright  2013+, You
// ==/UserScript==

var stream = document.querySelector("#globalContainer");

function filter(){
    
    debugger;
    
    var toRemove = document.querySelectorAll('.fb-like-wrapper, .fb-like-div');
    for(var i=0; i < toRemove.length; i++){
        var garbage = toRemove[i];
        garbage.style.display = 'none';
    }
}

if(stream){
    
    filter();    
    
    stream.addEventListener("DOMNodeInserted", function (ev) {
        filter();
    }, false);
}