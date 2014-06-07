// ==UserScript==
// @name           DS-Speicher
// @namespace      Jano1
// @description    Ein kleines Tool, welche die Ansicht im Speicher verbessert.
// @include        http://de*.die-staemme.de/game.php?village=*&screen=storage
// @include        http://de*.die-staemme.de/game.php?village=*&screen=settings*
// @version        1.04 - DS8.x verträglich ;) UND auch Opera verträglich!
// ==/UserScript==
	
	//SCRIPT-API
	var api = typeof unsafeWindow != 'undefined' ? unsafeWindow.ScriptAPI : window.ScriptAPI;
	api.register('DS-Verbesserte Speicheransicht', 8.0, 'Jano1', 'jano1_scripts@web.de' );
	
	//Opera unsafe_window
	//wenn unsafe_window = 'undefined' (was bei Opera und Greasemokey unter der Version 0.5b der Fall ist), ist uw = window. Sonst ist uw = unsafe_window
	unsafe_window = typeof unsafeWindow != 'undefined' ? unsafeWindow : window;
	
	//Zahlenformat 0 -> 00
	unsafe_window.NumToTwoPlaces = function(d){var s = ""+d;while (s.length < 2)s = "0"+s;return s;}

	//Zielobjekt:
	var object = document.getElementsByClassName('vis')[1].getElementsByTagName('td');
	
	//document.getElementsByClassName wird ermöglicht.
	getElementsByClassName = function(class_name) {var docList = this.all || this.getElementsByTagName('*');var matchArray = new Array();var re = new RegExp("(?:^|\\s)"+class_name+"(?:\\s|$)");for (var i = 0; i < docList.length; i++) {if (re.test(docList[i].className) ) {matchArray[matchArray.length] = docList[i];}}return matchArray;}

	//Produktion pro Stunde
	var iron, stone, wood;
	 iron = document.getElementById('iron').getAttribute('title'); iron = iron/3600;
	 stone = document.getElementById('stone').getAttribute('title'); stone = stone/3600;
	 wood = document.getElementById('wood').getAttribute('title'); wood = wood/3600;
	
	//Aktueller Speicherstand
	var iron_c, stone_c, wood_c;
   	 iron_c = document.getElementById('iron').innerHTML;
	 stone_c = document.getElementById('stone').innerHTML;
	 wood_c = document.getElementById('wood').innerHTML;
	
	//Dauer bis Ende
	var iron_d, stone_d, wood_d
	 iron_d = object[2].innerHTML.match(/(\d+){1,2}:(\d+){1,2}:(\d+){1,2}/);
	 stone_d = object[5].innerHTML.match(/(\d+){1,2}:(\d+){1,2}:(\d+){1,2}/);
	 wood_d = object[8].innerHTML.match(/(\d+){1,2}:(\d+){1,2}:(\d+){1,2}/);
	
	//Dauer in Sekunden umrechnen:
	var d = new Array();
	 d[1] = (parseInt(iron_d[1]*60*60))+(parseInt(iron_d[2]*60))+parseInt(iron_d[3]);
	 d[2] = (parseInt(stone_d[1]*60*60))+(parseInt(stone_d[2]*60))+parseInt(stone_d[3]);
	 d[3] = (parseInt(wood_d[1]*60*60))+(parseInt(wood_d[2]*60))+parseInt(wood_d[3]);
	
	//Produktion nach Zeit pro Rohstoff
	var pronazeit = new Array(); var wood_p, stone_p, iron_p; var i = 1; var capa = document.getElementById('storage').innerHTML;
	 while(i < 4){
		wood_p = Math.round(wood * d[i])+parseInt(wood_c); if(wood_p >= capa){wood_p = 'voll';}
		stone_p = Math.round(stone * d[i])+parseInt(stone_c); if(stone_p >= capa){stone_p = 'voll';}
		iron_p = Math.round(iron * d[i])+parseInt(iron_c); if(iron_p >= capa){iron_p = 'voll';}
		pronazeit[i] = {'wood':wood_p,'stone':stone_p,'iron':iron_p};
		i++;
	 }  
	
	//Einsetzen der Werte in die Tabelle
	var wood_old_str = object[1].innerHTML.match(/(\d+){1,2}:(\d+){1,2}:(\d+){1,2}/);
	var wood_new_str = '<a title="Holz: voll | Lehm: '+pronazeit[1].stone+' | Eisen: '+pronazeit[1].iron+'">'+wood_old_str[0]+'</a>';
	object[1].innerHTML = object[1].innerHTML.replace(wood_old_str[0],wood_new_str);
	 
	var stone_old_str = object[4].innerHTML.match(/(\d+){1,2}:(\d+){1,2}:(\d+){1,2}/);
	var stone_new_str = '<a title="Holz: '+pronazeit[2].wood+' | Lehm: voll | Eisen: '+pronazeit[2].iron+'">'+stone_old_str[0]+'</a>';
	object[4].innerHTML = object[4].innerHTML.replace(stone_old_str[0],stone_new_str);

	var iron_old_str = object[7].innerHTML.match(/(\d+){1,2}:(\d+){1,2}:(\d+){1,2}/);
	var iron_new_str = '<a title="Holz: '+pronazeit[3].wood+' | Lehm: '+pronazeit[3].stone+' | Eisen: voll">'+iron_old_str[0]+'</a>';
	object[7].innerHTML = object[7].innerHTML.replace(iron_old_str[0],iron_new_str);
	

	//Funktion für 
	unsafe_window.berechneMenge = function() {
		var zeit = (document.getElementById('rechnung1').value*60*60)+(document.getElementById('rechnung2').value*60)+parseInt(document.getElementById('rechnung3').value);
		document.getElementById('janoergebnis1').innerHTML = Math.round(wood*zeit);
		document.getElementById('janoergebnis2').innerHTML = Math.round(stone*zeit);
		document.getElementById('janoergebnis3').innerHTML = Math.round(iron*zeit);
			var fill_w = Math.round(wood*zeit+parseInt(wood_c)); if(fill_w >= capa){fill_w = capa;}
			var fill_s = Math.round(stone*zeit+parseInt(stone_c)); if(fill_s >= capa){fill_s = capa;}
			var fill_i = Math.round(iron*zeit+parseInt(iron_c)); if(fill_i >= capa){fill_i = capa;}
		document.getElementById('janoergebnis11').innerHTML = fill_w;
		document.getElementById('janoergebnis22').innerHTML = fill_s;
		document.getElementById('janoergebnis33').innerHTML = fill_i;
	}
	
	//Rechnug hinzufügen
	var world = unsafe_window.game_data.world;
	var element100 = document.getElementsByClassName('vis')[0];
	var element200 = document.createElement("div");
	element200.setAttribute('style','float:left;');
	element200.innerHTML =
		'<table class="vis"><tbody>'+
		'<tr><th>Zeit</th><th>Rohstoffmenge</th><th>Lagerf&uuml;llstand</th></tr>'+
		'<tr><td rowspan="3">Bef&uuml;llung in '+
		'<input title="Stunden" onchange="this.value=NumToTwoPlaces(this.value);" maxlength="2" style="width:15px;" id="rechnung1" onkeyup="berechneMenge()" value="00">:'+
		'<input title="Minuten" onchange="this.value=NumToTwoPlaces(this.value);" maxlength="2" style="width:15px;" id="rechnung2" onkeyup="berechneMenge()" value="00">:'+
		'<input title="Sekunden" onchange="this.value=NumToTwoPlaces(this.value);" maxlength="2" style="width:15px;" id="rechnung3" onkeyup="berechneMenge()" value="00">'+
		'&nbsp;&nbsp;&nbsp;'+
		'</td><td><img src="http://'+world+'.die-staemme.de/graphic/holz.png?1" alt="Holz"> <span id="janoergebnis1">0</span></td><td><img src="http://'+world+'.die-staemme.de/graphic/holz.png?1" alt="Holz"> <span id="janoergebnis11">'+wood_c+'</span></td></tr>'+
		'<tr><td><img src="http://'+world+'.die-staemme.de/graphic/lehm.png?1" alt="Lehm"> <span id="janoergebnis2">0</span></td><td><img src="http://'+world+'.die-staemme.de/graphic/lehm.png?1" alt="Lehm"> <span id="janoergebnis22">'+stone_c+'</span></td></tr>'+
		'<tr><td><img src="http://'+world+'.die-staemme.de/graphic/eisen.png?1" alt="Eisen"> <span id="janoergebnis3">0</span></td><td><img src="http://'+world+'.die-staemme.de/graphic/eisen.png?1" alt="Eisen"> <span id="janoergebnis33">'+iron_c+'</span></td></tr>'+
		'</tbody></table>';
	document.getElementById('content_value').insertBefore(element200,element100);
	
	
	
	//OperaExtra -.-