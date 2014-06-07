// ==UserScript==
// @name The West - Liste de munca
// @namespace http://userscripts.org/users/120392
// @description Un script util cu ajutorul caruia veti putea face liste de munci. Cu ajutorul acestui script puteti adauga munci intr-o lista apoi sa le sortati dupa motivatie, salariu, experienta,noroc si puncte de munca.
// @author JoeSmith and modified by PWG
// @include http://*.the-west.*/game.php*
// ==/UserScript==

/*
	Modificarea sau publicarea acestui script sau a oricarei parti din el necisita aprobarea scrisa a autorului.
        Drepturile de autor ii revin lui JoeSmith.
*/

function init() {
	MoCheck.resourceBundle = {
		'dialog.closeAll.popup':'Inchideti toate ferestrele',
		'dialog.minimize.popup':'Minimizeaza fereastra',
		'dialog.close.popup':'Inchide fereastra',
		'dialog.aktListInfo':'Traducere by PWG',

		'dialog.tab.work.titel':'Munca',
		'dialog.tab.work.nothingSelected.1':'Adaugati mai mult de un loc de munca',
		'dialog.tab.work.nothingSelected.2':'Pentru adaugarea in lista, mergeti la locul de munca si apasati pe + .',
		'dialog.tab.work.tableHeader.work':'Munca',
		'dialog.tab.work.tableHeader.points':'Puncte de munca',
		'dialog.tab.work.tableHeader.points.popup':'Punctele de munca se vor schimba la fiecare actualizare a hainelor.',
		'dialog.tab.work.tableHeader.wages':'Salariu',
		'dialog.tab.work.tableHeader.experience':'Experienta',
		'dialog.tab.work.tableHeader.luck':'Noroc',
		'dialog.tab.work.tableHeader.motivation':'Motivatie',
		
		'dialog.tab.configuration.titel':'Configurare',
		'dialog.tab.configuration.header':'Liste disponibile',
		'dialog.tab.configuration.actual':'Actual',
		'dialog.tab.configuration.btnLoad':'Incarca',
		'dialog.tab.configuration.btnDelete':'Sterge',
		'dialog.tab.configuration.btnRename':'Redenumeste',
		'dialog.tab.configuration.btnNew':'Nou',
	
		'select.option.minutes':'Minute',
		'select.option.hour':'Ora',
		'select.option.hours':'Ore',
		
		'btnOk.label':'ОК',
		'btnAdd.popup':'Adauga in lista de munca',
		'btnCenter.popup':'Afisare pe harta',
		'btnDelete.popup':'Sterge munca din lista',
	
		'message.error.unableToDeleteCurrentList':'Lista actuala nu poate fi stearsa.',
		'message.deleteList':'Sterge lista',
		'message.newName':'Nume nou:',
		'message.addedWork':'Loc de munca adaugat.',
		'message.deleteFromList':'Sterege din lista',
		'message.listLoaded':'Lista a fost incarcata.',
		'message.listDeleted':'Lista a fost stearsa.',
		'message.listRenamed':'Lista a fost redenumita.',
		'message.listCreated':'Lista a fost creata',
		'message.error.nameAlreadyDefined': 'Acest nume este deja folosit.'
	};
	
	MoCheck.cookieName = 'moScript';
	
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

function getArbeiten(listenName) {
	if(this.arbeiten[listenName] == null) {
		this.arbeiten[listenName] = new Array();
	}
	return this.arbeiten[listenName];
}

function getAktArbeiten() {
	return this.getArbeiten(this.aktListe);
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
	this.aktListe = $defined(data.aktListe) ? data.aktListe : 'default';
	this.arbeiten = $defined(data.arbeiten) ? data.arbeiten : new Object();
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
	if(!$defined(this.arbeiten[this.aktListe])) {
		this.listen.push(this.aktListe);
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
	moBtn.innerHTML = '<span class=\"button_right\" style="display:inline; width: 128px; height:25px; margin-left:-2px; margin-top:-1px; float:left; background:url(http://i45.tinypic.com/242hgms.png);"></span>';
	moBtn.injectInside(menuElem);
	menuElem.injectInside($('right_menu'));
	if($ES('a', 'right_menu').length > 7) {
		if($ES('a', 'right_menu').length > 8) {
			if($ES('a', 'right_menu').length > 9) {
				if($ES('a', 'right_menu').length > 10) {
					$('abdorment_right').setStyle('top', parseInt($('abdorment_right').getStyle('top').substring(0, $('abdorment_right').getStyle('top').indexOf("px"))) + 103);
					 } else {
				$('abdorment_right').setStyle('top', parseInt($('abdorment_right').getStyle('top').substring(0, $('abdorment_right').getStyle('top').indexOf("px"))) + 75);
				} } else {
			$('abdorment_right').setStyle('top', parseInt($('abdorment_right').getStyle('top').substring(0, $('abdorment_right').getStyle('top').indexOf("px"))) + 48);
			} } else {
		$('abdorment_right').setStyle('top', parseInt($('abdorment_right').getStyle('top').substring(0, $('abdorment_right').getStyle('top').indexOf("px"))) + 23);
	} } 
	if($ES('a', 'left_menu').length > 7) {
		if($ES('a', 'left_menu').length > 8) {
			if($ES('a', 'left_menu').length > 9) {
				if($ES('a', 'left_menu').length > 10) {
					$('abdorment_left').setStyle('top', parseInt($('abdorment_left').getStyle('top').substring(0, $('abdorment_left').getStyle('top').indexOf("px"))) + 103);
					 } else {
				$('abdorment_left').setStyle('top', parseInt($('abdorment_left').getStyle('top').substring(0, $('abdorment_left').getStyle('top').indexOf("px"))) + 75);
				} } else {
			$('abdorment_left').setStyle('top', parseInt($('abdorment_left').getStyle('top').substring(0, $('abdorment_left').getStyle('top').indexOf("px"))) + 48);
			} } else {
		$('abdorment_left').setStyle('top', parseInt($('abdorment_left').getStyle('top').substring(0, $('abdorment_left').getStyle('top').indexOf("px"))) + 23);
	} } 
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

function doConfiguration(cmd) {
	var msg = '';
	
	var selectedListe = $('moListen').options[$('moListen').selectedIndex].value;
	
	switch(cmd) {
		case 'loadListe':
			this.aktListe = selectedListe;
			msg = MoCheck.getString('message.listLoaded', selectedListe);
			break;
		case 'newListe':
			var newName = prompt(MoCheck.getString("message.newName"), '');
			if(newName != null) {
				if($defined(this.arbeiten[newName])) {
					new HumanMessage(MoCheck.getString('message.error.nameAlreadyDefined', newName));
					return;
				}
				this.aktListe = newName;
			}
			msg = MoCheck.getString('message.listCreated', newName);
			break;
		case 'deleteListe':
			if(MoCheck.aktListe == selectedListe) {
				new HumanMessage(MoCheck.getString('message.error.unableToDeleteCurrentList'));
				return;
			}
			if(confirm(unescape(MoCheck.getString('message.deleteList', selectedListe)))) {
				this.arbeiten[selectedListe] = null;
				msg = MoCheck.getString('message.listDeleted', selectedListe);
			}
			break;
		case 'renameListe':
			var newName = prompt(MoCheck.getString("message.newName"), selectedListe);
			if(newName != null) {
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
			}
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

function getCookie() {
	var data = "{}";
	if (document.cookie.indexOf(MoCheck.cookieName) != -1)  {
		var cookieContent = (document.cookie + ";").match(eval('/' + MoCheck.cookieName + '=.*?;/gi'));
		data = cookieContent[0].substring(MoCheck.cookieName.length + 1, cookieContent[0].length-1);
	}
	MoCheck.loadData(unescape(data));
}
function setCookie() {
	var data = escape('{"aktListe":"' + MoCheck.aktListe + '", ' + MoCheck.exportArbeiten() + '}');
	var expires = new Date();
	expires.setTime(expires.getTime() + (1000 * 60 * 60 * 24 * 365));//1 Jahr
	document.cookie = MoCheck.cookieName + "=" + data + "; expires=" + expires.toGMTString();
}
function exportListe(liste) {
	var str = '';
	var arbeiten = this.getArbeiten(liste);
	$each(arbeiten, function(arbeit, index) {
		str += (str == '' ? '' : ', ') + Json.toString({pos:arbeit.pos});
	});
	return '[' + str + ']';
};
function exportArbeiten() {
	var str = '';
	for (liste in this.arbeiten) {
		//Leere Listen werden nicht gespeichert
		if(this.arbeiten[liste] != null && this.arbeiten[liste].length > 0) {
			str += (str == '' ? '' : ', ') + '"' + liste + '": ' + this.exportListe(liste);
		}
	}
	return '"arbeiten":{'+str+'}';
};

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

function getButton(txt, js, deactivated) {
	var href = deactivated ? '' : 'href=\"javascript:'+js+';\"';
	var btnClass = (deactivated ? 'button_grey' : 'button');
	var xhtml = '<a class=\"button_wrap '+btnClass+'\" '+href+' >' +
			 '  <span class=\"button_left\"></span><span class=\"button_middle\">'+txt+'</span><span class=\"button_right\"></span>' +
			 '  <span style=\"clear: both;\"></span>' +
			 '</a>';
	return xhtml;
}

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
	var cWidth = 75;
	return 	'<div class="bar" style="width:' + eval(cWidth+1) + 'px; border-right:1px solid black;"><div class="bar_fill" style="width:'+(value * (cWidth/100))+'px"></div>'+
				'<div class="bar_perc" style="width:'+cWidth+'px">'+value+'%</div>'+
			'</div>';
}

function getConfigurationTab() {
	var moListen = '<select id="moListen" size="1" style="width:200px">';
	$each(MoCheck.listen, function(liste, index) {
		var isSelected = (liste == MoCheck.aktListe ? 'selected' : '');
		var isActual = liste + (liste == MoCheck.aktListe ? ' (' + MoCheck.getString("dialog.tab.configuration.actual") + ')' : '');
		moListen += '			<option value="' + liste + '" ' + isSelected + '>' + isActual + '</option>';
	});
	moListen += '</select>';
	
	return '<div style="padding:5px">' +
			'	<span><br />' +
					moListen + 
					'<br /><br />' +
					MoCheck.getButton(MoCheck.getString("dialog.tab.configuration.btnLoad"), 'MoCheck.doConfiguration(\'loadListe\')', false) +
					MoCheck.getButton(MoCheck.getString("dialog.tab.configuration.btnDelete"), 'MoCheck.doConfiguration(\'deleteListe\')', false) +
					MoCheck.getButton(MoCheck.getString("dialog.tab.configuration.btnRename"), 'MoCheck.doConfiguration(\'renameListe\')', false) +
					MoCheck.getButton(MoCheck.getString("dialog.tab.configuration.btnNew"), 'MoCheck.doConfiguration(\'newListe\')', false) +
			'	</span>' +
			'</div>';
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
	window.addEvent('domready',function(){$('moAktListInfo').innerHTML = MoCheck.getString('dialog.aktListInfo', MoCheck.aktListe);});
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
	thPunkte.innerHTML ="<a href='javascript:MoCheck.changeSortOrder(\"arbeitspunkte\");'>"+ 
MoCheck.getString('dialog.tab.work.tableHeader.points') + "</a>";
	thPunkte.injectInside(th);
	thPunkte.addMousePopup(new MousePopup(MoCheck.getString('dialog.tab.work.tableHeader.points.popup'),100,{opacity:0.9}));
	
	var thLohn = new Element('th');
	thLohn.innerHTML = "<a href='javascript:MoCheck.changeSortOrder(\"wages\");'>"+ MoCheck.getString('dialog.tab.work.tableHeader.wages') + "</a>";
	thLohn.injectInside(th);
	
	//, {styles:{width:'152px'}}
	var thEP = new Element('th');
	thEP.innerHTML = "<a href='javascript:MoCheck.changeSortOrder(\"experience\");'>"+ MoCheck.getString('dialog.tab.work.tableHeader.experience') + "</a>";
	thEP.injectInside(th);
	
	var thLuck = new Element('th');
	thLuck.innerHTML = "<a href='javascript:MoCheck.changeSortOrder(\"luck\");'>"+ MoCheck.getString('dialog.tab.work.tableHeader.luck') + "</a>";
	thLuck.injectInside(th);
	
	var thMo = new Element('th');
	thMo.innerHTML = "<a href='javascript:MoCheck.changeSortOrder(\"motivation\");'>"+MoCheck.getString('dialog.tab.work.tableHeader.motivation')+"</a>";
	thMo.injectInside(th);
	var thc4 = new Element('th');
	thc4.innerHTML = "&nbsp;";
	thc4.injectInside(th);

	
	for(var i=0; i < MoCheck.getAktArbeiten().length;i++){
		var aktArbeit = MoCheck.getAktArbeiten()[i];
		
		var tr=new Element('tr', {'id': 'window_Mojob_' + aktArbeit.getKey(), styles:{'text-align':'center'}});
		var cName=new Element('td'); MoCheck.getJobImageTable(aktArbeit).injectInside(cName);cName.injectInside(tr);
		
		var cPunkte=new Element('td');	
		cPunkte.innerHTML = '<span class="calculation_visualisation img_equal">' +
'<span class="skill_box_value'+(aktArbeit.arbeitspunkte <= 0? " red_text" : 

"")+(aktArbeit.arbeitspunkte > 0? " green_text" : "")+'">'+aktArbeit.arbeitspunkte+'</span></span>';		cPunkte.injectInside(tr);
		
		var cLohn=new Element('td');
		cLohn.innerHTML = MoCheck.getFillBar(aktArbeit.wages);
		cLohn.injectInside(tr);
		
		var cEP=new Element('td');
		cEP.innerHTML = MoCheck.getFillBar(aktArbeit.experience);
		cEP.injectInside(tr);
		
		var cLuck=new Element('td');
		cLuck.innerHTML = MoCheck.getFillBar(aktArbeit.luck);
		cLuck.injectInside(tr);
		
		var cMo=new Element('td');
		cMo.innerHTML = MoCheck.getFillBar(aktArbeit.motivation);
		cMo.injectInside(tr);
		
		var aktJobId = aktArbeit.getKey();
		var aa = 	'<select name=\"job_task_time\" style=\"vertical-align:top;\">' +
					'	<option value=\"600\">10 ' + MoCheck.getString("select.option.minutes") + '</option>' +
					'	<option value=\"1800\">30 ' + MoCheck.getString("select.option.minutes") + '</option>' +
					'	<option value=\"3600\">1 ' + MoCheck.getString("select.option.hour") + '</option>' +
					'	<option value=\"7200\" selected>2 ' + MoCheck.getString("select.option.hours") + '</option>' +
					'</select>' +
					'<span id=\"button_start_task_Mojob_' + aktJobId + '\">' +
					'	<a class=\"button_wrap button\" href=\"#\" >' +
					'		<span class=\"button_left\"></span><span class=\"button_middle\">' + MoCheck.getString("btnOk.label") + '</span><span class=\"button_right\"></span>' +
					'		<span style=\"clear: both;\"></span>' +
					'	</a>' +
					'</span>';
		
		var c4 = new Element('td', {styles:{'white-space':'nowrap'}}); c4.innerHTML = aa; c4.injectInside(tr);
		
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
			WMap.scroll_map_to_pos(aktArbeit.pos.x, aktArbeit.pos.y);
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



var moFunctions = ['init', 'addMotivationButton', 'openMotivationWindow', 'getString', 'showTab', 'createJob', 'getJobInfoFromServer', 'getJobInfoFromDiv', 
					'getAktArbeiten', 'getArbeiten', 'initMoJobs', 'resetSortOrder', 'loadData', 'divInject', 'sortArbeiten', 'changeSortOrder', 'printResults', 
					'setWayTimeInfo', 'getTable', 'getFillBar', 'getConfigurationTab', 'getButton', 'doConfiguration', 'getJobImageTable', 'getLastWorkPos', 
					'addArbeit', 'deleteArbeit', 'getCookie', 'setCookie', 'exportListe', 'exportArbeiten', 'reloadListen'];

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
