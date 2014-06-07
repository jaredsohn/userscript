// ==UserScript==
// @name Test
// ==/UserScript==
function replaceContentInContainer(matchClass,content) {
    var elems = document.getElementsByTagName('*'), i;
    for (i in elems) {
        if((' ' + elems[i].className + ' ').indexOf(' ' + matchClass + ' ')
                > -1) {
            elems[i].innerHTML = content;
        }
    }
}
window.onload = function ()
    {
    ReplaceContentInContainer("wikiWidget","Different Content");
    }