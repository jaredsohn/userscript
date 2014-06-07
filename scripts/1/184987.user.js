// ==UserScript==
// @name       Always HTTPS
// @namespace  Ohm Patel
// @version    0.1
// @description  Always be secured with HTTPS
// @match      www.*.com/*
// @copyright  2013+, You
// ==/UserScript==
if (window.location.protocol == "https:") {
    console.log("0");
}
else {
    window.location.protocol = "https:";
}