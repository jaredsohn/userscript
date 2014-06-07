// ==UserScript==
// @name           I Hate Soccer
// @namespace      none
// @description    removes all posts containing the keyword soccer
// @version        0.1
// @date           2010-06-13
// @author         texens
// @include        http://www.facebook.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

$(document).ready(function() {
        $("h6:contains('soccer')").parent().parent().parent().hide();
});

