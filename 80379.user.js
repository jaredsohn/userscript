// ==UserScript==
// @name          Reddit Thumbnails
// @description   adds thumbnails to reddit (front page/comments) incl. youtube
// @copyright     2010 Frozenball <orkkiolento [at] gmail [dot] com>
// @include       http://www.reddit.com/*
// ==/UserScript==

var $;

// Add jQuery
    (function(){
        if (typeof unsafeWindow.jQuery == 'undefined') {
            var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
                GM_JQ = document.createElement('script');
    
            GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
            GM_JQ.type = 'text/javascript';
            GM_JQ.async = true;
    
            GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
        }
        GM_wait();
    })();

// Check if jQuery's loaded
    function GM_wait() {
        if (typeof unsafeWindow.jQuery == 'undefined') {
            window.setTimeout(GM_wait, 100);
        } else {
            $ = unsafeWindow.jQuery.noConflict(true);
            letsJQuery();
        }
    }

// All your GM code must be inside this function
    function letsJQuery() {

$(document).ready(function() {
    function escapehtml(str) {
        str = str.replace("&",'&amp;');
        str = str.replace('<','&lt;');
        str = str.replace('>','&gt;');
        str = str.replace('"','&quot;');
        str = str.replace("'",'&#039;');
        return str
    }
    $('.thumbnail').hide(); // Hide reddit.com thumbnails
    $('a').each(function(){
        var link = $(this).attr('href');
        var text= $(this).html();
        
        // The size of thumbnails
        if (/comments/.test(window.location)) { width = "500"; }
        else { width = "500"; }
        
        // Ignore Not Safe For Work posts
        if (!(/thumbs/.test(link)) && !(/NSFW/i.test(text))) {
            
            // Direct image links
            if (/\.(jpe?g|gif|png)$/i.test(link)) {
                $("<br /><img src='"+escapehtml(link)+"' style='margin-top:5px; margin-bottom:5px; border:1px black solid; display:inline; vertical-align:top; max-width:"+width+"px;' alt='' />").appendTo(this);
            }
            // Youtube
            if (/youtube\.com\/watch\?v\=/i.test(link)) {
                t = link.match(/youtube\.com\/watch\?v\=([^&]+)/i);
                video_id = t[1];
                $('<br /><object width="480" height="385"><param name="movie" value="http://www.youtube.com/v/'+escapehtml(video_id)+'&hl=fi_FI&fs=1&"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><embed src="http://www.youtube´.com/v/'+escapehtml(video_id)+'&hl=fi_FI&fs=1&" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="480" height="385"></embed></object>').appendTo(this);
            }
            
            // For Imgur.com links that are not direct
            if (/imgur\.com\/([a-zA-Z0-9]+)$/.test(link)) {
                link = link + '.png';
                $("<br /><img src='"+link+"' style='margin-top:5px; margin-bottom:5px; border:1px black solid; display:inline; vertical-align:top; max-width:"+width+"px;' alt='' />").appendTo(this);                
            }
        }
    });
});
    }
