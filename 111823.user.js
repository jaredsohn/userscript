// ==UserScript==
// @name           Facebook Background
// @namespace      http://userscripts.org/scripts/show/101915
// @description    Theme facebook, your way :)
// @include        htt*://facebook.com/*
// @include        htt*://*.facebook.com/*
// @exclude        htt*://apps.facebook.com/*
// @exclude        htt*://*.facebook.com/plugins/*
// @version        2.4
// @creator        Shane Thompson
// ==/UserScript==

/* --COPYRIGHT--
This copyright section and all credits in the script must be included in modifications or redistributions of this script.

Facebook Background is Copyright (c) 2011, Shane Thompson
Facebook Background is licensed under a Creative Commons Attribution-Share Alike 3.0 Unported License
License information is available here: http://creativecommons.org/licenses/by-sa/3.0/

Facebook is a registered trademark of Facebook, Inc.
Facebook Background is not related to or endorsed by Facebook, Inc. in any way.
*/
/* --CREDITS--
Features
	- Language support feature adapted from FFixer, Copyright (c) 2011, Vaughan Chandler.
	- Updating:								http://userscripts.org/scripts/show/20145

Language Translations:
	- Upside-down:		Shane Thompson
	- Pirate:			Shane Thompson
	- French:			Deya				http://userscripts.org/users/345301
	- Italian:			Alessandro Rodino

*/

var DEBUG = 0;	//Only used for debugging.
var id = 0;


var back_type = GM_getValue("back_type", false);
var buttonLocation = GM_getValue("buttonLocation", 0);
var fbgo_lang = GM_getValue("language", "auto");
var fixedHead = GM_getValue("fixedHead", false);
var grad = GM_getValue("grad", "-moz-linear-gradient(center top , #1E5799 0%, #2989D8 50%, #207CCA 51%, #7DB9E8 100%)");
var hideChat = GM_getValue("hideChat", false);
var notificationEnhanced = GM_getValue("enhNotifs", false);
var adHide = GM_getValue("adHide", false);
var option = GM_getValue("option", "off");
var repeat = GM_getValue("repeat", false);
var url = GM_getValue("url", "http://www.vsdonline.com/files/Image/wallpapers/vsd-blue-radial-gradient.png");	//insert custom picture
var opacity = GM_getValue("opacity", 100) / 100;


var css;
var SUC_script_num = 101915;

var toolimage = "data:image/png;base64,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";

var checkSelectBoxCss = '\r\ntd.option, tr.option {\r\nwidth: 100%;\r\n-moz-user-select: none;\r\n}\r\ntr.optionHeavy {\r\nbackground-color' +
				':#EEE;\r\nwidth: 100%;\r\n-moz-user-select: none;\r\n}\r\ntr.option:hover, tr.optionHeavy:hover {\r\nbackground-color:#D8D' +
				'FEA;\r\n}\r\ndiv.checkSelectButton {\r\nbackground-color: white;\r\nheight:20px;\r\nwidth:316px;\r\nborder:1px solid light' +
				'steelblue;\r\nborder-radius:3px;\r\npadding:2px 4px;\r\nbox-shadow: -1px -1px 4px #CCC;\r\n}\r\ndiv.checkSelectLabel {\r\n' +
				'border:1px solid lightSteelBlue;\r\nwidth: 290px;\r\nheight: 18px;\r\nborder-radius: 2px;\r\npadding-left:3px;\r\n}\r\n.ch' +
				'eckSelectDropLabel{\r\ncursor: default;\r\npadding-left:3px;\r\n}\r\nimgcheckSelectImage {\r\nposition: relative;\r\nwidth' +
				': 17px;\r\ntop:-18px;\r\nleft: -1px;\r\nfloat: right;\r\n}\r\ndiv.checkSelectDrop {\r\nbackground-color: white;\r\nfloat:l' +
				'eft;\r\nposition:relative !important;\r\nwidth:324px;\r\nz-index:1;\r\nborder: 1px solid lightsteelblue;\r\nborder-radius:' +
				'0 0 3px 3px;\r\n}\r\ndiv.fbgoImportDlg {\r\nwidth: 40%;\r\nleft:30%;\r\ntop:20%;\r\nposition:absolute !important;\r\nbackg' +
				'round: none repeat scroll 0 0 white;\r\nz-index:106;\r\n}';

