// ==UserScript==
// @name           The West_-_Motivation
// @namespace      http://userscripts.org/scripts/show/80974
// @description    Affiche la Motivation, Salaire, Expérience, Chance et le Danger pour les travaux choisi. (v1.30)
// @copyright      Hack.Crows/ryuuku
// @author         Hack.Crows
// @source author  JoeSmith
// @website        http://selim.oguz.free.fr/
// @include        http://*.the-west.*/game.php*
// @include        http://userscripts.org/scripts/source/80974.meta.js
// @require        http://userscripts.org/scripts/source/74144.user.js
// @exclude        http://forum.the-west.fr/*
// @exclude        http://wiki.the-west.fr/*
// @version        1.30.05
//
// @history			1.30.05 Correction de la fentre MAJ
// @history			1.30.04 Divert correction
// @history			1.30.03 Divert correction
// @history			1.30.02 Correction de la fentre MAJ
// @history			1.30.01 Correction de la fentre MAJ
// @history			1.30 Mise en place d'une fentre MAJ
// @history			1.30 Mise en place du Script 
// ==/UserScript==

var menu_settings = document.getElementById('menu_settings');
if (menu_settings) {
}

function init() {

	// Manuelle Ueberpruefung fuer z.B. Opera
	if(!window.location.href.match(/http:\/\/.+\.the-west\..*\/game\.php.*/i)) {
		return;
	}
	// Language Settings
	var lang = window.location.href.substring(window.location.href.indexOf("//") + 2, window.location.href.indexOf("//") + 4);
	MoCheck.resourceBundle = MoCheck.getLanguage(lang);


	// Configuration Settings
	MoCheck.cookieName = 'motScript';
	MoCheck.cookieSplitter = '/*.';
	MoCheck.oldCookieName = 'moScript';
	
	// AjaxWindow.setJSHTML ueberschreiben, um Add-Buttons hinzu zu fuegen
	AjaxWindow.setJSHTML_Motivation = AjaxWindow.setJSHTML;
	AjaxWindow.setJSHTML = function(div,content) {
		AjaxWindow.setJSHTML_Motivation(div,content);
		MoCheck.setAddButton(div);
	}
	
	// Sichtbarkeit der einzelnen Spalten
	MoCheck.ColumnVisibility = new Class({
		money:true,
		experience:true,
		luck:true,
		motivation:true,
		initialize:function(money,experience,luck,motivation){
			this.money = money;
			this.experience = experience;
			this.luck = luck;
			this.motivation = motivation;
		},
		show_money:function(){return this.money;},
		show_experience:function(){return this.experience;},
		show_luck:function(){return this.luck;},
		show_motivation:function(){return this.motivation;},
		toString2:function(){return '' + Number(this.money) + Number(this.experience) + Number(this.luck) + Number(this.motivation);},
		count:function(){return Number(this.money) + Number(this.experience) + Number(this.luck) + Number(this.motivation);}
	});

	
	// Ein paar Vars initialisieren
	this.listen = new Array();
	this.aktJobs = new Array();
	this.jobSortBy = 'motivation';
	this.jobSortType = 'desc';
	this.columnVisibility = new Object(); // Sichtbarkeit der Listen: this.columnVisibility[Listenname]
	
	// Sollte vielleicht besser aus dem JS der JobDIVs gelesen werden, um aktuell zu bleiben...
	JobCalculation.functionCalcLuck = "$workTime / (60*600) * 1.2 * $factor * $motivation";
	JobCalculation.functionCalcDollar = "$max_dollar = .9 * $dollar_exponent * 100 + 5; $moneyFactor = 1 + ($moneyBonus / 100); return $max_dollar * pow($job_points,.2) * $moneyFactor;";
	JobCalculation.functionCalcMaxDanger = "8 * pow($danger*100, 1.35) / ($jobPoints + 3)";
	JobCalculation.workSpeed = 1;
	
	this.getCookie();
	
	// Arbeiten der aktuelle Liste laden
	MoCheck.getAllJobInfoFromServer();
	
	// this.addMotivationButton();
	WEvent.register('moCheckJobWindowLoaded', MoCheck.readJobInfo.store());
}


// Schaltet den "Add"-Button einer Arbeit sichtbar oder unsichtbar

function setAddButton(div) {
	if(div && div.id && div.id.search(/window_job/) != -1) {
		var splt = div.id.split("_");
		var x = splt[2];
		var y = splt[3];
		var btnId = 'btnAdd_' + x + "_" + y;
		
		var isNewJob = (MoCheck.getJobCoords().filter(function(job, index){
		    return (job.pos.x == x) && (job.pos.y == y);
		})).length == 0;

		/* Button ggf. erst einfuegen */
		var btnAdd = $(btnId);
		if(btnAdd == null) {
			btnAdd = new Element('img',{
				title:'', 'id':btnId, src:'img.php?type=button&subtype=normal&value=plus', 
				styles:{cursor:'pointer', 'margin-left':'20px', display:(isNewJob ? 'inline' : 'none')}
			});
			btnAdd.addMousePopup(new MousePopup(MoCheck.getString('btnAdd.popup'),100,{opacity:0.9}));
			
			btnAdd.addEvent('click',function(){
				$ES('.mousepopup').each(function(el){el.setStyle('visibility','hidden')});
				this.remove();
				MoCheck.addJob(x, y);
			});
			
			btnAdd.injectInside($ES('h2', div)[0]);
		} else {
			btnAdd.setStyle('display', isNewJob ? 'inline' : 'none');
		}
	}
}


// @return Arbeiten von listenName (aktliste, falls null)

function getJobCoords(listenName) {
	if(listenName == null) {
		listenName = this.aktListe;
	}
	// Liste muss ggf. gespeichert werden
	MoCheck.addListe(listenName);
	return this.jobCoords[listenName];
}

function setAktListe(listenName) {
	listenName = $defined(listenName) ? listenName : 'Listes';
	MoCheck.aktListe = listenName;
	
	// Liste muss ggf. gespeichert werden
	MoCheck.addListe(listenName);
	
	// Add-Button der geoeffneten Fenster ueberpruefen
	$each(AjaxWindow.windows, function(aktWindow, index) {
		if(aktWindow && aktWindow.id) {
			var contentDiv = $(aktWindow.id + '_content');
			MoCheck.setAddButton(contentDiv);
		}
	});
}

function addListe(listenName) {
	if(MoCheck.jobCoords[listenName] == null) {
		MoCheck.jobCoords[listenName] = new Array();
		MoCheck.listen.push(listenName);
	}
}

function deleteListe(name, newListe) {
	this.listen.splice(this.listen.indexOf(name), 1);
	this.jobCoords[name] = null;
	this.columnVisibility[name] = null;
	
	if(newListe != null) {
		this.setAktListe(newListe);
	} else {
		this.setAktListe(MoCheck.listen[0]);
	}
}

