// ==UserScript==
// @name       Lot better UVA
// @namespace  http://cosmiccreations.com/
// @version    0.1
// @description  UI filter for UVA
// @match      http://uva.onlinejudge.org/*
// @copyright  2012+, Akshay Vats
// @require http://code.jquery.com/jquery-latest.js
// ==/UserScript==
$(function() {
  $('#header').remove();
    var links = $("#col3_content_wrapper table a img");
            for (var i = 0; i < links.length; i++) {
                $but = $("<button style='padding:5px'></button>");
                $but.html($(links[i]).attr('alt'));
                $(links[i]).parent().append($but);
                $(links[i]).remove();
                
            }
    $root = $($("#col3_content_wrapper table a")[0]);
    $sub=$root.clone();
    $sub.html('My Submissions');
    $sub.attr('href', 'http://uva.onlinejudge.org/index.php?option=com_onlinejudge&Itemid=9');
    $root.parent().append('<span> | </span>');
    $root.parent().append($sub);
    $iframe=$("#col3_content_wrapper iframe");
    $iframe.height($iframe.contents().find("html").height());
    $('#col1').remove();
    $('#col3').css('margin', 0);
    $('#col3').css('border', 0);
});
