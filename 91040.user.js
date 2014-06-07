// Faarks Grepo-Tools
// version 0.3 Beta 
// Copyright (c) 2010, Dirk "Faark" Fieblinger
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Hello World", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Faarks Grepolis Tools
// @namespace     http://faark.no-ip.info/static/faarksGrepoTools
// @description   Some nice little features for Grepolis (Browsergame by InnoGames)
// @version       0.3
// @include       http://*.grepolis.*/game/*
// ==/UserScript==

// @include       http://xx*db.grepo.innogames.net/game/*


try{
	/*Compatibility/Cleanup&co... remove that in future/release Versions*/
	//javascript:var text;if( typeof faarksErrorReporter === "undefined" ){text = "no running scripts by faark detected";}else{text = "Running Scripts:\n";for( var i in faarksErrorReporter.products ){var p = faarksErrorReporter.products[i];text=text+p.name+"["+p.version+"]\n";}}text = text+"\n\n\nFound elements:"+($("#faarksGrepoOverview_scriptObject").length>0?" fgo":"")+($("#faarksGrepoPicSaver_clientScriptContainer").length>0?" fgps":"")+($("#faarksGrepoKillSlider_scriptObject").length>0?" fgsw":"")+($("#faarksGrepoTools_scriptObject").length>0?" fgt":"")+($("#grexGrepoTownReservation").length>0?" ggtr":"")+($("#mavsGrepoStyles_scriptObject").length>0?" mgs":"");alert( text );
	//document.cookie = "faarksErrorReporter_undefined=;expires="+new Date().toGMTString();//buggy first version
	//document.cookie = "faarksErrorReporter_faarksGrepoTools=;expires="+new Date().toGMTString();//now use .grepolis.com
	String.prototype.format = function(){
		var pattern = /\{\d+\}/g;
		var args = arguments;
		return this.replace(pattern, function(capture){ return args[capture.match(/\d+/)]; });
	}
}catch(err){
}

