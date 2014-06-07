/*

Remove Banner on seochat.com & devshed.com
Version 0.2b
(C) 2007  
Use this freely under the GNU GPL, http://www.gnu.org/licenses/gpl.html



*/

// ==UserScript==
// @name          seochat.com/devshed banner killer
// @description   Removes the ad banner on the right hand side of the seochat.com & devshed.com
// @include       http://seochat.com/*
// @include       http://www.seochat.com/*
// @include       http://devshed.com/*
// @include       http://www.devshed.com/*
// ==/UserScript==
//*[@id="resultright"]

var resultright = document.getElementById('resultright');
if(resultright) {
 resultright.parentNode.removeChild(resultright);
}