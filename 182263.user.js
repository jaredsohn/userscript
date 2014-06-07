// ==UserScript==
// @name       Redirect to Python 3 docs
// @namespace  http://mercutiodesign.com/
// @version    0.1
// @description  Redirects all python 2 docs to version 3
// @match      http://docs.python.org/2*
// @copyright  2013, Martin Dreher
// ==/UserScript==
document.location.href=document.location.href.replace(/http:\/\/docs.python.org\/2[.\d]*(?=\/)/,'http://docs.python.org/3');