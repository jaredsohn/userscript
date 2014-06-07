// ==UserScript==
// @name        eRepublikMCELMA
// @namespace   eRepublikMCELMA
// @description eRepublik Military Campaigns Enhance: Listing Mercenary Achievement
// @include     http://www.erepublik.com/*/military/campaigns
// @include     http://www.erepublik.com/*/military/battlefield/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @version     0.5
// ==/UserScript==


var UserLink = "http://www.erepublik.com"+$(".user_info").find("a").eq(0).attr("href");
var countryName_id={Albania:"167",Argentina:"27",Australia:"50",Austria:"33",Belarus:"83",Belgium:"32",Bolivia:"76","Bosnia and Herzegovina":"69",Brazil:"9",Bulgaria:"42",Canada:"23",Chile:"64",China:"14",Colombia:"78",Croatia:"63",Cyprus:"82","Czech Republic":"34",Denmark:"55",Egypt:"165",Estonia:"70",Finland:"39",France:"11",Germany:"12",Greece:"44",Hungary:"13",India:"48",Indonesia:"49",Iran:"56",Ireland:"54",Israel:"58",Italy:"10",Japan:"45",Latvia:"71",Lithuania:"72",Malaysia:"66",Mexico:"26",Montenegro:"80",Netherlands:"31","New Zealand":"84","North Korea":"73",Norway:"37",Pakistan:"57",Paraguay:"75",Peru:"77",Philippines:"67",Poland:"35",Portugal:"53","Republic of China (Taiwan)":"81","Republic of Macedonia (FYROM)":"79","Republic of Moldova":"52",Romania:"1",Russia:"41","Saudi Arabia":"164",Serbia:"65",Singapore:"68",Slovakia:"36",Slovenia:"61","South Africa":"51","South Korea":"47",Spain:"15",Sweden:"38",Switzerland:"30",Thailand:"59",Turkey:"43",Ukraine:"40","United Arab Emirates":"166","United Kingdom":"29",Uruguay:"74",USA:"24",Venezuela:"28"};
var data = new Array();
var UserLevel = parseFloat($(".user_info").find("b").eq(0).text());

if (UserLevel >=1 && UserLevel<24) {
	var UserDivision=1;
} else if (UserLevel >=25 && UserLevel<29) {
	var UserDivision=2;
} else if (UserLevel >=25 && UserLevel<29) {
	var UserDivision=3;
} else {
	var UserDivision=4;
}

function get_time_difference(earlierDate,laterDate) {
	var nTotalDiff = laterDate.getTime() - earlierDate.getTime();
	var oDiff = new Object();
	oDiff.days = Math.floor(nTotalDiff/1000/60/60/24);
	nTotalDiff -= oDiff.days*1000*60*60*24;
	
	oDiff.hours = Math.floor(nTotalDiff/1000/60/60);
	nTotalDiff -= oDiff.hours*1000*60*60;
	
	oDiff.minutes = Math.floor(nTotalDiff/1000/60);
	nTotalDiff -= oDiff.minutes*1000*60;
	
	oDiff.seconds = Math.floor(nTotalDiff/1000);
	
	return oDiff;
}

