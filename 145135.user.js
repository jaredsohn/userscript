// ==UserScript==
// @name        Berkeley bspace login
// @namespace   http://matthewfl.com
// @description Auto clicks the CalNet login button and will auto relogin if the session times out
// @include     https://bspace.berkeley.edu/*
// @include     http://bspace.berkeley.edu/*
// @version     1
// ==/UserScript==

function g () {
    location.href = "https://bspace.berkeley.edu/portal/clogin";
}

if(document.getElementById("loginTitle")) g();


if(document.getElementById("loginLink1") &&
   typeof document.getElementById("loginLink1").title == "string" &&
   document.getElementById("loginLink1").title.indexOf("out") == -1)
    g();

setInterval(function () {
    if(document.getElementById("timeout_alert_body")) g();
}, 25000); // 25sec