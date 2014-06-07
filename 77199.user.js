// ==UserScript==
// @name           Dossergame - łatwa zmiana broni, mieszkania, rupieci
// @description    Skrypt dodaje obok awatara 3 ikonki - bron, mieszkanie, rupieć i menu do ich zmiany
// @version        1.2
// @author         aaa
// @include        http://*dossergame.co.uk/*
// ==/UserScript==

var link = 'http://' + window.location.host
//---css-html-----------------------------------------------------------------------------

var div_left = GM_getValue('div_left','120px')		//laden der position
var div_top = GM_getValue('div_top','135px')

var mycss = '<style type="text/css">\n'
	+'.div_item .drop, #menu .liste , .setup, .setup_button, .item_info, #tool_tip {display:none}\n'
	+'.div_item:hover .drop, #menu:hover .liste, #menu:hover .setup_button , .liste_setup:hover .item_info {display:block}\n'
	+'.div_item {position:absolute; width:38px; height:42px}\n'
	+'.img {position:absolute; left:0px; width:32px; height:32px; background-color:#e4e4e4; border:3px solid #434363; -moz-border-radius:4px; overflow:hidden}\n'
	+'#info {position:absolute; bottom:45px; right:0px; background-color:#fcfcdf; padding:4px}\n'
	+'#info, .setup, .save_button, .close_button, .item_info, #tool_tip {border:1px solid #000000; -moz-border-radius:3px}\n'
	+'.text, .save_button {font-size:12px; text-align:center; font-weight:bold; padding:2px}\n'
	+'#menu {position:absolute; top:42px; left:-42px; width:114px; background-color:#434363; color:#e4e4e4; border:4px solid #434363; -moz-border-radius:4px}\n'
	+'.liste {position:relative; width:114px; background-color:#e4e4e4; color:#434363}\n'
	+'.liste:hover {background-color:#434363; color:#e4e4e4; cursor:pointer}\n'
	+'.setup_button {background-color:#e4e4e4; color:#901010}\n'
	+'.setup_button:hover {background-color:#901010; color:#e4e4e4; cursor:pointer}\n'
	+'.setup {position:absolute; top:220px; right:300px; width:400px; background-color:#fcfcdf; padding:2px; z-index:10}\n'
	+'.save_button, .close_button {position:absolute; bottom:4px; right:4px; width:40px; background-color:#901010; color:#e4e4e4; cursor:pointer}\n'
	+'.close_button {top:4px; right:4px; width:12px; height:12px; overflow:hidden}\n'
	+'.x {font-size:22px; font-weight:normal; font-family:sans-serif; margin-left:-3px; margin-top:-9px}\n'
	+'.item_info {position:absolute; left:55px; bottom:16px; min-width:120px; background-color:#ffffff; opacity:0.9; padding:4px; z-index:10}\n'
	+'.liste_setup {position:relative; width:190px; padding:2px}\n'
	+'</style>\n';

var mydiv = '\n\n<!--Beginn_GM_Script_Waffe_Eigenheim_Plunder_wechseln-->\n'
	+mycss+'\n<div id=\"wep_div\" style=\"position:absolute; top:'+div_top+'; left:'+div_left+'; z-index:100\"'		//hauptframe, verschiebt alles
	+'onmouseover=\"javascript:aktiv=setTimeout\(function(){document.getElementById(\'tool_tip\').style.display = \'block\'}, 5000\)\" '
	+'onmouseout=\"javascript:window.clearTimeout(aktiv);document.getElementById(\'tool_tip\').style.display = \'none\'\">\n'
	+'<div id=\"tool_tip\" style=\"position:absolute; top:-20px; left:125px; width:100px; background-color:#dffcfc; padding:3px\">Obszar wyświetlania może być przenoszony przez dwukrotne kliknięcie.</div>\n'
	+'\n<div id=\"waffe\" class=\"div_item\" style=\"left:0px\" value=>&nbsp;</div>\n'
	+'\n<div id=\"eigenheim\" class=\"div_item\" style=\"left:42px\" value=>&nbsp;</div>\n'
	+'\n<div id=\"plunder\" class=\"div_item\" style=\"left:84px\" value=>&nbsp;</div>\n'
	+'\n</div>\n'
	+'<div id=\"setup_waffe\" class=\"setup\">&nbsp;</div><div id=\"setup_eigenheim\" class=\"setup\">&nbsp;</div><div id=\"setup_plunder\" class=\"setup\">&nbsp;</div>\n'
	+'<!--Ende_GM_Script_Waffe_Eigenheim_Plunder_wechseln-->\n\n';

