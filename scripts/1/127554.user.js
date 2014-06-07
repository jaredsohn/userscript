// ==UserScript==
// @name 	Kick-o-matic PL
// @description Skrypt do przyznawania rang podczas fortów.
// @author 	Macabre2077 / Darius II
// @version 	1.36
// @include 	http://*.the-west.*/game.php*
// @require     http://userscripts.org/scripts/source/74144.user.js

// @history		1.36 1.36 version bugfix
// @history		1.32 Translations: Spanish and Italian
// @history		1.3 Translations: english, dutch!
// @history		1.3 Bugfix: selected player stays highlighted
// @history		1.2 old popup redesign,added compact version of popup,  weapon accordance, intro
// @history		1.18 bugfix
// @history		1.15 fixed bug when one player`s data can`t be shown
// @history		1.15 prevents too long loading
// @history		1.1 new design
// @history		1.1 force chat to show ranks
// @history		1.1 bug fixes
// @history		1.000 players` hp (without lists) and town name
// @history		0.995 lists without {}
// @history		0.995 update hp list button
// @history		0.992 small bugfix
// @history		0.99 players` hp
// @history		0.98 player`s position is being highlihted when popup is shown
// @history		0.97 ally`s name is shown
// @history		0.96 new script`s name,added namespace
// @history		0.95 new feature fully completed
// @history		0.94 testing new feature - showing name of sector instead of numeric fort position
// @history		0.93 fixed bug caused by empty fort weapon
// @history		0.92 fixed mulitply battles error
// ==/UserScript==

/* Todo:
Any good ideas?
*/

try {
	ScriptUpdater.check(127554, 1.36);
} catch(e) { }

function between(s , prefix, suffix) {
	var i = s.indexOf(prefix);
	if (i >= 0) {
		s = s.substring(i + prefix.length);
	} else {
		return '';
	}
	if (suffix) {
		i = s.indexOf(suffix);
		if (i >= 0) {
		  s = s.substring(0, i);
		} else {
		  return '';
		}
	}
	return s;
}

function highlightpos(idx,fortId){
	var el=$("fortbattle_placement_map_"+fortId+"_marker");
	if(idx===undefined||idx<0){el.style.display="none";return;}
	var cellWidth=15;
	var cellHeight=15;
	var pixelWidth=510;
	var pixelHeight=360;
	var mapWidth=pixelWidth/cellWidth;
	var mapHeight=pixelHeight/cellHeight;
	var x=idx%mapWidth-1;
	var y=Math.floor(idx/mapWidth)-1;
	el.style.left=x*cellWidth+"px";
	el.style.top=y*cellHeight+"px";
	el.style.display="block";

	Grander.highlighted[fortId] = true;
}

function hide(){
	Grander.mb.hide();
	for(fortId in Grander.highlighted){
		Grander.highlightpos(undefined,fortId);
	}
	Grander.highlighted = new Object;
	Grander.player_name = undefined;
}

function find_fortroom(fort_id){
	for(roomname in chatcontrol.rooms){
		if(chatcontrol.rooms[roomname].roomdescription.hasOwnProperty("fortid") && chatcontrol.rooms[roomname].roomdescription.fortid == fort_id){
			return roomname;
		}
	}
	return false;
}

function getRoomNameByTitle( title ){
	for(roomname in chatcontrol.rooms){
		if(chatcontrol.rooms[roomname].roomdescription.title == title){
			return roomname;
		}
	}
	return false;
}

function findkey( roomname , id ) {
	var key;
	for(key in chatcontrol.rooms[roomname].members)
	{
		if(chatcontrol.rooms[roomname].members[key].westid == id)
			return key;
	}
	return false;
}

function getKeyByValue(array, value){
	var key;
	for(key in array)  {
		if(array[key] == value)	{
			return key;
		}
	}
	return false;	
}

function stripe ( data , fort ) {
 	(new Ajax("game.php?window=fort_battlepage&action=updatePrivileges&h="+h,{method:'post',data:{fort_id:fort,privileges:data},onComplete:function(data){
		data=Json.evaluate(data);
		if(data.playerlist.length > 0){
			new HumanMessage(Grander.lang.success,{type:"success"});
			for(i in data){
				if(data[i].player_id != undefined) {
					Grander.players_data[fort][data[i].player_id] = data[i];
				}
			}
			Grander.count_(fort);
			Grander.hide();
		}
	}})).request();
}

function force(fortId , rank, roomname){
 	var wh = true,player_id;
	while(wh){
		if(Grander.force_in_progress === false){
			Grander.force_in_progress = true;
			wh = false;
			for(player_id in Grander.players_data[fortId]){
				if(Grander.players_data[fortId][player_id].privilege < rank && Grander.FindKey( roomname , player_id ) != false){
					Grander.fPID = player_id;
					Grander.fFID = fortId;
					Grander.fRank = Grander.players_data[fortId][player_id].privilege;
					if(Grander.fRank == "-2")
						var newrank = "-1";
					else if(Grander.fRank == "2")
						var newrank = "1";
					else
						var newrank = Grander.fRank-1;
					(new Ajax("game.php?window=fort_battlepage&action=updatePrivileges&h="+h,{method:'post',data:{fort_id:fortId,privileges:"[["+player_id+","+newrank+"]]"},onComplete:function(data){
						(new Ajax("game.php?window=fort_battlepage&action=updatePrivileges&h="+h,{method:'post',data:{fort_id:Grander.fFID,privileges:"[["+Grander.fPID+","+Grander.fRank+"]]"},onComplete:function(data){ Grander.force_in_progress = false; }})).request();
					}})).request();
					return;
				}
			}
		}
	}
	new HumanMessage(Grander.lang.error,{type:"fail"});
}

function get_alliance_name(id){
	Ajax.remoteCall('alliance&alliance_id='+id,'',{},function(data){
		if(id != 0){
			Grander.allies_names[id] = "<span" + (id == chatcontrol.self.allianceId ? " style='color:green;'" : " ") + "onclick='Alliance.show("+id+")'>" + eval('(["' + Grander.between(data.js,'innerHTML = "','";')+'"])' ) + "</span>";
		} else {
			Grander.allies_names[0] = "<span style='text-decoration: underline;'>"+Grander.lang.noally+"</span>";
		}
	});
}

