// ==UserScript==
// @name       		OSW SupportDesk Link Creator
// @namespace  		https://support.oswshop.nl/
// @version    		0.4
// @description  	SDLC creates actual hyperlinks from posted notifications if there's an url. Only works for SVN links.
// @match      		https://support.oswshop.nl/*
// @require			http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @copyright  		2013+, Daniel van der Mierden<daniel@one-stop-webshop.nl>
// ==/UserScript==

$(document).ready(function() {
    $("p:contains('svn.one-stop-webshop.nl')").each(function() {
    	var svn = $(this).html();
        var svnlink = "<a href='"+svn+"' target='_blank'>"+svn+"</a>";
        $(this).html(svnlink);
    })
})