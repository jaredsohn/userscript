// ==UserScript==
// @name        Show Python documenation for 3.x instead of 2.x
// @namespace   http://danielj.se
// @author      MaTachi
// @description Automatically opens documentation for Python 3.x instead of Python 2.x on http://docs.python.org.
// @include     http://docs.python.org/*
// @version     1.0
// ==/UserScript==
(function() {

// Remove "http://docs.python.org/" from the URL
let ending = document.URL.substring(23);

// Check so the URL isn't already .org/py3k
if (ending.substring(0, 4) != 'py3k') {
    // The new URL
    let newUrl = 'http://docs.python.org/py3k/' + ending;
    window.location = newUrl;
}

})();
