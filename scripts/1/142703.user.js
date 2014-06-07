// ==UserScript==
// @name        Advanced Battlefield Manager
// @namespace   Advanced Battlefield Manager
// @author      I.RAPID.I
// @author	RatePV
// @version     2.1
// @description New Bot - Now Fixed - ENJOY!
// @include     http://www.erepublik.com/*/military/battlefield/*
// @require     http://code.jquery.com/jquery-1.7.2.min.js
// ==/UserScript==
     
(function Core() {
    
	console.log("disabling confirm box, ask always yes")
	
	window.confirm = function () { return true; }; //Disable Confirmation Box
    
	var Pos, DO, DOS, P;
     
	Pos = document.getElementById("pvp_actions");
     
	$("#pvp_battle_area table:eq(0)").before('<table title="Influence To Get BH" style="width: auto; margin: 0 auto -25px; position: relative; top: 230px;"><tr><td><div id="InfluenceToBH" style="width: auto; height: 25px; display: block; cursor: default; position: relative;"><small style="font-size: 11px; color: white; float: left; text-shadow: #333 0px 1px 1px; display: block; height: 25px; opacity: 0.7; -moz-opacity: 0.7; -ms-fiter: \'progid:DXImageTransform.Microsoft.Alpha(Opacity=70)\'; filter: alpha(opacity=70); line-height: 25px; font-weight: bold; padding: 0 5px; background-image: url(\'/images/modules/pvp/influence_left.png?1321873582\'); background-position: left;">Influence To BH</small><strong id="InfNum" style="color: white; text-shadow: #014471 0px 1px 0px; float: left; display: block; height: 25px; font-size: 12px; line-height: 25px; padding: 0 5px; background-image: url(\'/images/modules/pvp/influence_right.png?1321873582\'); background-position: right;">0</strong></div></td></tr></table>');
     
	$("#pvp_battle_area table:eq(0)").before('<table title="Points TNR" style="width: auto; margin: 0 auto -25px; position: relative; top: 198px;"><tr><td><div id="PointsTNR" style="width: auto; height: 25px; display: block; cursor: default; position: relative;"><small style="font-size: 11px; color: white; float: left; text-shadow: #333 0px 1px 1px; display: block; height: 25px; opacity: 0.7; -moz-opacity: 0.7; -ms-fiter: \'progid:DXImageTransform.Microsoft.Alpha(Opacity=70)\'; filter: alpha(opacity=70); line-height: 25px; font-weight: bold; padding: 0 5px; background-image: url(\'/images/modules/pvp/influence_left.png?1321873582\'); background-position: left;">Points TNR</small><strong id="Ran" style="color: white; text-shadow: #014471 0px 1px 0px; float: left; display: block; height: 25px; font-size: 12px; line-height: 25px; padding: 0 5px; background-image: url(\'/images/modules/pvp/influence_right.png?1321873582\'); background-position: right;">0</strong></div></td></tr></table>');
            
	DO = document.createElement("input");
 	DO.setAttribute("type", "button");
   	DO.setAttribute("class", "addon");
	DO.setAttribute("id", "AvvioBot");
	DO.setAttribute("value", "START BOT!");
	DO.setAttribute("title", "START BOT NOW!");
 	DO.style.color = "#ffffff";
	DO.style.marginLeft = "-485px";
	DO.style.marginTop = "-15px";
	Pos.appendChild(DO);
     
    DOS = document.createElement("input");
    DOS.setAttribute("type", "button");
    DOS.setAttribute("class", "addon");
    DOS.setAttribute("id", "StopBot");
    DOS.setAttribute("value", "STOP BOT!");
    DOS.setAttribute("title", "STOP BOT NOW!");
    DOS.style.color = "#ffffff";
    DOS.style.marginLeft = "-375px";
    DOS.style.marginTop = "-15px";
    Pos.appendChild(DOS);
     
    P = document.createElement("button");
    P.setAttribute("class", "addon");
    P.setAttribute("id", "Vita");
    P.setAttribute("title", "Time Until 10 New Health Points Refill / Total Remaining Health");
    P.setAttribute("disabled", "true");
    P.style.color = "#ffffff";
    P.style.width = "205px";
	P.style.marginLeft = "-485px";
	P.style.marginTop = "25px";
	Pos.appendChild(P);
	
	console.log("script init completed");
			     
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
     
				var HealthV, P, recHealth, InfNum, FinAttHer, MYDamage, Res, minRan, xminRan, maxRan, xmaxRan, res, ran, blue, newBlue, red, newRed, blueP, redP;
													
				blueP = $("#left_campaign_points").html();
				redP = $("#red_campaign_points").html();
																
				if (blueP > redP) {

					$("h3:eq(1)").css("color", "#008800");

					$("h3:eq(2)").css("color", "#FF0000");
					
				} else {


					$("h3:eq(1)").css("color", "#FF0000");

					$("h3:eq(2)").css("color", "#008800");					
				}

				blue = document.getElementById("blue_domination");
				newBlue = blue.innerHTML;
				newBlue = newBlue.replace("%", "");
				
				if (newBlue < 50) {
										
					blue.style.opacity = "1";
					blue.style.color = "#FFA07A";
					blue.style.fontSize = "12px"
					blue.style.paddingLeft = "5px";	
									
				} else {
										
					blue.style.opacity = "1";
					blue.style.color = "#90EE90";
					blue.style.fontSize = "12px"
					blue.style.paddingLeft = "5px";	
							
				}
				
				red = document.getElementById("red_domination");
				newRed = red.innerHTML;
				newRed = newRed.replace("%", "");
				
				if (newRed < 50) {
					
					red.style.opacity = "1";
					red.style.color = "#87CEEB";
					red.style.fontSize = "12px"
					red.style.paddingRight = "5px";					
										
				} else {
					
					red.style.opacity = "1";
					red.style.color = "#90EE90";
					red.style.fontSize = "12px"
					red.style.paddingRight = "5px";	

				}
								     
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
											
		     
                    }, 1);
     
            };
     
            DO.onclick = function () {
				
					console.log("starting bot");
     
                    var UseBars, DO;
     
                    UseBars = prompt("Use Bars? 1: Yes 0: No");
     
                    if (UseBars > 1) {
     
                            alert("Bad Option! Bot Wont Eat Bars!");
     
                    }
     
                    if (UseBars < 0) {
     
                            alert("Bad Option! Bot Wont Eat Bars!");
     
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
     
                    }, 1500); // If You Have Edited The Timer Before Set This To 2000
     
            };
     
            DOS.onclick = function () {
				
					console.log("about to reload page");
					console.log("bye bye")
     
                    alert("HOPE YOU ENJOYED THIS\nBYE BYE");
                    document.location.reload(true);
     
            };
     
    }());
