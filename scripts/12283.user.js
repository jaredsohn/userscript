// ==UserScript==// 
// @name            Frenzies Underground Clean Fixer V2
// @version         0.9.1
// @author	        Hans van de Bruggen <pintong@gmail.com>// @namespace       http://greasemonkey.hansv.com/
// @description	    Unhides the current users while in clean mode.// @include         http://*frenzyboard.net// @include         http://*frenzyboard.net/clean.php?action=browse// @include         http://*frenzyboard.net/clean.php?pg=*
// @include         http://*frenzyboard.net/clean// @include         http://*frenzyboard.com/clean?action=browse//
//  New in 0.9:
//  When browsing the forum, the active users are listed at the bottom. This list is //  made 'invisible' while in clean mode (clean.php). This script makes the active //  user list visible, matching the colors of the theme you're using.
//  
//  If you can't see the text well (or at all) with this script, change "var footerStyle" to//  "window" instead of "topic". It's not as elegant, but it will work in all but a few cases. 
//  ////  TODO://  Detect if text color is the same as background color and change footerStyle automatically?
// 
// ==/UserScript==
var footerStyle = "window"; // Names look nicer but breaks under color themes where the background color is                            // the same as non-link text color. Works with most themes.                           // Set variable to "window" to make it work regardless of the theme.                          // var footerStyle = "window"; // Not as elegant, but works under all themes.
/*(function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('.invisible {color: #000000;}');)();*/(function() {  var allSpan, thisSpan;
allSpan = document.evaluate(
    "//span[@class='invisible']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allSpan.snapshotLength; i++) {
    thisSpan = allSpan.snapshotItem(i);
    thisSpan.setAttribute('class', footerStyle); 
}})();