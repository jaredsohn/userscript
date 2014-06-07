// ==UserScript==
// @name                AJ Ghergich Email Finding Helper
// @author              Chet Manley
// @version             0.2
// @description         Automatically checks email found radiobox, linkifies URL and focuses on the email textbox.
// @include             https://www.mturkcontent.com/*
// @require             http://code.jquery.com/jquery-latest.min.js
// ==/UserScript==

// v0.2, 2013-11-07     Adds a Google search link for "contact <website name>."
//                      ---------------------------------------------------------------------------
// v0.1, 2013-08-23     Automatically checks email found radiobox, linkifies URL and focuses on the email textbox.
//                      ---------------------------------------------------------------------------

$('form > p > b').append(' - <a href="http://' + $('form > p > b').text().trim() + '" target="_blank">Open link</a> - <a href="https://encrypted.google.com/search?q=contact+' + $('form > p > b').text().trim() + '" target="_blank">Google Search</a>');
$('input[name="Q1Url"]').focus();
$('input[type="radio"]:first').prop('checked', 'true');