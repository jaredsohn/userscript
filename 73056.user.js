// ==UserScript==
// @name          Faarks Grepolis Tools
// @namespace     http://faark.no-ip.info/static/faarksGrepoTools
// @description   Some nice little features for Grepolis (Browsergame by InnoGames)
// @version       0.3
// @include       http://*.grepolis.*/game/*
// ==/UserScript==

// @include       http://xx*db.grepo.innogames.net/game/*



if( typeof faarksErrorReporter === "undefined" ){
	var faarksErrorReporter = {
		config: {
			serverUrl: "http://bplaced.faark.de/projects/faarksErrorReporter/current/report.php",
			version: 1.0,
			product: "fgt"
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
		upload: function(data){
			var form = $("<form method='POST' action='"+this.config.serverUrl+"'></form>");
			$("body").append( form );
			for( var i in data ){
				form.append( "<input type='hidden' name='"+i+"' value='"+escape(data[i])+"' />" );
			}
			form.submit();
		},
		errorConfig: {
			reset: function(){
				for( var i in faarksErrorReporter.products ){
					this.set( i, "", -1 );
					faarksErrorReporter.products[i].errorConfig = undefined;
				}
				HumanMessage.success("Eroare de configurare...");
			},
			load: function( productId ){
				var prod = faarksErrorReporter.products[productId];
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
						if( Number( data[0] ) < prod.version ){
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
				prod.errorConfig = [];
			},
			set: function( productId, lineNumber, expiredays ){
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
				document.cookie=c_name+ "=" +escape(value)+((expiredays==null) ? "" : ";expires="+exdate.toGMTString());
				this.load( productId );
			},
			get: function( productId, lineNumber ){// true: do not report/cancel error report
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
				pid: null
			},
			dataFlags: { /* {name,description[,required]} */
				product_name: {name: "Script-Name",description:"Numele scriptului in care a aparut eroarea ",required:true},
				product_version: {name: "Script-Version",description:"Versiunea scriptului in care a aparut eroarea ",required:true},
				
				error_message:{name: "Mesaj de eroare",description:"Eroare de informare...",required:true},
				error_file: {name: "Eroare script",description:"Fisierul script exact in care a aparut eroarea",required:true},
				error_line: {name: "Linie nepermisa",description:"Linia in care a aparut eroarea",required:true},
				error_stack: {name: "Pozitie eroare",description:"Apeluri de functii care au condus la eroare...",required:true},
				
				web_location: {name: "Adresa Web",description:"URL-ul site-ul curent"},
				web_document: {name: "Continut document",description:"Continutul complet al site-ului actual. Ar putea sa apara eroare."},
				web_browser: {name: "Browser- / OS-Version",description:"Informatii despre Browser si sistem de operare, incl. Version"},
				
				errorTool_version: {name: "Raporteaza versiunea",description:"Raport de eroare al versiunii",required:true}
			},
			close: function(send, save){
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
				$("#faarksErrorReporter_overlay").remove();
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
			setTooltip: function( text ){
				if( !text )
					text = "&nbsp;";
				$("#faarksErrorReporter_tooltip").html(text);
			},
			createTooltip: function( elements, text ){
				elements.unbind('mouseenter');
				elements.unbind('mouseleave');
				elements.bind('mouseenter',fer_cif(function(){this.setTooltip(text);},this));
				elements.bind('mouseleave',fer_cif(function(){this.setTooltip();},this));
			},
			init: function( productId, data ){
				faarksErrorReporter.current.active = true;
				this.current.dataCache = data;
				this.current.pid = productId;
				var prod = faarksErrorReporter.products[productId];
				$("#faarksErrorReporter_overlay").remove();
				$("body").append('<div style="display: block; height: 100%; left: 0; position: fixed; top: 0; width: 100%; z-index: 40000;" id="faarksErrorReporter_overlay">\
					<div style="left: '+((window.innerWidth-550)/2)+'px; top: 180px; background-color:#000000;border:3px dashed #FFFFFF;color:#999999;font-size:14px;padding:12px 2px 0;position:absolute;text-align:center;width:550px;z-index:10000;">\
						<h2 style="color:#666666;line-height:normal;">Eroare in "'+prod.name+'":</h2><br>\
						<span style="display:block;">\
							In '+prod.name+' (Version '+prod.version+'; von '+prod.author+') O eroare a fost detectata. Va rugam sa ajutati furnizorul trimitand informatii despre eroarea detectata.\
						</span>\
						<a style="float:right;margin-right:2px" class="faarksErrorReporter_sendButton" href="#">Trimite raportul de</a>\
						<div style="clear: both;"></div>\
						<div style="display: block; margin: 20px auto 0px auto; width:500px; text-align: left;">\
							<a id="faarksErrorReporter_toggelAlertConfig_open" href="#" style="display:block">+ Setarile de afisaj de eroare pop-up/schimbare</a>\
							<div id="faarksErrorReporter_toggelAlertConfig_close" style="display:none;">\
								<a href="#">- Einstellungen über das Fehler-Popup anzeigen/ändern</a><br/>\
								<div style="margin-left:10px;">\
									<label><input type="radio" name="faarksErrorReporter_showBugMode" value="none"> Arata urmatoarea aparitie a acestei erori din nou.</label><br/>\
									<label><input type="radio" name="faarksErrorReporter_showBugMode" value="self" checked="checked">Aceasta , pana la actualizarea urmatoare nu apare.</label><br/>\
									<label><input type="radio" name="faarksErrorReporter_showBugMode" value="all"> Eroare in '+prod.name+' pana la urmatoarea actualizare nu apare.</label><br/>\
								</div>\
							</div>\
							<br/>\
							<a id="faarksErrorReporter_toggelDataConfig_open" href="#" style="display:block">+ Date transmise de afisare/modifica</a>\
							<div id="faarksErrorReporter_toggelDataConfig_close" style="display:none;">\
								<a href="#">- Übertragene Daten anzeigen/ändern</a><br/>\
								<div id="faarksErrorReporter_leftDataConfig" style="float:left;margin-left:10px;"></div>\
								<div id="faarksErrorReporter_rightDataConfig" style="float:right;margin-right:10px;"></div>\
								<div style="clear: both;"></div>\
							</div>\
							<br/>\
							<a id="faarksErrorReporter_toggelCommentBox_open" href="#" style="display:block">+ Comenteaza aceasta eroare</a>\
							<div id="faarksErrorReporter_toggelCommentBox_close" style="display:none;">\
								<a href="#">- Kommentar zu diesem Fehler schreiben</a><br/>\
								<textarea id="faarksErrorReporter_commentBoxText" style="margin-left:20px;margin-top:5px;width:90%;height:50px;">Scrie comentariul tau aici ...</textarea>\
							</div>\
						</div>\
						<br/>\
						<div style="margin-bottom: 10px; font-style: italic; font-size: 80%;" id="faarksErrorReporter_tooltip">&nbsp;</div>\
						<a href="#" class="faarksErrorReporter_sendButton" style="font-size:150%;color:#A05010;display:block;margin-bottom:4px;">Trimite raportul de</a>\
						<a href="#" class="faarksErrorReporter_saveButton" style="position:absolute;bottom:0px;left:4px;">Nu trimiteti</a>\
						<a href="#" class="faarksErrorReporter_cancelButton" style="position:absolute;bottom:0px;right:4px;">Stop</a>\
					</div>\
					<div style="visibility: visible; opacity: 0.4; background-image:url(http://faark.bplaced.net/projects/faarksInternalToolset/rel/curtain_bg.png); height:100%; width:100%;"></div>\
				</div>');
				$("#faarksErrorReporter_overlay div:first").css("top", (window.innerHeight - $("#faarksErrorReporter_overlay div:first").height() ) / 2);
				
				$(".faarksErrorReporter_sendButton").click( fer_cif(function(){this.close(true,true);return false;},this) );
				$(".faarksErrorReporter_saveButton").click( fer_cif(function(){this.close(false,true);return false;},this) );
				$(".faarksErrorReporter_cancelButton").click( fer_cif(function(){this.close(false,false);return false;},this) );
				$("#faarksErrorReporter_toggelDataConfig_close a, #faarksErrorReporter_toggelDataConfig_open").click( fer_cif(function(){this.toggleDataConfig();return false;},this) );
				$("#faarksErrorReporter_toggelAlertConfig_close a, #faarksErrorReporter_toggelAlertConfig_open").click( fer_cif(function(){this.toggleAlertConfig();return false;},this) );
				$("#faarksErrorReporter_toggelCommentBox_close a, #faarksErrorReporter_toggelCommentBox_open").click( fer_cif(function(){this.toggleCommentBox();return false;},this) );
				
				this.createTooltip( $(".faarksErrorReporter_sendButton"), "Trimite raport de eroare si salveaza configurarea de alerta" );
				this.createTooltip( $(".faarksErrorReporter_saveButton"), "Salvati configurarea de eroare, dar nu trimiteti raportul" );
				this.createTooltip( $(".faarksErrorReporter_cancelButton"), "Inchide fereastra de eroare" );
				this.createTooltip( $("#faarksErrorReporter_toggelDataConfig_open"), "Gesendete Daten anzeigen" );
				this.createTooltip( $("#faarksErrorReporter_toggelDataConfig_close a"), "Ascunde datele trimise" );
				this.createTooltip( $("#faarksErrorReporter_toggelAlertConfig_open"), "Notificare de configurare profil" );
				this.createTooltip( $("#faarksErrorReporter_toggelAlertConfig_close a"), "Notificare de configurare" );
				this.createTooltip( $("#faarksErrorReporter_toggelAlertConfig_close div"), "Pentru a salva aceasta configurare permiteti cook-iurile!" );
				this.createTooltip( $("#faarksErrorReporter_toggelCommentBox_close, #faarksErrorReporter_toggelCommentBox_open"), "Ai o idee de ce ar putea provoca aceasta eroare ? Toate informatiile pot fi de ajutor" );
				
				var dItems = [];
				for( var index in this.dataFlags ){
					if( (data[index] !== null) && (data[index] !== undefined) ){
						var i = $('<label style="display:block;"><input '+(this.dataFlags[index].required?'disabled="disabled" ':"")+'type="checkbox" name="faarksBugReporter['+index+']" value="on" checked="checked" /> '+this.dataFlags[index].name+'</label>')
						this.createTooltip( i, this.dataFlags[index].description + "<br/><span style=\"font-size:90%;\">Daten: "+data[index].toString().substr(0,50).replace(/&/gmi, '&amp;').replace(/"/gmi, '&quot;').replace(/>/gmi, '&gt;').replace(/</gmi, '&lt;')+"...</span>");
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
		report: function(){//TODO: ADD non-EXCEPTION-Formats-Support
			try{
				if( !this.current.enabled )
					return;
				var e = arguments.length == 1 ? arguments[0] : undefined;
				if( (typeof e === "object") && (typeof e.message === "string") && (typeof e.fileName === "string") && (!isNaN( Number( e.lineNumber ) ) ) && (typeof e.stack === "string")){//exception
					var e = arguments[0];
					this.report( e.name+": "+e.message, e.fileName, e.lineNumber, e.stack );
				}else if(arguments.length >= 3){//message,url,line,stack
					if( typeof console === "object"){
						console.log("Reporting error... Arugments: %o",arguments);
					}
					var url = arguments[1].toString();
					for( var file in this.products ){
						if( this.errorConfig.get( file, arguments[2] ) )
							return;
						if( url.indexOf( file ) >= 0 ){
							var prod = this.products[ file ];
							var data = {
								error_message: arguments[0],
								error_file: arguments[1],
								error_line: arguments[2],
								error_stack: arguments[3],
								
								product_name: prod.name,
								product_version: prod.version,
								
								web_location: window.location.href,
								web_document: $("html").html(),
								web_browser: navigator.userAgent,
								
								errorTool_version: this.config.version
								
							};
							
							this.gui.init( file, data );
							return;
						}
					}
				}
			}catch(err){
				this.onErrorInError( err );
			}
		},
		onErrorInError: function(ex){//that func is called by error-func's catches and, in case of error
			this.current.enabled = false;
			alert( "Eroare in functia de eroare!\n\n\(traducere). Nu acesta este !^^\n Ne pare rau ! Va rog sa transmiteti ca a fost o eroare in functie de raportare a erorilor.\n\n\nTransmiteti informatiile:\n--------------------------------------------------------------------------------------------\n"+ex.name+": "+ex.message+"\nat "+ex.fileName+", line " + ex.lineNumber + "\nStack: "+ (ex.stack?ex.stack:"N/A") );
		},
		onError: function(errorMsg, url, lineNumber){
			try{
				console.log("err");
				console.log("ErrorStack: %o",new Error().stack);
				this.report( errorMsg, url, lineNumber );
			}finally{
				if( this.current.oldOnError )
					this.current.oldOnError.apply( window, arguments );
				return false;
			}
		},
		exec_func: function( fnc, scope, args ){
			try{
				return fnc.apply( scope ? scope : window, args ? args : [] );
			}catch(err){
				faarksErrorReporter.report( err );
			}
		},
		create_func: function( fnc, scope ){
			return function(){
				return faarksErrorReporter.exec_func( fnc, scope, arguments );
			}
		},
		create_internal_func: function( fnc, scope ){
			return function(){
				try{
					if( typeof fnc === "string" )
						eval( fnc );
					else
						return fnc.apply( scope ? scope : window, arguments );
				}catch(err){
					this.onErrorInError( err );
				}
			}
		},
		init: function( fileName, productInfo ){
			if( !$ || (typeof Game === "undefined") )//no jquery/Game -> no valid grepo-side
				return;
			
			productInfo.file = fileName;
			productInfo.shortName = fileName.split(".")[0];
			this.products[fileName] = productInfo;
			
			// default class init
			if( this.current.initiated )
				return;
			var self = this;
			this.current.oldOnError = window.onerror;
			window.onerror = function meffffaewase(a,b,c,d,e,f){self.onError.apply(self,arguments);};//Aceasta functie de eroare nu este foarte eficienta.
			this.current.enabled = true;
			this.current.initiated = true;
		}
	};
	function fer_go ( fnc, scope, args ){
		return faarksErrorReporter.exec_func(fnc,scope,args);
	}
	function fer_cf ( fnc, scope, args ){
		if( (typeof fnc !== "function") || (typeof scope !== "object") )
			throw new Error("Invalid Params ["+fnc+","+scope+","+args+"]!");
		return function(){
			try{
				if( typeof fnc === "string" )
					eval( fnc );
				else
					return fnc.apply( scope ? scope : window, args ? args : arguments );
			}catch(err){
				faarksErrorReporter.report( err );
			}
		}
	}
	function fer_cif ( fnc, scope ){
		return faarksErrorReporter.create_internal_func( fnc, scope );
	}
}
faarksErrorReporter.init( "faarksGrepoTools.js", { name:"Faark's Grepo-Tools", version: 0.71, author: "Faark" } );
//javascript:faarksErrorReporter.errorConfig.reset();faarksErrorReporter.init(12,"");void(0);

try{

	
	String.prototype.format = function(){
		var pattern = /\{\d+\}/g;
		var args = arguments;
		return this.replace(pattern, function(capture){ return args[capture.match(/\d+/)]; });
	}

	var faarksGrepoTools = {
		/* util */
		currentWorld: "",
		currentFolder: "",
		currentTownName: "",
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
	}*/
			return timestamp.toLocaleString();
		},
		getParam: function(name, fromLink){
			if( !fromLink )
				fromLink = document.location.href;
			var data = new RegExp("[\?\&]"+name+"=([^\&#]+)").exec(fromLink);
			if( data )
				return data[1];
			return null;
		},
		myXhr: function(){
			var xhr = new XMLHttpRequest();
			xhr.faarks_oldSetRequestHeader = xhr.setRequestHeader;
			xhr.setRequestHeader = function(a,b){
				if(a!="X-Requested-With")
					return this.faarks_oldSetRequestHeader(a,b);
			}
			return xhr;
		},
		uidgen: function( length ){
			if(!length)
				length = 32;
			var chars = "abcdefghijklmnopqrstuvwxyz0123456789";
			var id = "";
			for( index = 0; index < length; index++ ){
				id = id + chars.substr(Math.floor(Math.random()*(chars.length-1)),1);
			}
			return id;
		},
		setInterrupt: function( oldObject, oldMethodName, newObject, newMethod, runBeforeInterrupt ){
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
				if( isEx )
					throw r;
				return r;
			}
		},
		
		
		/* modules */
		villageIdToTownInfo: { // add village-id in towninfo-popups
			oldInit: null,
			mousePopup: new MousePopup("<span style='float:right;color: gray;font-size: 60%;'>VillageId by Faark</span>"),
			drawFunc: function () {
				if (($('#townWindow #towninfo_towninfo').length === 1)&&($("#faarksGrepoTools_addedTownId").length === 0)) {
					$('#townWindow #towninfo_towninfo .game_header').append("<span id=\"faarksGrepoTools_addedTownId\"> (Id: "+TownInfo.town_id+")</span>");
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
			playerGrepoStats_toolTip: new MousePopup("Deschide profil acestui<br/>Jucatorii GrepoStats.com<br/><span style='float:right;color: gray;font-size: 60%;'>by Faark & Marvinho</span>"),
			playerGrepoTools_toolTip: new MousePopup("Deschide profil acestui<br/>Jucatorii grepotools.de<br/><span style='float:right;color: gray;font-size: 60%;'>by Grex & Faark</span>"),
			drawInPopup: function(){
				var el = $('#townWindow .list_item_left a');
				if( el.length === 1 ){
					var id = /player_id=([0-9]+)/.exec(el.attr("href"))[1];
					var el = $('#townWindow .list_item_right');
					if( (el.length === 1) && ($("#townWindow .faarksGrepoTools_shownInGrepoStatsButton").length === 0 ) ){
						var no = $( "<a class=\"faarksGrepoTools_shownInGrepoStatsButton faarksGrepoTools_playerButton\" href=\"http://de.grepostats.com/world/"+faarksGrepoTools.currentWorld+"/player/"+id+"\" target=\"_blank\"></a>" );
						var no2 = $( "<a class=\"faarksGrepoTools_shownInGrepoGameStatsButton faarksGrepoTools_playerButton\" href=\"http://www.grepotools.de/"+faarksGrepoTools.currentWorld+"/details/player/"+id+"\" target=\"_blank\"></a>" );
						el.append( no ).append( no2 );
						el.css( "width", 110 );
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
					background:transparent url(http://faark.bplaced.net/projects/faarksGrepoTools/resources/view_on_grepostats.png) no-repeat scroll 0 0;\
				}\
				.faarksGrepoTools_shownInGrepoStatsButton:hover{\
					background:transparent url(http://faark.bplaced.net/projects/faarksGrepoTools/resources/view_on_grepostats_hover.png) no-repeat scroll 0 0;\
				}\
				.faarksGrepoTools_shownInGrepoGameStatsButton{\
					background:transparent url(http://faark.bplaced.net/projects/faarksGrepoTools/resources/view_on_gamestats.png) no-repeat scroll 0 0;\
				}\
				.faarksGrepoTools_shownInGrepoGameStatsButton:hover{\
					background:transparent url(http://faark.bplaced.net/projects/faarksGrepoTools/resources/view_on_gamestats_hover.png) no-repeat scroll 0 0;\
				}");
			},
			init: function(){
				this.initCss();
				this.drawInPopup = fer_cf( this.drawInPopup, this );
				
				if( $("#player_buttons").length > 0 ){
					$("#player_buttons").css( "width", 250 );
					var ftmp_pid = Number( /player_id=([0-9]+)/.exec(document.location.href)[1] );
					var no = $( "<a class=\"faarksGrepoTools_shownInGrepoStatsButton faarksGrepoTools_playerButton\" href=\"http://de.grepostats.com/world/"+faarksGrepoTools.currentWorld+"/player/"+ftmp_pid+"\" target=\"_blank\"></a>" );
					var no2 = $( "<a class=\"faarksGrepoTools_shownInGrepoGameStatsButton faarksGrepoTools_playerButton\" href=\"http://www.grepotools.de/"+faarksGrepoTools.currentWorld+"/details/player/"+ftmp_pid+"\" target=\"_blank\"></a>" );
					$("#player_buttons").append( no ).append( no2 );
					no.mousePopup( this.playerGrepoStats_toolTip );
					no2.mousePopup( this.playerGrepoTools_toolTip );
				}
				$("body").ajaxComplete( this.drawInPopup );
			}
		},
		favorCalc: { //Time to full favor -> Favor-Tooltip
			favorData: null,
			newFavorText: null,
			getFavorFormText: function(text){
				var arr = [];
				var regex = /<li>([a-zA-Z]+): ([-+]?[0-9]*\.?[0-9]) - ([^\:]+): ([-+]?[0-9]*\.?[0-9])<\/li>/g;
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
					var nft = "<h4>Gunst</h4><ul>";
					for( var el in this.favorData ){
						var data = this.favorData[el];
						nft = nft + "<li><b>"+data["god"]+": "+data["favor"]+"</b><br/>-  Produktion pro Stunde: "+data["output"]+"<br/>";
						if( data["favor"] >= 500 ){
							nft = nft + "-  Gunstspeicher ist voll!!!";
						}else{
							var tl = (500-data["favor"])/(data["output"]);
							var ml = Math.floor((tl-Math.floor(tl))*60);
							nft = nft + "-  Voll in etwa "+Math.floor(tl) + ":" + (ml<10?"0"+ml:ml) + "h<br/>";
							nft = nft + "-  Voll am "+faarksGrepoTools.humanReadableDate(new Date(new Date().getTime() + Math.floor((500-data["favor"])/(data["output"]/3600000)) ));
						}
					}
					nft = nft+"</ul><br/><span style='float:right;color: gray;font-size: 60%;'>Timeleft by Faark</span>";
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
					$("#arrival_time").text("~"+readableDate( new Date(new Date().getTime() + this.duation ) ));
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
						if( data.units.def && (!noEmptys || faarksGrepoTools.objectHasPropertys(data.units.att) ) )
							this.pasteUnits( "def", data.units.def );
					}
					if( data.mods ){
						if( data.mods.att && (!noEmptys || faarksGrepoTools.objectHasPropertys(data.mods.att) ) )
							this.pasteMods( "att", data.mods.att );
						if( data.mods.def && (!noEmptys || faarksGrepoTools.objectHasPropertys(data.mods.att) ) )
							this.pasteMods( "def", data.mods.def );
					}
					if( data.attack_strategy )
						$(".place_sim_select_strategies select").val( data.attack_strategy )
				}else{
					window.location = this.getDataAddress( data );
				}
			},
			getSaveLink: function(){
				alert("Link la datele stocate Sim (necesita FaarksGrepoTools):\n\n\n"+this.getCurrentDataAddress() );
				return false;
			},
			openSaveLink: function(){
				var url = prompt("Introduceti link-ul primit:");
				if( url ){
					var startData = /faarksGrepoApplySimData=([^&]*)/.exec( decodeURIComponent( url ) );
					if( startData )
						startData = $.secureEvalJSON(decodeURIComponent( startData[1] ));
					if( startData || (startData = this.convertOtherFormat1( document.location.href ) ) )
						this.open( startData, true );
					else{
						alert("Eroare: URL-ul nu contine date Sim intr-un format valabil !");
					}
				}
				return false;
			},
			toggleSites: function(){
				var curUnits = this.copy()["units"];
				this.open({ units: { att: curUnits["def"], def: curUnits["att"] } });
				return false;
			},
			addCaptureButtonToDialog: function(data){
				var addButton = $("<a id=\"faarksGrepoApplySimData_dialogButton\" class=\"faarksGrepoApplySimData_captureSidebarButton faarksGrepoPicSaver_button\" href=\""+this.getDataAddress(data)+"\"></a>");
				$("#info_tab_window_bg .cancel").after( addButton );
				addButton.mousePopup(new MousePopup("Trupe in Sim inserare<br/><span style='float:right;color: gray;font-size: 60%;'>by Faark</span>"));
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
						addButton.mousePopup(new MousePopup("Introdu unitati in simulator<br/><span style='float:right;color: gray;font-size: 60%;'>by Faark</span>"));
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
							addButton.mousePopup(new MousePopup("Introdu unitati in simulator<br/><span style='float:right;color: gray;font-size: 60%;'>by Faark</span>"));
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
										data.mods.building_tower = "on";
									if( $("#spy_buildings #building_wall").length > 0)
										data.mods.wall_level = $("#spy_buildings #building_wall span:first").text();
								}
								var buttonBox = $("#faarksGrepoReportButtonBox");
								if( buttonBox.length == 0 ){
									buttonBox = $("<div id=\"faarksGrepoReportButtonBox\"></div>");
									$("#report_report_header").append( buttonBox );
								}
								var addButton = $("<a class=\"faarksGrepoApplySimData_captureSidebarButton faarksGrepoPicSaver_button\" href=\""+self.getDataAddress( data )+"\"></a>");
								addButton.mousePopup(new MousePopup("Introdu unitati in simulator<br/><span style='float:right;color: gray;font-size: 60%;'>by Faark</span>"));
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
									addButton.mousePopup(new MousePopup("Introdu unitati in simulator<br/><span style='float:right;color: gray;font-size: 60%;'>by Faark</span>"));
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
						this.collect = fer_cf( this.collect, this );
						$('body').ajaxComplete( this.collect );
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
								self.addCaptureButtonToDialog( { units: { def: off } } );
						}
					},
					init: function(simObj){
						this.sim = simObj;
						this.collect = fer_cf( this.collect, this );
						$('body').ajaxComplete( this.collect );
					}
				}
			},
			init: function(){
				var self = this;
				with(this){
					$("style:first").append("\
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
						background: transparent url(http://faark.bplaced.net/projects/faarksGrepoTools/resources/view_on_sim_new.png) no-repeat scroll 0 0;\
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
						background: transparent url(http://faark.bplaced.net/projects/faarksGrepoTools/resources/view_on_sim_hover_new.png) no-repeat scroll 0 0;\
					}\
					");
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
					
					
					var startData = null;
					if( startData = /faarksGrepoApplySimData=([^&]*)/.exec( document.location.href) )
						startData = $.secureEvalJSON(decodeURIComponent( startData[1] ));
					if( startData || (startData = this.convertOtherFormat1( document.location.href ) ) )
						this.open( startData );
					
					$("#place_simulator_form .game_list_footer").append("<a id=\"faarksGrepoSwapSimSides_button\" href=\"#\" style=\"display: inline-block; margin: 0px 0px 0px 3px;\" class=\"button\"><span class=\"left\"></span><span class=\"middle\">Interschimba unitati</span><span class=\"right\"></span><span style=\"clear: both;\"></span></a>");
					$("#faarksGrepoSwapSimSides_button").click( fer_cf( this.toggleSites, this ) );
					$("#faarksGrepoSwapSimSides_button").mousePopup(new MousePopup("Introduce unitatile in simulator <br/>La al doilea click, din atacator vor deveni aparator pentru ca  <br/>acesta din urma sa-si apere teritoiul.<br/><span style='float:right;color: gray;font-size: 60%;'>by Faark</span>"));
					
					
					$("#place_simulator_form .game_list_footer").append("<a id=\"faarksGrepoGetSimLink_button\" href=\"#\" style=\"display: inline-block; margin: 0px 0px 0px 3px;\" class=\"button\"><span class=\"left\"></span><span class=\"middle\">Link-ul pentru date Sim</span><span class=\"right\"></span><span style=\"clear: both;\"></span></a>");
					$("#faarksGrepoGetSimLink_button").click( fer_cf( this.getSaveLink, this ) );
					$("#faarksGrepoGetSimLink_button").mousePopup(new MousePopup("Va arata un link. Cand este introdus, simulatorul <br/>se deschide cu aceste setari.<br/><span style='float:right;color: gray;font-size: 60%;'>by Faark</span>"));
					
					$("#place_simulator_form .game_list_footer").append("<a id=\"faarksGrepoOpenSimLink_button\" href=\"#\" style=\"display: inline-block; margin: 0px 0px 0px 3px;\" class=\"button\"><span class=\"left\"></span><span class=\"middle\">Configurare cu date Sim</span><span class=\"right\"></span><span style=\"clear: both;\"></span></a>");
					$("#faarksGrepoOpenSimLink_button").click( fer_cf( this.openSaveLink, this ) );
					$("#faarksGrepoOpenSimLink_button").mousePopup(new MousePopup("Importurile unui Sim-Data-Link in simulatorul curent.<br/> Introduceti aici link-ul primit si configurarea va fi incarcata.<br/><span style='float:right;color: gray;font-size: 60%;'>by Faark</span>"));
					
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
						$("#popup_content").append( "Resourcen verfügbar in "+readableSeconds(timeleft)+" Stunden,<br/>am " + faarksGrepoTools.humanReadableDate( new Date( new Date().getTime() + (timeleft*1000) ) )+"<br/>");
					}
					$("#popup_content").append("<span id='faarksGrepoAkaResTimeleft_by' style='float:right;color: gray;font-size: 60%;'>Resource-Timeleft by Faark</span>");
				}
			},
			buildingAcademy_newInitMousePopup: function(){
				if(BuildingAcademy.orders.length>0){
					$.each(BuildingAcademy.orders,function(i,order){
						$('#academy_tasks_'+i+' .academy_tasks_image').mousePopup(new MousePopup('<h4>'+order.name+'</h4>Fertig erforscht am '+faarksGrepoTools.humanReadableDate( new Date( order.to_be_completed_at*1000 ) )+'<br/><span id="faarksGrepoAkaResTimeleft_by" style="float:right;color: gray;font-size: 60%;">Resource-Timeleft by Faark</span>'));
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
			durCache: {},
			units: null,
			durMods: {
				calculated: false,
				dataSource: null,
				data: null
			},
			defaultUnits: ["big_transporter","bireme","attack_ship","colonize_ship"],
			unitTypes: {
				land: ["sword","slinger","archer","hoplite","rider","chariot","catapult","minotaur","zyklop","centaur","medusa"],
				air: ["manticore","harpy","pegasus"],
				sea: ["big_transporter","bireme","attack_ship","demolition_ship","small_transporter","trireme","colonize_ship","sea_monster"]
			},
			unitRequestActive: false,
			useDefaultUnits: false,
			
			afterGotContent: function( townId ){
				if( !this.durMods.calculated ){
					if( this.durMods.dataSource && this.durCache[ this.durMods.dataSource ] && (this.durCache[ this.durMods.dataSource ] !== true) && this.durMods.baseData && !this.durCache[ this.durMods.dataSource ].error){
						var dur = this.durCache[this.durMods.dataSource];
						var mods = { };
						for( var i in this.durMods.baseData ){
							if( GameData.units[i] ){
								var realTime = this.durMods.baseData[i].duration - dur.offset;
								mods[i] =  Math.round((dur.time / (realTime*GameData.units[i].speed) )*Math.pow(10,2))/Math.pow(10,2);
							}
						}
						this.durMods = { calculated: true, data: mods, baseData: this.durMods.baseData };
					}else{
						if( this.durCache[ this.durMods.dataSource ] && this.durCache[ this.durMods.dataSource ].error && (townId != this.durMods.dataSource)){
							this.durMods = {
								calculated: false,
								dataSource: null,
								data: null
							};
						}
						if( townId )
							this.gotUnits( townId );
						if( this.durMods.dataSource )
							this.getTime( this.durMods.dataSource );
					}
				}
				this.updateContent( townId );
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
							this.durMods.baseData = $.secureEvalJSON( /TownInfo.unitInfo ?= ?([^\;]*);/.exec(data)[1] );
							this.durMods.dataSource = town_id;
							
							var el = $("<div></div>");
							var x=$.ready;
							var y=$.fn.ready;
							$.ready = $.fn.ready = function(){};
							try{
								el.html(data);
							}finally{
								$.ready = x;
								$.fn.ready = y;
							}
							var units = el.find("#town_info_units .index_unit");
							this.units = {};
							for( var i = 0; i < units.length; i++ ){
								var el = $(units[i]);
								this.units[el.attr("id")] = Number( el.find("span:first").text() );
							}
							this.afterGotContent();
						},this)
					});
				}
				return false;
			},
			getTime: function(town_id){
				if( this.durCache[town_id] ){
					if( this.durCache[town_id] === true )
						return null;
					return this.durCache[town_id];
				}else{
					$.ajax({
						xhr: faarksGrepoTools.myXhr,
						url: 'http://www.grepotools.de/backend.cgi',
						data: {
							type:"plainb",
							speed:1,
							world:faarksGrepoTools.currentWorld,
							mytid:Game.townId,
							tid:town_id
						},
						error: fer_cf(function(request,error){
							this.durCache[town_id] = false;
						},this),
						success: fer_cf(function(request){
							var data = request.split("|");
							if( data.length == 3 )
								this.durCache[town_id] = { time: Number(data[0]), offset: Number(data[1]), sameIsland: Number(data[2]) };
							else
								this.durCache[town_id] = { error: data.toString() };
							this.afterGotContent( town_id );
						},this)
					});
					this.durCache[town_id] = true;
				}
			},
			mayAddUnitToRows: function(otherIslandData,unit,upperrow,lowerrow,inv){
				if( (this.useDefaultUnits && ( jQuery.inArray(unit,this.defaultUnits) != -1 )) || (this.units[unit] && (this.units[unit] > 0) )  ){
					var col = (upperrow.children().length % 2 == (inv?1:0)) ? "#E5BF75" : "#FFE2A1";
					upperrow.append("<td style=\"background-color: "+col+"; \"><img style=\"width:25px;height:25px;\" src=\"/images/game/units/"+unit+"_40x40.png\"/></td>");
					lowerrow.append("<td style=\"background-color: "+col+"; padding: 0px 1px 0px 1px; font-size: 9px;\">"+readableSeconds(((otherIslandData.time/GameData.units[unit].speed)/this.durMods.data[unit])+otherIslandData.offset)+"</td>");
				}
			},
			drawContent: function(targetEl,otherIslandData){
				var tbl = $("<table cellspacing=\"0\" cellpadding=\"0\" style=\"border: 1px solid #E1AF55;text-align:center;margin-top:3px;\"></table>");
				var upperRow = $("<tr></tr>");
				var lowerRow = $("<tr></tr>");
				var gotLandWay = otherIslandData.sameIsland;
				var nothingDrawn = true;
				if( gotLandWay ){
					for( var i = 0; i < this.unitTypes.land.length; i++ ){
						this.mayAddUnitToRows(otherIslandData,this.unitTypes.land[i],upperRow,lowerRow,nothingDrawn);
					}
					if( upperRow.find("td").length > 0 ){
						for( var i = 0; i < this.unitTypes.air.length; i++ ){
							this.mayAddUnitToRows(otherIslandData,this.unitTypes.air[i],upperRow,lowerRow,nothingDrawn);
						}
						targetEl.append(tbl);
						tbl.append(upperRow).append(lowerRow);
						nothingDrawn = false;
						tbl = $("<table cellspacing=\"0\" cellpadding=\"0\" style=\"border: 1px solid #E1AF55;text-align:center;margin-top:1px;\"></table>");
						upperRow = $("<tr></tr>");
						lowerRow = $("<tr></tr>");
					}
				}
				for( var i = 0; i < this.unitTypes.sea.length; i++ ){
					this.mayAddUnitToRows(otherIslandData,this.unitTypes.sea[i],upperRow,lowerRow,nothingDrawn);
				}
				if( !gotLandWay || nothingDrawn ){
					for( var i = 0; i < this.unitTypes.air.length; i++ ){
						this.mayAddUnitToRows(otherIslandData,this.unitTypes.air[i],upperRow,lowerRow,nothingDrawn);
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
					var otherIslandData = this.getTime( town_id );
					if( this.gotUnits( town_id ) && otherIslandData && this.durMods.calculated ){
						if(!otherIslandData.error ){
							el.html("");
							this.useDefaultUnits = false;
							if( this.drawContent( el, otherIslandData ) ){
								this.useDefaultUnits = true;
								this.drawContent( el, otherIslandData );
							}
							el.append("<span style='float:right;color: gray;font-size: 50%;'>Laufzeiten by Grex & Faark</span>");
						}else{
							el.html("<span style=\"font-size:50%;color: red;\">Fehler beim Lade der Laufzeiten</span>");
						}
					}else{
						el.html("<span style=\"font-size:80%;color: gray;\">Lade Laufzeiten <img src=\"http://faark.bplaced.net/projects/faarksGrepoPicSaver/resources/loading.gif\" style=\"width: 10px; height: 10px; display: inline; position: relative; top: 1px;\"/></span>");
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
		quickCast: { // Cast-UI when click on god-logo
			init: function(){
				$("#god_mini").css("cursor","pointer");
				$("#god_mini").mousePopup(new MousePopup("Das Bild zeigt den Gott, den du<br/>für diese Stadt gewählt hast.<br/><br/>Wenn du auf es klickst, kannst du<br/>direkt auf diese Stadt zaubern<br/><span style='float:right;color: gray;font-size: 60%;'>by Faark</span>"));
				$("#god_mini").click( function( ) { TownInfo.init(Game.townId,'town_info',false,"#content");$("#info_tab_window_bg").tabs('select',4); } );
				// open town-Spell-dialog javascript:$("#info_tab_window_bg").tabs('select',4);void(0);
			}
		},
		/*incommingLink: { //incomming-link; now implemented by inno
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
			makeWindowMovable: function( win ){
				if( $(win).length <= 0 )
					return;
				var loc = win.offset();
				$("body").append(win);
				win.css({"text-align":"left","z-index":99,"top":loc.top,"left":loc.left});
				win.draggable({cancel:"#info_tab_window_bg a, #info_tab_window_bg ul li, #info_tab_window_bg div div, #info_tab_window_bg iframe, #tutorial_window_arrows",containment:"document",cursor: 'move',opacity: 0.7,scroll:true,snap:true });
			},
			init: function(){
				if( true ){
					$("style:first").append(" #ajax_loader{ z-index:10000 } ");
				}
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
			}
		},
		advancedTownlistLinks: { //advanced townlist
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
							xhr: faarksGrepoTools.myXhr,
							url: 'http://www.grepotools.de/townid2coo.cgi',
							data: {
								townid:town_id,
								world:faarksGrepoTools.currentWorld
							},
							error: fer_cf(function(request,error){
								HumanMessage.error("Fehler beim ermitteln der Dorf-Koordinaten");
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
				var els = $("#town_list li");
				for( var i = 0; i < els.length; i++ ){
					var el = $(els[i]);
					var a = el.find("a:first");
					var tid = Number( /town_id=([^\&]*)/.exec( a.attr("href") )[1] );
					if( el.find(".faarksGrepoTownListEnhancement_box").length == 0 ){
						a.before("<div class=\"faarksGrepoTownListEnhancement_box\"><div class=\"faarksGrepoTownListEnhancement_infoButton\"></div><a href=\""+url("map","",{target_town_id:tid})+"\" class=\"faarksGrepoTownListEnhancement_gotoButton\"></a></div>");
						el.find(".faarksGrepoTownListEnhancement_infoButton").click( fer_cf(this.showTownInfo,this,[tid]) );
						el.find(".faarksGrepoTownListEnhancement_gotoButton").click( fer_cf(this.scrollToTown,this,[tid]) );
						el.find(".faarksGrepoTownListEnhancement_infoButton").mousePopup(new MousePopup("Öffnet das Info-Fenster zu dieser<br/>Stadt. Sehr praktisch, um direkt<br/>Einheiten oder Ressourcen zu<br/>verschicken.<br/><span style='float:right;color: gray;font-size: 60%;'>by Faark</span>",{"z-index":30000}));
						if( typeof WMap === "undefined")
							el.find(".faarksGrepoTownListEnhancement_gotoButton").mousePopup(new MousePopup("Öffnet die Stadt auf der Karte.<br/><span style=\"text-align:right;float: right; color: gray; font-size: 60%;\">by Faark<br/>prior/similar implemention by Kapo el Ligno</span>",{"z-index":30000}));
						else
							el.find(".faarksGrepoTownListEnhancement_gotoButton").mousePopup(new MousePopup("Scrollt direkt zu dieser Stadt,<br/>ohne die Seite neu zu laden.<br/><i style=\"font-size: 70%\">(Nur auf der Map!)</i><br/><span style='float:right;color: gray;font-size: 60%;'>by Faark</span>",{"z-index":30000}));
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
					background:transparent url(http://faark.bplaced.net/projects/faarksGrepoTools/resources/bbc_logo_town_small.png) no-repeat scroll 0 0;\
				}\
				.faarksGrepoTownListEnhancement_gotoButton{\
					background:transparent url(http://faark.bplaced.net/projects/faarksGrepoTools/resources/bbc_logo_world_small.png) no-repeat scroll 0 0;\
				}");
			},
			init: function(){
				if( $('#town_list').length > 0 ){
					this.initCss();
				}
				$('#town_list').ajaxComplete(fer_cf( this.staticAddButtonToTownlist, this ));
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
				var self = this;
				this.input = $("<input type=\"text\"></input>");
				this.defaultValue = oldCurrentBox.text();
				this.input.val( this.defaultValue );
				this.input.focus( function(){ self.focus(); } );
				//this.input.blur( function(){ self.blur(); } );
				this.input.keypress( function(event){if(event&&((event.which&&event.which==13)||(event.keyCode&&event.keyCode==13))){return self.go();}} );
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
				sliderBox.find(".confirm").click( function(){ self.go(); return false; } );
				sliderBox.find(".cancel").click( function(){ self.cancel(); return false; } );
				oldCurrentBox.append(sliderBox);
				oldCurrentBox.append(toggleBox);
				oldCurrentBox.append(this.input);
				this.input.mousePopup(new MousePopup("Du-te direct la o pagina,<br/>click aici pentru a da un<br/>und apasati Enter.<br/><span style='float:right;color: gray;font-size: 60%;'>by Faark</span>"));
				sliderBox.find(".confirm").mousePopup(new MousePopup("Du-te la pagina selectata<br/><span style='float:right;color: gray;font-size: 60%;'>by Faark</span>"));
				sliderBox.find(".cancel").mousePopup(new MousePopup("Anulare-<br/>Introduceti din nou pagina<br/><span style='float:right;color: gray;font-size: 60%;'>by Faark</span>"));
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
					new this.initAdvancedPaginator($("#forumtitle"),function(a){return url("alliance","forum",{"forum[forum_id]":Number(faarksGrepoTools.getParam("forum\\[forum_id\\]",$("#forumtitle a.paginator_bg:first").attr("href"))),"forum[page]":a});});
					new this.initAdvancedPaginator($("#threadtitle"),function(a){return url("alliance","forum",{"forum[thread_id]":faarksGrepoTools.getParam("forum\\[thread_id\\]"),"forum[page]":a});});
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
						var page = Math.ceil( ( Number( $.trim(post.find(".postcount").text()) ) + 1 )/ 10 );
						if( page > 1 ){
							post.find(".title").append('<a class="lastpostlink" href="'+post.find(".title a").attr("href")+"&forum[page]="+page+'" style="background:transparent url(/images/game/forum/expand.png) repeat scroll 0 0; width:12px; height:12px; display:inline-block; position:relative; top:2px;"></a>');
							post.find(".lastpostlink").mousePopup(new MousePopup("Gehe zur letzten Seite ("+page+")<br/><span style='float:right;color: gray;font-size: 60%;'>by Faark</span>"));
						}
					}
				}
			}
		},
		
		init: function(){
			/* util */
			this.currentWorld = Game.world = /([a-zA-Z0-9]*)\./.exec(document.location.href)[1];
			this.currentAction = Game.action = this.getParam("action")
			this.currentTownName = Game.town_name = $("#town_name_href").text();
			this.currentFolder = this.getParam("folder_id");
			
			/* modules */
			for( var i in this ){
				if( (typeof this[i] === "object") && this[i] && (typeof this[i].init === "function") ){
					this[i].init();
				}
			}
		}
	};
	faarksGrepoTools.init();
}catch(err){
	faarksErrorReporter.report( err );
}

