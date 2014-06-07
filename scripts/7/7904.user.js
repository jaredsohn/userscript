// ==UserScript==  
// @name          Ad Stomper for Facebook
// @namespace     http://www.youtube.com/profile?user=imightbegiant
// @include       http://*.facebook.com/*
// @description   Removes some of the facebook ads
// ==/UserScript==
// Last Modified: March 12, 2007

window.addEventListener(
    'load', 
    function() { var remove=null;
    remove = document.getElementById('ssponsor');
    if(remove) remove.parentNode.removeChild(remove);
},
    true);
