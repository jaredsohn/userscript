// ==UserScript==
// @name           Reddit Parent Comment Quick View
// @namespace      http://purl.oclc.org/NET/gavri
// @description    Reddit Parent Comment Quick View
// @include        http://www.reddit.com/r/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

$('.bylink[href*="#"]').each(
    function() {
        var href = $(this).attr('href');
        var parts = href.split('#');
        var qvLink = $('<a>(qv)</a>');
        $(this).after(qvLink);
        var popUp = $("<div></div>");
        qvLink.mousedown(function(e) {
            var commentId = parts[1];
            popUp.html($('div[class*=' + commentId + '] .entry:first').html());
            qvLink.after(popUp);
            popUp.attr('class', 'raisedbox');
            popUp.css({'z-index': 100, position: 'absolute', left: e.x, top: e.y});
            popUp.show();
        });
        qvLink.bind('mouseup mouseout', function() {
            popUp.remove();
        });

    });