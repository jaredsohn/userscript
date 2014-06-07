// ==UserScript==
// @name        Remove Blog Advertisement
// @version     1.1
// @namespace   http://blog.wu-boy.com
// @description Remove Ptt Rambo and MJ NBA Blog Advertisement
// @homepage    http://blog.wu-boy.com
// @include     http://blog.xuite.net/*
// @include     http://nbafilm.enjoy101.org/*
// @include     http://nba-film.appspot.com/*
// @include     http://sview.zxq.net/*
// @include     http://*.dum6.us/*
// @include     http://*.dum6.info/*
// ==/UserScript==

(function(){

    var ad_regex = /.*(btnibbler|googleads|ads|blogad|bloggerads).*/; 
    var ValidateRegEx = function(regex, value) {
        return (regex.test(value)) ? true : false;
    };

    var remove_script = function(){
        $('script, iframe, embed, object').each(function(index) {
            if(ValidateRegEx(ad_regex, $(this).attr("src")) || ValidateRegEx(ad_regex, $(this).attr("data")))
            {
                $(this).parent().remove();
            }
        });
        setTimeout(remove_script, 2000);   
    };

    var remove_ad = function(res){
        eval(res.responseText);
        // for blog.xuite.net
        $('.customSide, .LoveLinkSide, #articleExt_relate_ads').remove();
        remove_script();
        console.log("load script");
    };

    // Load jQuery 1.7.1
    GM_xmlhttpRequest({
        method: 'GET',
        url: 'http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js',
        onload: remove_ad
    });
})();