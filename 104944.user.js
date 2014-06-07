// ==UserScript==

// @name          RCQRH

// @namespace     http://www.facepunch.com

// @description   RCQRH

// @include       *

// ==/UserScript==

var elmDeleted = document.getElementById("qr_defaultcontainer");

if (/('Refugee Camp')|('The Bottom Of The Forums')/i.test (document.body.innerHTML) )
{
    elmDeleted.parentNode.removeChild(elmDeleted);
}



