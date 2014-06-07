// ==UserScript==
// @name        UnloadPage Blocker3.0
// @namespace   UnloadPage Blocker3.0
// @include     *
// @version     3
// ==/UserScript==

function bunload() {

window.addEventListener("load", foo, false);

function foo() {
var u = "beforeunload";
var v = unsafeWindow;
if (v._eventTypes && v._eventTypes[u]) {
var r=v._eventTypes[u];
for(var s=0;s<r.length;s++)>
v.removeEventListener(u,r[s],false);
}
v._eventTypes[u]=[];
}
}
}

bunload();