// ==UserScript==  
// @name          Ad Stomper for Facebook
// @namespace     http://xan.bounceme.net/
// @include       http://*.facebook.com/*
// @description   Improvement of  Adstomper for facebook, also removes bottom ads
// ==/UserScript==
// Last Modified: April 1, 2007

window.addEventListener(
    'load', 
    function() { var remove=null;
    remove = document.getElementById('ssponsor');
    if(remove) remove.parentNode.removeChild(remove);

    var book=document.getElementById("book");     
    var allbooktags=book.getElementsByTagName("*"); 

    for (i=0; i<allbooktags.length; i++) { 
        if (allbooktags[i].className=="sponsors") { 
            allbooktags[i].parentNode.removeChild(allbooktags[i]); 
        } 
    } 
},
    true);
