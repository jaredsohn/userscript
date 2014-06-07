// ==UserScript==
// @name           Allocine_Zap_Plus_Binnews
// @fullname       Allocine Zap Plus Binnews
// @author         http://userscripts.org/users/185451
// @namespace      http://userscripts.org/scripts/show/77330
// @description    Enlève la publicité - Zapping entre les vidéos sans changer de page + Recherche Binnews ;)
// @icon           data:image/png;base64,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
// @version        4.6.3
// @date           23/12/2013
// @source         http://userscripts.org/scripts/show/185451
// @downloadURL    https://userscripts.org/scripts/source/185451.user.js
// @updateURL      https://userscripts.org/scripts/source/185451.meta.js
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_deleteValue
// @grant          GM_registerMenuCommand
// @grant          GM_xmlhttpRequest
// @grant          GM_openInTab
// @grant          unsafeWindow
// @run-at         document-end
// @match          http://www.allocine.fr/*
// @match          http://www.screenrush.co.uk/*
// @match          http://www.sensacine.com/*
// @match          http://www.filmstarts.de/*
// @match          http://www.beyazperde.com/*
// @match          http://www.adorocinema.com/*
// @exclude        http://*/_video/iblogvision.aspx*
// @compatibility  Firefox, Chrome, Opéra
// ==/UserScript==


//****************************************************************
//	functions for Opera
//****************************************************************
if (typeof GM_getValue === "undefined"){
	if(typeof window.localStorage == "object") {
		function GM_getValue ( key, defaultValue ) {
			var value = window.localStorage.getItem(key);
			if( value == null ) value = defaultValue;
			else if(value=='true') value = true;
			else if(value=='false') value = false;
			return value;
		}
	}
	else{
		function GM_getValue( cookieName, oDefault ) {
			var cookieJar = document.cookie.split( "; " );
			for( var x = 0; x < cookieJar.length; x++ ) {
				var oneCookie = cookieJar[x].split( "=" );
				if( oneCookie[0] == escape( cookieName ) ) {
					try {
						eval('var footm = '+unescape( oneCookie[1] ));
					} catch(e) { return oDefault; }
					return footm;
				}
			}
			return oDefault;
		}
	}
}

if (typeof GM_setValue === "undefined") {
	if(typeof window.localStorage == "object") {
		function GM_setValue( key, value ) {
			window.localStorage.setItem( key, value );
		}
	}
	else{
		function getRecoverableString(oVar,notFirst) {
			var oType = typeof(oVar);
			if( ( oType == 'null' ) || ( oType == 'object' && !oVar ) ) {
				//most browsers say that the typeof for null is 'object', but unlike a real
				//object, it will not have any overall value
				return 'null';
			}
			if( oType == 'undefined' ) { return 'window.uDfXZ0_d'; }
			if( oType == 'object' ) {
				//Safari throws errors when comparing non-objects with window/document/etc
				if( oVar == window ) { return 'window'; }
				if( oVar == document ) { return 'document'; }
				if( oVar == document.body ) { return 'document.body'; }
				if( oVar == document.documentElement ) { return 'document.documentElement'; }
			}
			if( oVar.nodeType && ( oVar.childNodes || oVar.ownerElement ) ) { return '{error:\'DOM node\'}'; }
			if( !notFirst ) {
				Object.prototype.toRecoverableString = function (oBn) {
					if( this.tempLockIgnoreMe ) { return '{\'LoopBack\'}'; }
					this.tempLockIgnoreMe = true;
					var retVal = '{', sepChar = '', j;
					for( var i in this ) {
						if( i == 'toRecoverableString' || i == 'tempLockIgnoreMe' || i == 'prototype' || i == 'constructor' ) { continue; }
						if( oBn && ( i == 'index' || i == 'input' || i == 'length' || i == 'toRecoverableObString' ) ) { continue; }
						j = this[i];
						if( !i.match(basicObPropNameValStr) ) {
							//for some reason, you cannot use unescape when defining peoperty names inline
							for( var x = 0; x < cleanStrFromAr.length; x++ ) {
								i = i.replace(cleanStrFromAr[x],cleanStrToAr[x]);
							}
							i = '\''+i+'\'';
						} else if( window.ActiveXObject && navigator.userAgent.indexOf('Mac') + 1 && !navigator.__ice_version && window.ScriptEngine && ScriptEngine() == 'JScript' && i.match(/^\d+$/) ) {
							//IE mac does not allow numerical property names to be used unless they are quoted
							i = '\''+i+'\'';
						}
						retVal += sepChar+i+':'+getRecoverableString(j,true);
						sepChar = ',';
					}
					retVal += '}';
					this.tempLockIgnoreMe = false;
					return retVal;
				};
				Array.prototype.toRecoverableObString = Object.prototype.toRecoverableString;
				Array.prototype.toRecoverableString = function () {
					if( this.tempLock ) { return '[\'LoopBack\']'; }
					if( !this.length ) {
						var oCountProp = 0;
						for( var i in this ) { if( i != 'toRecoverableString' && i != 'toRecoverableObString' && i != 'tempLockIgnoreMe' && i != 'prototype' && i != 'constructor' && i != 'index' && i != 'input' && i != 'length' ) { oCountProp++; } }
						if( oCountProp ) { return this.toRecoverableObString(true); }
					}
					this.tempLock = true;
					var retVal = '[';
					for( var i = 0; i < this.length; i++ ) {
						retVal += (i?',':'')+getRecoverableString(this[i],true);
					}
					retVal += ']';
					delete this.tempLock;
					return retVal;
				};
				Boolean.prototype.toRecoverableString = function () {
					return ''+this+'';
				};
				Date.prototype.toRecoverableString = function () {
					return 'new Date('+this.getTime()+')';
				};
				Function.prototype.toRecoverableString = function () {
					return this.toString().replace(/^\s+|\s+$/g,'').replace(/^function\s*\w*\([^\)]*\)\s*\{\s*\[native\s+code\]\s*\}$/i,'function () {[\'native code\'];}');
				};
				Number.prototype.toRecoverableString = function () {
					if( isNaN(this) ) { return 'Number.NaN'; }
					if( this == Number.POSITIVE_INFINITY ) { return 'Number.POSITIVE_INFINITY'; }
					if( this == Number.NEGATIVE_INFINITY ) { return 'Number.NEGATIVE_INFINITY'; }
					return ''+this+'';
				};
				RegExp.prototype.toRecoverableString = function () {
					return '\/'+this.source+'\/'+(this.global?'g':'')+(this.ignoreCase?'i':'');
				};
				String.prototype.toRecoverableString = function () {
					var oTmp = escape(this);
					if( oTmp == this ) { return '\''+this+'\''; }
					return 'unescape(\''+oTmp+'\')';
				};
			}
			if( !oVar.toRecoverableString ) { return '{error:\'internal object\'}'; }
			var oTmp = oVar.toRecoverableString();
			if( !notFirst ) {
				//prevent it from changing for...in loops that the page may be using
				delete Object.prototype.toRecoverableString;
				delete Array.prototype.toRecoverableObString;
				delete Array.prototype.toRecoverableString;
				delete Boolean.prototype.toRecoverableString;
				delete Date.prototype.toRecoverableString;
				delete Function.prototype.toRecoverableString;
				delete Number.prototype.toRecoverableString;
				delete RegExp.prototype.toRecoverableString;
				delete String.prototype.toRecoverableString;
			}
			return oTmp;
		}

		function GM_setValue( cookieName, cookieValue, lifeTime ) {
			if( !cookieName ) { return; }
			if( lifeTime == "delete" ) { lifeTime = -10; } else { lifeTime = 31536000; }
			document.cookie = escape( cookieName ) + "=" + escape( getRecoverableString( cookieValue ) ) +
				";expires=" + ( new Date( ( new Date() ).getTime() + ( 1000 * lifeTime ) ) ).toGMTString() + ";path=/";
		}
	}
}
if (typeof GM_xmlhttpRequest === "undefined") {
	function GM_xmlhttpRequest(details) {
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
			var responseState = {
				responseXML:(xmlhttp.readyState==4 ? xmlhttp.responseXML : ''),
				responseText:(xmlhttp.readyState==4 ? xmlhttp.responseText : ''),
				readyState:xmlhttp.readyState,
				responseHeaders:(xmlhttp.readyState==4 ? xmlhttp.getAllResponseHeaders() : ''),
				status:(xmlhttp.readyState==4 ? xmlhttp.status : 0),
				statusText:(xmlhttp.readyState==4 ? xmlhttp.statusText : '')
			}
			if (details["onreadystatechange"]) {
				details["onreadystatechange"](responseState);
			}
			if (xmlhttp.readyState==4) {
				if (details["onload"] && xmlhttp.status>=200 && xmlhttp.status<300) {
					details["onload"](responseState);
				}
				if (details["onerror"] && (xmlhttp.status<200 || xmlhttp.status>=300)) {
					details["onerror"](responseState);
				}
			}
		}
		try {
			//cannot do cross domain
			xmlhttp.open(details.method, details.url);
//			alert(details.method +':'+ details.url)
		} catch(e) {
			if( details["onerror"] ) {
				//simulate a real error
				details["onerror"]({responseXML:'',responseText:'',readyState:4,responseHeaders:'',status:403,statusText:'Forbidden'});
			}
			return;
		}
		if (details.headers) {
			for (var prop in details.headers) {
				xmlhttp.setRequestHeader(prop, details.headers[prop]);
			}
		}
		xmlhttp.send((typeof(details.data)!='undefined')?details.data:null);
	}
}

//****************************************************************
//	Start
//****************************************************************
if (typeof unsafeWindow === "undefined") unsafeWindow = window;
if (typeof unsafeWindow !== "undefined" && unsafeWindow.ac != undefined && unsafeWindow.ac.adRenderer != undefined)
{
	// Zap page intro: http://userscripts.org/scripts/show/60935
	unsafeWindow.ac.adRenderer.interstitialStop();
	window.clearInterval(unsafeWindow.ac.adRenderer.preRollInterval);
	window.clearInterval(unsafeWindow.ac.adRenderer.timePreroll);
	window.clearInterval(unsafeWindow.ac.adRenderer.__interstitial);
}

var BalisesDivPub = document.getElementsByTagName('div');
var NbBalisesDivPub = BalisesDivPub.length;
for (i=0; i<NbBalisesDivPub ; i++)
{
	if (BalisesDivPub[i] && ( BalisesDivPub[i].id.match(/ad_(\d+)(.*?)/) || BalisesDivPub[i].id.match(/scr_(\d+)(.*?)/) ) )
	{
		//BalisesDivPub[i].style.display='none';
		BalisesDivPub[i].parentNode.removeChild(BalisesDivPub[i]);
	}
}


//****************************************************************
//		C h e c k   u p d a t e
//****************************************************************
var AZ_id = 185451;
var AZ_today = new Date();
AZ_today_YYYYMMDD = parseInt(AZ_today.getFullYear()*10000+AZ_today.getMonth()*100+AZ_today.getDate());

var AZ_new_check = 1;
if (!GM_getValue('AZ_FreqUpdate'))	GM_setValue('AZ_FreqUpdate', 7);
if (!GM_getValue('AZ_Version'))		GM_setValue('AZ_Version', 0);
if (!GM_getValue('AZ_DateUpdate'))	GM_setValue('AZ_DateUpdate', AZ_today_YYYYMMDD);
AZ_new_check = parseInt(GM_getValue('AZ_DateUpdate'))+parseInt(GM_getValue('AZ_FreqUpdate'));
if (AZ_today_YYYYMMDD > GM_getValue('AZ_DateUpdate') && AZ_today_YYYYMMDD >= AZ_new_check)
{
	var erreur_later = false;
	if(!GM_getValue('AZ_DateLater'))
		erreur_later = true;
	if (erreur_later || GM_getValue('AZ_DateLater')<=AZ_today_YYYYMMDD)	check_AZ_version();
}

//****************************************************************
//		L a n g u a g e
//****************************************************************
//if (!GM_getValue('AZ_lng') || GM_getValue('AZ_lng')=='auto')	var AZ_LANG = navigator.language;
//else															var AZ_LANG = GM_getValue('AZ_lng');

var AZ_LANG = navigator.language;
if (AZ_LANG!='fr' && AZ_LANG!='en')								AZ_LANG = 'en';
//AZ_LANG = 'en';

switch ( AZ_LANG )
{
	case 'fr':
	AZ_LNG =
	{
		name:				'Allocine Zap Binnews',
		show:				'Afficher',
		hide:				'Masquer',
		show_vid:			'Afficher la vidéo',
		hide_vid:			'Masquer la vidéo',
		load_vid:			'Charger cette vidéo',
		size:				'Taille',
		player:				'Lecteur',
		error_vid:			'Erreur. Rechargez la page SVP.',
		position_reset:		        'Réinitialiser positionnement',
		options:			'Options',
		OptBorder:			'Bordure',
		OptPosition:		        'Position',
		OptOriginal:		        'Originelle',
		OptFloat:			'Flottante',
		OptColor:			'Couleur de la police',
		OptBgcolor:			'Couleur d\'arrière-plan',
		download:			'T&eacute;l&eacute;charger',
		monallocine:		'Mon AlloCin&eacute;',
		header:				'En-t&ecirc;te',
		header_fixed:		'Fixe',
		header_normal:		'Normal',
		footer:				'Pied de page',
		bydefault:			'Par défaut',
		option_close:		'Fermer',
		options_reload:		'Recharger la page ?',
		option_cancel:		'Annuler',
		title_update_new:	'Nouvelle version de',
		check_updates:		'Vérifier les mises à jour',
 		check_noresult:		'Pas de nouvelle version de Allocine Zap Binnews',
		update_button:		'Mettre à jour',
		later_button:		'Plus tard',
		autoplay:			'Lecture auto.',
		on:					'Activé',
		off:				'Désactivé',
		url:				'URL',
		donate_title:		'Si vous trouvez Allocine Zap Binnews utile, vous pouvez faire un don libre au concepteur de Allocine Zap.'

	};
	break;
	case 'en':
	AZ_LNG =
	{
		name:				'Allocine Zap Binnews',
		show:				'Show',
		hide:				'Hide',
		show_vid:			'Show video',
		hide_vid:			'Hide video',
		load_vid:			'Load this video',
		size:				'Size',
		player:				'Player',
		error_vid:			'Error. please, reload the page.',
		position_reset:		'Reset positioning',
		options:			'Options',
		OptBorder:			'Border',
		OptPosition:		'Position',
		OptOriginal:		'Original',
		OptFloat:			'Float',
		OptColor:			'Font color',
		OptBgcolor:			'Background color',
		download:			'Download',
		monallocine:		'My Screenrush',
		header:				'Header',
		header_fixed:		'Fixed',
		header_normal:		'Normal',
		footer:				'Footer',
		bydefault:			'By default',
		options_reload:		'Reload page ?',
		option_close:		'Close',
		option_cancel:		'Cancel',
		title_update_new:	'New version of',
		check_updates:		'Check for updates',
		check_noresult:		'No new version of Allocine Zap Binnews',
		update_button:		'Update',
		later_button:		'Later',
		autoplay:			'Autoplay',
		on:					'On',
		off:				'Off',
		url:				'URL',
		donate_title:		'If you find Allocine Zap useful, you can make a free donation.'
	};
}
switch ( location.hostname )
{
	case 'www.screenrush.co.uk':
		AZ_LNG.monallocine = 'My Screenrush';
		AZ_LNG.footer = 'Footer';
		break;
	case 'www.sensacine.com':
		AZ_LNG.monallocine = 'Mi SensaCine';
		AZ_LNG.footer = 'Pie de p&aacute;gina';
		break;
	case 'www.filmstarts.de':
		AZ_LNG.monallocine = 'Mein FILMSTARTS';
		AZ_LNG.footer = 'Fußzeile';
		break;
	case 'www.beyazperde.com':
		AZ_LNG.monallocine = 'Beyazperdem';
		AZ_LNG.footer = 'Altbilgi';
		break;
	case 'www.adorocinema.com':
		AZ_LNG.monallocine = 'Meu AdoroCinema';
		AZ_LNG.footer = 'Rodap&eacute;';
		break;
}

//****************************************************************
//		A j o u t   d u   M e n u
//****************************************************************
if(typeof GM_registerMenuCommand !== "undefined")
{
	GM_registerMenuCommand( 'Allocine Zap: '+AZ_LNG.options , AZ_options_only);
	GM_registerMenuCommand( 'Allocine Zap: '+AZ_LNG.check_updates , ForceCheck_AZ_version);
	GM_registerMenuCommand( 'Allocine Zap: '+AZ_LNG.position_reset , AZ_reset_pos);
}

//****************************************************************
//		V a r i a b l e s
//****************************************************************
var AZ_Url_Page = window.location.href;
var AZ_TLBR		= '2px';
if (GM_getValue('AZ_canhidenav'))		try {GM_deleteValue('AZ_canhidenav');} catch(Err){};
if (GM_getValue('AZ_position'))			try {GM_deleteValue('AZ_position');} catch(Err){};
if (!GM_getValue('AZ_width'))			GM_setValue('AZ_width', 480);
if (!GM_getValue('AZ_height'))			GM_setValue('AZ_height', 300);
if (!GM_getValue('AZ_Top'))				GM_setValue('AZ_Top', AZ_TLBR);
if (!GM_getValue('AZ_Left'))			GM_setValue('AZ_Left', AZ_TLBR);
if (!GM_getValue('AZ_header'))			GM_setValue('AZ_header', 'fixed');
if (!GM_getValue('AZ_choix_lecteur'))	GM_setValue('AZ_choix_lecteur', 'html5');
if (!GM_getValue('AZ_border'))			GM_setValue('AZ_border', '8px');
if (!GM_getValue('AZ_posOri'))			GM_setValue('AZ_posOri', false);
if (!GM_getValue('AZ_autoplay'))		GM_setValue('AZ_autoplay', false);
if (typeof GM_getValue('AZ_zap') === "undefined")
										GM_setValue('AZ_zap', true);
