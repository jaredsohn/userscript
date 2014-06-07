// ==UserScript==
// @name       gifBlock
// @namespace  http://i.have.no.homepage/
// @version    0.1
// @description  [Google Chrome] Stops downloading gif images (including ajax gifs) in 9gag.com pages(or any page if you just fix the @match rule), replaces the image with a placeholder and allows to view the gif (downloads) by clicking on it. Doesn't work on google+ ajax gifs.
// @match      http://*.9gag.com/*
// @copyright  2012+, Nobody
// ==/UserScript==

function tamperMonkeyWrap()
{   
    function log(m)
    {
        console.log(m);
    }
    function jQWrap($)
    {
        log("Extension execution begins...");

        function blockGifs()
        {        
            $('img').each(function() {
                var $img = $(this),
                    src = $img.attr('src'),
                    w = $img.width(),
                    h = $img.height(),
                    cursor = $img.css('cursor'),
                    parts = src.split('.'),
                    ext = parts[parts.length-1];

                if ($.trim(ext.toLowerCase()) != "gif")
                    return;            

                $img.attr('data-imgurl', src);
                $img.data('cursor', cursor);
                $img.css('cursor', 'pointer');
                $img.addClass('gif-blocked');                
                h = h > 100? h : 100;
                $img.attr('src', '//ipsumimage.appspot.com/'+w+'x'+h+'?l=Gif (Click)');
            }); 
        }

        function interceptAjax () {
            $('body').ajaxComplete(
                function (event, requestData)
                {
                    log("Blocking GIF [Ajax] ...");                
                    blockGifs();
                }
            );
        }

        $(document).ready(function() {
            log("Blocking GIF [Ready]....");
            blockGifs();
            interceptAjax();        
            $(document).on('click', 'img.gif-blocked', function(ev) {            
                var $img = $(this),
                    url = $img.attr('data-imgurl'),
                    cursor = $img.data('cursor');

                $img.attr('src', url);
                $img.css('cursor', cursor);
                $img.removeClass('gif-blocked');
                ev.preventDefault();
                return false;
            });  
        });

        log("Document is not ready yet. trying block just in case it takes time to be _ready_ (google+).");
        blockGifs();
    }

    if (window.jQuery == undefined)
    {
        log("Loading jQuery...");
        var scriptTag = document.createElement('script');
        scriptTag.src = "//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js";
        scriptTag.onload = function(){
            log("jQuery loaded.");
            window.jQuery = jQuery; 
            jQWrap(jQuery);
        };
        document.getElementsByTagName('head')[0].appendChild(scriptTag);
    }
    else
    {
        log("jQuery already included in the page");
        jQWrap(window.jQuery);
    }   
}

var scriptTag = document.createElement('script');
scriptTag.text = '(' + tamperMonkeyWrap.toString() + ')();';
document.getElementsByTagName('head')[0].appendChild(scriptTag);