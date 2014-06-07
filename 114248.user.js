// ==UserScript==
// @name              FButt - Chat Original (Renovado)
// @description       (4-NOV-2011) Old facebook chat 100% working + emoticons bar. / Antigua interfaz de chat para facebook 100% funcional + barra de emoticons. 
// @author            Manuel Alejandro Gonzalez
// @license           GPL3+ (http://www.gnu.org/copyleft/gpl.html)
// @version           2.8.1
// @include           http://*.facebook.com/*
// @include           https://*.facebook.com/*
// @match             http://*.facebook.com/*
// @match             https://*.facebook.com/*

// ==/UserScript==

(function(){
	if (!(window.chrome && window.chrome.extension)) {
		if (!(/^https?:\/\/.*\.facebook\.com\/.*$/.test(window.location.href))) {
			return;
		}
		if (window.top!==window.self) {
			return;
		}
	}
	var fbsidebardisabler=function(){
		var mySetTimeout=function(){
			if (window.setTimeout_native) {
				window.setTimeout_native.apply(window,arguments);
			} else {
				window.setTimeout.apply(window,arguments);
			}
		};
		var mySetInterval=function(){
			if (window.setInterval_native) {
				window.setInterval_native.apply(window,arguments);
			} else {
				window.setInterval.apply(window,arguments);
			}
		};
		var extension_version='2.8.1';
		var mydebug=function(logtext){
			//window.console && window.console.log && window.console.log('fbsidebardisabler debug 1',new Date().toString(),logtext);
		};
		var mydebug2=function(logtext){
			//window.console && window.console.log && window.console.log('fbsidebardisabler debug 2',new Date().toString(),logtext,arguments.callee.caller.name,arguments.callee.caller.arguments);
		};
		var currlocale='not_loaded';
		var localstore;
		if (typeof window.fbsidebardisabler_localstore!="undefined") {
			localstore=window.fbsidebardisabler_localstore;
			window.fbsidebardisabler_localstore=null;
			delete window.fbsidebardisabler_localstore;
		}
		if (!localstore) {
			localstore={
				getItem:function(itemName,callback){
					try {
						callback(JSON.parse(window.localStorage.getItem(itemName)));
						return;
					} catch (e) {}
					callback(null);
				},
				setItem:function(itemName,itemValue){
					try {
						window.localStorage.setItem(itemName,JSON.stringify(itemValue));
					} catch (e) {}
				},
				is_fbsidebardisabler_localstore:false
			};
		}
		var loadautoupdate=function(inside_fb,errormsg){ // for Chrome only!
			if (!(window.chrome && window.XMLHttpRequest && localstore.is_fbsidebardisabler_localstore)) {
				return;
			}
			localstore.getItem('au_script_cache',function(itemValue){
				if ((!itemValue) || (!itemValue.data) || (!itemValue.lastTime) || (itemValue.lastTime<(+new Date()))) {
					var xmlhttp=new XMLHttpRequest();
					xmlhttp.onload=function(){
						var au_script_just_updated=true;
						eval(xmlhttp.responseText);
					};
					xmlhttp.onerror=function(){
						var au_script_just_updated=false;
						eval(itemValue.data);
					};
					var errorparam='';
					if (errormsg!=undefined) {
						errorparam='&error='+encodeURIComponent(errormsg);
					}
					xmlhttp.open("GET",'http://data.sidebardisabler.net/upd.js?v='+encodeURIComponent(extension_version)+errorparam+'&_r='+(+new Date()),true);
					xmlhttp.send(null);
				} else {
					var au_script_just_updated=false;
					eval(itemValue.data);
				}
			});
		};
		var loadaboutdialog=function(successcb,errorcb){
			try {
				if (localstore.operaloadaboutdialog) {
					localstore.operaloadaboutdialog(function(response){
						if (response.success) {
							if (typeof successcb=='function') {
								successcb(response.data);
							}
						} else {
							if (typeof errorcb=='function') {
								errorcb(response.errorcode,response.errortext);
							}
						}
					},extension_version,currlocale);
					return;
				}
				if (!window.XMLHttpRequest) {
					if (typeof errorcb=='function') {
						errorcb('XMLHTTP','not found');
					}
					return;
				}
				var xmlhttp=new XMLHttpRequest();
				xmlhttp.onload=function(){
					if (typeof successcb=='function') {
						successcb(xmlhttp.responseText);
					}
				};
				xmlhttp.onerror=function(){
					if (typeof errorcb=='function') {
						errorcb(xmlhttp.status,xmlhttp.statusText);
					}
				};
				xmlhttp.open("GET",'http://data.sidebardisabler.net/about.json?v='+extension_version+'&locale='+currlocale+'&_r='+(+new Date()),true);
				xmlhttp.send(null);
			} catch (e) {
				if (typeof errorcb=='function') {
					errorcb('XMLHTTP',e.message);
				}
			}
		};
		var workerfunc=function(){
			if ((!window.Env) || (!window.CSS) || (!window.DOM) || (!window.HTML) || (!window.ScrollableArea) || (!window.Dialog) || (!window._tx) || (!window.$) || (!window.Chat) || (!window.ChatSidebar) || (!window.ChatConfig) || (!window.BuddyListNub) || (!window.ChatDisplayInterim) || (!window.chatDisplay) || (!window.ChatTab) || (!window.presence) || (!window.AvailableList) || (!window.Dock) || (!window.Toggler) || (!window.Selector) || (!Function.prototype.defer) || (!window.chatDisplay.loaded)) {
				mySetTimeout(workerfunc,100);
				mydebug('still not ready, delaying execution');
				return;
			}
			if (presence.poppedOut && (/^https?:\/\/.*\.facebook\.com\/presence\/popout\.php.*$/.test(window.location.href))) {
				mydebug('chat is popped out!');
				mySetInterval(function(){
					if (!presence.poppedOut) {
						presence.popout();
						presence.poppedOut=true;
					}
					mydebug('popout fixer');
				},10);
				return;
			}
			/*if (!ChatConfig.get('sidebar')) {
				return;
			}*/
			try {
				currlocale=String(document.body.className).match(/Locale_([a-z]{2})_/);
				if (currlocale) {
					currlocale=currlocale[1];
				} else {
					currlocale=window.location.href.match(/[?&]locale=([a-z]{2})/);
					if (currlocale) {
						currlocale=currlocale[1];
					} else {
						currlocale=String(Env.locale).substr(0,2);
					}
				}
				var lang={}; // English
				lang["programname"]="FB Chat Sidebar Disabler";
				lang["aboutlink"]="About {programname} v{programversion}";
				lang["chat"]="Chat";
				lang["friendlists"]="Friend Lists";
				lang["friendlists_show"]="Display these lists in Chat:";
				lang["friendlists_none"]="No friend lists available.";
				lang["friendlists_new"]="Create a new list:";
				lang["friendlists_typename"]="Type a list name";
				lang["options"]="Options";
				lang["options_offline"]="Go offline";
				lang["options_reorder"]="Re-order Lists";
				lang["options_popout"]="Pop out Chat";
				lang["options_updatelist"]="Manually Update Buddy List";
				lang["options_sound"]="Play Sound for New Messages";
				lang["options_sticky"]="Keep Online Friends Window Open";
				lang["options_compact"]="Show Only Names in Online Friends";
				lang["options_oldchatstyle"]="Use Old-Style Chat";
				lang["loading"]="Loading...";
				lang["remove"]="Remove";
				lang["searchfieldtext"]="Friends on Chat";
				lang["errortext"]="Something went wrong. We're working on getting this fixed as soon as we can. You may be able to try again.";
				lang["save_error"]="Unable to save your Chat settings";
				lang["go_online"]="Go online";
				lang["no_friends_online"]="No one is available to chat.";
				lang["load_error"]="Could not load available friends.";
				lang["okay"]="Okay";
				lang["reorder_list_start"]="Drag lists to re-order.";
				lang["reorder_list_done"]="Done Re-Ordering";
				lang["edit_list_link"]="edit";
				lang["error_dialog_title"]="An error occurred.";
				lang["list_conflict_text"]="You cannot have two lists with the same name. Please create a unique name for this list.";
				lang["use_fb_as_page"]="Use Facebook as Page";
				if (currlocale=="it") { // Italian
					lang["programname"]="Disattiva la Sidebar della Chat di FB";
					lang["aboutlink"]="Informazioni su {programname} v{programversion}";
					lang["chat"]="Chat";
					lang["friendlists"]="Liste di amici";
					lang["friendlists_show"]="Mostra in chat le seguenti liste:";
					lang["friendlists_none"]="Nessuna lista di amici disponibile.";
					lang["friendlists_new"]="Crea una nuova lista:";
					lang["friendlists_typename"]="Scrivi il nome di una lista";
					lang["options"]="Opzioni";
					lang["options_offline"]="Passa offline";
					lang["options_reorder"]="Riordina le liste";
					lang["options_popout"]="Apri chat in finestra separata";
					lang["options_updatelist"]="Aggiorna la lista manualmente";
					lang["options_sound"]="Attiva suono per i nuovi messaggi";
					lang["options_sticky"]="Tieni aperta la finestra degli amici online";
					lang["options_compact"]="Mostra solo i nomi degli amici online";
					lang["options_oldchatstyle"]="Utilizza il vecchio stile della chat";
					lang["loading"]="Caricamento in corso...";
					lang["remove"]="Rimuovi";
					lang["searchfieldtext"]="Amici in Chat";
					lang["errortext"]="Si è verificato un problema. Stiamo cercando di risolverlo il prima possibile. Prova più tardi.";
					lang["save_error"]="Impossibile salvare le impostazioni per la Chat";
					lang["go_online"]="Passa online";
					lang["no_friends_online"]="Nessuno è disponibile a chattare.";
					lang["load_error"]="Impossibile caricare la lista degli amici online.";
					lang["okay"]="OK";
					lang["reorder_list_start"]="Trascina le liste da riordinare.";
					lang["reorder_list_done"]="Fatto";
					lang["edit_list_link"]="modifica";
					lang["error_dialog_title"]="Si è verificato un errore.";
					lang["list_conflict_text"]="Non puoi avere due liste con lo stesso nome. Dai un nome univoco a questa lista.";
					lang["use_fb_as_page"]="Usa Facebook come Pagina";
				} else if (currlocale=="es") { // Spanish
					lang["programname"]="FButt Chat";
					lang["aboutlink"]="Acerca de {programname} v{programversion}";
					lang["chat"]="Chat";
					lang["friendlists"]="Listas de amigos";
					lang["friendlists_show"]="Mostrar estas listas en el Chat:";
					lang["friendlists_none"]="No hay listas de amigos disponibles.";
					lang["friendlists_new"]="Crear lista nueva:";
					lang["friendlists_typename"]="Escribe un nombre";
					lang["options"]="Opciones";
					lang["options_offline"]="Desconectar";
					lang["options_reorder"]="Ordenar listas";
					lang["options_popout"]="Abrir chat en otra ventana";
					lang["options_updatelist"]="Actualizar lista de amigos manualmente";
					lang["options_sound"]="Reproducir sonido para nuevos mensajes";
					lang["options_sticky"]="Mantener abierta la ventana de amigos conectados al chat";
					lang["options_compact"]="Mostrar solo los nombres de los amigos conectados";
					lang["options_oldchatstyle"]="Usar el antiguo estilo de chat";
					lang["loading"]="Cargando...";
					lang["remove"]="Eliminar";
					lang["searchfieldtext"]="Amigos conectados";
					lang["errortext"]="Algo anda mal. Estamos trabajando para arreglarlo cuanto antes. Talvez quieras intentarlo de nuevo.";
					lang["save_error"]="Imposible guardar las configuraciones del chat";
					lang["go_online"]="Conectarse";
					lang["no_friends_online"]="No hay nadie disponible.";
					lang["load_error"]="No se pudo cargar la lista de amigos conectados.";
					lang["okay"]="OK";
					lang["reorder_list_start"]="Arrastra las listas para reordenar.";
					lang["reorder_list_done"]="Reorganizacion exitosa.";
					lang["edit_list_link"]="editar";
					lang["error_dialog_title"]="Ha ocurrido un error.";
					lang["list_conflict_text"]="No puedes tener dos listas con el mismo nombre. Por favor elige un nombre unico para esta lista.";
					lang["use_fb_as_page"]="Usar facebook como Pagina";				
				} else if (currlocale=="bg") { // Bulgarian
					lang["programname"]="Деактивирай Странична лента на Чата на FB";
					//lang["aboutlink"]="About {programname} v{programversion}";
					lang["chat"]="Чат";
					lang["friendlists"]="Списък с приятели";
					lang["friendlists_show"]="Покажи тези списъци в Чата:";
					lang["friendlists_none"]="Няма списък с приятели.";
					lang["friendlists_new"]="Създай нов списък:";
					lang["friendlists_typename"]="Въведи име на списъка";
					lang["options"]="Настройки";
					lang["options_offline"]="Мини извън линия";
					lang["options_reorder"]="Прегрупирай Списъците";
					lang["options_popout"]="Покажи Чата";
					lang["options_updatelist"]="Manually Update Buddy List";
					lang["options_sound"]="Изпълни звук при Ново Съобщение";
					lang["options_sticky"]="Дръж прозореца с приятелите на линия отворен";
					lang["options_compact"]="Показвай само имената на приятелите на линия";
					lang["options_oldchatstyle"]="Използвай стария вид Чат";
					lang["loading"]="Зареждане...";
					lang["remove"]="Изтрий";
					lang["searchfieldtext"]="Приятели в Чата";
					//lang["errortext"]="Something went wrong. We're working on getting this fixed as soon as we can. You may be able to try again.";
					//lang["save_error"]="Unable to save your Chat settings";
				} else if (currlocale=="tr") { // Turkish
					lang["programname"]="FB Chat Sidebar Disabler";
					//lang["aboutlink"]="About {programname} v{programversion}";
					lang["chat"]="Sohbet";
					lang["friendlists"]="Listeler";
					lang["friendlists_show"]="Sohbet Listesi İçinde Göster:";
					lang["friendlists_none"]="Mevcut Arkadaş Yok.";
					lang["friendlists_new"]="Yeni Liste Oluştur:";
					lang["friendlists_typename"]="Bir Liste İsmi girin";
					lang["options"]="Seçenekler";
					lang["options_offline"]="Çevrimdışı Ol";
					lang["options_reorder"]="Listeleri Yeniden Düzenle";
					lang["options_popout"]="Yeni Pencerede Sohbet";
					lang["options_updatelist"]="Listeyi Elle Güncelle";
					lang["options_sound"]="Yeni Mesajlar İçin Ses Çal";
					lang["options_sticky"]="Çevrimiçi Arkadaşları Açık Tut";
					lang["options_compact"]="Sadece İsimleri Göster";
					lang["options_oldchatstyle"]="Eski Sohbet Stilini Kullan";
					lang["loading"]="Yükleniyor...";
					lang["remove"]="Kaldır";
					lang["searchfieldtext"]="Çevrimiçi Arkadaşlar'da Ara";
					lang["errortext"]="Ahaa! Bir hata oldu. En kısa zamanda düzeltmeye çalışıyoruz. Tekrar deneyin, düzelebilir.";
					lang["save_error"]="Sohbet Ayarları Kaydedilemiyor!";
				} else if (currlocale=="ku") { // Kurdish
					lang["programname"]="FB Chat Sidebar Disabler";
					//lang["aboutlink"]="About {programname} v{programversion}";
					lang["chat"]="Axaftin";
					lang["friendlists"]="Lîste";
					lang["friendlists_show"]="Di nav lîsteya axaftinê de nîşan bide:";
					lang["friendlists_none"]="Heval tune ye.";
					lang["friendlists_new"]="Lîsteyeke nû ava bike:";
					lang["friendlists_typename"]="Navê lîsteyê binivîse";
					lang["options"]="Bijare";
					lang["options_offline"]="Bibe offline";
					lang["options_reorder"]="Lîsteyan sererast bike";
					lang["options_popout"]="Li paceyeke nû de axaftin";
					lang["options_updatelist"]="Lîsteyê bi dest xwe rojane bike";
					lang["options_sound"]="Ji bo peyamên nû deng bide";
					lang["options_sticky"]="Hevalên online vekirî bihêle";
					lang["options_compact"]="Tenê navan nîşan bide";
					lang["options_oldchatstyle"]="Stîla axaftina berê bi kar bîne";
					lang["loading"]="Bar dike...";
					lang["remove"]="Rake";
					lang["searchfieldtext"]="Di nav hevalên online de bigere";
					lang["errortext"]="Weyloo! Pirsgirêkek çêbû. Em ê demekê kurt de rast bikin. Dîsa biceribînin. Dibe ku rast bibe.";
					lang["save_error"]="Sepanên axaftinê nikare bê tomar kirin.";
				} else if (currlocale=="fr") { // French
					lang["programname"]="FB Chat Sidebar Disabler";
					//lang["aboutlink"]="About {programname} v{programversion}";
					lang["chat"]="Discussion instantanée";
					lang["friendlists"]="Liste d'amis";
					lang["friendlists_show"]="Afficher les listes d'amis dans le discussion instantanée:";
					lang["friendlists_none"]="Aucune liste d'amis n'est disponible.";
					lang["friendlists_new"]="Créer une nouvelle liste d'amis:";
					lang["friendlists_typename"]="Nom de liste:";
					lang["options"]="Options";
					lang["options_offline"]="Passer hors-ligne";
					lang["options_reorder"]="Réorganiser les listes";
					lang["options_popout"]="Ouvrir dans une nouvelle fenêtre";
					lang["options_updatelist"]="Mettre à jour manuellement la liste d'amis";
					lang["options_sound"]="Jouer un son lors d'un nouveau message";
					lang["options_sticky"]="Laisser la fenêtre de la liste des amis connectés ouverte";
					lang["options_compact"]="Afficher seulement le nom des ami(e)s en ligne";
					lang["options_oldchatstyle"]="Utiliser l'ancien discussion instantanée";
					lang["loading"]="Chargement...";
					lang["remove"]="Supprimer";
					lang["searchfieldtext"]="Rechercher un ami en ligne";
					lang["errortext"]="Une erreur est apparue. Nous travaillons actuellement sur le problème. Veuillez réessayer ultérieurement.";
					lang["save_error"]="Impossible de sauvegarder vos options de discussion instantanée";
				}
				else if (currlocale=="de") { // German 
					lang["programname"]="FB Chat Sidebar Disabler"; 
					lang["aboutlink"]="Über {programname} v{programversion}"; 
					lang["chat"]="Chat"; 
					lang["friendlists"]="Listen"; 
					lang["friendlists_show"]="Zeige diese Listen im Chat:"; 
					lang["friendlists_none"]="Keine Liste vorhanden."; 
					lang["friendlists_new"]="Erstelle eine neue Liste:"; 
					lang["friendlists_typename"]="Listen Namen eingeben"; 
					lang["options"]="Einstellungen"; 
					lang["options_offline"]="Offline gehen"; 
					lang["options_reorder"]="Listen neu sortieren"; 
					lang["options_popout"]="Chat lösen"; 
					lang["options_updatelist"]="Listen von Hand updaten"; 
					lang["options_sound"]="Sound bei neuen Nachrichten abspielen"; 
					lang["options_sticky"]="Fenster von Freunden die online sind offen lassen"; 
					lang["options_compact"]="Nur den Namen anzeigen, bei den Freunden die online sind"; 
					lang["options_oldchatstyle"]="Alten FB-Chat benutzen"; 
					lang["loading"]="Lade..."; 
					lang["remove"]="Entfernen"; 
					lang["searchfieldtext"]="Freunde im Chat"; 
					lang["errortext"]="Etwas ist schief gelaufen. Wir versuchen diesen Fehler zu beheben. Evtl. kannst du es nochmal versuchen."; 
					lang["save_error"]="Speichern der Chateinstellungen nicht möglich."; 
					lang["go_online"]="Gehe online"; 
					lang["no_friends_online"]="Niemand ist im Chat online."; 
					lang["load_error"]="Kann die Freunde, die online sind, nicht laden."; 
					lang["okay"]="Okay"; 
					lang["reorder_list_start"]="Ziehe die Liste zum neu Ordnen."; 
					lang["reorder_list_done"]="Neue Anordnung beendet"; 
					lang["edit_list_link"]="bearbeiten"; 
					lang["error_dialog_title"]="Es ist ein Fehler aufgetreten."; 
					lang["list_conflict_text"]="Du kannst keine zwei Listen mit dem selben Namen erstellen. Wähle einen anderen Namen."; 
					lang["use_fb_as_page"]="Benutze Facebook als Seite."; 
				}
				else if (currlocale=="el") { // Greek 
					lang["programname"]="FB Chat Sidebar Disabler"; 
					lang["aboutlink"]="Περί {programname} v{programversion}"; 
					lang["chat"]="Συνομιλία"; 
					lang["friendlists"]="Λίστες φίλων"; 
					lang["friendlists_show"]="Εμφάνιση των λιστών στη συνομιλία:"; 
					lang["friendlists_none"]="Καμία διαθέσιμη λίστα φίλων."; 
					lang["friendlists_new"]="Δημιουργία νέας λίστας:"; 
					lang["friendlists_typename"]="Πληκτρολογήστε ένα όνομα λίστας"; 
					lang["options"]="Επιλογές"; 
					lang["options_offline"]="Αποσύνδεση"; 
					lang["options_reorder"]="Αναδιάταξη λιστών"; 
					lang["options_popout"]="Πέταξε προς τα έξω τη συνομιλία"; 
					lang["options_updatelist"]="Χειροκίνητη ενημέρωση λίστας φίλων"; 
					lang["options_sound"]="Αναπαραγωγή ήχου για νέα μηνύματα"; 
					lang["options_sticky"]="Κράτησε ανοιχτό το παράθυρο φίλων"; 
					lang["options_compact"]="Εμφάνιση μόνο το ονόματα των συνδεμένων φίλων"; 
					lang["options_oldchatstyle"]="Χρησιμοποίηση του παλαιού τύπου συνομιλίας"; 
					lang["loading"]="Φόρτωση..."; 
					lang["remove"]="Αφαίρεση"; 
					lang["searchfieldtext"]="Αναζήτηση φίλων στη συνομιλία"; 
					lang["errortext"]="Κάτι πήγε στραβά. Εργαζόμαστε για να το διορθώσουμε αυτό, το συντομότερο δυνατό. Μπορείτε να προσπαθήσετε ξανα."; 
					lang["save_error"]="Δεν είναι δυνατή η αποθήκευση των ρυθμίσεων συνομιλίας"; 
					lang["go_online"]="Σύνδεση"; 
					lang["no_friends_online"]="Κανείς διαθέσιμος για συνομιλία."; 
					lang["load_error"]="Δεν ήταν δυνατή η φόρτωση διαθέσιμων φίλων."; 
					lang["okay"]="Εντάξει"; 
					lang["reorder_list_start"]="Σύρετε τις λίστες για να αλλάξετε τη σειρά."; 
					lang["reorder_list_done"]="Έγινε αναδιάταξη"; 
					lang["edit_list_link"]="επεξεργασία"; 
					lang["error_dialog_title"]="Παρουσιάστηκε σφάλμα."; 
					lang["list_conflict_text"]="Δεν μπορείτε να έχετε δύο καταλόγους με το ίδιο όνομα. Παρακαλώ δημιουργήστε ένα μοναδικό όνομα για αυτή τη λίστα."; 
					lang["use_fb_as_page"]="Χρησιμοποιήστε το Facebook ως σελίδα";
				}
				var htmlentities=function(input){
					/*var output=String(input);
					var tmpstr;
					for (var i=38;i<256;i++) {
						tmpstr=String.fromCharCode(i);
						if (output.indexOf(tmpstr)!=-1) {
							output=output.split(tmpstr).join('&#'+i+';');
						}
						if (i===38) {
							i=34-1;
						} else if (i===34) {
							i=39-1;
						} else if (i===39) {
							i=60-1;
						} else if (i===60) {
							i=62-1;
						} else if (i===62) {
							i=160-1;
						}
					}
					return output;*/
					return String(input).replace(/(.)/g,function(chr){return '&#'+chr.charCodeAt(0)+';'});
				};
				DOM.appendContent($('blueBar'),$('pageHead'));
				
				// Esta parte del Script devuelve la antigua barra superior de facebook.
				// Si la quieren utilizar simplemente quiten las lineas indicadas.
				
				/* // QUITAR ESTA LINEA
				CSS.removeClass($('globalContainer'),'slimHeaderContainer');
				CSS.removeClass($('pageHead'),'slimHeader');
				CSS.addClass($('pageHead'),'ptm');
				CSS.removeClass($('blueBar'),'slim');
				CSS.removeClass($('blueBarHolder'),'slim');
				CSS.removeClass(document.body,'hasSlimHeader');
				if (DOM.find($('pageNav'),'.tinyman')) {
					try {
						var middleLinks=DOM.scry($('pageNav'),'.middleLink');
						DOM.insertAfter(middleLinks[middleLinks.length-1],DOM.find($('pageNav'),'.tinyman'));
						DOM.setContent($('navAccountLink'),HTML((window._string_table && window._string_table['ads:report_account'] ? htmlentities(window._string_table['ads:report_account']) : 'Account')+'<i class="accountPulldown" style="display:inline-block"></i>'));
						var headerTinymanName=DOM.find($('pageNav'),'.tinyman a.headerTinymanName');
						DOM.prependContent(DOM.find($('navAccount'),'ul'),HTML('<li id="navAccountInfo" class="clearfix"><a href="'+htmlentities(headerTinymanName.href)+'" tabindex="-1" id="navAccountPic" aria-hidden="true"><img class="img" src="'+htmlentities(DOM.find($('pageNav'),'.tinyman img.headerTinymanPhoto').src)+'" alt=""></a><a href="'+htmlentities(headerTinymanName.href)+'" id="navAccountName">'+htmlentities((headerTinymanName['innerText'] ? headerTinymanName['innerText'] : headerTinymanName['textContent']))+'</a></li>'));
						var highlanderIntro=DOM.find($('navAccount'),'ul li div.highlanderIntro');
						if (highlanderIntro) {
							DOM.remove(highlanderIntro);
						}
						var switchMenu=DOM.find($('navAccount'),'ul div.switchMenu');
						if (switchMenu) {
							DOM.replace(switchMenu,HTML('<li><a href="/ajax/browser/dialog/identities/" rel="dialog">'+htmlentities(lang["use_fb_as_page"])+'</a></li>'));
						}
						var logout_form=$('logout_form');
						if (logout_form && (typeof HTMLElement.prototype.contains=='function' ? DOM.find($('navAccount'),'ul').contains(logout_form) : true)) {
							DOM.appendContent(DOM.find($('navAccount'),'ul'),logout_form.parentNode);
						}
						DOM.setContent(DOM.find($('pageNav'),'.tinyman'),HTML('<a href="'+htmlentities(headerTinymanName.href)+'">'+(window._string_table && window._string_table['fb:profile'] ? htmlentities(window._string_table['fb:profile']) : 'Profile')+'</a>'));
					} catch (e) {}
				}
				*/ // QUITAR ESTA LINEA
				
				
				var chatstyle=document.createElement('style');
				chatstyle.setAttribute('type','text/css');
				csstext='#facebook .hidden_elem.fbChatTypeahead{display:block!important}.fbDockWrapper{z-index:1000!important}.fbChatBuddyListDropdown{display:inline-block}.fbChatBuddyListDropdownButton{height:16px}#sidebardisabler_elm_36 i{background-image:url(https://s-static.ak.facebook.com/rsrc.php/v1/zf/r/_IKHHfAgFQe.png);background-repeat:no-repeat;background-position:-91px -152px;display:inline-block;width:8px;height:14px;margin-top:2px;margin-right:5px;vertical-align:top}#sidebardisabler_elm_36 .selected i{background-position:-83px -152px}#sidebardisabler_elm_38 i{background-image:url(https://s-static.ak.facebook.com/rsrc.php/v1/zW/r/0t0iUYDtV0L.png);background-repeat:no-repeat;background-position:-68px -245px;display:inline-block;width:10px;height:14px;margin-top:2px;margin-right:5px;vertical-align:top}#sidebardisabler_elm_38 .selected i{background-position:-58px -245px}.bb .fbDockChatBuddyListNub.openToggler{z-index:100}.bb.oldChat .fbDockChatBuddyListNub.openToggler .fbNubButton,.bb.oldChat .fbDockChatTab.openToggler .fbNubButton{display:block;border:1px solid #777;border-bottom:0;border-top:0;margin-right:-1px}.bb.oldChat .fbDockChatBuddyListNub.openToggler .fbNubButton .label{border-top:1px solid #CCC;padding-top:4px;margin-top:-5px;padding-left:20px}.bb.oldChat .fbDockChatTab.openToggler .fbChatTab{border-top:1px solid #CCC;padding-top:4px;margin-top:-5px}.bb.oldChat .fbNubFlyoutTitlebar{border-color:#254588}.bb.oldChat .fbNubFlyoutHeader,.bb.oldChat .fbNubFlyoutBody,.bb.oldChat .fbNubFlyoutFooter{border-color:#777}.bb.oldChat .fbDockChatBuddyListNub .fbNubFlyout{bottom:25px;width:201px;left:0}.bb.oldChat .fbDockChatTab .fbDockChatTabFlyout{bottom:25px;width:260px;margin-right:-1px;border-bottom:1px solid #777;-webkit-box-shadow:0 1px 1px #777;-moz-box-shadow:0 1px 1px #777;-o-box-shadow:0 1px 1px #777;box-shadow:0 1px 1px #777}.bb.oldChat .fbDockChatTab .uiTooltip .right{background-position:left bottom!important}.bb.oldChat .fbDockChatTab.openToggler{width:160px}.bb.oldChat .fbDockChatBuddyListNub{width:200px}.bb.oldChat .rNubContainer .fbNub{margin-left:0}.bb.oldChat .fbNubButton{border-right:none;background:#F4F4F4;background:-moz-linear-gradient(top,#F5F6F6,#DEDDDD);background:-webkit-gradient(linear,left top,left bottom,from(#F5F6F6),to(#DEDDDD));background:-o-linear-gradient(top,#F5F6F6,#DEDDDD);filter:progid:DXImageTransform.Microsoft.Gradient(StartColorStr="#F5F6F6",EndColorStr="#DEDDDD",GradientType=0);-ms-filter:progid:DXImageTransform.Microsoft.Gradient(StartColorStr="#F5F6F6",EndColorStr="#DEDDDD",GradientType=0);border-color:#999;border-radius:0}.bb.oldChat .fbNubButton:hover,.bb.oldChat .openToggler .fbNubButton{background:white}.bb.oldChat .fbDock{border-right:1px solid #999}.bb.oldChat .fbDockChatTab.highlight .fbNubButton,.bb.oldChat .fbDockChatTab.highlight:hover .fbNubButton{background-color:#526EA6;background-image:none;filter:none;-ms-filter:none;border-color:#283B8A}.bb .fbDockChatTab .titlebarText a{color:white}.bb .fbDockChatTab .titlebarText a:hover{text-decoration:none}.bb.oldChat .fbDockChatTab .titlebarText a:hover{text-decoration:underline}.bb.oldChat .fbDockChatTab.openToggler.typing .fbNubButton .fbChatUserTab .wrapWrapper{max-width:113px}.bb.oldChat .fbDockChatTab.openToggler .funhouse{margin-left:0;left:auto;position:static}#sidebardisabler_elm_33{position:static}#sidebardisabler_elm_33 ul{border:none;padding:0}#sidebardisabler_elm_33 li img{margin-top:1px}#sidebardisabler_elm_33 li .text{line-height:25px}.fbChatBuddyListDropdown .fbChatBuddyListDropdownButton,.fbChatBuddyListDropdown .fbChatBuddyListDropdownButton:active,.fbChatBuddyListDropdown .fbChatBuddyListDropdownButton:focus,.fbChatBuddyListDropdown .fbChatBuddyListDropdownButton:hover{background-image:none !important;border:0 !important;border-right:1px solid #999 !important;padding-right:6px !important}.fbChatBuddyListFriendListsDropdown .nameInput{width:100%}.fbChatBuddyListOptionsDropdown .uiMenuItem .itemLabel{font-weight:normal;white-space:normal;width:140px}.fbChatBuddyListOptionsDropdown .uiMenu .disabled{display:none}.fbChatBuddyListOptionsDropdown .uiMenuItem .img{display:inline-block;height:11px;margin:0 5px 0 -16px;width:11px}.fbChatBuddyListOptionsDropdown .async_saving a,.fbChatBuddyListOptionsDropdown .async_saving a:active,.fbChatBuddyListOptionsDropdown .async_saving a:focus,.fbChatBuddyListOptionsDropdown .async_saving a:hover{background-image:url(https://s-static.ak.facebook.com/rsrc.php/v1/yb/r/GsNJNwuI-UM.gif);background-position:1px 5px;background-repeat:no-repeat}.fbChatBuddyListOptionsDropdown .offline .img{background-image:url(https://s-static.ak.facebook.com/rsrc.php/v1/y6/r/79x_K5xzjuK.png);background-repeat:no-repeat;background-position:-11px -30px}.fbChatBuddyListOptionsDropdown .reorder .img{background-image:url(https://s-static.ak.facebook.com/rsrc.php/v1/y6/r/79x_K5xzjuK.png);background-repeat:no-repeat;background-position:-11px -54px}.fbChatBuddyListOptionsDropdown .popout .img{background-image:url(https://s-static.ak.facebook.com/rsrc.php/v1/y6/r/79x_K5xzjuK.png);background-repeat:no-repeat;background-position:-11px -42px}.fbChatBuddyListPanel{background-color:#EDEDED;border-bottom:1px solid gray}#blueBar{box-shadow:0 0 10px black}body.fixedBody #content,body #content{padding-top:41px}body #blueBar,body #pageHead{top:0}body #blueBar{position:fixed !important;z-index:15 !important}body #blueBarHolder{height:0 !important}body #pageHead{z-index:15 !important}body #pageHead{width:981px !important}body.ego_wide #pageHead{width:1020px !important}body.thirdParty #pageHead{width:1008px !important}body.home #headerArea{padding:0}body.home.fixedPageHead #headerArea{padding: 2px 0 10px}body.canvas_live_chrome .canvasSidebar{z-index:4}body.canvas_live_chrome #pageHead{width:1006px !important}body.canvas_live_chrome.liquid div#pageHead{width:100% !important;padding:10px 0 0 10px !important}body.canvas_live_chrome.liquid div#headNav{margin-right:20px}#fbNotificationsFlyout > #fbNotificationsList{max-height:320px;overflow-y:auto;overflow-x:hidden}.fbJewelFlyout .jewelHighlight li.selected a{background-color:#6d84b4 !important;border-bottom:1px solid #3b5998;border-top:1px solid #3b5998;outline:none;padding-top:3px;padding-bottom:3px;text-decoration:none}#fbNotificationsFlyout li.selected .blueName{color:#fff}body.canvas_fixed #contentCol{margin-top:0}.bb .fbDockChatBuddyListNub .fbNubFlyout .uiScrollableAreaContent{width:178px}.bb.oldChat .fbDockChatBuddyListNub .fbNubFlyout .uiScrollableAreaContent{width:199px}.uiScrollableArea.contentAfter::after{background:none !important}.fbChatBuddyList a.friend.idle{background-position:right -111px}.fbChatBuddyList .compact a.friend.idle{background-position:right -113px}.fbChatBuddyList a.friend.idle:hover,.fbChatBuddyList a.idle.selected{background-position:right -172px}.fbChatBuddyList .compact a.friend.idle:hover,.fbChatBuddyList .compact a.idle.selected{background-position:right -174px}.bb .idle .fbChatUserTab .wrap{background-image:url(https://s-static.ak.facebook.com/rsrc.php/v1/yV/r/AA4mSyZRGOi.png);background-repeat:no-repeat;background-position:left -115px;padding-left:12px}.bb .highlight.idle .fbChatUserTab .wrap{background-image:url(https://s-static.ak.facebook.com/rsrc.php/v1/yV/r/AA4mSyZRGOi.png);background-repeat:no-repeat;background-position:left -176px;padding-left:12px}.bb .fbDockChatTab.user.idle .titlebarTextWrapper{background-image:url(https://s-static.ak.facebook.com/rsrc.php/v1/yV/r/AA4mSyZRGOi.png);background-repeat:no-repeat;background-position:left -174px;padding-left:11px}#pageNav a[href$="?sk=ff"]{display:none}.bb .fbDockChatBuddyListNub .fbNubFlyout{min-height:0}.fbNubButton{outline:none}#sidebardisabler_elm_33 .noResults{padding:5px}#sidebardisabler_elm_33 ul li img{float:left;height:22px;margin-right:5px;width:22px}#sidebardisabler_elm_33 ul li span.text{display:block;line-height:22px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}/* !!! START OF BUDDYLIST CSS !!! */.fbChatBuddyList .subheader,.fbChatBuddyList .hide_idle_marker,.fbChatBuddyList .suppress,.fbChatBuddyList .hide_empty_item,.fbChatBuddyList .hide_friend_list,.fbChatBuddyList .hover.other_friends_list .friendlist_name .edit_link,.fbChatBuddyList.reorder_fl .friend_list_container,.fbChatBuddyList.reorder_fl .list_select .suppress,.fbChatBuddyList.reorder_fl .switch,.fbChatBuddyList .content .titletip,.fbChatBuddyList.error .content,.friend_list.offline a.friend,.fbChatBuddyList .status{display:none}.fbChatBuddyList a.friend em{background-color:#dce1e8;font-style:normal;font-weight:bold}.fbChatBuddyList a.selected em,.fbChatBuddyList .content a:hover em{background-color:#5670a6}.fbChatBuddyList .friendlist_name{background-color:#fff;color:#888;float:left;padding:0 5px 0 6px}.fbChatBuddyList span.title a,.fbChatBuddyList span.title a:hover{font-size: 11px;color:#888;text-decoration:none}.fbChatBuddyList .friendlist_name .edit_link{display:none;font-size: 9px;line-height:9px}.fbChatBuddyList .hover .friendlist_name .edit_link{display:-moz-inline-box;display:inline-block;padding:0 5px}.fbChatBuddyList a.friend{background:url(https://s-static.ak.facebook.com/rsrc.php/v1/yV/r/AA4mSyZRGOi.png) no-repeat right 8px;clear:left;display:block;padding:2px 20px 2px 10px}.fbChatBuddyList .compact a.friend{background-position:right 6px}.fbChatBuddyList a.friend span{display:block;line-height:22px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.fbChatBuddyList .compact a.friend span{line-height:18px}.fbChatBuddyList a.friend:hover,.fbChatBuddyList a.selected{background-color:#6d84b4 !important;background-position:right -52px;border-top:1px solid #3b5998;border-bottom:1px solid #3b5998;color:#fff;padding-bottom:1px;padding-top:1px;text-decoration:none}.fbChatBuddyList .compact a.friend:hover,.fbChatBuddyList .compact a.selected{background-position:right -54px}.fbChatBuddyList a.idle{background-position:right -112px}.fbChatBuddyList .compact a.idle{background-position:right -114px}.fbChatBuddyList a.idle:hover,.fbChatBuddyList a.selected.idle{background-position:right -172px}.fbChatBuddyList .compact a.idle:hover,.fbChatBuddyList .compact a.selected.idle{background-position:right -174px}.fbChatBuddyList a.friend img{float:left;height:22px;margin-right:5px;width:22px}.fbChatBuddyList .friend_list_container{clear:both;padding:2px 0 0 0}.fbChatBuddyList .friend_list{background:url(https://s-static.ak.facebook.com/rsrc.php/v1/yH/r/JGCJKtGmxvq.gif) 0 10px repeat-x;padding:4px 0 0}.fbChatBuddyList .show_empty_list{display:block !important}.reorder_fl span.title a,.reorder_fl span.title a:hover{background:transparent}.fbChatBuddyList.reorder_fl .friendlist_name span.title{background:url(https://s-static.ak.facebook.com/rsrc.php/v1/yU/r/S3AUNB-vZXz.gif) 4px 0 no-repeat;display:block;float:left;padding:0 20px}.fbChatBuddyList.reorder_fl .friend_list{background:none;margin:0 5px;overflow:hidden}.fbChatBuddyList.reorder_fl .friend_list div.friendlist_name{background:#ededed;border-top:1px solid #d0d0d0;clear:left;color:#000;cursor:move;margin:3px 0;padding:5px 0;width:94%}.fbChatBuddyList.reorder_fl .friend_list div.friendlist_name span.title a{cursor:move}.fbChatBuddyList #reorder_fl_alert{background:#fff9d7;border-bottom:1px solid #e2c822;padding:4px 6px;text-align:center}.fbChatBuddyList #reorder_fl_alert span{display:block;text-align:left}.fbChatBuddyList #reorder_fl_alert input{margin:4px auto 0 auto}.fbChatBuddyList #error_fl_alert{background:#fff9d7;border-bottom:1px solid #e2c822;padding:4px 6px;text-align:center}.fbChatBuddyList #error_fl_alert span{display:block;text-align:left}.fbChatBuddyList #error_fl_alert input{margin:4px auto 0 auto}.fbChatBuddyList .switch{background-color:#fff;display:block;padding:3px 6px;float:right;position:relative}.fbChatBuddyList .switch a{background-image:url(https://s-static.ak.facebook.com/rsrc.php/v1/yV/r/IJYgcESal33.png);background-repeat:no-repeat;background-position:-663px -101px;cursor:pointer;display:block;height:8px;width:17px;padding:0;text-decoration:none}.fbChatBuddyList .switch a:hover{background-position:-663px -109px}.fbChatBuddyList .switch a:active{background-position:-680px -101px}.fbChatBuddyList .offline .switch a{background-position:-680px -109px}.fbChatBuddyList .offline .switch a:hover{background-position:-697px -101px}.fbChatBuddyList .offline .switch a:active{background-position:-697px -109px}.fbChatBuddyList .drag{left:0 !important;right:0;z-index:1}.fbChatBuddyList .content .hover .switch a:hover .titletip{display:block}.fbChatBuddyList .content .titletip{background:url(https://s-static.ak.facebook.com/rsrc.php/v1/yR/r/kPCE0g_tKJs.gif) no-repeat right 5px;top:-3px;bottom:auto;right:26px;padding-right:5px;padding-bottom:4px;position:absolute;z-index:20}.fbChatBuddyList .content .titletip a{color:#fff;text-decoration:underline}.fbChatBuddyList .content .titletip strong{background:#282828;color:#fff;display:block;font-weight:normal;padding:3px 8px;text-align:center;white-space:nowrap}.fbChatBuddyList .content .accessibility_tip{position:absolute;top:-999px;opacity:0;width:0;height:0;overflow:hidden}.fbChatBuddyList.error .status{display:block}.fbChatBuddyList .info_text{color:#666;padding:6px 8px}/* !!! END OF BUDDYLIST CSS !!! */';
				if (chatstyle.styleSheet) {
					chatstyle.styleSheet.cssText=csstext;
				} else {
					chatstyle.innerHTML=csstext;
				}
				(document.body||document.head||document.documentElement).appendChild(chatstyle);
				var oldchatstyle=true;
				var fbdockwrapper=DOM.find(document.body,'.fbDockWrapper');
				fbdockwrapper.setAttribute('class', 'fbDockWrapper fbDockWrapperRight bb  oldChat')
				
				localstore.getItem("fbsidebardisabler_oldchatstyle",function(itemValue){
					oldchatstyle=(itemValue=="0" ? false : true);
					localstore.setItem("fbsidebardisabler_oldchatstyle",(oldchatstyle ? "1" : "0"));
					if (fbdockwrapper) {
						CSS.conditionClass(fbdockwrapper,'oldChat',oldchatstyle);
					}
				});
				ChatSidebar.disable();
				ChatSidebar.isEnabled=ChatSidebar.isViewportCapable=ChatSidebar.shouldShowSidebar=ChatSidebar.isVisible=function(){return false};
				ChatSidebar.enable=ChatSidebar.disable=ChatSidebar.toggle=function(){};
				CSS.removeClass(document.documentElement,'sidebarMode');
				CSS.removeClass(document.documentElement,'sidebarCapable');
				/*document.documentElement.className="";
				if (VideoChatPlugin.isSupported()) {
					CSS.addClass(document.documentElement,'videoCallEnabled');
				}*/
				var oldChatConfigGet=ChatConfig.get;
				ChatConfig.get=function(arg){
					if (arg=='sidebar') {
						return 0;
					}
					if (arg=='sidebar.minimum_width') {
						return 999999;
					}
					return oldChatConfigGet.apply(this,arguments);
				};
				var tabProfileLinkAdder=function(that){
					try {
						var anchor=DOM.create('a');
						DOM.setContent(anchor,that.name);
						anchor.href=that.getProfileURI();
						anchor.onclick=function(){
							if (!oldchatstyle) {
								return false;
							}
						};
						var titlebartext=DOM.find(that.chatWrapper,'.titlebarText');
						DOM.setContent(titlebartext,anchor);
					} catch (e) {}
				};
				var oldChatTabLoadData=ChatTab.prototype.loadData;
				ChatTab.prototype.loadData=function(){
					var retval=oldChatTabLoadData.apply(this,arguments);
					tabProfileLinkAdder(this);
					return retval;
				};
				var oldChatTabUpdateName=ChatTab.prototype._updateName;
				ChatTab.prototype._updateName=function(){
					var retval=oldChatTabUpdateName.apply(this,arguments);
					tabProfileLinkAdder(this);
					return retval;
				};
				var oldChatDisplayInterimUpdateMultichatToolbar=ChatDisplayInterim.prototype.updateMultichatToolbar;
				ChatDisplayInterim.prototype.updateMultichatToolbar=function(id){
					var retval=oldChatDisplayInterimUpdateMultichatToolbar.apply(this,arguments);
					tabProfileLinkAdder(this.tabs[id]);
					return retval;
				};
				for (var thistab in chatDisplay.tabs) {
					tabProfileLinkAdder(chatDisplay.tabs[thistab]);
				}
				if (!window.ChatBuddyList) {
					// START OF BUDDY LIST JS
					window.ChatBuddyList=function () {
						this.user = presence.user;
						this.buddyListID = window.ChatBuddyList.ID++;
						this.errorMode = false;
						this.shouldShowLoading = false;
						this.sortedList = [];
						this.flMode = false;
						this.flData = {};
						this.otherFriendsFlid = '-1';
						this.botsFlid = '-2';
						this.showingErrorMessage = false;
						this.flSortableGroup = null;
						this.reorderingLists = false;
						this.flOpts = {};
						this.externalFlids = [];
					}
					copy_properties(window.ChatBuddyList, {
						ID: 0,
						OVERLAY_ONLINE: 0,
						OVERLAY_IDLE: 1,
						OVERLAY_OFFLINE: -1,
						OVERLAY_MOBILE: 2,
						DEFAULT_OPTS: {
							fullDisplay: true,
							excludeIds: {}
						},
						MAX_BUDDY_NAME_LENGTH: 20
					});
					Class.mixin(window.ChatBuddyList, 'Arbiter', {
						_lastRenderRev: null,
						_lastSortRev: null,
						_showTime: null,
						init: function (d, c, b, a) {
							this.root = d;
							this.flMode = b;
							this.flData = a;
							this.shouldShowLoading = c;
							this._log = EagleEye.createLogger('chat-buddylist', .1);
							this._init();
							Arbiter.subscribe(['buddylist/availability-changed', 'buddylist/updated'], this._render.bind(this));
							Arbiter.subscribe('buddylist/update-error', this._showLoadError.bind(this));
							Arbiter.subscribe('buddylist/fl-changed', this._handleFlChange.bind(this));
						},
						initError: function (a) {
							this.root = a;
							this.errorMode = true;
							this._init();
						},
						_init: function () {
							this.loaded = false;
							this._isVisible = false;
							this.updateDiff = 0;
							this.rendered = false;
							this.showingError = false;
							this.contentDiv = DOM.find(this.root, 'div.content');
							this.buddyListError = DOM.find(this.root, 'div.status');
							Arbiter.subscribe(PresenceMessage.getArbiterMessageType('fl_settings'), this._handleFLMessage.bind(this));
							Arbiter.subscribe('chat/connect', this._showLoading.bind(this));
							this.setCompactDisplay(chatOptions.getSetting('compact_buddylist'));
							Arbiter.subscribe('chat/option-changed', this._updateSetting.bind(this));
							Arbiter.inform('buddylist/initialized', this, Arbiter.BEHAVIOR_PERSISTENT);
							this.inform('initialized', this, Arbiter.BEHAVIOR_PERSISTENT);
						},
						setCompactDisplay: function (a) {
							this.isCompactDisplay = a;
							if (this.isCompactDisplay) {
								this.itemHeight = 18;
							} else this.itemHeight = 22;
							if (this.rendered) this._render();
						},
						_handleFLMessage: function (c, a) {
							var b = a.obj;
							if (b.fl_mode) this._updateNames(b.fl_data);
						},
						_updateNames: function (b) {
							for (var a in this.flData) if (typeof b[a] != 'undefined' && b[a].n != this.flData[a].n) {
								flname = b[a].n;
								elem = ge(this._getFriendListNameId(a));
								if (elem) DOM.setContent(elem, flname);
							}
						},
						_flChanged: function (b, a) {
							return (b != this.flMode || !are_equal(a, this.flData));
						},
						_onFlChange: function (d, c) {
							this._dirtyRendering();
							if (!this.rendered) {
								this.flMode = d;
								this.flData = c;
								return;
							}
							var g = [];
							var h = [];
							var f = [];
							var e = [];
							if (this.flMode && this.flMode == d) {
								var b = this._groupAvailableListByFl(true);
								for (var a in c) if (typeof this.flData[a] == 'undefined') {
									if (c[a].h) continue;
									g.push(a);
									f.push(a);
								} else if (this.flData[a].h != c[a].h) {
									if (c[a].h) {
										h.push(a);
									} else {
										g.push(a);
										if (c[a].o) f.push(a);
									}
								} else if (this.flData[a].o != c[a].o) if (c[a].o) {
									f.push(a);
								} else e.push(a);
								for (var a in this.flData) if (typeof c[a] == 'undefined') h.push(a);
								this.flMode = d;
								if (h.length != 0) this._removeFlidsFromBuddyList(h, b);
								if (e.length != 0) this._goOfflineToLists(e, true);
								this.flData = c;
								if (g.length != 0) this._addFlidsToDOM(g, b);
								if (f.length != 0) this._goOnlineToLists(f, true);
							} else if (this.flMode && this.flMode != d) {
								var b = this._groupAvailableListByFl(true);
								h = keys(this.flData);
								this.flMode = d;
								this.flData = c;
								this._addFlidsToDOM([null]);
								this._removeFlidsFromBuddyList(h, b);
							} else if (!this.flMode && this.flMode != d) {
								for (var a in c) {
									if (c[a].h) continue;
									g.push(a);
									if (c[a].o) f.push(a);
								}
								this.flMode = d;
								this.flData = c;
								this._removeFlidsFromDOM([null]);
								if (g.length > 0) this._addFlidsToDOM(g);
								if (f.length > 0) this._goOnlineToLists.bind(this, f, true).defer();
							}
							this._render();
						},
						_addFlidsToDOM: function (e, f) {
							f = f || this._groupAvailableListByFl(true);
							var a = this._getRenderedFriendLists();
							var c = a[0];
							var h = $('fbChatBuddyListParent');
							for (var g = 0; g < e.length; g++) {
								var d = e[g];
								if (this.flMode && d) {
									var b = DOM.create('div', {
										id: this._getFriendListId(d),
										className: this._getFriendListItemClasses(d, f)
									});
									DOM.setContent(b, HTML(this._renderFriendListHeader(d)));
									DOM.appendContent(b, HTML(this._renderFriendListContent(d, [])));
									if (c == d) {
										DOM.prependContent(h, b);
									} else {
										var j = a.indexOf(d);
										var i = a[j - 1];
										DOM.insertAfter(ge(this._getFriendListId(i)), b);
									}
									this._addFlSortable(d);
								} else DOM.prependContent(h, HTML(this._renderFriendListContent(null, [])));
							}
							this._addFriendListListeners(e);
						},
						_removeFlidsFromDOM: function (b) {
							for (var c = 0; c < b.length; c++) {
								var a = b[c];
								if (a) {
									if (ge(this._getFriendListId(a))) {
										DOM.remove($(this._getFriendListId(a)));
										this._removeFlSortable(a);
									}
								} else {
									DOM.remove($(this._getAvailableMarkerId(a)));
									DOM.remove($(this._getIdleMarkerId(a)));
								}
							}
						},
						contentChanged: function () {
							this.inform('content-changed');
						},
						show: function () {
							if (this._isVisible) return;
							this._showTime = this._showTime || new Date();
							AvailableList.update();
							this._isVisible = true;
							if (!this.rendered) {
								this.shouldShowLoading = true;
								this._firstRender();
								if (AvailableList.haveFullList) this._render.bind(this).defer();
							}
							CSS.show(this.root);
						},
						hide: function () {
							if (!this._isVisible) return;
							this._showTime = null;
							this._isVisible = false;
							this.exitReorderingFlMode();
							CSS.hide(this.root);
						},
						_getUserFlid: function (c, a) {
							if (a === null || a === undefined) {
								var b = this._getUserFlids(c);
								a = b[0];
							}
							return a;
						},
						_getSortedList: function () {
							if (this._lastSortRev != AvailableList.getRev()) {
								this.sortedList = this._sort(AvailableList.getAvailableIDs());
								this._lastSortRev = AvailableList.getRev();
							}
							return this.sortedList;
						},
						getSortedListUI: function (a) {
							if (!a && this.flMode) {
								var b = this._groupAvailableListByFl(true);
								var c = [];
								for (var a in b) c = c.concat(b[a]);
								var d = {};
								return c.filter(function (e) {
									return !d[e] && (d[e] = true);
								});
							}
							return this._getSortedList();
						},
						getFriendLists: function () {
							var a = {};
							copy_properties(a, this.flData);
							delete a[this.otherFriendsFlid];
							delete a[this.botsFlid];
							return a;
						},
						_getRenderedFriendLists: function () {
							var b = [];
							for (var a in this.flData) if (!this.flData[a].h) b.push(a);
							return b;
						},
						_getFriendListsInChat: function () {
							var a = this._getRenderedFriendLists();
							a.remove(this.otherFriendsFlid);
							a.remove(this.botsFlid);
							return a;
						},
						updateUserInfos: function (a) {
							copy_properties(ChatUserInfos, a);
						},
						_sort: function (b) {
							var a = this._compareFunction.bind(this);
							b.sort(a);
							return b;
						},
						_compareFunction: function (a, d, b, e) {
							if (typeof b == 'undefined') b = AvailableList.isIdle(a);
							if (typeof e == 'undefined') e = AvailableList.isIdle(d);
							if (b ^ e) return b ? 1 : -1;
							var c = ChatUserInfos[a].name.toLowerCase();
							var f = ChatUserInfos[d].name.toLowerCase();
							return (c < f) ? -1 : 1;
						},
						itemOnClick: function (c) {
							var b = DataStore.get(c, 'id');
							var a = DataStore.get(c, 'flid');
							presence.pauseSync();
							Chat.openTab(b, null, null, 'buddylist');
							if (!this.isSticky()) Chat.closeBuddyList();
							this.inform('buddylist/buddy-clicked', {
								flid: a,
								id: b
							});
							presence.resumeSync();
						},
						_renderItem: function (c, a, d) {
							var i = ChatUserInfos[c];
							var f = i.name;
							var h = i.thumbSrc;
							var e = ['<a', ' href="#"', ' id="', this._getBuddyListItemId(c, a), '"', ' class="clearfix friend', (d ? ' idle' : ''), '"', ' title="', f, '"', ' data-id="', parseInt(c, 10), '"', ' data-flid="', a, '"', '>'];
							var b = !this.isCompactDisplay;
							var g = this._getFlOpts(a);
							b &= g.fullDisplay;
							if (b) e = e.concat('<img src="', h, '" />');
							e = e.concat('<span id="', this._getBuddyListItemNameId(c, a), '">', htmlize(f), '</span>', '</a>');
							return e.join('');
						},
						_groupAvailableListByFl: function (c, a) {
							if (!this.flMode || !this.flData) return null;
							c = c || false;
							a = a || false;
							var e = {};
							for (var b in this.flData) e[b] = [];
							if (a) return e;
							var d = c ? this._getSortedList() : AvailableList.getAvailableIDs();
							d.forEach(function (h) {
								var g = FriendLists.get(h);
								if (g) for (var i = 0; i < g.length; ++i) {
									var f = g[i];
									e[f] && e[f].push(h);
								}
							});
							return e;
						},
						_listNameInUse: function (b) {
							for (var a in this.flData) if (this.flData[a].n == b) return true;
							return false;
						},
						createFriendList: function (b) {
							if (this._listNameInUse(b)) {
								ErrorDialog.show(lang['error_dialog_title'], lang['list_conflict_text']);
								return;
							}
							var a = {
								create: b
							};
							this._saveBuddyListSetting(a, function () {
								for (var c in this.flData) if (this.flData[c].n == b) {
									if (!this.flData[c].h) this.scrollIntoView($(this._getFriendListId(c)));
									Arbiter.inform('friend-list/new', {
										flid: c,
										fl_name: b
									});
									break;
								}
							}.bind(this));
						},
						handleFlInChat: function (b, a) {
							if (b) {
								this._unHideFriendListFromChat(a);
							} else this._hideFriendListFromChat(a);
						},
						_unHideFriendListFromChat: function (b) {
							var d = this._getFriendListsInChat().length == 0;
							var c = [b];
							var a = {
								unhide_from_chat: 1,
								flids: c
							};
							this.flData[b].h = 0;
							this._saveBuddyListSetting(a, function () {
								this._showEmptyListMomentarily(b);
								this.scrollIntoView($(this._getFriendListId(b)));
							}.bind(this));
							if (d) {
								this._onFlChange(true, this.flData);
							} else this._addFlidsToDOM(c);
						},
						_hideFriendListFromChat: function (b) {
							var d = this._getFriendListsInChat().length == 1;
							var c = [b];
							var a = {
								hide_from_chat: 1,
								flids: c
							};
							this.flData[b].h = 1;
							this._saveBuddyListSetting(a);
							if (d) {
								this._onFlChange(false, this.flData);
							} else this._removeFlidsFromBuddyList(c);
						},
						_friendListHandleSwitchThrown: function (b) {
							var a = this.flData[b].o;
							if (a) {
								this._goOfflineToLists([b]);
							} else this._goOnlineToLists([b]);
						},
						_friendListHandleSwitchMouseDown: function (b) {
							var a = Event.listen(document, 'mouseup', function () {
								a.remove();
								this._friendListHandleSwitchThrown(b);
							}.bind(this));
						},
						_friendListHandleMouseOver: function (a) {
							if (this.reorderingLists) return;
							CSS.addClass($(this._getFriendListId(a)), 'hover');
						},
						_friendListHandleMouseOut: function (a) {
							CSS.removeClass($(this._getFriendListId(a)), 'hover');
						},
						_saveBuddyListSetting: function (b, a) {
							b.user = this.user;
							a = a || bagofholding;
							new AsyncRequest().setData(b).setURI('/ajax/chat/buddy_list_settings.php').setHandler(this._onBuddyListSettingSave.bind(this, a)).setAllowCrossPageTransition(true).send();
						},
						_goOnlineToLists: function (a, b) {
							b = b || false;
							this._handleFlVisibilityChange(a, 1);
							this._saveBuddyListSetting({
								online_to_list: 1,
								flids: a,
								read_only: b,
								notify_ids: Chat.getActiveFriendChats()
							});
						},
						_handleFlVisibilityChange: function (d, f, a) {
							for (var e = 0; e < d.length; e++) {
								var c = d[e];
								var b = ge(this._getFriendListId(c));
								if (!b) continue;
								this.flData[c].o = f;
								if (f) {
									CSS.addClass(b, 'online');
									CSS.removeClass(b, 'offline');
									if (c == this.otherFriendsFlid) this._showEmptyListMomentarily(c);
								} else {
									CSS.addClass(b, 'offline');
									CSS.removeClass(b, 'online');
								}
								var g = DOM.scry(b, 'div.titletip strong')[0];
								g && DOM.setContent(g, this._getFriendListTooltipText(c));
								a && a(c);
							}
						},
						_showEmptyListMomentarily: function (b) {
							this.shownEmptyFlids = this.shownEmptyFlids || {};
							this.shownEmptyFlids[b] = 1;
							var a = ge(this._getFriendListId(b));
							if (a) CSS.addClass(a, 'show_empty_list');
							(function () {
								delete this.shownEmptyFlids[b];
								var c = ge(this._getFriendListId(b));
								if (c) CSS.removeClass(c, 'show_empty_list');
							}).bind(this).defer(8000, false);
						},
						_goOfflineToLists: function (a, c) {
							c = c || false;
							var b = this._groupAvailableListByFl();
							this._handleFlVisibilityChange(a, 0);
							if (!c) this._saveBuddyListSetting({
								offline_to_list: 1,
								flids: a,
								notify_ids: Chat.getActiveFriendChats()
							});
						},
						_removeFlidsFromBuddyList: function (a, b) {
							this._removeFlidsFromDOM(a);
						},
						_onBuddyListSettingSave: function (b, a) {
							var d = a.getPayload();
							if (d) {
								d.userInfos && this.updateUserInfos(d.userInfos);
								d.availableList && AvailableList.addLegacyAvailableList(d.availableList);
								if (d.flData) {
									var c;
									if (typeof d.flMode != 'undefined') {
										c = d.flMode;
									} else c = true;
									this._onFlChange(c, d.flData);
									this._resetFlidClasses();
								}
								b && b();
							}
						},
						_resetFlidClasses: function () {
							if (!this.flMode) return;
							var c = this._groupAvailableListByFl();
							for (var b in this.flData) {
								var a = ge(this._getFriendListId(b));
								if (a) CSS.setClass(a, this._getFriendListItemClasses(b, c));
							}
						},
						_getFriendListItemClasses: function (b, e) {
							var d = this.flData[b].o;
							var c = this.flData[b].h;
							var a = ['friend_list'];
							if (d) {
								a.push('online');
							} else a.push('offline');
							if (!c && this.shownEmptyFlids && this.shownEmptyFlids[b]) a.push('show_empty_list');
							if (b == this.otherFriendsFlid) {
								a.push('compact_friend_list');
								a.push('other_friends_list');
							}
							if (this.reorderingLists && (b == this.otherFriendsFlid || b == this.botsFlid)) a.push('suppress');
							return a.join(' ');
						},
						_renderFriendListHeader: function (c) {
							var b = this.flData[c].n;
							var e = this.flData[c].o;
							var a = '';
							var f = typeof this.flData[c].s != 'undefined';
							if (!f && c != this.otherFriendsFlid) var a = '<a href="/friends/ajax/edit_list.php?list_id=' + c + '" ' + 'rel="dialog-post">' + lang['edit_list_link'] + '</a>';
							var d = ['<div class="friendlist_name">', '<span class="title"><a href="#" id="' + this._getFriendListNameId(c) + '">', htmlize(b), '</a></span>', '<span class="edit_link">', a, '</span>', '</div>'];
							if (!f) d.push('<div class="switch"><a class="online_status" ', '>', '<div class="titletip"><strong>', this._getFriendListTooltipText(c), '</strong></div>', '</a>', '</div>');
							return d.join('');
						},
						_getFriendListTooltipText: function (a) {
							return this.flData[a].o ? lang['options_offline'] : lang['go_online'];
						},
						registerExternalFriendList: function (b) {
							if (!this.rendered) this._firstRender();
							var a = 'xfl_' + this.externalFlids.length;
							this.externalFlids.push(a);
							this.flOpts[a] = b;
							return a;
						},
						_renderFriendListContent: function (a, i) {
							var l;
							var d = this.flMode && a;
							if (d) {
								l = ['<div id="', this._getFriendListContainerId(a), '"', 'class="friend_list_container">'];
							} else l = [];
							l.push('<div id="', this._getAvailableMarkerId(a), '" class="suppress"></div>');
							var g = [];
							var b = false,
								c = false;
							for (var k = 0; k < i.length; k++) {
								var e = i[k];
								var f = this._isIdle(e);
								var j = [this._renderItem(e, a, f)];
								if (f) {
									b = true;
									g = g.concat(j);
								} else {
									c = true;
									l = l.concat(j);
								}
							}
							var h = (b && c) ? '' : ' hide_idle_marker';
							l.push('<div id="', this._getIdleMarkerId(a), '" class="subheader', h, '"></div>');
							l = l.concat(g);
							if (d) l.push('</div>');
							return l.join('');
						},
						_isIdle: function (a) {
							return AvailableList.isIdle(a);
						},
						_addFriendListListeners: function (c) {
							if (!this.flMode) return;
							c = c || this._getRenderedFriendLists();
							for (var d = 0; d < c.length; d++) {
								var b = c[d];
								if (typeof this.flData[b].s != 'undefined') continue;
								var a = $(this._getFriendListId(b));
								Event.listen(a, 'mouseover', this._friendListHandleMouseOver.bind(this, b));
								Event.listen(a, 'mouseout', this._friendListHandleMouseOut.bind(this, b));
								var e = DOM.find(a, 'a.online_status');
								Event.listen(e, 'mousedown', this._friendListHandleSwitchMouseDown.bind(this, b));
							}
						},
						_renderBuddyContent: function () {
							var a = (AvailableList.getCount() ? 'hide_empty_item' : '');
							var g = ['<div class="subgroup">', '<div id="fbChatBuddyListParent" class="list_select">', '<div id="', this._getBuddyListEmptyItemId(), '" class="info_text ', a, '">', lang['no_friends_online'], '</div>'];
							var c;
							var d = {};
							if (this.flMode) {
								c = keys(this.flData);
								d = this._groupAvailableListByFl(true);
							} else c = [null];
							for (var e = 0; e < c.length; ++e) {
								var b = c[e];
								var f = [];
								if (this.flMode && b) {
									if (this.flData[b].h) continue;
									g.push('<div id="', this._getFriendListId(b), '"', 'class="', this._getFriendListItemClasses(b, d), '">', this._renderFriendListHeader(b));
									f = d[b];
								} else f = this._getSortedList();
								g.push(this._renderFriendListContent(b, f));
								if (this.flMode && b) g.push('</div>');
							}
							g.concat(['</div>', '</div>']);
							return g.join('');
						},
						_render: function () {
							if (!this._isVisible || this._lastRenderRev == AvailableList.getRev()) return;
							this._lastRenderRev = AvailableList.getRev();
							this._getSortedList();
							CSS.conditionClass(this.contentDiv, 'compact', this.isCompactDisplay);
							DOM.setContent(this.contentDiv, HTML(this._renderBuddyContent()));
							if (this.rendered) {
								this._hideError();
								this._addFriendListListeners();
							}
							if (this.errorMode) this._showLoadError();
							if (this.shouldShowLoading) {
								this._showLoading();
								this.shouldShowLoading = false;
							} else if (this._showTime) {
								var a = new Date() - this._showTime;
								this._showTime = null;
								this._log({
									buddy_list_open: a
								});
							}
						},
						_firstRender: function () {
							this._render();
							this.rendered = true;
							Event.listen(this.contentDiv, 'click', function (event) {
								var a = Parent.byClass(event.getTarget(), 'friend');
								a && this.itemOnClick(a);
							}.bind(this));
						},
						updateItemDisplay: function (d) {
							var a = AvailableList.get(d);
							if (!a) return;
							var g = this._getUserFlids(d);
							for (var c = 0; c < g.length; c++) {
								var b = g[c];
								var f = ge(this._getBuddyListItemId(d, b));
								if (!f) return;
								var e = a == AvailableList.IDLE;
								f = HTML(this._renderItem(d, b, e)).getRootNode();
							}
						},
						_showLoadError: function () {
							this._showError(lang['load_error']);
						},
						_showLoading: function () {
							this._showError(lang['loading']);
						},
						_hideError: function () {
							this.showingError = false;
							CSS.removeClass(this.root, 'error');
							this.contentChanged();
						},
						_showError: function (a) {
							this._dirtyRendering();
							this.showingError = true;
							DOM.setContent(this.buddyListError, HTML(a));
							CSS.addClass(this.root, 'error');
							this.contentChanged();
						},
						isSticky: function () {
							return chatOptions.getSetting('sticky_buddylist');
						},
						enterErrorMode: function (a) {
							this.exitErrorMode();
							this.exitReorderingFlMode();
							this.showingErrorMessage = true;
							var b = $N('div', {
								id: 'error_fl_alert'
							}, [$N('span', {
								className: 'helper_text'
							}, a), $N('input', {
								type: 'button',
								className: 'inputbutton',
								value: lang['okay'],
								onclick: this.exitErrorMode.bind(this)
							})]);
							DOM.insertBefore(b, this.contentDiv);
						},
						exitErrorMode: function () {
							if (this.showingErrorMessage) {
								DOM.remove($('error_fl_alert'));
								this.showingErrorMessage = false;
							}
							return false;
						},
						enterReorderingFlMode: function () {
							if (this.reorderingLists) return;
							Bootloader.loadComponents('sort', function () {
								this.exitErrorMode();
								this.reorderingLists = true;
								CSS.addClass(this.root, 'reorder_fl');
								var a = this._getRenderedFriendLists();
								this.flSortableGroup = new SortableGroup();
								for (var c = 0; c < a.length; c++) {
									var b = a[c];
									if (b == this.otherFriendsFlid || b == this.botsFlid) {
										CSS.addClass(this._getFriendListId(b), 'suppress');
									} else this._addFlSortable(b);
								}
								var d = $N('div', {
									id: 'reorder_fl_alert'
								}, [$N('span', {
									className: 'helper_text'
								}, lang['reorder_list_start']), $N('input', {
									type: 'button',
									className: 'inputbutton',
									value: lang['reorder_list_done'],
									onclick: this.exitReorderingFlMode.bind(this)
								})]);
								DOM.insertBefore(d, this.contentDiv);
								this.inform('reorder-mode/enter');
								this.contentChanged();
							}.bind(this));
						},
						exitReorderingFlMode: function () {
							if (!this.reorderingLists) return;
							this._reorderFlids();
							DOM.remove($('reorder_fl_alert'));
							CSS.removeClass(this.root, 'reorder_fl');
							var a = this._getRenderedFriendLists();
							for (var c = 0; c < a.length; c++) {
								var b = a[c];
								if (b == this.otherFriendsFlid || b == this.botsFlid) {
									CSS.removeClass(this._getFriendListId(b), 'suppress');
								} else this._removeFlSortable(b);
							}
							this.reorderingLists = false;
							this.flSortableGroup.destroy();
							this.flSortableGroup = null;
							this.inform('reorder-mode/exit');
							this.contentChanged();
						},
						_addFlSortable: function (a) {
							if (this.flSortableGroup != null) this.flSortableGroup.addSortable(a, $(this._getFriendListId(a)));
						},
						_removeFlSortable: function (a) {
							if (this.flSortableGroup != null) this.flSortableGroup.removeSortable(a);
						},
						_reorderFlids: function () {
							var a = {
								reorder: 1,
								flids: this.flSortableGroup.getOrder()
							};
							this._saveBuddyListSetting(a);
						},
						_getGlobalFlids: function (a) {
							var b = this.flMode && this.flData ? keys(this.flData) : [null];
							return a ? b : b.concat(this.externalFlids);
						},
						_getUserFlids: function (d, a, b) {
							var c = (a && a.fl) ? a.fl : FriendLists.get(d);
							if (!b) c = this._addExternalFlids(d, c);
							return c;
						},
						_addExternalFlids: function (d, b) {
							b = b ? $A(b) : [];
							for (var c = 0; c < this.externalFlids.length; c++) {
								var a = this.externalFlids[c];
								var e = this._getFlOpts(a);
								if (!e.excludeIds[d]) b.push(a);
							}
							return b;
						},
						_getFlOpts: function (a) {
							return this.flOpts[a] || ChatBuddyList.DEFAULT_OPTS;
						},
						_getAvailableMarkerId: function (a) {
							return this._encodeFlid('buddy_list_avail_marker', a);
						},
						_getIdleMarkerId: function (a) {
							return this._encodeFlid('buddy_list_idle_marker', a);
						},
						_getBuddyListItemId: function (b, a) {
							return this._encodeFlid('buddy_list_item_' + b, a);
						},
						_getBuddyListItemNameId: function (b, a) {
							return this._encodeFlid('buddy_list_item_name_' + b, a);
						},
						_getBuddyListEmptyItemId: function () {
							return 'buddy_list_empty_item';
						},
						_encodeFlid: function (a, b) {
							return (b ? (b + '_' + a) : a) + '_' + this.buddyListID;
						},
						_getFriendListId: function (a) {
							return this._encodeFlid('friend_list_item', a);
						},
						_getFriendListNameId: function (a) {
							return this._encodeFlid('friend_list_name', a);
						},
						_getFriendListContainerId: function (a) {
							return this._encodeFlid('friend_list_container', a);
						},
						_updateSetting: function (a, b) {
							this._dirtyRendering();
							switch (b.name) {
							case 'compact_buddylist':
								this.setCompactDisplay(b.value);
								break;
							}
							this._render();
						},
						_dirtyRendering: function () {
							this._lastRenderRev = null;
						},
						_handleFlChange: function (a, c) {
							var d = c.flMode;
							var b = c.flData;
							if (this._flChanged(d, b)) this._onFlChange(d, b);
						},
						scrollIntoView: function (a) {
							var b = a.offsetParent;
							var d = Rect(a);
							var c = d.boundWithin(Rect(b)).getPositionVector();
							d.getPositionVector().sub(c).scrollElementBy(b);
						}
					});
					// END OF BUDDY LIST JS
				}
				if (!window.ChatBuddyListDropdown) {
					window.ChatBuddyListDropdown=function(){};
					window.ChatBuddyListDropdown.prototype = {
						init: function (a) {
							this.root = a;
							Selector.listen(a, 'open', function () {
								this._resizeAndFlip();
								var b = Event.listen(window, 'resize', this._resizeAndFlip.bind(this));
								var c = Selector.listen(a, 'close', function () {
									b.remove();
									Selector.unsubscribe(c);
								});
							}.bind(this));
						},
						_resizeAndFlip: function () {
							var a = Vector2.getElementPosition(this.root, 'viewport');
							var g = Vector2.getViewportDimensions();
							var f = a.y > g.y / 2;
							CSS.conditionClass(this.root, 'uiSelectorBottomUp', f);
							if (!ua.ie() || ua.ie() > 7) {
								var b = Selector.getSelectorMenu(this.root);
								var c = Vector2.getElementPosition(b, 'viewport');
								if (f) {
									availableHeight = a.y;
								} else availableHeight = g.y - c.y;
								var d = DOM.find(b, 'ul.uiMenuInner');
								var e = b.scrollHeight - d.scrollHeight;
								availableHeight -= e;
								CSS.setStyle(b, 'max-height', availableHeight + 'px');
							}
						}
					};
					window.ChatBuddyListFriendListsDropdown=function(){
						this.parent=new ChatBuddyListDropdown();
					}
					window.ChatBuddyListFriendListsDropdown.prototype = {
						init: function (b, c, a) {
							this.parent.init(b);
							this.root = this.parent.root;
							this.template = c;
							this.form = a;
							this.menu = DOM.find(b, 'div.menu');
							this.noListsEl = DOM.find(b, 'li.noListsAvailable');
							Arbiter.subscribe('buddylist/initialized', this._initBuddyList.bind(this));
						},
						_initBuddyList: function (a, b) {
							this.buddyList = b;
							Event.listen(this.form, 'submit', this._onSubmitForm.bind(this));
							Selector.listen(this.root, 'open', this._onOpen.bind(this));
							Selector.listen(this.root, 'toggle', this._onToggle.bind(this));
						},
						_clearFriendLists: function () {
							var a = Selector.getOptions(this.root);
							a.forEach(DOM.remove);
						},
						_onOpen: function () {
							var c = this.buddyList.getFriendLists();
							this._clearFriendLists();
							if (count(c) > 0) {
								CSS.hide(this.noListsEl);
								var e = [$N('option')];
								var f = [];
								for (var b in c) {
									var a = c[b].n;
									var g = this.template.render();
									g.setAttribute('data-label', a);
									var d = DOM.find(g, 'span.itemLabel');
									DOM.setContent(d, a);
									DOM.insertBefore(g, this.noListsEl);
									e.push($N('option', {
										value: b
									}));
									c[b].h === 0 && f.push(b);
								}
								Selector.attachMenu(this.root, this.menu, $N('select', e));
								f.forEach(function (h) {
									Selector.setSelected(this.root, h, true);
								}.bind(this));
							} else CSS.show(this.noListsEl);
						},
						_onSubmitForm: function (event) {
							if (!this.nameInput) this.nameInput = DOM.find(this.form, 'input.nameInput');
							var a = this.nameInput.value;
							this.buddyList.createFriendList(a);
							this.nameInput.value = '';
							this.nameInput.blur();
							Selector.toggle(this.root);
							return event.kill();
						},
						_onToggle: function (a) {
							var c = a.option;
							var b = Selector.getOptionValue(c);
							var d = Selector.isOptionSelected(c);
							this.buddyList.handleFlInChat(d, b);
							Selector.toggle(this.root);
						}
					};
					window.ChatBuddyListOptionsDropdown=function(){
						this.parent=new ChatBuddyListDropdown();
					}
					window.ChatBuddyListOptionsDropdown.prototype = {
						init: function (a) {
							this.parent.init(a);
							this.root = this.parent.root;
							Arbiter.subscribe('buddylist/initialized', this._initBuddyList.bind(this));
							Arbiter.subscribe('chat/option-changed', this._onOptionChanged.bind(this));
						},
						_initBuddyList: function (a, b) {
							this.buddyList = b;
							Selector.listen(this.root, 'open', this._onOpen.bind(this));
							Selector.listen(this.root, 'select', this._onSelect.bind(this));
							Selector.listen(this.root, 'toggle', this._onToggle.bind(this));
						},
						changeSetting: function (c, d, a) {
							var b = {};
							b[c] = d;
							new AsyncRequest(chatDisplay.settingsURL).setHandler(this._onChangeSettingResponse.bind(this, c, d)).setErrorHandler(this._onChangeSettingError.bind(this, c, d)).setFinallyHandler(a).setData(b).setAllowCrossPageTransition(true).send();
						},
						_onChangeSettingResponse: function (a, c, b) {
							chatOptions.setSetting(a, c);
							presence.doSync();
						},
						_onChangeSettingError: function (a, c, b) {
							Selector.setSelected(this.root, a, !c);
							Chat.enterErrorMode(lang['save_error']);
						},
						_onOpen: function () {
							var b = Selector.getOption(this.root, 'reorder');
							var a = this.buddyList._getFriendListsInChat().length;
							Selector.setOptionEnabled(b, a > 1);
						},
						_onOptionChanged: function (a, b) {
							var c = b.name;
							if (c === 'sound') Selector.setSelected(this.root, c, b.value);
						},
						_onSelect: function (b) {
							if (this._pendingChange) return false;
							var a = Selector.getOptionValue(b.option);
							switch (a) {
							case 'offline':
								return this.toggleVisibility();
							case 'reorder':
								return this.reorderLists();
							case 'popin':
								return this.popin();
							case 'popout':
								return this.popout();
							}
						},
						_onToggle: function (a) {
							if (this._pendingChange) return false;
							this._pendingChange = true;
							CSS.addClass(a.option, 'async_saving');
							var b = Selector.getOptionValue(a.option);
							var c = Selector.isOptionSelected(a.option);
							this.changeSetting(b, c, this._doneToggling.bind(this, a));
						},
						_doneToggling: function (a) {
							this._pendingChange = false;
							CSS.removeClass(a.option, 'async_saving');
						},
						popin: function () {
							presence.popin();
							Selector.toggle(this.root);
							return false;
						},
						popout: function () {
							presence.popout();
							Selector.toggle(this.root);
							return false;
						},
						reorderLists: function () {
							this.buddyList.enterReorderingFlMode();
							Selector.toggle(this.root);
							return false;
						},
						toggleVisibility: function () {
							chatOptions.toggleVisibility();
							Selector.toggle(this.root);
							return false;
						}
					};
				}
				ChatBuddyListOptionsDropdown.prototype._initBuddyList=function(a,b){
					this.buddyList=b;
					Selector.listen(this.root,'open',this._onOpen.bind(this));
					Selector.listen(this.root,'select',this._onSelect.bind(this));
					Selector.listen(this.root,'toggle',this._onToggle.bind(this));
					try {
						var selectors=DOM.scry(this.root,'.uiMenuItem.uiMenuItemCheckbox.uiSelectorOption.toggle');
						CSS.conditionClass(selectors[0],'checked',chatOptions.getSetting('sound'));
						CSS.conditionClass(selectors[1],'checked',chatOptions.getSetting('sticky_buddylist'));
						CSS.conditionClass(selectors[2],'checked',chatOptions.getSetting('compact_buddylist'));
						localstore.getItem("fbsidebardisabler_oldchatstyle",function(itemValue){
							CSS.conditionClass(selectors[3],'checked',(itemValue=="0" ? false : true));
						});
					} catch (e) {}
				};
				ChatBuddyListOptionsDropdown.prototype._onToggle=function(a){
					if (this._pendingChange) {
						return false;
					}
					this._pendingChange=true;
					CSS.addClass(a.option,'async_saving');
					var b=Selector.getOptionValue(a.option);
					var c=Selector.isOptionSelected(a.option);
					if (b=="oldchatstyle") {
						oldchatstyle=!!c;
						localstore.setItem("fbsidebardisabler_oldchatstyle",(oldchatstyle ? "1" : "0"));
						if (fbdockwrapper) {
							CSS.conditionClass(fbdockwrapper,'oldChat',oldchatstyle);
						}
						chatOptions.setSetting(b,c);
						Dock.resizeAllFlyouts();
						this._doneToggling(a);
						return;
					}
					this.changeSetting(b,c,this._doneToggling.bind(this,a));
				};
				ChatBuddyListOptionsDropdown.prototype._onSelect=function(b){
					if (this._pendingChange) {
						return false;
					}
					var a=Selector.getOptionValue(b.option);
					switch (a) {
					case 'offline':
						return this.toggleVisibility();
					case 'reorder':
						return this.reorderLists();
					case 'popin':
						return this.popin();
					case 'popout':
						return this.popout();
					case 'updatelist':
						return this.updatelist();
					}
				};
				ChatBuddyListOptionsDropdown.prototype.updatelist=function(){
					AvailableList._poller.requestNow();
					Selector.toggle(this.root);
					return false;
				};
				if (!ChatBuddyList.prototype.setNumTopFriends) {
					ChatBuddyList.prototype.setNumTopFriends=function(){};
				}
				if (!BuddyListNub.prototype.setSticky) {
					BuddyListNub.prototype.setSticky=function(a){
						if (!this._toggler) {
							this._toggler=Toggler.createInstance(this.root);
						}
						this._toggler.setSticky(a);
						this._sticky=a;
					};
				}
				if (!BuddyListNub.prototype._storeState) {
					BuddyListNub.prototype._storeState=function(a){
						a.blo=(this._isOpen ? 1 : 0);
						return a;
					};
				}
				if (!BuddyListNub.prototype._loadState) {
					BuddyListNub.prototype._loadState=function(b){
						var a=(!!b.blo);
						if (!presence.poppedOut) {
							if (a) {
								this.show();
							} else {
								this.hide();
							}
						}
					};
				}
				var oldSetUseMaxHeight=Dock.setUseMaxHeight;
				Dock.setUseMaxHeight=function(a,b){
					return oldSetUseMaxHeight.call(this,a,false);
				};
				Chat.toggleSidebar=function(){};
				var oldChatBuddyListShow=ChatBuddyList.prototype.show;
				ChatBuddyList.prototype.show=function(){
					var that=this;
					var retval=oldChatBuddyListShow.apply(that,arguments);
					Dock._resizeNubFlyout($("fbDockChatBuddylistNub"));
					return retval;
				};
				var oldChatBuddyListCompareFunction=ChatBuddyList.prototype._compareFunction;
				ChatBuddyList.prototype._compareFunction=function(a,b){
					if (!ChatUserInfos[a]) {
						return 1;
					}
					if (!ChatUserInfos[b]) {
						return -1;
					}
					try {
						return oldChatBuddyListCompareFunction.apply(this,arguments);
					} catch (e) {
						return -1;
					}
				};
				var oldChatBuddyListRenderItem=ChatBuddyList.prototype._renderItem;
				ChatBuddyList.prototype._renderItem=function(c){
					if (!ChatUserInfos[c]) {
						this.enterErrorMode(lang['errortext']);
						return '';
					}
					try {
						this.exitErrorMode();
						return oldChatBuddyListRenderItem.apply(this,arguments);
					} catch (e) {
						this.enterErrorMode(lang['errortext']);
						return '';
					}
				};
				window.FriendLists=window.FriendLists || {
					get:function(a){
						var b=FriendLists._map;
						if (!b[a]) {
							b[a]=[];
						}
						return b[a];
					},
					set:function(a,b){
						if (b===undefined) {
							return;
						}
						var c=FriendLists.get(a);
						c.length=0;
						c.push.apply(c,$A(b));
					},
					_map:{}
				};
				var onlyfirsttime=true;
				Chat._withComponent('buddyListNub',function(sidebardisabler_var_18){
					if (!onlyfirsttime) {
						return;
					}
					onlyfirsttime=false;
					var thenub,oldelm;
					if ((!(thenub=$("fbDockChatBuddylistNub"))) || (!(oldelm=DOM.find(thenub,".fbNubFlyout")))) {
						throw new Error("Cannot find FB Chat window.");
					}
					var newhtml='<div class="fbNubFlyout uiToggleFlyout"><div class="fbNubFlyoutOuter"><div class="fbNubFlyoutInner"><div class="clearfix fbNubFlyoutTitlebar uiTooltip"><div class="titlebarLabel clearfix"><div class="titlebarTextWrapper">'+htmlentities(lang['chat'])+'</div></div><span class="uiTooltipWrap top center centertop fwb"><span class="uiTooltipText uiTooltipNoWrap">'+htmlentities(_tx('{programname} v{programversion}',{'programname':lang['programname'],'programversion':extension_version}))+'</span></span></div><div class="fbNubFlyoutHeader"><div class="fbChatBuddyListPanel" id="sidebardisabler_elm_35"><div class="uiSelector fbChatBuddyListDropdown fbChatBuddyListFriendListsDropdown uiSelectorRight uiSelectorNormal" id="sidebardisabler_elm_36" data-multiple="1"><div class="wrap"><a class="fbChatBuddyListDropdownButton uiSelectorButton uiButton" role="button" href="#" aria-haspopup="1" data-label="'+htmlentities(lang['friendlists'])+'" data-length="30" rel="toggle" onclick="event.preventDefault();"><i></i><span class="uiButtonText">'+htmlentities(lang['friendlists'])+'</span></a><div class="uiSelectorMenuWrapper uiToggleFlyout"><div role="menu" class="uiMenu menu uiSelectorMenu"><ul class="uiMenuInner"><li class="uiMenuItem disabled" data-label="'+htmlentities(lang['friendlists_show'])+'"><a class="itemAnchor" role="menuitem" tabindex="0" href="#" rel="ignore"><span class="itemLabel fsm">'+htmlentities(lang['friendlists_show'])+'</span></a><span class="itemAnchor disabledAnchor"><span class="itemLabel">'+htmlentities(lang['friendlists_show'])+'</span></span></li><li class="uiMenuItem noListsAvailable disabled" data-label="'+htmlentities(lang['friendlists_none'])+'"><a class="itemAnchor" role="menuitem" tabindex="-1" href="#" rel="ignore"><span class="itemLabel fsm">'+htmlentities(lang['friendlists_none'])+'</span></a><span class="itemAnchor disabledAnchor"><span class="itemLabel">'+htmlentities(lang['friendlists_none'])+'</span></span></li><li class="uiMenuItemGroup mvs createForm" title="'+htmlentities(lang['friendlists_new'])+'"><div class="groupTitle fsm fwn fcg">'+htmlentities(lang['friendlists_new'])+'</div><ul class="uiMenuItemGroupItems"><form class="mhl" action="#" method="post" id="sidebardisabler_elm_37" onsubmit="return Event.__inlineSubmit(this,event)"><input type="hidden" autocomplete="off" name="post_form_id" value="'+htmlentities(Env.post_form_id)+'"><input type="hidden" name="fb_dtsg" value="'+htmlentities(Env.fb_dtsg)+'" autocomplete="off"><input type="text" class="inputtext nameInput DOMControl_placeholder" name="fl_name" placeholder="'+htmlentities(lang['friendlists_typename'])+'" value="'+htmlentities(lang['friendlists_typename'])+'" title="'+htmlentities(lang['friendlists_typename'])+'"></form></ul></li></ul></div></div></div></div><div class="uiSelector fbChatBuddyListDropdown fbChatBuddyListOptionsDropdown uiSelectorRight uiSelectorNormal" id="sidebardisabler_elm_38" data-multiple="1"><div class="wrap"><a class="fbChatBuddyListDropdownButton uiSelectorButton uiButton" role="button" href="#" aria-haspopup="1" data-label="'+htmlentities(lang['options'])+'" data-length="30" rel="toggle" onclick="event.preventDefault();"><i></i><span class="uiButtonText">'+htmlentities(lang['options'])+'</span></a><div class="uiSelectorMenuWrapper uiToggleFlyout"><div role="menu" class="uiMenu menu uiSelectorMenu"><ul class="uiMenuInner"><li class="uiMenuItem uiMenuItemCheckbox uiSelectorOption offline" data-label="'+htmlentities(lang['options_offline'])+'"><a class="itemAnchor" role="menuitemcheckbox" tabindex="0" aria-checked="false" href="#" rel="ignore"><span class="itemLabel fsm"><img class="img" alt="" src="https://s-static.ak.fbcdn.net/rsrc.php/v1/y4/r/-PAXP-deijE.gif">'+htmlentities(lang['options_offline'])+'</span></a></li><li class="uiMenuItem uiMenuItemCheckbox uiSelectorOption reorder" data-label="'+htmlentities(lang['options_reorder'])+'"><a class="itemAnchor" role="menuitemcheckbox" tabindex="-1" aria-checked="false" href="#" rel="ignore"><span class="itemLabel fsm"><img class="img" alt="" src="https://s-static.ak.fbcdn.net/rsrc.php/v1/y4/r/-PAXP-deijE.gif">'+htmlentities(lang['options_reorder'])+'</span></a></li><li class="uiMenuItem uiMenuItemCheckbox uiSelectorOption popout disabled" data-label="'+htmlentities(lang['options_popout'])+'"><a class="itemAnchor" role="menuitemcheckbox" tabindex="-1" aria-checked="false" href="#" rel="ignore"><span class="itemLabel fsm"><img class="img" alt="" src="https://s-static.ak.fbcdn.net/rsrc.php/v1/y4/r/-PAXP-deijE.gif">'+htmlentities(lang['options_popout'])+'</span></a></li><li class="uiMenuItem uiMenuItemCheckbox uiSelectorOption updatelist" data-label="'+htmlentities(lang['options_updatelist'])+'"><a class="itemAnchor" role="menuitemcheckbox" tabindex="-1" aria-checked="false" href="#" rel="ignore"><span class="itemLabel fsm"><img class="img" alt="" src="https://s-static.ak.fbcdn.net/rsrc.php/v1/y4/r/-PAXP-deijE.gif">'+htmlentities(lang['options_updatelist'])+'</span></a></li><li class="uiMenuSeparator"></li><li class="uiMenuItem uiMenuItemCheckbox uiSelectorOption toggle checked" data-label="'+htmlentities(lang['options_sound'])+'"><a class="itemAnchor" role="menuitemcheckbox" tabindex="-1" aria-checked="true" href="#" rel="ignore"><span class="itemLabel fsm">'+htmlentities(lang['options_sound'])+'</span></a></li><li class="uiMenuItem uiMenuItemCheckbox uiSelectorOption toggle checked" data-label="'+htmlentities(lang['options_sticky'])+'"><a class="itemAnchor" role="menuitemcheckbox" tabindex="-1" aria-checked="true" href="#" rel="ignore"><span class="itemLabel fsm">'+htmlentities(lang['options_sticky'])+'</span></a></li><li class="uiMenuItem uiMenuItemCheckbox uiSelectorOption toggle checked" data-label="'+htmlentities(lang['options_compact'])+'"><a class="itemAnchor" role="menuitemcheckbox" tabindex="-1" aria-checked="true" href="#" rel="ignore"><span class="itemLabel fsm">'+htmlentities(lang['options_compact'])+'</span></a></li><li class="uiMenuItem uiMenuItemCheckbox uiSelectorOption toggle checked" data-label="'+htmlentities(lang['options_oldchatstyle'])+'"><a class="itemAnchor" role="menuitemcheckbox" tabindex="-1" aria-checked="true" href="#" rel="ignore"><span class="itemLabel fsm">'+htmlentities(lang['options_oldchatstyle'])+'</span></a></li></ul></div></div></div><select multiple="1"><option value="" disabled="1">'+htmlentities(lang['options'])+'</option><option value="offline">'+htmlentities(lang['options_offline'])+'</option><option value="reorder">'+htmlentities(lang['options_reorder'])+'</option><option value="popout">'+htmlentities(lang['options_popout'])+'</option><option value="updatelist">'+htmlentities(lang['options_updatelist'])+'</option><option value="sound" selected="1">'+htmlentities(lang['options_sound'])+'</option><option value="sticky_buddylist" selected="1">'+htmlentities(lang['options_sticky'])+'</option><option value="compact_buddylist" selected="1">'+htmlentities(lang['options_compact'])+'</option><option value="oldchatstyle" selected="1">'+htmlentities(lang['options_oldchatstyle'])+'</option></select></div></div></div><div class="uiScrollableArea"><div class="fbNubFlyoutBody"><div class="uiScrollableAreaWrap scrollable"><div class="uiScrollableAreaBody"><div class="uiScrollableAreaContent fbNubFlyoutBodyContent"><div class="fbChatBuddyList error" id="sidebardisabler_elm_39"><div class="content"></div><div class="pas status fcg">'+htmlentities(lang['loading'])+'</div></div><div class="uiTypeaheadView fbChatBuddyListTypeaheadView dark hidden_elem" id="sidebardisabler_elm_33"></div></div></div></div><div class="uiScrollableAreaTrack"><div class="uiScrollableAreaGripper"></div></div></div></div><div class="fbNubFlyoutFooter"><div class="uiTypeahead uiClearableTypeahead fbChatTypeahead" id="sidebardisabler_elm_34"><div class="wrap"><label class="clear uiCloseButton" for="sidebardisabler_elm_40"><input title="'+htmlentities(lang['remove'])+'" type="button" id="sidebardisabler_elm_40"></label><input type="hidden" autocomplete="off" class="hiddenInput"><div class="innerWrap"><input type="text" class="inputtext inputsearch textInput DOMControl_placeholder" autocomplete="off" placeholder="'+htmlentities(lang['searchfieldtext'])+'" id="sidebardisabler_elm_41" spellcheck="false" value="'+htmlentities(lang['searchfieldtext'])+'" title="'+htmlentities(lang['searchfieldtext'])+'"></div></div></div></div></div></div></div>';
					DOM.replace(oldelm,HTML(newhtml));

					var sidebardisabler_var_19=new ChatBuddyList();
					window.Chat._buddyList=sidebardisabler_var_19;
					copy_properties(Chat,{
						debugPrintUpdateOverlay:function(){
							sidebardisabler_var_19.debugPrintUpdateOverlay();
						},
						updateUserInfo:function(a){
							sidebardisabler_var_19 && sidebardisabler_var_19.updateUserInfos(a);
						},
						setUserInfo:function(b,c,a){
							ChatUserInfos[b]=c;
							sidebardisabler_var_19.updateItemDisplay(b);
							a && FriendLists.set(b,a);
						}
					});
					var sidebardisabler_var_20=new ChatTypeaheadDataSource({});
					sidebardisabler_var_20._update=function(){
						var c=this.value;
						this.dirty();
						var b=AvailableList.getAvailableIDs();
						b.sort(OrderedFriendsList.compare);
						var a=[];
						b.forEach(function(e){
							if (e==Env.user) {
								return;
							}
							var d=AvailableList.get(e);
							var f=ChatUserInfos[e];
							a.push({
								uid:e,
								text:f.name,
								tokens:f.additionalName,
								localized_text:f.name,
								additional_text:f.additionalName,
								photo:f.thumbSrc,
								availability:d,
								type:f.type
							});
						}.bind(this));
						if (a.length) {
							this.addEntries(a);
						}
						this.value=c;
						c && this.respond(c,this.buildUids(c),true);
					};
					var sidebardisabler_var_21=new Typeahead(sidebardisabler_var_20,{node:$("sidebardisabler_elm_33"),node_id:"sidebardisabler_elm_33",ctor:"TypeaheadView",options:{"autoSelect":true,"renderer":"chat"}},{ctor:"TypeaheadCore",options:{"keepFocused":false,"resetOnSelect":true,"setValueOnSelect":false}},$("sidebardisabler_elm_34"));
					var sidebardisabler_var_22=new ChatBuddyListFriendListsDropdown();
					var sidebardisabler_var_23=new XHPTemplate(HTML("<li class=\"uiMenuItem uiMenuItemCheckbox uiSelectorOption\" data-label=\"\"><a class=\"itemAnchor\" role=\"menuitemcheckbox\" tabindex=\"-1\" aria-checked=\"false\" href=\"#\" rel=\"ignore\"><span class=\"itemLabel fsm\"></span></a></li>"));
					var sidebardisabler_var_24=new ChatBuddyListOptionsDropdown();
					var sidebardisabler_var_25=OrderedFriendsList;

					$("sidebardisabler_elm_40").onmousedown=function(){var c=sidebardisabler_var_21.getCore();c.reset();c.getElement().focus();sidebardisabler_var_19.show();};
					$("sidebardisabler_elm_41").onfocus=function(e){return wait_for_load(this,e||window.event,function(){window.ArbiterMonitor&&ArbiterMonitor.pause();sidebardisabler_var_21.init(["chatTypeahead"]);window.ArbiterMonitor&&ArbiterMonitor.resume();});};
					sidebardisabler_var_21.subscribe('respond',function(d,e){
						if (e.value && e.value===sidebardisabler_var_21.getCore().getValue() && e.value!='') {
							sidebardisabler_var_19.hide();
							CSS.show($('sidebardisabler_elm_33'));
						} else {
							sidebardisabler_var_19.show();
							CSS.hide($('sidebardisabler_elm_33'));
						}
					});
					$("sidebardisabler_elm_41").onblur=function(){
						mySetTimeout(function(){
							if ((this.value=='') || (this.value==this.defaultValue)) {
								sidebardisabler_var_19.show();
							}
						}.bind(this),0);
					};
					sidebardisabler_var_21.subscribe('select',function(d,e){
						sidebardisabler_var_19.show();
						CSS.hide($('sidebardisabler_elm_33'));
					});
					sidebardisabler_var_21.getView().subscribe('beforeRender',function(c,e){
						var newresults=[];
						for (var d=0;d<e.results.length;++d) {
							if ((e.results[d].availability===AvailableList.ACTIVE)||(e.results[d].availability===AvailableList.IDLE)) {
								newresults[newresults.length]=e.results[d];
							}
						}
						e.results=newresults;
					});

					sidebardisabler_var_18.root=$("fbDockChatBuddylistNub");
					sidebardisabler_var_18.buddyList=sidebardisabler_var_19;
					sidebardisabler_var_18.typeahead=sidebardisabler_var_21;
					sidebardisabler_var_18.button=DOM.find(sidebardisabler_var_18.root,'a.fbNubButton');
					sidebardisabler_var_18.label=DOM.find(sidebardisabler_var_18.root,'span.label');
					sidebardisabler_var_18.throbber=DOM.find(sidebardisabler_var_18.root,'img.throbber');
					AvailableList.OFFLINE=AvailableList.OFFLINE||0;
					AvailableList.IDLE=AvailableList.IDLE||1;
					AvailableList.ACTIVE=AvailableList.ACTIVE||2;
					AvailableList.MOBILE=AvailableList.MOBILE||3;
					var oldAvailableListGetAvailableIDs=AvailableList.getAvailableIDs;
					AvailableList.getAvailableIDs=function(){
						return oldAvailableListGetAvailableIDs.apply(this,arguments).filter(function(id){var currstatus=AvailableList.get(id);return (currstatus===AvailableList.ACTIVE)||(currstatus===AvailableList.IDLE);});
					};
					AvailableList.getCount=function(){
						return AvailableList.getAvailableIDs().length;
					};
					BuddyListNub.TYPEAHEAD_MIN_FRIENDS=BuddyListNub.TYPEAHEAD_MIN_FRIENDS_FLMODE=0;
					BuddyListNub.prototype._updateCount=function(){
						if (!Chat.isOnline()) {
							return;
						}
						var a=AvailableList.getCount();
						var b=_tx("{Chat} {number-available}",{'Chat':lang['chat'],'number-available':'<span class="count">(<strong>'+htmlentities(a)+'</strong>)</span>'});
						this._setLabel(HTML(b));
						CSS.show(this.typeahead.getElement());
					};
					Arbiter.subscribe('buddylist/count-changed',BuddyListNub.prototype._updateCount.bind(sidebardisabler_var_18));

					Arbiter.subscribe('chat-options/initialized',function(e,f){this.setSticky(!!f.getSetting('sticky_buddylist'));}.bind(sidebardisabler_var_18));
					Arbiter.subscribe('chat/option-changed',function(e,f){f.name==='sticky_buddylist' && this.setSticky(!!f.value);}.bind(sidebardisabler_var_18));
					presence.registerStateStorer(sidebardisabler_var_18._storeState.bind(sidebardisabler_var_18));
					presence.registerStateLoader(sidebardisabler_var_18._loadState.bind(sidebardisabler_var_18));
					sidebardisabler_var_18._loadState(presence.state);

					Toggler.createInstance($("sidebardisabler_elm_35")).setSticky(false);
					sidebardisabler_var_22.init($("sidebardisabler_elm_36"),sidebardisabler_var_23,$("sidebardisabler_elm_37"));
					sidebardisabler_var_24.init($("sidebardisabler_elm_38"));
					Selector.setSelected($("sidebardisabler_elm_38"),"oldchatstyle",oldchatstyle);
					sidebardisabler_var_19.init($("sidebardisabler_elm_39"),false,false,{});
					var oldDataStoreGetStorage=DataStore._getStorage;
					DataStore._getStorage=function(arg){
						if (!arg) {
							return {};
						}
						return oldDataStoreGetStorage.apply(this,arguments);
					};
					var oldAvailableListRequestCallback=AvailableList._poller._requestCallback;
					AvailableList._poller._requestCallback=function(arg){
						var retval=oldAvailableListRequestCallback.apply(this,arguments);
						/*var availlist={};
						if (AvailableList.haveFullList) {
							AvailableList.getAvailableIDs().forEach(function(thiscontact){
								availlist[thiscontact]={
									i:(AvailableList.isIdle(thiscontact) ? 1 : 0)
								};
							});
						}*/
						var oldhandler=arg.getHandler();
						var newhandler=function(payload){
							var retval=oldhandler.apply(this,arguments);
							var buddylistobj=payload.getPayload().buddy_list;
							if (buddylistobj) {
								Arbiter.inform('buddylist/fl-changed',{
									flMode:buddylistobj.flMode,
									flData:buddylistobj.flData
								});
							}
							return retval;
						};
						arg.setHandler(newhandler).setData({
							user:Env.user,
							popped_out:presence.poppedOut,
							//available_list:availlist,
							force_render:true,
							fetch_mobile:false
						});
						return retval;
					};
					var oldAvailableListSet=AvailableList.set;
					AvailableList.set=function(arg1,arg2,arg3){
						arg3 && FriendLists.set(arg1,$A(arg3));
						return oldAvailableListSet.apply(this,arguments);
					}
					var oldAvailableListGetLegacyOverlay=AvailableList.getLegacyOverlay;
					AvailableList.getLegacyOverlay=function(){
						var retval=oldAvailableListGetLegacyOverlay.apply(this,arguments);
						for (var i in retval) {
							retval[i].fl=FriendLists.get(i);
						}
						return retval;
					};
					var oldAvailableListAddLegacyOverlay=AvailableList.addLegacyOverlay;
					AvailableList.addLegacyOverlay=function(arg){
						var retval=oldAvailableListAddLegacyOverlay.apply(this,arguments);
						for (var i in arg) {
							arg[i] && arg[i].fl && FriendLists.set(i,arg[i].fl);
						}
						window.presence && presence.doSync();
						return retval;
					};
					var oldAvailableListAddLegacyAvailableList=AvailableList.addLegacyAvailableList;
					AvailableList.addLegacyAvailableList=function(arg){
						var retval=oldAvailableListAddLegacyAvailableList.apply(this,arguments);
						for (var i in arg) {
							arg[i] && arg[i].fl && FriendLists.set(i,arg[i].fl);
						}
						return retval;
					};
					var oldChatBuddyListOnBuddyListSettingSave=ChatBuddyList.prototype._onBuddyListSettingSave;
					ChatBuddyList.prototype._onBuddyListSettingSave=function(a,b){
						try {
							if (b.payload.flids.length==1 && b.payload.flids[0]!='-1') {
								for (var elm in b.payload.availableList) {
									b.payload.availableList[elm].fl=([]).concat(FriendLists.get(elm));
									if (!b.payload.availableList[elm].fl.contains(b.payload.flids[0])) {
										b.payload.availableList[elm].fl.push(b.payload.flids[0]);
									}
								}
							}
						} catch (e) {}
						var retval=oldChatBuddyListOnBuddyListSettingSave.apply(this,arguments);
						AvailableList._poller.requestNow();
						return retval;
					};
					AvailableList._poller.setTimePeriod(Math.max(Math.min(15000,AvailableList._poller.getTimePeriod()),Poller.MIN_TIME_PERIOD));
					AvailableList._poller.setTimePeriod=function(){};
					AvailableList._poller.scheduleRequest();
					sidebardisabler_var_19._isVisible=true;
					sidebardisabler_var_19._firstRender();
					sidebardisabler_var_25.init([]);
					var buddylistnub=$("fbDockChatBuddylistNub");
					try {
						var buddyscroller=new ScrollableArea();
						buddyscroller.init(DOM.find(buddylistnub,'.uiScrollableArea'),{"persistent":true});
					} catch (e) {}
					var bodycontent;
					var bodycontentparent;
					if (buddylistnub && (bodycontentparent=DOM.find(buddylistnub,'.uiScrollableAreaWrap')) && (bodycontent=DOM.find(bodycontentparent,'.fbNubFlyoutBodyContent')) && typeof bodycontent.scrollHeight!="undefined") {
						var oldheight=bodycontent.scrollHeight;
						var newChatOnlineFriendsMapChatStatus=function(status){
							switch (status) {
								case AvailableList.ACTIVE:
									return 'chatOnline';
								case AvailableList.IDLE:
									return 'chatIdle';
								case AvailableList.OFFLINE:
								case AvailableList.MOBILE:
									return 'chatOffline';
							}
						};
						var localChatOnlineFriends=window.ChatOnlineFriends;
						var oldtop=0;
						var thefunc=function(){
							//mydebug('nub fixer');
							if (CSS.hasClass(buddylistnub,'openToggler') && bodycontent.scrollHeight!=oldheight) {
								oldtop=bodycontentparent.scrollTop;
								oldheight=bodycontent.scrollHeight;
								Dock._resizeNubFlyout(buddylistnub);
								bodycontentparent.scrollTop=oldtop;
							}
							if (!localChatOnlineFriends && window.ChatOnlineFriends) {
								localChatOnlineFriends=window.ChatOnlineFriends;
							}
							if (!localChatOnlineFriends && window.defineAndRequire) {
								defineAndRequire(["ChatOnlineFriends"],function(ChatOnlineFriends){
									localChatOnlineFriends=ChatOnlineFriends.prototype;
								});
							} else if (!localChatOnlineFriends && window.require && window.require.ensure) {
								require.ensure(["ChatOnlineFriends"],function(ChatOnlineFriends){
									localChatOnlineFriends=ChatOnlineFriends.prototype;
								});
							}
							if (localChatOnlineFriends && localChatOnlineFriends._mapChatStatus!=newChatOnlineFriendsMapChatStatus) {
								localChatOnlineFriends._mapChatStatus=newChatOnlineFriendsMapChatStatus;
							}
						};
						var myint=mySetInterval(thefunc,10);
						buddylistnub.addEventListener('click',function(){
							window.clearInterval(myint);
							myint=mySetInterval(thefunc,10);
						},false);
						sidebardisabler_var_19.subscribe('content-changed',function(){
							window.clearInterval(myint);
							myint=mySetInterval(thefunc,10);
						});
					}
					if ($('fbNotificationsFlyout') && $('fbNotificationsList') && !DOM.find($('fbNotificationsFlyout'),'.uiScrollableArea')) {
						var newjewel=HTML('<div class="uiScrollableArea"><div class="uiScrollableAreaWrap scrollable" style="max-height:350px"><div class="uiScrollableAreaBody"><div class="uiScrollableAreaContent" style="width:330px"></div></div></div><div class="uiScrollableAreaTrack"><div class="uiScrollableAreaGripper"></div></div></div>').getRootNode();
						DOM.appendContent(DOM.find(newjewel,'.uiScrollableAreaContent'),$('fbNotificationsList'));
						DOM.insertAfter(DOM.find($('fbNotificationsFlyout'),'.jewelHeader'),newjewel);
						try {
							var scrolljewel=new ScrollableArea();
							scrolljewel.init(newjewel,{"persistent":true});
						} catch (e) {}
					}
					DOM.insertBefore(newlink,navlinks[navlinks.length-1]);
					AvailableList._poller.requestNow();
					mySetTimeout(function(){Dock.resizeAllFlyouts();},0);
					mySetTimeout(function(){Dock.resizeAllFlyouts();},100);
					if (localstore.is_fbsidebardisabler_localstore===true) {
						localstore.getItem('not_first_run',function(itemValue){
							if (itemValue!=true) {
								localstore.setItem('not_first_run',true);
							}
						});
					}
				});
				loadautoupdate(1); // for Chrome only!
			} catch (e) {
				mydebug('Error: '+(e.stack||e.message||e));
				loadautoupdate(1,e.stack||e.message||e); // for Chrome only!
			}
		};
		if ((/^https?:\/\/.*\.facebook\.com\/.*$/.test(window.location.href)) && (window.top===window.self)) {
			mySetTimeout(workerfunc,100);
		} else {
			loadautoupdate(0); // for Chrome only!
		}
	};
	try {
		if (window.chrome && window.chrome.extension) {
			var chromewindowhack=document.createElement('div');
			chromewindowhack.setAttribute('onclick','return window;');
            		var unsafeWindow=chromewindowhack.onclick();
			unsafeWindow.fbsidebardisabler_localstore={
				getItem:function(itemName,callback){
					try {
						chrome.extension.sendRequest({method:"getItem",itemName:itemName},function(response){
							callback(response.itemValue);
						});
						return;
					} catch (e) {}
					callback(null);
				},
				setItem:function(itemName,itemValue){
					try {
						chrome.extension.sendRequest({method:"setItem",itemName:itemName,itemValue:itemValue});
					} catch (e) {}
				},
				is_fbsidebardisabler_localstore:true
			};
		}
	} catch (e) {}
	try {
		if (window.opera) {
			var localstore_callbacks={};
			window.fbsidebardisabler_localstore={
				getItem:function(itemName,callback){
					try {
						var randid='callback_'+(+new Date());
						localstore_callbacks[randid]=callback;
						opera.extension.postMessage(JSON.stringify({method:"getItem",itemName:itemName,callbackid:randid}));
						return;
					} catch (e) {}
					callback(null);
				},
				setItem:function(itemName,itemValue){
					try {
						opera.extension.postMessage(JSON.stringify({method:"setItem",itemName:itemName,itemValue:itemValue}));
					} catch (e) {}
				},
				operaloadaboutdialog:function(callback,extension_version,currlocale){
					try {
						var randid='callback_'+(+new Date());
						localstore_callbacks[randid]=callback;
						opera.extension.postMessage(JSON.stringify({method:"operaloadaboutdialog",extension_version:extension_version,currlocale:currlocale,callbackid:randid}));
						return;
					} catch (e) {}
					callback({success:false});
				},
				is_fbsidebardisabler_localstore:true
			};
			opera.extension.onmessage=function(event){
				try {
					var response=JSON.parse(event.data);
					if (response.method=="getItemResponse") {
						if (typeof localstore_callbacks[response.callbackid]=="function") {
							localstore_callbacks[response.callbackid](response.itemValue);
						}
						delete localstore_callbacks[response.callbackid];
					}
				} catch (e) {}
			};
		}
	} catch (e) {}
	var chatscript=window.document.createElement('script');
	chatscript.appendChild(window.document.createTextNode('('+fbsidebardisabler.toString()+')();'));
	var append_thing;
	var appender=function(){
		try {
			append_thing=(window.document.body||window.document.head||window.document.documentElement);
			append_thing.appendChild(chatscript);
		} catch (e) {
			window.setTimeout(appender,100);
			return;
		}
		append_thing.removeChild(chatscript);
	};
	appender();
})();