if (!GM_getValue('AZ_Color'))			GM_setValue('AZ_Color', '#000000');
if (!GM_getValue('AZ_BgColor'))			GM_setValue('AZ_BgColor', '#FFD515');

var AZ_UrlVideoCplt = 'autoPlay='+GM_getValue('AZ_autoplay')+'&autoplay='+GM_getValue('AZ_autoplay')+'&';
AZ_UrlVideoCplt += 'timeToShowAdPanel=15&expandable=false&canHideNav=true&adVast=false&smartIdPrerollSet=&';
AZ_UrlVideoCplt += 'urlDirectVast=&urlDirectVastPr=&urlDirectVastDfp=&';
AZ_UrlVideoCplt += 'urlPostrollDfp1=&urlPostrollDfp2=&';
AZ_UrlVideoCplt += 'host=http://'+window.location.host+'&';
AZ_UrlVideoCplt += 'pre-roll=false&preroll=false&preRoll=false&';
AZ_UrlVideoCplt += 'post-roll=false&postroll=false&postRoll=false&';
AZ_UrlVideoCplt += 'v7=true&blog='+(GM_getValue('AZ_choix_lecteur')=='true'?'true':'false')+'&';

//****************************************************************
//		C S S
//****************************************************************
var zapColor = GM_getValue('AZ_Color');
var zapBgColor = GM_getValue('AZ_BgColor');
document.getElementsByTagName('body')[0].appendChild(getCSS());
if (document.getElementById('header'))
{
	if (document.getElementById('q'))
	{
		document.getElementById('nav').appendChild(createElement('span',{id:"AZ_Login", class:"AZ_Login AZ_LoginNew"}, 'click AZ_Login false', AZ_LNG.monallocine));
		document.getElementById('nav').appendChild(createElement('span',{id:"AZ_Footer", class:"AZ_Footer AZ_FooterNew"}, 'click AZ_Footer false', AZ_LNG.footer));
		document.getElementById('q').focus();
	}
}
//****************************************************************
//		T a b l e   c o u l e u r s
//****************************************************************
var ColorSelected = zapColor.substr(1);
var BgColorSelected = zapBgColor.substr(1);
//var AZ_WebColorsHexaColor = '0369CF';
var AZ_WebColorsHexaColor = '369ACE';
var AZ_WebColorsCount = AZ_WebColorsHexaColor.length;
var AZ_WebColors = '<div style="font-weight:bold;font-variant:small-caps">'+AZ_LNG.OptBgcolor+'</div>';
	AZ_WebColors += '<table class="AZ_WebColors" cellspacing="0">\n';
	for (var AZ_red=0; AZ_red<AZ_WebColorsCount; AZ_red++)
	{
		AZ_WebColors += ' <tr>\n';
		for (AZ_green=0; AZ_green<AZ_WebColorsCount; AZ_green++)
		{
			for (var AZ_blue=0; AZ_blue<AZ_WebColorsCount; AZ_blue++)
			{
				var AZ_string = AZ_WebColorsHexaColor[AZ_red] + AZ_WebColorsHexaColor[AZ_green] + AZ_WebColorsHexaColor[AZ_blue];
				var AZ_colorvalue = AZ_WebColorsHexaColor[AZ_red] + AZ_WebColorsHexaColor[AZ_red] + AZ_WebColorsHexaColor[AZ_green] + AZ_WebColorsHexaColor[AZ_green] + AZ_WebColorsHexaColor[AZ_blue] + AZ_WebColorsHexaColor[AZ_blue];
				var AZ_color = '#' + AZ_colorvalue;
				AZ_WebColors += ' <td id="TDBg_'+AZ_colorvalue+'"></td>\n';
			}
		}
		AZ_WebColors += '</tr>\n';
	}
	AZ_WebColors += '</table>\n';
var AZ_ColorSup = ['#FFFFFF','#DDDDDD','#C0C0C0','#969696','#808080','#646464','#4B4B4B','#242424','#FFD515','#000000'];
	AZ_WebColors += '<table class="AZ_WebColors" cellspacing="0"><tr>\n';
	for (var AZ_icolor=0; AZ_icolor<AZ_ColorSup.length; AZ_icolor++)
	{
		AZ_WebColors += ' <td id="TDBg_'+AZ_ColorSup[AZ_icolor].substr(1)+'" '+(AZ_icolor==-1 ? 'style="display:none"':'')+'></td>\n';
		//<button id="BgColorSelected'+AZ_ColorSup[AZ_icolor].replace('#','_')+'" value="'+AZ_ColorSup[AZ_icolor]+'" title="'+AZ_ColorSup[AZ_icolor]+'" onclick="document.getElementById(\'AZ_container\').style.backgroundColor=this.value;" style="color:'+(AZ_icolor<4 ? '#000':'#FFF')+';background-color:'+AZ_ColorSup[AZ_icolor]+'"></button>
	}
	AZ_WebColors += '</tr></table><br />\n';

//****************************************************************
//		D i v   o p t i o n s
//****************************************************************
var AZ_N = '\n';
var Choice_options = AZ_N+'<div id="AZ_options" style="display:none;width:'+GM_getValue('AZ_width')+'px;cursor:default;">';
		Choice_options += '<span style="float:left;text-align:right;width:50%;">'+AZ_LNG.header+' : &nbsp;</span><span id="AZ_LinkHeader"></span>';
		Choice_options += '<br style="clear:both;" />';
		Choice_options += '<span style="float:left;text-align:right;width:25%;">'+AZ_LNG.size+' : &nbsp;</span><span id="AZ_size"></span>';
		Choice_options += '<span style="float:left;text-align:right;width:25%;">'+AZ_LNG.player+' : &nbsp;</span><span id="AZ_choix_lecteur"></span>';
		Choice_options += '<br style="clear:both;" />';
		Choice_options += '<span style="float:left;text-align:right;width:25%;">'+AZ_LNG.OptBorder+' : &nbsp;</span><span id="AZ_LinkBorder"></span>';
		Choice_options += '<span style="float:left;text-align:right;width:25%;">'+AZ_LNG.OptPosition+' : &nbsp;</span><span id="AZ_LinkPosOri"></span>';
		Choice_options += '<br style="clear:both;" />';
		Choice_options += '<span style="float:left;text-align:right;width:25%;">'+AZ_LNG.autoplay+' : &nbsp;</span><span id="AZ_LinkAutoplay"></span>';
		Choice_options += '<span style="float:left;text-align:right;width:25%;">Zap : &nbsp;</span><span id="AZ_LinkZap"></span>';
		Choice_options += '<br style="clear:both;" />';
		Choice_options += '<span id="AZ_LinkColor"></span>';
		Choice_options += '<span id="AZ_LinkBgColor"></span>';
		Choice_options += '<br style="clear:both;" />';
		Choice_options += '<hr style="margin:5px 10px;" />';
		Choice_options += '<div id="AZ_AllDivColors" style="display:none"></div>';
	Choice_options += '</div>';

var player_no_pub_title = AZ_N;
	player_no_pub_title += AZ_N+'<div id="AZ_div_title" style="text-align:left;">';
		player_no_pub_title += AZ_N+'<div id="AZ_zap_name" style="float:left;height:30px;padding:5px;">&nbsp;</div>';
		player_no_pub_title += AZ_N+'<div style="height:30px;padding:5px;">';
			player_no_pub_title += AZ_N+'<form title="'+AZ_LNG.donate_title+'" target="_blank" action="https://www.paypal.com/cgi-bin/webscr" method="post">';
				player_no_pub_title += AZ_N+'<input type="hidden" name="cmd" value="_s-xclick" />';
				player_no_pub_title += AZ_N+'<input type="hidden" name="encrypted" value="-----BEGIN PKCS7-----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-----END PKCS7-----">';
				player_no_pub_title += AZ_N+'<input style="border:none;max-height:14px;float:right;margin-right:10px;" type="image" name="submit" alt="PayPal!" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAWCAYAAAA8VJfMAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6M0I3MDA1REEwMDFEMTFFMzhDNjJENjM1ODk4RDk2MDMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6M0I3MDA1REIwMDFEMTFFMzhDNjJENjM1ODk4RDk2MDMiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDozQjcwMDVEODAwMUQxMUUzOEM2MkQ2MzU4OThEOTYwMyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDozQjcwMDVEOTAwMUQxMUUzOEM2MkQ2MzU4OThEOTYwMyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Ps+KmasAAAZNSURBVHjarFZrbBzV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" />';
			player_no_pub_title += AZ_N+'</form>';
			player_no_pub_title += AZ_N+'<br />';
			player_no_pub_title += AZ_N+'<a style="display:none;float:left" id="AZ_DLhtml5" title="'+AZ_LNG.download+'" href="#"><img alt="Dl" class="AZ_MiniImg" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RjE0QkI4ODYwMDI5MTFFM0I3MEJBNDdEMzhFNjUyREIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RjE0QkI4ODcwMDI5MTFFM0I3MEJBNDdEMzhFNjUyREIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpGMTRCQjg4NDAwMjkxMUUzQjcwQkE0N0QzOEU2NTJEQiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpGMTRCQjg4NTAwMjkxMUUzQjcwQkE0N0QzOEU2NTJEQiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pg5hdLkAAAH1SURBVHjaYmRAA4rMLGIbXTyOCKqqqv4D8lk+fPyWs2FtwPovH3cz4ANRrBy2/zZt/Q8HDx79TxYSrUBXxwRjMAKxCgMDr+7vX1L/GRnhCv4DmSo/fvHpMzAIsGOzqUFcOultTuHTj5l5n35evAy38O/bt/8/FVd8A+IXi7QN5mBorOAXTvt/6Oh/nODN2/+rdQxXY2jkBOKd/KIr/m7fgaHn342b/x/rGN3UZWCQhKlnBhGaDIz8q4wslhrEx7owvn/LycDCyMAsIwtW8PfuLYafG9YzsGtocbrzCDjduX373F2Gf88ZQB5eqaA25f/tu3Abfmzd8P/X6aP//9y+9v/7oln//33+BJH4+ev/Hb+Qa8rAQGQo5OYL/7Z0xR905/06d+L/z33bQA5FlXj46P88ZY1uxlO6JqeUszNMmdnYgO7+z8D8Hxg1bMwMjNxAXzMyMfz//oOB4ccvhr///zP8BUbaPw52hueLlz1iEbex0ud2d2Fg+vePgfE/JD7BBBM0LoFiDEA5FpAhQDEQV/DxE2kWFgV5NiZODoYPazYwMDMxgUOLCWg6LAmA9f39w8CspMjAoqzE8PfzFwZWBXlmFsZfvxhYxcUZRLPTGYgFP+7cYWB5dvjIFda5C3T+MzMzICc/ZPAfiQ2Se73/4FOAAAMAxcgigkpAMhQAAAAASUVORK5CYII" /></a>';
			player_no_pub_title += AZ_N+'<img src="" id="AZ_zap_See" title="'+AZ_LNG.show_vid+'" alt="&darr;&darr;" class="AZ_MiniImg" style="display:none;" ';
				player_no_pub_title += 'onclick="document.getElementById(\'AZ_Zap_Hr\').style.display=\'none\'; document.getElementById(\'lecteur_allocine\').style.height=\''+GM_getValue('AZ_height')+'px\'; document.getElementById(\'lecteur_allocine_HTML5\').style.height=\''+GM_getValue('AZ_height')+'px\'; document.getElementById(\'lecteur_allocine_DivX\').style.height=\''+GM_getValue('AZ_height')+'px\'; document.getElementById(\'AZ_zap_noSee\').style.display=\'block\'; this.style.display=\'none\';" />';
			player_no_pub_title += AZ_N+'<img src="" id="AZ_zap_noSee" title="'+AZ_LNG.hide_vid+'" alt="&uarr;&uarr;" class="AZ_MiniImg" style="display:block;" ';
				player_no_pub_title += 'onclick="document.getElementById(\'AZ_Zap_Hr\').style.display=\'block\'; document.getElementById(\'lecteur_allocine\').style.height=\'0px\'; document.getElementById(\'lecteur_allocine_HTML5\').style.height=\'0px\'; document.getElementById(\'lecteur_allocine_DivX\').style.height=\'0px\'; document.getElementById(\'AZ_zap_See\').style.display=\'block\'; this.style.display=\'none\';" />';
			player_no_pub_title += AZ_N+'<img alt="'+AZ_LNG.options+'" title="'+AZ_LNG.options+'" class="AZ_MiniImg" onclick="if (document.getElementById(\'AZ_options\').style.display == \'none\') document.getElementById(\'AZ_options\').style.display = \'block\'; else document.getElementById(\'AZ_options\').style.display = \'none\';" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6ODc4NThBNDIwMDIwMTFFMzkzQzk4NUI2QUQxRjc2QzMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6ODc4NThBNDMwMDIwMTFFMzkzQzk4NUI2QUQxRjc2QzMiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo4Nzg1OEE0MDAwMjAxMUUzOTNDOTg1QjZBRDFGNzZDMyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo4Nzg1OEE0MTAwMjAxMUUzOTNDOTg1QjZBRDFGNzZDMyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PtpXmyYAAALNSURBVHjaPFJdSFpRHP9f79XMplNnKmLRwwxXD8M+t5hCjIlEUNSgIYwV1MAe9jhosJ62yRhEuKgNRrAeDPKlEuyhRmYFSrRoGbRw1ZaWNnPa9WOZcve/jbxw4XDO//w+D8EwDFx9Kysr4Ha7rwUCgSyXy33D5/MF0Wj0RXV1dbahoSFtNBoLs5yrxeTkJG9qaup1RUWFd2dnx9zd3f2sr6/PcnBw8FAqlXrm5+fHRkZGRIWbLKPL5eJoNBrJ8PBw4Pj4mFlbW8vg5fzu7i7j8/lSoVCImZiY+KNWq8sdDgfJ3qGcTiexsLDwanBw8H4mk0kSBAEcDoe/v79/CSqTyQQkSQJKP7FarfaNjY3vOPeURA+K9vb20a6urltarVa5ubkJeAgzMzPfkDmIIKp8Pg/Nzc03amtryxFEa7PZHCTSM4uLi4DGDblcjtze3obx8fF36OIJhvMJw0pgOA+QmUAF+f7+flsymXRx6uvr305PTz9XKBTceDwO4XA4UVJSYpubm0uin7+VlZVjKPsnTScB90m73d7b1tb2nkqlUioMRBqLxS7DQgBSIpEU0haJRIRSqeShddjb24Pz83MxMqrJSCTiX15ejul0ujtisYRSKOQ8BJFhaD6Px8Pn8XgvW1pajCRFwUkkkh8YGBhdWlqyEiaTSdLU1PSlsbFRxysqAqFQCMgIwcPDOHrOYa+yxBkNSfqMZWOD+4U29FRZWVlmdXU1iKpuYnp0XV2dCqWASCgSA8oLHR0BTdPwdX39N+JQfr8/XFpamiBOT0+hs7NT7fV61RaL5UNNTc1tdhATZfuEdDrN+oStra3DoaGhx1VVVcHZ2dkfbMSQzWahp6enKBgMOvV6/T08+Gw2m3uLi4sprOYjVvUIawpcXFyYsN+oQCD4/+TYH98ktLa2XpfL5Qb0qcK1u6OjYx39arDDuwaDQY6shfl/AgwA4btnlYYgYoIAAAAASUVORK5CYII" />';
		player_no_pub_title += AZ_N+'</div>';
	player_no_pub_title += AZ_N+'<hr id="AZ_Zap_Hr" style="clear:both;display:none;margin:5px 10px;" />';
	player_no_pub_title += AZ_N+'</div>';

var player_no_pub_select = AZ_N+'<span id="spanselectvid"></span>';

var player_no_pub = AZ_N;
	player_no_pub += AZ_N+'<div id="AZ_container">';
		player_no_pub += AZ_N+'<div id="AZ_div_top">&nbsp;</div>';
		player_no_pub += AZ_N+'<div id="lecteur_allocine_AllPlayers">';
			player_no_pub += AZ_N+'<object id="lecteur_allocine" style="margin:auto;width:'+GM_getValue('AZ_width')+'px;height:'+0.625*GM_getValue('AZ_width')+'px;" type="application/x-shockwave-flash" data="" >';
				player_no_pub += AZ_N+'<param name="menu" value="true" />';
				player_no_pub += AZ_N+'<param name="wmode" value="transparent" />';
				player_no_pub += AZ_N+'<param name="quality" value="high" />';
				player_no_pub += AZ_N+'<param name="allowFullScreen" value="true" />';
				player_no_pub += AZ_N+'<param name="allowScriptAccess" value="always" />';
				player_no_pub += AZ_N+'<param name="flashvars" value="'+AZ_UrlVideoCplt+'" id="flashvars" />';
				player_no_pub += AZ_N+'<p class="AZ_ObjectError" style="line-height:'+GM_getValue('AZ_height')+'px;">'+AZ_LNG.error_vid+'</p>';
			player_no_pub += AZ_N+'</object>';

			player_no_pub += AZ_N+'<div id="lecteur_allocine_DivHTML5">';
				player_no_pub += AZ_N+'<video class="AZ_VideoHTML5" id="lecteur_allocine_HTML5"></video>';
			player_no_pub += AZ_N+'</div>';

			player_no_pub += AZ_N+'<object class="AZ_VideoHTML5" id="lecteur_allocine_DivX" style="margin:auto;width:'+GM_getValue('AZ_width')+'px;height:'+0.625*GM_getValue('AZ_width')+'px;" type="video/divx" data="">';
				player_no_pub += AZ_N+'<param name="src" value="" id="lecteur_allocine_DivXSrc" />';
				player_no_pub += AZ_N+'<param name="previewImage" value="" id="lecteur_allocine_PreviewDivX" />';
				player_no_pub += AZ_N+'<param name="movieTitle" value="" id="lecteur_allocine_TitleDivX" />';
				player_no_pub += AZ_N+'<param name="autoPlay" value="'+GM_getValue('AZ_autoplay')+'" />';
				player_no_pub += AZ_N+'<param name="AutoStart" value="'+GM_getValue('AZ_autoplay')+'" />';
				player_no_pub += AZ_N+'<param name="loop" value="false" />';
				player_no_pub += AZ_N+'<param name="custommode" value="none" />';
				player_no_pub += AZ_N+'<param name="wmode" value="transparent" />';
				player_no_pub += AZ_N+'<param name="bannerEnabled" value="false" />';
				player_no_pub += AZ_N+'<param name="minVersion" value="2.4" />';
				player_no_pub += AZ_N+'<param name="pluginspage" value="http://go.divx.com/plugin/download/" />';
				player_no_pub += AZ_N+'<p class="AZ_ObjectError" style="line-height:'+GM_getValue('AZ_height')/2+'px;">';
					player_no_pub += AZ_N+AZ_LNG.error_vid;
					player_no_pub += AZ_N+'<br />';
					player_no_pub += AZ_N+'<a href="http://www.divx.com/software/divx-plus/web-player" title="'+AZ_LNG.download+' DivX Web Player" target="_blank">';
						player_no_pub += AZ_N+'<img style="border:none" src="http://labs.divx.com/files/dwp-d-s.gif" alt="'+AZ_LNG.download+' DivX Web Player" />';
					player_no_pub += AZ_N+'</a>';
				player_no_pub += AZ_N+'</p>';
			player_no_pub += AZ_N+'</object>';
		player_no_pub += AZ_N+'</div>';
		player_no_pub += AZ_N+'<div id="AZ_div_bottom">&nbsp;</div>';
	player_no_pub += AZ_N+'</div>';

