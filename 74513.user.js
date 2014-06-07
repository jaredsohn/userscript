// ==UserScript==
// @name The West - Favorite Jobs
// @namespace http://userscripts.org/users/120392
// @description Stores favorite jobs and categorizes them accordingly
// @author JoeSmith
// @include http://*.the-west.*/game.php*
// ==/UserScript==

/*
	Eine Veraenderung, Weitergabe oder sonstige Veroeffentlichung dieses Scripts oder Teilen davon bedarf einer schriftlichen Genehmigung des Autors. 
	Das Copyright liegt beim Autor.
	
	Copywright remains entact from original Author.
	
	My name is x.Peter.x, and I'm a Script Developer for The-West.  This script is without a doubt the best piece of work released for The-West...
	I got permission from the original author to translate / fix / redistrobute this on the English servers.
	You can message me on UserScripts @ xPeterx - for information regarding his permission granted.
	
*/
function getMoCheckVersion() {
	return "1.2";
}

function getAuthor() {
	var hrefStr = '';
	switch(window.location.hostname.substr(0,window.location.hostname.search(/\./))) {
		case 'de1':
		case 'de7':
		case 'de9':
			hrefStr = 'javascript:AjaxWindow.show(\'profile\',{char_id:416225},\'416225\');';
			break;
		default:
			hrefStr = 'http://userscripts.org/users/120392';
			newStr = 'http://userscripts.org/users/141685';
	}
	return 'Author:&nbsp;<a href=\"' + hrefStr + '\">JoeSmith</a>&nbsp; Revived WITH permission by: <a href=\"' + newStr + '\">x.Peter.x</a>';
}

function isMinVersion(a, b) {
	var result = true;
	a = a.replace(/\./g, "");
	b = b.replace(/\./g, "");
	for (var i = 1; i <= Math.max(a.length, b.length); i++) {
		var z1 = parseInt(a.length >= i ? a[i-1] : "0");
		var z2 = parseInt(b.length >= i ? b[i-1] : "0");
		var res = "ok";
		if(z1 > z2) {
			break;
		}
		if(z1 < z2) {
			result = false;
			break;
		}
	}
	return result;
}

function init() {
	MoCheck.resourceBundle = {
		'dialog.closeAll.popup':'Close All',
		'dialog.minimize.popup':'Minimize',
		'dialog.close.popup':'Close',

		'dialog.tab.work.titel':'Job',
		'dialog.tab.work.nothingSelected.1':'There is no selected work!',
		'dialog.tab.work.nothingSelected.2':'You need to open a job and add it.',
		'dialog.tab.work.tableHeader.work':'Work',
		'dialog.tab.work.tableHeader.points':'Labor Points',
		'dialog.tab.work.tableHeader.points.popup':'Total Labor Points for Each Job.',
		'dialog.tab.work.tableHeader.wages':'Wages',
		'dialog.tab.work.tableHeader.experience':'Experience',
		'dialog.tab.work.tableHeader.luck':'Luck',
		'dialog.tab.work.tableHeader.motivation':'Motivation',
		
		'dialog.tab.configuration.titel':'Configuration',
		'dialog.tab.configuration.availableColumns':'Available List:',
		'dialog.tab.configuration.actual':'actual',
		'dialog.tab.configuration.btnDelete':'Delete',
		'dialog.tab.configuration.btnRename':'Rename',
		'dialog.tab.configuration.btnNew':'New',
		'dialog.tab.configuration.visibleColumns':'Visible Columns in the List:',
	
		'select.option.minutes':'Minutes',
		'select.option.hour':'Hour',
		'select.option.hours':'Hours',
		
		'btnOk.label':'Ok',
		'btnAdd.popup':'Add Job',
		'btnCenter.popup':'Center on the map',
		'btnDelete.popup':'Delete from the list',
	
		'message.error.unableToDeleteCurrentList':'Unable to Delete Current List.',
		'message.deleteList':'Delete List?',
		'message.newName':'New List:',
		'message.addedWork':'Job Added.',
		'message.deleteFromList':'Delete from list?',
		'message.listLoaded':'List Loaded.',
		'message.listDeleted':'List Deleted.',
		'message.listRenamed':'List Renamed.',
		'message.listCreated':'List Created.',
		'message.error.nameAlreadyDefined': 'Name already in use.',
		
		'author':'Autor:'
	};
	MoCheck.cookieName = 'motScript';
	MoCheck.cookieSplitter = '/*.';
	MoCheck.oldCookieName = 'moScript';
	
	MoCheck.user = $('avatar').innerHTML.substring($('avatar').innerHTML.toLowerCase().indexOf('</div>')+6, $('avatar').innerHTML.length);
	MoCheck.world = window.location.href.substring(window.location.href.indexOf("//") + 2, window.location.href.indexOf("//") + 5);
	
	this.listen = new Array();
	this.arbeiten = new Object();
	this.columnVisibility = new Object();
	
	MoCheck.ColumnVisibility = new Class({
		wages:true,
		experience:true,
		luck:true,
		motivation:true,
		initialize:function(wages,experience,luck,motivation){
			this.wages=wages;
			this.experience=experience;
			this.luck=luck;
			this.motivation=motivation;
		},
		show_wages:function(){return this.wages;},
		show_experience:function(){return this.experience;},
		show_luck:function(){return this.luck;},
		show_motivation:function(){return this.motivation;},
		toString2:function(){return '' + Number(this.wages) + Number(this.experience) + Number(this.luck) + Number(this.motivation);},
		count:function(){return Number(this.wages) + Number(this.experience) + Number(this.luck) + Number(this.motivation);}
	});
	
	this.getCookie();
	this.addMotivationButton();
	this.resetSortOrder();
	
	AjaxWindow.setJSHTML_Motivation = AjaxWindow.setJSHTML;
	AjaxWindow.setJSHTML = function(div,content) {
		AjaxWindow.setJSHTML_Motivation(div,content);
		if(div && div.id) {
			if(div.id.search(/window_job/) != -1) {
				var splt = div.id.split("_");
				var aktJob = MoCheck.createJob(new Job(splt[2], splt[3]));
				
				var isNewJob = (MoCheck.getAktArbeiten().filter(function(job, index){
				    return (job.pos.x == aktJob.pos.x) && (job.pos.y == aktJob.pos.y);
				})).length == 0;
	
				if(isNewJob) {
					var btnAdd = new Element('img',{title:'', src:'img.php?type=button&subtype=normal&value=plus', styles:{cursor:'pointer', 'margin-left':'20px'}});
					btnAdd.addMousePopup(new MousePopup(MoCheck.getString('btnAdd.popup'),100,{opacity:0.9}));
					
					btnAdd.addEvent('click',function(){
						$ES('.mousepopup').each(function(el){el.setStyle('visibility','hidden')});
						this.remove();
						MoCheck.getJobInfoFromDiv(div.id, aktJob);
						MoCheck.addArbeit(div.id, aktJob);
					});
					
					btnAdd.injectInside($ES('h2', div)[0]);
				}
			}
		}
	}
}

