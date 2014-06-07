// ==UserScript==
// @name       Instructables All Steps Default
// @namespace  Ohm Patel
// @version    0.1
// @description  enter something useful
// @match      www.instructables.com/id/*
// @copyright  2013+, You
// ==/UserScript==
if (window.location.search == "?ALLSTEPS") {
    console.log("0");
}
else {
    window.location.search = "?ALLSTEPS";
}