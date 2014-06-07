// ==UserScript== 
// @name IMT-TEST
// @version 1.2
// @description  IMT-TEST 
// @copyright imt 
// @include http://a.klmaya.info/*
// @include http://*.maya*.*:*/*
// @require http://code.jquery.com/jquery-2.1.0.min.js
// ==/UserScript==

$(document).ready(function() {
var url =location.href; 
var dhost=location.hostname.replace(/\w+\./,'');
if(dhost=="klmaya.info"){ 
     $("head").empty();
    if(url.indexOf("forumdisplay")>0){
        var form= $("form"); 
        var div= form.next("div"); 
        var rows= form.find("a[href^='viewthread.php?']");
        $("body").html("");
        rows.each(function(){
            var t = $(this).text();
            if(t.match(/bt/gi)){
                $("body").append($('<div/>').append($(this)));
            }
        });
        
        $("body").append(div);
    }else{
        $("body").html( $("form").find("td")[1]);
        $("body").find("img").removeAttr("onload").removeAttr("onmouseover").removeAttr("onclick").removeAttr("onmousewheel");
    }
}
});