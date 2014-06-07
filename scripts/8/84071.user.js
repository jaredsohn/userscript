// ==UserScript==
// @name           BetterTrackTrace
// @namespace      http://www.track-trace.com/
// @description    Improves the track-trace interface by bringing back a few features and removing some unnecessary ones.
// @include        http://www.track-trace.com/
// @version        0.0.2
// ==/UserScript==

var forms = new Array("DHL", "UPS", "TNT", "FEDEX", "BAX", "AEI", "aircargoform", "postform", "containerform", "bolform");
var inputs = document.getElementsByClassName('trackform-inputs');
var bc = document.getElementsByClassName('body-content');

for(var i = 0; i < inputs.length; i++) {
var reset = document.createElement('input');
reset.value = "Reset";
reset.setAttribute("type", "button");
reset.setAttribute("class", "knapp");
var resetButton = "document."+forms[i]+".reset()";
reset.setAttribute("onclick", resetButton);
document.forms.namedItem(forms[i]).appendChild(reset);
}

function addStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

bc[1].setAttribute("style", "display: none;");

addStyle('html { -moz-transform: scale(1); }');
addStyle('.input { font-size: 16px !important;}');
addStyle('.knapp { font-size: 15px !important; height: 24px !important;}');
addStyle('.link_list { display: none !important;');
addStyle('#r-ad-tag { display: none !important;}');
addStyle('#r-ad { display: none !important;}');
addStyle('#content-left { width: 723px !important;}');