var lang = {												//Language variable
	en : {
		'fbgoTitle' :		'Facebook Background Options',
		'liConfigureTab' :	'Configure Facebook Background',
		'labelOption' :		'Option',
		'labelURL' :		'URL',
		'labelGradient' :	'Gradient',
		'labelExtras' :		'Extras',
		'labelBtnLoc' :		'Button Location',
		'selectOptnOff' :	'Off',															//New
		'selectOptnOptn' :	'Options...',													//New
		'selectOptnOffttl':	'Do not have a background',										//New
		'selectOptnttl' :	'These are the values for a background',						//New
		'selectOptnURLttl':	'Create a background from an image',							//New
		'selectOptnCSSttl': 'Create a background from a CSS gradient',						//New
		'extrasFix' :		'Fix Header',
		'extrasHide' :		'Hide Chat Bar',
		'extrasRepeat' :	'Repeat Background',
		'extrasEnhance' :	'Enhance notification colours',
		'extrasFull' :		'Full Screen Background',
		'extrasFullTitle' :	'If selected, this will remove the border around this popup and will have a full screen background instead',
		'locationFace' :	'Button Location...',
		'locationHome' :	'Next to Home Button',
		'locationAcct' :	'Under Account Tab',
		'lastFace' :		'Other...',
		'lastUpdate' :		'Check for updates...',
		'lastReset' :		'Reset to Default',
		'lastExport' :		'Export Settings',
		'lastImport' :		'Import Settings',
		'aGrad' :			'Gradients...',
		'btnSave' :			'Save Changes',
		'btnSubmit' :		'Submit',
		'btnCancel' :		'Cancel',
		'exportMsg' :		'Please copy the following text and save it for later import...',
		'confirmReset' :	'Before reseting, we suggest you export your data.\r\nAre you sure you wish to delete your customisations?',
		'importTextMsg' :	'Please insert your settings below.<br />NOTE: They must be the settings given to you from your last export!',
		'importError' :		'Please include some settings!',									//New
		'updateTrue' :		'There is an update available for the Greasemonkey script Facebook Background."\nWould you like to go to the in' +
								'stall page now?',												//New
		'updateFalse' :		'No update is available for Facebook Background',					//New
		'updateError' :		'An error occurred while checking for updates:',					//New
		'hideAds' :			'Remove Advertising'												//New
	},
	en_ud : {
		'fbgoTitle' :		'suoıʇdo punoɹƃʞɔɐq ʞooqǝɔɐɟ',
		'liConfigureTab' :	'punoɹƃʞɔɐq ʞooqǝɔɐɟ ǝɹnƃıɟuoɔ',
		'labelOption' :		'uoıʇdo',
		'labelURL' :		'lɹn',
		'labelGradient' :	'ʇuǝıpɐɹƃ',
		'labelExtras' :		'sɐɹʇxǝ',
		'labelBtnLoc' :		'uoıʇɐɔol uoʇʇnq',
		'selectOptnOff' :	'ɟɟo',
		'selectOptnOptn' :	'...suoıʇdo',
		'selectOptnOffttl':	'punoɹƃʞɔɐq ɐ ǝʌɐɥ ʇou op',
		'selectOptnttl' :	'punoɹƃʞɔɐq ɐ ɹoɟ sǝnlɐʌ ǝɥʇ ǝɹɐ ǝsǝɥʇ',
		'selectOptnURLttl':	'ǝƃɐɯı uɐ ɯoɹɟ punoɹƃʞɔɐq ɐ ǝʇɐǝɹɔ',
		'selectOptnCSSttl': 'ʇuǝıpɐɹƃ ssɔ ɐ ɯoɹɟ punoɹƃʞɔɐq ɐ ǝʇɐǝɹɔ',
		'extrasFix' :		'ɹǝpɐǝɥ xıɟ',
		'extrasHide' :		'ɹɐq ʇɐɥɔ ǝpıɥ',
		'extrasRepeat' :	'punoɹƃʞɔɐq ʇɐǝdǝɹ',
		'extrasEnhance' :	'sɹnoloɔ uoıʇɐɔıɟıʇou ǝɔuɐɥuǝ',
		'extrasFull' :		'punoɹƃʞɔɐq uǝǝɹɔs llnɟ',
		'extrasFullTitle' :	'pɐǝʇsuı punoɹƃʞɔɐq uǝǝɹɔs llnɟ ɐ ǝʌɐɥ llıʍ puɐ dndod sıɥʇ punoɹɐ ɹǝpɹoq ǝɥʇ ǝʌoɯǝɹ llıʍ sıɥʇ \'pǝʇɔǝlǝs ɟı',
		'locationFace' :	'˙˙˙uoıʇɐɔol uoʇʇnq',
		'locationHome' :	'uoʇʇnq ǝɯoɥ oʇ ʇxǝu',
		'locationAcct' :	'qɐʇ ʇunoɔɔɐ ɹǝpun',
		'lastFace' :		'˙˙˙ɹǝɥʇo',
		'lastUpdate' :		'˙˙˙sǝʇɐpdn ɹoɟ ʞɔǝɥɔ',
		'lastReset' :		'ʇlnɐɟǝp oʇ ʇǝsǝɹ',
		'lastExport' :		'sƃuıʇʇǝs ʇɹodxǝ',
		'lastImport' :		'sƃuıʇʇǝs ʇɹodɯı',
		'aGrad' :			'˙˙˙sʇuǝıpɐɹƃ',
		'btnSave' :			'sǝƃuɐɥɔ ǝʌɐs',
		'btnSubmit' :		'ʇıɯqns',
		'btnCancel' :		'lǝɔuɐɔ',
		'exportMsg' :		'˙˙˙ʇɹodɯı ɹǝʇɐl ɹoɟ ʇı ǝʌɐs puɐ ʇxǝʇ ƃuıʍolloɟ ǝɥʇ ʎdoɔ ǝsɐǝld',
		'confirmReset' :	'¿suoıʇɐsıɯoʇsnɔ ɹnoʎ ǝʇǝlǝp oʇ ɥsıʍ noʎ ǝɹns noʎ ǝɹɐ\r\n˙ɐʇɐp ɹnoʎ ʇɹodxǝ noʎ ʇsǝƃƃns ǝʍ \'ƃuıʇǝsǝɹ ǝɹoɟǝq',
		'importTextMsg' :	'¡ʇɹodxǝ ʇsɐl ɹnoʎ ɯoɹɟ noʎ oʇ uǝʌıƃ sƃuıʇʇǝs ǝɥʇ ǝq ʇsnɯ ʎǝɥʇ :ǝʇou<br />˙ʍolǝq sƃuıʇʇǝs ɹnoʎ ʇɹǝsuı ǝsɐǝld',
		'importError' :		'¡sƃuıʇʇǝs ǝɯos ǝpnlɔuı ǝsɐǝld',
		'updateTrue' :		'¿ʍou ǝƃɐd llɐʇsuı ǝɥʇ oʇ oƃ oʇ ǝʞıl noʎ plnoʍ\n"˙punoɹƃʞɔɐq ʞooqǝɔɐɟ ʇdıɹɔs ʎǝʞuoɯǝsɐǝɹƃ ǝɥʇ ɹoɟ ǝlqɐlıɐʌɐ ǝʇɐ' +
								'pdn uɐ sı ǝɹǝɥʇ',
		'updateFalse' :		'punoɹƃʞɔɐq ʞooqǝɔɐɟ ɹoɟ ǝlqɐlıɐʌɐ sı ǝʇɐpdn ou',
		'updateError' :		':sǝʇɐpdn ɹoɟ ƃuıʞɔǝɥɔ ǝlıɥʍ pǝɹɹnɔɔo ɹoɹɹǝ uɐ',
		'hideAds' :			'ƃuısıʇɹǝʌpɐ ǝʌoɯǝɹ'
	},
	en_pi : {
		'fbgoTitle' :		'Ye Ships Colors',
		'liConfigureTab' :	'Adjust ye colors',
		'labelOption' :		'Orders',
		'labelURL' :		'URL',
		'labelGradient' :	'Gradient',
		'labelExtras' :		'Treasures',
		'labelBtnLoc' :		'Colors mast',
		'selectOptnOff' :	'Nothin',
		'selectOptnOptn' :	'Orders...',
		'selectOptnOffttl':	'Take down ye colors',
		'selectOptnttl' :	'Hoist yar colors!',
		'selectOptnURLttl':	'Make ye colors of ar portrait',
		'selectOptnCSSttl': 'Make ye colors of ar gradient',
		'extrasFix' :		'Secuar yer navigation',
		'extrasHide' :		'Leave thar crow\'s nest',
		'extrasRepeat' :	'Repeat yar colors',
		'extrasEnhance' :	'Magnify yer Hail-shots',
		'extrasFull' :		'Bigger ancharr!',
		'extrasFullTitle' :	'If ye choose, thar border containin\' this riggin is to be removed, replaced by bigger riggin\'s.',
		'locationFace' :	'Riggin\'s placement...',
		'locationHome' :	'Near Home Port',
		'locationAcct' :	'Below Yarr Vessel',
		'lastFace' :		'Give us more...',
		'lastUpdate' :		'Spy fer upgrades...',
		'lastReset' :		'Clean yar ship',
		'lastExport' :		'Copy yar maps',
		'lastImport' :		'Replace yar maps',
		'aGrad' :			'Gradients...',
		'btnSave' :			'Arrr',
		'btnSubmit' :		'Submit',
		'btnCancel' :		'Belay',
		'exportMsg' :		'Copy yer maps an hide \'em incase ye might be needin \'em again',
		'confirmReset' :	'Before cleanin\', yer should replace ye maps.\r\nArr ye certain yer wish to clean yer ship?',
		'importTextMsg' :	'Replace yar maps scruvy dog!<br />Make sure they be the same as when ye copied \'em!',
		'importError' :		'Where\'s yar maps?',
		'updateTrue' :		'There be a new upgrade for yer ship, head to userscripts port to retrieve it now?\nArr...',
		'updateFalse' :		'Ye not be needin any fancy upgrades yet!',
		'updateError' :		'Can\'t be sure if yer be needin new upgrades:',
		'hideAds' :			'Banish empty bottles!'
	},
	fr : {
		'fbgoTitle' :		'Options du Fond Facebook',
		'liConfigureTab' :	'Configurer le Fond Facebook',
		'labelOption' :		'Option',
		'labelURL' :		'URL',
		'labelGradient' :	'Dégradé',
		'labelExtras' :		'Extras',
		'labelBtnLoc' :		'Modifier l\'emplacement des boutons',
		'selectOptnOff' :	'Arrêt',
		'selectOptnOptn' :	'Options...',
		'selectOptnOffttl':	'',
		'selectOptnttl' :	'',
		'selectOptnURLttl':	'',
		'selectOptnCSSttl': '',
		'extrasFix' :		'Fixer l\'en-tête',
		'extrasHide' :		'Masquer la barre du chat',
		'extrasRepeat' :	'Fond d\'écran en mosaïque',
		'extrasEnhance' :	'Améliorer les couleurs des notifications',
		'extrasFull' :		'Fond plein écran',
		'extrasFullTitle' :	'Si activé, la fonction supprime les bords de cette fenêtre et les remplace par un fond plein écran',
		'locationFace' :	'Modifier l\'emplacement des boutons...',
		'locationHome' :	'A côté du bouton Accueil',
		'locationAcct' :	'Sous l\'onglet Compte',
		'lastFace' :		'Autre...',
		'lastUpdate' :		'Vérifier les mises à jour...',
		'lastReset' :		'Rétablir les paramètres par défaut',
		'lastExport' :		'Exporter les paramètres',
		'lastImport' :		'Importer les paramètres',
		'aGrad' :			'Dégradé...',
		'btnSave' :			'Enregistrer les modifications',
		'btnSubmit' :		'Envoyer',
		'btnCancel' :		'Annuler',
		'exportMsg' :		'Veuillez copier le texte suivant et l\'enregistrer pour une importation ultérieure...',
		'confirmReset' :	'Avant de rétablir les paramètres par défaut, il est conseillé de transférer les données.\r\nVoulez-vous suppri' +
								'mer les modifications?',
		'importTextMsg' :	'Veuillez introduire vos paramètres ci-dessous.<br />NOTE: Les paramètres doivent être ceux fournis lors du der' +
								'nier transfer!',
		'importError' :		'',
		'updateTrue' :		'',
		'updateFalse' :		'',
		'updateError' :		'',
		'hideAds' :			''
	},
	it: {
		'fbgoTitle' :		'facebook opzioni di sfondo',
		'liConfigureTab' :	'configurazione sfondo di facebook',
		'labelOption' : 	'opzioni',
		'labelURL' :		'URL',
		'labelGradient' :	'inclinazione',
		'labelExtras' :		'gli extra',
		'labelBtnLoc' :		'posizione pulsante',
		'selectOptnOff' :	'spento',
		'selectOptnOptn' :	'opzioni',
		'selectOptnOffttl':	'non hai uno sfondo',
		'selectOptnttl' :	'ci sono dei valori per lo sfondo',
		'selectOptnURLttl':	'crea uno sfondo da un immagine',
		'selectOptnCSSttl': 'crea uno sfondo da un gradiente CSS',
		'extrasFix' :		'fissare intestazione',
		'extrasHide' :		'nascondi la barra della chat',
		'extrasRepeat' :	'ripeti sfondo',
		'extrasEnhance' :	'aumenta i colori di notifica',
		'extrasFull' :		'sfondo a schermo intero',
		'extrasFullTitle' : 'Se selezionato, questo verrà rimosso il confine intorno a questo popup e avrà uno sfondo a tutto schermo invece',
		'locationFace' :	'posizione pulsante',
		'locationHome' :	'di fianco al tasto home',
		'locationAcct' :	'nella scheda account',
		'lastFace' :		'altro',
		'lastUpdate' :		'controllare gli aggiornamenti',
		'lastReset' :		'reset',
		'lastExport' :		'impostazioni di esportazione',
		'lastImport' :		'impostazioni di importazione',
		'aGrad' :			'sfumature',
		'btnSave' :			'salva le modifiche',
		'btnSubmit' :		'presenta',
		'btnCancel' :		'cancella',
		'exportMsg' :		'per favore copia il testo seguente e salvalo per successive importazioni',
		'confirmReset' :	'prima di resettare ti consigliamo di portare i tuoi dati.\r\nsei sicuro di voler eliminare le tue personalizzazioni?',
		'importTextMsg' :	'Si prega di inserire le impostazioni di sotto <br /> NOTE:. Devono essere le impostazioni date a voi dalla vos' +
								'tra ultima esportazione!',
		'importError' :		'inserisci qualche impostazione',
		'updateTrue' :		'c e un aggiornamento disponibile per il testo greasemonkrìey di facebook."\r\nvuoi andare nella pagina di inst' +
								'allazione adesso? ',
		'updateFalse' :		'non ci sono aggiornamenti disponibili per lo sfondo di facebook',
		'updateError' :		'si è verificato un errore nel cercare aggiornamenti',
		'hideAds' :			'rimuovi gli avvertimenti '
	}
}

