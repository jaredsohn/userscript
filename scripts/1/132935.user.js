// ==UserScript==
// @name           Sort by Votes @ stackoverflow.com
// @namespace      http://weibo.com/kevpp
// @include        http://stackoverflow.com/*
// @require	       http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// ==/UserScript==

var sortlist = function(list, key, asc){
    asc = typeof asc !== 'undefined' ? asc : true
    $(list).html(function(){
        return $(this).children().sort(function(x, y){
            return [x, y].map(function(e){
                return parseInt($(key, e).text().replace(/[^-+0-9.]/g, ''))
            }).reduce(function(i, j){
                return asc ? i-j : j-i
            })
        })
    })
}

var clicksort = function(btn, list, key){
    $(btn).unbind('click').click(function(){
        var asc = $(this).attr('asc') == 'true' ? true : false
        sortlist(list, key, !asc)
        $(this).attr('asc', !asc)
        return false;
    })
}

var url = window.location;

if($('#hlogo').length) {
    $('#hlogo').attr('title', 'click me to sort by votes')

    if(/^http:\/\/stackoverflow\.com\/(\?.*)?$/.test(url)) {
        clicksort('#hlogo', '#question-mini-list', '.votes .mini-counts')
    } else if(/^http:\/\/stackoverflow\.com\/(questions|search|unanswered)/.test(url)) {
        clicksort('#hlogo', '#questions', '.vote-count-post strong')
    } else {
        $('#hlogo').removeAttr('title')
    }
}




