// ==UserScript==
// @name       TMU SI
// @namespace  http://ultra.trophymanager.com/club/24641
// @version    1.0.4
// @description  show SI in TMU Player page
// @match      *://ultra.trophymanager.com/players*
// @copyright  Never Lose
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript==

$ = unsafeWindow.$;

$.browser.chrome = /chrom(e|ium)/.test(navigator.userAgent.toLowerCase()); 

$(function(){
    showSI();
    showPlayerSI();
    
    $("#sq").on("click", "table > tbody > tr.header > th:not(.si)", function(){
    	showSI();
    });
    
    $("[id^='filter_']").click(function(){
    	showSI();
    });
    
    function showSI(){
        $("#sq div.position").css("width","55px");
    	$("#sq th.rec,#sq div.rec").css("width","80px");
    	$("#sq tr.header").append("<th class='si' style='width:40px;'>SI</th>");
        
        if($.browser.mozilla){
            $("#sq > table > tbody > tr:not(.header):not(:has(td.splitter))").each(function(){
                var favposition = $(this).find(".favposition").text();
                var skills = 0;
                
                $(this).find("div.skill").each(function(){
               		var skill = parseInt($(this).text());
                    
                    if(isNaN(skill)){
                    	skill = parseInt($(this).find("img").attr("tooltip"));
                    }
                    
                    skills += skill;
				});
                
                if(favposition == "Gk"){ skills = parseInt(skills / 11 * 14) }
                
                var newPow = 6.9519770543;
                var newDiv = 199873144100.3349484929416253;
                
                var si = parseInt(Math.pow((skills / 5), newPow) / newDiv);  
                
                $(this).append("<div style='text-align:right;'>" + si + "</div>");
            });
        } else if ($.browser.chrome){
            $("#sq > table > tbody > tr:not(.header):not(:has(td.splitter))").each(function(){
                var playerId = $(this).find("div.name a").attr("player_link") || 0;
                var si = 0;
                
                players_ar.forEach(function(data){
                    if(data.id == playerId) { 
                        si = data.asi; 
                        return;
                    }
                });
                
                var favposition = $(this).find(".favposition").text();
                var recSkills = 0;
                var i = 0;
                
                $(this).append("<div style='text-align:right;'>" + si + "</div>");
            });
        } else {
            alert("sorry, this browser not supported at the moment");
        }
    };
    
    function showPlayerSI(){
        var favposition = $(".favposition").text();
        var skills = 0;
        var recSkills = 0;
		var i = 0;
        
        $("table.skill_table:eq(0) tbody td.align_center").each(function(){
            var skill = parseInt($(this).text());
            
            if(isNaN(skill)){
                if($(this).find("div").hasClass("icon_gold_star")){
                	skill = 100;
                } else {
                	skill = 99;
                }
                
            	//skill = parseInt($(this).find("img").attr("tooltip"));
            }
           	
            skills += skill;
        });
        
        if(favposition == "Goalkeeper"){
        	skills = parseInt(skills / 11 * 14);
        }
        
        var newPow = 6.9519770543;
        var newDiv = 199873144100.3349484929416253;
        
        var si = parseInt(Math.pow((skills / 5), newPow) / newDiv);  

        var td = $("table.info_table tbody tr:eq(6) td:eq(1)");
        
        td.append(" | " + si);
    };
});