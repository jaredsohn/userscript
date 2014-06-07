//html body div div div div div div div div div div div div div div div div div div div div div div form div div div ul
// ==UserScript==
// @name          Shrink RDN Header
// @namespace     http://www.rainbowdash.net
// @description   Remove extra garbage from Rainbow Dash Network
// @include       http://*rainbowdash.net/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @version       1.0
// @icon          https://mail.google.com/mail/images/favicon.ico
// ==/UserScript==

jQuery(function(){
        jQuery(function(){
        menus = jQuery("#form_notice").remove()
        menus.css('width','50%')
        jQuery('.logo').css('width', '100px')
        menus.insertAfter('#site_contact')
        jQuery('#notice_data-text').css('height','30px')
        menus = jQuery("#site_nav_global_primary").remove()
        menus.css('float','left')
        //jQuery('#site_nav_local_views').remove()
        menus.prependTo('#header')
        jQuery('#site_notice').remove()
        })
    })
