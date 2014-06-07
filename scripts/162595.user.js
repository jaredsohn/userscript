// ==UserScript==
// @name       Reddit Click Stopper
// @version    0.1
// @description  Prevents you from clicking on links if ctrl isn't pressed
// @include			reddit.com
// @include			reddit.com/*
// @include			*.reddit.com
// @include			*.reddit.com/*
// @copyright  2012+, You
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// ==/UserScript==

$('div.thing').find('a[href]').live("click", function(e){
    if (!e.ctrlKey)
        e.preventDefault();
});