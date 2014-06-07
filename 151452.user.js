// ==UserScript==
// @name        SIS Course Title Fixer
// @namespace   http://rasmuswriedtlarsen.com
// @description Fix page title for showing courses on sis.ku.dk (so bookmarking it gets easier)
// @match       http://sis.ku.dk/kurser/viskursus.aspx*
// @match       https://sis.ku.dk/kurser/viskursus.aspx*
// @version     1.0.1
// @grant       none
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.8.1/jquery.min.js
// ==/UserScript==

document.title = $('.pubtitle').text()