var buffer = document.body.className.match(/locale_([^ ]+)/i);	//Determine language
if(fbgo_lang == 'auto' && buffer){
	language = buffer[1].toLowerCase();
	detectedLanguage = language;
	if(!lang[language]){
		language = language.split('_')[0];
		if(!lang[language]){ language = 'en'; }
	}
} else {
	language = fbgo_lang;
}

try{														//Check for updates
	function updateCheck(forced)
	{
		if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime())))
		{
			if(DEBUG){ alert("Updating"); }
			try{
				GM_xmlhttpRequest({
					method: 'GET',url: 'http://userscripts.org/scripts/source/101915.meta.js?'+new Date().getTime(),
					headers: {
						'Cache-Control': 'no-cache'
					},
					onload: function(resp){
						var local_version, remote_version, rt, script_name;
						rt=resp.responseText;
						GM_setValue('SUC_last_update', new Date().getTime()+'');
						remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);
						local_version=parseInt(GM_getValue('SUC_current_version', '-1'));
						if(local_version!=-1){
							script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];
							GM_setValue('SUC_target_script_name', script_name);
							if (remote_version > local_version){
								if(confirm( langText("updateTrue") )){
									GM_openInTab('http://userscripts.org/scripts/show/101915');
									GM_setValue('SUC_current_version', remote_version);
								}
							}else if (forced)alert( langText("updateFalse") );
						}else GM_setValue('SUC_current_version', remote_version+'');}});
			}
			catch (err){
				if (forced)alert(langText("updateError")+'\n'+err);
			}
		}
	}
	GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function(){updateCheck(true);});
	updateCheck(false);
}
catch(err){}

