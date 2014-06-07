// ==UserScript==
// @name        hatebuoldinterface
// @namespace   com.imaiworks.hatebuoldinterface
// @description hatebu old interface
// @include     http://b.hatena.ne.jp/entrylist*
// @include     http://b.hatena.ne.jp/hotentry*
// @version     3
// ==/UserScript==

(function(d, func) {
    var check = function() {
        if (typeof unsafeWindow.jQuery == 'undefined') return false;
        func(unsafeWindow.jQuery); return true;
    }
    if (check()) return;
    var s = d.createElement('script');
    s.type = 'text/javascript';
    s.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js';
    d.getElementsByTagName('head')[0].appendChild(s);
    (function() {
        if (check()) return;
        setTimeout(arguments.callee, 100);
    })();
})(document, function($) {
    
    $("li.entry-unit").css("border-bottom-width","1px");
    $("li.entry-unit").css("border-left-width","0px");
    $("li.entry-unit").css("border-right-width","0px");
    $("li.entry-unit").css("border-style","solid");
    $("li.entry-unit").css("margin-bottom","10px");
    $("li.category").css("font-size","0.8em");
    $("li.date").css("padding-left","5px");
    $("a.category").css("padding","3px 6px");
    $("a.category").css("color","#ffffff");
    

    $(".entry-vertical-3").attr("class","");
    $(".entry-vertical-4").attr("class","entrylist-track-target");
    $(".hb-entry-link-container").css("fint-size","1em");
    $(".thumbnail").find("img").css("max-width","100px");
    $(".thumbnail").css("float","right");
    $(".entry-data").css("float","left");


    $("ul.users").css("display","none");
    $("ul.users").css("float","left");
    

    
    $(".entry-contents").css("width","750px");
    $(".entry-contents").css("float","left");
    $(".hb-entry-link-container").css("clear","left");
    $(".hb-entry-link-container").css("width","600px");
    
    $("blockquote").css("clear","left");
    $("blockquote").css("width","600px");
    $("blockquote").css("font-size","0.7em");
    
    $(".entry-link").css("font-size","0.8em");
    
    $(".entry-meta").css("clear","left");
    $(".entry-meta").css("padding-left","1px");
    $(".entry-meta").css("width","600px");
    
    $("li.category").css("float","left");
    $("li.category").css("clear","left");
    $(".shim-elem-for-height").css("display","none");


       
    $("li.entry-unit").each(function(){
        var href= $(this).find("a").attr("href");
        var html= $(this).find("a").find("span").html();
        
        $(this).find("ul.entry-meta").append("<div><a href="+href+" ><img src=http://cdn-ak.b.st-hatena.com/images/append.gif></a> <a href="+href+" >"+html+"</a></div>");
    });
    
    
    
});