// ==UserScript==
// @name       Hide GitHub Merge Button
// @namespace  http://daniel-watkins.co.uk/
// @version    0.1
// @description  Removes the merge button on GitHub(s), so you will remember to rebase/write a useful merge message.
// @match      http*://*github*/*/pull/*
// @copyright  2012,  Daniel Watkins <daniel@daniel-watkins.co.uk>
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// ==/UserScript==
var merge_button;
merge_button = $('.green');
merge_button.hide();
