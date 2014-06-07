// ==UserScript==
// @name           Password Revealer
// @namespace      xx
// @description   xx
// @include        *
// @exclude        about:*
// @exclude        chrome:*
// @copyright      xx
// ==/UserScript==

function addHandlers() {
var dp = document.evaluate("//input[@type='password']",document,null,6,null),
i, DP, dpl = dp.snapshotLength;
for(i=0; i<dpl; i++) {
DP = dp.snapshotItem(i);
DP.setAttribute("onKeyDown", "this.title=this.value;");
DP.setAttribute("onKeyUp", "this.title=this.value;");
DP.setAttribute("onKeyPress", "this.title=this.value;");
DP.setAttribute("onDragDrop", "this.title=this.value;");
DP.setAttribute("onMouseOver", "this.title=this.value;this.type='text';");
DP.setAttribute("onMouseOut", "this.title=this.value;this.type='password';");
DP.setAttribute("title", DP.value);
}
}

window.addEventListener('load', addHandlers, false);