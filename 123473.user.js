// ==UserScript==
// @name           HKGolden.js
// @namespace      HKGolden.js
// @description    修正/增強HKGolden
// @include       http://forum*.hkgolden.com/topics.aspx?type=*
// @include       http://forum*.hkgolden.com/view.aspx?type=*&message=*
// @include       http://forum*.hkgolden.com/view.aspx?message=*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @require       http://cachedcommons.org/cache/jquery-bbq/1.2.1/javascripts/jquery-bbq.js
// ==/UserScript==
 
var QrOpenTop = 27;
var QrCloseTop = 322;
 
jQuery(document).ready(function($) {
 
   //Delete條咖啡色Menu bar
   jQuery('table table > tbody > tr:eq(1)').remove();
 
   //Delete 高登 Logo
   jQuery('table > tbody > tr:eq(1) table > tbody > tr:eq(0)').remove();
 
   //Remove 討論區守則
   jQuery('div.DivBoxContainer').remove();
 
   //Fix Helianthus.annuus Message template dialog size.
   jQuery('#ctl00_ContentPlaceHolder1_QuickReplyTable select:eq(2)').live("click", function(){
      if (jQuery('.an-forum').css('display') != 'none')
      {
        jQuery('div.an-forum').css('margin-top', - 400);
        jQuery('#an-snippets').css('height', window.innerHeight - 100).css('overflow', 'scroll');
        jQuery('#an-snippets > div:eq(0)').css('float', 'left');
        jQuery('#an-snippets > div:eq(0) > input:eq(0)').css('width', '400px').css('float', 'left');
        jQuery('#an-snippets > div:eq(0) > textarea:eq(0)').css('width', '600px');
      }
  });
 
   function toggleNMTop()
   {
        var status = jQuery('#QrStatus').text();
        if (status == 'show') {
            jQuery('#newmessage').animate({
                top: window.innerHeight - QrOpenTop
            } , 400);
            jQuery('#QrStatus').text('hide');
        }
        else {
            jQuery('#newmessage').animate({
                top: QrCloseTop
            } , 400);
            jQuery('#QrStatus').text('show');
       }
          return false;
   }
 
   //Fix 快速回覆
   jQuery('#newmessage').append("<label id='QrStatus' style='display:none;'></label>");
   jQuery('#QrStatus').text('hide');
 
   jQuery('#newmessage').css('position' , 'fixed');
   jQuery('#newmessage').css('top' , window.innerHeight - QrOpenTop);
   jQuery('#ctl00_ContentPlaceHolder1_QuickReplyTable > tbody > tr > td > table > tbody > tr:eq(0)').css('cursor' , 'pointer');
   jQuery('#ctl00_ContentPlaceHolder1_QuickReplyTable > tbody > tr > td > table > tbody > tr:eq(0)').click(function() { toggleNMTop(); });
 
   jQuery('#ctl00_ContentPlaceHolder1_btn_Submit').live("click" ,
      function() {
            jQuery('#newmessage').animate({
                top: window.innerHeight - QrOpenTop
            } , 400);
      }
   );
 
});