function sortArbeiten() {
	var that = this;
	
	// Sortierungsindex auf job mappen
	switch(this.jobSortBy) {
		case 'money':		sortBy = 'getMoneySortValue()';break;
		case 'experience':	sortBy = 'getExperienceSortValue()';break;
		case 'luck':		sortBy = 'getLuckSortValue()';break;
		case 'motivation':	sortBy = 'jobCalc.motivation';break;
		default:			sortBy = 'jobCalc.motivation';
	}
	
	this.aktJobs.sort(function sortAsc(a, b){
		a = eval('a.' + sortBy);
		b = eval('b.' + sortBy);
		if(MoCheck.jobSortType == "asc") {
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
	MoCheck.openMotivationWindow();
};

/******************************************
*** Alle Jobs der aktuellen Liste laden ***
******************************************/

function getAllJobInfoFromServer() {
	MoCheck.aktJobs = new Array();
	if(MoCheck.getJobCoords().length > 0) {
		$each(MoCheck.getJobCoords(), function(jobCoords, index) {
			MoCheck.getJobInfoFromServer(jobCoords.pos.x, jobCoords.pos.y);
		});
	} else {
		// MotivationWindow muss ggf. neu geladen werden, auch wenn die aktuelle Liste keine Jobs hat
		MoCheck.reloadWindow();
	}
}

function getJobInfoFromServer(x, y) {
	new Ajax('game.php?window=job&x=' + x + '&y=' + y, {
		method:'post',
		data:{},
		onComplete:function(data) {
			data = Json.evaluate(data);
			if(data.page != undefined){
				WEvent.trigger('moCheckJobWindowLoaded', [data.page, data.js]);
			}
		}
	}).request();
}

/***************************************************
*** Job-Informationen aus einem Job-Div auslesen ***
****************************************************/

function readJobInfo(page, js) {
	// JS auslesen
	// Zeilenumbrueche entfernen, da diese beim str.match() Probleme verursachen koennen
	js = js.replace(/\r/g, " ");
	js = js.replace(/\n/g, " ");

	eval(MoCheck.getJsParam('var calculationData', js));
	
	// windowJob einmal auslesen, um an ID zu kommen
	var task_skills = new Array();
	eval(MoCheck.getJsParam('var windowJob', js));
	
	// Skills aus der Joblist auslesen und in task_skills eintragen
	var str = "";
	var skillString = JobList[windowJob.jobCalc.jobId].formular.match(/\d \* skills\.[a-z_]+ /gi);
	for (i = 0; i < skillString.length; i++) {
		var elements = skillString[i].split(' ');
		var aktSkill = elements[2].split('.');
		var ev = 'for (i = 1; i <= ' + elements[0] + '; i++) {task_skills.push(\'' + aktSkill[1] + '\');}';
		str += ev;
		
	}
	eval(str);
	if(task_skills.length < 5) {
		alert("Erreur: il y a au moins 5 aptitude : \n" + task_skills + "\nQuelle: " + JobList[windowJob.jobCalc.jobId].formular);
	}

	// windowJob auslesen, diesmal mit gefuellten task_skills
	eval(MoCheck.getJsParam('var windowJob', js));
	windowJob.name = JobList[windowJob.jobCalc.jobId].name;
	
	// Aktuelle Dauer speichern (u.a. fuer Sortierung)
	for(key in windowJob.jobCalc.calculations) { windowJob.aktDuration = key; }
	
	// Zusaetzliche Methoden fuer die Sortierung
	windowJob.getMoneySortValue = function() {
		var points = Math.max(1, Tasks.getJobPoints(this.jobCalc.jobId, this.jobCalc.task_skills) - this.jobCalc.malus);
		return this.jobCalc.calcMoney(this.aktDuration, points);
	};
	windowJob.getLuckSortValue = function() {
		var points = Math.max(1, Tasks.getJobPoints(this.jobCalc.jobId, this.jobCalc.task_skills) - this.jobCalc.malus);
		var luckval = this.jobCalc.calcLuckItemValue(points);
		var erg = (luckval[0] + luckval[1]) / 2;
		return erg;
	};
	windowJob.getExperienceSortValue = function() {
		return this.jobCalc.calculations[this.aktDuration].expCalc;
	};
	
		
	// Temporaeren DIV erstellen
	var divId = 'tmpJob_' + windowJob.pos.x + '_' + windowJob.pos.y;
	var window_div = new Element('div',{'id':divId, 'styles':{'display':'none'}});
	window_div.setHTML(page);
	window_div.injectInside('window_bar');
	
	// Image auslesen
	windowJob.image = $ES('h2', divId)[0].style.backgroundImage.match(/images\/jobs\/.*\.[a-z]{3}/i);
	
	// Temporaeren DIV wieder loeschen
	var trashvar = $(divId);
	trashvar.empty();
	trashvar.remove();
	Garbage.trash([trashvar]);
	
	// Neuen windowJob speichern
	MoCheck.aktJobs.push(windowJob);
	
	// MotivationWindow ggf. neu laden
	MoCheck.reloadWindow();
}

function reloadWindow() {
	if(AjaxWindow.windows['motivation'] && MoCheck.aktJobs.length == MoCheck.getJobCoords().length) {
		MoCheck.openMotivationWindow();
	}
}

function lo(obj) {
	var txt = "";
	for (a in obj) {
		txt += "\n" + a;
	}
	alert(txt);
}

// Trigger zum automatischen Aktualisieren aktivieren
function setTrigger() {
	$each(MoCheck.aktJobs, function(job, index) {
		var aktJobId = job.pos.x + '_' + job.pos.y;
				
		// checks if the player can do the job and sets the way time
		var reload_task_points = Tasks.reload_task_points(job.jobCalc.task_skills, job.jobCalc.malus, 'job', job.window, job.jobCalc.jobId);
		
		reload_task_points();
		job.refresh_way_time();

		var eventname = 'windowJob_' + aktJobId;
		WEvent.register('jobCalcDuration_' + aktJobId, MoCheck.durationChanged.store(job), eventname);
		WEvent.register('character_speed_changed', job.refresh_way_time.store(job), eventname);
		WEvent.register('character_values_changed', reload_task_points.store(job), eventname);
		WEvent.register('character_values_changed', job.calcDuration.store(job), eventname);
		job.calcDuration();
	});
}

function durationChanged() {
	// Duration speichern
	var selectElements = $ES('.jobTime', this.window);
	this.aktDuration = selectElements[0].options[selectElements[0].selectedIndex].value;
	
	// Aenderungen berechnen und anzeigen
	this.calcDuration();
}

function addJobRow(job, index) {
	var aktJobId = job.pos.x + '_' + job.pos.y;
	
	var displayMoney = MoCheck.isColumnVisible('money') ? '' : 'display:none;';
	var displayExperience = MoCheck.isColumnVisible('experience') ? '' : 'display:none;';
	var displayLuck = MoCheck.isColumnVisible('luck') ? '' : 'display:none;';
	var displayMotivation = MoCheck.isColumnVisible('motivation') ? '' : 'display:none;';
	var result = 
			'<div id="moJob_' + aktJobId + '" style="text-align:center;border:1px solid black; margin:2px;">' +
			'	<div class="jobWrapper" style="margin:0 0 0 0; padding:0 0 0 0;">' +
			'		<div id="moCheck.jobImage_' + aktJobId + '" style="position:relative; height:42px; width:50px; float:left;">'+
			'		</div>' +
			'<table>' +
			'<tr>' +
			'<td>' +
					// Expérience
			'		<div class="jobBar jobExperience" style="float:left;' + displayExperience + '">' +
			'			<span class="icon iconExperience"></span>' +
			'			<span class="valueStatic" style="cursor:default;"><span class="barValue">0</span></span>' +
			'		</div>' +
			'</td>' +
			'<td>' +
					// Chance
			'		<div class="jobBar jobLuck" style="float:left;' + displayLuck + '">' +
			'			<span class="icon iconLuck"></span>' +
			'			<span class="progress" style="display:none;"><span class="percent" style="width: 2%;"></span></span>' +
			'			<span class="value" style="cursor:default;"><span class="additional">$ </span><span class="barValue">0</span></span>' +
			'		</div>' +
			'</td>' +
			'<td>' +
					// Motivation
			'		<div class="jobBar jobMotivation" style="float:left;' + displayMotivation + '">'+
			'			<span class="icon iconMotivation"></span>'+
			'			<span class="progress" style="display:none;"><span class="percent" style="width: ' + job.jobCalc.motivation + '%;"></span></span>' +
			'			<span class="value" style="cursor:default;"><span class="barValue">' + job.jobCalc.motivation*100 + '%</span></span>' +
			'		</div>' +
			'</td>' +
			'<td>' +
					// ТО {background-position:-276px 0;}  margin-top: 4px;
			'		<div class="progressBar" style="display:block; background-position:-276px 0; float:left; width:51px; left:2px; margin-top: 3px;">' +
			'			<span class="laborValue" style="position:relative; left:0px; top:3px;">0</span>' +
			'			<span class="laborPercent" style="display:none;"><span class="value">0 / 0</span><span class="fill" style="width:50%;"></span></span>' +
			'		</div>' +
			'</td>' +
			'<td>' +
					// Temps
			'		<div class="startWork task_control" style="margin:0 10px 0 0; padding:5px 0 0 0; width:100px; white-space:nowrap; float:right;">' +
			'			<select class=\'jobTime\' name=\'job_task_time\' style=\'vertical-align:top;\' onchange=\'WEvent.trigger(\"jobCalcDuration_' + aktJobId + '\", []);\'>' +
			'			</select>' +
			'			<span id="button_start_task_job_' + aktJobId + '">' +
			'				<a class="button_wrap button"  style="margin-top: -3px;" href="#" >' +
			'				<span class="button_left"></span><span class="button_middle">' + MoCheck.getString("btnOk.label") + '</span><span class="button_right"></span>' +
			'				</a>' +
			'			</span>' +
			'		</div>' +
					// Temps
			'</td>' +
			'</tr>' +
			'<tr>' +
			'<td>' +
					// Salaire
			'		<div class="jobBar jobMoney" style="float:left;' + displayMoney + '">' +
			'			<span class="icon iconMoney"></span>' +
			'			<span class="valueStatic" style="cursor:default;"><span class="barValue">0</span></span>' +
			'		</div>' +
			'</td>' +
			'<td>' +
					// Danger
			'		<div class="jobBar jobDanger">' +
			'			<span class="icon iconDanger"></span>' +
			'			<span class="progress" style="display:none;"><span class="percent" style="width: 2%;"></span></span>' +
			'			<span class="value">' +
			'				<span class="additional"><img src="../images/job/redesign/heart.png" alt="" style="margin-top: -3px;" /></span>' +
			'				<span class="barValue">4</span>' +
			'			</span>' +
			'		</div>' +
			'</td>' +

			'</tr>' +
			'</table>'+
			// Dummy-Daten, damit automatische Anpassungen der Punkte usw. funktionieren
			'		<div id="moJob_' + aktJobId + '_title" class="window_borders" style="display:none;">' +
						/* Skillbox */
			'			<div class="skill_box task_skill_0">0</div>' +
			'			<div class="skill_box task_skill_1">0</div>' +
			'			<div class="skill_box task_skill_2">0</div>' +
			'			<div class="skill_box task_skill_3">0</div>' +
			'			<div class="skill_box task_skill_4">0</div>' +
			'		</div>' +
			'	</div>' +
			'</div>';
	return result;
}

// Liest paramName bis zum naechsten Semikolon
function getJsParam(paramName, str) {
	var p = str.match(eval('/' + paramName + '.*/i'));
	return p[0].split(';')[0] + ';';
}

/*********************************************
*** Motivations-Button zu Menu hinzufuegen ***
**********************************************/

// Image Menu HightLight
var moBtn = document.createElement("li");
moBtn.id="moBtn";

var menuButtonImg='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';

moBtn.innerHTML = "<a href=\"#\" onclick=\"javascript:MoCheck.openMotivationWindow(\'motivation\', \'work\');\"><div style=\"z-index:inherit;  background-image:url('data:image/png;base64,"+menuButtonImg+"'); background-repeat:no-repeat; background-position:left top; width:128px; height:25px;\" onMouseMove=\"this.style.backgroundPosition = 'left bottom'\" onMouseOut=\"this.style.backgroundPosition = 'left top'\"><span style='display:block; width:90px; font-weight:normal; color:#fff; margin-left:42px; padding-top:4px;'><b>Motivation</b></span></div></a>";

var menu_forts = document.getElementById('menu_forts');
if (menu_forts) {
	menu_settings.parentNode.insertBefore(moBtn, menu_forts.nextSibling);
}


/*********************************************************************************************
*** Oeffnet ein leeres AjaxWindow ************************************************************
*** @windowName ******************************************************************************
*** @group Vordefinierte Gruppe zum Minimieren, muss aus "AjaxWindow.possibleValues" sein ****
**********************************************************************************************/
 
function openMotivationWindow() {
	var windowName = 'motivation';
	var group = 'work';

	MoCheck.sortArbeiten();
	$ES('.mousepopup').each(function(el){el.setStyle('visibility','hidden')});

	var window_div = $('window_' + windowName);
	if(!window_div) {
		// Neu erstellen
		window_div = new Element('div',{'id':'window_' + windowName,'class':'window'});
		AjaxWindow.windows[windowName] = window_div;
		window_div.injectInside('windows');
		window_div.centerLeft();
	} else {
		window_div.empty();
	}
	AjaxWindow.bringToTop(window_div);
	
	// Pages
	var xhtml = '<div class="window_borders">';
	xhtml += '  <h2 id="window_' + windowName + '_title" class="window_title" style="background-image:url(img.php?type=window_title&value=work);"><span>' + windowName + '</span></h2>';
	xhtml += '  <a href="javascript:AjaxWindow.closeAll();" class="window_closeall"></a>';
	xhtml += '  <a href="javascript:AjaxWindow.toggleSize(\'' + windowName + '\', \'' + group + '\');" class="window_minimize"></a>';
	xhtml += '  <a href="javascript:AjaxWindow.close(\'' + windowName + '\');" class="window_close"></a>';
	xhtml += '  <div id="window_' + windowName + '_content" class="window_content">';
	xhtml += '    <div class="tab_container" style="margin-left:7px; width:100%; height:275px">';
	xhtml += '      <ul class="tabs">' +
			 '        <li class="active" id="mojob.tab.1" onclick="MoCheck.showTab(this);">'+ MoCheck.getString("dialog.tab.work.titel") + '</li>' + 
			 '        <li id="mojob.tab.2" onclick="MoCheck.showTab(this);">' + MoCheck.getString("dialog.tab.about.titel") + '</li>' + 
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
	xhtml += '    				<div style="overflow:auto;width: 675px; height:340px; position: relative;">';
	xhtml += '    					<div id="mojob.tab.1.div">';
										if(MoCheck.aktJobs.length <= 0) {
											xhtml += '<div style="text-align:center;"><br />' +
													'	<h2>' + MoCheck.getString("dialog.tab.work.nothingSelected.1") + '</h2><br />' +
														MoCheck.getString("dialog.tab.work.nothingSelected.2") +
													'</div>';
										} else {
											xhtml += '<div id="moCheck.sortBar" style="text-align:right;padding-right:2px;">&nbsp;</div>';
											$each(MoCheck.aktJobs, function(job, index) {
												xhtml += MoCheck.addJobRow(job, index);
											});
										}
	xhtml += '    					</div>';
	xhtml += '    					<div style="display:none;padding:5px;" id="mojob.tab.2.div">';
	xhtml += '    						<div style="text-align:center;height:230px;">';
	xhtml += '    							<h2>The West_-_Motivation</h2>';
	xhtml += '    							<ul style="margin-top:10px;text-align:left;">' +
			 '									<li>Possibilité de créer des listes d\'activités qui vous convient</li>' +
			 '									<li>Se reporter aux travaux du caractère en 1 clic, sans une longue recherche</li>' +
			 '									<li>Classification par l\'Expérience, la Motivations, le Salaire, et la Chance</li>' +
			 '								</ul>';
	xhtml += '    						</div>';
	xhtml += '    						<div style="float:left;">';
	xhtml += '    							Pour en savoir plus télécharger le script, ici:<br />';
	xhtml += '    							<a href="http://userscripts.org/scripts/show/80974" target="_blank">The West_-_Motivation</a>';
	xhtml += '    							<br>Pour plus d\'information aller sur le Wiki: <br />';
	xhtml += '    							<a href="http://wiki.the-west.fr" target="_blank">The-West Wiki </a>';
	xhtml += '    						</div>';
	xhtml += '    						<div style="float:right;">';
	xhtml += '    							<a href="http://wiki.the-west.fr/wiki/Utilisateur:Hack.Crows" target="_blank">';
	xhtml += '    								Pour des Infos. me contacter sur le wiki: Hack.Crows';
	xhtml += '    							</a>';	
	xhtml += '    						</div>';	
	xhtml += '    					</div>';
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
	xhtml += '      <span style="position:absolute; right:22px; top:19px;">' + MoCheck.getString('author') + '&nbsp;&nbsp;' + MoCheck.getAuthor() + '&nbsp;&nbsp;v.<a href=\'http://userscripts.org/scripts/show/80974\' target=\'_blank\'>1.30.04</a></span>';
	xhtml += '      <span id="moCheck.listen" style="position:absolute; right:22px;">&nbsp;</span>';
	xhtml += '		<div id="moCheck.visibleBar" style="text-align:left;padding-left:2px;">&nbsp;</div>';
	xhtml += '    </div>';
	xhtml += '  </div>';
	xhtml += '</div>';
	xhtml += '</div>';
	window_div.setHTML(xhtml);
	

	$ES('.window_closeall').each(function(el){el.addMousePopup(new MousePopup('<b>'+MoCheck.getString("dialog.closeAll.popup")+'<\/b>'));});
	$ES('.window_minimize').each(function(el){el.addMousePopup(new MousePopup('<b>'+MoCheck.getString("dialog.minimize.popup")+'<\/b>'));});
	$ES('.window_close').each(function(el){el.addMousePopup(new MousePopup('<b>'+MoCheck.getString("dialog.close.popup")+'<\/b>'));});
	var window_title_div = $('window_' + windowName + '_title');
	window_div.makeDraggable({handle:window_title_div});
	window_title_div.addEvent('dblclick',function(){
				window_div.centerLeft();
				window_div.setStyle('top',133);
			});
	window_div.addEvent('mousedown',AjaxWindow.bringToTop.bind(AjaxWindow,[window_div]));
	window_title_div.addEvent('mousedown',AjaxWindow.bringToTop.bind(AjaxWindow,[window_div]));
	

	var listDiv = $('moCheck.listen');

	// Job-Select anzeigen
	var onChangeTxt = 'onChange="MoCheck.doConfiguration(\'loadListe\')"';
	var moListen = '<select id="moWorkListen" size="1" style="width:200px" ' + onChangeTxt + '>';
	$each(MoCheck.listen, function(liste, index) {
		var isSelected = (liste == MoCheck.aktListe ? 'selected' : '');
		var isActual = liste + (liste == MoCheck.aktListe ? ' (' + MoCheck.getString("dialog.tab.configuration.actual") + ')' : '');
		moListen += '			<option value="' + liste + '" ' + isSelected + '>' + isActual + '</option>';
	});
	moListen += '</select>';
	listDiv.innerHTML = moListen;
	
	// Conf-Buttons
	var btnDelete = new Element('div',{styles:{'margin':'2px', 'float':'left', width:'25px', height:'25px', 'background':'url(images/forum/icons.png) 50px 0', cursor:'pointer'}});
	btnDelete.innerHTML = "&nbsp;";
	btnDelete.addMousePopup(new MousePopup(MoCheck.getString('dialog.tab.configuration.btnDelete.popup'),100,{opacity:0.9}));
	btnDelete.addEvent('click',function(){
		MoCheck.doConfiguration('deleteListe');
	});
	btnDelete.injectInside(listDiv);
	
	var btnRename = new Element('div',{styles:{'margin':'2px', 'float':'left', width:'25px', height:'25px', 'background':'url(images/forum/icons.png) 0 0', cursor:'pointer'}});
	btnRename.innerHTML = "&nbsp;";
	btnRename.addMousePopup(new MousePopup(MoCheck.getString('dialog.tab.configuration.btnRename.popup'),100,{opacity:0.9}));
	btnRename.addEvent('click',function(){
		MoCheck.doConfiguration('renameListe');
	});
	btnRename.injectInside(listDiv);
	
	
	var btnAdd = new Element('a',{'title':'', 'class':'button_wrap button', styles:{'float':'left'}, href:'#'});
	btnAdd.innerHTML =  '<span class="button_left"></span><span class="button_middle">+</span>' +
						'<span class="button_right"></span>' +
						'<span style="clear: both;"></span>';
	btnAdd.addMousePopup(new MousePopup(MoCheck.getString('dialog.tab.configuration.btnNew.popup'),100,{opacity:0.9}));
	btnAdd.addEvent('click',function(){
		MoCheck.doConfiguration('newListe');
	});
	btnAdd.injectInside(listDiv);
	
	if(MoCheck.aktJobs.length > 0) {
		$each(MoCheck.aktJobs, function(job, index) {
			var aktJobId = job.pos.x + '_' + job.pos.y;
			
			// Kleine Anpassung, damit der Job auf das richtige DIV verweist
			job.window = $('moJob_' + aktJobId);
			
			// Images einfuegen
			MoCheck.getJobImageDiv(job).injectInside($('moCheck.jobImage_' + aktJobId));
			
			// Duration-Select fuellen
			var selectElement = $ES('.jobTime', job.window)[0];
			for (dur in job.jobCalc.calculations) {
				var o = new Element('option', {'value':dur, 'selected':(dur == job.aktDuration ? true : false)});
				
				var h = Math.floor(dur / 3600);
				var txt;
				if(h > 0) {
					txt = h + " " + MoCheck.getString("select.option.hours");
				} else {
					txt = (dur / 60) + " " + MoCheck.getString("select.option.minutes");
				}
				
                o.innerHTML = txt;
				o.injectInside(selectElement);
			}
			
			// Button aktivieren
			job.button = new Button('ok', 'normal', 'button_start_task_job_' + aktJobId, job.start.bind(job));

		});
		
		 // Automatisches Aktualisieren aktivieren
		MoCheck.setTrigger();
		
		// Sortbar fuellen
		MoCheck.addSortIcon('experience');
		MoCheck.addSortIcon('money');
		MoCheck.addSortIcon('luck');
		MoCheck.addSortIcon('motivation');
		
		// Visiblebar fuellen
		MoCheck.addVisibleIcon('experience');
		MoCheck.addVisibleIcon('money');
		MoCheck.addVisibleIcon('luck');
		MoCheck.addVisibleIcon('motivation');
	}
}

function showTab(obj) {
	var showTab1 = (obj.id == 'mojob.tab.1');
	$('mojob.tab.1.div').setStyle('display', showTab1 ? 'block' : 'none');
	$('mojob.tab.2.div').setStyle('display', showTab1 ? 'none' : 'block');
	if(showTab1) {
		$('mojob.tab.1').addClass('active');
		$('mojob.tab.2').removeClass('active');
	} else {
		$('mojob.tab.1').removeClass('active');
		$('mojob.tab.2').addClass('active');
	}
}

// Erstellt das Div mit den Icons der Arbeit, dem Zentrieren- und Loeschen-Button

function getJobImageDiv(aktArbeit) {
	var way_time = WMap.calcWayTime(Tasks.last_pos, aktArbeit.pos);
	var image_div = new Element('div',{styles:{position:'relative', height:'42px', width:'35px', margin:'2px', cursor:'pointer'}});
	var image = new Element('img',{title:'',src:aktArbeit.image,styles:{position:'absolute',left:0,top:0, height:'100%'}});
	image.addEvent('click',function(){
		AjaxWindow.show('job',{x:aktArbeit.pos.x,y:aktArbeit.pos.y},aktArbeit.pos.x+"_"+aktArbeit.pos.y);
	});
	
	// Arbeitspunkte sind hier statisch: Sie werden bei Kleidungswechsel nicht aktualisiert
	var points = Math.max(1, Tasks.getJobPoints(aktArbeit.jobCalc.jobId, aktArbeit.jobCalc.task_skills) - aktArbeit.jobCalc.malus);
	image.addMousePopup(new MousePopup(MoCheck.getString('jobImage.popup', [aktArbeit.name, points]),250,{opacity:0.9}));
	image.injectInside(image_div);
	
	
	var center = new Element('img',{title:'',src:'images/icons/walk_to.png',styles:{position:'absolute',top:'0px',left:'0px', width:'15px', cursor:'pointer'}});
	center.addMousePopup(new MousePopup(MoCheck.getString('btnCenter.popup', way_time.formatDuration()),100,{opacity:0.9}));
	center.addEvent('click',function(){
		WMap.scroll_map_to_pos(parseInt(aktArbeit.pos.x), parseInt(aktArbeit.pos.y));
	});
	center.injectInside(image_div);

	var btnDelete = new Element('img',{title:'',src:'images/icons/cancel_small.png',styles:{position:'absolute',top:'22px',left:'30px',cursor:'pointer', width:'18px'}});
	btnDelete.addMousePopup(new MousePopup(MoCheck.getString('btnDelete.popup'),100,{opacity:0.9}));
	btnDelete.addEvent('click',function(){
		MoCheck.deleteJob(aktArbeit.pos.x, aktArbeit.pos.y);
	});
	btnDelete.injectInside(image_div);
	return image_div;
}

function addSortIcon(str) {
	if(MoCheck.isColumnVisible(str)) {
		var icon = new Element('img',{
			title:'', 
			src:'images/job/redesign/bar/icon/' + str + ".png",
			styles:{cursor:'pointer', width:'15px', opacity:(MoCheck.jobSortBy == str ? 1 : 0.4)}}
		);
		icon.addMousePopup(new MousePopup(MoCheck.getString('sortIcon.popup.' + str),100,{opacity:0.9}));
	
		icon.addEvent('click',function(){
			$ES('.mousepopup').each(function(el){el.setStyle('visibility','hidden')});
			MoCheck.changeSortOrder(str);
		});
		
		icon.addEvent('mouseover',function(){
			this.setStyle('opacity', 1);
		});
		
		icon.addEvent('mouseout',function(){
			this.setStyle('opacity', MoCheck.jobSortBy == str ? 1 : 0.4);
		});
	
		icon.injectInside($('moCheck.sortBar'));
	}
}

function addVisibleIcon(str) {
	var isVisible = MoCheck.isColumnVisible(str);
	var icon = new Element('img',{
		title:'', 
		src:'images/job/redesign/bar/icon/' + str + ".png",
		styles:{cursor:'pointer', width:'15px', opacity:(isVisible ? 1 : 0.4)}}
	);
	icon.addMousePopup(new MousePopup(MoCheck.getString('visibleIcon.popup.' + str),100,{opacity:0.9}));

	icon.addEvent('click',function(){
		$ES('.mousepopup').each(function(el){el.setStyle('visibility','hidden')});
		MoCheck.changeColumnVisibility(str, !isVisible);
	});
	
	icon.addEvent('mouseover',function(){
		this.setStyle('opacity', 1);
	});
	
	icon.addEvent('mouseout',function(){
		this.setStyle('opacity', isVisible ? 1 : 0.4);
	});

	icon.injectInside($('moCheck.visibleBar'));
}

function doConfiguration(cmd) {
	var selectId = 'moWorkListen';
	var msg = '';
	var selectedListe = $(selectId).options[$(selectId).selectedIndex].value;
	
	switch(cmd) {
		case 'loadListe':
			MoCheck.setAktListe(selectedListe);
			msg = MoCheck.getString('message.listLoaded', selectedListe);
			break;
		case 'newListe':
			var newName = prompt(MoCheck.getString("message.newName"), '');
			if(newName == null || newName.length == 0) {
				return;
			}
			if($defined(this.jobCoords[newName])) {
				new HumanMessage(MoCheck.getString('message.error.nameAlreadyDefined', newName));
				return;
			}
			MoCheck.setAktListe(newName);
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
			if(newName == null || newName.length == 0) {
				return;
			}
			if($defined(this.jobCoords[newName])) {
				new HumanMessage(MoCheck.getString('message.error.nameAlreadyDefined', newName));
				return;
			}
			// Neue Liste erstellen
			MoCheck.addListe(newName);
			
			// Neue Liste kopieren
			this.jobCoords[newName] = this.jobCoords[selectedListe];
			
			// Alte Liste loeschen
			MoCheck.deleteListe(selectedListe, newName);

			
			msg = MoCheck.getString('message.listRenamed');
			break;
	}
	
	// Jobs neu laden
	MoCheck.getAllJobInfoFromServer();
	
	this.setCookie();
	
	// Nachricht anzeigen
	if(msg != '') {
		new HumanMessage(msg, {type:'success'});
	}
}

/**
 * Eine Arbeit der Liste hinzufuegen
 */
function addJob(x, y) {
	// Jobcoords in Array aufnehmen TODO das geht doch auch schoener...
	var job = new Object();
	job.pos = new Object();
	job.pos.x = x;
	job.pos.y = y;
	
	MoCheck.getJobCoords().splice(0, 0, job);
	
	// Arbeit in Cookie speichern
	this.setCookie();
	
	// Fenster schlieГџen, auslesen und neu oeffnen
	MoCheck.getJobInfoFromServer(x, y);
	
	new HumanMessage(MoCheck.getString('message.addedWork'), {type:'success'});
}

/*******************************************
*** Eine Arbeit aus der Liste entfernen ****
*******************************************/
 
function deleteJob(x, y) {
	$each(MoCheck.aktJobs, function(windowJob, index) {
		if(x == windowJob.pos.x && y == windowJob.pos.y) {
			if(confirm(unescape(MoCheck.getString('message.deleteFromList', windowJob.name)))) {
				// Arbeit aus beiden Arrays entfernen
				MoCheck.aktJobs.splice(index, 1);
				$each(MoCheck.getJobCoords(), function(jobCoords, coordIndex) {
					if(x == jobCoords.pos.x && y == jobCoords.pos.y) {
						MoCheck.getJobCoords().splice(coordIndex, 1);
					}
				});
				// Arbeit aus Cookie loeschen
				MoCheck.setCookie();
				
				// Fenster neu laden
				MoCheck.openMotivationWindow();
				
				// Add-Button einfuegen
				MoCheck.setAddButton($('window_job_' + windowJob.pos.x + '_' + windowJob.pos.y + '_content'));
			}
		}
	});
}

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
		
		// Arbeiten importieren
		var arbeiten = '';
		var columnVisibility = '';
		for(var i=2; i < cookieElements.length; i++) {
			// Aktuelle Liste in Json-Format bringen
			var listElements = cookieElements[i].split(MoCheck.cookieSplitter[1]);
			var listenName = listElements[0];
			
			// Sichtbare Spalten (Ab Version 1.1.3)
			var coordsStartIndex = 1;
			var cols = "1111";
			if(this.isMinVersion(cookieVersion, "1.1.3")) {
				cols = listElements[1];
				coordsStartIndex = 2;
			}
			columnVisibility += (columnVisibility == '' ? '' : ',') + '"' + listenName + '":' + '"' + cols + '"';
			
			// Coords der Arbeiten
			var coordList = '';
			for(var j = coordsStartIndex; j < listElements.length; j++) {
				// Aktuelle Arbeit in Json-Format bringen
				var coords = listElements[j].split(MoCheck.cookieSplitter[2]);
				var aktArbeit = '{"pos":{"x":"' + coords[0] + '","y":"' + coords[1]+'"}}';
				coordList += (coordList == '' ? '' : ',') + aktArbeit;
			}
			coordList = '"' + listenName + '": [' + coordList + ']';
			arbeiten += (arbeiten == '' ? '' : ',') + coordList;
		}
		data = '{"aktListe":"' + aktListe + '", "arbeiten":{' + arbeiten + '}, "columnVisibility": {' + columnVisibility + '}}';
	}
	
	/****** Daten in MoCheck laden ******/
	data = Json.evaluate(data);
	
	// Liefert zu einem Listennamen die Koordinaten der darin gespeicherten Arbeiten
	this.jobCoords = $defined(data.arbeiten) ? data.arbeiten : new Object();

	/****** Verwendete (nicht leere) Listen ermitteln ******/
	this.listen = new Array();
	for (liste in this.jobCoords) {
		if(this.jobCoords[liste].length > 0) {
			this.listen.push(liste);
		}
	}
	MoCheck.setAktListe(data.aktListe);

	/****** Sichtbarkeiten ******/
	this.columnVisibility = new Object();
	if($defined(data.columnVisibility)) {
		$each(data.columnVisibility, function(colStr, liste) {
			var columnVisibility = new MoCheck.ColumnVisibility(Boolean(Number(colStr[0])), Boolean(Number(colStr[1])), Boolean(Number(colStr[2])), Boolean(Number(colStr[3])));
			MoCheck.setColumnVisibility(columnVisibility, liste);
		});
	}

	/****** ggf. Cookie direkt in neuer Version speichern ******/
	if(!this.isMinVersion(cookieVersion, this.getVersion())) {
		this.setCookie();
	}
	// ggf. Arbeiten aus aelterer Version loeschen
	if (document.cookie.indexOf(MoCheck.oldCookieName) != -1)  {
		document.cookie = MoCheck.oldCookieName + "=; expires=0";
	}
}

function setCookie() {
	// Arbeiten exportieren
	var exportArbeiten = '';

	for (liste in this.jobCoords) {
		// Leere Listen werden nicht gespeichert
		if(this.jobCoords[liste] != null && this.jobCoords[liste].length > 0) {
			var aktListe = '';
			var arbeiten = this.jobCoords[liste];
			
			$each(arbeiten, function(arbeit, index) {
				var aktArbeit = arbeit.pos.x + MoCheck.cookieSplitter[2] + arbeit.pos.y;
				aktListe += (aktListe == '' ? '' : MoCheck.cookieSplitter[1]) + aktArbeit;
			});
			
			exportArbeiten +=  MoCheck.cookieSplitter[0] + liste + MoCheck.cookieSplitter[1] + this.getColumnVisibility(liste).toString2() + MoCheck.cookieSplitter[1] + aktListe;
		}
	}
	var data = MoCheck.getVersion() + MoCheck.cookieSplitter[0] + MoCheck.aktListe + exportArbeiten;
	data = escape(data);
	var expires = new Date();
	expires.setTime(expires.getTime() + (1000 * 60 * 60 * 24 * 365));/* 1 Jahr */

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

/********************************
*** Sichtbarkeit der Spalten ****
********************************/

/*******************************************************************************************
*** Setzt die sichtbaren Spalten einer uebergebenen Liste **********************************
*** Falls listenName leer: Sichtbare Spalten der aktuellen Liste ***************************
*** @columnVisibility als Object, z.B. {'column1':Bool, 'column2':Bool, 'column3':Bool}; ***
*******************************************************************************************/
function setColumnVisibility(columnVisibility, listenName) {
	listenName = $defined(listenName) ? listenName : this.aktListe;
	this.columnVisibility[listenName] = columnVisibility;
}


// Liefert die sichtbaren Spalten einer uebergebenen Liste
// Falls listenName leer: Sichtbare Spalten der aktuellen Liste

function getColumnVisibility(listenName) {
	listenName = $defined(listenName) ? listenName : this.aktListe;
	var result = $defined(this.columnVisibility[listenName]) ? this.columnVisibility[listenName] : new MoCheck.ColumnVisibility(true, true, true, true);
	return result;
}

function isColumnVisible(column) {
	return eval('this.getColumnVisibility().show_' + column + '()');
}

function changeColumnVisibility(str, isVisible) {
	var cols2 = MoCheck.getColumnVisibility();
	eval('cols2.' + str + '=' + isVisible + ';');
	this.setColumnVisibility(cols2);
	MoCheck.setCookie();
	MoCheck.openMotivationWindow();
}

/****************
*** Sonstiges ***
****************/


function isMinVersion(a, b) {
	var result = true;
	a = a.replace(/\./g, "");
	b = b.replace(/\./g, "");
	for (var i = 1; i <= Math.max(a.length, b.length); i++) {
		var z1 = parseInt(a.length >= i ? a[i-1] : "0");
		var z2 = parseInt(b.length >= i ? b[i-1] : "0");
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

function getLanguage(lang) {
	res = new Array();
	res['en'] = {
		'dialog.closeAll.popup':'Close All',
		'dialog.minimize.popup':'Minimize',
		'dialog.close.popup':'Close',
		'dialog.tab.work.titel':'Job',
		'dialog.tab.about.titel':'About',
		'dialog.tab.work.nothingSelected.1':'There is no selected work!',
		'dialog.tab.work.nothingSelected.2':'You need to open a job and add it.',
		'dialog.tab.work.tableHeader.work':'Work',
		'dialog.tab.work.tableHeader.points':'Labor Points',
		'dialog.tab.work.tableHeader.money':'Wages',
		'dialog.tab.work.tableHeader.experience':'Experience',
		'dialog.tab.work.tableHeader.luck':'Luck',
		'dialog.tab.work.tableHeader.motivation':'Motivation',
		'dialog.tab.configuration.actual':'actual',
		'dialog.tab.configuration.btnDelete.popup':'Delete list',
		'dialog.tab.configuration.btnRename.popup':'Rename list',
		'dialog.tab.configuration.btnNew.popup':'Create new List',
		'select.option.minutes':'m',
		'select.option.hours':'h',
		'btnOk.label':'Ok',
		'btnAdd.popup':'Add Job',
		'btnCenter.popup':'<b>Transit time:</b> %1h',
		'btnDelete.popup':'Delete job from the list',
		'sortIcon.popup.money':'Sort by <b>wages</b>',
		'sortIcon.popup.luck':'Sort by <b>luck</b>',
		'sortIcon.popup.experience':'Sort by <b>experience</b>',
		'sortIcon.popup.motivation':'Sort by <b>motivation</b>',
		'visibleIcon.popup.money':'Show /don\'t show <b>wages</b>',
		'visibleIcon.popup.luck':'Show /don\'t show <b>luck</b>',
		'visibleIcon.popup.experience':'Show /don\'t show <b>experience</b>',
		'visibleIcon.popup.motivation':'Show /don\'t show <b>motivation</b>',
		'jobImage.popup':'Job: <b>%1</b><br />Labor points: <b>%2</b>',
		'message.error.unableToDeleteCurrentList':'Unable to delete current list.',
		'message.deleteList':'Delete List %1?',
		'message.newName':'New name:',
		'message.addedWork':'Added job.',
		'message.deleteFromList':'Delete %1 from list?',
		'message.listLoaded':'Loaded %1.',
		'message.listDeleted':'Deleted %1.',
		'message.listRenamed':'Renamed list.',
		'message.listCreated':'Created list.',
		'message.error.nameAlreadyDefined': 'Name %1 already in use.',
		// 'motivation.text':'Wardrobe'
		'author':'Author: <b>JoeSmith</b>. Relase:'
		
	};
	res['de'] = {
		'dialog.closeAll.popup':'Alle Fenster schlie&szlig;en',
		'dialog.minimize.popup':'Fenster minimieren',
		'dialog.close.popup':'Fenster schlie&szlig;en',
		'dialog.tab.work.titel':'Arbeiten',
		'dialog.tab.about.titel':'&Uuml;ber',
		'dialog.tab.work.nothingSelected.1':'Es wurden noch keine Arbeiten ausgew&auml;hlt!',
		'dialog.tab.work.nothingSelected.2':'Hierf&uuml;r musst du eine Arbeit &ouml;ffnen und diese hinzuf&uuml;gen.',
		'dialog.tab.work.tableHeader.work':'Arbeit',
		'dialog.tab.work.tableHeader.points':'Arbeitspunkte',
		'dialog.tab.work.tableHeader.money':'Lohn',
		'dialog.tab.work.tableHeader.experience':'Erfahrung',
		'dialog.tab.work.tableHeader.luck':'Gl&uuml;ck',
		'dialog.tab.work.tableHeader.motivation':'Motivation',
		'dialog.tab.configuration.actual':'aktuell',
		'dialog.tab.configuration.btnDelete.popup':'Liste l&ouml;schen',
		'dialog.tab.configuration.btnRename.popup':'Liste umbenennen',
		'dialog.tab.configuration.btnNew.popup':'Neue Liste erstellen',
		'select.option.minutes':'m',
		'select.option.hours':'h',
		'btnOk.label':'Ok',
		'btnAdd.popup':'Zum Motivations-Check hinzuf&uuml;gen',
		'btnCenter.popup':'<b>Wegzeit:</b> %1h',
		'btnDelete.popup':'Arbeit aus dieser Liste l&ouml;schen',
		'sortIcon.popup.money':'Nach <b>Lohn</b> sortieren',
		'sortIcon.popup.luck':'Nach <b>Gl&uuml;ck</b> sortieren',
		'sortIcon.popup.experience':'Nach <b>Erfahrung</b> sortieren',
		'sortIcon.popup.motivation':'Nach <b>Motivation</b> sortieren',
		'visibleIcon.popup.money':'<b>Lohn</b> ein-/ausblenden',
		'visibleIcon.popup.luck':'<b>Gl&uuml;ck</b> ein-/ausblenden',
		'visibleIcon.popup.experience':'<b>Erfahrung</b> ein-/ausblenden',
		'visibleIcon.popup.motivation':'<b>Motivation</b> ein-/ausblenden',
		'jobImage.popup':'Arbeit: <b>%1</b><br />Arbeitspunkte: <b>%2</b>',
		'message.error.unableToDeleteCurrentList':'Die aktuelle Liste kann nicht gel&ouml;scht werden.',
		'message.deleteList':'Liste %1 l%F6schen?',
		'message.newName':'Neuer Name der Liste:',
		'message.addedWork':'Arbeit hinzugef&uuml;gt.',
		'message.deleteFromList':'%1 aus dieser Liste l%F6schen?',
		'message.listLoaded':'%1 wurde geladen.',
		'message.listDeleted':'%1 wurde gel&ouml;scht.',
		'message.listRenamed':'Liste wurde umbenannt.',
		'message.listCreated':'Liste wurde erstellt.',
		'message.error.nameAlreadyDefined': 'Der Name %1 wird bereits verwendet.',
		// 'motivation.text':'Garderobe'
		'author':'Autor: <b>JoeSmith</b>. Relase:'
	};
	
	res['ru'] = {
		'dialog.closeAll.popup':'Закрыть все окна',
		'dialog.minimize.popup':'Свернуть окно',
		'dialog.close.popup':'Закрыть окно',
		'dialog.tab.work.titel':'Работы',
		'dialog.tab.about.titel':'О скрипте',
		'dialog.tab.work.nothingSelected.1':'Не выбрана ни одна работа!',
		'dialog.tab.work.nothingSelected.2':'Вам нужно открыть работу и добавить её.',
		'dialog.tab.work.tableHeader.work':'Work',
		'dialog.tab.work.tableHeader.points':'Очки труда',
		'dialog.tab.work.tableHeader.money':'Заработок',
		'dialog.tab.work.tableHeader.experience':'Опыт',
		'dialog.tab.work.tableHeader.luck':'Удача',
		'dialog.tab.work.tableHeader.motivation':'Мотивация',
		'dialog.tab.configuration.actual':'текущий',
		'dialog.tab.configuration.btnDelete.popup':'Удалить список',
		'dialog.tab.configuration.btnRename.popup':'Переименовать список',
		'dialog.tab.configuration.btnNew.popup':'Создать список',
		'select.option.minutes':'м',
		'select.option.hours':'ч',
		'btnOk.label':'Ok',
		'btnAdd.popup':'Добавить работу',
		'btnCenter.popup':'<b>Расстояние:</b> %1',
		'btnDelete.popup':'Удалить работу из списка',
		'sortIcon.popup.money':'Сортировать по <b>заработку</b>',
		'sortIcon.popup.luck':'Сортировать по <b>удаче</b>',
		'sortIcon.popup.experience':'Сортировать по <b>опыту</b>',
		'sortIcon.popup.motivation':'Сортировать по <b>мотивации</b>',
		'visibleIcon.popup.money':'Показать /скрыть <b>заработок</b>',
		'visibleIcon.popup.luck':'Показать /скрыть <b>удачу</b>',
		'visibleIcon.popup.experience':'Показать /скрыть <b>опыт</b>',
		'visibleIcon.popup.motivation':'Показать /скрыть <b>мотивацию</b>',
		'jobImage.popup':'Работа: <b>%1</b><br />Очки труда: <b>%2</b>',
		'message.error.unableToDeleteCurrentList':'Не удаеться удалить текущий список.',
		'message.deleteList':'Удалить список %1?',
		'message.newName':'Новое имя:',
		'message.addedWork':'Работа добавлена.',
		'message.deleteFromList':'Удалить %1 из списка?',
		'message.listLoaded':'Загружен %1.',
		'message.listDeleted':'Удален %1.',
		'message.listRenamed':'Список переименован.',
		'message.listCreated':'Список создан.',
		'message.error.nameAlreadyDefined': 'Имя %1 уже используеться.',
		// 'motivation.text':'Гардероб'
		'author':'Переводчик: <b>Enfo</b>. Relase:'
	};
	
	res['fr'] = {
		'dialog.closeAll.popup':'Fermer toutes les fênetres',
		'dialog.minimize.popup':'Réduire la fênetre',
		'dialog.close.popup':'Fermer la fênetre',
		'dialog.tab.work.titel':'Travail',
		'dialog.tab.about.titel':'A propos',
		'dialog.tab.work.nothingSelected.1':'Il n\'y a pas de travail sélectionné!',
		'dialog.tab.work.nothingSelected.2':'Vous devez ouvrir un travail et l\'ajouter.',
		'dialog.tab.work.tableHeader.work':'Travail',
		'dialog.tab.work.tableHeader.points':'Points de Travail',
		'dialog.tab.work.tableHeader.money':'Salaire',
		'dialog.tab.work.tableHeader.experience':'Expérience',
		'dialog.tab.work.tableHeader.luck':'Chance',
		'dialog.tab.work.tableHeader.motivation':'Motivation',
		'dialog.tab.configuration.actual':'Actuel',
		'dialog.tab.configuration.btnDelete.popup':'Supprimer la liste',
		'dialog.tab.configuration.btnRename.popup':'Renommer la liste',
		'dialog.tab.configuration.btnNew.popup':'Créer une nouvelle liste',
		'select.option.minutes':'m',
		'select.option.hours':'h',
		'btnOk.label':'Ok',
		'btnAdd.popup':'Ajouté le Travail',
		'btnCenter.popup':'<b>Durée de trajet:</b> %1h',
		'btnDelete.popup':'Supprimer le travail de la liste',
		'sortIcon.popup.money':'Classer par <b>Salaire</b>',
		'sortIcon.popup.luck':'Classer par <b>Chance</b>',
		'sortIcon.popup.experience':'Classer par <b>Expérience</b>',
		'sortIcon.popup.motivation':'Classer par <b>Motivation</b>',
		'visibleIcon.popup.money':'Afficher | Ne pas afficher le <b>Salaire</b>',
		'visibleIcon.popup.luck':'Afficher | Ne pas afficher la <b>Chance</b>',
		'visibleIcon.popup.experience':'Afficher | Ne pas afficher l\'<b>Expérience</b>',
		'visibleIcon.popup.motivation':'Afficher | Ne pas afficher la <b>Motivation</b>',
		'jobImage.popup':'Job: <b>%1</b><br />Points de travail: <b>%2</b>',
		'message.error.unableToDeleteCurrentList':'Impossible de supprimer la liste actuelle.',
		'message.deleteList':'Supprimer la liste %1?',
		'message.newName':'Nouveau nom:',
		'message.addedWork':'Travail ajouté.',
		'message.deleteFromList':'Supprimer %1 de la liste?',
		'message.listLoaded':'Chargés %1.',
		'message.listDeleted':'Supprimé %1.',
		'message.listRenamed':'Renommé la liste.',
		'message.listCreated':'Créé la liste.',
		'message.error.nameAlreadyDefined': '%1 est déjà utilisé.',
		// 'motivation.text':'Motivation'
		'author':'Auteur:'
	};
	return (res[lang] != null ? res[lang] : res['en']);
}

var moFunctions = ['init', 'openMotivationWindow', 'getJsParam', 'setTrigger', 'lo', 'addSortIcon', 'addVisibleIcon', 'getJobImageDiv', 
					'getCookie', 'setCookie', 'addJobRow', 'getLanguage', 'durationChanged', 'getJobCoords', 'reloadWindow', 'setAddButton', 
					'setAktListe', 'showTab', 'setColumnVisibility', 'getColumnVisibility', 'isColumnVisible', 'changeColumnVisibility', 
					'addListe', 'deleteListe', 'getVersion', 'isMinVersion', 'getString', 'getJobInfoFromServer', 'getAllJobInfoFromServer', 
					'readJobInfo', 'sortArbeiten', 'changeSortOrder', 'doConfiguration','addJob', 'deleteJob', 'getAuthor', 'getVersion'];

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


function getAuthor() {
	var hrefStr = '';
	switch(window.location.hostname.substr(0,window.location.hostname.search(/\./))) {
		case 'fr4':
			hrefStr = 'javascript:AjaxWindow.show(\'profile\',{char_id:288102},\'288102\');';
			win_op = '';
		break;
		default:
			hrefStr = 'http://wiki.the-west.fr/wiki/Utilisateur:Hack.Crows';
			win_op = 'target=\'_blank\'';
	}
	return '<a href=\"' + hrefStr + '\" style=\"color:492b19\"' + win_op + '>Hack.Crows</a>';
}

function getVersion() {
	return "1.30.05";
}
// DEBUT DE LA MAJ AUTO
try {
	ScriptUpdater.check(80974, ''+getVersion()+'');
} catch(e) {};

//ScriptUpdater.forceNotice(80974, getVersion);
//ScriptUpdater.forceCheck(80974, getVersion);
ScriptUpdater.check(80974, getVersion);
// FIN DE LE MAJ AUTO