function smallPopUp(e){
try {
	if(Grander.in_progress == false){
		Grander.in_progress = true;
		
		function poplink(id,tx,fort,westid,rank){return"<a id='"+id+"' onclick='javascript:Grander.stripe(\"[["+westid+","+rank+"]] \", " + fort + ");'>"+tx+"</a><br/>";}
		function gradeimg(grade,tx){return"<img src='/images/chat/servicegrade_"+(gradelist[grade]||grade)+".png' title='<strong>"+(tx||gradelist_locale[grade])+"</strong>' />";}
		
		var gradelist = {"-2":"traitor","-1":"reservist","0":"recruit","1":"private","2":"captain","3":"general"};
		var gradelist_locale = {
            "-2":Grander.lang.ranks.traitor,
            "-1":Grander.lang.ranks.reservist,
            "0":Grander.lang.ranks.recruit,
            "1":Grander.lang.ranks.private_,
            "2":Grander.lang.ranks.captain,
            "3":Grander.lang.ranks.general
        };
		var evt = new Event(e || window.event);
		var x = evt.client.x;
		var y = evt.client.y;
		var rv = FortBattle.rankvalue;
		var westid = Grander.westid[0];
		var roomname;
		var tx = [];
		
		for(roomname in chatcontrol.rooms){
			if(roomname == Grander.fortRoom && chatcontrol.rooms[roomname].roomdescription.hasOwnProperty("fortid")){
				var fort_id = chatcontrol.rooms[roomname].roomdescription.fortid;
				
				if(!chatcontrol.rankinfo.hasOwnProperty(roomname) && !Grander.players_data.hasOwnProperty(fort_id)){
					Grander.get_players_data(fort_id);
					new HumanMessage(Grander.lang.nodata,{type:"fail"});return;
				}

				var player_key = Grander.FindKey( roomname , westid );
				var player_priv = chatcontrol.rankinfo[roomname][westid].rank;
				var player_name  = chatcontrol.rooms[roomname].members[player_key].name;
				
				var mypriv = chatcontrol.rankinfo[roomname][chatcontrol.self.westid].rank;
	
				if (player_priv < mypriv && mypriv > rv.PRIVATE) {
					if (player_priv != rv.CAPTAIN && mypriv > rv.CAPTAIN) {
						tx.push(poplink("fb_promo_captain", gradeimg("captain", Grander.lang.ascpt) + Grander.lang.ascpt , fort_id , westid , 2));
					}
					if (player_priv != rv.PRIVATE) {
						tx.push(poplink("fb_promo_private", gradeimg("private", Grander.lang.asprivate) + Grander.lang.asprivate , fort_id , westid , 1));
					}
					if (player_priv != rv.RECRUIT) {
						tx.push(poplink("fb_promo_recruit", gradeimg("recruit", Grander.lang.asrecruit) + Grander.lang.asrecruit , fort_id , westid , 0));
					}
					if (player_priv != rv.RESERVIST) {
						tx.push(poplink("fb_promo_reservist", gradeimg("reservist", Grander.lang.asreservist) + Grander.lang.asreservist , fort_id , westid ,-1));
					}
					if (player_priv != rv.TRAITOR) {
						tx.push(poplink("fb_promo_traitor", gradeimg("traitor", Grander.lang.astraitor) + Grander.lang.astraitor , fort_id , westid ,-2));
					}
					tx.push('</div>');
				} else {
					tx.push("<div style='width:200px;text-align:center;padding:4px'>" + "\u0422\u044B \u043D\u0435 \u043C\u043E\u0436\u0435\u0448\u044C \u043F\u043E\u043D\u0438\u0437\u0438\u0442\u044C \u0441\u0442\u0430\u0440\u0448\u0435\u0433\u043E \u0438\u043B\u0438 \u0440\u0430\u0432\u043D\u043E\u0433\u043E \u043F\u043E \u0437\u0432\u0430\u043D\u0438\u044E." + "</div>");
				}
				
		
				var title = '<div class="tw2gui_win2" style="height: 32px; font-size: 20pt; font-style: normal; font-variant: normal; font-weight: bold; line-height: normal; "><div class="playerprofile-title-player"><span onclick="javascript:PlayerProfileWindow.open('+Grander.westid[0]+');">'+player_name+' </span><a href="javascript:WMap.scroll_map_to_player('+Grander.westid[0]+');" title="'+Grander.lang.showPlayerOnMap+'" class="tw2gui_inner_window_title_divider"></a></div></div>';

				Grander.mb = new MessageDialog(title).addButton(Grander.lang.cancel).setId('GranderPopUp').setModal(true,true);
				Grander.mb.setText(tx.join("")).setX(x).setY(y-50).show();
				break;
			}
		}
		Grander.in_progress = false;
	}
} catch(e) {
	Grander.in_progress = false;
	alert(Grander.lang.error + e);
}
}
	
