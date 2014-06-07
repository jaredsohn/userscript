// ==UserScript==
// @name           TheWest Fort Parser
// @namespace      the-west.ru
// @include        http://*.the-west.ru/game.php#
// ==/UserScript==

$ = unsafeWindow.$;

function abc() {
	var orig = unsafeWindow.FortBattle.makeStats;
	unsafeWindow.FortBattle.makeStats = function (data,element,fortx,forty,bool) {
		unsafeWindow.fort_parser_data = data;
		return orig(data,element,fortx,forty,bool);
	}
	
	
	var menu_forts = document.getElementById('menu_settings');
	if (menu_forts) {
		var fp_link = document.createElement('li');
		fp_link.innerHTML = '<a href=\"javascript:fp1();void(0);\"><img id=\"' + 'fort_parser_link' + '\" src=\"images/transparent.png\"/ style=\"width:128px; height:25px; background-position: 0px 0px 0px 0px; background-image:url(data:image/png;base64,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);\" title=\"Обработка результатов фортовой битвы\"></a>';
		menu_forts.parentNode.insertBefore(fp_link,menu_forts.nextSibling);
		setTimeout(function(){if ($('fort_parser_link')) $('fort_parser_link').addMousePopup('<b>Анализ боя</b>')},2500);
	}

};

setTimeout(abc,1500);

script_code = "";

unsafeWindow.fp1 = function(){
	unsafeWindow.AjaxWindow.show('user_define');
	unsafeWindow.fort_parser_player=[];
	unsafeWindow.fort_parser_hash_att=[];
	unsafeWindow.fort_parser_hash_def=[];
	for (i=unsafeWindow.fort_parser_data.attackerlist.length-1;i>=0;--i){
		unsafeWindow.fort_parser_hash_att[unsafeWindow.fort_parser_data.attackerlist[i].westid]=i;
	}
	for (i=unsafeWindow.fort_parser_data.defenderlist.length-1;i>=0;--i){
		unsafeWindow.fort_parser_hash_def[unsafeWindow.fort_parser_data.defenderlist[i].westid]=i;
	}
	unsafeWindow.setTimeout(unsafeWindow.fp2,1000);
};



