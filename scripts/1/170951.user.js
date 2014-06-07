// ==UserScript==
// @name        Fix user's link on table info
// @namespace   http://userscripts.org/users/69817
// @include     http://wiki.ubuntu-br.org/*
// @version     1
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// ==/UserScript==

function changeElements(element, index, array) {
    element.href= '/' + $(element).text();
}

tagsA = $('.badinterwiki').get();

tagsA.forEach(changeElements);

// http://wiki.greasespot.net/Third-Party_Libraries#jQuery
// http://www.cssnewbie.com/emulate-a-foreach-loop-in-javascript/ *
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for_each...in
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach *
