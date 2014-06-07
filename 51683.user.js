// ==UserScript==
// @name           Bungie.net PAX '09 Countdown
// @version	   2009
// @description	   Adds PAX 2009 Countdown to the top of Bungie.net
// @Author	   PKF 647
// @include        http://www.bungie.net/*
// @include        http://*.bungie.net/*
// ==/UserScript==
var forums, newElement;
forums = document.getElementById('aspnetForm');
if (forums) {
    newElement = document.createElement('div');
    newElement.innerHTML='<div style="margin: 0 auto 0 auto;' +
    'border-bottom: 0px solid #bbbbbb; margin-bottom: 0px;margin-left: 43px;margin-right:53px;' +
    'font-size: small; background-color: #242223; ' +
    'color: #ffffff;"><p style="margin: 0px 0 0px 0;"> ' +
    '<script type="text/javascript" src="http://www.pennyarcadeexpo.com/countdown.js" defer="defer"></script><div class="countdown1"><a href="http://www.pennyarcadeexpo.com/">Countdown to PAX 2009</a> <span id="countdown1">2009-9-4 10:00:00 GMT-08:00</span></div>' +
    '</p></div>';
    newElement.style.textAlign="center";
    forums.parentNode.insertBefore(newElement, forums);
}