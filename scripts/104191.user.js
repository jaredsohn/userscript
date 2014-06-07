// ==UserScript==
// @name 	Kick-o-matic PL_beta
// @namespace   KOM PL
// @description Przyspiesza proces nadawania rang fortowych
// @author 	Macabre2077 edit by LowcaNagrod
// @version 	0.996.1 PL
// @include 	http://*.the-west.*/game.php*
// @require     http://userscripts.org/scripts/source/74144.user.js
// @namespace   http://forum.the-west.ru/showthread.php?t=18398
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

/* Changelog:
0.99
	- players` hp
0.98
	- player`s position is being highlihted when popup is shown
0.97
	- ally`s name is shown
0.96 
	- new script`s name,added namespace
0.95 
	- new feature fully completed
0.94 
	- testing new feature - showing name of sector instead of numeric fort position
0.93 
	- fixed bug caused by empty fort weapon
0.92 
	- fixed mulitply battles error
*/
/* Todo:
Any good ideas?
- To force chat to show ranks
*/

try {
	ScriptUpdater.check(96262, 0.996);
} catch(e) { };

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
	if($("player_hp").value > 0)
		Grander.players_hp[Grander.player_name] = $("player_hp").value;
	localStorage.setItem('players_hp', JSON.stringify(Grander.players_hp));
	Grander.mb.hide();
	for(fortId in Grander.highlighted){
		Grander.highlightpos(undefined,fortId);
	}
	Grander.highlighted = new Object;
	Grander.player_name = undefined;
}


function findkey( roomname , id ) {
	var key;
	for(key in chatcontrol.rooms[roomname].members)
	{
		if(chatcontrol.rooms[roomname].members[key].westid == id)
			return key;
	}
	return;
}

function stripe ( id , fort , rank ) {
 	(new Ajax("game.php?window=fort_battlepage&action=updatePrivileges&h="+h,{method:'post',data:{fort_id:fort,privileges:"[["+id+","+rank+"]]"},onComplete:function(data){
		data=Json.evaluate(data);
		if(data.playerlist.length > 0){
			new HumanMessage("Nadano!",{type:"success"});
			Grander.hide();
		}
	}})).request(); 
}

function export(){
	alert(JSON.stringify(Grander.players_hp));
}

function import(){
	text = prompt("Wpisz kod");
	if(text == "" || text == undefined)
		return;
	try {
		text = "{" + text + "}";
		if(typeof eval("Grander.players_hp = JSON.parse('"+text+"');") == "object"){
			localStorage.setItem('players_hp', text);
		}
	} catch (e){
		alert("Wystąpił błąd!"+ e);
	}
}

function update_list(){
	text = prompt("Wpisz kod");
	if(text == "" || text == undefined)
		return;
	try {
		text = "{" + text + "}";
		arr = JSON.parse(text);
		if(typeof arr !== "object") return;
		for(var nick in arr) {
			Grander.players_hp[nick] = arr[nick];
		}
		localStorage.setItem('players_hp', JSON.stringify(Grander.players_hp));
	} catch (e){
		alert("Wystąpił błąd!"+ e);
	}
}

function open_import_hp(){
	html = '<span onclick="Grander.import();return false;"><a href="#" class="button_wrap button"><span class="button_left"></span><span class="button_middle">Import</span><span class="button_right"></span><span style="clear: both;"></span></a></span>';
	html += '<span onclick="Grander.export();return false;"><a href="#" class="button_wrap button"><span class="button_left"></span><span class="button_middle">Eksport</span><span class="button_right"></span><span style="clear: both;"></span></a></span>';
	html += '<span onclick="Grander.update_list();return false;"><a href="#" class="button_wrap button"><span class="button_left"></span><span class="button_middle">Обновить</span><span class="button_right"></span><span style="clear: both;"></span></a></span>';
	html += '<small>Przy importwowaniu wszystkie istniejące dane ulegną nadpisaniu!</small><br/>';
	html += '<small>Przykładowy kod: "Macabre":7000,"4oxo4":5300</small>';
	hp_mb = new MessageBox({message: html, width: "300px", x:500, y:150,title: "Dane o HP graczy",height: "150px", cancelOnOutsideClick: true, paddingTop: 10, paddingBottom: 8, paddingLeft: 20, paddingRight: 20, zindex:90909}).show();
	return false;
}
	