function PopUp(e){
try {
	if(window.location.href.match("ru3") && [25,152,159,179].indexOf(chatcontrol.self.allianceId)>=0){
		new HumanMessage("ASPERUS?!",{type:"fail"});window.Grander = undefined;return;
	}
	if(Grander.in_progress == false){
		Grander.in_progress = true;

		function poplink(id,tx,fort,westid,rank){return"<a id='"+id+"' onclick='javascript:Grander.stripe(\"[["+westid+","+rank+"]] \", " + fort + ");'>"+tx+"</a><br/>";}
		function gradeimg(grade,tx){return"<img src='/images/chat/servicegrade_"+(gradelist[grade]||grade)+".png' title='<b>"+(tx||gradelist_locale[grade])+"</b>' />";}

        var gradelist = {"-2":"traitor","-1":"reservist","0":"recruit","1":"private","2":"captain","3":"general"};
        var gradelist_locale = {
            "-2":Grander.lang.ranks.traitor,
            "-1":Grander.lang.ranks.reservist,
            "0":Grander.lang.ranks.recruit,
            "1":Grander.lang.ranks.private_,
            "2":Grander.lang.ranks.captain,
            "3":Grander.lang.ranks.general
        };
		var evt = new Event(e || window.event);
		var x = evt.client.x;
		var y = evt.client.y;
		var rv = FortBattle.rankvalue;
		var westid = Grander.westid[0];
		var roomname;
        var tx = [];

		for(roomname in chatcontrol.rooms){
			if(roomname == Grander.fortRoom && chatcontrol.rooms[roomname].roomdescription.hasOwnProperty("fortid")){
				var fort_id = chatcontrol.rooms[roomname].roomdescription.fortid;
				if(!chatcontrol.rankinfo.hasOwnProperty(roomname) && !Grander.players_data.hasOwnProperty(fort_id)){
					Grander.get_players_data(fort_id);
					new HumanMessage(Grander.lang.nodata,{type:"fail"});return;
				}

				var fort_name = chatcontrol.rooms[roomname].roomdescription.title;
				var fort_x = chatcontrol.rooms[roomname].roomdescription.x;
				var fort_y = chatcontrol.rooms[roomname].roomdescription.y;
				var fort_side = chatcontrol.rooms[roomname].roomdescription.defense == true ? "defense" : "attack";

				var player_key = Grander.FindKey( roomname , westid );
				if(Grander.players_data[fort_id][westid] == undefined && player_key !== false) Grander.get_players_data(fort_id);
				if(player_key !== false){
					Grander.lFID = fort_id;
 					if(!chatcontrol.rankinfo.hasOwnProperty(roomname)){
						var player_pos = Grander.players_data[fort_id][westid].idx;
						var player_priv = Grander.players_data[fort_id][westid].privilege;
						var mypriv = Grander.players_data[fort_id][chatcontrol.self.westid].privilege;
						if(mypriv > rv.PRIVATE){
							new HumanMessage(Grander.lang.getData,{type:"success"});
							Grander.force(fort_id,mypriv,roomname);
						}
					} else {
						var player_pos = chatcontrol.rankinfo[roomname][westid].position;
						var player_priv = chatcontrol.rankinfo[roomname][westid].rank;
						var mypriv = chatcontrol.rankinfo[roomname][chatcontrol.self.westid].rank;
					}

					if(Grander.player_name == undefined && Grander.player_class == undefined && Grander.player_ally_id == undefined ){
						Grander.player_name  = chatcontrol.rooms[roomname].members[player_key].name;
                        Grander.player_class = chatcontrol.rooms[roomname].members[player_key].cclass;
						Grander.player_ally_id = chatcontrol.rooms[roomname].members[player_key].allianceId;
					}
					
					if(Grander.allies_names[Grander.player_ally_id] == undefined){
						Grander.get_alliance_name(Grander.player_ally_id);
					}

					if($('window_fort_battlepage_'+fort_id)){
						Grander.highlightpos(player_pos,fort_id);
					}
					
					if(fort_side === "attack") {
						var pos_name = Grander.sectors[Grander.coords.attack[player_pos]];
					} else {
						var size = Grander.fort_size[fort_id];
						var pos_name = Grander.sectors[Grander.coords[size][player_pos]];
						if(pos_name == undefined)
							pos_name = Grander.sectors[20];
					}
					
 					diffx = Grander.players_data[fort_id][Grander.westid[0]]['fortcoords']['x'] - Grander.players_data[fort_id][Grander.westid[0]]['coords']['x'];
					diffy = Grander.players_data[fort_id][Grander.westid[0]]['fortcoords']['y'] - Grander.players_data[fort_id][Grander.westid[0]]['coords']['y'];

					if (!diffx && !diffy){
                        var lat_img = '<img src="/images/town/cityhall/green.png">&nbsp;';
                    } else if (Math.abs(diffx) <= 50 && Math.abs(diffy) <= 50) {
						var lat_img = '<img src="/images/town/cityhall/yellow.png">&nbsp;';
                    } else {
						var lat_img = '<img src="/images/town/cityhall/red.png">&nbsp;';
                    }
					
					tx.push('<img src="http://www.the-west.ru/images/fort/battle/divider.png" style="-moz-user-select: none;"><br/>');
                    tx.push("<a href=\"javascript:AjaxWindow.show('fort',{fort_id:"+ fort_id +"},'"+fort_x+"_"+fort_y+"');\">" + lat_img + fort_name + "<p>");
					tx.push("<span id='fort_capacity_"+fort_id+"'>"+Grander.count_(fort_id,true)+"</span><p>");
					tx.push(Grander.lang.position + pos_name + "</a></p><img src='../images/fort/battle/divider.png' style='-moz-user-select: none;'><br/>");
					if (player_priv < mypriv && mypriv > rv.PRIVATE) {
						if (player_priv != rv.CAPTAIN && mypriv > rv.CAPTAIN) {
							tx.push(poplink("fb_promo_captain", gradeimg("captain", Grander.lang.ascpt) + Grander.lang.ascpt , fort_id , westid , 2));
						}
						if (player_priv != rv.PRIVATE) {
							tx.push(poplink("fb_promo_private", gradeimg("private", Grander.lang.asprivate) + Grander.lang.asprivate , fort_id , westid , 1));
						}
						if (player_priv != rv.RECRUIT) {
							tx.push(poplink("fb_promo_recruit", gradeimg("recruit", Grander.lang.asrecruit) + Grander.lang.asrecruit , fort_id , westid , 0));
						}
						if (player_priv != rv.RESERVIST) {
							tx.push(poplink("fb_promo_reservist", gradeimg("reservist", Grander.lang.asreservist) + Grander.lang.asreservist , fort_id , westid ,-1));
						}
						if (player_priv != rv.TRAITOR) {
							tx.push(poplink("fb_promo_traitor", gradeimg("traitor", Grander.lang.astraitor) + Grander.lang.astraitor , fort_id , westid ,-2));
						}
						tx.push('</div>');
					} else {
						tx.push(Grander.lang.youcant);
					}
				}
				break;
			}
		}
		
		var i = 0;

 		var interval = setInterval(function(){
			i++;
			if( i==50 ){ // 12.5 секунд
				new HumanMessage(Grander.lang.errorTimeout,{type:"fail"});
				clearInterval(interval);
				Grander.in_progress = false;
				Grander.player_ally_id = undefined;
				Grander.lFID = undefined;
			}
			if(Grander.allies_names[Grander.player_ally_id] != undefined){
                var town_r;
                var minDmg = Grander.players_data[Grander.lFID][Grander.westid[0]]['weapon_damage']['min'];
                var maxDmg = Grander.players_data[Grander.lFID][Grander.westid[0]]['weapon_damage']['max'];
                var weapon = Grander.players_data[Grander.lFID][Grander.westid[0]]['weapon'];
		var weaponImg  = Grander.weaponImg[minDmg+"_"+maxDmg];
                var townId = Grander.players_data[Grander.lFID][Grander.westid[0]]['town_id'];
		var allianceHref = '<a href="' + (Grander.player_ally_id == 0 ? 'javascript:Alliance.show('+Grander.player_ally_id+');' : '#') + '">';
				clearInterval(interval);
				switch(Grander.players_data[Grander.lFID][Grander.westid[0]]['town_rights']) {
					case 1: town_r = "norights"; break;
					case 2: town_r = "councillor"; break;
					case 3: town_r = "founder"; break;
					default: town_r = "norights"; break;
				}

				var town = Grander.players_data[Grander.lFID][Grander.westid[0]]['townname'];
				// if(town.length > 15) town = town.substr(0,8)+"..."+town.substr(-4);
				tx.unshift('<div style="display:inline-block;float:right;"><span style="font-size:16px; text-align: center;"><img src="/images/transparent.png" style="width: 18px; height: 15px;" class="city_' + town_r + ' city_rightsimg"/><a style="display:inline;padding:0;" class="profile_link_town_overview" alt="'+Grander.lang.showTown+'" href="javascript:AjaxWindow.show(\'town\',{town_id:'+townId+'});"> '+town+'</a></span><br/><span style="color:green; float:right;"><img src="http://www.the-west.ru/images/chat/channelpic-alliance.png" alt="ally"/> '+allianceHref + Grander.allies_names[Grander.player_ally_id]+'</a></span></div><br/>');
                tx.unshift('<div class="txcenter">	<div style="background:url(http://img1.uploadscreenshot.com/images/orig/2/5422490962-orig.png) right top;width: 210px;height:14px;display:inline-block;padding:2px;margin:0;font-size:8pt;text-align:left">			<div style="background: url(&quot;images/character_bars/filler.png&quot;) repeat scroll 0% 0% transparent; width: '+Math.floor(Grander.players_data[Grander.lFID][Grander.westid[0]]['currhealth']/Grander.players_data[Grander.lFID][Grander.westid[0]]['maxhealth']*194)+'px; height: 14px; padding: 0pt; margin: 0pt; position: absolute;" id="recruit_healthbar"></div>			<div id="recruit_health" style="position:absolute; color:white;width: 194px;text-align:center">'+Grander.players_data[Grander.lFID][Grander.westid[0]]['currhealth']+' / '+Grander.players_data[Grander.lFID][Grander.westid[0]]['maxhealth']+'</div></div><br/>');
                tx.unshift('<div style="position: absolute;left: -218px;top: 80px;">	<img src="http://www.the-west.ru/images/window/character/'+(Grander.player_class == "greenhorn" ? "symbol_" : "")+Grander.player_class+'.png"/><span style="position: absolute; top: 92px; left: 22px; color: white; text-align: center; width: 125px;">'+Grander.lang.classes[Grander.player_class]+'</span></div>');
                tx.unshift('<div class="ups_slot" style="position: absolute;left: -250px;top: -5px;">	<span class="slot_icon">		<div class="item item_upshop">			<img src="'+weaponImg+'" class="tw_item"/>			<span class="count"><p></p></span>		</div>	</span>	<span class="slot_desc">'+weapon+'<br/> '+minDmg+'-'+maxDmg+' '+Grander.lang.damage+'</span>	<span class="slot_buybutton" style="padding-left: 50px; padding-top: 5px;"><img src="http://www.the-west.ru/images/window/dailyactivity/'+Grander.checkWeapon(minDmg, maxDmg, (Grander.player_class == "soldier"), Grander.players_data[Grander.lFID][Grander.westid[0]]['level'] )+'.png"/></span></div>');
                var title = '<div class="tw2gui_win2" style="height: 32px; font-size: 20pt; font-style: normal; font-variant: normal; font-weight: bold; line-height: normal; "><div class="playerprofile-title-player"><span onclick="javascript:PlayerProfileWindow.open('+Grander.westid[0]+');">'+Grander.player_name+' </span><a href="javascript:WMap.scroll_map_to_player('+Grander.westid[0]+');" title="'+Grander.lang.showPlayerOnMap+'" class="tw2gui_inner_window_title_divider"></a></div><a href="javascript:WMap.scroll_map_to_town('+townId+');" title="'+Grander.lang.showPlayerOnMap+'" class="tw2gui_inner_window_title_divider"></a></div></div>';

                Grander.mb = new MessageDialog(title).addButton(Grander.lang.cancel).setId('GranderPopUp').setModal(true,true);
                Grander.mb.setText(tx.join("")).setX(x).setY(y-250).show();
                Grander.mb.elModalFrame.mousedown(function(){Grander.hide();});
				Grander.in_progress = false;
				Grander.player_ally_id = undefined;
				Grander.lFID = undefined;
				Grander.player_name = undefined;
				Grander.player_class = undefined;
				Grander.player_ally_id = undefined;
				(function($){
					$("#GranderPopUp").css("min-width","0");
					$("#GranderPopUp .messagedialog_content").css("padding-bottom","5px");}
				)(jQuery);
 			}
		},250);
	}
} catch(e){
	Grander.in_progress = false;
	alert(Grander.lang.cancel + e);
}
}

function Interval() {
	for(roomname in chatcontrol.rooms){
		if(chatcontrol.rooms[roomname].roomdescription.hasOwnProperty("fortid")){
			var fortId = chatcontrol.rooms[roomname].roomdescription.fortid;
			if(Grander.fort_size[fortId] == undefined){
				Ajax.remoteCall("fort","display",{fortid: fortId, x:chatcontrol.rooms[roomname].roomdescription.x, y:chatcontrol.rooms[roomname].roomdescription.y},function(data) {
					console.log(data);
					Grander.fort_size[data.data.fortid] = data.data.type;
					console.log(data.data.fortid + ":" + data.data.type);
				});
				if(Grander.players_data[fortId] == undefined){
					Grander.get_players_data(fortId);
				}
			}
		}
	}
	var f = function(e)  {
		Grander.westid = this.parentNode.parentNode.className.match(/[0-9]+/);
		var room = this.parentNode.parentNode.parentNode.parentNode.id.match(/(room_fortbattle_(att|def)_[0-9]+)_/);
		if(room != null) {
			Grander.fortRoom = room[1];
		} else {
			Grander.fortRoom = Grander.getRoomNameByTitle((this.parentNode.parentNode.parentNode.parentNode.getElementsByTagName('span'))[1].innerHTML);
		}
		console.log(Grander.fortRoom);
		if(e.ctrlKey){
			Grander.smallPopUp(e);
		} else {
			Grander.PopUp(e);
		}
	};
	
	$$(".chat_servicegrade_captain").removeEvents('click');
	$$(".chat_servicegrade_captain").addEvent('click', f);
	$$(".chat_servicegrade_private").removeEvents('click');
	$$(".chat_servicegrade_private").addEvent('click', f);
	$$(".chat_servicegrade_recruit").removeEvents('click');
	$$(".chat_servicegrade_recruit").addEvent('click', f);
	$$(".chat_servicegrade_reservist").removeEvents('click');
	$$(".chat_servicegrade_reservist").addEvent('click', f);
	$$(".chat_servicegrade_traitor").removeEvents('click');
	$$(".chat_servicegrade_traitor").addEvent('click', f);
}

