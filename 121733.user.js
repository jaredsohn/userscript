// ==UserScript==
// @name          CodebaseHQ Ticket Tagger
// @description	  Automatically adds a QA<fname><lname> tag to the ticket
// @include       http*://*.codebasehq.com/*/tickets/new
// @version        0.0.1
// ==/UserScript==


var $username = document.getElementById("header").getElementsByTagName("li")[0].textContent;
var $matcher = $username.match(/\b(\w)/g);
var $initials = $matcher.join('');
var $tag = "QA" + $initials

document.getElementById('tags_helper').value = $tag;