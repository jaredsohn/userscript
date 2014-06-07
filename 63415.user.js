/*<![CDATA[*/
// ==UserScript==
// @name          Nimbuzz background
// @description   Replace Nimbuzz background
// @include       http://my.nimbuzz.com/*
// @namespace     userscripts.org/users/120502
// ==/UserScript==

function changeBackground()
{
    document.getElementById('myNimbuzz').style.background = '#444444';
}

document.addEventListener('load', changeBackground(), false);

/*]]>*/