GM_xmlhttpRequest({
	method: "GET",
	url: UserLink,
	onload: function(response) {
		var a=$(response.responseText).find('ul[class*="country_list"]').find("li");
		for (var i=0;i<a.size();i++) {
			var CountryName = a.eq(i).attr("title");
			var Numerator = a.eq(i).find("em").eq(0).text().split("/")[0];
			data[CountryName] = Numerator;
		}
		
		start_append();
		
		function start_append() {
			index=0;
			append_bod_listing();
		}
		
		function append_bod_listing() {
			if ($('.bod_listing').find('li').size() > 0) {
				if (index <= parseFloat($('.bod_listing').find('li').size())-1) {
					var aryAttaching = new Array();
					var res = "";
					var objBattle = $('.bod_listing').find('li').eq(index);
					var BattleID = objBattle.attr('id').split('-')[1];
					var BattleStatsLink = "http://www.erepublik.com/en/military/battle-stats/"+BattleID;
					var BattleFieldLink = "http://www.erepublik.com/en/military/battlefield/"+BattleID;
					GM_xmlhttpRequest({
						method: "GET",
						url: BattleStatsLink,
						onload: function(r1) {
							res = eval("(" + r1.responseText + ")");
							var objCountry=objBattle.find('strong').eq(0);
							aryAttaching.push(res['division'][countryName_id[objCountry.text()]][UserDivision]['domination']);
							var lp;
							lp = objCountry.text()+'-'+res['division'][countryName_id[objCountry.text()]]['total'];
							if (data[objCountry.text()]<25) {
								objCountry.append('<super><font size=3 color=RED>'+data[objCountry.text()]+'</font></super>');
							} else {
								objCountry.append('<sup>'+data[objCountry.text()]+'</sup>');
							}
							
							var objCountry=objBattle.find('strong').eq(1);
							aryAttaching.push(res['division'][countryName_id[objCountry.text()]][UserDivision]['domination']);
							var rp;
							rp = objCountry.text()+'-'+res['division'][countryName_id[objCountry.text()]]['total'];
							if (data[objCountry.text()]<25) {
								objCountry.append('<super><font size=3 color=RED>'+data[objCountry.text()]+'</font></super>');
							} else {
								objCountry.append('<sup>'+data[objCountry.text()]+'</sup>');
							}
							
							objBattle.find('.fight_button').eq(0).attr({title:lp+' : '+rp});
							
							GM_xmlhttpRequest({
								method: "GET",
								url: BattleFieldLink,
								onload: function(ack) {
									var ack1=ack.responseText;
									var sec = get_time_difference(new Date(ack1.substring(ack1.indexOf('battle_start_at')+31,ack1.indexOf('battle_start_at')+62)),new Date());
									objBattle.find('.county').eq(0).after("<strong style='color: red; font-weight: normal; font-size: 10pt; float:right;position:absolute;right:220px'>"+aryAttaching[0]+"</strong><small style='float:right;position:absolute;right:190px'>&nbsp&nbsp&nbspvs</small><strong style='color: red; font-weight: normal; font-size: 10pt;float:right;position:absolute;right:160px'>"+aryAttaching[1]+"</strong><strong style='color: red; font-weight: normal; font-size: 10pt;float:right;position:absolute;right:100px'>"+sec.hours + ":" + sec.minutes + ":" + sec.seconds+"</strong>");
								}
							});
							index+=1;
							append_bod_listing();
						}
					});
				} else {
					index=0;
					append_country_battles();
				}
			} else {
				index=0;
				append_country_battles();
			}
		}
		
		function append_country_battles() {
			if (document.location.toString().indexOf( "/military/campaigns") >= 0) {
				if ($('.country_battles').find('li').size() > 0) {
					if (index <= parseFloat($('.country_battles').find('li').size())-1) {
						var aryAttaching = new Array();
						var res = "";
						var objBattle = $('.country_battles').find('li').eq(index);
						var BattleID = objBattle.attr('id').split('-')[1];
						var BattleStatsLink = "http://www.erepublik.com/en/military/battle-stats/"+BattleID;
						var BattleFieldLink = "http://www.erepublik.com/en/military/battlefield/"+BattleID;
						
						GM_xmlhttpRequest({
							method: "GET",
							url: BattleStatsLink,
							onload: function(r1) {
								res = eval("(" + r1.responseText + ")");
								var objCountry=objBattle.find('strong').eq(0);
								aryAttaching.push(res['division'][countryName_id[objCountry.text()]][UserDivision]['domination']);
								var lp;
								lp = objCountry.text()+'-'+res['division'][countryName_id[objCountry.text()]]['total'];
								if (data[objCountry.text()]<25) {
									objCountry.append('<super><font size=3 color=RED>'+data[objCountry.text()]+'</font></super>');
								} else {
									objCountry.append('<sup>'+data[objCountry.text()]+'</sup>');
								}
								
								var objCountry=objBattle.find('strong').eq(1);
								aryAttaching.push(res['division'][countryName_id[objCountry.text()]][UserDivision]['domination']);
								var rp;
								rp = objCountry.text()+'-'+res['division'][countryName_id[objCountry.text()]]['total'];
								if (data[objCountry.text()]<25) {
									objCountry.append('<super><font size=3 color=RED>'+data[objCountry.text()]+'</font></super>');
								} else {
									objCountry.append('<sup>'+data[objCountry.text()]+'</sup>');
								}
								
								objBattle.find('.fight_button').eq(0).attr({title:lp+' : '+rp});
								
								GM_xmlhttpRequest({
									method: "GET",
									url: BattleFieldLink,
									onload: function(ack) {
										var ack1=ack.responseText;
										if (ack1.indexOf('/battlefield-choose-side/') == -1) {
											var sec = get_time_difference(new Date(ack1.substring(ack1.indexOf('battle_start_at')+31,ack1.indexOf('battle_start_at')+62)),new Date());
											objBattle.find('.county').eq(0).after("<strong style='color: red; font-weight: normal; font-size: 10pt; float:right;position:absolute;right:220px'>"+aryAttaching[0]+"</strong><small style='float:right;position:absolute;right:190px'>&nbsp&nbsp&nbspvs</small><strong style='color: red; font-weight: normal; font-size: 10pt;float:right;position:absolute;right:160px'>"+aryAttaching[1]+"</strong><strong style='color: red; font-weight: normal; font-size: 10pt;float:right;position:absolute;right:100px'>"+sec.hours + ":" + sec.minutes + ":" + sec.seconds+"</strong>");
										} else {
											GM_xmlhttpRequest({
												method: "GET",
												url: ack1.substring(ack1.indexOf('http://www.erepublik.com/en/military/battlefield-choose-side/'),ack1.indexOf('"',ack1.indexOf('http://www.erepublik.com/en/military/battlefield-choose-side/'))),
												onload: function(aa) {
													GM_xmlhttpRequest({
														method: "GET",
														url: BattleFieldLink,
														onload: function(tmpack) {
															var tmpack1=tmpack.responseText;
															var sec = get_time_difference(new Date(tmpack1.substring(tmpack1.indexOf('battle_start_at')+31,tmpack1.indexOf('battle_start_at')+62)),new Date());
															objBattle.find('.county').eq(0).after("<strong style='color: red; font-weight: normal; font-size: 10pt; float:right;position:absolute;right:220px'>"+aryAttaching[0]+"</strong><small style='float:right;position:absolute;right:190px'>&nbsp&nbsp&nbspvs</small><strong style='color: red; font-weight: normal; font-size: 10pt;float:right;position:absolute;right:160px'>"+aryAttaching[1]+"</strong><strong style='color: red; font-weight: normal; font-size: 10pt;float:right;position:absolute;right:100px'>"+sec.hours + ":" + sec.minutes + ":" + sec.seconds+"</strong>");
														}
													});
												}
											});
										}
									}
								});
								index+=1;
								append_country_battles();
							}
						});
					} else {
						index=0;
						append_allies_battles();
					}
				} else {
					index=0;
					append_allies_battles();
				}
			} else if (document.location.toString().indexOf( "/military/battlefield") >= 0) {
				var objCountry = $('#pvp_header').find('h3').eq(0);
				var CountryName = '';
				var DO = 0;
				if (objCountry.text().indexOf("Resistance Force of") >= 0) {
					CountryName = $.trim(objCountry.text().substring(20));
					
				} else {
					CountryName = $.trim(objCountry.text());
				}
				var strcontent='';
				
				if (data[CountryName]<25) {
					strcontent='Mercenary: '+data[CountryName];
				} else {
					strcontent='Mercenary: Done';
				}
				
				GM_xmlhttpRequest({
					method: "GET",
					url: 'http://www.erepublik.com/en/main/group-home/military',
					onload: function(response) {
						if ($(response.responseText).find('.condition_no').size()>0) {
							strcontent=strcontent+'<br>Order: '+$(response.responseText).find('.condition_no').eq(0).text();
							DO=$(response.responseText).find('.condition_no').eq(0).text().substring(0,$(response.responseText).find('.condition_no').eq(0).text().indexOf('/'));
						} else {
							strcontent=strcontent+'<br>Order: Done';
							DO=25;
						}
						$('.domination').before( '<div id="completed" style="width: 90px; border: 1px solid #777; border-radius: 5px; padding: 3px; background-color: #333; font-size:10px; text-align:center; color: #fff; font-weight:bold; float:left; position:absolute;top:140px;left:331px;opacity:0.7;">'+strcontent+'</div>');
		    		}
		    	});
		    	
		        $('#fight_btn').live('click', function(){
		        	if (data[CountryName]<25) {
						GM_xmlhttpRequest({
							method: "GET",
							url: UserLink,
							onload: function(response) {
								var a=$(response.responseText).find('ul[class*="country_list"]').find("li");
								for (var i=0;i<a.size();i++) {
									var CountryName1 = a.eq(i).attr("title");
									var Numerator1 = a.eq(i).find("em").eq(0).text().split("/")[0];
									data[CountryName1] = Numerator1;
									if (data[CountryName]<25) {
										strcontent='Mercenary: '+data[CountryName];
									} else {
										strcontent='Mercenary: Done';
									}
								}
								GM_xmlhttpRequest({
									method: "GET",
									url: 'http://www.erepublik.com/en/main/group-home/military',
									onload: function(response) {
										if ($(response.responseText).find('.condition_no').size()>0) {
											strcontent=strcontent+'<br>Order: '+$(response.responseText).find('.condition_no').eq(0).text();
										} else {
											strcontent=strcontent+'<br>Order: Done';
										}
				        				$('#completed').html(strcontent);
						    		}
						    	});
			        		}
			        	});
			        } else if (DO<25) {
						GM_xmlhttpRequest({
							method: "GET",
							url: UserLink,
							onload: function(response) {
								var a=$(response.responseText).find('ul[class*="country_list"]').find("li");
								for (var i=0;i<a.size();i++) {
									var CountryName1 = a.eq(i).attr("title");
									var Numerator1 = a.eq(i).find("em").eq(0).text().split("/")[0];
									data[CountryName1] = Numerator1;
									if (data[CountryName]<25) {
										strcontent='Mercenary: '+data[CountryName];
									} else {
										strcontent='Mercenary: Done';
									}
								}
								GM_xmlhttpRequest({
									method: "GET",
									url: 'http://www.erepublik.com/en/main/group-home/military',
									onload: function(response) {
										if ($(response.responseText).find('.condition_no').size()>0) {
											strcontent=strcontent+'<br>Order: '+$(response.responseText).find('.condition_no').eq(0).text();
											DO=$(response.responseText).find('.condition_no').eq(0).text().substring(0,$(response.responseText).find('.condition_no').eq(0).text().indexOf('/'));
										} else {
											strcontent=strcontent+'<br>Order: Done';
											DO=25;
										}
				        				$('#completed').html(strcontent);
						    		}
						    	});
			        		}
			        	});
			        }
		        });
			}
		}
		
		function append_allies_battles() {
			if ($('.allies_battles').find('li').size() > 0) {
				if (index <= parseFloat($('.allies_battles').find('li').size())-1) {
					var aryAttaching = new Array();
					var res = "";
					var objBattle = $('.allies_battles').find('li').eq(index);
					var BattleID = objBattle.attr('id').split('-')[1];
					var BattleStatsLink = "http://www.erepublik.com/en/military/battle-stats/"+BattleID;
					var BattleFieldLink = "http://www.erepublik.com/en/military/battlefield/"+BattleID;
					GM_xmlhttpRequest({
						method: "GET",
						url: BattleStatsLink,
						onload: function(r1) {
							res = eval("(" + r1.responseText + ")");
							var objCountry=objBattle.find('strong').eq(0);
							aryAttaching.push(res['division'][countryName_id[objCountry.text()]][UserDivision]['domination']);
							var lp;
							lp = objCountry.text()+'-'+res['division'][countryName_id[objCountry.text()]]['total'];
							if (data[objCountry.text()]<25) {
								objCountry.append('<super><font size=3 color=RED>'+data[objCountry.text()]+'</font></super>');
							} else {
								objCountry.append('<sup>'+data[objCountry.text()]+'</sup>');
							}
							
							var objCountry=objBattle.find('strong').eq(1);
							aryAttaching.push(res['division'][countryName_id[objCountry.text()]][UserDivision]['domination']);
							var rp;
							rp = objCountry.text()+'-'+res['division'][countryName_id[objCountry.text()]]['total'];
							if (data[objCountry.text()]<25) {
								objCountry.append('<super><font size=3 color=RED>'+data[objCountry.text()]+'</font></super>');
							} else {
								objCountry.append('<sup>'+data[objCountry.text()]+'</sup>');
							}
							
							objBattle.find('.fight_button').eq(0).attr({title:lp+' : '+rp});
							
							GM_xmlhttpRequest({
								method: "GET",
								url: BattleFieldLink,
								onload: function(ack) {
									var ack1=ack.responseText;
									var sec = get_time_difference(new Date(ack1.substring(ack1.indexOf('battle_start_at')+31,ack1.indexOf('battle_start_at')+62)),new Date());
									objBattle.find('.county').eq(0).after("<strong style='color: red; font-weight: normal; font-size: 10pt; float:right;position:absolute;right:220px'>"+aryAttaching[0]+"</strong><small style='float:right;position:absolute;right:190px'>&nbsp&nbsp&nbspvs</small><strong style='color: red; font-weight: normal; font-size: 10pt;float:right;position:absolute;right:160px'>"+aryAttaching[1]+"</strong><strong style='color: red; font-weight: normal; font-size: 10pt;float:right;position:absolute;right:100px'>"+sec.hours + ":" + sec.minutes + ":" + sec.seconds+"</strong>");
									
								}
							});
							index+=1;
							append_allies_battles();
						}
					});
				} else {
					index=0;
					append_all_battles();
				}
			} else {
				index=0;
				append_all_battles();
			}
		}
		
		function append_all_battles() {
			if ($('.all_battles').find('li').size() > 0) {
				if (index <= parseFloat($('.all_battles').find('li').size())-1) {
					var aryAttaching = new Array();
					var res = "";
					var objBattle = $('.all_battles').find('li').eq(index);
					var BattleID = objBattle.attr('id').split('-')[1];
					var BattleStatsLink = "http://www.erepublik.com/en/military/battle-stats/"+BattleID;
					var BattleFieldLink = "http://www.erepublik.com/en/military/battlefield/"+BattleID;
					GM_xmlhttpRequest({
						method: "GET",
						url: BattleStatsLink,
						onload: function(r1) {
							res = eval("(" + r1.responseText + ")");
							var objCountry=objBattle.find('strong').eq(0);
							aryAttaching.push(res['division'][countryName_id[objCountry.text()]][UserDivision]['domination']);
							var lp;
							lp = objCountry.text()+'-'+res['division'][countryName_id[objCountry.text()]]['total'];
							if (data[objCountry.text()]<25) {
								objCountry.append('<super><font size=3 color=RED>'+data[objCountry.text()]+'</font></super>');
							} else {
								objCountry.append('<sup>'+data[objCountry.text()]+'</sup>');
							}
							
							var objCountry=objBattle.find('strong').eq(1);
							aryAttaching.push(res['division'][countryName_id[objCountry.text()]][UserDivision]['domination']);
							var rp;
							rp = objCountry.text()+'-'+res['division'][countryName_id[objCountry.text()]]['total'];
							if (data[objCountry.text()]<25) {
								objCountry.append('<super><font size=3 color=RED>'+data[objCountry.text()]+'</font></super>');
							} else {
								objCountry.append('<sup>'+data[objCountry.text()]+'</sup>');
							}
							
							objBattle.find('.fight_button').eq(0).attr({title:lp+' : '+rp});
							
							GM_xmlhttpRequest({
								method: "GET",
								url: BattleFieldLink,
								onload: function(ack) {
									var ack1=ack.responseText;
									var sec = get_time_difference(new Date(ack1.substring(ack1.indexOf('battle_start_at')+31,ack1.indexOf('battle_start_at')+62)),new Date());
									objBattle.find('.county').eq(0).after("<strong style='color: red; font-weight: normal; font-size: 10pt; float:right;position:absolute;right:220px'>"+aryAttaching[0]+"</strong><small style='float:right;position:absolute;right:190px'>&nbsp&nbsp&nbspvs</small><strong style='color: red; font-weight: normal; font-size: 10pt;float:right;position:absolute;right:160px'>"+aryAttaching[1]+"</strong><strong style='color: red; font-weight: normal; font-size: 10pt;float:right;position:absolute;right:100px'>"+sec.hours + ":" + sec.minutes + ":" + sec.seconds+"</strong>");
									
								}
							});
							index+=1;
							append_all_battles();
						}
					});
				}
			}
		}
	}
});