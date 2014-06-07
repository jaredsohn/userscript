// ==UserScript==
// @name           Grepolistool auto-updater
// @namespace      http://grepolistool.altervista.org/
// @description    Carica le truppe sul grepolistool con un tasto :D
// @include        http://*.grepolis.com/game/index?town_id=*
// @version        0.2
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

const debug = false;

/////////// FUNZIONI PRINCIPALI ///////////
function json_encode(arr) {
var parts=[];var is_list=(Object.prototype.toString.apply(arr)==='[object Array]');for(var key in arr){var value=arr[key];if(typeof value=="object"){if(is_list)parts.push(array2json(value));else parts[key]=array2json(value)}else{var str="";if(!is_list)str='"'+key+'":';if(typeof value=="number")str+=value;else if(value===false)str+='false';else if(value===true)str+='true';else str+='"'+value+'"';parts.push(str)}}var json=parts.join(",");if(is_list)return'['+json+']';return'{'+json+'}';
}

function in_array (needle, haystack, argStrict) {
var key='',strict=!!argStrict;if(strict){for(key in haystack){if(haystack[key]===needle){return true}}}else{for(key in haystack){if(haystack[key]==needle){return true}}}return false;
}
///////////////////////////////////////////////////////

////////////// FUNZIONI PER L'INTERAZIONE //////////////

