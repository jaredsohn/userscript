// ==UserScript==
// @name           Google Less Wide
// @namespace      el.cricobs
// @description    Don't let Google run wild on widescreen monitors.
// @include        http://www.google.*/webhp?*
// @include        http://www.google.*/search?*
// @include        http://www.google.*/ig?*
// @include        http://www.google.*/
// @include        http://www.google.*/#*
// @include        https://www.google.*/webhp?*
// @include        https://www.google.*/search?*
// @include        https://www.google.*/ig?*
// @include        https://www.google.*/
// @include        https://www.google.*/#*
// @include        https://encrypted.google.*/webhp?*
// @include        https://encrypted.google.*/search?*
// @include        https://encrypted.google.*/ig?*
// @include        https://encrypted.google.*/
// @include        https://encrypted.google.*/#*
// @version        1.1
// ==/UserScript==
(function(){

var google = {
    maxWidth:       "45em",     // Maximum width of the Google page content
    centerContent:  true        // Center the page content?
};

///////////////////////////////////////////////////////////////////////////////

var content = document.getElementById("center_col");
if (!content) return;
var wrapper = content.cloneNode(false);
var clone = content.cloneNode(true);
with (clone.style) {
    maxWidth = google.maxWidth;
    margin = google.centerContent ? "left" : 0;
    padding = 0;
    border = 0;
    backgroundColor = "transparent";
    backgroundImage = "none";
}
wrapper.appendChild(clone);
content.parentNode.replaceChild(wrapper, content);

})(); // eof
