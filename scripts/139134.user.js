// ==UserScript==
// @name          IE Crome Banner Remover v2
// @namespace     http://www.google.com
// @description   Removes the "A faster way to browse the web", "Install Google Chrome" Ad (banner) displayed on non-Chrome browsers.
// @include       http://www.google.com/
// @include       https://www.google.com/
// @include       http://www.google.co.uk/
// @include       https://www.google.co.uk/
// ==/UserScript==


window.addEventListener('load', function () 
{
    document.getElementById('pmocntr2').style.display = 'none';
})
