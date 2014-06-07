// ==UserScript==
// @name       custom title username remover
// @namespace  http*://*what.cd/*
// @version    0.1
// @description  doesn't display custom titles if they grab your username
// @match      http*://*what.cd/*
// @copyright  2013+
// ==/UserScript==

username = document.getElementsByClassName("username")[0].innerHTML;
titles = document.getElementsByClassName('user_title');
for (t in titles) {
    if (titles[t].innerHTML.indexOf('getElementsByClassName') !== -1 || titles[t].innerHTML.indexOf(username) !== -1) {
        titles[t].innerHTML = '';
    };
};