// ==UserScript==
// @name Save current page
// @namespace DalekSec Userscripts
// @version 2.0
// @description Saves the current page on the site you are reading, then lets you navigate back to that page.
// @match *://*.explosm.net/*
// @match *://*.xkcd.com/*
// @match *://*.collar6.com/*
// @match *://*.meninhats.com/*
// @match *://*.exocomics.com/*
// @match *://*.amazingsuperpowers.com/*
// @match *://*.sandraandwoo.com/*
// @match *://*.bash.im/*
// @match *://*.ithappens.ru/*
// @match *://*.zadolba.li/*
// @match *://*.notalwaysright.com/*
// @match *://*.notalwaysworking.com/*
// @match *://*.notalwayslearning.com/*
// @match *://*.notalwaysrelated.com/*
// @match *://*.notalwaysromantic.com/*
// ==/UserScript==
function savePage(){
    localStorage.setItem("lastpage", window.location.href);
    restoreButton.disabled = "";
}
function restorePage(){
    window.location.href = localStorage.getItem("lastpage");
}
var saveButton = document.createElement("button");
var restoreButton = document.createElement("button");
saveButton.addEventListener("click", savePage);
restoreButton.addEventListener("click", restorePage);
saveButton.innerText = "Save current page";
restoreButton.innerText = "Restore saved page";
if(!localStorage.hasOwnProperty("lastpage")){
    restoreButton.disabled = "disabled";
}
saveButton.style.width = '100%';
restoreButton.style.width = '100%';
document.body.appendChild(saveButton);
document.body.appendChild(restoreButton);