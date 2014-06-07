// ==UserScript==
// @name        MC46-BattleManager
// @namespace   MC46-BattleManager
// @author      MC46
// @author	    MC46
// @version     Bellissimo bot per le battaglie di eRepublik!
// @include     http://www.erepublik.com/*/military/battlefield/*
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.8.1/jquery.min.js
// ==/UserScript==
     
(function Core() {
    
	window.confirm = function () { return true; }; //Disable Confirmation Box
    
	var Pos, DO, DOS, P, ourPoiPos, ePoiPos;
     
	Pos = document.getElementById("pvp_actions");
     
	$("#pvp_battle_area table:eq(0)").before('<table title="Influence To Get BH" style="width: auto; margin: 0 auto -25px; position: relative; top: 230px;"><tr><td><div id="InfluenceToBH" style="width: auto; height: 25px; display: block; cursor: default; position: relative;"><small style="font-size: 11px; color: white; float: left; text-shadow: #333 0px 1px 1px; display: block; height: 25px; opacity: 0.7; -moz-opacity: 0.7; -ms-fiter: \'progid:DXImageTransform.Microsoft.Alpha(Opacity=70)\'; filter: alpha(opacity=70); line-height: 25px; font-weight: bold; padding: 0 5px; background-image: url(\'/images/modules/pvp/influence_left.png?1321873582\'); background-position: left;">Influence To BH</small><strong id="InfNum" style="color: white; text-shadow: #014471 0px 1px 0px; float: left; display: block; height: 25px; font-size: 12px; line-height: 25px; padding: 0 5px; background-image: url(\'/images/modules/pvp/influence_right.png?1321873582\'); background-position: right;">0</strong></div></td></tr></table>');
     
	$("#pvp_battle_area table:eq(0)").before('<table title="Points TNR" style="width: auto; margin: 0 auto -25px; position: relative; top: 198px;"><tr><td><div id="PointsTNR" style="width: auto; height: 25px; display: block; cursor: default; position: relative;"><small style="font-size: 11px; color: white; float: left; text-shadow: #333 0px 1px 1px; display: block; height: 25px; opacity: 0.7; -moz-opacity: 0.7; -ms-fiter: \'progid:DXImageTransform.Microsoft.Alpha(Opacity=70)\'; filter: alpha(opacity=70); line-height: 25px; font-weight: bold; padding: 0 5px; background-image: url(\'/images/modules/pvp/influence_left.png?1321873582\'); background-position: left;">Points TNR</small><strong id="Ran" style="color: white; text-shadow: #014471 0px 1px 0px; float: left; display: block; height: 25px; font-size: 12px; line-height: 25px; padding: 0 5px; background-image: url(\'/images/modules/pvp/influence_right.png?1321873582\'); background-position: right;">0</strong></div></td></tr></table>');
            
	DO = document.createElement("input");
 	DO.setAttribute("type", "button");
   	DO.setAttribute("class", "addon");
	DO.setAttribute("id", "AvvioBot");
	DO.setAttribute("value", "Avvia Bot!");
	DO.setAttribute("title", "START BOT NOW!");
 	DO.style.color = "#ffffff";
	DO.style.marginLeft = "-485px";
	DO.style.marginTop = "-15px";
	Pos.appendChild(DO);
     
    DOS = document.createElement("input");
    DOS.setAttribute("type", "button");
    DOS.setAttribute("class", "addon");
    DOS.setAttribute("id", "StopBot");
    DOS.setAttribute("value", "Ferma Bot!");
    DOS.setAttribute("title", "STOP BOT NOW!");
    DOS.style.color = "#ffffff";
    DOS.style.marginLeft = "-375px";
    DOS.style.marginTop = "-15px";
    Pos.appendChild(DOS);
     
    P = document.createElement("button");
    P.setAttribute("class", "addon");
    P.setAttribute("id", "Vita");
    P.setAttribute("title", "Quanto manca per recuperare 10 di energia / Vita totale");
    P.setAttribute("disabled", "true");
    P.style.color = "#ffffff";
    P.style.width = "205px";
	P.style.marginLeft = "-485px";
	P.style.marginTop = "25px";
	Pos.appendChild(P);
			
	ourPoiPos = $("#blue_domination").after("<p id='ourPoiPos'></p>");
	ePoiPos = $("#red_domination").after("<p id='ePoiPos'></p>");
     
		window.onload = function () {
     
			setInterval(function () {
     
				$("#foodResetHoursContainer").hide();
				$("#limit_health_pop").hide();
				$("#health_warning").hide();
				$("#health_limit").hide();
				$("#gold_warning").hide();
				$("#no_food").hide();
				$("#total_damage").css("opacity", "1");
				$("#player_rank").css("opacity", "1");
				$("#blue_domination").css("opacity", "1");
				$("#red_domination").css("opacity", "1");
     
				var HealthV, P, recHealth, InfNum, FinAttHer, MYDamage, Res, minRan, xminRan, maxRan, xmaxRan, res, ran, ourPoi, ourPoiPos, ePoi, ePoiPos, final, efinal;
     
				HealthV = document.getElementById("foodResetHours").innerHTML;
     
				P = document.getElementById("Vita");
     
				recHealth = $(".tooltip_health_limit").html();
     
				P.innerHTML = HealthV + " - " + recHealth;
     
				InfNum = document.getElementById("InfNum");
     
				FinAttHer = $(".three").find("strong").html();
				MYDamage = $(".you .three").find("strong").html();
				Res = FinAttHer - MYDamage;
     
				InfNum.innerHTML = Res;
     
				minRan = document.getElementById("rank_min").innerHTML;
				xminRan = minRan.replace(" Rank points", "");
				maxRan = document.getElementById("rank_max").getAttribute("title");
				xmaxRan = maxRan.match(/[0-9]+/);
     
				res = xmaxRan - xminRan;
     
				ran = document.getElementById("Ran");
     
				ran.innerHTML = res;
							
				ourPoi = $("#left_campaign_points").find("strong").html();
				ourPoiPos = $("#ourPoiPos");

				ourPoiPos.css("padding-left", "75px");
				ourPoiPos.css("font-size", "16px");
				ourPoiPos.css("color", "white");
				ourPoiPos.css("font-family", "serif");
				ourPoiPos.css("display", "inline");

				
				final = ourPoi + " / 83 Total Points";
				
				ourPoiPos.html(final);
				
				ePoi = $("#right_campaign_points").find("strong").html();
				ePoiPos = $("#ePoiPos");

				ePoiPos.css("padding-left", "135px");
				ePoiPos.css("font-size", "16px");
				ePoiPos.css("color", "white");
				ePoiPos.css("font-family", "serif");
				ePoiPos.css("display", "inline");

				
				efinal = ePoi + " / 83 Punti Totali";
				
				ePoiPos.html(efinal);
     
                    }, 1);
     
            };
     
            DO.onclick = function () {
     
                    var UseBars, DO;
     
                    UseBars = prompt("Usare le energy bar? 1: Si 0: No");
     
                    if (UseBars > 1) {
     
                            alert("Il bot non userà le energy bars perchè è stato premuto un numero maggiore di 1");
     
                    }
     
                    if (UseBars < 0) {
     
                            alert("Il bot non userà le energy bars perchè è stato premuto un numero minore di 0");
     
                    }
     
                    DO = document.getElementById("AvvioBot");
     
                    DO.setAttribute("disabled", "true");
     
                    setInterval(function () {
     
                            var EAT, recHealth, recEnergy;
     
                            EAT = document.getElementById("DailyConsumtionTrigger");
     
                            recHealth = $(".tooltip_health_limit").html();
     
                            recEnergy = document.getElementById("foodText").innerHTML;
     
                            if (UseBars == 0) {
     
                                    if (recHealth != 0) {
     
                                            EAT.click();
     
                                    }
     
                            }
     
                            if (UseBars == 1) {
     
                                    if (recHealth != 0) {
     
                                            EAT.click();
                                    }
     
                                    if (recEnergy == "Energy Bar") {
     
                                            EAT.click();
     
                                    }
     
                            }
     
                            if (UseBars > 1) {
     
                                    if (recHealth != 0) {
     
                                            EAT.click();
     
                                    }
     
                            }
     
                            if (UseBars < 1) {
     
                                    if (recHealth != 0) {
     
                                            EAT.click();
     
                                    }
     
                            }
     
                    }, 1000); //Edit IF YOU HAVE A SLOW DATA CONNECTION (Time < 1000) Best Value:100
     
                    setInterval(function () {
     
                            var FBTN, ADDI;
     
                            FBTN = document.getElementById("fight_btn");
     
                            ADDI = document.getElementById("add_damage_btn");
     
                            if (FBTN.className === "fight_btn") {
                                    FBTN.click();
                                    ADDI.click();
                            }
     
                            if (FBTN.className === "fight_btn disabled") { //To Maintain The Session
                                    FBTN.click();
                            }
     
                    }, 1000); // If You Have Edited The Timer Before Set This To 2000
     
            };
     
            DOS.onclick = function () {
     
                alert("Spero che ti sia piaciuto :)\nAlla prossima!");
                    document.location.reload(true);
     
            };
     
    }());