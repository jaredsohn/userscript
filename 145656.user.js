// ==UserScript==
// @name          Compact Alpha.net Stream View
// @namespace     http://kevingh.com
// @description   Shrinks the width of your App.net stream views.
// @include       https://alpha.app.net/*
// @version       2.5.1
// ==/UserScript==

function addCSS (css)
{
    unsafeWindow.addEventListener('load', function ()
    {
        var style = document.createElement('style');

        style.type = 'text/css';
        style.textContent = css;

        document.getElementsByTagName("head")[0].appendChild(style);
    }, false);
}

addCSS('.container {max-width: 550px !important; width: 550px !important;}');

var script = document.createElement('script');

script.setAttribute("type", "text/javascript");
script.appendChild(document.createTextNode("$(function(){$('.container').css('width', '550px');$('.container').css('max-width', '550px');});"));

document.body.appendChild(script);