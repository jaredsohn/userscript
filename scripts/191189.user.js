// ==UserScript==
// @name       Napivicc.Hu
// @namespace  http://ad-soft.hu/
// @version    1.0
// @description  Lájkolós oldal képrejtős szkript
// @match      http://*.napivicc.net/*
// @copyright  2014 Daniel Adamko
// ==/UserScript==

document.oncontextmenu = null;

function a()
{
    var x = document.getElementsByClassName('likelock_container');
    for(var i = 0; i < x.length; i++) x[i].style.display = 'none';
}
function b()
{
    var x = document.getElementById('dbx_light');
    x.style.display = 'none';
}

a();b();