function PopUp(e){
try {
	if(window.location.href.match("ru3") && [25,152].indexOf(chatcontrol.self.allianceId)>=0){
		window.Grander = undefined;return;
	}
	if(Grander.in_progress == false){
		function size (obj) {
			var size = 0, key;
			for (key in obj) {
				if (obj.hasOwnProperty(key)) size++;
			}
			return size;
		};
		if(size(chatcontrol.rankinfo) == 0){
			new HumanMessage("Czat nie został jeszcze załadowany!",{type:"fail"});
			return;
		}
	
		Grander.in_progress = true;
		function poptitle(tx){return"<div class='popupmenu_title'>"+tx+"</div>"+"<div class='popupmenu_links'>";}
		function poplink(id,tx,fort,westid,rank){
			return"<a id='"+id+"' onclick='javascript:Grander.stripe(" + westid + " , " + fort + " , " + rank + ");'>"+tx+"</a>";	
		}
		function gradeimg(grade,tx){return"<img src='/images/chat/servicegrade_"+(gradelist[grade]||grade)+".png' title='<b>"+(tx||gradelist_locale[grade])+"</b>' />";}
		var gradelist={"-2":"traitor","-1":"reservist","0":"recruit","1":"private","2":"captain","3":"general"};
		var gradelist_locale={"-2":"Zdrajca","-1":"Rezerwista","0":"Rekrut","1":"Рядовой","2":"Kapitan","3":"Generał"};
		var evt = new Event(e || window.event);
		var x = evt.client.x;
		var y = evt.client.y;
		var rv = FortBattle.rankvalue;
		var westid = Grander.westid;
		var roomname;
		
		for(roomname in chatcontrol.rooms){
			if(chatcontrol.rooms[roomname].roomdescription.hasOwnProperty("fortid")){
				var fort_id = chatcontrol.rooms[roomname].roomdescription.fortid;
				if(chatcontrol.rankinfo[roomname] != undefined){
					if(tx == undefined){
						var tx = [];
					}

					var fort_name = chatcontrol.rooms[roomname].roomdescription.title;
					var fort_x = chatcontrol.rooms[roomname].roomdescription.x;
					var fort_y = chatcontrol.rooms[roomname].roomdescription.y;
					var fort_side = chatcontrol.rooms[roomname].roomdescription.defense == true ? "defense" : "attack";
												
					var player_key = Grander.FindKey( roomname , westid );
					if(chatcontrol.rooms[roomname].members[player_key] != undefined){					
						if(Grander.player_name == undefined && player_class == undefined && Grander.player_ally_id == undefined){
							Grander.player_name  = chatcontrol.rooms[roomname].members[player_key].name;
							var player_class = chatcontrol.rooms[roomname].members[player_key].subclass;
							Grander.player_ally_id = chatcontrol.rooms[roomname].members[player_key].allianceId;
						}
						if(Grander.allies_names[Grander.player_ally_id] == undefined){
							Ajax.remoteCall('alliance&alliance_id='+Grander.player_ally_id,'',{},function(data){ 
								if(Grander.player_ally_id != 0){
									Grander.allies_names[Grander.player_ally_id] = (Grander.player_ally_id == chatcontrol.self.allianceId ? "<span style='color:green;'>" : "<span>") + eval('(["' + Grander.between(data.js,'innerHTML = "','";')+'"])' ) + "</span>";
								} else {
									Grander.allies_names[0] = "<span style='text-decoration: underline;'>Bez sojuszu</span>";
								}
							});
						}
						
						var player_pos = chatcontrol.rankinfo[roomname][westid].position;
						var player_priv = chatcontrol.rankinfo[roomname][westid].rank;
						
						if($('window_fort_battlepage_'+fort_id)){
							Grander.highlightpos(player_pos,fort_id);
						}
						
						if(fort_side === "attack") {
							var pos_name = Grander.sectors[Grander.coords.attack[player_pos]];
						}
						else {
							var size = Grander.fort_size[fort_id];
							var pos_name = Grander.sectors[Grander.coords[size][player_pos]];
							if(pos_name == undefined)
								pos_name = Grander.sectors[20];
						}
						
						var mypriv = chatcontrol.rankinfo[roomname][chatcontrol.self.westid].rank;
						
						tx.push("<div style='width:auto;text-align:center;padding:4px'><a href=\"javascript:AjaxWindow.show('fort',{fort_id:"+ fort_id +"},'"+fort_x+"_"+fort_y+"');\">" + fort_name + "<p>Pozycja:" + pos_name + "</a></p><img src='../images/fort/battle/divider.png' style='-moz-user-select: none;'>");
						if (player_priv < mypriv && mypriv > rv.PRIVATE) {
							if (player_priv != rv.CAPTAIN && mypriv > rv.CAPTAIN) {
								tx.push(poplink("fb_promo_captain", gradeimg("captain", "\u041F\u0440\u043E\u0438\u0437\u0432\u0435\u0441\u0442\u0438 \u0432 \u043A\u0430\u043F\u0438\u0442\u0430\u043D\u044B") + "\u041F\u0440\u043E\u0438\u0437\u0432\u0435\u0441\u0442\u0438 \u0432 \u043A\u0430\u043F\u0438\u0442\u0430\u043D\u044B" , fort_id , westid , 2));
							}
							if (player_priv != rv.PRIVATE) {
								tx.push(poplink("fb_promo_private", gradeimg("private", "\u041D\u0430\u0437\u043D\u0430\u0447\u0438\u0442\u044C \u0440\u044F\u0434\u043E\u0432\u044B\u043C") + '\u041D\u0430\u0437\u043D\u0430\u0447\u0438\u0442\u044C \u0440\u044F\u0434\u043E\u0432\u044B\u043C' , fort_id , westid , 1));
							}
							if (player_priv != rv.RECRUIT) {
								tx.push(poplink("fb_promo_recruit", gradeimg("recruit", "\u0412\u0437\u044F\u0442\u044C \u0432 \u0440\u0435\u043A\u0440\u0443\u0442\u044B") + "\u0412\u0437\u044F\u0442\u044C \u0432 \u0440\u0435\u043A\u0440\u0443\u0442\u044B" , fort_id , westid , 0));
							}
							if (player_priv != rv.RESERVIST) {
								tx.push(poplink("fb_promo_reservist", gradeimg("reservist", "\u0417\u0430\u043F\u0438\u0441\u0430\u0442\u044C \u0432 \u0440\u0435\u0437\u0435\u0440\u0432") + "\u0417\u0430\u043F\u0438\u0441\u0430\u0442\u044C \u0432 \u0440\u0435\u0437\u0435\u0440\u0432" , fort_id , westid , '-1'));
							}
							if (player_priv != rv.TRAITOR) {
								tx.push(poplink("fb_promo_traitor", gradeimg("traitor", "\u041E\u0431\u0432\u0438\u043D\u0438\u0442\u044C \u0432 \u043F\u0440\u0435\u0434\u0430\u0442\u0435\u043B\u044C\u0441\u0442\u0432\u0435") + "\u041E\u0431\u0432\u0438\u043D\u0438\u0442\u044C \u0432 \u043F\u0440\u0435\u0434\u0430\u0442\u0435\u043B\u044C\u0441\u0442\u0432\u0435" , fort_id , westid ,'-2'));
							}
							tx.push('</div>');
						} else {
							tx.push("<div style='width:200px;text-align:center;padding:4px'>" + "\u0422\u044B \u043D\u0435 \u043C\u043E\u0436\u0435\u0448\u044C \u043F\u043E\u043D\u0438\u0437\u0438\u0442\u044C \u0441\u0442\u0430\u0440\u0448\u0435\u0433\u043E \u0438\u043B\u0438 \u0440\u0430\u0432\u043D\u043E\u0433\u043E \u043F\u043E \u0437\u0432\u0430\u043D\u0438\u044E." + "</div>");
						}
					}
				} /* else {
					(new Ajax("game.php?window=fort_battlepage&action=updatePrivileges&h="+h,{method:'post',data:{fort_id:fort_id}})).request(); 	
				}*/
			}
		}
		
		Ajax.remoteCall('profile&char_id='+westid,'',{},function(data)	{ 
			data = Json.evaluate(Grander.between(data.js,'var items = ','}];') + '}]');var length = data.length;
			for(i=0;i<length;i++){ if(data[i].type == 'left_arm'){ 	Grander.fort_weapon = data[i].name;}}
			if(Grander.fort_weapon == undefined){ Grander.fort_weapon = " Bez ????";} else {Grander.fort_weapon = ' с "' + Grander.fort_weapon + '"';}
		});
				
		var interval=self.setInterval(function(){
			if(Grander.fort_weapon != undefined && Grander.allies_names[Grander.player_ally_id] != undefined){
				clearInterval(interval);
				tx.push("<a id='fb_promo_cancel' class='txcenter' onclick='Grander.hide()'>OK</a>");
				tx.unshift(poptitle('<input type="text" value="'+ ( Grander.players_hp[Grander.player_name] || 0 )+'" class="input_layout" id="player_hp" style="text-align: center;width: 50px;" maxlength="5"> HP'));
				tx.unshift(poptitle(Grander.allies_names[Grander.player_ally_id]));
				tx.unshift(poptitle("<img height='25px' src='images/avatars/" + player_class + "_small.png'>" + Grander.player_name + Grander.fort_weapon));
				Grander.mb = new MessageBox({message: tx.join(""), width: "auto", height: "auto", x: x, y: y/*, cancelOnOutsideClick: true*/, paddingTop: 2, paddingBottom: 8, paddingLeft: 2, paddingRight: 2, zindex:90909});
				Grander.mb.show();
				Grander.in_progress = false;
				Grander.player_ally_id = undefined;
				Grander.fort_weapon = undefined;
				Grander.mb.frame_fix.addEvent("mousedown",function(e){var el=e.target||e.srcElement;if(el.id!="msbox_iecockblocker")return;Grander.hide();});
			}
		},250);
	}
} catch(e){
	Grander.in_progress = false;
	alert("Wystąpił błąd! " + e);
}
}

