// ==UserScript==
// @name           Bazaar.tf backpack link changer
// @version        1.2
// @description    whoa
// @include        http://bazaar.tf/profiles/*
// @include        http://bazaar.tf/
// @include        http://bazaar.tf/trade/*
// @require        http://code.jquery.com/jquery-latest.min.js
// @run-at         document-end
// ==/UserScript==

$(document).ready(function(){
	
    var url = window.location.href;
    if (url.indexOf("/profiles/") >= 0) {
        var bLink = window.location.href;
        var myarr = bLink.split("tf/");
        var backpack_link = 'http://backpack.tf/' + myarr[1];
        $('.icon-briefcase').parent().attr('href', backpack_link);
    } else if (url.indexOf("/trade/")) {
        //var bLink = $('h3.trade-author a').attr('href');
        //var backpack_link = 'http://backpack.tf' + bLink;
        //$('.trade-notes .icon-briefcase').parent().attr('href', backpack_link);
        var links = $('.icon-briefcase').parent();
        links.each(function() {
            var link = $(this).attr('href');
            var link_arr = link.split('/');
            $(this).attr('href', 'http://backpack.tf/id/' + link_arr[2]);
        });
    }

});
