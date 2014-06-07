// ==UserScript==
// @name       Undistract Mode for TFS 2013 
// @namespace  http://gurianov.com/userscripts
// @version    0.1.5
// @description  Adds a toggle instead off TFS logo that hides some toolbars
// @match      https://*/tfs/*
// @run-at document-end
// @copyright  2013, Alexey Gurianov
// ==/UserScript==
(function (window, undefined) {
    var w;
    if (typeof unsafeWindow != undefined) {
        w = unsafeWindow
    } else {
        w = window;
    }
    if (w.self != w.top) {
        return;
    }
    $(".logo").hide();
    // $(".search-box").appendTo("#header-row").css("margin-top","5px"); for TFS 2012
    $(".search-box").prependTo("#header-row .right-side").css("margin-top","5px").css("float","left");
    
    var UNDISTRACT = localStorage.getItem("undistract");
    
    if (UNDISTRACT =="true"){
        undistract();
    } else {
        redistract();
    }
    
    function undistract() {
        $(".content-section").animate({top: 31});
        $(".right-hub-content").animate({top: 10});
        $(".tfs-tags").slideUp();
        $(".hub-title").hide();
        $("span.slash").text("▶");
        localStorage.setItem("undistract", "true");
    }
    
    function redistract() {
        $(".content-section").animate({top: 91});
        $(".right-hub-content").animate({top: 45});
        $(".tfs-tags").slideDown();
        $(".hub-title").show();
        $("span.slash").text("▼");
        localStorage.setItem("undistract", "false");
    }
    
    $("span.slash").click(function(){
        var UNDISTRACT = localStorage.getItem("undistract");
        if ($("span.slash").text() == "▼"){
            undistract();
        } else {
            redistract();
        }
    })
})(window);