// ==UserScript==
// @name       Imgur captions suck
// @namespace  http://nahhhhhhhhhhhhh/
// @version    1.02
// @description  Kills captions on imgur.
// @match      http://imgur.com/
// @match      https://imgur.com/
// @match      http://imgur.com/*
// @match      https://imgur.com/*
// @match      http://*.imgur.com/
// @match      https://*.imgur.com/
// @match      http://*.imgur.com/*
// @match      https://*.imgur.com/*
// @copyright  2012-2013 vltl
// @run-at     document-start
// ==/UserScript==
// clear thumbs periodically
function clearThumbCaptions() {
    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = '.tipsy-inner {font-size:0;margin-top:-1em;}';
    document.getElementsByTagName('head')[0].appendChild(style);
}

function clearTitles() {
    var captionDiv = document.getElementById("image-title");
    var disableHook = function() { captionDiv.removeEventListener('DOMSubtreeModified', cloakHandler, true); };
    var enableHook = function() { captionDiv.addEventListener('DOMSubtreeModified', cloakHandler, true); };
    var cloakHandler = function() {
        var captionText = captionDiv.innerText;
        setTimeout(function() { disableHook(); captionDiv.innerText = "Click here for caption"; enableHook(); }, 0);
        captionDiv.onclick = function(e) {
            disableHook();
            captionDiv.innerText = captionText;
            enableHook();
        };

        document.title = "imgur";
    };
    
    if(!captionDiv)
        return;
    
    captionDiv.style.display = "none";
    
    window.onload = function(e) {
        cloakHandler();
        captionDiv.style.display = "block";
    }
}

clearTitles();
clearThumbCaptions();