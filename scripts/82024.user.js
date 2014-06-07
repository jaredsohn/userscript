// ==UserScript==

// @name           Google Reader - optimize for small screens

// @description    Removes some unnecessary Google Reader elements, and improves small screen reading (netbooks)

// @namespace      http://skss.learnfree.eu/

// @include        http://www.google.com/reader*

// @include        https://www.google.com/reader*

// @require 	   http://ajax.googleapis.com/ajax/libs/jquery/1.3.1/jquery.min.js

// ==/UserScript==



function hideall(){

    jQuery("#gb").hide();

    jQuery("#global-info").hide();

    jQuery("#logo-container").hide();

    jQuery("#chrome-header").hide();

    jQuery("#viewer-footer").hide();

    jQuery("#main").css("top", "0px");

    jQuery("#search").hide();

    jQuery("#recommendations-tree-container").hide();

    jQuery("#friends-tree-container").hide();

    jQuery("#lhn-add-subscription-section").hide();

    jQuery("#lhn-selectors").hide();

    jQuery("#lhn-friends").hide();

    jQuery("#top-bar").hide();

    jQuery("#search").hide();

    jQuery('#viewer-header').css({'height':40});
    jQuery('#viewer-header').css({'margin-top':-3});
    

}



hideall();