function Interval() {
	for(roomname in chatcontrol.rooms){
		if(chatcontrol.rooms[roomname].roomdescription.hasOwnProperty("fortid")){
			if(Grander.fort_size[chatcontrol.rooms[roomname].roomdescription.fortid] == undefined){
				Ajax.remoteCall('fort_overview&action=search_fort&h='+h,'',{fortNames:chatcontrol.rooms[roomname].roomdescription.title},function(data)	{ 
					Grander.fort_size[data[0].fort_id] = data[0].type;
				});
			}	
		}
	}
	$$(".chat_servicegrade_captain").removeEvents('click');
	$$(".chat_servicegrade_captain").addEvent('click',function(e)  {Grander.westid = this.parentNode.parentNode.className.match(/[0-9]+/);Grander.PopUp(e);});
	$$(".chat_servicegrade_private").removeEvents('click');
	$$(".chat_servicegrade_private").addEvent('click',function(e)  {Grander.westid = this.parentNode.parentNode.className.match(/[0-9]+/);Grander.PopUp(e);});
	$$(".chat_servicegrade_recruit").removeEvents('click');
	$$(".chat_servicegrade_recruit").addEvent('click',function(e)  {Grander.westid = this.parentNode.parentNode.className.match(/[0-9]+/);Grander.PopUp(e);});
	$$(".chat_servicegrade_reservist").removeEvents('click');
	$$(".chat_servicegrade_reservist").addEvent('click',function(e){Grander.westid = this.parentNode.parentNode.className.match(/[0-9]+/);Grander.PopUp(e);});
	$$(".chat_servicegrade_traitor").removeEvents('click');
	$$(".chat_servicegrade_traitor").addEvent('click',function(e)  {Grander.westid = this.parentNode.parentNode.className.match(/[0-9]+/);Grander.PopUp(e);});
} 

