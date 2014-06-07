// ==UserScript==
// @name           MyMagicTales Script
// @description    Addon to enhance usability inGame and grant more statistics.
// @icon           http://s3.amazonaws.com/uso_ss/icon/95471/large.jpg?1326570018
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @include        http://*.mymagictales.com/*
// @exclude        http://*.mymagictales.com/?bonusId=*
// @exclude        http://forum.*.mymagictales.com/*
// @exclude        http://*.mymagictales.com/xhodon/chat.php
// @version        1.1.7
// ==/UserScript==

// Predefined Variables
var page,preSet,debug,gbonus,data,buddies,note,xVars,intervalE;
var SetVars=function () {
	page=xTools.currentPage();
	preSet={
		debug_mode:true, // enables debug messages (true, false)
		make_tick:true, // enables tick and magic timer as well as alerts (true, false)
		tick_len:3, // defines the tick length (int:minutes)
		magic_beep:false, // plays a sound if guilds magic becomes available again (true, false)
		energy_beep:false, // will play a sound if energy increases (true, false)
		energy_alert:false, // plays a sound if energy reaches the limit (true, false)
		snd_tick:"http://www.fileden.com/files/2007/5/19/1092972/crystal-glass.wav",
		snd_guild:"http://www.fileden.com/files/2007/5/19/1092972/up-in-the-space.wav",
		snd_energy:"http://www.fileden.com/files/2007/5/19/1092972/alarm.wav",
        menu_add:true, // redesignes the topmost menu (true, false)
        res_add:true, // enhances the overview on every production-site (true, false)
        shaman_add:true, // enhances the shamanhut its overview
        guild_add:true, // will save the lvl and points for each member in a guild (true, false)
        incr_energy:true, // this will increase the users energy pool within a tick (true, false)
	};
	debug=((preSet.debug_mode&&console&&typeof(console.log)=='function')
		? function (text) {
			var J=new Date();
			var _="["+J.getHours()+":"+J.getMinutes()+":"+J.getSeconds()+"."+J.getMilliseconds()+"] : ";
			console.log(_+text);
		 }
		:function (text) {}
	);
	gbonus=(GM_getValue("Magic"+page.world)?xLoad("Magic"+page.world):new Date());debug("GuildMagic loaded!");
	data=(GM_getValue("Data"+page.world)?xLoad("Data"+page.world):{});debug("Data loaded!");
	buddies=(GM_getValue("Buddies"+page.world)?xLoad("Buddies"+page.world):[]);debug("Buddylist loaded!");
	note=(GM_getValue("Note"+page.world)?xLoad("Note"+page.world):"");debug("Notes loaded!");
	xVars={
		unit_list:[
			// Defender
			"goblin",
			"icewarrior",
			"warriorpriest",
			"axe_swinging_dwarf",
			"doubleaxe_dwarf",
			"singing_halfgiant",
			"unicorn",
			"stone_throwing_troll",
			"snake_neck_dragons",
			// Attacker
			"powerchild",
			"hysterical_centauress",
			"wild_centaur",
			"elven_archer",
			"fire_fay",
			"treegiant",
			"storm_faerie",
			"elv_magican",
			"fire_sting_dragons"
		],
		unit_info:function (unit_name) {
			switch (unit_name) {
				// Defender
				case "goblin": 					return {id:unit_name,attack:  1,life:  100,points:0,mushrooms:3,name:'Kobold'};
				case "icewarrior": 				return {id:unit_name,attack:  4,life:  150,points:0,mushrooms:5,name:'Eiskrieger'};
				case "warriorpriest": 			return {id:unit_name,attack:  7,life:  250,points:0,mushrooms:7,name:'Kriegerpriester'};
				case "axe_swinging_dwarf": 		return {id:unit_name,attack:  8,life:  450,points:0,mushrooms:10,name:'Axtschwingender Zwerg'};
				case "doubleaxe_dwarf": 		return {id:unit_name,attack: 11,life:  650,points:0,mushrooms:14,name:'Doppelaxtzwerg'};
				case "singing_halfgiant": 		return {id:unit_name,attack: 15,life:  750,points:0,mushrooms:19,name:'Singender Halbriese'};
				case "unicorn": 				return {id:unit_name,attack: 24,life:  950,points:0,mushrooms:25,name:'Einhornwagen'};
				case "stone_throwing_troll": 	return {id:unit_name,attack:100,life: 7500,points:0,mushrooms:32,name:'Steinwerfender Bergtroll'};
				case "snake_neck_dragons": 		return {id:unit_name,attack:800,life:80000,points:0,mushrooms:40,name:'Schlangenhalsdrache'};
				// Attacker
				case "powerchild": 				return {id:unit_name,attack:   2,life:  50,points:0,mushrooms:3,name:'Kind der Macht'};
				case "hysterical_centauress": 	return {id:unit_name,attack:   8,life:  75,points:0,mushrooms:5,name:'Hysterische Zentaurin'};
				case "wild_centaur": 			return {id:unit_name,attack:  17,life: 100,points:0,mushrooms:7,name:'Wilder Zentaurus'};
				case "elven_archer": 			return {id:unit_name,attack:  24,life: 150,points:0,mushrooms:10,name:'Elfenbogenschütze'};
				case "fire_fay": 				return {id:unit_name,attack:  40,life: 180,points:0,mushrooms:14,name:'Feuerfee'};
				case "treegiant": 				return {id:unit_name,attack:  56,life: 200,points:0,mushrooms:19,name:'Baumriese'};
				case "storm_faerie": 			return {id:unit_name,attack: 100,life: 225,points:0,mushrooms:25,name:'Baumriese'};
				case "elv_magican": 			return {id:unit_name,attack: 750,life:1000,points:0,mushrooms:32,name:'Elfenmagier'};
				case "fire_sting_dragons": 		return {id:unit_name,attack:8000,life:8000,points:0,mushrooms:40,name:'Elfenmagier'};
				default: 						return {id:false,atk:false,life:false,points:false,mushrooms:false,name:'Unbekannt'};
			}
		}
	};
}