function divInject(div,content) {
	div.empty();
	content.inject(div);
}

function createJob(arbeit) {
	var job = new Job(arbeit.pos.x, arbeit.pos.y);
	job.getKey = function() {
		return this.pos.x + '_' + this.pos.y;
	};
	return job;
}

/*
 * Liefert die Arbeiten einer Liste
 */
function getArbeiten(listenName) {
	if(this.arbeiten[listenName] == null) {
		this.arbeiten[listenName] = new Array();
		this.listen.push(listenName);
	}
	return this.arbeiten[listenName];
}

function setArbeiten(arbeiten) {
	this.arbeiten = $defined(arbeiten) ? arbeiten : new Object();
}

/*
 * Liefert die Arbeiten der aktuellen Liste
 */
function getAktArbeiten() {
	return this.getArbeiten(this.getAktListe());
}

/*
 * Liefert die aktuellen Liste
 */
function getAktListe() {
	if(this.aktListe == undefined || this.aktListe == null || this.aktListe == '') {
		alert("DEBUG_INFO (getAktListe()): this.aktListe nicht definiert. Darf nicht vorkommen!");
	}
	return this.aktListe;
}

function setAktListe(aktListe) {
	this.aktListe = $defined(aktListe) ? aktListe : 'default';
}

/**
 * Setzt die sichtbaren Spalten einer uebergebenen Liste
 * Falls listenName leer: Sichtbare Spalten der aktuellen Liste
 * @columnVisibility als Object, z.B. {'column1':Bool, 'column2':Bool, 'column3':Bool};
 */
function setColumnVisibility(columnVisibility, listenName) {
	listenName = $defined(listenName) ? listenName : this.getAktListe();
	this.columnVisibility[listenName] = columnVisibility;
}

/*
 * Liefert die sichtbaren Spalten einer uebergebenen Liste
 * Falls listenName leer: Sichtbare Spalten der aktuellen Liste
 */
function getColumnVisibility(listenName) {
	listenName = $defined(listenName) ? listenName : this.getAktListe();
	var result = $defined(this.columnVisibility[listenName]) ? this.columnVisibility[listenName] : new MoCheck.ColumnVisibility(true, true, true, true);
	return result;
}


function isColumnVisible(column) {
	return eval('this.getColumnVisibility().show_' + column + '()');
}

function changeColumnVisibility(obj) {
	var cols2 = MoCheck.getColumnVisibility();
	eval('cols2.' + obj.name + '=' + obj.checked + ';');
	this.setColumnVisibility(cols2);
	MoCheck.setCookie();
	
	window.addEvent('domready', MoCheck.divInject.bind(Ajax,[$('moWorkList'), MoCheck.getTable()]));
}

function initMoJobs() {
	var that = this;
	$each(this.listen, function(liste, index) {
		$each(that.arbeiten[liste], function(arbeit, index) {
			that.arbeiten[liste][index] = that.createJob(arbeit);
			
		});
	});
	if(AjaxWindow.windows['motivation'] != null) {
		MoCheck.getJobInfoFromServer(0);
	}
}

function resetSortOrder(){
	this.jobSortBy = 'motivation';
	this.jobSortType = 'desc';
}

function loadData(data) {
	data = Json.evaluate(data);
	
	this.columnVisibility = new Object();
	if($defined(data.columnVisibility)) {
		$each(data.columnVisibility, function(colStr, liste) {
			var columnVisibility = new MoCheck.ColumnVisibility(Boolean(Number(colStr[0])), Boolean(Number(colStr[1])), Boolean(Number(colStr[2])), Boolean(Number(colStr[3])));
			MoCheck.setColumnVisibility(columnVisibility, liste);
		});
	}
	
	this.setAktListe(data.aktListe);
	this.setArbeiten(data.arbeiten);
	this.reloadListen();
	this.initMoJobs();
}

/*
 * Ermittelt die verwendeten Listen
 */
function reloadListen() {
	this.listen = new Array();
	for (liste in this.arbeiten) {
		if(this.arbeiten[liste].length > 0) {
			this.listen.push(liste);
		}
	}
}

