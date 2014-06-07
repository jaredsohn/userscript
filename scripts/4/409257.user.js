// ==UserScript==
// @name           Pick 'n Pay
// @version        1.3
// @author         sob508
// @namespace      sob508
// @description    Make the site full-width, and the product images higher res, to make better use of space - hence easier to shop
// @downloadURL    http://userscripts.org/scripts/source/409257.user.js
// @updateURL      http://userscripts.org/scripts/source/409257.meta.js
// @grant          none
// @include        https://shop.pnp.co.za/*
// ==/UserScript==

$(document).ready(function(){
    
    $(window).resize(function(){
        
        /* Main Area */
     
       	if( $("#workarea").length ){
           
           var right_margin = 40;
           //$(".rightNav").outerWidth(true);
           
           var main_area_width = $(window).width() - $(".leftNav").outerWidth(true) - right_margin;
           
           $("body").css({
               "width": $(window).width() - right_margin + $(".rightNav").outerWidth(true) + "px",
               "padding-left": right_margin/2 + "px",
               "padding-right": right_margin/2 + "px"
           });
           
           $(".mainContainer, .trolleyPaginationContainer").css({
               "width": main_area_width - 20 + "px"
           });
           
           $(".header .mainNavContainer, .header").css({
               "width": $(window).width() - right_margin + "px"
           });
           
           $("#workarea").css({
               "width": main_area_width + "px"
           });
           
           /*
           $(".mainContainer, .trolleyPaginationContainer").css("box-shadow", "0 0 1px red inset");
           $(".header .mainNavContainer, .header").css("box-shadow", "0 0 1px green inset");
           $("#workarea").css("box-shadow", "0 0 1px blue inset");
           $("body").css("box-shadow", "0 0 1px orange inset");
           */
           
           
           //Product Pods
           
           var pod_size = main_area_width/5 - 16;
           
           $(".productContainer").css({
               "width": pod_size + "px"
           });
           
           var original_proportion = .83
           
           $(".mainContainer .productContainer_imageTable").css({
               "height": pod_size + "px"
           });
           
            $(".mainContainer .productContainer_imageTable table").css({
                "height": "100%"
            });
           
           $(".mainContainer .productContainer_imageTable img").css({
               "height": pod_size - 20 + "px",
               "max-height": pod_size * original_proportion - 40 + "px",
           });
           
           $(".mainContainer .productContainer_imageTable img").each(function(){
               $(this).attr("src", $(this).attr("src").replace("small","large") );
           });
     
     }
        
    }).resize();
    
    $("body").append("<div class='back-to-top-button'>&#8593;</div>");
    $(".back-to-top-button")
    .css({ "position": "fixed", "bottom": "20px", "left": "20px", "cursor":"pointer", "font-size": "16px", "background": "#FFF", "padding": "7px 16px 11px", "border-radius": "3px", "border": "1px solid rgba(0, 0, 0, 0.28)", "box-shadow": "0 1px 2px rgba(0, 0, 0, 0.07)" })
    .click(function(){
    	$('html,body').animate({ scrollTop: 0 }, 'slow');
    })
    
});
