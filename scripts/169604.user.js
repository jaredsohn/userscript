// ==UserScript==
// @name       Facebook Ad Destroyer
// @version    0.1
// @description  Detects Facebook inline ads and stops them being displayed.
// @include        http://*.facebook.*
// @include        https://*.facebook.*
// @copyright  2013, UDK
// @require http://code.jquery.com/jquery-latest.js
// ==/UserScript==

//Parent Element To Ads
grandparent = document.getElementById('globalContainer'); 

function hideInlineAds() {

    // Find all divs with "-cx-PUBLIC-fbEntstreamStory__wrapper" as style   
    $( ".-cx-PUBLIC-fbEntstreamStory__wrapper[data-ft]" ).each(function (i) {
        var df = JSON.parse(this.getAttribute("data-ft"));
      
        if ( df.ei != null ) {
            $(this).css("display","none");
        }

    });
    
}

if (grandparent != null) {grandparent.addEventListener("DOMSubtreeModified", hideInlineAds, true);}

hideInlineAds();