function sortArbeiten() {
	var that = this;
	this.getAktArbeiten().sort(function sortAsc(a, b){
		a = eval('a.' + that.jobSortBy);
		b = eval('b.' + that.jobSortBy);
		if(that.jobSortType == "asc") {
			return a > b ? 1 : a < b ? -1 : 0;
		} else {
			return a < b ? 1 : a > b ? -1 : 0;
		}
	});
}

function changeSortOrder(sortBy) {
	if(this.jobSortBy == sortBy) {
		this.jobSortType = this.jobSortType == 'asc' ? 'desc' : 'asc';
	} else {
		this.jobSortBy = sortBy;
		this.jobSortType = 'desc';
	}
	MoCheck.printResults();
};

/*
 * Liest alle Informationen zur aktuellen Arbeit und speichert sie in dieser
 * => Hat 'MoCheck.getAktArbeiten()' eine weitere Arbeit?
 		Ja: Server-Anfrage, Informationen auslesen, danach rekursiv naechste Arbeit
 		Nein: Rekusionsabbruch, weiter zu 'printResults()'
 */
function getJobInfoFromServer(jobIndex) {
	if(jobIndex < MoCheck.getAktArbeiten().length) {
		var aktArbeit = MoCheck.getAktArbeiten()[jobIndex];
		
		new Ajax('game.php?window=job&x='+aktArbeit.pos.x+'&y='+aktArbeit.pos.y,{
			method:'post',
			data:{},
			onComplete:function(data) {
				data=Json.evaluate(data);
				if(data.page!=undefined){
					var page=data.page;
					
					/* Temporaeren DIV erstellen */
					var divId = 'myJob_' + aktArbeit.getKey();
					var window_div = new Element('div',{'id':divId});
					window_div.setHTML(data.page);
					window_div.injectInside('window_bar');
					
					/* Informationen auslesen */
					MoCheck.getJobInfoFromDiv(divId, aktArbeit);
					
					/* Temporaeren DIV wieder loeschen */
					var trashvar = $(divId);
					trashvar.empty();
					trashvar.remove();
					Garbage.trash([trashvar]);
	
					/*  Rekursiver Aufruf mit naechster Arbeit */
					MoCheck.getJobInfoFromServer(++jobIndex);
				}
			}
		}).request();
	} else {
		AjaxWindow.windows['motivation'].isReady = true;
		MoCheck.printResults();
	}
}

/**
 * Job-Informationen aus einem Job-Div auslesen
 */
function getJobInfoFromDiv(divId, job) {
	job.name = $ES('h2', divId)[0].innerHTML;
	job.image = $ES('h2', divId)[0].style.backgroundImage.match(/images\/jobs\/.*\.[a-z]{3}/i);
	job.wages = parseInt($ES('.bar_perc', divId)[0].innerHTML);
	job.experience = parseInt($ES('.bar_perc', divId)[1].innerHTML);
	job.luck = parseInt($ES('.bar_perc', divId)[2].innerHTML);
	job.motivation = parseInt($ES('.bar_perc', divId)[4].innerHTML);
	job.arbeitspunkte = parseInt($ES('.skill_box_value', divId)[2].innerHTML);
}

/**
 * Motivations-Button zu Menu hinzufuegen
 */
function addMotivationButton() {
	var menuElem = new Element('li',{'id':'menu_motivation'});
	
	var moBtn = new Element('a',{'title':'', 'class':'button_wrap button', 'style':'white-space:nowrap;', href:'javascript:MoCheck.openMotivationWindow(\'motivation\', \'work\');'});
	moBtn.innerHTML = ' <span style="display:inline; float:left; width:9px; height:25px; margin-left:22px; background-image: url(\'../images/button/left_normal.png\');"></span>' +
					  '	<span class=\"button_middle\" style="display:inline; float:left; width:78px; background-image: url(\'../images/button/middle_normal.png\');">Motivation</span>' +
					  '	<span class=\"button_right\" style="display:inline; width: 9px; height:25px; float:left; background-image: url(\'../images/button/right_normal.png\');"></span>';
	moBtn.injectInside(menuElem);
	menuElem.injectInside($('right_menu'));
	if($ES('a', 'right_menu').length > 6) {
		$('abdorment_right').setStyle('top', parseInt($('abdorment_right').getStyle('top').substring(0, $('abdorment_right').getStyle('top').indexOf("px"))) + 20);
	}
}

/**
 * Oeffnet ein leeres AjaxWindow
 * @windowName
 * @group Vordefinierte Gruppe zum Minimieren, muss aus "AjaxWindow.possibleValues" sein
 */
