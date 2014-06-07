// ==UserScript==
// @name        Hollister Helper
// @namespace   http://dev.benmanns.com/
// @description This script does some magic for hollisterco.com
// @include     http://www.hollisterco.com/*
// @require     http://code.jquery.com/jquery-1.4.2.min.js
// @version     0.1
// ==/UserScript==

$(document).ready(function() {
    $('table.deptCell').unbind('mouseout').unbind('mouseover');
    $('div.deptNamePrice').css('visibility', 'visible');
    $('div.deptSwatchCell').css('visibility', 'visible');
});
