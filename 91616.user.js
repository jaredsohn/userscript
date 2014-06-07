// ==UserScript==
// @name           Battle game
// @namespace      http://www.erepublik.com/en/referrer/ivicaSR
// @description    Zanimacija
// @include        http://www.erepublik.com/*/military/battlefield/*
// ==/UserScript==

/*var scriptCode1 = new Array();

scriptCode1.push('battleFX.initialize_battle_info: function() {'        );
scriptCode1.push('		if (SERVER_DATA.battle_critical_at.getTime() - SERVER_DATA.server_time.getTime() > 0 && !SERVER_DATA.battleFinished){'        );
scriptCode1.push('			ERPK.countDown({'        );
scriptCode1.push('				display   : $j("#battle_countdown"),'        );
scriptCode1.push('				startTime : SERVER_DATA.zoneRemainingTime,'        );
scriptCode1.push('				stopTime  : "00:00:00",'        );
scriptCode1.push('				onTick    : battleFX.watch_countdown,'        );
scriptCode1.push('				onExpire  : battleFX.stopBattle'        );
scriptCode1.push('			});'        );
scriptCode1.push(''        );
scriptCode1.push('			getFighters(SERVER_DATA.battleId);'        );
scriptCode1.push('			getHeroes(SERVER_DATA.battleId);'        );
scriptCode1.push('			displayInterval[\'attackers\'] = setInterval("displayFighters(\'attackers\')", 5000);'        );
scriptCode1.push('			displayInterval[\'defenders\'] = setInterval("displayFighters(\'defenders\')", 5000);'        );
scriptCode1.push(''        );
scriptCode1.push('			if($j(\'#hospital_btn small\').html() == \'0\'){'        );
scriptCode1.push('				$j(\'#hospital_btn small\').show();'        );
scriptCode1.push('				$j(\'#hospital_btn\').removeClass(\'hospital_btn\');'        );
scriptCode1.push('				$j(\'#hospital_btn\').addClass(\'food_btn\');'        );
scriptCode1.push('				$j(\'#hospital_btn\').attr(\'title\', \'Consume Food\');'        );
scriptCode1.push('				if($j(\'#DailyConsumtionTrigger\').hasClass(\'buy\')){'        );
scriptCode1.push('					$j(\'#hospital_btn\').addClass(\'disabled\');'        );
scriptCode1.push('				}'        );
scriptCode1.push('			}'        );
scriptCode1.push(''        );
scriptCode1.push('			if(parseInt($j(\'#side_bar_gold_account_value\').html()) < 0.5){'        );
scriptCode1.push('//				ERPK.disableHealthKitButton();'        );
scriptCode1.push('			}'        );
scriptCode1.push(''        );
scriptCode1.push('			if(SERVER_DATA.health == 100){'        );
scriptCode1.push('				ERPK.disableHealthKitButton();'        );
scriptCode1.push('				ERPK.disableHospitalButton();'        );
scriptCode1.push('			}'        );
scriptCode1.push(''        );
scriptCode1.push('		}else{'        );
scriptCode1.push('			battleFX.stopBattle();'        );
scriptCode1.push('		}'        );
scriptCode1.push('	}'        );

*/
var scriptCode3 = new Array();
scriptCode3.push('var hitMe;'        );
scriptCode3.push('var poeni=0;'        );
scriptCode3.push('document.getElementById("side_bar_gold_account_value").innerHTML=poeni;'        );
scriptCode3.push('function testHit(s1,s2) {'        );
scriptCode3.push('	if (s1==s2) {'        );
scriptCode3.push('		poeni++;'        );
scriptCode3.push('		document.getElementById("side_bar_gold_account_value").innerHTML=poeni;'        );
scriptCode3.push('		var att_def = 0;'        );
scriptCode3.push('		if ((Math.random()*100)<50) {'        );
scriptCode3.push('			att_def=1;'        );
scriptCode3.push('		}'        );
scriptCode3.push('		if (att_def==0) {'        );
scriptCode3.push('			var random = Math.floor(Math.random()*battleData[\'attackers\'].length);'        );
scriptCode3.push('		} else {'        );
scriptCode3.push('			var random = Math.floor(Math.random()*battleData[\'defenders\'].length);'        );
scriptCode3.push('		}'        );
scriptCode3.push('		hitMe = battleData[\'defenders\'][random];'        );
scriptCode3.push('		document.getElementsByClassName("citizen_name")[0].innerHTML=hitMe.name;'        );
scriptCode3.push('	}'        );
scriptCode3.push('}'        );