function openMotivationWindow(windowName, group) {
	$ES('.mousepopup').each(function(el){el.setStyle('visibility','hidden')});
	
	if(!AjaxWindow.windows[windowName]){
		var window_div = new Element('div',{'id':'window_' + windowName,'class':'window'});
		AjaxWindow.windows[windowName]=window_div;
		var xhtml = '<div class="window_borders">';
		xhtml += '  <h2 id="window_' + windowName + '_title" class="window_title" style="background-image:url(img.php?type=window_title&value=work);"><span>' + windowName + '</span></h2>';
		xhtml += '  <a href="javascript:AjaxWindow.closeAll();" class="window_closeall"></a>';
		xhtml += '  <a href="javascript:AjaxWindow.toggleSize(\'' + windowName + '\', \'' + group + '\');" class="window_minimize"></a>';
		xhtml += '  <a href="javascript:AjaxWindow.close(\''+windowName+'\');" class="window_close"></a>';
		xhtml += '  <div id="window_' + windowName + '_content" class="window_content">';
		xhtml += '    <div class="tab_container" style="margin-left:7px; width:100%; height:275px">';
		xhtml += '      <ul class="tabs">' +
				 '        <li class="active" id="mojob.tab.arbeiten" onclick="MoCheck.showTab(\'moWorkList\');">'+ MoCheck.getString("dialog.tab.work.titel") + '</li>' + 
				 '        <li id="mojob.tab.konfiguration" onclick="MoCheck.showTab(\'moConf\');">' + MoCheck.getString("dialog.tab.configuration.titel") + '</li>' + 
				 '      </ul>';
		xhtml += '    	<table class="shadow_table">';
		xhtml += '    		<tr>';
		xhtml += '    			<td class="edge_shadow_top_left"></td>';
		xhtml += '    			<td class="border_shadow_top"></td>';
		xhtml += '    			<td class="edge_shadow_top_right"></td>';
		xhtml += '    		</tr>';
		xhtml += '    		<tr>';
		xhtml += '    			<td class="border_shadow_left"></td>';
		xhtml += '    			<td class="shadow_content">';
		xhtml += '    				<div>';
		xhtml += '    					<div style="overflow:auto;width: 675px; height: 275px; position: relative;" id="moWorkList"></div>';
		xhtml += '    					<div style="overflow:auto;width: 675px; height: 275px; position: relative; display:none;" id="moConf"></div>';
		xhtml += '    				</div>';
		xhtml += '    			</td>';
		xhtml += '    			<td class="border_shadow_right"></td>';
		xhtml += '    		</tr>';
		xhtml += '    		<tr>';
		xhtml += '    			<td class="edge_shadow_bottom_left"></td>';
		xhtml += '    			<td class="border_shadow_bottom"></td>';
		xhtml += '    			<td class="edge_shadow_bottom_right"></td>';
		xhtml += '    		</tr>';
		xhtml += '    	</table>';
		xhtml += '      <span style="position:absolute; right:22px;" id="moAktListInfo">&nbsp;</span>';
		xhtml += '      <span style="position:absolute; right:22px; top:19px;">' + MoCheck.getAuthor() + '</span>';
		xhtml += '      <div id=\"moWork_task_queue\"></div>';
		xhtml += '    </div>';
		xhtml += '  </div>';
		xhtml += '</div>';
		xhtml += '</div>';
		window_div.setHTML(xhtml);
		window_div.injectInside('windows');
		window_div.centerLeft();
		$ES('.window_closeall').each(function(el){el.addMousePopup(new MousePopup('<b>'+MoCheck.getString("dialog.closeAll.popup")+'<\/b>'));});
		$ES('.window_minimize').each(function(el){el.addMousePopup(new MousePopup('<b>'+MoCheck.getString("dialog.minimize.popup")+'<\/b>'));});
		$ES('.window_close').each(function(el){el.addMousePopup(new MousePopup('<b>'+MoCheck.getString("dialog.close.popup")+'<\/b>'));});
		var window_title_div=$('window_'+windowName+'_title');
		window_div.makeDraggable({handle:window_title_div});
		window_title_div.addEvent('dblclick',function(){
					window_div.centerLeft();
					window_div.setStyle('top',133);
				});
		AjaxWindow.bringToTop(window_div);
		window_div.addEvent('mousedown',AjaxWindow.bringToTop.bind(AjaxWindow,[window_div]));
		window_title_div.addEvent('mousedown',AjaxWindow.bringToTop.bind(AjaxWindow,[window_div]));
		
		var throbber=get_throbber();
		throbber.addClass('window_throbber_wrapper');
		throbber.injectInside($('moWorkList'));
		
		MoCheck.getJobInfoFromServer(0);
	} else {
		AjaxWindow.maximize(windowName);
	}
}

function doConfiguration(cmd, selectId) {
	var msg = '';
	var selectedListe = $(selectId).options[$(selectId).selectedIndex].value;
	
	switch(cmd) {
		case 'loadListe':
			this.setAktListe(selectedListe);
			msg = MoCheck.getString('message.listLoaded', selectedListe);
			break;
		case 'newListe':
			var newName = prompt(MoCheck.getString("message.newName"), '');
			if(newName == null || newName.length == 0) {
				return;
			}
			if($defined(this.arbeiten[newName])) {
				new HumanMessage(MoCheck.getString('message.error.nameAlreadyDefined', newName));
				return;
			}
			this.addListe(newName);
			this.setAktListe(newName);
			msg = MoCheck.getString('message.listCreated', newName);
			break;
		case 'deleteListe':
			if(confirm(unescape(MoCheck.getString('message.deleteList', selectedListe)))) {
				MoCheck.deleteListe(selectedListe);
				msg = MoCheck.getString('message.listDeleted', selectedListe);
			}
			break;
		case 'renameListe':
			var newName = prompt(MoCheck.getString("message.newName"), selectedListe);
			if(newName != null || newName.length == 0) {
				return;
			}
			if($defined(this.arbeiten[newName])) {
				new HumanMessage(MoCheck.getString('message.error.nameAlreadyDefined', newName));
				return;
			}
			this.arbeiten[newName] = this.arbeiten[selectedListe];
			this.arbeiten[selectedListe] = null;
			//ggf. aktListe neu setzen
			if(this.aktListe == selectedListe) {
				this.aktListe = newName;
			}
			msg = MoCheck.getString('message.listRenamed');
			break;
	}
	
	//Aenderungen speichern
	//TODO es muss nicht jedesmal neu geladen werden...
	this.setCookie();
	this.getCookie();
	
	/* ggf. Nachricht anzeigen */
	if(msg != '') {
		new HumanMessage(msg, {type:'success'});
	}
}

