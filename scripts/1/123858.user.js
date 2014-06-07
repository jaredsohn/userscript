// ==UserScript==
// @name       jc youtube script
// @namespace  http://jc.at.home/
// @version    0.1
// @description  some url visited , has spec color
// @include    http://www.youtube.com/*
// @require        http://192.168.10.15/files/jquery-1.6.1.min.js
// @copyright  2011+, You
// ==/UserScript==


GM_addStyle(".jc_url:visited { color: red; }");


function doJcVisitedUrl() {
    var amark = '█';
    var patt1 = /(\/watch\?v=.*?)(&|$)/i;
    
    var acount = 0;
    $('a').each(function() {
        var aurl = $(this).attr('href');
        var matches = aurl.match(patt1);
        if (null != matches) {
            var match1 = matches[1];
            var ahtml = '<span>';
            ahtml += '<a href="' + match1 + '" class="jc_url">' + amark + '</a>';
            ahtml += '<a href="' + match1 + '&feature=related" class="jc_url">' + amark + '</a>';
            ahtml += '<a href="' + match1 + '&hd=1" class="jc_url">' + amark + '</a>';
            ahtml += '<a href="' + aurl + '" class="jc_url">' + amark + '</a>';
            ahtml += '</span>';
            $(this).after(ahtml);
            acount++;
        }
    });
    
    //alert('match count = ' + acount);
}

$(document).ready(function() {
    
    window.setTimeout(function() {
        doJcVisitedUrl();
    } , 2000);
    
});