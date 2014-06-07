// ==UserScript==
// @name           I realy Hate justin bieber
// @namespace      none
// @description    removes all posts containing the keyword justin bieber
// @version        0.1
// @date           05-07-2010
// @author         Travis
// @include        http://www.facebook.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

$(document).ready(function() {
        $("h6:contains('justin bieber')").parent().parent().parent().hide();
});