unsafeWindow.fp2 = function(){
	gg=$('window_user_define_content');
	gg.innerHTML='';
	if (!unsafeWindow.fort_parser_data) return;
	tbl = '<table><tr><td id=\"FMmap\"><table cellpadding=\"0\" style=\"border:1px solid black; border-collapse:collapse; padding: 0px;\"><tbody>';
	const width = unsafeWindow.fort_parser_data.map.width;
	const height = unsafeWindow.fort_parser_data.map.height;
	for (i=0;i<height;++i){
		tbl+='<tr>';
		for (j=0;j<width;++j){
			
			tbl+='<td id=\"FMCell_'+j+'_'+i+'\" width=\"13\" height=\"13\"';
			tbl+='></td>';
		}
		tbl+='</tr>';
	}
	tbl+='</tbody></table></td><td id=\"FMinfo1\"/></tr>';
	tbl+='<tr><td id=\"FMinfo2\" colspan=\"2\" /></tr></table>'
	gg.innerHTML=tbl;
	for (i=0;i<height;++i){
		for (j=0;j<width;++j){
			cc=$('FMCell_'+j+'_'+i); 
			sect_i = unsafeWindow.fort_parser_data.map.cells[i*width+j];
			sect=unsafeWindow.fort_parser_data.map.sectors[sect_i];
			str='Координаты: {'+(j+1)+';'+(i+1)+'}';
			str+='<br/>Высота: '+sect.height;
			str+='<br/>Бонус попадания: ';
			if (sect.attackerBonus){str+=sect.attackerBonus}else{str+='0'};
			str+='<br/>Бонус уклонения: ';
			if (sect.defenderBonus){str+=sect.defenderBonus}else{str+='0'};
			if (sect.classType==0){
				str+='<br>Авантюристы: '+sect.classBonus;
			}
			else if (sect.classType==1){
				str+='<br>Дуэлянты: '+sect.classBonus;
			}
			else if (sect.classType==2){
				str+='<br>Трудяги: '+sect.classBonus;
			}
			else if (sect.classType==3){
				str+='<br>Солдаты: '+sect.classBonus;
			}
			if (sect.flag){
				str+='<br>Флаг';
			}
			cc.addMousePopup(str);
			if (sect.attackerSpawn){
				cc.style.backgroundImage="url('http://osa.ucoz.org/musor/attSpawn.png')";
				cc.style.backgroundColor='#ffccaa';
			}
			if (sect.defenderSpawn){
				cc.style.backgroundImage="url('http://osa.ucoz.org/musor/defSpawn.png')";
				cc.style.backgroundColor='#ddccff';
			}
			if (sect.flag){
				cc.style.backgroundImage="url('http://osa.ucoz.org/musor/flagSpawn.png')";
				cc.style.backgroundColor='#ddffaa';
			}
		}
	};

	unsafeWindow.fort_parser_player[1]=[];
	attackers = unsafeWindow.fort_parser_data.attackerlist;
	defenders = unsafeWindow.fort_parser_data.defenderlist;
	hash_a = unsafeWindow.fort_parser_hash_att;
	hash_b = unsafeWindow.fort_parser_hash_def;
	data=unsafeWindow.fort_parser_data;
	for (i=0;i<attackers.length;++i){
		unsafeWindow.fort_parser_player[1][attackers[i].westid]={};
		unsafeWindow.fort_parser_player[1][attackers[i].westid].pos=attackers[i].posidx;
		unsafeWindow.fort_parser_player[1][attackers[i].westid].pos=attackers[i].targetidx;
		unsafeWindow.fort_parser_player[1][attackers[i].westid].target=attackers[i].targetidx;
		unsafeWindow.fort_parser_player[1][attackers[i].westid].hp=attackers[i].starthp;
		unsafeWindow.fort_parser_player[1][attackers[i].westid].att=true;
	}
	for (i=0;i<defenders.length;++i){
		unsafeWindow.fort_parser_player[1][defenders[i].westid]={};
		unsafeWindow.fort_parser_player[1][defenders[i].westid].pos=defenders[i].posidx;
		unsafeWindow.fort_parser_player[1][defenders[i].westid].pos=defenders[i].targetidx;
		unsafeWindow.fort_parser_player[1][defenders[i].westid].target=defenders[i].targetidx;
		unsafeWindow.fort_parser_player[1][defenders[i].westid].hp=defenders[i].starthp;
		unsafeWindow.fort_parser_player[1][defenders[i].westid].def=true;
	}
	log_count=0;
	round=1;
	player_id=0;
	online=0;
	offline=0;
	for (log_count=0;log_count<unsafeWindow.fort_parser_data.log.length;log_count+=2){
		command = unsafeWindow.fort_parser_data.log[log_count];
		value=unsafeWindow.fort_parser_data.log[log_count+1];
		if (command===0){
			round=value;
			unsafeWindow.fort_parser_player[round]=[];
		}
		else if (command===1){
			player_id=value;
			unsafeWindow.fort_parser_player[round][player_id]={};
			unsafeWindow.fort_parser_player[round][player_id].pos=unsafeWindow.fort_parser_player[round-1][player_id].pos;
		}
		else if (command===2){
			unsafeWindow.fort_parser_player[round][player_id].target=value;
		}
		else if (command===3){
			unsafeWindow.fort_parser_player[round][player_id].hp=value;
		}
		else if (command===4){
			unsafeWindow.fort_parser_player[round][player_id].online=value;
		}
		else if (command===5){
			unsafeWindow.fort_parser_player[round][player_id].shoot=value;
		}
		else if (command===6){
			unsafeWindow.fort_parser_player[round][player_id].killed=value;
		}
		else if (command===7){
			unsafeWindow.fort_parser_player[round][player_id].hit=value;
		}
		else if (command===8){
			unsafeWindow.fort_parser_player[round][player_id].pos=value;
		}
	}
	unsafeWindow.fp3(1);
};