if( (typeof faarksErrorReporter === "undefined") || (faarksErrorReporter.version < 1.1) ){
	var faarksErrorReporter = (function(){return {
		version: 1.1,
		config: {
			serverUrl: "http://grepo.faark.de/faarksErrorReporter/current/report.php",
			product: "fgt",
			
			//that configuration can be set by script/install config to change behaviore... need to be compatible!
			dev: false,
			test: false,
			no_ajax: false,
			ajax_disabled: false
		},
		current: {
			oldOnError: null,
			initiated: false,
			enabled: false,
			active: false
		},
		products: {
			//file: { name, version, author, info, shortName }
		},
		text: {
			langs: {
				"de": {
					fatalError: "Fehler in einer Userscript-Fehler-Funktion!\n\n\nJa das klingt lustig. Nein das ist es nicht!^^\nLeider gab es ein Fehler in FaarksErrorReporter, er wird bis zum nächsten Seitenaufruf abgeschaltet.\n\n\nWICHTIG: Es handelt sich hierbei um eines deiner Userscripts, also nicht den Support damit nerfen!^^\nBitte sei so nett und lass mir (Faark) folgende Infos zukommen:\n--------------------------------------------------------------------------------------------\n",
					config_reseted: "Fehler-Konfig zurückgesetzt...",
					
					guiFlag_product_name_name: "Script-Name",
					guiFlag_product_name_description: "Der Name des Scripts, in dem dieser Fehler aufgetreten ist",
					guiFlag_product_version_name: "Script-Version",
					guiFlag_product_version_description: "Die Version des Scripts, in dem dieser Fehler aufgetreten ist",
					guiFlag_error_message_name: "Fehler-Nachricht",
					guiFlag_error_message_description: "Die eigentliche Fehler-Information...",
					guiFlag_error_file_name: "Fehler-Script",
					guiFlag_error_file_description: "Das genau Script-File, in dem der Fehler aufgetreten ist",
					guiFlag_error_line_name: "Fehler-Zeile",
					guiFlag_error_line_description: "Die genau Zeile, in der der Fehler aufgetreten ist",
					guiFlag_error_stack_name: "Genau Fehler-Position",
					guiFlag_error_stack_description: "Die Funktionsaufrufe, die zu dem Fehler geführt haben...",
					guiFlag_web_location_name: "Web-Addresse",
					guiFlag_web_location_description: "Die URL der aktuellen Website",
					guiFlag_web_document_name: "Dokument-Inhalt",
					guiFlag_web_document_description: "Der komplette inhalt der akutellen Website. Er kann nötig sein, um den Fehler zu finden.",
					guiFlag_web_browser_name: "Browser- / OS-Version",
					guiFlag_web_browser_description: "Infos über Browser und Betriebsystem, incl. Version",
					guiFlag_errorTool_version_name: "Reporter-Version",
					guiFlag_errorTool_version_description: "Die Version des Error-Reporters",
					guiFlag_unknown_name: "[[FLAG]]",
					guiFlag_unknown_description: "Sonstige weitere Infos...",
					
					gui_headline: "Fehler in \"[[PRODUCT_NAME]]\":",
					gui_intro: "In [[PRODUCT_NAME]] (Version [[PRODUCT_VERSION]]; von [[PRODUCT_AUTHOR]]) wurde ein Fehler festgestellt. Bitte hilf ihn zu beseitigen, indem du dem Entwickler Informationen über dieses Problem bereit stellst.",
					gui_send: "Fehlerbericht senden",
					gui_cancel: "Abbrechen",
					gui_close: "Nicht senden",
					gui_toggleSettings: "Einstellungen über das Fehler-Popup anzeigen/ändern",
					gui_setting_showAll: "Diesen Fehler beim nächsten Auftreten wieder anzeigen",
					gui_setting_hideThis: "Diesen Fehler bis zum nächsten Update nicht anzeigen",
					gui_setting_hideAll: "Fehler in [[PRODUCT_NAME]] bis zum nächsten update nicht anzeigen",
					gui_toggleData: "Übertragene Daten anzeigen/ändern",
					gui_toggleComment: "Kommentar zu diesem Fehler schreiben",
					gui_commentDefault: "Schreib dein Kommentar hier rein!",
					
					gui_tooltip_sendAndSave: "Fehlerbericht senden und Alert-Config speichern",
					gui_tooltip_save: "Alert-Config speichern aber keinen Fehlerbericht senden",
					gui_tooltip_close: "Fehlerfenster schließen",
					gui_tooltip_viewData: "Gesendete Daten anzeigen",
					gui_tooltip_hideData: "Gesendete Daten ausblenden",
					gui_tooltip_viewConfig: "Benachrichtigungsconfiguration anzeigen",
					gui_tooltip_hideConfig: "Benachrichtigungsconfiguration ausbelnden",
					gui_tooltip_saveConfigInfo: "Um diese Config zu speichern müssen Cookies aktiv sein!",
					gui_tooltip_toggleComment:"Du hast ne Idee, was diesen Fehler verursachen könnte? Alle Infos könnten hilfreich sein!",
					
					gui_tooltip_commentRequired: "Um Fehler wirklich beheben zu können ist oft ein Kommentar notwendig. Bitte sei so nett und verfasse wenigstens Test-Modus einen (sagen wir 20 Zeichen)..."
				},
				"fr": {
					fatalError: "Une erreur à été signalé dans un rapport concernant un de vos script !\n\n\nLe son est plaisant, oui ? Non il ne l'est pas >_<' !^^\nNavré mais il y un bug dans FaarksErrorReporter, il est maintenant désactivé jusqu'à la prochaine action.\n\n\nIMPORTANT: Ce message à été causé par l'un de vos script, ne venez pas nous ennuyer avec ça!^^\nSVP soyez sympa et envoyez moi suivre les informations à : (Faark at forum.grepolis.de or faark@grepolis.de) \n--------------------------------------------------------------------------------------------\n",
					config_reseted: "Réinitialiser la configuration...",

					guiFlag_product_name_name: "Nom du script",
					guiFlag_product_name_description: "Nom du script ou l'erreur est survenue",
					guiFlag_product_version_name: "Version du script",
					guiFlag_product_version_description: "Version du script ou l'erreur est survenue",
					guiFlag_error_message_name: "Message d'erreur",
					guiFlag_error_message_description: "Information sur l'erreur survenue...",
					guiFlag_error_file_name: "Fichier d'erreur",
					guiFlag_error_file_description: "Le fichier exact ou l'erreur est survenue",
					guiFlag_error_line_name: "Erreur à la ligne",
					guiFlag_error_line_description: "L'erreur est survenue à la ligne",
					guiFlag_error_stack_name: "Emplacement exact de l'erreur",
					guiFlag_error_stack_description: "Trace complète de l'erreur...",
					guiFlag_web_location_name: "Adresse WEB",
					guiFlag_web_location_description: "URL du site ou vous vous trouvez",
					guiFlag_web_document_name: "Contenu du site",
					guiFlag_web_document_description: "Le contenu complet du site ou vous vous trouvez peut grandement nous aider, en particulier lors d'une mise à jour de Grepolis.",
					guiFlag_web_browser_name: "Navigateur & Système d'exploitation",
					guiFlag_web_browser_description: "Information sur votre navigateur & votre système d'exploitation",
					guiFlag_errorTool_version_name: "Version du rapport",
					guiFlag_errorTool_version_description: "Version du journal d'erreur",
					guiFlag_unknown_name: "[[FLAG]]",
					guiFlag_unknown_description: "Informations diverses...",

					gui_headline: "Erreur de \"[[PRODUCT_NAME]]\":",
					gui_intro: "Une erreur est survenue dans [[PRODUCT_NAME]] (Version [[PRODUCT_VERSION]]; ecrit par [[PRODUCT_AUTHOR]])! Aidez moi, s'il vous plait, à résoudre le problème en soumettant le rapport d'erreur à son dévellopeur.",
					gui_send: "Envoyer le rapport",
					gui_cancel: "Annuler",
					gui_close: "Ne pas envoyer",
					gui_toggleSettings: "Montrer/Cacher la configuration des alertes",
					gui_setting_showAll: "Signaler à nouveau cette erreur si elle se reproduit à l'avenir",
					gui_setting_hideThis: "Ne plus signaler cette erreur jusqu'à la prochaine version",
					gui_setting_hideAll: "Ne plus afficher l'erreur dans [[PRODUCT_NAME]] jusqu'à la prochaine mise à jour",
					gui_toggleData: "Afficher/cacher le rapport à soumettre",
					gui_toggleComment: "Écrire un commentaire sur ce rapport",
					gui_commentDefault: "Écrivez votre commentaire ici...",

					gui_tooltip_sendAndSave: "Envoyer le rapport d'erreur et sauvegarder la configuration des alertes",
					gui_tooltip_save: "Sauvegarder la configuration sans envoyer le rapport",
					gui_tooltip_close: "Fermer la fenetre d'alerte",
					gui_tooltip_viewData: "Afficher le rapport soumit",
					gui_tooltip_hideData: "Caché le rapport soumit",
					gui_tooltip_viewConfig: "Configuration d'alerte",
					gui_tooltip_hideConfig: "Cacher la configuration",
					gui_tooltip_saveConfigInfo: "Vous devez activer vos coockies pour sauvegarder les options!",
					gui_tooltip_toggleComment:"Avez vous des informations supplementaire sur la cause de ces erreurs? Toute information nous sera précieuse!"
				},
				"en": {
					fatalError: "Error in one of your Userscript's Error-Reporter!\n\n\nSounds funny, jay? No it isn!^^\nSorry, but there was an Error in FaarksErrorReporter, it is disabled until next page-load.\n\n\nIMPORTANT: This message is caused by one of your userscripts, do not annoy the support with that!^^\nPlease be that pleasant an send me (Faark at forum.grepolis.de or faark@grepolis.de) the following info:\n--------------------------------------------------------------------------------------------\n",
					config_reseted: "Error-Config resetted...",
					
					guiFlag_product_name_name: "Script-Name",
					guiFlag_product_name_description: "The name of script in which the error occurred",
					guiFlag_product_version_name: "Script-Version",
					guiFlag_product_version_description: "The version of the script in which the error occurred",
					guiFlag_error_message_name: "Error-Message",
					guiFlag_error_message_description: "The actual error information...",
					guiFlag_error_file_name: "Error-File",
					guiFlag_error_file_description: "The exact script file in which the error occurred",
					guiFlag_error_line_name: "Error-Line",
					guiFlag_error_line_description: "The exact line where the error occurred",
					guiFlag_error_stack_name: "Exact error-location",
					guiFlag_error_stack_description: "The whole error-tracer...",
					guiFlag_web_location_name: "Web-Addresss",
					guiFlag_web_location_description: "The URL of the current website",
					guiFlag_web_document_name: "Document-Content",
					guiFlag_web_document_description: "The whole content of the current website can be usefull. eg in case of an grepo-update.",
					guiFlag_web_browser_name: "Browser/OS-Version",
					guiFlag_web_browser_description: "Information about your browser & operating system",
					guiFlag_errorTool_version_name: "Reporter-Version",
					guiFlag_errorTool_version_description: "Version of that Error-Reporter",
					guiFlag_unknown_name: "[[FLAG]]",
					guiFlag_unknown_description: "Other additional info...",
					
					gui_headline: "Error in \"[[PRODUCT_NAME]]\":",
					gui_intro: "There was an error in [[PRODUCT_NAME]] (Version [[PRODUCT_VERSION]]; written by [[PRODUCT_AUTHOR]])! Please help resolve that error by submiting usefull data about that problem to the developer.",
					gui_send: "Send Report",
					gui_cancel: "Cancel",
					gui_close: "Dont send",
					gui_toggleSettings: "Show/hide notify-config-panel",
					gui_setting_showAll: "Show this error again, in case it occurs in the future",
					gui_setting_hideThis: "Dont show this error til next update",
					gui_setting_hideAll: "Dont show errors in [[PRODUCT_NAME]] til next update",
					gui_toggleData: "Show/hide data to submit",
					gui_toggleComment: "Add a comment to that error",
					gui_commentDefault: "Write your comment here...",
					
					gui_tooltip_sendAndSave: "Send error report and save the Alert Config",
					gui_tooltip_save: "Save Alert Config but do not send error report",
					gui_tooltip_close: "Close Error Window",
					gui_tooltip_viewData: "Show Sent Data",
					gui_tooltip_hideData: "Hide Sent Data",
					gui_tooltip_viewConfig: "Alert Config Profile",
					gui_tooltip_hideConfig: "Hide Alert Config Profile",
					gui_tooltip_saveConfigInfo: "In order to save this config cookies have to be activated!",
					gui_tooltip_toggleComment:"Do you have any idea what could have cause this error? Any information you may have would be helpful!"
				}
			},
			initiated: false,
			defaultLangs: [ "en", "de" ],
			get: function( index, data, fatal ){
				if( fatal || (typeof faarksTextSelection === "undefined") ){
					for( var i = 0; i < this.defaultLangs.length; i++ ){
						if( this.langs[this.defaultLangs[i]] && this.langs[this.defaultLangs[i]][index] ){
							var text = this.langs[this.defaultLangs[i]][index];
							if( data ){
								for( var d in data ){
									var p = new RegExp("\\[\\["+d+"\\]\\]","i");
									var oldText;
									do{
										oldText = text;
									}while( oldText != ( text = text.replace( p, data[d] ) ) );
								}
							}
							return text;
						}
					}
				}else{
					if( !this.initiated ){
						faarksTextSelection.init( "fer", "Faarks Error Reporter", this.langs );
						this.initiated = true;
					}
					return faarksTextSelection.get( "fer", index, data );
				}
			}
		},
		upload: function(data){
			var form = $("<form method='POST' action='"+this.config.serverUrl+"'></form>");
			$("body").append( form );
			for( var i in data ){
				form.append( "<input type='hidden' name='"+i+"' value='"+escape(data[i])+"' />" );
			}
			form.submit();
		},
		errorConfig: {
			domain: null,
			reset: function(){
				for( var i in faarksErrorReporter.products ){
					this.set( i, "", -1 );
					faarksErrorReporter.products[i].errorConfig = undefined;
				}
				HumanMessage.success( fer.text.get("config_reseted") );
			},
			load: function( productId ){
				var prod = faarksErrorReporter.products[productId];
				prod.errorConfig = [];//default... show all errors
				var c_name = "faarksErrorReporter_"+prod.shortName;
				if (document.cookie.length>0){//cookieFnc by w3s integrated
					c_start=document.cookie.indexOf(c_name + "=");
					if (c_start!=-1){
						c_start=c_start + c_name.length+1;
						c_end=document.cookie.indexOf(";",c_start);
						if (c_end==-1)
							c_end=document.cookie.length;
						var text = unescape(document.cookie.substring(c_start,c_end));
						var data = text.split(" ");
						var vers = /v([0-9]+\.?[0-9]+)/.exec( data[0] );
						if( vers ){
							if( Number( vers[1] ) < prod.version ){
								this.set( productId, "", -1 );
							}else{
								if( data.length > 1 ){
									prod.errorConfig = data.slice( 1 );
								}else{
									prod.errorConfig = true;
								}
								return;
							}
						}
					}
				}
			},
			normalize_line: function( line ){
				var alowed_chars = "abcdefghijklmnopqrstuvwxyz0123456789",
					replace_with = "_",
					old_value = line.toString().toLowerCase(),
					new_value = "";
				for( var i = 0; i < old_value.length; i++ ){
					if( alowed_chars.indexOf( old_value[i] ) >= 0 ){
						new_value += old_value[i];
					}else{
						new_value += replace_with;
					}
				}
				return new_value;
			},
			set: function( productId, lineNumber, expiredays ){
				lineNumber = this.normalize_line( lineNumber );
				var prod = faarksErrorReporter.products[productId];
				var c_name = "faarksErrorReporter_"+prod.shortName;
				var value =  "v"+prod.version.toString() + 
					( arguments.length > 1 ? 
						" "+( (prod.errorConfig instanceof Array) ? 
							prod.errorConfig.concat(lineNumber).join(" ") : 
							lineNumber.toString() ) :
						"" );
				expiredays = expiredays ? expiredays : 21;
				//setCookie-Fnc by w3s
				var exdate=new Date();
				exdate.setDate(exdate.getDate()+expiredays);
				document.cookie=c_name+ "=" +escape(value)+((expiredays==null) ? "" : ";expires="+exdate.toGMTString())+";domain=.grepolis.com";
				this.load( productId );
			},
			get: function( productId, lineNumber ){// true: do not report/cancel error report
				lineNumber = this.normalize_line( lineNumber );
				var prod = faarksErrorReporter.products[productId];
				if( !prod.errorConfig )
					this.load( productId );
				if( prod.errorConfig === true )
					return true;
				else if( prod.errorConfig instanceof Array ){
					return $.inArray(lineNumber.toString(),prod.errorConfig)>-1;
				}else{
					throw new Error("Unknown Error-Config: ["+typeof prod.errorConfig+"] " + prod.errorConfig.toString());
				}
			}
		},
		gui: {
			current: {
				dataCache: null,
				pid: null,
				lastShownPopupElement: null
			},
			dataFlags: { /* {name,description[,required][[,loaded[by script!]]]} *EDIT*: NAME/DESCRIPTON NOW ADDED BY LANG-SYS IN initFlags! USES EXACTLY guiFlag_[name]_name AND guiFlag_[name]_description IN TRANSLATION-CONFIG*/
				product_name: {required:true},
				product_version: {required:true},
				
				error_message:{required:true},
				error_file: {required:true},
				error_line: {required:true},
				error_stack: {required:true},
				
				web_location: {},
				web_document: {},
				web_browser: {},
				
				errorTool_version: {required:true}
			},
			close: function(send, save){
				if( fer.config.test && send && (($("#faarksErrorReporter_commentBoxText").val().length < 20 ) || ($("#faarksErrorReporter_commentBoxText").val()==fer.text.get("gui_commentDefault"))) ){
					var text = fer.text.get("gui_tooltip_commentRequired");
					this.setTooltip( text );
					try{
						HumanMessage.error( text );
					}catch(err){}
					return;
				}
				
				if( save )
					switch( $("input[name='faarksErrorReporter_showBugMode']:checked").val() ){
						case 'self':
							faarksErrorReporter.errorConfig.set(this.current.pid,this.current.dataCache.error_line);
							break;
						case 'all':
							faarksErrorReporter.errorConfig.set(this.current.pid);
							break;
					}
				var data = {};
				for( var index in this.dataFlags ){
					if( ( $("input[name='faarksBugReporter["+index+"]']:checked").length > 0 ) && (this.current.dataCache[index] !== null) && (this.current.dataCache[index] !== undefined) ){
						data[index] = this.current.dataCache[index];
					}
				}
				data["comment"] = $("#faarksErrorReporter_commentBoxText").val();
				$("#faarksErrorReporter_overlay, #faarksErrorReporter_content").remove();
				faarksErrorReporter.current.active = false;
				if( send )
					faarksErrorReporter.upload( data );
			},
			toggleAlertConfig: function(){
				if( $("#faarksErrorReporter_toggelAlertConfig_open").is(":visible") ){
					$("#faarksErrorReporter_toggelAlertConfig_open").hide();
					$("#faarksErrorReporter_toggelAlertConfig_close").show();
				}else{
					$("#faarksErrorReporter_toggelAlertConfig_open").show();
					$("#faarksErrorReporter_toggelAlertConfig_close").hide();
				}
			},
			toggleDataConfig: function(){
				if( $("#faarksErrorReporter_toggelDataConfig_open").is(":visible") ){
					$("#faarksErrorReporter_toggelDataConfig_open").hide();
					$("#faarksErrorReporter_toggelDataConfig_close").show();
				}else{
					$("#faarksErrorReporter_toggelDataConfig_open").show();
					$("#faarksErrorReporter_toggelDataConfig_close").hide();
				}
			},
			toggleCommentBox: function(){
				if( $("#faarksErrorReporter_toggelCommentBox_open").is(":visible") ){
					$("#faarksErrorReporter_toggelCommentBox_open").hide();
					$("#faarksErrorReporter_toggelCommentBox_close").show();
				}else{
					$("#faarksErrorReporter_toggelCommentBox_open").show();
					$("#faarksErrorReporter_toggelCommentBox_close").hide();
				}
			},
			onCommentBlur: function(){
				if( $("#faarksErrorReporter_commentBoxText").val() == "" ){
					$("#faarksErrorReporter_commentBoxText").val( fer.text.get("gui_commentDefault") );
				}
			},
			onCommentFocus: function(){
				if( $("#faarksErrorReporter_commentBoxText").val() == fer.text.get("gui_commentDefault") ){
					$("#faarksErrorReporter_commentBoxText").val("");
				}
			},
			setTooltip: function( text, target ){
				if( !text ){
					if( this.current.lastShownPopupElement != target )
						return;
					text = "&nbsp;";
				}else{
					this.current.lastShownPopupElement = target; 
				}
				$("#faarksErrorReporter_tooltip").html(text);
			},
			createTooltip: function( elements, text ){
				elements.unbind('mouseenter');
				elements.unbind('mouseleave');
				elements.bind('mouseenter',fer_cif(function( event ){ this.setTooltip(text,event.currentTarget); },this));
				elements.bind('mouseleave',fer_cif(function( event ){ this.setTooltip(null,event.currentTarget); },this));
			},
			initCss: function( ){
				if( $("#faarksErrorReporter_styles").length <= 0 ){
					$("head").append("<style type='text/css' id='faarksErrorReporter_styles'>\
						#faarksErrorReporter_overlay{ display: block; height: 100%; left: 0; position: fixed; top: 0; width: 100%; z-index: 40000; opacity: 0.4; background-image:url(http://grepo.faark.de/faarksGrepoTools/resources/curtain_bg.png); }\
						#faarksErrorReporter_content{ top: 180px; background-color:#000000; border:3px dashed #FFFFFF; color:#999999; font-size:14px; padding:12px 2px 0; position:absolute; text-align:center; width:550px; z-index:40001; }\
						#faarksErrorReporter_headline{ color:#666666; line-height:normal; }\
						#faarksErrorReporter_tooltip{ margin-bottom: 10px; font-style: italic; font-size: 80%; }\
						#faarksErrorReporter_commentBoxText{ margin-left:20px; margin-top:5px; width:90%; height:50px; color: grey; border: 1px solid grey; background-color: #101010; }\
						#faarksErrorReporter_commentBoxText:hover { border: 1px solid lightgrey; color: lightgrey; }\
						#faarksErrorReporter_commentBoxText:focus { border: 1px solid lightgrey; color: lightgrey; background-color: #202020; }\
						.faarksErrorReporter_button { cursor: pointer; display:block; outline-style:none; color:#804000; font-weight:bold; text-decoration:none; }\
						#faarksErrorReporter_mainSubmitButton { font-size:150%; color:#A05010; margin-bottom:4px; display:inline-block; }\
						.faarksErrorReporter_button:hover, #faarksErrorReporter_mainSubmitButton:hover { color:#0082BE; };\
					</style>");
				}
			},
			initFlags: function() {
				for( var i in this.dataFlags ){
					var old = this.dataFlags[i];
					if( !old.loaded ){
						var n = fer.text.get( "guiFlag_"+i+"_name" );
						var d = fer.text.get( "guiFlag_"+i+"_description" );
						this.dataFlags[i] = {
							loaded: true,
							name: n?n:fer.text.get( "guiFlag_unknown_name", { flag: i } ),
							description: d?d:fer.text.get( "guiFlag_unknown_description", { flag: i } ),
							required: old.required ? true : false
						};
					}
				}
			},
			init: function( productId, data ){
				faarksErrorReporter.current.active = true;
				this.current.dataCache = data;
				this.current.pid = productId;
				var prod = faarksErrorReporter.products[productId];
				this.initCss();
				this.initFlags();
				//lang-crap
				var prodLang = {};
				for( var i in prod ){
					prodLang["product_"+i]=prod[i];
				}
				var t = function( i, data ){ return fer.text.get.apply( fer.text, [ i, data ? $.extend( data, prodLang ) : prodLang ] ); };

				$("#faarksErrorReporter_overlay, #faarksErrorReporter_content").remove();
				$("body").append('<div id="faarksErrorReporter_overlay"></div>\
					<div id="faarksErrorReporter_content" style="left: '+((window.innerWidth-550)/2)+'px;">\
						<h2 id="faarksErrorReporter_headline">'+t("gui_headline")+'</h2><br>\
						<span style="display:block;">\
							'+t("gui_intro")+'\
						</span>\
						<div style="float:right;margin-right:2px" class="faarksErrorReporter_sendButton faarksErrorReporter_button" href="#">'+t("gui_send")+'</div>\
						<div style="clear: both;"></div>\
						<div style="display: block; margin: 20px auto 0px auto; width:500px; text-align: left;">\
							<div class="faarksErrorReporter_button" id="faarksErrorReporter_toggelAlertConfig_open" href="#" style="display:block">+ '+t("gui_toggleSettings")+'</div>\
							<div id="faarksErrorReporter_toggelAlertConfig_close" style="display:none;">\
								<div class="faarksErrorReporter_button" href="#">- '+t("gui_toggleSettings")+'</div><br/>\
								<div style="margin-left:10px;">\
									<label><input type="radio" name="faarksErrorReporter_showBugMode" value="none"> '+t("gui_setting_showAll")+'</label><br/>\
									<label><input type="radio" name="faarksErrorReporter_showBugMode" value="self" checked="checked"> '+t("gui_setting_hideThis")+'</label><br/>\
									<label><input type="radio" name="faarksErrorReporter_showBugMode" value="all"> '+t("gui_setting_hideAll")+'</label><br/>\
								</div>\
							</div>\
							<br/>\
							<div class="faarksErrorReporter_button" id="faarksErrorReporter_toggelDataConfig_open" href="#" style="display:block">+ '+t("gui_toggleData")+'</div>\
							<div id="faarksErrorReporter_toggelDataConfig_close" style="display:none;">\
								<div class="faarksErrorReporter_button" href="#">- '+t("gui_toggleData")+'</div><br/>\
								<div id="faarksErrorReporter_leftDataConfig" style="float:left;margin-left:10px;"></div>\
								<div id="faarksErrorReporter_rightDataConfig" style="float:right;margin-right:10px;"></div>\
								<div style="clear: both;"></div>\
							</div>\
							<br/>\
							<div class="faarksErrorReporter_button"  id="faarksErrorReporter_toggelCommentBox_open" href="#" style="display:block">+ '+t("gui_toggleComment")+'</div>\
							<div id="faarksErrorReporter_toggelCommentBox_close" style="display:none;">\
								<div class="faarksErrorReporter_button" href="#">- '+t("gui_toggleComment")+'</div><br/>\
								<textarea id="faarksErrorReporter_commentBoxText">'+t("gui_commentDefault")+'</textarea>\
							</div>\
						</div>\
						<br/>\
						<div id="faarksErrorReporter_tooltip">&nbsp;</div>\
						<div href="#" class="faarksErrorReporter_sendButton faarksErrorReporter_button" id="faarksErrorReporter_mainSubmitButton">'+t("gui_send")+'</div>\
						<div href="#" class="faarksErrorReporter_saveButton faarksErrorReporter_button" style="position:absolute;bottom:0px;left:4px;">'+t("gui_close")+'</div>\
						<div href="#" class="faarksErrorReporter_cancelButton faarksErrorReporter_button" style="position:absolute;bottom:0px;right:4px;">'+t("gui_cancel")+'</div>\
					</div>');
				$("#faarksErrorReporter_overlay div:first").css("top", (window.innerHeight - $("#faarksErrorReporter_overlay div:first").height() ) / 2);
				
				$(".faarksErrorReporter_sendButton").click( fer_cif(function(){this.close(true,true);return false;},this) );
				$(".faarksErrorReporter_saveButton").click( fer_cif(function(){this.close(false,true);return false;},this) );
				$(".faarksErrorReporter_cancelButton").click( fer_cif(function(){this.close(false,false);return false;},this) );
				$("#faarksErrorReporter_toggelDataConfig_close .faarksErrorReporter_button, #faarksErrorReporter_toggelDataConfig_open").click( fer_cif(function(){this.toggleDataConfig();return false;},this) );
				$("#faarksErrorReporter_toggelAlertConfig_close .faarksErrorReporter_button, #faarksErrorReporter_toggelAlertConfig_open").click( fer_cif(function(){this.toggleAlertConfig();return false;},this) );
				$("#faarksErrorReporter_toggelCommentBox_close .faarksErrorReporter_button, #faarksErrorReporter_toggelCommentBox_open").click( fer_cif(function(){this.toggleCommentBox();return false;},this) );
				$("#faarksErrorReporter_commentBoxText").focus( fer_cif( this.onCommentFocus, this ) ).blur( fer_cf( this.onCommentBlur, this ) );
				
				
				if( fer.config.test ){
					$("#faarksErrorReporter_toggelCommentBox_open").hide();
					$("#faarksErrorReporter_toggelCommentBox_close").show();
				}
				
				this.createTooltip( $(".faarksErrorReporter_sendButton"), t("gui_tooltip_sendAndSave") );
				this.createTooltip( $(".faarksErrorReporter_saveButton"), t("gui_tooltip_save") );
				this.createTooltip( $(".faarksErrorReporter_cancelButton"), t("gui_tooltip_close") );
				this.createTooltip( $("#faarksErrorReporter_toggelDataConfig_open"), t("gui_tooltip_viewData") );
				this.createTooltip( $("#faarksErrorReporter_toggelDataConfig_close .faarksErrorReporter_button"), t("gui_tooltip_hideData") );
				this.createTooltip( $("#faarksErrorReporter_toggelAlertConfig_open"), t("gui_tooltip_viewConfig") );
				this.createTooltip( $("#faarksErrorReporter_toggelAlertConfig_close div"), t("gui_tooltip_saveConfigInfo") );
				this.createTooltip( $("#faarksErrorReporter_toggelAlertConfig_close .faarksErrorReporter_button"), t("gui_tooltip_hideConfig") );
				this.createTooltip( $("#faarksErrorReporter_toggelCommentBox_close, #faarksErrorReporter_toggelCommentBox_open"), t("gui_tooltip_toggleComment") );
				
				var dItems = [];
				for( var index in this.dataFlags ){
					if( (data[index] !== null) && (data[index] !== undefined) ){
						var i = $('<label style="display:block;"><input '+(this.dataFlags[index].required?'disabled="disabled" ':"")+'type="checkbox" name="faarksBugReporter['+index+']" value="on" checked="checked" /> '+this.dataFlags[index].name+'</label>');
						var flagContent = $.trim( data[index].toString().replace(/&/gmi, '&amp;').replace(/"/gmi, '&quot;').replace(/>/gmi, '&gt;').replace(/</gmi, '&lt;') );
						if( flagContent.length > 50 ){
							flagContent = flagContent.substr(0,47)+"...";
						}
						this.createTooltip( i, this.dataFlags[index].description + "<br/><span style=\"font-size:90%;\">Daten: "+flagContent+"</span>");
						dItems.push( i );
					}
				}
				for( var i = 0; i < Math.ceil( dItems.length / 2 ); i++ ){
					$("#faarksErrorReporter_leftDataConfig").append( dItems[i] );
				}
				for( var i = Math.ceil( dItems.length / 2 ); i < dItems.length; i++ ){
					$("#faarksErrorReporter_rightDataConfig").append( dItems[i] );
				}
			}
		},
		//report( exception )
		//report( message, url, line[, stack])
		i_unpack_stack: function( stack, index ){
			if( faarksUtility && faarksUtility.unpackStack ){
				return faarksUtility.unpackStack.apply( faarksUtility, arguments );
				alert("DEBUG: "+stack+" to "+JSON.stringify(xD) );
				return xD;
			}
			if( (typeof stack === "object") && (typeof stack.stack === "string") )
				stack = stack.stack;
			if( (typeof stack !== "string") || !stack )
				return [];
			
			var data = [], lines = stack.split("\n"), ex = /(.*)@(.+):([0-9]+)/;
			if( typeof index !== "undefined" ){
				if( !lines[index] )
					return null;
				var line = ex.exec( lines[index]);
				alert("Debug:\n"+stack+"["+index+"] has found ["+Boolean(line)+"] lines");
				return { func: line[1], file: line[2], line: Number( line[3] ) };
			}
			for( var i = 0; i < lines.length; i++ ){
				var line = ex.exec( lines[i] );
				if( line ){
					data.push({ func: line[1], file: line[2], line: Number( line[3] ) });
				}
			}
			//alert("Debug:\n"+stack+" has found ["+data.length+"] lines");
			return data;
		},
		i_get_best_package: function( file, old ){
			if( old )
				return old;
			for( var f in this.products ){
				var index = file.lastIndexOf( "/"+f );
				if( (index >= 0) && ( (index + f.length + 1) == file.length ) ){
					return f;
				}
			}
			return null;
			/*
			var stackData = this.i_unpack_stack( stack );
			if( stackData.length <= 0 ){
				stackData.push({func: msg,file: file,line: line});
			}
			for( var i = stackData.length - 1; i >= 0; i-- ){
				var url = String( stackData[i].file );
				for( var f in this.products ){
					if( url.lastIndexOf( f ) >= 0 ){
						return f;
					}
				}
			}
			return null;
			*/
		},
		reportEx: function( project, msg, file, line, stack ){
			//if( typeof console === "object") console.log("Reporting error... Arugments: %o",arguments);
			if( !project || this.errorConfig.get( project, line ) )
				return;
			var prod = this.products[ project ];
			this.gui.init( project, {
				error_message: msg,
				error_file: file,
				error_line: line,
				error_stack: stack,
				
				product_name: prod.name,
				product_version: prod.version,
				
				web_location: window.location.href,
				web_document: $("html").html(),
				web_browser: navigator.userAgent,
				
				errorTool_version: this.version
			});
		},
		report: function(){//TODO: ADD non-EXCEPTION-Formats-Support
			//(text)
			//(exception)
			//(text, loc-trace)
			//(exception, loc-trace)
			//(msg, file, line, stack, loc-trace)
			if( !this.current.enabled )
				return;
			try{
				this.current.enabled = true;
				
				
				var file = "unknown file",
					line = "unknown line",
					stack = "unknown location",
					msg = "unknown error",
					type="Direct",
					locStack = new Error().stack,
					locOffset = 2;
				
				
				var unpackLocStack = function( args, offset ){
					if( args.length > offset ){
						if( Number( args[offset] ).toString() == args[offset] ){
							locOffset = Number(args[offset]);
						}else if( args[offset] ){
							locStack = args[offset]
							if( Number( args[offset+1] ).toString() == args[offset+1] ){
								locOffset = Number(args[offset+1]);
							}
						}
					}
				};
				
				
				var e = arguments.length == 1 ? arguments[0] : undefined;
				if( (e instanceof Error) || ((typeof e === "object") && (typeof e.message === "string") && (typeof e.fileName === "string") && (!isNaN( Number( e.lineNumber ) ) ) && (typeof e.stack === "string"))){//exception
					file = e.fileName;
					line = e.lineNumber;
					stack = e.stack;
					msg = e.message;
					type = e.name;
					unpackLocStack( arguments, 1 );
				}else if((arguments.length > 3)&&arguments[0]&&arguments[1]&&!isNaN(Number(arguments[2]))){//message,url,line,stack
					//if( typeof console === "object") console.log("Reporting error... Arugments: %o",arguments);
					msg = arguments[0];
					file = arguments[1];
					line = arguments[2];
					stack = arguments[3];
					unpackLocStack( arguments, 4 );
				}else if( e ){
					msg = e.toString();
					unpackLocStack( arguments, 1 );
					stack = locStack;
				}else
					throw new Error("No error data");
				
				
				
				var bestPackage = null,
					locD = this.i_unpack_stack( locStack, locOffset ),
					errStack = this.i_unpack_stack( stack );
				
				if( locD && (arguments.callee.caller !== this.onError ) ){
					bestPackage = this.i_get_best_package( locD.file, bestPackage );
				}
				bestPackage = this.i_get_best_package( file, bestPackage );
				for( var i = 0; i < errStack.length; i++ ){
					bestPackage = this.i_get_best_package( errStack[0].file, bestPackage );
				}
				
				if( this.config.dev === true ){// on my dev version, make a "alert" for every catched exception...
					alert( "Error [in "+(bestPackage?bestPackage:"Unknown")+"]: "+msg + " ("+type+"@"+line+"@"+file+")\n\nStack:\n"+ stack );
					return;
				}
				
				
				this.reportEx( bestPackage, msg, file, line, stack );
			}catch(err){
				this.onErrorInError( err );
			}finally{
				this.current.enabled = false;
			}
		},
		onErrorInError: function(ex){//that func is called by error-func's catches and, in case of error
			this.current.enabled = false;
			alert( this.text.get("fatalError",null,true)+ex.name+": "+ex.message+"\nat "+ex.fileName+", line " + ex.lineNumber + "\nStack: "+ (ex.stack?ex.stack:"N/A") );
		},
		onError: function(errorMsg, url, lineNumber){
			try{
				//console.log("err");
				//console.log("ErrorStack: %o",new Error().stack);
				this.report( errorMsg, url, lineNumber );
			}finally{
				if( this.current.oldOnError )
					return this.current.oldOnError.apply( window, arguments );
				return false;
			}
		},
		exec_func: function( fnc, scope, args ){
			try{
				if( typeof fnc === "string" ){
					if( typeof scope === "object"){
						with( scope ){
							return eval( fnc );
						}
					}else
						return eval( fnc );
				}else if( typeof fnc === "function" ){
					return fnc.apply( scope ? scope : window, args ? args : [] );
				}
			}catch(err){
				faarksErrorReporter.report( err );
			}
			throw new Error("Cant exec ["+fnc+"]!");
		},
		create_func: function( fnc, scope ){
			return function(){
				return faarksErrorReporter.exec_func( fnc, scope, arguments );
			}
		},
		create_internal_func: function( fnc, scope ){
			if( typeof fnc !== "function" )
				throw new Error( "Object ["+(typeof fnc)+"]"+(((typeof fnc==="undefined")||((typeof fnc==="object")&&!fnc))?"N/A":fnc.toString())+" is not a Function!" );
			var self = this;
			return function(){
				try{
					if( typeof fnc === "string" )
						eval( fnc );
					else
						return fnc.apply( scope ? scope : window, arguments );
				}catch(err){
					self.onErrorInError( err );
				}
			}
		},
		verify_versions: function( elements ){
			if( !elements || !elements.length )
				return;
			for( var i = 0; i < elements.length; i++ ){
				var el = elements[i];
				if( this.products[el.file] && (this.products[el.file].version < el.version) ){
					alert("dev: outdated project "+this.products[el.file].name);
				}
			}
		},
		init: function( fileName, productInfo, verify_versions ){
			if( !$ || (typeof Game === "undefined") )//no jquery/Game -> no valid grepo-side
				return;
			
			if( faarksErrorReporter && (faarksErrorReporter !== this) ){
				//import from version 1 and below
				this.config = $.extend( true, this.config, faarksErrorReporter.config );
				this.current = $.extend( true, this.current, faarksErrorReporter.current );
				this.products = $.extend( true, this.products, faarksErrorReporter.products );
			}
			
			if( arguments.length > 0 ){
				productInfo.file = fileName;
				productInfo.shortName = fileName.split(".")[0];
				this.products[fileName] = productInfo;
				
				// default class init
				if( this.current.initiated )
					return;
				var self = this;
				this.current.oldOnError = window.onerror;
				//window.onerror = function (){self.onError.apply(self,arguments);};//diese Fehler-Funktion ist echt scheisse, gibt keine zeile und nur ne drecks message! REPLACE THAT
				this.current.enabled = true;
				this.current.initiated = true;
				
				if( verify_versions )
					this.verify_versions( verify_versions );
			}else{
				// first init
				//read environment stuff
				if( window.dev || window.f_is_dev || window.is_dev )
					this.config.dev = true;
				if( window.test || window.f_is_test || window.is_test )
					this.config.test = true;
				if( window.no_ajax || window.f_no_ajax ){
					this.config.no_ajax = true;
					this.config.ajax_disabled = true;
				}
				if( !$.browser.mozilla || ($.browser.version < "3.5") ) //hope string-compair does it...
					this.config.no_ajax = true;
			}
			
		}
	}})();
	var fer = faarksErrorReporter;
	function fer_go ( fnc, scope, args ){
		return faarksErrorReporter.exec_func(fnc,scope,args);
	}
	function fer_call ( what, scope, args ){
		return faarksErrorReporter.exec_func(what,scope,args);
	}
	function fer_cf ( fnc, scope, args ){
		var cfl = new Error();
		if( (typeof fnc !== "function") || (scope&&(typeof scope !== "object")) )
			throw new Error("Invalid Params ["+fnc+","+scope+","+args+"]!");
		var callParams = arguments.length;
		return function(){
			try{
				if( typeof fnc === "string" )
					eval( fnc );
				else
					return fnc.apply( scope ? scope : this, typeof args !== "undefined" ? (args instanceof Array ? args : [ args ] ) : ( (callParams >= 3) ? [this] : arguments) );
			}catch(err){
				faarksErrorReporter.report( err );
			}
		}
	}
	function fer_cif ( fnc, scope ){
		return faarksErrorReporter.create_internal_func( fnc, scope );
	}
}
faarksErrorReporter.init( "faarksGrepoTools.js", { name:"Faark's Grepo-Tools", version: 1.1, author: "Faark" }, [{file:"faarksGrepoTools.js",version:1.1,update_url:"http://grepo.faark.de/faarksGrepoTools/current/faarksGrepoToolsInstall.php"},{file:"clientscript.js",version:1.1,update_url:"http://grepo.faark.de/faarksGrepoPicSaver/current.php/faarksGrepoPicSaverInstall.html"}] );
function fer_test(){
	//javascript:faarksErrorReporter.errorConfig.reset();alert(faarksTextSelection.get("test"));void(0);
	faarksErrorReporter.errorConfig.reset();
	faarksErrorReporter.report( new Error("This is an Test-Error!") );
}
try{

	if( (typeof faarksUtility === "undefined") || (faarksUtility.version < 1) ){
		var faarksUtility = {
			version: 1,
			currentUrlParamsCache: null,
			getParams: function( fromLink ){
				if( !fromLink ){
					if( this.currentUrlParamsCache )
						return this.currentUrlParamsCache;
					fromLink = document.location.href;
				}else if( typeof fromLink === "object" ){
					fromLink = $(fromLink).attr("href") ? $(fromLink).attr("href") : ( $(fromLink).attr("src") ? $(fromLink).attr("src") : "" );
				}
				var reg = /[\?\&]([^\&=#]+)=?([^\&#]+)?/gi;
				var data = {};
				var part = null;
				while( part = reg.exec( fromLink ) ){
					data[ part[1] ] = typeof part[2] === "undefined" ? true : part[2];
				}
				if( fromLink == document.location.href)
					this.currentUrlParamsCache = data;
				return data;
			},
			getParam: function( name, fromLink, def){
				if( (typeof fromLink === "object") && (typeof fromLink.attr === "function" ) ){
					var tmp = fromLink.attr("href");
					if( tmp ){
						fromLink = tmp;
					}else{
						fromLink = fromLink.attr("src");
					}
				}
					
				var p = this.getParams( fromLink );
				return typeof p[name] === "undefined" ? ((typeof def === "undefined")?null:def) : p[name];
			},
			getDomByHtml: function( text, addToEl, ownReadyCallback ){//just like jquery, but donst call $.ready
				if( !ownReadyCallback ){
					ownReadyCallback = function(){};
				}
				var x=$.ready;
				var y=$.fn.ready;
				$.ready = $.fn.ready = ownReadyCallback;
				try{
					if( addToEl )
						return $(addToEl).html(text);
					return $(text);
				}finally{
					$.ready = x;
					$.fn.ready = y;
				}
			},
			random: function( max, min ){
				if( !min )
					min = 0;
				var diff = max - min + 1;
				return Math.floor(Math.random()*diff)+min;
			},
			uid: function( length, chars ){
				if(!length)
					length = 32;
				if(!chars)
					chars = "abcdefghijklmnopqrstuvwxyz0123456789";
				var id = "";
				for( index = 0; index < length; index++ ){
					id = id + chars.substr(Math.floor(Math.random()*(chars.length-1)),1);
				}
				return id;
			},
			unpackStack: function( stack, onlyLine, todo_soon_unpackFunctionParamTo ){
				if( (typeof stack === "object") && (typeof stack.stack === "string") ){
					stack = stack.stack;
				}else if( typeof stack === "undefined" ){
					stack = new Error().stack;
				}
				if(typeof stack !== "string")
					return [];
				var data = [],
					lines = stack.split("\n"),
					exp = /(.*)@(((ftp|http|https|javascript):\/?\/?)?([^@:]+)):([0-9]+)$/;
				if( (typeof onlyLine !== "undefined") && (onlyLine !== null) && !isNaN( Number( onlyLine ) ) && (onlyLine >= 0) ){
					if( lines.length >= onlyLine ){
						var line = exp.exec( lines[onlyLine] );
						return { func: line[1], file: line[2], line: Number( line[3] ) };
					}else{
						return null;
					}
				}
				for( var i = 0; i < lines.length; i++ ){
					var line = exp.exec( lines[i] );
					if( line ){
						data.push({ func: line[1], file: line[2], line: Number( line[6] ) });
					}
				}
				return data;
				/*var exRes = /(.*)@(.+):([0-9]+)/.exec( new Error().stack.split("\n")[1] );
				/*var line, data = []; DONT USE THAT IN OPERA!! !!! !!! ! !
				while( line = /([^@]*)@([^:]*):([0-9]*)\n/gi.exec( stack ) ){
					data.push( { func: line[1], file: line[2], line: line[3] } );
				}*/
			},
			moveMember: function( object, from, to ){
				if( object && (typeof object[from] != "undefined") ){
					object[to] = object[from];
					delete object[from];
				}
			},
			waitForFocus: function( options ){
				faarksUtility.moveMember( options, "success", "on_success" );
				faarksUtility.moveMember( options, "error", "on_error" );
				options = $.extend({
					on_success: function(){},
					on_error: function(){},
					timeout: 0,
					just_focus: false,
					
					status: "init", //init => wait => ok / error
					cancel: function( status ){
						if( this.status != "wait" )
							return;
						if( status )
							this.status = status
						$(window).unbind( "focus", my_onfocus ).unbind( "click", my_onfocus );
						if( this.status == "ok" )
							options.on_success( options );
						if( this.status == "error" )
							options.on_error( options );
					}
				}, options );
				
				var my_onfocus = function(){
					options.cancel( "ok" );
				}
				
				if( document.hasFocus() ){
					if( options.just_focus ){
						options.cancel( "ok" );
					}else{
						$(window).click( my_onfocus );
						options.status = "wait";
					}
				}else{
					$(window).focus( my_onfocus );
					options.status = "wait";
				}
				
				if( (options.status == "wait") && options.timeout ){
					window.setTimeout( function(){
						options.cancel( "error" );
					}, options.timeout );
				}
				
				return options;
			},
			data: {
				clone: function( data ){
					if( typeof data === "object" ){
						var pk = $.extend( true, {}, {data:data} );
						return pk.data;
						
						/*if( data instanceof Date ){
							return new Date(data);
						}else if( data instanceof Array ){
							return $.extend( true, [], data );
						}else
							return $.extend( true, {}, data );*/
					}else{
						return data;
					}
				},
				get_type: function( data ){
					if( data instanceof Array )
						return "array";
					else if( data instanceof Date )
						return "date";
					else if( typeof data === "undefined" ){
						return "object";
					}else
						return typeof data;
				},
				to_storable: function( data ){
					if( data instanceof Date ){
						return Number( data );
					}else if( typeof data === "boolean" ){
						return data ? 1 : 0;
					}else
						return data;
				},
				verify: function( data, type ){
					if( type === Date )
						type = "date";
					if( type === Array )
						type = "array";
					
					if( typeof data === type )
						return data;
					
					if( typeof type === "string" ){
						switch( type ){
							case "string":
								if( typeof data === "number" )
									return String(data);
								else if( !data )
									return "";
								else if( typeof data === "object" )
									return data.toString();
								break;
							case "boolean":
								if( data )
									return true;
								return false;
							case "number":
								return  Number(data);
								break;
							case "date":
								return new Date(data);
								break;
							case "array":
								if( !data )
									return [];
								if( !data.length )
									return [data];
								return data;
								break;
							case "object":
								break;
							default:
								throw new Error("Invalid Type ["+String(type)+"]");
						}
					}
					throw new Error("Cant convert ["+String(data)+"] to ["+String(type)+"]");
				},
				text_to_html: function( text ){
					var el = $("<div></div>");
					el.text( text );
					var html = el.html();
					el.remove();
					return html;
				},
				not_empty: function( array_object ){
					if( array_object && (typeof array_object === "object") ){
						if( (array_object instanceof Array) || (typeof array_object.length === "number") ){
							return array_object.lengt > 0;
						}else{
							for( var i in array_object ){
								return true;
							}
						}
					}
					return false;
				}
			},
			cookie: {
				unset: function( cookie, domain ){
					document.cookie=cookie+"=;expires="+(new Date()).toGMTString();
				},
				set: function( cookie, value, domain, expires ){
					if( typeof expires === "undefined" )
						expires = 21;
					if( (typeof expires === "number") || !isNaN( Number(expires) ) ){
						var exdate=new Date();
						exdate.setDate(exdate.getDate()+expires);
						expires = exdate;
					}
					
					document.cookie=cookie+ "=" +escape(value)+(expires ? ";expires="+expires.toGMTString() : "" )+(domain ? ";domain=.grepolis.com" : "");
				},
				get: function( cookie ){
					var s = document.cookie,
						m = true,
						e = /\s*([^\=\;]+)=?([^\;]*)?\;?/gi;
					e.exec( null );
					while( m = e.exec( s ) ){
						if( m[1] == cookie ){
							return m[2];
						}
					}
					return null;
				}
			},
			sort: {
				clone_crawl: function( list, compare_func ){
					if( !(list instanceof Array) || (list.length < 1) )
						return list;
					var result = [ list[0] ], next;
					for( var i = 1; i < list.length; i++ ){
						next = false;
						for( var v = 0; !next; v++ ){
							if( (v == result.length) || compare_func( result[v], list[i] ) ){
								result.splice( v, 0, list[i] );
								next = true;
							}
						}
					}
					return result;
				},
				best: function( list, compare_func/*aLargerB:(a,b)*/ ){
					return this.clone_crawl( list, compare_func );
					//throw new Error("Not implemented");
				}
			}
		};
	}
	
	
	if( (typeof faarksTextSelection === "undefined") || (faarksTextSelection.version < 3)){
		//requires faarksUtility
		var faarksTextSelection = (function(){
			var obj = {
				version: 3,
				config: {
					translate_url: "http://grepo.faark.de/faarksTextSelection/translate.php/hello",
					defaultUsage: ["en","de"],
					lang_replacement: { "xx":"en", "zz":"en" },
					lang: null,//if null, it will be set to an auto-detected...
					translate_preview_address: null // change this to set...
				},
				lastData: null,
				replacements: [
					{ find: /\[\[now\]\]/gi, replace: function(){return new Date().toLocaleString();} },
					{ find: /\[\[by\]\]/gi, replace: function(){return faarksTextSelection.get("sys","by",faarksTextSelection.lastData);} },
					{ find: /\[\[what\]\]/gi, replace: function(){return "";} },
					{ find: /\[\[id\]\]/gi, replace: function(){return "";} }
				],
				projects: {
					sys: {
						translate: false,
						name: "Default Strings",
						replacements: [],
						strings: {
							en: {
								by: "<span [[ID]]style='float:right;color: gray;font-size: 60%;'>[[WHAT]]by Faark</span>"
							}
						}
					}
				},
				
				translation_required: function(){//slow! dont call it often!
					for( var p in this.projects ){
						if( this.projects[p].translate !== false ){
							if( !this.projects[p].strings[this.config.lang] )
								return true;
							var cur = this.projects[p].strings[this.config.lang];
							for( var l in this.projects[p].strings ){
								if( l != this.config.lang ){
									for( var s in this.projects[p].strings[l] ){
										if( !cur[s] ){
											return true;
										}
									}
								}
							}
						}
					}
					return false;
				},
				translation_goto: function(){
					var pdata = {};
					for( var p in this.projects ){
						if( this.projects[p].translate !== false ){
							var pd = {
								id: p,
								name: this.projects[p].name, //faarksUtility.data.text_to_html( this.projects[p].name ),
								by: "Not jet supported", //faarksUtility.data.text_to_html( "Not jet supported" ),
								content: this.projects[p].strings
							}
							/* useless, done by server
							for( var l in pd.content ){
								for( var s in pd.content[l] ){
									pd.content[l][s] = faarksUtility.data.text_to_html( pd.content[l][s] );
								}
							}
							*/
							pdata[p] = pd;
						}
					}
					var form = $("<form method='POST' action='"+this.config.translate_url+"'></form>");
					$("body").append( form );
					form.append( "<input type='hidden' name='action' value='init' />" );
					form.append( "<input type='hidden' name='lang' value='"+this.config.lang+"' />" );
					form.append( "<input type='hidden' name='client_version' value='"+this.version+"' />" );
					form.append( "<input type='hidden' name='data' value='"+escape($.toJSON(pdata))+"' />" );
					form.submit();
				},
				// generate( sysname, lang, index, data ) [DEFAULT]
				// generate( text, data )
				generate: function( sysname, lang, index, data ){
					this.lastData = data;
					var text, all;
					if( arguments.length > 2 ){
						text = this.projects[sysname].strings[lang][index];
						all = this.projects[sysname].replacements;
					}else{
						text = sysname;
						all = [];
						data = lang;
					}
					if( data ){
						var datas = [];
						if( data.length ){
							datas = data;
						}else for( var i in data ){
							datas.push({ find: new RegExp("\\[\\["+i+"\\]\\]","gi"), replace: data[i] });//i.replace("[","\[").replace(")","\"")
						}
						all = datas.concat( all );
					}
					for( var i = 0; i < all.length; i++ ){
						text = text.replace( all[i].find, all[i].replace );
					}
					return text;
				},
				// get_text( text/object, data[, sysname] ): same as get, but never throws an exception and sysname is optional
				get_text: function( obj, data, sysname ){
					throw new Exception("Not jet implemented");
				},
				get: function( sysname, index, data, indexCanBeTextcontent ){
					if(!this.config.lang){
						//1st startup
						var lng = /([a-zA-Z]+)[0-9]*\./.exec( document.location.href );
						this.config.lang = lng ? (this.config.lang_replacement[lng[1]] ? this.config.lang_replacement[lng[1]] : lng[1]) : this.config.defaultUsage[0];
						this.projects.sys.replacements = this.projects.sys.replacements.concat( this.replacements );
					}
					if( !this.projects[sysname] ){
						throw new Error("No data for project ["+sysname+"] aviable...");
					}
					var langs = this.projects[sysname].strings;
					if( langs[this.config.lang] && langs[this.config.lang][index] ){
						return this.generate( sysname, this.config.lang, index, data );
					}else{
						for( var i = 0; i < this.config.defaultUsage.length; i++ ){
							if( langs[this.config.defaultUsage[i]] && langs[this.config.defaultUsage[i]][index] ){
								return this.generate( sysname, this.config.defaultUsage[i], index, data );
							}
						}
						// search default/global strings when not found in current project (todo: make a function)
						sysname = "sys";
						langs = this.projects[sysname].strings;
						if( langs[this.config.lang] && langs[this.config.lang][index] ){
							return this.generate( sysname, this.config.lang, index, data );
						}else{
							for( var i = 0; i < this.config.defaultUsage.length; i++ ){
								if( langs[this.config.defaultUsage[i]] && langs[this.config.defaultUsage[i]][index] ){
									return this.generate( sysname, this.config.defaultUsage[i], index, data );
								}
							}
						}
						// trying external data starts here
						if( typeof index === "object" ){
							if( index[this.config.lang] ){
								return this.generate( index[this.config.lang], data );
							}else{
								for( var i = 0; i < this.config.defaultUsage.length; i++ ){
									return this.generate( index[this.config.defaultUsage[i]], data );
								}
							}
						}else if((typeof index === "string") && indexCanBeTextcontent){
							return this.generate( index, data );
						}
						throw new Error("String ["+index+"] not found in ["+this.projects[sysname].name+"]'s active Languages!");
					}
				},
				init_create_shortcut: function( index ){
					var sc = function( a, b, c, d ){
						return faarksTextSelection.get( index,a,b,c,d );
					};
					sc.get = sc;
					sc.generate = function( a, b, c, d ){
						return faarksTextSelection.generate( index, a,b,c,d );
					};
					sc.translation_required = function(){ return faarksTextSelection.translation_required(); }
					sc.translation_goto = function(){ return faarksTextSelection.translation_goto(); }
					sc.lang = function( set_to ){if( set_to ){ faarksTextSelection.config.lang = set_to; }else{ return faarksTextSelection.config.lang; } }
					
					return sc;
				},
				// init( options )
				// init( sysname, name, lang, langdata[, replacements])
				// init( sysname, name, langsdata[, replacements])
				init: function( options ){ //sysname, name, a, b, c ){
					var o = {
						sysname: null,
						name: null,
						by: "Unknown",
						translate: null, //default is true, but thats...
						strings: {},
						langdata: null, //old for strings
						replacements: [],
						global_config: null //allows you to set some stuff for the global config
					};
					var result = true;
					if( arguments.length > 0 ){//append data-block
						if( arguments.length <= 1 ){
							o = $.extend(o,options);
						}else{
							var rep=[],langdata = {};
							if( typeof arguments[2] === "string" ){
								langdata[arguments[2]]=arguments[3];
								rep=arguments[4]?arguments[4]:rep;
							}else{
								langdata=arguments[2];
								rep=arguments[3]?arguments[3]:rep;
							}
							o.sysname = arguments[0];
							o.name = arguments[1];
							o.strings = langdata;
							o.replacements = rep;
						}
						if( !o.sysname ){
							if( o.translate ){
								throw new Error( "Can only translate projects with sysname set" );
							}else{
								o.translate = false;
								o.sysname = faarksUtility.uid();
							}
						}
						if( o.translate !== false ){
							o.translate = true;
						}
						if( !o.name ){
							o.name = o.sysname;
						}
						if( o.global_config ){
							this.config = $.extend( this.config, o.global_config );
						}
						if( o.langdata ){
							o.strings = o.langdata;
							o.langdata = null;
						}
						o.replacements = o.replacements.concat( this.replacements );
						this.projects[o.sysname] = o;
						
						result = this.init_create_shortcut(o.sysname);
					}
					if( (typeof faarksTextSelection !== "undefined")&&(faarksTextSelection.version)&&(faarksTextSelection !== this)){//migrate old data
						var oldVersion = faarksTextSelection.version;
						var oldProjects = faarksTextSelection.projects;
						var oldReplacements = faarksTextSelection.replacements;
						/* convert version data here! */
						if( oldVersion < 3 ){//only change was added translate in project config
							for( var p in oldProjects ){
								oldProjects[p].translate = oldProjects[p].sysname;
							}
							oldVersion = 3;
						}
						/* add old converted data */
						if( oldVersion == this.version ){
							for( var p in oldProjects ){
								if( !this.projects[p] )
									this.projects[p] = oldProjects[p];
								else{
									//copy missing replacements / strings
									for( var ori = 0; ori < faarksTextSelection.projects[p].replacements.length; ori++ ){
										var isnew = true;
										for( var nri = 0; nri < this.projects[p].replacements.length; nri++ ){
											if( faarksTextSelection.projects[p].replacements[ori].find.source == this.projects[p].replacements[nri].find.source ){
												isnew = false;
											}
										}
										if( isnew )
											this.projects[p].replacements.push( faarksTextSelection.projects[p].replacements[ori] );
									}
									this.projects[p].strings = $.extend( {}, faarksTextSelection.projects[p].strings, this.projects[p].strings );
								}
							}
							for( var p in oldReplacements ){
								if( !this.replacements[p] )
									this.replacements[p] = oldReplacements[p];
							}
						}
						//destroy old object so it couldnt be used anymore
						for( var i in faarksTextSelection ){
							faarksTextSelection[i] = null;
						}
						delete faarksTextSelection;
					}
					return result;
				}
			};
			obj.init();
			return obj;
		})();
	}
	
	if( (typeof faarksNewsFetcher === "undefined") ){
		var faarksNewsFetcher = {
			config: {
				query_every: null, //just once per page load
				retry_every: 60000 //download faild? retry every 60sec
			},
			current: {
				//initiated: false,
				timeout_id: null,
				loading_cnt: 0,
				dataStorage: null
			},
			news: [],
			news_by_id: {},
			default_news_class: function( news_data ){
				var setf = function( obj, index, def ){ if( typeof obj[index] !== "undefined" )return obj[index];else return def;}
				this.id = setf(news_data,"id",null);
				this.enabled = setf(news_data,"enabled",true);
				this.message = setf(news_data,"message",null);
				this.date = setf(news_data,"date",null);
				this.title = setf(news_data,"title",null);
				this.priority = setf(news_data,"priority",0);
				this.hideable = setf(news_data,"hideable",true);
				this.force_open = setf(news_data,"force_open",false);
				this.blocking = setf(news_data,"blocking",false);
				this.blink = setf(news_data,"blink",false);
				this.condition = setf(news_data,"condition",null);
				this.view_from = setf(news_data,"view_from",null);
				this.view_to = setf(news_data,"view_to",null);
				
				
				
				if( !this.id ){//todo: redo that
					if( this.hideable )
						throw new Error("hideable requires msg-id");
					this.id = "_"+faarksUtility.uid();
				}
				
				
				
				this.checkView = function(){
					if( !this.enabled )
						return false;
					if( this.view_from && (this.view_from < new Date().getTime()) ){
						return false;
					}
					if( this.view_to && (this.view_to > new Date().getTime()) ){
						return false;
					}
					if( this.condition && !eval(this.condition)){
						return false;
					}
					if( faarksNewsFetcher.current.dataStorage ){
						var newsConfig = faarksNewsFetcher.current.dataStorage.get("readed");
						for( var i = 0; i < newsConfig.length; i++ ){
							if( this.id == newsConfig[i] ){
								return false;
							}
						}
					}
					return true;
				};
				this.setReaded = function(){
					if( faarksNewsFetcher.current.dataStorage ){
						var newsConfig = faarksNewsFetcher.current.dataStorage.get("readed");
						newsConfig.push( this.id );
						faarksNewsFetcher.current.dataStorage.set( "readed", newsConfig );
						faarksNewsFetcher.update_savedConfig();
					}
				};
			},
			interfaces: [],
			default_interface: {
				set_loading: function( state ){},
				set_error: function( message ){},
				on_source_updated: function( source_element, news_elements ){},
				on_update_news: function( news_element ){},
				on_new_news: function( news_element ){}
			},
			listener: [],//function(news_element)
			on_responde: function( news_elements, source ){
				//remove dupes
				for( var i = news_elements.length - 1; i >= 0 ; i-- ){
					if( !( news_elements[i] instanceof this.default_news_class ) ){
						news_elements[i] = new this.default_news_class( news_elements[i] );
					}
					if( this.news_by_id[ news_elements[i].id ] )
						news_elements.splice( i, 1 );
					else
						this.news_by_id[ news_elements[i].id ] = news_elements[i];
				}
				this.news = this.news.concat( news_elements );
				for( var i = 0; i < this.listener.length; i++ ){
					fer_call( this.listener[i], source, [ news_elements, source ] );
				}
				for( var i = 0; i < this.interfaces.length; i++ ){
					this.interfaces[i].on_source_updated( source, news_elements );
					for( var n = 0; n < news_elements.length; n++ ){
						this.interfaces[i].on_new_news( news_elements[n] );
					}
				}
			},
			sources: [],
			source_class: function( source ){
				this.uri = null;
				this.call_at = null;
				this.retry_every = faarksNewsFetcher.config.retry_every;
				
				
				if( typeof source === "string" ){
					this.uri = source;
				}else if( (typeof source === "object") && source ){
					$.extend( this, source );
				}
				this.on_response = function( data, xhr, status, error ){
					faarksNewsFetcher.loadCount( -1 );
					if( error ){
						this.call_at = new Date().getTime() + this.retry_every;
						faarksNewsFetcher.update();
						return;
					}
					var news = [];
					if( data && data.news ){
						for( var i = 0; i < data.news.length; i++ ){
							news.push( new faarksNewsFetcher.default_news_class( data.news[i] ) );
						}
					}
					faarksNewsFetcher.on_responde( news, this );
				}
				this.update = function(){
					if( this.call_at === true )
						return false;
					if( (this.call_at) && (this.call_at > (new Date().getTime())) ){
						return this.call_at - new Date().getTime();
					}
					this.call_at = true;
					faarksNewsFetcher.loadCount( 1 );
					$.ajax( {
						url: this.uri,
						success: fer_cf( function( data, textStatus, xhr ){
							this.on_response( data, xhr, textStatus );
						}, this),
						error: fer_cf( function( xhr, textStatus, errorThrown ){
							this.on_response( null, xhr, textStatus, errorThrown );
						}, this),
						dataType: "json"
					} );
				}
			},
			loadCount: function( cng ){
				var newLoadState = null;
				var nlc = this.current.loading_cnt + cng;
				if( nlc > 0 ){
					if( this.current.loading_cnt <= 0 ){
						newLoadState = true;
					}
					this.current.loading_cnt = nlc;
				}else{
					if( this.current.loading_cnt > 0 ){
						this.current.loading_cnt = 0;
						newLoadState = false;
					}
				}
				if( newLoadState !== null ){
					for( var i = 0; i < this.interfaces.length; i++ ){
						this.interfaces[i].set_loading( newLoadState );
					}
				}
			},
			update: function(){
				window.clearTimeout( this.current.timeout_id );
				var current, smalest = null;
				for( var i = 0; i < this.sources.length; i++ ){
					current = this.sources[i].update();
					if( current && (!smalest || (current<smalest))){
						smalest = current;
					}
				}
				if( smalest ){
					this.current.timeout_id = window.setTimeout( fer_cf( this.update, this ), smalest );
				}
			},
			update_savedConfig: function(){
				var readed = this.current.dataStorage ? this.current.dataStorage.get("readed") : [];
				for( var i = 0; i < readed.length; i++ ){
					if( this.news_by_id[ readed[i] ] ){
						for( var g = 0; g < this.interfaces.length; g++ ){
							this.interfaces[g].on_update_news( this.news_by_id[ readed[i] ] );
						}
					}
				}
			},
			init: function( options ){
				if( !this.current.dataStorage && (typeof faarksDataStorage == "object") ){
					this.current.dataStorage = faarksDataStorage.init( "fnews", { readed: [] }, null, { onupdate: fer_cf( this.update_savedConfig, this ) } );
				}
				
				options = $.extend( {
					source_uri: null,
					source: null,
					gui: null,
					on_loaded: null,
					listener: null,
					call_on_existing: false,
					news: []
				}, options);
				
				if( options.gui ){
					var gui = $.extend( true, {}, this.default_interface, options.gui );
					this.interfaces.push( gui );
					gui.set_loading( this.current.loading_cnt > 0 );
				}
				if( options.on_loaded ){
					this.listener.push( options.on_loaded );
				}
				if( options.listener ){
					this.listener.push( options.listener );
				}
				if( options.call_on_existing ){
					if( options.on_loaded ){
						fer_call( options.on_loaded, null, [ this.news, null ] );
					}
					if( options.listener ){
						fer_call( options.listener, null, [ this.news, null ] );
					}
					if( options.gui ){
						options.gui.on_source_updated( null, this.news );
						for( var i = 0; i < this.news.length; i++ ){
							options.gui.on_new_news( this.news[n] );
						}
					}
				}
				if( options.news && options.news.length > 0 ){
					this.on_responde( options.news );
				}
				
				var src = options.source ? options.source : ( options.source_uri ? options.source_uri : null );
				if( src ){
					this.sources.push( new this.source_class( src ) );
				}
				
				this.update();
			}
		};
	}

	faarksTextSelection.init( "fgt", "Faarks Grepo Tools", {
		de: {
			loadCaptcha_wrongInputMsg: "Eingabe stimmt nicht mit dem angezeigtem Text überein!",
			loadCaptcha_default_title: "Sicherheitsabfrage",
			loadCaptcha_default_message: "Bitte kopiere die 4 Zeichen in das zweite Eingabefeld:",
			loadCaptcha_default_popup: "Dieses Feature belastet den Grepo-Server.<br/>Willst du es wirklich ausführen?",
			loadCaptcha_buttonText_ok: "Ok",
			loadCaptcha_buttonText_cancel: "Cancel",
			
			townid_text: " (Id: [[TOWNID]])",
			
			toolbuttons_statsPopup: "Öffnet das Profil von diesem<br/>Spieler auf GrepoStats.com<br/><span style='float:right;color: gray;font-size: 60%;'>by Faark & Marvinho</span>",
			toolbuttons_toolsPopup: "Öffnet das Profil von diesem<br/>Spieler auf GrepoTools.de<br/><span style='float:right;color: gray;font-size: 60%;'>by Grex & Faark</span>",
			toolbuttons_statsLang: "de",
			
			favorCalc_favorHeadline: "<h4>Gunst</h4>",
			favorCalc_defaultItem: "<b>[[GOD]]: [[FAVOR]]</b><br/>-  Produktion pro Stunde: [[OUTPUT]]<br/>-  Voll in etwa [[FULL_IN]]h<br/>-  Voll am [[FULL_AT]]",
			favorCalc_fullItem: "<b>[[GOD]]: [[FAVOR]]</b><br/>-  Produktion pro Stunde: [[OUTPUT]]<br/>-  Gunstspeicher ist voll!!!",
			
			enhancedSim_stringOutput: "Link mit gespeicherten Sim-Daten (Benötigt FaarksGrepoTools):\n\n\n[[ADDRESS]]",
			enhancedSim_stringInputHeadline: "Bitte kopier hier die URL mit den Sim-Daten rein:",
			enhancedSim_invalidInputString: "Fehler: Diese URL enthält keine Sim-Daten in einem gültigen Format!",
			enhancedSim_caputreButtonPopup: "Diese Einheiten in den Simulator einfügen.<br/>[[BY]]",
			
			enhancedSim_swapSideText: "Seiten Tauschen",
			enhancedSim_swapSidePopup: "Tauscht die Seiten der Einheiten...<br/>Aus Verteidigen werden Angreiffer,<br/>letztere zu Verteidigen<br/>[[BY]]",
			
			enhancedSim_getSimUrl_text: "Sim. Speichern",
			enhancedSim_getSimUrl_popup: "Zeigt dir einen Link, der den Simulator<br/>mit den diesen Einstellungen öffnet.<br/>[[BY]]",
			
			enhancedSim_openSimLink_text: "Sim. Laden",
			enhancedSim_openSimLink_popup: "Importiert einen Sim-Data-Link in den aktuellen Simulator.<br/>So können zB zwei verschiedene Daten-Quellen geöffnet werden.<br/>[[BY]]",
			
			enhancedSim_clear_text: "Leeren",
			enhancedSim_clear_popup: "Leert / Resettet alle Einstellungen des<br/>Simulators. Um einzelne Einheiten-Zeilen<br/>zu leeren klickst du auf die Icons<br/>in der ersten Spalte...<br/>[[BY]]",
			enhancedSim_clear_line: "Diese Zeile leeren...<br/>[[BY]]",
			
			enhancedSim_resume_text: "Erg. verwenden",
			enhancedSim_resume_popup: "Zieht die angezeigten Verluste ab...<br/>Um nur einzelne Verlust-Zeilen<br/>abzuziehen klickst du auf die Icons<br/>in der ersten Spalte...<br/>[[BY]]",
			enhancedSim_resume_line: "Ohne diese Verluste weiterrechnen...<br/>[[BY]]",
			
			enhancedSim_boniMod_changeAll: "Alle ändern<br/>[[BY]]",
			enhancedSim_boniMod_simpleApply_ButtonTooltip: "Übernehmen, aber Popup offen lassen<br/>[[BY]]",
			enhancedSim_boniMod_cancelButtonTooltip: "Angezeigte Config zurückstezen<br/>[[BY]]",
			
			academyTimeleft_resItem: "Resourcen verfügbar in [[IN]] Stunden,<br/>am [[AT]]<br/>",
			academyTimeleft_doneIn: "<h4>[[ORDER]]</h4>Fertig erforscht am [[DONE_AT]]<br/>[[BY]]",
			
			
			walkDuro_fullBy: "<span style='float:right;color: gray;font-size: 50%;'>Laufzeiten by Grex & Faark</span>",
			walkDuro_onError: "<span style=\"font-size:50%;color: red;\">Fehler beim Lade der Laufzeiten</span>",
			walkDuro_onLoading: "<span style=\"font-size:80%;color: gray;\">Lade Laufzeiten <img src=\"http://grepo.faark.de/faarksGrepoPicSaver/resources/loading.gif\" style=\"width: 10px; height: 10px; display: inline; position: relative; top: 1px;\"/></span>",
			
			walkTimes_command_name: "Laufzeiten",
			walkTimes_command_error: '<span style="color:red">Fehler beim Laden der Laufzeiten</span>',
			walkTimes_command_loading: "Lade Laufzeiten ",
			walkTimes_command_offline: "Laufzeiten auf dieser Welt deaktiviert",
			walkTimes_command_slowest: "Langsamste Einheit",
			walkTimes_command_popup_wt: "Laufzeit: ",
			walkTimes_command_bestMatch: "Beste Übereinstimmung bei<br/>aktueller Laufzeit...",
			walkTimes_command_research: "Research: ",
			walkTimes_command_research_light_popup: "Einen Leuchtturm in die Berechnung mit einbeziehen",
			walkTimes_command_research_metero_popup: "Die Forschung Meterologie in die Berechnung mit einbeziehen",
			walkTimes_command_research_map_popup: "Die Forschung Kartographie in die Berechnung mit einbeziehen",
			
			walkTimes_toOverview_menuButton_text: "Laufzeiten hier her",
			walkTimes_toOverview_menuButton_popup: "Zeigt dir eine Übersicht mit den Laufzeiten<br/>deiner Städte zu dieser Stadt an.<br/>[[BY]]",
			walkTimes_toOverview_window_headlineShort: "Laufzeiten zur Stadt ID-[[TOWN_TEXT]]",
			walkTimes_toOverview_window_headlineLong: "Laufzeiten zu [[TOWN]] ([[PLAYER]]; [[ALLY]])",
			walkTimes_toOverview_window_headline_noAlly: "Keine Allianz",
			walkTimes_toOverview_window_headline_noPlayer: "Kein Besitzer",
			walkTimes_toOverview_window_loadingTowns: "Lade eigene Städte... ",
			walkTimes_toOverview_table_townHeadline: "Städte",
			walkTimes_toOverview_table_unitHeadlinePopup: "<b>[[NAME]]</b><br/>Klicke hier, um nur Städte anzuzeigen,<br/>in denen minstens ein [[NAME]] steht",
			walkTimes_toOverview_table_unitHeadlinePopupSelected: "<b>[[NAME]] (ausgewählt)</b><br/>Es werden nur Städte angezeigt,<br/>in denen solchen Units vorhanden sind.<br/>Klicke hier, um auch Städte ohne Units<br/>vom Type [[NAME]] anzuzeigen",
			walkTimes_toOverview_groups_loading: "Loading ",
			walkTimes_toOverview_groups_defaultGroup: "Current Group",
			walkTimes_toOverview_groups_onlyGroupButton_poup: "Nur Städte der Gruppe <b>[[GROUPNAME]]</b> anzeigen.",
			walkTimes_toOverview_groups_onlyCurrentGroupButton_poup: "Nur Städte aus der aktuell in Grepo<br/>ausgewählten Stadtgruppe verwenden",
			walkTimes_toOverview_groups_noGroupsFound: "No town groups found. Create<br/>and Manage them under<br/>Stadtgruppen (PA-Menü)",
			walkTimes_toOverview_groups_changeButton_popup: "Stadtgruppe ändern",
			walkTimes_toOverview_sort_changeButton_popup: "Sortierung ändern",
			walkTimes_toOverview_filter_contentLine: 'Filter: Towngroup [[[GROUPBUTTON]]] and [[UNITS]]; sort by [[[SORT]]] [[CLEARALLBUTTON]]',
			walkTimes_toOverview_filter_unitCount_none: "no units",
			walkTimes_toOverview_filter_unitCount_one: "1 unit",
			walkTimes_toOverview_filter_unitCount_more: "[[COUNT]] units",
			walkTimes_toOverview_sort_townname_text: "Stadtname",
			walkTimes_toOverview_sort_townname_popup: "Die Tabelle nach den Stadtnamen sortieren",
			walkTimes_toOverview_sort_walktime_text: "Laufzeit",
			walkTimes_toOverview_sort_walktime_popup: "Die Tabelle nach den Laufzeiten sortieren",
			walkTimes_toOverview_sort_filterunit_text: "Units",
			walkTimes_toOverview_sort_filterunit_popup: "Die Tabelle nach der Anzahl der Einheiten des<br/>zuerst gefilteren Einheitentyps sortieren",
			walkTimes_toOverview_resetFiltersButton_popup: "Alle Filter resetten",
			
			quickCast_popup: "Das Bild zeigt den Gott, den du<br/>für diese Stadt gewählt hast.<br/><br/>Wenn du auf es klickst, kannst du<br/>direkt auf diese Stadt zaubern<br/>[[BY]]",
			
			extTownlist_errorMsg: "Fehler beim ermitteln der Dorf-Koordinaten",
			extTownlist_infoPopup: "Öffnet das Info-Fenster zu dieser<br/>Stadt. Sehr praktisch, um direkt<br/>Einheiten oder Ressourcen zu<br/>verschicken.<br/>[[BY]]",
			extTownlist_gotoMap: "Öffnet die Stadt auf der Karte.<br/><span style=\"text-align:right;float: right; color: gray; font-size: 60%;\">by Faark<br/>prior/similar implemention by Kapo el Ligno</span>",
			extTownlist_gotoOnMap: "Scrollt direkt zu dieser Stadt,<br/>ohne die Seite neu zu laden.<br/><i style=\"font-size: 70%\">(Nur auf der Map!)</i><br/>[[BY]]",
			
			paginator_defaultPopup: "Gehe direkt zu einer Seite,<br/>indem du sie hier ein gibst<br/>und Enter drückst.<br/>[[BY]]",
			paginator_confirmPopup: "Zur gewählten Seite gehen<br/>[[BY]]",
			paginator_cancelPopup: "Abbrechen und anfangs-<br/>Seite wieder einfügen<br/>[[BY]]",
			
			gotoLastForumPage_popup: "Gehe zur letzten Seite ([[PAGE]])<br/>[[BY]]",
			
			
			
			moralInPopup_loadingMoralPopupLine: "<td><img style=\"width:10px;height:10px;float:left;padding: 1pt 5px 0 2px;\" src=\"http://grepo.faark.de/faarksGrepoPicSaver/resources/loading.gif\"></td><td><span style=\"font-size:80%; color:grey;\">Lade Moral...</span></td>",
			moralInPopup_moralPopupLine: "<td><img style=\"width:14px;height:14px;float:left;padding: 1pt 3px 0 1px;\" src=\"http://static.grepolis.com/images/game/place/simulator/morale.png\"></td><td>Moral: [[MORAL]]%</span></td>",
			moralInPopup_townInfo_error_text: "<img style=\"width:14px;height:14px;float:left;padding: 1pt 3px 0 1px;\" src=\"http://static.grepolis.com/images/game/place/simulator/morale.png\"> Fehler beim Laden der Moral :(",
			moralInPopup_townInfo_error_popup: "Leider ist beim Laden der Moral<br/>folgender Fehler aufgetreten:<br/>[[ERRORTEXT]]<br/><br/>Sorry :([[BY]]",
			moralInPopup_townInfo_loading_text: "<img style=\"width:10px;height:10px;float:left;padding: 2pt 5px 0 2px;\" src=\"http://grepo.faark.de/faarksGrepoPicSaver/resources/loading.gif\"> Moral wird geladen...",
			moralInPopup_townInfo_loading_popup: "Die Moral wird von Grex's Server<br/>gelagen, bitte warten...[[BY]]",
			moralInPopup_townInfo_moral_text: "<img style=\"width:14px;height:14px;float:left;padding: 1pt 3px 0 1px;\" src=\"http://static.grepolis.com/images/game/place/simulator/morale.png\"> Moral: [[MORAL]]%",
			moralInPopup_townInfo_moral_popup: "Diese Moral wirst du vorraussichtlich haben,<br/>wenn du diese Stadt angreiffst.<br/><br/><span style=\"font-size:70%\">Alle Angaben wie üblich ohne Gewähr^^</span><br/>[[BY]]",
//			moralInPopup_townInfo_moral_popup: "Diese Moral wirst du vorraussichtlich haben,<br/>wenn du diese Stadt angreiffst.<br/><br/>Aber wie üblich sind alle Angaben ohne Gewähr,<br/>va. kürzliche Änderungen kennt der<br/>Grex's Moral-Server vl noch nicht drin.[[BY]]",
			
			
			enhancedAttackCounter_simplePopup_attack: "<h4>Du wirst angegriffen!</h4>Auf dich laufen gerade [[COUNT]] Angriffe!<br/>(Letzte Änderung: [[UPDATED]])<br/><br/>",
			enhancedAttackCounter_simplePopup_noattacks: "Du wirst derzeit nicht angegriffen.<br/>(Letzte Änderung: [[UPDATED]])<br/><br/>",
			enhancedAttackCounter_simplePopup_shared: "Klicke hier, um in die<br/> Befehlsübersicht zu gelangen.<br/><br/><br/>Shared Incs:<ul>[[SHARED_ITEMS]]</ul>[[BY]]",
			enhancedAttackCounter_noShared: "<li>Keine Infos von anderen Spieler verfügbar!</li>",
			enhancedAttackCounter_sharedItem: "<li>[[NAME]]: [[COUNT]] ([[DATE]]; <span style=\"font-size:60%\">von [[SYSNAME]]</span>)</li>",
			
			featureList_toggelPopupButton_popup: "Weitere Funktionen",
			
			silverList_listContent: "In diesen Städten eingelagertes Silber: [[SILVER]]",//[[BY]]
			silverList_listPopup: "So viel Silber hast du insgesamt<br/>in diesen Städten eingelagert<br/><br/>Klicke hier, um eine einfache Liste<br/>deiner Höhleninhalte angezeigt zu bekommen.<br/>[[BY]]",
			//silverList_openPopupButton_text: "Höhlenübersicht",
			//silverList_openPopupButton_popup: "Damit bekommst du einen Überblick,<br/>wo wie viel Silber gelagert ist...<br/>[[BY]]",
			silverList_contentMsg_dataLine: "[[NAME]]:   [[VALUE]]",
			silverList_contentMsg_layout: "Silber-Übersicht: \n[[CONTENT]]\n\nInsgesamt eingelagertes Silber: [[OVERALL_SILVER]]",//\n\n\n                 by Faark
			
			newsGui_headline_text: "Infos",
			newsGui_headline_popup: "Infos von einem deiner Scripts<br/>[[BY]]",
			newsGui_item_neverShowAgain: "Nicht wieder anzeigen",
			newsGui_item_close: "Schließen",
			newsGui_item_confirmClose: "Diese Nachricht wirklich nicht mehr anzeigen?",
			
			classicCommandOverview_tabButton: "Classic",
			classicCommandOverview_emptyListItemText: "Es laufen gerade keine Befehle"
		},
		en: {
			townid_text: " (Id: [[TOWNID]])",
			
			toolbuttons_statsPopup: "Opens the players profile<br/>on GrepoStats.com<br/><span style='float:right;color: gray;font-size: 60%;'>by Faark & Marvinho</span>",
			toolbuttons_toolsPopup: "Opens the players profile<br/>on GrepoTools.de<br/><span style='float:right;color: gray;font-size: 60%;'>by Grex & Faark</span>",
			toolbuttons_statsLang: "www",
			
			favorCalc_favorHeadline: "<h4>Favor</h4>",
			favorCalc_defaultItem: "<b>[[GOD]]: [[FAVOR]]</b><br/>-Production per hour: [[OUTPUT]]<br/>-Full in: [[FULL_IN]] hours:minutes<br/>-Full on [[FULL_AT]]",
			favorCalc_fullItem: "<b>[[GOD]]: [[FAVOR]]</b><br/>-Production per hour: [[OUTPUT]]<br/>-Favor is Full!!!",
			
			enhancedSim_stringOutput: "Link containing the sim-data (requires FaarksGrepoTools):\n\n\n[[ADDRESS]]",
			enhancedSim_stringInputHeadline: "Please insert the url containing the sim-data here:",
			enhancedSim_invalidInputString: "Error: That link does not contain sim-data in a valid format!",
			enhancedSim_caputreButtonPopup: "Inserts units into the sim.<br/>[[BY]]",
			
			enhancedSim_swapSideText: "Unit Swapper",
			enhancedSim_swapSidePopup: "Switches the units in the simulator<br/>On the second click, the attacker<br/>will become defender as the old<br/>defener becomes the attacker.<br/><br/>(Deffender <==> Attacker)<br/>[[BY]]",
			
			enhancedSim_getSimUrl_text: "Sim-Data Link",
			enhancedSim_getSimUrl_popup: "Shows a link that includes these<br/>current simulator-settings. When<br/>it is copied and introduced the<br/>simulator will then open with<br/>the old input settings.<br/>[[BY]]",
			
			enhancedSim_openSimLink_text: "Load Sim-Data",
			enhancedSim_openSimLink_popup: "Import sim-data from a link<br/>into the current simulator.<br/>(you can add data from<br/>another data-source)<br/>[[BY]]",
			
			academyTimeleft_resItem: "Resources available in [[IN]]h,<br/>on [[AT]]<br/>",
			academyTimeleft_doneIn: "<h4>[[ORDER]]</h4>Resarch done at [[DONE_AT]]<br/>[[BY]]",
			
			
			walkDuro_fullBy: "<span style='float:right;color: gray;font-size: 50%;'>Way-duration by Grex & Faark</span>",
			walkDuro_onError: "<span style=\"font-size:50%;color: red;\">Error loading way-duration</span>",
			walkDuro_onLoading: "<span style=\"font-size:80%;color: gray;\">Loading way-duration <img src=\"http://grepo.faark.de/faarksGrepoPicSaver/resources/loading.gif\" style=\"width: 10px; height: 10px; display: inline; position: relative; top: 1px;\"/></span>",
			walkDuro_offline: "<span style=\"font-size:50%;color: red;\">Way-duration offline for that server</span>",
			
			quickCast_popup: "The picture shows the God<br/>that this city has elected.<br/><br/>If you click on it, you can <br/>bring up the spell caster<br/>for the current city.<br/>[[BY]]",
			
			extTownlist_errorMsg: "Error getting town-coordinates",
			extTownlist_infoPopup: "Opens the info-popup for the current town.<br/>Usefull to send units or ressources<br/>in your empire.<br/>[[BY]]",
			extTownlist_gotoMap: "Opens the map with that town.<br/><span style=\"text-align:right;float: right; color: gray; font-size: 60%;\">by Faark<br/>prior/similar implemention by Kapo el Ligno</span>",
			extTownlist_gotoOnMap: "Scrolls directly to that town,<br/>without reloading the page.<br/><i style=\"font-size: 40%\">(Only while on map!)</i><br/>[[BY]]",
			
			paginator_defaultPopup: "Go to a specific page...<br/>just slide the bar then<br/>click the checkmark.<br/>[[BY]]",
			paginator_confirmPopup: "Go to the selected page<br/>[[BY]]",
			paginator_cancelPopup: "Cancel and stay on this page<br/>[[BY]]",
			
			gotoLastForumPage_popup: "Go to the last page ([[PAGE]])<br/>[[BY]]",
			
			gotoTempleWhenNoGod_popup: "There is no god set in this town<br/><br/>Click here to go to the temple to choose one...<br>[[BY]]",
			
			getForumLink_popup: "The Link to that Grepo-Forum contains special chars,<br/>that's why you cant post it in e.g. other forums.<br/><br/>Click here to get a link with working chars...<br/>[[BY]]",
			
			
			moralInPopup_loadingMoralPopupLine: "<td><img style=\"width:10px;height:10px;float:left;padding: 2pt 5px 0 2px;\" src=\"http://grepo.faark.de/faarksGrepoPicSaver/resources/loading.gif\"></td><td><span style=\"font-size:80%; color:grey;\">Se încarcă...</span></td>",
			moralInPopup_moralPopupLine: "<td><img style=\"width:14px;height:14px;float:left;padding: 1pt 3px 0 1px;\" src=\"http://static.grepolis.com/images/game/place/simulator/morale.png\"></td><td>Moral: [[MORAL]]%</span></td>",
			moralInPopup_townInfo_error_text: "<img style=\"width:14px;height:14px;float:left;padding: 1pt 3px 0 2px;\" src=\"http://static.grepolis.com/images/game/place/simulator/morale.png\"> Eroare în încărcarea moralului",
			moralInPopup_townInfo_error_popup: "A fost gasită o eroare în încărcarea mesajului<br/>[[ERRORTEXT]]<br/><br/>Observaţie: Nu puteţi calcula moralul în atacul<br/> asupra unui polis părăsit[[BY]]",
			moralInPopup_townInfo_loading_text: "<img style=\"width:14px;height:14px;float:left;padding: 1pt 5px 0 2px;\" src=\"http://grepo.faark.de/faarksGrepoPicSaver/resources/loading.gif\"> Se încarcă moralul...",
			moralInPopup_townInfo_loading_popup: "Moralul se încarcă,<br/>vă rugăm aşteptaţi...[[BY]]",
			moralInPopup_townInfo_moral_text: "<img style=\"width:14px;height:14px;float:left;padding: 1pt 3px 0 2px;\" src=\"http://static.grepolis.com/images/game/place/simulator/morale.png\"> Moral: [[MORAL]]%",
			moralInPopup_townInfo_moral_popup: "Acesta este moralul pe care îl veţi avea când veţi<br/> ataca polisul. Creatorul scriptului nu este responsabil în caz că scriptul <br/> nu a arătat moralul corect.<br/>[[BY]]"
		},
		fr: {
			townid_text: " (Id: [[TOWNID]])",

			toolbuttons_statsPopup: "Afficher le profil du joueur<br/>sur GrepoStats.com<br/><span style='float:right;color: gray;font-size: 60%;'>par Faark & Marvinho</span>",
			toolbuttons_toolsPopup: "Afficher le profil du joueur<br/>sur GrepoTools.de<br/><span style='float:right;color: gray;font-size: 60%;'>par Grex & Faark</span>",
			toolbuttons_statsLang: "fr",

			favorCalc_favorHeadline: "<h4>Faveur</h4>",
			favorCalc_defaultItem: "<b>[[GOD]]: [[FAVOR]]</b><br/>-Production horaire: [[OUTPUT]]<br/>-Plein dans: [[FULL_IN]] heures:minutes<br/>-Plein le [[FULL_AT]]",
			favorCalc_fullItem: "<b>[[GOD]]: [[FAVOR]]</b><br/>-Production horaire: [[OUTPUT]]<br/>-Faveur Maximum!!!",

			enhancedSim_stringOutput: "Lien contenant les données actuelles du simulateur  (nécessite FaarksGrepoTools):\n\n\n[[ADDRESS]]",
			enhancedSim_stringInputHeadline: "Coller le lien des données du simulateur:",
			enhancedSim_invalidInputString: "Erreur: Le lien ne comporte pas des données valide!",
			enhancedSim_caputreButtonPopup: "Insérer les unités dans le simulateur.<br/>[[BY]]",

			enhancedSim_swapSideText: "Echanger",
			enhancedSim_swapSidePopup: "Inverse la place des unités dans le simulateur.<br/>\
										En cliquant l'attaquant devient le défenseur et<br/>\
										le défenseur devient l'attaquant.<br/><br/>\
										(Defenseur <==> Attaquant)<br/>[[BY]]",

			enhancedSim_getSimUrl_text: "Sauver",
			enhancedSim_getSimUrl_popup: "Créé un lien contenant les donnés du simulateur.<br/>\
										  Ce lien est ensuite collé dans le champ \"Charger\"<br/>\
										  il affichera les données actuelle du simulateur<br/>\
										  gardé en mémoire.<br/>[[BY]]",

			enhancedSim_openSimLink_text: "Charger",
			enhancedSim_openSimLink_popup: "Importer les données du simulateur<br/>\
											à partir du lien précédemment créé.<br/>\
											(vous pouvez insérer des données <br/>\
											provenant d'une autre source)<br/>[[BY]]",

			academyTimeleft_resItem: "Ressources disponible dans : [[IN]] h,<br/>le : [[AT]]<br/>",
			academyTimeleft_doneIn: "<h4>[[ORDER]]</h4>Recherche terminé le : [[DONE_AT]]<br/>[[BY]]",


			walkDuro_fullBy: "<span style='float:right;color: gray;font-size: 50%;'>Temps de route. par Grex & Faark</span>",
			walkDuro_onError: "<span style=\"font-size:50%;color: red;\">Erreur de chargement du temps de route</span>",
			walkDuro_onLoading: "<span style=\"font-size:80%;color: gray;\">Chargement du temps de route<img src=\"http://grepo.faark.de/faarksGrepoPicSaver/resources/loading.gif\" style=\"width: 10px; height: 10px; display: inline; position: relative; top: 1px;\"/></span>",
			walkDuro_offline: "<span style=\"font-size:50%;color: red;\">Temps de route desactivé pour ce monde</span>",

			quickCast_popup: "Affiche la divinité vénéré par la ville.<br/><br/>\
							  Cliquez et lancez les forces divine de <br/>\
							  votre choix sur votre ville.<br/>[[BY]]",

			extTownlist_errorMsg: "Erreur de coordonnées",
			extTownlist_infoPopup: "Afficher les informations de cette ville.<br/>\
									Vous pouvez envoyer des ressources où des<br/>\
									unités sur toutes les villes de l'empire.<br/>[[BY]]",
			extTownlist_gotoMap: "Centrer cette ville sur la carte.<br/><span style=\"text-align:right;float: right; color: gray; font-size: 60%;\">par Faark<br/>Version originale par Kapo el Ligno</span>",
			extTownlist_gotoOnMap: "Accédez directement à cette ville,<br/>\
									sans avoir à recharger votre page.<br/><i style=\"font-size: 40%\">(Uniquement sur la carte!)</i><br/>[[BY]]",

			paginator_defaultPopup: "Se rendre à une page précise...<br/>\
									 Faites glisser le curseur jusqu'a<br/>\
									 la page voulu et confirmez.<br/>[[BY]]",
			paginator_confirmPopup: "Confirmer<br/>[[BY]]",
			paginator_cancelPopup: "Annuler<br/>[[BY]]",

			gotoLastForumPage_popup: "Confirmer ([[PAGE]])<br/>[[BY]]",

			gotoTempleWhenNoGod_popup: "Cette ville ne vénère aucun dieu. <br/><br/>\
										Cliquez ici pour vous rendre dans <BR/>\
										le Temple et choisir une divinité.<br>[[BY]]",

			getForumLink_popup: "Ce lien, déstiné au forum interne de Grépolis,<br/>\
								 contient des caractères spéciaux non valide.<br/><br/>\
								 Cliquez ici pour obtenir un lien valide<br/>[[BY]]",


			moralInPopup_loadingMoralPopupLine: "<td><img style=\"width:10px;height:10px;float:left;padding: 2pt 5px 0 2px;\" src=\"http://grepo.faark.de/faarksGrepoPicSaver/resources/loading.gif\"></td><td><span style=\"font-size:80%; color:grey;\">Charger le Moral...</span></td>",
			moralInPopup_moralPopupLine: "<td><img style=\"width:14px;height:14px;float:left;padding: 1pt 3px 0 1px;\" src=\"http://static.grepolis.com/images/game/place/simulator/morale.png\"></td><td>Moral: [[MORAL]]%</span></td>",
			moralInPopup_townInfo_error_text: "<img style=\"width:14px;height:14px;float:left;padding: 1pt 3px 0 2px;\" src=\"http://static.grepolis.com/images/game/place/simulator/morale.png\"> Erreur de chargement :(",
			moralInPopup_townInfo_error_popup: "Une erreur est survenue lors du chargement:<br/>[[ERRORTEXT]]<br/><br/>Désolé :([[BY]]",
			moralInPopup_townInfo_loading_text: "<img style=\"width:14px;height:14px;float:left;padding: 1pt 5px 0 2px;\" src=\"http://grepo.faark.de/faarksGrepoPicSaver/resources/loading.gif\"> Charger le Moral...",
			moralInPopup_townInfo_loading_popup: "Le moral est calculé à partir d'un serveur externe,<br/>Veuillez patienter...[[BY]]",
			moralInPopup_townInfo_moral_text: "<img style=\"width:14px;height:14px;float:left;padding: 1pt 3px 0 2px;\" src=\"http://static.grepolis.com/images/game/place/simulator/morale.png\"> Moral: [[MORAL]]%",
			moralInPopup_townInfo_moral_popup: "Ceci n'est qu'une estimation du moral donné à titre indicatif.<br/>\
												Nous ne pouvons être tenus pour responsable de l'estimation! ;)<br/>\
												Tout changement au cours de l'attaque ne sera évidemment<br/>\
												pas prise en compte par le simulateur.[[BY]]"
		},
		ro: {
			townid_text: " (Id: [[TOWNID]])",
			
			toolbuttons_statsPopup: "Deschide profil acestui<br/>Jucatorii GrepoStats.com<br/><span style='float:right;color: gray;font-size: 60%;'>by Faark & Marvinho</span>",
			toolbuttons_toolsPopup: "Deschide profil acestui<br/>Jucatorii GrepoTools.de<br/><span style='float:right;color: gray;font-size: 60%;'>by Grex & Faark</span>",
			toolbuttons_statsLang: "ro",
			
			favorCalc_favorHeadline: "<h4>Favor</h4>",
			favorCalc_defaultItem: "<b>[[GOD]]: [[FAVOR]]</b><br/>-  production per hour: [[OUTPUT]]<br/>-  in ~[[FULL_IN]]h full<br/>-  full on [[FULL_AT]]",
			favorCalc_fullItem: "<b>[[GOD]]: [[FAVOR]]</b><br/>-  production per hour: [[OUTPUT]]<br/>-  Cant store more favor!!!",
			
			enhancedSim_stringOutput: "Link la datele stocate Sim (necesita FaarksGrepoTools):\n\n\n[[ADDRESS]]",
			enhancedSim_stringInputHeadline: "Introduceti link-ul primit:",
			enhancedSim_invalidInputString: "Eroare: URL-ul nu contine date Sim intr-un format valabil !",
			enhancedSim_caputreButtonPopup: "Trupe in Sim inserare<br/>[[BY]]",
			
			enhancedSim_swapSideText: "Interschimba unitati",
			enhancedSim_swapSidePopup: "Introduce unitatile in simulator <br/>La al doilea click, din atacator vor deveni aparator pentru ca  <br/>acesta din urma sa-si apere teritoiul.<br/>[[BY]]",
			
			enhancedSim_getSimUrl_text: "Link-ul pentru date Sim",
			enhancedSim_getSimUrl_popup: "Va arata un link. Cand este introdus, simulatorul <br/>se deschide cu aceste setari.<br/>[[BY]]",
			
			enhancedSim_openSimLink_text: "Configurare cu date Sim",
			enhancedSim_openSimLink_popup: "Importurile unui Sim-Data-Link in simulatorul curent.<br/> Introduceti aici link-ul primit si configurarea va fi incarcata.<br/>[[BY]]",
			
			academyTimeleft_resItem: "Resources available in [[IN]]h,<br/>on [[AT]]<br/>",
			academyTimeleft_doneIn: "<h4>[[ORDER]]</h4>Resarch done at [[DONE_AT]]<br/>[[BY]]",
			
			
			walkDuro_fullBy: "<span style='float:right;color: gray;font-size: 50%;'>Way-duration by Grex & Faark</span>",
			walkDuro_onError: "<span style=\"font-size:50%;color: red;\">Error loading way-duration</span>",
			walkDuro_onLoading: "<span style=\"font-size:80%;color: gray;\">Loading way-duration <img src=\"http://grepo.faark.de/faarksGrepoPicSaver/resources/loading.gif\" style=\"width: 10px; height: 10px; display: inline; position: relative; top: 1px;\"/></span>",
			
			quickCast_popup: "That pic shows the god, the citizens<br/>in that town are praying for.<br/><br/>Click on it to cast on that town<br/>[[BY]]",
			
			extTownlist_errorMsg: "Error getting town-coordinates",
			extTownlist_infoPopup: "Opens the info-popup for the current town.<br/>Usefull to send units or ressources<br/>in your empire.<br/>[[BY]]",
			extTownlist_gotoMap: "Opens the map with that town.<br/><span style=\"text-align:right;float: right; color: gray; font-size: 60%;\">by Faark<br/>prior/similar implemention by Kapo el Ligno</span>",
			extTownlist_gotoOnMap: "Scrolls directly to that town,<br/>without reloading the page.<br/><i style=\"font-size: 40%\">(Only while on map!)</i><br/>[[BY]]",
			
			paginator_defaultPopup: "Du-te direct la o pagina,<br/>click aici pentru a da un<br/>und apasati Enter.<br/>[[BY]]",
			paginator_confirmPopup: "Du-te la pagina selectata<br/>[[BY]]",
			paginator_cancelPopup: "Anulare-<br/>Introduceti din nou pagina<br/>[[BY]]",
			
			gotoLastForumPage_popup: "Go to last page ([[PAGE]])<br/>[[BY]]"
		}
	});
	
	
	
	
	
	var faarksGrepoTools = {
		/* util */
		currentWorld: "",
		currentFolder: "",
		currentTownName: "",
		currentLang: "",
		currentAction: "",
		internalUtilityData: {},
		getString: function(index,data){
			return faarksTextSelection.get("fgt",index,data);
		},
		objectHasPropertys: function( o ){
			for( var i in o )
				return true;
			return false;
		},
		humanReadableDate: function(timestamp, lang){
	/*
	var faarksGrepoTools.humanReadableDate_Strings = {
		"de": {
	//		format: "{0} um {1}",
			today: "heute",
			tomorrow: "morgen",
			day0: "Montag"
		},
		"en": {
			today: "today",
			tomorrow: "tomorrow"
		}
	}
	*/
			return timestamp.toLocaleString();
		},
		getParams: function( fromLink ){
			return faarksUtility.getParams( fromLink );
		},
		getParam: function(name, fromLink, def){
			return faarksUtility.getParam( name, fromLink, def );
		},
		uidgen: function( length ){
			return faarksUtility.uid( length );
		},
		setInterrupt: function( oldObject, oldMethodName, newObject, newMethod, runBeforeInterrupt, justOnce ){
			var oldMethod = oldObject[oldMethodName];
			oldObject[oldMethodName] = function(){
				var r=undefined,isEx=false;
				if( runBeforeInterrupt )
					fer_go( newMethod, newObject, arguments );
				try{
					r = oldMethod.apply( this, arguments );
				}catch(err){
					r = err;
					isEx = true;
				}
				if( !runBeforeInterrupt )
					fer_go( newMethod, newObject, arguments );
				if( justOnce ){
					oldObject[oldMethodName] = oldMethod;
				}
				if( isEx )
					throw r;
				return r;
			}
		},
		isTownLinkElement: function( element ){//returns townid or null
			var d = $(element);
			if( d.length > 0 ){
				d = d[0].attributes["onclick"] ? d[0].attributes["onclick"].value : "";
				d = /return Layout\.townLinkClicked\(this\, ?([0-9]+)\, ?([^\,]+), ?([^\)]+)\)/.exec( d );
				if( d && !isNaN( Number( d[1] ) ) ){
					return Number(d[1]);
				}
			}
			return null;
		},
		createDefaultButton: function( options ){
			var config = {
				text: null,
				popup: null,
				click: null,//function(){},
				id: null,
				"class": null,
				create_html: false
			};
			if( typeof arguments[0] === "string" ){
				config.text = arguments[0];
				if( typeof arguments[1] === "string" ){
					config.id = arguments[1];
				}
			}else{
				config = $.extend( config, options );
			}
			var btn = ('<a '+(config.id?('id="'+config.id+'" '):'')+' href="#" style="display:inline-block;" class="'+(config["class"]?(config["class"]+" "):"")+'button"><span class="left"><span class="right"><span class="middle">'+config.text+'</span></span></span><span style="clear:both;"></span></a>');
			if( config.create_html )
				return btn;
			btn = $(btn);
			if( config.click )
				btn.click( function(){ var result = config.click.apply(this,arguments);return(typeof result==="undefined")?false:result; });
			if( config.popup )
				btn.mousePopup( new MousePopup( config.popup ) );
					//"<a id=\"faarksGrepoSwapSimSides_button\" href=\"#\" style=\"display: inline-block; margin: 0px 0px 0px 3px;\" class=\"button\"><span class=\"left\"></span><span class=\"middle\">"+fgt.getString("enhancedSim_swapSideText")+"</span><span class=\"right\"></span><span style=\"clear: both;\"></span></a>");
			return btn;
		},
		createWindow: function( options ){
			var defaultOptions = {
				onclose: null, //function
				hasCloseButton: true,
				visibleAfterCreation: true,
				id: null,
				"class": null,
				content_id: null,
				content_class: null,
				boxElement: null,
				contentElement: null,
				defaultParent: "#content",
				movable: true
			};
			options = $.extend( {}, defaultOptions, options );
			if( $("#fgt_window_styles").length <= 0 ){
				$('head').append("<style id=\"fgt_window_styles\" type=\"text/css\">\
				.fgt_window_object{\
					display: none;\
					text-align: left;\
					z-index: 99;\
					height: 404px;\
					width: 520px;\
					position: absolute;\
					left:130px;\
					top:45.5px;\
				}\
				.fgt_window_boxborder_top{\
					background-image:url(\"http://static.grepolis.com/images/game/new_window/topbottom.png\");\
					background-repeat:no-repeat;\
					height:12px;\
					position:absolute;\
					width:520px;\
				}\
				.fgt_window_boxborder_left{\
					background-image:url(\"http://static.grepolis.com/images/game/new_window/leftright.png\");\
					background-repeat:no-repeat;\
					height:380px;\
					position:absolute;\
					top:12px;\
					width:12px;\
				}\
				.fgt_window_boxborder_right{\
					background-image:url(\"http://static.grepolis.com/images/game/new_window/leftright.png\");\
					background-position:-12px 0;\
					background-repeat:no-repeat;\
					height:380px;\
					position:absolute;\
					right:0;\
					top:12px;\
					width:12px;\
				}\
				.fgt_window_boxborder_bottom{\
					background-image:url(\"http://static.grepolis.com/images/game/new_window/topbottom.png\");\
					background-position:0 -12px;\
					background-repeat:no-repeat;\
					bottom:0;\
					height:12px;\
					position:absolute;\
					width:520px;\
				}\
				.fgt_window_contentbox {\
					background:url(\"http://static.grepolis.com/images/game/new_window/bg.png\") repeat scroll 0 0 transparent;\
					height:360px;\
					margin:12px;\
					padding:10px;\
					position:absolute;\
					width:476px;\
				}\
				.fgt_window_contentbox .cancel {\
					position:absolute;\
					right:15px;\
					z-index:2;\
				}\
			</style>");
			}
			options.boxElement = $("<div"+(options.id?' id="'+options.id+'"':"")+" class=\"fgt_window_object\">\
				<div class=\"fgt_window_boxborder_top\"></div>\
				<div class=\"fgt_window_boxborder_left\"></div>\
				<div class=\"fgt_window_boxborder_right\"></div>\
				<div class=\"fgt_window_boxborder_bottom\"></div>\
				<div class=\"fgt_window_contentbox\">\
				</div>\
			</div>");
			if( options["class"] ){
				options.boxElement.addClass(options["class"]);
			}
			options.contentElement = options.boxElement.find(".fgt_window_contentbox");
			if( options.content_id ){
				options.contentElement.attr("id", options.content_id );
			}
			if( options.content_class ){
				options.contentElement.addClass( options.content_class );
			}
			if( options.hasCloseButton ){
				var clBtn = $('<a href="#" class="cancel"></a>');
				clBtn.click(fer_cf(function(){
					if( options.onclose ){
						fer_call( options.onclose, this, arguments );
					}
					options.boxElement.remove();
					return false;
				}));
				options.contentElement.append( clBtn );
			}
			$(options.defaultParent).append( options.boxElement );
			if( options.visibleAfterCreation ){
				options.boxElement.show();
			}
			if( options.movable ){
				this.movablePopups.makeWindowMovable( options.boxElement, { cancel: ".fgt_window_contentbox a, .fgt_window_contentbox div" } );
			}
			return options;
		},
		createPopup: function( options ){
			var conf = $.extend( {
				width: null,
				height: null,
				top: null,
				left: null,
				visible: true,
				id: null,
				"class": null,
				css: {
					"z-index": 99,
					"position": "absolute"
				},
				content_width: null,
				content_height: null,
				content_top: null,
				content_left: null,
				content_id: null,
				content_class: null,
				content_css: {},
				under: null,
				on_create: function(newEl,newContentEl,options){}, //function, wird aufgerufen, wenn das el neu erstellt wurde
				no_update: false
			}, options );
			
			var element,content_element,old_element = null;
			if( conf.id )
				old_element = $("#"+conf.id);
			if( conf.content_id )
				old_element = $("#"+conf.content_id).parents(".popup:first");
			if( old_element && (old_element.length > 0) && conf.no_update )
				return old_element;
			if( old_element.length > 0 ){
				element = old_element;
				content_element = element.find(".popup_middle_middle");
			}else{
				var element = $('<table cellspacing="0" cellpadding="0" class="popup"><tbody>'+
							'	<tr class="popup_top"><td class="popup_top_left"></td><td class="popup_top_middle"></td><td class="popup_top_right"></td></tr>'+
							'	<tr><td class="popup_middle_left"></td><td class="popup_middle_middle"></td><td class="popup_middle_right"></td></tr>'+
							'	<tr class="popup_bottom"><td class="popup_bottom_left"></td><td class="popup_bottom_middle"></td><td class="popup_bottom_right"></td></tr>'+
							'</tbody></table>');
				content_element = element.find(".popup_middle_middle");
				
				if( conf.id )
					element.attr("id",conf.id);
				if( conf["class"] )
					element.addClass(conf["class"]);
				if( conf.content_id )
					content_element.attr("id",conf.content_id);
				if( conf.content_class )
					content_element.addClass(conf.content_class);
				
				
				$("body").append( element );
				
				conf.on_create( element, content_element, conf );
			}
			if( (!old_element || (old_element.length <= 0)) || !conf.no_update ){
				var do_css = function( el, prop, val ){
					if( (typeof val !== "undefined") && (val !== null) )
						el.css( prop, typeof val == "number" ? (val+"px") : val );
				}
				do_css( element, "width", conf.width );
				do_css( element, "height", conf.height );
				do_css( element, "top", conf.top );
				do_css( element, "left", conf.left );
				
				if( !conf.visible )
					element.css( "display", "none" );
				
				if( conf.css )
					element.css( conf.css );
				
				do_css( content_element, "width", conf.content_width );
				do_css( content_element, "height", conf.content_height );
				do_css( content_element, "top", conf.content_top );
				do_css( content_element, "left", conf.content_left );
				
				if( conf.content_css )
					content_element.css( conf.content_css );
				
				var under = $(conf.under);
				if( under.length > 0 ){
					var loc = under.offset();
					element.css({
						"top": loc.top + under.height(),
						"left": loc.left
					});
				}
				
			}
			return element;
		},
		getTownlist: function( options ){//or getTownlist( [groupId], [onLoadedCallback] )
			/*	what we do:
				1. normalize input to options
				2. set cache stuff
				3. check fulltowns required & load data (use restart after load
				4. check towngroup requ & load...
				
			*/
			var conf = {
				group_id: 0,
				on_loaded: function(){}, //function(data, options){}
				listener_id: null, //only 1 listener per id is saved, so u can call getTownlist() multiple times and get only called once, when the data is loaded
				retry_on_error: true,
				minimal_output: false
			};
			if( typeof arguments[0] === "function" ){
				conf.on_loaded = arguments[0];
			}else if( !isNaN( arguments[0] ) ){
				conf.group_id = Number( arguments[0] );
				if( typeof arguments[1] === "function" ){
					conf.on_loaded = arguments[1];
				}
			}else{
				conf = $.extend( conf, options );
			}
			
			
			
			if( !this.internalUtilityData.town_list_cache ){
				this.internalUtilityData.town_list_cache = {
					listeners: {},
					id_listeners: {}
				};
			}
			
			var get_all_listener = fer_cf( function( group_id ){
				var listeners = [];
				if( this.internalUtilityData.town_list_cache.listeners[group_id] ){
					listeners = this.internalUtilityData.town_list_cache.listeners[group_id];
					delete this.internalUtilityData.town_list_cache.listeners[group_id];
				}
				if( this.internalUtilityData.town_list_cache.id_listeners[group_id] ){
					for( var i in this.internalUtilityData.town_list_cache.id_listeners[group_id] ){
						listeners.push ( this.internalUtilityData.town_list_cache.id_listeners[group_id][i] );
					}
					delete this.internalUtilityData.town_list_cache.id_listeners[group_id];
				}
				return listeners;
			}, this );
			var incomplete_data_callback = fer_cf( function( group_id ){
				var listeners = get_all_listener( group_id );
				for( var i = 0; i < listeners.length; i++ ){
					var data = this.getTownlist( listeners[i] );
					if( data )
						fer_call( listeners[i].on_loaded, listeners[i], [ data, listeners[i] ] );
				}
			}, this );
			var on_error_after_wait_cb = function( group_id ){
				this.internalUtilityData.town_list_cache[ group_id ] = null;
				incomplete_data_callback( group_id );
			}
			var on_error_fnc =  fer_cf( function( group_id ){
				var listeners = get_all_listener( group_id );
				var gotRem = false;
				for( var i = 0; i < listeners.length; i++ ){
					if( listeners[i].retry_on_error ){
						add_listener( group_id, listeners[i] );
						gotRem = true;
					}else
						fer_call( listeners[i].on_loaded, listeners[i], [ null, listeners[i] ] );
				}
				window.setTimeout( fer_cf( on_error_after_wait_cb, this, [ group_id ]), 1000 );
			}, this );
			var add_listener = fer_cf( function( group_id, conf_data ){
				if( !conf_data )
					conf_data = conf;
				if( conf_data.listener_id ){
					if( !this.internalUtilityData.town_list_cache.id_listeners[group_id] )
						this.internalUtilityData.town_list_cache.id_listeners[group_id] = {};
					this.internalUtilityData.town_list_cache.id_listeners[group_id][conf_data.listener_id] = conf_data;
				}else{
					if( !this.internalUtilityData.town_list_cache.listeners[group_id] )
						this.internalUtilityData.town_list_cache.listeners[group_id] = [];
					this.internalUtilityData.town_list_cache.listeners[group_id].push( conf_data );
				}
			}, this );
			
			if( (!conf.minimal_output || (conf.group_id == 0) ) && !this.internalUtilityData.town_list_cache[0] ){
				add_listener(0);
				if( this.internalUtilityData.town_list_cache[0] !== false ){
					this.internalUtilityData.town_list_cache[0] = false;
					$.ajax({
						url:url("town_group_overviews","get_towns_of_active_town_group",{json:$.toJSON({ current_url: document.location.href })}),
						dataType: "json",
						success: fer_cf( function( data ){
							var result;
							var tld = faarksUtility.getDomByHtml( data.list_html );
							if( tld.length > 0 ){
								result = [];
								var tel = tld.find("a");
								for( var i = 0; i < tel.length; i++ ){
									var t = $(tel[i]);
									result.push({
										name: t.text(),
										id: faarksUtility.getParam( "town_id", t.attr("href"), -1 )
									});
								}
								this.internalUtilityData.town_list_cache[0] = result;
								incomplete_data_callback( 0 );
							}else
								on_error_fnc( 0 );
						}, this ),
						error: fer_cf( function(xhr, text, error ){
							on_error_fnc( 0 );
						}, this ),
					});
				}
				return null;
			}
			
			if( (conf.group_id != 0) && !this.internalUtilityData.town_list_cache[conf.group_id] ){
				add_listener(conf.group_id);
				if( this.internalUtilityData.town_list_cache[conf.group_id] !== false ){
					$.ajax({
						url:url("town_group_overviews","get_town_ids_by_group",{ json: $.toJSON({group_id:conf.group_id}) }),
						dataType: "json",
						success: fer_cf( function( data ){
							if( data && (data.length > 0) ){
								this.internalUtilityData.town_list_cache[conf.group_id] = data;
								incomplete_data_callback( conf.group_id );
							}else
								on_error_fnc( conf.group_id );
						}, this ),
						error: fer_cf( function(xhr, text, error ){
							on_error_fnc( conf.group_id );
						}, this ),
					})
				}
				return null;
			}
			
			
			if( conf.minimal_output ){
				var result = [];
				for( var i = 0; i < this.internalUtilityData.town_list_cache[conf.group_id].length; i++ ){
					result.push( this.internalUtilityData.town_list_cache[conf.group_id][i].id );
				}
				return result;
			}else{
				if( conf.group_id == 0 ){
					return $.extend( true, [], this.internalUtilityData.town_list_cache[0] )
				}else{
					var result = [];
					for( var i = 0; i < this.internalUtilityData.town_list_cache[conf.group_id].length; i++ ){
						var id = this.internalUtilityData.town_list_cache[conf.group_id][i].id;
						var tdata = { id: i, name: ("UKN/ID"+id) };
						for( var v = 0; v < this.internalUtilityData.town_list_cache[0].length; v++ ){
							if( id == this.internalUtilityData.town_list_cache[0][v].id ){
								tdata = this.internalUtilityData.town_list_cache[0][v];
							}
						}
						result.push( tdata );
					}
					return result;
				}
			}
		},
		getTowngroups: function( onLoadedCallback, dontRestartOnError ){
			if( this.internalUtilityData.town_groups_cache ){
				return $.extend( true, [], this.internalUtilityData.town_groups_cache );
			}
			if( this.internalUtilityData.town_groups_cache === false ){
				return; // loading
			}
			
			$.ajax({
				url: url( "town_group_overviews", "get_selectable_town_groups" ),
				success: fer_cf( function( data, textStatus, xhr ){
					if( data && data.town_groups ){
						this.internalUtilityData.town_groups_cache = data.town_groups;
						if( onLoadedCallback ){
							fer_call( onLoadedCallback, null, [ data.town_groups ] );
						}
					}else if( !dontRestartOnError ){
						window.setTimeout( fer_cf( this.getTowngroups, this, [ onLoadedCallback, dontRestartOnError ] ), 1000 );
					}
				}, this ),
				error: fer_cf( function( xhr, textStatus, errorThrown ){
					this.internalUtilityData.town_groups_cache = null;
					if( !dontRestartOnError ){
						window.setTimeout( fer_cf( this.getTowngroups, this, [ onLoadedCallback, dontRestartOnError ] ), 1000 );
					}
				}, this ),
				dataType: "json"
			});
		},
		loadCaptcha: function( options ){
			var opt = $.extend( {
				cancel: ".fgt_miniDialog_main_area",
				on_cancel: new Function(),
				on_success: new Function(),
				on_fail: function(){ HumanMessage.error( fgt.getString("loadCaptcha_wrongInputMsg") ); },
				title: fgt.getString("loadCaptcha_default_title"),
				message: fgt.getString("loadCaptcha_default_message"),
				popup: fgt.getString("loadCaptcha_default_popup"),
				value: faarksUtility.uid( 4 ).toUpperCase()
			}, options );
			if( !this.internalUtilityData.loadCaptcha ){
				$('head').append("<style type=\"text/css\">\
.fgt_miniDialog { display: block; position: absolute; top: 100px; left: 190px; width: 380px; height: 134px; background-image: url(http://static.grepolis.com/images/game/popup/reduce_building_time.png); z-index: 300; }\
.fgt_miniDialog h3 { text-align: center; margin: 15px 0 10px 0; }\
.fgt_miniDialog .fgt_miniDialog_main_area { margin: 0 20px; }\
.fgt_miniDialog_shortTextBox { background:url(\"http://static.grepolis.com/images/game/towninfo/unit_input.png\") no-repeat scroll 0 0 transparent; border:0 none; height:18px; left:3px; padding:3px 3px 3px 3px; position:relative; text-align:center; width:40px; }\
.fgt_miniDialog_overlayBox { display: inline-block; position: relative; }\
.fgt_miniDialog_overlayBox div{ display: block; position: absolute; top: 0pt; left: 0pt; width: 100%; height: 100%; }\
.fgt_miniDialog_buttons { float:right; }\
.fgt_miniDialog_text { margin-bottom: 7px; }\
.fgt_miniDialog .button { cursor: pointer; display: inline; }\
.fgt_miniDialog .button .middle { min-width: 0; }\
\n");
				this.internalUtilityData.loadCaptcha = "initied";
			}
			var el = $("<div class=\"fgt_miniDialog\">\
	<h3 class=\"fgt_miniDialog_title\">"+opt.title+"</h3>\
	<div class=\"fgt_miniDialog_main_area\">\
		<p class=\"fgt_miniDialog_text\">"+opt.message+"</p>\
		<div style=\"margin-left: 35px;\">\
			<div class=\"fgt_miniDialog_overlayBox\">\
				<input type=\"text\" class=\"fgt_miniDialog_shortTextBox\" value=\""+opt.value+"\"/>\
				<div></div>\
			</div>\
			 =&gt; \
			<input type=\"text\" class=\"fgt_miniDialog_shortTextBox fgt_miniDialog_resultBox\"/>\
			<div class=\"fgt_miniDialog_buttons\">\
				<a onclick=\"void(0)\" href=\"#\" class=\"button fgt_miniDialog_btnOk\">\
					<span class=\"left\"><span class=\"right\"><span class=\"middle\">"+fgt.getString("loadCaptcha_buttonText_ok")+"</span></span></span>\
					<span style=\"clear: both;\"></span>\
				</a>\
				<div style=\"float: left; width: 10px; height: 10px;\"></div>\
				<a onclick=\"void(0)\" href=\"#\" class=\"button fgt_miniDialog_btnCancel\">\
					<span class=\"left\"><span class=\"right\"><span class=\"middle\">"+fgt.getString("loadCaptcha_buttonText_cancel")+"</span></span></span>\
					<span style=\"clear: both;\"></span>\
				</a>\
			</div>\
			<div style=\"clear: both;\"></div>\
		</div>\
	</div>\
</div>");
			el.find(".fgt_miniDialog_main_area").mousePopup( new MousePopup( opt.popup ) );
			el.find(".fgt_miniDialog_btnOk").click( function(){
				if( el.find(".fgt_miniDialog_resultBox").val().toUpperCase() == opt.value ){
					fer_call( opt.on_success );
					el.remove();
				}else{
					fer_call( opt.on_fail );
				}
				return false;
			} );
			el.find(".fgt_miniDialog_btnCancel").click( function(){
				fer_call( opt.on_cancel );
				el.remove();
				return false;
			} );
			$("#content").append( el );
			faarksGrepoTools.movablePopups.makeWindowMovable( el, { cancel: opt.cancel } );
		},
		confirm: function( options ){
			options = $.extend({
				text: null,
				on_success: function(){}
			},options);
			options.on_success();
		},
		curtain: function( element ){
			element = $(element);
			
			var curt = $("#faark_curtain");
			if( curt.length <= 0 ){
				$("body").append('<div id="faark_curtain" style="display: block; height: 100%; left: 0; position: fixed; top: 0; width: 100%; z-index: 30000; opacity: 0.4; background-image:url(http://grepo.faark.de/faarksGrepoTools/resources/curtain_bg.png);"></div>');
			}
			if( !this.internalUtilityData.curt_elements )
				this.internalUtilityData.curt_elements = [];
			this.internalUtilityData.curt_elements.push( element );
			var oldZ = element.css("z-index");
			element.css("z-index",30001);
			
			return fer_cf( function(){//undofunc
				element.css("z-index",oldZ);
				for( var i = this.internalUtilityData.curt_elements.length - 1; i >= 0; i-- ){
					var e = this.internalUtilityData.curt_elements[i];
					if( (e === element) || !e.is(":visible") ){
						this.internalUtilityData.curt_elements.splice( i, 1 );
					}
				}
				if( this.internalUtilityData.curt_elements.length <= 0 ){
					$("#faark_curtain").remove();
				}
			}, this );
		},
		
		/* modules */
		villageIdToTownInfo: { // add village-id in towninfo-popups
			oldInit: null,
			mousePopup: new MousePopup( faarksTextSelection.get("sys","by",{what:"VillageId "})),
			drawFunc: function () {
				if (($('#townWindow #towninfo_towninfo').length === 1)&&($("#faarksGrepoTools_addedTownId").length === 0)) {
					$('#townWindow #towninfo_towninfo .game_header').append("<span id=\"faarksGrepoTools_addedTownId\">"+fgt.getString("townid_text",{townid: TownInfo.town_id})+"</span>");
					$("#faarksGrepoTools_addedTownId").mousePopup( this.mousePopup );
				}
			},
			init: function(){
				if( (typeof TownInfo === 'object') && (typeof TownInfo.init === 'function') ){
					$('body').ajaxComplete( fer_cf( this.drawFunc, this ) );
				}
			}
		},
		toolButtonsInPlayerProfile: { // Grepo-/GameStats-Button in PlayerProfile...
			playerGrepoStats_toolTip: new MousePopup( faarksTextSelection.get("fgt","toolbuttons_statsPopup") ),
			playerGrepoTools_toolTip: new MousePopup( faarksTextSelection.get("fgt","toolbuttons_toolsPopup") ),
			drawInPopup: function(){
				var el = $('#townWindow .list_item_left a');
				if( el.length === 1 ){
					var id = /player_id=([0-9]+)/.exec(el.attr("href"))[1];
					var el = el.parents("li").find('.list_item_right');
					if( (el.length === 1) && ($("#townWindow .faarksGrepoTools_shownInGrepoStatsButton").length === 0 ) ){
						var no = $( "<a class=\"faarksGrepoTools_shownInGrepoStatsButton faarksGrepoTools_playerButton\" href=\"http://"+fgt.getString("toolbuttons_statsLang")+".grepostats.com/world/"+faarksGrepoTools.currentWorld+"/player/"+id+"\" target=\"_blank\"></a>" );
						var no2 = $( "<a class=\"faarksGrepoTools_shownInGrepoGameStatsButton faarksGrepoTools_playerButton\" href=\"http://www.grepotools.de/"+faarksGrepoTools.currentWorld+"/details/player/"+id+"\" target=\"_blank\"></a>" );
						el.append( no ).append( no2 );
						el.css( "width", 130 );
						no.mousePopup( this.playerGrepoStats_toolTip );
						no2.mousePopup( this.playerGrepoTools_toolTip );
					}
				}
			},
			initCss: function(){
				$('head').append("<style type=\"text/css\">\
				.faarksGrepoTools_playerButton{\
					margin-left: 3px;\
					position: relative;\
					height: 23px;\
					width: 26px;\
					float: left;\
				}\
				.faarksGrepoTools_shownInGrepoStatsButton{\
					top: 1px;\
					left: 1px;\
					background:transparent url(http://grepo.faark.de/faarksGrepoTools/resources/view_on_grepostats.png) no-repeat scroll 0 0;\
				}\
				.faarksGrepoTools_shownInGrepoStatsButton:hover{\
					background:transparent url(http://grepo.faark.de/faarksGrepoTools/resources/view_on_grepostats_hover.png) no-repeat scroll 0 0;\
				}\
				.faarksGrepoTools_shownInGrepoGameStatsButton{\
					background:transparent url(http://grepo.faark.de/faarksGrepoTools/resources/view_on_gamestats.png) no-repeat scroll 0 0;\
				}\
				.faarksGrepoTools_shownInGrepoGameStatsButton:hover{\
					background:transparent url(http://grepo.faark.de/faarksGrepoTools/resources/view_on_gamestats_hover.png) no-repeat scroll 0 0;\
				}");
			},
			init: function(){
				this.initCss();
				
				if( ($("#player_buttons").length > 0) && (Game.controller == "player") ){
					$("#player_buttons").css( "width", 250 );
					var ftmp_pid = Number( /player_id=([0-9]+)/.exec(document.location.href)[1] );
					var no = $( "<a class=\"faarksGrepoTools_shownInGrepoStatsButton faarksGrepoTools_playerButton\" href=\"http://"+fgt.getString("toolbuttons_statsLang")+".grepostats.com/world/"+faarksGrepoTools.currentWorld+"/player/"+ftmp_pid+"\" target=\"_blank\"></a>" );
					var no2 = $( "<a class=\"faarksGrepoTools_shownInGrepoGameStatsButton faarksGrepoTools_playerButton\" href=\"http://www.grepotools.de/"+faarksGrepoTools.currentWorld+"/details/player/"+ftmp_pid+"\" target=\"_blank\"></a>" );
					$("#player_buttons").append( no ).append( no2 );
					no.mousePopup( this.playerGrepoStats_toolTip );
					no2.mousePopup( this.playerGrepoTools_toolTip );
				}
				$("body").ajaxComplete( fer_cf( this.drawInPopup, this ) );
			}
		},
		favorCalc: { //Time to full favor -> Favor-Tooltip
			favorData: null,
			newFavorText: null,
			getFavorFormText: function(text){
				var arr = [];
				var regex = /<li>([^\:]+): ?([-+]?[0-9]*\.?[0-9]) ?-([^\:]+): ?([-+]?[0-9]*\.?[0-9])<\/li>/g;
				var ret = null;
				while( ret = regex.exec(text) ){
					arr.push( { 
						god: ret[1], 
						favor: Number(ret[2]), 
						prodText: ret[3],
						output: Number(ret[4])} );
				}
				return arr;
			},
			init: function(){
				this.favorData = this.getFavorFormText( PopupFactory.texts["favor_production"] );
				if( this.favorData.length > 0 ){
					var nft = fgt.getString("favorCalc_favorHeadline")+"<ul>";
					for( var el in this.favorData ){
						var data = this.favorData[el];
						if( data["favor"] >= 500 ){
							nft = nft + "<li>" + fgt.getString("favorCalc_fullItem",data) + "</li>";
						}else{
							var tl = (500-data["favor"])/(data["output"]);
							var ml = Math.floor((tl-Math.floor(tl))*60);
							data.full_in = Math.floor(tl) + ":" + (ml<10?"0"+ml:ml);
							data.full_at = faarksGrepoTools.humanReadableDate(new Date(new Date().getTime() + Math.floor((500-data["favor"])/(data["output"]/3600000)) ))
							nft = nft + "<li>" + fgt.getString("favorCalc_defaultItem",data) + "</li>";
						}
					}
					nft = nft+"</ul><br/>"+faarksTextSelection.get("sys","by");
					this.newFavorText = nft;
					$("#favor").mousePopup(new MousePopup(nft));
				}
			}
		},
		updateDuration: { // Update duration....
			oldFunction: null,
			duroInvalidated: true,
			interval: null,
			duation: null,
			onIntervalUpdate: function(){
				if( this.duroInvalidated ){
					this.duroInvalidated = false;
					var durEl = $("#way_duration");
					if( durEl.length == 0 ){
						window.clearInterval(this.interval);
						this.interval = null;
						this.duation = null;
					}else{
						var result = /\~([0-9]*)\:([0-9]*)\:([0-9]*)/.exec( durEl.text() );
						if( result ){
							this.duation = (((((Number( result[1] ) * 60) + Number( result[2] )) * 60 ) + Number( result[3] ) ) * 1000) - (Layout.client_server_time_diff*1000);
						}else{
							this.duation = null;
						}
					}
				}
				if( this.duation != null ){
					var arrival_in_timezone=new Date((new Date().getTime() + this.duation));
					$("#arrival_time").text("~"+readableDate( new Date(arrival_in_timezone.getTime()-(Timestamp.serverGMTOffset()*1000)), 'asUTC' ));
					var is_night;
					var night_starts_at_hour=Game.night_starts_at_hour+Game.locale_gmt_offset/3600;
					if(Game.night_duration==0){
						is_night=false;
					}else if(night_starts_at_hour+Game.night_duration>24){
						is_night=arrival_in_timezone.getUTCHours()<=(night_starts_at_hour+Game.night_duration-1)%24||arrival_in_timezone.getUTCHours()>=night_starts_at_hour;
					}else{
						is_night=arrival_in_timezone.getUTCHours()<=night_starts_at_hour+Game.night_duration-1&&arrival_in_timezone.getUTCHours()>=night_starts_at_hour;
					}
					if(is_night){
						$('#nightbonus').show();
					}else{
						$('#nightbonus').hide();
					}					
				}
			},
			onDuroUpdate: function(){
				this.duroInvalidated = true;
				if( this.interval == null ){
					this.interval = window.setInterval( this.onIntervalUpdate , 75);
				}
				this.onIntervalUpdate();
			},
			bindDurCounter: function(){
				$('.index_unit').bind('click', this.onDuroUpdate );
				$('.unit_input').bind('keyup', this.onDuroUpdate );
				this.duation = null;
			},
			init: function(){
				if( (typeof( TownInfo ) == "object") && (typeof( TownInfo.bindDurationCounter ) == "function") ){
					this.onIntervalUpdate = fer_cf( this.onIntervalUpdate, this );
					this.onDuroUpdate = fer_cf( this.onDuroUpdate, this );
					faarksGrepoTools.setInterrupt( TownInfo, "bindDurationCounter", this, this.bindDurCounter );
				}
			}
		},
		enhancedSimulator: { //Sim-Details Speichern/Einfügen
			simOpen: typeof( FightSimulator ) == "object",
			input_regExp: /sim\[([^\]]*)\]\[([^\]]*)\]\[([^\]]*)\]/,// /sim(\[([^\]]*)\])?(\[([^\]]*)\])?(\[([^\]]*)\])?/,
			pushModTimeout: null,
			pushModUpdate: function(){
				if( this.pushModTimeout == null ){
					this.pushModTimeout = window.setTimeout(fer_cf(function(){
						this.pushModTimeout = null;
						FightSimulator.closeModsExtended();
					},this), 50);
				}
			},
			clearEmpty: function(){
				var els = $("input.place_insert_field");
				for( var i = 0; i < els.length; i++ ){
					if( $(els[i]).val() == "0" )
						$(els[i]).val("");
				}
			},
			resume: function( limitRow ){
				var els;
				limitRow = $(limitRow);
				if( limitRow.length > 0 ){
					if( limitRow[0].nodeName !== "TR" ){
						limitRow = $($(limitRow.parents("tr").get(0)).prev());
					}
					els = limitRow.find("input.place_insert_field");
				}else{
					els = $("input.place_insert_field");
				}
				for( var i = 0; i < els.length; i++ ){
					var el = $(els[i]);
					var unitData = this.input_regExp.exec( el.attr("name") );
					if( unitData ){
						var losses = $("#building_place_"+unitData[2]+"_losses_"+unitData[3]);
						if( losses.length > 0 ){
							el.val( Math.max( 0, el.val() - Number( losses.text() ) ) );
						}
					}
				}
				this.clearEmpty();
			},
			clear: function( limitRow ){
				limitRow = $(limitRow);
				if( limitRow.length > 0 ){
					if( limitRow[0].nodeName !== "TR" ){
						limitRow = $(limitRow.parents("tr").get(0));
					}
					limitRow.find("input.place_insert_field").val("");
				}else{
					$("input.place_insert_field").val("");
					var selects = $(".place_sim_select_gods_wrap select");
					for( var i = 0; i < selects.length; i++ ){
						selects[i].selectedIndex = 0;
					}
					FightSimulator.switchGod("att", "");
					FightSimulator.switchGod("def", "");
					this.pasteMods("def",{})
					this.pasteMods("att",{})
				}
			},
			setGod: function( side, god_id ){
				if( god_id ){
					$.each($(".place_sim_select_gods .place_symbol"), function(i,el){
						if( $(el).hasClass("place_att")==(side=="att") )
							$(el).parent().find("SELECT").val(god_id);
					});
					FightSimulator.switchGod(side, god_id);
					return true;
				}
				return false;
			},
			pasteUnits: function(side,units){
				var godSet = false;
				var list = $(".place_insert_field");
				for( var i = 0; i < list.length; i++ ){
					var cside = $(list[i]).attr("name").toString().match(/sim\[units\]\[([^\]]*)\]/);
					if( cside && (cside[1]==side) )
						$(list[i]).val("");
				}
				for( var type in units ){
					if( !godSet )
						godSet = this.setGod( side, GameData.units[type].god_id );
					for( var i = 0; i < list.length; i++ ){
						if( $(list[i]).attr("name") == "sim[units]["+side+"]["+type+"]" )
							$(list[i]).val(units[type]);
					}
				}
			},
			pasteMods: function(side,mods){
				var list = $(".place_insert_field, .place_checkbox_field ");
				for( var i = 0; i < list.length; i++ ){
					var cside = $(list[i]).attr("name").toString().match(/sim\[mods\]\[([^\]]*)\]/);
					if( cside && (cside[1]==side) )
						if( $(list[i]).hasClass("place_checkbox_field") )
							$(list[i]).attr('checked', false);
						else
							$(list[i]).val("");
				}
				for( var type in mods ){
					for( var i = 0; i < list.length; i++ ){
						if( $(list[i]).attr("name") == "sim[mods]["+side+"]["+type+"]" )
							if( $(list[i]).hasClass("place_checkbox_field") )
								$(list[i]).attr('checked', mods[type]);
							else
								$(list[i]).val(mods[type]);
					}
				}
				this.pushModUpdate();
			},
			getDataAddress: function(data){
				return window.location.protocol + "//" + window.location.host + url( 'building_place', '', { action: 'simulator', faarksGrepoApplySimData: $.toJSON( data ) } );
			},
			getCurrentMode: function(){
				return $(".place_sim_select_strategies select").val();
			},
			copy: function(){
				var list = $('#place_simulator_form').serializeArray();
				var data = { units: { att: {}, def:{} }, mods:{ att: {}, def: {} } };
				for( var i = 0; i < list.length; i++ ){
					var e = list[i];
					if( e.name == "sim[attack_strategy]" ){
						data['attack_strategy'] = e.value;
					}else{
						var info = this.input_regExp.exec( e.name );
						if( info && (e.value != "" ) ){
							data[info[1]][info[2]][info[3]] = e.value;
						}
					}
				}
				return data;
			},
			getCurrentMods: function(){
				return this.copy()["mods"];
			},
			getCurrentDataAddress: function(){
				return this.getDataAddress( this.copy() );
			},
			open: function(data, noEmptys ){
				if( this.simOpen ){
					if( data.units ){
						if( data.units.att && (!noEmptys || faarksGrepoTools.objectHasPropertys(data.units.att) ) )
							this.pasteUnits( "att", data.units.att );
						if( data.units.def && (!noEmptys || faarksGrepoTools.objectHasPropertys(data.units.def) ) )
							this.pasteUnits( "def", data.units.def );
					}
					if( data.mods ){
						if( data.mods.att && (!noEmptys || faarksGrepoTools.objectHasPropertys(data.mods.att) ) )
							this.pasteMods( "att", data.mods.att );
						if( data.mods.def && (!noEmptys || faarksGrepoTools.objectHasPropertys(data.mods.def) ) )
							this.pasteMods( "def", data.mods.def );
					}
					if( data.attack_strategy )
						$(".place_sim_select_strategies select").val( data.attack_strategy );
					this.clearEmpty();
				}else{
					window.location = this.getDataAddress( data );
				}
			},
			getSaveLink: function(){
				alert(fgt.getString("enhancedSim_stringOutput",{address:this.getCurrentDataAddress()}));
				return false;
			},
			openSaveLink: function(){
				var url = prompt(fgt.getString("enhancedSim_stringInputHeadline"));
				if( url ){
					url = decodeURIComponent( url );
					if( startData = /faarksGrepoApplySimData=([^&]*)/.exec( url ) )
						startData = $.secureEvalJSON(decodeURIComponent( startData[1] ));
					if( !startData && (startData = /[\&\?]units=([^&]*)/.exec( url )) )
						startData = { units: $.secureEvalJSON(decodeURIComponent( startData[1] )) };
					if( startData || (startData = this.convertOtherFormat1( url ) ) )
						this.open( startData, true );
					else{
						alert(fgt.getString("enhancedSim_invalidInputString"));
					}
				}
				return false;
			},
			toggleSites: function(){
				var curUnits = this.copy()["units"];
				this.open({ units: { att: curUnits["def"], def: curUnits["att"] } });
				return false;
			},
			toggleSelectedBoni: function( side, newState ){
				var els = $(".place_sim_wrap_mods_extended input");
				for( var i = 0; i < els.length; i++ ){
					var el = $(els[i]);
					var type = this.input_regExp.exec( el.attr("name") );
					if( type && (type[1] == "mods") && (!side || (type[2] == side) ) ){
						el.attr("checked", ( typeof newState === "undefined" ) ? !el.is(":checked") : newState );
					}
				}
			},
			addCaptureButtonToDialog: function(data){
				var addButton = $("<a id=\"faarksGrepoApplySimData_dialogButton\" class=\"faarksGrepoApplySimData_captureSidebarButton faarksGrepoPicSaver_button\" href=\""+this.getDataAddress(data)+"\"></a>");
				$("#info_tab_window_bg .cancel").after( addButton );
				addButton.mousePopup(new MousePopup(fgt.getString("enhancedSim_caputreButtonPopup")));
			},
			convertOtherFormat1: function( dataString ){
				var match = false;
				var exp = /[?&]([^=]*)=([^&]*)/gi;
				var data = null;
				var data2 = null;
				var result = { units: { att: {}, def:{} }, mods:{ att: {}, def: {} } };
				while( data = exp.exec( dataString ) ){
					if( data2 = this.input_regExp.exec( data[1] ) ){
						match = true;
						if( data2[3] == "wall_levthis" )
							data2[3] = "wall_level";
						result[data2[1]][data2[2]][data2[3]] = data[2];
					}
				}
				if( match )
					return result;
			},
			sourceModules: { 
				townOverviewSidebar: {
					sim: null,
					collect: function(){
						var data={};
						$.each(
							$("#units_land .index_unit, #units_sea .index_unit"),
							function(i,el){
								data[$(el).attr("id")]=$($(el).find("span")[0]).text();
							}
						);
						return this.sim.getDataAddress( { units: { att:data } } );
					},
					addSidebarButton: function(event,ui){
						var el = $("#unit_info_tab_window_bg .tab_content");
						var sideBox = $("#faarksGrepoTownSidebarBox");
						if( sideBox.length == 0 ){
							sideBox = $("<div id=\"faarksGrepoTownSidebarBox\"></div>");
							sideBox.insertBefore( el.parent().children().get(0) );
						}
						var addButton = $("<a id=\"faarksGrepoApplySimData_captureSidebarButton\" href=\""+this.collect()+"\" class=\"faarksGrepoPicSaver_button\"></a>");
						addButton.mousePopup(new MousePopup(fgt.getString("enhancedSim_caputreButtonPopup")));
						sideBox.append( addButton );
					},
					init: function(simObj){
						if( $("#units_overview").length > 0 ){
							this.sim = simObj;
							this.addSidebarButton = fer_cf( this.addSidebarButton, this );
							$("#unit_info_tab_window_bg").bind('tabsshow',this.addSidebarButton);
							this.addSidebarButton();
						}
					}
				},
				combatReport: {
					init: function(simObj){
						if( $(".report_fight_classic").length > 0 ){
							var data = { units: { att: {}, def: {} }, mods: { att: {}, def: {} } };
							var list = $(".report_side_attacker_unit .report_unit");
							for( var i = 0; i < list.length; i++ ){
								var classList = list[i].className.replace(/^\s+|\s+$/g, "").split(/\s+/);
								for( var c = 0; c < classList.length; c++ ){
									var d = /^unit_(.*)$/.exec( classList[c] );
									if( d ){
										data["units"]["att"][d[1]] = Number( $(list[i]).find("span:first").text() );
									}
								}
							}
							var list = $(".report_side_defender_unit .report_unit");
							for( var i = 0; i < list.length; i++ ){
								var classList = list[i].className.replace(/^\s+|\s+$/g, "").split(/\s+/);
								for( var c = 0; c < classList.length; c++ ){
									var d = /^unit_(.*)$/.exec( classList[c] );
									if( d ){
										data["units"]["def"][d[1]] = Number( $(list[i]).find("span:first").text() );
									}
								}
							}
							var morale = /[0-9]{1,3}/.exec($("#report_booty_bonus_fight .morale").text());
							if( morale )
								data.mods.att.morale = morale[0];
							var luck = /-?[0-9]{1,3}/.exec($("#report_booty_bonus_fight .luck").text());
							if( luck )
								data.mods.att.luck = luck[0];
							var oldwall = /[0-9]{1,3}/.exec($("#report_booty_bonus_fight .oldwall").text());
							if( oldwall )
								data.mods.def.wall_level = oldwall[0];
							if( $("#report_booty_bonus_fight .nightbonus").length > 0 )
								data.mods.def.is_night = "on";
							
							var buttonBox = $("#faarksGrepoReportButtonBox");
							if( buttonBox.length == 0 ){
								buttonBox = $("<div id=\"faarksGrepoReportButtonBox\"></div>");
								$("#report_report_header").append( buttonBox );
							}
							var addButton = $("<a class=\"faarksGrepoApplySimData_captureSidebarButton faarksGrepoPicSaver_button\" href=\""+simObj.getDataAddress( data )+"\"></a>");
							addButton.mousePopup(new MousePopup(fgt.getString("enhancedSim_caputreButtonPopup")));
							buttonBox.append( addButton );
						}
					}
				},
				spyReport: {
					init: function(self){
						//spy-report => sim
						if($("#report_game_body").length > 0){
							var src = $("#report_arrow img").attr("src");
							if( src && (src.search("espionage.png") >= 0) ){
								var data = { units: { def: {} } };
								var list = $("#report_game_body .report_unit");
								for( var i = 0; i < list.length; i++ ){
									var classList = list[i].className.replace(/^\s+|\s+$/g, "").split(/\s+/);
									for( var c = 0; c < classList.length; c++ ){
										var d = /^unit_(.*)$/.exec( classList[c] );
										if( d ){
											data["units"]["def"][d[1]] = Number( $(list[i]).find("span:first").text() );
										}
									}
								}
								if( ($("#spy_buildings #building_tower").length > 0) || ($("#spy_buildings #building_wall").length > 0) ){
									data.mods = { def: { } };
									if( $("#spy_buildings #building_tower").length > 0 )
										data.mods.def.building_tower = "on";
									if( $("#spy_buildings #building_wall").length > 0)
										data.mods.def.wall_level = $("#spy_buildings #building_wall span:first").text();
								}
								var buttonBox = $("#faarksGrepoReportButtonBox");
								if( buttonBox.length == 0 ){
									buttonBox = $("<div id=\"faarksGrepoReportButtonBox\"></div>");
									$("#report_report_header").append( buttonBox );
								}
								var addButton = $("<a class=\"faarksGrepoApplySimData_captureSidebarButton faarksGrepoPicSaver_button\" href=\""+self.getDataAddress( data )+"\"></a>");
								addButton.mousePopup(new MousePopup(fgt.getString("enhancedSim_caputreButtonPopup")));
								buttonBox.append( addButton );
							}
						}
					}
				},
				wisdomReport: {
					init: function( simObj ){
						if($("#report_game_body").length > 0){
							var src = $("#report_power_symbol").css("background");
							if( src && (src.search("power_wisdom.png") >= 0) ){
								var data = { units: { att: {} } };
								var list = $("#report_game_body #right_side .report_unit");
								for( var i = 0; i < list.length; i++ ){
									var unit = /\/([a-zA-Z_]+)_[0-9]+x[0-9]+\.[a-zA-Z]+/.exec( $(list[i]).css("background-image") );
									if( unit ){
										data["units"]["att"][unit[1]] = Number( $(list[i]).find("span:first").text() );
									}
								}
								var buttonBox = $("#faarksGrepoReportButtonBox");
								if( buttonBox.length == 0 ){
									buttonBox = $("<div id=\"faarksGrepoReportButtonBox\"></div>");
									$("#report_report_header").append( buttonBox );
								}
								var addButton = $("<a class=\"faarksGrepoApplySimData_captureSidebarButton faarksGrepoPicSaver_button\" href=\""+simObj.getDataAddress( data )+"\"></a>");
								addButton.mousePopup(new MousePopup(fgt.getString("enhancedSim_caputreButtonPopup")));
								buttonBox.append( addButton );
							}
						}
					}
				},
				placeLines: {
					init: function(self){
						//Place => sim
						if( $("#place_defense ul.game_list li.place_units").length > 0){
							var list = $("#place_defense ul.game_list li.place_units");
							for( var i = 0; i < list.length; i++ ){
								var cnt = 0;
								var data = { def: { } };
								var el = $(list[i]);
								var ul = el.find(".place_unit");
								for( var ui = 0; ui < ul.length; ui++ ){
									var ud = /units\/(.*)_40x40/.exec( $(ul[ui]).css("background-image") );
									if( ud ){
										data.def[ud[1]] = $(ul[ui]).find("span:first").text();
										cnt++;
									}
								}
								if( cnt > 0 ){
									el.css("position","relative");
									var addButton = $("<a class=\"faarksGrepoApplySimData_captureSidebarButton faarksGrepoApplySimData_placeButton faarksGrepoPicSaver_button\" href=\""+self.getDataAddress( { units: data } )+"\"></a>");
									addButton.mousePopup(new MousePopup(fgt.getString("enhancedSim_caputreButtonPopup")));
									el.append(addButton);
								}
							}
						}
					}
				},
				commandPopup: {
					sim: null,
					collect: function(){
						if( $("#commandWindow").length > 0 ){
							var units = $("#commandWindow .index_unit");
							var got = false;
							var off = {};
							for( var i = 0; i < units.length; i++ ){
								var classList = units[i].className.replace(/^\s+|\s+$/g, "").split(/\s+/);
								for( var c = 0; c < classList.length; c++ ){
									if( GameData.units[ classList[c] ] ){
										off[classList[c]] = Number( $(units[i]).find("span:first").text() );
										got = true;
									}
								}
							}
							$("#faarksGrepoApplySimData_dialogButton").remove();
							if( got )
								this.sim.addCaptureButtonToDialog( { units: { att: off } } );
						}
					},
					init: function(self){
						this.sim = self;
						$('body').ajaxComplete( fer_cf( this.collect, this ) );
					}
				},
				conquerorPopup: {
					sim: null,
					collect: function(){
						if( $("#conquerorWindow").length > 0 ){
							var units = $("#conquerorWindow .index_unit");
							var got = false;
							var off = {};
							for( var i = 0; i < units.length; i++ ){
								var id = /conqueror_unit_([^\s]+)/.exec($(units[i]).attr("id"));
								if( id && id[1] ){
									off[id[1]] = Number( $(units[i]).find("span:first").text() );
									got = true;
								}
							}
							$("#faarksGrepoApplySimData_dialogButton").remove();
							if( got )
								this.sim.addCaptureButtonToDialog( { units: { def: off } } );
						}
					},
					init: function(simObj){
						this.sim = simObj;
						$('body').ajaxComplete( fer_cf( this.collect, this ) );
					}
				}
			},
			init: function(){
				var self = this;
				if(true){
					$('head').append("<style type=\"text/css\">\
					#faarksGrepoTownSidebarBox{\
						display: block;\
						position: absolute;\
						right: 10px;\
						top: 40px;\
						z-index: 98;\
						float: right;\
					}\
					#faarksGrepoReportButtonBox{\
						display: block;\
						position: absolute;\
						right: 3px;\
						top: 2px;\
						z-index: 98;\
						float: right;\
					}\
					#faarksGrepoTownSidebarBox div,#faarksGrepoReportButtonBox div,#faarksGrepoTownSidebarBox a,#faarksGrepoReportButtonBox a{\
						margin-left: 2px;\
					}\
					#faarksGrepoApplySimData_captureSidebarButton, .faarksGrepoApplySimData_captureSidebarButton {\
						display: inline-block;\
						height: 23px;\
						width: 22px;\
						background: transparent url(http://grepo.faark.de/faarksGrepoTools/resources/view_on_sim_new.png) no-repeat scroll 0 0;\
					}\
					.faarksGrepoApplySimData_placeButton{\
						position: absolute;\
						right: 3px;\
						top: 2px;\
						display:none;\
					}\
					ul.game_list li:hover .faarksGrepoApplySimData_placeButton{\
						display:block;\
					}\
					#faarksGrepoApplySimData_dialogButton{\
						position: absolute;\
						right: 64px;\
						top: 0px;\
					}\
					#faarksGrepoApplySimData_captureSidebarButton:hover, .faarksGrepoApplySimData_captureSidebarButton:hover {\
						background: transparent url(http://grepo.faark.de/faarksGrepoTools/resources/view_on_sim_hover_new.png) no-repeat scroll 0 0;\
					}\
					.game_list_footer a.button .middle {\
						min-width: 0;\
					}\
					</style>");
				}
				if( this.simOpen ){
					FightSimulator.faarksGrepoSimData_oldSwitchGod = FightSimulator.switchGod;
					FightSimulator.switchGod = function(player,god_id){
						var r,isEx=false;
						try{
							//save old god units
							var old = { att: {}, def: {} };
							var l = $(".place_insert_field");
							for(var i=0;i<l.length;i++){
								var data = self.input_regExp.exec( $(l[i]).attr("name") );
								if( data && $(l[i]).hasClass('building_place_'+data[2]+'_'+this[data[2]+'_god_id']) )
									old[data[2]][data[3]] = $(l[i]).val();
							}
							//change good
							try{
								r = this.faarksGrepoSimData_oldSwitchGod.apply( this, arguments );
							}catch(ex){
								r=ex;
								isEx=true;
							}
							//set old units
							var l = $(".place_insert_field");
							for(var i=0;i<l.length;i++){
								var data = self.input_regExp.exec( $(l[i]).attr("name") );
								if( data && $(l[i]).hasClass('building_place_'+data[2]+'_'+this[data[2]+'_god_id']) && old[data[2]][data[3]] )
									$(l[i]).val( old[data[2]][data[3]] );
							}
						}catch(err){
							faarksErrorReporter.report( err );
						}finally{
							if(isEx)
								throw r;
							return r;
						}
					}
					
					faarksGrepoTools.setInterrupt( FightSimulator, "insertHomeUnits", this, this.clearEmpty );
					faarksGrepoTools.setInterrupt( FightSimulator, "insertUnits", this, this.clearEmpty );
					
					var startData = null;
					if( startData = /faarksGrepoApplySimData=([^&]*)/.exec( document.location.href) )
						startData = $.secureEvalJSON(decodeURIComponent( startData[1] ));
					if( !startData && (startData = /[\&\?]units=([^&]*)/.exec( document.location.href)) )
						startData = $.secureEvalJSON(decodeURIComponent(decodeURIComponent( startData[1] )));
					if( startData || (startData = this.convertOtherFormat1( document.location.href ) ) )
						this.open( startData );
					
					$(".game_list_footer a").css("display","inline-block");
					
					$("#place_simulator_form .game_list_footer").append( faarksGrepoTools.createDefaultButton( fgt.getString("enhancedSim_swapSideText"), "faarksGrepoSwapSimSides_button" ) );
					$("#faarksGrepoSwapSimSides_button").click( fer_cf( this.toggleSites, this ) );
					$("#faarksGrepoSwapSimSides_button").mousePopup(new MousePopup(fgt.getString("enhancedSim_swapSidePopup")));
					
					
					$("#place_simulator_form .game_list_footer").append( faarksGrepoTools.createDefaultButton( fgt.getString("enhancedSim_getSimUrl_text"), "faarksGrepoGetSimLink_button" ) );
					$("#faarksGrepoGetSimLink_button").click( fer_cf( this.getSaveLink, this ) );
					$("#faarksGrepoGetSimLink_button").mousePopup(new MousePopup(fgt.getString("enhancedSim_getSimUrl_popup")));
					
					$("#place_simulator_form .game_list_footer").append( faarksGrepoTools.createDefaultButton( fgt.getString("enhancedSim_openSimLink_text"), "faarksGrepoOpenSimLink_button" ) );
					$("#faarksGrepoOpenSimLink_button").click( fer_cf( this.openSaveLink, this ) );
					$("#faarksGrepoOpenSimLink_button").mousePopup(new MousePopup(fgt.getString("enhancedSim_openSimLink_popup")));
					
					$("#place_simulator_form .game_list_footer").append( faarksGrepoTools.createDefaultButton( fgt.getString("enhancedSim_clear_text"), "faarksGrepoClearSim_button" ) );
					$("#faarksGrepoClearSim_button").click( fer_cf( this.clear, this, null ) );
					$("#faarksGrepoClearSim_button").mousePopup(new MousePopup(fgt.getString("enhancedSim_clear_popup")));
					
					$("#place_sim_naval_units div.place_symbol.place_att").click( fer_cf( this.clear, this, undefined ) );
					$("#place_sim_naval_units div.place_symbol.place_def").click( fer_cf( this.clear, this, undefined ) );
					$("#place_sim_ground_units div.place_symbol.place_att").click( fer_cf( this.clear, this, undefined ) );
					$("#place_sim_ground_units div.place_symbol.place_def").click( fer_cf( this.clear, this, undefined ) );
					
					$("#place_sim_naval_units div.place_symbol.place_att, #place_sim_naval_units div.place_symbol.place_def, #place_sim_ground_units div.place_symbol.place_att, #place_sim_ground_units div.place_symbol.place_def")
						.mousePopup( new MousePopup( fgt.getString( "enhancedSim_clear_line" ) ) );
					
					
					//resumn is implemented by inno, use their button&function but shorter the text
					/*
					$("#place_simulator_form .game_list_footer").append( faarksGrepoTools.createDefaultButton( fgt.getString("enhancedSim_resume_text"), "faarksGrepoResumeSim_button" ) );
					$("#faarksGrepoResumeSim_button").click( fer_cf( this.resume, this, null ) );
					$("#faarksGrepoResumeSim_button").mousePopup(new MousePopup(fgt.getString("enhancedSim_resume_popup")));
					*/
					$("#insert_survives_def_units .middle").text( fgt.getString("enhancedSim_resume_text") );
					
					var deadButtons = $("#place_sim_naval_units div.place_symbol.place_att_losts, #place_sim_naval_units div.place_symbol.place_def_losts, #place_sim_ground_units div.place_symbol.place_att_losts, #place_sim_ground_units div.place_symbol.place_def_losts");
					deadButtons.click( fer_cf( this.resume, this, undefined ) );
					deadButtons.mousePopup( new MousePopup( fgt.getString( "enhancedSim_resume_line") ) );
					
					
					
					//boni-config-box:
					faarksGrepoTools.setInterrupt( FightSimulator, "openModsExtended", this, function(){
						if( $(".place_sim_wrap_mods_extended").parent().attr("id") == "simulator_body" ){
							faarksGrepoTools.movablePopups.makeWindowMovable( ".place_sim_wrap_mods_extended" );
							$(".place_sim_wrap_mods_extended").css("margin", 0);
							$(".place_sim_wrap_mods_extended").clone().appendTo( "#place_simulator_form" ).attr("class","place_sim_wrap_mods_extended_clone").hide();
							//first start, so make a copy, too, that saves old value, so we can reset them (todo)
						}
					});
					faarksGrepoTools.setInterrupt( FightSimulator, "closeModsExtended", this, function(){//copy inputs back into place_sim_form, or they cant be found...
						$(".place_sim_wrap_mods_extended_clone").remove();
						$(".place_sim_wrap_mods_extended").clone().appendTo( "#place_simulator_form" ).attr("class","place_sim_wrap_mods_extended_clone").hide();
					}, true);
					
					$(".place_sim_wrap_mods_extended .place_symbol.place_att, .place_sim_wrap_mods_extended .place_symbol.place_def").mousePopup(new MousePopup(fgt.getString("enhancedSim_boniMod_changeAll")));
					$(".place_sim_wrap_mods_extended .place_symbol.place_att").click( fer_cf( function(){ this.toggleSelectedBoni("att"); } , this) );
					$(".place_sim_wrap_mods_extended .place_symbol.place_def").click( fer_cf( function(){ this.toggleSelectedBoni("def"); } , this) );
					
					var saveNoClose = $('<img src="http://grepo.faark.de/faarksGrepoTools/resources/button_okay_2.png" style="display: block; width: 16px; height: 17px; margin-bottom: 1px; margin-left: 6px; cursor: pointer;" >');
					saveNoClose.mousePopup(new MousePopup(fgt.getString("enhancedSim_boniMod_simpleApply_ButtonTooltip")));
					saveNoClose.click( function(){//copyed from original src + closeModsExtended interupt
						$(".place_sim_wrap_mods_extended_clone").remove();
						$(".place_sim_wrap_mods_extended").clone().appendTo( "#place_simulator_form" ).attr("class","place_sim_wrap_mods_extended_clone").hide();
						var params = $('#place_simulator_form').serialize();
						Ajax.post('building_place', 'simulate_bonuses', params, function(data) {
							for (i in data) {
								$('.building_place_' + i + ' .percentage').text(data[i] + '%');
							}
						} .bind(this));
						return false;
					});
					var cancelButton = $('<img src="http://static.grepolis.com/images/game/barracks/cancel.png" style="display: block; width: 16px; height: 17px; margin-bottom: 1px; margin-left: 6px; cursor: pointer;" >');
					cancelButton.mousePopup(new MousePopup(fgt.getString("enhancedSim_boniMod_cancelButtonTooltip")));
					cancelButton.click( function(){
						var c = $(".place_sim_wrap_mods_extended_clone input");
						var o = $(".place_sim_wrap_mods_extended input");
						for( var i = 0; i < c.length; i++ ){
							for( var v = 0; v < o.length; v++ ){
								if( $(c[i]).attr("name") == $(o[v]).attr("name") ){
									$(o[v]).attr("checked",$(c[i]).is(":checked"));
									v = o.length;
								}
							}
						}
					});
					$(".place_sim_wrap_mods_extended table tr:first td:last a").before( saveNoClose ).before( cancelButton );
					
					this.clearEmpty();
					
				}else{
					//init source-modules
					for( var i in this.sourceModules ){
						if( this.sourceModules[i] && (typeof this.sourceModules[i] === "object") && (typeof this.sourceModules[i].init === "function") )
							this.sourceModules[i].init(this);
					}
				}
				
			}
		},
		timeleftInAcademy: { // timeleft til ress aviable in Aca
			mousePopup_overriddenShowDiv: function(){
				if( ($("#popup_content .academy_popup").length > 0) && ($("#popup_content").find("#faarksGrepoAkaResTimeleft_by").length==0)){
					var imgs = $("#popup_content").find("img");
					var neededTechPoints = 0;
					var ressis = ["wood","stone","iron"];
					var timeleft = -1;
					for( var i = 0; i < imgs.length; i++ ){
						var key = /([^\/]*).png$/.exec( imgs[i].attributes["src"].value )[1];
						var data = imgs[i].nextSibling.nodeValue;
						var needed = 0;
						if( $.inArray( key, ressis ) != -1 ){
							needed = Number(data) - Number(Layout.resources[key]);
							if( needed > 0 ){
								var left = Math.floor(needed/(((Number(Layout.production[key])/60)/60)));
								if( (timeleft < left) || (timeleft == -1) )
									timeleft = left;
							}
						}else if( key == "research_points" ){
							needed = Number($("#academy_research_points span").val()) - Number(data);
						}
						if( needed > 0 ){
							$(imgs[i].nextSibling).replaceWith("<div style=\"display:inline-block; margin-right: 7px;\">"+data+"<br/><span style=\"color:red;font-size:80%;font-style:italic;\">-"+needed+"</span></div>");
						}else{
							$(imgs[i].nextSibling).replaceWith("<div style=\"display:inline-block; margin-right: 7px; position: relative; top: -8px;\">"+data+"</span></div>");
						}
					}
					if( timeleft > 0 ){
						$("#popup_content").append( fgt.getString("academyTimeleft_resItem",{"in":readableSeconds(timeleft),"at":faarksGrepoTools.humanReadableDate( new Date( new Date().getTime() + (timeleft*1000) ) )}));
					}
					$("#popup_content").append(faarksTextSelection.get("sys","by",{id:"id='faarksGrepoAkaResTimeleft_by' ",what:"Resource-Timeleft "}));
				}
			},
			buildingAcademy_newInitMousePopup: function(){
				if(BuildingAcademy.orders && (BuildingAcademy.orders.length>0)){
					$.each(BuildingAcademy.orders,function(i,order){
						$('#academy_tasks_'+i+' .academy_tasks_image').mousePopup(new MousePopup(fgt.getString("academyTimeleft_doneIn",{id:'id="faarksGrepoAkaResTimeleft_by" ',what:'Resource-Timeleft ',order:order.name,done_at:faarksGrepoTools.humanReadableDate( new Date( order.to_be_completed_at*1000 ) )})));
					});
				}
			},
			init: function(){
				if ( typeof BuildingAcademy == "object") {
					faarksGrepoTools.setInterrupt( MousePopup.prototype, "showDiv", this, this.mousePopup_overriddenShowDiv );
					faarksGrepoTools.setInterrupt( BuildingAcademy, "initializeMousePopups", this, this.buildingAcademy_newInitMousePopup );
					
					BuildingAcademy.initializeMousePopups();
				}
			}
		},
		walkDuration: { // Add Durations to Mouseover-Popup on Worldmap
			exclude: ["xx1","xx2","xx3"],
			includeLangs: ["de","en"],
			unitTypes: {
				land: ["sword","slinger","archer","hoplite","rider","chariot","catapult","minotaur","zyklop","centaur","medusa"],
				air: ["manticore","harpy","pegasus"],
				sea: ["big_transporter","bireme","attack_ship","demolition_ship","small_transporter","trireme","colonize_ship","sea_monster"],
				transporter: ["big_transporter","small_transporter"],
				defaultUnits: ["big_transporter","bireme","attack_ship","colonize_ship"],
				defaultRowInLargeSelection: ["colonize_ship","attack_ship","bireme","big_transporter","sword","rider","manticore"]
			},
			dataStorage: null,
			
			// check if 3rdparty-data is aviable here
			isActiveHereCache: null,
			isActive: function(){
				if( this.isActiveHereCache === null ){
					this.isActiveHereCache = ($.inArray( faarksGrepoTools.currentWorld, this.exclude ) == -1) && ($.inArray( faarksGrepoTools.currentLang, this.includeLangs ) >=0);
				}
				return this.isActiveHereCache;
			},
			
			// basic walkDuration-Request (returns {status[,time,offset,sameIsland][,error]})
			durCache: {},
			get: function(target_town_id, source_town_id ){
			
			//TODO: ADD "state"/status
				if( !target_town_id ){
					return null;
				}
				if( !source_town_id )
					source_town_id = Game.townId;
				if( !this.durCache[source_town_id] )
					this.durCache[source_town_id] = {};
				if( this.durCache[source_town_id][target_town_id] ){
					if( this.durCache[source_town_id][target_town_id] === true )
						return null;
					return this.durCache[source_town_id][target_town_id];
				}else{
					this.durCache[source_town_id][target_town_id] = true;
					$.ajax({
						url: 'http://www.grepotools.de/backend.cgi',
						data: {
							type:"plainb",
							speed:1,
							world:faarksGrepoTools.currentWorld,
							mytid:source_town_id,
							tid:target_town_id
						},
						error: fer_cf(function(request,error){
							this.durCache[source_town_id][target_town_id] = false;
							window.setTimeout( fer_cf( this.onupdate, this, [ target_town_id, source_town_id ] ), 1000 );
						},this),
						success: fer_cf(function(request){
							var data = request.split("|");
							if( (data.length == 3) )
								if(Number(data[0])>0)
									this.durCache[source_town_id][target_town_id] = { time: Number(data[0]), offset: Number(data[1]), sameIsland: Number(data[2]) };
								else{
									var text = "Server send invalid data: ["+request.toString()+"]";
									this.durCache[source_town_id][target_town_id] = { error: text };
								}
							else if( data.toString() )
								this.durCache[source_town_id][target_town_id] = { error: data.toString() };
							else{
								var text = "Server send invalid data: ["+request.toString()+"]";
								this.durCache[source_town_id][target_town_id] = { error: text };
							}
							this.onupdate( target_town_id, source_town_id );
//							if( this.durCache[source_town_id][target_town_id].error && ( this.durCache[source_town_id][target_town_id].error != "Town not found") )//remove known errors like new towns not in db
//								throw new Error( this.durCache[source_town_id][target_town_id].error );
						},this)
					});
					return null;
				}
			},
			
			// similar to get( source[MUST BE OWN], target ), but returns more data {state[,times:{unit:speedInclModFactor},units:[names],unitCount:{unit:count},time,offset,sameIsland}
			townDetailCache: {},
			getWithSourceDetail: function( sourceTownId, targetTownId, getFinalTimes ){
				if( !this.townDetailCache[ sourceTownId ] && ( this.townDetailCache[ sourceTownId ] !== false ) ){
					this.townDetailCache[ sourceTownId ] = false;
					$.ajax({
						timeout: 3000,
						dataType:"text",
						url: url('town_info',undefined,{action:"attack",id:targetTownId,town_id:sourceTownId}),
						error: fer_cf(function(){
							this.townDetailCache[sourceTownId] = null;
							window.setTimeout( fer_cf( this.onupdate, this, [ targetTownId, sourceTownId ] ), 1000 );
						}, this),
						success: fer_cf(function(data,testStatus,xhr){
							//var data = data.replace(/\<script[^\>]*\>[\s\S]*\<\/script\>/,"");
							var searchedData = /TownInfo.unitInfo ?= ?([^\;]*);/.exec(data);
							if( searchedData ){
								this.townDetailCache[ sourceTownId ] = {
									base: {
										unitInfo: $.secureEvalJSON( searchedData[1] ),
										baseDataTarget: targetTownId,
										speeds: {},
									},
									modsCalculated: false,
									unitCounts: {},
									units: [],
									mods: null
								}

								var units = faarksUtility.getDomByHtml( data, $("<div></div>") ).find("#town_info_units .index_unit");
								for( var i = 0; i < units.length; i++ ){
									var el = $(units[i]);
									this.townDetailCache[ sourceTownId ].units.push( el.attr("id") );
									this.townDetailCache[ sourceTownId ].unitCounts[el.attr("id")] = Number( el.find("span:first").text() );
								}
								for( var i in this.townDetailCache[ sourceTownId ].base.unitInfo ){
									this.townDetailCache[ sourceTownId ].base.speeds[ i ] = this.townDetailCache[ sourceTownId ].base.unitInfo[i].duration;
								}
								
								this.onupdate( targetTownId, sourceTownId );
							}
						},this)
					});
				}else if( this.townDetailCache[ sourceTownId ] && !this.townDetailCache[ sourceTownId ].modsCalculated && !(getFinalTimes&&(this.townDetailCache[ sourceTownId ].base.baseDataTarget==targetTownId)/*dont need mods when trg = this & whatever*/)){
					var dur = this.get( sourceTownId, this.townDetailCache[ sourceTownId ].base.baseDataTarget );
					if( !dur ){
						return null;
					}else{
						var baseData = this.townDetailCache[ sourceTownId ].base.unitInfo;
						var mods = {};
						for( var i in baseData ){
							if( GameData.units[i] ){
								var realTime = baseData[i].duration - dur.offset;
								mods[i] =  Math.round((dur.time / (realTime*GameData.units[i].speed) )*Math.pow(10,2))/Math.pow(10,2);
							}
						}
						this.townDetailCache[ sourceTownId ].modsCalculated = true;
						this.townDetailCache[ sourceTownId ].mods = mods;
						
					}
				}
				var townD = this.townDetailCache[ sourceTownId ] ;
				var simpleTime = null;
				if( townD && ((getFinalTimes&&(targetTownId==townD.base.baseDataTarget)) || ((simpleTime = this.get( sourceTownId, targetTownId ))&&!simpleTime.error) ) ){
					if( !(simpleTime&&!simpleTime.error) ){
						return {
							state: "ok",
							times:townD.base.speeds,
							units:townD.units,
							unitCount:townD.unitCounts
						};
					}else{
						var times = {};
						for( var i in townD.mods ){
							times[i] = simpleTime.offset + (simpleTime.time / ( GameData.units[i].speed * townD.mods[i] ) );
						}
						return {
							state: "ok",
							units:townD.units,
							unitCount:townD.unitCounts,
							times:times,
							time:simpleTime.time,
							offset:simpleTime.offset,
							sameIsland:simpleTime.sameIsland
						};
					}
				}else
					return null;
			},
			
			// content in map-popup
			map_popup: {
				useDefaultUnits: false,
				units: null,
				unitRequestActive: false,
				durMods: {
					calculated: false,
					dataSource: null,
					data: null
				},
				gotUnits: function(town_id){
					if( this.units )
						return true;
					if( !this.unitRequestActive && !this.durMods.dataSource ){
						this.unitRequestActive = true;
						$.ajax({
							timeout: 3000,
							dataType:"text",
							url: url('town_info',undefined,{action:"attack",id:town_id}),
							error: fer_cf(function(){ this.unitRequestActive = false; }, this),
							success: fer_cf(function(data,testStatus,xhr){
								//var data = data.replace(/\<script[^\>]*\>[\s\S]*\<\/script\>/,"");
								this.unitRequestActive = false;
								var searchedData = /TownInfo.unitInfo ?= ?([^\;]*);/.exec(data);
								if( searchedData ){
									this.durMods.baseData = $.secureEvalJSON( searchedData[1] );
									this.durMods.dataSource = town_id;
									
									var el = $("<div></div>");
									faarksUtility.getDomByHtml( data, el );
									var units = el.find("#town_info_units .index_unit");
									this.units = {};
									for( var i = 0; i < units.length; i++ ){
										var el = $(units[i]);
										this.units[el.attr("id")] = Number( el.find("span:first").text() );
									}
									this.update();
								}
							},this)
						});
					}
					return false;
				},
				
				update: function( townId, sourceTownId ){
					if( sourceTownId != Game.townId )
						return;
					if( !this.durMods.calculated ){
						var dur = this.durMods.dataSource ? faarksGrepoTools.walkDuration.get( this.durMods.dataSource ) : null;
						if( dur && this.durMods.baseData && !dur.error){
							var mods = { };
							for( var i in this.durMods.baseData ){
								if( GameData.units[i] ){
									var realTime = this.durMods.baseData[i].duration - dur.offset;
									mods[i] =  Math.round((dur.time / (realTime*GameData.units[i].speed) )*Math.pow(10,2))/Math.pow(10,2);
								}
							}
							this.durMods = { calculated: true, data: mods, baseData: this.durMods.baseData };
						}else{
							if( dur && dur.error && (townId != this.durMods.dataSource)){
								this.durMods = {
									calculated: false,
									dataSource: null,
									data: null
								};
							}
							if( townId )
								this.gotUnits( townId );
							if( this.durMods.dataSource )
								faarksGrepoTools.walkDuration.get( this.durMods.dataSource );
						}
					}
					this.updateContent( townId );
				},
				
				mayAddUnitToRows: function(otherIslandData,unit,upperrow,lowerrow,inv){
					if( (this.useDefaultUnits && ( jQuery.inArray(unit,faarksGrepoTools.walkDuration.unitTypes.defaultUnits) != -1 )) || (this.units[unit] && (this.units[unit] > 0) )  ){
						var col = (upperrow.children().length % 2 == (inv?1:0)) ? "#E5BF75" : "#FFE2A1";
						upperrow.append("<td style=\"background-color: "+col+"; \"><img style=\"width:25px;height:25px;\" src=\"http://static.grepolis.com/images/game/units/"+unit+"_40x40.png\"/></td>");
						lowerrow.append("<td style=\"background-color: "+col+"; padding: 0px 1px 0px 1px; font-size: 9px;\">"+readableSeconds(((otherIslandData.time/GameData.units[unit].speed)/this.durMods.data[unit])+otherIslandData.offset)+"</td>");
					}
				},
				drawContent: function(targetEl,otherIslandData){
					var wd = faarksGrepoTools.walkDuration;
					var tbl = $("<table cellspacing=\"0\" cellpadding=\"0\" style=\"border: 1px solid #E1AF55;text-align:center;margin-top:3px;\"></table>");
					var upperRow = $("<tr></tr>");
					var lowerRow = $("<tr></tr>");
					var gotLandWay = otherIslandData.sameIsland;
					var nothingDrawn = true;
					if( gotLandWay ){
						for( var i = 0; i < wd.unitTypes.land.length; i++ ){
							this.mayAddUnitToRows(otherIslandData,wd.unitTypes.land[i],upperRow,lowerRow,nothingDrawn);
						}
						if( upperRow.find("td").length > 0 ){
							for( var i = 0; i < wd.unitTypes.air.length; i++ ){
								this.mayAddUnitToRows(otherIslandData,wd.unitTypes.air[i],upperRow,lowerRow,nothingDrawn);
							}
							targetEl.append(tbl);
							tbl.append(upperRow).append(lowerRow);
							nothingDrawn = false;
							tbl = $("<table cellspacing=\"0\" cellpadding=\"0\" style=\"border: 1px solid #E1AF55;text-align:center;margin-top:1px;\"></table>");
							upperRow = $("<tr></tr>");
							lowerRow = $("<tr></tr>");
						}
					}
					for( var i = 0; i < wd.unitTypes.sea.length; i++ ){
						this.mayAddUnitToRows(otherIslandData,wd.unitTypes.sea[i],upperRow,lowerRow,nothingDrawn);
					}
					if( !gotLandWay || nothingDrawn ){
						for( var i = 0; i < wd.unitTypes.air.length; i++ ){
							this.mayAddUnitToRows(otherIslandData,wd.unitTypes.air[i],upperRow,lowerRow,nothingDrawn);
						}
					}
					if( upperRow.find("td").length > 0 ){
						targetEl.append(tbl);
						tbl.append(upperRow).append(lowerRow);
						nothingDrawn = false;
					}
					return nothingDrawn;
				},
				updateContent: function( onlyTown ){
					var el = $("#grepoWalkDuration_div");
					var town_id = el.data("grepoWalkDuration.villageid");
					if( town_id && ( (town_id == onlyTown) || !onlyTown ) ){
						if( !faarksGrepoTools.walkDuration.isActive() ){
							el.html(fgt.getString("walkDuro_offline"));
						}else{
							var otherIslandData = faarksGrepoTools.walkDuration.get( town_id );
							if( otherIslandData && otherIslandData.error){
								el.html(fgt.getString("walkDuro_onError"));
							}else if( this.gotUnits( town_id ) && otherIslandData && this.durMods.calculated ){
								if(!otherIslandData.error ){
									el.html("");
									this.useDefaultUnits = false;
									if( this.drawContent( el, otherIslandData ) ){
										this.useDefaultUnits = true;
										this.drawContent( el, otherIslandData );
									}
									el.append(fgt.getString("walkDuro_fullBy"));
								}else{
									el.html(fgt.getString("walkDuro_onError"));
								}
							}else{
								el.html(fgt.getString("walkDuro_onLoading"));
							}
						}
					}
				},
				checkMouseOver: function(e){
					var townid = /^town-(\d+)$/.exec(e.target.id);
					if( townid != null ){
						townid = townid[1];
						if (townid && (townid != Game.townId)) {
							var popup = $("#popup_content");
							var el = $("<div id=\"grepoWalkDuration_div\"></div>");
							el.data("grepoWalkDuration.villageid",townid);
							popup.append(el);
							this.updateContent( townid );
						}
					}
				},
				init: function(){
					if (typeof WMap == "object" ) {
						document.addEventListener('mouseover', fer_cf( this.checkMouseOver, this ), false);
					}
				}
			},
			
			// walktime for units in commandtab
			commandTab: {
				sourceId: null,
				targetId: null,
				lastDrawState: null,//loading, error, ok
				lastSetWalkTime: null,
				contentTable: null,
				contentTableBox: null,
				contentOffset: 0,
				move: function( newIndex, noAni ){
					newIndex = Math.min( this.contentTable.width() - this.contentTableBox.width(), Math.max( 0, newIndex ) );
					this.contentTable.stop( true, true );
					this.contentOffset = newIndex;
					if( noAni ){
						this.contentTable.css({ left: -newIndex });
					}else{
						this.contentTable.animate({ left: -newIndex });
					}
				},
				moveToLeft: function(){
					this.move( this.contentOffset - 150 );
				},
				moveToRight: function(){
					this.move( this.contentOffset + 150 );
				},
				calcUnit: function( arr, unit, data, speedMod ){
					if( typeof speedMod !== "number" )
						speedMod = 1;
					/*Arr Makeup: { name: sysname, time: walk-seconds, marked: isRedMarked } */
					var time = ((data.time/GameData.units[unit].speed)/speedMod)+data.offset;
					for( var i = 0; i < arr.length; i++ ){
						if( arr[i].name == unit )
							return;
						else if( time < arr[i].time ){
							arr.splice( i, 0, { name: unit, time: time, marked: false } );
							return;
						}
					}
					arr.push( { name: unit, time: time, marked: false } );
				},
				changeForeignTechSettings: function( what ){
					var s;
					switch( what ){
						case "light":
							s = "foreignDefault_lighthouse";
							break;
						case "meterology":
							s = "foreignDefault_meteorology";
							break;
						case "map":
							s = "foreignDefault_cartography";
							break;
						default:
							throw new Error("Invalid tech");
							break;
					}
					fgt.walkDuration.dataStorage.set( s, !fgt.walkDuration.dataStorage.get(s) );
					this.lastDrawState = null;
					this.draw();
				},
				draw: function(){
					var text = faarksGrepoTools.getString;
					var wd = faarksGrepoTools.walkDuration;
					if( wd.isActive() ){
						var data = wd.get( this.targetId, this.sourceId );
						if( $("#commandWindow .tab_content #command_units").length > 0 ){
							var box = $("#faarksGrepoWalkTime_commandTabTimes_box");
							if( box.length <= 0 ){
								box = $('<div id="faarksGrepoWalkTime_commandTabTimes_box" class="fgwt_unitMode"></div>');
								$("#commandWindow .tab_content #command_units").after( box );
							}
							if( !data && (this.lastDrawState != "loading")){
								this.lastDrawState = "loading";
								box.html('<span style="color:grey">'+text('walkTimes_command_loading')+'</span>');
							}else if( data && data.error && (this.lastDrawState != "error") ){
								this.lastDrawState = "error";
								box.html( text('walkTimes_command_error') );
							}else if( data && (this.lastDrawState != "ok")){
								this.lastDrawState = "ok";
								box.html( text( "by", { what: text( "walkTimes_command_name" ) + " " } ) );
								var els = $("#commandWindow .tab_content #command_units .index_unit");
								var units = [];
								for( var i = 0; i < els.length; i++ ){
									var classList = els[i].className.replace(/^\s+|\s+$/g, "").split(/\s+/);
									for( var c = 0; c < classList.length; c++ ){
										if( GameData.units[ classList[c] ] ){
											this.calcUnit( units, classList[c], data );
											c = classList.length;
										}
									}
								}
								var slowest = {
									gotTransporter: false,
									nonLandIndex: -1
								};
								for( var i = 0; i < units.length; i++ ){
									if( jQuery.inArray(units[i].name,faarksGrepoTools.walkDuration.unitTypes.transporter) >= 0 ){
										slowest.gotTransporter = true;
									}
									if( jQuery.inArray(units[i].name,faarksGrepoTools.walkDuration.unitTypes.land) < 0 ){
										slowest.nonLandIndex = i;
									}
								}
								for( var i = 0; i < units.length; i++ ){
									var el = $("#commandWindow .tab_content #command_units .index_unit."+units[i].name);
									var popup = "<b>"+GameData.units[ units[i].name ].name + "</b><br/>"+text("walkTimes_command_popup_wt")+readableSeconds(units[i].time);
									if( (( slowest.gotTransporter ? units[slowest.nonLandIndex].time : units[units.length-1].time ) == units[i].time) && (
											!slowest.gotTransporter || (jQuery.inArray(units[i].name,faarksGrepoTools.walkDuration.unitTypes.land) < 0)
										)){
										popup+="<br/>"+text("walkTimes_command_slowest");
										el.addClass("faarksGrepoWalkTime_command_slowestUnit");
									}
									el.mousePopup( new MousePopup( popup ) );
								}
							}
						}else{
							var box = $("#faarksGrepoWalkTime_commandTabTimes_content");
							if( box.length <= 0 ){
								$("#commandWindow .tab_content").append( 
									"<div id=\"faarksGrepoWalkTime_commandTabTimes_box\" class=\"fgwt_incMode\" >\
										<div id=\"faarksGrepoWalkTime_commandInc_researchBox\">\
											"+text("walkTimes_command_research")+"\
											<div id=\"fgwt_incRes_lhouse\" class=\"faarksGrepoWalkTime_commandInc_reasearchItem\"></div>\
											<div id=\"fgwt_incRes_map\" class=\"faarksGrepoWalkTime_commandInc_reasearchItem\"></div>\
											<div id=\"fgwt_incRes_metero\" class=\"faarksGrepoWalkTime_commandInc_reasearchItem\"></div>\
										</div>\
										<h4>"+text("walkTimes_command_name")+"</h4>\
										<div id=\"faarksGrepoWalkTime_commandTabTimes_content\"></div>\
										"+text("by")+"\
									</div>");
								box = $("#faarksGrepoWalkTime_commandTabTimes_content");
								$("#faarksGrepoWalkTime_commandTabTimes_box #fgwt_incRes_lhouse").click(fer_cf(function(){
									this.changeForeignTechSettings("light");
								},this)).mousePopup( new MousePopup( text("walkTimes_command_research_light_popup") ) );
								//todo: add mouse popup
								$("#faarksGrepoWalkTime_commandTabTimes_box #fgwt_incRes_metero").click(fer_cf(function(){
									this.changeForeignTechSettings("meterology");
								},this)).mousePopup( new MousePopup( text("walkTimes_command_research_metero_popup") ) );
								//todo: add mouse popup
								$("#faarksGrepoWalkTime_commandTabTimes_box #fgwt_incRes_map").click(fer_cf(function(){
									this.changeForeignTechSettings("map");
								},this)).mousePopup( new MousePopup( text("walkTimes_command_research_map_popup") ) );
								//todo: add mouse popup
								this.lastDrawState = null;
							}
							$("#faarksGrepoWalkTime_commandTabTimes_box #fgwt_incRes_lhouse").toggleClass( "fgwt_incRes_inactive", !fgt.walkDuration.dataStorage.get( "foreignDefault_lighthouse" ) );
							$("#faarksGrepoWalkTime_commandTabTimes_box #fgwt_incRes_metero").toggleClass( "fgwt_incRes_inactive", !fgt.walkDuration.dataStorage.get( "foreignDefault_meteorology" ) );
							$("#faarksGrepoWalkTime_commandTabTimes_box #fgwt_incRes_map").toggleClass( "fgwt_incRes_inactive", !fgt.walkDuration.dataStorage.get( "foreignDefault_cartography" ) );
							if( !data && (this.lastDrawState != "loading")){
								this.lastDrawState = "loading";
								box.html('<span style="color:grey">'+text('walkTimes_command_loading')+'<img src="http://grepo.faark.de/faarksGrepoPicSaver/resources/loading.gif" style="width:15px;height:15px;position:relative;top:3px;" /></span>');
							}else if( data && data.error && (this.lastDrawState != "error")){
								this.lastDrawState = "error";
								box.html(text('walkTimes_command_error'));
							}else if( data && (this.lastDrawState != "ok")){
								this.lastDrawState = "ok";
								
								var lsm = fgt.walkDuration.dataStorage.get( "foreignDefault_meteorology" ) ? 1.1 : 1;
								var ssm = 1;
								if( fgt.walkDuration.dataStorage.get( "foreignDefault_lighthouse" ) )
									ssm += 0.1;
								if( fgt.walkDuration.dataStorage.get( "foreignDefault_cartography" ) )
									ssm += 0.1;
								
								var dataList = [];
								for( var i in wd.unitTypes.sea ){
									this.calcUnit( dataList, wd.unitTypes.sea[i], data, ssm );
								}
								for( var i in wd.unitTypes.air ){
									this.calcUnit( dataList, wd.unitTypes.air[i], data, lsm );
								}
								if( data.sameIsland ){
									for( var i in wd.unitTypes.land ){
										this.calcUnit( dataList, wd.unitTypes.land[i], data, lsm );
									}
								}
								
								var firstMarkedIndex = 0;
								for( var i = 0; i < dataList.length; i++ ){
									if( this.lastSetWalkTime < dataList[i].time ){
										firstMarkedIndex = i;
										for( var v = i; v < dataList.length; v++ ){
											if( dataList[v].time == dataList[i].time )
												dataList[v].marked = true;
										}
										i = dataList.length;
									}
								}
								
								var tbl = $('<table id="faarksGrepoWalkTime_commandContentTable" cellspacing="0" cellpadding="0"></table>');
								this.contentTable = tbl;
								var upperRow = $("<tr></tr>");
								var lowerRow = $("<tr></tr>");
								
								for( var i = 0; i < dataList.length; i++ ){
									var col = (dataList[i].marked?"faarksGrepoWalkTime_commandColMarked":((upperRow.children().length % 2) ? "faarksGrepoWalkTime_commandColOdd" : "faarksGrepoWalkTime_commandColEven"));
									upperRow.append("<td class=\""+col+"\"><img class=\"faarksGrepoWalkTime_commandIconEl\" src=\"http://static.grepolis.com/images/game/units/"+dataList[i].name+"_40x40.png\"/></td>");
									lowerRow.append("<td class=\"faarksGrepoWalkTime_commandTextCol "+col+"\">"+readableSeconds(dataList[i].time)+"</td>");
									
									var popup = "<b>"+GameData.units[ dataList[i].name ].name + "</b><br/>"+text("walkTimes_command_popup_wt")+readableSeconds(dataList[i].time);
									if( dataList[i].marked ){
										popup+="<br/>"+text("walkTimes_command_bestMatch");
									}
									upperRow.find("td:last").add( lowerRow.find("td:last") ).mousePopup( new MousePopup( popup ) );
								}
								tbl.append( upperRow ).append( lowerRow );
								
								box.html("");
								box.append(tbl);
								if( tbl.width() > 455 ){
									box.append('<div id="faarksGrepoWalkTime_commandContentTableLeftButton"></div><div id="faarksGrepoWalkTime_commandContentTableBox"></div><div id="faarksGrepoWalkTime_commandContentTableRightButton"></div>');
									this.contentTableBox = $("#faarksGrepoWalkTime_commandContentTableBox");
									this.contentTableBox.append( tbl );
									$("#faarksGrepoWalkTime_commandContentTableLeftButton").click( fer_cf( this.moveToLeft, this) );
									$("#faarksGrepoWalkTime_commandContentTableRightButton").click( fer_cf( this.moveToRight, this) );
									this.move( (this.contentTable.width() * (firstMarkedIndex/dataList.length)) - (( this.contentTable.width() - this.contentTableBox.width())/2), true );//
								}
							}
						}
					}else{
						var box = $("#faarksGrepoWalkTime_commandTabTimes_content");
						if( box.length <= 0 ){
							$("#commandWindow .tab_content h3").parent().append( '<div id="faarksGrepoWalkTime_commandTabTimes_content" style="float:right;color:grey;font-size:55%;" >'+text("walkTimes_command_offline")+'</div>');
						}
					}
				},
				update: function(to_id, from_id){
					if( this.sourceId && this.targetId && (this.sourceId == from_id) && (this.targetId == to_id) ){
						this.draw();
					}
				},
				load: function(){
					var els = $("#commandWindow .tab_content div ul li a");
					var s = null;
					var t = null;
					for( var i = 0; i < els.length; i++ ){
						var tid = faarksGrepoTools.isTownLinkElement(els[i]);
						if( tid ){
							if( s ){
								t = tid;
							}else{
								s = tid;
							}
						}
					}
					if( s && t ){ 
						if((s != this.sourceId) || (t != this.targetId)){
							this.sourceId = s;
							this.targetId = t;
							this.lastDrawState = null;
							this.draw();
						}
					}else{
						this.sourceId = null;
						this.targetId = null;
						this.lastDrawState = null;
					}
				},
				setArrivalTime: function( time, ele ){
					this.lastSetWalkTime = time - Timestamp.now() + Timestamp.clientServerDiff();
				},
				initCss: function(){
				$('head').append("<style type=\"text/css\">\
				#faarksGrepoWalkTime_commandTabTimes_box.fgwt_unitMode{\
					text-align: right;\
					font-size: 9px;\
					clear: both;\
				}\
				#faarksGrepoWalkTime_commandTabTimes_box.fgwt_incMode{\
					clear: both;\
					padding-top: 15px;\
					position: relative;\
				}\
				#faarksGrepoWalkTime_commandContentTable{\
					border: 1px solid #E1AF55;\
					text-align: center;\
					position: relative;\
				}\
				.faarksGrepoWalkTime_command_slowestUnit{\
					border-width: 2px;\
				}\
				.faarksGrepoWalkTime_commandTextCol{\
					padding: 0px 1px 0px 1px;\
					font-size: 9px;\
				}\
				#faarksGrepoWalkTime_commandContentTableLeftButton, #faarksGrepoWalkTime_commandContentTableRightButton{\
					width: 16px;\
					height: 39px;\
					display:inline-block;\
					background-position: 0 0;\
				}\
				#faarksGrepoWalkTime_commandContentTableLeftButton{\
					background-image: url( http://grepo.faark.de/faarksGrepoTools/resources/moveButton_leftAll.png );\
				}\
				#faarksGrepoWalkTime_commandContentTableRightButton{\
					background-image: url( http://grepo.faark.de/faarksGrepoTools/resources/moveButton_rightAll.png );\
				}\
				#faarksGrepoWalkTime_commandContentTableLeftButton:hover, #faarksGrepoWalkTime_commandContentTableRightButton:hover{\
					background-position: 0 -39px;\
				}\
				#faarksGrepoWalkTime_commandContentTableBox{\
					display:inline-block;\
					width: 425px;\
					overflow: hidden;\
				}\
				.faarksGrepoWalkTime_commandColOdd{\
					background-color: #E5BF75;\
				}\
				.faarksGrepoWalkTime_commandColEven{\
					background-color: #FFE2A1;\
				}\
				.faarksGrepoWalkTime_commandColMarked{\
					background-color: #BF8040;\
				}\
				.faarksGrepoWalkTime_commandIconEl{\
					width:25px;\
					height:25px;\
				}\
				#faarksGrepoWalkTime_commandInc_researchBox{\
					float: right;\
					font-size: 80%;\
					color: grey;\
					margin-right: 10px;\
					margin-top: 2px;\
				}\
				.faarksGrepoWalkTime_commandInc_reasearchItem{\
					width: 15px;\
					height: 15px;\
					background-image: url(\"http://grepo.faark.de/faarksGrepoTools/resources/research_sprite_mini.png\");\
					display: inline-block;\
					position: relative;\
					top: 3px;\
					cursor: pointer;\
				}\
				#fgwt_incRes_map{\
					background-position: 0 -30px;\
				}\
				#fgwt_incRes_metero{\
					background-position: 0 -15px;\
				}\
				#fgwt_incRes_lhouse{\
					background-position: 0 0;\
				}\
				#fgwt_incRes_map.fgwt_incRes_inactive{\
					background-position: -15px -30px;\
				}\
				#fgwt_incRes_metero.fgwt_incRes_inactive{\
					background-position: -15px -15px;\
				}\
				#fgwt_incRes_lhouse.fgwt_incRes_inactive{\
					background-position: -15px 0;\
				}\
			</style>");
				},
				init: function(){
					if( typeof CommandInfo !== "undefined" ){
						this.initCss();
						$("body").ajaxComplete( fer_cf( this.load, this ) );
						faarksGrepoTools.setInterrupt( CommandInfo, "close", this, this.load );
						faarksGrepoTools.setInterrupt( CommandInfo, "start_countdown", this, this.setArrivalTime );
					}
				}
			},
			
			toTownOverview: {
				openOverviewObjects: { },
				openWalkTime_sortTablePopup: {
					possibleSorts: [ "townname", "walktime", "filterunit" ],
					current_sort: null,
					current_direction: null,
					current_target: null,
					current_callback: null,
					onSortClicked: function( new_sort ){
						$("#faarks_walkToOverview_filterHeadlineSortPopup").hide();
						this.current_callback( new_sort, this.current_sort == new_sort ? !this.current_direction : true );
						return false;
					},
					update: function( target_town_id, button_element, selected_sort, selected_direction, on_change_callback ){
						$("#faarks_walkToOverview_filterHeadlineGroupPopup").hide();
						var other = (target_town_id != this.current_target);
						this.current_sort = selected_sort;
						this.current_target = target_town_id;
						this.current_direction = selected_direction;
						this.current_callback = on_change_callback;
						var list = fgt.createPopup({
							id: "faarks_walkToOverview_filterHeadlineSortPopup",
							under: button_element,
							on_create: fer_cf( function(el,contentEl,options){
								for( var i = 0; i < this.possibleSorts.length; i++ ){
									var newLineButton = $('<a href="#" class="faarks_walkToOverview_filterHeadlineSortPopup_line f_wto_fhsp_filter_'+this.possibleSorts[i]+'">'+
										'<div class="f_wto_fhsp_asc"></div>'+
										'<div class="f_wto_fhsp_desc"></div>'+
										'<span></span>'+
										'</a>');
									newLineButton.find("span").text( fgt.getString( "walkTimes_toOverview_sort_"+this.possibleSorts[i]+"_text") );
									newLineButton.click( fer_cf( this.onSortClicked, this, [ this.possibleSorts[i] ] ) ).mousePopup( new MousePopup( fgt.getString( "walkTimes_toOverview_sort_"+this.possibleSorts[i]+"_popup" ) ) );
									contentEl.append( newLineButton );
								}
							}, this )
						});
						if( other || !list.is(":visible") ){
							list.find(".f_wto_fhsp_active").removeClass("f_wto_fhsp_active");
							list.find(".f_wto_fhsp_filter_"+this.current_sort+(this.current_direction?" .f_wto_fhsp_asc":" .f_wto_fhsp_desc")).addClass("f_wto_fhsp_active");
							list.show();
						}else{
							list.hide();
						}
					}
				},
				openWalkTime_filterTowngroupPopup: {
					current_group: null,
					current_target: null,
					current_callback: null,
					onGroupClicked: function( groupId ){
						$("#faarks_walkToOverview_filterHeadlineGroupPopup").hide();
						if( this.current_group != groupId )
							this.current_callback( groupId == "default" ? null : groupId );
						return false;
					},
					update: function( target_town_id, button_element, selected_group, on_change_callback ){
						$("#faarks_walkToOverview_filterHeadlineSortPopup").hide();
						var otherGroup = (target_town_id != this.current_target);
						this.current_group = selected_group ? selected_group : "default";
						this.current_target = target_town_id;
						this.current_callback = on_change_callback;
						var list = fgt.createPopup({
							id: "faarks_walkToOverview_filterHeadlineGroupPopup",
							under: button_element,
							on_create: fer_cf( function(el,contentEl,options){
								var townlist = fgt.getTowngroups();
								for( var i = 0; i < townlist.length; i++ ){
									var newLineButton = $('<a href="#" class="faarks_walkToOverview_filterHeadlineGroupPopup_line f_wto_fhgp_town_'+townlist[i].id+'"></a>');
									newLineButton.text( townlist[i].name ).click( fer_cf( this.onGroupClicked, this, [ townlist[i].id ] ) ).mousePopup( new MousePopup( fgt.getString( "walkTimes_toOverview_groups_onlyGroupButton_poup", { groupname: townlist[i].name } ) ) );
									contentEl.append( newLineButton );
								}
								if( townlist.length == 0 ){
									contentEl.append( '<span class="faarks_walkToOverview_filterHeadlineGroupPopup_line">'+fgt.getString("walkTimes_toOverview_groups_noGroupsFound")+'</span>' );
								}
								contentEl.append("<hr/>");
								var cgButton = $('<a href="#" class="faarks_walkToOverview_filterHeadlineGroupPopup_line f_wto_fhgp_town_default"></a>');
								cgButton.text( fgt.getString("walkTimes_toOverview_groups_defaultGroup") ).click( fer_cf( this.onGroupClicked, this, [ "default" ] ) ).mousePopup( new MousePopup( fgt.getString("walkTimes_toOverview_groups_onlyCurrentGroupButton_poup") ) );
								contentEl.append(cgButton);
							}, this )
						});
						if( otherGroup || !list.is(":visible") ){
							list.find(".f_wto_fhgp_activeLine").removeClass("f_wto_fhgp_activeLine");
							list.find(".f_wto_fhgp_town_"+this.current_group).addClass("f_wto_fhgp_activeLine");
							list.show();
						}else{
							list.hide();
						}
					}
				},
				openWalkTimeOverview: function( target_town_id ){
					fgt.loadCaptcha({
						on_success: fer_cf( function(){
							if( !this.openOverviewObjects[target_town_id] ){
								var self = this.openOverviewObjects[target_town_id] = {
									win: fgt.createWindow({
										id:"faark_walk_toTown"+target_town_id,
										content_class:"faarks_walkToOverview_content",
										onclose: fer_cf( function(){
											delete this.openOverviewObjects[target_town_id];
										}, this )
									}),
									headlineData: "none",
									orderdUnits: null,
									
									requiredUnits: [],
									requiredTowngroup: null,
									currentSort: "townname",
									currentSortDirectionUpwards: true,
									lastSortCache: { type:null, towns:0, dire: true },
									
									recalcVisibility: function(){
										var towns = fgt.getTownlist( { on_loaded: fer_cf( this.recalcVisibility, this ), listener_id: "fgt_walkToOverveiw_visibility" } );
										if( !towns )
											return;
										var towncache = {};
										var loadedTowns = 0;
										for( var i = 0; i  < towns.length; i++ ){
											towncache[towns[i].id] = faarksGrepoTools.walkDuration.getWithSourceDetail( towns[i].id, target_town_id, true );
											if( towncache[towns[i].id] )
												loadedTowns++;
										}
										var c_count = this.lastSortCache.towns;
										var c_sort = this.currentSort;
										if( c_sort == "filterunit" ){
											c_sort = this.requiredUnits.length > 0 ? ("u_"+this.requiredUnits[0]) : null;
										}else if( c_sort == "townname" ){
											c_count = towns.length;
										}
										if( (this.lastSortCache.type != c_sort) || (this.lastSortCache.towns != c_count) || (this.currentSortDirectionUpwards != this.lastSortCache.dire) ){
											var ftowns = [];
											var upwards = this.currentSortDirectionUpwards;
											switch( this.currentSort ){
												case "townname":
													ftowns = faarksUtility.sort.best( towns, function( a, b ){
														var an = a.name.toUpperCase();
														var bn = b.name.toUpperCase();
														return upwards ? an > bn : an < bn;
													} );
													break;
												case "filterunit":
													if( this.requiredUnits.length > 0 ){
														var reqU = this.requiredUnits[0];
														ftowns = faarksUtility.sort.best( towns, function( a, b ){
															var tc = towncache;
															var ac = tc[a.id] ? ( tc[a.id].unitCount[ reqU ] ? Number( tc[a.id].unitCount[ reqU ] ) : 0 ) : 0;
															var bc = tc[b.id] ? ( tc[b.id].unitCount[ reqU ] ? Number( tc[b.id].unitCount[ reqU ] ) : 0 ) : 0;
															return upwards ? ac > bc : ac < bc ;
														} );
													}
													break;
												case "walktime":
													ftowns = faarksUtility.sort.best( towns, function( a, b ){
														var ac = towncache[a.id] ? Number( towncache[a.id].times[ "attack_ship" ] ) : 0;
														var bc = towncache[b.id] ? Number( towncache[b.id].times[ "attack_ship" ] ) : 0;
														return upwards ? ac > bc : ac < bc ;
													} );
													break;
											}
											this.lastSortCache.type = c_sort;
											this.lastSortCache.towns = c_count;
											this.lastSortCache.dire = this.currentSortDirectionUpwards;
											var table = this.win.contentElement.find( ".faarks_walkToOverview_townlisttable" );
											for( var i = 0; i < ftowns.length; i++ ){
												var el = $('#faarks_toTownOverview_from'+ftowns[i].id+'to'+target_town_id+'line');
												table.append( el );
											}
										}
										if( this.requiredTowngroup ){
											var groupTowns = fgt.getTownlist({group_id: this.requiredTowngroup, on_loaded: fer_cf( this.recalcVisibility, this ), listener_id: "fgt_walkToOverveiw_visibility", minimal_output:true});
											if( groupTowns ){
												for( var i = towns.length - 1; i >= 0; i-- ){
													if( $.inArray( Number(towns[i].id), groupTowns ) < 0 ){
														$('#faarks_toTownOverview_from'+towns[i].id+'to'+target_town_id+'line').hide();
														towns.splice( i, 1 );
													}
												}
											}
										}
										// step 1: check all towns if there are all required units
										var remainingTownDataForStep2 = [];
										for( var i = 0; i < towns.length; i++ ){
											var el = $('#faarks_toTownOverview_from'+towns[i].id+'to'+target_town_id+'line');
											if( el.length > 0 ){
												var data = towncache[towns[i].id];
												if( data ){
													var gotAll = true;
													for( var v = 0; v < this.requiredUnits.length; v++ ){
														if( !data.unitCount[ this.requiredUnits[v] ] || (Number( data.unitCount[ this.requiredUnits[v] ] ) <= 0 ) ){
															gotAll = false;
															v = this.requiredUnits.length;
														}
													}
													if( gotAll ){
														el.show();
														remainingTownDataForStep2.push( data );
													}else{
														el.hide();
													}
												}
											}
										}
										// step 2: remove empty columns (data already loaded by step1)
										for( var i = 0; i < this.orderdUnits.length; i++ ){
											var u = this.orderdUnits[i];
											var got = false;
											for( var t = 0; t < remainingTownDataForStep2.length; t++ ){
												var uc = remainingTownDataForStep2[t].unitCount;
												if( uc[u] && (Number(uc[u])>0) ){
													got = true;
													t = remainingTownDataForStep2.length;
												}
											}
											if( got ){
												this.win.contentElement.find(".faarks_walkToOverview_townlisttable td:nth-child("+(i+2)+"), .faarks_walkToOverview_townlisttable th:nth-child("+(i+2)+")").show();
											}else{
												this.win.contentElement.find(".faarks_walkToOverview_townlisttable td:nth-child("+(i+2)+"), .faarks_walkToOverview_townlisttable th:nth-child("+(i+2)+")").hide();
											}
										}
									},
									resetFilters: function(){
										for( var i = this.requiredUnits.length - 1; i >= 0; i-- ){
											this.toggleUnitRequired( this.requiredUnits[i] );
										}
										this.requiredUnits = [];
										this.requiredTowngroup = null;
										this.currentSort = "townname";
										this.currentSortDirectionUpwards = true;
										this.recalcVisibility();
										this.drawFilterLine();
										return false;
									},
									toggleTowngroup: function( newGroupId ){
										this.requiredTowngroup = newGroupId;
										this.drawFilterLine();
										this.recalcVisibility();
									},
									toggleSort: function( newSort, direction ){
										this.currentSort = newSort;
										this.currentSortDirectionUpwards = direction;
										this.drawFilterLine();
										this.recalcVisibility();
									},
									toggleFilterTowngroupPopup: function(){
										var townlist = fgt.getTowngroups( fer_cf( this.drawFilterLine, this ) );
										if( townlist ){
											fgt.walkDuration.toTownOverview.openWalkTime_filterTowngroupPopup.update( 
												target_town_id, 
												this.win.contentElement.find(".faarks_walkToOverview_filterHeadline_group"), 
												this.requiredTowngroup, 
												fer_cf(this.toggleTowngroup,this) );
										}
										return false;
									},
									toggleSortPopup: function(){
										fgt.walkDuration.toTownOverview.openWalkTime_sortTablePopup.update( 
											target_town_id,
											this.win.contentElement.find(".faarks_walkToOverview_filterHeadline_sort"), 
											this.currentSort, 
											this.currentSortDirectionUpwards, 
											fer_cf(this.toggleSort,this) );
										return false;
									},
									drawFilterLine: function(){
										var box = this.win.contentElement.find("span.faarks_walkToOverview_filterHeadline");
										if( box.length <= 0 ){
											box = $('<span class="faarks_walkToOverview_filterHeadline"></span>');
											box.html( fgt.getString( "walkTimes_toOverview_filter_contentLine", {
												groupbutton: '<a href="#" class="faarks_walkToOverview_filterHeadline_group"></a>',
												units: '<span class="faarks_walkToOverview_filterHeadline_units"></span>',
												sort: '<a href="#" class="faarks_walkToOverview_filterHeadline_sort"></a>',
												clearallbutton: '<a class="game_arrow_delete" href="#"></a>'
											} ) );
											box.find(".game_arrow_delete").click( fer_cf( this.resetFilters, this ) ).mousePopup( new MousePopup( fgt.getString("walkTimes_toOverview_resetFiltersButton_popup") ) );
											box.find(".faarks_walkToOverview_filterHeadline_group").click( fer_cf( this.toggleFilterTowngroupPopup, this ) ).mousePopup( new MousePopup( fgt.getString("walkTimes_toOverview_groups_changeButton_popup") ) );
											box.find(".faarks_walkToOverview_filterHeadline_sort").click( fer_cf( this.toggleSortPopup, this ) ).mousePopup( new MousePopup( fgt.getString("walkTimes_toOverview_sort_changeButton_popup") ) );
											this.win.contentElement.append(box);
										}
										var ucnt = this.requiredUnits.length;
										box.find(".faarks_walkToOverview_filterHeadline_units").text( (ucnt == 0) ? fgt.getString("walkTimes_toOverview_filter_unitCount_none") : (ucnt == 1 ? fgt.getString("walkTimes_toOverview_filter_unitCount_one"): fgt.getString("walkTimes_toOverview_filter_unitCount_more", {count:ucnt} ) ) );
										box.find(".faarks_walkToOverview_filterHeadline_sort").text( fgt.getString( "walkTimes_toOverview_sort_"+this.currentSort+"_text" ) + (this.currentSortDirectionUpwards ? "<" : ">") );
										var townlist = fgt.getTowngroups( fer_cf( this.drawFilterLine, this ) );
										if( townlist ){
											for( var i = 0; i < townlist.length; i++ ){
												if( townlist[i].id == this.requiredTowngroup ){
													var groupContent = fgt.getTownlist({group_id: this.requiredTowngroup, on_loaded: fer_cf( this.drawFilterLine, this ), listener_id: "fgt_walkToOverveiw_drawFilters", minimal_output:true});
													if( groupContent ){
														box.find(".faarks_walkToOverview_filterHeadline_group").text( townlist[i].name );
													}else{
														box.find(".faarks_walkToOverview_filterHeadline_group").html( townlist[i].name + ' <img src="http://grepo.faark.de/faarksGrepoPicSaver/resources/loading.gif" style="width: 10px; height: 10px; display: inline; position: relative; top: 2px;"/>' );
													}
													return;
												}
											}
											box.find(".faarks_walkToOverview_filterHeadline_group").text( fgt.getString("walkTimes_toOverview_groups_defaultGroup") );
										}else{
											box.find(".faarks_walkToOverview_filterHeadline_group").html( fgt.getString("walkTimes_toOverview_groups_loading") + '<img src="http://grepo.faark.de/faarksGrepoPicSaver/resources/loading.gif" style="width: 10px; height: 10px; display: inline; position: relative; top: 2px;"/>' );
										}
									},
									drawTownline: function( sourceTown ){
										var el = $('#faarks_toTownOverview_from'+sourceTown+'to'+target_town_id+'line');
										if( (el.length > 0) && (el.find("td").length <= 1) ){
											var data = faarksGrepoTools.walkDuration.getWithSourceDetail( sourceTown, target_town_id, true );
											if( data && !data.error ){
												el.find(".faarks_walkToOverview_townRow_loadingTownImg").remove();
												for( var i = 0; i < this.orderdUnits.length; i++ ){
													var u = this.orderdUnits[i];
													if( data.unitCount[u] && (Number(data.unitCount[u])>0) ){
														el.append( '<td class="faarks_walkToOverview_gotUnitsCell"><span class="f_wto_cell_count">'+data.unitCount[u]+' </span><span class="f_wto_cell_time">'+readableSeconds( data.times[u] )+'</span></td>' );
													}else{
														el.append( '<td class="faarks_walkToOverview_noUnitsCell">'+readableSeconds( data.times[u] )+'</td>' );
													}
												}
											}else
												return false;
										}
										return true;
									},
									toggleUnitRequired: function( type ){
										var arrIndex = $.inArray( type, this.requiredUnits );
										var el = this.win.contentElement.find(".faarks_walkToOverview_contentbox .fgt_wto_unit_"+type);
										if( arrIndex < 0 ){
											this.requiredUnits.push( type );
										}else{
											this.requiredUnits.splice( arrIndex, 1 );
										}
										if( el.length > 0 ){
											el.toggleClass("faarks_walkToOverview_selectedUnit",arrIndex==-1);
											if( arrIndex == -1 ){
												el.parent().mousePopup(new MousePopup( fgt.getString("walkTimes_toOverview_table_unitHeadlinePopupSelected", GameData.units[type] ) ));
											}else{
												el.parent().mousePopup(new MousePopup( fgt.getString("walkTimes_toOverview_table_unitHeadlinePopup", GameData.units[type] ) ));
											}
										}
										this.drawFilterLine();
										this.recalcVisibility();
									},
									update: function(  ){
										var cbox = this.win.contentElement.find(".faarks_walkToOverview_contentbox");
										if( cbox.length <= 0 ){
											cbox = $('<div class="faarks_walkToOverview_contentbox"></div>');
											this.win.contentElement.append( cbox );
										}
										var towns = fgt.getTownlist( { listener_id: "fgt_walkToOverveiw_update", on_loaded: fer_cf( this.update, this ) } );
										if( towns ){
											if( cbox.find( ".faarks_walkToOverview_townlisttable" ).length <= 0 ){
												cbox.find( ".faarks_walkToOverview_loadingtownlisttext").remove();
												var tbl = $('<table class="faarks_walkToOverview_townlisttable"></table>');
												
												// sort units
												var ut = faarksGrepoTools.walkDuration.unitTypes;
												var allUnits = ut.defaultRowInLargeSelection.concat( ut.sea, ut.land, ut.air );
												for( var i = 0; i < allUnits.length; i++ ){
													var cur = allUnits[i];
													for( var v = i+1; v < allUnits.length; v++ ){
														if( cur == allUnits[v] ){
															allUnits.splice( v, 1 );
														}
													}
												}
												this.orderdUnits = allUnits;
												
												var headline = $("<tr><th>"+fgt.getString("walkTimes_toOverview_table_townHeadline")+"</th></tr>");
												for( var i = 0; i < allUnits.length; i++ ){
													var col = $('<th><div style="background-image: url(\'http://static.grepolis.com/images/game/units/'+allUnits[i]+'_40x40.png\');" class="index_unit bold fgt_wto_unit_'+allUnits[i]+'"></div></th>');
													col.mousePopup(new MousePopup( fgt.getString("walkTimes_toOverview_table_unitHeadlinePopup", GameData.units[allUnits[i]] ) ));
													col.click( fer_cf( this.toggleUnitRequired, this, [ allUnits[i] ] ) );
													headline.append( col );
												}
												
												tbl.append( headline );
												for( var i = 0; i < towns.length; i++ ){
													if( towns[i].id != target_town_id ){
														tbl.append('<tr id="faarks_toTownOverview_from'+towns[i].id+'to'+target_town_id+'line"><td class="walkTimes_toOverview_table_townlinkCol"><a href="'+url( Game.controller, null, $.extend( {}, faarksUtility.getParams(), { town_id: towns[i].id } ) )+'" class="f_wto_townname">'+towns[i].name+'</a> <img src="http://grepo.faark.de/faarksGrepoPicSaver/resources/loading.gif" class="faarks_walkToOverview_townRow_loadingTownImg"/><a class="center_on_map" href="'+url("map",null,{target_town_id:target_town_id,town_id:towns[i].id})+'"><img alt="" src="http://static.grepolis.com/images/game/profile/center.png"></a></td></tr>');
													}
												}
												
												
												cbox.append( tbl );
												
												
											}/*else if( sourceTown ){
												this.drawTownline( sourceTown );
											}*/
											
											var change = false;
											for( var i = 0; i < towns.length; i++ ){
												if( !this.drawTownline( towns[i].id ) ){
													i = towns.length;
													change = true;
												}
											}
											
											if( !change )
												this.recalcVisibility();
											
										}else{
											if( cbox.find( ".faarks_walkToOverview_loadingtownlisttext" ).length <= 0 ){
												cbox.append( '<span class="faarks_walkToOverview_loadingtownlisttext">'+fgt.getString("walkTimes_toOverview_window_loadingTowns")+' <img src="http://grepo.faark.de/faarksGrepoPicSaver/resources/loading.gif" style="width: 16px; height: 16px; display: inline; position: relative; top: 1px;"/></span>');
											}
										}
									},
									redrawHeadline: function( data, textstatus, xhr ){
										if( data ){
											var infoContent = faarksUtility.getDomByHtml( data );
											var tdata = {
												town_name: $.trim( infoContent.find( "#towninfo_towninfo .game_header" ).text() ),
												player_id: null,
												player_name: null,
												ally_id: null,
												ally_name: null
											};
											var listLinks = infoContent.find("#towninfo_towninfo .game_list a");
											for( var i = 0; i < listLinks.length; i++ ){
												var el = $(listLinks[i]);
												if( faarksUtility.getParam( "player_id", el.attr("href") ) ){
													tdata.player_id = faarksUtility.getParam( "player_id", el.attr("href") );
													tdata.player_name = el.text();
												}else if( faarksUtility.getParam( "alliance_id", el.attr("href") ) ){
													tdata.ally_id = faarksUtility.getParam( "alliance_id", el.attr("href") );
													tdata.ally_name = el.text();
												}
											}
											this.headlineData = tdata;
										}
										if( this.win.contentElement.find("h3").length <= 0 ){
											this.win.contentElement.append("<h3></h3>");
										}
										if( typeof this.headlineData === "string" ){
											this.win.contentElement.find("h3").html( fgt.getString("walkTimes_toOverview_window_headlineShort",{town_text: target_town_id}) + " <img src=\"http://grepo.faark.de/faarksGrepoPicSaver/resources/loading.gif\" style=\"width: 16px; height: 16px; display: inline; position: relative; top: 1px;\"/>" );
											if( this.headlineData == "none" ){
												$.ajax({
													url: url("town_info","info",{id:target_town_id}),
													dataType: "text",
													success: fer_cf( this.redrawHeadline, this ),
													error: fer_cf( function(){
														this.headlineData = "error";
													}, this )
												});
											}
										}else{
											var text_params = {
												town:
													'<a onclick="javascript:return Layout.townLinkClicked(this, '+target_town_id+', \''+this.headlineData.player_id+'\', \''+url("map",null,{target_town_id:target_town_id})+'\')" href="'+url("map",null,{target_town_id:target_town_id})+'">'+this.headlineData.town_name+'</a>',
												player: 
													this.headlineData.player_id ? 
													('<a href="'+url("player",null,{player_id:this.headlineData.player_id})+'"><img alt="" src="http://static.grepolis.com/images/game/temp/player.png"> '+this.headlineData.player_name+'</a>'):
													fgt.getString("walkTimes_toOverview_window_headline_noPlayer"),
												ally:
													this.headlineData.ally_id ?
													('<a href="'+url("alliance",null,{alliance_id:this.headlineData.ally_id})+'"><img alt="" src="http://static.grepolis.com/images/game/temp/ally.png"> '+this.headlineData.ally_name+'</a>'):
													fgt.getString("walkTimes_toOverview_window_headline_noAlly")
											};
											
											this.win.contentElement.find("h3").html( fgt.getString("walkTimes_toOverview_window_headlineLong", text_params ) );
										}
									}
								};
								self.redrawHeadline();
								self.drawFilterLine();
								self.update();
								var by = $(fgt.getString("by"));
								by.css({position: "absolute", bottom:-4 , right:6});
								self.win.contentElement.append(by);
							}
						}, this )
					});
				},
				onTownInfoOpend:function( ){
					if( TownInfo.type !== "town_info" )
						return;
					var win = $("#townWindow #info_tab_window_bg");
					if( (win.length > 0) && ( win.find("#faarks_walkToOverview_townInfoButton").length <= 0) ){
						var btn = $('<a href="" id="faarks_walkToOverview_townInfoButton"></a>');
						btn.click( fer_cf( function(){
							this.openWalkTimeOverview( TownInfo.town_id );
							return false;
						}, this ) );
						btn.mousePopup(new MousePopup(fgt.getString("walkTimes_toOverview_menuButton_popup")));
						win.append( btn );
					}
				},
				townLinkClicked: function( ele, town_id, player_id, url, target ){
					if( !Layout.town_link_clicked_menu.is(':hidden') ){
						Layout.town_link_clicked_menu.find("#faarks_walkToOverview_menuButton").unbind("click").click( fer_cf( function(){
							Layout.town_link_clicked_menu.hide();
							this.openWalkTimeOverview( town_id );
							return false;
						}, this ) );
					}
				},
				update: function( trg_id, src_id ){
					for( var i in this.openOverviewObjects ){
						this.openOverviewObjects[i].update();
					}
					/* that dosnt update when doing just a pratial server-call
					if( this.openOverviewObjects[trg_id] ){
						this.openOverviewObjects[trg_id].update( src_id );
					}
					*/
				},
				initCss: function(){
					$('head').append("<style type=\"text/css\">\
				#faarks_walkToOverview_menuButton{\
					display: block;\
				}\
				.faarks_walkToOverview_content h3 a img{\
					position: relative;\
					top: 2px;\
				}\
				.walkTimes_toOverview_table_townlinkCol{\
					position: relative;\
					display: block;\
				}\
				.faarks_walkToOverview_content .center_on_map{\
					position: absolute;\
					left: 0px;\
					top: 0px;\
				}\
				.faarks_walkToOverview_content .f_wto_townname{\
					padding-left: 22px;\
					position: relative;\
					top: 1px;\
				}\
				#faarks_walkToOverview_townInfoButton{\
					position:absolute;\
					right:64px;\
					top:0;\
					display:inline-block;\
					height:23px;\
					width:22px;\
					cursor:pointer;\
					background-image:url( http://grepo.faark.de/faarksGrepoTools/resources/walktooverview_button.png);\
				}\
				#faarks_walkToOverview_townInfoButton:hover{\
					background-position:-22px 0;\
				}\
				.faarks_walkToOverview_filterHeadline {\
					absolute; right: 11px;\
					font-size: 80%;\
					color: grey;\
					top: 54px;\
					position: absolute;\
				}\
				.faarks_walkToOverview_filterHeadline .game_arrow_delete {\
					float: none;\
					display: inline-block;\
					top: 3px;\
				}\
				.faarks_walkToOverview_filterHeadline_group {\
					color: grey;\
				}\
				.faarks_walkToOverview_contentbox{\
					background:url(\"http://static.grepolis.com/images/game/towninfo/content_bg.jpg\") no-repeat scroll 0 0 transparent;\
					height:300px;\
					position:absolute;\
					top:75px;\
					width:480px;\
					padding:4px;\
				}\
				.faarks_walkToOverview_townlisttable{\
					display:block;\
					height:291px;\
					overflow:auto;\
					width:472px;\
					position:relative;\
				}\
				.faarks_walkToOverview_loadingtownlisttext{\
					margin:4px;\
				}\
				.faarks_walkToOverview_selectedUnit{\
					border-width: 2px;\
				}\
				.faarks_walkToOverview_townRow_loadingTownImg{\
					width: 10px;\
					height: 10px;\
					display: inline;\
					position: relative;\
					top: 1px;\
				}\
				.faarks_walkToOverview_townlisttable th, .faarks_walkToOverview_townlisttable td{\
					padding: 0;\
					margin: 0;\
					border: 0;\
				}\
				.faarks_walkToOverview_noUnitsCell{\
					color: lightgray;\
					font-size: 70%;\
					text-align: center;\
				}\
				.faarks_walkToOverview_gotUnitsCell{\
					color: gray;\
					font-weight: bold;\
					text-align: center;\
				}\
				.f_wto_cell_count{\
					display: block;\
					font-size: 110%;\
				}\
				.f_wto_cell_time{\
					display: block;\
					font-size: 70%;\
				}\
				.faarks_walkToOverview_filterHeadlineGroupPopup_line{\
					display:block;\
					padding-left:16px;\
				}\
				.faarks_walkToOverview_filterHeadlineGroupPopup_line.f_wto_fhgp_activeLine{\
					background: url(\"http://static.grepolis.com/images/game/overviews/active_group.png\") no-repeat 0 2px;\
				}\
				.faarks_walkToOverview_filterHeadlineSortPopup_line{\
					display: block;\
					position: relative;\
					height: 19px;\
				}\
				.faarks_walkToOverview_filterHeadlineSortPopup_line span{\
					margin-left: 21px;\
					position: relative;\
					top: 1px;\
				}\
				.faarks_walkToOverview_filterHeadlineSortPopup_line div{\
					display:none;\
					position: absolute;\
					height: 19px;\
					width: 18px;\
					background-image: url(\"http://static.grepolis.com/images/game/layout/button.png\");\
				}\
				.faarks_walkToOverview_filterHeadlineSortPopup_line div.f_wto_fhsp_active{\
					display:block;\
				}\
				.faarks_walkToOverview_filterHeadlineSortPopup_line div.f_wto_fhsp_asc{\
					background-position: 0 -19px;\
				}\
				.faarks_walkToOverview_filterHeadlineSortPopup_line div.f_wto_fhsp_desc{\
					background-position: -18px -19px;\
				}\
			</style>");
				},
				init: function(){
					this.initCss();
					if( $('#town_link_clicked_menu').length > 0 ){
						faarksGrepoTools.setInterrupt( Layout, "townLinkClicked", this, this.townLinkClicked );
						var myButton = $("<a id=\"faarks_walkToOverview_menuButton\" href=\"\"></a>");
						myButton.text( fgt.getString("walkTimes_toOverview_menuButton_text") );
						myButton.mousePopup(new MousePopup(fgt.getString("walkTimes_toOverview_menuButton_popup")));
						$('#town_link_clicked_menu').find("a:last").after( myButton );
					}
					if( typeof TownInfo !== "undefined" ){
						faarksGrepoTools.setInterrupt( TownInfo, "init", this, this.onTownInfoOpend );
						//$('body').ajaxComplete( fer_cf( this.onPageContentLoaded, this ) );
					}
					
				}
			},
			
			onupdate: function( target_id, source_id ){
				this.map_popup.update( target_id, source_id );
				this.commandTab.update( target_id, source_id );
				this.toTownOverview.update( target_id, source_id );
			},
			ondataupdate: function(){
				this.commandTab.lastDrawState = null;
				this.onupdate();
			},
			init: function(){
				/*this.dataStorage = faarksGrepoSavedConfig.init(
					"fg_walkDuration", [
						faarksGrepoSavedConfig.cDescription1( "Laufzeiten" ),
						faarksGrepoSavedConfig.cVar1( "unitorder", [], "object", faarksGrepoSavedConfig.cDescription1("Standard reihenfolge der Einheiten", "Die standard-Reihenfolge, in der die Einheiten z.B. in der Laufzeitenübersicht angezeigt werden sollen." ) ),
						[
							faarksGrepoSavedConfig.cDescription1( "Standard für fremde Incs" ),
							faarksGrepoSavedConfig.cVar1( "foreignDefault_lighthouse", true, undefined, "Leuchturm" ),
							faarksGrepoSavedConfig.cVar1( "foreignDefault_cartography", true, undefined, "Kartographie" ),
							faarksGrepoSavedConfig.cVar1( "foreignDefault_meteorology", true, undefined, "Meterologie" )
						]
					], fer_cf( this.ondataupdate, this ) );*/
				//this.map_popup.init();
				//this.commandTab.init();
				this.toTownOverview.init();
			}
		},
		quickCast: { // Cast-UI when click on god-logo
			init: function(){
				$("#god_mini").css("cursor","pointer");
				$("#god_mini").mousePopup(new MousePopup(fgt.getString("quickCast_popup")));
				$("#god_mini").click( function( ) { TownInfo.init(Game.townId,'town_info',false,"#content");$("#info_tab_window_bg").tabs('select',4); } );
				// open town-Spell-dialog javascript:$("#info_tab_window_bg").tabs('select',4);void(0);
			}
		},
		/*incommingLink: { //incomming-link; now implemented by inno&other module
			init: function{
				if( $("#game_incoming").length > 0 ){
					var cnt = Number( $("#game_incoming").text() );
					$("#game_incoming").css("cursor","pointer");
					$("#game_incoming").mousePopup(new MousePopup("Auf dich laufen gerade "+cnt+" Angriffe!!!<br/><br/>Klicke hier, um in die<br/> Befehlsübersicht zu gelangen.<br/><span style='float:right;color: gray;font-size: 60%;'>by Faark</span>"));
					$("#game_incoming").click( function(){ window.location.href=url("building_place","command_overview");} );
				}
			}
		},*/
		movablePopups: { //movable popups
			makeWindowMovable: function( win, options ){
				try{
					win = $(win);
					if( win.length <= 0 )
						return;
					var loc = win.offset();
					$("body").append(win);
					win.css({"text-align":"left","z-index":98,"top":loc.top,"left":loc.left});
					win.draggable($.extend({},{
						cancel:"#info_tab_window_bg a, #info_tab_window_bg ul li, #info_tab_window_bg div div, #info_tab_window_bg iframe, #tutorial_window_arrows, input",
						containment:"document",
						cursor: 'move',
						opacity: 0.7,
						scroll:true,
						snap:true
					},options));
				}catch(err){
					faarksErrorReporter.report(err);
				}
			},
			after_townLinkClicked: function(){
				Layout.town_link_clicked_menu.css({ "z-index": 99 });
			},
			townlist_firstCall: true,
			onTownlistOpend: function(){
				var tl = $("#town_list");
				if( tl.is(":visible") && (tl.parent().attr("id") == "box") ){
					if( this.townlist_firstCall ){
						this.makeWindowMovable( tl );
						tl.css("text-align","center");
						this.townlist_firstCall = false;
					}else{
						$("body").append( $('#town_list') );
					}
				}
			},
			init: function(){
				$("style:first").append(" #ajax_loader{ z-index:10000 } ");
				faarksGrepoTools.setInterrupt( Layout, "townLinkClicked", this, this.after_townLinkClicked );
				if( (typeof TownInfo === 'object') && (typeof TownInfo.init === 'function') ){
					faarksGrepoTools.setInterrupt( TownInfo, "init", this, function(){this.makeWindowMovable( $("#townWindow") );} );
				}
				if( (typeof ConquerorInfo === 'object') && (typeof ConquerorInfo.init === 'function') ){
					faarksGrepoTools.setInterrupt( ConquerorInfo, "init", this, function(){this.makeWindowMovable( $("#conquerorWindow") );} );
				}
				if( (typeof CommandInfo === 'object') && (typeof CommandInfo.init === 'function') ){
					faarksGrepoTools.setInterrupt( CommandInfo, "init", this, function(){this.makeWindowMovable( $("#commandWindow") );} );
				}
				if( $("#player_hint").length > 0 ){
					this.makeWindowMovable( $("#player_hint") );
				}
				if( (typeof Tutorial === 'object') && (typeof Tutorial.init === 'function') ){
					faarksGrepoTools.setInterrupt( Tutorial, "init", this, function(){if( $('#tutorial_window').parent("#box").length > 0){this.makeWindowMovable( $("#tutorial_window") );}} );
					this.makeWindowMovable( $("#tutorial_window") );
				}
				if( (typeof UnitsBeyondInfo === 'object') && (typeof UnitsBeyondInfo.init === 'function') ){
					faarksGrepoTools.setInterrupt( UnitsBeyondInfo, "init", this, function(){this.makeWindowMovable( $("#unitsBeyondWindow") );} );
				}
				if( (typeof Reports === 'object') && (typeof Reports.showPublishReportDialog === 'function') ){
					faarksGrepoTools.setInterrupt( Reports, "showPublishReportDialog", this, function(){this.makeWindowMovable( $("#report_publish_dialog") );} );
				}
				if( (typeof WMap === 'object') && (typeof WMap.toggleColorTable === 'function') ){
					faarksGrepoTools.setInterrupt( WMap, "toggleColorTable", this, function(){this.makeWindowMovable( $("#map_color_table") );} );
				}
				$('#town_list').ajaxComplete(fer_cf( this.onTownlistOpend, this ));
			}
		},
		advancedTownlistLinks: { //advanced townlist
			isGrouplist: false,
			townCoordCache: {},
			scrollToTown: function(town_id){
				if( typeof WMap === "undefined"){
					return true;
				}else{
					if( this.townCoordCache[town_id] === true )
						return;//loading
					else if( this.townCoordCache[town_id] && (this.townCoordCache[town_id].status == "ok") ){
						var x = this.townCoordCache[town_id].x-1;
						var y = this.townCoordCache[town_id].y-1;
						//WMap.jumpToPos( x, y );
						//copy of jumpToPos, to use custom callback that sets focus
						var map=WMap.mapTiles.pixel2Map(WMap.scrollBorder.xMax,WMap.scrollBorder.yMax);
						WMap.clearMarker();
						WMap.mapTiles.focussed_town_id = town_id;
						WMap.mapData.checkReload(x,y,WMap.chunkSize,WMap.chunkSize,function(){
							//set location
							WMap.setPosition({x:x,y:y});
							WMap.last_move_x=WMap.last_move_y=0;
							//change focus
							var towns = MapTiles.mapData.getTowns(MapTiles.tile.x,MapTiles.tile.y,MapTiles.tileCount.x,MapTiles.tileCount.y);
							for(i in towns){
								var town=towns[i];
								if( (town.id == town_id) && (WMap.getTownType(town) == 'town')){
									var islandOffset = MapTiles.map2Pixel(town.x,town.y);
									$(".focussedtown").remove();
									var div_town_focus=$('<div />')
									.addClass('focussedtown')
									.css({
										'left':MapTiles.cssOffset.x+islandOffset.x+town.offset_x+'px',
										'top':MapTiles.cssOffset.y+islandOffset.y+town.offset_y+'px'
									});
									MapTiles.elm.towns.append(div_town_focus);
								}
							}
							
						});
						
					}else{
						$.ajax({
							url: 'http://www.grepotools.de/townid2coo.cgi',
							data: {
								townid:town_id,
								world:faarksGrepoTools.currentWorld
							},
							error: fer_cf(function(request,error){
								HumanMessage.error(fgt.getString("extTownlist_errorMsg"));
								this.townCoordCache[town_id] = false;
							},this),
							success: fer_cf(function(request){
								var data = request.split("|");
								if( data.length == 2 )
									this.townCoordCache[town_id] = { status: "ok", x: Number(data[0]), y: Number(data[1]) };
								else
									this.townCoordCache[town_id] = { error: request };
								this.scrollToTown( town_id );
							},this)
						});
						$('#town_list').hide().empty();
					}
					return false;
				}
			},
			showTownInfo: function(id){
				TownInfo.init(id,'town_info',false,'#content');
				$('#town_list').hide().empty();
			},
			staticAddButtonToTownlist: function(){
				if( this.isGroupList )
					return;
				if( $("#town_list li .faarksGrepoTownListEnhancement_box").length > 0 )
					return;
				var els = $("#town_list li");
				for( var i = 0; i < els.length; i++ ){
					var el = $(els[i]);
					var a = el.find("a:first");
					var tid = null;
					var oldLink = /town_id=([^\&]*)/.exec( a.attr("href") );
					if( oldLink ){
						tid = Number( oldLink[1] );
					}else{
						var newLink = /gotoTown\(([0-9]*)\)/.exec( a[0].attributes["onclick"].value );
						if( newLink ){
							tid = Number( newLink[1] );
							
							var locationData = faarksGrepoTools.getParams();
							locationData["town_id"] = tid;
							a.attr( "href", url( '', '', locationData ) ).removeAttr( "onclick" );
						}else{
							throw new Error( "no townId found" );
						}
					}
					if( el.find(".faarksGrepoTownListEnhancement_box").length == 0 ){
						a.before("<div class=\"faarksGrepoTownListEnhancement_box\"><div class=\"faarksGrepoTownListEnhancement_infoButton\"></div><a href=\""+url("map","",{target_town_id:tid})+"\" class=\"faarksGrepoTownListEnhancement_gotoButton\"></a></div>");
						el.find(".faarksGrepoTownListEnhancement_infoButton").click( fer_cf(this.showTownInfo,this,[tid]) );
						el.find(".faarksGrepoTownListEnhancement_gotoButton").click( fer_cf(this.scrollToTown,this,[tid]) );
						el.find(".faarksGrepoTownListEnhancement_infoButton").mousePopup(new MousePopup(fgt.getString("extTownlist_infoPopup"),{"z-index":30000}));
						if( typeof WMap === "undefined")
							el.find(".faarksGrepoTownListEnhancement_gotoButton").mousePopup(new MousePopup(fgt.getString("extTownlist_gotoMap"),{"z-index":30000}));
						else
							el.find(".faarksGrepoTownListEnhancement_gotoButton").mousePopup(new MousePopup(fgt.getString("extTownlist_gotoOnMap"),{"z-index":30000}));
					}
				}
			},
			initCss: function(){
				$('head').append("<style type=\"text/css\">\
				.faarksGrepoTownListEnhancement_box{\
					display: none;\
					position: absolute;\
					right: 24px;\
					z-index: 350;\
				}\
				#town_list li:hover .faarksGrepoTownListEnhancement_box{\
					display: block;\
				}\
				.faarksGrepoTownListEnhancement_infoButton, .faarksGrepoTownListEnhancement_gotoButton{\
					width: 14px;\
					height: 14px;\
					display: inline-block;\
					cursor: pointer;\
					margin-left: 3px;\
					position:relative;\
					top:1px;\
				}\
				.faarksGrepoTownListEnhancement_infoButton{\
					background:transparent url(http://grepo.faark.de/faarksGrepoTools/resources/bbc_logo_town_small.png) no-repeat scroll 0 0;\
				}\
				.faarksGrepoTownListEnhancement_gotoButton{\
					background:transparent url(http://grepo.faark.de/faarksGrepoTools/resources/bbc_logo_world_small.png) no-repeat scroll 0 0;\
				}");
			},
			init: function(){
				if( $('#town_list').length > 0 ){
					this.initCss();
				}
				$('#town_list').ajaxComplete(fer_cf( this.staticAddButtonToTownlist, this ));
				
				faarksGrepoTools.setInterrupt( Layout, "toggleTownList", this, function(){ this.isGroupList = false; }, true );
				faarksGrepoTools.setInterrupt( Layout, "toggleTownGroupList", this, function(){ this.isGroupList = true; }, true );
				//$("#popup_div").css("z-index",10000);
			}
		},
		advancedPaginator: {
			initAdvancedPaginator: function( baseEl, urlFunc ){
				if( (baseEl.length <= 0) || !urlFunc )
					return;
				this.go = function(){
					var no = Number( this.input.val() );
					if( no < this.min )
						no = this.min;
					if( no > this.max )
						no = this.max;
					var url = this.url( no );
					if( url )
						window.location.href = url;
					return false;
				};
				this.cancel = function(){
					this.input.val( this.defaultValue );
				};
				this.focus = function(){
					this.uSlider.showSlider(this.input.attr("id"));
				};
				this.url = urlFunc;
				this.baseElement = baseEl;
				var oldCurrentBox = baseEl.find("#paginator_selected");
				var min = oldCurrentBox;
				var max = oldCurrentBox;
				while( min.length > 0 ){
					this.min = Number( min.text() );
					min = min.prev(".paginator_bg");
				}
				while( max.length > 0 ){
					this.max = Number( max.text() );
					max = max.next(".paginator_bg");
				}
				if( this.min == this.max )
					return;
				this.input = $("<input type=\"text\"></input>");
				this.defaultValue = oldCurrentBox.text();
				this.input.val( this.defaultValue );
				this.input.focus( fer_cf( this.focus, this ) );
				//this.input.blur( fer_cf( this.blur, this) );
				this.input.keypress( fer_cf( function(event){if(event&&((event.which&&event.which==13)||(event.keyCode&&event.keyCode==13))){return this.go();}},this) );
				this.input.attr("id", faarksGrepoTools.uidgen());
				this.input.css({
					border: "none",
					"background-color": "transparent",
					"font-weight": "bold",
					padding: 0,
					margin: 0,
					"text-align":"center",
					color: "#FFCC66",
					width: 39,
					height: 19
				});
				oldCurrentBox.css({
					position:"relative",
					padding:0
				});
				oldCurrentBox.html("");
				var sliderBox = $('\
				<div class="unit_slider_container" style="top:22px;height:45px;float:none;">\
					<a class="unit_slider_button button prev" href="#"></a>\
					<div class="unit_slider"></div>\
					<a class="unit_slider_button button next" href="#"></a>\
					<div class="game_footer" id="buttons">\
						<a class="confirm" href="#" style="float: right;margin-left:2px;"></a>\
						<a class="cancel" href="#" style="float: right;margin-left:2px;"></a>\
					</div>\
				</div>');
				var toggleBox = $('<div class="unit_slider_toggle" style="top:0px;right:-1px"></div>');
				sliderBox.find(".confirm").click( fer_cf(function(){ this.go(); return false; },this ) );
				sliderBox.find(".cancel").click( fer_cf(function(){ this.cancel(); return false; },this) );
				oldCurrentBox.append(sliderBox);
				oldCurrentBox.append(toggleBox);
				oldCurrentBox.append(this.input);
				this.input.mousePopup(new MousePopup(fgt.getString("paginator_defaultPopup")));
				sliderBox.find(".confirm").mousePopup(new MousePopup(fgt.getString("paginator_confirmPopup")));
				sliderBox.find(".cancel").mousePopup(new MousePopup(fgt.getString("paginator_cancelPopup")));
				if(typeof UnitSlider == "undefined"){
					$("head").append("<script type=\"text/javascript\" src=\"/cache/game/unitslider.js\"></script>");
					$.ready(fer_cf(function(){
						this.uSlider = new UnitSlider();
						this.uSlider.initialize(this.input.attr("id"),this.min,this.max);
					},this));
				}else{
					this.uSlider = new UnitSlider();
					this.uSlider.initialize(this.input.attr("id"),this.min,this.max);
				}
			},
			init: function(){
				if( $("#paginator_selected").length > 0 ){
					new this.initAdvancedPaginator($("#report_reports .game_header"),function(a){return url("report","index",{folder_id:Number(faarksGrepoTools.currentFolder),status:"all",offset:(a-1)*10});});
					new this.initAdvancedPaginator($("#ally_events .game_list_footer"),function(a){return url("alliance","index",{offset:(a-1)*10});});
					new this.initAdvancedPaginator($("#message_messages .game_header"),function(a){return url("message","",{folder_id:Number(faarksGrepoTools.currentFolder),status:"all",offset:(a-1)*10});});
					new this.initAdvancedPaginator($("#message_message_list .game_header"),function(a){return url("message","view",{offset:(a-1)*10,id:faarksGrepoTools.getParam("id")});});
					new this.initAdvancedPaginator($("#forumtitle"),function(a){return url("alliance","forum",{"forum[forum_id]":Number(faarksGrepoTools.getParam("forum[forum_id]",$("#forumtitle a.paginator_bg:first").attr("href"))),"forum[page]":a});});
					new this.initAdvancedPaginator($("#threadtitle"),function(a){return url("alliance","forum",{"forum[thread_id]":faarksGrepoTools.getParam("forum[thread_id]"),"forum[page]":a});});
					if( Game.controller == "ranking" ){
						new this.initAdvancedPaginator($("#content"),function(a){var alink=$("#content a.paginator_bg:first").attr("href");return url("ranking",faarksGrepoTools.getParam("action",alink),$.extend({offset:(a-1)*12},(faarksGrepoTools.getParam("type",alink)?{type:faarksGrepoTools.getParam("type",alink)}:{})));});
					}
				}
			}
		},
		gotoLastForumPage: {
			init: function(){
				if($("#threadlist").length > 0){
					var posts = $("#threadlist .thread");
					for( var i = 0; i < posts.length; i++ ){
						var post = $(posts[i]);
						var page = Math.ceil( ( Number( $.trim(post.find(".postcount").text()) ) + 1 )/ 20 );
						if( page > 1 ){
							post.find(".title").append('<a class="lastpostlink" href="'+post.find(".title a").attr("href")+"&forum[page]="+page+'" style="background:transparent url(http://static.grepolis.com/images/game/forum/expand.png) repeat scroll 0 0; width:12px; height:12px; display:inline-block; position:relative; top:2px;"></a>');
							post.find(".lastpostlink").mousePopup(new MousePopup(fgt.getString("gotoLastForumPage_popup",{page:page})));
						}
					}
				}
			}
		},
		templeLinkWhenNoGod: {
			init: function(){
				if( $("#god_mini").length < 1 ){
					$("#res").append('<a id="god_mini" href="'+url("building_temple")+'" alt="" style="margin-top: 5px; margin-right: 10px;opacity:0.8;filter:alpha(opacity=80)"><img alt="" src="http://static.grepolis.com/images/game/temple/shield.png" style="width: 52px; height: 52px;"></a>');
					$("#god_mini").mousePopup(new MousePopup(fgt.getString("gotoTempleWhenNoGod_popup")));
				}
			}
		},
		getForumLink: {
			alert: function(){
				alert( document.location.href.replace(/\[/g,"%5B").replace(/\]/g,"%5D") );
			},
			init: function(){
				if( $("#forum").length > 0 ){
					var btn = $('<div style="display:block; position:absolute; top:6px; right:5px; width: 12px; height: 12px; background-image:url(\'http://grepo.faark.de/faarksGrepoTools/resources/Icon_External_Link.png\')"></div>');
					btn.click( fer_cf( this.alert, this ) );
					btn.mousePopup(new MousePopup(fgt.getString("getForumLink_popup")));
					$("#forumtitle, #threadtitle").append(btn);
				}
			}
		},
		/* OLD VERSION WITH DATA FROM GREX (prefere that, new one suxxs) moralInPopup: {
			//useOnLangs: ["de", "en"],
			useOnWorlds: [ "de10", "en8" ],
			data: {
				cache: {},
				onResponde: function( request, responde, error ){
					if( error ){
						this.cache[ request.townid ] = null;
					}else if( !responde ){
						this.cache[ request.townid ] = { state: "error", text: "Server Error" };
					}else if( isNaN( Number( responde ) ) ){
						this.cache[ request.townid ] = { state: "error", text: responde };
					}else{
						this.cache[ request.townid ] = { state: "ok", moral: Number( responde ) };
					}
					faarksGrepoTools.moralInPopup.towninfo.update( request.townid );
					faarksGrepoTools.moralInPopup.tooltip.update( request.townid );
				},
				get: function( townId ){
					if( !this.cache[townId] ){
						// REQUEST DATA HERE
						this.cache[townId] = {state:"processing"};
						$.ajax({
							type: "GET",
							url: "http://www.grepotools.de/moral.cgi",
							dataType: "text",
							townid: townId,
							data: {
								world: faarksGrepoTools.currentWorld,
								atterpid: Game.player_id,
								deffertid: townId
							},
							timeout: 5000,
							error: function(request,error){
								faarksGrepoTools.moralInPopup.data.onResponde( this, request, error );
							},
							success: function(request){
								faarksGrepoTools.moralInPopup.data.onResponde( this, request, null );
							}
						});
					}
					return this.cache[townId];
				}
			},
			tooltip: {
				data: null,
				lastShownTownId: null,
				getText: function(){
					var data = this.data.get( this.lastShownTownId );
					if( data.state == "ok" ){
						if( data.moral ){
							return faarksGrepoTools.getString( "moralInPopup_moralPopupLine", { moral: data.moral } );
						}
					}else if( data.state == "processing" ){
						return faarksGrepoTools.getString( "moralInPopup_loadingMoralPopupLine" );
					}
				},
				onMouseOver: function(e){
					var townid = /^town-(\d+)$/.exec(e.target.id);
					if( townid != null ){
						townid = townid[1];
						if (townid && (townid != Game.townId)) {
							this.lastShownTownId = townid;
							var text = this.getText();
							if( text )
								$("#popup_content table.popup_table_inside:first").append( "<tr id=\"faarksGrepoTools_toolTipRow_moral_town"+townid+"\">"+text+"</tr>" );
						}
					}
				},
				update: function( townId ){
					if( townId && (townId != this.lastShownTownId ) )
						return;
					var row = $("#faarksGrepoTools_toolTipRow_moral_town"+this.lastShownTownId);
					if( row.length == 1 ){
						var text = this.getText();
						if( text )
							row.html( text );
						else
							row.remove();
					}
				},
				init: function(dataSource){
					this.data = dataSource;
					if (typeof WMap == "object" ) {
						document.addEventListener('mouseover', function(e){ faarksGrepoTools.moralInPopup.tooltip.onMouseOver(e); }, false);
					}
	            }			
			},
			towninfo: {
				data: null,
				getRowContent: function(){
					var data = this.data.get( TownInfo.town_id );
					switch( data.state ){
						case 'ok':
							return {
								text: faarksGrepoTools.getString( "moralInPopup_townInfo_moral_text", { moral: data.moral } ),
								tool: faarksGrepoTools.getString( "moralInPopup_townInfo_moral_popup", { moral: data.moral } )
							};
							break;
						case 'processing':
							return {
								text: faarksGrepoTools.getString( "moralInPopup_townInfo_loading_text" ),
								tool: faarksGrepoTools.getString( "moralInPopup_townInfo_loading_popup" )
							};
							break;
						case 'error':
							if( (data.text == "Same players") || (data.text == "Town not found") )
								return null;
							return {
								text: faarksGrepoTools.getString( "moralInPopup_townInfo_error_text", {errortext: data.text} ),
								tool: faarksGrepoTools.getString( "moralInPopup_townInfo_error_popup", {errortext: data.text} )
							};
							break;
					}
				},
				staticOnTabLoaded: function(){ faarksGrepoTools.moralInPopup.towninfo.onTabLoaded( $(this) ); },
				onTabLoaded: function( element ){
					var box = element.find("#towninfo_towninfo .game_list");
					if( ( box.length === 1 ) && (box.find("#faarksGrepoTools_townMoraleInfoRow").length === 0) ){
						var cls = box.find("li:last").hasClass("even") ? "odd" : "even";
						var data = this.getRowContent();
						if( data ){
							box.append( $("<li id=\"faarksGrepoTools_townMoraleInfoRow\" class=\""+cls+"\"></li>").append( data.text ) );
							if( data.tool )
								$("#faarksGrepoTools_townMoraleInfoRow").mousePopup(new MousePopup(data.tool));
						}
					}
				},
				towninfo_oldinit: null,
				towninfo_init: function(town_id,type,element_id){
					var r = null;
					var e = null;
					try{
						r = faarksGrepoTools.moralInPopup.towninfo.towninfo_oldinit.apply(TownInfo, arguments);
					}catch(er){e=er;}
					try{
						$('#townWindow').unbind('ajaxComplete',faarksGrepoTools.moralInPopup.towninfo.staticOnTabLoaded);
						$('#townWindow').ajaxComplete(faarksGrepoTools.moralInPopup.towninfo.staticOnTabLoaded);
					}catch(er){}
					if( e )
						throw e;
					return r;
				},
				update: function( tid ){
					if( tid && (tid != TownInfo.town_id ) ){
						return;
					}
					var box = $("#faarksGrepoTools_townMoraleInfoRow");
					if( box.length === 1 ){
						var data = this.getRowContent();
						if( !data )
							box.remove();
						else{
							box.html( data.text );
							if( data.tool )
								box.mousePopup(new MousePopup(data.tool));
						}
					}
				},
				init: function( data ){
					this.data = data;
					if( (typeof TownInfo === 'object') && (typeof TownInfo.init === 'function') ){
						this.towninfo_oldinit = TownInfo.init;
						TownInfo.init = this.towninfo_init;
					}
				}
			},
			init:function(){
				if( $.inArray( faarksGrepoTools.currentWorld, this.useOnWorlds ) >= 0 ){
					this.tooltip.init( this.data );
					this.towninfo.init( this.data );
				}
			}
		},
		*/
		moralInPopup: {
			dontUseOnWorlds: [ "de1", "de2", "de3", "de4", "de5", "de6", "de7", "de8", "de9", "de11", "de12", "en1", "en2", "en3", "en4", "en5", "en6", "en7", "xx1" ],
			ownMoral: {
				state: null,
				cache: null,
				getPointsFromTab: function( tabEl ){
					var l = $(tabEl).find("#towninfo_towninfo a");
					for( var i = 0; i < l.length; i++ ){
						if( /game\/player\?/.exec( $(l[i]).attr("href") ) ){
							var p = /[0-9]+/.exec( $(l[i]).parent().text().replace( $(l[i]).text(), "" ) );
							if( p && !isNaN(Number(p[0]) ) )
								return Number(p[0]);
						}
					}
					return null;
				},
				getPlayerIdFromTab: function( tabEl ){
					var l = $(tabEl).find("#towninfo_towninfo a");
					for( var i = 0; i < l.length; i++ ){
						if( /game\/player\?/.exec( $(l[i]).attr("href") ) ){
							var n = Number( faarksUtility.getParam("player_id", $(l[i]).attr("href") ) );
							if( isNaN( n ))
								return null;
							return n;
						}
					}
				},
				onOwnTownResponde: function( data, request, xhr, status, error ){
					if( error ){
						this.cache = { state: "error", text: "Server Error" };
					}else{
						try{
							this.cache = this.getPointsFromTab( faarksUtility.getDomByHtml( data ) );
							if( this.cache === null ){
								this.cache = { state: "error", text: "Server Error (Invalid)" };
							}
						}catch(err){
							this.cache[ request.townid ] = { state: "error", text: responde };
						}
					}
					faarksGrepoTools.moralInPopup.towninfo.update( );
				},
				getOwn: function(){
					if( !this.cache && (typeof this.cache !== "number")){
						// REQUEST DATA HERE
						this.cache = {state:"processing"};
						var self = this;
						$.ajax({
							url: url("town_info","info",{id:Game.townId}),
							dataType: "text",
							timeout: 5000,
							success: fer_cf( function( data, textStatus, xhr ){
								self.onOwnTownResponde( data, this, xhr, textStatus );
							}),
							error: fer_cf( function( xhr, textStatus, errorThrown ){
								self.onOwnTownResponde( null, this, xhr, textStatus, errorThrown );
							}),
						});
					}
					return this.cache;
				},
				get: function( tid ){
					try{
						if( TownInfo && TownInfo.town_id ){
							if( $("#townWindow").length > 0 ){
								if( this.getPlayerIdFromTab( $("#townWindow") ) == Game.player_id )
									return { state: "error", text: "Same players" };
								var pts = this.getPointsFromTab( $("#townWindow") );
								if( pts == null )
									return { state: "error", text: "Server Error (TownInfo)" }
								var own = this.getOwn();
								if( typeof own !== "number" ){
									return own;
								}
								return { state: "ok", moral: (Math.min((((pts / own)*3)+0.3),1)*100).toFixed(1) };
							}else
								return { state: "error", text: "TownInfo open" }
						}else
							return { state: "error", text: "TownInfo not found" }
					}catch(err){
						return { state: "error", text: "Client Error" }
						throw err;
					}
				}
			},
			towninfo: {
				data: null,
				getRowContent: function(){
					var data = this.data.get();
					switch( data.state ){
						case 'ok':
							return {
								text: faarksGrepoTools.getString( "moralInPopup_townInfo_moral_text", { moral: data.moral } ),
								tool: faarksGrepoTools.getString( "moralInPopup_townInfo_moral_popup", { moral: data.moral } )
							};
							break;
						case 'processing':
							return {
								text: faarksGrepoTools.getString( "moralInPopup_townInfo_loading_text" ),
								tool: faarksGrepoTools.getString( "moralInPopup_townInfo_loading_popup" )
							};
							break;
						case 'error':
							if( (data.text == "Same players") || (data.text == "Town not found") )
								return null;
							return {
								text: faarksGrepoTools.getString( "moralInPopup_townInfo_error_text", {errortext: data.text} ),
								tool: faarksGrepoTools.getString( "moralInPopup_townInfo_error_popup", {errortext: data.text} )
							};
							break;
					}
				},
				staticOnTabLoaded: null,
				onTabLoaded: function( element ){
					var box = $(element).find("#towninfo_towninfo .game_list");
					if( ( box.length === 1 ) && (box.find("#faarksGrepoTools_townMoraleInfoRow").length === 0) ){
						var cls = box.find("li:last").hasClass("even") ? "odd" : "even";
						var data = this.getRowContent();
						if( data ){
							box.append( $("<li id=\"faarksGrepoTools_townMoraleInfoRow\" class=\""+cls+"\"></li>").append( data.text ) );
							if( data.tool )
								$("#faarksGrepoTools_townMoraleInfoRow").mousePopup(new MousePopup(data.tool));
						}
					}
				},
				towninfo_init: function(town_id,type,element_id){
					$('#townWindow').unbind('ajaxComplete',this.staticOnTabLoaded);
					$('#townWindow').ajaxComplete(this.staticOnTabLoaded);
				},
				update: function( tid ){
					if( tid && (tid != TownInfo.town_id ) ){
						return;
					}
					var box = $("#faarksGrepoTools_townMoraleInfoRow");
					if( box.length === 1 ){
						var data = this.getRowContent();
						if( !data )
							box.remove();
						else{
							box.html( data.text );
							if( data.tool )
								box.mousePopup(new MousePopup(data.tool));
						}
					}
				},
				init: function( data ){
					this.data = data;
					this.staticOnTabLoaded = fer_cf( this.onTabLoaded, this, undefined );//function(){ self.onTabLoaded($(this)); };
					if( (typeof TownInfo === 'object') && (typeof TownInfo.init === 'function') ){
						faarksGrepoTools.setInterrupt( TownInfo, "init", this, this.towninfo_init );
					}
				}
			},
			init:function(){
				if( $.inArray( faarksGrepoTools.currentWorld, this.dontUseOnWorlds ) < 0 ){
					this.towninfo.init( this.ownMoral );
				}
			}
		},

		featureList: {
			show_always: false,
			menuButton: null,
			styles_inited: false,
			buttons: [],
			popupCreated: false,
			getPopupElement: function( button ){
				return fgt.createPopup({
					id: "faarksGrepoTools_featureListMenuPopup",
					under: button,
					visible: false,
					content_class: "fgt_flmb_content",
					on_create: fer_cf( function(newEl,newContentEl,options){
						for( var i = 0; i < this.buttons.length; i++ ){
							this.buttons[i].create.apply( this, [newContentEl, this.buttons[i]] );
						}
						this.popupCreated = true;
					}, this )
				});
			},
			appendToPopup: function( element ){
				if( this.popupCreated ){
					element.create.apply( this, [this.getPopupElement().find(".fgt_flmb_content"), element] );
				}
				this.buttons.push( element );
			},
			toggle: function( newState ){
				var btn = $(".faarksGrepoTools_featureListMenuButton");
				var el = this.getPopupElement(btn);
				
				if( (typeof newState === "boolean") ? !newState : btn.hasClass("fgt_flmb_open") ){
					el.hide();
					btn.toggleClass("fgt_flmb_open",false);
				}else{
					el.show();
					btn.toggleClass("fgt_flmb_open",true);
				}
			},
			initCss: function(){
				if( this.styles_inited )
					return;
				this.styles_inited = true;
				$("head").append("<style type='text/css'>\
	#faarksGrepoTools_featureListMenuPopup a{ display: block }\
	#faarksGrepoTools_featureListMenuPopup a img{ height: 16px; margin-right: 1px; position: relative; top: 4px; }\
	.faarksGrepoTools_featureListMenuButton{ background-position: -126px 0px; left: 198px; }\
	.faarksGrepoTools_featureListMenuButton:hover{ background-position: -126px -19px; }\
	.faarksGrepoTools_featureListMenuButton.fgt_flmb_open{ background-position: -144px 0px; }\
	.faarksGrepoTools_featureListMenuButton.fgt_flmb_open:hover{ background-position: -144px -19px; }\
</style>");
			},

			addElement: function(){
				this.initCss();
				if( !this.menuButton ){
					this.menuButton = $('<a class="faarksGrepoTools_featureListMenuButton" onclick="return false;" href="#"></a>');
					this.menuButton.mousePopup( new MousePopup( fgt.getString("featureList_toggelPopupButton_popup") ) );
					this.menuButton.click( fer_cf( this.toggle, this ) );
					$("#arrows_citynames").append( this.menuButton );
				}
				return this.menuButton;
			},
			init: function(){
				if( this.show_always )
					this.addElement();
			},
			add: function( options ){
				this.addElement();
				this.appendToPopup($.extend({
					href: null,
					text: null,
					popup: null,
					icon: null,
					on_click: function(){},
					click: fer_cf( function(){
						this.toggle(false);
						fer_call( data.on_click );
						return false;
					}, this ),
					after_create: function( el, options ){},
					create: function( target, options ){
						if(!options.text)
							throw new Error( "Button must have text!" );
						var el = $('<a href="'+(options.href?options.href:"#")+'"></a>');
						if( options.icon ){
							el.append( '<img src="'+options.icon+'" />' );
						}
						el.append( options.text );
						if( options.click )
							el.click( options.click );
						if( options.popup )
							el.mousePopup( new MousePopup( options.popup ) );
						target.append( el );
						options.after_create( el, options );
					}
				},options));
			}
		},
		/*silverList: { TODO: REWRITE THIS!
			data: {
				towns: {},
				town_count: 0,
				processed_count: 0
			},
			view_data: function(){
				Layout.showAjaxLoader();
				if( this.data.town_count == 0 ){
					var towns = fgt.getTownlist( fer_cf(this.view_data, this) );
					if( towns ){
						this.data.town_count = towns.length;
						for( var i = 0; i < towns.length; i++ ){
							this.data.towns[towns[i].id] = towns[i];
							this.data.towns[towns[i].id].error = 0;
						}
					}
				}
				if( this.data.town_count > 0 ){
					for( var i in this.data.towns ){
						var v = i;
						if( typeof this.data.towns[i].silver === "undefined" ){
							if( this.data.towns[i].error < 3 ){
								$.ajax({
									url: url( "town_info", "espionage", { id: this.data.towns[i].id, town_id: this.data.towns[i].id } ),
									success: fer_cf( function( data ){
										var i = v;
										var d = $("<div></div>").append( data );
										this.data.towns[i].silver = Number(d.find("span:first").text());
										this.view_data();
									}, this),
									error: fer_cf( function(){
										this.data.towns[i].error++;
										this.view_data();
									}, this),
									dataType: "text"
								});
								return;
							}
						}
					}
					//returned, when still data needs to load
					Layout.hideAjaxLoader()
					var e = "";
					var overall = 0;
					for( var i in this.data.towns ){
						var t = this.data.towns[i];
						overall += isNaN( t.silver ) ? 0 : Number( t.silver );
						e+="\n"+fgt.getString("silverList_contentMsg_dataLine",{name: t.name, value: (typeof t.silver === "undefined"? "N/A / Error" : t.silver)});
					}
					alert( fgt.getString("silverList_contentMsg_layout",{content:e, overall_silver: overall }) );
				}
			},
			run: function(){
				fgt.loadCaptcha({on_success: fer_cf(this.view_data, this)});
			},
			init: function(){
				fgt.featureList.add({
					text: fgt.getString("silverList_openPopupButton_text"),
					popup: fgt.getString("silverList_openPopupButton_popup"),
					icon: "http://grepo.faark.de/faarksGrepoTools/resources/icon_silver.png",
					on_click: fer_cf( this.run, this )
				});
			}
		},*/
		silverList: {
			silver_data: {},
			silver_name: {},
			silver_total: 0,
			silver_reg: /\(([0-9]+)\//,
			townid_reg: /town\_([0-9]+)/,
			init: function(){
				if( (Game.controller == "town_overviews") && (Game.action == "hides_overview") && ($("#hides_overview_towns").length > 0) ){
					var list_host = $("#hides_overview_towns");
					// read silver list
					var els = list_host.find(".town_item .eta");
					for( var i = 0; i < els.length; i++ ){
						var eta_el = $(els[i]);
						var town_el = eta_el.parents( ".town_item" );
						var tname_el = town_el.find(".town_name");
						var silver = Number( this.silver_reg.exec( eta_el.text() )[1] );
						var townid = Number( this.townid_reg.exec( town_el.attr("id") )[1] );
						this.silver_data[townid] = silver;
						this.silver_name[townid] = $.trim( tname_el.text() );
						this.silver_total+=silver;
					}
					// add box to end
					var el = $('<li id="faarksGrepoSilverList"><div class="box top left"><div class="box top right"><div class="box top center"></div></div></div>'+
						'<div class="box middle left"><div class="box middle right"><div class="box middle center"></div></div></div>'+
						'<div class="box bottom left"><div class="box bottom right"><div class="box bottom center"></div></div></div></li>');
					el.find( ".box.middle.center" ).html( fgt.getString( "silverList_listContent", { silver: this.silver_total } ) );
					el.click( fer_cf( function(){
						var e = "";
						for( var i in this.silver_data ){
							e+="\n"+fgt.getString("silverList_contentMsg_dataLine",{name: this.silver_name[i], value: this.silver_data[i]});
						}
						alert( fgt.getString("silverList_contentMsg_layout",{content:e, overall_silver: this.silver_total }) );
					}, this ) );
					el.mousePopup( new MousePopup( fgt.getString("silverList_listPopup") ) );
					list_host.append( el );
				}
			}
		},
		newsGui: {
			news_list_elements: {},
			news_list_open_windows: {},
			/* UPDATE FUNCTIONS BELOW, WHEN EXTRACTING FROM FGT */
			getString: function( a,b,c ){
				return fgt.getString( a,b,c );
			},
			createWindow: function( options ){
				return fgt.createWindow( options );
			},
			createDefaultButton: function( options ){
				return fgt.createDefaultButton( options );
			},
			confirm: function( options ){
				return fgt.confirm( options );
			},
			curtain: function( element ){
				return fgt.curtain( element );
			},
			/* STOP UPDATEING HERE */
			
			get_gui: function( noCreate ){
				var box = $("#faark_newsGui_grepo");
				if( noCreate )
					return box;
				if( box.length <= 0 ){
					$('head').append("<style type=\"text/css\">\
						#faark_newsGui_grepo{ z-index: 10; position: absolute; top: 0pt; left: 100pt; display: block; }\
						#faark_newsGui_grepo .fns_content{ display: inline-block; vertical-align: top; }\
						#faark_newsGui_grepo .fns_content li{ display: inline-block; }\
						#faark_newsGui_grepo .fns_loader{ display: inline-block; opacity: 0.5; position: relative; vertical-align: top; }\
						#faark_newsGui_grepo .fns_loader img{ width: 16px; height: 16px; display: inline; position: absolute; left: 0; top: 0; }\
						#faark_newsGui_grepo .fns_content div { background: url(\"http://static.grepolis.com/images/game/temp/submenu_sprite_1.19.png\") repeat scroll 0 0 transparent; }\
						#faark_newsGui_grepo li .fns_leftborder { background-position: left -8px; padding-left: 10px; cursor: pointer; }\
						#faark_newsGui_grepo li .fns_rightborder { background-position: right -32px; padding-right: 10px; }\
						#faark_newsGui_grepo li .fns_itemcontent { background-position: 0 -56px; color: #473B2B; font-weight: bold; }\
						#faark_newsGui_grepo li:hover .fns_leftborder { background-position: left -80px; }\
						#faark_newsGui_grepo li:hover .fns_rightborder { background-position: right -104px; }\
						#faark_newsGui_grepo li:hover .fns_itemcontent { background-position: 0 -128px; }\
						#faark_newsGui_grepo li.fns_headline .fns_leftborder { background-position: left -152px; cursor: default; }\
						#faark_newsGui_grepo li.fns_headline .fns_rightborder { background-position: right -176px; }\
						#faark_newsGui_grepo li.fns_headline .fns_itemcontent { background-position: 0 -200px; color: #FFCC66; }\
						.faark_newsGui_itemContentBackground{ display: block; background: url(\"http://static.grepolis.com/images/game/towninfo/content_bg.jpg\") no-repeat scroll 0pt 0pt transparent; height: 300px; width: 480px; position: absolute; top: 50px; }\
						.faark_newsGui_itemContent{ margin: 6px; max-height:288px; max-width:468px; overflow:auto; }\
						.faark_newsGui_itemSubButtons{ display: block; position: absolute; top: 350px; right: 8px; vertical-align: middle; }\
						.faark_newsGui_itemSubButtons label { vertical-align: super; }\
					");
					box = $("<div id=\"faark_newsGui_grepo\">\
						<ul class=\"fns_content\" style=\"display:none;\"><li class=\"fns_headline\"><div class=\"fns_leftborder\"><div class=\"fns_rightborder\"><div class=\"fns_itemcontent\"></div></div></div></li></ul>\
						<div class=\"fns_loader\" style=\"display:none;\"><img src=\"http://grepo.faark.de/faarksGrepoPicSaver/resources/loading.gif\" /></div>\
					</div>");
					box.find(".fns_headline .fns_itemcontent").text( this.getString("newsGui_headline_text") ).mousePopup( new MousePopup( this.getString("newsGui_headline_popup") ) );
					$("#box #menu").before( box );
				}else{
					box.show();
				}
				return box;
			},
			get_new_list_element: function(){
				var el = $("<li><div class=\"fns_leftborder\"><div class=\"fns_rightborder\"><div class=\"fns_itemcontent\"></div></div></div></li>");
				var box = this.get_gui().find(".fns_content");
				box.append( el ).show();
				return el;
			},
			
			open_details: function( news_element ){
				if( this.news_list_open_windows[ news_element.id ] )
					return;
				var curtain_remove_func = function(){};//dummy when no...
				var close_function = fer_cf( function(){
					if( news_element && this.news_list_open_windows[ news_element.id ] ){
						this.news_list_open_windows[ news_element.id ].el.remove();
						this.news_list_open_windows[ news_element.id ] = null;
					}
					curtain_remove_func();
				}, this );
				var win = this.createWindow({ onclose: close_function });
				this.news_list_open_windows[ news_element.id ] = { el: win.boxElement, close: close_function };
				win.contentElement.append('<h2>'+ this.getString( news_element.title, [], true )+'</h2><div class="faark_newsGui_itemContentBackground"><div class="faark_newsGui_itemContent">'+this.getString( news_element.message, [], true )+'</div></div>');
				var bottomButtons = $('<div class="faark_newsGui_itemSubButtons"></div>');
				if( news_element.hideable )
					bottomButtons.append( '<label><input type="checkbox" class="faark_newsGui_dontHideAgain_button">'+this.getString("newsGui_item_neverShowAgain")+'</label>' );
				bottomButtons.append( this.createDefaultButton( {text: this.getString("newsGui_item_close"), click: fer_cf( function(){
					var neverAgain = this.news_list_open_windows[ news_element.id ].el.find(".faark_newsGui_dontHideAgain_button");
					if( (neverAgain.length > 0) && neverAgain.is(":checked") ){
						this.confirm({
							text: this.getString("newsGui_item_confirmClose"),
							on_success: function(){
								news_element.setReaded();
								close_function();
							}
						});
					}else{
						close_function();
					}
				}, this) } ) );
				win.contentElement.append( bottomButtons );
				
				if( news_element.blocking )
					curtain_remove_func = this.curtain( win.boxElement );
			},
			
			set_loading: function( state ){
				if( state ){
					this.get_gui().find(".fns_loader").show();
				}else{
					this.get_gui().find(".fns_loader").hide();
				}
			},
			set_error: function( message ){ throw new Error("Not implemented"); },
			on_source_updated: function( source_element ){},
			on_update_news: function( news_element ){//only visible-config atm
				if( !news_element.checkView() ){
					if( this.news_list_elements[ news_element.id ] ){
						this.news_list_elements[ news_element.id ].remove();
						this.news_list_elements[ news_element.id ] = null;
					}
					if( this.news_list_open_windows[ news_element.id ] ){
						this.news_list_open_windows[ news_element.id ].close();
					}
				}
				// keine news mehr angezeigt? ausblenden!
				var cnt = 0;
				for( var i in this.news_list_elements ){
					if( this.news_list_elements[i] )
						cnt++;
				}
				if( cnt <= 0 )
					this.get_gui( true ).hide();
			},
			on_new_news: function( news_element ){
				if( !news_element.checkView() )
					return;
				var el = this.get_new_list_element();
				var text_el = $("<span></span>").text( news_element.title ? this.getString( news_element.title, [], true ) : "No Title" );
				if( news_element.blink ){
					var f_in = function(){
						text_el.clearQueue().animate({
							opacity: 1,
						}, {
							complete: f_out,
							duration: 500,
							queue: false
						});
					};
					var f_out = function(){
						text_el.clearQueue().animate({
							opacity: 0.1,
						}, {
							complete: f_in,
							duration: 500,
							queue: false
						});
					};
					f_out();
				}
				this.news_list_elements[ news_element.id ] = el;
				el.click(fer_cf(function(){
					text_el.stop(true,true).css({opacity:1});
					this.open_details( news_element );
				},this)).find(".fns_itemcontent").append( text_el );
				if( news_element.force_open ){
					this.open_details( news_element );
				}
			},
			
			init: function(){
				faarksNewsFetcher.init( {
					//source: "http://grepo.faark.de/faarksNewsFetcher/fetch.php",
					gui: this
				} );
			}
		},
		classicCommandOverview:{
			tab_readCommandData: function(){
				var scripts = $("#content").find("script");
				for( var i = 0; i < scripts.length; i++ ){
					var text = $(scripts[i]).text();
					if( text.indexOf("function cancelCommand") >= 0 ){
						var commandReg = /var command \= \$\(\'\#eta-command-([^']+)\'\)\;/gi;
						var arrTimeReg = /command\.countdown\(([0-9]*)\, \{\}\)\;/gi;
						var match = true;
						var result = [];
						do{
							commandReg.lastIndex = arrTimeReg.lastIndex;
							var commandResult = commandReg.exec( text );
							if( commandResult ){
								arrTimeReg.lastIndex = commandReg.lastIndex;
								var arrTimeResult = arrTimeReg.exec( text );
								if( arrTimeResult ){
									result.push({ id: commandResult[1], time: Number(arrTimeResult[1]) });
								}else
									match = false;
							}else
								match = false;
						}while( match );
						return result;
					}
				}
				return [];
			},
			add_tab: function(){
				var commands = this.tab_readCommandData();
				//var tabButton = $('<li><a href="#tab_classic"><span class="right"><span class="center bold">'+fgt.getString("classicCommandOverview_tabButton")+'</span></span></a></li>');
				//$("#ally_events_tabs ul.game_tab_list li:first").before( tabButton );
				var box = $('<ul class="game_list"></ul>');
				var emptyListElement = $('<li class="even"><span class="italic">'+fgt.getString("classicCommandOverview_emptyListItemText")+'</span></li>');
				var elements = [];
				if( commands.length > 0 ){
					emptyListElement.hide();
				}
				box.append( emptyListElement );
				
				for( var i = 0; i < commands.length; i++ ){
					var el = {
						end: commands[i].time,
						same_rand: Math.random(),
						element: $("#command_"+commands[i].id).clone(),
						hidden: false
					};
					var eta = el.element.find("#eta-command-"+commands[i].id);
					eta.countdown(el.end,{});
					eta.bind('finish', function(){
						el.hidden = true;
						$(this).parent().parent().fadeOut();
						for( var i = 0; i < elements.length; i++ ){
							if( !elements[i].hidden )
								return;
						}
						emptyListElement.fadeIn();
					});
					var added = false;
					for( var i = 0; (i < elements.length)&&!added; i++ ){
						if( (el.end < elements[i].end) || ((el.end == elements[i].end)&&(el.same_rand < elements[i].same_rand)) ){
							elements[i].element.before( el.element );
							elements.splice( i, 0, el );
							added = true;
							//return;
						}
					}
					if( !added ){
						box.append( el.element );
						elements.push( el );
					}
				}
				
				$("#ally_events_tabs .game_list_footer").before( $('<div id="tab_classic"></div>').append(box).append(fgt.getString("by")) );
				$("#ally_events_tabs").tabs( "add", "#tab_classic", "", 0 );
				$("#ally_events_tabs").tabs( "select", 0 );
				$("#ally_events_tabs ul.game_tab_list li:first a").html( '<span class="right"><span class="center bold">'+fgt.getString("classicCommandOverview_tabButton")+'</span></span>' );
			},
			add_counters_bindButton: function( button, elements ){
				var len = elements.length;
				var text = button.text();
				elements.bind('finish', function() {
					len--;
					button.find(".center").text( text + " ("+len+")" );
				});
				button.find(".center").append( " ("+len+")");
			},
			add_counters: function(){
				var buttons = $("#ally_events_tabs ul.game_tab_list li a");
				var lists = $("#ally_events_tabs div ul.game_list");
				for( var i = 0; i < lists.length; i++ ){
					var els = $(lists[i]).find("li.place_command");
					for( var b = 0; b < buttons.length; b++ ){
						if( $(buttons[b]).attr("href") == ("#"+$(lists[i]).parent().attr("id") ) ){
							this.add_counters_bindButton( $(buttons[b]), els );
						}
					}
					
				}
			},
			init: function(){
				if( (fgt.currentAction == "command_overview") && ($("#ally_events_tabs").length > 0) ){
					//blame inno for the id's .... not only copy/past from other pages, even multiple useless "command_overview-id's".....
					//this.add_tab();
					this.add_counters();
				}
			}
		},
		massRekruit: {
		},
		
		myHttpData: { // overwrites jquery.httpData to not update client/servertime when making an external request...
			innoHttpData: null,
			originalHttpData: null,
			grepoUrlRegexp: /((https?)?\:)?(\/\/)?([a-zA-Z0-9]*).grepolis.com\//,
			localUrlRegexp: /^\//,
			newHttpData: function( xhr, type, s ){
				if( s && s.url && !this.grepoUrlRegexp.exec( s.url ) && !this.localUrlRegexp.exec( s.url)  ){
					return this.originalHttpData.apply( jQuery, arguments );
				}else{
					return this.innoHttpData.apply( jQuery, arguments );
				}
			},
			init: function(){
				if( jQuery && jQuery.httpData && httpDataOld ){
					this.innoHttpData = jQuery.httpData;
					this.originalHttpData = httpDataOld;
					var self = this;
					jQuery.httpData = function(){return self.newHttpData.apply( self, arguments );};
				}
			}
		},
		/*ToDo:
			AllyFile&co
			http://forum.grepolis.de/showpost.php?p=57159&postcount=69
			Sim-More input-types (like Schwert: 323)
			large map
			transports auf ressis adden/anzeigen
			
			*error reporter project-stuff
			
			dataSaver
				-show acc/mng-btn
				-finish oberserver
				-config-gui: lists
			
			walkToOverview
				-Filter: Show only towns that can reach target (eg water/air/trans)
				-Filter: Show by Group
				-Filter: Remove current filters
				-Captcha to start query
				-icon
				-Wait betweend advanced querys
				-use of TownInfo.sameIsland = false/true;
			
			inc watcher:
				-sound + focus + better save system + better options
			
			/faarksGrepoSliderWeg/current.php/
			
			mass recruit
			trade stuff
				- a trade to festival-ressis-button
				
			insert all land units (for farming ftw)
			
			pa-overview-auswahl
			
			dorfwechsel via pfeiltasten
		*/
		init: function(){
			
			/* requirements: to init fgt, we must be ingame with game-js stuff loaded */
			if( !$ || !Game || !Game.player_id || !Game.controller )
				return;
			
			/* util */
			this.currentWorld = Game.world = /([a-zA-Z0-9]*)\./.exec(document.location.href)[1];
			this.currentAction = Game.action = this.getParam("action")
			this.currentTownName = Game.town_name = $("#town_name_href").text();
			this.currentFolder = this.getParam("folder_id");
			this.currentLang = /([a-zA-Z]+)[0-9]*\./.exec( document.location.href ) ? /([a-zA-Z]+)[0-9]*\./.exec( document.location.href )[1] : "en";
			
			/* modules */
			if( (typeof window.faarksGrepoTools_activeParts === "object") && (window.faarksGrepoTools_activeParts.length > 0) ){
				for( var i = 0; i < window.faarksGrepoTools_activeParts.length; i++ ){
					var key = window.faarksGrepoTools_activeParts[i];
					if( (typeof this[key] === "object") && this[key] && (typeof this[key].init === "function") ){
						try{
							this[key].init( this );
						}catch(err){
							faarksErrorReporter.report( err );
							//HumanMessage.error( err.toString() + " <br/>at:<br/>"+err.stack );
						}
					}
				}
			}else{
				for( var i in this ){
					if( (typeof this[i] === "object") && this[i] && (typeof this[i].init === "function") ){
						try{
							this[i].init( this );
						}catch(err){
							faarksErrorReporter.report( err );
							//HumanMessage.error( err.toString() + " <br/>at:<br/>"+err.stack );
						}
					}
				}
			}
		}
	};
	var fgt = faarksGrepoTools;
	faarksGrepoTools.init();
}catch(err){
	faarksErrorReporter.report( err );
	//HumanMessage.error( err.toString() + " <br/>at:<br/>"+err.stack );
}

































