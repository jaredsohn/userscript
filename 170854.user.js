// ==UserScript==
// @name       From np.reddit to reddit
// @namespace  http://www.reddit.com/user/ImANewRedditor
// @version    0.1
// @description  Asks user if reddit page should be loaded when on a np.reddit page.
// @match      http://np.reddit.com/r/*
// @copyright  2012+, You
// ==/UserScript==

var webpage = document.URL;

var newWebpage = "http://www." + webpage.substring(10);
window.location.href = newWebpage;

// if (confirm("Do you wish to switch from np.reddit to reddit?")){}