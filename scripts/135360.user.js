// ==UserScript==
// @name           TMF-BYPASS
// @namespace      Max789
// @description    Bypass takemyfile.com link protection
// @include        http://tmf.myegy.com/*
// @version        1.6
// ==/UserScript==

(function(){
    var n=location.pathname;
    document.title = "TakeMyFile Bypasser -max789-";
    var secondpage= /2-ar.php/;
    var x= n.search(secondpage);
    function getHTMLSource (url) {
        var xhr = new XMLHttpRequest();
        xhr.open("get",url,false);
        xhr.send(null);
        var httpQuery = " ";
        httpQuery =" " + xhr.responseText;
        window.stop();
        n = httpQuery.slice((httpQuery.indexOf("NewWindow('")+11),httpQuery.indexOf("','name'"));
        location.href = n;
    }
    if (x == -1) {
        var p=location.href;
        var p=p.split("?id=")[1];
        n = "http://tmf.myegy.com/2-ar.php?id="+p;
        getHTMLSource(n);
    }else{
        var l=document.getElementsByName('groovybtn1')[0];
        var s = l.getAttribute('onclick');
        s= s.split("(\'")[1];
        s= s.split("\',\'")[0];
        location.href = s;  
    }//end else

}());//End Self-Invoking Function