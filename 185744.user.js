// ==UserScript==
// @name        LockDownHourOfCode
// @namespace   codeweek
// @description Turns links into dummy links and locks down site
// @include     http://learn.code.org/hoc/*
// @version     1
// @grant       none
// ==/UserScript==

var signin = document.getElementById("signin_button");
signin.style.display = 'none';

var finished = document.getElementsByClassName("header_finished_link")[0];
finished.getElementsByTagName('a')[0].href="http://learn.code.org/hoc/1";

var logo = document.getElementsByClassName("header_logo")[0];
logo.getElementsByTagName('a')[0].href="#";

var locale = document.getElementById("locale");
locale.style.display = 'none';

var footerlinks = document.getElementsByClassName("span9")[0];

for (var i = 0; i < footerlinks.getElementsByTagName('a').length; i++) {
    footerlinks.getElementsByTagName('a')[i].href="#";
}