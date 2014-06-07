// ==UserScript==
// @name           YouTube Video Availability Checker
// @description    Checks if a youtube video is available in your country
// @namespace      ch.acidburns
// @include        http://*youtube.com/*
// @require        http://code.jquery.com/jquery-latest.min.js
// ==/UserScript==

$(document).ready( function() {
    $('a[href^="/watch"]').click(
        function(e) {
            // prevent opening link before it's checked
            e.preventDefault();
            
            // get the url from the link
            var url = $(this).attr('href');
            $.ajax( url,
                {   context: this,
                    statusCode: {
                        // 200 -> ok
                        200: function() {
                            window.location = url;
                        },
                        // 404 -> not found
                        404: function() {
                            $(this).css('text-decoration', 'line-through');                                       
                        }                                             
                    }
                }
            );         
        }            
    );   
});