/* Ermittelt die Position der letzten Arbeit */
function getLastWorkPos() {
	last_work_pos = {x:pos.x,y:pos.y};
	for(var i=Tasks.tasks.length-1; i >= 0; i--) {
		if(Tasks.tasks[i].type == 'way') {
			last_work_pos={x:Tasks.tasks[i].data_obj.to_x,y:Tasks.tasks[i].data_obj.to_y};
			break;
		}
	}
	return last_work_pos;
}

/**
 * Eine Arbeit der Liste hinzufuegen
 */
function addArbeit(divId, job) {
	//Arbeit in Array aufnehmen
	MoCheck.getAktArbeiten().splice(0, 0, job);
	
	//Arbeit ggf. in Tabelle anzeigen
	if($defined(AjaxWindow.windows['motivation']) && AjaxWindow.windows['motivation'].isReady) {
		MoCheck.printResults();
	}
	
	//Arbeit in Cookie speichern
	this.setCookie();
	
	new HumanMessage(MoCheck.getString('message.addedWork'), {type:'success'});
}

/**
 * Eine Arbeit aus der Liste entfernen
 */
function deleteArbeit(x, y) {
	$each(MoCheck.getAktArbeiten(), function(aktArbeit, index) {
		if(x == aktArbeit.pos.x && y == aktArbeit.pos.y) {
			
			if(confirm(unescape(MoCheck.getString('message.deleteFromList', aktArbeit.name)))) {
				//Arbeit aus Array entfernen
				MoCheck.getAktArbeiten().splice(index, 1);
				
				//Arbeit aus Cookie loeschen
				MoCheck.setCookie();
				
				//Arbeit-Liste neu laden
				MoCheck.printResults();
			}
		}
	});
}

function addListe(name, arbeiten, columnVisibility) {
	this.listen.push(name);
	this.arbeiten[name] = $defined(arbeiten) ? arbeiten : new Array();
	this.columnVisibility[name] = $defined(columnVisibility) ? columnVisibility : new MoCheck.ColumnVisibility(true, true, true, true);
}

function deleteListe(name) {
	this.listen.splice(this.listen.indexOf(name), 1);
	this.arbeiten[name] = null;
	this.columnVisibility[name] = null;
	
	if(name == this.getAktListe()) {
		if(this.listen.length > 0) {
			this.setAktListe(MoCheck.listen[0]);
		} else {
			this.setAktListe('default');
		}
	}
}

/*
 * Arbeiten werden aus Platzgruenden etwas komprimiert gespeichert:
 * version/aktListe/liste1*x.y*x.y*x.y/liste2*x.y*x.y   usw.
 */
function getCookie() {
	var cookieVersion = "0";
	var data = "{}";
	
	if (document.cookie.indexOf(MoCheck.cookieName) != -1)  {
		var cookieContent = (document.cookie + ";").match(eval('/' + MoCheck.cookieName + '=.*?;/gi'));
		data = cookieContent[0].substring(MoCheck.cookieName.length + 1, cookieContent[0].length-1);
		
		data = unescape(data);
		
		var cookieElements = data.split(MoCheck.cookieSplitter[0]);
		cookieVersion = cookieElements[0];
		var aktListe = cookieElements[1];
		
		/* Arbeiten importieren */
		var arbeiten = '';
		var columnVisibility = '';
		for(var i=2; i < cookieElements.length; i++) {
			/* Aktuelle Liste in Json-Format bringen */
			var currList = '';
			var listElements = cookieElements[i].split(MoCheck.cookieSplitter[1]);
			var listenName = listElements[0];
			
			/* Sichtbare Spalten (Ab Version 1.1.3) */
			var coordsStartIndex = 1;
			var cols = "1111";
			if(this.isMinVersion(cookieVersion, "1.1.3")) {
				cols = listElements[1];
				coordsStartIndex = 2;
			}
			columnVisibility += (columnVisibility == '' ? '' : ',') + '"' + listenName + '":' + '"' + cols + '"';
			
			/* Coords der Arbeiten */
			for(var j = coordsStartIndex; j < listElements.length; j++) {
				/* Aktuelle Arbeit in Json-Format bringen */
				var coords = listElements[j].split(MoCheck.cookieSplitter[2]);
				var aktArbeit = '{"pos":{"x":"'+coords[0]+'","y":"'+coords[1]+'"}}';
				currList += (currList == '' ? '' : ',') + aktArbeit;
			}
			currList = '"' + listenName + '": [' + currList + ']';
			arbeiten += (arbeiten == '' ? '' : ',') + currList;
		}
		data = '{"aktListe":"' + aktListe + '", "arbeiten":{' + arbeiten + '}, "columnVisibility": {' + columnVisibility + '}}';
	}
	MoCheck.loadData(data);

	//ggf. Cookie direkt in neuer Version speichern
	if(!this.isMinVersion(cookieVersion, this.getMoCheckVersion())) {
		this.setCookie();
	}
	/* ggf. Arbeiten aus aelterer Version loeschen */
	if (document.cookie.indexOf(MoCheck.oldCookieName) != -1)  {
		document.cookie = MoCheck.oldCookieName + "=; expires=0";
	}

}

function setCookie() {
	/* Arbeiten exportieren */
	var exportArbeiten = '';
	for (liste in this.arbeiten) {
		//Leere Listen werden nicht gespeichert
		if(this.arbeiten[liste] != null && this.arbeiten[liste].length > 0) {
			var aktListe = '';
			var arbeiten = this.getArbeiten(liste);
			
			$each(arbeiten, function(arbeit, index) {
				var aktArbeit = arbeit.pos.x + MoCheck.cookieSplitter[2] + arbeit.pos.y;
				aktListe += (aktListe == '' ? '' : MoCheck.cookieSplitter[1]) + aktArbeit;
			});

			exportArbeiten +=  MoCheck.cookieSplitter[0] + liste + MoCheck.cookieSplitter[1] + this.getColumnVisibility(liste).toString2() + MoCheck.cookieSplitter[1] + aktListe;
		}
	}
	var data = MoCheck.getMoCheckVersion() + MoCheck.cookieSplitter[0] + MoCheck.aktListe + exportArbeiten;
	data = escape(data);
	var expires = new Date();
	expires.setTime(expires.getTime() + (1000 * 60 * 60 * 24 * 365));//1 Jahr

	document.cookie = MoCheck.cookieName + "=" + data + "; expires=" + expires.toGMTString();
}

