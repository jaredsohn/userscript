// ==UserScript==

// @name Sit back and relax
// @namespace Pete B_ZB
// @description Adds a search button to search for duplicate reports
// @include http://if.invisionfree.com/*

// ==/UserScript==
var $ = unsafeWindow.jQuery, main_url = unsafeWindow.main_url;



$(function() {
    var boardurl = $("td.c_post a").attr("href");
    var d = new Date();
    var day = d.getDate();
    var month = d.getMonth();
    var year = d.getFullYear();
    var zbmonth = month + 1;
    var modurl = new Array();
    modurl = boardurl.split('/');
if ($('thead th:contains("z1")').length > 0) {
var finalurl3 = main_url + 'search/?c=1&q=' + modurl[4] + '&type=post&sort=desc&forum[]=-1&s_m=9&s_d=15&s_y=2002&e_m=' + zbmonth + '&e_d=' + day + '&e_y=' + year;
        $("#nav:contains('Lurk Hole')").parents("body").find("thead th").append("<a href=" + finalurl3 + ">Search For Duplicates</a>");
    } else if ($('thead th:contains("zetaboards"),thead th:contains("invisionfree")').length > 0) {
        var finalurl2 = main_url + 'search/?c=1&q=' + modurl[3] + '&type=post&sort=desc&forum[]=-1&s_m=9&s_d=15&s_y=2002&e_m=' + zbmonth + '&e_d=' + day + '&e_y=' + year;
        $("#nav:contains('Lurk Hole')").parents("body").find("thead th").append("<a href=" + finalurl2 + ">Search For Duplicates</a>");
    } else if ($('thead th:contains("http://")').length > 0){
        var finalurl1 = main_url + 'search/?c=1&q=' + modurl[2] + '&type=post&sort=desc&forum[]=-1&s_m=9&s_d=15&s_y=2002&e_m=' + zbmonth + '&e_d=' + day + '&e_y=' + year;
        $("#nav:contains('Lurk Hole')").parents("body").find("thead th").append("<a href=" + finalurl1 + ">Search For Duplicates</a>");
    }
        $("thead th a:not('.search_results_post thead th a')").addClass("btn_fake");

        $("thead th a:not('.search_results_post thead th a')").css('color','#666');

});