if (getElementsByClassName('colgeneral','div')!='') document.getElementsByClassName('colgeneral')[0].id = 'col_general';
if (getElementsByClassName('mainfooter','div')!='') document.getElementsByClassName('mainfooter')[0].id = 'footer';

	var AZ_SelectOK = false;
	var AZ_CmediasOptionsSelect = '';
	var AZ_OptNames = [];
	var BaliseA = [];
	var BalisesDivBlog = [];
	var CmediaGlobalMulti = [];
	var AZ_ZapId = [];

function AZ_Start()
{
	if (document.getElementById('content_player'))
	{
		document.getElementById('content_player').parentNode.parentNode.innerHTML = '<div id="New_lecteur_Allocine"></div><div id="V6_player"></div>';

	}
	else if (document.getElementById('col_general'))
	{
		document.getElementById('col_general').appendChild(createElement('div',{id:"New_lecteur_Allocine"}, '', ''));
	}
	else
	{
		document.getElementsByTagName('body')[0].appendChild(createElement('div',{id:"New_lecteur_Allocine"}, '', ''));
	}

	document.getElementById('New_lecteur_Allocine').innerHTML = player_no_pub;
	document.getElementById('New_lecteur_Allocine').addEventListener('mousedown', dragHandler, false);

	// Bouton fermeture player
//	document.getElementById('AZ_container').appendChild(createElement('input',{id:"AZ_XcloseButton", type:"button", value:"X"}, 'click AZ_Xclose false', ''));
	document.getElementById('AZ_container').appendChild(createElement('span',{id:"AZ_XcloseTxt", title:""+AZ_LNG.option_close+""}, 'click AZ_Xclose false', 'X'));

	var BalisesTagA = document.getElementsByTagName('a');
	var NbBalisesTagA = BalisesTagA.length;
	//alert(NbBalisesTagA);

	for (var i=0; i<NbBalisesTagA ; i++)
	{
		BaliseA[i] = BalisesTagA[i];
		BaliseA[i].removeAttribute('onclick');
        if (BaliseA[i].href.match(/cliccommand/))
		{
            AZ_TransformClicCommand(BaliseA[i].href,i);
		}
		else if (	( BaliseA[i].href.match('cmedia=') || BaliseA[i].href.match(/(video(s)?|trailer|fragman)(-|\/)(\d+)/) )
				&& !BaliseA[i].href.match(/\/secure(.+?)account\//)
				&& !BaliseA[i].innerHTML.match('<img ')
				&& !BaliseA[i].parentNode.className.match('ac_autopromo')
//				&& !BaliseA[i].innerHTML.match(/class="play"/)
				&& !BaliseA[i].href.match(/#(.*?)$/)
			)
		{
			AZ_ZapId[i] = AZ_Cmedia(BaliseA[i].href)+'_'+i;
			BaliseA[i].parentNode.appendChild(createElement('input',{type:"button", id:""+AZ_ZapId[i]+"", value:"Zap", title:""+BaliseA[i].href+"", class:"AZ_Zap"}, 'click AZ_ZapVideoSpan false'));

			if (BaliseA[i].className=='btn')
			{
				document.getElementById(AZ_ZapId[i]).style.position = 'absolute';
				document.getElementById(AZ_ZapId[i]).style.bottom = '45px';
				document.getElementById(AZ_ZapId[i]).style.right = '20px';
			}
			else
				BaliseA[i].parentNode.parentNode.style.backgroundColor = '#E7EBF0';

			if (BaliseA[i].parentNode.parentNode.parentNode.className == 'tabs_main')
			{
				document.getElementById(AZ_ZapId[i]).style.position = 'absolute';
				document.getElementById(AZ_ZapId[i]).style.marginTop = '-25px';
				document.getElementById(AZ_ZapId[i]).parentNode.firstChild.style.paddingLeft = '45px';
			}
			if (BaliseA[i].href == AZ_Url_Page)
			{
				if (document.getElementById('OldZap'))
				{
					document.getElementById(AZ_ZapId[iLinkId]).parentNode.parentNode.style.backgroundColor = BgcBeforeOldZap;
					document.getElementById('OldZap').removeAttribute('id');
				}
				iLinkId = i;
				IdBeforeOldZap = BaliseA[i].parentNode.parentNode.id;
				BgcBeforeOldZap = document.getElementById(AZ_ZapId[i]).parentNode.parentNode.style.backgroundColor;
				BaliseA[i].parentNode.parentNode.id = 'OldZap';
				document.getElementById(AZ_ZapId[i]).parentNode.parentNode.style.backgroundColor = zapBgColor;
			}
			if (!BaliseA[i].innerHTML.match(/^(\s)?(Voir la bande-annonce|Tr(a|á)iler|Fragman)$/))
				AZ_OptNames[i] = BaliseA[i].innerHTML.replace(/<(.*?)>/g,'').replace(/(?:^\s+|\s+$)/g, '');
			else
				AZ_OptNames[i] = BaliseA[i-1].innerHTML.replace(/<(.*?)>/g,'').replace(/(?:^\s+|\s+$)/g, '');
		}
	}
	AZ_BuildOptionsSelect(GM_getValue('AZ_width'));
	var BalisesDivBlog = document.getElementsByTagName('div');
	var NbBalisesDivBlog = BalisesDivBlog.length;
	for (var i=0; i<NbBalisesDivBlog ; i++)
	{
		if (BalisesDivBlog[i] && ( BalisesDivBlog[i].id == 'blogvision' || BalisesDivBlog[i].className.match(/challenger(One|Two)/) ) )
		{
	        FindCmedia = VersionBlog = '';

			if (BalisesDivBlog[i].className.match(/challenger(One|Two)/))
			{
				FindCmedia = BalisesDivBlog[i].id;
                VersionBlog = 'Challengers'
			}
			BalisesDivBlog[i].id = 'blogvision_'+i;
			RegexFindCmedia1 = /blogvision\/([0-9]+)"/;
			RegexFindCmedia2 = /cmedia=([0-9]+)"/;
			if (RegexFindCmedia1.test(document.getElementById('blogvision_'+i).innerHTML))
			{
				FindCmedia = RegexFindCmedia1.exec(document.getElementById('blogvision_'+i).innerHTML)[1];
			}
			else if (RegexFindCmedia2.test(document.getElementById('blogvision_'+i).innerHTML))
			{
				FindCmedia = RegexFindCmedia2.exec(document.getElementById('blogvision_'+i).innerHTML)[1];
			}
			//RegexFindStyle = /style="(.+?)"/;
			//FindStyle = RegexFindStyle.exec(document.getElementById('blogvision_'+i).innerHTML)[1];
			if (FindCmedia != '')
			{
				CmediaGlobalMulti[i] = FindCmedia;

				NewObjectTagDiv = '<div id="lecteur_allocine_'+i+'_Title" class="lecteur_allocine_Title">&nbsp;</div>';

				NewObjectTagDiv += AZ_N+'<object id="lecteur_allocine_'+i+'" style="width:100%;height:100%;margin:auto;" type="application/x-shockwave-flash" data="">';
					NewObjectTagDiv += document.getElementById('lecteur_allocine').innerHTML.replace(/blog=false/g,'blog=true').replace(/autoPlay=true/g,'autoPlay=false').replace(/autoplay=true/g,'autoplay=false').replace('id="flashvars"','id="flashvars_'+i+'"');
				NewObjectTagDiv += '</object>';

				NewObjectTagDiv += AZ_N+'<video class="AZ_VideoHTML5" id="lecteur_allocine_'+i+'_HTML5" style="width:100%;height:100%"';
					NewObjectTagDiv += ' src="" poster="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" preload="none" controls="controls"';
				NewObjectTagDiv += AZ_N+'></video>';

				NewObjectTagDiv += AZ_N+'<object class="AZ_VideoHTML5" id="lecteur_allocine_'+i+'_DivX" style="margin:auto;width:100%;height:100%;z-index:0" type="video/divx" data="">';
					NewObjectTagDiv += document.getElementById('lecteur_allocine_DivX').innerHTML.replace(/value="true"/g,'value="false"').replace(/lecteur_allocine/g,'lecteur_allocine_'+i).replace(/line-height:(\d+)px/,'line-height:163px');
				NewObjectTagDiv += AZ_N+'</object>';

				NewObjectTagDiv += '<div id="AZ_QuickPlayerChoice_'+i+'" class="AZ_QuickPlayerChoice'+VersionBlog+'"></div>';

				if (document.getElementById('blogvision_'+i).getElementsByTagName('a')[0])
					NewObjectTagDiv += '<div style="text-align:center"><a href="'+document.getElementById('blogvision_'+i).getElementsByTagName('a')[0].href+'">'+document.getElementById('blogvision_'+i).getElementsByTagName('a')[0].innerHTML+'</a></div>';

				if (VersionBlog == '')
				{
		            document.getElementById('blogvision_'+i).style.width = '520px';
		            document.getElementById('blogvision_'+i).style.height = '325px';
		            document.getElementById('blogvision_'+i).style.margin = 'auto';
		            document.getElementById('blogvision_'+i).style.clear = 'both';
					document.getElementById('blogvision_'+i).innerHTML = NewObjectTagDiv;
				}
				else
				{
		            document.getElementById('blogvision_'+i).getElementsByTagName('div')[0].style.width = '448px';
		            document.getElementById('blogvision_'+i).getElementsByTagName('div')[0].style.height = '280px';
		            document.getElementById('blogvision_'+i).getElementsByTagName('div')[0].style.margin = 'auto';
		            document.getElementById('blogvision_'+i).getElementsByTagName('div')[0].style.clear = 'both';
		            document.getElementById('blogvision_'+i).style.transform = 'none';
					document.getElementById('blogvision_'+i).getElementsByTagName('div')[0].innerHTML = NewObjectTagDiv;
				}
				AZ_ZapVideo(FindCmedia,'lecteur_allocine_'+i)

				document.getElementById('AZ_QuickPlayerChoice_'+i).appendChild(createElement('span',{id:"AZ_QuickPlayerBlog_"+i+"", title:""+AZ_LNG.player+" Blog", class:"AZ_Link"}, 'click AZ_QuickPlayerChoice false', 'Blog'));
				document.getElementById('AZ_QuickPlayerChoice_'+i).appendChild(createElement('span',{id:"AZ_QuickPlayerHD_"+i+"", title:""+AZ_LNG.player+" HD", class:"AZ_Link"}, 'click AZ_QuickPlayerChoice false', 'HD'));
				document.getElementById('AZ_QuickPlayerChoice_'+i).appendChild(createElement('span',{id:"AZ_QuickPlayerHTML5_"+i+"", title:""+AZ_LNG.player+" HD HTML 5", class:"AZ_Link"}, 'click AZ_QuickPlayerChoice false', 'HTML5'));
				document.getElementById('AZ_QuickPlayerChoice_'+i).appendChild(createElement('span',{id:"AZ_QuickPlayerDX_"+i+"", title:""+AZ_LNG.player+" HD DivX", class:"AZ_Link"}, 'click AZ_QuickPlayerChoice false', 'DivX'));
			}
		}
	}
	var BalisesFigure = document.getElementsByTagName('figure');
	var NbBalisesFigure = BalisesFigure.length;
	for (var f=0; f<NbBalisesFigure ; f++)
	{
		if (BalisesFigure[f] && BalisesFigure[f].id.match('player'))
		{
	        FindCmedia = '';

			RegexFindCmedia = /refMedia(.*?)(\d+)/;
			if (RegexFindCmedia.test(document.getElementById(BalisesFigure[f].id).innerHTML))
			{
				FindCmedia = RegexFindCmedia.exec(document.getElementById(BalisesFigure[f].id).innerHTML)[2];
			}
			if (FindCmedia != '')
			{
				CmediaGlobalMulti[f] = FindCmedia;

				NewObjectTagFigure = '<div id="lecteur_allocine_'+f+'_Title" class="lecteur_allocine_Title">&nbsp;</div>';

				NewObjectTagFigure += AZ_N+'<object id="lecteur_allocine_'+f+'" style="width:100%;height:100%;margin:auto;" type="application/x-shockwave-flash" data="">';
					NewObjectTagFigure += document.getElementById('lecteur_allocine').innerHTML.replace(/blog=false/g,'blog=true').replace(/autoPlay=true/g,'autoPlay=false').replace(/autoplay=true/g,'autoplay=false').replace('id="flashvars"','id="flashvars_'+f+'"');
				NewObjectTagFigure += '</object>';

				NewObjectTagFigure += AZ_N+'<video class="AZ_VideoHTML5" id="lecteur_allocine_'+f+'_HTML5" style="width:100%;height:100%"';
					NewObjectTagFigure += ' src="" poster="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" preload="none" controls="controls"';
				NewObjectTagFigure += AZ_N+'></video>';

				NewObjectTagFigure += AZ_N+'<object class="AZ_VideoHTML5" id="lecteur_allocine_'+f+'_DivX" style="margin:auto;width:100%;height:100%;z-index:0" type="video/divx" data="">';
					NewObjectTagFigure += document.getElementById('lecteur_allocine_DivX').innerHTML.replace(/value="true"/g,'value="false"').replace(/lecteur_allocine/g,'lecteur_allocine_'+f).replace(/line-height:(\d+)px/,'line-height:180px');
				NewObjectTagFigure += AZ_N+'</object>';

				NewObjectTagFigure += '<div id="AZ_QuickPlayerChoice_'+f+'" class="AZ_QuickPlayerChoice"></div>';

	            document.getElementById(BalisesFigure[f].id).style.width = '640px';
	            document.getElementById(BalisesFigure[f].id).style.height = '360px';
	            document.getElementById(BalisesFigure[f].id).style.margin = 'auto';
	            document.getElementById(BalisesFigure[f].id).style.clear = 'both';
				document.getElementById(BalisesFigure[f].id).innerHTML = NewObjectTagFigure;
				AZ_ZapVideo(FindCmedia,'lecteur_allocine_'+f)

				document.getElementById('AZ_QuickPlayerChoice_'+f).appendChild(createElement('span',{id:"AZ_QuickPlayerBlog_"+f+"", title:""+AZ_LNG.player+" Blog", class:"AZ_Link"}, 'click AZ_QuickPlayerChoice false', 'Blog'));
				document.getElementById('AZ_QuickPlayerChoice_'+f).appendChild(createElement('span',{id:"AZ_QuickPlayerHD_"+f+"", title:""+AZ_LNG.player+" HD", class:"AZ_Link"}, 'click AZ_QuickPlayerChoice false', 'HD'));
				document.getElementById('AZ_QuickPlayerChoice_'+f).appendChild(createElement('span',{id:"AZ_QuickPlayerHTML5_"+f+"", title:""+AZ_LNG.player+" HD HTML 5", class:"AZ_Link"}, 'click AZ_QuickPlayerChoice false', 'HTML5'));
				document.getElementById('AZ_QuickPlayerChoice_'+f).appendChild(createElement('span',{id:"AZ_QuickPlayerDX_"+f+"", title:""+AZ_LNG.player+" HD DivX", class:"AZ_Link"}, 'click AZ_QuickPlayerChoice false', 'DivX'));
			}
		}
	}
	var BalisesTagObject = document.getElementsByTagName('object');
	var NbBalisesTagObject = BalisesTagObject.length;
	for (var i=0; i<NbBalisesTagObject ; i++)
	{
		if (BalisesTagObject[i].data.match('blogvision'))
		{
			RegexFindIdFlashvars = /id="flashvars_([0-9]+)"/;
			if (!RegexFindIdFlashvars.test(BalisesTagObject[i].innerHTML))
			{
				BalisesTagObject[i].innerHTML += '<param name="flashvars" value="'+AZ_UrlVideoCplt+'&autoPlay=false" id="flashvars2_'+i+'" />';
			}
		}
	}

	Player_Format();

	AZ_cmedia = AZ_Cmedia(AZ_Url_Page)
	if (AZ_cmedia!='')
	{
		AZ_ZapVideo(AZ_cmedia);
		if (!AZ_Url_Page.match('/partner/'))
		{
			AZ_TitreVideo(AZ_Url_Page);
		}
		else
			AZ_TitreVideo('http://www.allocine.fr/video/player_gen_cmedia='+AZ_cmedia+'.html');

		document.getElementById('New_lecteur_Allocine').style.display = 'block';
	}

	if (AZ_Url_Page.match('fichefilm') || AZ_Url_Page.match('ficheserie_gen_cserie')) // Z MOD
	{
		var TitleAlloCine= document.getElementsByClassName('titlebar_01')[0].getElementsByTagName('span')[0].innerHTML;
		TitleAlloCine = TitleAlloCine.replace(/(?:^\s+|\s+$)/g, '').replace(/ \(TV\)$/g, '');

		if (AZ_Url_Page.match('vod-dvd')) { // Z MOD
		  TitleAlloCine = document.getElementsByClassName('titlebar_01')[0].getElementsByTagName('a')[0].innerHTML;
//          alert(TitleAlloCine);
		}
		var TitleAlloCineLink = encodeURIComponent(TitleAlloCine);
		TitleAlloCineLink = TitleAlloCineLink.replace(/%26amp%3B/g, '%26').replace(/%20/g, '+').replace(/%0A/g, '');

		if (getElementsByClassName('expendTable') != '')
		{
			if (document.getElementsByTagName('th')[0].innerHTML.match('Titre original'))
			{
				var TitreVO = document.getElementsByTagName('td')[0].innerHTML
				TitreVO = TitreVO.replace(/(?:^\s+|\s+$)/g, '').replace(/ \(TV\)$/g, '');
				var TitreVOLink = encodeURIComponent(TitreVO);
				TitreVOLink = TitreVOLink.replace(/%26amp%3B/g, '%26').replace(/%20/g, '+');
			}
		}
// Z MOD
var NewTitleAlloCine = '<div style="font-size:12px">';
NewTitleAlloCine += '<form id="search_bin" action="http://www.binnews.in/_bin/search2.php" method="post" name="search_bin">';
NewTitleAlloCine += '<input id="edSearchAll" name="edSearchAll" size="15" maxlength="255" value="'+TitleAlloCineLink+'" type="hidden">';
NewTitleAlloCine += '<input type="hidden" id="sections_ent[]" name="sections_ent[]" value="13">';
NewTitleAlloCine += '<input type="hidden" id="cats_ent[]" name="cats_ent[]" value="all">';
NewTitleAlloCine += '<input name="b_submit" value="ZSearch BinnewZ" type="submit">';
NewTitleAlloCine += '</form>';
NewTitleAlloCine += '</div>';

		document.getElementsByClassName('titlebar_01')[0].getElementsByTagName('span')[0].innerHTML = TitleAlloCine+NewTitleAlloCine;
		document.getElementsByClassName('titlebar_01')[0].getElementsByTagName('a')[0].innerHTML = TitleAlloCine+NewTitleAlloCine;
	}
	else if (AZ_Url_Page.match(/recherche(.*?)q=/))
	{
		var NewTitleSearch = encodeURIComponent(document.getElementById('q').value.replace(/(?:^\s+|\s+$)/g, ''));
			NewTitleSearch = NewTitleSearch.replace(/%26amp%3B/g, '%26').replace(/%20/g, '+');

		NewTitleSearchEnd = '<a href="http://www.cinemovies.fr/rechercher/?q='+NewTitleSearch+'" target="_blank">CineMovies</a>';
		NewTitleSearchEnd += ' - <a href="http://www.imdb.com/find?s=tt&q='+NewTitleSearch+'" target="_blank">IMDb</a>';

		if (document.getElementById('title'))
    	    document.getElementById('title').innerHTML += '<div class="titlebar"><h1>'+document.getElementById('q').value.replace(/(?:^\s+|\s+$)/g, '')+' : '+NewTitleSearchEnd+'</h1></div>';
		else
			document.getElementsByTagName('h1')[0].innerHTML += ' - '+NewTitleSearchEnd;
	}
}
function AZ_CleanV6Player(Elt)
{
	if (document.getElementById('V6_player').innerHTML.match(/iframe/)) document.getElementById('V6_player').innerHTML = '';
	else if (typeof Elt === "undefined") setTimeout(AZ_CleanV6Player, 1000);
	//alert('Clean');
}
setTimeout(AZ_Start, 500);


//****************************************************************
//		F O N C T I O N S
//****************************************************************
function Player_Format(evt)
{
	if (document.getElementById('AZ_select_video')) AZ_SelectOK = true;
	if (AZ_SelectOK) AZ_ValueSelect = document.getElementById('AZ_select_video').value;

	document.getElementById('AZ_div_bottom').appendChild(createElement('span',{id:"AZ_QuickPlayerChoice"}, '', ''));
	document.getElementById('AZ_div_bottom').appendChild(createElement('span',{id:"spanselectvid"} , '', ''));
	if (AZ_CmediasOptionsSelect != '')
	{
		document.getElementById('spanselectvid').appendChild(createElement('select',{id:"AZ_select_video", style:"font-size:10px;"}, 'change AZ_ZapVideoSelect false', AZ_CmediasOptionsSelect));
		if (AZ_SelectOK) document.getElementById('AZ_select_video').value = AZ_ValueSelect;
	}
	document.getElementById('AZ_div_bottom').appendChild(createElement('img',{title:"Synopsis", class:"AZ_MiniImg", style:"margin-top:2px", src:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAOCAYAAAA1+Nx+AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QjlBRUY2QjYwMDQyMTFFMzlCRTJFRTA5RjExMUIyNjkiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QjlBRUY2QjcwMDQyMTFFMzlCRTJFRTA5RjExMUIyNjkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpCOUFFRjZCNDAwNDIxMUUzOUJFMkVFMDlGMTExQjI2OSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpCOUFFRjZCNTAwNDIxMUUzOUJFMkVFMDlGMTExQjI2OSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PsZTlrwAAAOASURBVHjatFNdTJtVGH6+73z9WkpbytquVMCtCBvFdurWLMEhyjYzYHHSyDSaRc3QC73wWhOTXSzhmkRvTDRbQnQXupnMiy0m+2FmP7CyjX9ESgulQCkdtOvf9+/5ZkSzTKMXe8/FeXPynPM85znPYTRNw5MsFk+4uN7e3v8MZujICUUwRoKWBn95i7GmlRFReaks+d3twTDKTKZNrCiKCAQC/19Rg6fa/Ln34MeXze9M3MG72pSlR/u0bn/P47ChUAhcuP/cztWr43sVRVUtrsrSVz+dXRmNTyZt3qrEyFykWCwUNze8tqfZ3ce1n5MGF1/Ugi5wu10oXFvA8eXGLwzP8uLJ6Yv9UB6x6PT5H9KfsHtexve/9khqAidIE1jncxmjyREb8EzdSjxvPfXlvZ8HX2rwbzm58sKPD4bnms1vB2DwV0LNCGAdBuRms2XHF3d+zflY7sT0hVOQ/woOGZocK4x7pPOhI+2MEF54paQokPKSKb90v8qbsQSb5vn3Puzuru6wN4Y2Lkx0mI/5YfS7IE6sQbybAl/nAmMhyP62SprF6k6H17F0ZWP2LlTA5/OB6CyxuRjGKgpXu490amo43iarGliWQKIoSZJJaWg+mAvHA8RlQ/khL+SFB5DjWfBNW8BwLAy1dpCtRmQnU2RvyX3YXedaubw6M9z4J4Fe0UgUI9bcwNHXDytcOLlflKmZDKNHR78obQnUvAA1S1PEE5iC1bQXwG21QqOCxOk1KIkCSiWRDQpVnTa3eSP9tHmQ/P1BYpRk1JK7tqslsFw5kz+giIphk0SfNBZKOg+Dz0YVW8A77ZCiaWS/HadzhkLZh0CxVGKbJferrW8djJJHo6WT9I9cGbbWOyL72Np2IVfkH5L88REAmYEUyYD32CFvZJHtH4MmaGCopaA34QkLpqFi9OxTS59NOeWL5LFhpyG4vhaZMAVcQ63c9s7Cesasr2maDBO1SpIFCJEUxJE1MAo9kKXKVRVmm0nIv7G99/35Mx+cmboxVOFxF8i/farrizNRod5yY1/Vjh2Ki5817/bevqklbtXsemaOtRrjoliQUJTtUCVicluTfc7Rox/dPP1NMr0u6vv1FDFdXV3/SKBSVRp9UF/tNp7KVwwV5UpsZRk1DicgyGwutV7e0/HmtvpV9cAvqZl7feOXBnhqoYHjUCwW0dbWht8FGAC4c4FhrHzEjQAAAABJRU5ErkJggg"}, 'click AZ_ShowHide_Synopsis false', ''));
	document.getElementById('AZ_div_bottom').appendChild(createElement('hr',{id:"AZ_Synopsis_Hr", style:"display:none;clear:both;margin:5px 10px"}, '', ''));
	document.getElementById('AZ_div_bottom').appendChild(createElement('div',{id:"AZ_Synopsis"}, '', ''));

	document.getElementById('AZ_QuickPlayerChoice').appendChild(createElement('span',{id:"AZ_QuickPlayerBlog", title:""+AZ_LNG.player+" Blog", class:"AZ_Link"}, 'click AZ_QuickPlayerChoice false', 'Blog'));
	document.getElementById('AZ_QuickPlayerChoice').appendChild(createElement('span',{id:"AZ_QuickPlayerHD", title:""+AZ_LNG.player+" HD", class:"AZ_Link"}, 'click AZ_QuickPlayerChoice false', 'HD'));
	document.getElementById('AZ_QuickPlayerChoice').appendChild(createElement('span',{id:"AZ_QuickPlayerHTML5", title:""+AZ_LNG.player+" HD HTML 5", class:"AZ_Link"}, 'click AZ_QuickPlayerChoice false', 'H5'));
	document.getElementById('AZ_QuickPlayerChoice').appendChild(createElement('span',{id:"AZ_QuickPlayerDX", title:""+AZ_LNG.player+" HD DivX", class:"AZ_Link"}, 'click AZ_QuickPlayerChoice false', 'DX'));

	document.getElementById('AZ_div_top').innerHTML = Choice_options + player_no_pub_title;

	header_AZ = '<option'+(GM_getValue('AZ_header')=='fixed' ? ' selected="selected"':'')+' value="fixed">'+AZ_LNG.header_fixed+'</option>';
	header_AZ += '<option'+(GM_getValue('AZ_header')=='normal' ? ' selected="selected"':'')+' value="normal">'+AZ_LNG.header_normal+'</option>';
	document.getElementById('AZ_LinkHeader').appendChild(createElement('select',{id:"AZ_Header", style:"font-size:10px;width:70px;"}, 'change Header_Options false', header_AZ));

	Size_AZ = '<option'+(GM_getValue('AZ_width')==288 ? ' selected="selected"':'')+' value="288x180">288x180</option>';
	Size_AZ += '<option'+(GM_getValue('AZ_width')==320 ? ' selected="selected"':'')+' value="320x200">320x200</option>';
	Size_AZ += '<option'+(GM_getValue('AZ_width')==400 ? ' selected="selected"':'')+' value="400x250">400x250</option>';
	Size_AZ += '<option'+(GM_getValue('AZ_width')==480 ? ' selected="selected"':'')+' value="480x300">480x300</option>';
	Size_AZ += '<option'+(GM_getValue('AZ_width')==560 ? ' selected="selected"':'')+' value="560x350">560x350</option>';
	Size_AZ += '<option'+(GM_getValue('AZ_width')==640 ? ' selected="selected"':'')+' value="640x400">640x400</option>';
	Size_AZ += '<option'+(GM_getValue('AZ_width')==800 ? ' selected="selected"':'')+' value="800x500">800x500</option>';
	Size_AZ += '<option'+(GM_getValue('AZ_width')==960 ? ' selected="selected"':'')+' value="960x600">960x600</option>';
	//Size_AZ += '<option'+(GM_getValue('AZ_width')==1120 ? ' selected="selected"':'')+' value="1120x700">1120x700</option>';
	//Size_AZ += '<option'+(GM_getValue('AZ_width')==1280 ? ' selected="selected"':'')+' value="1280x800">1280x800</option>';
	//Size_AZ += '<option'+(GM_getValue('AZ_width')==1440 ? ' selected="selected"':'')+' value="1440x900">1440x900</option>';
	//Size_AZ += '<option'+(GM_getValue('AZ_width')==1600 ? ' selected="selected"':'')+' value="1600x1000">1600x1000</option>';
	document.getElementById('AZ_size').appendChild(createElement('select',{id:"AZ_select_size", style:"font-size:10px;width:70px;"}, 'change Size_Option false', Size_AZ));

	ChoixLecteur_AZ = '<option value="true">Blog</option>';
	ChoixLecteur_AZ += '<option'+(GM_getValue('AZ_choix_lecteur')== 'false' ? ' selected="selected"':'')+' value="false">HD</option>';
	ChoixLecteur_AZ += '<option'+(GM_getValue('AZ_choix_lecteur')== 'html5' ? ' selected="selected"':'')+' value="html5">HTML5</option>';
	ChoixLecteur_AZ += '<option'+(GM_getValue('AZ_choix_lecteur')== 'divx' ? ' selected="selected"':'')+' value="divx">DivX</option>';
	document.getElementById('AZ_choix_lecteur').appendChild(createElement('select',{id:"AZ_select_choix_lecteur", style:"font-size:10px;width:70px;"}, 'change ChoixLecteur_Option false', ChoixLecteur_AZ));

	posOri_AZ = '<option'+(GM_getValue('AZ_posOri') ? ' selected="selected"':'')+' value="true">'+AZ_LNG.OptOriginal+'</option>';
	posOri_AZ += '<option'+(!GM_getValue('AZ_posOri') ? ' selected="selected"':'')+' value="false">'+AZ_LNG.OptFloat+'</option>';
	document.getElementById('AZ_LinkPosOri').appendChild(createElement('select',{id:"AZ_posOri", style:"font-size:10px;width:70px;"}, 'change PosOri_Options false', posOri_AZ));

	border_AZ = '';
	for (var i_border=0; i_border<=12; i_border+=2)
		border_AZ += '<option'+(GM_getValue('AZ_border')==i_border+'px' ? ' selected="selected"':'')+' value="'+i_border+'px">'+i_border+'px</option>';
	document.getElementById('AZ_LinkBorder').appendChild(createElement('select',{id:"AZ_border", style:"font-size:10px;width:70px;"}, 'change Border_Options false', border_AZ));

	autoplay_AZ = '<option'+(GM_getValue('AZ_autoplay') ? ' selected="selected"':'')+' value="On">'+AZ_LNG.on+'</option>';
	autoplay_AZ += '<option'+(!GM_getValue('AZ_autoplay') ? ' selected="selected"':'')+' value="Off">'+AZ_LNG.off+'</option>';
	document.getElementById('AZ_LinkAutoplay').appendChild(createElement('select',{id:"AZ_autoplay", style:"font-size:10px;width:70px;"}, 'change Autoplay_Options false', autoplay_AZ));

	zap_AZ = '<option'+(GM_getValue('AZ_zap') ? ' selected="selected"':'')+' value="On">'+AZ_LNG.on+'</option>';
	zap_AZ += '<option'+(!GM_getValue('AZ_zap') ? ' selected="selected"':'')+' value="Off">'+AZ_LNG.off+'</option>';
	document.getElementById('AZ_LinkZap').appendChild(createElement('select',{id:"AZ_zap", style:"font-size:10px;width:70px;"}, 'change Zap_Options false', zap_AZ));

	document.getElementById('AZ_LinkColor').appendChild(createElement('input',{id:"AZ_Color", value:""+AZ_LNG.OptColor+"", type:"button", class:"AZ_buttonOpt"}, 'click Colors_Options false'));
	document.getElementById('AZ_LinkBgColor').appendChild(createElement('input',{id:"AZ_BgColor", value:""+AZ_LNG.OptBgcolor+"", type:"button", class:"AZ_buttonOpt"}, 'click Colors_Options false'));

	document.getElementById('AZ_zap_See').src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAOCAYAAAAWo42rAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QjM4NTg4NEQwMDE4MTFFM0E0NEZDMTYxQ0VEN0ExQzciIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QjM4NTg4NEUwMDE4MTFFM0E0NEZDMTYxQ0VEN0ExQzciPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpCMzg1ODg0QjAwMTgxMUUzQTQ0RkMxNjFDRUQ3QTFDNyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpCMzg1ODg0QzAwMTgxMUUzQTQ0RkMxNjFDRUQ3QTFDNyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pm8VNtsAAAFVSURBVHjaZJA/SAJhGMZ/n15lQi0ZaRAW/UUDOwhcggKDiBoaC5qaWqLJsaaipUlot6EgZ4mgEGmoWSGoKSRsyKK4CuLuPLs7z/Lw+fh44Xt+PO/7vYKGethgkj0ENXlQZqBvgMJFIVkqlE4tW/oDO+hihBDtEJ2OEh+L83b/FjRB3KDAwG9WH+iSjmqoGIZRbdieJtCGrES8Lqcl0WrvBsU/6E5sd67khtyghk6bA5mvwiPQNE3/bz3MLqPM0k2/neZIN5nITGQrEAqsvJRf7jxUOGOKGEtM2J+p1UFVVUksJsY3tzfndUW/8qDwwAlrvDqItRDDGtE8QpDaTyWLt8VsfcYnLslwwLc9qw37O/3ks/nzXCZ3iLOIuspc08kcvYTloEy1Un1O76SXtR/tixb5GBLrorJ6vFoLx8ILzZbXBep8SJ/Su1JWHks3paNm61eAAQC2s2igggWONgAAAABJRU5ErkJggg';
	document.getElementById('AZ_zap_noSee').src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAOCAYAAAAWo42rAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NzQ1M0MwQjkwMDE5MTFFM0I0MDhEMjc1NjI5QzBDNDUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NzQ1M0MwQkEwMDE5MTFFM0I0MDhEMjc1NjI5QzBDNDUiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo3NDUzQzBCNzAwMTkxMUUzQjQwOEQyNzU2MjlDMEM0NSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo3NDUzQzBCODAwMTkxMUUzQjQwOEQyNzU2MjlDMEM0NSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Ppmv1b0AAAFOSURBVHjaYmZAA34yMnW8P35oPfv79wwDLqAhJmayNyLiRw8Ly1t+BgZlZDkmGIOLhYW3JSRkkQg3N7vGv39CGQwMC4HCrBgKywMDJ5mqqWn++vWLgRnI92FgsA5jYGhGUehjYhKb6O2d8O37d7AiViguBurXZ2DwBCs0UFGx6i4pmcPMysrw/98/BkagIDPUFHEg7mBgWAqk1ZidFBWL3z17xvLqyZOfChISQn9evWL4efkyA8v//wz7GRge3QTinwwMAnBfeejoJDzo6/t/Pjb2/wEmpv/HGRj+WzAwVEKlWVhgCtnY2Bj/A035D2T/gYoB3ckIZf5hQQoqxn9A4i8Q/4Iq/ockCVf4HyoBUvATSQyrwv9IJv6FYgyFTEDAyMYGdAwLwxcg/zfEBiYMhc9evXq778CBl2+fPGF4CvQU0BeMXxkYPsPkAQIMAADUbD0YXJOVAAAAAElFTkSuQmCC';

	document.getElementById('AZ_AllDivColors').appendChild(createElement('div',{id:"AZ_DivBgColor", style:"display:none;"}, '', AZ_WebColors));
	document.getElementById('AZ_AllDivColors').appendChild(createElement('div',{id:"AZ_DivColor", style:"display:none;"}, '', AZ_WebColors.replace(AZ_LNG.OptBgcolor,AZ_LNG.OptColor).replace(/TDBg_/g,'TD_')));
	for (var AZ_red=0; AZ_red<AZ_WebColorsCount; AZ_red++)
	{
		for (AZ_green=0; AZ_green<AZ_WebColorsCount; AZ_green++)
		{
			for (var AZ_blue=0; AZ_blue<AZ_WebColorsCount; AZ_blue++)
			{
				var AZ_colorvalue =  AZ_WebColorsHexaColor[AZ_red] + AZ_WebColorsHexaColor[AZ_red] + AZ_WebColorsHexaColor[AZ_green] + AZ_WebColorsHexaColor[AZ_green] + AZ_WebColorsHexaColor[AZ_blue] + AZ_WebColorsHexaColor[AZ_blue];
				var AZ_color = '#' + AZ_colorvalue;
				document.getElementById('TDBg_'+AZ_colorvalue).appendChild(createElement('button',{id:"BgColorSelected_"+AZ_colorvalue+"", value:""+AZ_color+"", title:""+AZ_color+"", style:"color:"+(AZ_green<3 ? "#FFF":"#000")+";background-color:"+AZ_color+""}, 'click ChoiceColors false', ''));
				document.getElementById('TD_'+AZ_colorvalue).appendChild(createElement('button',{id:"ColorSelected_"+AZ_colorvalue+"", value:""+AZ_color+"", title:""+AZ_color+"", style:"color:"+(AZ_green<3 ? "#FFF":"#000")+";background-color:"+AZ_color+""}, 'click ChoiceColors false', ''));
			}
		}
	}
	for (var AZ_icolor=0; AZ_icolor<AZ_ColorSup.length; AZ_icolor++)
	{
		document.getElementById('TDBg_'+AZ_ColorSup[AZ_icolor].substr(1)).appendChild(createElement('button',{id:"BgColorSelected_"+AZ_ColorSup[AZ_icolor].substr(1)+"", value:""+AZ_ColorSup[AZ_icolor]+"", title:""+AZ_ColorSup[AZ_icolor]+"", style:"color:"+(AZ_icolor<5 ? "#000":"#FFF")+";background-color:"+AZ_ColorSup[AZ_icolor]+""}, 'click ChoiceColors false', ''));
		document.getElementById('TD_'+AZ_ColorSup[AZ_icolor].substr(1)).appendChild(createElement('button',{id:"ColorSelected_"+AZ_ColorSup[AZ_icolor].substr(1)+"", value:""+AZ_ColorSup[AZ_icolor]+"", title:""+AZ_ColorSup[AZ_icolor]+"", style:"color:"+(AZ_icolor<5 ? "#000":"#FFF")+";background-color:"+AZ_ColorSup[AZ_icolor]+""}, 'click ChoiceColors false', ''));
	}

	if (document.getElementById('ColorSelected_'+zapColor.substr(1)))
		document.getElementById('ColorSelected_'+zapColor.substr(1)).innerHTML = '&curren;';
	if (document.getElementById('BgColorSelected_'+zapBgColor.substr(1)))
		document.getElementById('BgColorSelected_'+zapBgColor.substr(1)).innerHTML = '&curren;';
	document.getElementById('AZ_AllDivColors').appendChild(createElement('input',{id:"AZ_LoadColors", class:"AZ_button", type:"button", value:"OK"}, 'click LoadColors false', ''));
	document.getElementById('AZ_AllDivColors').appendChild(createElement('input',{id:"AZ_defaultColors", class:"AZ_button", type:"button", value:""+AZ_LNG.bydefault+""}, 'click LoadColors false', ''));
	document.getElementById('AZ_AllDivColors').appendChild(createElement('input',{id:"AZ_CancelColors", class:"AZ_button", type:"button", value:"X"}, 'click LoadColors false', ''));
	document.getElementById('AZ_AllDivColors').appendChild(createElement('hr',{style:"margin:5px 10px;"}, '', ''));
}

/////----------------------------------------------------------------------------------------/////
/////----------------------------------------------------------------------------------------/////
function Header_Options(evt)
{
	GM_setValue('AZ_header', this.options[this.selectedIndex].value);
	document.location.reload(false);
}

/////----------------------------------------------------------------------------------------/////
/////----------------------------------------------------------------------------------------/////
function Size_Option(evt)
{
	Width_AZ = parseInt(this.options[this.selectedIndex].value.split('x')[0]);
	Height_AZ = parseInt(this.options[this.selectedIndex].value.split('x')[1]);
	document.getElementById('AZ_options').style.width	= Width_AZ+'px';
	document.getElementById('AZ_Synopsis').style.width	= (Width_AZ-10)+'px';

	document.getElementById('lecteur_allocine').style.width					= Width_AZ+'px';
	if (document.getElementById('lecteur_allocine').style.height != '0px')
		document.getElementById('lecteur_allocine').style.height			= Height_AZ+'px';

	document.getElementById('lecteur_allocine_HTML5').style.width			= Width_AZ+'px';
	if (document.getElementById('lecteur_allocine_HTML5').style.height != '0px')
		document.getElementById('lecteur_allocine_HTML5').style.height		= Height_AZ+'px';

	document.getElementById('lecteur_allocine_DivX').style.width			= Width_AZ+'px';
	if (document.getElementById('lecteur_allocine_DivX').style.height != '0px')
		document.getElementById('lecteur_allocine_DivX').style.height		= Height_AZ+'px';

	GM_setValue('AZ_width', Width_AZ);
	GM_setValue('AZ_height', Height_AZ);
	document.getElementById('AZ_zap_See').setAttribute('onclick',"document.getElementById('AZ_Zap_Hr').style.display='none';  document.getElementById('lecteur_allocine').style.height='"+Height_AZ+"px'; document.getElementById('lecteur_allocine_HTML5').style.height='"+Height_AZ+"px'; document.getElementById('lecteur_allocine_DivX').style.height='"+Height_AZ+"px'; document.getElementById('AZ_zap_noSee').style.display='block'; this.style.display='none'");
	AZ_BuildOptionsSelect(Width_AZ);

	if (document.getElementById('AZ_LinkUrlVideo'))
		AZ_TitreVideo(document.getElementById('AZ_LinkUrlVideo').href);
	else
		AZ_TitreVideo(window.location.href);
}

/////----------------------------------------------------------------------------------------/////
/////----------------------------------------------------------------------------------------/////
function ChoixLecteur_Option(evt)
{
	GM_setValue('AZ_choix_lecteur', this.options[this.selectedIndex].value);
	if (typeof CmediaGlobal === "undefined")	document.location.reload(false);
	else										AZ_ZapVideo(CmediaGlobal);
	//document.location.reload(false);
}

/////----------------------------------------------------------------------------------------/////
/////----------------------------------------------------------------------------------------/////
function Border_Options(evt)
{
	GM_setValue('AZ_border', this.options[this.selectedIndex].value);
	document.location.reload(false);
}

/////----------------------------------------------------------------------------------------/////
/////----------------------------------------------------------------------------------------/////
function PosOri_Options(evt)
{
	if (evt == 'EnCours')
	{
		posOriEnCours = true;
		document.getElementById('AZ_select_size').disabled = 'disabled';
		document.getElementById('AZ_select_size').getElementsByTagName('option')[4].selected = 'selected';
		document.getElementById('New_lecteur_Allocine').removeEventListener('mousedown', dragHandler, false);
		document.getElementById('New_lecteur_Allocine').style.position = 'static';
		document.getElementById('New_lecteur_Allocine').style.cursor = 'default';
		document.getElementById('New_lecteur_Allocine').style.width = '560px';
		document.getElementById('AZ_options').style.width = '560px';
		document.getElementById('AZ_zap_noSee').style.display = 'none';
		document.getElementById('AZ_container').style.zIndex = 1000;
		document.getElementById('AZ_container').style.width = '560px';
		document.getElementById('lecteur_allocine').style.width = '560px';
		document.getElementById('lecteur_allocine').style.height = '350px';
		document.getElementById('lecteur_allocine_DivX').style.width = '560px';
		document.getElementById('lecteur_allocine_DivX').style.height = '350px';
		document.getElementById('lecteur_allocine_HTML5').style.width = '560px';
		document.getElementById('lecteur_allocine_HTML5').style.height = '350px';
		document.getElementById('AZ_Synopsis').style.width = '545px';
		if (document.getElementById('AZ_select_video'))
		{
			var SelectOptionTmp = document.getElementById('AZ_select_video').selectedIndex;
			AZ_BuildOptionsSelect(560);
			document.getElementById('AZ_select_video').options[SelectOptionTmp].selected = 'selected';
		}
	}
	else
	{
		if (this.options[this.selectedIndex].value == 'true')
			GM_setValue('AZ_posOri', true);
		else
			GM_setValue('AZ_posOri', false);

		document.location.reload(false);
	}
}

/////----------------------------------------------------------------------------------------/////
/////----------------------------------------------------------------------------------------/////
function Autoplay_Options(evt)
{
	if (this.options[this.selectedIndex].value == 'On')
		GM_setValue('AZ_autoplay', true);
	else
		GM_setValue('AZ_autoplay', false);

	document.location.reload(false);

}

/////----------------------------------------------------------------------------------------/////
/////----------------------------------------------------------------------------------------/////
function Zap_Options(evt)
{
	if (this.options[this.selectedIndex].value == 'On')
	{
		GM_setValue('AZ_zap', true);
		ZapDisplay = 'block';
	}
	else
	{
		GM_setValue('AZ_zap', false);
		ZapDisplay = 'none';
	}
	for (var i=0; i<getElementsByClassName('AZ_Zap').length; i++)
		document.getElementsByClassName('AZ_Zap')[i].style.display = ZapDisplay;
}

/////----------------------------------------------------------------------------------------/////
/////----------------------------------------------------------------------------------------/////
function Colors_Options(evt)
{
	var IdDiv = this.id.replace('AZ_','');
	if (IdDiv == 'BgColor' )	document.getElementById('AZ_DivColor').style.display = 'none';
	else if (IdDiv == 'Color' )	document.getElementById('AZ_DivBgColor').style.display = 'none';
	if (document.getElementById('AZ_Div'+IdDiv).style.display == 'none')
	{
		document.getElementById('AZ_AllDivColors').style.display = 'block';
		document.getElementById('AZ_Div'+IdDiv).style.display = 'block';
		document.getElementById('AZ_options').style.minWidth = '440px';
	}
	else
	{
		document.getElementById('AZ_AllDivColors').style.display = 'none';
		document.getElementById('AZ_Div'+IdDiv).style.display = 'none';
		document.getElementById('AZ_options').style.minWidth = '0px';
	}
}

/////----------------------------------------------------------------------------------------/////
/////----------------------------------------------------------------------------------------/////
function ChoiceColors(evt)
{
	if (this.id.match('BgColorSelected'))
	{
		if (document.getElementById('BgColorSelected_'+BgColorSelected))
			document.getElementById('BgColorSelected_'+BgColorSelected).innerHTML = '';
		document.getElementById('AZ_container').style.setProperty('background-color',this.value, 'important');
		BgColorSelected = this.id.substr(16);
		document.getElementById(this.id).innerHTML = '&curren;';
	}
	else
	{
		if (document.getElementById('ColorSelected_'+ColorSelected))
			document.getElementById('ColorSelected_'+ColorSelected).innerHTML = '';
		ColorSelected = this.id.substr(14);
		document.getElementById('AZ_container').style.color=this.value;
		document.getElementById(this.id).innerHTML = '&curren;';
	}
}

/////----------------------------------------------------------------------------------------/////
/////----------------------------------------------------------------------------------------/////
function LoadColors(evt)
{
	ReloaD = true;
 	if (this.id == 'AZ_LoadColors' || this.id == 'AZ_CancelColors')
	{
		AZ_NewColor = zapColor;
		AZ_NewBgColor = zapBgColor;
		if (this.id == 'AZ_LoadColors')
		{
			if (document.getElementById('AZ_container').style.color!='')
				AZ_NewColor = RGBToHex(document.getElementById('AZ_container').style.color);
			if (document.getElementById('AZ_container').style.backgroundColor!='')
				AZ_NewBgColor = RGBToHex(document.getElementById('AZ_container').style.backgroundColor);
		}
		else ReloaD = false;
	}
	else
	{
		var AZ_NewColor = '#000000';
		var AZ_NewBgColor = '#FFD515';
	}

	if (document.getElementById('ColorSelected_'+ColorSelected))
		document.getElementById('ColorSelected_'+ColorSelected).innerHTML = '';
	if (document.getElementById('ColorSelected_'+AZ_NewColor.substr(1)))
		document.getElementById('ColorSelected_'+AZ_NewColor.substr(1)).innerHTML = '&curren;';
	if (document.getElementById('BgColorSelected_'+BgColorSelected))
		document.getElementById('BgColorSelected_'+BgColorSelected).innerHTML = '';
	if (document.getElementById('BgColorSelected_'+AZ_NewBgColor.substr(1)))
		document.getElementById('BgColorSelected_'+AZ_NewBgColor.substr(1)).innerHTML = '&curren;';

	ColorSelected = AZ_NewColor.substr(1);
	BgColorSelected = AZ_NewBgColor.substr(1);

	document.getElementById('AZ_container').style.color = AZ_NewColor;
	document.getElementById('AZ_container').style.backgroundColor = AZ_NewBgColor;
	GM_setValue('AZ_Color', AZ_NewColor);
	GM_setValue('AZ_BgColor', AZ_NewBgColor);

	document.getElementById('AZ_AllDivColors').style.display = 'none';
	document.getElementById('AZ_DivBgColor').style.display = 'none';
	document.getElementById('AZ_DivColor').style.display = 'none';
	document.getElementById('AZ_options').style.minWidth = '0px'

	if (ReloaD)
		if (confirm(AZ_LNG.options_reload))
			window.location.reload(false);
}

/////----------------------------------------------------------------------------------------/////
/////----------------------------------------------------------------------------------------/////
function RGBToHex(ColorString)
{
	HexDigits = "0123456789ABCDEF";
	if (ColorString.charAt(0) == '#')	return ColorString;
	else
	{
		ColorString = ColorString.substr(4);
		pos = ColorString.indexOf(',');
		Result = '#' + HexDigits.substr(Math.floor(ColorString.substr(0, pos) / 16), 1) + HexDigits.substr(ColorString.substr(0, pos) % 16, 1);
		ColorString = ColorString.substr(pos + 1);
		pos = ColorString.indexOf(',');
		Result = Result + HexDigits.substr(Math.floor(ColorString.substr(0, pos) / 16), 1) + HexDigits.substr(ColorString.substr(0, pos) % 16, 1);
		ColorString = ColorString.substr(pos + 1);
		pos = ColorString.length - 1;
		Result = Result + HexDigits.substr(Math.floor(ColorString.substr(0, pos) / 16), 1) + HexDigits.substr(ColorString.substr(0, pos) % 16, 1);
		return Result;
	}
}

/////----------------------------------------------------------------------------------------/////
/////----------------------------------------------------------------------------------------/////
function AZ_reset_pos(evt)
{
	GM_setValue('AZ_Top', AZ_TLBR);
	GM_setValue('AZ_Left', AZ_TLBR);
	GM_setValue('AZ_width', 480);
	GM_setValue('AZ_height', 300);
	GM_setValue('AZ_posOri', false);
	document.location.reload(false);
}

/////----------------------------------------------------------------------------------------/////
/////----------------------------------------------------------------------------------------/////
function AZ_Login(evt)
{
	if (document.getElementById('connect_member'))
		var AZ_ConnectMember = document.getElementById('connect_member');
	else if (document.getElementById('connectbar'))
		var AZ_ConnectMember = document.getElementById('connectbar');

	if (!GM_getValue('AZ_MonAlloCine'))
	{
		GM_setValue('AZ_MonAlloCine', true);
		AZ_ConnectMember.style.display = 'block';
	}
	else
	{
//		try {GM_deleteValue('AZ_MonAlloCine');} catch(Err){GM_setValue('AZ_MonAlloCine', false);};
		GM_setValue('AZ_MonAlloCine', false);
		AZ_ConnectMember.style.display = 'none';
	}
}

/////----------------------------------------------------------------------------------------/////
/////----------------------------------------------------------------------------------------/////
function AZ_Footer(evt)
{
	if (document.getElementById('footer').style.display == 'block')
	{
		document.getElementById('footer').style.display = 'none';
		document.location.href = document.location.href.split('#')[0]+'#';
	}
	else
	{
		document.getElementById('footer').style.display = 'block';
		// setTimeout pour Opera qui refuse le direct ds ce cas
		setTimeout("document.location.href = document.location.href.split('#')[0]+'#footer'", 50);
	}
}

/////----------------------------------------------------------------------------------------/////
/////----------------------------------------------------------------------------------------/////
function AZ_options_only(evt)
{
	if(document.getElementById('New_lecteur_Allocine'))
	{
		document.getElementById('New_lecteur_Allocine').style.display = 'block';
		document.getElementById('AZ_options').style.display = 'block';
		document.getElementById('AZ_div_title').style.display = 'none';
		document.getElementById('AZ_div_bottom').style.display = 'none';
		document.getElementById('lecteur_allocine').style.display = 'none';
		document.getElementById('lecteur_allocine_HTML5').style.display = 'none';
		document.getElementById('lecteur_allocine_DivX').style.display = 'none';
	}
}

/////----------------------------------------------------------------------------------------/////
/////----------------------------------------------------------------------------------------/////
function Zap_Choice(ThisElt)
{
	if(document.getElementById('New_lecteur_Allocine'))
		document.getElementById('New_lecteur_Allocine').style.display = 'block';
	if(document.getElementById('AZ_Zap_Hr'))
		document.getElementById('AZ_Zap_Hr').style.display='none';
	if(document.getElementById('lecteur_allocine') && document.getElementById('lecteur_allocine').style.height == '0px')
	{
		document.getElementById('lecteur_allocine').style.height = ''+GM_getValue('AZ_height')+'px';
		document.getElementById('AZ_zap_See').style.display = 'none';
		document.getElementById('AZ_zap_noSee').style.display = 'block';
	}
	if(document.getElementById('lecteur_allocine_HTML5') && document.getElementById('lecteur_allocine_HTML5').style.height == '0px')
	{
		document.getElementById('lecteur_allocine_HTML5').style.height = ''+GM_getValue('AZ_height')+'px';
		document.getElementById('AZ_zap_See').style.display = 'none';
		document.getElementById('AZ_zap_noSee').style.display = 'block';
	}
	if(document.getElementById('lecteur_allocine_DivX') && document.getElementById('lecteur_allocine_DivX').style.height == '0px')
	{
		document.getElementById('lecteur_allocine_DivX').style.height = ''+GM_getValue('AZ_height')+'px';
		document.getElementById('AZ_zap_See').style.display = 'none';
		document.getElementById('AZ_zap_noSee').style.display = 'block';
	}
	//AZ_TitreVideo(ThisElt.parentNode.getElementsByTagName('a')[0].href);
	AZ_TitreVideo(ThisElt.title);

	if (document.getElementById('OldZap'))
	{
		document.getElementById('OldZap').style.backgroundColor = BgcBeforeOldZap;
		if (IdBeforeOldZap == '')
			document.getElementById('OldZap').removeAttribute('id');
		else
			document.getElementById('OldZap').setAttribute('id',IdBeforeOldZap);

	}
	IdBeforeOldZap = ThisElt.parentNode.parentNode.id;
	BgcBeforeOldZap = ThisElt.parentNode.parentNode.style.backgroundColor;
	ThisElt.parentNode.parentNode.id='OldZap';
	ThisElt.parentNode.parentNode.style.backgroundColor = zapBgColor;
}

/////----------------------------------------------------------------------------------------/////
/////----------------------------------------------------------------------------------------/////
function AZ_TransformClicCommand(url,nb)
{
	AZ_ZapIdTmp = '';
	GM_xmlhttpRequest({
		method: 'GET',
		url: url,
		onload: function(responseDetails)
		{
			try
			{
				AZ_Test_FinalUrl = responseDetails.finalUrl;
				BaliseAtmp = document.getElementsByTagName('a')[nb];
				BaliseAtmp.href = AZ_Test_FinalUrl;
				AZ_ZapIdTmp = AZ_Cmedia(AZ_Test_FinalUrl);
				if (AZ_ZapIdTmp != '')
				{
					AZ_ZapIdTmp += '_'+nb;
					BaliseAtmp.parentNode.appendChild(createElement('input',{type:"button", id:""+AZ_ZapIdTmp+"", value:"AZap", title:""+AZ_Test_FinalUrl+"", class:"AZ_Zap"}, 'click AZ_ZapVideoSpan false'));
					if (BaliseAtmp.className=='btn')
					{
						document.getElementById(AZ_ZapIdTmp).style.position = 'absolute';
						document.getElementById(AZ_ZapIdTmp).style.bottom = '45px';
						document.getElementById(AZ_ZapIdTmp).style.right = '20px';
					}
				}
			}
			catch(Err) {}
		}
	});
}

/////----------------------------------------------------------------------------------------/////
/////----------------------------------------------------------------------------------------/////
function AZ_Cmedia(url)
{
	if (url.match('player_gen_cmedia'))
	{
		RegexFindCmedia = /(.*?)player_gen_cmedia=(\d+)(.*?)/;
		AZ_cmedia = RegexFindCmedia.exec(url)[2];
	}
	else if (url.match(/(video(s)?|trailer|fragman)(-|\/)(\d+)/))
	{
		RegexFindCmedia = /(.*?)(video(s)?|trailer|fragman)(-|\/)(\d+)(.*?)/;
		AZ_cmedia = RegexFindCmedia.exec(url)[5];
		//alert(AZ_cmedia);
	}
	else if (url.match(/(\/partner\/)(.*?)(\d+)/))
	{
		RegexFindCmedia = /(.*?)(\/partner\/)(.*?)(\d+)(.*?)/;
		AZ_cmedia = RegexFindCmedia.exec(url)[4];
		AZ_FullScreen();
	}
	else
	{
		AZ_cmedia = gup('cmedia',url);
	}
	return AZ_cmedia;
}

/////----------------------------------------------------------------------------------------/////
/////----------------------------------------------------------------------------------------/////
function AZ_FullScreen(url)
{
	document.getElementsByTagName('body')[0].style.marginTop = 0;
	document.getElementById('V6_player').style.display = 'none';
	if (document.getElementById('logoPartner'))
	{
		document.getElementById('logoPartner').style.removeProperty('top');
		document.getElementById('logoPartner').style.bottom = '0px';
	}
	document.getElementById('New_lecteur_Allocine').style.position = 'static';
	document.getElementById('New_lecteur_Allocine').style.width = Math.floor(window.innerWidth)+'px';
	document.getElementById('New_lecteur_Allocine').style.height = Math.floor(window.innerHeight)+'px';
	document.getElementById('AZ_container').style.width = Math.floor(window.innerWidth)+'px';
	document.getElementById('AZ_container').style.height = Math.floor(window.innerHeight)+'px';
}

/////----------------------------------------------------------------------------------------/////
/////----------------------------------------------------------------------------------------/////
function AZ_BuildOptionsSelect(Largeur)
{
	AZ_CmediasOptionsSelect = '';
	AZ_SelectWidth = ((Largeur/10)*1.5)-15;
	for (i=0; i<AZ_OptNames.length ; i++)
	{
		if (AZ_OptNames[i]!= undefined)
		{
			AZ_OptName = AZ_OptNames[i];
			if (AZ_OptName.length > AZ_SelectWidth)
				AZ_OptName = AZ_OptName.substring(0,Math.round((AZ_SelectWidth-5)/2))+'[...]'+AZ_OptName.substring(AZ_OptName.length-Math.round((AZ_SelectWidth-5)/2),AZ_OptName.length);
			AZ_CmediasOptionsSelect += '<option title="'+AZ_OptNames[i].replace(/\n/g,'').replace(/"/g,'&quot;')+'" value="'+AZ_ZapId[i]+'">'+AZ_OptName+'</option>';
		}
	}
	if (document.getElementById('AZ_select_video')) document.getElementById('AZ_select_video').innerHTML = AZ_CmediasOptionsSelect;
}

/////----------------------------------------------------------------------------------------/////
/////----------------------------------------------------------------------------------------/////
function AZ_ZapVideoSelect(evt)
{
	AZ_IdCmedia = this.options[this.selectedIndex].value;
	AZ_ZapVideoSpan(document.getElementById(AZ_IdCmedia));
}

/////----------------------------------------------------------------------------------------/////
/////----------------------------------------------------------------------------------------/////
function AZ_ZapVideoSpan(ThisElt)
{
	if (typeof ThisElt.id == 'undefined') ThisElt = this;
	Zap_Choice(ThisElt);

	if (document.getElementById('lecteur_allocine'))
		AZ_ZapVideo(ThisElt.id);
	if (document.getElementById('AZ_select_video'))
		document.getElementById('AZ_select_video').value = ThisElt.id;
}

/////----------------------------------------------------------------------------------------/////
/////----------------------------------------------------------------------------------------/////
function AZ_ZapVideo(Allcmedia,idObject,player)
{
	AZ_ReplacePlayer = 'AcV4/AcPlayer_v4.4';
	//AZ_ReplacePlayer = 'AcV5/AcPlayer_v5.3';

	if (Allcmedia!='')
	{
		urlReferer = AZ_Url_Page;
		if (document.getElementById(Allcmedia)) urlReferer = document.getElementById(Allcmedia).title;
		if (typeof idObject === "undefined") idObject = 'lecteur_allocine'
		if (typeof player === "undefined")
		{
			CmediaGlobal = Allcmedia;
			AZ_CheckSynopsis(urlReferer);
			player = GM_getValue('AZ_choix_lecteur');
		}

		cmedia = Allcmedia.split('_')[0];
        var flashvarsObject = idObject.replace('lecteur_allocine','flashvars');

		AZ_blogvision_FinalUrl = AZ_Provider = AZ_FindCmedia = AZ_FindRef = AZ_FindTypeRef = AZ_FindSrcHTML5 = AZ_PlayerVisu = AZ_PlayerPoster = '';
		GM_xmlhttpRequest({
			method: 'GET',
			//url: 'http://'+window.location.host+'/blogvision/'+cmedia+'',
			url: 'http://'+window.location.host+'/_video/iblogvision.aspx?cmedia='+cmedia+'',
			onload: function(responseDetails)
			{
				try
				{
					//AZ_blogvision_FinalUrl = responseDetails.finalUrl;
					//alert(AZ_blogvision_FinalUrl);
					//alert(responseDetails.responseText);
					AZ_blogvision_FinalUrl = responseDetails.responseText.replace(/\n/g,'');
					AZ_PlayerVisu = AZ_PlayerTitle = AZ_blogvision_FinalUrl;
					if (AZ_blogvision_FinalUrl.match(/data-player='\{(.*?)\}'/))
						AZ_blogvision_FinalUrl = AZ_blogvision_FinalUrl.match(/data-player='\{(.*?)\}'/)[1];
					else
						AZ_blogvision_FinalUrl = AZ_blogvision_FinalUrl.match(/flashvars = \{(.*?)\}/)[1];

					AZ_blogvision_FinalUrl = AZ_blogvision_FinalUrl.replace(/"/g,'');

					if (AZ_blogvision_FinalUrl.match(/provider:(.*?),/))
						AZ_Provider = AZ_blogvision_FinalUrl.match(/provider:(.*?),/)[1];

					if (AZ_Provider == 'DailymotionVideo')
					{
						if (AZ_blogvision_FinalUrl.match(/embedUrl='\{(.*?)\}'/))
						{
//							AZ_blogvision_embedUrl = AZ_blogvision_FinalUrl.match(/embedUrl:(.*?),/)[1];
//							AZ_blogvision_embedUrl = AZ_AlloCineHex2Asc(AZ_blogvision_embedUrl);
//							alert(AZ_blogvision_embedUrl);
						}
						AZ_blogvision_FinalUrl = 'http://www.dailymotion.com/swf/video/'+AZ_blogvision_FinalUrl.match(/entityPartnerID:(.*?),/)[1]+'?autoplay='+(GM_getValue('AZ_autoplay')?1:0);
						document.getElementById(flashvarsObject).value = '';
					}
					else if (AZ_Provider == 'M6')
					{
						M6ID = AZ_blogvision_FinalUrl.match(/entityPartnerID:(.*?),/)[1];
						if (document.getElementById(flashvarsObject))
						{
							if (document.getElementById('V6_player')) AZ_CleanV6Player('M6');
							document.getElementById(flashvarsObject).value = 'AUTOPLAY='+GM_getValue('AZ_autoplay')+'&ID.VIDEO='+M6ID+'&VIDEO.LOCATION=http://www.m6.fr/v/'+M6ID+'&CONFIG.URL=config/config_allocine&ESTATDOM=allocine.fr&SHOW.CONTROL=true&THEME.COLOR='+zapBgColor.replace('#','0x')+'&BTNPLAY.COLOR='+zapColor.replace('#','0x')+'&FONT.COLOR='+zapColor.replace('#','0x')+'';
							AZ_blogvision_FinalUrl = 'http://player.cdn.m6web.fr/generique/PlayerGeneriqueM6.swf';
							setTimeout(function(){LoadFlvM6(M6ID,idObject,flashvarsObject)}, 500);
						}
					}
					else
					{
						if(AZ_blogvision_FinalUrl.match(/refMedia:(\d+),/))
							AZ_FindCmedia = AZ_blogvision_FinalUrl.match(/refMedia:(\d+),/)[1];
						else
							AZ_FindCmedia = AZ_blogvision_FinalUrl.match(/cmedia : '(\d+)',/)[1];

						if (AZ_blogvision_FinalUrl.match(/relatedEntityId:(\d+),/))
							AZ_FindRef = AZ_blogvision_FinalUrl.match(/relatedEntityId:(\d+),/)[1];
						else
							AZ_FindRef = AZ_blogvision_FinalUrl.match(/ref : '(\d+)',/)[1];

						if (AZ_blogvision_FinalUrl.match(/relatedEntityType:(.*?),/))
							AZ_FindTypeRef = AZ_blogvision_FinalUrl.match(/relatedEntityType:(.*?),/)[1];
						else
							AZ_FindTypeRef = AZ_blogvision_FinalUrl.match(/typeRef : '(.*?)',/)[1];

						if (AZ_FindRef == '') AZ_FindRef = AZ_FindCmedia;
						if (AZ_FindTypeRef == '') AZ_FindTypeRef = 'video';

						if (AZ_blogvision_FinalUrl.match(/html5PathHD:(.*?),/))
						{
							AZ_FindSrcHTML5 = AZ_blogvision_FinalUrl.match(/html5PathHD:(.*?),/)[1];
							AZ_FindSrcHTML5 = AZ_AlloCineHex2Asc(AZ_FindSrcHTML5);
						}
						else if (AZ_blogvision_FinalUrl.match(/html5PathM:(.*?),/))
						{
							AZ_FindSrcHTML5 = AZ_blogvision_FinalUrl.match(/html5PathM:(.*?),/)[1];
							AZ_FindSrcHTML5 = AZ_AlloCineHex2Asc(AZ_FindSrcHTML5);
						}
						else if (AZ_blogvision_FinalUrl.match(/html5PathL:(.*?),/))
						{
							AZ_FindSrcHTML5 = AZ_blogvision_FinalUrl.match(/html5PathL:(.*?),/)[1];
							AZ_FindSrcHTML5 = AZ_AlloCineHex2Asc(AZ_FindSrcHTML5);
						}
						if (AZ_blogvision_FinalUrl.match(/playerUrl:(.*?),/))
						{
//							AZ_FindPlayerUrl = AZ_blogvision_FinalUrl.match(/playerUrl:(.*?),/)[1];
//							AZ_FindPlayerUrl = AZ_AlloCineHex2Asc(AZ_FindPlayerUrl);
//							alert(AZ_FindPlayerUrl);
						}
						//alert(AZ_FindSrcHTML5);

						AZ_blogvision_FinalUrl = 'http://images.allocine.fr/commons/player/'+AZ_ReplacePlayer+'.swf?cmedia='+AZ_FindCmedia+'&ref='+AZ_FindRef+'&typeRef='+AZ_FindTypeRef;

						if (player == 'allocineHD')
							document.getElementById(flashvarsObject).value = AZ_UrlVideoCplt.replace(/blog=true/g,'blog=false');
						else if (player == 'allocineBlog' || player == 'true' || AZ_FindSrcHTML5 == '')
							document.getElementById(flashvarsObject).value = AZ_UrlVideoCplt.replace(/blog=false/g,'blog=true');
						if (flashvarsObject != 'flashvars')
							document.getElementById(flashvarsObject).value = document.getElementById(flashvarsObject).value.replace(/autoPlay=true/g,'autoPlay=false').replace(/autoplay=true/g,'autoplay=false');
					}
					if (player!='html5' && player!='divx') AZ_FindSrcHTML5 = '';

					document.getElementById('AZ_div_title').style.display = 'block';
					document.getElementById('AZ_div_bottom').style.display = 'block';

					document.getElementById(idObject).style.display = 'none';
					document.getElementById(idObject).data = '';

					document.getElementById(idObject+'_HTML5').style.display = 'none';
					document.getElementById(idObject+'_HTML5').src = '';

					document.getElementById(idObject+'_DivX').style.display = 'none';
					document.getElementById(idObject+'_DivX').data = '';
					document.getElementById(idObject+'_DivXSrc').value = '';

					// HTML 5
					if (AZ_FindSrcHTML5!='')
					{
						if(AZ_PlayerVisu.match(/class="poster"><img src='(.*?)'/))
						{
							AZ_PlayerPoster = AZ_PlayerVisu.match(/class="poster"><img src='(.*?)'/)[1];
							AZ_PlayerPoster = AZ_PlayerPoster.replace(/\/c_(\d+)_(\d+)\//,'/r_'+Math.round(GM_getValue('AZ_height')*2/3)+'_'+GM_getValue('AZ_height')+'/');
						}
						if(AZ_PlayerVisu.match(/id="player_visu" src='(.*?)'/))
						{
							AZ_PlayerVisu = AZ_PlayerVisu.match(/id="player_visu" src='(.*?)'/)[1];
						}
						//alert(AZ_PlayerVisu);

						AZ_PlayerTitle = AZ_PlayerTitle.match(/<title>(.*?)<\/title>/)[1].replace(/"/g,'');
						if (player == 'html5')
						{
							if(idObject == 'lecteur_allocine')
							{
								document.getElementById(idObject+'_AllPlayers').removeChild(document.getElementById(idObject+'_DivHTML5'))
								AZ_VidH5 = '<video class="AZ_VideoHTML5" id="'+idObject+'_HTML5" style="width:'+GM_getValue('AZ_width')+'px;height:'+0.625*GM_getValue('AZ_width')+'px;"';
									AZ_VidH5 += ' src="" poster="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"';
									AZ_VidH5 += (GM_getValue('AZ_autoplay')? ' autoplay="true"' : '')+' preload="none" controls="controls"';
								AZ_VidH5 += '></video>';
								base_AZ_VidH5 = createElement('div', {id:""+idObject+"_DivHTML5"},'',AZ_VidH5);
								document.getElementById(idObject+'_AllPlayers').appendChild(base_AZ_VidH5);
							}

							document.getElementById(idObject+'_HTML5').style.backgroundImage = 'url('+AZ_PlayerPoster+'), url('+AZ_PlayerVisu+')';
							//document.getElementById(idObject+'_HTML5').poster = AZ_PlayerPoster;
							document.getElementById(idObject+'_HTML5').src = AZ_FindSrcHTML5;
							document.getElementById(idObject+'_HTML5').style.display = 'block';
							if (document.getElementById(idObject+'_HTML5').volume == 1)
								document.getElementById(idObject+'_HTML5').volume = 0.4;
						}
						else if (player == 'divx')
						{
							document.getElementById(idObject+'_DivX').style.backgroundImage = 'url('+AZ_PlayerPoster+'), url('+AZ_PlayerVisu+')';
							if (idObject == 'lecteur_allocine' && AZ_PlayerPoster!= '')
								document.getElementById(idObject+'_PreviewDivX').value = AZ_PlayerPoster;
							else
								document.getElementById(idObject+'_PreviewDivX').value = AZ_PlayerVisu;

							document.getElementById(idObject+'_TitleDivX').value = AZ_PlayerTitle;
							document.getElementById(idObject+'_DivXSrc').value = AZ_FindSrcHTML5;
							document.getElementById(idObject+'_DivX').data = AZ_FindSrcHTML5;
							document.getElementById(idObject+'_DivX').style.display = 'block';
						}

						if (AZ_PlayerPoster == '' || AZ_PlayerVisu == '')
						{
							document.getElementById(idObject+'_HTML5').style.backgroundSize = 'auto 100%';
							document.getElementById(idObject+'_DivX').style.backgroundSize = 'auto 100%';
							document.getElementById(idObject+'_HTML5').style.backgroundPosition = 'center';
							document.getElementById(idObject+'_DivX').style.backgroundPosition = 'center';
						}

						if (document.getElementById(idObject+'_Title'))
							document.getElementById(idObject+'_Title').innerHTML = AZ_PlayerTitle;

						document.getElementById('AZ_DLhtml5').style.display = 'block';
						document.getElementById('AZ_DLhtml5').href = AZ_FindSrcHTML5;
					}
					else
					{
						document.getElementById('AZ_DLhtml5').style.display = 'none';
						document.getElementById('AZ_DLhtml5').href = '#';
						document.getElementById(idObject).style.display = 'none';
						document.getElementById(idObject).data = AZ_blogvision_FinalUrl;
						document.getElementById(idObject).style.display = 'block';
					}

					if (GM_getValue('AZ_posOri') && ( (idObject=='lecteur_allocine' && Allcmedia == cmedia) || posOriEnCours) && !AZ_Url_Page.match('/partner/'))
						PosOri_Options('EnCours');
				}
				catch(Err) {}
			},
			onerror: function(responseDetails)
			{
				alert('Error: '+url);
				//document.getElementById(idObject).style.display = 'none';
				//document.getElementById(idObject).data = 'http://'+window.location.host+'/blogvision/'+cmedia+'';
				//document.getElementById(idObject).style.display = 'block';
			}
		});
	}
}

/////----------------------------------------------------------------------------------------/////
/////----------------------------------------------------------------------------------------/////
function LoadFlvM6(M6ID,idObject,flashvarsObject)
{
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://player.m6web.fr/v1/player/allocine/'+M6ID+'.html',
		onload: function(responseDetails)
		{
			try
			{
				AZ_M6_FinalUrl = responseDetails.responseText.replace(/\n/g,'');
				AZ_M6_Poster = AZ_M6_FinalUrl;
				if (AZ_M6_FinalUrl.match(/"src":"(.*?)"/))
				{
					if(AZ_PlayerVisu.match(/id="player_visu" src='(.*?)'/))
					{
						AZ_PlayerVisu = AZ_PlayerVisu.match(/id="player_visu" src='(.*?)'/)[1];
					}
					if (AZ_M6_Poster.match(/"poster":"(.*?)"/))
					{
						AZ_M6_Poster = AZ_M6_Poster.match(/"poster":"(.*?)"/)[1];
						if (AZ_M6_Poster.match('http')) AZ_PlayerVisu = AZ_M6_Poster.replace(/\\\//g,'/');
					}
					AZ_M6_FinalUrl = AZ_M6_FinalUrl.match(/"src":"(.*?)"/)[1];
					AZ_M6_FinalUrl = AZ_M6_FinalUrl.replace(/\\\//g,'/');
					document.getElementById(idObject).data = 'http://flv-player.net/medias/player_flv_maxi.swf';
					AZ_M6_FinalFlashVars = 'flv='+AZ_M6_FinalUrl+'&autoplay='+(GM_getValue('AZ_autoplay')? 1:0)+'&autoload=0&startimage='+AZ_PlayerVisu+'&margin=0';
					AZ_M6_FinalFlashVars += '&showstop=1&showvolume=1&showtime=1&showplayer=autohide&showfullscreen=1';
					AZ_M6_FinalFlashVars += '&playercolor='+zapColor.replace('#','')+'&buttoncolor='+zapBgColor.replace('#','');
					AZ_M6_FinalFlashVars += '&loadingcolor='+zapBgColor.replace('#','')+(zapColor=='#FFFFFF' ? '&buttonovercolor=000000&sliderovercolor=000000':'&buttonovercolor=FFFFFF&sliderovercolor=FFFFFF');
					AZ_M6_FinalFlashVars += '&showiconplay=1&iconplaybgcolor='+zapColor.replace('#','')+'&iconplaycolor='+zapBgColor.replace('#','');

					document.getElementById(flashvarsObject).value = AZ_M6_FinalFlashVars;
				}
			}
			catch(Err) {}
		}
	});
}

/////----------------------------------------------------------------------------------------/////
/////----------------------------------------------------------------------------------------/////
function AZ_AlloCineHex2Asc(AZ_HexAlloCine)
{
	AZ_HexAlloCine2Hex = AZ_HexAlloCineDecrypt = '';
	AZ_AlloCode = {'0':'0', 'A':'1', '1':'2', '2':'3', 'B':'4', '3':'5', '4':'6', 'C':'7', '5':'8', '6':'9', 'D':'A', '7':'B', '8':'C', 'E':'D', '9':'E', 'F':'F'};

	for (var i = 0; i < AZ_HexAlloCine.length; i++)
		AZ_HexAlloCine2Hex += AZ_AlloCode[AZ_HexAlloCine.substr(i, 1)];
	for (var i = 0; i < AZ_HexAlloCine2Hex.length; i += 2)
		AZ_HexAlloCineDecrypt += String.fromCharCode(parseInt(AZ_HexAlloCine2Hex.substr(i, 2), 16));

	return AZ_HexAlloCineDecrypt;
}

/////----------------------------------------------------------------------------------------/////
/////----------------------------------------------------------------------------------------/////
function AZ_QuickPlayerChoice(evt)
{
	IdEnCours = '';
	CmediaEnCours = CmediaGlobal;
	ThisId = this.id.split('_');

	if (typeof ThisId[2] != "undefined")
	{
		CmediaEnCours = CmediaGlobalMulti[ThisId[2]];
		IdEnCours = '_'+ThisId[2];
	}

	if (this.id == 'AZ_QuickPlayerBlog'+IdEnCours)
		AZ_ZapVideo(CmediaEnCours+IdEnCours,'lecteur_allocine'+IdEnCours,'allocineBlog');
	else if (this.id == 'AZ_QuickPlayerHD'+IdEnCours)
		AZ_ZapVideo(CmediaEnCours+IdEnCours,'lecteur_allocine'+IdEnCours,'allocineHD');
	else if (this.id == 'AZ_QuickPlayerDX'+IdEnCours)
		AZ_ZapVideo(CmediaEnCours+IdEnCours,'lecteur_allocine'+IdEnCours,'divx');
	else
		AZ_ZapVideo(CmediaEnCours+IdEnCours,'lecteur_allocine'+IdEnCours,'html5');
}

/////----------------------------------------------------------------------------------------/////
/////----------------------------------------------------------------------------------------/////
function AZ_TitreVideo(UrlVideo)
{
	//alert(UrlVideo);
	AZ_Title = AZ_Title1 = AZ_Title_Final = '';
	document.getElementById('AZ_zap_name').innerHTML = 	AZ_Title_Final;
	GM_xmlhttpRequest({
		method: 'GET',
		url: UrlVideo,
		onload: function(responseDetails)
		{
			try
			{
				AZ_Title = responseDetails.responseText.replace(/\n/g,'');
				RegexFindTitle1 = /<title>(.*?)<\/title>/;
				RegexFindTitle2 = /<meta name="item-title" content="(.*?)" \/>/;
				if (RegexFindTitle1.test(AZ_Title))
					AZ_Title1 = RegexFindTitle1.exec(AZ_Title)[1];
				if (RegexFindTitle2.test(AZ_Title))
					AZ_Title2 = RegexFindTitle2.exec(AZ_Title)[1];

				AZ_TitleL0 = AZ_Title1.split(' - ')[0];
				AZ_TitleL1 = AZ_Title1.split(' - ')[1];
				if (typeof AZ_TitleL1 === "undefined" || AZ_TitleL1 == 'AlloCiné')
				{
					if (typeof AZ_Title2 != "undefined")
						AZ_TitleL1 = AZ_Title2;
					else
						AZ_TitleL1 = AZ_TitleL0;
				}
				AZ_TitleWidth = ((GM_getValue('AZ_width')/10)*1.5)-5;
				if (AZ_TitleL0.length > AZ_TitleWidth)
				{
					AZ_TitleL0_Tronque = AZ_TitleL0.substring(0,Math.round((AZ_TitleWidth-5)/2))+' [...] '+AZ_TitleL0.substring(AZ_TitleL0.length-Math.round((AZ_TitleWidth-5)/2,AZ_TitleL0.length));
					AZ_Title_Final = '<strong style="cursor:help" title="'+AZ_TitleL0.replace(/"/g,'&quot;')+'">'+AZ_TitleL0_Tronque+'</strong>';
				}
				else
					AZ_Title_Final = '<strong style="cursor:default;">'+AZ_TitleL0+'</strong>';

				if (AZ_TitleL1.length > AZ_TitleWidth)
				{
					AZ_TitleL1_Tronque = AZ_TitleL1.substring(0,Math.round((AZ_TitleWidth-5)/2))+' [...] '+AZ_TitleL1.substring(AZ_TitleL1.length-Math.round((AZ_TitleWidth-5)/2,AZ_TitleL1.length));
					AZ_Title_Final += '<br /><span id="AZ_VideoName" style="cursor:help;" title="'+AZ_TitleL1.replace(/"/g,'&quot;')+'">'+AZ_TitleL1_Tronque+'</span>';
				}
				else
					AZ_Title_Final += '<br /><span id="AZ_VideoName" style="cursor:default;">'+AZ_TitleL1+'</span>';

				if (UrlVideo != AZ_Url_Page)
					AZ_Title_Final += '<a id="AZ_LinkUrlVideo" href="'+UrlVideo+'" title="'+AZ_LNG.url+' :\n'+UrlVideo+'"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAACXBIWXMAAAsTAAALEwEAmpwYAAABsUlEQVR42k2STUsCYRSFrxWFBEFEPyAzHc2PccbyY4q+NCpq2biqVRq5EkeFCdRRzMiCVkUQtGhdqyBo26KonxD9jKJVvN0TjbR4meGdc+8957lDlmURTr1e52NRrVajdvuQ9vbyQ+GQ/BgKhoUclu9zud2BVqvV1xXbz2azSYZhDCbiyVuf5P9UIuoLP0UikbwuFAr017n+27larfaapkmaNnM17nILfTOzVC5XhtOpdMPrkURUmTroFrC4r3PcoVw2NzHh9rynltIb21vbLrbRXylXeiKy8hIIBAWEPbBhmvuU3cn69U1dW11ZS2rJ2QvX2LjQ9YyLz6Lk9X2pytQpB2xTySg6Z7TZSx77lk4tx+fnFo48bq/guzN+X2d7H7Hp2E2xWCTK5/MjHPAGl/jIonOIUYRiNEGzklEaYCcOYnTPkuT/QEAePQYbsANbsAebsAvbAEPgzIGeEAwBERSBERwAAAJAbDgkhyIPPq9f8HgLCDMcEEiBFoiBGp27BbzBUSwFnHnSK9P4jk3H73h5zkaj4bCF9nKJbfRig6qiNgOTQaEq0RPQgPh/Z/sX+gFi2cadq3Y6IAAAAABJRU5ErkJggg==" alt="" style="border:none; vertical-align:middle; margin-left:5px;" /></a>';

				document.getElementById('AZ_zap_name').innerHTML = 	AZ_Title_Final;
			}
			catch(Err) {}
		}
	});
}

/////----------------------------------------------------------------------------------------/////
/////----------------------------------------------------------------------------------------/////
function AZ_Xclose(evt)
{
	document.getElementById('lecteur_allocine').data = '';
	document.getElementById('lecteur_allocine_HTML5').src = '';
	document.getElementById('lecteur_allocine_DivX').data = '';
	document.getElementById('lecteur_allocine_DivXSrc').value = '';
	document.getElementById('New_lecteur_Allocine').style.display = 'none';
}

/////----------------------------------------------------------------------------------------/////
/////----------------------------------------------------------------------------------------/////
function AZ_ShowHide_Synopsis()
{
	if(document.getElementById('AZ_Synopsis').style.display == 'block')
	{
		document.getElementById('AZ_Synopsis').style.display = 'none';
		document.getElementById('AZ_Synopsis_Hr').style.display = 'none';
	}
	else
	{
		document.getElementById('AZ_Synopsis_Hr').style.display = 'block';
		document.getElementById('AZ_Synopsis').style.display = 'block';
	}
}
function AZ_ShowHide(IdS)
{
	IdS = IdS.split(',');
	for (var i = 0; i < IdS.lenght; i++)
	{
		if(document.getElementById(IdS))
		{
			if(document.getElementById(IdS).style.display == 'block')
				document.getElementById(IdS).style.display = 'none';
			else
				document.getElementById(IdS).style.display = 'block';
		}
	}
}
/////----------------------------------------------------------------------------------------/////
/////----------------------------------------------------------------------------------------/////
function AZ_CheckSynopsis(UrlPage)
{
	if ( location.hostname == 'www.allocine.fr')
	{
		UrlPage = UrlPage.replace(/video\/player_gen_cmedia=\d+&cfilm=/,'film/fichefilm_gen_cfilm=');
		UrlPage = UrlPage.replace(/video\/player_gen_cmedia=\d+&cserie=/,'series/ficheserie_gen_cserie=');
	}
	else
		UrlPage = UrlPage.replace(/\/(video(s)?|trailer|fragman)(-|\/)(\d+)/,'');

	//alert(UrlPage);

	GM_xmlhttpRequest({
		method: 'GET',
		url: UrlPage,
		onload: function(responseDetails)
		{
			try
			{
				AZ_synopsis = responseDetails.responseText.replace(/\n/g,'');
				RegexFindSynopsis = /itemprop="description">(<\/p><p>)?(.*?)<\/p>/;
				if (RegexFindSynopsis.test(AZ_synopsis))
				{
					AZ_synopsis = RegexFindSynopsis.exec(AZ_synopsis)[2];
				}
				else
					AZ_synopsis = 'Pas de description';

				AZ_synopsis = AZ_synopsis.replace(/(<([^>]+)>)/ig,"");

				document.getElementById('AZ_Synopsis').innerHTML = AZ_synopsis;
				//document.getElementById('AZ_Synopsis').style.display = 'block';
			}
			catch(Err) {}
		}
	});
}

/////----------------------------------------------------------------------------------------/////
/////----------------------------------------------------------------------------------------/////
function AZ_AlertBox(AZ_TextAlertBox)
{
	if(document.getElementById('div_AZ_AlertBox'))	return;

	base_AZ_AlertBox = createElement('div', {id:"div_AZ_AlertBox"},'',AZ_TextAlertBox);
	document.body.appendChild(base_AZ_AlertBox);
	document.getElementById('div_AZ_AlertBox').appendChild(createElement('input', {type:"button", value:""+AZ_LNG.option_close+"",onclick:"this.parentNode.parentNode.removeChild(document.getElementById(\'div_AZ_AlertBox\'))", class:"AZ_button"}));
}

/////----------------------------------------------------------------------------------------/////
/////----------------------------------------------------------------------------------------/////
function gup(name,url_in)
{
	var regexS = "[\\?&]"+name+"=([^&#]*)";
	var regex = new RegExp( regexS );
//	var tmpURL = window.location.href;
	var tmpURL = url_in;
	var results = regex.exec( tmpURL );
	if( results == null )
		return "";
	else
		return results[1];
}

/////----------------------------------------------------------------------------------------/////
/////----------------------------------------------------------------------------------------/////
function getElementsByClassName(className, tag, elm){
	var testClass = new RegExp("(^|s)" + className + "(s|$)");
	var tag = tag || "*";
	var elm = elm || document;
	var elements = (tag == "*" && elm.all)? elm.all : elm.getElementsByTagName(tag);
	var returnElements = [];
	var current;
	var length = elements.length;
	for(var i=0; i<length; i++)
	{
		current = elements[i];
		if(testClass.test(current.className))
		{
			returnElements.push(current);
		}
	}
	return returnElements;
}

//****************************************************************
//	functions by Userscripts Updater - http://userscripts.org/scripts/show/26062
//****************************************************************
function createElement(type, attrArray, evtListener, html)
{
	var node = document.createElement(type);

	for (var attr in attrArray) if (attrArray.hasOwnProperty(attr)){
		node.setAttribute(attr, attrArray[attr]);
	}

	if(evtListener){
		var a = evtListener.split(' ');
		node.addEventListener(a[0], eval(a[1]), eval(a[2]));
	}

	if(html)
		node.innerHTML = html;

	return node;
}
function getCSS()
{
	var AZ_Border = GM_getValue('AZ_border');
	var html_css = '';
	html_css += 'html, body {background:none !important;background-color:#000 !important}';
	if (document.getElementById('header') && document.getElementById('connect_member'))
	{
		if (GM_getValue('AZ_header') == 'fixed')
		{
			html_css += 'body {margin-top:123px;}';
			html_css += '#header {margin:auto;position:fixed;top:0px;width:980px;z-index:2000;}';
			html_css += '#header.is_pinned {height:auto;}';

			//html_css += '#nav {border-bottom:37px solid '+zapBgColor+';}';
			if(window.location.href.match('http://www.allocine.fr/communaute/forum/'))
			{
				html_css += '#header {width:98%;}';
				html_css += 'body {margin-top:90px;}';
			}
			else if (getElementsByClassName('subnav navHP')[0])
			{
				html_css += 'body {margin-top:170px;}';
				html_css += '.navHP {margin-top:-340px;}';
			}
			else if (getElementsByClassName('subnav ')[0] && getElementsByClassName('subnav ')[0].innerHTML.replace(/^\s+/g,'').replace(/\s+$/g,'') == '')
			{
				html_css += 'body {margin-top:103px;}';
				//html_css += '#nav {border-bottom:8px solid '+zapBgColor+';}';
			}
			else
				html_css += 'body {margin-top:140px;}';

		}
		else
		{
			html_css += 'body {margin-top:-14px;}';
		}
	}
	else
	{
		if (GM_getValue('AZ_header') == 'fixed')
		{
			html_css += 'body {margin-top:80px;}';
			html_css += '.header_V6 {position:fixed;top:0px;width:970px;z-index:2000;border-bottom:4px solid '+zapBgColor+';}';
			html_css += '.mainheader {position:fixed;top:0px;width:980px;z-index:2000;border-bottom:4px solid '+zapBgColor+';}';
		}
		else
		{
			html_css += 'body {margin-top:-34px;}';
		}
	}
	//html_css += '.btn_trailer .btn span {font-size:10px;}';
	html_css += '#preRoll, #content_player, #pub_ist_layer, .mainfooter, #footer {display:none;}';
	if (!GM_getValue('AZ_MonAlloCine'))
		html_css += '#connectbar, #connect_member {display:none;}';

	html_css += '.AZ_Zap, .AZ_Login, .AZ_Footer {cursor:pointer;color:'+zapColor+' !important;background-color:'+zapBgColor+' !important;text-align:center;font-size:10px;font-weight:bold;font-variant:small-caps;margin-left:5px;padding:1px 5px;border:0.25em outset !important;z-index:1000;}';
	html_css += '.AZ_Zap, .AZ_Login, .AZ_Footer {border-radius:5px;-moz-border-radius:5px;-webkit-border-radius:5px;transition:0.3s;-moz-transition:0.3s;-webkit-transition:0.3s;}';
	html_css += '.AZ_Zap {float:right;width:35px;}';
	if (!GM_getValue('AZ_zap'))
		html_css += '.AZ_Zap{display:none}';
	html_css += '.AZ_Zap:hover, .AZ_Login:hover, .AZ_Footer:hover {border-style:inset !important;color:'+zapBgColor+' !important;background-color:'+zapColor+' !important;}';
	html_css += '.AZ_Login, .AZ_Footer {clear:both;float:right;position:relative;top:-95px;right:550px;width:90px;}';
	html_css += '.is_pinned .AZ_Login, .is_pinned .AZ_Footer {float:left;top:-40px;left:2px;}';
	html_css += '.is_pinned #logo{display:none}';
	html_css += '.AZ_LoginNew, .AZ_FooterNew {}';
	if (AZ_Url_Page.match('allocine.fr/communaute/forum'))
		html_css += '.AZ_Login, .AZ_Footer {float:left;top:-40px;left:800px;}';
	html_css += '#AZ_LinkHeader, #AZ_size, #AZ_choix_lecteur, #AZ_LinkBorder, #AZ_LinkPosOri, #AZ_LinkAutoplay, #AZ_LinkZap {float:left;text-align:left;width:25%;}';
	html_css += '#AZ_LinkColor, #AZ_LinkBgColor {float:left;width:50%;}';
	html_css += '.AZ_WebColors {border:none;padding:0px;margin:auto;}';
	html_css += '.AZ_WebColors td {border:none;padding:0px;height:12px;width:12px;line-height:12px;vertical-align:middle;}';
	html_css += '.AZ_WebColors button {border:none;padding:0px;height:11px;width:11px;line-height:11px;font-size:9px;cursor:pointer;}';
	html_css += '#div_AZ_update {text-align:center;font-size:22px;font-variant:small-caps;position:fixed; margin:auto;width:100%;height:100%;top:2px;z-index:100000;background-color:'+zapBgColor+';color:'+zapColor+';opacity: 0.95;padding-top:'+((window.innerHeight-150)/2)+'px;}';
	html_css += '#div_AZ_AlertBox {text-align:center; position:fixed; margin:auto;width:100%;height:100%;top:2px;z-index:100000;background-color:'+zapBgColor+';color:'+zapColor+';opacity: 0.95;padding-top:'+((window.innerHeight-150)/2)+'px;}';
	html_css += 'input.AZ_button {width:100px; height:25px; background-color:'+zapBgColor+'; color:'+zapColor+'; font-size:11px; font-variant:small-caps; border-color:'+zapColor+';border-radius:10px;-moz-border-radius:10px;-webkit-border-radius:10px; cursor:pointer;}';
	html_css += 'input.AZ_button:hover {font-weight:bold; background-color:'+zapColor+'; color:'+zapBgColor+';border-color:'+zapBgColor+'}';
	html_css += 'input.AZ_buttonOpt {width:120px; background-color:#FFD515; font-size:10px; cursor:pointer; margin-top:1px}';
	html_css += '#New_lecteur_Allocine {z-index:50000; margin:auto; cursor:move; position:fixed; top:'+GM_getValue('AZ_Top')+'; left:'+GM_getValue('AZ_Left')+'; display:none;}';
	html_css += '#New_lecteur_Allocine select {background-color:#FFD515}';
	html_css += '#New_lecteur_Allocine object, #New_lecteur_Allocine select {text-align:center;}';
	html_css += '#New_lecteur_Allocine object {background-color:#000;}';
	html_css += '#AZ_container, .player_video {color:'+zapColor+';background-color:'+zapBgColor+';text-align:center;margin:auto;font-size:10px;border-radius:'+AZ_Border+';-moz-border-radius:'+AZ_Border+';-webkit-border-radius:'+AZ_Border+';}';
	html_css += '#AZ_container{z-index:10000;}';
    html_css += '#AZ_div_top {border-radius:'+AZ_Border+' '+AZ_Border+' 0px 0px;-moz-border-radius:'+AZ_Border+' '+AZ_Border+' 0px 0px;-webkit-border-radius:'+AZ_Border+' '+AZ_Border+' 0px 0px;padding:0 2px;}';
    html_css += '#AZ_div_bottom {border-radius:0px 0px '+AZ_Border+' '+AZ_Border+';-moz-border-radius:0px 0px '+AZ_Border+' '+AZ_Border+';-webkit-border-radius:0px 0px '+AZ_Border+' '+AZ_Border+';min-height:20px;}';
	html_css += '.AZ_VideoHTML5 {display:none;margin:auto;cursor:default; background-color:#000 !important; background-position:left center, right center; background-size:30%,70%; background-repeat: no-repeat;}';
	html_css += '.AZ_ObjectError {text-align:center;font-weight:bold;color:'+zapColor+';background-color:'+zapBgColor+';opacity:0.75;}';
	html_css += '#OldZap {border-radius:5px;-moz-border-radius:5px;-webkit-border-radius:5px;background-color:'+zapBgColor+';}';
	html_css += '#OldZap a{color:'+zapColor+'}';
	html_css += '#AZ_Synopsis{display:none;margin:auto;width:'+(GM_getValue('AZ_width')-15)+'px;padding-right:5px;text-align:justify;cursor:default;overflow-y:auto;max-height:150px;}';
	html_css += '#AZ_XcloseTxt {float:right;position:absolute;top:0px;right:0px;cursor:pointer;margin:0px 5px 0px 0px;font-weight:bold;}';
	html_css += '#AZ_XcloseButton {width:15px;height:15px;font-size:8px;color:'+zapBgColor+';background-color:'+zapColor+';float:right;position:absolute;top:0px;right:0px;cursor:pointer;margin:2px;font-weight:bold;}';
	html_css += '.AZ_Link {cursor:pointer;font-weight:bold;text-decoration:underline;color:'+zapColor+';}';
	html_css += '.AZ_MiniImg {float:right;cursor:pointer;margin-right:5px;vertical-align:middle;}';
	html_css += '#AZ_QuickPlayerChoice {float:left;font-size:8px;line-height:20px;cursor:default}';
	html_css += '#AZ_QuickPlayerChoice span{margin:auto 2px;font-weight:bold;}';
	html_css += '.lecteur_allocine_Title {text-align:center;padding:2px 0px; width:100%;background:'+zapBgColor+';color:'+zapColor+';border-radius:'+AZ_Border+' '+AZ_Border+' 0px 0px;-moz-border-radius:'+AZ_Border+' '+AZ_Border+' 0px 0px;-webkit-border-radius:'+AZ_Border+' '+AZ_Border+' 0px 0px;}';
	html_css += '.AZ_QuickPlayerChoice {float:left;position:relative;left:-50px;bottom:232px;text-align:center;width:50px;height:130px;background:'+zapBgColor+';padding:5px 0px;border-radius:'+AZ_Border+' 0px 0px '+AZ_Border+';-moz-border-radius:'+AZ_Border+' 0px 0px '+AZ_Border+';-webkit-border-radius:'+AZ_Border+' 0px 0px '+AZ_Border+';}';
	html_css += '.AZ_QuickPlayerChoice span{display:block;padding:7px 0px;}';
	html_css += '.AZ_QuickPlayerChoiceChallengers {text-align:center;width:100%;height:18px;background:'+zapBgColor+';padding:5px 0px;border-radius:0px 0px '+AZ_Border+' '+AZ_Border+';-moz-border-radius:0px 0px '+AZ_Border+' '+AZ_Border+';-webkit-border-radius:0px 0px '+AZ_Border+' '+AZ_Border+';}';
	html_css += '.AZ_QuickPlayerChoiceChallengers span{padding:0px 14px;}';
	//html_css += '.challenger {transform:none !important;}';
	html_css += '.challenger .vote {margin-top:58px;}';
	//html_css += '#AZ_Dedic {float:left; position:relative; left:10px; top:10px; font-size:11px; font-variant:normal;}';
	//html_css += '#AZ_Dedic1,#AZ_Dedic2 {font-size:10px; font-variant:normal;}';

	var css = createElement('style',{type:"text/css"},null,html_css);
	return css;
}

//****************************************************************
//		U p d a t e
//****************************************************************
function check_AZ_version(evt)
{
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://userscripts.org/scripts/source/'+AZ_id+'.meta.js',
		onload: function(responseDetails)
		{
			try
			{
				AZ_currentVersion = parseInt(responseDetails.responseText.match(/\@uso\:version\s+(\d+)/)[1]);
				if(GM_getValue('AZ_Version') == 0) GM_setValue('AZ_Version', AZ_currentVersion);
				if (GM_getValue('AZ_Version') < AZ_currentVersion)
				{
					new_AZ_version();
				}
				else if(evt=='menu')
				{
					alert (AZ_LNG.check_noresult);
				}
				else
				{
					GM_setValue('AZ_DateUpdate', AZ_today_YYYYMMDD);
					try {GM_deleteValue('AZ_DateLater');} catch(Err){};
				}
			}
			catch(Err) {}
		}
	});
}
function ForceCheck_AZ_version(evt)
{
	check_AZ_version('menu');
}
function new_AZ_version(evt)
{
	if(document.getElementById('div_AZ_update'))	return;

	html_AZ_update = AZ_LNG.title_update_new+' '+AZ_LNG.name+'<br /><br />';

	base_AZ_update = createElement('div', {id:"div_AZ_update"},'',html_AZ_update);
	document.body.appendChild(base_AZ_update);
	// update "button"
	document.getElementById('div_AZ_update').appendChild(createElement('input', {type:"button", value:""+AZ_LNG.update_button+"", class:"AZ_button"}, 'click update_AZ false'));
	// later "button"
	document.getElementById('div_AZ_update').appendChild(createElement('span','','','&nbsp;&nbsp;&nbsp;'));
	document.getElementById('div_AZ_update').appendChild(createElement('input', {type:"button", value:""+AZ_LNG.later_button+"", class:"AZ_button"}, 'click update_later_AZ false'));
	document.getElementById('div_AZ_update').appendChild(createElement('div', {onclick:"this.parentNode.parentNode.removeChild(document.getElementById(\'div_AZ_update\'))", class:"AZ_Link"}, '', '<br />'+AZ_LNG.option_close+''));
	//
	//document.getElementById('div_AZ_update').appendChild(createElement('div', {id:"AZ_Dedic1"}, '', String.fromCharCode(83,112,233,99,105,97,108,101,32,68,233,100,105,99,97,99,101,32,80,111,117,114,32,77,97,32,80,39,116,105,116,101,32,70,101,109,109,101,32,60,51)));
	//document.getElementById('div_AZ_update').appendChild(createElement('div', {id:"AZ_Dedic2"}, '', '<br />'+String.fromCharCode(60,51,32,60,51,32,60,51,60,98,114,32,47,62,83,112,233,99,105,97,108,101,32,68,233,100,105,99,97,99,101,32,192,32,77,111,110,32,80,39,116,105,116,32,67,339,117,114,32,81,117,101,32,74,39,97,105,32,80,101,114,100,117,32,192,32,84,111,117,116,32,74,97,109,97,105,115,60,98,114,32,47,62,60,51,32,60,51,32,60,51)));
}
//new_AZ_version();
function update_AZ()
{
	base_AZ_update.parentNode.removeChild(base_AZ_update);
	GM_setValue('AZ_Version', AZ_currentVersion);
	GM_setValue('AZ_DateUpdate', AZ_today_YYYYMMDD);
	try {GM_deleteValue('AZ_DateLater');} catch(Err){};
	GM_openInTab('http://userscripts.org/scripts/source/'+AZ_id+'.user.js');
}
function update_later_AZ()
{
	GM_setValue('AZ_DateLater', AZ_today_YYYYMMDD+1);
	base_AZ_update.parentNode.removeChild(base_AZ_update);
}

//****************************************************************
//		D r a g  &  D r o p
//****************************************************************
//	Adapted from http://www.hunlock.com/blogs/Javascript_Drag_and_Drop
//	And Userscripts Updater : http://userscripts.org/scripts/show/26062
var savedTarget=null;                           // The target layer (effectively vidPane)
var orgCursor=null;                             // The original mouse style so we can restore it
var dragOK=false;                               // True if we're allowed to move the element under mouse
var dragXoffset=0;                              // How much we've moved the element on the horozontal
var dragYoffset=0;                              // How much we've moved the element on the verticle

function moveHandler(e){
	if (e == null) return;// { e = window.event }
	if ( e.button<=1 && dragOK ){
		savedTarget.style.left = e.clientX - dragXoffset + 'px';
		savedTarget.style.top = e.clientY - dragYoffset + 'px';
		return false;
	}
}

function cleanup(e) {
	document.removeEventListener('mousemove',moveHandler,false);
	document.removeEventListener('mouseup',cleanup,false);

	savedTarget.style.cursor=orgCursor;
	GM_setValue('AZ_Left', savedTarget.style.left);
	GM_setValue('AZ_Top',  savedTarget.style.top);

	dragOK=false; //its been dragged now
}

function dragHandler(e){

	var htype='-moz-grabbing';
	if (e == null) return;//{ e = window.event;}  // htype='move';}
	var target = e.target;// != null ? e.target : e.srcElement;
	orgCursor=target.style.cursor;

	if(target.nodeName!='DIV')
		return;

	if (target = document.getElementById('New_lecteur_Allocine')) {
		savedTarget=target;
		target.style.cursor=htype;
		dragOK=true;
		dragXoffset = e.clientX-target.offsetLeft;
		dragYoffset = e.clientY-target.offsetTop;

		//set the left before removing the right
		target.style.left = e.clientX - dragXoffset + 'px';
		target.style.right = null;

		document.addEventListener('mousemove',moveHandler,false);
		document.addEventListener('mouseup',cleanup,false);
		return false;
	}
}
//end drag handling