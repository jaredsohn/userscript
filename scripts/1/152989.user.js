// ==UserScript==
// @name            adf.ly Redirector for mastertoons
// @namespace       http://thecaligarmo.com/scripts/greasemonkey/
// @description     Redirect adf.ly to its target location.
// @version         1.1
// @author          thecaligarmo
// @license         GPL
// @updateURL       https://thecaligarmo.com/scripts/greasemonkey/adfly_mastertoons.js
// @include         http://*.mastertoons.com/*
// @include         http://mastertoons.com/*
// @grant           none
// @run-at        document-end
// ==/UserScript==
(function() {
    setInterval(function(){adflyremoval();},500);
    function adflyremoval(){
        var atags = document.getElementsByTagName('a');
        for(a in atags){
            if(/adf\.ly/.test(atags[a].href)){
                atags[a].href = atags[a].href.replace(/http:\/\/adf\.ly\/\d+\//,'');
            }
        }
    }
})()