function init(){
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
			585:9,
			
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

	Grander.sectors = [
		"Górny lewy sektor","Dolny lewy sektor","Lewy południowy setor","Środkowy południowy sertor","Prawy południowy sektor","Prawy dolny sektor","Prawy górny sektor", // attack
		"Baszta poszukiwaczy","Baszta pojedynkowiczów","Baszta żołnierzy","Baszta robotników","Koszary","Magazyn","Budynek główny","Północny mur","Południowy mur","Zachodni mur","Wschodni mur","Brama",
		"Flaga" , "Środek Fortu"
	];
	
	div=new Element('div',{styles:{cursor:"pointer"}});
	div.addEvent('click',function(){Grander.open_import_hp()});
	div.innerHTML = '<div class="main_footnote"><div class="main_footnote_left"></div><div class="main_footnote_right"></div><div style="-moz-user-select: none;">&nbsp;Edytuj listę HP&nbsp;</div></div>';
	
	div.injectInside('main_footnotes');
	
	Grander.fort_size = new Object;
	Grander.allies_names = new Object;
	Grander.highlighted = new Object;
	Grander.players_hp = JSON.parse(localStorage.getItem('players_hp'));
	if(Grander.players_hp == undefined) {
		Grander.players_hp = {};
	}
	Grander.fort_weapon = undefined;
}

var grander_script = document.createElement('script');
grander_script.type='text/javascript';
grander_script.text =  'if(window.Grander == undefined){\n';
grander_script.text += '  window.Grander = new Object();\n';
grander_script.text += '  Grander.in_progress = false;\n';
grander_script.text += '  Grander.init = ' + init.toString() + '\n';
grander_script.text += '  Grander.PopUp = ' + PopUp.toString() + '\n';
grander_script.text += '  Grander.open_import_hp = ' + open_import_hp.toString() + '\n';
grander_script.text += '  Grander.import = ' + import.toString() + '\n';
grander_script.text += '  Grander.export = ' + export.toString() + '\n';
grander_script.text += '  Grander.update_list = ' + update_list.toString() + '\n';
grander_script.text += '  Grander.Interval = ' + Interval.toString() + '\n';
grander_script.text += '  Grander.FindKey=' + findkey.toString() + '\n';
grander_script.text += '  Grander.between = ' + between.toString() + '\n';
grander_script.text += '  Grander.stripe = ' + stripe.toString() + '\n';
grander_script.text += '  Grander.highlightpos = ' + highlightpos.toString() + '\n';
grander_script.text += '  Grander.hide = ' + hide.toString() + '\n';
grander_script.text += '  Grander.init(); \n';
grander_script.text += '  Grander.Interval(); \n';
grander_script.text += ' setInterval( function() { Grander.Interval() } , 5000) \n';
grander_script.text += '}';
document.body.appendChild(grander_script);