function getString(key, param) {
	var str = $defined(MoCheck.resourceBundle[key]) ? MoCheck.resourceBundle[key] : key;
	
	if($defined(param)) {
		if (!(param instanceof Array)) { param = new Array(param); }
		for(var i=0; i<param.length; i++) {
			str = str.replace('%'+(i+1), param[i]);
		}
	}
	return str;
};

function showTab(tab) {
	var showMoTab = (tab == 'moWorkList');
	$('moWorkList').setStyle('display', showMoTab ? 'block' : 'none');
	$('moConf').setStyle('display', !showMoTab ? 'block' : 'none');
	if(showMoTab) {
		$('mojob.tab.arbeiten').addClass('active');
		$('mojob.tab.konfiguration').removeClass('active');
	} else {
		$('mojob.tab.arbeiten').removeClass('active');
		$('mojob.tab.konfiguration').addClass('active');
	}
}

function setWayTimeInfo(aktJob) {
	var lastWorkPos = (aktJob == null ? MoCheck.getLastWorkPos() : {x:aktJob.pos.x, y:aktJob.pos.y});
	
	$each(MoCheck.getAktArbeiten(), function(aktJob, index) {
		/* Entfernungs-Hinweis */
		var wayTime = WMap.calcWayTime(lastWorkPos, aktJob.pos);
		var el = $ES('a', $('window_Mojob_' + aktJob.getKey()));
		el.addMousePopup(new MousePopup(wayTime.formatDuration(), 100,{opacity:0.9}));
		el.setStyle('border', ((wayTime > 60 * 30) ? '1px solid red' : ''));
	});
}

function getFillBar(value) {
	//Verfuegbar: 300px für bis zu 4 Spalten (Lohn, Erfahrung, Glueck, Motivation)
	var cWidth = 300;
	var visibleCounter = MoCheck.getColumnVisibility().count();
	
	if(visibleCounter > 0) {
		cWidth = cWidth / visibleCounter;
	}
	
	return 	'<div class="bar" style="width:' + eval(cWidth+1) + 'px; border-right:1px solid black;"><div class="bar_fill" style="width:'+(value * (cWidth/100))+'px"></div>'+
				'<div class="bar_perc" style="width:'+cWidth+'px">'+value+'%</div>'+
			'</div>';
}

function getMoListenSelect(id) {
	var onChangeTxt = 'onChange="MoCheck.doConfiguration(\'loadListe\', id)"';
	
	var moListen = '<select id="' + id + '" size="1" style="width:200px" ' + onChangeTxt + '>';
	$each(MoCheck.listen, function(liste, index) {
		var isSelected = (liste == MoCheck.aktListe ? 'selected' : '');
		var isActual = liste + (liste == MoCheck.aktListe ? ' (' + MoCheck.getString("dialog.tab.configuration.actual") + ')' : '');
		moListen += '			<option value="' + liste + '" ' + isSelected + '>' + isActual + '</option>';
	});
	moListen += '</select>';
	return moListen;
}

function getConfigurationTab() {
	var id = "moConfListen";
	return '<div style="padding:5px">' +
			'	<span><h4>' + MoCheck.getString('dialog.tab.configuration.availableColumns') + '</h4>' +
					this.getMoListenSelect(id) + 
					'<br /><br />' +
					MoCheck.getButton("dialog.tab.configuration.btnDelete", 'MoCheck.doConfiguration(\'deleteListe\', \'' + id + '\')', false) +
					MoCheck.getButton("dialog.tab.configuration.btnRename", 'MoCheck.doConfiguration(\'renameListe\', \'' + id + '\')', false) +
					MoCheck.getButton("dialog.tab.configuration.btnNew", 'MoCheck.doConfiguration(\'newListe\', \'' + id + '\')', false) +
			'	</span><br />' +
			'	<span><br /><h4>' + MoCheck.getString('dialog.tab.configuration.visibleColumns') + '</h4>' +
					MoCheck.getCheckbox('wages') + 
					MoCheck.getCheckbox('experience') + 
					MoCheck.getCheckbox('luck') +
					MoCheck.getCheckbox('motivation') + 
			'	</span>' +
			'</div>';
}

function getButton(resString, js, deactivated) {
	var href = deactivated ? '' : 'href=\"javascript:' + js + ';\"';
	var btnClass = (deactivated ? 'button_grey' : 'button');
	var xhtml = '<a class=\"button_wrap '+btnClass+'\" '+href+' >' +
			 '  <span class=\"button_left\"></span><span class=\"button_middle\">' + MoCheck.getString(resString) + '</span><span class=\"button_right\"></span>' +
			 '  <span style=\"clear: both;\"></span>' +
			 '</a>';
	return xhtml;
}

function getCheckbox(id) {
	var resString = 'dialog.tab.work.tableHeader.' + id;
	var checked = this.isColumnVisible(id) ? 'checked="checked"' : '';
	var xhtml = '<input type="checkbox" name="' + id + '" value="' + id + '" onChange="MoCheck.changeColumnVisibility(this);" ' + checked + '>' + MoCheck.getString(resString) + '<br />';
	return xhtml;
}