function get_players_data(fortId){
 	if(fortId != undefined){Grander.append_data(fortId);return;}
	for(roomname in chatcontrol.rooms){
		if(chatcontrol.rooms[roomname].roomdescription.hasOwnProperty("fortid")){
			Grander.append_data(chatcontrol.rooms[roomname].roomdescription.fortid);
		}
	} 
}

function findWeapon(min, max, level){
	var i;
	level = level | Grander.players_data[Grander.lFID][Grander.westid[0]]['level'];
	for(i in Grander.weapons){
		if(Grander.weapons[i]["min"] == min && Grander.weapons[i]["max"] == max && Grander.weapons[i]["level"] <= level){
			return i;
		}
	}
}

function checkWeapon(min, max, soldier, level){
	var avg = (min + max)/2;
	level -= (soldier ? 3 : 0);
	for( gun=0; gun<39; gun++ ){
		if(Grander.weapons[gun].level <= level && Grander.weapons[gun].suggest != false){
			if(Grander.weapons[gun].avgDmg == avg && Grander.weapons[gun].best){
				return "positive";
			}
			if(Grander.weapons[gun].avgDmg > avg){
				return "negative";
			}
		}
	}
	return "positive";
}

function count_(fort_id,update){
	var count = 0;
	var westid,roomname;
	for(westid in Grander.players_data[fort_id]){
		if(Grander.players_data[fort_id][westid].privilege > 0) {
			count++;
		}
	}
	if(update){
		for(room in chatcontrol.rooms){
			if(chatcontrol.rooms[room].roomdescription.hasOwnProperty("fortid") && chatcontrol.rooms[room].roomdescription.fortid == fort_id){
				roomname = room;
			}
		} 
		var fort_capacity = Grander.forts_capacity[Grander.fort_size[fort_id]][(chatcontrol.rooms[roomname].roomdescription.defense === false ? 0 : 1)];
		if(count < fort_capacity){
			var color = "green";
		} else if(count == fort_capacity){
			var color = "yellow";
		} else {
			var color = "red";
		}
		if($("fort_capacity_"+fort_id)) $("fort_capacity_"+fort_id).innerHTML = "<span style='color:"+color+";' id='fort_capacity_"+fort_id+"'>" + count + "/" +  fort_capacity + "</span><p>";
		return "<span style='color:"+color+";' id='fort_capacity_"+fort_id+"'>" + count + "/" +  fort_capacity + "</span><p>";
	}
	return count;
}

function append_data(fid,l){
	var last = l || true;
	eval("Ajax.remoteCall('fort_battlepage&fort_id="+fid+"','',{},function(data){\
		Grander.players_data["+fid+"] = new Object;\
		data = Grander.between(data.js,'Character.name','}}],\"') + '}}]';\
		data = Json.evaluate(data.substr(6,data.length));\
		for(i in data){if(data[i].player_id != undefined) {\
			Grander.players_data["+fid+"][data[i].player_id] = data[i];}\
		}\
		Grander.count_("+fid+",true);});");
}


