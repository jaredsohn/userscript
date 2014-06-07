// ==UserScript==
// @name          Stretch Notepad To Browser
// @namespace     IKilledBambi's scripts
// @description	  Fills in the useless white space.
// @version	  1.0
// @include       http://www.jumk.de/notepad/view.php
// ==/UserScript==
// Notes:
//   * is a wildcard character
//   .tld is magic that matches all top-level domains (e.g. .com, .co.uk, .us, etc.)



// Header Variables
var header = document.getElementsByTagName('h1')[0];
var headerParent = header.parentElement;
var outerDiv = document.getElementsByClassName('outer')[0];
var textDiv = document.getElementsByName('text')[0];


// Header
headerParent.removeChild(header);


// outerDiv
outerDiv.style.width='97%';


// textDiv
textDiv.style.width='100%';
textDiv.style.height=getDocHeight()-243 + 'px';


// Code by James Padolsey @ james.padolsey.com/javascript/get-document-height-cross-browser/
function getDocHeight() {
    var D = document;
    return Math.max(
        Math.max(D.body.scrollHeight, D.documentElement.scrollHeight),
        Math.max(D.body.offsetHeight, D.documentElement.offsetHeight),
        Math.max(D.body.clientHeight, D.documentElement.clientHeight)
    );
}