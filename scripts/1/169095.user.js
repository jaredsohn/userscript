// ==UserScript==
// @name           Ads removal on www.w3schools.com all pages
// @namespace      http://www.w3schools.com/
// @version        0.1
// @description    All the ads from the top and bottom of page will be removed.
// @match          http://www.w3schools.com/*
// @include        http://www.w3schools.com/*
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @copyright  2012+, Rohan
// ==/UserScript==

$(document).ready(function(){

    function removeAdds() {
       $("#mainLeaderboard").remove();  // header add remove
       $("#topRight").remove();         // right add remove
       $(".topLeftRectangle").remove(); // top left rectangle add remove
       $('[id^="div-gpt-ad-"]').remove();  // remove bottom add
    }
    
//Function to display images in lightbox and add lightbox trigger to cover image
    function enableLightbox()
    {
        // Import jquery for colorbox - Hack to attach jquery load event for importing colorbox js
        var script = document.createElement('script');
        script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js';
        document.getElementsByTagName('head')[0].appendChild(script);

        // Actions to be performed after jQuery is loaded
        script.addEventListener('load', function(){ 
            jQuery = unsafeWindow['jQuery'];
            jQuery.noConflict();
            //Import colorbox css. To change lightbox css use replace example1 either example2 or example3 or example4 or example5
            jQuery('head').append('<link rel="stylesheet" href="http://jacklmoore.com/colorbox/example1/colorbox.css" type="text/css" />');
                    jQuery.getScript('http://jacklmoore.com/colorbox/colorbox/jquery.colorbox.js', function(data, textStatus){
                        jQuery("#desc img").each(function() {
                            jQuery(this).wrap("<a class='lightbox links' href='"+jQuery(this).attr('src')+"'></a>");
                        });
                        jQuery('.links').hide();
                        coverImage = jQuery("#desc img:first-child");
                        jQuery('#desc').prepend("<center><a class='lightbox' href='"+coverImage.attr('src')+"'><img src='"+coverImage.attr('src')+"' />'</a></center><br>");
                        jQuery('.lightbox').colorbox({rel:"slide",maxHeight:"800",maxWidth:600});
            });
            
        }, false);
       
    }

   removeAdds();
   enableLightbox()
});