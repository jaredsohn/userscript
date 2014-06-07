// ==UserScript==
// @name           DS-Angriffsmarkierer
// @namespace      Jano1
// @description    Dieses kleine Script zeigt im Spielerprofil alle aktuell angegriffenen Dörfer eines Spielers.
// @version        1.03
// @include        http://ae*.tribalwars.ae/game.php?village=*&screen=place*
// @include        http://ae*.tribalwars.ae/game.php?village=*&screen=info_player&id=*
// ==/UserScript==


//GET Variablen aus URL holen
function getUrlVars(){var vars = [], hash;var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');for(var i = 0; i < hashes.length; i++){hash = hashes[i].split('=');vars.push(hash[0]);vars[hash[0]] = hash[1];}return vars;}
var get_vars = getUrlVars();

//in_array Funktion:
function in_array(item,arr) {
for(p=0;p<arr.length;p++) if (item == arr[p]) return true;
return false;
}

//(x|y)
unsafeWindow.inputxy_jano = function(){
	var x = document.getElementById('inputx').value;
	var y = document.getElementById('inputy').value;
	var cord = {'x':x, 'y':y};
	return cord;
} 

//GM Variable gesetzt?
if(GM_getValue('jano_marked_villages','unset') == 'unset'){
	GM_setValue('jano_marked_villages','0|0#');
	// DEBUG alert('GM Variable erstellt, Inhalt: '+GM_getValue('jano_marked_villages'));
}

//Element löschen
function removeElement(id) {
	var element = document.getElementById(id);
	element.parentNode.removeChild(element);
}

//Sekunden zu String
String.prototype.toHHMMSS = function () {
    sec_numb    = parseInt(this);
    var hours   = Math.floor(sec_numb / 3600);
    var minutes = Math.floor((sec_numb - (hours * 3600)) / 60);
    var seconds = sec_numb - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    var time    = hours+':'+minutes+':'+seconds;
    return time;
}


//Alte Werte rauswerfen um Speicher zu sparen
function del_oldies(){
	var m_v_u = GM_getValue('jano_marked_villages'); var m_v_s = m_v_u.split('#');
	var actual_time = new Date();
	var actual_mils = actual_time.getTime();	
	var data = '';
	for (z in m_v_s){
		if(z != (m_v_s.length-1)){
			if(m_v_s[z].split('|')[1] >= actual_mils){
				data += m_v_s[z].split('|')[0]+'|'+m_v_s[z].split('|')[1]+'#';
			}
		}
	}
	
	GM_setValue('jano_marked_villages',data);
}

//Doppelte Werte reduzieren auf den aktuellsten
function del_doubles(){
	var m_v_u = GM_getValue('jano_marked_villages'); var m_v_s = m_v_u.split('#');
	
	var data = new Array(); var new_entry = '';
	for (z in m_v_s){
		if(z != (m_v_s.length-1)){
				data[m_v_s[z].split('|')[0]] = m_v_s[z].split('|')[1];
		}
	}
	
	var i = 0;
	for(i=0;i<=data.length;i++){
		if(data[i] != undefined){
			new_entry += i+'|'+data[i]+'#';
		}
	}
	
	GM_setValue('jano_marked_villages',new_entry);
}

//Dorf ID
unsafeWindow.villageID_jano = function(){
	if(document.getElementById('check_jano').checked){
		var id = document.getElementById('content_value').innerHTML.match(/id\=(\d+){1,10}/)[1];
		var durations = document.getElementById('content_value').innerHTML.match(/(\d+){1,5}:(\d+){1,2}:(\d+){1,2}/);
		var duration = ((durations[1]*60*60)+(durations[2]*60)+parseInt(durations[3]))*1000;
			var a = new Date();
			var mils = a.getTime();	
		var end_time = mils+duration;
		
		//abspeichern
		var new_data = old_data+id+'|'+end_time+'#';
			setTimeout(function() {
				GM_setValue('jano_marked_villages',new_data);
			}, 0);
		
	}
}

//Gespeicherte Angriffe anzeigen
unsafeWindow.show_attacks = function(){
	var mode, target, table, value, nr, vlink, date, dura, date_f, dura_l, dura_str;
	if(document.getElementById('show_attack').value == 'Anzeigen'){document.getElementById('show_attack').value="Verbergen"; mode = true;}else{document.getElementById('show_attack').value="Anzeigen"; mode = false;};
	
	//Anzeigen der Liste
	if(mode == true){
		del_oldies();
		target = document.getElementById('saved_att');
		
		target.innerHTML += '<span id="hide_mv_span"><center><i>Lädt...</i></center></span>';
		
		table = '<table id="hide_mv_table" class="vis" style="width:100%"><tbody><tr><th>Nummer</th><th>Dorf-ID</th><th>Angriffszeit</th><th>Verbleibend</th></tr>';
		for(i in data){
			if(i < (data.length-1)){
				value = data[i].split('|');
				nr = (i*1)+1;
				vlink = '<a href="game.php?village='+get_vars['village']+'&screen=info_village&id='+value[0]+'">'+value[0]+'</a>';
				date = new Date(); date.setTime(value[1]); date_f = date.toLocaleString();
				dura = new Date(); dura = dura.getTime();
				dura_l = (date-dura)/1000; dura_str = dura_l+''; dura_str = dura_str.toHHMMSS();
				table += '<tr><td>'+nr+'</td><td>'+vlink+'</td><td>'+date_f+'</td><td>'+dura_str+'</td></tr>';
			}
		}
		
		removeElement('hide_mv_span');
		target.innerHTML += table;
	}

	//Verbergen der Liste
	if(mode == false){
		removeElement('hide_mv_table');
		removeElement('hide_mv_span');
	}
}

//######################//
//Mögliche Einstellungen//
//######################//
if(getUrlVars()['screen'] == 'settings'){
	del_oldies();
	del_doubles();
	var data = GM_getValue('jano_marked_villages'); data = data.split('#');
	document.getElementsByTagName('form')[0].parentNode.innerHTML += '<br><table class="vis" style="width:518px"><tr><th colspan="2">Angriffsmarkierer:</th></tr>'+
																	 '<tr><td>Anderes Symbol wählen:</td></tr>'+
																	 '<tr><td>Modus:</td></tr>'+
																	 '<tr><td id="saved_att">Gespeicherte Angriffe:<br><input type="button" value="Anzeigen" id="show_attack" onclick="show_attacks();"></td></tr>'+
																	 '</tbody></table>';
	}

//##################################################//
//Versammlungsplatz, Leute losschicken ('Ok'-Button)//
//##################################################//
if(get_vars['screen'] == 'place' && get_vars['try'] == 'confirm'){
	
	//Angriff losschicken Button anpassen
	var position = 'style="float:left"';
	document.getElementById('troop_confirm_go').parentNode.innerHTML += '<table class="vis" '+position+'><tbody><tr><th><input checked width="5px" height="5px" type="checkbox" id="check_jano"/> حفظ الهجوم </th></tr></tbody></table>';
	document.getElementById('troop_confirm_go').setAttribute('onclick','villageID_jano();');
	del_oldies();
	del_doubles();
	var old_data = GM_getValue('jano_marked_villages');
}

//#######################//
//Anzeigen in der Tabelle//
//#######################//
if(get_vars['screen'] == 'info_player'){

		del_oldies();
		del_doubles();
		
	//jano_marked_villages variable laden
	var m_v_u = GM_getValue('jano_marked_villages'); var m_v_s = m_v_u.split('#');
	var marked_villages = new Array();
	for (z in m_v_s){
		marked_villages[m_v_s[z].split('|')[0]] = m_v_s[z].split('|')[1];
	}
	
	//Tabelle finden und anpassen
	var table_rows = document.getElementById('content_value').getElementsByTagName('table')[2].getElementsByTagName('tr');
	var attacks = 0;
	for (i in table_rows){
		if(i != 0 && i < table_rows.length){
			var HTML = table_rows[i].getElementsByTagName('td')[0].innerHTML;
			var html;
			var ID = HTML.match(/id=(\d+){1,10}/)[1];
			if(marked_villages[ID] != undefined){
				var actual_time = new Date();
				var actual_mils = actual_time.getTime();	
				if(marked_villages[ID] >= actual_mils){
					html = '<img src="graphic/command/attack.png" alt="Angriff!" title="Wird angegriffen">'+HTML;
					table_rows[i].getElementsByTagName('td')[0].innerHTML = html;
					attacks++;
				}
			}
		}
	}
	table_rows[0].getElementsByTagName('th')[0].innerHTML += '<br>عدد القرى المهجوم عليها : '+attacks;
}



