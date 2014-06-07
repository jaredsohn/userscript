// ==UserScript==
// @name                Yammer Wide
// @namespace	        https://chrome.google.com/webstore/detail/cpidhdiecgghdnmimkjdflfmjjaepdai
// @description	        This script will widen the Yammer screen to fill more of the space available on wide monitors.  The wider format will allow you to read more posts with less scrolling. Credit goes to Scott Price, this is a repackaged version of the Chrome Extension. 
// @include		https://*.yammer.com/*
// @require		https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// ==/UserScript==


var padding = 100;

resize();

$(window).resize(function() {   
        resize();
});

$(document).bind('DOMNodeInserted', function(event) {
      $(".ymodule-instance tbody h6").css('width','100%');
          $(".ymodule-instance tbody p ").css('width','100%');
          $(".ymodule-instance tbody p ").css('display','block');
          $(".ymodule-instance tbody h7 ").css('width','100%');
          $(".ymodule-instance tbody h7 ").css('display','block');
});

function resize() {         
        if ($(".three-column-layout").length > 0)
        {   
                if ($(window).width() >= 1080)
                {   
                        $('.three-column-layout').css('width', $(window).width() - parseInt(padding,10));
                        $('#column-two').css('width', $(window).width() - (parseInt(padding,10) + 480) );
                }           
                else
                {   
                        $('.three-column-layout').css('width', 980 );
                        $('#column-two').css('width', 500 );                        
                }   
        }   
        else if ($(".column-two-right").length > 0)
        {   
                if ($(window).width() >= 1080)
                {    
                        $('.two-column-layout').css('width', $(window).width() - parseInt(padding,10));
                        $('#column-two').css('width', $(window).width()- (parseInt(padding,10)+ 200) );  
                        $('.column-two-left').css('width', $(window).width() - (parseInt(padding,10)+ 500) );    
                }    
                else
                {    
                        $('.two-column-layout').css('width', 980 );
                        $('#column-two').css('width', 782 );    
                        $('.column-two-left').css('width', 500 );    
                }                   
        }   
}
