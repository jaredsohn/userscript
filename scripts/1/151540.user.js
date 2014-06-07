// ==UserScript==
// @name         Ikariam timerwood
// @autor        snet metnee
// @namespace    ikariam
// @version      0.1
// @icon         http://us.ikariam.com/favicon.ico
// @description  timer
// @downloadURL  https://userscripts.org/scripts/source/151540.user.js
// @updateURL    https://userscripts.org/scripts/source/151540.meta.js
// @include      http://*.*.ikariam.*/*
// @exclude      http://board.ikariam.*/*
// ==/UserScript==

var $ = unsafeWindow.jQuery;
if($('body').attr('id')=='city')
{
     
    var a_wood = $('#js_GlobalMenu_resourceProduction').html();  
     
    setInterval(function() {
        
        $("#ikaeasy_builds div[class='wood ikaeasy_red']").each(function () {
            
            
        var needwood = $($(this).children('.ikaeasy_tooltip_center')[0]).html().replace(',','')*(-1); 
           
            var asd = $($(this).parents().get(1));
            if($($(asd).children('span')[0]).length==0){                
                $(asd).append("<span></span>");
            }
            var pole = $($(asd).children('span')[0]);
            $(pole).css("color","#fff");
            
           var hour = Math.floor(needwood/a_wood);
           var day = Math.floor(hour/24)+'d_'+parseInt(Math.floor(hour/24)-hour/24)*(-24);
           var min = parseInt((Math.floor(needwood/a_wood)-needwood/a_wood)*(-60));
           
            $(pole).text((hour>24?day:hour)+"h_"+min+"min");
        });
    }, 1000);    
}