function init(){
	Grander.version = 1.36;
	/*
	var maxVersion = "1.37";
	var minVersion = "1.30";
	TheWestApi.register('kickomatic', 'Kick-o-Matic', minVersion, maxVersion, 'macabre2077', 'http://userscripts.org/scripts/show/96262');*/
	Grander.coords = {
		"attack":{
			0:0,
			1:0,
			2:0,
			34:0,
			35:0,
			36:0,
			68:0,
			69:0,
			70:0,
			102:0,
			103:0,
			104:0,
			136:0,
			137:0,
			138:0,
			170:0,
			171:0,
			172:0,
			204:0,
			205:0,
			206:0,
			238:0,
			239:0,
			240:0,
			272:0,
			273:0,
			274:0,
			306:0,
			307:0,
			308:0,
			340:0,
			341:0,
			342:0,

			374:1,
			375:1,
			376:1,
			408:1,
			409:1,
			410:1,
			442:1,
			443:1,
			444:1,
			476:1,
			477:1,
			478:1,
			510:1,
			511:1,
			512:1,
			544:1,
			545:1,
			546:1,
			578:1,
			579:1,
			580:1,
			612:1,
			613:1,
			614:1,
			646:1,
			647:1,
			648:1,
			680:1,
			681:1,
			682:1,

			714:2,
			748:2,
			782:2,
			715:2,
			749:2,
			783:2,
			716:2,
			750:2,
			784:2,
			717:2,
			751:2,
			785:2,
			718:2,
			752:2,
			786:2,
			719:2,
			753:2,
			787:2,
			720:2,
			754:2,
			788:2,
			721:2,
			755:2,
			789:2,
			722:2,
			756:2,
			790:2,
			723:2,
			757:2,
			791:2,
			724:2,
			758:2,
			792:2,
			725:3,
			759:3,
			793:3,
			726:3,
			760:3,
			794:3,
			727:3,
			761:3,
			795:3,
			728:3,
			762:3,
			796:3,
			729:3,
			763:3,
			797:3,
			730:3,
			764:3,
			798:3,
			731:3,
			765:3,
			799:3,
			732:3,
			766:3,
			800:3,
			733:3,
			767:3,
			801:3,
			734:3,
			768:3,
			802:3,
			735:3,
			769:3,
			803:3,
			736:4,
			770:4,
			804:4,
			737:4,
			771:4,
			805:4,
			738:4,
			772:4,
			806:4,
			739:4,
			773:4,
			807:4,
			740:4,
			774:4,
			808:4,
			741:4,
			775:4,
			809:4,
			742:4,
			776:4,
			810:4,
			743:4,
			777:4,
			811:4,
			744:4,
			778:4,
			812:4,
			745:4,
			779:4,
			813:4,
			746:4,
			747:4,
			780:4,
			781:4,
			814:4,
			815:4,

			405:5,
			406:5,
			407:5,
			439:5,
			440:5,
			441:5,
			473:5,
			474:5,
			475:5,
			507:5,
			508:5,
			509:5,
			541:5,
			542:5,
			543:5,
			575:5,
			576:5,
			577:5,
			609:5,
			610:5,
			611:5,
			643:5,
			644:5,
			645:5,
			677:5,
			678:5,
			679:5,
			711:5,
			712:5,
			713:5,

			31:6,
			32:6,
			33:6,
			65:6,
			66:6,
			67:6,
			99:6,
			100:6,
			101:6,
			133:6,
			134:6,
			135:6,
			167:6,
			168:6,
			169:6,
			201:6,
			202:6,
			203:6,
			235:6,
			236:6,
			237:6,
			269:6,
			270:6,
			271:6,
			303:6,
			304:6,
			305:6,
			337:6,
			338:6,
			339:6,
			371:6,
			372:6,
			373:6
		},
		0:{
			178:7,
			179:7,
			180:7,
			212:7,
			213:7,
			214:7,
			246:7,
			247:7,
			248:7,

			193:8,
			194:8,
			195:8,
			227:8,
			228:8,
			229:8,
			261:8,
			262:8,
			263:8,

			450:9,
			451:9,
			452:9,
			484:9,
			485:9,
			486:9,
			518:9,
			519:9,
			520:9,

			465:10,
			466:10,
			467:10,
			499:10,
			500:10,
			501:10,
			533:10,
			534:10,
			535:10,

			291:11,
			292:11,
			293:11,
			325:11,
			326:11,
			327:11,

			393:13,
			394:13,
			395:13,
			427:13,
			428:13,
			429:13,

			318:12,
			319:12,
			352:12,
			353:12,
			386:12,
			387:12,

			215:14,
			216:14,
			217:14,
			218:14,
			219:14,
			220:14,
			221:14,
			222:14,
			223:14,
			224:14,
			225:14,
			226:14,

			487:15,
			488:15,
			489:15,
			490:15,
			491:15,
			494:15,
			495:15,
			496:15,
			497:15,
			498:15,

			281:16,
			315:16,
			349:16,
			383:16,
			417:16,

			296:17,
			330:17,
			364:17,
			398:17,
			432:17,

			492:18,
			493:18,

			287:19,
			288:19,
			289:19,
			290:19,
			321:19,
			322:19,
			323:19,
			324:19,
			355:19,
			356:19,
			357:19,
			358:19,
			389:19,
			390:19,
			391:19,
			392:19
		},
		1:{
			143:7,
			144:7,
			145:7,
			177:7,
			178:7,
			179:7,
			211:7,
			212:7,
			213:7,

			160:8,
			161:8,
			162:8,
			194:8,
			195:8,
			196:8,
			228:8,
			229:8,
			230:8,

			483:9,
			484:9,
			485:9,
			517:9,
			518:9,
			519:9,
			551:9,
			552:9,
			553:9,

			500:10,
			501:10,
			502:10,
			534:10,
			535:10,
			536:10,
			568:10,
			569:10,
			570:10,

			326:11,
			327:11,
			328:11,
			360:11,
			361:11,
			362:11,

			385:13,
			386:13,
			387:13,
			419:13,
			420:13,
			421:13,

			250:12,
			251:12,
			284:12,
			285:12,
			318:12,
			319:12,

			180:14,
			181:14,
			182:14,
			183:14,
			184:14,
			185:14,
			186:14,
			187:14,
			188:14,
			189:14,
			190:14,
			191:14,
			192:14,
			193:14,

			520:15,
			521:15,
			522:15,
			523:15,
			524:15,
			525:15,
			528:15,
			529:15,
			530:15,
			531:15,
			532:15,
			533:15,

			246:16,
			280:16,
			314:16,
			348:16,
			382:16,
			416:16,
			450:16,

			263:17,
			297:17,
			331:17,
			365:17,
			399:17,
			433:17,
			467:17,

			526:18,
			527:18,

			287:19,
			288:19,
			289:19,
			290:19,
			321:19,
			322:19,
			323:19,
			324:19,
			355:19,
			356:19,
			357:19,
			358:19,
			389:19,
			390:19,
			391:19,
			392:19
		},
		2:{
			108:7,
			109:7,
			110:7,
			142:7,
			143:7,
			144:7,
			176:7,
			177:7,
			178:7,

			127:8,
			128:8,
			129:8,
			161:8,
			162:8,
			163:8,
			195:8,
			196:8,
			197:8,

			516:9,
			517:9,
			518:9,
			550:9,
			551:9,
			552:9,
			584:9,
			585:9,
			586:9,

			535:10,
			536:10,
			537:10,
			569:10,
			570:10,
			571:10,
			603:10,
			604:10,
			605:10,

			258:12,
			259:12,
			292:12,
			293:12,
			326:12,
			327:12,

			395:11,
			396:11,
			429:11,
			430:11,
			463:11,
			464:11,

			384:13,
			385:13,
			386:13,
			418:13,
			419:13,
			420:13,

			145:14,
			146:14,
			147:14,
			148:14,
			149:14,
			150:14,
			151:14,
			152:14,
			153:14,
			154:14,
			155:14,
			156:14,
			157:14,
			158:14,
			159:14,
			160:14,

			553:15,
			554:15,
			555:15,
			556:15,
			557:15,
			558:15,
			559:15,
			562:15,
			563:15,
			564:15,
			565:15,
			566:15,
			567:15,
			568:15,

			211:16,
			245:16,
			279:16,
			313:16,
			347:16,
			381:16,
			415:16,
			449:16,
			483:16,

			230:17,
			264:17,
			298:17,
			332:17,
			366:17,
			400:17,
			434:17,
			468:17,
			502:17,

			560:18,
			561:18,

			287:19,
			288:19,
			289:19,
			290:19,
			321:19,
			322:19,
			323:19,
			324:19,
			355:19,
			356:19,
			357:19,
			358:19,
			389:19,
			390:19,
			391:19,
			392:19
		}
	};
    // TODO: complete list
    Grander.langs = {
        "ru_RU":{
            "success":"Лычка дана!",
            "error":"Произошла ошибка",
            "cancel":"Отмена",
            "showPlayerOnMap":"Показать игрока на карте",
            "showTown":"Посмотреть город",
            "nodata":"Информация о званиях не загружена для данного форта!",
            "getData":"Пытаемся загрузить данные о званиях",
            "errorTimeout":"Загрузка происходит слишком долго",
            "ascpt":"Произвести в капитаны",
            "asprivate":"Назначить рядовым",
            "asrecruit":"Взять в рекруты",
            "asreservist":"Записать в резерв",
            "astraitor":"Обвинить в предательстве",
            "youcant":"<br/>Ты не можешь понизить старшего<br/> или равного по званию." ,
            "position":"Позиция:" ,
            "pos_undefined":"не установлена" ,
            "noally":"Без альянса" ,
            "flag":"Флаг",
            "inside":"Внутри форта",
            "classes":{
                "soldier":"Солдат",
                "duelist":"Дуэлянт",
                "adventurer":"Авантюрист",
                "worker":"Трудяга",
                "greenhorn":"Чечако"
            },
            "ranks":{
                "traitor":"Предатель",
                "reservist":"Резервист",
                "recruit":"Рекрут",
                "private_":"Рядовой",
                "captain":"Капитан",
                "general":"Генерал"
            },
            "sectors":{
                "undefined":"внутри форта",
                0:"Левый верхний сектор",
                1:"Левый нижний сектор",
                2:"Левый южный сектор",
                3:"Центральный южный сектор",
                4:"Правый южный сектор",
                5:"Правый нижний сектор",
                6:"Правый верхний сектор", /* attack */
                7:"Башня авантов",
                8:"Башня дуэлянтов",
                9:"Башня солдат",
                10:"Башня трудяг",
                11:"Казарма",
                12:"Склад",
                13:"Штаб",
                14:"Северная стена",
                15:"Южная стена",
                16:"Западная стена",
                17:"Восточная стена",
                18:"Ворота",
                19:"Флаг",
                20:"Внутри форта"
            },
            "damage":"урон",
            "version":"версия",
            "changelist":"Список изменений"
        },
        "nl_NL":{
            "success":"Rang wordt gegeven!",
            "error":"Er is een fout opgetreden",
            "cancel":"Annuleren",
            "showPlayerOnMap":"Laat speler zien op de map",
            "showTown":"Bekijk stad",
            "nodata":"Informatie over rangen is niet gegeven voor het fort!",
            "getData":"Ranginformatie aan het laden",
            "errorTimeout":"Het downloaden duurde te lang",
            "ascpt":"Tot kapitein bevorderen",
            "asprivate":"Tot soldaat benoemen",
            "asrecruit":"Tot rekruut benoemen",
            "asreservist":"Tot reservist benoemen",
            "astraitor":"Markeren als verrader",
            "youcant":"Je kan geen spelers met dezelfde of een hogere rang rekruteren." ,
            "position":"Positie:" ,
            "pos_undefined":"Geen startpositie" ,
            "noally":"Geen alliantie" ,
            "flag":"Vlag",
            "inside":"Binnen het fort",
            "classes":{
                "soldier":"Soldaat",
                "duelist":"Duellant",
                "adventurer":"Avonturier",
                "worker":"Arbeider",
                "greenhorn":"Greenhorn"
            },
            "ranks":{
                "traitor":"Verrader",
                "reservist":"Reservist",
                "recruit":"Rekruut",
                "private_":"Soldaat",
                "captain":"Kapitein",
                "general":"Generaal"
            },
            "sectors":{
                "undefined":"Geen startpositie",
                0:"De sector links boven",
                1:"De centraal linker sector",
                2:"De sector linksonder",
                3:"De sector midden onder",
                4:"De sector rechtsonder",
                5:"De centraal rechter sector",
                6:"De sector rechtsboven", /* attack */
                7:"Avonturierstoren",
                8:"Duellantentoren",
                9:"Soldatentoren",
                10:"Arbeiderstoren",
                11:"Kazerne",
                12:"Opslagplaats",
                13:"Hoofdgebouw",
                14:"Bovenmuur",
                15:"Ondermuur",
                16:"Linkermuur",
                17:"Rechtermuur",
                18:"Poort",
                19:"Vlag",
                20:"In het fort"
            },
            "damage":"schade",
            "version":"versie",
            "changelist":"Lijst van wijzigingen"
        },
        "en_US":{
            "success":"Rank is given!",
            "error":"An error has occured",
            "cancel":"Cancel",
            "showPlayerOnMap":"Show player on map",
            "showTown":"View town",
            "nodata":"Couldn't load rank information for the fort",
            "getData":"Loading rank information",
            "errorTimeout":"The loading took too much time",
            "ascpt":"Promote to captain",
            "asprivate":"Appoint as private",
            "asrecruit":"Appoint as recruit",
            "asreservist":"Appoint as reservist",
            "astraitor":"Mark as traitor",
            "youcant":"You can't demote fighters of the same or higher rank." ,
            "position":"Position:" ,
            "pos_undefined":"No starting position" ,
            "noally":"No alliance" ,
            "flag":"Flag",
            "inside":"Inside the fort",
            "classes":{
                "soldier":"Soldier",
                "duelist":"Dueller",
                "adventurer":"Adventurer",
                "worker":"Worker",
                "greenhorn":"Greenhorn"
            },
            "ranks":{
                "traitor":"Traitor",
                "reservist":"Reservist",
                "recruit":"Recruit",
                "private_":"Soldier",
                "captain":"Captain",
                "general":"General"
            },
            "sectors":{
                "undefined":"No starting position",
                0:"The upper-left sector",
                1:"The central left sector",
                2:"The lower-left sector",
                3:"The lower central sector",
                4:"The lower-right sector",
                5:"The central right sector",
                6:"The upper-right sector", /* attack */
                7:"Adventurer's tower",
                8:"Dueller's tower",
                9:"Soldier's tower",
                10:"Worker's tower",
                11:"Barracks",
                12:"Resource stock",
                13:"Headquarters",
                14:"North wall",
                15:"South wall",
                16:"West wall",
                17:"East wall",
                18:"Gate",
                19:"Flag",
                20:"Inside the fort"
            },
            "damage":"damage",
            "version":"version",
            "changelist":"Changelog"
        },
        "es_ES":{
            "success":"Rango asignado!",
                "error":"Un error ha ocurrido",
                "cancel":"Cancelar",
                "showPlayerOnMap":"Mostrar jugador en el mapa",
                "showTown":"Ver ciudad",
                "nodata":"No se puede cargar la información de rango para el fuerte",
                "getData":"Información del rango cargada",
                "errorTimeout":"La carga tomó demasiado tiempo",
                "ascpt":"Promocionar a capitán",
                "asprivate":"Designar como privado",
                "asrecruit":"Designar como recluta",
                "asreservist":"Designar como reservista",
                "astraitor":"Marcar como traidor",
                "youcant":"No se pueden disminuir los combatientes con igual o superior rango." ,
                "position":"Posición:" ,
                "pos_undefined":"Sin posición de partida" ,
                "noally":"Sin alianza" ,
                "flag":"Bandera",
                "inside":"Dentro del fuerte",
                "classes":{
                "soldier":"Soldado",
                    "duelist":"Duelista",
                    "adventurer":"Aventurero",
                    "worker":"Trabajador",
                    "greenhorn":"Novato"
            },
            "ranks":{
                "traitor":"Traidor",
                    "reservist":"Reservista",
                    "recruit":"Recluta",
                    "private_":"Soldado",
                    "captain":"Capitán",
                    "general":"General"
            },
            "sectors":{
                "undefined":"Sin posición de partida",
                    0:"El sector superior izquierdo",
                    1:"El sector central izquierdo",
                    2:"El sector inferior izquierdo",
                    3:"El sector central inferior",
                    4:"El sector inferior derecho",
                    5:"El sector central derecho",
                    6:"El sector superior derecho", /* ataque */
                    7:"Torre Aventureros",
                    8:"Torre Duelistas",
                    9:"Torre Soldados",
                    10:"Torre Trabajadores",
                    11:"Barracas",
                    12:"Almacén de recursos",
                    13:"Cuartel general",
                    14:"Muralla Norte",
                    15:"Muralla Sur",
                    16:"Muralla Oeste",
                    17:"Muralla Este",
                    18:"Puerta",
                    19:"Bandera",
                    20:"Dentro del fuerte"
            },
            "damage":"daño",
            "version":"versión",
            "changelist":"Historial de cambios"
        },
        "it_IT":{
            "success":"Il rango è stato dato!",
            "error":"Si e\' verificato un errore",
            "cancel":"Annulla",
            "showPlayerOnMap":"Centra nella mappa",
            "showTown":"Visita città",
            "nodata":"Impossibile caricare le informazioni di rango per la fortezza",
            "getData":"Caricamento Informazioni rango",
            "errorTimeout":"Il caricamento ha richiesto troppo tempo",
            "ascpt":"Capitano",
            "asprivate":"Soldato Semplice",
            "asrecruit":"Recluta",
            "asreservist":"Riservista",
            "astraitor":"Traditore",
            "youcant":"Non è possibile il reclutamento di giocatori con rango uguale o superiore." ,
            "position":"Posizione:" ,
            "pos_undefined":"Nessuna posizione di partenza" ,
            "noally":"Nessuna alleanza" ,
            "flag":"Bandiera",
            "inside":"All\'interno del forte",
            "classes":{
                "soldier":"Soldato",
                "duelist":"Duellante",
                "adventurer":"Avventuriero",
                "worker":"Lavoratore",
                "greenhorn":"Novizio"
            },
            "ranks":{
                "traitor":"Traditore",
                "reservist":"Riservista",
                "recruit":"Recluta",
                "private_":"Soldato semplice",
                "captain":"Capitano",
                "general":"Generale"
            },
            "sectors":{
                "undefined":"Nessuna posizione di partenza",
                0:" -O1- Il settore superiore sinistro",
                1:" -O2- Il settore centrale sinistro",
                2:" -S1- Il settore in basso a sinistra",
                3:" -S2- Il settore centrale",
                4:" -S3- Il settore in basso a destra",
                5:" -E2- Il settore centrale destro",
                6:" -E1- Il settore superiore destro", /* attacco */
                7:"Torre avventuriero",
                8:"Torre duellante",
                9:"Torre soldato",
                10:"Torre lavoratore",
                11:"Caserma",
                12:"Magazzino",
                13:"Quartier generale",
                14:"Muro nord",
                15:"Muro sud",
                16:"Muro ovest",
                17:"Muro est",
                18:"Cancello",
                19:"Bandiera",
                20:"All\'interno del forte"
            },
            "damage":"Danno",
            "version":"Versione",
            "changelist":"Elenco delle modifiche"
        },
        "pl_PL":{
            "success":"Pobrano rangi pomyślnie!",
            "error":"Wystąpił błąd",
            "cancel":"Anuluj",
            "showPlayerOnMap":"Pokaż gracza na mapie",
            "showTown":"Pokaż miasto",
            "nodata":"Pobieranie danych o rangach nie powiodło się. :[",
            "getData":"Pobieranie danych o rangach",
            "errorTimeout":"Pobieranie trwa zbyt długo",
            "ascpt":"Awans na kapitana",
            "asprivate":"Nadaj szeregowca",
            "asrecruit":"Nadaj rekruta",
            "asreservist":"Nadaj rezerwistę",
            "astraitor":"Nadaj zdrajcę",
            "youcant":"Nie można zmienić rangi tej samej lub wyższej." ,
            "position":"Pozycja: " ,
            "pos_undefined":"Nie ustawiony" ,
            "noally":"Brak sojuszu" ,
            "flag":"Flaga",
            "inside":"W forcie",
            "classes":{
                "soldier":"Żołnierz",
                "duelist":"Zawadiaka",
                "adventurer":"Poszukiwacz",
                "worker":"Budowniczy",
                "greenhorn":"Nowicjusz"
            },
            "ranks":{
                "traitor":"Zdrajca",
                "reservist":"Rezerwista",
                "recruit":"Rekrut",
                "private_":"Szeregowiec",
                "captain":"Kapitan",
                "general":"Generał"
            },
            "sectors":{
                "undefined":"Nie ustawiony w forcie",
                0:"7 sektor",
                1:"6 sektor",
                2:"5 sektor",
                3:"4 sektor",
                4:"3 sektor",
                5:"2 sektor",
                6:"1 sektor", /* attack */
                7:"Baszta poszukiwaczy",
                8:"Baszta zawadiaków",
                9:"Baszta żołnierzy",
                10:"Baszta budowniczych",
                11:"Koszary",
                12:"Magazyn",
                13:"Kwatera główna",
                14:"Górny mur",
                15:"Dolny mur",
                16:"Lewy mur",
                17:"Prawy mur",
                18:"Brama",
                19:"Flaga",
                20:"W forcie"
            },
            "damage":"obrażenia",
            "version":"wersja",
            "changelist":"Historia zmian"
        }
};
	Grander.fort_names = new Object();
	Grander.weaponImg = new Object();
	Grander.weapons = new Object();
	
 	Grander.forts_capacity = [
		[50,42],
		[100,84],
		[140,120]
	];	
	Grander.beta_forts_capacity = [
		[25,21],
		[50,42],
		[70,60]
	];
	Grander.sectors =
	Grander.weapons = [
		/* thx to tw_my script  - http://userscripts.org/scripts/show/82472 */
		{item_id:100, nshort:'stone_left', type:'left_arm', level:1, price:0, image:'/images/items/left_arm/stone_left.png?1', image_mini:'/images/items/left_arm/mini/stone_left.png?1',  damage:{damage_min:50, damage_max:110}},
		{item_id:101, nshort:'bow_rusty', type:'left_arm', level:5, price:400, image:'/images/items/left_arm/bow_rusty.png?1', image_mini:'/images/items/left_arm/mini/bow_rusty.png?1',   damage:{damage_min:50, damage_max:130}},
		{item_id:102, nshort:'bow_normal', type:'left_arm', level:10, price:650, image:'/images/items/left_arm/bow_normal.png?1', image_mini:'/images/items/left_arm/mini/bow_normal.png?1',   damage:{damage_min:70, damage_max:150}},
		{item_id:103, nshort:'bow_best', type:'left_arm', level:13, price:1275, image:'/images/items/left_arm/bow_best.png?1', image_mini:'/images/items/left_arm/mini/bow_best.png?1',   damage:{damage_min:100, damage_max:188}},
		{item_id:104, nshort:'crossbow_rusty', type:'left_arm', level:10, price:520, image:'/images/items/left_arm/crossbow_rusty.png?1', image_mini:'/images/items/left_arm/mini/crossbow_rusty.png?1',   damage:{damage_min:75, damage_max:129}},
		{item_id:105, nshort:'crossbow_normal', type:'left_arm', level:20, price:755, image:'/images/items/left_arm/crossbow_normal.png?1', image_mini:'/images/items/left_arm/mini/crossbow_normal.png?1',   damage:{damage_min:90, damage_max:150}},
		{item_id:106, nshort:'crossbow_best', type:'left_arm', level:23, price:1600, image:'/images/items/left_arm/crossbow_best.png?1', image_mini:'/images/items/left_arm/mini/crossbow_best.png?1',   damage:{damage_min:120, damage_max:192}},
		{item_id:107, nshort:'arkebuse_rusty', type:'left_arm', level:18, price:684, image:'/images/items/left_arm/arkebuse_rusty.png?1', image_mini:'/images/items/left_arm/mini/arkebuse_rusty.png?1', damage:{damage_min:80, damage_max:160}},
		{item_id:108, nshort:'arkebuse_normal', type:'left_arm', level:30, price:1070, image:'/images/items/left_arm/arkebuse_normal.png?1', image_mini:'/images/items/left_arm/mini/arkebuse_normal.png?1', damage:{damage_min:90, damage_max:190}},
		{item_id:109, nshort:'arkebuse_best', type:'left_arm', level:33, price:2444, image:'/images/items/left_arm/arkebuse_best.png?1', image_mini:'/images/items/left_arm/mini/arkebuse_best.png?1', damage:{damage_min:112, damage_max:232}},
		{item_id:110, nshort:'blunderbuss_rusty', type:'left_arm', level:20, price:775, image:'/images/items/left_arm/blunderbuss_rusty.png?1', image_mini:'/images/items/left_arm/mini/blunderbuss_rusty.png?1', damage:{damage_min:1, damage_max:256}},
		{item_id:111, nshort:'blunderbuss_normal', type:'left_arm', level:35, price:1300, image:'/images/items/left_arm/blunderbuss_normal.png?1', image_mini:'/images/items/left_arm/mini/blunderbuss_normal.png?1', damage:{damage_min:1, damage_max:300}},
		{item_id:112, nshort:'blunderbuss_best', type:'left_arm', level:38, price:2950, image:'/images/items/left_arm/blunderbuss_best.png?1', image_mini:'/images/items/left_arm/mini/blunderbuss_best.png?1', damage:{damage_min:1, damage_max:360}},
		{item_id:113, nshort:'musket_rusty', type:'left_arm', level:25, price:920, image:'/images/items/left_arm/musket_rusty.png?1', image_mini:'/images/items/left_arm/mini/musket_rusty.png?1', damage:{damage_min:83, damage_max:193}},
		{item_id:114, nshort:'musket_normal', type:'left_arm', level:40, price:1580, image:'/images/items/left_arm/musket_normal.png?1', image_mini:'/images/items/left_arm/mini/musket_normal.png?1', damage:{damage_min:100, damage_max:220}},
		{item_id:115, nshort:'musket_best', type:'left_arm', level:43, price:3850, image:'/images/items/left_arm/musket_best.png?1', image_mini:'/images/items/left_arm/mini/musket_best.png?1', damage:{damage_min:126, damage_max:266}},
		{item_id:116, nshort:'flint_rusty', type:'left_arm', level:35, price:1350, image:'/images/items/left_arm/flint_rusty.png?1', image_mini:'/images/items/left_arm/mini/flint_rusty.png?1', damage:{damage_min:120, damage_max:192}},
		{item_id:117, nshort:'flint_normal', type:'left_arm', level:50, price:2440, image:'/images/items/left_arm/flint_normal.png?1', image_mini:'/images/items/left_arm/mini/flint_normal.png?1', damage:{damage_min:135, damage_max:225}},
		{item_id:118, nshort:'flint_best', type:'left_arm', level:53, price:6300, image:'/images/items/left_arm/flint_best.png?1', image_mini:'/images/items/left_arm/mini/flint_best.png?1', damage:{damage_min:168, damage_max:268}},
		{item_id:119, nshort:'shotgun_rusty', type:'left_arm', level:40, price:1600, image:'/images/items/left_arm/shotgun_rusty.png?1', image_mini:'/images/items/left_arm/mini/shotgun_rusty.png?1', damage:{damage_min:1, damage_max:242}},
		{item_id:120, nshort:'shotgun_normal', type:'left_arm', level:55, price:3000, image:'/images/items/left_arm/shotgun_normal.png?1', image_mini:'/images/items/left_arm/mini/shotgun_normal.png?1', damage:{damage_min:1, damage_max:380}},
		{item_id:121, nshort:'shotgun_best', type:'left_arm', level:58, price:7000, image:'/images/items/left_arm/shotgun_best.png?1', image_mini:'/images/items/left_arm/mini/shotgun_best.png?1', damage:{damage_min:1, damage_max:444}},
		{item_id:122, nshort:'percussion_rusty', type:'left_arm', level:45, price:2000, image:'/images/items/left_arm/percussion_rusty.png?1', image_mini:'/images/items/left_arm/mini/percussion_rusty.png?1', damage:{damage_min:126, damage_max:226}},
		{item_id:123, nshort:'percussion_normal', type:'left_arm', level:60, price:3800, image:'/images/items/left_arm/percussion_normal.png?1', image_mini:'/images/items/left_arm/mini/percussion_normal.png?1', damage:{damage_min:150, damage_max:250}},
		{item_id:124, nshort:'percussion_best', type:'left_arm', level:63, price:8800, image:'/images/items/left_arm/percussion_best.png?1', image_mini:'/images/items/left_arm/mini/percussion_best.png?1', damage:{damage_min:172, damage_max:292}},
		{item_id:125, nshort:'breechloader_rusty', type:'left_arm', level:55, price:3150, image:'/images/items/left_arm/breechloader_rusty.png?1', image_mini:'/images/items/left_arm/mini/breechloader_rusty.png?1', damage:{damage_min:160, damage_max:232}},
		{item_id:126, nshort:'breechloader_normal', type:'left_arm', level:70, price:6000, image:'/images/items/left_arm/breechloader_normal.png?1', image_mini:'/images/items/left_arm/mini/breechloader_normal.png?1', damage:{damage_min:190, damage_max:250}},
		{item_id:127, nshort:'breechloader_best', type:'left_arm', level:73, price:12600, image:'/images/items/left_arm/breechloader_best.png?1', image_mini:'/images/items/left_arm/mini/breechloader_best.png?1', damage:{damage_min:200, damage_max:296}},
		{item_id:128, nshort:'winchester_rusty', type:'left_arm', level:60, price:3900, image:'/images/items/left_arm/winchester_rusty.png?1', image_mini:'/images/items/left_arm/mini/winchester_rusty.png?1', damage:{damage_min:160, damage_max:252}},
		{item_id:129, nshort:'winchester_normal', type:'left_arm', level:75, price:7600, image:'/images/items/left_arm/winchester_normal.png?1', image_mini:'/images/items/left_arm/mini/winchester_normal.png?1', damage:{damage_min:180, damage_max:280}},
		{item_id:130, nshort:'winchester_best', type:'left_arm', level:78, price:15400, image:'/images/items/left_arm/winchester_best.png?1', image_mini:'/images/items/left_arm/mini/winchester_best.png?1', damage:{damage_min:200, damage_max:312}},
		{item_id:132, suggest: false, nshort:'bear', type:'left_arm', level:45, price:2600, image:'/images/items/left_arm/bear.png?1', image_mini:'/images/items/left_arm/mini/bear.png?1', damage:{damage_min:0, damage_max:1}},
		{item_id:133, suggest: false, nshort:'muzzleloader_bowie', type:'left_arm', level:30, price:1480, image:'/images/items/left_arm/muzzleloader_bowie.png?1', image_mini:'/images/items/left_arm/mini/muzzleloader_bowie.png?1',  damage:{damage_min:145, damage_max:155}},
		{item_id:134, suggest: false, nshort:'golden_rifle', type:'left_arm', level:75, price:11480, image:'/images/items/left_arm/golden_rifle.png?1', image_mini:'/images/items/left_arm/mini/golden_rifle.png?1', damage:{damage_min:192, damage_max:308}},
		{item_id:135, suggest: false, nshort:'elephantgun', type:'left_arm', level:40, price:12480, image:'/images/items/left_arm/elephantgun.png?1', image_mini:'/images/items/left_arm/mini/elephantgun.png?1', damage:{damage_min:1, damage_max:400}},
		{item_id:136, suggest: false, nshort:'golden_rifle', type:'left_arm', level:75, price:65480, image:'/images/items/left_arm/golden_rifle.png?1', image_mini:'/images/items/left_arm/mini/golden_rifle.png?1', damage:{damage_min:232, damage_max:348}},
		{item_id:137, suggest: false, nshort:'deathsythe',  type:'left_arm', level:50, price:17400, image:'/images/items/left_arm/deathsythe.png?1', image_mini:'/images/items/left_arm/mini/deathsythe.png?1',  damage:{damage_min:42, damage_max:158}},
		{item_id:139, suggest: false, nshort:'high_wall', type:'left_arm', level:70, price:13400, image:'/images/items/left_arm/high_wall.png?1', image_mini:'/images/items/left_arm/mini/high_wall.png?1',  damage:{damage_min:200, damage_max:400}},
		{item_id:140, suggest: false, best: true, nshort:'collector_rifle',type:'left_arm', level:100, price:10000, image:'/images/items/left_arm/collector_rifle.png?1', image_mini:'/images/items/left_arm/mini/collector_rifle.png?1', damage:{damage_min:100, damage_max:300}}
	];

	for(gun=0;gun<39;gun++){
		Grander.weaponImg[Grander.weapons[gun].damage.damage_min+"_"+Grander.weapons[gun].damage.damage_max] = "http://pl13.the-west.pl/"+Grander.weapons[gun].image;
		Grander.weapons[gun].avgDmg= ( Grander.weapons[gun].damage.damage_min+Grander.weapons[gun].damage.damage_max ) / 2;
	}

	/*div=new Element('div',{styles:{cursor:"pointer"},events:{click:function(){Grander.show_forts_table();}}});
	div.innerHTML = '<div class="main_footnote"><div class="main_footnote_left"></div><div class="main_footnote_right"></div><div style="-moz-user-select: none;">&nbsp;Lista fortów&nbsp;</div></div>';
	
	div.injectInside('main_footnotes');*/

	Grander.is_beta = window.location.href.match(/beta/);
	if(Grander.is_beta){
		Grander.forts_capacity = Grander.beta_forts_capacity;
	}
    var lang = Grander.langs.hasOwnProperty(locale) ? locale : "en_US";
    Grander.lang = Grander.langs[lang];
	Grander.sectors = Grander.langs[lang].sectors;

	Grander.fort_size = new Object;
	Grander.allies_names = new Object;
	Grander.highlighted = new Object;
	Grander.players_data = new Object;
	Grander.full_divs_html = new Object;
	Grander.towns_alliance_id = new Object;
	Grander.force_in_progress = false;
	Grander.in_progress = false;
	Grander.lFID = undefined;
}

