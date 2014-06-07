// ==UserScript==
// // @name          RadioMerkury Tweak
// // @author        Jakub Zakrzewski
// // @namespace     http://interwies.pl
// // @description   Tweaks radio merkury
// // @include       http://radiomerkury.pl/*
// // @include       http://www.radiomerkury.pl/*
// // @version  0.3
// @require https://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// // ==/UserScript==
// // Notes:
// //   * is a wildcard character
// //   .tld is magic that matches all top-level domains (e.g. .com, .co.uk, .us, 
// etc.)



window.addEventListener("load", function(e) {

    jQuery.noConflict();
    function start(){
    try{
    jQuery('ul#news_panel > li').each(function(index) {
      var news_id = '#news_header_text-' + Number(index+1);
      var href = jQuery(news_id).find('a').attr('href');
      var news_hyperlink_id = '#news_hyperlink_' + Number(index+1);
      jQuery('<a href="' + href + '" style="display:none;"><span>Idź do artykułu</span></a>').insertAfter(jQuery(this).find('a'));
      jQuery(this).find('a span').css('padding','0');
      jQuery(this).css('border-bottom','1px solid #AAAAAA');

      jQuery(this).mouseenter(function(){
      jQuery(this).find('a:first').css({'height':'35px'});
        jQuery(this).find('a:last').show();
      });
      jQuery(this).mouseleave(function(){
        jQuery(this).find('a:last').hide();
        jQuery(this).find('a:first').css({'height':'49px'});
      });

      jQuery(this).find('a:first').css({'height':'49px', 'border-bottom':'none'}).find('span').css({'padding': '13px 0 0px 7px', 'font-size':'13px'});
      jQuery(this).find('a:last').css({'height':'14px','border-bottom':'none'}).find('span').css({'margin':'0px 0 5px 7px', 'font-size' : '9px'});

      /*jQuery(this).find('a:first').css({'height':'29px', 'border-bottom':'none'}).find('span').css({'padding': '11px 0 0px 5px', 'font-size':'13px'});
      jQuery(this).find('a:last').css('height','14px').find('span').css({'padding':'0px 0 0px 5px', 'font-size' : '9px'});
      */
    });
    }
    finally{
      if(jQuery('ul#news_panel').length == 0){		
        window.setTimeout(start, 1000, true);  		
      }		
    }
}
    window.setTimeout(start, 1000, true);  
}, false);

