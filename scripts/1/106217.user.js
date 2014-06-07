// ==UserScript==

// @name			Planets Comments
// @namespace		planetscomments
// @description		Planets Comments - Greasemonkey script for commenting planets like "poor defending", "a lot of crys", etc.
// @include			http://*.ogame.*game/index.php?page=galaxy*
// @copyright		2011, Imperor [Roman Smirnov]
// @license			GNU GPL
// @version			0.1a
// @author			Imperor (Roman Smirnov)
// @icon			http://ebsb.ru/gm/placom/icon.png

// @history		1.0a: Released

// ==/UserScript==

var aWindow = (typeof unsafeWindow != 'undefined')? unsafeWindow: window;

var document = aWindow.document;
var localStorage = aWindow.localStorage;
var $ = aWindow.$;

var galaxy = aWindow.galaxy;
var system = aWindow.system;

var lang;

// LANGUAGES
var plaCom_lang =
{
	// RU: Russian
	ru:
	{
		comment_sign: 'Комментарий',
		no_comment: 'не указан',
		edit_link: 'ред.',
		edit: 'редактирование',
		save: 'Сохранить',
		cancel: 'Отмена'
	},
	
	// EN: English
	en:
	{
		comment_sign: 'Comments',
		no_comment: 'not defined',
		edit_link: 'edit',
		edit: 'edit mode',
		save: 'Save',
		cancel: 'Cancel'
	}
}

var planetComs =
{
	Init: function() {
		this.setLang();
		this.galaxyLoaded();
		aWindow.placom_editComment = this.editComment;
		aWindow.placom_saveComment = this.saveComment;
		aWindow.placom_cancel = this.cancel;
		aWindow.placom_reset = this.reset;
	},
	
	setLang: function() {
		if (document.location.href.search(new RegExp("http://.*\.ogame\.ru/*")) != -1) { lang = plaCom_lang.ru; return; }
		
		lang = plaCom_lang.en;
	},
	
	galaxyLoaded: function() {
		$("#galaxyContent").ajaxSuccess(function(e,xhr,settings) {
		if (settings.url.indexOf("page=galaxyContent") == -1) return;
		var i = 1;
		
		while (i<16) {
		
			planetSearch = '#galaxyContent   tr.row   div#planet'+i+'   div.body';
			planetAlive = $(planetSearch).length;
			
			if (planetAlive==1) {
				planetLinks = $(planetSearch).html();
				planetAdr = galaxy+'_'+system+'_'+i;
				storageAdr = 'Planets.Comments.'+planetAdr+'_comment';
				planetComment = ReadLS(storageAdr);
				if (planetComment === false) {
					planetComment = lang.no_comment;
				}
				newPlanetLinks = '<div id="placom'+planetAdr+'"><div id="commentSign' + planetAdr+ '"><h4><span class="spacing">' + lang.comment_sign + ': <span class="textNormal" style="float: right; margin-right: 8px;" id="editLink'+planetAdr+'"><a href="javascript:void(0);" onClick="placom_editComment(\'' + planetAdr + '\', this.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode);" style="display: inline;">' + lang.edit_link + '</a></span></span></h4></div><div id="comment' + planetAdr + '" style="margin: 5px;">' + planetComment + '</div></div>';
				$(planetSearch).append(newPlanetLinks);
			}
			i++;
		}
		});
	},
	
	editComment: function(planetAdr, parObj) {
		data = planetAdr.split('_');
		planetNum = data[2];
		storageAdr = 'Planets.Comments.'+planetAdr+'_comment';
		planetComment = ReadLS(storageAdr);
		if (planetComment === false) {
			planetComment = '';
		}
		var newObj =  $('<div id="placom_' + planetAdr + '" style="display: none"></div>').get(0);
		newObj.innerHTML += '<div id="commentSign' + planetAdr+ '"><h4><span class="spacing">' + lang.comment_sign + ': <span class="textNormal" style="float: right; margin-right: 8px;" id="editSign'+planetAdr+'">' + lang.edit + '</span></span></h4></div><div id="editComment' + planetAdr + '" style="margin: 5px;"><textarea style="margin-bottom: 5px;" id="newComment'+planetAdr+'" cols=30 rows=1>' + planetComment + '</textarea><br><a style="display: inline;" href="javascript:void(0);" onClick="placom_saveComment(\''+planetAdr+'\');">'+lang.save+'</a> ||| <a style="display: inline;" href="javascript:void(0);" onClick="placom_cancel(\''+planetAdr+'\');">'+lang.cancel+'</a></div>';
		parObj.appendChild(newObj);
		$('#placom_'+planetAdr).show("slow");
	},
	
	saveComment: function (planetAdr) {
		newComment = $('#newComment'+planetAdr).val();
		storageAdr = 'Planets.Comments.'+planetAdr+'_comment';
		WriteLS(storageAdr, newComment, 100000);
	},
	
	cancel: function (planetAdr) {
		$('#placom_'+planetAdr).hide();
	},
	
	reset: function () {
		ClearLS();
	}
}

function WriteLS(sKey, sValue, iStoreH) {
	localStorage.setItem(sKey, sValue + '&store:' + ((new Date()).getTime() + iStoreH * 3600 * 1000));
}

function ReadLS(sKey) {
	sValue = localStorage.getItem(sKey);
	if (!sValue) return false;
	arrValue = sValue.split('&store:');
	if (arrValue[1] < (new Date()).getTime()) {
		localStorage.removeItem(sKey)
		return false;
	}
	return arrValue[0];
}

function ClearLS_() {
	if (Math.random() >= 0.01) return false;
	for (var i = 0; i < localStorage.length; i++) {
		sValue = localStorage[localStorage[i]];
		if (sValue.indexOf('&store:') != -1);
			if (sValue.split('&store:')[1] < (new Date()).getTime()) localStorage.removeItem(localStorage[i]);
	}
	return true;
}

function ClearLS() {
	localStorage.clear();
}

function ShowLS() {
	sMem = '';
	for (var i = 0; i < localStorage.length; i++) sMem += localStorage[i] + ' => ' + localStorage[localStorage[i]] + '\n';
	alert(sMem);
}

planetComs.Init();