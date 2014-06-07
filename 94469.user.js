// ==UserScript==
// @name          PornW Thread Search At Top
// @namespace     http://www.userscripts.org
// @description   Highlights keywords
// @include       http://www.porn-w.org/*
// ==/UserScript==

url = window.location;
match = /t[0-9]+.html/.exec(url);

if (match != null) {
    id = match[0].replace(/[^0-9]/g, '');
    var container = document.getElementsByClassName('bodyline')[0];
    var new_element = document.createElement('div');
    new_element.setAttribute('width', '100%');
    new_element.setAttribute('cellspacing', '0');
    new_element.setAttribute('cellpadding', '0');
    new_element.setAttribute('border', '0');
    new_element.innerHTML = "<form action='./search.php?t=" + id + "' name='search' method='post'><span class='gensmall'>Search for:</span> <input type='text' size='20' name='keywords' class='post'> <input type='submit' value='Go' class='btnlite'> &nbsp;</form>";
    container.insertBefore(new_element, container.firstChild);
}