/*
 * Stellt zu allen Arbeiten die ausgelesenen Informationen dar
 */ 
function printResults() {
	$ES('.mousepopup').each(function(el){el.setStyle('visibility','hidden')});
	
	MoCheck.sortArbeiten();
	
	Tasks.add_task_queue_xhtml($('moWork_task_queue'), {hide_info_full: true});
	if(MoCheck.getAktArbeiten().length > 0) {
		window.addEvent('domready', MoCheck.divInject.bind(Ajax,[$('moWorkList'), MoCheck.getTable()]));
	
		/* Buttons aktivieren */
		$each(MoCheck.getAktArbeiten(), function(aktJob, index) {
			//aktJob.window muss neu geladen werden, da zum Zeitpunkt der Variableninitialisierung noch nichts da war
			aktJob.window = $('window_Mojob_' + aktJob.getKey());
			
 			aktJob.button = new Button('ok', 'normal', 'button_start_task_Mojob_'+aktJob.getKey(), aktJob.start.bind(aktJob));
 			
			/* Nach jedem Klick neu Laden */
			aktJob.button.el.addEvent('click',function(){
				MoCheck.setWayTimeInfo(aktJob);
			});
		});
		MoCheck.setWayTimeInfo();
	} else {
		$('moWorkList').innerHTML = 
				"<div style='text-align:center;'><br />" +
				"	<h2>" + MoCheck.getString('dialog.tab.work.nothingSelected.1') + "</h2><br />" +
					MoCheck.getString('dialog.tab.work.nothingSelected.2') +
				"</div>";
	}
	
	window.addEvent('domready', AjaxWindow.setJSHTML.bind(AjaxWindow,[$('moConf'), MoCheck.getConfigurationTab()]));
	window.addEvent('domready',function(){
		$('moAktListInfo').innerHTML = MoCheck.getMoListenSelect("moWorkListen");
	});
}

function insertCell(id, html, row) {
	if(MoCheck.isColumnVisible(id)) {
		var cell = new Element('td');
		cell.innerHTML = html;
		cell.injectInside(row);
	}
}

/*
 * Eigentlicher Seiteninhalt
 */
function getTable() {
	var table=new Element('table', {'class':'table border', styles:{'width':'100%'}});
	var tbody=new Element('tbody');
	var th = new Element('tr', {styles:{'text-align':'center'}});
	th.injectInside(tbody);
	
	var thName = new Element('th', {styles:{width:'80px'}});
	thName.innerHTML = MoCheck.getString('dialog.tab.work.tableHeader.work');
	thName.injectInside(th);
	
	var thPunkte = new Element('th', {styles:{'cursor':'help'}});
	thPunkte.innerHTML = MoCheck.getString('dialog.tab.work.tableHeader.points');
	thPunkte.addMousePopup(new MousePopup(MoCheck.getString('dialog.tab.work.tableHeader.points.popup'),100,{opacity:0.9}));
	thPunkte.injectInside(th);
	
	if(MoCheck.isColumnVisible('wages')) {
		var thLohn = new Element('th');
		thLohn.innerHTML = "<a href='javascript:MoCheck.changeSortOrder(\"wages\");'>"+ MoCheck.getString('dialog.tab.work.tableHeader.wages') + "</a>";
		thLohn.injectInside(th);
	}
	
	if(MoCheck.isColumnVisible('experience')) {
		var thEP = new Element('th');
		thEP.innerHTML = "<a href='javascript:MoCheck.changeSortOrder(\"experience\");'>"+ MoCheck.getString('dialog.tab.work.tableHeader.experience') + "</a>";
		thEP.injectInside(th);
	}
	
	if(MoCheck.isColumnVisible('luck')) {
		var thLuck = new Element('th');
		thLuck.innerHTML = "<a href='javascript:MoCheck.changeSortOrder(\"luck\");'>"+ MoCheck.getString('dialog.tab.work.tableHeader.luck') + "</a>";
		thLuck.injectInside(th);
	}
	
	if(MoCheck.isColumnVisible('motivation')) {
		var thMo = new Element('th');
		thMo.innerHTML = "<a href='javascript:MoCheck.changeSortOrder(\"motivation\");'>"+MoCheck.getString('dialog.tab.work.tableHeader.motivation')+"</a>";
		thMo.injectInside(th);
	}
	
	var thc4 = new Element('th');
	thc4.innerHTML = "&nbsp;";
	thc4.injectInside(th);
	
	for(var i=0; i < MoCheck.getAktArbeiten().length;i++){
		var aktArbeit = MoCheck.getAktArbeiten()[i];
		
		var tr=new Element('tr', {'id': 'window_Mojob_' + aktArbeit.getKey(), styles:{'text-align':'center'}});
		var cName=new Element('td'); MoCheck.getJobImageTable(aktArbeit).injectInside(cName);cName.injectInside(tr);
		
		var cPunkte=new Element('td');	
		cPunkte.innerHTML = '<span class="calculation_visualisation img_equal">' +
							'<span class="skill_box_value'+(aktArbeit.arbeitspunkte <= 0? " red_text" : "")+'">'+aktArbeit.arbeitspunkte+'</span></span>';
		cPunkte.injectInside(tr);
		
		if(MoCheck.isColumnVisible('wages')) {
			var cLohn=new Element('td');
			cLohn.innerHTML = MoCheck.getFillBar(aktArbeit.wages);
			cLohn.injectInside(tr);
		}
		
		if(MoCheck.isColumnVisible('experience')) {
			var cEP=new Element('td');
			cEP.innerHTML = MoCheck.getFillBar(aktArbeit.experience);
			cEP.injectInside(tr);
		}
		
		if(MoCheck.isColumnVisible('luck')) {
			var cLuck=new Element('td');
			cLuck.innerHTML = MoCheck.getFillBar(aktArbeit.luck);
			cLuck.injectInside(tr);
		}
		
		if(MoCheck.isColumnVisible('motivation')) {
			var cMo=new Element('td');
			cMo.innerHTML = MoCheck.getFillBar(aktArbeit.motivation);
			cMo.injectInside(tr);
		}
		
		var aktJobId = aktArbeit.getKey();
		var selectWork = 
			'<select name=\'job_task_time\' style=\'vertical-align:top;\'>' +
			'	<option value=\'600\'>10 ' + MoCheck.getString("select.option.minutes") + '</option>' +
			'	<option value=\'1800\'>30 ' + MoCheck.getString("select.option.minutes") + '</option>' +
			'	<option value=\'3600\'>1 ' + MoCheck.getString("select.option.hour") + '</option>' +
			'	<option value=\'7200\' selected>2 ' + MoCheck.getString("select.option.hours") + '</option>' +
			'</select>' +
			'<span id=\'button_start_task_Mojob_' + aktJobId + '\'>' +
			'	<a class=\'button_wrap button\' href=\'#\' >' +
			'		<span class=\'button_left\'></span><span class=\'button_middle\'>' + MoCheck.getString("btnOk.label") + '</span><span class=\'button_right\'></span>' +
			'		<span style=\'clear: both;\'></span>' +
			'	</a>' +
			'</span>';
		var c4 = new Element('td', {styles:{'white-space':'nowrap'}});
		c4.innerHTML = selectWork;
		c4.injectInside(tr);
		
		tr.injectInside(tbody);
	}


	tbody.injectInside(table);
	return table;
}

