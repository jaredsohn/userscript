// ==UserScript==
// @name           Wikipedia Less Wide
// @namespace      tech.nimbus.fi
// @description    Do not let Wikipedia to run so wide on widescreen monitors.
// @include        http://*.wikipedia.org/*
// @version        1.0
// ==/UserScript==
(function(){

var wikipedia = {
    maxWidth:       "40em",     // Maximum width of the Wikipedia page content
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

})(); // eof
