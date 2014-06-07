// ==UserScript==
// @name           Uprate domination
// @namespace      ivicaSR_update_domibar
// @description    Za toxika
// @include        http://www.erepublik.com/*/military/battlefield/*
// ==/UserScript==

var zone = unsafeWindow.SERVER_DATA['zoneId'];
var battleID = location.href.split("/")[6];



var scriptCode = new Array();

scriptCode.push('function getFighters(battleId){'        );
scriptCode.push('	if (globalStop || globalSleepTick <= 0) {'        );
scriptCode.push('		return;'        );
scriptCode.push('	}'        );
scriptCode.push(''        );
scriptCode.push('	if(battleData[\'attackers\'].length >= 0 && battleData[\'defenders\'].length >= 0) {'        );
scriptCode.push('		var get_fighters_url = "/en/military/battle-log/"+battleId;'        );
scriptCode.push(''        );
scriptCode.push('		$j.getJSON(get_fighters_url, function(data) {'        );
scriptCode.push('			current_domination = data["domination"];'        );
scriptCode.push('			battleFX.updateDomination(current_domination, data.points);'        );
scriptCode.push('			if(data.points.attacker >= 1800 || data.points.defender >= 1800){'        );
scriptCode.push('				battleFX.stopBattle();'        );
scriptCode.push('			}'        );
scriptCode.push(''        );
scriptCode.push('			if (!data["attackers"].length && !data["defenders"].length) {'        );
scriptCode.push('				delay_getting_fighters();'        );
scriptCode.push('			} else {'        );
scriptCode.push('				reset_delay_getting_fighters();'        );
scriptCode.push('				var delay = true;'        );
scriptCode.push('				$j.each(data[\'attackers\'], function(idx, attacker) {'        );
scriptCode.push('					if (!util.in_array(attacker["id"], already_queued) && (attacker[\'name\'] != $j(\'.citizen_name\').html() || !SERVER_DATA.mustInvert || attacker[\'id\'] == 0)) {'        );
scriptCode.push('						if(attacker[\'damage\'] != 0){'        );
scriptCode.push('							battleData[\'attackers\'].push(attacker);'        );
scriptCode.push('							delay = false;'        );
scriptCode.push('						}'        );
scriptCode.push('					}'        );
scriptCode.push('				});'        );
scriptCode.push('				$j.each(data[\'defenders\'], function(idx, defender) {'        );
scriptCode.push('					if (!util.in_array(defender["id"], already_queued) && (defender[\'name\'] != $j(\'.citizen_name\').html() || SERVER_DATA.mustInvert || defender[\'id\'] == 0)) {'        );
scriptCode.push('						if(defender[\'damage\'] != 0){'        );
scriptCode.push('							battleData[\'defenders\'].push(defender);'        );
scriptCode.push('							delay = false;'        );
scriptCode.push('						}'        );
scriptCode.push('					}'        );
scriptCode.push('				});'        );
scriptCode.push('				if(delay){'        );
scriptCode.push('					delay_getting_fighters();'        );
scriptCode.push('				}'        );
scriptCode.push('			}'        );
scriptCode.push('		});'        );
scriptCode.push('	}'        );
scriptCode.push('}'        );



var script = document.createElement('script');
script.innerHTML = scriptCode.join('\n');
scriptCode.length = 0;
document.getElementsByTagName('head')[0].appendChild(script);



function updateDomibar() {
	unsafeWindow.getFighters(battleID);
}

function addUpdateButton() {
	
	
	var displayEl = document.createElement("div");
	displayEl.id="update_form_btn";
	displayEl.setAttribute('style', 'padding-bottom:10px;float:right;');
	displayEl.setAttribute('align', 'center');
	displayEl.appendChild(document.createElement('br'));
	var dugme = document.createElement('input');
	dugme.type = 'submit';
	dugme.name = 'my_update_domibar';
	dugme.id = 'my_update_domibar';
	dugme.value = 'Wall update';
	dugme.addEventListener('click', updateDomibar, false);
	displayEl.appendChild(dugme);
	
	latest=document.getElementById('large_sidebar');
	latest.appendChild(displayEl);
}

addUpdateButton();