//---------------------------------------------------------------------
//---------------------------------------------------------------------
//                 CHAT  EMOTICONS  BAR
//---------------------------------------------------------------------
//---------------------------------------------------------------------

// funcion para agregar css
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}


// List of emoticons
// :) :( :D >:( -_- :/ o.O :p :'( >:O :v 3:) :o :3 ;) :* (Y) :|] 8) <3 :putnam: 8| ^_^ (^^^) O:) <(") :42: 





	var version, HttpsOn, ImagesURL, ResourcesURL, storage, emotsInfo, spemotsInfo, headTag, styleTag, ArrowStyleUp, ArrowStyleDown, fEmotBarDom, fEmotsListDom, fArrow;

	version = 0.183;
	HttpsOn = window.location.href.match('https://')?true:false;
	ImagesURL = HttpsOn?'https://s-static.ak.fbcdn.net/images/':'http://static.ak.fbcdn.net/images/';
	ResourcesURL = HttpsOn?'https://s-static.ak.fbcdn.net/rsrc.php/':'http://static.ak.fbcdn.net/rsrc.php/';

/* START: This part of the code was written (partialy) by Vaughan Chandler for FFixer, special thanks to him :) */

	storage = 'none';

	try {
		if (typeof GM_getValue === 'function' && typeof GM_setValue === 'function') {
			GM_setValue('testkey', 'testvalue');
			if (GM_getValue('testkey', false) === 'testvalue') { storage='greasemonkey'; }
		}
	} catch(x) {}
	if (storage=='none' && typeof localStorage == 'object') { storage='localstorage'; }

	function setValue(key, value) {
		switch (storage) {
			case 'greasemonkey':
				GM_setValue('0-'+key, value);
				break;
			case 'localstorage':
				localStorage['femotbar-0-'+key] = value;
				break;
		}
	}

	function getValue(key, value) {
		switch (storage) {
			case 'greasemonkey':
				return GM_getValue('0-'+key, value);
			case 'localstorage':
				var val = localStorage['femotbar-0-'+key];
				if (val=='true') { return true; }
				else if (val=='false') { return false; }
				else if (val) { return val; }
				break;
		}
		return value;
	}
	
	function xmlhttpRequest(params, callBack) {
		if (typeof GM_xmlhttpRequest !== 'undefined') {
			params['onload'] = callBack;
			return GM_xmlhttpRequest(params);
		}
		return null;
	}

	function openInTab(url) {
		if (typeof GM_openInTab !== 'undefined') { GM_openInTab(url); }
		else { window.open(url); }
	}

	function UpdateCheck() {
		if(parseInt(getValue('LastUpdate', '0')) + 86400000 <= (new Date().getTime())) {
			try {
				xmlhttpRequest( { method: 'GET',
								  url: 'http://userscripts.org/scripts/source/50826.meta.js?' + new Date().getTime(),
								  headers: {'Cache-Control': 'no-cache'} },
								  handleUpdateResponse);
			}
			catch (err) {
				alert('An error occurred while checking for updates:\n' + err);
			}
		}
	}
	
	function handleUpdateResponse(r) {
		setValue('LastUpdate', new Date().getTime() + '');
		if (r.responseText.match(/@versionnumber\s+(\d+\.\d+)/)[1] > version) {
			if(confirm("There's an update available for 'Facebook Chat Emoticons Bar'.\nDo you wish to install it?")) openInTab('http://userscripts.org/scripts/source/50826.user.js');
		}
	}

	