var xHtml={
	setIntervals:function () {
		$(document).ready(function() {
			debug("document.ready()!");
			if (preSet.make_tick) {
				var incr=false;
				if (!intervalE) {
					intervalE=window.setInterval(function() {
						// Energy Check
						var Energy=$("#menu_skill_5").parent().text().trim();
                        var Enow=Number(Energy.split("/")[0]);
                        var Emax=Number(Energy.split("/")[1]);
                        var tt="heute";
                        var th=Number(new Date().getHours())+Number(xTools.formatTimeFromTicks(Emax-Enow).split(":")[0]);
                        var tm=Number(new Date().getMinutes())+Number(xTools.formatTimeFromTicks(Emax-Enow).split(":")[1]);
                        if (tm>=60) {tm=tm-60;th=th+1;}
                        if (th>=24) {th=th-24;tt="morgen";}
                        // Tick Countdown Timer
						var time=$("#klick_countdown").text();
						var m=time.split(":")[0];
						var s=time.split(":")[1];
						var t=(m*60+s);
						$("#xMMT_klick").html('<span style="color:rgb('+(255-(isNaN(t)?255:t))+','+(0+(isNaN(t)?255:t))+',0);font-weight:bold;font-size:12px" onmouseout="nd();" onmouseover="return overlib(\'Dauer bis zur Ausführung des Ticks.\');">'+m+':'+s+'</span>');
						$("#menu_skill_5").parent().attr("onmouseover","return overlib('Energie - Limit erreicht "+tt+" um "+((th<10&&th>=0)?"0"+th:th)+":"+((tm<10&&tm>=0)?"0"+tm:tm)+" Uhr');");
                        if (t<10&&preSet.incr_energy) {
							$("#menu_skill_5").parent().css({'color':'rgb('+(5+s*25)+',255,'+(5+s*25)+')','font-weight':'bold'});
							if (t==1) {incr=true;}
							if (t==0&incr==true) {
                                incr=false;
                                $("#menu_skill_5").parent().html('<img id="menu_skill_5" alt="" src="http://w1.de.mymagictales.com/xhodon/gfx//icons/stam.png"/> '+((Enow+1)<Emax?(Enow+1):Emax)+'/'+Emax);
                                if (preSet.energy_beep) xHtml.PlaySnd(preSet.snd_tick,100);
                                var_="";
                                if ((Enow+1)<Emax) {
                                    _='<span class="success"><br/>Energie wurde erh&ouml;ht</span>';
                                }
                                else {
                                    if (preSet.energy_alert) xHtml.PlaySnd(preSet.snd_energy,100);
                                    _='<span class="error"><br/>Energielimit erreicht!</span>';
                                }
                                $("#menu .feedbackMsgContainer #message.feedbackMsg").html(_).css({'display':'block'}).fadeIn().delay(10000).fadeOut('slow');
							}
						}
                        else {
                            if (preSet.incr_energy) $("#menu_skill_5").parent().css({'color':'#FFFFFF','font-weight':'normal'});
                        }
                        // Guild Bonus Timer
                        var magic=Math.floor((new Date(gbonus).getTime()-new Date().getTime())/1000);
                        var H=magic/60;
                        var M=parseInt(H%60);
                        H=parseInt(H/60);
                        var S=parseInt(magic%60);
                        if (H<1&&M<1&&S<1) if (preSet.energy_alert) xHtml.PlaySnd(preSet.snd_guild,100);
						$("#xMMT_magic").html('<span style="color:rgb(201,201,0);font-weight:bold;font-size:12px" onmouseout="nd();" onmouseover="return overlib(\'Zeit bis zum Reset des GildenZaubers.\');">'+((H<10&&H>=0)?"0"+H:H)+':'+((M<10&&M>=0)?"0"+M:M)+':'+((S<10&&S>=0)?"0"+S:S)+'</span>');
					},999);
				}
			}
		});
	},
	PlaySnd:function (file,vol) {
		$("#xMMT_snd").remove();
		$('body').append('<embed id="xMMT_snd" class="xAddon" autostart="true" loop="false" hidden="true" volume="'+vol+'" style="position:fixed;top:1px;left:1px;width:150px;height:21px;color:silver;background:black;opacity:.5;" src="'+file+'"/>');
	},
	addInfoDiv:function (page,pid,usage) {
		var div='\
			<div class="xAddon" style="position:fixed;top:1px;right:3px;color:silver;background:black;opacity:.5;font-family:fixedsys;">\
			<table id="xMMT_infodiv">\
			<tr><td>Site: </td><td style="text-align:right;">'+page+(pid?'['+pid+']':'')+'</td></tr>\
			<tr><td>Time: </td><td style="text-align:right;">'+usage+'secs</td></tr>\
			</table></div>';
		$("body").append(div);
	},
	addTextPad:function () {
		var href='http://w1.de.mymagictales.com/xhodon/gfx/side/schatten/images';
		var pad='\
		<div id="xMMT_npad" class="xAddon hint" onmouseover="var questdrag=new Draggable(\'xMMT_npad\');return false;" style="position:fixed;top:48px;right:1px;display:block;width:150px;color:#FFF;opacity:0.7">\
		<table width="100%" align="center" border="0">\
		<tr><td align="center" style="height:27px;color:#000000;background:url('+href+'/dropdown_top.png);">NotePad</td></tr>\
		<tr><td align="center" style="background:url('+href+'/dropdown_kachel.png)">\
			<textarea id="xMMT_form" style="width:126px;height:150px;font-size:9px;font-family:arial;text-align:center;\
				cursor:url("/xhodon/gfx/icons/cursor/feder.png"), text !important;" wrap="auto">'+(note)+'</textarea>\
		</td></tr>\
		<tr><td align="center" style="background:url('+href+'/dropdown_kachel.png)">\
			<input id="xMMT_flshow" type="button" value="add Buddy" title="" style="width:93px;margin-top:2px;"\
				onmouseout="nd();"\
				onmouseover="return overlib(\'Klicke hier, um einen neuen BonusCode einzugeben.\');">\
			<input id="xMMT_flgo" type="button" value="G" title="" style="width:26px;margin-top:2px;"\
				onmouseout="nd();"\
				onmouseover="return overlib(\'Oeffne neues Fenster mit Deinen BonusLinks.\');"\
		</td></tr>\
		<tr><td id="xMMT_flblock" align="center" style="display:none;background:url('+href+'/dropdown_kachel.png)">\
			<input id="xMMT_flnum" type="text" maxlength="4" size="3" value="XXXX" style="background:#933119;margin-top:2px;"\
				onmouseout="nd();"\
				onmouseover="return overlib(\'Feld fuer Bonus-Code.\');">\
			<input id="xMMT_flnam" type="text" maxlength="31" size="8" value="NAME" style="background:#933119;margin-top:2px;"\
				onmouseout="nd();"\
				onmouseover="return overlib(\'Feld fuer Spieler-Name.\');">\
			<input id="xMMT_fladd" type="button" value="+" style="background:#76C776;margin-top:2px;"\
				onmouseout="nd();"\
				onmouseover="return overlib(\'Bonus-Code und Namen in die Liste uebernehmen.\');">\
		</td></tr>\
		<tr><td align="center" style="background:url('+href+'/dropdown_kachel.png)">\
			<select id="xMMT_fllist" style="width:93px;margin-top:2px;"\
				onmouseout="nd();"\
				onmouseover="return overlib(\'Dies ist die aktuelle Liste aller BonusCodes Deiner Freunde.\');"\
				onchange="window.open(\'http://'+page.world+'.de.mymagictales.com/?bonusId=\'+this.value);">';
				for (var i=0;i<buddies.length;i++) pad+='<option value="'+buddies[i].id+'">'+buddies[i].name+'</option>';
			pad+='</select>\
			<input type="button" value=['+buddies.length+'] style="width:26px;margin-top:2px;"\
				onmouseout="nd();"\
				onmouseover="return overlib(\'derzeitige Anzahl der Bonus-Codes.\');">\
		</td></tr>\
		<tr><td align="center" style="height:25px;background:url('+href+'/dropdown_bottom.png)"></td></tr>\
		</table>\
		</div>';
		$("body").append(pad);
		$("#xMMT_npad").keyup(function (e) {
			note=document.getElementById('xMMT_form').value;
			xSave("Note"+page.world,note);
		});
		$('#xMMT_flshow').click(function () {
			if ($("#xMMT_flblock").css('display')=="none") {
				$("#xMMT_flblock").css('display','block');
			}
			else {$("#xMMT_flblock").css('display','none');}
		});
		$('#xMMT_fladd').click(function () {
			var uid=document.getElementById('xMMT_flnum').value;
			var uname=document.getElementById('xMMT_flnam').value;
			if (isNaN(uid)) {alert("Bitte nur numerische Werte eintragen!");}
			else {
				var i=buddies.length;
				buddies[i]={id:uid,name:uname};
				xSave("Buddies"+page.world,buddies);
				$("#xMMT_fllist").append(new Option(uname,uid,true,true));
				$("#xMMT_flblock").css('display','none');
			}
		});
		$('#xMMT_flgo').click(function () {
			var answer=confirm("You´re about to open a new Window!");
			if (answer) {
				var xwin=window.open("","xMMT Bonus");
				var html='<html>\
					<head>\
						<title>xMMT Bonus</title>\
						<link rel="shortcut icon" href="http://nigroangelus.pytalhost.org/mmt/large.ico" type="image/x-icon" />\
					</head>\
					<body style="background:black;color:silver;">\
					<center>\
					<h1><b style="color:blue;">M</b>y <b style="color:blue;">M</b>agic <b style="color:blue;">T</b>ales &nbsp; <b style="color:green;">Bonus-Page</b></h1>\
					<div style="border:1px solid blue;">\
						<iframe src="http://nigroangelus.pytalhost.org/mmt/xMMT_Proxy.html" id="xMMT_proxy" name="xMMT_proxy" width="100%" height="66" frameborder="0"><p>Ihr Browser kann leider keine eingebetteten Frames anzeigen!</p></iframe>\
					</div>\
					<br/>\
					<table align="center" width="100%" height="auto" border="1" style="border:1px solid red;"><tr>\
				';
				var i=0;
				while (i<buddies.length) {
					html+='<td align="center">\
						<a href="http://'+page.world+'.de.mymagictales.com/?bonusId='+buddies[i].id+'" target="xMMT_'+buddies[i].id+'"><input type="button" value="Re-Load"/></a><br/>\
						<iframe src="http://'+page.world+'.de.mymagictales.com/?bonusId='+buddies[i].id+'" id="xMMT_'+buddies[i].id+'" name="xMMT_'+buddies[i].id+'" width="250px" height="99px" scrolling="no" marginheight="0" marginwidth="0" frameborder="1"><p>Ihr Browser kann leider keine eingebetteten Frames anzeigen!</p></iframe>\
					</td>';
					if (i==3||i==7||i==11||i==15||i==19||i==23) html+='</tr><tr>';
					i++;
				}
				html+='</tr></table></center></body></html>';
				xwin.document.write(html);
				xwin.document.close();
			}
		});
	},
	addRessCalc:function (res_kind) {
		var storyTxt=$('#resource_production .storyTxt');
		if (storyTxt==null) return;
		var text=storyTxt.html();
		if (text==null) return;
		if (text.search(/\/Tick/i)==-1) { // Don't read calculation results
			var erg=/erschafft zur Zeit\s+([0-9\.]*)\s+\(\+?(-?[0-9\.]*)\)/i;
			var res=erg.exec(text);
			if (res==null) { // ressource building without bonus
				var erg=/erschafft zur Zeit\s+([0-9\.]*)/i;
				var res=erg.exec(text);
				if (res==null) return;
			}
			var baseProduction=parseInt(res[1].replace(/\./g,''));
			var extraProduction=res[2]?parseInt(res[2].replace(/\./g,'')):0;
			var production=baseProduction+extraProduction;
			text="<br/><br/><table class='designedTable' style='opacity:.8;background:#FFEFB4;'>\
				<thead><tr>\
					<td class='gray_first' style='width:135px;'></td>\
					<td class='gray_middle' style='width:120px;'></td>\
					<td class='gray_last'></td>\
				</tr></thead>\
				<tbody><tr class='top'>\
					<td class='gray_first' align='left'>Produktions-Zeit</td>\
					<td class='gray_middle' align='left'></td>\
					<td class='gray_last' align='right'>Ertrag</td>\
				</tr><tr class='brdTop'>\
					<td class='clear_first'>pro Tick</td>\
					<td class='clear_middle' align='right'>["+preSet.tick_len+" Mins]</td>\
					<td class='white_last' align='right'>("+xTools.formatNumber(baseProduction)+" + "+xTools.formatNumber(extraProduction)+") = "+xTools.formatNumber(production)+"</td>\
				</tr><tr class='brdTop'>\
					<td class='clear_first'>je Stunde</td>\
					<td class='clear_middle' align='right'>["+(60/preSet.tick_len)+" Ticks]</td>\
					<td class='white_last' align='right'>"+xTools.formatNumber(production*(60/preSet.tick_len))+"</td>\
				</tr><tr class='brdTop'>\
					<td class='clear_first'>am Tag</td>\
					<td class='clear_middle' align='right'>["+(60/preSet.tick_len)*24+" Ticks]</td>\
					<td class='white_last' align='right'>"+xTools.formatNumber(production*(60/preSet.tick_len)*24)+"</td>\
				</tr><tr class='brdTop'>\
					<td class='clear_first'>in <input type='text' maxlength='3' id='calc_hours' value='168'/> Stunden</td>\
					<td class='clear_middle' align='right'><span id='calc_time'></span></td>\
					<td class='white_last' align='right'><span id='calc_ress'>---</span></td>\
				</tr></tbody>\
				<tfoot><tr>\
					<td class='clear_first'></td>\
					<td class='clear_middle'></td>\
					<td class='white_last'></td>\
				</tr></tfoot>\
				</table>";
			storyTxt.html(text);
			$("#calc_hours").width(25)
				.keydown(function (e) {
					return(e.which>=1&&e.which<=100)||(e.which>=48&&e.which<=57);
				})
				.keyup(function (e) {
					if ((e.which>=48&&e.which<=57)||e.which==8||e.which==46) {
						var val=$(this).val();
						if (val=="") {
							$("#calc_time").html("");
							$("#calc_ress").html("---");
						}
						else {
							var hours=parseInt(val);
							$("#calc_time").html("["+xTools.formatNumber((60/preSet.tick_len)*hours)+" Ticks]");
							$("#calc_ress").html(xTools.formatNumber(production*(60/preSet.tick_len)*hours));
						}
					}
				});
		}
	},
	addShamanhutInfo:function () {
		var main=$(".shaman_hut.conjure.paddingContent");
		if (main.length==0) return;
		var mushroom={
			remaining:$(".shaman_hut.conjure .designedTable.mushrooms tbody tr.top .white_middle").text().replace(/\./g,""),
			perTick:0,
			total:0,
		};
		mushroom.perTick=$(".shaman_hut.conjure .designedTable.mushrooms tbody tr.btm .white_middle").text().replace(/\./g,"");
		mushroom.perTick=mushroom.perTick.split("(")[0];
		var UnitInfo=[];
		var UnitList=$(".shaman_hut.conjure #units_build_list table.itemListing form.unitBigIcons.summonForm ");
		$(UnitList).each(function () {
			var pre=$(this);
			var count=-1;
			var unit_name=-1;
			pre.find("div:first").each(function () {
				var item=$(this);
				for (i=0;i<xVars.unit_list.length;++i) {
					unit_name=xVars.unit_list[i];
					if (item.hasClass("unit_"+unit_name)) {
						count=item.next().find("div.top").text().split(" - ");
						count=String(count[0].match(/[0-9.]+/)).replace(/\./g,"");
						mushroom.total=mushroom.total+(xVars.unit_info(unit_name).mushrooms*count);
						break;
					}
				}
			});
			pre.find("div.units_resources span.left span").each(function () {
				var item=$(this);
				if (unit_name!=-1 && count!=-1) {
					item.append('<span style="color:#767676;"> - (ges.: '+
					xTools.formatNumber(xVars.unit_info(unit_name).mushrooms*count)+
					' <img src="http://w1.de.mymagictales.com/xhodon/gfx//icons/mushrooms.png" title="" style="height:14px;"> in '+
					xTools.formatTimeFromTicks(Math.ceil((xVars.unit_info(unit_name).mushrooms*count)/mushroom.perTick))+
					' Stunden)</span>');
				}
			});
		});
		var diff=mushroom.total-mushroom.remaining;
		var ticks=Math.ceil(diff/mushroom.perTick);

		var info=diff<=0
			?'(<span style="color:darkgreen;">Genug vorhanden</span>)'
			:'(<span style="color:red;">'+xTools.formatTimeFromTicks(ticks)+' Stunden</span>)';

		$(".shaman_hut.conjure .designedTable.mushrooms tbody .top").after("\
			<tr class='top xAddon'>\
				<td class='white_first'>Benötigt</td>\
				<td class='white_middle'>"+xTools.formatNumber(mushroom.total)+" \
				<img class='icon20px' title='' alt='Pilze' src='http://w1.de.mymagictales.com/xhodon/gfx/icons/mushrooms.png'> "+info+"</td>\
				<td class='white_last' align='right'></td>\
			</tr>\
		");
	},
	addGuildInfo:function () {
		var uname,uid,upoints,ulevel,main="#contentMain.guild_members table.designedTable:eq(0) tbody tr.brdTop";
		$(main).each(function () {
			var sel=$(this);
			// Get Name+UID
			uname=sel.find("td.white_middle strong").text();
			uid=sel.find("a").attr("href").substr((sel.find("a").attr("href").lastIndexOf("="))+1)||-1;
			upoints=sel.find("td.clear_middle:eq(0)").text();
			ulevel=sel.find("td.white_middle:eq(1)").text();
			if (data[uid]) {
				sel.find("td.clear_middle:eq(0)").text(xTools.formatNumber(upoints)+" ("+(upoints-data[uid].points)+")");
				if (data[uid].level<ulevel) sel.find("td.white_middle:eq(1)").text(ulevel+" (+"+(ulevel-data[uid].level)+")");
			}
			else {
				data[uid]=new xTools.newUser(uid,uname,upoints,ulevel);
				sel.find("td.clear_middle:eq(0)").text(xTools.formatNumber(upoints));
			}
			debug("Member: "+uname+" uid: ["+uid+"], Pts: "+upoints+" - Lvl: "+ulevel);
		});
		debug("GuildMemberList completed");
		xSave("Data"+page.world,data);
	},

	addArmyInfo:function () {
		//return 0;
        var main="#contentMain.attack_army table.unitsList.unitMiddleIcons tbody tr.brdTop:gt(0)";
		$(main).each(function () {
			var sel=$(this);
			var unit_img=$(this).find("td.white_first");
			//--------------------------------------------------
			var unit_now=$(this).find("td.clear_middle:first");
			var val_now=Number(unit_now.text().replace(/\./g,""));
			//--------------------------------------------------
			var unit_att=$(this).find("td.clear_middle:first").next();
			var val_att=Number(unit_att.text().replace(/\./g,""));
			//--------------------------------------------------
			var unit_lif=$(this).find("td.clear_middle:last");
			var val_lif=Number(unit_lif.text().replace(/\./g,""));
			//--------------------------------------------------
			var unit_hut=$(this).find("td.white_last");
			var val_hut=Number(unit_hut.text().replace(/\./g,""));
			//--------------------------------------------------
			debug(val_now+":"+val_att+":"+val_lif+":"+val_hut);
			if (val_hut==0) {
				unit_now.html(xTools.formatNumber(val_now));
				unit_att.html(xTools.formatNumber(val_att));
				unit_lif.html(xTools.formatNumber(val_lif));
			} else {
				unit_now.css({"font-weight":"normal"}).html(xTools.formatNumber(val_now)+"<br/><span style='font-weight:bold;color:green;'>"+xTools.formatNumber(val_now+val_hut)+"</span>");
				unit_att.css({"font-weight":"normal"}).html(xTools.formatNumber(val_att)+"<br/><span style='font-weight:bold;color:green;'>"+xTools.formatNumber((val_att/val_now*val_hut)+val_att)+"</span>");
				unit_lif.css({"font-weight":"normal"}).html(xTools.formatNumber(val_lif)+"<br/><span style='font-weight:bold;color:green;'>"+xTools.formatNumber((val_lif/val_now*val_hut)+val_lif)+"</span>");
				unit_hut.css({"font-weight":"normal"}).html("<span style='font-weight:bold;color:red;'>"+xTools.formatNumber(val_hut)+"</span><br/>0");
			}
		});
		debug("ArmyList completed");
	},
	replaceBonuslink:function () {
		var main="#content .paddingContent.bonusLink .innerContainer .designedTable.linkTable td.white_middle input";
		$(main).val($(main).attr("value").replace("?","/?"));
	},
	insertExtra:function () {
		// make News dragable
		$("#sidebar_outline").addClass("hint").attr("onmouseover","var questdrag=new Draggable('sidebar_outline');return false;");
		var _,tmp="1",now,max;
		// Top Ressources Style
		$("#palace_resources table tbody tr td a span.add").each(function(){$(this).css({"top":"0px"});});
		// Mini Profile
		$("#pVUsername").css({'top':'3px'}).find("a:last").css({'font-weight':'bold','color':'black'}).
			mouseover(function(){$(this).css("color","red");}).
			mouseout(function(){$(this).css("color","black");});
		// Profile Index
		$("#profile_info .category .title strong").each(function(){
			var erg=$(this).text().indexOf("Profil angesehen:");
			if (erg=='0') {$(this).text($(this).text().replace(/Profil angesehen/,'Besucher'));}
		});
		$("#profile_info .category:lt(2)").css({'text-align':'center'});
		// Addon Config Link
		$("#menu-profil ul li.submenu-last").before('<li class="xAddon"><a onclick="return ajax_link(this.href)" href="http://'+page.world+'.de.mymagictales.com/xhodon/profile/settings/others.php?tab=2">xMMT Config</a></li>');
		// Navigation Top Menu
		$("#menu-worlds").remove();
        $("body").append('\
			<div class="xAddon" style="font-size:9px;position:fixed;top:0px;left:'+((window.innerWidth/2)-275)+'px;height:18px;width:550px;background:#343434;border:1px solid;border-color:#DEB887;border-top:0px;opacity:.8;z-index:999;">\
				<table width="100%"><tr>\
					<td align="center"><a target="_blank" href="http://wiki.de.mymagictales.com/" style="color:BurlyWood;" onmouseover="this.style.color=\'#FF0000\';" onmouseout="this.style.color=\'BurlyWood\';">Wiki</a></td>\
					<td align="center"><a target="_blank" href="http://forum.de.mymagictales.com/" style="color:BurlyWood;" onmouseover="this.style.color=\'#FF0000\';" onmouseout="this.style.color=\'BurlyWood\';">Forum</a></td>\
					<td align="center"><a href="http://'+page.world+'.de.mymagictales.com/xhodon/chat.php" style="color:BurlyWood;" onmouseover="this.style.color=\'#FF0000\';" onmouseout="this.style.color=\'BurlyWood\';">Chat</a></td>\
					<td align="center" id="xMMT_klick">00:00</td>\
					<td align="center"><a href="http://'+(page.world=="w1"?"w2":"w1")+'.de.mymagictales.com/xhodon/main.php?newSelectedWorld=20'+(page.world=="w1"?"2":"1")+'" style="color:BurlyWood;" onmouseover="this.style.color=\'#FF0000\';" onmouseout="this.style.color=\'BurlyWood\';"><b>['+(page.world=="w1"?"W2":"W1")+']</b></a></td>\
					<td align="center" id="xMMT_magic">00:00</td>\
					<td align="center"><a target="_blank" href="http://'+page.world+'.de.mymagictales.com/xhodon/support.php" style="color:BurlyWood;" onmouseover="this.style.color=\'#FF0000\';" onmouseout="this.style.color=\'BurlyWood\';">Support</a></td>\
					<td align="center"><a target="_parent" href="http://'+page.world+'.de.mymagictales.com/xhodon/logout.php" style="color:BurlyWood;" onmouseover="this.style.color=\'#FF0000\';" onmouseout="this.style.color=\'BurlyWood\';">Logout</a></td>\
				</tr></table>\
			</div>\
		');
		$("#naviTop").css({'visibility':'hidden'});
		$("#menu-worlds").css({'left':'0%'});
        $("#menu #mainMenu #menu-ally.btn_container ul li.submenu-first").after('\
            <li class="xAddon">\
                <a href="http://w1.de.mymagictales.com/xhodon/guild.php?show=messageboard" onclick="return ajax_link(this.href)">schwarzes Brett</a>\
            </li>\
            <li class="xAddon">\
                <a href="http://w1.de.mymagictales.com/xhodon/guild.php?show=guestsbook" onclick="return ajax_link(this.href)">G&auml;stebuch</a>\
            </li>\
        ');
	},
	embedConfigBtn:function () {
		$("#content div.profileTableContent.paddingContent table.dynamicTabs tbody tr td:first").after('\
			<td>\
				<a class="normBtn normBtn'+((page.id==2)?'_selected':'')+'" onclick="return ajax_link(this.href)" href="http://'+page.world+'.de.mymagictales.com/xhodon/profile/settings/others.php?tab=2">\
					<table><tbody><tr>\
						<td class="btnStart"><div class="spacer"></div></td>\
						<td class="btnMidd">xMMT&nbsp;Config</td>\
						<td class="btnEnd"><div class="spacer"></div></td>\
					</tr></tbody></table>\
				</a>\
			</td>\
		');
	},
	embedConfigTbl:function () {
		$("#content div.profileTableContent.paddingContent #setup_form").html('\
			<table class="designedTable">\
			<tbody>\
			<tr class="topBody">\
				<td class="gray_first" colspan="5" align="center">Grundeinstellungen</td>\
			</tr><tr>\
				<td class="white_first" colspan="5">\
					<form id="xMMT_cfg_general" action="http://'+page.world+'.de.mymagictales.com/xhodon/profile/settings/others.php" method="get">\
					<table style="width:100%;"><tbody>\
					<tr>\
						<td style="width:23px;"><input type="checkbox" name="cb_menu" checked="checked"></td>\
						<td width="100%"><label for="cb_menu"><strong>erweitertes Top-Men&uuml;</strong></label></td>\
						<td align="right"><input type="button" value="Preview" name="img_menu" style="width:48px;" onmouseover="document.getElementById(\'xMMT_preview\').src=\'http://nigroangelus.pytalhost.org/mmt/forum/xMMT_TopMenu.png\';" onclick="document.getElementById(\'xMMT_preview\').src=\'http://s3.amazonaws.com/uso_ss/icon/95471/large.jpg?1326570018\';" title="Bild zur Vorschau wird unten eingeblendet."></td>\
						</td>\
					</tr><tr>\
						<td style="width:23px;"><input type="checkbox" name="cb_ress" checked="checked"></td>\
						<td width="100%"><label for="cb_ress"><strong>zus&auml;tzliche Ressourcen-Infos</strong></label></td>\
						<td align="right"><input type="button" value="Preview" name="img_ress" style="width:48px;" onmouseover="document.getElementById(\'xMMT_preview\').src=\'http://nigroangelus.pytalhost.org/mmt/forum/xMMT_RessInfo.png\';" onclick="document.getElementById(\'xMMT_preview\').src=\'http://s3.amazonaws.com/uso_ss/icon/95471/large.jpg?1326570018\';" title="Bild zur Vorschau wird unten eingeblendet."></td>\
						</td>\
					</tr><tr>\
						<td style="width:23px;"><input type="checkbox" name="cb_shaman" checked="checked"></td>\
						<td width="100%"><label for="cb_shaman"><strong>zus&auml;tzliche Schamanen-Infos</strong></label></td>\
						<td align="right"><input type="button" value="Preview" name="img_shaman" style="width:48px;" onmouseover="document.getElementById(\'xMMT_preview\').src=\'http://nigroangelus.pytalhost.org/mmt/forum/xMMT_ShamanHut.png\';" onclick="document.getElementById(\'xMMT_preview\').src=\'http://s3.amazonaws.com/uso_ss/icon/95471/large.jpg?1326570018\';" title="Bild zur Vorschau wird unten eingeblendet."></td>\
						</td>\
					</tr><tr>\
						<td style="width:23px;"><input type="checkbox" name="new_guild" id="cb_guild" checked="checked"></td>\
						<td width="100%"><label for="cb_guild"><strong>Gilden-Member-Liste mit Speicher</strong></label></td>\
						<td align="right"><input type="button" value="Preview" name="img_guild" style="width:48px;" onmouseover="document.getElementById(\'xMMT_preview\').src=\'http://nigroangelus.pytalhost.org/mmt/forum/xMMT_GuildInfo.png\';" onclick="document.getElementById(\'xMMT_preview\').src=\'http://s3.amazonaws.com/uso_ss/icon/95471/large.jpg?1326570018\';" title="Bild zur Vorschau wird unten eingeblendet."></td>\
						</td>\
					</tr>\
					</tbody></table>\
					</form>\
				</td>\
			</tr><tr class="topBody">\
				<td class="gray_first" colspan="5" align="center">Alarm, Meldungen</td>\
			</tr><tr>\
				<td class="white_first" colspan="5">\
					<form id="xMMT_cfg_alarm" action="http://'+page.world+'.de.mymagictales.com/xhodon/profile/settings/others.php" method="get">\
					<table style="width:100%;"><tbody>\
					<tr>\
						<td style="width:23px;"><input type="checkbox" name="cb_tick" checked="checked"></td>\
						<td width="100%"><label for="cb_tick"><strong>Sound ausgeben zum Ende jedes Ticks</strong></label></td>\
						<td align="right"><input type="button" value="Path" name="inp_tick" style="width:48px;"></td>\
					</tr><tr>\
						<td style="width:23px;"><input type="checkbox" name="cb_magic" checked="checked"></td>\
						<td width="100%"><label for="cb_magic"><strong>Sound ausgeben sobald die GildenZauber resettet wurden</strong></label></td>\
						<td align="right"><input type="button" value="Path" name="inp_magic" style="width:48px;"></td>\
					</tr><tr>\
						<td style="width:23px;"><input type="checkbox" name="cb_fullnrg" checked="checked"></td>\
						<td width="100%"><label for="cb_fullnrg"><strong>Sound ausgeben sobald das EnergieLimit erreicht ist</strong></label></td>\
						<td align="right"><input type="button" value="Path" name="inp_fullnrg" style="width:48px;"></td>\
					</tr>\
					</tbody></table>\
					</form>\
				</td>\
			</tr>\<tr class="topBody">\
				<td class="gray_first" colspan="5" align="center">Sonstiges</td>\
			</tr><tr>\
				<td class="white_first" colspan="5">\
					<form id="xMMT_cfg_other" action="http://'+page.world+'.de.mymagictales.com/xhodon/profile/settings/others.php" method="get">\
					<table style="width:100%;"><tbody>\
					<tr>\
						<td style="width:23px;"><input type="checkbox" name="cb_auto_tick" checked="checked"></td>\
						<td width="100%"><label for="cb_auto_tick"><strong>Zum Ende des Ticks automatisch Energie erh&ouml;hen</strong></label></td>\
						<td align="right"><input type="button" value="NoFunc" name="inp_auto_tick" style="width:48px;"></td>\
					</tr><tr>\
						<td style="width:23px;"><input type="checkbox" name="cb_reset_guild" disabled></td>\
						<td width="100%"><label for="cb_reset_guild"><strong>&Uuml;bersicht der GildenPunkte zur&uuml;cksetzen</strong></label></td>\
						<td align="right"><input type="button" value="Reset" id="inp_reset_guild" name="inp_reset_guild" style="width:48px;"></td>\
					</tr>\
					</tbody></table>\
					</form>\
				</td>\
			</tr>\
			</tbody>\
			<tfoot>\
			<tr>\
				<td class="white_first" colspan="5" align="center"><font color="darkred"><br/>Nachdem Du Deine Einstellungen hier vorgenommen hast, lade die Seite bitte einmal neu.</font></td>\
			</tr>\
			</tfoot>\
			</table>\
			<table style="border:1px ridge red;width:609px;background:#FBFAF6;"><tr>\
				<td align="center"><img id="xMMT_preview" src="http://s3.amazonaws.com/uso_ss/icon/95471/large.jpg?1326570018" alt="" title="" style="max-width:600px;"></td>\
			</tr></table>\
		');
		//$("#img_menu").click(function (e) {alert(this.checked);})
		//$("#img_ress").click(function (e) {return(e.which>=1&&e.which<=100)||(e.which>=48&&e.which<=57);})
		//$("#img_shaman").click(function (e) {return(e.which>=1&&e.which<=100)||(e.which>=48&&e.which<=57);})
		//$("#img_guild").click(function (e) {return(e.which>=1&&e.which<=100)||(e.which>=48&&e.which<=57);})
		//$("#inp_tick").click(function (e) {return(e.which>=1&&e.which<=100)||(e.which>=48&&e.which<=57);})
		//$("#inp_magic").click(function (e) {return(e.which>=1&&e.which<=100)||(e.which>=48&&e.which<=57);})
		//$("#inp_fullnrg").click(function (e) {return(e.which>=1&&e.which<=100)||(e.which>=48&&e.which<=57);})
		//$("#inp_auto_tick").click(function (e) {return(e.which>=1&&e.which<=100)||(e.which>=48&&e.which<=57);})
		$("#inp_reset_guild").click(function (e) {data={};xSave("Data"+page.world,data);xLoad("Data"+page.world);})
	}
};

