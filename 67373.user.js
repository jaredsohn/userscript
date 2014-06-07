// ==UserScript==
// @name           myaccess add anywhere
// @namespace      geological-supplies.com/scripts
// @include        *
// @description    Automatically amend links to avoid redirect to myaccess
// @version        0.01
// ==/UserScript==

document.body.innerHTML = document.body.innerHTML.replace(/(\.jstor\.org|\.bioone\.org)\//g, "$1.myaccess.library.utoronto.ca/");