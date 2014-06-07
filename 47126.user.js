// ==UserScript==
// @name           TSR - Highlight downloads requiring a mesh
// @namespace      sk89q.therisenrealm.com
// @description    Highlight downloads requiring a mesh
// @include        http://www.thesimsresource.com/downloads/*
// @include        http://thesimsresource.com/downloads/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

(function() {
    var items = $('.sreq .reit');
    $.each(items, function() {
        if ($(this).text().match(/(?:Required External Mesh|Mesh on TSR Required)/i)) {
            var infoBox = $(this).parent().parent().parent();
            //infoBox.find('h4').css('opacity', '0.4');
            
            // Get download url
            var downloadURL = infoBox.find('a.dl').attr('href');
            // Remove download buttons
            infoBox.find('.bvb').children().remove();
            // Create download section on the requirements pane
            var downloadSection = $('<li class="reit"><h5>Download:</h5><ul></ul></li>');
            var downloadLink = $('<li><a>Download</a></li>');
            downloadLink.children('a').attr('href', downloadURL);
            downloadSection.children('ul').append(downloadLink);
            console.debug(downloadLink);
            infoBox.children('.sreq').children('.ri').append(downloadSection);
        }
    });
})()