/*Functions*/{
function langText(key){										//Get key from lang
	var text = lang[language][key];
	return text
} //==>langText
function findPos(x) {										//Find where drop should locate to (absolute positioning)
	curleft = (window.innerWidth/2)-233;					//Beginning to despise these...
	curtop = 125;
	switch(x){
		case 1:
			switch(screen.width){
				case 1152:
					curtop = 280;
					curleft = 461;
					break;
				case 1366:
					curtop = 281;
					curleft = 559;
					break;
				default:									//1280 or unsupported (too small to be worth it)
					curtop = 279;
					curleft = 525;
					break;
			}
			switch(language){
				case "en":
					switch(screen.width){
						case 1366:
							curleft -= 19;
							break;
//						default:
//							curtop -= 3;
//							curleft -= 24;
//							break;
					}
				break;
				case "en_pi":
					switch(screen.width){
						case 1366:
							if(back_type){
								curleft -= 4;
							} else {
								curleft -= 22
							}
							break;
						default:
							curleft -= 23;
//							curtop -= 3;
							break;
					}
				break;
				case "en_ud":
					switch(screen.width){
						case 1366:
							if(back_type) {
								curleft--;
							} else {
								curleft -= 18;
							}
						break;
						default:
							curtop++;
							break;
					}
				break;
				case "fr":
					switch(screen.width){
						case 1366:
							if(back_type){ curleft += 18; }
							curtop += 4;
							break;
						default:
							break;
					}
				case "it":
					switch(screen.width){
						case 1366:
							if(!back_type){ curleft -= 18; }
							curleft--;
						break;
					}
				break;
			}
			break;
		case 2:
			switch(screen.width){
				case 1152:
					curtop = 312;
					curleft = 461;
					break;
				case 1366:
					curtop = 315;
					curleft = 559;
					break;
				default:									//1280 or unsupported (too small to be worth it)
					curtop = 312;
					curleft = 525;
					break;
			}
			switch(language){
				case "en":
					switch(screen.width){
						case 1366:
							curleft -= 19;
							break;
						default:
							curtop -= 3;
//							curleft -= 24;
							break;
					}
					break;
				case "en_pi":
					switch(screen.width){
						case 1366:
							if(back_type){
								curleft -= 4;
								curtop -= 4;
							} else {
								curleft -= 22;
								curtop -= 4;
							}
							break;
						default:
							curleft -= 23;
							curtop -= 3;
							break;
					}
					break;
				case "en_ud":
					switch(screen.width){
						case 1366:
							if(!back_type){ curleft -= 18; }
							curleft --;
							break;
						default:
							curtop -= 2;
							break;
					}
					break;
				case "fr":
					switch(screen.width){
						case 1366:
							if(back_type){ curleft += 18; }
							curtop += 12;
							break;
						default:
							curtop += 4;
							break;
					}
					break;
				case "it":
					switch(screen.width){
						case 1366:
							if(!back_type){ curleft -= 18; }
							curleft--;
							break;
						default:
							curtop -= 2;
							break;
					}
			}
			break;
		case 3:
			switch(screen.width){
				case 1152:
					curtop = 361;
					curleft = 363;
					break;
				case 1366:
					curtop = 366;
					curleft = 461;
					break;
				default:									//1280 or unsupported (too small to be worth it)
					curtop = 361;
					curleft = 427;
					break;
			}
			switch(language){
				case "en":
					switch(screen.width){
						case 1366:
							break;
						default:
							curtop -= 4;
							break;
					}
					break;
				case "en_pi":
					curtop -= 4;
					if(back_type){ curleft += 18; }
				break;
				case "en_ud":
					switch(screen.width){
						case 1366:
							if(back_type){ curleft += 18; }
							break;
						default:
							curtop -= 3;
							break;
					}
					break;
				case "fr":
					switch(screen.width){
						case 1366:
							if(back_type){ curleft += 18; }
							curtop += 21;
							break;
						default:
							curtop += 11;
							break;
					}
				break;
				case "it":
					switch(screen.width){
						case 1366:
							if(back_type){ curleft += 18; }
							break;
						default:
							curtop -= 3;
							break;
					}
					break;
			}
			break;
	}
	
	if(!back_type && (screen.width != 1366)){ curleft -= 9; }
	if(back_type && (screen.width == 1366)){
		switch(language){
			case "en":
				curleft += 18;
				break;
		}
		curleft -= 9;
	}
	if(screen.width != 1366){
		if(lang == "en_pi"){ curleft -= 2; }
		curtop += 8;
	}

	return [curtop,curleft];
}
function addStyle(css) {									//Add styles using GM or via native javascript
	if (typeof GM_addStyle !== 'undefined'){
		return GM_addStyle(css);
	}
	else if (heads = document.getElementsByTagName('head')){
		var style = document.createElement('style');
		try{
			style.innerHTML = css;
		}catch(x){
			style.innerText = css;
		}
		style.type = 'text/css';
		heads[0].appendChild(style);
	}
} //==>addStyle
function toggleExtras(){									//Toggle the extras drop
	if(document.getElementById('fbgo_extras_hidden').style.display == 'none'){
		document.getElementById('fbgo_extras_hidden').style.display = '';
		document.getElementById('fbgo_extras').style.borderRadius = '3px 3px 0 0';
		document.getElementById('fbgo_location_hidden').style.display = 'none';
		document.getElementById('fbgo_location_toggle').style.borderRadius = '3px 3px 3px 3px';
		document.getElementById('fbgo_last_hidden').style.display = 'none';
		document.getElementById('fbgo_last_toggle').style.borderRadius = '3px 3px 3px 3px';
	} else {
		document.getElementById('fbgo_extras_hidden').style.display = 'none';
		document.getElementById('fbgo_extras').style.borderRadius = '3px 3px 3px 3px';
	}
} //==>toggleExtras
function toggleLocation(){									//Toggle the button location drop
	if(document.getElementById('fbgo_location_hidden').style.display == 'none'){
		document.getElementById('fbgo_location_hidden').style.display = '';
		document.getElementById('fbgo_location_toggle').style.borderRadius = '3px 3px 0 0';
		document.getElementById('fbgo_extras_hidden').style.display = 'none';
		document.getElementById('fbgo_extras').style.borderRadius = '3px 3px 3px 3px';
		document.getElementById('fbgo_last_hidden').style.display = 'none';
		document.getElementById('fbgo_last_toggle').style.borderRadius = '3px 3px 3px 3px';
	} else {
		document.getElementById('fbgo_location_hidden').style.display = 'none';
		document.getElementById('fbgo_location_toggle').style.borderRadius = '3px 3px 3px 3px';
	}
} //==>toggleLocation
function toggleLast(){										//Toggle the last (other) drop
	if(document.getElementById('fbgo_last_hidden').style.display == 'none'){
		document.getElementById('fbgo_last_hidden').style.display = '';
		document.getElementById('fbgo_last_toggle').style.borderRadius = '3px 3px 0 0';
		document.getElementById('fbgo_extras_hidden').style.display = 'none';
		document.getElementById('fbgo_extras').style.borderRadius = '3px 3px 3px 3px';
		document.getElementById('fbgo_location_hidden').style.display = 'none';
		document.getElementById('fbgo_location_toggle').style.borderRadius = '3px 3px 3px 3px';
	} else {
		document.getElementById('fbgo_last_hidden').style.display = 'none';
		document.getElementById('fbgo_last_toggle').style.borderRadius = '3px 3px 3px 3px';
	}
} //==>toggleLast
function toggleSettings(){									//Toggle the settings dialog box
	if(document.getElementById('fbgo_settings_box').style.display == 'none'){
		if(buttonLocation == 1){
			document.getElementById("navAccount").setAttribute("class", "")
		}
		scroll(0,0);
		if(back_type){
			addStyle("body{overflow: hidden;}");
		} else {
			document.getElementById('fbgo_settings_box').style.position = 'fixed';
		}
		document.getElementById('fbgo_settings_box').style.display = '';
		document.getElementById('fbgo_back').style.display = '';

		
	} else {
		document.getElementById('fbgo_settings_box').style.display = 'none';
		document.getElementById('fbgo_back').style.display = 'none';
		document.getElementById('fbgo_extras_hidden').style.display = 'none';
		document.getElementById('fbgo_extras').style.borderRadius = '3px 3px 3px 3px';
		document.getElementById('fbgo_location_hidden').style.display = 'none';
		document.getElementById('fbgo_location_toggle').style.borderRadius = '3px 3px 3px 3px';
		document.getElementById('fbgo_last_hidden').style.display = 'none';
		document.getElementById('fbgo_last_toggle').style.borderRadius = '3px 3px 3px 3px';
		addStyle("body{overflow: visible;}");
	}
} //==>toggleSettings
function imp(){												//Save imported settings

	var impData = document.getElementById("fbgo_import_field").value;
	if(impData){
		if(DEBUG){alert(impData);}
		    a=[];
		impData.split(/\n/).forEach(function (str) {
		    var m;
		    if (m = /^\s*(\w+)\s*:\s*(.*)/.exec(str)) {
			alert("GM_setValue(" + m[1] + ", " + m[2] + ");");
			GM_setValue(m[1], m[2]);					//must use GM setting name for m[1]
		    }
		});
		toggleImpDlg();
		location.reload();
	} else {
		alert(langText("importError"));
	}
} //==>import
function toggleImpDlg(){									//Toggle import dialog box
	if(document.getElementById("fbgoImpContainer").style.display == "none"){
		toggleSettings();
		document.getElementById("fbgoImpContainer").style.display = "";
		document.getElementById("fbgo_imp_back").style.display = "";
		addStyle("body{overflow: hidden;}");
	} else {
		toggleSettings();
		document.getElementById("fbgoImpContainer").style.display = "none";
		document.getElementById("fbgo_imp_back").style.display = "none";
		addStyle("body{overflow: visible;}");
	}
} //==>toggleImportDlg
function exp(){												//Export settings
//	alert(langText("exportWarning"));
	var expData = "\"option\": \"" + GM_getValue("option") + "\"";
	expData += "\n\"url\": \"" + GM_getValue("url") + "\"";
	expData += "\n\"grad\": \"" + GM_getValue("grad") + "\"";
	expData += "\n\"buttonLocation\": " + GM_getValue("buttonLocation");
	expData += "\n\"fixedHead\": " + GM_getValue("fixedHead");
	expData += "\n\"hideChat\": " + GM_getValue("hideChat");
	expData += "\n\"repeat\": " + GM_getValue("repeat");
	expData += "\n\"enhNotifs\": " + GM_getValue("enhNotifs");
	expData += "\n\"back_type\": " + GM_getValue("back_type");
	expData += "\n\"adHide\": " + GM_getValue("adHide");
	alert(langText("exportMsg"));
	alert(expData);
} //==>export
function excludes(){										//Check URL's to see if background should be changed
	if(DEBUG){alert("DEBUG ON");}					//Put it here so it only triggers once.
													//But it wont affect you unless you have enable debugging.
	var site = String(window.location);

	if(site.match(/\/editaccount\.php/i)){
//		site = undefined;
		if(DEBUG){alert("\'editaccount.php\' detected.\n" + site);}
		return false;
	} else if(site.match(/\/mobile/i)) {
//		site = undefined;
		if(DEBUG){alert("\'/mobile\' detected.\n" + site);}
		return false;
	}
	else if(site.match(/\/help/i)) {
//		site = undefined;
		if(DEBUG){alert("\'/help\' detected.\n" + site);}
		return false;
	}
	else if(site.match(/\/photo\.php/i)){
//		site = undefined;
		if(DEBUG){alert("\'photo.php\' detected.\n" + site);}
		return false;
	}
	else if(site.match(/\/editphoto\.php/i)){
//		site = undefined;
		if(DEBUG){alert("\'editphoto.php\' detected.\n" + site);}
		return false;
	}
	else if(site.match(/\/permalink\.php/i)){
//		site = undefined;
		if(DEBUG){alert("\'permalink.php\' detected.\n" + site);}
		return false;
	}
	else if(site.match(/\/posts\//i)){
		if(DEBUG){alert("\'/posts/\' detected.\n" + site);}
		return false;
	}
	else{
//		site = undefined;
		if(DEBUG){alert("Altering Background\nNothing detected.\n" + site);}
		return true;
	}
} //==>excludes
function reset(){											//Reset settings to default
	if(confirm(langText("confirmReset"))){
		GM_setValue("option", "off");
		GM_setValue("url", "http://www.vsdonline.com/files/Image/wallpapers/vsd-blue-radial-gradient.png");
		GM_setValue("grad", "-moz-linear-gradient(center top , #1E5799 0%, #2989D8 50%, #207CCA 51%, #7DB9E8 100%)");
		GM_setValue("fixedHead", false);
		GM_setValue("hideChat", false);
		GM_setValue("repeat", false);
		GM_setValue("back_type", false);
		GM_setValue("enhNotifs", false);
		GM_setValue("buttonLocation", 1);
		location.reload();
	}
} //==>reset
function update(){											//User checks for updates
		if(DEBUG){alert("Update");}
		document.getElementById("fbgo_last_toggle").style.borderRadius = "3px 3px 3px 3px";
		document.getElementById("fbgo_last_hidden").style.display = "none";
//		window.open("http://userscripts.org/scripts/show/101915", "_newtab");
		updateCheck(true);
//	}
} //==>update
function settingsSave(){									//Save settings
	toggleSettings();
	GM_setValue("option", document.getElementById("fbgo_option").value.toLowerCase());
	if(document.getElementById("fbgo_url").value != ""){
		GM_setValue("url", document.getElementById("fbgo_url").value);
	}
	if(document.getElementById("fbgo_grad").value != ""){
		GM_setValue("grad", document.getElementById("fbgo_grad").value);
	}
	if(document.getElementById("radioLocation0").checked == true){
		GM_setValue("buttonLocation", 0);
	} else if(document.getElementById("radioLocation1").checked == true){
		GM_setValue("buttonLocation", 1);
	}
	GM_setValue("fixedHead", document.getElementById("fbgo_fixed").checked);
	GM_setValue("hideChat", document.getElementById("fbgo_hideChat").checked);
	GM_setValue("repeat", document.getElementById("fbgo_repeat").checked);
	GM_setValue("enhNotifs", document.getElementById("fbgo_enhance").checked);
	GM_setValue("back_type", document.getElementById("fbgo_back_type").checked);
	GM_setValue("adHide", document.getElementById("fbgo_hideAds").checked);
	document.getElementById("fbgo_settings_box").style.display = "none";
	location.reload();
} //==>settingsSave
}

function listeners(){
	if(DEBUG){ alert("Listeners"); }
	document.getElementById("fbgo_settings").addEventListener("click",toggleSettings,false);
	document.getElementById("fbgo_save").addEventListener("click",settingsSave,false);
	document.getElementById("fbgo_cancel").addEventListener("click",toggleSettings,false);
	document.getElementById("fbgo_extras").addEventListener("click",toggleExtras,false);
	document.getElementById("fbgo_location_toggle").addEventListener("click",toggleLocation,false);
	document.getElementById("fbgo_back").addEventListener("click",toggleSettings,false);
	document.getElementById("fbgo_last_toggle").addEventListener("click",toggleLast,false);
	document.getElementById("fbgo_update").addEventListener("click",update,false);
	document.getElementById("fbgo_reset").addEventListener("click",reset,false);
	document.getElementById("fbgo_exp").addEventListener("click",exp,false);
	document.getElementById("fbgo_imp").addEventListener("click",toggleImpDlg,false);
	document.getElementById("fbgoImpSubmit").addEventListener("click",imp,false);
	document.getElementById("fbgoImpCancel").addEventListener("click",toggleImpDlg,false);
}
function insertDrop(){
	if(DEBUG){ alert("insertDrop"); }
	dropZIndex = parseInt(settingsZIndex) + 1;
	var checkSelectDrop = '\r\n<div id="fbgo_extras_hidden" class="checkSelectDrop" style="display:none;z-index: ' + dropZIndex + ';top:' +
		findPos(1)[0] + 'px;left:' + findPos(1)[1] + 'px;position: fixed !important">\r\n<table>\r\n<tbody>\r\n<tr class="option">\r\n<td' +
		'>\r\n<input id="fbgo_fixed" type="checkbox"' + fixedHeader + ' />\r\n</td>\r\n<td class="option">\r\n<label for="fbgo_fixed" class' +
		'="checkSelectDropLabel">' + langText("extrasFix") + '</label>\r\n</td>\r\n</tr>\r\n<tr class="optionHeavy"><td><input id="fbgo_hid' +
		'eChat" type="checkbox" ' + hideChat + '/></td><td><label for="fbgo_hideChat" class="checkSelectDropLabel">' + langText("extrasHide") +
		'</label></td></tr><tr class="option">\r\n<td>\r\n<input id="fbgo_repeat" type="checkbox" ' + repeatCheck + '/>\r\n</td>\r\n<td class="o' +
		'ption">\r\n<label for="fbgo_repeat" class="checkSelectDropLabel">' + langText("extrasRepeat") + '</label>\r\n</td>\r\n</tr>\r\n<tr' +
		' class="optionHeavy">\r\n<td>\r\n<input id="fbgo_enhance" type="checkbox" ' + notificationEnhanced + '/>\r\n</td>\r\n<td class="op' +
		'tion">\r\n<label for="fbgo_enhance" class="checkSelectDropLabel">' + langText("extrasEnhance") + '</label>\r\n</td>\r\n</tr><tr cl' +
		'ass="option"><td><input type="checkbox" id="fbgo_back_type"' + fbgo_back_checked + '/></td><td class="option"><label class="checkS' +
		'electDropLabel" for="fbgo_back_type" title="' + langText("extrasFullTitle") + '">' + langText("extrasFull") + '</label></td></tr>' +
		'<tr class="optionHeavy"><td><input id="fbgo_hideAds" type="checkbox"' + adsCheckBox + ' />\r\n</td><td><label class="checkSelectDr' +
		'opLabel" for="fbgo_hideAds">' + langText("hideAds") + '</label></td></tr>\r\n</tbody>\r\n</table>\r\n</div>';
	var checkRadioDrop = '\r\n<div id="fbgo_location_hidden" class="checkSelectDrop" style="display:none;z-index: ' + dropZIndex + ';top:' +
		findPos(2)[0] + 'px;left:' + findPos(2)[1] + 'px;position: fixed !important">\r\n<table>\r\n<tBody>\r\n<tr class="option">\r\n<td' +
		'>\r\n<input type="radio" id="radioLocation0" name="radioLocation" value="0"' + radioLocation0 + '></td><td class="option"><label f' +
		'or="radioLocation0" class="checkSelectDropLabel">' +langText("locationHome") + '</label></td></tr><tr class="optionHeavy"><td><inp' +
		'ut type="radio" id="radioLocation1" name="radioLocation" value="1"' + radioLocation1 + '></td><td class="option"><label for="radio' +
		'Location1" class="checkSelectDropLabel">' + langText("locationAcct") + '</label></td></tr></tBody></table></div>';
	var checkLastDrop = '\r\n<div id="fbgo_last_hidden" class="checkSelectDrop" style="display:none;z-index: ' + dropZIndex + '; left:' +
		findPos(3)[1] + 'px; top:' + findPos(3)[0] + 'px; width: 133px;position: fixed !important">\r\n<table>\r\n<tBody>\r\n<tr id="fbgo' +
		'_update" class="option">\r\n<td style="background-color: white;"></td>\r\n<td class="option"><label class="checkSelectDropLabel">' +
		langText("lastUpdate") + '</label></td>\r\n</tr>\r\n<tr id="fbgo_reset" class="optionHeavy">\r\n<td style="background-color: white;' +
		'"></td>\r\n<td class="option"><label class="checkSelectDropLabel">' + langText("lastReset") + '</label></td>\r\n</tr>\r\n<tr id="f' +
		'bgo_exp" class="option"><td style="background-color: white;"></td>\r\n<td class="option">\r\n<label class="checkSelectDropLabel">' +
		langText("lastExport") + '</label>\r\n</td>\r\n</tr>\r\n<tr id="fbgo_imp" class="optionHeavy"><td style="background-color: white' +
		';"></td>\r\n<td class="option">\r\n<label class="checkSelectDropLabel">' + langText("lastImport") + '</label>\r\n</td>\r\n</tr>\r' +
		'\n</tBody>\r\n</table>\r\n</div>';
	document.body.innerHTML += checkSelectDrop + checkRadioDrop + checkLastDrop;
	listeners();
}
/*Insert data into page*/{
	if(DEBUG){ alert("insert"); }
	document.body.id = "fbBody";
	
	addStyle(checkSelectBoxCss);
	
	if(fixedHead){
		var fixedHeader = ' checked="checked" ';
	} else {
		var fixedHeader = '';
	}
	if(hideChat){
		addStyle(".fbDockWrapperRight { display: none; } .sidebarMode #globalContainer { left: 0; }");
		var hideChat = ' checked="checked" ';
	} else {
		var hideChat = "";
	}
	if(repeat){
		var repeatCheck = ' checked="checked" ';
		var repeatType = "";
	} else {
		var repeatCheck = '';
		var repeatType = "no-";
	}
	if(notificationEnhanced){
		var notificationEnhanced = ' checked="checked" ';
	} else {
		var notificationEnhanced = '';
	}
	if(back_type){
		var fbgo_back_checked = " checked='checked' ";
	} else {
		var fbgo_back_checked = "";
	}
	if(option == "off"){
		var opt_off = " selected=\"selected\" ";
		var opt_url = "";
		var opt_grad = "";
	} else if(option == "url") {
		var opt_url = " selected=\"selected\" ";
		var opt_off = "";
		var opt_grad = "";
	} else if(option == "gradient") {
		var opt_grad = " selected=\"selected\" ";
		var opt_off = "";
		var opt_url = "";
	}
	if(adHide){
		addStyle(".ego_column {\ndisplay: none;\n}");
		var adsCheckBox = " checked=\"checked\"";
	} else {
		var adsCheckBox = "";
	}
	if(buttonLocation == 1) {
		document.getElementById('navAccount').childNodes[1].childNodes[2].innerHTML += "<li><a id='fbgo_settings'>" + langText("liConfigureTab") +
			"</a></li>";
		var radioLocation0 = "";
		var radioLocation1 = " checked = 'checked' ";
	} else {
		document.getElementById("headNav").innerHTML += "<a class='fbgo' id='fbgo_settings'><div class='fbgo'> </div></a>";
		var radioLocation0 = " checked = 'checked' ";
		var radioLocation1 = "";
	}
	
	var checkSelectToggle = '<div class="checkSelectButton" id="fbgo_extras">\r\n<div class="checkSelectLabel">\r\n<label for="fbgo_extras"' +
					' style="padding-left:4px;-moz-user-select: none;cursor: default;">' + langText("selectOptnOptn") + '</label>\r\n</div>' +
					'\r\n<div>\r\n<label id="buttonImage" for="fbgo_extras">\r\n<img class="checkSelectImage">\r\n</label>\r\n</div></div>';
	var checkRadioToggle = '<div class="checkSelectButton" id="fbgo_location_toggle">\r\n<div class="checkSelectLabel">\r\n<label for="fbgo' +
					'_location_toggle" style="padding-left: 4px;-moz-user-select: none;cursor: default;">' + langText("labelBtnLoc") + '</l' +
					'abel>\r\n</div>\r\n<div>\r\n<label id="buttonImage" for="fbgo_location_toggle">\r\n<img class="checkSelectImage">\r\n<' +
					'/label>\r\n</div></div>';
	var checkLastToggle = '<div class="checkSelectButton" id="fbgo_last_toggle" style="width: 125px;">\r\n<div class="checkSelectLabel" sty' +
					'le="width: 99px;">\r\n<label for="fbgo_last_toggle" style="padding-left: 4px;-moz-user-select: none;cursor: default;">' +
					langText("lastFace") + '</label>\r\n</div>\r\n<div>\r\n<label id="buttonImage" for="fbgo_last_toggle">\r\n<img class="c' +
					'heckSelectImage">\r\n</label>\r\n</div></div>';

	if(back_type == true){										//Insert full screen background
		if(DEBUG){alert("back");}
		var fbgo_back_type = " style='background: none;' ";
		var fbgo_back_type2 = '<div style="left: 0pt; top: 0pt; width: 100%; height: 100%; z-index: 104; background: none repeat scroll 0pt' +
					' 0pt rgba(82, 82, 82, 0.8); display: none; position: fixed;" id="fbgo_back"></div>';
		var settingsZIndex = '105';
	} else {
		var fbgo_back_type = "";
		var fbgo_back_type2 = "<div style='display: none;position: relative; z-index: -1;' id='fbgo_back'></div>";
		var settingsZIndex = '10';
	}
	
	var fbgo_import_back_type = '<div style="left: 0pt; top: 0pt; width: 100%; height: 100%; background: none repeat scroll 0pt 0pt rgba(82' +
					', 82, 82, 0.8); position: fixed;z-index: 105;display: none;" id="fbgo_imp_back"></div>';
	
	id = document.getElementById("pageNav").childNodes[1].innerHTML.match(/[.\w]+/g)[6];
	if(id == "profile.php"){ id = ""; }						//If profile ID includes profile.php (ie. uses old 'number ID' system), empty ID
	if(DEBUG){												//Create a random profile name if debugging
		switch(Math.floor(Math.random()*4)){
			case 0:
				id = "SunnyD&Rum";
				break;
			case 1:
				id = "Reborn.Sparrow";
				break;
			case 2:
				id = "Unique_Snake";
				break;
			case 3:
				id = "Der-Prisoner";
				break;
		}
	}
	
	document.body.innerHTML += '<div id="fbgo_settings_box" class="generic_dialog pop_dialog" tabindex="0" role="alertdialog" aria-labelled' +
					'by="title_dialog_1" style=";z-index: ' + settingsZIndex + ';display:none;"><div class="generic_dialog_popup" style="to' +
					'p: 125px; width: 467px;"><div class="pop_container_advanced"' + fbgo_back_type + '><div id="pop_content" class="pop_co' +
					'ntent"><h2 class="dialog_title secure" id="facebook_background_options"><span style="-moz-user-select:none;">' +
					langText("fbgoTitle") + '</span><span style="-moz-user-select: none; padding: 0pt 0pt 0pt 10px; margin: 0pt; float: rig' +
					'ht; position: relative; top: -19px; right: 21px; font-size: 10px; font-weight: normal; color: rgb(167, 183, 217);">' +
					id  + '</span></h2><div class="dialog_content" style="border:none;"><div class="dialog_body"><div class="UIImageBlock_C' +
					'ontent UIImageBlock_MED_Content"><table><tBody><tr><td style="width 68px;"><label for="fbgo_option" style="-moz-user-s' +
					'elect:none;">' + langText("labelOption") + ':</td><td colspan="3"><select id="fbgo_option"><option title="' +
					langText("selectOptnOffttl") + '" value="off"' + opt_off + '>' + langText("selectOptnOff") + '</option><optgroup title="' +
					langText("selectOptnttl") + '" label="' + langText("selectOptnOptn") + '"><option title="' + langText("selectOptnURLttl") +
					'" value="url"' + opt_url + '> ' + langText("labelURL") + ' </option><option title="' + langText("selectOptnCSSttl") +
					'" value="gradient"' + opt_grad + '> ' + langText("labelGradient") + ' </option></optgroup></select></td></tr><tr><td s' +
					'tyle="width 68px;"><label for="fbgo_url" style="-moz-user-select:none;">' + langText("labelURL") + ':</label></td><td ' +
					'colspan="3"><input type="text" id="fbgo_url" style="width: 320px;" value="' + url + '" onclick="this.select();" /></td' +
					'></tr><tr><td style="width 68px;"><label for="fbgo_grad" style="-moz-user-select:none;">' + langText("labelGradient") +
					':</label></td><td colspan="3"><input type="text" id="fbgo_grad" style="width: 320px;" value="' + grad + ' "onclick="th' +
					'is.select();" /></td></tr><tr><td><label for="fbgo_extras" style="-moz-user-select:none;">' + langText("labelExtras") +
					':</label></td><td>' + checkSelectToggle + '</td></tr><tr><td><label for="fbgo_location" style="-moz-user-select:none;"' +
					'>' + langText("labelBtnLoc") + ':</label></td><td>' + checkRadioToggle + '</td></tBody></table></div></div></div><div ' +
					'class="dialog_buttons clearfix"><div style="float: left; text-align: left;">' + checkLastToggle + '<a href="http://www' +
					'.colorzilla.com/gradient-editor/" target="_tab" style="padding: 1px;margin:1px 0 0 1px;-moz-user-select:none;">' +
					langText("aGrad") + '</a></div><label style="-moz-user-select:none;" class="uiButton uiButtonLarge uiButtonConfirm"><in' +
					'put type="button" id="fbgo_save" name="ok" value="' + langText("btnSave") + '"></label><label style="-moz-user-select:' +
					'none;" class="uiButton uiButtonLarge uiButtonCancel"><input type="button" id="fbgo_cancel" name="cancel" value="' +
					langText("btnCancel") + '"></label></div></div></div></div></div>' + fbgo_back_type2;
	document.body.innerHTML += '<div id="fbgoImpContainer" style="display:none;"><div id="fbgoImpDlg" class="fbgoImportDlg"><div style="fon' +
					't-weight:bold;margin: 20px 30px;-moz-user-select:none;">' + langText("importTextMsg") + '</div><div style="margin:10px' +
					' 30px;"><textarea id="fbgo_import_field" style="max-width: 98%;min-width: 98%;min-height:100px;height: 135px;"></texta' +
					'rea></div><div style="float: right; background: none repeat scroll 0% 0% rgb(242, 242, 242); width: 100%; border-top: ' +
					'1px solid rgb(230, 230, 230);"><div style="padding: 10px;text-align: right;"><input type="button" id="fbgoImpSubmit" v' +
					'alue="' + langText("btnSubmit") + '" style="width: 80px;height:30px;">&nbsp;<input type="button" id="fbgoImpCancel" va' +
					'lue="' + langText("btnCancel") + '" style="width: 80px;height:30px;"></div></div></div>' + fbgo_import_back_type +
					'</div>';

	var offsetX = document.getElementById("pageNav").offsetWidth;
	if(document.getElementById('pageNav').childNodes[2].innerHTML != ""){	//Locate where button should be inserted (If location is home)
		var left = 781 - offsetX;
		var right = 411;
	} else {
		var left = 781 - offsetX;
		var right = 200;
	}
	
	if(fixedHead){												//CSS to place the toolbar image
		if(DEBUG){alert("Fixed");}
		css = "#globalContainer {\n	position:relative !important;\n	margin:0 auto !important;\n}\n\n#blueBar {\n	position:fixed !importa" +
				"nt;\n		top:0px !important;\n	margin:0 auto !important;\n	z-index:13 !important;\n}\n\n#blueBar.loggedOut {\n	positio" +
				"n:absolute !important;		\n}\n\n#pageHead {\n	position:relative !important;\n	width: auto" +
				" !important;\n	margin:0 auto 31px auto !important;\n        z-index:13 !important;\n}\n\n#pageLogo, #jewelContainer {\n" +
				" 	position:fixed !important;\n}\n\n#pageLogo {\n	z-index: 5;\n}\n\n#fbJewelCaseLinksContainer {  \n"  +
				"	margin-left:97px !important;\n }\n\n#headNav {\n	position:fixed !important;\n	width:8" +
				"05px !important;\n}\n\ndiv#options_button {\n	position:absolute !important;\n	    left:-212px !important;\n	    top:-1p" +
				"x !important;\n}\n\n#jewelContainer {\n	position:fixed !important;\n	height:40px !import" +
				"ant;margin-left: 97px !important;\n}\n\n";
		addStyle(css);
		css = "a.fbgo { color: #3B5998; cursor: pointer; text-decoration: none; }" +
				"a.fbgo { height: 35px; width: 24px; left: " + left + "px !important; position: absolute !important; background: url(" +
				toolimage + ") no-repeat scroll 3px 10px transparent;} a.fbgo:hover { background-color:#4B67A1; outline: medium none; }" +
				"td #head{ width: 60px;}";
	} else {
		css = "a.fbgo { color: #3B5998; cursor: pointer; text-decoration: none; }" +
				"a.fbgo { height: 35px; width: 24px; right: " + right + "px !important; position: absolute !important" +
				"; background: url(" + toolimage + ") no-repeat scroll 3px 10px transparent;} a.fbgo:hover { background-color:#4B67A1; outli" +
				"ne: medium none; } td #head{ width: 60px;}";
	}

	if(notificationEnhanced){									//Insert CSS for richer notifications colours
		if(DEBUG){alert("Notifications");}
		css += ".fbJewelFlyout li.jewelItemNew { background: none repeat scroll 0 0 #DFE1E7 }";
		css += ".GBThreadRow .unread{ background-color: #DFE1E7; }";
	}
	addStyle(css);
	addStyle(".GBSearchBox_Input{ height: 19px; }");			//Fixes that annoying search box under messages
	
	//and fix styles
	if(option.toLowerCase() != "off" && excludes()){
	
		//Choose background option
		if(option.toLowerCase() == "url")
		{
			if(repeat)
			{
				document.body.style.background = "url("+ url +") " + repeatType + "repeat fixed 0 0 transparent";
			} else {
				document.body.style.background = "url("+ url +") no-repeat fixed 0 0 transparent";
			}
		} else if(option.toLowerCase() == "gradient") {
			document.body.style.background = grad + " no-repeat fixed 0 0 transparent";
		}
	
		document.getElementById("mainContainer").style.borderRight = "0";
		document.getElementById("mainContainer").style.marginLeft = "0";
		document.getElementById("content").style.position = "relative";	//Just to fix up a styling problem and one created by step above
		document.getElementById("content").style.right = "1px";
	
		if(document.getElementById("leftCol"))
		{
			document.getElementById("leftCol").style.background = "#FFFFFF";
			
		} else if(DEBUG == 1) {
			alert("No leftCol");
		}
	
		if(document.getElementById("content") != null)
		{
			document.getElementById("content").style.background = "#FFFFFF";
			if(document.getElementById("leftCol") == null)
			{
				document.getElementById("content").style.paddingLeft = "10px";
			}
		}
		
		if(document.getElementById("pageFooter") != null)
		{
			document.getElementById("pageFooter").style.background = "none repeat scroll 0 0 white";
			document.getElementById("pageFooter").style.borderLeft = "1px solid #B3B3B3";
			document.getElementById("pageFooter").style.position = "relative";
			document.getElementById("pageFooter").style.right = "1px";
			if(document.getElementById("contentCurve") != null)
			{
				document.getElementById("contentCurve").style.borderRight = "1px solid white";
				document.getElementById("contentCurve").style.borderBottom = "1px solid #DEDEDE";
			}
		}
	}
	insertDrop();
}
updateCheck();