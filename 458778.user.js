// ==UserScript==
// @id             evernote.ajorpheus.width
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// @name           Shared Evernotes width Increaser
// @version        1.0
// @namespace      org.ajorpheus.userscripts
// @author         ajorpheus
// @description    
// @include        *://www.evernote.com/shard/*
// @run-at         document-end
// ==/UserScript==

$(document).ready(function(){  
        $('.wrapper#container').css('width', '1200px');
});
