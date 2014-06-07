// ==UserScript==
// @name           Tee Cut
// @namespace      script.dreamingsoft.tee
// @require        http://code.jquery.com/jquery.min.js
// @author         Nhan Nguyen
// @description    Tee cut
// @include        http://teespring.com/dashboard/campaigns*
// @version        1.0
// @source         

// ==/UserScript==
$(document).ready(function(){
    var list = ["keepcalmmcgarry","keepcalmsowers","imhackney","keepcalmslagle","immajors"];
    $('.seller-campaign-preview').each(function(){
        var $this = $(this);
        var href = $(this).find('a').attr('href').substr(1);
         if(jQuery.inArray(href,list) >=0)
         {
        	$this.hide();
         }
        
    });
});