function getJobImageTable(aktArbeit) {
		var image_div=new Element('div',{styles:{position:'relative', height:'42px', width:'35px', margin:'2px'}});
		var image=new Element('img',{title:'',src:aktArbeit.image,styles:{position:'absolute',left:0,top:0, height:'100%'}});
		image.addMousePopup(new MousePopup(aktArbeit.name,250,{opacity:0.9}));
		image.injectInside(image_div);
		
		var center = new Element('img',{title:'',src:'images/icons/center.png',styles:{position:'absolute',top:'3px',left:'44px',cursor:'pointer'}});
		center.addMousePopup(new MousePopup(MoCheck.getString('btnCenter.popup'),100,{opacity:0.9}));
		center.addEvent('click',function(){
			WMap.scroll_map_to_pos(parseInt(aktArbeit.pos.x), parseInt(aktArbeit.pos.y));
		});
		center.injectInside(image_div);

		var btnDelete = new Element('img',{title:'',src:'images/icons/cancel.png',styles:{position:'absolute',top:'22px',left:'42px',cursor:'pointer', width:'20px'}});
		btnDelete.addMousePopup(new MousePopup(MoCheck.getString('btnDelete.popup'),100,{opacity:0.9}));
		btnDelete.addEvent('click',function(){
			MoCheck.deleteArbeit(aktArbeit.pos.x, aktArbeit.pos.y);
		});
		btnDelete.injectInside(image_div);
	return image_div;
}

var moFunctions = ['init', 'addMotivationButton', 'openMotivationWindow', 
					'getCookie', 'setCookie',
					'getArbeiten', 'setArbeiten',
					'getAktListe', 'setAktListe',
					'addListe', 'deleteListe',
					'getColumnVisibility', 'setColumnVisibility',
					'isColumnVisible',
					'getAktArbeiten',
					'getMoCheckVersion', 'isMinVersion',
					'getString', 'showTab', 'createJob', 'getJobInfoFromServer', 'getJobInfoFromDiv', 
					'initMoJobs', 'resetSortOrder', 'loadData', 'divInject', 'sortArbeiten', 'changeSortOrder', 'printResults', 
					'setWayTimeInfo', 'getTable', 'getFillBar', 'getConfigurationTab', 'getButton', 'getCheckbox', 'doConfiguration', 'getJobImageTable', 'getLastWorkPos', 
					'addArbeit', 'deleteArbeit', 'reloadListen', 'getMoListenSelect', 'changeColumnVisibility', 'insertCell', 'getAuthor'];

var moCheck_script = document.createElement('script');
moCheck_script.type='text/javascript';
moCheck_script.text =  'if(window.MoCheck == undefined) {\n';
moCheck_script.text += '  window.MoCheck = new Object();\n';

for (var i = 0; i< moFunctions.length; i++) {
	var moFunction = moFunctions[i];
	moCheck_script.text += '  MoCheck.' + moFunction + ' = ' + eval(moFunction.toString()) + '\n';
};
moCheck_script.text += '  MoCheck.init();\n';
moCheck_script.text += '}';
document.body.appendChild(moCheck_script);



/////////////////////////////////
// Monkey Updater ///////////////
/////////////////////////////////
function update(filename){var body=document.getElementsByTagName('body')[0];script=document.createElement('script');script.src=filename;script.type='text/javascript';body.appendChild(script);var today=new Date();GM_setValue('muUpdateParam_116',String(today));}function CheckForUpdate(){var lastupdatecheck=GM_getValue('muUpdateParam_116','never');var updateURL='http://www.monkeyupdater.com/scripts/updater.php?id=116&version='+getMoCheckVersion();var today=new Date();var one_day=24*60*60*1000;if(lastupdatecheck!='never'){today=today.getTime();var lastupdatecheck=new Date(lastupdatecheck).getTime();var interval=(today-lastupdatecheck)/one_day;if(interval>=1){update(updateURL);}}else{update(updateURL);}}CheckForUpdate();