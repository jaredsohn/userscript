// ==UserScript==
// @name           Google Hidari Uzai
// @namespace      http://gigi-net.net
// @include        http://www.google.co.jp/search?*
// ==/UserScript==
(function(d, func) {
    var check = function() {
        if (typeof unsafeWindow.jQuery == 'undefined') return false;
        func(unsafeWindow.jQuery); return true;
    }
    if (check()) return;
    var s = d.createElement('script');
    s.type = 'text/javascript';
    s.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.4.1/jquery.min.js';
    d.getElementsByTagName('head')[0].appendChild(s);
    (function() {
        if (check()) return;
        setTimeout(arguments.callee, 100);
    })();
})(document, function($) {
    var visible =true;
    var main =$("#center_col");
    var side = $("#leftnav");
    function toggleSidebar(flag,anime){
        if(anime){
            side.toggle(300);
        }else{
            side.toggle(0);
        }
        if(flag){
            var style = {
                "margin-left":"159px",
                "margin-right":"264px",
                "padding":"0 8px",
                "border-left":"1px solid #d3e1f9",
                "clear":"both"
            }; 
            var mes = "サイドバーを隠す";
        }else{
            var style = {
                "margin-left":"15px",
                "margin-right":"264px",
                "padding":"0 8px",
                "border-left":"0px",
                "clear":"both"
            };
            var mes = "サイドバーを表示する";
        }
        $("#sideToggle > a").text(mes);
        visible =!visible;
        main.css(style);
    }
    main.prepend("<div id='sideToggle'><a href='javascript:'>サイドバーを表示する</a></div>");
    var toggle = $("#sideToggle");
    toggleSidebar(false,false);
    side.dblclick(function(){
        toggleSidebar(false,true);
        visible = false;
    });
    toggle.click(function(){
        toggleSidebar(!visible,true);
    });
});