var scriptCode2 = new Array();

scriptCode2.push('function getFighters(battleId){'        );
scriptCode2.push('	if(globalStop){'        );
scriptCode2.push('		return;'        );
scriptCode2.push('	}'        );
scriptCode2.push('	if(battleData[\'attackers\'].length < 10 && battleData[\'defenders\'].length < 10) {'        );
scriptCode2.push('		var get_fighters_url = "/en/military/battle-log/"+battleId;'        );
scriptCode2.push(''        );
scriptCode2.push('		$j.getJSON(get_fighters_url, function(data) {'        );
scriptCode2.push('			if (data["domination"] != current_domination) {'        );
scriptCode2.push('				current_domination = data["domination"];'        );
scriptCode2.push('				battleFX.updateDomination(current_domination);'        );
scriptCode2.push('			}'        );
scriptCode2.push(''        );
scriptCode2.push('			if (!data["attackers"].length && !data["defenders"].length) {'        );
scriptCode2.push('				delay_getting_fighters();'        );
scriptCode2.push('			} else {'        );
scriptCode2.push('				reset_delay_getting_fighters();'        );
scriptCode2.push('				var delay = true;'        );
scriptCode2.push('				$j.each(data[\'attackers\'], function(idx, attacker) {'        );
scriptCode2.push('					if (!util.in_array(attacker["id"], already_queued) && (attacker[\'name\'] != $j(\'.citizen_name\').html() || !SERVER_DATA.mustInvert || attacker[\'id\'] == 0)) {'        );
scriptCode2.push('						if(attacker[\'damage\'] != 0){'        );
scriptCode2.push('							battleData[\'attackers\'].push(attacker);'        );
scriptCode2.push('							delay = false;'        );
scriptCode2.push('						}'        );
scriptCode2.push('					}'        );
scriptCode2.push('				});'        );
scriptCode2.push('				$j.each(data[\'defenders\'], function(idx, defender) {'        );
scriptCode2.push('					if (!util.in_array(defender["id"], already_queued) && (defender[\'name\'] != $j(\'.citizen_name\').html() || SERVER_DATA.mustInvert || defender[\'id\'] == 0)) {'        );
scriptCode2.push('						if(defender[\'damage\'] != 0){'        );
scriptCode2.push('							battleData[\'defenders\'].push(defender);'        );
scriptCode2.push('							delay = false;'        );
scriptCode2.push('						}'        );
scriptCode2.push('					}'        );
scriptCode2.push('				});'        );
scriptCode2.push('				var att_def = 0;'        );
scriptCode2.push('				if ((Math.random()*100)<50) {'        );
scriptCode2.push('					att_def=1;'        );
scriptCode2.push('				}'        );
scriptCode2.push('				if (att_def==0) {'        );
scriptCode2.push('					var random = Math.floor(Math.random()*battleData[\'attackers\'].length);'        );
scriptCode2.push('				} else {'        );
scriptCode2.push('					var random = Math.floor(Math.random()*battleData[\'defenders\'].length);'        );
scriptCode2.push('				}'        );
scriptCode2.push('				hitMe = battleData[\'defenders\'][random];'        );
scriptCode2.push('				document.getElementsByClassName("citizen_name")[0].innerHTML=hitMe.name;'        );
scriptCode2.push('				if(delay){'        );
scriptCode2.push('					delay_getting_fighters();'        );
scriptCode2.push('				}'        );
scriptCode2.push('			}'        );
scriptCode2.push('		});'        );
scriptCode2.push('	}'        );
scriptCode2.push('}'        );



