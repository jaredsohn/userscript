// ==UserScript==
// @name           Emotiworld (MOD)
// @author         Emotiworld (Modified by Адреналин)
// @namespace      ikariam
// @version        0.2.6.2
// @downloadURL    https://userscripts.org/scripts/source/132782.user.js
// @updateURL      https://userscripts.org/scripts/source/132782.meta.js
//
// @include        http://s*.ikariam.com/index.php*
//
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.js
// @require        http://ajax.googleapis.com/ajax/libs/jqueryui/1.6/jquery-ui.min.js
//
// @history        0.2.6 07/03/2012 Converts URLs into links.
// @history        0.2.5 07/03/2012 Localised numbers in combat reports. Chrome fix.
// @history        0.2.4 07/03/2012
//                  - Combat reports from Ikariam CR Converter detection and enhancement.
//                  - Add links on island coordinates like [47:71]
// @history        0.2.3 05/03/2012 Reply to all buton. Minor bug fix.
// @history        0.2.2 04/26/2012 Languages : de, es, it, ro, ru
// @history        0.2.1 04/21/2012 Minor bug fix
// @history        0.2 04/21/2012 Updated for future ikariam 0.5.0
// @history        0.1 04/13/2012 Initial release
// ==/UserScript==

/**
 * Adds an emoticon toolbar to the send message pages.
 */


jQuery.fn.extend({
// Ça marche aussi dans un text input.
insertAtCaret: function(myValue){
  return this.each(function(i) {
    if (document.selection) {
      //For browsers like Internet Explorer
      this.focus();
      sel = document.selection.createRange();
      sel.text = myValue;
      this.focus();
    }
    else if (this.selectionStart || this.selectionStart == '0') {
      //For browsers like Firefox and Webkit based
      var startPos = this.selectionStart;
      var endPos = this.selectionEnd;
      var scrollTop = this.scrollTop;
      this.value = this.value.substring(0, startPos)+myValue+this.value.substring(endPos,this.value.length);
      this.focus();
      this.selectionStart = startPos + myValue.length;
      this.selectionEnd = startPos + myValue.length;
      this.scrollTop = scrollTop;
    } else {
      this.value += myValue;
      this.focus();
    }
  })
},
fixedHeight:function(myValue) {
	this.css('height', this.css('height'));
}
});


var emotiworldb64gear = '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';
var emotiworldb64arrow = 'iVBORw0KGgoAAAANSUhEUgAAAAYAAAAJCAYAAAARml2dAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wEDA0SC/GAVYQAAABfSURBVAjXZcy7CYVAEIXhz2UDkVuAYCCsBViPFRoaW4z5tmBm4ASL98BhHuef6UopMGL3akNNsTzQhw+MGad/nRlrDFfUBXJD/dqTNhi+wf35f0PCHEDrOaFiCihFXx9hbQshbewXAQAAAABJRU5ErkJggg==';
var emotiworldb64trash = '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';
var emotiworldb64tsu = 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wFBwE1ASjrWSoAAAJ1SURBVDjLdZOxS+tQFIdPkzeIZnIwIDgpZKqLkwgOgotQEBElz6IicXERKjhIQaSTWwl1cRR9/gGliwqKVrGjiEQFqUTBtota6xDb5HtT+9on/sZz7/fdyz3nhgD5L1qlUomcn59H8/n8WBAE5Z6enuzQ0NBuZ2dnWkQqzZtDzYK3tzczkUj8eX19lZGREenr6xNFUeTx8VFOTk7E931ZX1//3d3dvd+AAAHk7u4uMT4+juM4/JSnpyempqa4uLhI1DkBpFgsmhMTE5TL5Rbg4+Pjm+Tr64toNIrjOGZdoFmWheu63N/fUyqVAFhZWSEcDlOtVhvw2dkZo6OjOI7D5OQkgCYPDw/m6uoqQRBgGAZzc3MAOI6DqqqkUqmGYGtrC03TCIKAVCrF8fGxKbZtZ3K5HAB7e3soisL19TUAMzMz9ZMAmJ2dZXh4GIBCoUAsFsvI0tLSe6VSAaBWq9Hb24tt2wB8fn42YN/30XWdjY2NZuH7L8/zpK2tTUREVFWVq6sr6ejoEBGR9vb2RrcymYwUi0WZnp7+NwOhkCi6rmdfXl4axTrcnGq1KvF4XCKRiBiGISIitVpNFEXJKoODg7unp6fyUzzPk/n5eXFdV5LJZKOey+VkYGBgVzzP05ofqjmHh4f09/fT1dXF5eVly9rCwgKlUkkTQPb3983mdtm2TTgcJhQKYZomhUKhBU6n02xubjYGSQBZW1tL7OzsAHB0dMTy8jI3NzffbnVwcIBlWQnf96VFAEgymTQXFxe5vb39BrquSywWIx6Pm3UYaP2NIiLPz8/a9vZ2JJ/PR1VVHRORchAEWV3Xdy3LShuG0fKd/wKIflsQjb0xtQAAAABJRU5ErkJggg==';

GM_addStyle(".emotiworldIcon { float:left; line-height:1.5em } \
	#emotiworldConfig, .emotiworldButton { padding:1px 5px; border:solid 1px; cursor:default} \
	#emotiworldConfig:hover, .emotiworldButton:hover { background-color:rgba(0,0,0,0.15) } \
	#emotiworldConfig { float:right; border-radius:5px; background:url(data:image/png;base64,"+emotiworldb64gear+") 50% 50% no-repeat; width:24px; height:24px} \
	#emotiworldBar { position:relative } \
	#emotiworldPanel { position:absolute; display:none; background-color:#fff7e1; border-style:solid; border-width:2px 1px; width:500px; z-index:100001;padding:5px 5px; top:28px; } \
	#emotiworldPanel a { color:#434a93; text-decoration:underline; } \
	#emotiworldSortable { list-style-type:none; width:167px; border:solid 1px; float:left; height:100% } \
	#emotiworldSortable li { padding-left:15px; background:url(data:image/png;base64,"+emotiworldb64arrow+") 5px 50% no-repeat; border:solid 1px #909090; margin:1px 0; line-height:1.3em; width:150px; cursor:move; text-align:center} \
	#emotiworldTrash { background:url(data:image/png;base64,"+emotiworldb64trash+") 50% 50% no-repeat; width:165px; border:solid 1px; float:left; margin:0 5px; height:100% } \
	#emotiworldTrash li { padding-left:15px; margin:2px 0; cursor:move; background:url(data:image/png;base64,"+emotiworldb64arrow+") 5px 50% no-repeat; text-align:center} \
	.emotiworldTransparent { opacity:0.4 } \
	.emotiworldDark { background-color:red!important; background-image:none !important; } \
	#emotiworldPanelRight {  } \
	#emotiworldClose { position:absolute; bottom:5px; right:5px} \
	#emotiworldOverlay {opacity:0.4;position:fixed;top:0;left:0;background-color:black;width:100%;height:100%;z-index:100000;display:none} \
	div.emotiworldUndo { position:absolute; right:3px; top:2px; width:12px; height:18px; border-radius:3px; background:url(data:image/png;base64,"+emotiworldb64tsu+") 50% 50% no-repeat; } \
	div.emotiworldCR { position:relative; } \
	div.emotiworldCRNice { border-top:solid 1px black; border-bottom:solid 1px black } \
	div.emotiworldCRIcon { position:absolute; background:url(/skin/advisors/military/bang_soldier.gif); width:35px; height:38px } \
	div.emotiworldCRRaw { display:none } \
	table.CRLosses { margin:1em auto auto auto } \
	table.CRSummary { margin:auto auto 1em auto } \
	table.CRLosses td, table.CRSummary td { padding:0px 10px!important } \
	table.CRLosses td.attacker, table.CRSummary td.attacker { color:#700000 } \
	table.CRLosses td.defender, table.CRSummary td.defender { color:#007000} \
	table.CRLosses td.unitsleft { color:#000; text-align:right!important } \
	table.CRLosses td.unitslost { color:#a00000; text-align:right!important } \
	table.CRLosses td.spacer, table.CRSummary td.spacer { width:30px } \
	table.CRSummary td.alignright { text-align:right!important } \
	td.msgText a { color:#00e } \
");