var xTools={
	currentPage:function () {
	// Detects which page is currently shown.
		var hash=document.location.hash;
		var welt=hash.substr(8,2);
		var pos=hash.lastIndexOf(".php");
		var slashPos=hash.lastIndexOf("/",pos);
		if ( pos==-1||slashPos==-1) {return {name:false};}
		var page=hash.substring(slashPos+1,pos);
		if (page=="building") {
			var id=/building.php\?numeric\[building_id\]=(\d+)/.exec(hash);
			return {name:page,id:(id&&id.length>=1)?id[1]:-1,world:welt};
		}
		else if (page=="index") {
			var id=/index.php\?numeric\[user_id\]=(\d+)/.exec(hash);
			return {name:page,id:(id&&id.length>=1)?id[1]:-1,world:welt};
		}
		else if (page=="fights") {
			var id=/fights.php\?numeric\[user_id\]=(\d+)/.exec(hash);
			return {name:page,id:(id&&id.length>=1)?id[1]:-1,world:welt};
		}
		else if (page=="guild") {
			var id=/show=(\S+)/.exec(hash);
			return {name:page,id:(id&&id.length>=1)?id[1]:-1,world:welt};
		}
		else if (page=="others") {
			var id=/tab=(\S+)/.exec(hash);
			return {name:page,id:(id&&id.length>=1)?id[1]:-1,world:welt};
		}
		else if (page=="events") {
			var id=/numeric\[id\]=(\d+)/.exec(hash);
			return {name:page,id:(id&&id.length>=1)?id[1]:-1,world:welt}
		}

		else if (page=="attack") {
			var id=/show=(\S+)/.exec(hash);
			return {name:page,id:(id&&id.length>=1)?id[1]:-1,world:welt}
		}
		else {return {name:page,world:welt};}
	},
	newUser:function (UID,NAME,POINTS,LEVEL) {
	// Create a new User Object
		this.uid=((typeof(UID)=="undefined")?-1:UID);
		this.name=((typeof(NAME)=="undefined")?"*unknownPlayer*":NAME);
		this.date=new Date().getTime();
		this.points=((typeof(POINTS)=="undefined")?0:POINTS);
		this.level=((typeof(LEVEL)=="undefined")?0:LEVEL);
		this.canfight=false;
		this.fights=-1;
		this.lost=-1;
		this.won=-1;
		this.essences=0;
		this.crystals=0;
		this.stones=0;
		this.gold=0;
		this.goblin=-1;
		this.icewarrior=-1;
		this.warriorpriest=-1;
		this.axe_swinging_dwarf=-1;
		this.doubleaxe_dwarf=-1;
		this.singing_halfgiant=-1;
		this.stone_throwing_troll=-1;
		this.powerchild=-1;
		this.hysterical_centauress=-1;
		this.wild_centaur=-1;
		this.elven_archer=-1;
		this.fire_fay=-1;
		this.treegiant=-1;
		this.elv_magican=-1;
	},
	formatNumber:function (number) {
	// Returns formatted String (split 3, add dot)
		number=number+"";
		var i=number.length-3;
		while (i>0) {
			if (i==1&&number[0]=="-") break;
			number=number.substring(0,i)+"."+number.substring(i,number.length);
			i-=3;
		}
		return number;
	},
	formatTimeFromTicks:function (ticks) {
	// Returns formatted Time String from given ticks
		var minutes=ticks*preSet.tick_len;
		var hours=Math.floor(minutes/60);
		minutes-=hours*60;
		return hours+":"+(minutes>=10?minutes:"0"+minutes);
	},
	returnDateTime:function (obj,dt) {
	// Returns formatted Date or Time String from Date Object
		if (dt=="d") return (((obj.getDate()<=9)?"0"+obj.getDate():obj.getDate())+'.'+((obj.getMonth()<=9)?"0"+obj.getMonth():obj.getMonth())+'.'+obj.getFullYear()+", ");
		if (dt=="t") return (((obj.getHours()<=9)?"0"+obj.getHours():obj.getHours())+':'+((obj.getMinutes()<=9)?"0"+obj.getMinutes():obj.getMinutes())+':'+((obj.getSeconds()<=9)?"0"+obj.getSeconds():obj.getSeconds()));
	},
	getGuildMagic:function () {
		var _=/(\d+).(\d+).(\d+)\s*(\d+):(\d+):(\d+)/.exec($("#contentMain.guild_magic .designedTable .white_first .topInfo .guildCountdown strong.warning:first").text());
		// dd.mm.jjjj hh:mm:ss
		if (_==null) return;
		gbonus=new Date(_[3],_[2]-1,_[1],_[4],_[5],_[6]);
		xSave("Magic"+page.world,gbonus);
		debug("GuildMagic TimeStamp: "+gbonus);
	},
	getUserData:function () {
		if (!data[page.id]) data[page.id]=new xTools.newUser(page.id);
		if (page.name=="index") {
			var fights=/\s*(\d+)/.exec($("#profile_info div.category span strong a").text());
			data[page.id].fights=(fights&&fights.length>=1)?fights[1]:-1;
		}
		if (page.name=="fights") {
			var wins=/\s*(\d+)/.exec($("#content .profileTableContent .fightStatistics .designedTable tbody tr:nth-child(3) .clear_last").text());
			var lost=/\s*(\d+)/.exec($("#content .profileTableContent .fightStatistics .designedTable tbody tr:nth-child(4) .clear_last").text());
			data[page.id].won=(wins&&wins.length>=1)?wins[1]:-1;
			data[page.id].lost=(lost&&lost.length>=1)?lost[1]:-1;
		}
		xSave("Data"+page.world,data);
	},
	copyFightToClipboard:function () {
		var i=0,main="#events .designedTable .brdTop";
		$(main).each(function () {
			var pre=$(this);
			pre.find("td.white_first span.date").append(' &nbsp; <input type="submit" onclick="" name="xMMT_copyKB" value="(in die Zwischenablage kopieren)" class="stSubmitBtn" id="xMMT_copyKB_'+i+'">');
			debug("CB-"+i);
			i++;
		});
		debug("Clipboard");
	}
};

