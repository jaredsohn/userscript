// ==UserScript==
// @name       FC2
// @namespace  http://yantamovie.net/
// @version    0.1
// @description  haha
// @match      http://yantamovie.net/a/*
// @require     http://code.jquery.com/jquery-1.10.1.min.js
// @grant       GM_xmlhttpRequest
// @copyright  2012+, You
// ==/UserScript==

$(document).ready(function() {  
    console.log("begin")
    $("#content a").each(function(index,element) {
        if(element.parentNode.className == 'video_thumb_small'
          || element.parentNode.className == 'video_thumb_size thumb_height') return;
        var href = element['href'];
        var matches = href.match(/.*\/a\/content\/(\w+)\/?$/);
        if(matches != null) {
            code = matches[1];
            $(document.createElement('a'))
            .css({color:'red'})
            .text("[v]")
            .attr('href', 'http://yantamovie.net/flv2.swf?i=' + code + '&d=468&movie_stop=off&no_progressive=1&otag=1&sj=33&rel=1')
            .insertBefore($(element));
        }
    });
    console.log("end")
});