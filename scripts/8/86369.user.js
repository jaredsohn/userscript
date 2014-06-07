// ==UserScript==
// @name           CBC.ca Comment Killer
// @namespace      www.cbc.ca
// @description    Removes social comments/social tools from the cbc.ca website
// @include        http://www.cbc.ca/*
// ==/UserScript==

// Only hide, don't destroy -- other scripts will fail if you do
var elcomments = document.getElementById('socialcomments');
if (elcomments) elcomments.style.display = 'none';

var eltools = document.getElementById('socialtools');
if (eltools) eltools.parentNode.removeChild(eltools);

// These are added dynamically to the page. :|
function nukeSocial() {
    var elsocom = document.getElementsByClassName('d-inline');
    for (var i=elsocom.length;i>0;i--) {
        try {
            elsocom[i].style.display = 'none';
            elsocom[i].parentNode.removeChild(elsocom[i])
        } catch(err) {
            // Do nothing
        }
    }
    var elhead = document.getElementById('socialhead');
    if (elhead) elhead.parentNode.removeChild(elhead);
}

setTimeout(nukeSocial, 1000);
setTimeout(nukeSocial, 2500);
setTimeout(nukeSocial, 5000);
