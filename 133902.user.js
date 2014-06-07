// ==UserScript==
// @name            Ikariam Buildings' Levels
// @autor           lionpi
// @contact         mdimit85(at)yahoo(dot)com
// @description     Script for Ikariam v0.5.9. Shows buildings' levels. Attaches a grey icon on each building which show its level. After changing town from drop down you need to click on Show Town for proper display.
// @include         http://s*.ikariam.gameforge.com/index.php?action=loginAvatar&*
// @include         http://s*.ikariam.gameforge.com/index.php?view=city&*
// @include         http://s*.ikariam.gameforge.com/index.php?*&function=changeCurrentCity&*
// @version         1.1
// @exclude         http://board.*.ikariam.*/*
// @exclude         http://support*.ikariam.*/*
// @grant           GM_addStyle
//
// @require         http://code.jquery.com/jquery-2.0.3.min.js
// ==/UserScript==

BL = function (){
    
    this.showLevels = function(){

        $(".building").not(".buildingGround, .constructionSite").each(function(){

            var level = $(this).attr("class").split(" ")[2].match(/\d+/);
            var bgColor = "#555";
            var style = 'border:1px solid #ddd; padding-top:3px; font-weight:bold; color:white; position:absolute; z-index:1000; height:17px; width:20px; text-align:center; left:0px; top:-23px; -webkit-border-radius: 10px; -moz-border-radius: 10px; border-radius: 10px; background-color:'+bgColor+';';
            
            $('a', this).after('<span id="level" style="'+style+'">'+level+'</span>');
                        
        });
    };
};

$(document).ready(function(){
    var bl = new BL();
    bl.showLevels();
});