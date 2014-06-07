// ==UserScript==
// @name StackExchange review queue count on home page
// @namespace http://ostermiller.org/
// @version 1.06
// @description Show the number of items that are in the review queue and available for you to review on the home page of any Stack Exchange site.
// @match http://*.stackexchange.com/*
// @match http://*.askubuntu.com/*
// @match http://*.superuser.com/*
// @match http://*.serverfault.com/*
// @match http://*.stackoverflow.com/*
// @match http://*.answers.onstartups.com/*
// @grant none
// ==/UserScript==
if (/\.com\/(\?.*)?$/.exec(window.document.location.href)){ // only on the home page
    $.ajax({
        type:'GET',
        url: 'http://' + window.document.location.hostname + '/review',
        dataType:'html',
        success:function (content) {            
            var total=0,matcher=/dashboard-count\"\>\s*\<div class\=\"dashboard-num\" title=\"([0-9]+)/gim,match;
            while (match=matcher.exec(content))total+=parseInt(match[1].replace(/,/g,''));
            if (total>0){
                var revlink=$('.topbar-menu-links a[href="/review"]');
                if (revlink.length == 0) revlink=$('.topbar-menu-links a[href="/review/"]');
                if (revlink.length > 0){
                 	revlink.html("review "+total).css('color','orange');
                } else {
                    $('.topbar-menu-links').prepend('<a id=reviewcountlink href="/review">review '+total+'</a>');
                    $('#reviewcountlink').css('color','orange');
                }
            }
        }
    });
}