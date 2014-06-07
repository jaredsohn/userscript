// ==UserScript==
// @name           Youtube wadsworth
// @namespace      http://userscripts.org/users/127069
// @description    Displays a wadsworth button to activate it
// @include        http*://*.youtube.com/watch?*v=*
// @version        2.3
// @changelog      Fixed non-working button and style
// ==/UserScript==

var wadsworthSpan = document.createElement("span");
wadsworthSpan.className = "yt-uix-button-group actionable";
var wadsworth = document.createElement("button");
wadsworth.innerHTML = "Wadsworth";
wadsworth.setAttribute("id", "wadsworth");
wadsworth.setAttribute("role", "button");
wadsworth.setAttribute("data-button-toggle", "true");
wadsworth.setAttribute("type", "button");
wadsworth.className = "yt-uix-button yt-uix-button-text yt-uix-tooltip yt-uix-button-empty";

var cPage = document.URL;
if (cPage.indexOf("wadsworth") == -1) {
    wadsworth.addEventListener('click', function() { document.location = cPage + "&wadsworth=1"; }, false);
} else {
    wadsworth.className = "yt-uix-button yt-uix-button-text yt-uix-tooltip yt-uix-button-empty action-panel-trigger yt-uix-button-toggled";
    wadsworth.setAttribute("style", "color: rgb(169, 56, 46) !important;");
    var patt = /(.+)&wadsworth=1/i;
    wadsworth.addEventListener('click', function () { document.location = cPage.match(patt)[1]; }, false);
    document.getElementById('watch7-action-buttons').parentNode.addEventListener('mouseover', function () { wadsworth.style.boxShadow = 'inset 0 1px 1px rgba(0,0,0,.20)'}, false);
	document.getElementById('watch7-action-buttons').parentNode.addEventListener('mouseout', function () { wadsworth.style.boxShadow = ''}, false);
}

wadsworthSpan.appendChild(wadsworth);
document.getElementById("watch7-sentiment-actions").appendChild(wadsworthSpan);

GM_addStyle("#wadsworth {\
        border: 0px none;} \
        .yt-uix-button-panel:hover \
        #wadsworth {\
        border: 1px solid;\
        border-color: #C6C6C6;}");