GrepolisTool = {
	
		troops_id : [
				null,
				'sword', // t1, spadaccini
				'slinger', // t2, frombolieri
				'archer', // t3, arcieri
				'hoplite', // t4, opliti
				'rider', // t5, cavalieri
				'chariot', // t6, carri
				'catapult', // t7, catapulte
				'minotaur', // t8, minotauri
				'manticore', // t9, manticore
				'zyklop', // t10, ciclopi
				'sea_monster', // t11, idre
				'harpy', // t12, arpie
				'medusa', // t13, meduse
				'centaur', // t14, centauri
				'pegasus', // t15, pegaso
				'cerberus', // t16, cerbero
				'fury' // t17, Furie
			],
			
		navi_id : [
				null,
				'big_transporter', // n1 , trasporto
				'bireme', // n2 , biremi
				'attack_ship', // n3 , incendiarie
				'demolition_ship', // n4 , brunotti
				'small_transporter', // n5 , trasporto veloce
				'trireme', // n6 , triremi
				'colonize_ship' // n7 , coloniali
			],
	
		langs : ["it"],
		default_lang : "it",
		
		db_lang : {
			it : {
				invalid_domain : "Il dominio {0} non è corretto..."+((debug) ? "\nStatus: {1}" : ""),
				commands_change_lang: "Cambia la lingua del grepolistool auto-updater",
				commands_change_settings: "Cambia i valori del grepolistool",
				no_settings_alert : "Non abbiamo i dati del tuo grepolistool, prego inseriscili...",
				get_host : "Inserisci l'indirizzo del grepolistool della tua allenaza, mantenere il formato con http:// all'inizio e / alla fine, se si trova in una sottocartella inserire anche quella (es. http://test.altervista.org/grepolistool/)",
				host_invalid : "Host non valido...",
				host_lang : "Lingua non disponibile...",
				get_user_code : "Inserisci il tuo id di accesso (lo leggi nella pagina del profilo), ricorda che deve avere 32 caratteri",
				user_code_invalid : "Codice utente non valido...",
				select_lang: "Scegli la nuova lingua (possibilita': {0})",
				saved : "Impostazioni salvate...",
				add_button : "Aggiorna le truppe del GrepolisTool"
			}
		},
		
		style : '.grepolistool_button {\
				display:block;\
				float:right;\
				position: absolute;\
				bottom: 10px;\
				right: 7px;\
				z-index:98;\
				height:20px;\
				width:20px;\
				cursor: pointer;\
				}\
				.grepolistool_button:hover {\
				background-position:0 -20px;\
				}\
				.grepolistool_button_up {\
				-moz-background-clip:border;\
				-moz-background-inline-policy:continuous;\
				-moz-background-origin:padding;\
				background:transparent url(http://static.grepolis.com/images/game/academy/up.png) repeat scroll 0 0;\
				}',
				
		/*
		 * Aggiunge un pop ad un testo
		 */
		add_popup : function (select, text) {
			if (typeof nr == 'undefined') nr=0;
			eval('uW.PopupFactory.addTexts({\
				grepolistool_popup_'+nr+' : text\
			});');
			uW.$(select).setPopup('grepolistool_popup_'+nr); 
		},
		
		/* 
		 * Ritorna e salva la lingua del server
		 */
		 get_lang : function () {
			 for (i=0;GrepolisTool.langs[i];i++) {
				 if (location.host.match(GrepolisTool.langs[i])) {
					 GM_setValue("lang",GrepolisTool.langs[i]);
					 return GrepolisTool.langs[i];
				 }
			 }
			 GM_setValue("lang",GrepolisTool.default_lang);
			 return GrepolisTool.default_lang;
		 },
		
		/* 
		 * Cambia la lingua dello script
		 */
		 change_lang : function () {
			 new_lang = prompt(GrepolisTool.lang.select_lang.replace("{0}",GrepolisTool.langs.join(",")),lang);
			 if (in_array(new_lang, GrepolisTool.langs)) {
				 GM_setValue("lang",new_lang);
				 alert(GrepolisTool.lang.saved);
			 }else{
				 alert(GrepolisTool.lang.invalid_lang);
			 }
		 },
		 
		/*
		 * Analisi degli errori
		 */
		error: function (data, text_field) {
			switch (data['errorType']) {
				case 'login':
					if (text_field=='alert') alert(data['html']); else $(text_field).html(data['html']);
					GM_setValue("valid_code",false);
				break;
				case 'updating':
					if (text_field=='alert') alert(data['html']); else $(text_field).html(data['html']);
				break;
				case 'root':
					if (text_field=='alert') alert(data['html']); else $(text_field).html(data['html']);
				break;
				default:
					if (text_field=='alert') alert(data['html']); else $(text_field).html(data['html']);
				break;
			}
		},
		
		/*
		 * Connessione allo script php
		 */
		connect: function (post,onload,no_page) {
			if (typeof onload != 'function' || typeof post != "string") {
				alert("Connect Error!!!");
				return false;
			}
			if (typeof no_page != 'function') {
				no_page = function (status, url) {
					alert(GrepolisTool.lang.invalid_domain.replace([ "{0}", "{1}" ], [ url, status ]));
					return false;
				}
			}
			if (debug)
				alert("User_code validation: "+valid_code+"\nHost: "+tt_host);
			if (valid_code == 1) {
				GM_xmlhttpRequest({
					method: "POST",
					headers: { "Content-Type": "application/x-www-form-urlencoded" },
					url : tt_host+"script.php",
					data : 'user_code='+user_code+((post!='') ? "&"+post : ""),
					onload : function (response) {
						if (debug)
							alert([
							  response.status,
							  response.statusText,
							  response.readyState,
							  response.responseHeaders,
							  response.responseText,
							  response.finalUrl,
							  response.responseXML
							].join("\n_____________________\n"));
						if ((response.status == '200') && (response.responseHeaders.match("Content-Type: application/json")) ) {
							eval("data = "+response.responseText);
							onload(data);
						}else {
							no_page(response.status, response.finalURL);
						}
					},
					onerror : function (response,stato) {
						alert("E' avvenuto un errore imprevisto nella chiamata...");
					}
				});
			}else{
				alert(GrepolisTool.lang.user_code_invalid);
			}
		},
		
		/*
		 * Scrive se il codice di login è corretto
		 */
		check_code : function (writing) {
			GrepolisTool.connect('action=check_code', function (data) {
				if (data['type']=='ok') {
					if (writing=='alert')
						alert(data['html']);
					else
						$(writing).html(data['html']);
				}else{
					GrepolisTool.error(data, writing);
				}
			});
		},
		
		/*
		 * Setta i valori del grepolistool
		 */
		set_values: function () {
			if (GM_getValue("grepolistool_url")!=null) tt_host = GM_getValue("grepolistool_url"); else tt_host = "http://tuaalleanza.altervista.org/";
			tt_host = prompt(GrepolisTool.lang.get_host, tt_host);
			if (tt_host!='' && tt_host!=null) {
				GM_setValue("grepolistool_url", tt_host);
				user_code = prompt(GrepolisTool.lang.get_user_code, '');
				if (user_code!='' && user_code!=null) {
					GM_setValue("user_code",user_code);
					GM_setValue("valid_code",true);
					alert(GrepolisTool.lang.saved);
				}else{
					alert(GrepolisTool.lang.user_code_invalid);
				}
			}else{
				alert(GrepolisTool.lang.host_invalid);
			}
		},
		
		/* 
		 * Prende le truppe dell'utente (terrestri)
		 */
		get_troops : function () {
			troops = [];
			troops[0] = 0;
			for (i=1;i<GrepolisTool.troops_id.length;i++) {
				if (i!=11) t = $('#units_land #'+GrepolisTool.troops_id[i]+' span.black').html();
				else t = $('#units_sea #'+GrepolisTool.troops_id[i]+' span.black').html();
				if (t!=null) {
					troops[i] = parseInt(t);
				}else{
					troops[i] = 0;
				}
			}
			
			return json_encode(troops);
		},
		
		/* 
		 * Prende le navi dell'utente
		 */
		get_navi : function () {
			navi = [];
			navi[0] = 0;
			for (i=1;i<GrepolisTool.navi_id.length;i++) {
				if ($('#units_sea #'+GrepolisTool.navi_id[i]+' span.black').html()!=null) {
					navi[i] = parseInt($('#units_sea #'+GrepolisTool.navi_id[i]+' span.black').html());
				}else{
					navi[i] = 0;
				}
			}
			
			return json_encode(navi);
		},
		
		/* 
		 * Esegue l'upgrade
		 */
		upgrade : function (writing) {
			// action=add_troops&city_name=&city_grepoid=&troops_array=&navi_array=
			if (debug)
				alert("City name: "+$("#town_name #town_name_href").html()+"\nTownId: "+uW.Game.townId+"\nTruppe: "+GrepolisTool.get_troops()+"\nNavi: "+GrepolisTool.get_navi());
			GrepolisTool.connect('action=add_troops&city_name='+$("#town_name #town_name_href").html()+'&city_grepoid='+uW.Game.townId+'&troops_array='+GrepolisTool.get_troops()+'&navi_array='+GrepolisTool.get_navi(), function (data) {
				if (data['type']=='ok') {
					if (writing=='alert')
						alert(data['html']);
					else
						$(writing).html(data['html']);
				}else{
					GrepolisTool.error(data, writing);
				}
			});
		}

}

