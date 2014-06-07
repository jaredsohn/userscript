// ==UserScript==
// @name       Napjaink.be
// @namespace  http://ad-soft.hu/
// @version    1.0
// @description  enter something useful
// @match      http://*.napjaink.be/*
// @copyright  2014, AD-Soft
// ==/UserScript==

document.body.innerHTML += ";";

function a()
{
    var x = document.getElementsByClassName('onp-sociallocker');
    for(var i = 0; i < x.length; i++) x[i].style.display = 'none';
}
function b()
{
    var x = document.getElementsByClassName('onp-sociallocker-content');
    for(var i = 0; i < x.length; i++) x[i].style.removeProperty('display');
}

a();b();