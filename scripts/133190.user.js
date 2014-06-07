// ==UserScript==
// @name            Ikariam Buildings Level
// @autor           genes
// @contact         rogelio.meza.t(at)gmail(dot)com	
// @description     Script for Ikariam. Show building level.
// @include         http://s*.ikariam.com*
// @version         1.1
// @exclude         http://board.ikariam.*/*
// @exclude         http://support*.ikariam.*/*
// @require         http://code.jquery.com/jquery-latest.min.js
// @require         http://userscripts.org/scripts/source/133081.user.js
// ==/UserScript==

BL = function (){

    this.wood = parseInt($('#js_GlobalMenu_wood').html().replace(",",""));
    this.wine = parseInt($('#js_GlobalMenu_wine').html().replace(",",""));
    this.marble = parseInt($('#js_GlobalMenu_marble').html().replace(",",""));
    this.sulfur = parseInt($('#js_GlobalMenu_sulfur').html().replace(",",""));
    this.crystal = parseInt($('#js_GlobalMenu_crystal').html().replace(",",""));
    
    this.isUpgradeable = function(resources){
        
        for(value in resources){
            if(resources[value] < 0){
                return false;
            }
        }
        
        return true;
    };
    
    this.showLevels = function(){
    
        wood = this.wood;
        wine = this.wine;
        marble = this.marble;
        sulfur = this.sulfur;
        crystal = this.crystal;
        
        isUpgradeable = this.isUpgradeable;
        
        $(".building").not(".buildingGround, .constructionSite").each(function(){
            var building = $(this).attr("class").split(" ")[1];
            var level = $(this).attr("class").split(" ")[2].match(/\d+/);
            var bgColor = "#ccc";
            
            var resources = {};
            var appHtml;
            
            if(Buildings_levels[building].length == level-1){
                bgColor = "#555";
                appHtml = "";
            }
            else{
                for(key in Buildings_levels[building][level-1]){
                    resources[key] = eval(key) - Buildings_levels[building][level-1][key];                    
                }
                
                if(isUpgradeable(resources)){
                    bgColor = "#0a0";
                }
                else{
                    bgColor = "#a00";
                }
                
                appHtml = '<div id="b_tip" style="z-index:1000; position:absolute; width:80px; font-size:10px; text-align:right; padding:5px; font-weight:lighter; background-color:#fae0ae; border:1px solid #e4b873;">';
                for(key in resources){
                    if(resources[key] < 0){
                        fColor = "#ff0000;";
                    }
                    else{
                        fColor = "#542c0f;"
                    }
                    appHtml += '<span style="display:block;color:'+fColor+'"> <img src="skin/resources/icon_'+key+'.png" style="height:12px; padding-right:5px;"/>'+resources[key]+'</span>';
                }
                appHtml += '</div>';
                
            }
            
            
            var style = 'border:1px solid #ddd; padding-top:3px; font-weight:bold; color:white; cursor:pointer; position:absolute; z-index:1000; height:17px; width:20px; text-align:center; left:66px; top:23px; -webkit-border-radius: 10px; -moz-border-radius: 10px; border-radius: 10px; background-color:'+bgColor+';';
            
            $('a', this).after('<span id="level" style="'+style+'">'+level+'</span>');
            
            $('#level', this).mouseover(function(e){
                $(this).append(appHtml);
            }).mouseout(function(){
                $(this).children("#b_tip").remove();
            });
                        
        });
    };
};

$(document).ready(function(){
    var bl = new BL();
    bl.showLevels();
});