///////////////////////////////////////////////////////


try {
	// Setto il parametro uW che useremo al posto di window
	var uW;
	if(typeof unsafeWindow==='object'){uW=unsafeWindow;}else{uW=window;}

	
	// Setta la lingua
	lang = (GM_getValue("lang")!=null) ? GM_getValue("lang") : GrepolisTool.get_lang();
	eval("GrepolisTool.lang = GrepolisTool.db_lang."+lang);
	
	// Inserire comandi per userscript e stile
	GM_registerMenuCommand(GrepolisTool.lang.commands_change_settings, GrepolisTool.set_values);
	GM_registerMenuCommand(GrepolisTool.lang.commands_change_lang, GrepolisTool.change_lang);
	GM_addStyle(GrepolisTool.style);
	
	tt_host = (GM_getValue("grepolistool_url")!=null) ? GM_getValue("grepolistool_url") : '';
	user_code = (GM_getValue("user_code")!=null) ? GM_getValue("user_code") : '';
	valid_code = (GM_getValue("valid_code")!=null) ? GM_getValue("valid_code") : 0;
	if ((tt_host=='') || (user_code=='')) {
		alert(GrepolisTool.lang.no_settings_alert);
		GrepolisTool.set_values();
	}
	
	$("#units_info_tab").append('<div id="grepolistool_add_button"><span class="grepolistool_button grepolistool_button_up"></span></div>');
	GrepolisTool.add_popup('#grepolistool_add_button', GrepolisTool.lang.add_button);
	
	$("#grepolistool_add_button").click(function () {
		GrepolisTool.upgrade('alert');
	});
}catch (e) {
	if (debug) alert("Error: "+e);
}