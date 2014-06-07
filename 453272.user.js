// ==UserScript==
// @name       Github PR Bubble Up
// @namespace  https://github.com/
// @version    0.1
// @description  Open pull requests are bubbled up, closed requests are bubbled down; default monthly period
// @match      https://github.com/*
// ==/UserScript==

$(window).load(function() { 

    $("#period_monthly").click();
    
    var prList = $(".contribution-pulls-list").children();
    prList.each(function(index, element) {
        var elementJqueryObject = $(element);
        var prState = elementJqueryObject.find(".state").text();
        
        if (prState === "proposed") {
            elementJqueryObject.prependTo($(".contribution-pulls-list"));
        } else if (prState === "closed") {
            elementJqueryObject.appendTo($(".contribution-pulls-list"));  
        }
    });
        
});