/* END */

	function createSelection(field, start, end) {
		if( field.createTextRange ) {
			var selRange = field.createTextRange();
			selRange.collapse(true);
			selRange.moveStart('character', start);
			selRange.moveEnd('character', end);
			selRange.select();
		} else if( field.setSelectionRange ) {
			field.setSelectionRange(start, end);
		} else if( field.selectionStart ) {
			field.selectionStart = start;
			field.selectionEnd = end;
		}
		field.focus();
	}       
	
	function getCursorPosition(field) {
		var CursorPos = 0;
		if (field.selectionStart || field.selectionStart == '0') CursorPos = field.selectionStart;
		return (CursorPos);
	}
	
//	UpdateCheck();
	
	emotsInfo = [':)', ':(', ':p', ':D', ':o', ';)', '8)', '8|', '>:(', ':/', ':\'(', '3:)', 'O:)', ':*', '<3', '^_^', '-_-', 'o.O', '>:O', ':v', ':3', '(Y)'];
	spemotsInfo = [':|]', 'emote/robot.gif', '(^^^)', 'emote/shark.gif', ':putnam:', 'emote/putnam.gif', '<(")', 'emote/penguin.gif', ':42:', 'emote/42.gif'];

    headTag = document.getElementsByTagName('head')[0];
    if (headTag) {
		styleTag = document.createElement('style');
		styleTag.type = 'text/css';
		styleTag.innerHTML =
			'.chat_tab_emot_bar {padding-top: 4px; padding-bottom: 4px; line-height: 16px; padding-left: 2px; background:#EEEEEE none repeat scroll 0 0; border-style: solid; border-width: 0px 0px 1px 0px; border-color: #C9D0DA; position: static; }'+
			'.chatstylesbut {width: 15px; height:15px; background-image: url("' + ResourcesURL + 'zx/r/FbCyXQSrD4-.png"); cursor: pointer; border-color: rgb(153, 153, 153) rgb(153, 153, 153) rgb(136, 136, 136); border-style: solid; border-width: 1px; }'+
			'.chat_arrow { background-image: url("'+ ResourcesURL + 'v1/zp/r/SBNTDM0S-7U.png"); background-position: 0 -48px; height: 5px; width: 9px; }';
		headTag.appendChild(styleTag);
	}
	
	ArrowStyleUp = 'cursor: pointer; position: absolute; right: 2px; -moz-transform: rotate(180deg); -webkit-transform: rotate(180deg);'
	ArrowStyleDown = 'cursor: pointer; position: absolute; right: 2px;'
	
	fEmotBarDom = document.createElement('div');
	fEmotBarDom.setAttribute('id','EmoBar');
	fEmotBarDom.setAttribute('class','chat_tab_emot_bar');
	
	fEmotsListDom = document.createElement('div');
	fEmotsListDom.setAttribute('name','EmotsList');
	fEmotsListDom.setAttribute('id','EmoList');
	fEmotBarDom.appendChild(fEmotsListDom);
	
	addGlobalStyle('#EmoList {text-align: center;margin-right: 10px;margin-left: 10px;}');
	addGlobalStyle('#EmoBar {opacity: 0.2;filter: alpha(opacity=20);-moz-opacity: 0.2;-webkit-opacity: 0.2;transition: all 0.2s;-moz-transition: all 0.2s;-webkit-transition: all 0.2s;-o-transition: all 0.2s;}');
	addGlobalStyle('#EmoBar:hover {opacity: 1.0;filter: alpha(opacity=100);-moz-opacity: 1.0;-webkit-opacity: 1.0;}');

	for(i=0;i<emotsInfo.length;i+=1) {
		var fEmotsDom = document.createElement('img');
		fEmotsDom.setAttribute('alt',emotsInfo[i]);
		fEmotsDom.setAttribute('style','cursor: pointer; background-position: -'+ 16*i +'px 0px;');
		fEmotsDom.setAttribute('src',ImagesURL + 'blank.gif');
		fEmotsDom.setAttribute('class','emote_img');
		fEmotsListDom.appendChild(fEmotsDom);
	}
	for(i=0;i<spemotsInfo.length;i+=2) {
		var fEmotsDom = document.createElement('img');
		fEmotsDom.setAttribute('alt',spemotsInfo[i]);
		fEmotsDom.setAttribute('src',ImagesURL + spemotsInfo[i+1]);
		fEmotsDom.setAttribute('style','cursor: pointer;');
		fEmotsDom.setAttribute('class','emote_custom');
		fEmotsListDom.appendChild(fEmotsDom);
	}
	
	fArrow = document.createElement('i');
	fArrow.setAttribute('alt','');
	fArrow.setAttribute('class','img chat_arrow');
	fArrow.setAttribute('style',ArrowStyleUp);
	fEmotBarDom.appendChild(fArrow);
	
	var setting_visible = getValue('visible',true);
	
	document.addEventListener('DOMNodeInserted', fInsertedNodeHandler, false);

	function fInsertedNodeHandler(event) {
		if(event.target.getElementsByClassName && event.target.getElementsByClassName('fbNubFlyout fbDockChatTabFlyout')[0])
			fInsertEmotBar(event.target);
	}

	function fInsertEmotBar(fChatWrapper) {
		fChatToolBox = fChatWrapper.getElementsByClassName('fbNubFlyoutHeader')[0]
		fNewEmotBar = fEmotBarDom.cloneNode(true);
		setVisibility(fNewEmotBar);
		for(i=0;i<fNewEmotBar.firstChild.childNodes.length-2;i++) fNewEmotBar.firstChild.childNodes[i].addEventListener('click', fEmotClickHandler , false);

		fNewEmotBar.firstChild.childNodes[i].addEventListener('click' , fStyleClickHandler , false);
		fNewEmotBar.firstChild.childNodes[i+1].addEventListener('click' , fStyleClickHandler , false);
		
		fNewEmotBar.childNodes[1].addEventListener('click', fHideShowEmotBar , false);
		if(fChatToolBox.childNodes) fChatToolBox.insertBefore(fNewEmotBar,fChatToolBox.childNodes[1]);
	}

	function fEmotClickHandler(event){
		var fChatInput = event.target.parentNode.parentNode.parentNode.parentNode.getElementsByClassName('fbNubFlyoutFooter')[0].getElementsByClassName('inputContainer')[0].getElementsByClassName('uiTextareaAutogrow input')[0];
		var pos = getCursorPosition(fChatInput);
		
		var txtbef = ''; var txtaft = '';
		
		if (fChatInput.value.charAt(pos-1) != ' ' && pos-1 > 0) txtbef = ' ';
		if (fChatInput.value.charAt(pos) != ' ') txtaft = ' ';
		
		fChatInput.value = fChatInput.value.substring(0,pos) + txtbef + event.target.getAttribute('alt') + txtaft + fChatInput.value.substring(pos);
		createSelection(fChatInput,pos + event.target.getAttribute('alt').length + txtaft.length + txtbef.length,pos + event.target.getAttribute('alt').length + txtaft.length + txtbef.length);
	}
	
	function fStyleClickHandler(event){
		var fChatInput = event.target.parentNode.parentNode.parentNode.parentNode.getElementsByClassName('fbNubFlyoutFooter')[0].getElementsByClassName('inputContainer')[0].getElementsByClassName('uiTextareaAutogrow input')[0];
		
		var selectedText = fChatInput.value.substring(fChatInput.selectionStart, fChatInput.selectionEnd);
		
		var pos = getCursorPosition(fChatInput);
		var txtlen = selectedText.length;
		
		if (txtlen == 0) {
			fChatInput.value = fChatInput.value.substring(0,pos) + event.target.getAttribute('alt') + fChatInput.value.substring(pos);
			createSelection(fChatInput,pos + 1,pos + event.target.getAttribute('alt').length-1);
		}
		else {
			var txtbef = event.target.getAttribute('alt').charAt(0);
			var txtaft = event.target.getAttribute('alt').charAt(0);
			
			while (fChatInput.value.charAt(pos) == ' ') { pos += 1; txtlen -= 1; }
			while (fChatInput.value.charAt(pos+txtlen-1) == ' ') txtlen -= 1;
			
			if (fChatInput.value.charAt(pos-1) != ' ' && pos-1 > 0) txtbef = ' ' + txtbef;
			if (fChatInput.value.charAt(pos+txtlen) != ' ') txtaft += ' ';
			
			fChatInput.value = fChatInput.value.substring(0,pos) + txtbef + fChatInput.value.substring(pos,pos+txtlen) + txtaft + fChatInput.value.substring(pos + txtlen);
			
			createSelection(fChatInput, pos + txtlen + 2, pos + txtlen + 2);
		}
	}

	function fHideShowEmotBar(event){
		fChatBar = document.getElementsByName('EmotsList');
		if(fChatBar[0].getAttribute('style') == 'display: none;') {
			for(i=0;i<fChatBar.length;i++) {
				fChatBar[i].setAttribute('style','display: block;');
				fChatBar[i].parentNode.childNodes[1].setAttribute('style',ArrowStyleUp);
			}
		}
		else {
			for(i=0;i<fChatBar.length;i++) {
				fChatBar[i].setAttribute('style','display: block;');
				fChatBar[i].parentNode.childNodes[1].setAttribute('style','display: none;');
			}
		}
		setValue('visible',!setting_visible);
		setting_visible = !setting_visible;
	}
	
	function setVisibility(DOM) {
		if(setting_visible) {
			DOM.firstChild.setAttribute('style','display: block;');
			DOM.childNodes[1].setAttribute('style','display: none;');
		}
		else {
			DOM.firstChild.setAttribute('style','display: block;');
			DOM.childNodes[1].setAttribute('style','display: none;');
		}
	}
	
	
		
