// ==UserScript==
// @name                Friendfeed rtl Maker
// @description         Make right to left comment and feed
// @author		Daniel
// @Version             0.1
// @include             *friendfeed.com*
// @require             http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

    unsafeWindow.rtl_button = '<a class="rtl_button" style="float:right;margin:0px 5px;" href="#" onmouseover="$(this).parent().css(\'background\',\'#FCFFD6\')" onmouseout="$(this).parent().css(\'background\',\'none\')" onclick="if(!$(this).parent().hasClass(\'rtl\')){$(this).parent().addClass(\'rtl\');$(this).parent().css(\'direction\',\'rtl\');$(this).parent().css(\'text-align\',\'left\');}else{$(this).parent().removeClass(\'rtl\');$(this).parent().css(\'direction\',\'ltr\');$(this).parent().css(\'text-align\',\'left\');};return false;"><img src="http://m.friendfeed-media.com/e2942f1692b6dafd108dc39bbdea70ef22ff6a1a" alt="RTL" style="vertical-align:middle" /></a>';
    unsafeWindow.gen_button = '<a id="ffrtl_generator" href="#" style="padding:10px;border:1px solid #000;background:#fff;position:fixed;top:1px;left:1px;" onclick="$(\'.text:not(:has(.rtl_button))\').append(rtl_button);$(\'.content:not(:has(.rtl_button))\').append(rtl_button);return false;" > RTL </a>';
    
        
    (function(){
        __ffrtl_do();
    })();


    function __ffrtl_do() {
        
        $('.text:not(:has(.rtl_button))').append(unsafeWindow.rtl_button);
        $('.content:not(:has(.rtl_button))').append(unsafeWindow.rtl_button);
        $('body').append(unsafeWindow.gen_button);
        
        
    }
    
    
    
    
    