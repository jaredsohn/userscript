// ==UserScript==
// @name       Smoking Man Hide
// @namespace  http://www.greaterfool.ca/
// @version    0.1
// @description  Hide all comments by everyone's favourite troll
// @match      http://www.greaterfool.ca/*
// @copyright  2012+, kurdt
// @require http://code.jquery.com/jquery-latest.js
// ==/UserScript==

$(document).ready(function() {
    var dt = $("dt:contains('Smoking Man')");
    var comment = dt.next();
    dt.hide();
    comment.hide();
});