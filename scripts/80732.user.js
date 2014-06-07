// ==UserScript==
// @name           Hot, Cute or Okay? Improved
// @description    Add improvements to Hot, Cute or Okay?.
// @author         Sebastian Paaske Tørholm
// @namespace      http://mathemaniac.org
// @include        http://apps.facebook.com/hotcuteokay/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.4/jquery.min.js
// @version        1.1.2
// ==/UserScript==

(function() {
    // Remove requests to publish questions/answers to wall
    if ($("iframe[src *= 'Questions.aspx']").length > 0) {
        location.reload(true);
        return;
    }

    if (location.href.indexOf('page=rate') > -1) {
        // Hide Woo Me links
        $("a[href *= 'hotcuteorokay.com/woome']").remove();
        $("a[href *= 'action=rate&value=skip']").prev().remove();

        // Add profile links to names
        var img_src = $('div.nameAndPic > img')[0].src;

        var match = img_src.match(/fbcdn.*\/n(\d+)_\d*\.\w+$/);
        if (match == null) match = img_src.match(/fbcdn.*?\/\d*_(\d+)_\d+_n\.\w+$/);
        if (match == null) match = img_src.match(/hotcuteorokay.*\/(\d+)-final/);
        
        var id = match[1];
        
        $('div.nameAndPic > span.rndName').wrapInner('<a href="http://www.facebook.com/profile.php?id='+id+'" />');
    }
})();