// ==UserScript==
// @name           Lucky Fox
// @namespace      http://userscripts.org/scripts/show/7538
// @description    Add an "I'm Feeling Lucky" button to Firefox start page
// @include        http://www.google.com/firefox
// @include        http://www.google.co.uk/firefox
// ==/UserScript==

var lucky = document.createElement("span")
lucky.innerHTML = '<input type=submit value="Do Ya Feel Lucky, Punk?" name="btnI" id="btnI">'

document.getElementsByTagName('INPUT')[0].parentNode.appendChild(lucky)
