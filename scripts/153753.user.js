// ==UserScript==
// @name /b/ fix
// @version  1
// @description Fixes upside down /b/
// @include     https://boards.4chan.org/b/*
// @include     http://boards.4chan.org/b/*
// ==/UserScript==

var styles = document.getElementsByTagName("style");

for (var i=0;i<styles.length;i++)
{
    if(styles[i].innerHTML.indexOf("transform") !== -1)
    {
        styles[i].innerHTML = "";
    }
}