var Emotiworld = new function() {
	var lang = null;
	var textarea = null;
	var icons = null;
	var overlay = false;	// true to make the config panel modal
	var configPanelPresent = false;

	this.languageData = {
		'en':{
			manage:'Manage your emoticons',
			add:'Add',
			findIcons:'Find new emoticons on [link]',
			close:'Close',
			replyToAll:'Reply to all',
			CRUndoTitle:'Emotiworld has found a combat report. Click here to revert to basic message.'
		},
		'ru':{
			manage:'Управление смайликами',
			add:'Добавить',
			findIcons:'Найти новых смайликов по [link]',
			close:'Закрыть',
			replyToAll:'Ответить всем',
			CRUndoTitle:'Мы нашли новый боевой доклад. Нажмите здесь чтоб вернуться к основному сообщению.'
		},
		'fr':{
			manage:'Gérer les émoticônes',
			add:'Ajouter',
			findIcons:"Trouver d'autres émoticônes sur [link]",
			close:'Fermer',
			replyToAll:'Répondre à tous',
			CRUndoTitle:'Emotiworld a trouvé un rapport de combat. Cliquez ici pour revenir au message de base.'
		},
		'de':{
			manage:'Verwalten Sie ihren Emoticons',
			add:'Hinzufügen',
			findIcons:'Anderen Emoticons auf [link] finden',
			close:'Schließen',
			replyToAll:'Beantworten aller',
			CRUndoTitle:'Emotiworld hat einen Kampfbericht gefunden. Klicken Sie hier, um grundlegende Botschaft zurück.'
		},
		'es':{
			manage:'Administrar los emoticonos',
			add:'Añadir',
			findIcon:'Buscar otros emoticonos en [link]',
			close:'Cerrar',
			replyToAll:'Responder a todos',
			CRUndoTitle:'Emotiworld ha encontrado un informe de batalla. Haga clic aquí para convertirla en mensaje básico.'
		},
		'it':{
			manage:'Gestire l\'emoticon',
			add:'Aggiungere',
			findIcon:'Trova nuove emoticon su [link]',
			close:'Chiudere',
			replyToAll:'Rispondere a tutte',
			CRUndoTitle:'Emotiworld ha trovato un rapporto di combattimento. Clicca qui per tornare al messaggio di base.'
		},
		'ro':{
			manage:'Administreaza Emoticons',
			add:'Adăuga',
			findIcon:'Găsiţi alte emoticoane pe [link]',
			close:'Aproape',
			replyToAll:'Răspunde la toate',
			CRUndoTitle:'Emotiworld a găsit un raport de luptă. Click aici pentru a reveni la mesajul de bază.'
		}
	};

	// Ikariam
	this.ikariamInit = function() {
		// Language detection
		if( !Emotiworld.setLanguage(unsafeWindow.LocalizationStrings.language) ) return;
		// Ici on est sûr d'être dans ikariam.
		if(unsafeWindow.ajax && unsafeWindow.ajax.Responder) {
			// Ikariam ≥ v0.5.0
			unsafeWindow.ajax.Responder.Emotiworld_IkaChangeView = unsafeWindow.ajax.Responder.changeView;
			unsafeWindow.ajax.Responder.changeView = function(params) {
				var id = params[0];
				if((id == 'sendIKMessage') || (id == 'diplomacyIslandBoard')) {
					// toolbar insertion
					// On l'insère dans le code html avant son intégration à la page, pour que la hauteur de la fenêtre soit bien calculée par ikariam.
					setTimeout(function(){
						var style = (id == 'sendIKMessage') ? 'width:90%;margin-left:32px' : 'width:500px';
						var insert = '<div id="emotiworldBar" style="'+style+'">'+Emotiworld.toolbar(Emotiworld.icons, true)+'</div>';
						var pos = params[1].indexOf('<textarea ');
						if(pos > 0) {
							params[1] = params[1].substr(0, pos) + insert + params[1].substr(pos);
						} // else on a un problème : revoir la réponse json
						unsafeWindow.ajax.Responder.Emotiworld_IkaChangeView(params);
						if(!Emotiworld.configPanelPresent) {
							$('body').append( Emotiworld.configPanelHTML() );
							Emotiworld.configPanelPresent = true;
						}
						Emotiworld.textarea = $('#js_msgTextConfirm, #js_islandMsgTextInput');
						Emotiworld.overlay = true;
						Emotiworld.postInit();
					}, 0);
					return;
				}
				unsafeWindow.ajax.Responder.Emotiworld_IkaChangeView(params);
				if(id == 'diplomacyAdvisor') {
					var diplo = $('#tab_diplomacyAdvisor');
					Emotiworld.setReplyToAll(diplo);
					Emotiworld.addLinks(diplo);
					// Overwriting html removes all events listeners. So listeners must be added at the very end.
					Emotiworld.detectCR(diplo);
				}
			}
		}
		else {
			// Ikariam v0.4.5
			// toolbar insertion
			Emotiworld.textarea = $("textarea#text, textarea#message");
			var w = Emotiworld.textarea.outerWidth();
			if(w) {
				Emotiworld.textarea.before('<div id="emotiworldBar" style="width:'+w+'px">'+Emotiworld.toolbar(Emotiworld.icons, true)+"</div>");
				$('body').append( Emotiworld.configPanelHTML() );
				Emotiworld.postInit();
			}
		}
	}

	/** Détermine la langue d'après le paramètre. Si on ne trouve pas on prend l'anglais. */
	this.setLanguage = function(langCandidate) {
		Emotiworld.lang = 'en';
		if((langCandidate == null) || (langCandidate === undefined)) {
			return false;
		}
		if((typeof langCandidate == 'object') && (langCandidate != null) && (typeof langCandidate[1] == 'string')) {	
			Emotiworld.lang = langCandidate[1];
		}
		else if(typeof langCandidate == 'string') {
			Emotiworld.lang = langCandidate;
		}
		if(typeof Emotiworld.languageData[Emotiworld.lang] == 'undefined')
			Emotiworld.lang = 'en';
		return true;
	};

	/** génère le code html de la barre d'icônes */
	this.toolbar = function(iconList, outerhtml) {
		var open = '<div class="emotiworldIcon emotiworldButton">';
		var close = '</div>';
		var innerhtml = open + iconList.join(close+open) + close;
		if(outerhtml)
			return '<div id="emotiworldConfig"></div><div id="emotiworldIcons">'+ innerhtml +'</div>';
		else
			return innerhtml;
	};

	/** génère le code html complet à insérer. */
	this.configPanelHTML = function() {
		var lang = Emotiworld.languageData[Emotiworld.lang];

		// Config
		var html = '<div id="emotiworldPanel">';
		html += '<ul id="emotiworldSortable">';
		for(var i = 0; i < Emotiworld.icons.length; i++) {
			html += '<li>'+Emotiworld.icons[i]+'</li>';
		}
		html += '</ul>';
		html += '<ul id="emotiworldTrash" class="emotiworldTransparent"></ul>';
		html += '<div id="emotiworldPanelRight"><h4>'+lang['manage']+'</h4><br/><br/>';
		html += '<a id="emotiworldAdd" href="" onclick="return false;">'+lang['add']+'</a><br/><br/><br/>';
		html += lang['findIcons'].replace(/\[link\]/, '<a href="http://emotiworld.com" target="_blank" style="font-weight:bold">emotiworld.com</a>')+' ㋡</div>';
		html += '<div id="emotiworldClose"><a href="" onclick="return false;">'+lang['close']+' ☒</a></div>';
		html += '</div>';
		html += '<div id="emotiworldOverlay"></div>';
		return html;
	}

	/** met en route les boutons */
	this.setReplyToAll = function(diplo) {
		var lang = Emotiworld.languageData[Emotiworld.lang];
		$('td.reply a.button[href^="?view=sendIKMessage"]', diplo).each(function(index) {
			var href = $(this).attr('href').replace(/&receiverId=\d+/, '&msgType=51&allyId='+unsafeWindow.ikariam.model.avatarAllyId);
			$(this).after('<a class="button" href="'+href+'" onclick="ajaxHandlerCall(this.href);return false;">'+lang.replyToAll+'</a>');
		});
	}

	/** Detects Combat Reports from Ikariam CR Converter */
	this.detectCR = function(diplo) {
		$('td.msgText', diplo).each(function(index) {
			var content = $(this).html();
			content = content.replace(/-{67}\s*<br\s?\/?>\s*([\s\S]+?)-{67}\s*<br\s?\/?>([\s\S]+?)-{67}/g, Emotiworld.CRBlock);
			$(this).html(content);
		});
		$('.emotiworldUndo', diplo).click(function() {
			$(this).siblings().toggle();
		});
	}

	this.CRBlock = function(str, p1, p2) {
		return '<div class="emotiworldCR">' +
			'<div class="emotiworldUndo emotiworldButton" title="' + Emotiworld.languageData[Emotiworld.lang].CRUndoTitle + '"></div>' +
			'<div class="emotiworldCRNice"><div class="emotiworldCRIcon"></div><table class="CRLosses">' +
			p1.replace(/(?:([^.]+)\.+(\d+)(\(-\d+\)))?\.* - (?:([^.]+)\.+(\d+)(\(-\d+\)))?\.*\s*<br\s?\/?>/g, Emotiworld.CRLineLosses) +
			'</table><hr/><table class="CRSummary">' +
			p2.replace(/([^.]+)\.+([-,%\d]+) - ([^.]+)\.+([-,%\d]+)\s*<br\s?\/?>/g, Emotiworld.CRLineSummary) +
			'</table></div><div class="emotiworldCRRaw">' + str + '</div></div>';
	}

	this.CRLineLosses = function(str, a1, a2, a3, d1, d2, d3) {
		return '<tr><td class="attacker">'+(a1||'')+'</td><td class="unitsleft">'+Emotiworld.localeString(a2)+'</td><td class="unitslost">'+Emotiworld.localeString(a3)+'</td><td class="spacer"></td>' +
			'<td class="defender">'+(d1||'')+'</td><td class="unitsleft">'+Emotiworld.localeString(d2)+'</td><td class="unitslost">'+Emotiworld.localeString(d3)+'</td></tr>';
	}

	this.CRLineSummary = function(str, a1, a2, d1, d2) {
		return '<tr><td class="attacker">'+a1+'</td><td class="attacker alignright">'+Emotiworld.localeString(a2)+'</td><td class="spacer"></td>' +
			'<td class="defender">'+d1+'</td><td class="defender alignright">'+Emotiworld.localeString(d2)+'</td></tr>';
	}

	this.localeString = function(number) {
		if(!number) return '';
		return number.replace(/[,\d]+/, function(n){ return parseInt(n.replace(/,/, '')).toLocaleString() } );
	}

	/** Detect Island coordinates */
	this.addLinks = function(diplo) {
		$('td.msgText', diplo).each(function(index) {
			var content = $(this).html();
			content = content
				.replace(/\[(\d\d+):(\d\d+)]/g, Emotiworld.islandLink)
				.replace(/(https?:\/\/.+?)([\s()\[\]<>]|$)/g, Emotiworld.genericLink);
			$(this).html(content);
		});
	}

	this.genericLink = function (str, url, after) {
		var pos = url.lastIndexOf('.');
		var linkClass = '';
		return '<a href="'+url+'"'+linkClass+'>'+url+'</a>'+after;
	}

	this.islandLink = function(str, x, y) {
		var col = Emotiworld.islandid[x];
		if(col) {
			var id = col[y];
			if(id) {
				return '<a href="?view=island&islandId='+id+'">'+str+'</a>';
			}
		}
		return str;
	}

	/** met en route les boutons */
	this.postInit = function() {
		$("div.emotiworldIcon").click(Emotiworld.insert);
		var bgcolor = Emotiworld.textarea.css('background-color');
		$('#emotiworldConfig').click(function() {
			if($('#emotiworldPanel').css('display') == 'none') {
				if(Emotiworld.overlay) {
					var docHeight = $(document).height();
					$("#emotiworldOverlay").css({opacity:0,display:'block'}).animate({opacity:0.4});
				}
				$('#emotiworldPanel')
					.width(Emotiworld.textarea.width())
					.css('top', $('#emotiworldConfig').offset().top + 28)
					.css('left', Emotiworld.textarea.offset().left);
				$('#emotiworldPanel').slideDown('fast');
			}
			else Emotiworld.hideConfigPanel();
		});
		$('#emotiworldAdd').click(function() {
			var icon = prompt("Введите текст заготовки сюда:");
			Emotiworld.add(icon);
		});
		$('#emotiworldClose').click( Emotiworld.hideConfigPanel );
		// placeholder ne marche pas, la disposition en grille non plus.
		$( "#emotiworldTrash" ).sortable({
			tolerance: 'pointer',
			connectWith:$('#emotiworldSortable')
		});
		$( "#emotiworldSortable" ).sortable({
			tolerance: 'pointer',
			connectWith:$('#emotiworldTrash')
		});
		$('#emotiworldPanel').fixedHeight();

//		$( "#emotiworldSortable" ).disableSelection();	// ne marche pas
	};

	this.hideConfigPanel = function() {
		Emotiworld.save();
		$('#emotiworldPanel').slideUp('fast');
		if(Emotiworld.overlay)
			$("#emotiworldOverlay").fadeOut('fast');
	}

	/** Insertion de l'émoticône cliquée dans le message. */
	this.insert = function() {
		Emotiworld.textarea.insertAtCaret( $(this).text() );
	};

	/** Renvoie la liste d'émoticônes affichée dans le panneau de config. */
	this.getCurrentList = function() {
		var icons = [];
		$('#emotiworldSortable li').each(function() {
			icons.push($(this).text());
		});
		return icons;
	};

	/** Enregistre la nouvelle lsite d'émoticônes. Méthode appelée à la fermeture du panneau de config.	 */
	this.save = function() {
		var newIcons = Emotiworld.getCurrentList();
		GM_setValue("emoticons", JSON.stringify(newIcons));
		$('#emotiworldIcons').html(Emotiworld.toolbar(newIcons, false));
		$("div.emotiworldIcon").click(Emotiworld.insert);
	};

	/** Ajoute une émoticône à la fin de la liste. */
	this.add = function(icon) {
		var newIcons = Emotiworld.getCurrentList();
		newIcons.push(icon);
		$('#emotiworldSortable').css('height', 'auto');
		$('#emotiworldPanel').css('height', 'auto');
		$('#emotiworldSortable').append('<li>'+icon+'</li>');
		$('#emotiworldPanel').fixedHeight();
		$('#emotiworldSortable').fixedHeight();
	};

	this.islandid={50:{50:1,49:4,48:6,51:9,52:15,54:40,55:43,46:60,45:62,57:103,58:104,42:152,41:153,62:230,61:231,64:437,65:439,35:563,36:564,34:569,67:676,68:677,69:679,70:682,32:859,31:861,30:863,72:1003,73:1004,74:1007,75:1008,25:1193,24:1195,22:1663,21:1665,20:1668,19:1670,80:1878,81:1880,16:2126,17:2127,84:2373,85:2376,14:2706,13:2708,87:3052,88:3053,10:3451,9:3453,11:3454,96:3770,97:3772,98:3774,99:3776,6:4099,7:4101,3:4719,4:4725,2:4733},51:{50:2,49:5,54:41,55:42,57:105,58:106,59:109,43:150,42:151,41:154,38:332,39:333,64:440,65:441,35:561,36:562,73:1005,72:1006,74:1009,75:1010,28:1173,27:1175,77:1443,78:1445,20:1667,19:1669,81:1881,82:1882,16:2125,17:2128,84:2374,85:2375,90:2383,91:2385,93:3064,94:3066,10:3450,9:3452,96:3771,97:3773,98:3775,99:3777,100:3778,6:4098,7:4100},49:{48:7,51:11,52:13,49:16,46:61,45:63,44:68,57:101,58:102,60:227,61:228,62:229,39:335,38:337,64:436,65:438,36:565,35:566,34:570,67:675,68:678,69:680,70:681,32:858,31:860,30:862,29:866,73:1000,74:1002,27:1185,26:1187,25:1194,24:1196,78:1441,77:1442,22:1664,21:1666,80:1877,81:1879,83:2367,84:2369,14:2707,13:2709,87:3050,88:3051,89:3054,91:3057,92:3059,93:3061,94:3063,11:3455,10:3456,7:4106,6:4108,3:4723,4:4724,2:4732},47:{50:17,49:18,48:24,52:31,53:32,54:36,55:37,46:66,45:67,57:99,58:100,42:157,41:158,60:222,61:223,39:339,38:341,63:434,64:435,33:571,32:572,66:671,67:672,68:673,71:685,70:686,30:867,29:868,26:1189,27:1190,76:1436,77:1438,22:1671,23:1672,24:1675,80:1873,81:1874,17:2131,16:2132,19:2135,18:2136,20:2137,84:2370,85:2371,13:2712,14:2713,87:3046,88:3047,11:3459,10:3460,9:3463,96:3760,97:3762,98:3764,4:4727,3:4728},46:{49:19,50:20,48:25,52:30,53:33,57:97,58:98,42:159,43:160,41:165,60:221,61:224,39:340,38:342,37:343,36:345,63:432,64:433,32:573,33:574,34:575,66:669,67:670,68:674,70:687,71:688,73:996,74:998,26:1191,27:1192,76:1433,77:1435,23:1673,22:1674,24:1676,79:1868,80:1870,81:1872,82:1876,20:2138,19:2139,88:3045,90:3041,91:3042,87:3044,11:3461,10:3462,7:3473,6:3474,93:3755,94:3757,97:3766,98:3767,3:4730,4:4731},45:{50:26,49:28,52:34,53:35,46:70,45:71,55:93,56:94,57:96,43:161,42:162,37:344,36:346,63:430,64:431,34:576,33:577,66:667,67:668,30:869,29:870,73:995,74:997,76:1432,77:1434,24:1677,23:1678,79:1867,80:1869,81:1871,82:1875,84:2364,85:2365,16:2714,17:2715,14:2725,13:2727,90:3039,91:3043,8:3469,7:3470,6:3475,93:3754,94:3756,95:3759,97:3768,98:3769},44:{50:27,49:29,45:72,46:73,47:74,55:92,56:95,43:163,42:164,59:218,60:219,39:347,40:348,62:427,63:429,33:578,34:579,29:871,30:872,31:873,70:984,71:986,69:990,73:992,74:994,26:1197,27:1198,23:1679,24:1680,21:2140,20:2141,84:2362,85:2363,16:2716,17:2717,18:2718,14:2726,13:2728,12:2732,11:2733,87:3009,88:3011,89:3013,90:3038,9:3465,8:3467,7:3471,93:3751,94:3753,95:3758,4:4120,3:4121},48:{55:38,54:39,46:64,45:65,44:69,42:155,41:156,60:225,61:226,39:336,38:338,36:567,35:568,70:683,71:684,30:864,29:865,73:999,74:1001,27:1186,26:1188,76:1437,77:1439,78:1440,16:2129,17:2130,18:2133,19:2134,83:2366,84:2368,85:2372,14:2710,13:2711,87:3048,88:3049,89:3055,91:3056,92:3058,93:3060,94:3062,11:3457,10:3458,9:3464,96:3761,97:3763,98:3765,7:4107,6:4109,4:4726,3:4729},52:{54:44,53:45,52:48,47:57,46:58,57:107,58:108,59:110,44:144,43:145,61:232,62:233,39:330,38:331,64:442,65:443,36:559,35:560,67:691,68:693,69:695,70:697,33:851,32:853,31:855,30:857,28:1174,27:1176,26:1181,25:1183,77:1444,78:1446,79:1451,23:1652,22:1654,81:1883,82:1884,17:2121,16:2124,87:2377,88:2379,89:2381,90:2384,91:2386,14:2694,13:2695,12:2705,93:3065,94:3067,100:3779,99:3780,6:4095,5:4097,3:4709,2:4710},53:{53:46,54:47,52:49,50:50,49:52,48:54,47:56,46:59,56:111,57:112,44:143,43:146,42:149,61:234,62:235,40:327,39:329,38:334,65:444,64:445,67:692,68:694,69:696,70:698,71:701,33:850,32:852,31:854,30:856,73:1011,74:1013,75:1021,28:1177,27:1179,26:1182,25:1184,77:1447,78:1449,79:1452,23:1653,22:1655,21:1656,81:1885,82:1886,84:1887,85:1889,19:2117,18:2119,17:2122,16:2123,87:2378,88:2380,89:2382,14:2693,13:2696,12:2699,93:3068,94:3070,10:3441,9:3443,8:3445,96:3783,97:3785,6:4094,5:4096,3:4711,2:4712,1:4717},54:{50:51,49:53,48:55,57:113,56:114,43:147,42:148,61:243,60:244,59:247,40:326,39:328,36:552,35:553,70:699,71:700,73:1012,74:1014,75:1022,28:1178,27:1180,77:1448,78:1450,21:1657,22:1658,84:1888,85:1890,19:2118,18:2120,13:2697,12:2698,93:3069,94:3071,92:3072,91:3073,10:3440,9:3442,8:3444,96:3784,97:3786,98:3787,99:3789,100:3791,2:4713,1:4714},43:{47:75,46:76,52:85,53:87,58:215,59:216,60:220,40:349,39:350,62:426,63:428,36:580,37:581,65:665,66:666,31:874,30:875,68:981,69:982,70:983,71:985,73:991,74:993,27:1199,26:1200,76:1427,77:1429,78:1431,80:1863,81:1864,82:1866,21:2142,20:2143,84:2360,85:2361,18:2719,17:2720,14:2729,13:2730,12:2731,11:2734,87:3008,88:3010,89:3012,90:3034,91:3037,9:3466,8:3468,7:3476,93:3750,94:3752,5:4110,4:4112,3:4122,97:4417,98:4418},42:{47:77,48:78,50:81,51:83,52:86,53:88,54:89,44:166,43:167,42:173,56:208,57:209,58:214,59:217,40:351,39:354,37:582,36:583,35:586,34:589,66:663,65:664,30:876,31:877,32:878,68:978,69:980,70:987,27:1201,28:1202,76:1426,77:1428,78:1430,24:1681,23:1682,80:1861,81:1862,82:1865,21:2144,20:2145,84:2358,85:2359,17:2721,16:2724,90:3035,91:3036,5:4111,4:4113,96:4410,97:4412,98:4414,99:4416},41:{48:79,47:80,50:82,51:84,54:90,53:91,43:168,44:169,45:170,42:174,56:207,57:210,58:211,40:352,39:353,62:424,61:425,36:584,37:585,35:587,34:588,64:658,65:660,66:661,32:879,31:880,68:977,69:979,28:1203,27:1204,72:1413,73:1415,74:1417,76:1423,77:1425,23:1683,24:1684,25:1685,80:1859,81:1860,21:2146,20:2147,19:2151,17:2722,16:2723,13:2737,14:2738,87:3004,88:3005,11:3477,10:3479,9:3483,8:3485,7:3487,93:3748,94:3749,5:4114,4:4115,96:4409,97:4411,98:4413,99:4415,2:4736,1:4739},55:{54:115,53:117,52:119,46:135,45:136,63:263,60:246,59:248,64:265,66:446,67:447,68:457,37:549,36:550,35:554,34:555,33:558,31:840,30:842,73:1015,74:1017,80:1453,81:1455,82:1461,24:1647,25:1648,21:1659,22:1660,85:1891,86:1893,88:2387,89:2388,16:2686,15:2688,91:3074,92:3075,8:3446,7:3449,98:3788,99:3790,100:3792,97:3793,5:4707,4:4708,2:4715,1:4716},56:{54:116,53:118,52:120,51:121,55:124,49:127,48:128,47:131,46:134,45:137,44:139,43:142,59:249,58:250,57:253,63:264,64:266,62:267,41:323,40:325,66:448,67:449,68:456,38:545,37:548,36:551,34:556,33:557,70:702,71:703,31:841,30:843,73:1016,74:1018,76:1023,77:1025,80:1454,81:1456,79:1457,82:1460,83:1462,27:1640,28:1641,26:1646,25:1649,24:1650,21:1661,22:1662,85:1892,86:1894,19:2114,18:2116,88:2389,89:2390,16:2685,15:2687,14:2690,13:2692,11:3438,91:3076,92:3077,94:3086,95:3087,10:3439,8:3447,7:3448,97:3794,98:3795,4:4705,5:4706},57:{51:122,52:123,55:125,54:126,49:129,48:130,47:132,46:133,44:140,43:141,59:262,58:252,57:254,62:268,63:269,61:270,41:322,40:324,66:450,67:451,38:546,37:547,70:704,71:705,31:844,30:846,73:1019,74:1020,76:1024,77:1026,79:1458,80:1459,83:1463,82:1464,27:1642,28:1643,26:1651,85:1895,86:1897,19:2113,18:2115,88:2391,89:2392,16:2682,15:2684,14:2689,13:2691,10:3436,11:3437,94:3083,95:3084,4:4703,3:4704},40:{45:171,44:172,58:212,57:213,60:421,61:422,62:423,64:657,65:659,28:1205,29:1206,27:1209,73:1414,72:1412,71:1411,74:1416,76:1422,77:1424,25:1686,24:1687,23:1688,79:1854,80:1856,81:1858,21:2148,20:2149,19:2150,83:2353,84:2354,85:2355,14:2739,13:2740,87:3001,88:3003,89:3007,11:3478,10:3480,9:3484,8:3486,7:3488,91:3737,92:3739,93:3741,94:3743,4:4116,5:4117,2:4738,1:4740},39:{47:175,48:176,49:179,50:180,51:184,52:186,54:187,55:190,40:355,41:356,42:359,60:420,38:590,37:591,35:601,34:602,32:881,31:882,67:974,68:975,29:1207,28:1208,70:1408,71:1410,76:1419,77:1421,79:1853,80:1855,81:1857,83:2350,84:2352,85:2356,14:2741,13:2743,16:2745,17:2746,87:3000,88:3002,89:3006,11:3481,10:3482,91:3736,92:3738,93:3740,94:3742,95:3744,96:3747,4:4118,5:4119,98:4419,99:4420,2:4741,1:4743},38:{47:177,48:178,49:181,50:182,51:183,52:185,54:188,55:189,56:203,57:206,41:357,40:358,42:360,44:368,45:369,59:417,60:419,38:592,37:593,36:598,35:600,34:603,62:640,63:642,64:643,65:649,32:883,31:884,67:973,68:976,74:1406,70:1407,71:1409,73:1404,76:1418,77:1420,26:1689,25:1691,24:1693,23:1695,20:2152,21:2153,83:2349,84:2351,14:2742,13:2744,16:2747,17:2748,18:2749,8:3489,7:3490,95:3745,96:3746,98:4421,99:4422,2:4742,1:4744},37:{56:204,57:205,42:361,41:362,45:370,44:371,59:416,60:418,38:594,37:595,62:639,63:641,64:647,65:648,32:885,31:886,67:971,68:972,28:1210,29:1211,74:1405,73:1403,26:1690,25:1692,24:1694,23:1696,79:1847,80:1849,81:1852,20:2154,21:2155,18:2750,17:2751,11:2765,10:2767,86:2991,87:2993,88:2995,89:2997,90:2999,8:3491,7:3492,93:3732,92:3734,5:4123,4:4124,99:4423,100:4424,2:4745,1:4746},58:{61:271,62:272,63:273,41:319,40:321,66:452,65:453,70:706,69:710,35:830,34:832,33:838,31:845,30:847,76:1027,77:1029,27:1644,28:1645,85:1896,86:1898,24:2102,23:2103,22:2106,21:2107,19:2110,18:2112,88:2393,89:2394,90:2395,16:2681,15:2683,92:3078,93:3080,94:3082,95:3085,9:3434,10:3435,97:3803,98:3804,6:4092,7:4093,4:4701,3:4702},59:{59:274,58:275,56:282,55:285,53:293,52:295,51:302,50:303,48:305,47:307,46:309,45:311,43:313,42:315,41:318,40:320,65:454,66:455,38:540,37:544,72:719,70:708,69:711,68:712,73:721,35:831,34:833,33:839,31:848,30:849,76:1028,77:1030,75:1031,79:1465,80:1466,82:1477,83:1478,25:2098,24:2101,23:2104,22:2105,21:2108,19:2109,18:2111,90:2396,89:2397,12:2679,13:2680,92:3079,93:3081,9:3432,10:3433,97:3802,98:3805,7:4090,6:4091,4:4699,3:4700},60:{58:276,59:277,60:278,56:283,55:286,53:294,52:296,51:301,50:304,48:306,47:308,46:310,45:312,43:314,42:316,62:458,63:459,37:538,38:539,72:720,68:713,69:714,73:722,34:834,35:836,75:1032,76:1033,79:1467,80:1468,82:1479,83:1480,84:1483,27:1638,28:1639,86:1900,87:1902,25:2099,24:2100,16:2671,15:2673,14:2675,13:2677,12:2678,95:3796,96:3798,97:3800,7:4088,6:4089},61:{59:279,60:280,58:281,55:287,56:288,52:297,51:298,62:460,63:461,64:462,65:465,40:532,39:535,38:536,37:537,67:715,68:716,71:723,72:724,34:835,35:837,32:1171,31:1172,78:1469,79:1470,80:1476,82:1481,83:1482,84:1484,28:1635,29:1636,27:1637,87:1899,86:1901,89:2398,90:2399,19:2660,18:2661,22:2667,21:2669,16:2670,15:2672,14:2674,13:2676,92:3088,93:3090,10:3426,9:3427,95:3797,96:3799,97:3801,99:3806,100:3808,7:4086,6:4087,4:4690,3:4691},62:{54:289,55:290,51:299,52:300,64:463,63:464,65:466,49:498,48:500,47:502,45:506,44:508,43:510,42:512,40:533,39:534,67:717,68:718,72:725,71:726,70:727,74:1034,75:1035,32:1169,31:1170,78:1471,79:1472,77:1473,28:1633,29:1634,86:1903,87:1904,25:2090,24:2091,89:2400,90:2401,19:2658,18:2659,22:2666,21:2668,92:3089,93:3091,11:3423,10:3425,9:3428,99:3807,100:3809,7:4084,6:4085,4:4688,3:4689},63:{55:291,54:292,61:467,60:468,59:471,58:472,57:475,49:499,48:501,47:503,45:507,44:509,43:511,42:513,70:728,71:729,72:730,37:818,36:820,74:1036,75:1037,34:1161,33:1163,32:1165,31:1167,77:1474,78:1475,81:1485,82:1486,28:1631,29:1632,86:1905,85:1907,84:1909,26:2087,25:2089,24:2092,89:2402,90:2403,19:2656,18:2657,22:2662,21:2665,92:3092,93:3093,94:3094,95:3096,96:3098,16:3410,15:3412,14:3414,13:3416,11:3422,10:3424,9:3429,99:3810,98:3812,4:4686,3:4687,2:4696},36:{41:363,42:364,40:365,44:372,45:373,46:374,47:377,49:378,50:379,51:382,53:386,54:387,38:596,37:597,63:650,64:654,33:887,32:888,34:891,35:893,67:968,68:969,29:1212,28:1213,70:1336,71:1338,72:1400,73:1402,76:1836,77:1837,79:1844,80:1846,81:1851,20:2156,21:2157,83:2346,84:2348,18:2752,17:2754,15:2756,14:2758,13:2760,12:2762,11:2764,10:2766,86:2990,87:2992,88:2994,89:2996,90:2998,8:3493,7:3494,93:3731,92:3733,94:3735,5:4125,4:4126,96:4400,97:4401,99:4425,100:4426},35:{40:366,41:367,46:375,47:376,49:380,50:381,51:383,53:388,54:389,55:390,56:391,58:398,59:400,60:413,61:414,37:604,38:605,63:652,64:653,33:889,32:890,34:892,35:894,66:965,67:966,68:970,30:1214,29:1215,70:1335,71:1337,72:1399,73:1401,26:1697,25:1698,75:1833,76:1834,77:1838,79:1843,80:1845,20:2158,21:2159,22:2160,23:2161,83:2345,84:2347,18:2753,17:2755,15:2757,14:2759,13:2761,12:2763,8:3495,7:3496,93:3728,94:3730,4:4127,5:4128,3:4129,2:4132,96:4402,97:4403},34:{51:384,50:385,56:392,55:393,54:394,53:395,58:399,59:401,60:412,61:415,43:617,44:619,63:655,64:656,66:964,67:967,29:1216,30:1217,25:1699,26:1700,27:1701,75:1832,76:1835,23:2162,22:2163,82:2342,83:2344,12:2768,13:2769,86:2983,87:2985,8:3497,9:3498,10:3499,91:3720,90:3722,89:3724,93:3727,94:3729,3:4130,2:4131,96:4404,97:4405,98:4406},33:{56:396,55:397,38:606,39:607,40:610,41:615,43:618,44:620,45:625,47:627,48:628,36:895,35:896,32:1218,33:1219,69:1332,70:1333,27:1702,26:1703,72:1818,73:1819,76:1839,77:1842,20:2173,19:2175,79:2338,80:2339,82:2341,83:2343,15:2770,16:2771,17:2774,85:2975,86:2977,87:2984,10:3500,9:3501,91:3719,90:3721,89:3723,6:4133,5:4134,97:4407,98:4408},64:{60:469,61:470,58:473,59:474,57:476,52:486,51:487,49:504,48:505,41:514,42:515,43:518,67:731,68:732,66:735,63:740,64:741,39:814,38:816,37:819,36:821,74:1038,75:1039,34:1162,33:1164,32:1166,31:1168,81:1487,82:1488,80:1489,86:1906,85:1908,84:1910,26:2086,25:2088,88:2404,89:2405,19:2654,18:2655,22:2663,21:2664,94:3095,95:3097,96:3099,16:3411,15:3413,14:3415,13:3417,9:3430,10:3431,99:3811,98:3813,7:4077,6:4079,4:4684,3:4685,2:4692,1:4693},65:{55:477,54:478,51:488,52:489,42:516,41:517,45:519,46:520,68:733,67:734,66:736,69:737,64:742,63:743,39:815,38:817,74:1040,75:1041,76:1042,71:1045,72:1046,80:1490,81:1491,79:1492,78:1495,28:1629,29:1630,26:2083,25:2085,24:2097,88:2406,89:2407,19:2652,18:2653,92:3100,91:3101,13:3418,12:3421,7:4076,6:4078,2:4694,1:4695},66:{54:479,55:480,56:481,57:484,52:490,51:492,46:521,45:522,44:523,47:526,48:527,49:528,69:738,68:739,63:744,62:746,60:752,59:753,37:822,38:823,39:826,75:1043,76:1044,71:1047,72:1048,35:1153,34:1155,33:1157,32:1159,79:1493,80:1494,78:1496,81:1497,30:1626,29:1627,28:1628,83:1911,84:1912,26:2082,25:2084,24:2093,23:2096,88:2408,87:2409,86:2412,21:2647,20:2649,19:2651,92:3102,91:3103,94:3120,95:3122,16:3406,15:3407,13:3419,12:3420,97:3814,98:3815,10:4057,9:4058,7:4073,6:4075,5:4081,4:4083},67:{55:482,56:483,57:485,52:491,51:493,44:524,45:525,49:529,48:530,47:531,63:745,62:747,66:1055,65:1054,60:754,59:755,42:801,41:803,38:824,37:825,39:827,72:1049,73:1050,35:1154,34:1156,33:1158,32:1160,30:1624,29:1625,83:1913,84:1914,24:2094,23:2095,88:2410,87:2411,86:2413,21:2646,20:2648,19:2650,91:3110,90:3111,94:3121,95:3123,17:3397,16:3399,15:3401,97:3816,98:3817,10:4056,9:4059,7:4072,6:4074,5:4080,4:4082,1:5141,2:5142},68:{53:494,52:497,60:756,59:757,42:802,41:804,39:828,38:829,72:1051,73:1052,65:1056,66:1057,68:1064,69:1065,70:1068,79:1498,78:1500,77:1502,76:1504,75:1506,30:1622,29:1623,83:1915,82:1916,81:1919,27:2074,26:2076,90:3112,91:3113,94:3124,93:3125,17:3396,16:3398,15:3400,14:3402,13:3405,97:3818,11:4054,10:4055,1:5139,2:5140},69:{53:495,52:496,59:758,60:759,61:760,57:763,56:766,55:767,50:781,49:783,47:789,46:791,45:793,44:795,41:807,42:809,64:1058,65:1059,63:1062,68:1066,69:1067,70:1069,36:1145,35:1148,79:1499,78:1501,77:1503,76:1505,75:1507,33:1610,32:1612,30:1620,29:1621,83:1917,82:1918,81:1920,27:2075,26:2077,25:2078,24:2080,85:2414,86:2415,22:2637,21:2639,20:2644,19:2645,90:3114,89:3115,88:3116,93:3126,94:3127,14:3403,13:3404,97:3819,96:3820,11:4051,10:4053,8:4070,7:4071,99:4427,100:4428,5:4669,4:4671,1:5137,2:5138},32:{38:608,39:609,40:614,41:616,43:621,44:624,45:626,47:629,48:630,49:631,36:897,35:898,53:935,51:931,52:933,58:945,59:946,60:948,62:952,63:954,64:956,65:958,33:1220,32:1221,31:1226,30:1228,29:1230,67:1328,68:1329,69:1331,70:1334,26:1704,27:1705,72:1820,73:1821,74:1822,76:1840,77:1841,24:2164,23:2166,22:2168,21:2170,20:2172,19:2174,79:2336,80:2337,15:2772,16:2773,17:2775,85:2976,86:2978,12:3502,13:3503,90:3716,91:3718,92:3726,6:4135,5:4136,7:4137,94:4390,95:4391,3:4751,2:4756},31:{43:622,44:623,49:632,48:633,47:634,36:899,35:900,52:934,53:936,51:932,54:939,56:941,57:943,58:944,59:947,60:949,62:953,63:955,64:957,65:959,33:1222,32:1225,31:1227,30:1229,29:1231,67:1327,68:1330,27:1706,26:1707,74:1823,73:1824,24:2165,23:2167,22:2169,21:2171,79:2334,80:2335,16:2776,15:2777,82:2973,83:2974,85:2979,86:2981,87:2986,88:2988,12:3504,13:3505,11:3508,90:3715,91:3717,92:3725,7:4138,6:4139,8:4140,9:4141,5:4144,94:4387,95:4389,96:4392,97:4394,3:4752,2:4755,100:4966,99:4967},30:{46:635,47:636,36:901,35:902,38:903,37:904,41:907,40:908,53:937,54:938,56:940,57:942,60:950,59:951,62:960,63:962,33:1223,32:1224,70:1814,71:1815,74:1825,75:1826,73:2294,77:2329,78:2331,79:2333,80:2340,15:2778,16:2779,18:2780,19:2781,82:2971,83:2972,85:2980,86:2982,87:2987,88:2989,12:3506,13:3507,11:3509,9:4142,8:4143,96:4393,97:4395,3:4757,2:4759,99:4964,100:4965},29:{47:637,46:638,38:905,37:906,41:909,40:910,42:911,43:919,44:921,62:961,63:963,49:1278,50:1279,51:1281,65:1321,66:1322,30:1708,29:1709,28:1712,27:1713,26:1716,68:1806,69:1807,70:1816,71:1817,74:1827,75:1828,73:1829,24:2176,23:2178,77:2328,78:2330,79:2332,18:2782,19:2783,20:2784,21:2785,82:2968,83:2969,90:3713,91:3714,93:4375,94:4377,96:4396,97:4398,3:4758,2:4760,1:4761,5:4764,6:4765,100:4962,99:4963},70:{61:761,60:762,57:764,56:765,55:768,50:782,49:784,47:790,46:792,45:794,44:796,41:808,42:810,40:812,64:1060,65:1061,63:1063,67:1070,68:1071,38:1141,37:1144,36:1146,35:1147,73:1508,72:1509,33:1611,32:1613,25:2079,24:2081,85:2416,86:2417,22:2636,21:2638,20:2640,19:2642,89:3117,88:3118,90:3119,93:3128,92:3129,94:3132,17:3387,16:3389,97:3821,96:3822,11:4050,10:4052,8:4068,7:4069,99:4429,100:4430,5:4670,4:4672,1:5135,2:5136},71:{57:769,58:771,53:773,52:776,50:785,49:786,47:799,46:800,41:811,40:813,67:1072,68:1073,38:1142,37:1143,72:1510,73:1511,71:1512,70:1513,74:1516,32:1614,31:1616,30:1618,82:1921,81:1922,80:1925,79:1926,76:1933,77:1934,28:2060,27:2068,85:2418,84:2419,20:2641,19:2643,92:3130,93:3131,94:3133,17:3386,16:3388,15:3390,14:3392,12:4046,11:4048,8:4066,7:4067,99:4431,100:4432,5:4673,4:4675,1:5133,2:5134},72:{57:770,58:772,53:774,52:775,55:777,54:780,50:787,49:788,64:1074,65:1075,62:1083,61:1086,60:1088,44:1130,43:1131,37:1149,38:1150,70:1514,71:1515,73:1517,74:1518,35:1600,34:1602,32:1615,31:1617,30:1619,82:1923,81:1924,80:1927,79:1928,76:1935,77:1936,28:2061,27:2069,84:2420,85:2421,86:2422,87:2423,25:2625,24:2627,23:2629,22:2631,89:3134,90:3135,15:3391,14:3393,96:3823,97:3825,12:4047,11:4049,9:4062,8:4064,99:4433,100:4434,5:4674,4:4676},73:{55:778,54:779,64:1076,65:1077,66:1079,67:1081,62:1084,61:1085,60:1087,47:1123,46:1124,45:1126,44:1128,43:1132,41:1133,40:1135,37:1151,38:1152,70:1521,69:1522,35:1601,34:1603,79:1929,80:1930,76:1937,77:1938,28:2070,27:2072,87:2424,86:2425,25:2624,24:2626,23:2628,22:2630,21:2632,20:2634,89:3136,90:3137,91:3140,92:3141,18:3374,17:3376,15:3394,14:3395,96:3824,97:3826,95:3827,94:3829,12:4060,11:4061,9:4063,8:4065,99:4435,100:4436,5:4678,6:4680,4:4682,1:5131,2:5132},28:{42:912,41:913,43:920,44:922,32:1232,33:1233,34:1236,35:1237,49:1277,50:1280,51:1282,53:1294,54:1295,56:1300,57:1301,58:1304,59:1307,60:1308,65:1320,66:1323,30:1710,29:1711,28:1714,27:1715,26:1717,68:1808,69:1809,24:2177,23:2179,20:2786,21:2787,19:2788,81:2965,82:2967,16:3510,15:3511,85:3697,86:3698,88:3705,89:3707,90:3709,91:3711,13:4145,12:4147,11:4152,10:4153,9:4154,8:4155,93:4376,94:4378,96:4397,97:4399,1:4762,2:4763,5:4766,6:4767,99:4960,100:4961},74:{65:1078,66:1080,67:1082,61:1089,62:1090,58:1095,57:1096,52:1112,51:1115,50:1117,48:1119,47:1121,46:1125,45:1127,44:1129,41:1134,40:1136,70:1523,69:1524,35:1604,34:1606,33:1608,79:1931,80:1932,76:1939,77:1940,75:1941,72:1944,73:1945,30:2056,31:2058,28:2071,27:2073,83:2426,84:2427,82:2430,21:2633,20:2635,90:3138,91:3139,92:3142,18:3375,17:3377,95:3828,94:3830,5:4679,6:4681,4:4683,1:5128,2:5129},75:{62:1091,63:1092,57:1097,58:1098,59:1099,55:1106,54:1108,53:1110,52:1113,51:1114,50:1118,48:1120,47:1122,42:1137,41:1139,38:1593,37:1594,35:1605,34:1607,33:1609,75:1942,76:1943,72:1946,73:1947,31:2053,30:2055,83:2428,84:2429,82:2431,85:2432,25:2619,24:2621,23:2623,88:3143,87:3144,18:3378,17:3380,16:3383,15:3385,13:4038,12:4040,97:4449,98:4450,10:4661,9:4662,8:4663,1:5127,2:5130},76:{63:1093,62:1094,59:1100,58:1101,60:1102,57:1105,55:1107,54:1109,53:1111,52:1116,42:1138,41:1140,70:1525,69:1526,68:1529,66:1533,65:1534,44:1578,45:1579,39:1589,38:1591,37:1595,72:1948,73:1949,31:2054,30:2057,85:2433,84:2434,80:2435,79:2436,78:2439,28:2613,27:2615,26:2617,25:2618,24:2620,23:2622,88:3145,87:3146,21:3361,20:3363,18:3379,17:3381,16:3382,15:3384,90:3831,91:3833,92:3835,93:3837,94:3839,95:3841,13:4039,12:4041,97:4451,98:4452,8:4664,9:4665,10:4666,5:5118,6:5119,3:5121,2:5122,1:5126},77:{60:1103,59:1104,69:1527,70:1528,68:1530,66:1535,65:1536,50:1571,49:1572,48:1574,47:1576,45:1580,44:1581,39:1590,38:1592,72:1950,73:1951,74:1952,75:1955,35:2046,34:2047,32:2049,31:2051,30:2059,80:2437,79:2438,78:2440,77:2441,81:2446,82:2447,28:2612,27:2614,26:2616,88:3147,87:3148,21:3362,20:3364,90:3832,91:3834,92:3836,93:3838,94:3840,95:3842,12:4042,13:4044,97:4453,98:4454,10:4667,9:4668,5:5117,6:5120,2:5123,3:5124,1:5125},27:{32:1234,33:1235,34:1238,35:1239,36:1242,38:1247,39:1248,46:1268,47:1270,49:1283,50:1284,53:1293,54:1296,56:1302,57:1303,59:1305,58:1306,60:1309,62:1312,63:1313,64:1316,65:1317,26:1718,27:1719,68:1810,69:1811,24:2180,23:2182,71:2311,72:2312,73:2315,74:2316,76:2320,77:2322,78:2324,79:2326,81:2964,82:2966,16:3512,15:3513,17:3514,84:3695,85:3696,86:3699,88:3706,89:3708,90:3710,91:3712,13:4148,12:4149,11:4150,10:4151,9:4156,8:4157,94:4379,93:4381,5:4768,6:4771,4:4772},26:{35:1240,36:1241,32:1243,33:1246,39:1249,38:1250,41:1255,42:1256,43:1259,44:1260,46:1269,47:1271,52:1290,53:1291,54:1297,59:1310,60:1311,62:1314,63:1315,64:1318,65:1319,66:1326,29:1720,30:1721,68:1812,69:1813,24:2181,23:2183,71:2310,72:2313,73:2314,74:2317,76:2321,77:2323,78:2325,79:2327,20:2789,21:2790,81:2961,82:2963,17:3515,16:3516,18:3517,84:3692,85:3694,86:3704,94:4380,93:4382,5:4769,6:4770,4:4773,96:4949,97:4951,98:4953,99:4955,100:4957,2:5143,1:5144},25:{38:1251,39:1252,41:1257,42:1258,43:1261,44:1262,46:1272,47:1273,48:1276,50:1286,51:1287,52:1289,53:1292,54:1298,65:1324,66:1325,29:1722,30:1723,56:1788,57:1789,26:2184,27:2185,73:2318,74:2319,20:2791,21:2792,81:2960,82:2962,18:3518,17:3519,16:3520,84:3691,85:3693,14:4158,13:4159,88:4365,89:4366,90:4373,91:4374,93:4383,94:4385,8:4774,9:4776,10:4778,11:4781,96:4948,97:4950,98:4952,99:4954,100:4956,2:5145,1:5146},24:{38:1253,39:1254,42:1263,41:1266,47:1274,48:1275,50:1285,51:1288,30:1724,31:1725,33:1728,34:1729,35:1732,36:1733,56:1787,57:1790,58:1791,60:1798,61:1799,62:1802,63:1803,69:2296,68:2295,26:2186,27:2187,24:2193,25:2194,70:2303,71:2304,21:2793,22:2794,77:2951,78:2953,79:2955,85:3700,86:3703,13:4160,14:4161,88:4367,89:4368,90:4371,91:4372,93:4384,94:4386,8:4775,9:4777,10:4779,11:4780,7:4782,99:4958,100:4959,2:5147,3:5148,4:5151,5:5152},23:{41:1264,42:1265,30:1726,31:1727,33:1730,34:1731,35:1734,36:1735,44:1753,45:1757,53:1777,54:1779,58:1792,57:1793,60:1800,61:1801,62:1804,63:1805,27:2188,28:2189,25:2192,24:2195,65:2292,66:2293,68:2297,69:2298,70:2305,71:2306,72:2309,21:2795,22:2796,20:2797,74:2939,75:2941,77:2952,78:2954,79:2956,80:2959,18:3521,17:3523,82:3681,83:3682,85:3701,86:3702,14:4162,15:4163,88:4369,89:4370,7:4783,8:4784,97:4946,96:4947,3:5149,4:5150,5:5153},78:{68:1531,69:1532,65:1537,64:1538,66:1541,63:1543,62:1544,57:1555,56:1556,54:1563,53:1565,51:1567,50:1569,49:1573,48:1575,47:1577,44:1582,45:1583,43:1585,42:1588,40:1596,39:1598,74:1953,75:1954,36:2043,35:2044,34:2048,32:2050,31:2052,77:2442,78:2443,80:2444,81:2445,82:2448,88:3149,87:3150,85:3151,84:3152,24:3347,23:3348,21:3365,20:3367,18:4026,17:4028,16:4034,15:4036,12:4043,13:4045,97:4455,98:4456,7:5112,6:5114,5:5116},79:{64:1539,65:1540,66:1542,62:1545,63:1546,60:1547,59:1549,57:1557,56:1558,55:1561,54:1564,53:1566,51:1568,50:1570,44:1584,43:1586,42:1587,40:1597,39:1599,71:1956,72:1957,37:2041,36:2042,35:2045,29:2608,28:2609,85:3153,84:3154,26:3342,25:3344,24:3346,23:3349,21:3366,20:3368,90:3843,91:3845,18:4027,17:4029,16:4035,15:4037,93:4437,94:4439,97:4457,96:4458,10:5099,9:5100,7:5111,6:5113,5:5115,2:5398,3:5399},80:{60:1548,59:1550,57:1559,56:1560,55:1562,71:1958,72:1959,69:1960,70:1961,68:1964,48:2012,47:2014,46:2016,37:2038,36:2039,74:2483,75:2484,33:2600,32:2601,30:2604,29:2605,28:2610,85:3155,84:3156,86:3159,87:3160,82:3167,81:3168,77:3176,78:3178,79:3180,26:3343,25:3345,20:3369,90:3844,91:3846,89:3847,17:4030,16:4032,93:4438,94:4440,97:4459,96:4460,99:4461,100:4462,13:4657,12:4658,10:5101,9:5102,3:5396,2:5397},81:{59:1551,60:1553,69:1962,70:1963,68:1965,65:1968,66:1969,63:1979,62:1980,53:1999,52:2000,50:2007,49:2009,48:2013,47:2015,46:2017,44:2020,43:2022,42:2028,41:2030,40:2032,38:2034,37:2036,36:2040,75:2485,74:2482,34:2598,33:2599,32:2602,30:2606,29:2607,28:2611,85:3157,84:3158,86:3161,87:3162,82:3169,81:3170,77:3177,78:3179,79:3181,23:3357,22:3358,20:3370,19:3371,89:3848,90:3849,91:3850,17:4031,16:4033,93:4441,94:4443,99:4463,100:4464,14:4649,13:4650,12:4659,10:5103,9:5104,8:5108,7:5110,5:5391,4:5393,3:5395},82:{59:1552,60:1554,68:1966,69:1967,65:1970,66:1971,63:1981,62:1982,57:1987,56:1989,53:2001,52:2002,54:2003,50:2008,49:2010,46:2018,47:2019,44:2021,43:2023,42:2029,41:2031,40:2033,38:2035,37:2037,74:2481,73:2458,72:2461,34:2595,33:2596,82:3171,79:3182,26:3350,25:3352,24:3354,23:3356,22:3359,19:3372,20:3373,93:4442,94:4444,99:4465,98:4466,97:4471,96:4472,100:4474,14:4651,13:4652,12:4660,10:5105,9:5106,8:5107,7:5109,5:5392,4:5394},22:{34:1736,35:1737,38:1740,39:1741,44:1754,45:1755,46:1762,47:1763,49:1766,50:1767,51:1770,53:1776,54:1778,55:1782,58:1794,57:1795,27:2190,28:2191,65:2290,66:2291,68:2299,69:2300,71:2307,72:2308,20:2798,21:2799,74:2940,75:2942,79:2957,80:2958,18:3522,17:3524,82:3683,83:3684,15:4164,14:4165,10:4785,11:4786,12:4789,91:4936,92:4938,94:4939,95:4941,96:4944,97:4945,99:5549,100:5550},21:{34:1738,35:1739,38:1742,39:1743,37:1744,40:1747,41:1750,42:1751,44:1758,45:1759,46:1764,47:1765,49:1768,50:1769,51:1771,54:1780,55:1781,58:1796,57:1797,30:2196,31:2197,32:2200,60:2279,61:2280,63:2282,64:2283,65:2286,66:2287,68:2301,69:2302,23:2800,24:2802,25:2804,74:2943,75:2945,76:2947,77:2949,18:3525,17:3527,82:3685,83:3686,84:3690,86:4363,87:4364,10:4787,11:4788,12:4790,89:4931,90:4933,91:4935,92:4937,94:4940,95:4942,96:4943,8:5154,7:5156,6:5158,5:5160,3:5440,2:5441,99:5547,100:5548},20:{37:1745,38:1746,40:1748,41:1749,42:1752,44:1760,45:1761,51:1772,52:1773,54:1783,55:1784,30:2198,31:2199,32:2201,60:2277,61:2278,63:2284,64:2285,65:2288,66:2289,23:2801,24:2803,25:2805,27:2814,28:2815,71:2931,72:2932,74:2944,75:2946,76:2948,77:2950,18:3526,17:3528,20:3536,21:3537,79:3677,80:3678,82:3687,83:3688,84:3689,15:4166,14:4167,86:4361,87:4362,12:4791,11:4793,89:4932,90:4934,8:5155,7:5157,6:5159,5:5161,3:5438,2:5439,98:5543,99:5545},19:{52:1774,51:1775,54:1785,55:1786,32:2202,33:2203,31:2206,34:2208,35:2209,47:2242,48:2244,49:2246,58:2269,59:2271,60:2275,61:2276,24:2813,25:2812,27:2816,28:2817,68:2925,69:2927,71:2933,72:2934,21:3539,20:3538,79:3676,80:3679,14:4168,15:4169,86:4359,87:4360,12:4792,11:4794,8:5162,9:5164,92:5326,93:5328,94:5330,95:5332,96:5334,3:5436,2:5437,98:5544,99:5546},83:{65:1972,66:1973,63:1983,62:1984,57:1988,56:1990,54:2004,53:2005,52:2006,77:2488,73:2460,72:2462,76:2486,71:2465,35:2591,34:2593,33:2597,82:3172,83:3173,79:3183,80:3184,31:3332,30:3333,29:3338,28:3339,26:3351,25:3353,24:3355,23:3360,85:3851,86:3853,93:4445,92:4446,99:4467,98:4468,97:4469,96:4470,94:4473,90:4475,89:4477,88:4479,17:4647,16:4648,14:4653,13:4654},84:{65:1974,66:1975,67:1978,63:1985,62:1986,58:1991,57:1992,60:1995,59:1996,76:2487,71:2464,70:2466,69:2469,77:2489,75:2490,50:2552,49:2553,47:2554,46:2555,45:2558,44:2559,42:2566,41:2567,39:2579,38:2580,37:2583,35:2592,34:2594,33:2603,83:3174,82:3175,80:3185,79:3186,31:3334,30:3335,29:3340,28:3341,85:3852,86:3854,21:4019,20:4020,93:4447,92:4448,90:4476,89:4478,88:4480,18:4639,17:4641,16:4643,14:4655,13:4656,11:5383,10:5384,8:5400,7:5402,6:5404,5:5407,4:5408},85:{66:1976,67:1977,58:1993,57:1994,60:1997,59:1998,70:2467,71:2468,69:2470,75:2491,76:2492,74:2493,73:2494,77:2497,55:2543,54:2545,52:2546,51:2547,50:2550,49:2551,47:2556,46:2557,45:2560,44:2561,42:2568,41:2569,39:2581,38:2582,37:2584,31:3336,30:3337,85:3855,86:3857,26:3996,25:3997,23:4014,22:4017,21:4018,20:4021,88:4481,89:4482,18:4640,17:4642,16:4644,95:4983,96:4984,97:4986,11:5385,10:5386,8:5401,7:5403,6:5405,5:5406,4:5409},18:{33:2204,32:2205,34:2207,35:2210,37:2211,38:2212,39:2215,40:2216,42:2235,43:2236,45:2238,46:2240,47:2241,48:2243,49:2245,58:2270,59:2272,60:2281,28:2818,29:2819,63:2917,64:2918,66:2921,67:2922,68:2926,69:2928,71:2935,72:2936,20:3540,21:3541,22:3542,74:3659,75:3660,77:3671,78:3673,79:3675,80:3680,15:4170,16:4171,17:4174,18:4175,82:4352,83:4354,85:4355,86:4358,8:5163,9:5165,89:5317,90:5318,92:5325,93:5327,94:5329,95:5331,96:5333,6:5428,5:5430,4:5432,3:5434,2:5435},17:{37:2213,38:2214,39:2217,40:2218,42:2230,43:2232,45:2237,46:2239,51:2255,52:2256,53:2259,55:2260,56:2261,58:2273,59:2274,28:2820,29:2821,30:2822,62:2914,63:2915,64:2919,66:2923,67:2924,69:2929,68:2930,71:2937,72:2938,21:3543,22:3544,23:3545,25:3549,26:3550,74:3661,75:3662,77:3672,78:3674,16:4172,15:4173,18:4176,17:4177,82:4351,83:4353,85:4356,86:4357,13:4795,12:4798,11:4800,88:5313,89:5315,90:5316,6:5429,5:5431,4:5433,3:5442,98:5703,99:5704},16:{38:2219,39:2220,42:2229,43:2231,48:2247,49:2248,50:2251,51:2252,52:2257,53:2258,55:2262,56:2263,30:2823,29:2824,28:2825,32:2826,33:2827,34:2838,35:2839,61:2911,62:2913,63:2916,23:3546,22:3547,21:3548,25:3551,26:3552,74:3663,75:3664,18:4178,19:4179,80:4344,81:4346,82:4348,83:4350,13:4796,12:4797,11:4799,9:5242,8:5243,88:5312,89:5314,90:5319,91:5320,92:5324,94:5531,95:5533,96:5541,98:5705,99:5706,100:5709},15:{38:2221,39:2222,41:2225,42:2228,43:2234,48:2249,49:2250,50:2253,51:2254,56:2264,57:2265,32:2828,33:2829,34:2840,35:2841,36:2842,45:2861,46:2863,59:2907,60:2909,61:2910,62:2912,63:2920,25:3553,26:3554,65:3644,66:3646,68:3647,69:3649,70:3651,71:3653,72:3655,74:3665,75:3666,76:3667,19:4180,18:4181,78:4340,79:4342,80:4343,81:4345,82:4347,83:4349,11:4803,12:4805,15:4807,16:4808,86:4928,85:4930,9:5244,8:5245,91:5321,92:5323,6:5443,5:5445,4:5447,3:5449,94:5532,95:5534,96:5542,99:5707,98:5708,100:5710},14:{38:2223,39:2224,41:2226,42:2227,43:2233,56:2266,57:2267,32:2830,33:2831,36:2843,35:2844,45:2862,46:2864,53:2884,54:2885,59:2906,60:2908,25:3555,26:3556,28:3557,29:3558,30:3561,65:3643,66:3645,68:3648,69:3650,70:3652,71:3654,72:3656,74:3668,75:3669,76:3670,21:4182,22:4183,23:4186,78:4339,79:4341,11:4804,12:4806,15:4809,16:4810,14:4811,86:4927,85:4929,9:5246,8:5247,88:5335,89:5336,6:5444,5:5446,4:5448,3:5450,94:5535,95:5537},13:{51:2878,32:2832,33:2833,45:2865,46:2867,47:2872,49:2874,50:2875,53:2886,54:2887,28:3559,29:3560,30:3562,62:3637,63:3639,64:3641,65:3642,71:3657,70:3658,22:4184,21:4185,23:4187,20:4193,14:4812,15:4813,16:4814,17:4815,18:4818,81:4918,82:4919,84:4921,85:4924,86:4925,9:5248,8:5249,88:5337,89:5338,90:5341,91:5342,92:5346,94:5536,95:5538,97:5692,98:5694,99:5696,100:5698},86:{73:2495,74:2496,64:2515,63:2517,62:2518,55:2542,54:2544,52:2548,51:2549,45:2562,44:2563,42:2570,41:2571,37:2585,36:2586,79:3188,80:3189,81:3192,82:3193,34:3323,33:3325,85:3856,86:3858,84:3859,28:3992,27:3993,26:3995,25:3998,23:4015,22:4016,89:4483,88:4484,16:4645,17:4646,91:4968,92:4969,94:4979,95:4981,96:4985,97:4987,14:5096,13:5097,11:5387,10:5388,4:5410,3:5411},87:{71:2498,70:2499,68:2506,67:2507,66:2510,65:2511,60:2521,64:2516,63:2519,62:2520,59:2522,57:2534,56:2536,55:2538,54:2540,45:2564,44:2565,42:2572,41:2573,40:2574,39:2575,37:2587,36:2588,79:3190,80:3191,81:3194,82:3195,77:3196,76:3197,49:3282,48:3283,47:3286,34:3324,33:3326,84:3860,85:3861,31:3983,30:3985,29:3987,28:3991,23:4022,22:4024,20:4631,19:4632,91:4970,92:4971,94:4980,95:4982,14:5095,13:5098,11:5389,10:5390,3:5412,4:5413,8:5414,7:5415,6:5418},88:{71:2500,70:2501,68:2508,67:2509,66:2512,60:2523,59:2524,57:2535,56:2537,55:2539,54:2541,40:2576,39:2577,41:2578,37:2589,36:2590,76:3198,77:3199,74:3210,73:3211,52:3270,51:3271,49:3284,48:3285,47:3287,34:3327,33:3329,31:3984,30:3986,29:3988,26:3999,25:4000,23:4023,22:4025,87:4491,88:4493,20:4633,19:4634,91:4972,90:4973,97:5047,98:5049,17:5087,16:5089,15:5091,14:5093,8:5416,7:5417,6:5419},89:{71:2502,70:2503,64:3233,60:2525,59:2526,61:2527,77:3200,76:3201,78:3204,79:3206,74:3212,73:3213,63:3234,52:3272,51:3273,49:3288,48:3289,45:3298,44:3299,43:3301,34:3328,33:3330,81:3863,82:3864,31:3989,30:3990,26:4001,25:4002,27:4005,84:4485,85:4487,86:4489,87:4492,88:4494,20:4635,19:4636,91:4974,90:4975,92:4978,94:5009,95:5010,97:5048,98:5050,17:5088,16:5090,15:5092,14:5094,11:5381,12:5382,8:5420,9:5421,6:5424,5:5425,3:5607,2:5608},90:{71:2504,70:2505,61:2528,60:2529,59:2530,58:2531,76:3202,77:3203,78:3205,79:3207,74:3214,73:3215,67:3231,68:3232,64:3235,63:3236,65:3237,56:3260,55:3262,54:3264,52:3274,51:3275,46:3295,45:3296,44:3300,43:3302,41:3305,40:3306,38:3314,37:3315,36:3318,81:3862,82:3865,26:4003,27:4004,28:4006,84:4486,85:4488,86:4490,23:4621,22:4622,20:4637,19:4638,91:4976,92:4977,94:5008,95:5011,98:5051,99:5052,12:5378,11:5379,9:5422,8:5423,5:5426,6:5427,3:5605,2:5606},91:{58:2532,59:2533,79:3208,78:3209,73:3216,68:3229,67:3230,65:3238,64:3239,56:3261,55:3263,54:3265,52:3276,51:3277,50:3278,48:3290,47:3291,46:3294,45:3297,41:3307,40:3308,38:3316,37:3317,36:3319,35:3320,81:3866,82:3867,33:3972,32:3974,28:4007,27:4008,29:4011,30:4012,88:4500,89:4502,24:4619,23:4620,22:4623,95:5016,96:5017,99:5053,98:5054,17:5362,16:5363,14:5373,13:5375,12:5377,11:5380,3:5603,2:5604,1:5611},12:{35:2845,36:2846,37:2849,38:2850,40:2853,41:2854,42:2859,45:2866,46:2868,44:2869,47:2873,49:2876,50:2877,51:2879,53:2888,54:2889,56:2894,57:2895,58:2898,59:2899,60:2905,28:3563,29:3564,62:3636,63:3638,64:3640,21:4191,22:4190,20:4192,25:4194,26:4195,67:4336,68:4337,17:4816,18:4817,73:4901,74:4903,75:4905,76:4907,77:4909,79:4913,80:4916,81:4917,82:4920,84:4922,85:4923,86:4926,12:5178,11:5179,9:5250,8:5251,88:5339,89:5340,90:5343,91:5344,92:5345,5:5459,6:5460,3:5475,2:5476,94:5539,95:5540,97:5691,98:5693,99:5695,100:5697},11:{35:2847,36:2848,37:2851,38:2852,40:2855,41:2856,42:2860,44:2870,45:2871,51:2880,50:2881,53:2890,54:2891,56:2896,57:2897,59:2900,58:2901,60:2904,31:3565,32:3566,33:3569,26:4196,25:4197,24:4198,66:4334,67:4335,68:4338,70:4887,71:4888,73:4902,74:4904,75:4906,76:4908,77:4910,79:4914,80:4915,15:5166,14:5167,13:5176,12:5177,11:5180,9:5252,8:5253,6:5456,5:5458,3:5473,2:5474,1:5477,99:5699,100:5702},10:{40:2857,41:2858,51:2882,50:2883,53:2892,54:2893,59:2902,60:2903,31:3567,32:3568,33:3570,47:3595,48:3596,63:3634,62:3635,24:4199,25:4200,23:4201,22:4204,26:4225,28:4226,29:4227,65:4329,66:4331,67:4333,20:4819,19:4821,18:4823,17:4826,70:4889,71:4890,73:4911,74:4912,15:5168,14:5169,13:5174,12:5175,82:5307,83:5309,6:5455,5:5457,3:5471,2:5472,1:5478,85:5521,86:5523,87:5525,88:5527,89:5529,92:5652,91:5653,94:5681,95:5682,96:5683,97:5684,99:5700,100:5701},92:{73:3217,72:3218,70:3221,69:3222,68:3225,67:3226,65:3246,64:3247,62:3248,61:3249,55:3266,54:3267,50:3279,51:3280,52:3281,48:3292,47:3293,46:3303,45:3304,41:3309,42:3310,43:3311,35:3321,36:3322,81:3868,82:3869,83:3873,84:3875,76:3884,75:3885,33:3973,32:3975,28:4009,29:4010,30:4013,86:4495,87:4497,88:4499,89:4501,90:4503,25:4617,24:4618,23:4624,22:4630,92:4996,93:4997,95:5022,96:5023,99:5055,98:5057,19:5084,20:5085,17:5364,16:5365,14:5374,13:5376,9:5568,8:5569,6:5594,5:5596,2:5609,1:5610},93:{72:3219,73:3220,69:3223,70:3224,67:3227,68:3228,62:3250,61:3251,60:3252,59:3253,58:3256,57:3257,55:3268,54:3269,43:3312,42:3313,79:3876,82:3871,83:3872,84:3874,78:3877,76:3886,75:3887,39:3965,38:3966,32:3976,33:3978,86:4496,87:4498,90:4504,89:4505,26:4615,25:4616,24:4629,92:4998,93:4999,99:5056,98:5058,20:5081,19:5082,17:5366,16:5367,11:5564,10:5566,9:5567,8:5570,6:5595,5:5597,4:5598,2:5612,1:5613},94:{60:3254,59:3255,58:3258,57:3259,79:3878,78:3879,80:3880,76:3888,75:3889,65:3910,64:3911,52:3932,51:3933,49:3935,48:3936,46:3949,45:3950,40:3961,39:3964,38:3967,37:3968,36:3970,32:3977,33:3979,34:3981,30:4611,29:4613,26:4625,27:4626,92:5000,93:5001,95:5036,96:5038,22:5077,21:5078,20:5080,19:5083,17:5368,16:5369,15:5370,13:5559,12:5561,11:5563,10:5565,4:5599,5:5600},9:{33:3571,34:3572,36:3575,37:3576,38:3579,43:3587,44:3588,47:3597,48:3598,46:3599,56:3621,57:3622,62:3632,63:3633,23:4202,22:4203,24:4224,29:4228,28:4229,65:4328,66:4330,67:4332,20:4820,19:4822,18:4824,17:4825,69:4891,70:4892,15:5170,14:5171,10:5214,9:5215,76:5286,77:5287,79:5301,80:5303,81:5305,82:5306,83:5308,7:5451,6:5454,85:5520,86:5522,87:5524,88:5526,89:5528,92:5650,91:5651,94:5679,95:5680,96:5685,97:5686},8:{33:3573,34:3574,36:3577,37:3578,38:3580,39:3581,40:3584,41:3585,43:3589,44:3590,46:3600,47:3601,48:3602,49:3603,50:3604,52:3607,53:3608,55:3617,56:3620,57:3623,59:3625,60:3627,61:3629,62:3631,31:4233,30:4232,28:4231,29:4230,27:4237,26:4238,69:4893,70:4894,15:5172,14:5173,12:5210,11:5211,10:5212,9:5213,72:5279,73:5281,74:5285,76:5288,77:5289,79:5300,80:5302,81:5304,82:5310,83:5311,7:5452,6:5453,3:5469,4:5470,91:5648,92:5649,97:5687,98:5688},7:{39:3582,40:3583,41:3586,43:3591,44:3592,50:3605,49:3606,52:3609,53:3610,55:3618,56:3619,57:3624,59:3626,60:3628,61:3630,31:4235,30:4236,26:4239,27:4240,28:4241,24:4827,23:4829,64:4879,65:4880,69:4895,68:4896,67:4897,70:4900,21:5181,20:5183,18:5193,17:5194,12:5208,11:5209,72:5278,73:5280,74:5284,76:5290,77:5291,4:5466,3:5468,85:5516,86:5517,88:5640,89:5641,90:5646,91:5647,94:5662,95:5663,97:5689,98:5690},6:{43:3593,44:3594,52:3611,53:3612,33:4244,34:4245,35:4250,36:4251,37:4252,46:4300,47:4301,24:4828,23:4830,64:4881,65:4882,63:4883,67:4898,68:4899,21:5182,20:5184,18:5195,17:5196,16:5201,14:5202,13:5203,12:5206,11:5207,9:5240,8:5241,73:5282,74:5283,76:5292,77:5293,78:5294,79:5295,6:5461,5:5463,4:5465,3:5467,81:5509,82:5510,84:5512,85:5515,86:5518,88:5642,89:5643,90:5644,91:5645,94:5664,95:5665,93:5666},5:{53:3613,54:3614,33:4246,34:4247,35:4248,36:4249,37:4253,39:4256,40:4259,41:4260,46:4302,47:4303,48:4306,49:4308,50:4311,56:4316,57:4318,58:4321,59:4322,60:4324,61:4327,23:4831,24:4834,26:4838,27:4839,29:4849,30:4851,31:4853,63:4884,64:4885,65:4886,20:5187,17:5197,16:5200,14:5204,13:5205,12:5216,9:5238,8:5239,70:5268,71:5269,79:5299,78:5298,6:5462,5:5464,81:5507,82:5508,84:5513,85:5514,86:5519,93:5667,94:5668,97:5711,98:5712},4:{54:3615,53:3616,35:4254,34:4255,39:4257,40:4258,41:4261,43:4288,44:4289,46:4304,47:4305,48:4309,49:4310,50:4312,51:4313,56:4317,57:4319,58:4320,59:4323,60:4325,61:4326,23:4832,24:4833,22:4835,26:4840,27:4841,29:4850,30:4852,31:4854,20:5188,19:5190,17:5198,16:5199,10:5233,9:5234,8:5237,67:5265,68:5267,70:5270,71:5271,72:5274,73:5275,2:5489,3:5490,75:5491,76:5492,81:5505,82:5506,88:5635,89:5636,91:5675,93:5673,92:5674,97:5713,98:5714,96:5715},95:{79:3881,80:3882,78:3883,76:3890,75:3891,74:3892,72:3895,71:3897,70:3899,69:3901,67:3905,66:3906,65:3909,64:3912,63:3913,62:3914,55:3926,54:3927,53:3930,52:3931,51:3934,48:3937,49:3938,46:3951,45:3952,44:3957,43:3958,42:3959,40:3962,39:3963,37:3969,36:3971,33:3980,34:3982,82:4506,83:4509,84:4510,85:4513,30:4610,29:4612,26:4627,27:4628,87:4988,88:4989,92:5002,93:5003,91:5004,90:5005,95:5037,96:5039,97:5044,98:5045,24:5072,23:5073,22:5076,21:5079,15:5371,16:5372,13:5560,12:5562,11:5571,10:5572,8:5584,7:5585,5:5601,4:5602,1:5624,2:5625},96:{74:3893,75:3894,72:3896,71:3898,70:3900,69:3902,67:3907,66:3908,62:3915,63:3916,64:3917,60:3918,59:3919,58:3922,57:3923,55:3928,54:3929,49:3939,48:3940,46:3953,45:3954,44:3955,43:3956,42:3960,82:4507,83:4508,84:4511,85:4512,31:4606,30:4609,87:4990,88:4991,91:5006,90:5007,96:5040,97:5043,98:5046,24:5074,23:5075,22:5086,19:5359,18:5360,8:5586,7:5587,2:5621,1:5622},97:{72:3903,71:3904,60:3920,59:3921,58:3924,57:3925,49:3941,50:3942,51:3945,52:3946,85:4514,84:4515,77:4518,78:4520,79:4522,80:4524,40:4583,39:4584,37:4593,36:4594,35:4599,33:4601,32:4602,31:4607,30:4608,87:4992,88:4993,93:5032,94:5033,96:5041,97:5042,28:5059,27:5062,26:5064,20:5356,19:5357,18:5361,16:5557,15:5558,13:5573,12:5574,11:5582,8:5588,7:5589,9:5592,5:5614,4:5616,3:5618,2:5620,1:5623},98:{50:3943,49:3944,51:3947,52:3948,85:4516,84:4517,77:4519,78:4521,79:4523,80:4525,81:4528,82:4529,74:4531,75:4532,69:4539,68:4540,66:4547,65:4549,64:4551,63:4553,62:4555,54:4559,55:4560,47:4575,46:4576,45:4579,44:4580,40:4585,39:4586,41:4588,42:4590,37:4595,36:4596,35:4600,33:4603,32:4604,31:4614,87:4994,88:4995,91:5026,90:5024,92:5028,93:5030,94:5034,28:5060,27:5063,26:5065,24:5347,23:5348,22:5351,21:5352,20:5355,19:5358,16:5555,15:5556,13:5575,12:5576,11:5583,8:5590,7:5591,9:5593,5:5615,4:5617,3:5619},3:{39:4262,38:4263,37:4264,43:4290,44:4291,51:4314,50:4315,22:4836,23:4837,26:4842,27:4843,31:4855,32:4856,20:5191,19:5192,14:5225,13:5226,11:5229,10:5231,9:5235,8:5236,63:5254,64:5258,65:5260,66:5262,67:5264,68:5266,70:5272,71:5273,72:5276,73:5277,6:5479,5:5481,4:5483,3:5485,2:5487,75:5493,76:5494,77:5495,78:5496,80:5501,81:5504,82:5511,84:5626,85:5628,86:5630,87:5632,88:5634,89:5637,91:5676,92:5677,93:5678,96:5716,97:5717,95:5718,98:5721},2:{37:4265,38:4266,39:4267,42:4298,43:4292,44:4293,41:4299,26:4844,27:4845,25:4846,32:4857,31:4858,30:4859,29:4860,53:4863,54:4865,55:4867,56:4869,58:4871,59:4873,60:4875,61:4877,17:5217,16:5219,15:5222,14:5223,13:5227,11:5230,10:5232,63:5257,64:5259,65:5261,66:5263,6:5480,5:5482,4:5484,3:5486,2:5488,77:5497,78:5498,76:5499,75:5500,80:5502,81:5503,84:5627,85:5629,86:5631,87:5633,95:5719,96:5720},1:{43:4294,44:4295,42:4296,41:4297,25:4847,26:4848,29:4861,30:4862,53:4864,54:4866,55:4868,56:4870,58:4872,59:4874,60:4876,61:4878,17:5218,16:5220,15:5221,14:5224,13:5228,86:5638,87:5639},99:{80:4526,81:4527,82:4530,75:4533,74:4534,73:4535,72:4536,69:4541,68:4542,70:4545,66:4548,65:4550,64:4552,63:4554,62:4556,54:4561,55:4562,56:4563,57:4565,58:4567,59:4569,60:4571,47:4577,46:4578,45:4581,44:4582,40:4587,41:4589,42:4591,39:4592,37:4597,36:4598,90:5025,91:5027,92:5029,93:5031,94:5035,28:5068,29:5070,24:5349,23:5350,22:5353,21:5354,17:5551,16:5553,13:5577,12:5579},100:{72:4537,73:4538,69:4543,68:4544,70:4546,66:4557,65:4558,56:4564,57:4566,58:4568,59:4570,60:4572,55:4573,54:4574,28:5069,29:5071,17:5552,16:5554,13:5580,12:5581}};
}


$(function() {
	// Icons
	Emotiworld.icons = JSON.parse( GM_getValue("emoticons", '0') );
	if(!Emotiworld.icons)
		Emotiworld.icons = ['ツ', '(●‿●)', '(˘◡˘)', '◤(¬‿¬)◥', '┌∩┐(◣_◢)┌∩┐', '(´ᗣ｀)', '(º_•)', '⊙_⊙', '(╯°□°）╯︵ ┻━┻', '=^..^=', '웃'];
	Emotiworld.ikariamInit();
});
