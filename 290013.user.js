// ==UserScript==
// @name           Wikipedia Less Wide 2
// @namespace      tech.nimbus.fi
// @description    Do not let Wikipedia to run so wide on widescreen monitors.
// @include        http://*.wikipedia.org/*
// @include        https://*.wikipedia.org/*
// @version        2.1
// @grant          none
// ==/UserScript==
(function(){

var wikipedia = {
    maxWidth:       "60em",     // Maximum width of the Wikipedia page content
    centerContent:  true        // Center the page content?
};

///////////////////////////////////////////////////////////////////////////////

var content = document.getElementById("content");
if (!content) return;
var wrapper = content.cloneNode(false);
var clone = content.cloneNode(true);
with (clone.style) {
    maxWidth = wikipedia.maxWidth;
    margin = wikipedia.centerContent ? "auto" : 0;
    padding = 0;
    border = 0;
    backgroundColor = "transparent";
    backgroundImage = "none";
}
wrapper.appendChild(clone);
content.parentNode.replaceChild(wrapper, content);

// Correct the window's positition by just reloading the url once if required
var url = document.location.toString();
if(url.indexOf("#") != -1 && url.indexOf("/wiki/") != -1){
    window.location.href = url;
}

})(); // eof
