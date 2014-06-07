// ==UserScript==



// @name Search board's ticket history
// @namespace Pete B_ZB

// @description ^^
// @include http://if.invisionfree.com/*



// ==/UserScript==
var $ = unsafeWindow.jQuery, main_url = unsafeWindow.main_url;

$(function() {
    var boardnam = $("#topic_viewer thead tr th small").text();
    var d = new Date();
    var day = d.getDate();
    var zbmonth = d.getMonth() + 1;
    var year = d.getFullYear();
    var modurl = new Array();

    modurl = boardnam.split(' [');
var finalurl = main_url + 'search/?c=1&q='+ modurl[0] +'&type=post&sort=desc&forum[]=-1&s_m=9&s_d=15&s_y=2002&e_m=' + zbmonth + '&e_d=' + day + '&e_y=' + year;
        $("#nav:contains('Tickets')").parents("body").find("#topic_viewer thead th").append("<a href=" + finalurl + ">Support History</a>");
        $("thead th a").addClass("btn_fake");

        $("thead th a").css('color','#666');
});