unsafeWindow.fp3 = function(round){
	if (!unsafeWindow.fort_parser_player[round]) {alert(round);return;}
	const width = unsafeWindow.fort_parser_data.map.width
	const height = unsafeWindow.fort_parser_data.map.height;
	for (i=0;i<height;++i){
		for (j=0;j<width;++j){
			cc=$('FMCell_'+j+'_'+i);
			cc.innerHTML='';
		}
	}
	for (pl in unsafeWindow.fort_parser_player[round]){
		if (isNaN(pl)) continue;
		x = unsafeWindow.fort_parser_player[round][pl].pos%width;
		y = Math.floor(unsafeWindow.fort_parser_player[round][pl].pos/width);
		if (unsafeWindow.fort_parser_player[1][pl].att){
			if (unsafeWindow.fort_parser_player[round][pl].online){
				link='http://osa.ucoz.org/musor/attacker-on1.png';
			}
			else{
				link='http://osa.ucoz.org/musor/attacker-off1.png';
			}
		}
		else{
			if (unsafeWindow.fort_parser_player[round][pl].online){
				link='http://osa.ucoz.org/musor/defender-on1.png';
			}
			else{
				link='http://osa.ucoz.org/musor/defender-off1.png';
			}
		}
		cc=$('FMCell_'+x+'_'+y);
		cc.innerHTML='<a href=\"javascript:fp4('+pl+','+round+')\" ><img id=\"r'+round+'_p'+pl+'\" src=\"'+link+'\" /></a>';
		if (unsafeWindow.fort_parser_player[1][pl].att){
			id=unsafeWindow.fort_parser_hash_att[pl];
			str=attackers[id].name + ' : '+attackers[id].townname;
		}
		else{
			id=unsafeWindow.fort_parser_hash_def[pl];
			str=defenders[id].name + ' : '+defenders[id].townname;
		};
		str+='<br/>Здоровье: '+unsafeWindow.fort_parser_player[round][pl].hp;
		str+='<br/>ShootAt: '+unsafeWindow.fort_parser_player[round][pl].shoot;
		str+='<br/>Killed: '+unsafeWindow.fort_parser_player[round][pl].killed;
		str+='<br/>Hit: '+unsafeWindow.fort_parser_player[round][pl].hit;
		str+='<br/>Target: x='+unsafeWindow.fort_parser_player[round][pl].target%width;
		str+=' y='+Math.floor(unsafeWindow.fort_parser_player[round][pl].target/width);

		ci=$('r'+round+'_p'+pl);
		ci.addMousePopup(str);
	}
	unsafeWindow.fort_parser_round = round;
	unsafeWindow.fp4(0,0);
	unsafeWindow.setTimeout(unsafeWindow.fp3,12500,++round);
};

unsafeWindow.fp4 = function(player_id,round){
	if (round===0){
		round = unsafeWindow.fort_parser_round;
		player_id = unsafeWindow.fort_parser_playerid;
	}
	if (!player_id) return;
	if (!unsafeWindow.fort_parser_player[round][player_id]) return;
	unsafeWindow.fort_parser_playerid = player_id;
	const width = unsafeWindow.fort_parser_data.map.width
	const height = unsafeWindow.fort_parser_data.map.height;
	str='Раунд: '+round+'<br/>';
	if (unsafeWindow.fort_parser_player[1][player_id].att){
		id=unsafeWindow.fort_parser_hash_att[player_id];
		str+=attackers[id].name + ' : '+attackers[id].townname;
	}
	else{
		id=unsafeWindow.fort_parser_hash_def[player_id];
		str+=defenders[id].name + ' : '+defenders[id].townname;
	};
	str+='<br/>Здоровье: '+unsafeWindow.fort_parser_player[round][player_id].hp;
	shoot = unsafeWindow.fort_parser_player[round][player_id].shoot;
	if (shoot){
		str+='<br/>Цель: ';
		if (unsafeWindow.fort_parser_player[1][player_id].att){
			id=unsafeWindow.fort_parser_hash_def[shoot];
			str+=defenders[id].name;
		}
		else{
			id=unsafeWindow.fort_parser_hash_att[shoot];
			str+=attackers[id].name;
		}
	};
	
	//str+='<br/>ShootAt: '+unsafeWindow.fort_parser_player[round][player_id].shoot;
	if (unsafeWindow.fort_parser_player[round][player_id].killed)
		str+='<br/>Убит: '+unsafeWindow.fort_parser_player[round][player_id].killed;
	if (unsafeWindow.fort_parser_player[round][player_id].hit)
		str+='<br/>Ранен: '+unsafeWindow.fort_parser_player[round][player_id].hit;
	str+='<br/>Передвижение: x='+(unsafeWindow.fort_parser_player[round][player_id].target%width+1);
	str+=' y='+Math.floor(unsafeWindow.fort_parser_player[round][player_id].target/width+1);

	ci=$('FMinfo1');
	ci.innerHTML=str;
};

body = document.getElementsByTagName('body')[0];
script = document.createElement('script');
script.type = 'text/javascript';
script.innerHTML = script_code;
body.appendChild(script);
