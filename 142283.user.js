// ==UserScript==
// @name           1tool-BYPASS
// @namespace      Max789
// @description    Bypass http://1tool.biz link protection
// @include        http://1tool.biz/*
// @version        1.0
// ==/UserScript==
(function(){
    var n=location.pathname;
    document.title = "1tool Bypasser -max789-";
    var x= n.search('2.php');
    function getHTMLSource (url) {
        var xhr = new XMLHttpRequest();
        xhr.open("get",url,false);
        xhr.send(null);
        var httpQuery = " ";
        httpQuery =" " + xhr.responseText;
        window.stop();
        n = httpQuery.slice((httpQuery.indexOf("NewWindow('")+11),httpQuery.indexOf("','name'"));
        window.location = n;
        script_updater.update();
    }
    if (x == -1) {
        var p=location.href;
        var p=p.split("biz/")[1];
        n = "http://1tool.biz/2.php?id="+p;
        getHTMLSource(n);
    }else{
        var l=document.getElementById("cont");
        var s = l.getAttribute('onclick');
        s= s.split("('")[1];
        s= s.split("','")[0];
        window.location= s;  
    }//end else
}());//End Self-Invoking Function