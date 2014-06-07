// ==UserScript==
// @name       Runkeeper - Duplicate Existing Route
// @namespace  http://www.slowzombie.com/
// @version    0.1
// @description  Adds support for duplicating a route based on an existing one.
// @match      http://runkeeper.com/*
// @copyright  2012+, Sean Bischoff
// ==/UserScript==

var routeLinks = $(".nav-pills.routes li a");
if(routeLinks.length > 0){
    
    $(routeLinks).each(function(index,value){
        var aVal = $(value).attr("href").split("/");
        $("<a href='/new/route?deriveFromRoute=" + aVal[aVal.length - 1] + "' style='font-size:9px; background-color: #E7FEDC'> >> Dup " + this.innerHTML + "</a>").insertAfter( $(this) );
    });
} else {
    //("no route links found on this page");
}