function intro(){
	// localStorage.setItem('KoM.version' , 0.998);
	if(localStorage.getItem('KoM.version') >= Grander.version) return;
	localStorage.setItem('KoM.version' , Grander.version);
	
	
	var title = 'Kick-o-Matic, '+Grander.lang.version+' '+Grander.version;
    var text = Grander.lang.changelist+':<br/><ul>';
    switch(locale){
        case "ru_RU":
            text += '<li>Извиняюсь за вовремя неисправленный баг в 1.36</li>';
        break;
        case "pl_PL":
            text += '<li>Polskie tłumaczenie.Dzięki Darius II</li>';
            text += '<li>Naprawiony błąd: dla wersji 1.36TW</li>';
        break;
        default:
            text += '<li>Sorry for bug in 1.36</li>';
            text += '<li><small>Please, remind to install a new version to your comrades :p</small></li>';
        break;
    }
    text += '</ul>';
	
	Grander.mb = new MessageDialog(title).addButton("OK").setId('GranderUpdated');
	Grander.mb.setText(text).show();
}

var grander_script = document.createElement('script');
grander_script.type='text/javascript';
grander_script.text = 'try{ \n';
grander_script.text +=  'if(window.Grander == undefined){\n';
grander_script.text += '  window.Grander = new Object();\n';
grander_script.text += '  Grander.in_progress = false;\n';
grander_script.text += '  Grander.init = ' + init.toString() + '\n';
grander_script.text += '  Grander.PopUp = ' + PopUp.toString() + '\n';
grander_script.text += '  Grander.smallPopUp = ' + smallPopUp.toString() + '\n';
grander_script.text += '  Grander.Interval = ' + Interval.toString() + '\n';
grander_script.text += '  Grander.get_players_data = ' + get_players_data.toString() + '\n';
grander_script.text += '  Grander.FindKey=' + findkey.toString() + '\n';
grander_script.text += '  Grander.between = ' + between.toString() + '\n';
grander_script.text += '  Grander.stripe = ' + stripe.toString() + '\n';
grander_script.text += '  Grander.highlightpos = ' + highlightpos.toString() + '\n';
grander_script.text += '  Grander.hide = ' + hide.toString() + '\n';
grander_script.text += '  Grander.force = ' + force.toString() + '\n';
grander_script.text += '  Grander.append_data = ' + append_data.toString() + '\n';
grander_script.text += '  Grander.count_ = ' + count_.toString() + '\n';
grander_script.text += '  Grander.find_fortroom = ' + find_fortroom.toString() + '\n';
grander_script.text += '  Grander.findWeapon = ' + findWeapon.toString() + '\n';
grander_script.text += '  Grander.checkWeapon = ' + checkWeapon.toString() + '\n';
grander_script.text += '  Grander.get_alliance_name = ' + get_alliance_name.toString() + '\n';
grander_script.text += '  Grander.getKeyByValue = ' + getKeyByValue.toString() + '\n';
grander_script.text += '  Grander.getRoomNameByTitle = ' + getRoomNameByTitle.toString() + '\n';
grander_script.text += '  Grander.intro= ' + intro.toString() + '\n';
grander_script.text += '  Grander.init(); \n';
grander_script.text += '  Grander.intro(); \n';
grander_script.text += '  Grander.Interval(); \n';
grander_script.text += ' setTimeout( function()  { Grander.get_players_data() } , 5000) \n';
grander_script.text += ' setInterval( function() { Grander.Interval() } , 1000) \n';
grander_script.text += ' setInterval( function() { Grander.get_players_data() } , 30000) \n';
grander_script.text += '}';
grander_script.text += '} catch(e) {alert(e);} \n';
document.body.appendChild(grander_script);