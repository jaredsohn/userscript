// ==UserScript==
// @name        baha display all pisition fixer
// @namespace   http://mmis1000.byethost31.com/
// @include     /^https?://forum\.gamer\.com\.tw/C\.php\?bsn=\d+&snA=\d+(&.+)?$/
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// @version     0.1
// @grant       none
// ==/UserScript==
$.noConflict();
(function($){
    $('a').each(function(){
        var time;
        var oldButtonPosition;
        if($(this).text().indexOf('開啟圖片') !== -1) {
            $(this).bind('click', function(){
                var self = this;
                var offset;
                oldButtonPosition = $(self).offset().top;
                time = Date.now();
                
                $('html, body').scrollTop($(self).offset().top - 100);
                
                $('img,iframe').bind('load', function() {
                    offset = $(self).offset().top - oldButtonPosition;
                    if (Date.now() - time > 10000){return;}
                    oldButtonPosition = $(self).offset().top;
                    $('html, body').scrollTop($('html, body').scrollTop() + offset);
                });
            });
        }
    });
}(jQuery))
