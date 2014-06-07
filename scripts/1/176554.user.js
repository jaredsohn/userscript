// ==UserScript==
// @name       Identi Automatic ShowLinks
// @version    1.0
// @description  Identi Ads ByPass
// @namespace   http://bryansuero.com
// @include   http://*.identi.li/index.php?topic=*
// @require	http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @require	http://www.identi.li/js/aes/aes2.min.js
// @author 		BryanPS
// @grant 		none
// ==/UserScript==

(function(){    	
    $("#decrypt").addClass('ui-button-positive');
    $("#decrypt").val("Identi.Li Automatic ShowLinks by BryanPS");
    
    
    $("#stcpDiv").remove();
    $("#stSegmentFrame").remove();
    $("#stwrapper").remove();
    $("#twttrHubFrameSecure").remove();
    $("#twttrHubFrame").remove();
    $('#ads_1').remove();
    $(".art-Header div iframe").remove();
    $(".post_body div.clearfix a").remove();
    $(".adjalauto-olAd").remove();
    $(".clearfix.floatR").remove();
    
    global.frm = [];
    adParams = {};
    
    redirector_url = "";
    
    
    var content = linkify(GibberishAES.dec($("#hide").text(), _decrypt.hash));
    
    $("#hide").html(content);
    $("#hide").slideDown();
    
    
})();