var scriptCode = new Array();

scriptCode.push('function displayFighters(type) {'        );
scriptCode.push('	if(battleData[type].length){'        );
scriptCode.push('		var id;'        );
scriptCode.push('		if(type == \'attackers\'){'        );
scriptCode.push('			id = \'right_attackers\';'        );
scriptCode.push('		}else{'        );
scriptCode.push('			id = \'left_attackers\';'        );
scriptCode.push('		}'        );
scriptCode.push('		var current = battleData[type].pop();'        );
scriptCode.push('		$j(\'<li style="width:0" title="\' + current.name + \'"><a  href="javascript:testHit(\\\'\'+current.name+\'\\\',\\\'\'+ hitMe.name +\'\\\');"><img alt="" width="25" height="25" src="\' + current.avatar + \'"></a><small>\' + current.name + \'</small><big>\' + current.damage + \'</big></li>\')'        );
scriptCode.push('				.hide().prependTo(\'#\'+id).gx({\'width\':\'50px\'},200, \'Sine\').fadeIn(\'slow\');'        );
scriptCode.push('		//$j(\'#\'+id+" li").eq(1).fadeTo("slow", 0.66);'        );
scriptCode.push('		//$j(\'#\'+id+" li").eq(2).fadeTo("slow", 0.33);'        );
scriptCode.push('		$j(\'#\'+id+" li").eq(1).gx({\'opacity\':0.66},200, \'Sine\');'        );
scriptCode.push('		$j(\'#\'+id+" li").eq(2).gx({\'opacity\':0.33},200, \'Sine\');'        );
scriptCode.push('		$j("#"+id+" li:last").tipsy("hide");'        );
scriptCode.push('		$j("#"+id+" li:last").remove();'        );
scriptCode.push('		already_queued.push(current.id);'        );
scriptCode.push('	}'        );
scriptCode.push('}'        );




//alert('		$j(\'<li style="width:0" title="\' + current.name + \'"><a  href="javascript:testHit(\'\'+current.name+\'\');"><img alt="" width="25" height="25" src="\' + current.avatar + \'"></a><small>\' + current.name + \'</small><big>\' + current.damage + \'</big></li>\')');

//document.getElementById("sidebar").innerHTML = scriptCode.join('\n');
var content = document.getElementById("content").getElementsByTagName("h2")[0].innerHTML;
document.getElementById("content").getElementsByTagName("h2")[0].innerHTML = content + " - Klik na odgovarajuci avatar da dobijes poene. Ime koga treba da kliknes ti je levo ispod tvog avatara, a poeni su ti tamo gde ti pisu goldi";
//document.getElementById("content").innerHTML = "Klik na odgovarajuci avatar da dobijes poene" + content;
//side_bar_gold_account_value
function setCursorByID(id,cursorStyle) {
 if (document.getElementById) {
  if (document.getElementById(id).style) {
   document.getElementById(id).style.cursor=cursorStyle;
  }
 }
}

//setCursorByID("pvp", "crosshair");

var script3 = document.createElement('script');    // create the script element
script3.innerHTML = scriptCode3.join('\n');         // add the script code to it
scriptCode3.length = 0;
document.getElementsByTagName('head')[0].appendChild(script3);

var script = document.createElement('script');    // create the script element
script.innerHTML = scriptCode.join('\n');         // add the script code to it
scriptCode.length = 0;
document.getElementsByTagName('head')[0].appendChild(script);

/*
var script1 = document.createElement('script');    // create the script element
script1.innerHTML = scriptCode1.join('\n');         // add the script code to it
scriptCode1.length = 0;
document.getElementsByTagName('head')[0].appendChild(script1);*/

var script2 = document.createElement('script');    // create the script element
script2.innerHTML = scriptCode2.join('\n');         // add the script code to it
scriptCode2.length = 0;
document.getElementsByTagName('head')[0].appendChild(script2);


