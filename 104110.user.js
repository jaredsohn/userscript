// ==UserScript==
// @name           Website Checker
// @author         bag-man
// @version        0.2
// @namespace      http://github.com/bag-man/isupChecker
// @src            http://github.com/bag-man/isupChecker
// @description    Checks if a website is up or not via isup.me
// @include        http://www.isup.me/*
// @include	   http://isup.me/*
// @grant	   none
// ==/UserScript==

var url = document.getElementsByClassName("domain")[0].innerHTML;
if(/\bup\b/.test(document.getElementById("container").innerHTML)) {
  alert("The site is back up.");
  window.location.href = url;
}
setTimeout(function() { document.location.reload(); } ,4000);