document.getElementById("my-profile").innerHTML += mydiv;		//da kommt alles rein


//---waffe--------------------------------------------------------------------------------

function waffe(){

	document.getElementById('waffe').attributes[0].nodeValue = '';		//letzte auswahl loeschen

	GM_xmlhttpRequest({		//abfrage im netz
		method: 'GET',
		url: link+'/stock/armoury/',
		onload: function (responseDetails){

			if (responseDetails.responseText.search('/armoury/use/') == -1) return;

			var table = responseDetails.responseText.match(/<table class=\"tieritem(\s|.)*?table>/g);

			var waffe = new Array();
			var id = new Array();

			for (var i = 0, z = 1; i < table.length; i++){
				
				if(table[i].search('Selected') != -1){
					waffe[0] = table[i].split('tiername\">')[1];		//array[0] ist das was gerade angelegt ist
					waffe[0] = waffe[0].split('<')[0];
					var att = table[i].split('att">')[1];
					att = att.split('<')[0];
					var img = table[i].split('src="')[1];
					img = img.split('"')[0];
				}

				if(table[i].search('value=\"Use\"') != -1){		//arrays mit dem zeug was benutzbar ist

					waffe[z] = table[i].split('tiername\">')[1];
					waffe[z] = waffe[z].split('<\/span>')[0];
					id[z] = table[i].split('name=\"id\" value=\"')[1];
					id[z] = id[z].split('"')[0];

					z++
				}
			}

			var filter_waffe = GM_getValue('check_waffe','');		//filter laden
			
			var div_waffe = '\n<div class=\"img\"><img style=\"position: absolute; top:-9px; left:-9px\" src=\"'+img+'\" height=\"55px\"></div>\n'		//bild
				+'<div id=\"info\" class=\"drop\"><span style="font-size:12px; font-weight:bold; white-space:nowrap">'+waffe[0]+'</span><br><nobr>ATT'+att+'</nobr></div>\n'		//infobox
				+'<div id=\"menu\" class=\"drop\"><p class=\"text\">Broń</p>\n';
			for (var i = 1; i < waffe.length; i++) if (filter_waffe.search('/'+waffe[i]+'/') != -1){		//die liste, die ausklappt
				div_waffe += '<div class=\"liste\" onclick=\"javascript:document.getElementById(\'waffe\').attributes[0].nodeValue=\''+id[i]+'\'\" '		//auswahl wird zwischengespeichert und im event spaeter abgefragt
					+'<p class=\"text\">'+waffe[i]+'</p></div>\n';
			}
			div_waffe += '<div class=\"setup_button\" onclick=\"javascript:document.getElementById(\'setup_waffe\').style.display=\'block\'\">'
				+'<p class=\"text\">ustawienia</p></div></div>\n';

			document.getElementById('waffe').innerHTML = div_waffe;		//inhalt eintragen
			document.getElementById('waffe').style.display = 'block';		//anzeigen
			setup('waffe', waffe, filter_waffe, -1)		//setup-box erstellen
		}
	});
}

//---waffe-ende--------------------------------------------------------------------------


//---eigenheim----------------------------------------------------------------------------

function eigenheim(){

	document.getElementById('eigenheim').attributes[0].nodeValue = '';

	GM_xmlhttpRequest({
		method: 'GET',
		url: link+'/city/home/',
		onload: function (responseDetails){

			if (responseDetails.responseText.search('/city/home/buy/') == -1) return;

			var table = responseDetails.responseText.match(/<table class=\"tieritem(\s|.)*?table>/g);

			var eigenheim = new Array();
			var id = new Array();

			for (var i = 0, z = 1; i < table.length; i++){

				if(table[i].search('value=\"Occupied\"') != -1){

					eigenheim[0] = table[i].split('tiername">')[1];
					eigenheim[0] = eigenheim[0].split('<')[0];
					var def = table[i].split('def">')[1];
					def = def.split('<')[0];
					var img = table[i].split('src="')[1];
					img = img.split('"')[0];
				}

				if(table[i].search('value=\"Move in\"') != -1){

					eigenheim[z] = table[i].split('tiername\">')[1];
					eigenheim[z] = eigenheim[z].split('<\/span>')[0];
					id[z] = table[i].split('name=\"id\" value=\"')[1];
					id[z] = id[z].split('"')[0];

					z++
				}
			}

			var filter_eigenheim = GM_getValue('check_eigenheim','');
			
			var div_eigenheim = '\n<div class=\"img\"><img style=\"position: absolute; top:-9px; left:-9px\" src=\"'+img+'\" height=\"55px\"></div>\n'
				+'<div id=\"info\" class=\"drop\"><span style="font-size:12px; font-weight:bold; white-space:nowrap">'+eigenheim[0]+'</span><br><nobr>DEF'+def+'</nobr></div>\n'
				+'<div id=\"menu\" class=\"drop\"><p class=\"text\">Mieszkanie</p>\n';
			for (var i = 1; i < eigenheim.length; i++) if (filter_eigenheim.search('/'+eigenheim[i]+'/') != -1){
				div_eigenheim += '<div class=\"liste\" onclick=\"javascript:document.getElementById(\'eigenheim\').attributes[0].nodeValue=\''+id[i]+'\'\" '
					+'<p class=\"text\">'+eigenheim[i]+'</p></div>\n';
			}
			div_eigenheim += '<div class=\"setup_button\" onclick=\"javascript:document.getElementById(\'setup_eigenheim\').style.display=\'block\'\">'
				+'<p class=\"text\">ustawienia</p></div></div>\n';

			document.getElementById('eigenheim').innerHTML = div_eigenheim;
			document.getElementById('eigenheim').style.display = 'block';
			setup('eigenheim', eigenheim, filter_eigenheim, -1)
		}
	});
}

//---eigenheim-ende----------------------------------------------------------------------


//---plunder------------------------------------------------------------------------------

function plunder(){

	document.getElementById('plunder').attributes[0].nodeValue = '';

	GM_xmlhttpRequest({
		method: 'GET',
		url: link+'/stock/plunder/',
		onload: function (responseDetails){

			if (responseDetails.responseText.search('/stock/plunder/change/') == -1) return;
			
			var web = responseDetails.responseText;
			var plunder = new Array();
			var id = new Array();
			var info_plunder= new Array();

			var angelegt = web.split('<h3>Equipped</h3>')[1];
			angelegt = angelegt.split('</ul>')[0];

			plunder[0] = angelegt.split('alt=" " /> ')[1];
			plunder[0] = plunder[0].split('</h4>')[0];
			info_plunder[0] = angelegt.split('</h4>')[1];
			info_plunder[0] = '<div class="item_info">'+info_plunder[0].replace(/ class="zclear"/, '')+'</ul></div>';

			var img = angelegt.split('src="')[1];
			img = img.split('"')[0];

			var werte = new Array("ATT: ", "DEF: ", "Dexterity: ", "Effect: ");

			for (var i = 0; i < 4; i++){

				if (angelegt.search(werte[i]) != -1){
					werte[i] = '+'+angelegt.split(werte[i])[1];
					werte[i] = werte[i].split('</li>')[0];
				}

				else werte[i] = '-';
			}

			var table = web.match(/ztip trhover\">(\s|.)*?<\/tr>/g);

			for (var i = 0, z = 1; i < table.length; i++){

				if (table[i].search("icon_equip.png") != -1 && table[i].search(plunder[0]) == -1){
					plunder[z] = table[i].split('\)">')[1];
					plunder[z] = plunder[z].split('</a>')[0];
					id[z] = table[i].split('/sell/')[1];
					id[z] = id[z].split('/">')[0];
					info_plunder[z] = table[i].split('</a>')[1].split('</td>')[0];
					info_plunder[z] = info_plunder[z].replace(/class="hide" style="display: none;"/, 'class=\"item_info\"');
					
					z++;
				}
			}

			var filter_plunder = GM_getValue('check_plunder','');
			
			var div_plunder = '\n<div class=\"img\"><img src=\"'+img+'\" height=\"32px\"></div>\n'
				+'<div id=\"info\" class=\"drop\"><span style="font-size:12px; font-weight:bold; white-space:nowrap">'+plunder[0]+'</span><br>'
				+'ATT '+werte[0]+'<br>DEF '+werte[1]+'<br>Zręczność '+werte[2]+'<hr noshade width=\"160\" size=\"1\">Efekt: '+werte[3].replace(/\+/, '')+'</div>\n'
				+'<div id=\"menu\" class=\"drop\"><p class=\"text\">Rupieć</p>\n';
			for (var i = 1; i < plunder.length; i++) if (filter_plunder.search('/'+plunder[i]+'/') != -1){
				div_plunder += '<div class=\"liste\" onclick=\"javascript:document.getElementById(\'plunder\').attributes[0].nodeValue=\''+id[i]+'\'\" '
					+'<p class=\"text\">'+plunder[i]+'</p></div>\n';
			}
			div_plunder += '<div class=\"setup_button\" onclick=\"javascript:document.getElementById(\'setup_plunder\').style.display=\'block\'\">'
				+'<p class=\"text\">ustawienia</p></div></div>\n';

			document.getElementById('plunder').innerHTML = div_plunder;
			document.getElementById('plunder').style.display = 'block';
			setup('plunder', plunder, filter_plunder, info_plunder)
		}
	});
}

//---plunder-ende-------------------------------------------------------------------------


//---setup---------------------------------------------------------------------------------

function setup(item_name, item_array, item_filter, item_info){

	var save_button = '<div id=\"save_'+item_name+'\" class=\"save_button\">Zapisz</div>\n';
	var close_button = '<div class=\"close_button\" style=\"position:absolute\" onclick=\"javascript:document.getElementById(\'setup_'+item_name+'\').style.display=\'none\'\">'
		+'<p class=\"x\">&times;</p></div>\n';

	var liste_setup = '<ul>\n';
	for (var i = 0; i < item_array.length; i++){		//auswahl-liste
		liste_setup += '<li class=\"zleft liste_setup\">'
			+'<input id=\"'+item_array[i]+'\" type=\"checkbox\" name=\"check_'+item_name+'\" '+(item_filter.search('/'+item_array[i]+'/') != -1 ? 'checked=\"checked\"' : '')+'>'
			+'<label for=\"'+item_array[i]+'\">&nbsp;'+item_array[i]+''+(item_info != -1 ? item_info[i] : '')+'</label></li>\n'
	}
	liste_setup += '<li class=\"zclear liste_setup\">&nbsp;</li></ul>\n'
		+'<a style=\"text-decoration:none; color:#901010\" href=\"http://change.bumrise.com/change_please/000000/\" target=\"_blank\">&nbsp;Donate to the author. Thank you.</a>\n';		//fuer mich ;)

	document.getElementById('setup_'+item_name).innerHTML = liste_setup+close_button+save_button;		//setupbox erstellen

	document.getElementById('save_'+item_name).addEventListener('click', function setup_save(){		//saveclick, setup speichern
		document.getElementById('setup_'+item_name).style.display = 'none';
		for (var i = 0, item_filter = ''; i < document.getElementsByName('check_'+item_name).length; i++){
			if (document.getElementsByName('check_'+item_name)[i].checked) item_filter += '/'+item_array[i]+'/';		//checked wird dem filter hinzugefuegt
		}
		GM_setValue('check_'+item_name,item_filter);		//filter speichern
		if(item_name == 'waffe') waffe()		//reload
		if(item_name == 'eigenheim') eigenheim()
		if(item_name == 'plunder') plunder()
	},false);
}

//---setup-ende----------------------------------------------------------------------------


//---events--------------------------------------------------------------------------------

document.getElementById('waffe').addEventListener('click', function waffe_wechsel(){		//menuclick, item wechseln
	var waffe_neu = document.getElementById('waffe').attributes[0].nodeValue;		//hier wird die auswahl abgefragt
	if (waffe_neu != ''){
		document.getElementById('waffe').style.display = 'none';
		GM_xmlhttpRequest({
			method: 'POST',
			url: ''+link+'/stock/armoury/use/',
			headers: {'Content-type': 'application/x-www-form-urlencoded'},
			data: encodeURI('id='+waffe_neu+''),
			onload: function() waffe()
		});
	}
},false);

document.getElementById('eigenheim').addEventListener('click', function eigenheim_wechsel(){
	var eigenheim_neu = document.getElementById('eigenheim').attributes[0].nodeValue;
	if (eigenheim_neu != ''){
		document.getElementById('eigenheim').style.display = 'none';
		GM_xmlhttpRequest({
			method: 'POST',
			url: ''+link+'/city/home/buy/',
			headers: {'Content-type': 'application/x-www-form-urlencoded'},
			data: encodeURI('id='+eigenheim_neu+''),
			onload: function() eigenheim()
		});
	}
},false);

document.getElementById('plunder').addEventListener('click', function plunder_wechsel(){
	var plunder_neu = document.getElementById('plunder').attributes[0].nodeValue;
	if (plunder_neu != ''){
		document.getElementById('plunder').style.display = 'none';
		GM_xmlhttpRequest({
			method: 'POST',
			url: ''+link+'/stock/plunder/change/',
			headers: {'Content-type': 'application/x-www-form-urlencoded'},
			data: encodeURI('f_plunder='+plunder_neu+''),
			onload: function() plunder()
		});
	}
},false);

document.getElementById('wep_div').addEventListener('dblclick', function(mouseEvent){		//alles verschieben mit dblclick
	for (var i = 0; i <= 5; i++) document.getElementsByClassName('drop')[i].style.display = 'none';
	for (var i = 0; i <= 2; i++) document.getElementsByClassName('setup')[i].style.display = 'none';
	var move = function (mouseEvent){
		newX = mouseEvent.pageX;
		newY = mouseEvent.pageY;
		objDrag.style.left = (objX + newX - oldX) + 'px';
		objDrag.style.top = (objY + newY - oldY) + 'px';
	}
	var objDrag = document.getElementById('wep_div');
	var oldX = mouseEvent.pageX;
	var oldY = mouseEvent.pageY;
	var objX = objDrag.offsetLeft;
	var objY = objDrag.offsetTop;
	var newX = 0;
	var newY = 0;
	document.body.addEventListener('mousemove', move, true);
	objDrag.addEventListener('click', function (){		//aktuelle position speichern
		for (var i = 0; i <= 5; i++) document.getElementsByClassName('drop')[i].style.display = '';
		document.body.removeEventListener('mousemove', move, true);
		objDrag.style.cursor = 'auto';
		if (newX != 0 || newY != 0){
			GM_setValue('div_left',(objX + newX - oldX)+'px');
			GM_setValue('div_top',(objY + newY - oldY)+'px');
		}
	},false);
	objDrag.style.cursor = 'move';
}, false);

//---events-ende---------------------------------------------------------------------------

plunder()
eigenheim()
waffe()