// Save/Load DataStack
function xLoad (name,def) {
	return eval(GM_getValue(name,(def||'({})')));
}
function xSave (name,val) {
	GM_setValue(name,uneval(val));
}

// Function initializing the script
var xStart=function () {
	var usageS=new Date().getTime();
	$("body").find(".xAddon").remove();
	SetVars();
	xHtml.addTextPad();
	xHtml.insertExtra();
	xHtml.setIntervals();
	if (page.name=="bonusLink") xHtml.replaceBonuslink();
	if (page.name=="events") xTools.copyFightToClipboard();
	if (page.id<=4||page.id==16) xHtml.addRessCalc(page.id);
	if (page.name=="index"&&page.id!=-1) xTools.getUserData();
	if (page.name=="fights"&&page.id!=-1) xTools.getUserData();
	if (page.name=="others"&&page.id==2) xHtml.embedConfigTbl();
	if (page.name=="attack"&&page.id=="army") xHtml.addArmyInfo();
	if (page.name=="building"&&page.id==5) xHtml.addShamanhutInfo();
	if (page.name=="guild"&&page.id=="magic") xTools.getGuildMagic();
	if (page.name=="guild"&&page.id=="members") xHtml.addGuildInfo();
	if (page.name=="others"||page.name=="account") xHtml.embedConfigBtn();
	xHtml.addInfoDiv(page.name,"",((new Date().getTime()-usageS)/1000).toFixed(2));
	debug ("Now running ..");
}

// Startup sequence
var orig=unsafeWindow.ajax_load;
unsafeWindow.ajax_load=function (display) {
    orig(display);
	if (display==false) {
		setTimeout(xStart,1);
	}
}
