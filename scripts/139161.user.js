// ==UserScript==
// @name        bucket-debug
// @namespace   http://userscripts.org/users/478083
// @include     *.taobao.com/*
// @require     http://code.jquery.com/jquery.min.js
// @version     1
// ==/UserScript==

jQuery.noConflict();
(function($){
    function in_array(a,b){
        for (var i = 0; i < b.length; i++) {
            if (b[i] == a)  
                return true;
        }
        return false;
    }
    $(document).keydown( function (e) {
        var url=window.location.href;
        url=url.replace(/#(.*)/,"");
        var bid,newurl;
        var reg = /&bucket_id=[\d]+/;
        var a=[48,49,50,51,52,53,54,55,56,57];
        if(e.ctrlKey && e.altKey && in_array(e.keyCode,a)){
            bid=e.keyCode-48;
            if(bid==0) bid=10;
            location.href=url.replace(reg,"")+"&bucket_id="+bid;
        }else if(e.altKey && in_array(e.keyCode,a)){
            bid=e.keyCode-48;
            if(bid==0) bid=10;
            bid+=10;
            location.href=url.replace(reg,"")+"&bucket_id="+bid;
        }else if(e.altKey && e.keyCode==68){
            location.href=url.replace(/&debug=true/,"")+"&debug=true"
        }else if(e.altKey && e.keyCode==78){
            location.href=url.replace(/&nocache=true/,"")+"&nocache=true"
        }
    });
})(jQuery);