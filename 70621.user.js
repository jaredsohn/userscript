// ==UserScript==
// @name           The West.ru
// @namespace      www.the-west.ru
// @description    The West
// @include        http://*.the-west.*
// @include        http://zz1w1.tw.innogames.net/game.php*
// @exclude        http://www.the-west.*
// @exclude        http://forum.the-west.*     
// ==/UserScript==


//====================================== MOTIVATION ====================================


function init() {
	MoCheck.resourceBundle = {
		'dialog.closeAll.popup':'Закрыть все окна',
		'dialog.minimize.popup':'Свернуть окно',
		'dialog.close.popup':'Закрыть окно',
		'dialog.aktListInfo':'Список: %1',

		'dialog.tab.work.titel':'Работы',
		'dialog.tab.work.nothingSelected.1':'Вами не выбрана ни одна работа!',
		'dialog.tab.work.nothingSelected.2':'Откройте необходимую вам работу и добавьте её в список',
		'dialog.tab.work.tableHeader.work':'Работа',
		'dialog.tab.work.tableHeader.points':'ТО',
		'dialog.tab.work.tableHeader.points.popup':'Указанные здесь трудовые очки не изменяются при<br/> переодевании. Для изменения перезапустите окно "Мотивация"',
		'dialog.tab.work.tableHeader.wages':'Заработок',
		'dialog.tab.work.tableHeader.experience':'Опыт',
		'dialog.tab.work.tableHeader.luck':'Удача',
		'dialog.tab.work.tableHeader.motivation':'Мотивация',
		
		'dialog.tab.configuration.titel':'Конфигурация',
		'dialog.tab.configuration.header':'Выбор списков',
		'dialog.tab.configuration.actual':'текущий',
		'dialog.tab.configuration.btnLoad':'Загрузить',
		'dialog.tab.configuration.btnDelete':'Удалить',
		'dialog.tab.configuration.btnRename':'Переименовать',
		'dialog.tab.configuration.btnNew':'Новый',
	
		'select.option.minutes':'минут',
		'select.option.hour':'час',
		'select.option.hours':'часа',
		
		'btnOk.label':'ОК',
		'btnAdd.popup':'Добавить работу в список',
		'btnCenter.popup':'Показать на карте',
		'btnDelete.popup':'Удалить из списка',
	
		'message.error.unableToDeleteCurrentList':'Текущий список не может быть удален',
		'message.deleteList':'Удалить список "%1"?',
		'message.newName':'Новое имя:',
		'message.addedWork':'Работа добавлена',
		'message.deleteFromList':'Удалить работу "%1" из этого списка?',
		'message.listLoaded':'Список "%1" загружен',
		'message.listDeleted':'Список "%1" удалён',
		'message.listRenamed':'Список переименован',
		'message.listCreated':'Список создан',
		'message.error.nameAlreadyDefined': 'Это имя уже используется'
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
					var btnAdd = new Element('img',{title:'', src:'http://s56.radikal.ru/i152/1002/ab/6cf73b2ce266.png', styles:{cursor:'pointer', 'margin-left':'20px'}});
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
					
					var divId = 'myJob_' + aktArbeit.getKey();
					var window_div = new Element('div',{'id':divId});
					window_div.setHTML(data.page);
					window_div.injectInside('window_bar');
					
					MoCheck.getJobInfoFromDiv(divId, aktArbeit);
					
					var trashvar = $(divId);
					trashvar.empty();
					trashvar.remove();
					Garbage.trash([trashvar]);
	
					MoCheck.getJobInfoFromServer(++jobIndex);
				}
			}
		}).request();
	} else {
		AjaxWindow.windows['motivation'].isReady = true;
		MoCheck.printResults();
	}
}

function getJobInfoFromDiv(divId, job) {
	job.name = $ES('h2', divId)[0].innerHTML;
	job.image = $ES('h2', divId)[0].style.backgroundImage.match(/images\/jobs\/.*\.[a-z]{3}/i);
	job.wages = parseInt($ES('.bar_perc', divId)[0].innerHTML);
	job.experience = parseInt($ES('.bar_perc', divId)[1].innerHTML);
	job.luck = parseInt($ES('.bar_perc', divId)[2].innerHTML);
	job.motivation = parseInt($ES('.bar_perc', divId)[4].innerHTML);
	job.arbeitspunkte = parseInt($ES('.skill_box_value', divId)[2].innerHTML);
}

function addMotivationButton() {
	var menuElem = new Element('li',{'id':'menu_motivation'});
	
	var moBtn = new Element('a',{'title':'', 'class':'button_wrap button', 'style':'white-space:nowrap;', href:'javascript:MoCheck.openMotivationWindow(\'motivation\', \'work\');'});
	moBtn.innerHTML = ' <span style="display:inline; float:left; width:9px; height:25px; margin-left:22px; background-image: url(\'../images/button/left_normal.png\');"></span>' +
					  '	<span class=\"button_middle\" style="display:inline; float:left; width:78px; background-image: url(\'../images/button/middle_normal.png\');">Мотивация</span>' +
					  '	<span class=\"button_right\" style="display:inline; width: 9px; height:25px; float:left; background-image: url(\'../images/button/right_normal.png\');"></span>';
	moBtn.injectInside(menuElem);
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
				if(this.aktListe == selectedListe) {
					this.aktListe = newName;
				}
				msg = MoCheck.getString('message.listRenamed');
			}
			break;
	}
	
	this.setCookie();
	this.getCookie();
	
	if(msg != '') {
		new HumanMessage(msg, {type:'success'});
	}
}

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

function addArbeit(divId, job) {
	MoCheck.getAktArbeiten().splice(0, 0, job);
	
	if($defined(AjaxWindow.windows['motivation']) && AjaxWindow.windows['motivation'].isReady) {
		MoCheck.printResults();
	}
	
	this.setCookie();
	
	new HumanMessage(MoCheck.getString('message.addedWork'), {type:'success'});
}

function deleteArbeit(x, y) {
	$each(MoCheck.getAktArbeiten(), function(aktArbeit, index) {
		if(x == aktArbeit.pos.x && y == aktArbeit.pos.y) {
			
			if(confirm(unescape(MoCheck.getString('message.deleteFromList', aktArbeit.name)))) {
				MoCheck.getAktArbeiten().splice(index, 1);
				
				MoCheck.setCookie();
				
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

function printResults() {
	$ES('.mousepopup').each(function(el){el.setStyle('visibility','hidden')});
	
	MoCheck.sortArbeiten();
	
	Tasks.add_task_queue_xhtml($('moWork_task_queue'), {hide_info_full: true});
	if(MoCheck.getAktArbeiten().length > 0) {
	
		window.addEvent('domready', MoCheck.divInject.bind(Ajax,[$('moWorkList'), MoCheck.getTable()]));
	
		$each(MoCheck.getAktArbeiten(), function(aktJob, index) {
			aktJob.window = $('window_Mojob_' + aktJob.getKey());
			
 			aktJob.button = new Button('ok', 'normal', 'button_start_task_Mojob_'+aktJob.getKey(), aktJob.start.bind(aktJob));
 			
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
	thPunkte.injectInside(th);
	thPunkte.addMousePopup(new MousePopup(MoCheck.getString('dialog.tab.work.tableHeader.points.popup'),100,{opacity:0.9}));
	
	var thLohn = new Element('th');
	thLohn.innerHTML = "<a href='javascript:MoCheck.changeSortOrder(\"wages\");'>"+ MoCheck.getString('dialog.tab.work.tableHeader.wages') + "</a>";
	thLohn.injectInside(th);
	
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
							'<span class="skill_box_value'+(aktArbeit.arbeitspunkte <= 0? " red_text" : "")+'">'+aktArbeit.arbeitspunkte+'</span></span>';
		cPunkte.injectInside(tr);
		
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


//====================================== BEST  ITEMS ====================================


aWindow = (unsafeWindow) ? unsafeWindow : window;

//ширина окон.
aWindow.bi2_w0=478;
aWindow.bi2_w1=900;

aWindow.bi2_l0 = (window.innerWidth) ? (window.innerWidth-aWindow.bi2_w0)/2 : (1024-aWindow.bi2_w0) /2 ;
aWindow.bi2_t0=133;
aWindow.bi2_l1 = (window.innerWidth) ? (window.innerWidth-aWindow.bi2_w1)/2 : (1024-aWindow.bi2_w1) /2 ;
aWindow.bi2_t1=0;

//высота окон
aWindow.bi2_title_h_min=25;
aWindow.bi2_title_h_mid=126;
aWindow.bi2_title_h_max=336;
aWindow.bi2_window_h_min=25;
aWindow.bi2_window_h_max=741;

aWindow.bi2_tlink=' style=\"color:white; display:block; width:20px; height:20px; float:left;\" ';
aWindow.bi2_vblock=' style=\"border:1px solid black; padding:5px; marging:1px;\" ';
aWindow.bi2_title_flag=0;
aWindow.bi2_title_flag2=1;
aWindow.bi2_window_flag2=1;
aWindow.bi2_odevalo4ka = true;

bi2_code='';
aWindow.bi2_pre = aWindow.location.host.substr(0,4)+aWindow.Character.name;

bi2_code += "\
bi2_zaschitato=1;\
bi2_import=false;\
bi2_khlam=false;\
ezda=false;\
zaschita=null;\
bi2_millioner=false;\
bi2_process=false;\
bi2_zdorov=0;\
bi2_count_inv=0;\
bi2_odev_count=0;\
bi2_odev_id=0;\
bi2_odev_type=0;\
bi2_odev_time=500;\
bi2_odev_rep=20;\
bi2_odev_var='n';\
bi2_odev_rab=0;\
bi2_odev_item=0;\
bi2_odev_list={};\
bi2_odev_stat=true;\
\
einfo='';\
winfo='';\
\
bi2_types=['right_arm', 'left_arm', 'head', 'body', 'foot', 'neck', 'animal', 'yield'];\
nabory=['set_farmer', 'set_mexican', 'set_indian', 'set_quackery', 'set_pilgrim_male', 'set_pilgrim_female', 'set_gentleman', 'set_dancer'];\
\
bi2_predmetov = {};\
bi2_uchet=[];\
bi2_aktiv=[];\
bi2_nenuzhnoe=[];\
irabota=0;\
bi2_inv_imported=false;\
bi2_slots={};\
bi2_equipment={};\
for (ii=0;ii<bi2_types.length;++ii) {bi2_equipment[bi2_types[ii]]=0};\
";

bi2_code += "\
items=[];\
\
items[0] = {item_id:0, nshort:'nothing', name:'заглушка', type:'yield', level:0, price:0, image:'images/items/right_arm/clayjug.png', image_mini:'images/items/right_arm/mini/clayjug.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'nil'};\
\
items[1] = {item_id:1, nshort:'clayjug', name:'Разбитый глиняный кувшин', type:'right_arm', level:2, price:16, image:'images/items/right_arm/clayjug.png', image_mini:'images/items/right_arm/mini/clayjug.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[2] = {item_id:2, nshort:'winebottle', name:'Разбитая винная бутылка', type:'right_arm', level:5, price:26, image:'images/items/right_arm/winebottle.png', image_mini:'images/items/right_arm/mini/winebottle.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[3] = {item_id:3, nshort:'whiskeybottle', name:'Разбитая бутылка виски', type:'right_arm', level:7, price:40, image:'images/items/right_arm/whiskeybottle.png', image_mini:'images/items/right_arm/mini/whiskeybottle.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[4] = {item_id:4, nshort:'rotty_club', name:'Гнилая дубинка', type:'right_arm', level:7, price:26, image:'images/items/right_arm/rotty_club.png', image_mini:'images/items/right_arm/mini/rotty_club.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[5] = {item_id:5, nshort:'club', name:'Дубинка', type:'right_arm', level:10, price:63, image:'images/items/right_arm/club.png', image_mini:'images/items/right_arm/mini/club.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[6] = {item_id:6, nshort:'nail_club', name:'Дубинка с шипом', type:'right_arm', level:13, price:125, image:'images/items/right_arm/nail_club.png', image_mini:'images/items/right_arm/mini/nail_club.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[7] = {item_id:7, nshort:'rusty_razor', name:'Ржавая бритва', type:'right_arm', level:12, price:64, image:'images/items/right_arm/rusty_razor.png', image_mini:'images/items/right_arm/mini/rusty_razor.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[8] = {item_id:8, nshort:'razor', name:'Бритва', type:'right_arm', level:15, price:146, image:'images/items/right_arm/razor.png', image_mini:'images/items/right_arm/mini/razor.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[9] = {item_id:9, nshort:'sharp_razor', name:'Острая бритва', type:'right_arm', level:18, price:354, image:'images/items/right_arm/sharp_razor.png', image_mini:'images/items/right_arm/mini/sharp_razor.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{aim:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[10] = {item_id:10, nshort:'figaros_razor', name:'Бритва Фигаро', type:'right_arm', level:25, price:1740, image:'images/items/right_arm/figaros_razor.png', image_mini:'images/items/right_arm/mini/figaros_razor.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{finger_dexterity:3, aim:3}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[11] = {item_id:11, nshort:'rusty_skewer', name:'Ржавый кинжал', type:'right_arm', level:17, price:122, image:'images/items/right_arm/rusty_skewer.png', image_mini:'images/items/right_arm/mini/rusty_skewer.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[12] = {item_id:12, nshort:'skewer', name:'Кинжал', type:'right_arm', level:20, price:384, image:'images/items/right_arm/skewer.png', image_mini:'images/items/right_arm/mini/skewer.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{punch:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[13] = {item_id:13, nshort:'sharp_skewer', name:'Острый кинжал', type:'right_arm', level:23, price:554, image:'images/items/right_arm/sharp_skewer.png', image_mini:'images/items/right_arm/mini/sharp_skewer.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{punch:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[14] = {item_id:14, nshort:'codys_skewer', name:'Кинжал Коди', type:'right_arm', level:30, price:2600, image:'images/items/right_arm/codys_skewer.png', image_mini:'images/items/right_arm/mini/codys_skewer.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{health:4, punch:3}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[15] = {item_id:15, nshort:'rusty_bowie', name:'Ржавый нож', type:'right_arm', level:27, price:450, image:'images/items/right_arm/rusty_bowie.png', image_mini:'images/items/right_arm/mini/rusty_bowie.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[16] = {item_id:16, nshort:'bowie', name:'Нож', type:'right_arm', level:30, price:850, image:'images/items/right_arm/bowie.png', image_mini:'images/items/right_arm/mini/bowie.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[17] = {item_id:17, nshort:'sharp_bowie', name:'Острый нож', type:'right_arm', level:33, price:1220, image:'images/items/right_arm/sharp_bowie.png', image_mini:'images/items/right_arm/mini/sharp_bowie.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[18] = {item_id:18, nshort:'bowies_knife', name:'Нож Бови', type:'right_arm', level:40, price:4600, image:'images/items/right_arm/bowies_knife.png', image_mini:'images/items/right_arm/mini/bowies_knife.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:4, pitfall:5}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[19] = {item_id:19, nshort:'rusty_foil', name:'Ржавая рапира', type:'right_arm', level:32, price:730, image:'images/items/right_arm/rusty_foil.png', image_mini:'images/items/right_arm/mini/rusty_foil.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[20] = {item_id:20, nshort:'foil', name:'Рапира', type:'right_arm', level:35, price:1134, image:'images/items/right_arm/foil.png', image_mini:'images/items/right_arm/mini/foil.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[21] = {item_id:21, nshort:'sharp_foil', name:'Острая рапира', type:'right_arm', level:38, price:1655, image:'images/items/right_arm/sharp_foil.png', image_mini:'images/items/right_arm/mini/sharp_foil.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:3}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
\
items[23] = {item_id:23, nshort:'rusty_machete', name:'Ржавый мачете', type:'right_arm', level:37, price:940, image:'images/items/right_arm/rusty_machete.png', image_mini:'images/items/right_arm/mini/rusty_machete.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tough:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[24] = {item_id:24, nshort:'machete', name:'Мачете', type:'right_arm', level:40, price:1560, image:'images/items/right_arm/machete.png', image_mini:'images/items/right_arm/mini/machete.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tough:3}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[25] = {item_id:25, nshort:'sharp_machete', name:'Острый мачете', type:'right_arm', level:43, price:2150, image:'images/items/right_arm/sharp_machete.png', image_mini:'images/items/right_arm/mini/sharp_machete.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tough:3}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
\
items[27] = {item_id:27, nshort:'rusty_conquistador', name:'Ржавый меч конкистадора', type:'right_arm', level:47, price:1710, image:'images/items/right_arm/rusty_conquistador.png', image_mini:'images/items/right_arm/mini/rusty_conquistador.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{reflex:3}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[28] = {item_id:28, nshort:'conquistador', name:'Меч конкистадора', type:'right_arm', level:50, price:2560, image:'images/items/right_arm/conquistador.png', image_mini:'images/items/right_arm/mini/conquistador.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{reflex:4}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[29] = {item_id:29, nshort:'sharp_conquistador', name:'Острый меч конкистадора', type:'right_arm', level:53, price:3370, image:'images/items/right_arm/sharp_conquistador.png', image_mini:'images/items/right_arm/mini/sharp_conquistador.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{reflex:5}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[30] = {item_id:30, nshort:'henandos_conquistador', name:'Меч Эрнандо', type:'right_arm', level:50, price:8700, image:'images/items/right_arm/henandos_conquistador.png', image_mini:'images/items/right_arm/mini/henandos_conquistador.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:6, reflex:7}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[31] = {item_id:31, nshort:'rusty_tomahawk', name:'Ржавый Томагавк', type:'right_arm', level:57, price:2900, image:'images/items/right_arm/rusty_tomahawk.png', image_mini:'images/items/right_arm/mini/rusty_tomahawk.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{dodge:3, hide:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[32] = {item_id:32, nshort:'tomahawk', name:'Томагавк', type:'right_arm', level:60, price:3800, image:'images/items/right_arm/tomahawk.png', image_mini:'images/items/right_arm/mini/tomahawk.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{dodge:3, hide:3}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[33] = {item_id:33, nshort:'sharp_tomahawk', name:'Острый томагавк', type:'right_arm', level:63, price:4900, image:'images/items/right_arm/sharp_tomahawk.png', image_mini:'images/items/right_arm/mini/sharp_tomahawk.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{dodge:3, hide:3}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
\
items[35] = {item_id:35, nshort:'rusty_axe', name:'Ржавый топор лесоруба', type:'right_arm', level:62, price:3400, image:'images/items/right_arm/rusty_axe.png', image_mini:'images/items/right_arm/mini/rusty_axe.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{punch:4}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[36] = {item_id:36, nshort:'axe', name:'Топор лесоруба', type:'right_arm', level:65, price:4400, image:'images/items/right_arm/axe.png', image_mini:'images/items/right_arm/mini/axe.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{punch:5}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[37] = {item_id:37, nshort:'sharp_axe', name:'Острый топор лесоруба', type:'right_arm', level:68, price:5600, image:'images/items/right_arm/sharp_axe.png', image_mini:'images/items/right_arm/mini/sharp_axe.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{punch:6}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
\
items[39] = {item_id:39, nshort:'rusty_sabre', name:'Ржавая кавалерийская сабля', type:'right_arm', level:67, price:4200, image:'images/items/right_arm/rusty_sabre.png', image_mini:'images/items/right_arm/mini/rusty_sabre.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:5}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[40] = {item_id:40, nshort:'sabre', name:'Кавалерийская сабля', type:'right_arm', level:70, price:5230, image:'images/items/right_arm/sabre.png', image_mini:'images/items/right_arm/mini/sabre.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:6}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[41] = {item_id:41, nshort:'sharp_sabre', name:'Острая кавалерийская сабля', type:'right_arm', level:73, price:6350, image:'images/items/right_arm/sharp_sabre.png', image_mini:'images/items/right_arm/mini/sharp_sabre.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:6}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
\
items[43] = {item_id:43, nshort:'screwdriver', name:'Отвёртка', type:'right_arm', level:10, price:114, image:'images/items/right_arm/screwdriver.png', image_mini:'images/items/right_arm/mini/screwdriver.png', characterClass:'worker', characterSex:null, speed:null, bonus:{skills:{finger_dexterity:1}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[44] = {item_id:44, nshort:'spanner', name:'Гаечный ключ', type:'right_arm', level:21, price:628, image:'images/items/right_arm/spanner.png', image_mini:'images/items/right_arm/mini/spanner.png', characterClass:'worker', characterSex:null, speed:null, bonus:{skills:{build:2}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[45] = {item_id:45, nshort:'crowbar', name:'Фомка', type:'right_arm', level:36, price:1594, image:'images/items/right_arm/crowbar.png', image_mini:'images/items/right_arm/mini/crowbar.png', characterClass:'worker', characterSex:null, speed:null, bonus:{skills:{repair:3}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[46] = {item_id:46, nshort:'whips', name:'Кнут', type:'right_arm', level:30, price:594, image:'images/items/right_arm/whips.png', image_mini:'images/items/right_arm/mini/whips.png', characterClass:'adventurer', characterSex:null, speed:null, bonus:{skills:{reflex:5}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[47] = {item_id:47, nshort:'pillow', name:'Подушка', type:'right_arm', level:45, price:450, image:'images/items/right_arm/pillow.png', image_mini:'images/items/right_arm/mini/pillow.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:'set_sleeper', name:'Набор сони'}, shop:'drop'};\
\
items[101] = {item_id:101, nshort:'bow_rusty', name:'Трухлявый лук', type:'left_arm', level:5, price:400, image:'images/items/left_arm/bow_rusty.png', image_mini:'images/items/left_arm/mini/bow_rusty.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[102] = {item_id:102, nshort:'bow_normal', name:'Лук', type:'left_arm', level:10, price:650, image:'images/items/left_arm/bow_normal.png', image_mini:'images/items/left_arm/mini/bow_normal.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[103] = {item_id:103, nshort:'bow_best', name:'Точный лук', type:'left_arm', level:13, price:1275, image:'images/items/left_arm/bow_best.png', image_mini:'images/items/left_arm/mini/bow_best.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[104] = {item_id:104, nshort:'crossbow_rusty', name:'Трухлявый арбалет', type:'left_arm', level:10, price:520, image:'images/items/left_arm/crossbow_rusty.png', image_mini:'images/items/left_arm/mini/crossbow_rusty.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[105] = {item_id:105, nshort:'crossbow_normal', name:'Арбалет', type:'left_arm', level:20, price:755, image:'images/items/left_arm/crossbow_normal.png', image_mini:'images/items/left_arm/mini/crossbow_normal.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[106] = {item_id:106, nshort:'crossbow_best', name:'Точный арбалет', type:'left_arm', level:23, price:1600, image:'images/items/left_arm/crossbow_best.png', image_mini:'images/items/left_arm/mini/crossbow_best.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[107] = {item_id:107, nshort:'arkebuse_rusty', name:'Ржавая пищаль', type:'left_arm', level:18, price:684, image:'images/items/left_arm/arkebuse_rusty.png', image_mini:'images/items/left_arm/mini/arkebuse_rusty.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[108] = {item_id:108, nshort:'arkebuse_normal', name:'Пищаль', type:'left_arm', level:30, price:1070, image:'images/items/left_arm/arkebuse_normal.png', image_mini:'images/items/left_arm/mini/arkebuse_normal.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[109] = {item_id:109, nshort:'arkebuse_best', name:'Точная пищаль', type:'left_arm', level:33, price:2444, image:'images/items/left_arm/arkebuse_best.png', image_mini:'images/items/left_arm/mini/arkebuse_best.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[110] = {item_id:110, nshort:'blunderbuss_rusty', name:'Ржавое охотничье ружьё', type:'left_arm', level:20, price:775, image:'images/items/left_arm/blunderbuss_rusty.png', image_mini:'images/items/left_arm/mini/blunderbuss_rusty.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[111] = {item_id:111, nshort:'blunderbuss_normal', name:'Охотничье ружьё', type:'left_arm', level:35, price:1300, image:'images/items/left_arm/blunderbuss_normal.png', image_mini:'images/items/left_arm/mini/blunderbuss_normal.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[112] = {item_id:112, nshort:'blunderbuss_best', name:'Точное охотничье ружьё', type:'left_arm', level:38, price:2950, image:'images/items/left_arm/blunderbuss_best.png', image_mini:'images/items/left_arm/mini/blunderbuss_best.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[113] = {item_id:113, nshort:'musket_rusty', name:'Ржавый мушкет', type:'left_arm', level:25, price:920, image:'images/items/left_arm/musket_rusty.png', image_mini:'images/items/left_arm/mini/musket_rusty.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[114] = {item_id:114, nshort:'musket_normal', name:'Мушкет', type:'left_arm', level:40, price:1580, image:'images/items/left_arm/musket_normal.png', image_mini:'images/items/left_arm/mini/musket_normal.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[115] = {item_id:115, nshort:'musket_best', name:'Точный мушкет', type:'left_arm', level:43, price:3850, image:'images/items/left_arm/musket_best.png', image_mini:'images/items/left_arm/mini/musket_best.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[116] = {item_id:116, nshort:'flint_rusty', name:'Ржавый дробовик', type:'left_arm', level:35, price:1350, image:'images/items/left_arm/flint_rusty.png', image_mini:'images/items/left_arm/mini/flint_rusty.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[117] = {item_id:117, nshort:'flint_normal', name:'Дробовик', type:'left_arm', level:50, price:2440, image:'images/items/left_arm/flint_normal.png', image_mini:'images/items/left_arm/mini/flint_normal.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[118] = {item_id:118, nshort:'flint_best', name:'Точный дробовик', type:'left_arm', level:53, price:6300, image:'images/items/left_arm/flint_best.png', image_mini:'images/items/left_arm/mini/flint_best.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[119] = {item_id:119, nshort:'shotgun_rusty', name:'Ржавая винтовка', type:'left_arm', level:40, price:1600, image:'images/items/left_arm/shotgun_rusty.png', image_mini:'images/items/left_arm/mini/shotgun_rusty.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[120] = {item_id:120, nshort:'shotgun_normal', name:'Винтовка', type:'left_arm', level:55, price:3000, image:'images/items/left_arm/shotgun_normal.png', image_mini:'images/items/left_arm/mini/shotgun_normal.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[121] = {item_id:121, nshort:'shotgun_best', name:'Точная винтовка', type:'left_arm', level:58, price:7000, image:'images/items/left_arm/shotgun_best.png', image_mini:'images/items/left_arm/mini/shotgun_best.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[122] = {item_id:122, nshort:'percussion_rusty', name:'Ржавый карабин', type:'left_arm', level:45, price:2000, image:'images/items/left_arm/percussion_rusty.png', image_mini:'images/items/left_arm/mini/percussion_rusty.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[123] = {item_id:123, nshort:'percussion_normal', name:'Карабин', type:'left_arm', level:60, price:3800, image:'images/items/left_arm/percussion_normal.png', image_mini:'images/items/left_arm/mini/percussion_normal.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[124] = {item_id:124, nshort:'percussion_best', name:'Точный карабин', type:'left_arm', level:63, price:8800, image:'images/items/left_arm/percussion_best.png', image_mini:'images/items/left_arm/mini/percussion_best.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[125] = {item_id:125, nshort:'breechloader_rusty', name:'Ржавая казнозарядка', type:'left_arm', level:55, price:3150, image:'images/items/left_arm/breechloader_rusty.png', image_mini:'images/items/left_arm/mini/breechloader_rusty.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[126] = {item_id:126, nshort:'breechloader_normal', name:'Казнозарядка', type:'left_arm', level:70, price:6000, image:'images/items/left_arm/breechloader_normal.png', image_mini:'images/items/left_arm/mini/breechloader_normal.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[127] = {item_id:127, nshort:'breechloader_best', name:'Точная казнозарядка', type:'left_arm', level:73, price:12600, image:'images/items/left_arm/breechloader_best.png', image_mini:'images/items/left_arm/mini/breechloader_best.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[128] = {item_id:128, nshort:'winchester_rusty', name:'Ржавый винчестер', type:'left_arm', level:60, price:3900, image:'images/items/left_arm/winchester_rusty.png', image_mini:'images/items/left_arm/mini/winchester_rusty.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[129] = {item_id:129, nshort:'winchester_normal', name:'Винчестер', type:'left_arm', level:75, price:7600, image:'images/items/left_arm/winchester_normal.png', image_mini:'images/items/left_arm/mini/winchester_normal.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[130] = {item_id:130, nshort:'winchester_best', name:'Точный винчестер', type:'left_arm', level:78, price:15400, image:'images/items/left_arm/winchester_best.png', image_mini:'images/items/left_arm/mini/winchester_best.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
\
\
items[200] = {item_id:200, nshort:'band_red', name:'Красная бандана', type:'head', level:1, price:4, image:'images/items/head/band_red.png', image_mini:'images/items/head/mini/band_red.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:1, tough:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[201] = {item_id:201, nshort:'band_green', name:'Зелёная бандана', type:'head', level:2, price:4, image:'images/items/head/band_green.png', image_mini:'images/items/head/mini/band_green.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:1, dodge:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[202] = {item_id:202, nshort:'band_blue', name:'Синяя бандана', type:'head', level:2, price:4, image:'images/items/head/band_blue.png', image_mini:'images/items/head/mini/band_blue.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:1, finger_dexterity:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[203] = {item_id:203, nshort:'band_yellow', name:'Жёлтая бандана', type:'head', level:2, price:4, image:'images/items/head/band_yellow.png', image_mini:'images/items/head/mini/band_yellow.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[204] = {item_id:204, nshort:'band_brown', name:'Коричневая бандана', type:'head', level:3, price:18, image:'images/items/head/band_brown.png', image_mini:'images/items/head/mini/band_brown.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:1, health:2, swim:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[205] = {item_id:205, nshort:'band_black', name:'Чёрная бандана', type:'head', level:3, price:18, image:'images/items/head/band_black.png', image_mini:'images/items/head/mini/band_black.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:2, repair:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[206] = {item_id:206, nshort:'slouch_cap_grey', name:'Серая кепка', type:'head', level:3, price:46, image:'images/items/head/slouch_cap_grey.png', image_mini:'images/items/head/mini/slouch_cap_grey.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tough:5}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[207] = {item_id:207, nshort:'slouch_cap_brown', name:'Коричневая кепка', type:'head', level:5, price:112, image:'images/items/head/slouch_cap_brown.png', image_mini:'images/items/head/mini/slouch_cap_brown.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tough:6, ride:3}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[208] = {item_id:208, nshort:'slouch_cap_black', name:'Чёрная кепка', type:'head', level:5, price:112, image:'images/items/head/slouch_cap_black.png', image_mini:'images/items/head/mini/slouch_cap_black.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tough:3, pitfall:3, leadership:3}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[209] = {item_id:209, nshort:'slouch_cap_fine', name:'Знатная кепка', type:'head', level:6, price:520, image:'images/items/head/slouch_cap_fine.png', image_mini:'images/items/head/mini/slouch_cap_fine.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tough:6, aim:4, tactic:4, reflex:4}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[210] = {item_id:210, nshort:'cap_grey', name:'Серая шапка', type:'head', level:4, price:90, image:'images/items/head/cap_grey.png', image_mini:'images/items/head/mini/cap_grey.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:8}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[211] = {item_id:211, nshort:'cap_red', name:'Красная шапка', type:'head', level:5, price:175, image:'images/items/head/cap_red.png', image_mini:'images/items/head/mini/cap_red.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:6, endurance:5}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[212] = {item_id:212, nshort:'cap_green', name:'Зелёная шапка', type:'head', level:5, price:175, image:'images/items/head/cap_green.png', image_mini:'images/items/head/mini/cap_green.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:6}, attributes:{flexibility:1}}, set:{key:null, name:null}, shop:'shop'};\
items[213] = {item_id:213, nshort:'cap_blue', name:'Синяя шапка', type:'head', level:5, price:175, image:'images/items/head/cap_blue.png', image_mini:'images/items/head/mini/cap_blue.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:6, pitfall:5}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[214] = {item_id:214, nshort:'cap_yellow', name:'Жёлтая шапка', type:'head', level:5, price:175, image:'images/items/head/cap_yellow.png', image_mini:'images/items/head/mini/cap_yellow.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:6, appearance:5}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[215] = {item_id:215, nshort:'cap_brown', name:'Коричневая шапка', type:'head', level:6, price:300, image:'images/items/head/cap_brown.png', image_mini:'images/items/head/mini/cap_brown.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:10, tough:4}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[216] = {item_id:216, nshort:'cap_black', name:'Чёрная шапка', type:'head', level:6, price:300, image:'images/items/head/cap_black.png', image_mini:'images/items/head/mini/cap_black.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:6, tactic:4, finger_dexterity:4}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[217] = {item_id:217, nshort:'cap_fine', name:'Знатная шапка', type:'head', level:8, price:1100, image:'images/items/head/cap_fine.png', image_mini:'images/items/head/mini/cap_fine.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:10, shot:5, animal:5, tough:5}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[218] = {item_id:218, nshort:'slouch_hat_grey', name:'Серая панама', type:'head', level:7, price:220, image:'images/items/head/slouch_hat_grey.png', image_mini:'images/items/head/mini/slouch_hat_grey.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:12}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[219] = {item_id:219, nshort:'slouch_hat_brown', name:'Коричневая панама', type:'head', level:9, price:520, image:'images/items/head/slouch_hat_brown.png', image_mini:'images/items/head/mini/slouch_hat_brown.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:9, punch:5, dodge:4}, attributes:{}}, set:{key:'set_farmer', name:'Набор фермера'}, shop:'shop'};\
items[220] = {item_id:220, nshort:'slouch_hat_black', name:'Чёрная панама', type:'head', level:9, price:520, image:'images/items/head/slouch_hat_black.png', image_mini:'images/items/head/mini/slouch_hat_black.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:9, tactic:4}, attributes:{dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\
items[221] = {item_id:221, nshort:'slouch_hat_fine', name:'Знатная панама', type:'head', level:12, price:1920, image:'images/items/head/slouch_hat_fine.png', image_mini:'images/items/head/mini/slouch_hat_fine.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:10, endurance:6, leadership:6, reflex:6}, attributes:{dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\
items[222] = {item_id:222, nshort:'bowler_grey', name:'Серый котелок', type:'head', level:10, price:420, image:'images/items/head/bowler_grey.png', image_mini:'images/items/head/mini/bowler_grey.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:11}, attributes:{charisma:1}}, set:{key:null, name:null}, shop:'shop'};\
items[223] = {item_id:223, nshort:'bowler_brown', name:'Коричневый котелок', type:'head', level:12, price:808, image:'images/items/head/bowler_brown.png', image_mini:'images/items/head/mini/bowler_brown.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:11, build:6, reflex:5}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[224] = {item_id:224, nshort:'bowler_black', name:'Чёрный котелок', type:'head', level:12, price:808, image:'images/items/head/bowler_black.png', image_mini:'images/items/head/mini/bowler_black.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:11, shot:6}, attributes:{charisma:1}}, set:{key:'set_quackery', name:'Знахарская утварь'}, shop:'shop'};\
items[225] = {item_id:225, nshort:'bowler_fine', name:'Знатный котелок', type:'head', level:15, price:1850, image:'images/items/head/bowler_fine.png', image_mini:'images/items/head/mini/bowler_fine.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:11, tough:6, repair:5, ride:5}, attributes:{charisma:1}}, set:{key:null, name:null}, shop:'shop'};\
items[226] = {item_id:226, nshort:'cloth_hat_grey', name:'Шляпа из серого фетра', type:'head', level:14, price:655, image:'images/items/head/cloth_hat_grey.png', image_mini:'images/items/head/mini/cloth_hat_grey.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{health:10, aim:10}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[227] = {item_id:227, nshort:'cloth_hat_brown', name:'Шляпа из коричневого фетра', type:'head', level:20, price:1270, image:'images/items/head/cloth_hat_brown.png', image_mini:'images/items/head/mini/cloth_hat_brown.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{health:13, aim:7, swim:7}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[228] = {item_id:228, nshort:'cloth_hat_black', name:'Шляпа из чёрного фетра', type:'head', level:20, price:1270, image:'images/items/head/cloth_hat_black.png', image_mini:'images/items/head/mini/cloth_hat_black.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{health:7, aim:13, appearance:7}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[229] = {item_id:229, nshort:'cloth_hat_fine', name:'Знатная фетровая шляпа', type:'head', level:22, price:3900, image:'images/items/head/cloth_hat_fine.png', image_mini:'images/items/head/mini/cloth_hat_fine.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{health:9, aim:9, dodge:8, tactic:8}, attributes:{strength:1, dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\
items[230] = {item_id:230, nshort:'cylinder_grey', name:'Серый цилиндр', type:'head', level:18, price:1270, image:'images/items/head/cylinder_grey.png', image_mini:'images/items/head/mini/cylinder_grey.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:14, finger_dexterity:13}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[231] = {item_id:231, nshort:'cylinder_red', name:'Красный цилиндр', type:'head', level:24, price:1900, image:'images/items/head/cylinder_red.png', image_mini:'images/items/head/mini/cylinder_red.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{punch:8, leadership:10, finger_dexterity:9}, attributes:{strength:1}}, set:{key:null, name:null}, shop:'shop'};\
items[232] = {item_id:232, nshort:'cylinder_green', name:'Зелёный цилиндр', type:'head', level:24, price:1900, image:'images/items/head/cylinder_green.png', image_mini:'images/items/head/mini/cylinder_green.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{hide:8, leadership:10, finger_dexterity:9}, attributes:{flexibility:1}}, set:{key:null, name:null}, shop:'shop'};\
items[233] = {item_id:233, nshort:'cylinder_blue', name:'Синий цилиндр', type:'head', level:24, price:1900, image:'images/items/head/cylinder_blue.png', image_mini:'images/items/head/mini/cylinder_blue.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:10, finger_dexterity:12}, attributes:{dexterity:2}}, set:{key:null, name:null}, shop:'shop'};\
items[234] = {item_id:234, nshort:'cylinder_yellow', name:'Жёлтый цилиндр', type:'head', level:24, price:1900, image:'images/items/head/cylinder_yellow.png', image_mini:'images/items/head/mini/cylinder_yellow.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:13, finger_dexterity:9}, attributes:{charisma:2}}, set:{key:null, name:null}, shop:'shop'};\
items[235] = {item_id:235, nshort:'cylinder_brown', name:'Коричневый цилиндр', type:'head', level:25, price:2700, image:'images/items/head/cylinder_brown.png', image_mini:'images/items/head/mini/cylinder_brown.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:10, finger_dexterity:9, ride:9, health:8}, attributes:{}}, set:{key:'set_gentleman', name:'Джентльменский набор'}, shop:'shop'};\
items[236] = {item_id:236, nshort:'cylinder_black', name:'Чёрный цилиндр', type:'head', level:25, price:2700, image:'images/items/head/cylinder_black.png', image_mini:'images/items/head/mini/cylinder_black.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:13, finger_dexterity:13}, attributes:{charisma:1, dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\
items[237] = {item_id:237, nshort:'cylinder_fine', name:'Цилиндр Линкольна', type:'head', level:27, price:5400, image:'images/items/head/cylinder_fine.png', image_mini:'images/items/head/mini/cylinder_fine.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:13, finger_dexterity:12, build:9, ride:8}, attributes:{charisma:1, dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\
items[238] = {item_id:238, nshort:'leather_hat_grey', name:'Серая шляпа', type:'head', level:24, price:2000, image:'images/items/head/leather_hat_grey.png', image_mini:'images/items/head/mini/leather_hat_grey.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{reflex:12, animal:11}, attributes:{flexibility:1, charisma:1}}, set:{key:null, name:null}, shop:'shop'};\
items[239] = {item_id:239, nshort:'leather_hat_brown', name:'Коричневая шляпа', type:'head', level:28, price:3500, image:'images/items/head/leather_hat_brown.png', image_mini:'images/items/head/mini/leather_hat_brown.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{reflex:12, animal:11, punch:10}, attributes:{flexibility:2}}, set:{key:null, name:null}, shop:'shop'};\
items[240] = {item_id:240, nshort:'leather_hat_black', name:'Чёрная шляпа', type:'head', level:28, price:3500, image:'images/items/head/leather_hat_black.png', image_mini:'images/items/head/mini/leather_hat_black.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{reflex:12, animal:11, repair:10}, attributes:{charisma:2}}, set:{key:null, name:null}, shop:'shop'};\
items[241] = {item_id:241, nshort:'leather_hat_fine', name:'Знатная шляпа', type:'head', level:30, price:4100, image:'images/items/head/leather_hat_fine.png', image_mini:'images/items/head/mini/leather_hat_fine.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{reflex:15, animal:14, tough:9, aim:8}, attributes:{flexibility:1, charisma:1}}, set:{key:null, name:null}, shop:'shop'};\
items[242] = {item_id:242, nshort:'stetson_grey', name:'Серый стетсон', type:'head', level:30, price:2555, image:'images/items/head/stetson_grey.png', image_mini:'images/items/head/mini/stetson_grey.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{finger_dexterity:14, health:13}, attributes:{dexterity:1, strength:1}}, set:{key:null, name:null}, shop:'shop'};\
items[243] = {item_id:243, nshort:'stetson_brown', name:'Коричневый стетсон', type:'head', level:33, price:4500, image:'images/items/head/stetson_brown.png', image_mini:'images/items/head/mini/stetson_brown.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{finger_dexterity:13, health:13, dodge:12}, attributes:{strength:2}}, set:{key:null, name:null}, shop:'shop'};\
items[244] = {item_id:244, nshort:'stetson_black', name:'Чёрный стетсон', type:'head', level:33, price:4500, image:'images/items/head/stetson_black.png', image_mini:'images/items/head/mini/stetson_black.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{finger_dexterity:13, health:13, leadership:12}, attributes:{dexterity:2}}, set:{key:null, name:null}, shop:'shop'};\
items[245] = {item_id:245, nshort:'stetson_fine', name:'Знатный стетсон', type:'head', level:36, price:7100, image:'images/items/head/stetson_fine.png', image_mini:'images/items/head/mini/stetson_fine.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{finger_dexterity:16, health:16, trade:9, swim:8}, attributes:{strength:1, dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\
items[246] = {item_id:246, nshort:'xmas_hat', name:'Рождественский колпак', type:'head', level:1, price:50, image:'images/items/head/xmas_hat.png', image_mini:'images/items/head/mini/xmas_hat.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[247] = {item_id:247, nshort:'southcap', name:'Фуражка', type:'head', level:20, price:800, image:'images/items/head/southcap.png', image_mini:'images/items/head/mini/southcap.png', characterClass:'soldier', characterSex:null, speed:null, bonus:{skills:{punch:11, pitfall:5}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[248] = {item_id:248, nshort:'adventurerhat', name:'Шляпа авантюриста', type:'head', level:22, price:2980, image:'images/items/head/adventurerhat.png', image_mini:'images/items/head/mini/adventurerhat.png', characterClass:'adventurer', characterSex:null, speed:null, bonus:{skills:{hide:6, ride:8, tough:10}, attributes:{dexterity:3}}, set:{key:null, name:null}, shop:'quest'};\
items[249] = {item_id:249, nshort:'fedora_black', name:'Чёрная фетровая шляпа', type:'head', level:22, price:1700, image:'images/items/head/fedora_black.png', image_mini:'images/items/head/mini/fedora_black.png', characterClass:'duelist', characterSex:null, speed:null, bonus:{skills:{shot:10, aim:6}, attributes:{charisma:3}}, set:{key:null, name:null}, shop:'quest'};\
items[250] = {item_id:250, nshort:'feather_hat_brown', name:'Коричневая шляпа с пером', type:'head', level:18, price:1460, image:'images/items/head/feather_hat_brown.png', image_mini:'images/items/head/mini/feather_hat_brown.png', characterClass:'worker', characterSex:null, speed:null, bonus:{skills:{dodge:5, reflex:4, endurance:3, tough:2}, attributes:{flexibility:3}}, set:{key:null, name:null}, shop:'quest'};\
\
items[253] = {item_id:253, nshort:'indian_hat', name:'Индейское оперение', type:'head', level:51, price:3200, image:'images/items/head/indian_hat.png', image_mini:'images/items/head/mini/indian_hat.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:12, appearance:11}, attributes:{charisma:2}}, set:{key:'set_indian', name:'Индейский набор'}, shop:'shop'};\
items[254] = {item_id:254, nshort:'mexican_sombrero', name:'Сомбреро', type:'head', level:30, price:1270, image:'images/items/head/mexican_sombrero.png', image_mini:'images/items/head/mini/mexican_sombrero.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tough:10, health:6, shot:6}, attributes:{}}, set:{key:'set_mexican', name:'Набор мексиканца'}, shop:'shop'};\
\
items[256] = {item_id:256, nshort:'pilger_cap', name:'Монашеский чепец', type:'head', level:37, price:1270, image:'images/items/head/pilger_cap.png', image_mini:'images/items/head/mini/pilger_cap.png', characterClass:null, characterSex:'female', speed:null, bonus:{skills:{endurance:10, leadership:6, repair:6}, attributes:{}}, set:{key:'set_pilgrim_female', name:'Монашеский скарб'}, shop:'shop'};\
items[257] = {item_id:257, nshort:'pilger_hat', name:'Шляпа пастора', type:'head', level:37, price:1270, image:'images/items/head/pilger_hat.png', image_mini:'images/items/head/mini/pilger_hat.png', characterClass:null, characterSex:'male', speed:null, bonus:{skills:{trade:6, repair:6, health:10}, attributes:{}}, set:{key:'set_pilgrim_male', name:'Скарб проповедника'}, shop:'shop'};\
\
items[258] = {item_id:258, nshort:'cylinder_xmas', name:'Шляпа снеговика', type:'head', level:30, price:2412, image:'images/items/head/cylinder_xmas.png', image_mini:'images/items/head/mini/cylinder_xmas.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{charisma:2, dexterity:2, flexibility:2, strength:2}}, set:{key:'season_set', name:'Праздничный наряд'}, shop:'quest'};\
items[259] = {item_id:259, nshort:'dancer_hat', name:'Перо', type:'head', level:42, price:2500, image:'images/items/head/dancer_hat.png', image_mini:'images/items/head/mini/dancer_hat.png', characterClass:null, characterSex:'female', speed:null, bonus:{skills:{pitfall:8, tactic:10, aim:9}, attributes:{flexibility:1}}, set:{key:'set_dancer', name:'Туалет танцовщицы'}, shop:'shop'};\
items[261] = {item_id:261, nshort:'sleep_cap', name:'Соня', type:'head', level:45, price:1200, image:'images/items/head/sleep_cap.png', image_mini:'images/items/head/mini/sleep_cap.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:'set_sleeper', name:'Набор сони'}, shop:'drop'};\
items[299] = {item_id:299, nshort:'band_grey', name:'Серая бандана', type:'head', level:1, price:2, image:'images/items/head/band_grey.png', image_mini:'images/items/head/mini/band_grey.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
\
\
items[300] = {item_id:300, nshort:'tatter_grey', name:'Серые лохмотья', type:'body', level:1, price:2, image:'images/items/body/tatter_grey.png', image_mini:'images/items/body/mini/tatter_grey.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[301] = {item_id:301, nshort:'tatter_red', name:'Красные лохмотья', type:'body', level:1, price:12, image:'images/items/body/tatter_red.png', image_mini:'images/items/body/mini/tatter_red.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:1, build:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[302] = {item_id:302, nshort:'tatter_green', name:'Зелёные лохмотья', type:'body', level:1, price:12, image:'images/items/body/tatter_green.png', image_mini:'images/items/body/mini/tatter_green.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:1, ride:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[303] = {item_id:303, nshort:'tatter_blue', name:'Синие лохмотья', type:'body', level:1, price:12, image:'images/items/body/tatter_blue.png', image_mini:'images/items/body/mini/tatter_blue.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:3}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[304] = {item_id:304, nshort:'tatter_yellow', name:'Жёлтые лохмотья', type:'body', level:1, price:12, image:'images/items/body/tatter_yellow.png', image_mini:'images/items/body/mini/tatter_yellow.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:1, leadership:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[305] = {item_id:305, nshort:'tatter_brown', name:'Коричневые лохмотья', type:'body', level:2, price:38, image:'images/items/body/tatter_brown.png', image_mini:'images/items/body/mini/tatter_brown.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:1, reflex:2, punch:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[306] = {item_id:306, nshort:'tatter_black', name:'Чёрные лохмотья', type:'body', level:2, price:38, image:'images/items/body/tatter_black.png', image_mini:'images/items/body/mini/tatter_black.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:3, tactic:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[307] = {item_id:307, nshort:'poncho_grey', name:'Серое пончо', type:'body', level:3, price:38, image:'images/items/body/poncho_grey.png', image_mini:'images/items/body/mini/poncho_grey.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{dodge:5}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[308] = {item_id:308, nshort:'poncho_red', name:'Красное пончо', type:'body', level:4, price:80, image:'images/items/body/poncho_red.png', image_mini:'images/items/body/mini/poncho_red.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{dodge:3, tough:4}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[309] = {item_id:309, nshort:'poncho_green', name:'Зелёное пончо', type:'body', level:4, price:80, image:'images/items/body/poncho_green.png', image_mini:'images/items/body/mini/poncho_green.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{dodge:7}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[310] = {item_id:310, nshort:'poncho_blue', name:'Синее пончо', type:'body', level:4, price:80, image:'images/items/body/poncho_blue.png', image_mini:'images/items/body/mini/poncho_blue.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{dodge:3, aim:4}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[311] = {item_id:311, nshort:'poncho_yellow', name:'Жёлтое пончо', type:'body', level:4, price:80, image:'images/items/body/poncho_yellow.png', image_mini:'images/items/body/mini/poncho_yellow.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{dodge:3, trade:4}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[312] = {item_id:312, nshort:'poncho_brown', name:'Коричневое пончо', type:'body', level:5, price:174, image:'images/items/body/poncho_brown.png', image_mini:'images/items/body/mini/poncho_brown.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{dodge:6, endurance:4}, attributes:{}}, set:{key:'set_mexican', name:'Набор мексиканца'}, shop:'shop'};\
items[313] = {item_id:313, nshort:'poncho_black', name:'Чёрное пончо', type:'body', level:5, price:174, image:'images/items/body/poncho_black.png', image_mini:'images/items/body/mini/poncho_black.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{dodge:3, animal:4, shot:3}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[314] = {item_id:314, nshort:'poncho_fine', name:'Пончо Клинта', type:'body', level:6, price:800, image:'images/items/body/poncho_fine.png', image_mini:'images/items/body/mini/poncho_fine.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{dodge:7, build:5, pitfall:4, appearance:4}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[315] = {item_id:315, nshort:'clothes_grey', name:'Серый костюм', type:'body', level:7, price:138, image:'images/items/body/clothes_grey.png', image_mini:'images/items/body/mini/clothes_grey.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:9}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[316] = {item_id:316, nshort:'clothes_red', name:'Красный костюм', type:'body', level:8, price:260, image:'images/items/body/clothes_red.png', image_mini:'images/items/body/mini/clothes_red.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:6, health:6}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[317] = {item_id:317, nshort:'clothes_green', name:'Зелёный костюм', type:'body', level:14, price:260, image:'images/items/body/clothes_green.png', image_mini:'images/items/body/mini/clothes_green.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:6, hide:6}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[318] = {item_id:318, nshort:'clothes_blue', name:'Синий костюм', type:'body', level:8, price:260, image:'images/items/body/clothes_blue.png', image_mini:'images/items/body/mini/clothes_blue.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:6, finger_dexterity:6}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[319] = {item_id:319, nshort:'clothes_yellow', name:'Жёлтый костюм', type:'body', level:8, price:260, image:'images/items/body/clothes_yellow.png', image_mini:'images/items/body/mini/clothes_yellow.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:7}, attributes:{charisma:1}}, set:{key:null, name:null}, shop:'shop'};\
items[320] = {item_id:320, nshort:'clothes_brown', name:'Коричневый костюм', type:'body', level:8, price:425, image:'images/items/body/clothes_brown.png', image_mini:'images/items/body/mini/clothes_brown.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:6, swim:5, build:4}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[321] = {item_id:321, nshort:'clothes_black', name:'Чёрный костюм', type:'body', level:8, price:425, image:'images/items/body/clothes_black.png', image_mini:'images/items/body/mini/clothes_black.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:10, repair:5}, attributes:{}}, set:{key:'set_farmer', name:'Набор фермера'}, shop:'shop'};\
items[322] = {item_id:322, nshort:'clothes_fine', name:'Воскресный костюм', type:'body', level:10, price:1650, image:'images/items/body/clothes_fine.png', image_mini:'images/items/body/mini/clothes_fine.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:6, endurance:6, reflex:6, finger_dexterity:5}, attributes:{charisma:1}}, set:{key:null, name:null}, shop:'shop'};\
items[323] = {item_id:323, nshort:'shirt_grey', name:'Серая рубашка', type:'body', level:12, price:310, image:'images/items/body/shirt_grey.png', image_mini:'images/items/body/mini/shirt_grey.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:13}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[324] = {item_id:324, nshort:'shirt_red', name:'Красная рубашка', type:'body', level:13, price:560, image:'images/items/body/shirt_red.png', image_mini:'images/items/body/mini/shirt_red.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:9, health:8}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[325] = {item_id:325, nshort:'shirt_green', name:'Зелёная рубашка', type:'body', level:13, price:560, image:'images/items/body/shirt_green.png', image_mini:'images/items/body/mini/shirt_green.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:9, ride:8}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[326] = {item_id:326, nshort:'shirt_blue', name:'Синяя рубашка', type:'body', level:13, price:560, image:'images/items/body/shirt_blue.png', image_mini:'images/items/body/mini/shirt_blue.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:9, aim:8}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[327] = {item_id:327, nshort:'shirt_yellow', name:'Жёлтая рубашка', type:'body', level:13, price:560, image:'images/items/body/shirt_yellow.png', image_mini:'images/items/body/mini/shirt_yellow.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:13}, attributes:{charisma:1}}, set:{key:null, name:null}, shop:'shop'};\
items[328] = {item_id:328, nshort:'shirt_brown', name:'Коричневая рубашка', type:'body', level:14, price:800, image:'images/items/body/shirt_brown.png', image_mini:'images/items/body/mini/shirt_brown.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:9, reflex:6, endurance:5}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[329] = {item_id:329, nshort:'shirt_black', name:'Чёрная рубашка', type:'body', level:14, price:800, image:'images/items/body/shirt_black.png', image_mini:'images/items/body/mini/shirt_black.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:9, pitfall:6}, attributes:{charisma:1}}, set:{key:null, name:null}, shop:'shop'};\
items[330] = {item_id:330, nshort:'shirt_fine', name:'Знатная рубашка', type:'body', level:15, price:1305, image:'images/items/body/shirt_fine.png', image_mini:'images/items/body/mini/shirt_fine.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:10, shot:7, ride:7, punch:6}, attributes:{charisma:1}}, set:{key:null, name:null}, shop:'shop'};\
items[331] = {item_id:331, nshort:'plaid_shirt_grey', name:'Серая клетчатая рубашка', type:'body', level:15, price:560, image:'images/items/body/plaid_shirt_grey.png', image_mini:'images/items/body/mini/plaid_shirt_grey.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{punch:12}, attributes:{strength:1}}, set:{key:null, name:null}, shop:'shop'};\
items[332] = {item_id:332, nshort:'plaid_shirt_red', name:'Красная клетчатая рубашка', type:'body', level:16, price:800, image:'images/items/body/plaid_shirt_red.png', image_mini:'images/items/body/mini/plaid_shirt_red.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{punch:15}, attributes:{strength:1}}, set:{key:null, name:null}, shop:'shop'};\
items[333] = {item_id:333, nshort:'plaid_shirt_green', name:'Зелёная клетчатая рубашка', type:'body', level:16, price:800, image:'images/items/body/plaid_shirt_green.png', image_mini:'images/items/body/mini/plaid_shirt_green.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{punch:11, swim:9}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[334] = {item_id:334, nshort:'plaid_shirt_blue', name:'Синяя клетчатая рубашка', type:'body', level:16, price:800, image:'images/items/body/plaid_shirt_blue.png', image_mini:'images/items/body/mini/plaid_shirt_blue.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{punch:11, shot:9}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[335] = {item_id:335, nshort:'plaid_shirt_yellow', name:'Жёлтая клетчатая рубашка', type:'body', level:16, price:800, image:'images/items/body/plaid_shirt_yellow.png', image_mini:'images/items/body/mini/plaid_shirt_yellow.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{punch:11, tactic:9}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[336] = {item_id:336, nshort:'plaid_shirt_brown', name:'Коричневая клетчатая рубашка', type:'body', level:17, price:1200, image:'images/items/body/plaid_shirt_brown.png', image_mini:'images/items/body/mini/plaid_shirt_brown.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{punch:12, ride:7}, attributes:{strength:1}}, set:{key:null, name:null}, shop:'shop'};\
items[337] = {item_id:337, nshort:'plaid_shirt_black', name:'Чёрная клетчатая рубашка', type:'body', level:17, price:1200, image:'images/items/body/plaid_shirt_black.png', image_mini:'images/items/body/mini/plaid_shirt_black.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{punch:11, tactic:7, repair:6}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[338] = {item_id:338, nshort:'plaid_shirt_fine', name:'Рубаха лесоруба', type:'body', level:19, price:3900, image:'images/items/body/plaid_shirt_fine.png', image_mini:'images/items/body/mini/plaid_shirt_fine.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{punch:13, animal:8, hide:8, pitfall:7}, attributes:{strength:1}}, set:{key:null, name:null}, shop:'shop'};\
items[339] = {item_id:339, nshort:'vest_grey', name:'Серая жилетка', type:'body', level:16, price:900, image:'images/items/body/vest_grey.png', image_mini:'images/items/body/mini/vest_grey.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{reflex:11, shot:10}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[340] = {item_id:340, nshort:'vest_brown', name:'Коричневая жилетка', type:'body', level:20, price:1800, image:'images/items/body/vest_brown.png', image_mini:'images/items/body/mini/vest_brown.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{reflex:9, shot:7, health:8}, attributes:{flexibility:1}}, set:{key:'set_quackery', name:'Знахарская утварь'}, shop:'shop'};\
items[341] = {item_id:341, nshort:'vest_black', name:'Чёрная жилетка', type:'body', level:20, price:1800, image:'images/items/body/vest_black.png', image_mini:'images/items/body/mini/vest_black.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{reflex:7, shot:9, leadership:8}, attributes:{dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\
items[342] = {item_id:342, nshort:'vest_fine', name:'Знатная жилетка', type:'body', level:20, price:5200, image:'images/items/body/vest_fine.png', image_mini:'images/items/body/mini/vest_fine.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{reflex:10, shot:10, endurance:9, trade:8}, attributes:{dexterity:1, flexibility:1}}, set:{key:null, name:null}, shop:'shop'};\
items[343] = {item_id:343, nshort:'coat_grey', name:'Серая куртка', type:'body', level:20, price:1300, image:'images/items/body/coat_grey.png', image_mini:'images/items/body/mini/coat_grey.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{build:13, pitfall:12}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[344] = {item_id:344, nshort:'coat_red', name:'Красная куртка', type:'body', level:20, price:2000, image:'images/items/body/coat_red.png', image_mini:'images/items/body/mini/coat_red.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{build:12, pitfall:8}, attributes:{strength:2}}, set:{key:null, name:null}, shop:'shop'};\
items[345] = {item_id:345, nshort:'coat_green', name:'Зелёная куртка', type:'body', level:20, price:2000, image:'images/items/body/coat_green.png', image_mini:'images/items/body/mini/coat_green.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{build:9, pitfall:8, hide:8}, attributes:{flexibility:1}}, set:{key:null, name:null}, shop:'shop'};\
items[346] = {item_id:346, nshort:'coat_blue', name:'Синяя куртка', type:'body', level:20, price:2000, image:'images/items/body/coat_blue.png', image_mini:'images/items/body/mini/coat_blue.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{build:9, pitfall:11}, attributes:{dexterity:2}}, set:{key:null, name:null}, shop:'shop'};\
items[347] = {item_id:347, nshort:'coat_yellow', name:'Жёлтая куртка', type:'body', level:20, price:2000, image:'images/items/body/coat_yellow.png', image_mini:'images/items/body/mini/coat_yellow.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{build:9, pitfall:8, leadership:8}, attributes:{charisma:1}}, set:{key:null, name:null}, shop:'shop'};\
items[348] = {item_id:348, nshort:'coat_brown', name:'Коричневая куртка', type:'body', level:21, price:2500, image:'images/items/body/coat_brown.png', image_mini:'images/items/body/mini/coat_brown.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{build:12, pitfall:8, swim:9}, attributes:{strength:1}}, set:{key:null, name:null}, shop:'shop'};\
items[349] = {item_id:349, nshort:'coat_black', name:'Чёрная куртка', type:'body', level:21, price:2500, image:'images/items/body/coat_black.png', image_mini:'images/items/body/mini/coat_black.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{build:9, pitfall:11, animal:9}, attributes:{dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\
items[350] = {item_id:350, nshort:'coat_fine', name:'Знатная куртка', type:'body', level:22, price:6300, image:'images/items/body/coat_fine.png', image_mini:'images/items/body/mini/coat_fine.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{build:12, pitfall:11, appearance:9, dodge:9}, attributes:{strength:1, dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\
items[351] = {item_id:351, nshort:'jacket_grey', name:'Серый пиджак', type:'body', level:20, price:1850, image:'images/items/body/jacket_grey.png', image_mini:'images/items/body/mini/jacket_grey.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:10, reflex:9}, attributes:{charisma:1, flexibility:1}}, set:{key:null, name:null}, shop:'shop'};\
items[352] = {item_id:352, nshort:'jacket_brown', name:'Коричневый пиджак', type:'body', level:25, price:3500, image:'images/items/body/jacket_brown.png', image_mini:'images/items/body/mini/jacket_brown.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:10, reflex:9, tough:10}, attributes:{flexibility:2}}, set:{key:null, name:null}, shop:'shop'};\
items[353] = {item_id:353, nshort:'jacket_black', name:'Чёрный пиджак', type:'body', level:25, price:3500, image:'images/items/body/jacket_black.png', image_mini:'images/items/body/mini/jacket_black.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:10, reflex:9, aim:10}, attributes:{charisma:2}}, set:{key:null, name:null}, shop:'shop'};\
items[354] = {item_id:354, nshort:'jacket_fine', name:'Знатный пиджак', type:'body', level:27, price:7200, image:'images/items/body/jacket_fine.png', image_mini:'images/items/body/mini/jacket_fine.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:13, reflex:13, punch:9, aim:9}, attributes:{charisma:1, flexibility:1}}, set:{key:'set_gentleman', name:'Джентльменский набор'}, shop:'shop'};\
items[355] = {item_id:355, nshort:'leather_coat_grey', name:'Серая кожанка', type:'body', level:25, price:2700, image:'images/items/body/leather_coat_grey.png', image_mini:'images/items/body/mini/leather_coat_grey.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tough:13, hide:12}, attributes:{strength:1, flexibility:1}}, set:{key:null, name:null}, shop:'shop'};\
items[356] = {item_id:356, nshort:'leather_coat_brown', name:'Коричневая кожанка', type:'body', level:28, price:5000, image:'images/items/body/leather_coat_brown.png', image_mini:'images/items/body/mini/leather_coat_brown.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tough:13, hide:13}, attributes:{strength:2, flexibility:2}}, set:{key:null, name:null}, shop:'shop'};\
items[357] = {item_id:357, nshort:'leather_coat_black', name:'Чёрная кожанка', type:'body', level:28, price:5000, image:'images/items/body/leather_coat_black.png', image_mini:'images/items/body/mini/leather_coat_black.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tough:12, hide:11, repair:12, leadership:11}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[358] = {item_id:358, nshort:'leather_coat_fine', name:'Знатная кожанка', type:'body', level:30, price:9000, image:'images/items/body/leather_coat_fine.png', image_mini:'images/items/body/mini/leather_coat_fine.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tough:16, hide:15, finger_dexterity:9, appearance:10}, attributes:{strength:1, flexibility:1}}, set:{key:null, name:null}, shop:'shop'};\
items[359] = {item_id:359, nshort:'greatcoat_grey', name:'Серое пальто', type:'body', level:33, price:3500, image:'images/items/body/greatcoat_grey.png', image_mini:'images/items/body/mini/greatcoat_grey.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:15, shot:14}, attributes:{charisma:1, dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\
items[360] = {item_id:360, nshort:'greatcoat_brown', name:'Коричневое пальто', type:'body', level:40, price:6280, image:'images/items/body/greatcoat_brown.png', image_mini:'images/items/body/mini/greatcoat_brown.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:13, shot:13, ride:13, health:12}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[361] = {item_id:361, nshort:'greatcoat_fine', name:'Знатное пальто', type:'body', level:45, price:9500, image:'images/items/body/greatcoat_fine.png', image_mini:'images/items/body/mini/greatcoat_fine.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:17, shot:16, endurance:9, ride:9}, attributes:{charisma:1, dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\
items[362] = {item_id:362, nshort:'uniform', name:'Форма', type:'body', level:20, price:800, image:'images/items/body/uniform.png', image_mini:'images/items/body/mini/uniform.png', characterClass:'soldier', characterSex:null, speed:null, bonus:{skills:{hide:4, appearance:2}, attributes:{charisma:2}}, set:{key:null, name:null}, shop:'quest'};\
items[363] = {item_id:363, nshort:'uniform_burned', name:'Палёная форма', type:'body', level:20, price:80, image:'images/items/body/uniform_burned.png', image_mini:'images/items/body/mini/uniform_burned.png', characterClass:'soldier', characterSex:null, speed:null, bonus:{skills:{appearance:-2, hide:4}, attributes:{charisma:2}}, set:{key:null, name:null}, shop:'drop'};\
items[364] = {item_id:364, nshort:'greatcoat_black', name:'Чёрное пальто', type:'body', level:40, price:6280, image:'images/items/body/greatcoat_black.png', image_mini:'images/items/body/mini/greatcoat_black.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:16, shot:15}, attributes:{charisma:2, dexterity:2}}, set:{key:null, name:null}, shop:'shop'};\
items[365] = {item_id:365, nshort:'adventurerjacket', name:'Жакет авантюриста', type:'body', level:40, price:1100, image:'images/items/body/adventurerjacket.png', image_mini:'images/items/body/mini/adventurerjacket.png', characterClass:'adventurer', characterSex:null, speed:null, bonus:{skills:{hide:4, ride:10, tough:9}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[366] = {item_id:366, nshort:'vest_leather_brown', name:'Коричневая кожаная жилетка', type:'body', level:14, price:800, image:'images/items/body/vest_leather_brown.png', image_mini:'images/items/body/mini/vest_leather_brown.png', characterClass:'duelist', characterSex:null, speed:null, bonus:{skills:{dodge:8, reflex:7, punch:5}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[367] = {item_id:367, nshort:'shirt_canvas', name:'Холщовая рубаха', type:'body', level:8, price:425, image:'images/items/body/shirt_canvas.png', image_mini:'images/items/body/mini/shirt_canvas.png', characterClass:'worker', characterSex:null, speed:null, bonus:{skills:{animal:3, dodge:2}, attributes:{strength:2}}, set:{key:null, name:null}, shop:'quest'};\
items[368] = {item_id:368, nshort:'dancer_dress', name:'Платье танцовщицы', type:'body', level:45, price:7500, image:'images/items/body/dancer_dress.png', image_mini:'images/items/body/mini/dancer_dress.png', characterClass:null, characterSex:'female', speed:null, bonus:{skills:{endurance:8, shot:8, finger_dexterity:11, animal:10}, attributes:{charisma:2}}, set:{key:'set_dancer', name:'Туалет танцовщицы'}, shop:'shop'};\
items[369] = {item_id:369, nshort:'indian_jacket', name:'Индейское платье', type:'body', level:55, price:7500, image:'images/items/body/indian_jacket.png', image_mini:'images/items/body/mini/indian_jacket.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{punch:8, hide:9, pitfall:8}, attributes:{dexterity:1, flexibility:2}}, set:{key:'set_indian', name:'Индейский набор'}, shop:'shop'};\
\
items[372] = {item_id:372, nshort:'pilger_dress', name:'Платье монашки', type:'body', level:38, price:2500, image:'images/items/body/pilger_dress.png', image_mini:'images/items/body/mini/pilger_dress.png', characterClass:null, characterSex:'female', speed:null, bonus:{skills:{dodge:10, build:8}, attributes:{strength:2}}, set:{key:'set_pilgrim_female', name:'Монашеский скарб'}, shop:'shop'};\
items[373] = {item_id:373, nshort:'pilger_jacket', name:'Рубаха пастора', type:'body', level:38, price:2500, image:'images/items/body/pilger_jacket.png', image_mini:'images/items/body/mini/pilger_jacket.png', characterClass:null, characterSex:'male', speed:null, bonus:{skills:{hide:10, build:8}, attributes:{dexterity:2}}, set:{key:'set_pilgrim_male', name:'Скарб проповедника'}, shop:'shop'};\
\
items[375] = {item_id:375, nshort:'night_shirt', name:'Ночная рубашка', type:'body', level:45, price:1500, image:'images/items/body/night_shirt.png', image_mini:'images/items/body/mini/night_shirt.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:'set_sleeper', name:'Набор сони'}, shop:'drop'};\
\
\
items[400] = {item_id:400, nshort:'ripped_shoes_grey', name:'Серые стоптанные башмаки', type:'foot', level:1, price:4, image:'images/items/foot/ripped_shoes_grey.png', image_mini:'images/items/foot/mini/ripped_shoes_grey.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{repair:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[401] = {item_id:401, nshort:'ripped_shoes_brown', name:'Коричневые стоптанные башмаки', type:'foot', level:3, price:30, image:'images/items/foot/ripped_shoes_brown.png', image_mini:'images/items/foot/mini/ripped_shoes_brown.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:4, build:4}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[402] = {item_id:402, nshort:'ripped_shoes_black', name:'Чёрные стоптанные башмаки', type:'foot', level:3, price:30, image:'images/items/foot/ripped_shoes_black.png', image_mini:'images/items/foot/mini/ripped_shoes_black.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{repair:4, leadership:4}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[403] = {item_id:403, nshort:'light_grey', name:'Серые матерчатые ботинки', type:'foot', level:5, price:70, image:'images/items/foot/light_grey.png', image_mini:'images/items/foot/mini/light_grey.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{endurance:5}, attributes:{strength:1}}, set:{key:null, name:null}, shop:'shop'};\
items[404] = {item_id:404, nshort:'light_brown', name:'Коричневые матерчатые ботинки', type:'foot', level:9, price:170, image:'images/items/foot/light_brown.png', image_mini:'images/items/foot/mini/light_brown.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{endurance:3, hide:5}, attributes:{strength:1}}, set:{key:null, name:null}, shop:'shop'};\
items[405] = {item_id:405, nshort:'light_black', name:'Чёрные матерчатые ботинки', type:'foot', level:9, price:170, image:'images/items/foot/light_black.png', image_mini:'images/items/foot/mini/light_black.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{endurance:3, trade:5, shot:5}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[406] = {item_id:406, nshort:'light_fine', name:'Знатные матерчатые ботинки', type:'foot', level:11, price:1500, image:'images/items/foot/light_fine.png', image_mini:'images/items/foot/mini/light_fine.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{endurance:4, appearance:6, reflex:6, pitfall:6}, attributes:{strength:1}}, set:{key:null, name:null}, shop:'shop'};\
items[407] = {item_id:407, nshort:'working_grey', name:'Серые рабочие ботинки', type:'foot', level:9, price:660, image:'images/items/foot/working_grey.png', image_mini:'images/items/foot/mini/working_grey.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:12}, attributes:{dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\
items[408] = {item_id:408, nshort:'working_brown', name:'Коричневые рабочие ботинки', type:'foot', level:13, price:1200, image:'images/items/foot/working_brown.png', image_mini:'images/items/foot/mini/working_brown.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:8, endurance:7, ride:7}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[409] = {item_id:409, nshort:'working_black', name:'Чёрные рабочие ботинки', type:'foot', level:13, price:1200, image:'images/items/foot/working_black.png', image_mini:'images/items/foot/mini/working_black.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:10, tactic:7}, attributes:{dexterity:1}}, set:{key:'set_farmer', name:'Набор фермера'}, shop:'shop'};\
items[410] = {item_id:410, nshort:'working_fine', name:'Знатные рабочие ботинки', type:'foot', level:15, price:4300, image:'images/items/foot/working_fine.png', image_mini:'images/items/foot/mini/working_fine.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:11, trade:8, dodge:8, punch:8}, attributes:{dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\
items[411] = {item_id:411, nshort:'spur_grey', name:'Серые ботинки со шпорами', type:'foot', level:14, price:1400, image:'images/items/foot/spur_grey.png', image_mini:'images/items/foot/mini/spur_grey.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:7, shot:7}, attributes:{charisma:1, dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\
items[412] = {item_id:412, nshort:'spur_brown', name:'Коричневые ботинки со шпорами', type:'foot', level:17, price:2450, image:'images/items/foot/spur_brown.png', image_mini:'images/items/foot/mini/spur_brown.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:7, shot:6, reflex:9, tough:9}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[413] = {item_id:413, nshort:'spur_black', name:'Чёрные ботинки со шпорами', type:'foot', level:17, price:2450, image:'images/items/foot/spur_black.png', image_mini:'images/items/foot/mini/spur_black.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:10, shot:9}, attributes:{charisma:1, dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\
items[414] = {item_id:414, nshort:'spur_fine', name:'Знатные ботинки со шпорами', type:'foot', level:20, price:6230, image:'images/items/foot/spur_fine.png', image_mini:'images/items/foot/mini/spur_fine.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:11, shot:10, health:8, swim:8}, attributes:{charisma:1, dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\
items[415] = {item_id:415, nshort:'boots_grey', name:'Серые сапоги', type:'foot', level:16, price:3000, image:'images/items/foot/boots_grey.png', image_mini:'images/items/foot/mini/boots_grey.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:12, shot:12}, attributes:{dexterity:1, charisma:1}}, set:{key:null, name:null}, shop:'shop'};\
items[416] = {item_id:416, nshort:'boots_brown', name:'Коричневые сапоги', type:'foot', level:20, price:5100, image:'images/items/foot/boots_brown.png', image_mini:'images/items/foot/mini/boots_brown.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:10, shot:9, tough:12, dodge:12}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[417] = {item_id:417, nshort:'boots_black', name:'Чёрные сапоги', type:'foot', level:20, price:5100, image:'images/items/foot/boots_black.png', image_mini:'images/items/foot/mini/boots_black.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:12, shot:11}, attributes:{dexterity:2, charisma:2}}, set:{key:null, name:null}, shop:'shop'};\
items[418] = {item_id:418, nshort:'boots_fine', name:'Знатные сапоги', type:'foot', level:22, price:8870, image:'images/items/foot/boots_fine.png', image_mini:'images/items/foot/mini/boots_fine.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:10, shot:9, endurance:8, hide:8}, attributes:{dexterity:2, charisma:2}}, set:{key:null, name:null}, shop:'shop'};\
items[419] = {item_id:419, nshort:'rider_grey', name:'Серые ковбойские сапоги', type:'foot', level:30, price:2600, image:'images/items/foot/rider_grey.png', image_mini:'images/items/foot/mini/rider_grey.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{ride:15, punch:14}, attributes:{flexibility:1, strength:1}}, set:{key:null, name:null}, shop:'shop'};\
items[420] = {item_id:420, nshort:'rider_brown', name:'Коричневые ковбойские сапоги', type:'foot', level:33, price:6200, image:'images/items/foot/rider_brown.png', image_mini:'images/items/foot/mini/rider_brown.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{ride:14, punch:13}, attributes:{flexibility:2, strength:2}}, set:{key:null, name:null}, shop:'shop'};\
items[421] = {item_id:421, nshort:'rider_black', name:'Чёрные ковбойские сапоги', type:'foot', level:33, price:6200, image:'images/items/foot/rider_black.png', image_mini:'images/items/foot/mini/rider_black.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:13, animal:14}, attributes:{dexterity:2, charisma:2}}, set:{key:null, name:null}, shop:'shop'};\
items[422] = {item_id:422, nshort:'rider_fine', name:'Знатные ковбойские сапоги', type:'foot', level:35, price:9500, image:'images/items/foot/rider_fine.png', image_mini:'images/items/foot/mini/rider_fine.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{ride:11, punch:10, appearance:8, aim:8}, attributes:{flexibility:2, strength:2}}, set:{key:null, name:null}, shop:'shop'};\
items[423] = {item_id:423, nshort:'soldier_boots', name:'Солдатские сапоги', type:'foot', level:30, price:5500, image:'images/items/foot/soldier_boots.png', image_mini:'images/items/foot/mini/soldier_boots.png', characterClass:'soldier', characterSex:null, speed:null, bonus:{skills:{tactic:9, ride:12, health:12, tough:10}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
\
items[425] = {item_id:425, nshort:'lace-up_shoes_brown', name:'Коричневые ботинки со шнурками', type:'foot', level:13, price:1290, image:'images/items/foot/lace-up_shoes_brown.png', image_mini:'images/items/foot/mini/lace-up_shoes_brown.png', characterClass:'duelist', characterSex:null, speed:null, bonus:{skills:{appearance:4, shot:4, aim:5}, attributes:{dexterity:2}}, set:{key:null, name:null}, shop:'quest'};\
items[426] = {item_id:426, nshort:'pilgrim_shoes_brown', name:'Коричневые ботинки проповедника', type:'foot', level:15, price:1530, image:'images/items/foot/pilgrim_shoes_brown.png', image_mini:'images/items/foot/mini/pilgrim_shoes_brown.png', characterClass:'worker', characterSex:null, speed:null, bonus:{skills:{repair:6, punch:6, build:4}, attributes:{strength:2}}, set:{key:null, name:null}, shop:'quest'};\
items[427] = {item_id:427, nshort:'gentleman_shoes', name:'Знатные башмаки', type:'foot', level:45, price:5600, image:'images/items/foot/gentleman_shoes.png', image_mini:'images/items/foot/mini/gentleman_shoes.png', characterClass:null, characterSex:'male', speed:null, bonus:{skills:{appearance:8, reflex:9}, attributes:{dexterity:2, strength:2}}, set:{key:'set_gentleman', name:'Джентльменский набор'}, shop:'shop'};\
items[428] = {item_id:428, nshort:'mexican_shoes', name:'Сандалии', type:'foot', level:28, price:2650, image:'images/items/foot/mexican_shoes.png', image_mini:'images/items/foot/mini/mexican_shoes.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:7, aim:6, dodge:8, health:8}, attributes:{}}, set:{key:'set_mexican', name:'Набор мексиканца'}, shop:'shop'};\
items[429] = {item_id:429, nshort:'mokassins', name:'Мокасины', type:'foot', level:45, price:5600, image:'images/items/foot/mokassins.png', image_mini:'images/items/foot/mini/mokassins.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:9, endurance:9, hide:9}, attributes:{flexibility:2}}, set:{key:'set_indian', name:'Индейский набор'}, shop:'shop'};\
\
items[431] = {item_id:431, nshort:'pilger_boots', name:'Монашеские туфли', type:'foot', level:39, price:2600, image:'images/items/foot/pilger_boots.png', image_mini:'images/items/foot/mini/pilger_boots.png', characterClass:null, characterSex:'female', speed:null, bonus:{skills:{build:7, hide:6, finger_dexterity:8, shot:8}, attributes:{}}, set:{key:'set_pilgrim_female', name:'Монашеский скарб'}, shop:'shop'};\
items[432] = {item_id:432, nshort:'pilger_shoes', name:'Туфли монаха', type:'foot', level:39, price:2600, image:'images/items/foot/pilger_shoes.png', image_mini:'images/items/foot/mini/pilger_shoes.png', characterClass:null, characterSex:'male', speed:null, bonus:{skills:{build:7, tough:6, leadership:8, reflex:8}, attributes:{}}, set:{key:'set_pilgrim_male', name:'Скарб проповедника'}, shop:'shop'};\
items[433] = {item_id:433, nshort:'dancer_boots', name:'Сапожки на каблуках', type:'foot', level:41, price:4000, image:'images/items/foot/dancer_boots.png', image_mini:'images/items/foot/mini/dancer_boots.png', characterClass:null, characterSex:'female', speed:null, bonus:{skills:{repair:8, aim:9}, attributes:{charisma:1, dexterity:2}}, set:{key:'set_dancer', name:'Туалет танцовщицы'}, shop:'shop'};\
\
items[435] = {item_id:435, nshort:'quackery_shoes', name:'Знахарские башмаки', type:'foot', level:45, price:5600, image:'images/items/foot/quackery_shoes.png', image_mini:'images/items/foot/mini/quackery_shoes.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:9, swim:9, ride:9}, attributes:{flexibility:2}}, set:{key:'set_quackery', name:'Знахарская утварь'}, shop:'shop'};\
\
items[500] = {item_id:500, nshort:'neckband_grey', name:'Серый шарф', type:'neck', level:null, price:10, image:'images/items/neck/neckband_grey.png', image_mini:'images/items/neck/neckband_grey.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[501] = {item_id:501, nshort:'neckband_red', name:'Красный шарф', type:'neck', level:null, price:14, image:'images/items/neck/neckband_red.png', image_mini:'images/items/neck/neckband_red.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:2, build:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[502] = {item_id:502, nshort:'neckband_green', name:'Зелёный шарф', type:'neck', level:null, price:14, image:'images/items/neck/neckband_green.png', image_mini:'images/items/neck/neckband_green.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:3}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[503] = {item_id:503, nshort:'neckband_blue', name:'Синий шарф', type:'neck', level:null, price:14, image:'images/items/neck/neckband_blue.png', image_mini:'images/items/neck/neckband_blue.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:2, aim:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[504] = {item_id:504, nshort:'neckband_yellow', name:'Жёлтый шарф', type:'neck', level:null, price:14, image:'images/items/neck/neckband_yellow.png', image_mini:'images/items/neck/neckband_yellow.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:2, appearance:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[505] = {item_id:505, nshort:'neckband_brown', name:'Коричневый шарф', type:'neck', level:null, price:20, image:'images/items/neck/neckband_brown.png', image_mini:'images/items/neck/neckband_brown.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:3, health:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[506] = {item_id:506, nshort:'neckband_black', name:'Чёрный шарф', type:'neck', level:null, price:20, image:'images/items/neck/neckband_black.png', image_mini:'images/items/neck/neckband_black.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:2, tactic:1, shot:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[507] = {item_id:507, nshort:'indian_chain_grey', name:'Серое индейское ожерелье', type:'neck', level:null, price:35, image:'images/items/neck/indian_chain_grey.png', image_mini:'images/items/neck/indian_chain_grey.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:5}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[508] = {item_id:508, nshort:'indian_chain_red', name:'Красное индейское ожерелье', type:'neck', level:null, price:75, image:'images/items/neck/indian_chain_red.png', image_mini:'images/items/neck/indian_chain_red.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:5, endurance:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[509] = {item_id:509, nshort:'indian_chain_green', name:'Зелёное индейское ожерелье', type:'neck', level:null, price:75, image:'images/items/neck/indian_chain_green.png', image_mini:'images/items/neck/indian_chain_green.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:5, ride:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[510] = {item_id:510, nshort:'indian_chain_blue', name:'Синее индейское ожерелье', type:'neck', level:null, price:75, image:'images/items/neck/indian_chain_blue.png', image_mini:'images/items/neck/indian_chain_blue.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:5, finger_dexterity:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[511] = {item_id:511, nshort:'indian_chain_yellow', name:'Жёлтое индейское ожерелье', type:'neck', level:null, price:75, image:'images/items/neck/indian_chain_yellow.png', image_mini:'images/items/neck/indian_chain_yellow.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:7}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[512] = {item_id:512, nshort:'indian_chain_fine', name:'Золотое индейское ожерелье', type:'neck', level:null, price:660, image:'images/items/neck/indian_chain_fine.png', image_mini:'images/items/neck/indian_chain_fine.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:8, hide:4, punch:4, pitfall:3}, attributes:{}}, set:{key:'set_indian', name:'Индейский набор'}, shop:'shop'};\
items[513] = {item_id:513, nshort:'loop_grey', name:'Серая повязка', type:'neck', level:null, price:125, image:'images/items/neck/loop_grey.png', image_mini:'images/items/neck/loop_grey.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{shot:9}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[514] = {item_id:514, nshort:'loop_red', name:'Красная повязка', type:'neck', level:null, price:240, image:'images/items/neck/loop_red.png', image_mini:'images/items/neck/loop_red.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{shot:8, health:4}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[515] = {item_id:515, nshort:'loop_green', name:'Зелёная повязка', type:'neck', level:null, price:240, image:'images/items/neck/loop_green.png', image_mini:'images/items/neck/loop_green.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{shot:8, swim:4}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[516] = {item_id:516, nshort:'loop_blue', name:'Синяя повязка', type:'neck', level:null, price:240, image:'images/items/neck/loop_blue.png', image_mini:'images/items/neck/loop_blue.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{shot:12}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[517] = {item_id:517, nshort:'loop_yellow', name:'Жёлтая повязка', type:'neck', level:null, price:240, image:'images/items/neck/loop_yellow.png', image_mini:'images/items/neck/loop_yellow.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{shot:8, trade:4}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[518] = {item_id:518, nshort:'loop_brown', name:'Коричневая повязка', type:'neck', level:null, price:385, image:'images/items/neck/loop_brown.png', image_mini:'images/items/neck/loop_brown.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{shot:8, dodge:4, endurance:3}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[519] = {item_id:519, nshort:'loop_black', name:'Чёрная повязка', type:'neck', level:null, price:385, image:'images/items/neck/loop_black.png', image_mini:'images/items/neck/loop_black.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{shot:11, appearance:3}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[520] = {item_id:520, nshort:'fly_grey', name:'Серая бабочка', type:'neck', level:null, price:282, image:'images/items/neck/fly_grey.png', image_mini:'images/items/neck/fly_grey.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{build:13}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[521] = {item_id:521, nshort:'fly_red', name:'Красная бабочка', type:'neck', level:null, price:446, image:'images/items/neck/fly_red.png', image_mini:'images/items/neck/fly_red.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{build:11}, attributes:{strength:1}}, set:{key:null, name:null}, shop:'shop'};\
items[522] = {item_id:522, nshort:'fly_green', name:'Зелёная бабочка', type:'neck', level:null, price:446, image:'images/items/neck/fly_green.png', image_mini:'images/items/neck/fly_green.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{build:11, ride:6}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[523] = {item_id:523, nshort:'fly_blue', name:'Синяя бабочка', type:'neck', level:null, price:446, image:'images/items/neck/fly_blue.png', image_mini:'images/items/neck/fly_blue.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{build:11, aim:6}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[524] = {item_id:524, nshort:'fly_yellow', name:'Жёлтая бабочка', type:'neck', level:null, price:446, image:'images/items/neck/fly_yellow.png', image_mini:'images/items/neck/fly_yellow.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{build:11, animal:6}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[525] = {item_id:525, nshort:'fly_brown', name:'Коричневая бабочка', type:'neck', level:null, price:650, image:'images/items/neck/fly_brown.png', image_mini:'images/items/neck/fly_brown.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{build:10, hide:4}, attributes:{strength:1}}, set:{key:null, name:null}, shop:'shop'};\
items[526] = {item_id:526, nshort:'fly_black', name:'Чёрная бабочка', type:'neck', level:null, price:650, image:'images/items/neck/fly_black.png', image_mini:'images/items/neck/fly_black.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{build:11, trade:4, pitfall:4}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[527] = {item_id:527, nshort:'fly_fine', name:'Знатная бабочка', type:'neck', level:null, price:2200, image:'images/items/neck/fly_fine.png', image_mini:'images/items/neck/fly_fine.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{build:11, repair:6, dodge:6, tactic:5}, attributes:{strength:1}}, set:{key:'set_quackery', name:'Знахарская утварь'}, shop:'shop'};\
items[528] = {item_id:528, nshort:'cross_bronze', name:'Железный крест', type:'neck', level:null, price:730, image:'images/items/neck/cross_bronze.png', image_mini:'images/items/neck/cross_bronze.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{strength:1, flexibility:1, dexterity:1, charisma:1}}, set:{key:'set_pilgrim_female', name:'Монашеский скарб'}, shop:'shop'};\
items[529] = {item_id:529, nshort:'cross_silver', name:'Серебряный крест', type:'neck', level:null, price:1200, image:'images/items/neck/cross_silver.png', image_mini:'images/items/neck/cross_silver.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{strength:1, flexibility:2, dexterity:1, charisma:1}}, set:{key:'set_pilgrim_male', name:'Скарб проповедника'}, shop:'shop'};\
items[530] = {item_id:530, nshort:'cross_gold', name:'Золотой крест', type:'neck', level:null, price:3400, image:'images/items/neck/cross_gold.png', image_mini:'images/items/neck/cross_gold.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{strength:2, flexibility:2, dexterity:2, charisma:2}}, set:{key:null, name:null}, shop:'shop'};\
items[531] = {item_id:531, nshort:'cravat_grey', name:'Серый галстук', type:'neck', level:null, price:820, image:'images/items/neck/cravat_grey.png', image_mini:'images/items/neck/cravat_grey.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:11, health:10}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[532] = {item_id:532, nshort:'cravat_red', name:'Красный галстук', type:'neck', level:null, price:1205, image:'images/items/neck/cravat_red.png', image_mini:'images/items/neck/cravat_red.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:8, health:7}, attributes:{strength:2}}, set:{key:null, name:null}, shop:'shop'};\
items[533] = {item_id:533, nshort:'cravat_green', name:'Зелёный галстук', type:'neck', level:null, price:1205, image:'images/items/neck/cravat_green.png', image_mini:'images/items/neck/cravat_green.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:8, health:8, reflex:9}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[534] = {item_id:534, nshort:'cravat_blue', name:'Синий галстук', type:'neck', level:null, price:1205, image:'images/items/neck/cravat_blue.png', image_mini:'images/items/neck/cravat_blue.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:8, health:8, shot:9}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[535] = {item_id:535, nshort:'cravat_yellow', name:'Жёлтый галстук', type:'neck', level:null, price:1205, image:'images/items/neck/cravat_yellow.png', image_mini:'images/items/neck/cravat_yellow.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:7, health:8}, attributes:{charisma:2}}, set:{key:null, name:null}, shop:'shop'};\
items[536] = {item_id:536, nshort:'cravat_brown', name:'Коричневый галстук', type:'neck', level:null, price:1500, image:'images/items/neck/cravat_brown.png', image_mini:'images/items/neck/cravat_brown.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:8, health:9, dodge:6}, attributes:{strength:1}}, set:{key:null, name:null}, shop:'shop'};\
items[537] = {item_id:537, nshort:'cravat_black', name:'Чёрный галстук', type:'neck', level:null, price:1500, image:'images/items/neck/cravat_black.png', image_mini:'images/items/neck/cravat_black.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:9, health:8, finger_dexterity:6}, attributes:{charisma:1}}, set:{key:'set_gentleman', name:'Джентльменский набор'}, shop:'shop'};\
items[538] = {item_id:538, nshort:'cravat_fine', name:'Знатный галстук', type:'neck', level:null, price:4400, image:'images/items/neck/cravat_fine.png', image_mini:'images/items/neck/cravat_fine.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:10, health:10, swim:8, pitfall:7}, attributes:{strength:1, charisma:1}}, set:{key:null, name:null}, shop:'shop'};\
items[539] = {item_id:539, nshort:'bullet_metal', name:'Свинцовая пуля', type:'neck', level:null, price:1800, image:'images/items/neck/bullet_metal.png', image_mini:'images/items/neck/bullet_metal.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{strength:2, flexibility:2, dexterity:1, charisma:1}}, set:{key:null, name:null}, shop:'shop'};\
items[540] = {item_id:540, nshort:'bullet_silver', name:'Серебряная пуля', type:'neck', level:null, price:3350, image:'images/items/neck/bullet_silver.png', image_mini:'images/items/neck/bullet_silver.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{strength:2, flexibility:2, dexterity:2, charisma:2}}, set:{key:null, name:null}, shop:'shop'};\
items[541] = {item_id:541, nshort:'bullet_gold', name:'Золотая пуля', type:'neck', level:null, price:6750, image:'images/items/neck/bullet_gold.png', image_mini:'images/items/neck/bullet_gold.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{strength:3, flexibility:3, dexterity:3, charisma:2}}, set:{key:null, name:null}, shop:'shop'};\
items[542] = {item_id:542, nshort:'kerchief_grey', name:'Серый платок', type:'neck', level:null, price:2500, image:'images/items/neck/kerchief_grey.png', image_mini:'images/items/neck/kerchief_grey.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{finger_dexterity:13, appearance:12}, attributes:{dexterity:1, charisma:1}}, set:{key:null, name:null}, shop:'shop'};\
items[543] = {item_id:543, nshort:'kerchief_red', name:'Красный платок', type:'neck', level:null, price:3400, image:'images/items/neck/kerchief_red.png', image_mini:'images/items/neck/kerchief_red.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{finger_dexterity:13, appearance:13, build:14}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[544] = {item_id:544, nshort:'kerchief_green', name:'Зелёный платок', type:'neck', level:null, price:3400, image:'images/items/neck/kerchief_green.png', image_mini:'images/items/neck/kerchief_green.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{finger_dexterity:13, appearance:13, ride:14}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[545] = {item_id:545, nshort:'kerchief_blue', name:'Синий платок', type:'neck', level:null, price:3400, image:'images/items/neck/kerchief_blue.png', image_mini:'images/items/neck/kerchief_blue.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{finger_dexterity:12, appearance:13}, attributes:{dexterity:3}}, set:{key:null, name:null}, shop:'shop'};\
items[546] = {item_id:546, nshort:'kerchief_yellow', name:'Жёлтый платок', type:'neck', level:null, price:3400, image:'images/items/neck/kerchief_yellow.png', image_mini:'images/items/neck/kerchief_yellow.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{finger_dexterity:13, appearance:12}, attributes:{charisma:3}}, set:{key:null, name:null}, shop:'shop'};\
items[547] = {item_id:547, nshort:'kerchief_brown', name:'Коричневый платок', type:'neck', level:null, price:4360, image:'images/items/neck/kerchief_brown.png', image_mini:'images/items/neck/kerchief_brown.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{finger_dexterity:13, appearance:13, punch:10, hide:9}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[548] = {item_id:548, nshort:'kerchief_black', name:'Чёрный платок', type:'neck', level:null, price:4360, image:'images/items/neck/kerchief_black.png', image_mini:'images/items/neck/kerchief_black.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{finger_dexterity:13, appearance:12}, attributes:{dexterity:2, charisma:2}}, set:{key:null, name:null}, shop:'shop'};\
items[549] = {item_id:549, nshort:'bullchain_metal', name:'Железный бизон', type:'neck', level:null, price:2400, image:'images/items/neck/bullchain_metal.png', image_mini:'images/items/neck/bullchain_metal.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{strength:2, flexibility:2, dexterity:2, charisma:1}}, set:{key:null, name:null}, shop:'shop'};\
items[550] = {item_id:550, nshort:'bullchain_silver', name:'Серебряный бизон', type:'neck', level:null, price:4490, image:'images/items/neck/bullchain_silver.png', image_mini:'images/items/neck/bullchain_silver.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{strength:2, flexibility:2, dexterity:2, charisma:3}}, set:{key:null, name:null}, shop:'shop'};\
items[551] = {item_id:551, nshort:'bullchain_gold', name:'Золотой бизон', type:'neck', level:null, price:8300, image:'images/items/neck/bullchain_gold.png', image_mini:'images/items/neck/bullchain_gold.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{strength:3, flexibility:3, dexterity:3, charisma:3}}, set:{key:null, name:null}, shop:'shop'};\
items[552] = {item_id:552, nshort:'talisman', name:'Талисман', type:'neck', level:null, price:1000, image:'images/items/neck/talisman.png', image_mini:'images/items/neck/talisman.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'unk'};\
items[553] = {item_id:553, nshort:'stonechain', name:'Каменный медальон', type:'neck', level:null, price:1000, image:'images/items/neck/stonechain.png', image_mini:'images/items/neck/stonechain.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[554] = {item_id:554, nshort:'southcross', name:'Медаль за мужество', type:'neck', level:null, price:650, image:'images/items/neck/southcross.png', image_mini:'images/items/neck/southcross.png', characterClass:'soldier', characterSex:null, speed:null, bonus:{skills:{tactic:8, appearance:7, ride:4}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[555] = {item_id:555, nshort:'aztecchains', name:'Ожерелье ацтеков', type:'neck', level:null, price:1200, image:'images/items/neck/aztecchains.png', image_mini:'images/items/neck/aztecchains.png', characterClass:'adventurer', characterSex:null, speed:null, bonus:{skills:{hide:9, ride:10, tough:8}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[556] = {item_id:556, nshort:'arrowhead', name:'Наконечник стрелы', type:'neck', level:null, price:1150, image:'images/items/neck/arrowhead.png', image_mini:'images/items/neck/arrowhead.png', characterClass:'duelist', characterSex:null, speed:null, bonus:{skills:{shot:7, aim:7}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[557] = {item_id:557, nshort:'bone_necklace', name:'Костяное ожерелье', type:'neck', level:null, price:1700, image:'images/items/neck/bone_necklace.png', image_mini:'images/items/neck/bone_necklace.png', characterClass:'worker', characterSex:null, speed:null, bonus:{skills:{appearance:3}, attributes:{strength:5}}, set:{key:null, name:null}, shop:'quest'};\
\
items[561] = {item_id:561, nshort:'mexican_neck', name:'Мексиканский шарф', type:'neck', level:28, price:600, image:'images/items/neck/mexican_neck.png', image_mini:'images/items/neck/mexican_neck.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{punch:17}, attributes:{}}, set:{key:'set_mexican', name:'Набор мексиканца'}, shop:'shop'};\
items[566] = {item_id:566, nshort:'dancer_chain', name:'Жемчужное ожерелье', type:'neck', level:43, price:1800, image:'images/items/neck/dancer_chain.png', image_mini:'images/items/neck/dancer_chain.png', characterClass:null, characterSex:'female', speed:null, bonus:{skills:{trade:9, leadership:8, pitfall:6}, attributes:{charisma:1}}, set:{key:'set_dancer', name:'Туалет танцовщицы'}, shop:'drop'};\
items[567] = {item_id:567, nshort:'amulett', name:'Сердечный амулет', type:'neck', level:30, price:2412, image:'images/items/neck/amulett.png', image_mini:'images/items/neck/amulett.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:15, animal:15, trade:15, leadership:15}, attributes:{}}, set:{key:'season_set', name:'Праздничный наряд'}, shop:'quest'};\
items[568] = {item_id:568, nshort:'teethchain', name:'Талисман от вурдалака', type:'neck', level:40, price:2012, image:'images/items/neck/teethchain.png', image_mini:'images/items/neck/teethchain.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:4, leadership:8, hide:4}, attributes:{charisma:3}}, set:{key:null, name:null}, shop:'quest'};\
\
\
items[600] = {item_id:600, nshort:'donkey', name:'Осёл', type:'animal', level:1, price:250, image:'images/items/animal/donkey.png', image_mini:'images/items/animal/mini/donkey.png', characterClass:null, characterSex:null, speed:0.8, bonus:{skills:{}, attributes:{}}, set:{key:'set_mexican', name:'Набор мексиканца'}, shop:'shop'};\
items[601] = {item_id:601, nshort:'pony', name:'Пони', type:'animal', level:1, price:500, image:'images/items/animal/pony.png', image_mini:'images/items/animal/mini/pony.png', characterClass:null, characterSex:null, speed:0.666, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[602] = {item_id:602, nshort:'mustang', name:'Мустанг', type:'animal', level:1, price:850, image:'images/items/animal/mustang.png', image_mini:'images/items/animal/mini/mustang.png', characterClass:null, characterSex:null, speed:0.571, bonus:{skills:{}, attributes:{}}, set:{key:'set_indian', name:'Индейский набор'}, shop:'shop'};\
items[603] = {item_id:603, nshort:'berber', name:'Рысак', type:'animal', level:1, price:1250, image:'images/items/animal/berber.png', image_mini:'images/items/animal/mini/berber.png', characterClass:null, characterSex:null, speed:0.5, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[604] = {item_id:604, nshort:'araber', name:'Арабский скакун', type:'animal', level:1, price:2000, image:'images/items/animal/araber.png', image_mini:'images/items/animal/mini/araber.png', characterClass:null, characterSex:null, speed:0.444, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[605] = {item_id:605, nshort:'quarter', name:'Кватерхорс', type:'animal', level:1, price:2800, image:'images/items/animal/quarter.png', image_mini:'images/items/animal/mini/quarter.png', characterClass:null, characterSex:null, speed:0.4, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
\
\
items[700] = {item_id:700, nshort:'ham', name:'Свинина', type:'yield', level:null, price:10, image:'images/items/yield/ham.png', image_mini:'images/items/yield/ham.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[701] = {item_id:701, nshort:'cereals', name:'Зерно', type:'yield', level:null, price:3, image:'images/items/yield/cereals.png', image_mini:'images/items/yield/cereals.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[702] = {item_id:702, nshort:'tabacco', name:'Табак', type:'yield', level:null, price:5, image:'images/items/yield/tabacco.png', image_mini:'images/items/yield/tabacco.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[703] = {item_id:703, nshort:'sugar', name:'Сахар', type:'yield', level:null, price:8, image:'images/items/yield/sugar.png', image_mini:'images/items/yield/sugar.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[704] = {item_id:704, nshort:'cotton', name:'Хлопок', type:'yield', level:null, price:6, image:'images/items/yield/cotton.png', image_mini:'images/items/yield/cotton.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[705] = {item_id:705, nshort:'trout', name:'Форель', type:'yield', level:null, price:4, image:'images/items/yield/trout.png', image_mini:'images/items/yield/trout.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[706] = {item_id:706, nshort:'berrys', name:'Ягоды', type:'yield', level:null, price:4, image:'images/items/yield/berrys.png', image_mini:'images/items/yield/berrys.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[707] = {item_id:707, nshort:'shearings', name:'Шерсть', type:'yield', level:null, price:8, image:'images/items/yield/shearings.png', image_mini:'images/items/yield/shearings.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[708] = {item_id:708, nshort:'copper_pyrites', name:'Пирит', type:'yield', level:null, price:16, image:'images/items/yield/copper_pyrites.png', image_mini:'images/items/yield/copper_pyrites.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[709] = {item_id:709, nshort:'turkey', name:'Индейка', type:'yield', level:null, price:14, image:'images/items/yield/turkey.png', image_mini:'images/items/yield/turkey.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[710] = {item_id:710, nshort:'beef', name:'Говяжий бифштекс', type:'yield', level:null, price:24, image:'images/items/yield/beef.png', image_mini:'images/items/yield/beef.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[711] = {item_id:711, nshort:'planks', name:'Дерево', type:'yield', level:null, price:16, image:'images/items/yield/planks.png', image_mini:'images/items/yield/planks.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[712] = {item_id:712, nshort:'leather', name:'Кожа', type:'yield', level:null, price:16, image:'images/items/yield/leather.png', image_mini:'images/items/yield/leather.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
\
items[714] = {item_id:714, nshort:'beaver', name:'Бобровый мех', type:'yield', level:null, price:36, image:'images/items/yield/beaver.png', image_mini:'images/items/yield/beaver.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[715] = {item_id:715, nshort:'fabric', name:'Рулон сукна', type:'yield', level:null, price:22, image:'images/items/yield/fabric.png', image_mini:'images/items/yield/fabric.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[716] = {item_id:716, nshort:'stone', name:'Камни', type:'yield', level:null, price:10, image:'images/items/yield/stone.png', image_mini:'images/items/yield/stone.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[717] = {item_id:717, nshort:'grund', name:'Лосось', type:'yield', level:null, price:14, image:'images/items/yield/grund.png', image_mini:'images/items/yield/grund.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[718] = {item_id:718, nshort:'coyote', name:'Зуб койота', type:'yield', level:null, price:42, image:'images/items/yield/coyote.png', image_mini:'images/items/yield/coyote.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[719] = {item_id:719, nshort:'cigar', name:'Сигары', type:'yield', level:null, price:24, image:'images/items/yield/cigar.png', image_mini:'images/items/yield/cigar.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[720] = {item_id:720, nshort:'gems', name:'Драгоценные камни', type:'yield', level:null, price:70, image:'images/items/yield/gems.png', image_mini:'images/items/yield/gems.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[721] = {item_id:721, nshort:'coal', name:'Уголь', type:'yield', level:null, price:20, image:'images/items/yield/coal.png', image_mini:'images/items/yield/coal.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[722] = {item_id:722, nshort:'meal', name:'Горячая закуска', type:'yield', level:null, price:14, image:'images/items/yield/meal.png', image_mini:'images/items/yield/meal.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[723] = {item_id:723, nshort:'ring', name:'Кольцо', type:'yield', level:null, price:160, image:'images/items/yield/ring.png', image_mini:'images/items/yield/ring.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:'set_pilgrim_female', name:'Монашеский скарб'}, shop:'drop'};\
items[724] = {item_id:724, nshort:'buffalo', name:'Шкура бизона', type:'yield', level:null, price:40, image:'images/items/yield/buffalo.png', image_mini:'images/items/yield/buffalo.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[725] = {item_id:725, nshort:'silver', name:'Серебро', type:'yield', level:null, price:200, image:'images/items/yield/silver.png', image_mini:'images/items/yield/silver.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[726] = {item_id:726, nshort:'indiangold', name:'Золото ацтеков', type:'yield', level:null, price:290, image:'images/items/yield/indiangold.png', image_mini:'images/items/yield/indiangold.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[727] = {item_id:727, nshort:'medal', name:'Медаль за отвагу', type:'yield', level:null, price:500, image:'images/items/yield/medal.png', image_mini:'images/items/yield/medal.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[728] = {item_id:728, nshort:'watch', name:'Карманные часы', type:'yield', level:null, price:210, image:'images/items/yield/watch.png', image_mini:'images/items/yield/watch.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[729] = {item_id:729, nshort:'stolen_goods', name:'Контрабандный товар', type:'yield', level:null, price:110, image:'images/items/yield/stolen_goods.png', image_mini:'images/items/yield/stolen_goods.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[730] = {item_id:730, nshort:'necklet', name:'Украшения', type:'yield', level:null, price:230, image:'images/items/yield/necklet.png', image_mini:'images/items/yield/necklet.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[731] = {item_id:731, nshort:'grizzly', name:'Трофей', type:'yield', level:null, price:150, image:'images/items/yield/grizzly.png', image_mini:'images/items/yield/grizzly.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
\
items[733] = {item_id:733, nshort:'packet', name:'Пакет', type:'yield', level:null, price:32, image:'images/items/yield/packet.png', image_mini:'images/items/yield/packet.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[734] = {item_id:734, nshort:'slicer', name:'Рубанок', type:'yield', level:null, price:44, image:'images/items/yield/slicer.png', image_mini:'images/items/yield/slicer.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
\
items[736] = {item_id:736, nshort:'spade', name:'Лопата', type:'yield', level:null, price:40, image:'images/items/yield/spade.png', image_mini:'images/items/yield/spade.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[737] = {item_id:737, nshort:'dynamite', name:'Динамит', type:'yield', level:null, price:80, image:'images/items/yield/dynamite.png', image_mini:'images/items/yield/dynamite.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
\
items[739] = {item_id:739, nshort:'fence', name:'Колючая проволока', type:'yield', level:null, price:36, image:'images/items/yield/fence.png', image_mini:'images/items/yield/fence.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[740] = {item_id:740, nshort:'horn', name:'Коровий рог', type:'yield', level:null, price:78, image:'images/items/yield/horn.png', image_mini:'images/items/yield/horn.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[741] = {item_id:741, nshort:'pitcher', name:'Кувшин', type:'yield', level:null, price:24, image:'images/items/yield/pitcher.png', image_mini:'images/items/yield/pitcher.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[742] = {item_id:742, nshort:'saw', name:'Пила', type:'yield', level:null, price:40, image:'images/items/yield/saw.png', image_mini:'images/items/yield/saw.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[743] = {item_id:743, nshort:'poster', name:'Плакат', type:'yield', level:null, price:4, image:'images/items/yield/poster.png', image_mini:'images/items/yield/poster.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[744] = {item_id:744, nshort:'newspaper', name:'Газета', type:'yield', level:null, price:6, image:'images/items/yield/newspaper.png', image_mini:'images/items/yield/newspaper.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[745] = {item_id:745, nshort:'flour', name:'Мука', type:'yield', level:null, price:5, image:'images/items/yield/flour.png', image_mini:'images/items/yield/flour.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[746] = {item_id:746, nshort:'beans', name:'Фасоль', type:'yield', level:null, price:6, image:'images/items/yield/beans.png', image_mini:'images/items/yield/beans.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[747] = {item_id:747, nshort:'hammer', name:'Молоток', type:'yield', level:null, price:22, image:'images/items/yield/hammer.png', image_mini:'images/items/yield/hammer.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[748] = {item_id:748, nshort:'corn', name:'Кукуруза', type:'yield', level:null, price:4, image:'images/items/yield/corn.png', image_mini:'images/items/yield/corn.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[749] = {item_id:749, nshort:'rope', name:'Лассо', type:'yield', level:null, price:32, image:'images/items/yield/rope.png', image_mini:'images/items/yield/rope.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[750] = {item_id:750, nshort:'nippers', name:'Наручники', type:'yield', level:null, price:58, image:'images/items/yield/nippers.png', image_mini:'images/items/yield/nippers.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[751] = {item_id:751, nshort:'pipe', name:'Трубка мира', type:'yield', level:null, price:72, image:'images/items/yield/pipe.png', image_mini:'images/items/yield/pipe.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[752] = {item_id:752, nshort:'oil', name:'Нефть', type:'yield', level:null, price:76, image:'images/items/yield/oil.png', image_mini:'images/items/yield/oil.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[753] = {item_id:753, nshort:'pick', name:'Кирка', type:'yield', level:null, price:44, image:'images/items/yield/pick.png', image_mini:'images/items/yield/pick.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[754] = {item_id:754, nshort:'horseshoe', name:'Подкова', type:'yield', level:null, price:30, image:'images/items/yield/horseshoe.png', image_mini:'images/items/yield/horseshoe.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[755] = {item_id:755, nshort:'flag', name:'Флажок', type:'yield', level:null, price:32, image:'images/items/yield/flag.png', image_mini:'images/items/yield/flag.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[756] = {item_id:756, nshort:'toolbox', name:'Ящик с инструментами', type:'yield', level:null, price:110, image:'images/items/yield/toolbox.png', image_mini:'images/items/yield/toolbox.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[757] = {item_id:757, nshort:'feather', name:'Перо ворона', type:'yield', level:null, price:8, image:'images/items/yield/feather.png', image_mini:'images/items/yield/feather.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[758] = {item_id:758, nshort:'flag_north', name:'Союзный флаг', type:'yield', level:null, price:86, image:'images/items/yield/flag_north.png', image_mini:'images/items/yield/flag_north.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[759] = {item_id:759, nshort:'ticket', name:'Железнодорожный билет', type:'yield', level:null, price:34, image:'images/items/yield/ticket.png', image_mini:'images/items/yield/ticket.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[760] = {item_id:760, nshort:'map', name:'Карта', type:'yield', level:null, price:32, image:'images/items/yield/map.png', image_mini:'images/items/yield/map.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[761] = {item_id:761, nshort:'sledgehammer', name:'Кувалда', type:'yield', level:null, price:52, image:'images/items/yield/sledgehammer.png', image_mini:'images/items/yield/sledgehammer.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[762] = {item_id:762, nshort:'flag_south', name:'Флаг конфедерации', type:'yield', level:null, price:86, image:'images/items/yield/flag_south.png', image_mini:'images/items/yield/flag_south.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[763] = {item_id:763, nshort:'wolf', name:'Браслет из зубов', type:'yield', level:null, price:44, image:'images/items/yield/wolf.png', image_mini:'images/items/yield/wolf.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[764] = {item_id:764, nshort:'shackle', name:'Кандалы', type:'yield', level:null, price:62, image:'images/items/yield/shackle.png', image_mini:'images/items/yield/shackle.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[765] = {item_id:765, nshort:'sickle', name:'Серп', type:'yield', level:null, price:44, image:'images/items/yield/sickle.png', image_mini:'images/items/yield/sickle.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[766] = {item_id:766, nshort:'water', name:'Стакан воды', type:'yield', level:null, price:6, image:'images/items/yield/water.png', image_mini:'images/items/yield/water.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[767] = {item_id:767, nshort:'string', name:'Катушка проволоки', type:'yield', level:null, price:34, image:'images/items/yield/string.png', image_mini:'images/items/yield/string.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[768] = {item_id:768, nshort:'hymnal', name:'Псалтырь', type:'yield', level:null, price:48, image:'images/items/yield/hymnal.png', image_mini:'images/items/yield/hymnal.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:'set_pilgrim_male', name:'Скарб проповедника'}, shop:'drop'};\
items[769] = {item_id:769, nshort:'empty_bottle', name:'Пустая бутылка', type:'yield', level:null, price:2, image:'images/items/yield/empty_bottle.png', image_mini:'images/items/yield/empty_bottle.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[770] = {item_id:770, nshort:'beer', name:'Пиво', type:'yield', level:null, price:0, image:'images/items/yield/beer.png', image_mini:'images/items/yield/beer.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[771] = {item_id:771, nshort:'trap', name:'Капкан на бобра', type:'yield', level:null, price:50, image:'images/items/yield/trap.png', image_mini:'images/items/yield/trap.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[772] = {item_id:772, nshort:'falcon', name:'Золотой сокол', type:'yield', level:null, price:0, image:'images/items/yield/falcon.png', image_mini:'images/items/yield/falcon.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[773] = {item_id:773, nshort:'paper1', name:'Обрывок (I часть)', type:'yield', level:null, price:1400, image:'images/items/yield/paper1.png', image_mini:'images/items/yield/paper1.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[774] = {item_id:774, nshort:'paper2', name:'Обрывок (II часть)', type:'yield', level:null, price:590, image:'images/items/yield/paper2.png', image_mini:'images/items/yield/paper2.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[775] = {item_id:775, nshort:'paper3', name:'Обрывок (III часть)', type:'yield', level:null, price:590, image:'images/items/yield/paper3.png', image_mini:'images/items/yield/paper3.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[776] = {item_id:776, nshort:'kates_ring', name:'Кольцо Кейт', type:'yield', level:null, price:1000, image:'images/items/yield/kates_ring.png', image_mini:'images/items/yield/kates_ring.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
\
items[778] = {item_id:778, nshort:'cooking_pot', name:'Кастрюля', type:'yield', level:null, price:22, image:'images/items/yield/cooking_pot.png', image_mini:'images/items/yield/cooking_pot.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[779] = {item_id:779, nshort:'post_horn', name:'Почтовый рожок', type:'yield', level:null, price:60, image:'images/items/yield/post_horn.png', image_mini:'images/items/yield/post_horn.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[780] = {item_id:780, nshort:'rounds', name:'Патроны', type:'yield', level:null, price:50, image:'images/items/yield/rounds.png', image_mini:'images/items/yield/rounds.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[781] = {item_id:781, nshort:'documents', name:'Документы', type:'yield', level:null, price:120, image:'images/items/yield/documents.png', image_mini:'images/items/yield/documents.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[782] = {item_id:782, nshort:'angle', name:'Удочка', type:'yield', level:null, price:42, image:'images/items/yield/angle.png', image_mini:'images/items/yield/angle.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[783] = {item_id:783, nshort:'gold_sculpture', name:'Золотая статуэтка', type:'yield', level:null, price:144, image:'images/items/yield/gold_sculpture.png', image_mini:'images/items/yield/gold_sculpture.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[784] = {item_id:784, nshort:'nails', name:'Гвозди', type:'yield', level:null, price:8, image:'images/items/yield/nails.png', image_mini:'images/items/yield/nails.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
\
items[786] = {item_id:786, nshort:'picture', name:'Картина', type:'yield', level:null, price:340, image:'images/items/yield/picture.png', image_mini:'images/items/yield/picture.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[787] = {item_id:787, nshort:'saddle', name:'Седло', type:'yield', level:null, price:80, image:'images/items/yield/saddle.png', image_mini:'images/items/yield/saddle.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[788] = {item_id:788, nshort:'bell', name:'Корабельный колокол', type:'yield', level:null, price:130, image:'images/items/yield/bell.png', image_mini:'images/items/yield/bell.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[789] = {item_id:789, nshort:'coin', name:'Монета', type:'yield', level:null, price:2, image:'images/items/yield/coin.png', image_mini:'images/items/yield/coin.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[790] = {item_id:790, nshort:'iron', name:'Железо', type:'yield', level:null, price:36, image:'images/items/yield/iron.png', image_mini:'images/items/yield/iron.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[791] = {item_id:791, nshort:'orange', name:'Апельсины', type:'yield', level:null, price:8, image:'images/items/yield/orange.png', image_mini:'images/items/yield/orange.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[792] = {item_id:792, nshort:'tequila', name:'Текила', type:'yield', level:null, price:24, image:'images/items/yield/tequila.png', image_mini:'images/items/yield/tequila.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:'set_mexican', name:'Набор мексиканца'}, shop:'drop'};\
items[793] = {item_id:793, nshort:'tomato', name:'Помидор', type:'yield', level:null, price:6, image:'images/items/yield/tomato.png', image_mini:'images/items/yield/tomato.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[794] = {item_id:794, nshort:'potion', name:'Эликсир', type:'yield', level:null, price:360, image:'images/items/yield/potion.png', image_mini:'images/items/yield/potion.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:'set_quackery', name:'Знахарская утварь'}, shop:'drop'};\
items[795] = {item_id:795, nshort:'peg', name:'Колышек', type:'yield', level:null, price:15, image:'images/items/yield/peg.png', image_mini:'images/items/yield/peg.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
\
items[797] = {item_id:797, nshort:'pitchfork', name:'Вилы', type:'yield', level:null, price:32, image:'images/items/yield/pitchfork.png', image_mini:'images/items/yield/pitchfork.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:'set_farmer', name:'Набор фермера'}, shop:'drop'};\
\
\
items[800] = {item_id:800, nshort:'stone_pebble', name:'Галька', type:'right_arm', level:2, price:15, image:'images/items/right_arm/stone_pebble.png', image_mini:'images/items/right_arm/mini/stone_pebble.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[801] = {item_id:801, nshort:'stone_flint', name:'Кремень', type:'right_arm', level:5, price:26, image:'images/items/right_arm/stone_flint.png', image_mini:'images/items/right_arm/mini/stone_flint.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[802] = {item_id:802, nshort:'stone_granite', name:'Гранит', type:'right_arm', level:8, price:46, image:'images/items/right_arm/stone_granite.png', image_mini:'images/items/right_arm/mini/stone_granite.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[803] = {item_id:803, nshort:'crutch_rusty', name:'Потрёпанная рогатка', type:'right_arm', level:7, price:26, image:'images/items/right_arm/crutch_rusty.png', image_mini:'images/items/right_arm/mini/crutch_rusty.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[804] = {item_id:804, nshort:'crutch', name:'Рогатка', type:'right_arm', level:10, price:63, image:'images/items/right_arm/crutch.png', image_mini:'images/items/right_arm/mini/crutch.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[805] = {item_id:805, nshort:'crutch_accurate', name:'Точная рогатка', type:'right_arm', level:13, price:148, image:'images/items/right_arm/crutch_accurate.png', image_mini:'images/items/right_arm/mini/crutch_accurate.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[806] = {item_id:806, nshort:'crutch_huckeberry', name:'Рогатка Гека Финна', type:'right_arm', level:20, price:1360, image:'images/items/right_arm/crutch_huckeberry.png', image_mini:'images/items/right_arm/mini/crutch_huckeberry.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:3, ride:3}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[807] = {item_id:807, nshort:'leadshot_rusty', name:'Ржавый кремнёвый пистолет', type:'right_arm', level:17, price:124, image:'images/items/right_arm/leadshot_rusty.png', image_mini:'images/items/right_arm/mini/leadshot_rusty.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[808] = {item_id:808, nshort:'leadshot', name:'Кремнёвый пистолет', type:'right_arm', level:20, price:384, image:'images/items/right_arm/leadshot.png', image_mini:'images/items/right_arm/mini/leadshot.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tough:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[809] = {item_id:809, nshort:'leadshot_accurate', name:'Точный кремнёвый пистолет', type:'right_arm', level:23, price:550, image:'images/items/right_arm/leadshot_accurate.png', image_mini:'images/items/right_arm/mini/leadshot_accurate.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tough:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[810] = {item_id:810, nshort:'leadshot_granmonts', name:'Пистолет Гранмонта', type:'right_arm', level:30, price:2680, image:'images/items/right_arm/leadshot_granmonts.png', image_mini:'images/items/right_arm/mini/leadshot_granmonts.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{finger_dexterity:4, tough:3}, attributes:{}}, set:{key:null, name:null}, drop:'drop'};\
items[811] = {item_id:811, nshort:'muzzleloader_rusty', name:'Ржавое дульнозарядное ружьё', type:'right_arm', level:22, price:326, image:'images/items/right_arm/muzzleloader_rusty.png', image_mini:'images/items/right_arm/mini/muzzleloader_rusty.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{aim:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[812] = {item_id:812, nshort:'muzzleloader', name:'Дульнозарядное ружьё', type:'right_arm', level:25, price:545, image:'images/items/right_arm/muzzleloader.png', image_mini:'images/items/right_arm/mini/muzzleloader.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{aim:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[813] = {item_id:813, nshort:'muzzleloader_accurate', name:'Точное дульнозарядное ружьё', type:'right_arm', level:28, price:940, image:'images/items/right_arm/muzzleloader_accurate.png', image_mini:'images/items/right_arm/mini/muzzleloader_accurate.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{aim:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[814] = {item_id:814, nshort:'muzzleloader_drake', name:'Дульнозарядное ружьё Дрейка', type:'right_arm', level:35, price:3580, image:'images/items/right_arm/muzzleloader_drake.png', image_mini:'images/items/right_arm/mini/muzzleloader_drake.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{aim:4, swim:4}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[815] = {item_id:815, nshort:'deringer_rusty', name:'Ржавый дерринджер', type:'right_arm', level:32, price:730, image:'images/items/right_arm/deringer_rusty.png', image_mini:'images/items/right_arm/mini/deringer_rusty.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{reflex:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[816] = {item_id:816, nshort:'deringer', name:'Дерринджер', type:'right_arm', level:35, price:1280, image:'images/items/right_arm/deringer.png', image_mini:'images/items/right_arm/mini/deringer.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{reflex:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[817] = {item_id:817, nshort:'deringer_accurate', name:'Точный дерринджер', type:'right_arm', level:38, price:1655, image:'images/items/right_arm/deringer_accurate.png', image_mini:'images/items/right_arm/mini/deringer_accurate.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{reflex:3}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
\
items[819] = {item_id:819, nshort:'pepperbox_rusty', name:'Ржавый многоствольный револьвер', type:'right_arm', level:37, price:940, image:'images/items/right_arm/pepperbox_rusty.png', image_mini:'images/items/right_arm/mini/pepperbox_rusty.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{dodge:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[820] = {item_id:820, nshort:'pepperbox', name:'Многоствольный револьвер', type:'right_arm', level:40, price:1440, image:'images/items/right_arm/pepperbox.png', image_mini:'images/items/right_arm/mini/pepperbox.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{dodge:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[821] = {item_id:821, nshort:'pepperbox_accurate', name:'Точный многоствольный револьвер', type:'right_arm', level:43, price:2150, image:'images/items/right_arm/pepperbox_accurate.png', image_mini:'images/items/right_arm/mini/pepperbox_accurate.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{dodge:3}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
\
items[823] = {item_id:823, nshort:'smith_rusty', name:'Ржавый Смит-Вессон №1', type:'right_arm', level:47, price:1650, image:'images/items/right_arm/smith_rusty.png', image_mini:'images/items/right_arm/mini/smith_rusty.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{shot:3}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[824] = {item_id:824, nshort:'smith', name:'Смит-Вессон №1', type:'right_arm', level:50, price:2350, image:'images/items/right_arm/smith.png', image_mini:'images/items/right_arm/mini/smith.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{shot:3}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[825] = {item_id:825, nshort:'smith_accurate', name:'Точный Смит-Вессон №1', type:'right_arm', level:53, price:3180, image:'images/items/right_arm/smith_accurate.png', image_mini:'images/items/right_arm/mini/smith_accurate.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{shot:4}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
\
items[827] = {item_id:827, nshort:'remington_rusty', name:'Ржавый армейский револьвер', type:'right_arm', level:52, price:2150, image:'images/items/right_arm/remington_rusty.png', image_mini:'images/items/right_arm/mini/remington_rusty.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tough:3}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[828] = {item_id:828, nshort:'remington', name:'Армейский револьвер', type:'right_arm', level:55, price:2950, image:'images/items/right_arm/remington.png', image_mini:'images/items/right_arm/mini/remington.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tough:4}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[829] = {item_id:829, nshort:'remington_accurate', name:'Точный армейский револьвер', type:'right_arm', level:58, price:3940, image:'images/items/right_arm/remington_accurate.png', image_mini:'images/items/right_arm/mini/remington_accurate.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tough:5}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
\
items[831] = {item_id:831, nshort:'peacemaker_rusty', name:'Ржавый кольт Миротворец', type:'right_arm', level:62, price:3380, image:'images/items/right_arm/peacemaker_rusty.png', image_mini:'images/items/right_arm/mini/peacemaker_rusty.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:4}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[832] = {item_id:832, nshort:'peacemaker', name:'Кольт Миротворец', type:'right_arm', level:65, price:4570, image:'images/items/right_arm/peacemaker.png', image_mini:'images/items/right_arm/mini/peacemaker.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:5}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[833] = {item_id:833, nshort:'peacemaker_accurate', name:'Точный кольт Миротворец', type:'right_arm', level:68, price:5400, image:'images/items/right_arm/peacemaker_accurate.png', image_mini:'images/items/right_arm/mini/peacemaker_accurate.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:6}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
\
items[835] = {item_id:835, nshort:'schofield_rusty', name:'Ржавый Скофилд', type:'right_arm', level:67, price:4250, image:'images/items/right_arm/schofield_rusty.png', image_mini:'images/items/right_arm/mini/schofield_rusty.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:5}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[836] = {item_id:836, nshort:'schofield', name:'Скофилд', type:'right_arm', level:70, price:5230, image:'images/items/right_arm/schofield.png', image_mini:'images/items/right_arm/mini/schofield.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:6}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[837] = {item_id:837, nshort:'schofield_accurate', name:'Точный Скофилд', type:'right_arm', level:73, price:6400, image:'images/items/right_arm/schofield_accurate.png', image_mini:'images/items/right_arm/mini/schofield_accurate.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:7}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
\
items[839] = {item_id:839, nshort:'buntline_rusty', name:'Ржавый Бантлайн', type:'right_arm', level:72, price:5375, image:'images/items/right_arm/buntline_rusty.png', image_mini:'images/items/right_arm/mini/buntline_rusty.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{reflex:7}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[840] = {item_id:840, nshort:'buntline', name:'Бантлайн', type:'right_arm', level:75, price:6250, image:'images/items/right_arm/buntline.png', image_mini:'images/items/right_arm/mini/buntline.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{reflex:7}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[841] = {item_id:841, nshort:'buntline_accurate', name:'Точный Бантлайн', type:'right_arm', level:78, price:7250, image:'images/items/right_arm/buntline_accurate.png', image_mini:'images/items/right_arm/mini/buntline_accurate.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{reflex:7}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
\
items[843] = {item_id:843, nshort:'boomerang', name:'Бумеранг', type:'right_arm', level:8, price:126, image:'images/items/right_arm/boomerang.png', image_mini:'images/items/right_arm/mini/boomerang.png', characterClass:'duelist', characterSex:null, speed:null, bonus:{skills:{reflex:1}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[844] = {item_id:844, nshort:'throwing_knives', name:'Метательные ножи', type:'right_arm', level:33, price:1152, image:'images/items/right_arm/throwing_knives.png', image_mini:'images/items/right_arm/mini/throwing_knives.png', characterClass:'duelist', characterSex:null, speed:null, bonus:{skills:{hide:3}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[845] = {item_id:845, nshort:'sawed_off', name:'Обрез', type:'right_arm', level:51, price:2940, image:'images/items/right_arm/sawed_off.png', image_mini:'images/items/right_arm/mini/sawed_off.png', characterClass:'duelist', characterSex:null, speed:null, bonus:{skills:{appearance:3, shot:2}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[846] = {item_id:846, nshort:'trompet', name:'Труба', type:'right_arm', level:20, price:1200, image:'images/items/right_arm/trompet.png', image_mini:'images/items/right_arm/mini/trompet.png', characterClass:'soldier', characterSex:null, speed:null, bonus:{skills:{}, attributes:{charisma:6}}, set:{key:null, name:null}, shop:'quest'};\
\
items[854] = {item_id:854, nshort:'elixier', name:'Кислота', type:'right_arm', level:42, price:1500, image:'images/items/right_arm/elixier.png', image_mini:'images/items/right_arm/mini/elixier.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:2}, attributes:{}}, set:{key:'set_quackery', name:'Знахарская утварь'}, shop:'shop'};\
\
\
items[1364] = {item_id:1364, nshort:'uniform_perfect', name:'Форма', type:'body', level:20, price:800, image:'images/items/body/uniform_perfect.png', image_mini:'images/items/body/mini/uniform_perfect.png', characterClass:'soldier', characterSex:null, speed:null, bonus:{skills:{appearance:3, hide:4}, attributes:{charisma:2}}, set:{key:null, name:null}, shop:'quest'};\
items[1702] = {item_id:1702, nshort:'compass', name:'Компас', type:'yield', level:null, price:380, image:'images/items/yield/compass.png', image_mini:'images/items/yield/compass.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{ride:3}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1703] = {item_id:1703, nshort:'lamp', name:'Лампа', type:'yield', level:null, price:80, image:'images/items/yield/lamp.png', image_mini:'images/items/yield/lamp.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1706] = {item_id:1706, nshort:'letter', name:'Письмо', type:'yield', level:null, price:1, image:'images/items/yield/letter.png', image_mini:'images/items/yield/letter.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1708] = {item_id:1708, nshort:'whiskey', name:'Виски', type:'yield', level:null, price:10, image:'images/items/yield/whiskey.png', image_mini:'images/items/yield/whiskey.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[1709] = {item_id:1709, nshort:'gold', name:'Сокровища индейцев', type:'yield', level:null, price:26000, image:'images/items/yield/gold.png', image_mini:'images/items/yield/gold.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[1710] = {item_id:1710, nshort:'key1', name:'Первый ключ', type:'yield', level:null, price:42, image:'images/items/yield/key1.png', image_mini:'images/items/yield/key1.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1711] = {item_id:1711, nshort:'key2', name:'Второй ключ', type:'yield', level:null, price:46, image:'images/items/yield/key2.png', image_mini:'images/items/yield/key2.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1715] = {item_id:1715, nshort:'cane', name:'Трость', type:'yield', level:42, price:2800, image:'images/items/yield/cane.png', image_mini:'images/items/yield/cane.png', characterClass:null, characterSex:'male', speed:null, bonus:{skills:{}, attributes:{charisma:2}}, set:{key:'set_gentleman', name:'Джентльменский набор'}, shop:'quest'};\
items[1716] = {item_id:1716, nshort:'letter', name:'Личное письмо', type:'yield', level:null, price:2, image:'images/items/yield/letter.png', image_mini:'images/items/yield/letter.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1717] = {item_id:1717, nshort:'chamber_pot', name:'Ночной горшок', type:'yield', level:null, price:750, image:'images/items/yield/chamber_pot.png', image_mini:'images/items/yield/chamber_pot.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:'set_sleeper', name:'Набор сони'}, shop:'drop'};\
items[1733] = {item_id:1733, nshort:'henrys_packet', name:'Посылка Генри', type:'yield', level:null, price:32, image:'images/items/yield/henrys_packet.png', image_mini:'images/items/yield/henrys_packet.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1751] = {item_id:1751, nshort:'ruby', name:'Рубин', type:'yield', level:null, price:66, image:'images/items/yield/ruby.png', image_mini:'images/items/yield/ruby.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
";

bi2_code += "\
raboty = [];\
raboty[1] = {rus_name:'Выпас свиней', name:'swine', malus:1, navyki:{tough:1,endurance:1,leadership:1,animal:2}, resultaty:{dengi:3, opyt:1, vezenie:0, boom:1, produkty:{700:20}}};\
raboty[2] = {rus_name:'Присмотр за полем', name:'scarecrow', malus:0, navyki:{build:1,shot:1,pitfall:1,tactic:1,animal:1}, resultaty:{dengi:1, opyt:3, vezenie:2, boom:20, produkty:{757:20}}};\
raboty[3] = {rus_name:'Расклейка плакатов', name:'wanted', malus:0, navyki:{endurance:1,ride:1,hide:1,finger_dexterity:1,pitfall:1}, resultaty:{dengi:2, opyt:3, vezenie:0, boom:10, produkty:{743:40}}};\
raboty[4] = {rus_name:'Сбор табака', name:'tabacco', malus:0, navyki:{tough:1,finger_dexterity:2,tactic:1,trade:1}, resultaty:{dengi:6, opyt:1, vezenie:2, boom:2, produkty:{702:100}}};\
raboty[5] = {rus_name:'Сбор хлопка', name:'cotton', malus:1, navyki:{tough:1,endurance:1,finger_dexterity:1,leadership:1,trade:1}, resultaty:{dengi:1, opyt:4, vezenie:0, boom:3, produkty:{704:50}}};\
raboty[6] = {rus_name:'Сбор сахарного тростника', name:'sugar', malus:3, navyki:{punch:1,tough:1,finger_dexterity:1,repair:1,trade:1}, resultaty:{dengi:5, opyt:2, vezenie:4, boom:1, produkty:{703:100}}};\
raboty[7] = {rus_name:'Рыбалка', name:'angle', malus:2, navyki:{hide:1,swim:3,repair:1}, resultaty:{dengi:1, opyt:0, vezenie:6, boom:2, produkty:{705:60, 782:3}}};\
raboty[8] = {rus_name:'Жатва', name:'cereal', malus:10, navyki:{punch:1,tough:1,endurance:1,ride:1,finger_dexterity:1}, resultaty:{dengi:2, opyt:6, vezenie:2, boom:4, produkty:{701:55}}};\
raboty[9] = {rus_name:'Сбор ягод', name:'berry', malus:15, navyki:{tough:2,hide:1,finger_dexterity:2}, resultaty:{dengi:2, opyt:6, vezenie:5, boom:6, produkty:{706:45}}};\
raboty[10] = {rus_name:'Выпас овец', name:'sheeps', malus:11, navyki:{tough:1,endurance:1,leadership:1,animal:2}, resultaty:{dengi:3, opyt:5, vezenie:0, boom:2, produkty:{707:25}}};\
raboty[11] = {rus_name:'Продажа прессы', name:'newspaper', malus:8, navyki:{ride:2,trade:2,appearance:1}, resultaty:{dengi:6, opyt:1, vezenie:2, boom:1, produkty:{744:60}}};\
raboty[12] = {rus_name:'Сенокос', name:'cut', malus:21, navyki:{punch:1,ride:1,finger_dexterity:1,animal:2}, resultaty:{dengi:5, opyt:7, vezenie:3, boom:3, produkty:{765:5}}};\
raboty[13] = {rus_name:'Помол зерна', name:'grinding', malus:24, navyki:{punch:1,tough:1,endurance:1,ride:1,finger_dexterity:1}, resultaty:{dengi:11, opyt:7, vezenie:0, boom:5, produkty:{745:40}}};\
raboty[14] = {rus_name:'Сбор кукурузы', name:'corn', malus:22, navyki:{finger_dexterity:1,tactic:1,trade:1,animal:1,appearance:1}, resultaty:{dengi:4, opyt:7, vezenie:8, boom:5, produkty:{748:25}}};\
raboty[15] = {rus_name:'Сбор фасоли', name:'beans', malus:22, navyki:{endurance:1,finger_dexterity:1,leadership:1,tactic:1,animal:1}, resultaty:{dengi:9, opyt:7, vezenie:4, boom:5, produkty:{746:40}}};\
raboty[16] = {rus_name:'Охрана форта', name:'fort_guard', malus:24, navyki:{reflex:1,shot:1,leadership:1,appearance:2}, resultaty:{dengi:3, opyt:9, vezenie:2, boom:7, produkty:{758:2}}};\
raboty[17] = {rus_name:'Дубление кожи', name:'tanning', malus:39, navyki:{tough:1,endurance:1,swim:1,finger_dexterity:1,trade:1}, resultaty:{dengi:12, opyt:15, vezenie:5, boom:18, produkty:{712:15}}};\
raboty[18] = {rus_name:'Поиск золота', name:'digging', malus:30, navyki:{tough:1,reflex:1,swim:1,trade:2}, resultaty:{dengi:11, opyt:3, vezenie:5, boom:7, produkty:{708:17}}};\
raboty[19] = {rus_name:'Захоронение', name:'grave', malus:75, navyki:{build:1,punch:1,tough:1,endurance:1,ride:1}, resultaty:{dengi:16, opyt:12, vezenie:22, boom:9, produkty:{736:8}}};\
raboty[20] = {rus_name:'Охота на индейку', name:'turkey', malus:42, navyki:{reflex:1,hide:2,shot:1,pitfall:1}, resultaty:{dengi:3, opyt:14, vezenie:7, boom:21, produkty:{709:13}}};\
raboty[21] = {rus_name:'Строительство железной дороги', name:'rail', malus:44, navyki:{build:2,endurance:1,repair:1,leadership:1}, resultaty:{dengi:10, opyt:18, vezenie:5, boom:10, produkty:{766:25}}};\
raboty[22] = {rus_name:'Выпас коров', name:'cow', malus:38, navyki:{ride:2,reflex:1,tactic:1,animal:1}, resultaty:{dengi:5, opyt:17, vezenie:0, boom:11, produkty:{710:15}}};\
raboty[23] = {rus_name:'Ремонт забора', name:'fence', malus:35, navyki:{finger_dexterity:1,repair:2,animal:2}, resultaty:{dengi:7, opyt:11, vezenie:5, boom:6, produkty:{747:11}}};\
raboty[24] = {rus_name:'Лесопилка', name:'saw', malus:63, navyki:{reflex:2,finger_dexterity:2,trade:1}, resultaty:{dengi:23, opyt:12, vezenie:6, boom:32, produkty:{742:10}}};\
raboty[25] = {rus_name:'Выработка камня', name:'stone', malus:52, navyki:{punch:3,endurance:1,reflex:1}, resultaty:{dengi:17, opyt:8, vezenie:9, boom:33, produkty:{716:22}}};\
raboty[26] = {rus_name:'Спрямление русла', name:'straighten', malus:84, navyki:{build:1,swim:3,tactic:1}, resultaty:{dengi:8, opyt:22, vezenie:15, boom:12, produkty:{795:5}}};\
raboty[27] = {rus_name:'Лесоповал', name:'wood', malus:47, navyki:{punch:2,endurance:1,reflex:1,appearance:1}, resultaty:{dengi:18, opyt:5, vezenie:2, boom:21, produkty:{711:25}}};\
raboty[28] = {rus_name:'Орошение', name:'irrigation', malus:44, navyki:{build:1,ride:1,repair:1,leadership:1,tactic:1}, resultaty:{dengi:7, opyt:13, vezenie:15, boom:6, produkty:{736:6}}};\
raboty[29] = {rus_name:'Клеймение скота', name:'brand', malus:49, navyki:{ride:1,reflex:1,pitfall:1,animal:2}, resultaty:{dengi:8, opyt:25, vezenie:0, boom:35, produkty:{740:13}}};\
raboty[30] = {rus_name:'Ограждение пастбища', name:'wire', malus:57, navyki:{build:1,finger_dexterity:2,pitfall:1,animal:1}, resultaty:{dengi:17, opyt:13, vezenie:6, boom:0, produkty:{739:10}}};\
raboty[31] = {rus_name:'Прорыв плотины', name:'dam', malus:53, navyki:{swim:2,tactic:2,animal:1}, resultaty:{dengi:4, opyt:18, vezenie:9, boom:41, produkty:{714:5}}};\
raboty[32] = {rus_name:'Добыча самоцветов', name:'gems', malus:74, navyki:{swim:2,finger_dexterity:1,trade:2}, resultaty:{dengi:25, opyt:7, vezenie:8, boom:4, produkty:{720:8}}};\
raboty[33] = {rus_name:'Разметка приисков', name:'claim', malus:56, navyki:{build:1,endurance:1,swim:1,trade:1,appearance:1}, resultaty:{dengi:31, opyt:4, vezenie:4, boom:29, produkty:{755:25}}};\
raboty[34] = {rus_name:'Ремонт повозок', name:'chuck_wagon', malus:133, navyki:{ride:1,repair:2,leadership:1,trade:1}, resultaty:{dengi:5, opyt:23, vezenie:42, boom:11, produkty:{722:15}}};\
raboty[35] = {rus_name:'Объезд лошадей', name:'break_in', malus:71, navyki:{ride:2,reflex:1,pitfall:1,animal:1}, resultaty:{dengi:13, opyt:32, vezenie:10, boom:52, produkty:{787:5}}};\
raboty[36] = {rus_name:'Торговля', name:'trade', malus:84, navyki:{pitfall:1,trade:2,appearance:2}, resultaty:{dengi:15, opyt:3, vezenie:25, boom:12, produkty:{715:13, 774:1}}};\
raboty[37] = {rus_name:'Прокладка телеграфной линии', name:'mast', malus:74, navyki:{build:2,punch:1,swim:1,repair:1}, resultaty:{dengi:21, opyt:25, vezenie:3, boom:14, produkty:{767:14}}};\
raboty[38] = {rus_name:'Рытьё колодца', name:'spring', malus:102, navyki:{build:1,endurance:1,swim:1,leadership:1,tactic:1}, resultaty:{dengi:9, opyt:33, vezenie:23, boom:19, produkty:{741:10}}};\
raboty[39] = {rus_name:'Охота на бобра', name:'beaver', malus:119, navyki:{hide:2,pitfall:3}, resultaty:{dengi:32, opyt:17, vezenie:6, boom:21, produkty:{714:17, 771:13}}};\
raboty[40] = {rus_name:'Добыча угля', name:'coal', malus:85, navyki:{punch:2,reflex:1,finger_dexterity:1,trade:1}, resultaty:{dengi:30, opyt:14, vezenie:0, boom:13, produkty:{721:37}}};\
raboty[41] = {rus_name:'Типография', name:'print', malus:82, navyki:{tough:1,endurance:1,finger_dexterity:1,repair:1,leadership:1}, resultaty:{dengi:30, opyt:20, vezenie:5, boom:7, produkty:{744:40}}};\
raboty[42] = {rus_name:'Рыбная ловля', name:'fishing', malus:90, navyki:{swim:2,pitfall:2,leadership:1}, resultaty:{dengi:6, opyt:23, vezenie:23, boom:38, produkty:{717:15, 705:5}}};\
raboty[43] = {rus_name:'Строительство вокзала', name:'trainstation', malus:112, navyki:{build:2,finger_dexterity:1,repair:1,leadership:1}, resultaty:{dengi:12, opyt:47, vezenie:7, boom:15, produkty:{759:7}}};\
raboty[44] = {rus_name:'Строительство ветряной мельницы', name:'windmeel', malus:163, navyki:{build:1,endurance:1,ride:1,leadership:1,tactic:1}, resultaty:{dengi:42, opyt:43, vezenie:6, boom:18, produkty:{756:5}}};\
raboty[45] = {rus_name:'Рекогносцировка', name:'explore', malus:111, navyki:{endurance:1,shot:1,ride:1,swim:1,leadership:1}, resultaty:{dengi:1, opyt:45, vezenie:22, boom:37, produkty:{760:15}}};\
raboty[46] = {rus_name:'Сплав леса', name:'float', malus:137, navyki:{reflex:1,swim:3,tactic:1}, resultaty:{dengi:23, opyt:45, vezenie:0, boom:52, produkty:{711:30}}};\
raboty[47] = {rus_name:'Строительство моста', name:'bridge', malus:107, navyki:{build:1,endurance:1,swim:2,repair:1}, resultaty:{dengi:17, opyt:33, vezenie:18, boom:53, produkty:{761:8}}};\
raboty[48] = {rus_name:'Отлов лошадей', name:'springe', malus:134, navyki:{endurance:1,ride:2,animal:2}, resultaty:{dengi:29, opyt:45, vezenie:0, boom:42, produkty:{749:22}}};\
raboty[49] = {rus_name:'Изготовление гробов', name:'coffin', malus:118, navyki:{build:1,reflex:1,repair:2,appearance:1}, resultaty:{dengi:42, opyt:8, vezenie:15, boom:20, produkty:{734:25}}};\
raboty[50] = {rus_name:'Доставка амуниции', name:'dynamite', malus:144, navyki:{ride:1,reflex:1,shot:1,finger_dexterity:1,appearance:1}, resultaty:{dengi:23, opyt:12, vezenie:64, boom:93, produkty:{737:5}}};\
raboty[51] = {rus_name:'Охота на койотов', name:'coyote', malus:140, navyki:{endurance:2,shot:1,pitfall:1,hide:1}, resultaty:{dengi:15, opyt:43, vezenie:26, boom:45, produkty:{718:6}}};\
raboty[52] = {rus_name:'Охота на бизона', name:'buffalo', malus:178, navyki:{ride:1,pitfall:1,leadership:1,tactic:1,animal:1}, resultaty:{dengi:24, opyt:62, vezenie:0, boom:72, produkty:{724:14}}};\
raboty[53] = {rus_name:'Строительство особняка', name:'fort', malus:224, navyki:{build:1,pitfall:1,repair:1,leadership:2}, resultaty:{dengi:33, opyt:71, vezenie:17, boom:35, produkty:{762:3}}};\
raboty[54] = {rus_name:'Торговля с индейцами', name:'indians', malus:223, navyki:{pitfall:1,trade:2,appearance:2}, resultaty:{dengi:11, opyt:14, vezenie:63, boom:34, produkty:{719:13}}};\
raboty[55] = {rus_name:'Вырубка леса', name:'clearing', malus:178, navyki:{punch:2,reflex:1,leadership:1,tactic:1}, resultaty:{dengi:62, opyt:8, vezenie:9, boom:16, produkty:{711:65}}};\
raboty[56] = {rus_name:'Добыча серебра', name:'silver', malus:193, navyki:{punch:1,tough:1,finger_dexterity:1,trade:2}, resultaty:{dengi:76, opyt:8, vezenie:0, boom:32, produkty:{725:17}}};\
raboty[57] = {rus_name:'Охрана дилижанса', name:'diligence_guard', malus:403, navyki:{ride:1,shot:1,repair:1,leadership:2}, resultaty:{dengi:34, opyt:77, vezenie:45, boom:43, produkty:{780:12}}};\
raboty[58] = {rus_name:'Охота на волков', name:'wolf', malus:207, navyki:{hide:2,pitfall:2,animal:1}, resultaty:{dengi:21, opyt:63, vezenie:15, boom:67, produkty:{763:11}}};\
raboty[59] = {rus_name:'Охрана каравана', name:'track', malus:212, navyki:{hide:2,leadership:2,tactic:1}, resultaty:{dengi:10, opyt:60, vezenie:30, boom:33, produkty:{778:12}}};\
raboty[60] = {rus_name:'Конокрадство', name:'ox', malus:237, navyki:{reflex:1,hide:1,pitfall:2,animal:1}, resultaty:{dengi:64, opyt:34, vezenie:18, boom:43, produkty:{787:13}}};\
raboty[61] = {rus_name:'Охрана тюрьмы', name:'guard', malus:221, navyki:{punch:1,reflex:1,shot:1,appearance:2}, resultaty:{dengi:25, opyt:35, vezenie:38, boom:4, produkty:{750:1}}};\
raboty[62] = {rus_name:'Миссионерство', name:'bible', malus:235, navyki:{tough:1,ride:1,trade:1,appearance:2}, resultaty:{dengi:5, opyt:61, vezenie:52, boom:77, produkty:{768:1}}};\
raboty[63] = {rus_name:'Пони-экспресс', name:'ponyexpress', malus:225, navyki:{endurance:1,ride:2,shot:1,animal:1}, resultaty:{dengi:15, opyt:45, vezenie:51, boom:44, produkty:{779:5}}};\
raboty[64] = {rus_name:'Торговля оружием с индейцами', name:'weapons', malus:257, navyki:{hide:1,shot:1,repair:1,trade:2}, resultaty:{dengi:15, opyt:35, vezenie:72, boom:82, produkty:{783:4}}};\
raboty[65] = {rus_name:'Мародёрство', name:'dead', malus:265, navyki:{tough:1,hide:1,finger_dexterity:2,repair:1}, resultaty:{dengi:14, opyt:14, vezenie:90, boom:34, produkty:{774:1,723:1}}};\
raboty[66] = {rus_name:'Охота на гризли', name:'grizzly', malus:280, navyki:{hide:1,shot:1,pitfall:2,animal:1}, resultaty:{dengi:25, opyt:78, vezenie:35, boom:71, produkty:{731:3}}};\
raboty[67] = {rus_name:'Добыча нефти', name:'oil', malus:294, navyki:{build:1,tough:1,endurance:1,leadership:1,trade:1}, resultaty:{dengi:83, opyt:25, vezenie:20, boom:7, produkty:{752:25}}};\
raboty[68] = {rus_name:'Поиски клада', name:'treasure_hunting', malus:293, navyki:{hide:2,repair:2,tactic:1}, resultaty:{dengi:20, opyt:20, vezenie:83, boom:24, produkty:{726:1}}};\
raboty[69] = {rus_name:'Служба в армии', name:'army', malus:298, navyki:{endurance:1,swim:1,shot:1,pitfall:1,appearance:1}, resultaty:{dengi:55, opyt:76, vezenie:17, boom:35, produkty:{727:2}}};\
raboty[70] = {rus_name:'Мелкое воровство', name:'steal', malus:371, navyki:{reflex:1,hide:1,shot:1,pitfall:1,finger_dexterity:1}, resultaty:{dengi:48, opyt:50, vezenie:74, boom:66, produkty:{728:4}}};\
raboty[71] = {rus_name:'Служба наёмником', name:'mercenary', malus:331, navyki:{tough:1,swim:1,shot:1,repair:1,appearance:1}, resultaty:{dengi:92, opyt:52, vezenie:23, boom:65, produkty:{1708:85}}};\
raboty[72] = {rus_name:'Преследование бандитов', name:'bandits', malus:384, navyki:{tough:1,endurance:1,hide:1,leadership:1,tactic:1}, resultaty:{dengi:28, opyt:75, vezenie:85, boom:83, produkty:{729:5}}};\
raboty[73] = {rus_name:'Нападение на повозку', name:'aggression', malus:421, navyki:{hide:2,pitfall:1,tactic:1,appearance:1}, resultaty:{dengi:78, opyt:27, vezenie:78, boom:86, produkty:{730:13,774:1}}};\
raboty[74] = {rus_name:'Нападение на дилижанс', name:'diligence_aggression', malus:475, navyki:{shot:1,pitfall:1,leadership:1,tactic:1,appearance:1}, resultaty:{dengi:43, opyt:73, vezenie:95, boom:67, produkty:{733:15}}};\
raboty[75] = {rus_name:'Охота за преступниками', name:'bounty', malus:425, navyki:{punch:1,endurance:1,shot:1,pitfall:1,appearance:1}, resultaty:{dengi:92, opyt:32, vezenie:79, boom:72, produkty:{}}};\
raboty[76] = {rus_name:'Перевозка заключённых', name:'captured', malus:437, navyki:{endurance:1,reflex:1,hide:1,tactic:2}, resultaty:{dengi:23, opyt:69, vezenie:85, boom:44, produkty:{764:4}}};\
raboty[77] = {rus_name:'Нападение на поезд', name:'train', malus:505, navyki:{endurance:1,hide:1,shot:1,pitfall:1,trade:1}, resultaty:{dengi:67, opyt:87, vezenie:92, boom:96, produkty:{}}};\
raboty[78] = {rus_name:'Кража со взломом', name:'burglary', malus:517, navyki:{endurance:1,hide:2,tactic:1,trade:1}, resultaty:{dengi:80, opyt:34, vezenie:81, boom:26, produkty:{786:12}}};\
raboty[79] = {rus_name:'Знахарство', name:'quackery', malus:315, navyki:{hide:1,shot:1,pitfall:1,trade:1,appearance:1}, resultaty:{dengi:65, opyt:50, vezenie:52, boom:67, produkty:{794:9}}};\
raboty[80] = {rus_name:'Парламентёрство', name:'peace', malus:366, navyki:{endurance:1,hide:1,shot:1,trade:1,appearance:1}, resultaty:{dengi:33, opyt:68, vezenie:76, boom:44, produkty:{751:8}}};\
raboty[82] = {rus_name:'Речные перевозки', name:'ship', malus:347, navyki:{punch:1,swim:2,leadership:2}, resultaty:{dengi:82, opyt:35, vezenie:15, boom:14, produkty:{788:12}}};\
raboty[83] = {rus_name:'Контрабанда', name:'smuggle', malus:410, navyki:{hide:1,swim:1,shot:1,trade:1,appearance:1}, resultaty:{dengi:62, opyt:45, vezenie:83, boom:56, produkty:{729:22}}};\
raboty[84] = {rus_name:'Строительство ранчо', name:'ranch', malus:220, navyki:{build:2,endurance:1,ride:1,animal:1}, resultaty:{dengi:28, opyt:61, vezenie:17, boom:24, produkty:{784:45}}};\
raboty[85] = {rus_name:'Добыча железа', name:'iron', malus:176, navyki:{build:1,punch:1,reflex:1,finger_dexterity:1,repair:1}, resultaty:{dengi:52, opyt:32, vezenie:15, boom:29, produkty:{790:38, 753:2}}};\
raboty[86] = {rus_name:'Сбор агавы', name:'agave', malus:152, navyki:{punch:1,tough:2,endurance:1,finger_dexterity:1}, resultaty:{dengi:25, opyt:42, vezenie:12, boom:27, produkty:{792:12}}};\
raboty[87] = {rus_name:'Сбор помидоров', name:'tomato', malus:42, navyki:{ride:1,finger_dexterity:1,leadership:1,tactic:1,trade:1}, resultaty:{dengi:13, opyt:12, vezenie:7, boom:11, produkty:{793:33}}};\
raboty[88] = {rus_name:'Набивка подков', name:'horseshoe', malus:92, navyki:{punch:1,ride:2,animal:2}, resultaty:{dengi:14, opyt:28, vezenie:9, boom:23, produkty:{754:22}}};\
raboty[90] = {rus_name:'Тушение пожара', name:'fire', malus:228, navyki:{build:1,tough:1,reflex:1,leadership:1,tactic:1}, resultaty:{dengi:15, opyt:41, vezenie:65, boom:45, produkty:{781:2}}};\
raboty[91] = {rus_name:'Сбор апельсинов', name:'orange', malus:66, navyki:{endurance:1,reflex:1,pitfall:1,repair:1,tactic:1}, resultaty:{dengi:14, opyt:25, vezenie:10, boom:21, produkty:{791:25}}};\
raboty[92] = {rus_name:'Чистка хлева', name:'muck_out', malus:7, navyki:{tough:1,ride:1,repair:1,animal:2}, resultaty:{dengi:4, opyt:5, vezenie:2, boom:6, produkty:{797:5}}};\
raboty[93] = {rus_name:'Чистка обуви', name:'shoes', malus:0, navyki:{hide:1,pitfall:1,finger_dexterity:1,trade:1,appearance:1}, resultaty:{dengi:3, opyt:2, vezenie:3, boom:2, produkty:{789:35}}};\
\
raboty[101] = {rus_name:'Строительство в городе/форте', name:'build', malus:0, navyki:{build:3,repair:1,leadership:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:0, produkty:{}}};\
\
raboty[103] = {rus_name:'Форт. Атака', name:'attack', malus:0, navyki:{aim:.5,dodge:.5,endurance:1,leadership:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\
raboty[104] = {rus_name:'Форт. Атака (меткость)', name:'attack', malus:0, navyki:{aim:1,dodge:.001,endurance:1,leadership:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\
raboty[105] = {rus_name:'Форт. Атака (уворот)', name:'attack', malus:0, navyki:{aim:.001,dodge:1,endurance:1,leadership:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\
raboty[106] = {rus_name:'Форт. Защита', name:'defend', malus:0, navyki:{aim:.5,dodge:.5,hide:1,leadership:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:50, produkty:{}}};\
raboty[107] = {rus_name:'Форт. Защита (меткость)', name:'defend', malus:0, navyki:{aim:1,dodge:.001,hide:1,leadership:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:50, produkty:{}}};\
raboty[108] = {rus_name:'Форт. Защита (уворот)', name:'defend', malus:0, navyki:{aim:.001,dodge:1,hide:1,leadership:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:50, produkty:{}}};\
\
\
raboty[111] = {rus_name:'Передвижение', name:'moving', malus:-1, navyki:{}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:0, produkty:{}}};\
\
raboty[121] = {rus_name:'Стрелок vs стрелок атака', name:'sh_vs_sh_at', malus:0, navyki:{aim:1,dodge:1,shot:1,reflex:1,tough:0.5,appearance:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\
raboty[122] = {rus_name:'Ударник vs стрелок атака', name:'me_vs_sh_at', malus:0, navyki:{aim:1,dodge:1,punch:1,reflex:1,tough:0.5,appearance:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\
raboty[123] = {rus_name:'Стрелок vs стрелок защита', name:'sh_vs_sh_de', malus:0, navyki:{aim:1,dodge:1,shot:1,reflex:1,tough:0.5,tactic:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\
raboty[124] = {rus_name:'Ударник vs стрелок защита', name:'me_vs_sh_de', malus:0, navyki:{aim:1,dodge:1,punch:1,reflex:1,tough:0.5,tactic:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\
raboty[125] = {rus_name:'Стрелок vs ударник атака', name:'sh_vs_me_at', malus:0, navyki:{aim:1,dodge:1,shot:1,tough:1,reflex:0.5,appearance:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\
raboty[126] = {rus_name:'Ударник vs ударник атака', name:'me_vs_me_at', malus:0, navyki:{aim:1,dodge:1,punch:1,tough:1,reflex:0.5,appearance:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\
raboty[127] = {rus_name:'Стрелок vs ударник защита', name:'sh_vs_me_de', malus:0, navyki:{aim:1,dodge:1,shot:1,tough:1,reflex:0.5,tactic:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\
raboty[128] = {rus_name:'Ударник vs ударник защита', name:'me_vs_me_de', malus:0, navyki:{aim:1,dodge:1,punch:1,tough:1,reflex:0.5,tactic:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\
raboty[129] = {rus_name:'Стрелок vs все защита', name:'sh_vs_al_de', malus:0, navyki:{aim:1,dodge:1,shot:1,tough:0.75,reflex:0.75,tactic:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\
raboty[130] = {rus_name:'Ударник vs все защита', name:'me_vs_al_de', malus:0, navyki:{aim:1,dodge:1,punch:1,tough:0.75,reflex:0.75,tactic:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\
raboty[131] = {rus_name:'Стрелок vs2 стрелок атака', name:'sh_vs2_sh_at', malus:0, navyki:{aim:1,dodge:1,shot:1,reflex:1,tough:0.5,appearance:1,health:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\
raboty[132] = {rus_name:'Ударник vs2 стрелок атака', name:'me_vs2_sh_at', malus:0, navyki:{aim:1,dodge:1,punch:1,reflex:1,tough:0.5,appearance:1,health:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\
raboty[133] = {rus_name:'Стрелок vs2 стрелок защита', name:'sh_vs2_sh_de', malus:0, navyki:{aim:1,dodge:1,shot:1,reflex:1,tough:0.5,tactic:1,health:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\
raboty[134] = {rus_name:'Ударник vs2 стрелок защита', name:'me_vs2_sh_de', malus:0, navyki:{aim:1,dodge:1,punch:1,reflex:1,tough:0.5,tactic:1,health:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\
raboty[135] = {rus_name:'Стрелок vs2 ударник атака', name:'sh_vs2_me_at', malus:0, navyki:{aim:1,dodge:1,shot:1,tough:1,reflex:0.5,appearance:1,health:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\
raboty[136] = {rus_name:'Ударник vs2 ударник атака', name:'me_vs2_me_at', malus:0, navyki:{aim:1,dodge:1,punch:1,tough:1,reflex:0.5,appearance:1,health:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\
raboty[137] = {rus_name:'Стрелок vs2 ударник защита', name:'sh_vs2_me_de', malus:0, navyki:{aim:1,dodge:1,shot:1,tough:1,reflex:0.5,tactic:1,health:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\
raboty[138] = {rus_name:'Ударник vs2 ударник защита', name:'me_vs2_me_de', malus:0, navyki:{aim:1,dodge:1,punch:1,tough:1,reflex:0.5,tactic:1,health:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\
raboty[139] = {rus_name:'Стрелок vs2 все защита', name:'sh_vs2_al_de', malus:0, navyki:{aim:1,dodge:1,shot:1,tough:0.75,reflex:0.75,tactic:1,health:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\
raboty[140] = {rus_name:'Ударник vs2 все защита', name:'me_vs2_al_de', malus:0, navyki:{aim:1,dodge:1,punch:1,tough:0.75,reflex:0.75,tactic:1,health:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\
";

bi2_code += "\
komplekty={};\
\
komplekty.set_farmer=[];\
komplekty.set_farmer[1] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_farmer[2] = {bonus:{attributes:{flexibility:1, strength:1}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_farmer[2].raboty[8]=10;komplekty.set_farmer[2].raboty[12]=10;komplekty.set_farmer[2].raboty[13]=10;\
komplekty.set_farmer[3] = {bonus:{attributes:{flexibility:1, strength:1, dexterity:1, charisma:1}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_farmer[3].raboty[8]=10;komplekty.set_farmer[3].raboty[12]=10;komplekty.set_farmer[3].raboty[13]=10;\
komplekty.set_farmer[3].raboty[88]=20;komplekty.set_farmer[3].raboty[30]=20;komplekty.set_farmer[3].raboty[22]=20;\
komplekty.set_farmer[4] = {bonus:{attributes:{flexibility:2, strength:2, dexterity:2, charisma:2}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_farmer[4].raboty[8]=10;komplekty.set_farmer[4].raboty[12]=10;komplekty.set_farmer[4].raboty[13]=10;\
komplekty.set_farmer[4].raboty[88]=20;komplekty.set_farmer[4].raboty[30]=20;komplekty.set_farmer[4].raboty[22]=20;\
komplekty.set_farmer[4].raboty[48]=40;komplekty.set_farmer[4].raboty[84]=40;komplekty.set_farmer[4].raboty[44]=40;\
komplekty.set_farmer[5] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_farmer[6] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
\
komplekty.set_indian=[];\
komplekty.set_indian[1] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_indian[2] = {bonus:{attributes:{flexibility:2}, skills:{hide:8}}, speed:0.8696, raboty:[]};\
komplekty.set_indian[2].raboty[51]=30;\
komplekty.set_indian[3] = {bonus:{attributes:{flexibility:5}, skills:{hide:8, swim:8}}, speed:0.7692, raboty:[]};\
komplekty.set_indian[3].raboty[51]=30;komplekty.set_indian[3].raboty[52]=40;\
komplekty.set_indian[4] = {bonus:{attributes:{flexibility:8}, skills:{hide:8, swim:8, pitfall:8}}, speed:0.6944, raboty:[]};\
komplekty.set_indian[4].raboty[51]=30;komplekty.set_indian[4].raboty[52]=40;komplekty.set_indian[4].raboty[58]=50;\
komplekty.set_indian[5] = {bonus:{attributes:{flexibility:12}, skills:{hide:8, swim:8, pitfall:8, animal:8}}, speed:0.625, raboty:[]};\
komplekty.set_indian[5].raboty[51]=30;komplekty.set_indian[5].raboty[52]=40;komplekty.set_indian[5].raboty[58]=50;;komplekty.set_indian[5].raboty[66]=60;\
komplekty.set_indian[6] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
\
komplekty.set_mexican=[];\
komplekty.set_mexican[1] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_mexican[2] = {bonus:{attributes:{strength:1}, skills:{}}, speed:0.8929, raboty:[]};\
komplekty.set_mexican[3] = {bonus:{attributes:{strength:2}, skills:{}}, speed:0.8065, raboty:[]};\
komplekty.set_mexican[3].raboty[86]=60;\
komplekty.set_mexican[4] = {bonus:{attributes:{strength:4}, skills:{}}, speed:0.7353, raboty:[]};\
komplekty.set_mexican[4].raboty[86]=60;komplekty.set_mexican[4].raboty[67]=70;\
komplekty.set_mexican[5] = {bonus:{attributes:{strength:6}, skills:{}}, speed:0.6757, raboty:[]};\
komplekty.set_mexican[5].raboty[86]=60;komplekty.set_mexican[5].raboty[67]=70;komplekty.set_mexican[5].raboty[83]=80;\
komplekty.set_mexican[6] = {bonus:{attributes:{strength:9}, skills:{}}, speed:0.625, raboty:[]};\
komplekty.set_mexican[6].raboty[86]=60;komplekty.set_mexican[6].raboty[67]=70;komplekty.set_mexican[6].raboty[83]=80;komplekty.set_mexican[6].raboty[50]=90;\
\
komplekty.set_quackery=[];\
komplekty.set_quackery[1] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_quackery[2] = {bonus:{attributes:{dexterity:1}, skills:{endurance:5, trade:5}}, speed:null, raboty:[]};\
komplekty.set_quackery[2].raboty[79]=30;\
komplekty.set_quackery[3] = {bonus:{attributes:{dexterity:2}, skills:{endurance:10, trade:10}}, speed:null, raboty:[]};\
komplekty.set_quackery[3].raboty[79]=60;\
komplekty.set_quackery[4] = {bonus:{attributes:{dexterity:4}, skills:{endurance:15, trade:15}}, speed:null, raboty:[]};\
komplekty.set_quackery[4].raboty[79]=90;\
komplekty.set_quackery[5] = {bonus:{attributes:{dexterity:6}, skills:{endurance:20, trade:20}}, speed:null, raboty:[]};\
komplekty.set_quackery[5].raboty[79]=120;\
komplekty.set_quackery[6] = {bonus:{attributes:{dexterity:9}, skills:{endurance:20, trade:20, reflex:18, tough:18, aim:18, shot:18}}, speed:null, raboty:[]};\
komplekty.set_quackery[6].raboty[79]=120;\
\
komplekty.set_pilgrim_male=[];\
komplekty.set_pilgrim_male[1] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_pilgrim_male[2] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_pilgrim_male[2].raboty[101]=5;\
komplekty.set_pilgrim_male[3] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_pilgrim_male[3].raboty[101]=15;\
komplekty.set_pilgrim_male[4] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_pilgrim_male[4].raboty[101]=30;\
komplekty.set_pilgrim_male[5] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_pilgrim_male[5].raboty[101]=50;komplekty.set_pilgrim_male[5].raboty[62]=150;\
komplekty.set_pilgrim_male[6] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
\
komplekty.set_pilgrim_female=[];\
komplekty.set_pilgrim_female[1] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_pilgrim_female[2] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_pilgrim_female[2].raboty[101]=5;\
komplekty.set_pilgrim_female[3] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_pilgrim_female[3].raboty[101]=15;\
komplekty.set_pilgrim_female[4] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_pilgrim_female[4].raboty[101]=30;\
komplekty.set_pilgrim_female[5] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_pilgrim_female[5].raboty[101]=50;komplekty.set_pilgrim_female[5].raboty[62]=150;\
komplekty.set_pilgrim_female[6] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
\
komplekty.set_gentleman=[];\
komplekty.set_gentleman[1] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_gentleman[2] = {bonus:{attributes:{charisma:1}, skills:{appearance:8}}, speed:null, raboty:[]};\
for (i=1;i<94;++i) {komplekty.set_gentleman[2].raboty[i]=5};komplekty.set_gentleman[2].raboty[101]=5;\
komplekty.set_gentleman[3] = {bonus:{attributes:{charisma:3}, skills:{appearance:8, leadership:8}}, speed:null, raboty:[]};\
for (i=1;i<94;++i) {komplekty.set_gentleman[3].raboty[i]=15};komplekty.set_gentleman[3].raboty[101]=15;\
komplekty.set_gentleman[4] = {bonus:{attributes:{charisma:6}, skills:{appearance:8, leadership:8, trade:8}}, speed:null, raboty:[]};\
for (i=1;i<94;++i) {komplekty.set_gentleman[4].raboty[i]=30};komplekty.set_gentleman[4].raboty[101]=30;\
komplekty.set_gentleman[5] = {bonus:{attributes:{charisma:10}, skills:{appearance:16, leadership:8, trade:8}}, speed:null, raboty:[]};\
for (i=1;i<94;++i) {komplekty.set_gentleman[5].raboty[i]=50};komplekty.set_gentleman[5].raboty[101]=50;\
komplekty.set_gentleman[6] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
\
komplekty.set_dancer=[];\
komplekty.set_dancer[1] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_dancer[2] = {bonus:{attributes:{charisma:2}, skills:{appearance:10}}, speed:null, raboty:[]};\
for (i=1;i<94;++i) {komplekty.set_dancer[2].raboty[i]=10};komplekty.set_dancer[2].raboty[101]=10;\
komplekty.set_dancer[3] = {bonus:{attributes:{charisma:5}, skills:{appearance:10, animal:10}}, speed:null, raboty:[]};\
for (i=1;i<94;++i) {komplekty.set_dancer[3].raboty[i]=25};komplekty.set_dancer[3].raboty[101]=25;\
komplekty.set_dancer[4] = {bonus:{attributes:{charisma:9}, skills:{appearance:10, animal:10, finger_dexterity:10}}, speed:null, raboty:[]};\
for (i=1;i<94;++i) {komplekty.set_dancer[4].raboty[i]=45};komplekty.set_dancer[4].raboty[101]=45;\
komplekty.set_dancer[5] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_dancer[6] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
";

bi2_code += "\
bi2_vse_navyki=['build' ,'punch' ,'tough' ,'endurance' ,'health' ,'ride' ,'reflex' ,'dodge' ,'hide' ,'swim' ,'aim' ,'shot' ,'pitfall' ,'finger_dexterity' ,'repair' ,'leadership' ,'tactic' ,'trade' ,'animal' ,'appearance'];\
bi2_vse_kharakteristiki=['strength', 'flexibility', 'dexterity', 'charisma'];\
";
aWindow.assign_citem = function (tid, obj){
	aWindow.items[tid] = {item_id:tid, nshort:obj.short, name:obj.name, type:obj.type, level:obj.level, price:obj.price, image:obj.image, image_mini:obj.image_mini, characterClass:obj.characterClass, characterSex:obj.characterSex, speed:obj.speed, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};
    for (zz = aWindow.bi2_vse_navyki.length-1;zz >=0;--zz){
        ss = aWindow.bi2_vse_navyki[zz];
	    if (obj.bonus.skills[ss])
	        aWindow.items[tid].bonus.skills[ss]=obj.bonus.skills[ss];
	}
    for (zz = aWindow.bi2_vse_kharakteristiki.length-1;zz >=0;--zz){
        aa = aWindow.bi2_vse_kharakteristiki[zz];
        if (obj.bonus.attributes[aa])
	        aWindow.items[tid].bonus.attributes[aa]=obj.bonus.attributes[aa];
	}
	if (obj.set){
	    aWindow.items[tid].set.key = obj.set.key;
	    aWindow.items[tid].set.name = obj.set.name;
	}
}

aWindow.compare_citem = function (tid, item){
	soft = true;
	hard = true;
	if (aWindow.items[tid].item_id!=item.item_id) return;
	if (aWindow.items[tid].nshort!=item.short){hard=false;aWindow.items[tid].nshort=item.short};
	if (aWindow.items[tid].name!=item.name){soft=false;aWindow.items[tid].name=item.name};
	if (aWindow.items[tid].type!=item.type){hard=false;aWindow.items[tid].type=item.type}
	if (aWindow.items[tid].level!=item.level){hard=false;aWindow.items[tid].level=item.level}
	if (aWindow.items[tid].price!=item.price){hard=false;aWindow.items[tid].price=item.price}
	if (aWindow.items[tid].image!=item.image){hard=false;aWindow.items[tid].image=item.image}
	if (aWindow.items[tid].image_mini!=item.image_mini){hard=false;aWindow.items[tid].image_mini=item.image_mini}
	if (aWindow.items[tid].characterClass!=item.characterClass){hard=false;aWindow.items[tid].characterClass=item.characterClass}
	if (aWindow.items[tid].characterSex!=item.characterSex){hard=false;aWindow.items[tid].characterSex=item.characterSex}
	if (aWindow.items[tid].speed!=item.speed){hard=false;aWindow.items[tid].speed=item.speed}
    
    for (zz = aWindow.bi2_vse_navyki.length-1;zz >=0;--zz){
        num_index = aWindow.bi2_vse_navyki[zz];
        if (item.bonus.skills[num_index]&&aWindow.items[tid].bonus.skills[num_index]){
            if (item.bonus.skills[num_index]!=aWindow.items[tid].bonus.skills[num_index]){
                hard=false;
                break;
            }
        }
        else if (item.bonus.skills[num_index]||aWindow.items[tid].bonus.skills[num_index]){
            hard=false;
            break;
        }
    }    
    for (zz = aWindow.bi2_vse_kharakteristiki.length-1;zz >=0;--zz){
        num_index = aWindow.bi2_vse_kharakteristiki[zz];
        if (item.bonus.attributes[num_index]&&aWindow.items[tid].bonus.attributes[num_index]){
            if (item.bonus.attributes[num_index]!=aWindow.items[tid].bonus.attributes[num_index]){
                hard=false;
                break;
            }
        }
        else if (item.bonus.attributes[num_index]||aWindow.items[tid].bonus.attributes[num_index]){
            hard=false;
            break;
        }
    }    
    
	if (!item.set){
	    if (aWindow.items[tid].set.key){ hard=false;}
	}
	else{
	    if (item.set.key!=aWindow.items[tid].set.key){
	        hard=false;
	    }
	    if (item.set.name!=aWindow.items[tid].set.name){
	        soft=false;
	    }
	}
	res={h:hard,s:soft};
	return res;
}

aWindow.print_citem = function (tid){
	result='';
	result += 'items[' + aWindow.items[tid].item_id + '] = {item_id:' + aWindow.items[tid].item_id + ', nshort:\'' + aWindow.items[tid].nshort;
	result += '\', name:\'' + aWindow.items[tid].name + '\', type:\'' + aWindow.items[tid].type + '\', level:' + aWindow.items[tid].level;
	result += ', price:' + aWindow.items[tid].price + ', image:\'' + aWindow.items[tid].image + '\', image_mini:\'' + aWindow.items[tid].image_mini + '\', characterClass:';
	cc = aWindow.items[tid].characterClass ? '\'' + aWindow.items[tid].characterClass + '\'' : null;
	result += cc + ', characterSex:';
	cs = aWindow.items[tid].characterSex ? '\'' + aWindow.items[tid].characterSex + '\'' : null;
	result += cs + ', speed:' + aWindow.items[tid].speed;
	if (aWindow.items[tid].bonus) {
		result += ', bonus:{skills:';
		ww = false;
		for (zz = aWindow.bi2_vse_navyki.length-1; zz >=0; --zz ){
		    if (aWindow.items[tid].bonus.skills[aWindow.bi2_vse_navyki[zz]]) {
				if (ww) {
					result += ', '
				}
				else {
					ww = true;
					result += '{'
				}
				result += aWindow.bi2_vse_navyki[zz] + ':' + aWindow.items[tid].bonus.skills[aWindow.bi2_vse_navyki[zz]];
			}
		}
		if (ww){
   			result += '}, '
		}
		else {
			result += '{}, ';
		}
		result += 'attributes:';
		ww = false;
		for (zz = aWindow.bi2_vse_kharakteristiki.length-1; zz >=0; --zz ){
		    if (aWindow.items[tid].bonus.attributes[aWindow.bi2_vse_kharakteristiki[zz]]){
				if (ww) {
					result += ', '
				}
				else {
					ww = true;
					result += '{'
				}
				result += aWindow.bi2_vse_kharakteristiki[zz] + ':' + aWindow.items[tid].bonus.attributes[aWindow.bi2_vse_kharakteristiki[zz]];
			}
		}
		if (ww){
		    result += '}'
		}
		else {
			result += '{}';
		}
		result += '}, ';
	}
	else {
		result += '{skills:{}, attributes:{}}, '
	}
	if (aWindow.items[tid].set.key) {
		result += 'set:{key:\'' + aWindow.items[tid].set.key + '\', name:\'' + aWindow.items[tid].set.name + '\'}'
	}
	else {
		result += 'set:{key:null, name:null}'
	}
	result += ', shop:\''+aWindow.items[tid].shop+'\'};';
	return result;
}

bi2_code += "\
komp_rab = {};\
komp_zas = {};\
komp_skor = {};\
komp_fort = {};\
for (i=0;i < nabory.length;++i){\
	komp_rab[nabory[i]] = [];\
	komp_zas[nabory[i]] = [];\
	komp_skor[nabory[i]]= [];\
	komp_fort[nabory[i]]= [];\
};\
\
vyborka={};\
vyborka_z={};\
vyborka_r={};\
prosto_veschi=[];\
prosto_veschi_max=8;\
for (ii = bi2_types.length; ii >= 0; --ii) {\
	vyborka[bi2_types[ii]] = {};\
	vyborka[bi2_types[ii]].simple = {};\
	vyborka[bi2_types[ii]].simple.spisok = [];\
	vyborka_z[bi2_types[ii]] = {};\
	vyborka_z[bi2_types[ii]].simple = {};\
	vyborka_z[bi2_types[ii]].simple.spisok = [];\
	vyborka_r[bi2_types[ii]] = {};\
	vyborka_r[bi2_types[ii]].simple = {};\
	vyborka_r[bi2_types[ii]].simple.spisok = [];\
	prosto_veschi[bi2_types[ii]]={};\
};\
\
resultaty=[];\
resultaty_z=[];\
resultaty_r=[];\
zaschita=null;\
ezda = false;\
rabnavyki=[];\
rabnavyki_z=[];\
rabnavyki_r=[];\
\
bi2_htmlrab=[];\
bi2_sortrab=[];\
bi2_hiderab=[];\
bi2_bezto=0;\
\
bi2_predmetov = {};\
bi2_khochuka = [];\
bi2_uchet=[];\
bi2_aktiv=[];\
porabotaj=[];\
bi2_slots={};\
for (i=0;i<bi2_types.length;++i){\
	bi2_slots[bi2_types[i]]=true;\
};\
irabota=0;\
samoe_ono={};\
deneg_ushlo = 0;\
bablo = 0;\
\
i_slot_max=[];\
i_slot=[];\
\
ic_obj = [];\
ic_objr = [];\
ic_objr = [];\
ii_rekur=0;\
rekurs_delay = 100;\
rekurs_step = 0;\
rekurs_time = 25000;\
rekurs_up = true;\
bi2_to=0;\
bi2_zas=0;\
bi2_ride=0; \
pers={};\
bi2_speed=1.0;\
ezda=false;\
bi2_onesk_rabot = false;\
chislo_rabot = 0;\
chislo_rabot_to = 0;\
khoroshi = [];\
khoroshi_to = [];\
";

aWindow.bi2_iimport = function(){
	bagazh=aWindow.Bag.getInstance();
	odezhda=aWindow.Wear.wear;
	for(vv in bagazh.items){
    	aWindow.bi2_inv_imported=true;
		cobj = bagazh.items[vv].obj;
		tid = cobj.item_id;
		if (!aWindow.bi2_uchet[tid]){
		    aWindow.bi2_uchet[tid]=true;
	    	if (aWindow.items[tid]){
				var cres={h:null,s:null};
				cres=aWindow.compare_citem(tid, cobj);
				if (!cres.h)	{
					aWindow.einfo+='Часть данных о предмете неверна:\n';
					aWindow.assign_citem(tid, cobj);
					aWindow.einfo+=aWindow.print_citem(tid)+'\n';
				}
				else if(!cres.s){
					aWindow.winfo+='Неправильное название предмета:\n';
					aWindow.assign_citem(tid, cobj);
					aWindow.winfo+=aWindow.print_citem(tid)+'\n';
				}
			}
			else{
				aWindow.items[tid] = {item_id:tid, nshort:'nothing', name:'Заглушка', type:'yield', level:0, price:0, image:'images/items/right_arm/clayjug.png', image_mini:'images/items/right_arm/mini/clayjug.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'nil'};
				aWindow.assign_citem(tid, cobj);
				aWindow.einfo+='Отсутствует описание предмета:\n';
				aWindow.einfo+=aWindow.print_citem(tid)+'\n';
			}
		}
    }
    for(vv in aWindow.Wear.wear){
		if (!aWindow.Wear.wear[vv])
			continue;
		cobj = aWindow.Wear.wear[vv].obj;
		tid = cobj.item_id;
		aWindow.bi2_equipment[vv]=tid;
		if (!aWindow.bi2_uchet[tid]){
		    aWindow.bi2_uchet[tid]=true;
	    	if (aWindow.items[tid]){
				var cres={h:null,s:null};
				cres=aWindow.compare_citem(tid, cobj);
				if (!cres.h)	{
					aWindow.einfo+='Часть данных о предмете неверна:\n';
					aWindow.assign_citem(tid, cobj);
					aWindow.einfo+=aWindow.print_citem(tid)+'\n';
				}
				else if(!cres.s){
					aWindow.winfo+='Неправильное название предмета:\n';
					aWindow.assign_citem(tid, cobj);
					aWindow.winfo+=aWindow.print_citem(tid)+'\n';
				}
			}
			else{
				aWindow.items[tid] = {item_id:tid, nshort:'nothing', name:'Заглушка', type:'yield', level:0, price:0, image:'images/items/right_arm/clayjug.png', image_mini:'images/items/right_arm/mini/clayjug.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'nil'};
				aWindow.assign_citem(tid, cobj);
				aWindow.einfo+='Отсутствует описание предмета:\n';
				aWindow.einfo+=aWindow.print_citem(tid)+'\n';
			}
		}
    }
}

aWindow.bi2_mimport = function(){
	magaz=aWindow.TraderInventory.getInstance('bi2',0);
	if (!magaz) return;
	for(vv in magaz.items){
		cobj = magaz.items[vv].obj;
		tid = cobj.item_id;
		if (!aWindow.bi2_khochuka[tid]){
		    if (!aWindow.bi2_uchet[tid]){
		        aWindow.bi2_khochuka[tid]=true;
		    }
	    	if (aWindow.items[tid]){
				var cres={h:null,s:null};
				cres=aWindow.compare_citem(tid, cobj);
				  
				  
				  if(!cres.s){
					aWindow.winfo+='Неправильное название предмета:\n';
					aWindow.assign_citem(tid, cobj);
					aWindow.winfo+=aWindow.print_citem(tid)+'\n';
				}
			}
			else{
				aWindow.items[tid] = {item_id:tid, nshort:'nothing', name:'Заглушка', type:'yield', level:0, price:0, image:'images/items/right_arm/clayjug.png', image_mini:'images/items/right_arm/mini/clayjug.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'nil'};
				aWindow.assign_citem(tid, cobj);
				aWindow.einfo+='Отсутствует описание предмета:\n';
				aWindow.einfo+=aWindow.print_citem(tid)+'\n';
			}
		}
    }
}

aWindow.bi2_podschet = function  (vse_veschi, iz_magazinov, plus_level, pers){
	aWindow.bi2_aktiv=null;
	aWindow.bi2_aktiv=[];
	for (vv in aWindow.items){
		if (isNaN(vv)) continue;
		vesch=aWindow.items[vv];
		check=true;
		if (vesch.characterSex&&(vesch.characterSex!=pers.characterSex)) check=false;
		if (vesch.characterClass&&(vesch.characterClass!=pers.characterClass)) check=false;
		if (!aWindow.bi2_uchet[vesch.item_id]&&!aWindow.bi2_khochuka[vesch.item_id])
		{
			if (!vse_veschi){
				if (!iz_magazinov)
					check=false;
				else{
					if(vesch.shop!='shop')
						check=false;
				}
			}
			if ((vesch.shop=='shop')&&(vesch.price > aWindow.bablo)) check=false;
		}
		lit = pers.level+ plus_level+parseInt(pers.itemLevelRequirementDecrease[vesch.type],10)+pers.itemLevelRequirementDecrease.all;
		if (vesch.level > lit) check=false;
		if (aWindow.bi2_slots && aWindow.bi2_slots[vesch.type]&&!(aWindow.bi2_equipment[vesch.type]==vv)) check=false;
		if (check) aWindow.bi2_aktiv.push(vesch.item_id);
	}
}

aWindow.bi2_ocenka_khlama = function(){
    aWindow.bi2_nenuzhnoe=[];
    if (!aWindow.bi2_khlam)
        return;
    ispolz=[];
    for (irab=200; irab>0;irab--){
        if (aWindow.raboty[irab]){
            if (aWindow.resultaty[irab]){
                for (ee = 0; ee < aWindow.bi2_types.length; ++ee){
                    sid = aWindow.resultaty[irab].items[ee].tid;
                    ispolz[sid]=true;
                }
            }
            if (aWindow.resultaty_z[irab]){
                for (ee = 0; ee < aWindow.bi2_types.length; ++ee){
                    sid = aWindow.resultaty_z[irab].items[ee].tid;
                    ispolz[sid]=true;
                }
            }
            if (aWindow.resultaty_r[irab]){
                for (ee = 0; ee < aWindow.bi2_types.length; ++ee){
                    sid = aWindow.resultaty_r[irab].items[ee].tid;
                    ispolz[sid]=true;
                }
            }
        }
    }
    
    for (tid in aWindow.bi2_uchet){
        if ((tid < 600)&&(tid >=200)&&(!ispolz[tid])){
            aWindow.bi2_nenuzhnoe[tid]=true;
        }
    }
}

aWindow.bi2_res2html = function (){
    count_rab=0;
    aWindow.bi2_htmlrab=[];
    while (count_rab < 255){
        if (!(aWindow.porabotaj[count_rab]&&aWindow.resultaty[count_rab])){
            ++count_rab;
            continue;
        }
        ihtm = '';
        ihtm += '<tr>';
        rabota = aWindow.raboty[count_rab];
        ihtm += '<td rowspan=\"6\">';
        ihtm += '<table><tbody><tr><th>'+rabota.rus_name+'</th></tr>';
        if ((count_rab > 120)&&(count_rab <= 140)){
            ihtm += '<tr><td><a href=\"javascript:bi2_show_shmot('+ count_rab +');\" >';
            ihtm += '<div style=\"width:63px; height:63px; background-image: url(\'/images/menu_buttons/duel.png\'); background-position: 80px 0;\"></div></a>';
        }
        else if (count_rab == 111){
            ihtm += '<tr><td><a href=\"javascript:bi2_show_shmot('+ count_rab +');\" >';
            ihtm += '<img style=\"float:left; width:63px; height:63px;\" src=\"images/fingerboard/fingerboard.png\"';
            ihtm += ' alt=\"'+rabota.rus_name+'\" title=\"'+rabota.rus_name+'\" /></a>';
        }
        else{
            ihtm += '<tr><td><a href=\"javascript:bi2_show_shmot('+ count_rab +');\" >';
            ihtm += '<img style=\"float:left;\" src=\"';
            if (count_rab<=101){
                ihtm += 'images/jobs/';
            }
            else if (count_rab<111){
                ihtm += 'images/fort/battle/button_';
            }
            ihtm +=rabota.name+'.png\" alt=\"'+rabota.rus_name+'\" title=\"'+rabota.rus_name+'\" /></a>';
        };
        rres = rabota.resultaty;
        for (ri in rres.produkty){
            ihtm+='<div style=\"display:inline; float:left; margin: 8px 1px;\"><div class=\"jy_bi\"><img style=\"-moz-user-select: none;\" ';
            ihtm+='title=\"'+aWindow.items[ri].name+'\" alt=\"'+aWindow.items[ri].name+'\" ';
            ihtm+='src=\"'+aWindow.items[ri].image_mini+'\" /></div><div class=\"jy_bi2\">'+rres.produkty[ri]+'%</div>';
            ihtm+='</div>';
        }
        ihtm += '</td></tr>';
        ihtm += '<tr><td>';
        ihtm += ' <a class=\"tt\" href=\"#\" style=\"color:black;\"><table><tr><td><img src=\"images/job/dollar.png\" /></td>';
        ihtm += '<td><div class="bar"><div class="bar_fill" style="width: '+Math.round(rres.dengi*3/2)+'px;"></div><div class="bar_perc">'+rres.dengi+'%</div></div>';
        ihtm += '<span>Заработок:'+rres.dengi+'</span></td></tr></table></a>';
        ihtm += ' <a class=\"tt\" href=\"#\" style=\"color:black;\"><table><tr><td><img src=\"images/job/experience.png\" /></td>';
        ihtm += '<td><div class="bar"><div class="bar_fill" style="width: '+Math.round(rres.opyt*3/2)+'px;"></div><div class="bar_perc">'+rres.opyt+'%</div></div>';
        ihtm += '<span>Опыт:'+rres.opyt+'</span></td></tr></table></a>';
        ihtm += ' <a class=\"tt\" href=\"#\" style=\"color:black;\"><table><tr><td><img src=\"images/job/luck.png\" /></td>';
        ihtm += '<td><div class="bar"><div class="bar_fill" style="width: '+Math.round(rres.vezenie*3/2)+'px;"></div><div class="bar_perc">'+rres.vezenie+'%</div></div>';
        ihtm += '<span>Удача:'+rres.vezenie+'</span></td></tr></table></a>';
        ihtm += ' <a class=\"tt\" href=\"#\" style=\"color:black;\"><table><tr><td><img src=\"images/job/danger.png\" /></td>';
        ihtm += '<td><div class="bar"><div class="bar_brown" style="width: '+Math.round(rres.boom*3/2)+'px;"></div><div class="bar_perc">'+rres.boom+'%</div></div>';
        ihtm += '<span>Опасность:'+rres.boom+'</span></td></tr></table></a>';
        ihtm += '</td></tr></tbody></table>';

        ihtm += '</td><td>';

        if ((count_rab<=101)||(count_rab>111)){
            ihtm += '<span title=\"Очки от навыков\" class="calculation_visualisation img_plus" style=\"margin-left:0px;\">';
	    	ihtm += '<span class="skill_box_value" style="text-align:center;">';
		    ihtm += (aWindow.resultaty[count_rab].to+aWindow.raboty[count_rab].malus-aWindow.resultaty[count_rab].ton)+'</span></span>';
            ihtm += '<span title=\"Очки от комплектов\" class="calculation_visualisation img_plus" style=\"margin-left:0px;\">';
	    	ihtm += '<span class="skill_box_value green_text" style="text-align:center;">'+aWindow.resultaty[count_rab].ton+'</span></span>';
		    ihtm += '<span title=\"Сложность работы\" class="calculation_visualisation img_minus"  style=\"margin-left:0px;\">';
    		ihtm += '<span class="skill_box_value" style="text-align:center;">'+aWindow.raboty[count_rab].malus+'</span></span>';
	    	ihtm += '<span title=\"ТО\" class="calculation_visualisation img_equal" style="margin-right:10px; margin-left:0px;">';
		    ihtm += '<span class="skill_box_value" style="text-align:center; color:';
    		ihtm += (aWindow.resultaty[count_rab].to > 0) ? 'rgb(0,255,0)' : 'rgb(255,0,0)';
	    	ihtm += '">'+aWindow.resultaty[count_rab].to+'</span></span>';
	    }
        else if (count_rab!=111){
            ihtm += '<span title=\"Бонус попадания\" class="calculation_visualisation img_plus" style=\"margin-left:0px;\">';
	    	ihtm += '<span class="skill_box_value red_text" style="text-align:center;">';
			var vvv = aWindow.resultaty[count_rab].to-aWindow.resultaty[count_rab].ton;
			vvv = Math.round(vvv*10)/10;
		    ihtm += vvv+'</span></span>';
            ihtm += '<span title=\"Бонус уворота\" class="calculation_visualisation img_plus" style=\"margin-left:0px;\">';
	    	ihtm += '<span class="skill_box_value green_text" style="text-align:center;">'+aWindow.resultaty[count_rab].ton+'</span></span>';
	    	ihtm += '<span title=\"Сумма бонусов\" class="calculation_visualisation img_equal" style="margin-right:10px; margin-left:0px;">';
		    ihtm += '<span class="skill_box_value" style="text-align:center; color:rgb(255,255,255)';
	    	ihtm += '">'+aWindow.resultaty[count_rab].to+'</span></span>';
	    }
	    else{
		
	    	ihtm += '<span title=\"Скорость\" class="calculation_visualisation img_equal" style="margin-right:10px; margin-left:0px;">';
		ihtm += '<span class="skill_box_value" style="text-align:center; ">'+Math.round(aWindow.resultaty[count_rab].to)+'%</span></span>';
	    }
        ihtm += '</td><td>';
            

        brbr = 0;
        ihtm += '<table><tbody><tr>';
        for (jj in aWindow.rabnavyki[count_rab]){
            for (aa = aWindow.rabnavyki[count_rab][jj].mul; aa > 0; --aa){
                if (++brbr==8) {ihtm+='</tr><tr>'; brbr=1};
                ihtm += '<td><a class=\"tt3\" href=\"#\" ><span>'+aWindow.pers.skill_titles[jj]+':'+aWindow.rabnavyki[count_rab][jj].znach+'</span>';
                ihtm += '<div class=\"skill_box\" style=\"padding: 35px 28px 6px 2px; background: transparent url(/images/skill/skills_'+aWindow.bi2_s2a[jj];
                ihtm += '.png) repeat scroll '+aWindow.bi2_s2px[jj]+'px 0px; color: rgb(255, 255, 255); ';
                ihtm += 'width: 25px; height: 14px; -moz-background-clip: border; -moz-background-origin: padding; ';
                ihtm += '-moz-background-inline-policy: continuous; float: left; font-weight: bold; text-align:center;" >';
                ihtm += aWindow.rabnavyki[count_rab][jj].znach+'</div>';
                ihtm += '</a></td>';
            }
        }
        ihtm += '</tr></tbody></table>';
        ihtm += '</td></tr><tr><td colspan=\"2\">';
        
        ihtm += '<div style=\"display:inline; float:left;\"><table>';
	ihtm += '<tr><td><a href="javascript:bi2_auto_odev(\'n\','+count_rab+');void(0);" title="Надеть" >';
	ihtm += '<img src="images/transparent.png" style="width :24px; height : 25px; background:url(../img.php?type=menu&dummy) -104px -51px" >';
	ihtm += '</a></td></tr>';
	ihtm += '<tr><td><a href="javascript:bi2_odev_add(\'n\','+count_rab+');void(0);" title="Сохранить" >';
	ihtm += '<img src="images/transparent.png" style="width :24px; height : 25px; background:url(../img.php?type=menu&dummy) -104px -126px" >';
	ihtm += '</a></td></tr>';
	ihtm += '<tr><td><a href="javascript:bi2_odev_remove(\'n\','+count_rab+');void(0);" title="Удалить" >';
	ihtm += '<img src="images/transparent.png" style="width :24px; height : 24px; background:url(../img.php?type=menu&dummy) -129px -101px" >';
	ihtm += '</a></td></tr>';
	ihtm += '</table></div>';

	for (ee = 0; ee < aWindow.bi2_types.length; ++ee){
            sid = aWindow.resultaty[count_rab].items[ee].tid;
            if (sid){
                ihtm+='<div style=\"display:inline; float:left;\">';
                vesch = aWindow.items[sid];
                ihtm+='<a class=\"tt2\" href=\"#\" ><span><b>'+vesch.name+':</b>&nbsp;'+aWindow.resultaty[count_rab].items[ee].bon;
                if (vesch.set.key){
                    ihtm += '<br /><em>'+vesch.set.name+'</em>';
                }
                for (ind in vesch.bonus.attributes){
                    ihtm += aWindow.bi2_a_print(ind, vesch.bonus.attributes[ind]);
                }
                for (ind in vesch.bonus.skills){
                    ihtm += aWindow.bi2_s_print(ind, vesch.bonus.skills[ind]);
                }
                ihtm += '</span>'
                ihtm+='<div class=\"bag_item\" ><img src=\"'+vesch.image_mini+'\" />';
                ihtm+='<div class="bag_item_count"><p style="text-align:center;">'+aWindow.resultaty[count_rab].items[ee].bon+'</p></div></div>'
                ihtm+='</a>'
                if (aWindow.resultaty[count_rab].items[ee].price > 0){
                    ihtm+='<br />';
                    ihtm +='<span style=\"text-align:center;\">'+aWindow.resultaty[count_rab].items[ee].price+'&nbsp;$</span>';
                }
                ihtm +='</div>';
            }
        }
        ihtm += '</td></tr>';
        
        if (aWindow.resultaty_z[count_rab]){
            ihtm+= '<tr><td>';
            ihtm += '<span title=\"+навыки\" class="calculation_visualisation img_plus">';
	    	ihtm += '<span class="skill_box_value" style="text-align:center;">';
		    ihtm += aWindow.resultaty_z[count_rab].zas+'</span></span>';
    		ihtm += '<span title=\"ТО\" class="calculation_visualisation img_equal" style="margin-right:10px;">';
	    	ihtm += '<span class="skill_box_value" style="text-align:center; color:';
		    ihtm += (aWindow.resultaty_z[count_rab].to > 0) ? 'rgb(0,255,0)' : 'rgb(255,0,0)';
    		ihtm += '">'+aWindow.resultaty_z[count_rab].to+'</span></span>';
            ihtm += '</td><td>';
            brbr=0;
            ihtm += '<table><tbody><tr>';
            for (jj in aWindow.rabnavyki_z[count_rab]){
                for (aa = aWindow.rabnavyki_z[count_rab][jj].mul; aa > 0; --aa){
                    if (++brbr==8) {ihtm+='</tr><tr>'; brbr=1};
                    ihtm += '<td>';
                    ihtm += '<a class=\"tt3\" href=\"#\" ><span>'+aWindow.pers.skill_titles[jj]+':'+aWindow.rabnavyki_z[count_rab][jj].znach+'</span>';
                    ihtm += '<div class=\"skill_box\" style=\"padding: 35px 28px 6px 2px; background: transparent url(/images/skill/skills_'+aWindow.bi2_s2a[jj];
                    ihtm += '.png) repeat scroll '+aWindow.bi2_s2px[jj]+'px 0px; color: rgb(255, 255, 255); ';
                    ihtm += 'width: 25px; height: 14px; -moz-background-clip: border; -moz-background-origin: padding; ';
                    ihtm += '-moz-background-inline-policy: continuous; float: left; font-weight: bold; text-align:center;" >';
                    ihtm += aWindow.rabnavyki_z[count_rab][jj].znach+'</div>';
                    ihtm += '</a></td>';
                }
            }
            ihtm += '</tr></tbody></table>';
            ihtm += '</td></tr><tr><td colspan=\"2\">';

		ihtm += '<div style=\"display:inline; float:left;\"><table>';
		ihtm += '<tr><td><a href="javascript:bi2_auto_odev(\'z\','+count_rab+');void(0);" title="Одеваемся" >';
		ihtm += '<img src="images/transparent.png" style="width :24px; height : 25px; background:url(../img.php?type=menu&dummy) -104px -51px" >';
		ihtm += '</a></td></tr>';
		ihtm += '<tr><td><a href="javascript:bi2_odev_add(\'z\','+count_rab+');void(0);" title="Сохранить" >';
		ihtm += '<img src="images/transparent.png" style="width :24px; height : 25px; background:url(../img.php?type=menu&dummy) -104px -126px" >';
		ihtm += '</a></td></tr>';
		ihtm += '<tr><td><a href="javascript:bi2_odev_remove(\'z\','+count_rab+');void(0);" title="Удалить" >';
		ihtm += '<img src="images/transparent.png" style="width :24px; height : 24px; background:url(../img.php?type=menu&dummy) -129px -101px" >';
		ihtm += '</a></td></tr>';
		ihtm += '</table></div>';

            for (ee = 0; ee < aWindow.bi2_types.length; ++ee){
                sid = aWindow.resultaty_z[count_rab].items[ee].tid;
                if (sid){
                    ihtm+='<div style=\"display:inline; float:left;\">';
			vesch = aWindow.items[sid];
                    ihtm+='<a class=\"tt2\" href=\"#\" ><span><b>'+vesch.name+':</b>&nbsp;'+aWindow.resultaty_z[count_rab].items[ee].bon;
                    if (vesch.set.key){
                        ihtm += '<br /><em>'+vesch.set.name+'</em>';
                    }
                    for (ind in vesch.bonus.attributes){
                        ihtm += aWindow.bi2_a_print(ind, vesch.bonus.attributes[ind]);
                    }
                    for (ind in vesch.bonus.skills){
                        ihtm += aWindow.bi2_s_print(ind, vesch.bonus.skills[ind]);
                    }
                    ihtm += '</span>';
                    ihtm+='<div class=\"bag_item\" ><img src=\"'+vesch.image_mini+'\" />';
                    ihtm+='<div class="bag_item_count"><p style="text-align:center;">'+aWindow.resultaty_z[count_rab].items[ee].bon+'</p></div></div>';
                    ihtm+='</a>';
                    if (aWindow.resultaty_z[count_rab].items[ee].price > 0){
                        ihtm+='<br />';
                        ihtm +='<span style=\"text-align:center;\">'+aWindow.resultaty_z[count_rab].items[ee].price+'&nbsp;$</span>';
                    }
                    ihtm +='</div>';
                }
            }
            ihtm += '</td></tr>';
        }
        else{
            ihtm+='<tr><td colspan=\"2\" /></tr><tr><td colspan=\"2\" /></tr>';
        }
        
        if (aWindow.resultaty_r[count_rab]){
            ihtm+= '<tr><td>';
            ihtm += '<span title=\"+навыки\" class="calculation_visualisation img_plus">';
	    	ihtm += '<span class="skill_box_value" style="text-align:center;">';
		    ihtm += aWindow.resultaty_r[count_rab].speed+'%</span></span>';
    		ihtm += '<span title=\"ТО\" class="calculation_visualisation img_equal" style="margin-right:10px;">';
	    	ihtm += '<span class="skill_box_value" style="text-align:center; color:';
		    ihtm += (aWindow.resultaty_r[count_rab].to > 0) ? 'rgb(0,255,0)' : 'rgb(255,0,0)';
    		ihtm += '">'+aWindow.resultaty_r[count_rab].to+'</span></span>';
            ihtm += '</td><td>';
            brbr=0;
            ihtm += '<table><tbody><tr>';
            for (jj in aWindow.rabnavyki_r[count_rab]){
                for (aa = aWindow.rabnavyki_r[count_rab][jj].mul; aa > 0; --aa){
                    if (++brbr==8) {ihtm+='</tr><tr>'; brbr=1};
                    ihtm += '<td>';
                    ihtm += '<a class=\"tt3\" href=\"#\" ><span>'+aWindow.pers.skill_titles[jj]+':'+aWindow.rabnavyki_r[count_rab][jj].znach+'</span>';
                    ihtm += '<div class=\"skill_box\" style=\"padding: 35px 28px 6px 2px; background: transparent url(/images/skill/skills_'+aWindow.bi2_s2a[jj];
                    ihtm += '.png) repeat scroll '+aWindow.bi2_s2px[jj]+'px 0px; color: rgb(255, 255, 255); ';
                    ihtm += 'width: 25px; height: 14px; -moz-background-clip: border; -moz-background-origin: padding; ';
                    ihtm += '-moz-background-inline-policy: continuous; float: left; font-weight: bold; text-align:center;" >';
                    ihtm += aWindow.rabnavyki_r[count_rab][jj].znach+'</div>';
                    ihtm += '</a></td>';
                }
            }
            ihtm += '</tr></tbody></table>';
            ihtm += '</td></tr><tr><td colspan=\"2\">';

		ihtm += '<div style=\"display:inline; float:left;\"><table>';
		ihtm += '<tr><td><a href="javascript:bi2_auto_odev(\'r\','+count_rab+');void(0);" title="Одеваемся" >';
		ihtm += '<img src="images/transparent.png" style="width :24px; height : 25px; background:url(../img.php?type=menu&dummy) -104px -51px" >';
		ihtm += '</a></td></tr>';
		ihtm += '<tr><td><a href="javascript:bi2_odev_add(\'r\','+count_rab+');void(0);" title="Сохранить" >';
		ihtm += '<img src="images/transparent.png" style="width :24px; height : 25px; background:url(../img.php?type=menu&dummy) -104px -126px" >';
		ihtm += '</a></td></tr>';
		ihtm += '<tr><td><a href="javascript:bi2_odev_remove(\'r\','+count_rab+');void(0);" title="Удалить" >';
		ihtm += '<img src="images/transparent.png" style="width :24px; height : 24px; background:url(../img.php?type=menu&dummy) -129px -101px" >';
		ihtm += '</a></td></tr>';
		ihtm += '</table></div>';

            for (ee = 0; ee < aWindow.bi2_types.length; ++ee){
                sid = aWindow.resultaty_r[count_rab].items[ee].tid;
                if (sid){
                    ihtm+='<div style=\"display:inline; float:left;\">';
			vesch = aWindow.items[sid];
                    ihtm+='<a class=\"tt2\" href=\"#\" ><span><b>'+vesch.name+':</b>&nbsp;'+aWindow.resultaty_r[count_rab].items[ee].bon;
                    if (vesch.set.key){
                        ihtm += '<br /><em>'+vesch.set.name+'</em>';
                    }
                    for (ind in vesch.bonus.attributes){
                        ihtm += aWindow.bi2_a_print(ind, vesch.bonus.attributes[ind]);
                    }
                    for (ind in vesch.bonus.skills){
                        ihtm += aWindow.bi2_s_print(ind, vesch.bonus.skills[ind]);
                    }
                    ihtm += '</span>';
                    ihtm+='<div class=\"bag_item\" ><img src=\"'+vesch.image_mini+'\" />';
                    ihtm+='<div class="bag_item_count"><p style="text-align:center;">'+aWindow.resultaty_r[count_rab].items[ee].bon+'</p></div></div>';
                    ihtm+='</a>';
                    if (aWindow.resultaty_r[count_rab].items[ee].price > 0){
                        ihtm+='<br />';
                        ihtm +='<span style=\"text-align:center;\">'+aWindow.resultaty_r[count_rab].items[ee].price+'&nbsp;$</span>';
                    }
                    ihtm +='</div>';
                }
            }
            ihtm += '</td></tr>';
        }
        else{
            ihtm+='<tr><td colspan=\"2\" /></tr><tr><td colspan=\"2\" /></tr>';
        }

        
        aWindow.bi2_htmlrab[count_rab]=ihtm;
        ++count_rab;
    }
}

aWindow.bi2_sortir = function (tip, minto){
    ind_arr = 0;
    aWindow.bi2_sortrab = [];
    for (irab in aWindow.bi2_htmlrab){
        if (aWindow.bi2_vse_raboty&&(aWindow.resultaty[irab].to <= -minto))
            continue;
        aWindow.bi2_sortrab[ind_arr] = {};
        aWindow.bi2_sortrab[ind_arr].index = irab;
        switch (tip){
        case 'd0':
            aWindow.bi2_sortrab[ind_arr].ves = -aWindow.raboty[irab].resultaty.dengi;
            break;
        case 'o0':
            aWindow.bi2_sortrab[ind_arr].ves = 0-aWindow.raboty[irab].resultaty.opyt;
            break;
        case 'v0':
            aWindow.bi2_sortrab[ind_arr].ves = 0-aWindow.raboty[irab].resultaty.vezenie;
            break;
        case 'boom':
            aWindow.bi2_sortrab[ind_arr].ves = 0-aWindow.raboty[irab].resultaty.boom;
            break;
        case 'name':
            aWindow.bi2_sortrab[ind_arr].ves= (irab > 100) ? 'я ' : '';
            aWindow.bi2_sortrab[ind_arr].ves += aWindow.raboty[irab].rus_name;
            break;
        case 'malus':
            aWindow.bi2_sortrab[ind_arr].ves = 0-aWindow.raboty[irab].malus;
            break;
        case 'to':
            aWindow.bi2_sortrab[ind_arr].ves = 0-aWindow.resultaty[irab].to;
            break;
        case 'do':
            aWindow.bi2_sortrab[ind_arr].ves = 0-aWindow.raboty[irab].resultaty.dengi - aWindow.raboty[irab].resultaty.opyt;
            break;
        case 'dv':
            aWindow.bi2_sortrab[ind_arr].ves = 0-aWindow.raboty[irab].resultaty.dengi - aWindow.raboty[irab].resultaty.vezenie;
            break;
        case 'ov':
            aWindow.bi2_sortrab[ind_arr].ves = 0-aWindow.raboty[irab].resultaty.vezenie - aWindow.raboty[irab].resultaty.opyt;
            break;
        case 'dov':
            aWindow.bi2_sortrab[ind_arr].ves = 0-aWindow.raboty[irab].resultaty.dengi - aWindow.raboty[irab].resultaty.opyt - aWindow.raboty[irab].resultaty.vezenie;
            break;
        default:
            aWindow.bi2_sortrab[ind_arr].ves = irab;
        }
        ++ind_arr;
    }
    aWindow.qsort(aWindow.bi2_sortrab,0,ind_arr);
    aWindow.bi2_reporter2();
}

aWindow.bi2_vesch_polezna = function(value){
    for (kh in aWindow.bi2_khochuka)
        aWindow.bi2_khochuka[kh] = false;
    if (value > 0)
        aWindow.bi2_khochuka[value] = true;
    aWindow.bi2_hideraboty(value);
}

aWindow.bi2_reporter2 = function(){
    grgr = '';
    aWindow.bi2_process=false;

    grsort = '<table><tbody><tr>';
    grsort += '</td><strong>Способ сортировки: </strong></td>';
    grsort += '<td style=\"width:10px; \" />';
    grsort += '<td style=\"width:2px; background-color:#321; padding: auto 3px;\" />';
    grsort += '<td><a href=\"javascript:bi2_sortir(\'name\', bi2_bezto);\">Название</a></td>';
    grsort += '<td style=\"width:2px; background-color:#321; padding: auto 3px;\" />';
    grsort += '<td><a href=\"javascript:bi2_sortir(\'malus\', bi2_bezto);\"><img style=\"width:23px; height:23px;\" src=\"images/task_points/minus.png\" title=\"Сложность работы\" /></a></td>';
    grsort += '<td style=\"width:2px; background-color:#321; padding: auto 3px;\" />';
    grsort += '<td><a href=\"javascript:bi2_sortir(\'to\', bi2_bezto);\"><img style=\"width:23px; height:23px;\" src=\"images/task_points/equal.png\" title=\"Количество ТО\" /></a></td>';
    grsort += '<td style=\"width:2px; background-color:#321; padding: auto 3px;\" />';
    grsort += '<td><a href=\"javascript:bi2_sortir(\'d0\', bi2_bezto);\"><img style=\"width:23px; height:23px;\" src=\"images/job/dollar.png\" title=\"Заработок\" /></a></td>';
    grsort += '<td style=\"width:2px; background-color:#321; padding: auto 3px;\" />';
    grsort += '<td><a href=\"javascript:bi2_sortir(\'o0\', bi2_bezto);\"><img style=\"width:23px; height:23px;\" src=\"images/job/experience.png\" title=\"Опыт\" /></a></td>';
    grsort += '<td style=\"width:2px; background-color:#321; padding: auto 3px;\" />';
    grsort += '<td><a href=\"javascript:bi2_sortir(\'v0\', bi2_bezto);\"><img style=\"width:23px; height:23px;\" src=\"images/job/luck.png\" title=\"Удача\" /></a></td>';
    grsort += '<td style=\"width:2px; background-color:#321; padding: auto 3px;\" />';
    grsort += '<td><a href=\"javascript:bi2_sortir(\'boom\', bi2_bezto);\"><img style=\"width:23px; height:23px;\" src=\"images/job/danger.png\" title=\"Опасность\" /></a></td>';
    grsort += '<td style=\"width:2px; background-color:#321; padding: auto 3px;\" />';
    grsort += '<td><a title=\"Заработок и опыт\" href=\"javascript:bi2_sortir(\'do\', bi2_bezto);\"><img style=\"width:23px; height:23px;\" src=\"images/job/dollar.png\" /><img style=\"width:23px; height:23px; margin-left:-5px;\" src=\"images/job/experience.png\" /></a></td>';
    grsort += '<td style=\"width:2px; background-color:#321; padding: auto 3px;\" />';
    grsort += '<td><a title=\"Заработок и удача\" href=\"javascript:bi2_sortir(\'dv\', bi2_bezto);\"><img style=\"width:23px; height:23px;\" src=\"images/job/dollar.png\" /><img style=\"width:23px; height:23px; margin-left:-5px;\" src=\"images/job/luck.png\"" /></a></td>';
    grsort += '<td style=\"width:2px; background-color:#321; padding: auto 3px;\" />';
    grsort += '<td><a title=\"Опыт и удача\" href=\"javascript:bi2_sortir(\'ov\', bi2_bezto);\"><img style=\"width:23px; height:23px;\" src=\"images/job/experience.png\" /><img style=\"width:23px; height:23px;\" src=\"images/job/luck.png\"" /></a></td>';
    grsort += '<td style=\"width:2px; background-color:#321; padding: auto 3px;\" />';
    grsort += '<td><a title=\"Заработок, опыт и удача\" href=\"javascript:bi2_sortir(\'dov\', bi2_bezto);\"><img style=\"width:23px; height:23px;\" src=\"images/job/dollar.png\" /><img style=\"width:23px; height:23px; margin-left:-5px;\" src=\"images/job/experience.png\" /><img style=\"width:23px; height:23px;\" src=\"images/job/luck.png\"" /></a></td>';
    grsort += '<td style=\"width:2px; background-color:#321; padding: auto 3px;\" />';
    grsort += '<td><span title=\"Действует при следующем выборе сортировки! Здесь указывается то недостающее (либо избыточное) количество ТО, при котором работы всё ещё будут показываться (так, значение 15 включит в список отображаемых все работы с ТО больше чем -15; значение -10 уберёт из списка все работы с ТО от 10 и ниже.)\"><input type=\"text\" size=\"4\" value=\"'+aWindow.bi2_bezto+'\" ';
    grsort += 'onchange=\"javascript:bi2_bezto=parseInt(value, 10);\">&laquo;Нехватка&raquo; ТО</span></td>';
    grsort += '<td style=\"width:2px; background-color:#321; padding: auto 3px;\" />';
    grsort += '</tr></tbody></table>';
    grgr += grsort;
    grgr +='<table>';

    if (aWindow.bi2_khochuka.length > 0){
        grgr += '<tr><td colspan=\"3\">';
        grgr += '<a href=\"javascript:bi2_hideraboty(0);\">Вернуть все работы</a><br />';
        if (aWindow.bi2_khochuka.length > 1){
            grgr += '<select title=\"Выберите вещь, чтобы посмотреть в скольких (и каких) работах она используется\" class=\"bi2_sel" onchange=\"javascript:bi2_vesch_polezna(value);\">';
            grgr += '<option value=\"0\">Выберите необходимую вещь</option>'
            for (kh in aWindow.bi2_khochuka){
                grgr += '<option value=\"'+kh+'\">'+aWindow.items[kh].name+'</option>';
            }
            grgr += '</select>';
        }
        for (kh in aWindow.bi2_khochuka){
        if (aWindow.bi2_khochuka[kh]){
            grgr += '<table><tr><td>';
            grgr+='<div style=\"display:inline; float:left;\">';
            vesch = aWindow.items[kh];
            grgr+='<a class=\"tt2\" href=\"javascript:bi2_hideraboty('+kh+');\" ><span><b>'+vesch.name+':</b>';
            if (vesch.set.key){
                grgr += '<br /><em>'+vesch.set.name+'</em>';
            }
            for (ind in vesch.bonus.attributes){
                grgr += aWindow.bi2_a_print(ind, vesch.bonus.attributes[ind]);
            }
            for (ind in vesch.bonus.skills){
                grgr += aWindow.bi2_s_print(ind, vesch.bonus.skills[ind]);
            }
            grgr += '</span>'
            grgr+='<div class=\"bag_item\" ><img src=\"'+vesch.image_mini+'\" /></div>';
            grgr+='</a>'
            grgr +='</div>';
            rere = ((kh < 400) || (kh >= 500)) ? '&raquo; применяется ' : '&raquo; применяются ';
            grgr +='Всего доступных  работ:' + aWindow.chislo_rabot_to + '; &laquo;'+vesch.name+rere+ aWindow.khoroshi_to[kh] +' раз.<br />';
            grgr +='Всего работ:' + aWindow.chislo_rabot + '; &laquo;'+vesch.name+rere+ aWindow.khoroshi[kh] +' раз.';
            grgr += '</td></tr></table>';
        }}
        grgr += '<hr>';
        grgr += '</td></tr>';
    }

    for (ii = 0; ii < aWindow.bi2_sortrab.length; ++ii){
        if (!aWindow.bi2_hiderab[aWindow.bi2_sortrab[ii].index]){
            if (ii>0) grgr+='<tr><td colspan=\"3\"><hr></td></tr>';
            grgr += aWindow.bi2_htmlrab[aWindow.bi2_sortrab[ii].index];
        }
    }
    grgr += '</table>';

    if (aWindow.bi2_khlam){
        grgr+='<hr><table><tbody><tr><th colspan=\"8\" style=\"text-align:center;\">Предположим, что эти вещи можно смело продать в магазинах</th></tr><tr>';
        babosy=0;
        tdcount=0;
        for (tid in aWindow.bi2_nenuzhnoe){
            grgr+='<td>';
            vesch = aWindow.items[tid];
            grgr+='<a class=\"tt2\" href=\"#\" ><span><b>'+vesch.name+'</b>';
            for (ind in vesch.bonus.attributes){
                grgr += aWindow.bi2_a_print(ind, vesch.bonus.attributes[ind]);
            }
            for (ind in vesch.bonus.skills){
                grgr += aWindow.bi2_s_print(ind, vesch.bonus.skills[ind]);
            }
            grgr += '</span>'
            grgr+='<div class=\"bag_item\" style="margin-right:30px;"><img src=\"'+vesch.image_mini+'\" /></div>';
            grgr+='</a></td>';
            if (++tdcount==8){
                grgr+='</tr><tr>';
                tdcount=0;
            }
            babosy += vesch.price;
        }
        grgr+='</tr><tr><th colspan=\"8\" style=\"text-align:center;\">';
        grgr +='Минимум денег с продажи: '+babosy / 2+'$';
        grgr+='</th></tr></tbody></table>';
    }
    document.getElementById('bi2_window_content').innerHTML=grgr;
    aWindow.bi2_process=false;
}

aWindow.bi2_vreporter = function () {
    aWindow.bi2_show_window();
    vrvr = '<table>';
    for (count_rab in aWindow.porabotaj){
        if (!aWindow.prosto_veschi[count_rab])
            continue;
        vrvr += '<tr>';
        rabota = aWindow.raboty[count_rab];
        vrvr += '<td rowspan=\"2\">';
        vrvr += '<table><tbody><tr><th>'+rabota.rus_name+'</th></tr>';
        if ((count_rab > 120)&&(count_rab <= 140)){
            vrvr += '<tr><td><a href=\"javascript:bi2_show_shmot('+ count_rab +');\" >';
            vrvr += '<div style=\"width:63px; height:63px; background-image: url(\'/images/menu_buttons/duel.png\'); background-position: 80px 0;\"></div></a>';
        }
        else if ((count_rab > 102)&&(count_rab <= 120)){
            
        }
        else{
            vrvr += '<tr><td><a href=\"javascript:bi2_show_shmot2('+ count_rab +');\" >';
            vrvr += '<img style=\"float:left;\" src=\"';
            if (count_rab<=101){
                vrvr += 'images/jobs/';
            }
            vrvr +=rabota.name+'.png\" alt=\"'+rabota.rus_name+'\" title=\"'+rabota.rus_name+'\" /></a>';
        };

        rres = rabota.resultaty;
        for (ri in rres.produkty){
            vrvr+='<div style=\"display:inline; float:left; margin: 8px 1px;\"><div class=\"jy_bi\"><img style=\"-moz-user-select: none;\" ';
            vrvr+='title=\"'+aWindow.items[ri].name+'\" alt=\"'+aWindow.items[ri].name+'\" ';
            vrvr+='src=\"'+aWindow.items[ri].image_mini+'\" /></div><div class=\"jy_bi2\">'+rres.produkty[ri]+'%</div>';
            vrvr+='</div>';
        }
        vrvr += '</td></tr>';
        vrvr += '<tr><td>';
        vrvr += ' <a class=\"tt\" href=\"#\" style=\"color:black;\"><table><tr><td><img src=\"images/job/dollar.png\" /></td>';
        vrvr += '<td><div class="bar"><div class="bar_fill" style="width: '+Math.round(rres.dengi*3/2)+'px;"></div><div class="bar_perc">'+rres.dengi+'%</div></div>';
        vrvr += '<span>Заработок:'+rres.dengi+'</span></td></tr></table></a>';
        vrvr += ' <a class=\"tt\" href=\"#\" style=\"color:black;\"><table><tr><td><img src=\"images/job/experience.png\" /></td>';
        vrvr += '<td><div class="bar"><div class="bar_fill" style="width: '+Math.round(rres.opyt*3/2)+'px;"></div><div class="bar_perc">'+rres.opyt+'%</div></div>';
        vrvr += '<span>Опыт:'+rres.opyt+'</span></td></tr></table></a>';
        vrvr += ' <a class=\"tt\" href=\"#\" style=\"color:black;\"><table><tr><td><img src=\"images/job/luck.png\" /></td>';
        vrvr += '<td><div class="bar"><div class="bar_fill" style="width: '+Math.round(rres.vezenie*3/2)+'px;"></div><div class="bar_perc">'+rres.vezenie+'%</div></div>';
        vrvr += '<span>Удача:'+rres.vezenie+'</span></td></tr></table></a>';
        vrvr += ' <a class=\"tt\" href=\"#\" style=\"color:black;\"><table><tr><td><img src=\"images/job/danger.png\" /></td>';
        vrvr += '<td><div class="bar"><div class="bar_brown" style="width: '+Math.round(rres.boom*3/2)+'px;"></div><div class="bar_perc">'+rres.boom+'%</div></div>';
        vrvr += '<span>Опасность:'+rres.boom+'</span></td></tr></table></a>';
        vrvr += '</td></tr></tbody></table>';

        vrvr += '</td><td>';

        if (count_rab!=111){
            vrvr += '<span title=\"Очки от навыков\" class="calculation_visualisation img_plus" style=\"margin-left:0px;\">';
	    	vrvr += '<span class="skill_box_value" style="text-align:center;">';
		    vrvr += (aWindow.resultaty[count_rab].to+aWindow.raboty[count_rab].malus-aWindow.resultaty[count_rab].ton)+'</span></span>';
            vrvr += '<span title=\"Очки от комплектов\" class="calculation_visualisation img_plus" style=\"margin-left:0px;\">';
	    	vrvr += '<span class="skill_box_value green_text" style="text-align:center;">'+aWindow.resultaty[count_rab].ton+'</span></span>';
		    vrvr += '<span title=\"Сложность работы\" class="calculation_visualisation img_minus"  style=\"margin-left:0px;\">';
    		vrvr += '<span class="skill_box_value" style="text-align:center;">'+aWindow.raboty[count_rab].malus+'</span></span>';
	    	vrvr += '<span title=\"ТО\" class="calculation_visualisation img_equal" style="margin-right:10px; margin-left:0px;">';
		    vrvr += '<span class="skill_box_value" style="text-align:center; color:';
    		vrvr += (aWindow.resultaty[count_rab].to > 0) ? 'rgb(0,255,0)' : 'rgb(255,0,0)';
	    	vrvr += '">'+aWindow.resultaty[count_rab].to+'</span></span>';
	    }
        vrvr += '</td><td>';

        brbr = 0;
        vrvr += '<table><tbody><tr>';
        for (jj in aWindow.rabnavyki[count_rab]){
            for (aa = aWindow.rabnavyki[count_rab][jj].mul; aa > 0; --aa){
                if (++brbr==8) {vrvr+='</tr><tr>'; brbr=1};
                vrvr += '<td><a class=\"tt3\" href=\"#\" ><span>'+aWindow.pers.skill_titles[jj]+':'+aWindow.rabnavyki[count_rab][jj].znach+'</span>';
                vrvr += '<div class=\"skill_box\" style=\"padding: 35px 28px 6px 2px; background: transparent url(/images/skill/skills_'+aWindow.bi2_s2a[jj];
                vrvr += '.png) repeat scroll '+aWindow.bi2_s2px[jj]+'px 0px; color: rgb(255, 255, 255); ';
                vrvr += 'width: 25px; height: 14px; -moz-background-clip: border; -moz-background-origin: padding; ';
                vrvr += '-moz-background-inline-policy: continuous; float: left; font-weight: bold; text-align:center;" >';
                vrvr += aWindow.rabnavyki[count_rab][jj].znach+'</div>';
                vrvr += '</a></td>';
            }
        }
        vrvr += '</tr></tbody></table>';
        vrvr += '</td></tr><tr><td colspan=\"2\"><table>';
        
        for (ee = 0; ee < aWindow.bi2_types.length; ++ee){
            ctype = aWindow.bi2_types[ee];
            vrvr += '<tr><td>';
            for (vv = aWindow.prosto_veschi[count_rab][ctype].length-1; vv >= 0;  --vv){
                sid = aWindow.prosto_veschi[count_rab][ctype][vv].tid;
                vrvr+='<div style=\"display:inline; float:left;\">';
                vesch = aWindow.items[sid];
                vrvr+='<a class=\"tt2\" href=\"#\" ><span><b>'+vesch.name+':</b>&nbsp;'+aWindow.prosto_veschi[count_rab][ctype][vv].bon;
                if (vesch.set.key){
                    vrvr += '<br /><em>'+vesch.set.name+'</em>';
                }
                for (ind in vesch.bonus.attributes){
                    vrvr += aWindow.bi2_a_print(ind, vesch.bonus.attributes[ind]);
                }
                for (ind in vesch.bonus.skills){
                    vrvr += aWindow.bi2_s_print(ind, vesch.bonus.skills[ind]);
                }
                vrvr += '</span>'
                vrvr+='<div class=\"bag_item\" ><img src=\"'+vesch.image_mini+'\" />';
                vrvr+='<div class="bag_item_count"><p style="text-align:center;">'+aWindow.prosto_veschi[count_rab][ctype][vv].bon+'</p></div></div>'
                vrvr+='</a>'
                if (aWindow.prosto_veschi[count_rab][ctype][vv].price > 0){
                    vrvr+='<br />';
                    vrvr +='<span style=\"text-align:center;\">'+aWindow.prosto_veschi[count_rab][ctype][vv].price+'&nbsp;$</span>';
                }
                vrvr +='</div>';
            }
            vrvr += '</td></tr>'
        }
        vrvr += '</table></td></tr>';
        
    }
    vrvr += '</table>';
    document.getElementById('bi2_window_content').innerHTML=vrvr;
}

aWindow.bi2_reporter = function () 
{
    grgr='';
    aWindow.bi2_ocenka_khlama();
    count_rab=0;
    aWindow.bi2_show_window();
    aWindow.bi2_res2html();
    
    if (aWindow.bi2_khochuka.length > 0){
        aWindow.chislo_rabot = 0;
        aWindow.chislo_rabot_to = 0;
        aWindow.khoroshi = [];
        aWindow.khoroshi_to = [];
        for (kh in aWindow.bi2_khochuka){
            aWindow.khoroshi[kh] = 0;
            aWindow.khoroshi_to[kh] = 0;
            aWindow.bi2_khochuka[kh]=false;
        }
        aWindow.bi2_khochuka[kh]=true; // last item;
        for (rr in aWindow.porabotaj){
            if(aWindow.resultaty[rr]){
                ++aWindow.chislo_rabot;
                if (aWindow.resultaty[rr].to > 0) ++aWindow.chislo_rabot_to;
                for (ii = aWindow.bi2_types.length-1; ii >= 0; --ii){
                    for (kh in aWindow.bi2_khochuka){
                        if (aWindow.resultaty[rr].items[ii].tid == kh){
                            aWindow.khoroshi[kh] += 1;
                            if (aWindow.resultaty[rr].to > 0) aWindow.khoroshi_to[kh] += 1;
                        }
                    }
                }
            }
            if(aWindow.resultaty_z[rr]){
                ++aWindow.chislo_rabot;
                ++aWindow.chislo_rabot_to;
                for (ii = aWindow.bi2_types.length-1; ii >= 0; --ii){
                    for (kh in aWindow.bi2_khochuka){
                        if (aWindow.resultaty_z[rr].items[ii].tid == kh){
                            aWindow.khoroshi[kh] += 1;
                            aWindow.khoroshi_to[kh] += 1;
                        }
                    }
                }
            }
            if(aWindow.resultaty_r[rr]){
                ++aWindow.chislo_rabot;
                ++aWindow.chislo_rabot_to;
                for (ii = aWindow.bi2_types.length-1; ii >= 0; --ii){
                    for (kh in aWindow.bi2_khochuka){
                        if (aWindow.resultaty_r[rr].items[ii].tid == kh){
                            aWindow.khoroshi[kh] += 1;
                            aWindow.khoroshi_to[kh] += 1;
                        }
                    }
                }
            }
        }
    }
    aWindow.bi2_process=false;
    aWindow.bi2_sortir('name', aWindow.bi2_bezto);
}

bi2_code += "\
bi2_s2a =\
{build:'strength', punch:'strength', tough:'strength', endurance:'strength', health:'strength',\
ride:'flexibility', reflex:'flexibility', dodge:'flexibility', hide:'flexibility', swim:'flexibility',\
aim:'dexterity', shot:'dexterity', pitfall:'dexterity', finger_dexterity:'dexterity', repair:'dexterity',\
leadership:'charisma', tactic:'charisma', trade:'charisma', animal:'charisma', appearance:'charisma'};\
";

bi2_code += "\
bi2_s2px =\
{build:0, punch:220, tough:165, endurance:110, health:55,\
ride:0, reflex:220, dodge:165, hide:110, swim:55,\
aim:0, shot:220, pitfall:165, finger_dexterity:110, repair:55,\
leadership:0, tactic:220, trade:165, animal:110, appearance:55};\
";

bi2_code += "\
bi2_s2f_bonus2 = function (value){\
    if (isNaN(value)) return 0;\
    if (value < 1) return 0;\
    if (value < 3) return 1;\
    if (value < 10) return 2;\
    if (value < 23) return 3;\
    if (value < 43) return 4;\
    if (value < 71) return 5;\
    if (value < 108) return 6;\
    if (value < 155) return 7;\
    if (value < 211) return 8;\
    return 9;\
};\
";

bi2_code += "\
bi2_s2f_bonus = function (value){\
    if (isNaN(value)) return 0;\
    if (value < 1) return 0;\
    if (value < 3) return 1+(value-1)/2;\
    if (value < 10) return 2+(value-3)/7;\
    if (value < 23) return 3+(value-10)/13;\
    if (value < 43) return 4+(value-23)/20;\
    if (value < 71) return 5+(value-43)/28;\
    if (value < 108) return 6+(value-71)/37;\
    if (value < 155) return 7+(value-108)/47;\
    if (value < 211) return 8+(value-155)/56;\
    return 9;\
};\
";

aWindow.bi2_hideraboty = function(tid){
    aWindow.bi2_hiderab=[];
    vtype = aWindow.items[tid].type;
    kk = 0;
    for (; vtype != aWindow.bi2_types[kk]; ++kk) {};
    for (irab in aWindow.porabotaj){
        nea = true;
        if (aWindow.resultaty[irab]&&(aWindow.resultaty[irab].items[kk].tid==tid)){
            nea = false;
        }
        if (aWindow.resultaty_z[irab]&&(aWindow.resultaty_z[irab].items[kk].tid==tid)){
            nea = false;
        }
        if (aWindow.resultaty_r[irab]&&(aWindow.resultaty_r[irab].items[kk].tid==tid)){
            nea = false;
        }
        if (nea){
            aWindow.bi2_hiderab[irab]=true;
        }
    }
    aWindow.bi2_reporter2();
}

aWindow.bi2_s_print = function(nav, val){
    
    result='<div>'+aWindow.pers.skill_titles[nav]+':'+val+'</div>';
    return result;
}
aWindow.bi2_a_print = function(kha, val)
{
    result = '<div style=\"font-weight:bold;\" >'+aWindow.pers.attribute_titles[kha]+':'+val+'</div>';
    return result;
}

bi2_code += "\
qsort = function (ar, li, ri){\
	if ((li+1)>=ri) return;\
	var tmp;\
	if (ri-li<10){\
		for (ii=li;ii<ri-1;++ii)\
			for (jj=ii+1;jj<ri;++jj)\
				if(ar[ii].ves>ar[jj].ves){\
					tmp=ar[ii];\
					ar[ii]=ar[jj];\
					ar[jj]=tmp;\
				}\
	}\
	else{\
		mi=parseInt((li+ri)/2,10);\
		if (ar[li].ves>ar[ri-1].ves){\
			tmp=ar[li];\
			ar[li]=ar[ri-1];\
			ar[ri-1]=tmp;\
		}\
		if (ar[li].ves>ar[mi].ves){\
			tmp=ar[li];\
			ar[li]=ar[mi];\
			ar[mi]=tmp;\
		}\
		if (ar[mi].ves>ar[ri-1].ves){\
			tmp=ar[mi];\
			ar[mi]=ar[ri-1];\
			ar[ri-1]=tmp;\
		}\
		em=ar[mi].ves;\
		cl=li;\
		cr=ri-1;\
		while(cl<cr){\
			while((cl<ri)&&(ar[cl].ves<=em)) ++cl;\
			while((cr>li)&&(ar[cr].ves>=em)) --cr;\
			if (cl<cr){\
				tmp=ar[cl];\
				ar[cl]=ar[cr];\
				ar[cr]=tmp;\
			}\
		}\
		if (cr < ri -1)\
		    qsort(ar,li,cr+1);\
		qsort(ar,cl,ri);\
	}\
};\
";

bi2_code += "\
summa_ochkov = function (bonus, nuzhnye_navyki){\
	och=0;\
	for (num_index in nuzhnye_navyki){\
		if(bonus.skills[num_index]){\
			och+=bonus.skills[num_index]*nuzhnye_navyki[num_index];\
		}\
		if(bonus.attributes[bi2_s2a[num_index]]){\
			och+=bonus.attributes[bi2_s2a[num_index]]*nuzhnye_navyki[num_index];\
		}\
	}\
	return och;\
};\
";

bi2_code += "\
summa_ochkov2 = function (skills, nuzhnye_navyki){\
	och=0;\
	for (num_index in nuzhnye_navyki){\
		if(skills[num_index]){\
			och+=skills[num_index]*nuzhnye_navyki[num_index];\
		}\
	}\
	return och;\
};\
";

bi2_code += "\
summa_ochkov3 = function (bonus, ind_navyk){\
	och=0;\
	if(bonus.skills[ind_navyk]){\
		och+=bonus.skills[ind_navyk];\
	}\
	if(bonus.attributes[bi2_s2a[ind_navyk]]){\
		och+=bonus.attributes[bi2_s2a[ind_navyk]];\
	}\
	return och;\
};\
";

bi2_code += "\
bi2_vybvesch = function () {\
	for (irabota in porabotaj) {\
		if (porabotaj[irabota]==false)\
		    continue;\
		porabotaj[irabota]=false;\
		rabota=raboty[irabota];\
		if (!rabota)\
			{continue; }\
		if ((irabota>102)&&(irabota<120))\
		    continue;\
		prosto_veschi[irabota]={};\
		for (ii = bi2_types.length - 1; ii >= 0; --ii) {\
			prosto_veschi[irabota][bi2_types[ii]]=[];\
		}\
		for (i = bi2_aktiv.length-1; i >= 0; --i) {\
			rekurs_time-=50;\
			cid = bi2_aktiv[i];\
			vesch = items[cid];\
			ctype = vesch.type;\
			ochki = summa_ochkov(vesch.bonus, rabota.navyki);\
			tsena = (bi2_uchet[cid] || (vesch.shop != 'shop')) ? 0 : vesch.price;\
    		if (ochki > 0){\
				mv = -1;\
    			for (kk = 0; kk < prosto_veschi[irabota][ctype].length; ++kk) {\
    			    if ((prosto_veschi[irabota][ctype][kk].bon < ochki)||((prosto_veschi[irabota][ctype][kk].bon === ochki)&&(prosto_veschi[irabota][ctype][kk].price > tsena))){\
    			        mv = kk;\
    			    }\
    			    else{\
    			        break;\
    			    }\
    			}\
    			if (prosto_veschi[irabota][ctype].length < prosto_veschi_max){\
    			    for (kk = prosto_veschi[irabota][ctype].length-1; kk > mv; --kk){\
    			        prosto_veschi[irabota][ctype][kk+1]={bon:prosto_veschi[irabota][ctype][kk].bon, price:prosto_veschi[irabota][ctype][kk].price, tid:prosto_veschi[irabota][ctype][kk].tid}\
    			    }\
    			    prosto_veschi[irabota][ctype][mv+1]={bon:ochki, price:tsena, tid:cid};\
    			}\
    			else{\
    			    for (kk = 0; kk < mv; ++kk){\
    			        prosto_veschi[irabota][ctype][kk]={bon:prosto_veschi[irabota][ctype][kk+1].bon, price:prosto_veschi[irabota][ctype][kk+1].price, tid:prosto_veschi[irabota][ctype][kk+1].tid}\
    			    }\
    			    prosto_veschi[irabota][ctype][mv]={bon:ochki, price:tsena, tid:cid};\
    			}\
			}\
		}\
		resultaty[irabota] = {};\
		resultaty[irabota].to = summa_ochkov2(pers.skills, rabota.navyki)-raboty[irabota].malus;\
		resultaty[irabota].ton = 0;\
		raboty[irabota].resultaty.to = resultaty[irabota].to;\
        rabnavyki[irabota]={};\
        for (num_index in raboty[irabota].navyki){\
            temp_n = {};\
            temp_n[num_index]=1;\
            val=summa_ochkov2(pers.skills,temp_n);\
            rabnavyki[irabota][num_index]={};\
            rabnavyki[irabota][num_index].name=pers.skill_titles[num_index];\
            rabnavyki[irabota][num_index].znach = val;\
            rabnavyki[irabota][num_index].mul = raboty[irabota].navyki[num_index] ? raboty[irabota].navyki[num_index] : 0;\
        }\
    }\
	for (irabota in porabotaj) {\
		if (porabotaj[irabota] == false) \
			porabotaj[irabota] = true;\
	}\
	bi2_vreporter();\
};\
";

bi2_code += "\
bi2_vybzap_f = function () {\
	for (irabota in porabotaj) {\
		if ((irabota <= 102)||(irabota > 110))\
		    continue;\
		if (porabotaj[irabota]==false)\
		    continue;\
		porabotaj[irabota]=false;\
		rabota=raboty[irabota];\
		if (!rabota)\
			{continue; }\
		for (ii = bi2_types.length - 1; ii >= 0; --ii) {\
			for (jj = nabory.length - 1; jj >= 0; --jj) {\
				vyborka[bi2_types[ii]][nabory[jj]]=null;\
			}\
			for (jj=vyborka[bi2_types[ii]].simple.n-1;jj>=0;--jj)\
				vyborka[bi2_types[ii]].simple.spisok[jj]=null;\
			vyborka[bi2_types[ii]].simple.n = 1;\
			vyborka[bi2_types[ii]].simple.spisok[0] = {price:0, tid:0, navyki:{}, health:0};\
			for (oo in rabota.navyki){\
			    vyborka[bi2_types[ii]].simple.spisok[0].navyki[oo] = 0;\
			}\
		}\
		for (i = bi2_aktiv.length-1; i >= 0; --i) {\
			rekurs_time-=50;\
			cid = bi2_aktiv[i];\
			vesch = items[cid];\
			ctype = vesch.type;\
			ochki = 0;\
			cnavyki = {};\
			for (oo in rabota.navyki){\
			    cnavyki[oo] = summa_ochkov3(vesch.bonus, oo);\
			    ochki += cnavyki[oo];\
			}\
			chealth = summa_ochkov3(vesch.bonus, 'health');\
			ochki += chealth;\
			tsena = (bi2_uchet[cid]|| bi2_khochuka[cid] || (vesch.shop != 'shop')) ? 0 : vesch.price;\
			if (vesch.set.key) {\
				vyborka[ctype][vesch.set.key]={navyki:{}, price:tsena, tid:cid, health:chealth};\
    			for (oo in rabota.navyki){\
	    		    vyborka[ctype][vesch.set.key].navyki[oo] = cnavyki[oo];\
			    }\
			}\
    		if (ochki > 0){\
				hm = []; iz=true;\
    			for (kk = vyborka[ctype].simple.n-1; kk >= 0; --kk) {\
	    			im = 0;\
		    		ib = 0;\
			    	for (oo in rabota.navyki){\
    			    	if (vyborka[ctype].simple.spisok[kk].navyki[oo] < cnavyki[oo]) {ib++}\
	    			    else {if (vyborka[ctype].simple.spisok[kk].navyki[oo] > cnavyki[oo]) {im++}};\
			    	}\
			    	if (vyborka[ctype].simple.spisok[kk].health < chealth) {ib++}\
    			    else {if (vyborka[ctype].simple.spisok[kk].health > chealth) {im++}};\
    			    \
				    if (!bi2_millioner){\
				        if (vyborka[ctype].simple.spisok[kk].price > tsena) {ib++}\
				        else {if (vyborka[ctype].simple.spisok[kk].price < tsena) {im++}}\
				    }\
				    if (ib==0) {iz=false}\
				    else if (im==0){hm.push(kk)}\
			    }\
			    if (iz) {\
				    nn = vyborka[ctype].simple.n;\
					vyborka[ctype].simple.spisok[nn] = {};\
    				vyborka[ctype].simple.spisok[nn].health = chealth;\
	    			vyborka[ctype].simple.spisok[nn].price = tsena;\
		    		vyborka[ctype].simple.spisok[nn].tid = cid;\
		    		vyborka[ctype].simple.spisok[nn].navyki={};\
		    		for (oo in rabota.navyki){\
		    		    vyborka[ctype].simple.spisok[nn].navyki[oo] = cnavyki[oo];\
		    		}\
					vyborka[ctype].simple.n += 1;\
    				while (hm.length > 0){\
    				    zh = hm.pop();\
    				    vyborka[ctype].simple.spisok[zh].tid = -1;\
    				}\
			        for (ll = vyborka[ctype].simple.n-1;ll>=0; ){\
			            if (vyborka[ctype].simple.spisok[ll].tid== -1){\
    		    			for (kk = ll; kk < vyborka[ctype].simple.n - 1; ++kk) {\
	        	    			vyborka[ctype].simple.spisok[kk].health = vyborka[ctype].simple.spisok[kk+1].health;\
			            		vyborka[ctype].simple.spisok[kk].price = vyborka[ctype].simple.spisok[kk+1].price;\
				            	vyborka[ctype].simple.spisok[kk].tid = vyborka[ctype].simple.spisok[kk+1].tid;\
				            	vyborka[ctype].simple.spisok[kk].navyki={};\
            		    		for (oo in rabota.navyki){\
		                		    vyborka[ctype].simple.spisok[kk].navyki[oo] = vyborka[ctype].simple.spisok[kk+1].navyki[oo];\
		                		}\
	        			    }\
			        		kk = vyborka[ctype].simple.n - 1;\
        					vyborka[ctype].simple.spisok[kk].health = null;\
                			vyborka[ctype].simple.spisok[kk].price = null;\
	    		    	    vyborka[ctype].simple.spisok[kk].tid = null;\
           		    		for (oo in rabota.navyki){\
	                		    vyborka[ctype].simple.spisok[kk].navyki[oo] = null;\
	                		}\
	    		    	    vyborka[ctype].simple.spisok[kk].navyki = null;\
	        		    	vyborka[ctype].simple.spisok[kk] = null;\
			        	    vyborka[ctype].simple.n -= 1;\
			            }\
			            else{\
			                --ll;\
			            }\
			        }\
			    }\
		    }\
		}\
		for (ii = bi2_types.length - 1; ii >= 0; --ii) {\
			for (jj = nabory.length - 1; jj >= 0; --jj) {\
				if (vyborka[bi2_types[ii]][nabory[jj]]){\
					dvazhdy = -1;\
					sid = vyborka[bi2_types[ii]][nabory[jj]].tid;\
					for (kk = vyborka[bi2_types[ii]].simple.n - 1; kk >= 0; --kk)\
						if (vyborka[bi2_types[ii]].simple.spisok[kk].tid == sid)\
							dvazhdy = kk;\
					if (dvazhdy < 0) {\
						nn = vyborka[bi2_types[ii]].simple.n;\
						vyborka[bi2_types[ii]].simple.spisok[nn] = {};\
						vyborka[bi2_types[ii]].simple.spisok[nn].health = vyborka[bi2_types[ii]][nabory[jj]].health;\
						vyborka[bi2_types[ii]].simple.spisok[nn].price = vyborka[bi2_types[ii]][nabory[jj]].price;\
						vyborka[bi2_types[ii]].simple.spisok[nn].tid = vyborka[bi2_types[ii]][nabory[jj]].tid;\
						vyborka[bi2_types[ii]].simple.spisok[nn].nabor = nabory[jj];\
						vyborka[bi2_types[ii]].simple.spisok[nn].navyki = {};\
       		    		for (oo in rabota.navyki){\
                		    vyborka[bi2_types[ii]].simple.spisok[nn].navyki[oo] = vyborka[bi2_types[ii]][nabory[jj]].navyki[oo];\
                 		}\
						vyborka[bi2_types[ii]].simple.n += 1;\
					}\
					else {\
						vyborka[bi2_types[ii]].simple.spisok[dvazhdy].nabor = nabory[jj];\
					}\
				}\
			}\
		}\
        for (ii=bi2_types.length-1; ii>=0; --ii){\
            i_slot[ii]=0;\
            i_slot_max[ii] = vyborka[bi2_types[ii]].simple.n;\
        }\
		samoe_ono = {};\
		deneg_ushlo = 0;\
		for (ii = 0; ii < nabory.length; ++ii)\
			bi2_predmetov[nabory[ii]] = 0;\
		bi2_tonavyki = {};\
		for (oo in rabota.navyki){\
			bi2_tonavyki[oo] = pers.skills[oo];\
		}\
		bi2_tohealth = pers.skills.health;\
		samoe_ono.to = 0;\
		samoe_ono.price=-1;\
		samoe_ono.health = 0;\
		for (ii = nabory.length-1; ii >= 0; --ii) {\
			for (jj = 6; jj > 0; --jj) {\
				t_nab = komplekty[nabory[ii]][jj];\
				komp_fort[nabory[ii]][jj] = {};\
				komp_fort[nabory[ii]][jj].navyki={};\
				for (oo in rabota.navyki){\
				    komp_fort[nabory[ii]][jj].navyki[oo] = summa_ochkov3(t_nab.bonus, oo);\
				}\
				komp_fort[nabory[ii]][jj].health = summa_ochkov3(t_nab.bonus, 'health');\
			}\
		}\
		rekurs_time-=500;\
		ii_rekur=0;\
		window.setTimeout(bi2_rekurs_f, rekurs_delay/5);\
		return;\
    }\
	for (irabota in porabotaj) {\
		if (porabotaj[irabota] == false)\
			porabotaj[irabota] = true;\
	}\
    bi2_reporter();\
};\
";

bi2_code += "\
bi2_rekurs_f = function (){\
    if (rekurs_time>15000) rekurs_time=10000;\
    nn = bi2_types.length;\
    rabota=raboty[irabota];\
    for (ii = ii_rekur; ii >= 0; )\
    {\
        if (--rekurs_time <= 0){\
            ii_rekur = ii;\
            rekurs_time = 20000;\
            ++rekurs_step;\
           	new HumanMessage('Перебор вещей продолжается, шаг №'+rekurs_step, {type: 'success'});\
            window.setTimeout(bi2_rekurs_f, rekurs_delay);\
            return 1;\
        }\
        if (i_slot[ii] >= i_slot_max[ii]){\
            if (--ii >= 0){\
                deneg_ushlo -= ic_obj[ii].price;\
           		for (oo in rabota.navyki){\
    	            bi2_tonavyki[oo] -= ic_obj[ii].navyki[oo];\
		        }\
                bi2_tohealth -= ic_obj[ii].health;\
    	    	if (ic_obj[ii].nabor) {\
	    	    	bi2_predmetov[ic_obj[ii].nabor] -= 1;\
	    	    }\
	    	    i_slot[ii]+=1;\
            }\
    	    continue;\
        }\
        deb_v = vyborka[bi2_types[ii]].simple.spisok;\
        ic_obj[ii] = deb_v[i_slot[ii]];\
        deneg_ushlo += ic_obj[ii].price;\
        if (deneg_ushlo <= bablo)\
        {\
			if (ic_obj[ii].nabor) {\
    			bi2_predmetov[ic_obj[ii].nabor] += 1;\
	    	}\
 		    bi2_tohealth += ic_obj[ii].health;\
       		for (oo in rabota.navyki){\
	            bi2_tonavyki[oo] += ic_obj[ii].navyki[oo];\
	        }\
		    if (++ii == nn){\
    			ton = {};\
    			ton.navyki={};\
    			ton.health=0;\
    			for (oo in rabota.navyki){\
    			    ton.navyki[oo]=0;\
    			}\
	    		for (inabor = nabory.length - 1; inabor >= 0; --inabor) \
		    		if (bi2_predmetov[nabory[inabor]] > 1) {\
			    		ton.health += komp_fort[nabory[inabor]][bi2_predmetov[nabory[inabor]]].health;\
			    		for (oo in rabota.navyki){\
			    		    ton.navyki[oo] += komp_fort[nabory[inabor]][bi2_predmetov[nabory[inabor]]].navyki[oo];\
			    		}\
				    }\
    			\
    			bi2_tohealth += ton.health;\
    			for (oo in rabota.navyki){\
    			    bi2_tonavyki[oo] += ton.navyki[oo]\
    			}\
    			cto = 0;\
    			for (oo in rabota.navyki){\
    			    cto += bi2_s2f_bonus(bi2_tonavyki[oo])*rabota.navyki[oo];\
    			}\
			if (bi2_tohealth >= bi2_zdorov)\
	    		if ((samoe_ono.to < cto)||((samoe_ono.to == cto)&&(samoe_ono.health<bi2_tohealth))) {\
		    		samoe_ono.to = cto;\
				    samoe_ono.price=deneg_ushlo;\
				    samoe_ono.health = bi2_tohealth;\
				    for (jj = nn - 1; jj >= 0; --jj) {\
					    samoe_ono[bi2_types[jj]] = i_slot[jj];\
				    }\
    			}\
			\
    			bi2_tohealth -= ton.health;\
    			for (oo in rabota.navyki){\
    			    bi2_tonavyki[oo] -= ton.navyki[oo]\
    			}\
			    --ii;\
                deneg_ushlo -= ic_obj[ii].price;\
           		for (oo in rabota.navyki){\
    	            bi2_tonavyki[oo] -= ic_obj[ii].navyki[oo];\
		        }\
                bi2_tohealth -= ic_obj[ii].health;\
    	    	if (ic_obj[ii].nabor) {\
	    	    	bi2_predmetov[ic_obj[ii].nabor] -= 1;\
	    	    }\
	    	    i_slot[ii]+=1;\
                continue;\
		    }\
		    else{\
		        i_slot[ii]=0;\
		        continue;\
		    }\
        }\
        else{\
            deneg_ushlo -= ic_obj[ii].price;\
            i_slot[ii]+=1;\
            continue;\
        }\
    }\
\
		resultaty[irabota] = {};\
		samoe_ono.to=Math.round(samoe_ono.to*10)/10;\
		resultaty[irabota].to = samoe_ono.to;\
		resultaty[irabota].ton = 0;\
		resultaty[irabota].price = samoe_ono.price;\
		raboty[irabota].resultaty.to = samoe_ono.to;\
		resultaty[irabota].items = [];\
		for (i = 0; i < bi2_types.length; ++i) {\
		if (samoe_ono.price >= 0) {\
			vvv = vyborka[bi2_types[i]].simple.spisok[samoe_ono[bi2_types[i]]];\
		}else{vvv = 0};\
			resultaty[irabota].items[i] = {};\
			resultaty[irabota].items[i].tid = vvv.tid;\
			resultaty[irabota].items[i].bon = 0;\
			resultaty[irabota].items[i].price = vvv.price;\
		}\
            rabnavyki[irabota]={};\
		resultaty[irabota].to=0;\
		resultaty[irabota].ton=0;\
            for (num_index in raboty[irabota].navyki){\
                temp_n = {};\
                temp_n[num_index]=1;\
                val=summa_ochkov2(pers.skills,temp_n);\
                temp_u = {};\
                for (ee = bi2_types.length-1;ee>=0;--ee){\
                    sid = resultaty[irabota].items[ee].tid;\
                    if (sid > 0){\
                        val+=summa_ochkov(items[sid].bonus,temp_n);\
                        temp_k = items[sid].set.key;\
                        if (temp_k){\
                            if (temp_u[temp_k])\
                                temp_u[temp_k]+=1;\
                            else\
                                temp_u[temp_k]=1;\
                        }\
                    }\
                } \
                for (uu = nabory.length - 1; uu>=0; --uu){\
                    if (temp_u[nabory[uu]]>1){\
                        bn = komplekty[nabory[uu]][temp_u[nabory[uu]]].bonus;\
                        val+=summa_ochkov(bn,temp_n);\
                    }\
                }\
                rabnavyki[irabota][num_index]={};\
                rabnavyki[irabota][num_index].name=pers.skill_titles[num_index];\
                rabnavyki[irabota][num_index].znach = val;\
                rabnavyki[irabota][num_index].mul = raboty[irabota].navyki[num_index];\
		vvv = bi2_s2f_bonus(val);\
		if (num_index!='aim') {resultaty[irabota].ton+=vvv};\
		if (num_index!='dodge') {resultaty[irabota].to+=vvv};\
            }\
		resultaty[irabota].ton = Math.round(resultaty[irabota].ton*10)/10;\
		resultaty[irabota].to = Math.round(resultaty[irabota].to*10+resultaty[irabota].ton*10)/10;\
            temp_n = {};\
            temp_n.health=1;\
            val=summa_ochkov2(pers.skills,temp_n);\
            temp_u = {};\
            for (ee = bi2_types.length-1;ee>=0;--ee){\
                sid = resultaty[irabota].items[ee].tid;\
                if (sid > 0){\
                    val+=summa_ochkov(items[sid].bonus,temp_n);\
                    temp_k = items[sid].set.key;\
                    if (temp_k){\
                        if (temp_u[temp_k])\
                            temp_u[temp_k]+=1;\
                        else\
                            temp_u[temp_k]=1;\
                    }\
                }\
            } \
            for (uu = nabory.length - 1; uu>=0; --uu){\
                if (temp_u[nabory[uu]]>1){\
                    bn = komplekty[nabory[uu]][temp_u[nabory[uu]]].bonus;\
                    val+=summa_ochkov(bn,temp_n);\
                }\
            }\
            rabnavyki[irabota].health={};\
            rabnavyki[irabota].health.name=pers.skill_titles.health;\
            rabnavyki[irabota].health.znach = val;\
            rabnavyki[irabota].health.mul = 1;\
    bi2_vybzap_f();\
};\
";

bi2_code += "\
bi2_vybzap = function () {\
	for (irabota in porabotaj) {\
		if (porabotaj[irabota]==false)\
		    continue;\
		porabotaj[irabota]=false;\
		rabota=raboty[irabota];\
		if (!rabota)\
			{continue; }\
		if ((irabota>102)&&(irabota<120))\
		    continue;\
		for (ii = bi2_types.length - 1; ii >= 0; --ii) {\
			for (jj = nabory.length - 1; jj >= 0; --jj) {\
				vyborka[bi2_types[ii]][nabory[jj]]=null;\
			}\
			for (jj=vyborka[bi2_types[ii]].simple.n-1;jj>=0;--jj)\
				vyborka[bi2_types[ii]].simple.spisok[jj]=null;\
			vyborka[bi2_types[ii]].simple.n = 1;\
			vyborka[bi2_types[ii]].simple.spisok[0] = {bon:0, price:0, tid:0};\
		}\
		\
		for (i = bi2_aktiv.length-1; i >= 0; --i) {\
			rekurs_time-=50;\
			cid = bi2_aktiv[i];\
			vesch = items[cid];\
			ctype = vesch.type;\
			ochki = summa_ochkov(vesch.bonus, rabota.navyki);\
			tsena = (bi2_uchet[cid] || bi2_khochuka[cid] || (vesch.shop != 'shop')) ? 0 : vesch.price;\
			if (vesch.set.key) {\
				vyborka[ctype][vesch.set.key]={bon:ochki, price:tsena, tid:cid};\
			}\
    		if (ochki > 0){\
				hm = []; iz=true;\
    			for (kk = vyborka[ctype].simple.n-1; kk >= 0; --kk) {\
	    			im = 0;\
		    		ib = 0;\
			    	if (vyborka[ctype].simple.spisok[kk].bon < ochki) {ib++}\
				    else {if (vyborka[ctype].simple.spisok[kk].bon > ochki) {im++}}\
				    if (!bi2_millioner){\
				        if (vyborka[ctype].simple.spisok[kk].price > tsena) {ib++}\
				        else {if (vyborka[ctype].simple.spisok[kk].price < tsena) {im++}}\
				    }\
				    if ((im==0)&&(ib==0)){\
						v2=items[vyborka[ctype].simple.spisok[kk].tid];\
						def2=summa_ochkov(v2.bonus, all_def.navyki);\
						def1=summa_ochkov(vesch.bonus, all_def.navyki);\
						if (def1>def2) ++ib;\
				    }\
				    if (ib==0) {iz=false}\
				    else if (im==0){hm.push(kk)}\
			    }\
			    if (iz) {\
				    nn = vyborka[ctype].simple.n;\
					vyborka[ctype].simple.spisok[nn] = {};\
    				vyborka[ctype].simple.spisok[nn].bon = ochki;\
	    			vyborka[ctype].simple.spisok[nn].price = tsena;\
		    		vyborka[ctype].simple.spisok[nn].tid = cid;\
					vyborka[ctype].simple.n += 1;\
    				while (hm.length > 0){\
    				    zh = hm.pop();\
    				    vyborka[ctype].simple.spisok[zh].tid = -1;\
    				}\
			        for (ll = vyborka[ctype].simple.n-1;ll>=0; ){\
			            if (vyborka[ctype].simple.spisok[ll].tid== -1){\
    		    			for (kk = ll; kk < vyborka[ctype].simple.n - 1; ++kk) {\
	        	    			vyborka[ctype].simple.spisok[kk].bon = vyborka[ctype].simple.spisok[kk+1].bon;\
			            		vyborka[ctype].simple.spisok[kk].price = vyborka[ctype].simple.spisok[kk+1].price;\
				            	vyborka[ctype].simple.spisok[kk].tid = vyborka[ctype].simple.spisok[kk+1].tid;\
	        			    }\
			        		kk = vyborka[ctype].simple.n - 1;\
        					vyborka[ctype].simple.spisok[kk].bon = null;\
                			vyborka[ctype].simple.spisok[kk].price = null;\
	    		    	    vyborka[ctype].simple.spisok[kk].tid = null;\
	        		    	vyborka[ctype].simple.spisok[kk] = null;\
			        	    vyborka[ctype].simple.n -= 1;\
			            }\
			            else{\
			                --ll;\
			            }\
			        }\
			    }\
		    }\
		}\
		for (ii = bi2_types.length - 1; ii >= 0; --ii) {\
			for (jj = nabory.length - 1; jj >= 0; --jj) {\
				if (vyborka[bi2_types[ii]][nabory[jj]]) {\
					dvazhdy = -1;\
					sid = vyborka[bi2_types[ii]][nabory[jj]].tid;\
					for (kk = vyborka[bi2_types[ii]].simple.n - 1; kk >= 0; --kk)\
						if (vyborka[bi2_types[ii]].simple.spisok[kk].tid == sid)\
							dvazhdy = kk;\
					if (dvazhdy < 0) {\
						nn = vyborka[bi2_types[ii]].simple.n;\
						vyborka[bi2_types[ii]].simple.spisok[nn] = {};\
						vyborka[bi2_types[ii]].simple.spisok[nn].bon = vyborka[bi2_types[ii]][nabory[jj]].bon;\
						vyborka[bi2_types[ii]].simple.spisok[nn].price = vyborka[bi2_types[ii]][nabory[jj]].price;\
						vyborka[bi2_types[ii]].simple.spisok[nn].tid = vyborka[bi2_types[ii]][nabory[jj]].tid;\
						vyborka[bi2_types[ii]].simple.spisok[nn].nabor = nabory[jj];\
						vyborka[bi2_types[ii]].simple.n += 1;\
					}\
					else {\
						vyborka[bi2_types[ii]].simple.spisok[dvazhdy].nabor = nabory[jj];\
					}\
				}\
			}\
		}\
		samoe_ono = {};\
		deneg_ushlo = 0;\
		for (ii = 0; ii < nabory.length; ++ii) \
			bi2_predmetov[nabory[ii]] = 0;\
		psk = summa_ochkov2(pers.skills, rabota.navyki);\
		if (isNaN(psk)) psk=0;\
		bi2_to= psk - rabota.malus;\
		samoe_ono.to= bi2_to;\
		samoe_ono.ton=0;\
		samoe_ono.price=-1;\
		for (ii = nabory.length-1; ii >= 0; --ii) {\
			for (jj = 6; jj > 0; --jj) {\
				t_nab = komplekty[nabory[ii]][jj];\
				ton = summa_ochkov(t_nab.bonus, rabota.navyki);\
				if (t_nab.raboty[irabota]) \
					ton += t_nab.raboty[irabota];\
				komp_rab[nabory[ii]][jj] = ton;\
			}\
		}\
        for (ii=bi2_types.length-1; ii>=0; --ii){\
            i_slot[ii]=0;\
            i_slot_max[ii] = vyborka[bi2_types[ii]].simple.n;\
        }\
        rekurs_time-=500;\
        ii_rekur=0;\
		window.setTimeout(bi2_rekurs, rekurs_delay/5);\
		return;\
    }\
	for (irabota in porabotaj) {\
		if (porabotaj[irabota] == false) \
			porabotaj[irabota] = true;\
	}\
    bi2_vybzap_z();\
};\
";

bi2_code += "\
bi2_vybzap_z = function () {\
	for (irabota in porabotaj) {\
	    if (!zaschita)  continue;\
		if (porabotaj[irabota]==false)\
		    continue;\
		porabotaj[irabota]=false;\
		rabota=raboty[irabota];\
		if (!rabota)\
			{continue;}\
		if ((irabota>102)&&(irabota<120))\
		    continue;\
		if (!resultaty[irabota]){\
		    resultaty_z[irabota]=null;\
		    continue;\
		}\
		for (ii = bi2_types.length - 1; ii >= 0; --ii) {\
			for (jj = nabory.length - 1; jj >= 0; --jj) {\
				vyborka_z[bi2_types[ii]][nabory[jj]]=null;\
			}\
			for (jj=vyborka_z[bi2_types[ii]].simple.n-1;jj>=0;--jj)\
				vyborka_z[bi2_types[ii]].simple.spisok[jj]=null;\
			vyborka_z[bi2_types[ii]].simple.n = 1;\
			vyborka_z[bi2_types[ii]].simple.spisok[0] = {bon:0, zas:0, price:0, tid:0};\
		}\
		if (resultaty[irabota].to >= zaschita.to){\
		for (i = bi2_aktiv.length-1; i >= 0; --i) {\
			rekurs_time-=50;\
			cid = bi2_aktiv[i];\
			vesch = items[cid];\
			ctype = vesch.type;\
			ochki = summa_ochkov(vesch.bonus, rabota.navyki);\
			zas = summa_ochkov(vesch.bonus, zaschita.navyki);\
			tsena = (bi2_uchet[cid] || bi2_khochuka[cid] || (vesch.shop != 'shop')) ? 0 : vesch.price;\
			if (vesch.set.key) {\
				vyborka_z[ctype][vesch.set.key]={bon:ochki, zas:zas, price:tsena, tid:cid};\
			}\
    		if ((ochki > 0)||(zas > 0)){\
				hm = []; iz=true;\
    			for (kk = vyborka_z[ctype].simple.n-1; kk >= 0; --kk) {\
	    			im = 0;\
		    		ib = 0;\
			    	if (vyborka_z[ctype].simple.spisok[kk].bon < ochki) {ib++}\
				    else {if (vyborka_z[ctype].simple.spisok[kk].bon > ochki) {im++}}\
			    	if (vyborka_z[ctype].simple.spisok[kk].zas < zas) {ib++}\
				    else {if (vyborka_z[ctype].simple.spisok[kk].zas > zas) {im++}}\
				    if (!bi2_millioner){\
				        if (vyborka_z[ctype].simple.spisok[kk].price > tsena) {ib++}\
				        else {if (vyborka_z[ctype].simple.spisok[kk].price < tsena) {im++}}\
				    }\
				    if (ib==0) {iz=false}\
				    else if (im==0){hm.push(kk)}\
			    }\
			    if (iz) {\
				    nn = vyborka_z[ctype].simple.n;\
					vyborka_z[ctype].simple.spisok[nn] = {};\
    				vyborka_z[ctype].simple.spisok[nn].bon = ochki;\
	    			vyborka_z[ctype].simple.spisok[nn].price = tsena;\
		    		vyborka_z[ctype].simple.spisok[nn].tid = cid;\
		    		vyborka_z[ctype].simple.spisok[nn].zas = zas;\
					vyborka_z[ctype].simple.n += 1;\
    				while (hm.length > 0){\
    				    zh = hm.pop();\
    				    vyborka_z[ctype].simple.spisok[zh].tid = -1;\
    				}\
			        for (ll = vyborka_z[ctype].simple.n-1;ll>=0; ){\
			            if (vyborka_z[ctype].simple.spisok[ll].tid== -1){\
    		    			for (kk = ll; kk < vyborka_z[ctype].simple.n - 1; ++kk) {\
	        	    			vyborka_z[ctype].simple.spisok[kk].bon = vyborka_z[ctype].simple.spisok[kk+1].bon;\
			            		vyborka_z[ctype].simple.spisok[kk].price = vyborka_z[ctype].simple.spisok[kk+1].price;\
				            	vyborka_z[ctype].simple.spisok[kk].tid = vyborka_z[ctype].simple.spisok[kk+1].tid;\
				            	vyborka_z[ctype].simple.spisok[kk].zas = vyborka_z[ctype].simple.spisok[kk+1].zas;\
	        			    }\
			        		kk = vyborka_z[ctype].simple.n - 1;\
        					vyborka_z[ctype].simple.spisok[kk].bon = null;\
                			vyborka_z[ctype].simple.spisok[kk].price = null;\
	    		    	    vyborka_z[ctype].simple.spisok[kk].tid = null;\
	    		    	    vyborka_z[ctype].simple.spisok[kk].zas = null;\
	        		    	vyborka_z[ctype].simple.spisok[kk] = null;\
			        	    vyborka_z[ctype].simple.n -= 1;\
			            }\
			            else{\
			                --ll;\
			            }\
			        }\
			    }\
		    }\
		}}\
		for (ii = bi2_types.length - 1; ii >= 0; --ii) {\
			for (jj = nabory.length - 1; jj >= 0; --jj) {\
				if (vyborka_z[bi2_types[ii]][nabory[jj]]) {\
					dvazhdy = -1;\
					sid = vyborka_z[bi2_types[ii]][nabory[jj]].tid;\
					for (kk = vyborka_z[bi2_types[ii]].simple.n - 1; kk >= 0; --kk)\
						if (vyborka_z[bi2_types[ii]].simple.spisok[kk].tid == sid)\
							dvazhdy = kk;\
					if (dvazhdy < 0) {\
						nn = vyborka_z[bi2_types[ii]].simple.n;\
						vyborka_z[bi2_types[ii]].simple.spisok[nn] = {};\
						vyborka_z[bi2_types[ii]].simple.spisok[nn].bon = vyborka_z[bi2_types[ii]][nabory[jj]].bon;\
						vyborka_z[bi2_types[ii]].simple.spisok[nn].price = vyborka_z[bi2_types[ii]][nabory[jj]].price;\
						vyborka_z[bi2_types[ii]].simple.spisok[nn].tid = vyborka_z[bi2_types[ii]][nabory[jj]].tid;\
						vyborka_z[bi2_types[ii]].simple.spisok[nn].zas = vyborka_z[bi2_types[ii]][nabory[jj]].zas;\
						vyborka_z[bi2_types[ii]].simple.spisok[nn].nabor = nabory[jj];\
						vyborka_z[bi2_types[ii]].simple.n += 1;\
					}\
					else {\
						vyborka_z[bi2_types[ii]].simple.spisok[dvazhdy].nabor = nabory[jj];\
					}\
				}\
			}\
		}\
		samoe_ono = {};\
		deneg_ushlo = 0;\
		for (ii = 0; ii < nabory.length; ++ii) \
			bi2_predmetov[nabory[ii]] = 0;\
		bi2_to= summa_ochkov2(pers.skills, rabota.navyki) - rabota.malus - zaschita.to;\
		bi2_zas=0;\
		samoe_ono.to= bi2_to;\
		samoe_ono.price=-1;\
		samoe_ono.zas=bi2_zas;\
		for (ii = nabory.length-1; ii >= 0; --ii) {\
			for (jj = 6; jj > 0; --jj) {\
				t_nab = komplekty[nabory[ii]][jj];\
				ton = summa_ochkov(t_nab.bonus, rabota.navyki);\
				if (t_nab.raboty[irabota]) \
					ton += t_nab.raboty[irabota];\
				komp_rab[nabory[ii]][jj] = ton;\
				zan = summa_ochkov(t_nab.bonus, zaschita.navyki);\
				komp_zas[nabory[ii]][jj] = zan;\
			}\
		}\
        for (ii=bi2_types.length-1; ii>=0; --ii){\
            i_slot[ii]=0;\
            i_slot_max[ii] = vyborka_z[bi2_types[ii]].simple.n;\
        }\
        rekurs_time-=500;\
        ii_rekur=0;\
		window.setTimeout(bi2_rekurs_z, rekurs_delay/5);\
		return;\
    }\
	for (irabota in porabotaj) {\
		if (porabotaj[irabota] == false) \
			porabotaj[irabota] = true;\
	}\
    bi2_vybzap_r();\
};\
";

bi2_code += "\
bi2_vybzap_r = function () {\
	for (irabota in porabotaj) {\
		if (porabotaj[irabota]==false)\
		    continue;\
		porabotaj[irabota]=false;\
		if (((irabota>102)||(!ezda))&&(irabota!=111))\
		    continue;\
		rabota=raboty[irabota];\
		if (!rabota)\
			{continue;}\
		if ((irabota!=111)&&(!resultaty[irabota])){\
		    resultaty_r[irabota]=null;\
		    continue;\
		}\
		for (ii = bi2_types.length - 1; ii >= 0; --ii) {\
			for (jj = nabory.length - 1; jj >= 0; --jj) {\
				vyborka_r[bi2_types[ii]][nabory[jj]]=null;\
			}\
			for (jj=vyborka_r[bi2_types[ii]].simple.n-1;jj>=0;--jj)\
				vyborka_r[bi2_types[ii]].simple.spisok[jj]=null;\
			vyborka_r[bi2_types[ii]].simple.n = 1;\
			vyborka_r[bi2_types[ii]].simple.spisok[0] = {bon:0, ride:0, speed:1.0, price:0, tid:0};\
		}\
		if ((irabota==111)||(resultaty[irabota].to > 0)){\
		for (i = bi2_aktiv.length-1; i >= 0; --i) {\
			rekurs_time-=50;\
			cid = bi2_aktiv[i];\
			vesch = items[cid];\
			ctype = vesch.type;\
			ochki = summa_ochkov(vesch.bonus, rabota.navyki);\
			ride = summa_ochkov3(vesch.bonus, 'ride');\
			speed = (vesch.speed)?vesch.speed:1.0;\
			tsena = (bi2_uchet[cid] || bi2_khochuka[cid] || (vesch.shop != 'shop')) ? 0 : vesch.price;\
			if (vesch.set.key) {\
				vyborka_r[ctype][vesch.set.key]={bon:ochki, ride:ride, speed:speed, price:tsena, tid:cid};\
			}\
    		if ((ochki > 0)||(ride > 0)||(speed<1.0)){\
				hm = []; iz=true;\
    			for (kk = vyborka_r[ctype].simple.n-1; kk >= 0; --kk) {\
	    			im = 0;\
		    		ib = 0;\
			    	if (vyborka_r[ctype].simple.spisok[kk].bon < ochki) {ib++}\
				    else {if (vyborka_r[ctype].simple.spisok[kk].bon > ochki) {im++}}\
			    	if (vyborka_r[ctype].simple.spisok[kk].ride < ride) {ib++}\
				    else {if (vyborka_r[ctype].simple.spisok[kk].ride > ride) {im++}}\
			        if (vyborka_r[ctype].simple.spisok[kk].speed > speed) {ib++}\
			        else {if (vyborka_r[ctype].simple.spisok[kk].speed < speed) {im++}}\
				    if (!bi2_millioner){\
				        if (vyborka_r[ctype].simple.spisok[kk].price > tsena) {ib++}\
				        else {if (vyborka_r[ctype].simple.spisok[kk].price < tsena) {im++}}\
				    }\
				    if (ib==0) {iz=false}\
				    else if (im==0){hm.push(kk)}\
			    }\
			    if (iz) {\
				    nn = vyborka_r[ctype].simple.n;\
					vyborka_r[ctype].simple.spisok[nn] = {};\
    				vyborka_r[ctype].simple.spisok[nn].bon = ochki;\
	    			vyborka_r[ctype].simple.spisok[nn].price = tsena;\
		    		vyborka_r[ctype].simple.spisok[nn].tid = cid;\
		    		vyborka_r[ctype].simple.spisok[nn].ride = ride;\
		    		vyborka_r[ctype].simple.spisok[nn].speed = speed;\
					vyborka_r[ctype].simple.n += 1;\
    				while (hm.length > 0){\
    				    zh = hm.pop();\
    				    vyborka_r[ctype].simple.spisok[zh].tid = -1;\
    				}\
			        for (ll = vyborka_r[ctype].simple.n-1;ll>=0; ){\
			            if (vyborka_r[ctype].simple.spisok[ll].tid== -1){\
    		    			for (kk = ll; kk < vyborka_r[ctype].simple.n - 1; ++kk) {\
	        	    			vyborka_r[ctype].simple.spisok[kk].bon = vyborka_r[ctype].simple.spisok[kk+1].bon;\
			            		vyborka_r[ctype].simple.spisok[kk].price = vyborka_r[ctype].simple.spisok[kk+1].price;\
				            	vyborka_r[ctype].simple.spisok[kk].tid = vyborka_r[ctype].simple.spisok[kk+1].tid;\
				            	vyborka_r[ctype].simple.spisok[kk].ride = vyborka_r[ctype].simple.spisok[kk+1].ride;\
				            	vyborka_r[ctype].simple.spisok[kk].speed = vyborka_r[ctype].simple.spisok[kk+1].speed;\
	        			    }\
			        		kk = vyborka_r[ctype].simple.n - 1;\
        					vyborka_r[ctype].simple.spisok[kk].bon = null;\
                			vyborka_r[ctype].simple.spisok[kk].price = null;\
	    		    	    vyborka_r[ctype].simple.spisok[kk].tid = null;\
	    		    	    vyborka_r[ctype].simple.spisok[kk].ride = null;\
	    		    	    vyborka_r[ctype].simple.spisok[kk].speed = null;\
	        		    	vyborka_r[ctype].simple.spisok[kk] = null;\
			        	    vyborka_r[ctype].simple.n -= 1;\
			            }\
			            else{\
			                --ll;\
			            }\
			        }\
			    }\
		    }\
		}}\
		for (ii = bi2_types.length - 1; ii >= 0; --ii) {\
			for (jj = nabory.length - 1; jj >= 0; --jj) {\
				if (vyborka_r[bi2_types[ii]][nabory[jj]]) {\
					dvazhdy = -1;\
					sid = vyborka_r[bi2_types[ii]][nabory[jj]].tid;\
					for (kk = vyborka_r[bi2_types[ii]].simple.n - 1; kk >= 0; --kk)\
						if (vyborka_r[bi2_types[ii]].simple.spisok[kk].tid == sid)\
							dvazhdy = kk;\
					if (dvazhdy < 0) {\
						nn = vyborka_r[bi2_types[ii]].simple.n;\
						vyborka_r[bi2_types[ii]].simple.spisok[nn] = {};\
						vyborka_r[bi2_types[ii]].simple.spisok[nn].bon = vyborka_r[bi2_types[ii]][nabory[jj]].bon;\
						vyborka_r[bi2_types[ii]].simple.spisok[nn].price = vyborka_r[bi2_types[ii]][nabory[jj]].price;\
						vyborka_r[bi2_types[ii]].simple.spisok[nn].tid = vyborka_r[bi2_types[ii]][nabory[jj]].tid;\
						vyborka_r[bi2_types[ii]].simple.spisok[nn].ride = vyborka_r[bi2_types[ii]][nabory[jj]].ride;\
						vyborka_r[bi2_types[ii]].simple.spisok[nn].speed = vyborka_r[bi2_types[ii]][nabory[jj]].speed;\
						vyborka_r[bi2_types[ii]].simple.spisok[nn].nabor = nabory[jj];\
						vyborka_r[bi2_types[ii]].simple.n += 1;\
					}\
					else {\
						vyborka_r[bi2_types[ii]].simple.spisok[dvazhdy].nabor = nabory[jj];\
					}\
				}\
			}\
		}\
		samoe_ono = {};\
		deneg_ushlo = 0;\
		for (ii = 0; ii < nabory.length; ++ii) \
			bi2_predmetov[nabory[ii]] = 0;\
		bi2_to= summa_ochkov2(pers.skills, rabota.navyki) - rabota.malus;\
		bi2_ride=0;\
		bi2_speed=1.0;\
		samoe_ono.to= bi2_to;\
		samoe_ono.price=-1;\
		samoe_ono.ride=bi2_ride;\
		samoe_ono.speed=100.0;\
		for (ii = nabory.length-1; ii >= 0; --ii) {\
			for (jj = 6; jj > 0; --jj) {\
				t_nab = komplekty[nabory[ii]][jj];\
				ton = summa_ochkov(t_nab.bonus, rabota.navyki);\
				if (t_nab.raboty[irabota]) \
					ton += t_nab.raboty[irabota];\
				komp_rab[nabory[ii]][jj] = ton;\
				komp_skor[nabory[ii]][jj] = {};\
				komp_skor[nabory[ii]][jj].ride = summa_ochkov3(t_nab.bonus, 'ride');\
				komp_skor[nabory[ii]][jj].speed = t_nab.speed?t_nab.speed:1.0;\
				\
			}\
		}\
        for (ii=bi2_types.length-1; ii>=0; --ii){\
            i_slot[ii]=0;\
            i_slot_max[ii] = vyborka_r[bi2_types[ii]].simple.n;\
        }\
        rekurs_time-=500;\
        ii_rekur=0;\
		window.setTimeout(bi2_rekurs_r, rekurs_delay/5);\
		return;\
    }\
	for (irabota in porabotaj) {\
		if (porabotaj[irabota] == false) \
			porabotaj[irabota] = true;\
	}\
    bi2_vybzap_f();\
};\
";

bi2_code += "\
bi2_rekurs = function (){\
    nn = bi2_types.length;\
    for (ii = ii_rekur; ii >= 0; )\
    {\
        if (--rekurs_time <= 0){\
            ii_rekur = ii;\
            rekurs_time = 50000;\
            ++rekurs_step;\
           	new HumanMessage('Перебор вещей продолжается, шаг №'+rekurs_step, {type: 'success'});\
            window.setTimeout(bi2_rekurs, rekurs_delay);\
            return 1;\
        }\
        if (i_slot[ii] >= i_slot_max[ii]){\
            if (--ii >= 0){\
                deneg_ushlo -= ic_obj[ii].price;\
                bi2_to -= ic_obj[ii].bon;\
    	    	if (ic_obj[ii].nabor) {\
	    	    	bi2_predmetov[ic_obj[ii].nabor] -= 1;\
	    	    }\
	    	    i_slot[ii]+=1;\
            }\
    	    continue;\
        }\
        deb_v = vyborka[bi2_types[ii]].simple.spisok;\
        ic_obj[ii] = deb_v[i_slot[ii]];\
        deneg_ushlo += ic_obj[ii].price;\
        if (deneg_ushlo <= bablo)\
        {\
			if (ic_obj[ii].nabor) {\
    			bi2_predmetov[ic_obj[ii].nabor] += 1;\
	    	}\
		    bi2_to += ic_obj[ii].bon;\
		    if (++ii == nn){\
    			ton = 0;\
	    		for (inabor = nabory.length - 1; inabor >= 0; --inabor) \
		    		if (bi2_predmetov[nabory[inabor]] > 1) {\
			    		ton += komp_rab[nabory[inabor]][bi2_predmetov[nabory[inabor]]]\
				    }\
    			bi2_to += ton;\
	    		if (samoe_ono.to < bi2_to) {\
		    		samoe_ono.to = bi2_to;\
			    	samoe_ono.ton = ton;\
				    samoe_ono.price=deneg_ushlo;\
				    for (jj = nn - 1; jj >= 0; --jj) {\
					    samoe_ono[bi2_types[jj]] = i_slot[jj];\
				    }\
    			}\
			    bi2_to -= ton;\
			    --ii;\
                deneg_ushlo -= ic_obj[ii].price;\
                bi2_to -= ic_obj[ii].bon;\
    	    	if (ic_obj[ii].nabor) {\
	    	    	bi2_predmetov[ic_obj[ii].nabor] -= 1;\
	    	    }\
	    	    i_slot[ii]+=1;\
                continue;\
		    }\
		    else{\
		        i_slot[ii]=0;\
		        continue;\
		    }\
        }\
        else{\
            deneg_ushlo -= ic_obj[ii].price;\
            i_slot[ii]+=1;\
            continue;\
        }\
    }\
\
		resultaty[irabota] = {};\
		resultaty[irabota].to = samoe_ono.to;\
		resultaty[irabota].ton = samoe_ono.ton;\
		resultaty[irabota].price = samoe_ono.price;\
		raboty[irabota].resultaty.to = samoe_ono.to;\
		resultaty[irabota].items = [];\
	if (samoe_ono.price >= 0) {\
		for (i = 0; i < bi2_types.length; ++i) {\
			vvv = vyborka[bi2_types[i]].simple.spisok[samoe_ono[bi2_types[i]]];\
			resultaty[irabota].items[i] = {};\
			resultaty[irabota].items[i].tid = vvv.tid;\
			resultaty[irabota].items[i].bon = vvv.bon;\
			resultaty[irabota].items[i].price = vvv.price;\
		}\
	}\
	else{\
		for (i = 0; i < bi2_types.length; ++i) {\
			resultaty[irabota].items[i] = {};\
			resultaty[irabota].items[i].tid = 0;\
			resultaty[irabota].items[i].bon = 0;\
			resultaty[irabota].items[i].price = 0;\
		}\
	}\
            rabnavyki[irabota]={};\
            for (num_index in raboty[irabota].navyki){\
                temp_n = {};\
                temp_n[num_index]=1;\
                val=summa_ochkov2(pers.skills,temp_n);\
                temp_u = {};\
                for (ee = bi2_types.length-1;ee>=0;--ee){\
                    sid = resultaty[irabota].items[ee].tid;\
                    if (sid > 0){\
                        val+=summa_ochkov(items[sid].bonus,temp_n);\
                        temp_k = items[sid].set.key;\
                        if (temp_k){\
                            if (temp_u[temp_k])\
                                temp_u[temp_k]+=1;\
                            else\
                                temp_u[temp_k]=1;\
                        }\
                    }\
                } \
                for (uu = nabory.length - 1; uu>=0; --uu){\
                    if (temp_u[nabory[uu]]>1){\
                        bn = komplekty[nabory[uu]][temp_u[nabory[uu]]].bonus;\
                        val+=summa_ochkov(bn,temp_n);\
                    }\
                }\
                rabnavyki[irabota][num_index]={};\
                rabnavyki[irabota][num_index].name=pers.skill_titles[num_index];\
                rabnavyki[irabota][num_index].znach = val;\
                rabnavyki[irabota][num_index].mul = raboty[irabota].navyki[num_index];\
            }\
    bi2_vybzap();\
};\
";

bi2_code += "\
bi2_rekurs_z = function (){\
    nn = bi2_types.length;\
    for (ii = ii_rekur; ii >= 0; )\
    {\
        if (--rekurs_time <= 0){\
            ii_rekur = ii;\
            rekurs_time = 50000;\
            ++rekurs_step;\
           	new HumanMessage('Перебор вещей продолжается, шаг №'+rekurs_step, {type: 'success'});\
            window.setTimeout(bi2_rekurs_z, rekurs_delay);\
            return 1;\
        }\
        if (i_slot[ii] >= i_slot_max[ii]){\
            if (--ii >= 0){\
                deneg_ushlo -= ic_objr[ii].price;\
                bi2_to -= ic_objr[ii].bon;\
                bi2_zas -= ic_objr[ii].zas;\
    	    	if (ic_objr[ii].nabor) {\
	    	    	bi2_predmetov[ic_objr[ii].nabor] -= 1;\
	    	    }\
	    	    i_slot[ii]+=1;\
            }\
    	    continue;\
        }\
        deb_v = vyborka_z[bi2_types[ii]].simple.spisok;\
        ic_objr[ii] = deb_v[i_slot[ii]];\
        deneg_ushlo += ic_objr[ii].price;\
        if (deneg_ushlo <= bablo)\
        {\
			if (ic_objr[ii].nabor) {\
    			bi2_predmetov[ic_objr[ii].nabor] += 1;\
	    	}\
		    bi2_to += ic_objr[ii].bon;\
		    bi2_zas += ic_objr[ii].zas;\
		    if (++ii == nn){\
    			ton = 0;\
    			zan = 0;\
	    		for (inabor = nabory.length - 1; inabor >= 0; --inabor) \
		    		if (bi2_predmetov[nabory[inabor]] > 1) {\
			    		ton += komp_rab[nabory[inabor]][bi2_predmetov[nabory[inabor]]];\
			    		zan += komp_zas[nabory[inabor]][bi2_predmetov[nabory[inabor]]];\
				    }\
    			bi2_to += ton;\
    			bi2_zas += zan;\
	    		if ((samoe_ono.zas < bi2_zas)&&(bi2_to >= 0)) {\
		    		samoe_ono.to = bi2_to;\
			    	samoe_ono.ton = ton;\
                    samoe_ono.zas = bi2_zas;\
                    samoe_ono.zan = zan;\
				    samoe_ono.price=deneg_ushlo;\
				    for (jj = nn - 1; jj >= 0; --jj) {\
					    samoe_ono[bi2_types[jj]] = i_slot[jj];\
				    }\
    			}\
			    bi2_to -= ton;\
			    bi2_zas -= zan;\
			    --ii;\
                deneg_ushlo -= ic_objr[ii].price;\
                bi2_to -= ic_objr[ii].bon;\
                bi2_zas -= ic_objr[ii].zas;\
    	    	if (ic_objr[ii].nabor) {\
	    	    	bi2_predmetov[ic_objr[ii].nabor] -= 1;\
	    	    }\
	    	    i_slot[ii]+=1;\
                continue;\
		    }\
		    else{\
		        i_slot[ii]=0;\
		        continue;\
		    }\
        }\
        else{\
            deneg_ushlo -= ic_objr[ii].price;\
            i_slot[ii]+=1;\
            continue;\
        }\
    }\
\
	if (samoe_ono.price >= 0) {\
		resultaty_z[irabota] = {};\
		resultaty_z[irabota].to = samoe_ono.to+zaschita.to;\
		resultaty_z[irabota].ton = samoe_ono.ton;\
		resultaty_z[irabota].price = samoe_ono.price;\
		resultaty_z[irabota].zas = samoe_ono.zas;\
		resultaty_z[irabota].zan = samoe_ono.zan;\
		resultaty_z[irabota].items = [];\
		for (i = 0; i < bi2_types.length; ++i) {\
			vvv = vyborka_z[bi2_types[i]].simple.spisok[samoe_ono[bi2_types[i]]];\
			resultaty_z[irabota].items[i] = {};\
			resultaty_z[irabota].items[i].tid = vvv.tid;\
			resultaty_z[irabota].items[i].bon = vvv.bon;\
			resultaty_z[irabota].items[i].price = vvv.price;\
			resultaty_z[irabota].items[i].zas = vvv.zas;\
		}\
            rabnavyki_z[irabota]={};\
            for (num_index in zaschita.navyki){\
                temp_n = {};\
                temp_n[num_index]=1;\
                val=summa_ochkov2(pers.skills,temp_n);\
                temp_u = {};\
                for (ee = bi2_types.length-1;ee>=0;--ee){\
                    sid = resultaty_z[irabota].items[ee].tid;\
                    if (sid > 0){\
                        val+=summa_ochkov(items[sid].bonus,temp_n);\
                        temp_k = items[sid].set.key;\
                        if (temp_k){\
                            if (temp_u[temp_k])\
                                temp_u[temp_k]+=1;\
                            else\
                                temp_u[temp_k]=1;\
                        }\
                    }\
                } \
                for (uu = nabory.length - 1; uu>=0; --uu){\
                    if (temp_u[nabory[uu]]>1){\
                        bn = komplekty[nabory[uu]][temp_u[nabory[uu]]].bonus;\
                        val+=summa_ochkov(bn,temp_n);\
                    }\
                }\
                rabnavyki_z[irabota][num_index]={};\
                rabnavyki_z[irabota][num_index].name=pers.skill_titles[num_index];\
                rabnavyki_z[irabota][num_index].znach = val;\
                rabnavyki_z[irabota][num_index].mul = zaschita.navyki[num_index];\
            }\
	}\
	else{\
		resultaty_z[irabota] = null;\
	}\
    bi2_vybzap_z();\
};\
";

bi2_code += "\
bi2_rekurs_r = function (){\
    nn = bi2_types.length;\
    rr = 6;\
    for (ii = ii_rekur; ii >= 0; )\
    {\
        if (--rekurs_time <= 0){\
            ii_rekur = ii;\
            rekurs_time = 50000;\
            ++rekurs_step;\
           	new HumanMessage('Перебор вещей продолжается, шаг №'+rekurs_step, {type: 'success'});\
            window.setTimeout(bi2_rekurs_r, rekurs_delay);\
            return 1;\
        }\
        if (i_slot[ii] >= i_slot_max[ii]){\
            if (--ii >= 0){\
                deneg_ushlo -= ic_objr[ii].price;\
                bi2_to -= ic_objr[ii].bon;\
                bi2_ride -= ic_objr[ii].ride;\
    	    	if (ic_objr[ii].nabor) {\
	    	    	bi2_predmetov[ic_objr[ii].nabor] -= 1;\
	    	    }\
	    	    i_slot[ii]+=1;\
            }\
    	    continue;\
        }\
        deb_v = vyborka_r[bi2_types[ii]].simple.spisok;\
        ic_objr[ii] = deb_v[i_slot[ii]];\
        deneg_ushlo += ic_objr[ii].price;\
        if (deneg_ushlo <= bablo)\
        {\
			if (ic_objr[ii].nabor) {\
    			bi2_predmetov[ic_objr[ii].nabor] += 1;\
	    	}\
		    bi2_to += ic_objr[ii].bon;\
		    bi2_ride += ic_objr[ii].ride;\
		    if (++ii == nn){\
    			ton = 0;\
    			rin = 0;\
    			speen = 1.0;\
	    		for (inabor = nabory.length - 1; inabor >= 0; --inabor) \
		    		if (bi2_predmetov[nabory[inabor]] > 1) {\
			    		ton += komp_rab[nabory[inabor]][bi2_predmetov[nabory[inabor]]];\
			    		rin += komp_skor[nabory[inabor]][bi2_predmetov[nabory[inabor]]].ride;\
			    		speen *= komp_skor[nabory[inabor]][bi2_predmetov[nabory[inabor]]].speed;\
				    }\
    			bi2_to += ton;\
    			bi2_ride += rin;\
    			bi2_speed = 100;\
    			if (ic_objr[rr].speed < 1.0){\
    			    bi2_speed = 100.0 / ic_objr[rr].speed + bi2_ride;\
    			}\
    			bi2_speed /= speen;\
    			bi2_speed /= pers.default_speed;\
	    		if ((samoe_ono.speed < bi2_speed)&&(bi2_to > 0)) {\
		    		samoe_ono.to = bi2_to;\
			    	samoe_ono.ton = speen;\
                    samoe_ono.ride = bi2_ride;\
                    samoe_ono.speed = bi2_speed;\
				    samoe_ono.price=deneg_ushlo;\
				    for (jj = nn - 1; jj >= 0; --jj) {\
					    samoe_ono[bi2_types[jj]] = i_slot[jj];\
				    }\
    			}\
			    bi2_to -= ton;\
			    bi2_ride -= rin;\
			    --ii;\
                deneg_ushlo -= ic_objr[ii].price;\
                bi2_to -= ic_objr[ii].bon;\
                bi2_ride -= ic_objr[ii].ride;\
    	    	if (ic_objr[ii].nabor) {\
	    	    	bi2_predmetov[ic_objr[ii].nabor] -= 1;\
	    	    }\
	    	    i_slot[ii]+=1;\
                continue;\
		    }\
		    else{\
		        i_slot[ii]=0;\
		        continue;\
		    }\
        }\
        else{\
            deneg_ushlo -= ic_objr[ii].price;\
            i_slot[ii]+=1;\
            continue;\
        }\
    }\
\
	if (samoe_ono.price >= 0) {\
        if (irabota==111){\
    		resultaty[irabota] = {};\
	    	resultaty[irabota].to = Math.round(samoe_ono.speed);\
		    resultaty[irabota].ton = (1.0/samoe_ono.ton).toFixed(2);\
		    resultaty[irabota].price = samoe_ono.price;\
		    resultaty[irabota].items = [];\
    		for (i = 0; i < bi2_types.length; ++i) {\
	    		vvv = vyborka_r[bi2_types[i]].simple.spisok[samoe_ono[bi2_types[i]]];\
		    	resultaty[irabota].items[i] = {};\
			    resultaty[irabota].items[i].tid = vvv.tid;\
    			resultaty[irabota].items[i].bon = vvv.ride;\
	    		resultaty[irabota].items[i].price = vvv.price;\
		    }\
            rabnavyki[irabota]={};\
            rabnavyki[irabota].ride={};\
            rabnavyki[irabota].ride.name=pers.skill_titles.ride;\
            rabnavyki[irabota].ride.znach = samoe_ono.ride;\
            rabnavyki[irabota].ride.mul = 1.0;\
            resultaty_r[irabota] = null;\
            rabnavyki_r[irabota] = null;\
        }\
        else{\
		    resultaty_r[irabota] = {};\
		    resultaty_r[irabota].to = samoe_ono.to;\
		    resultaty_r[irabota].ton = samoe_ono.ton;\
		    resultaty_r[irabota].price = samoe_ono.price;\
		    resultaty_r[irabota].ride = samoe_ono.ride;\
		    resultaty_r[irabota].speed = samoe_ono.speed;\
		    resultaty_r[irabota].items = [];\
		    for (i = 0; i < bi2_types.length; ++i) {\
			    vvv = vyborka_r[bi2_types[i]].simple.spisok[samoe_ono[bi2_types[i]]];\
			    resultaty_r[irabota].items[i] = {};\
			    resultaty_r[irabota].items[i].tid = vvv.tid;\
			    resultaty_r[irabota].items[i].bon = vvv.bon;\
			    resultaty_r[irabota].items[i].price = vvv.price;\
			    resultaty_r[irabota].items[i].ride = vvv.ride;\
			    resultaty_r[irabota].items[i].speed = vvv.speed;\
		    }\
            rabnavyki_r[irabota]={};\
            rabnavyki_r[irabota].ride={};\
            rabnavyki_r[irabota].ride.name=pers.skill_titles.ride;\
            rabnavyki_r[irabota].ride.znach = samoe_ono.ride;\
            rabnavyki_r[irabota].ride.mul = 1.0;\
		}\
	}\
	else{\
		resultaty_r[irabota] = null;\
	}\
    bi2_vybzap_r();\
};\
";
	
aWindow.bi2_minimize_title = function(){
	if (aWindow.bi2_title_flag2 == 1) {
    	aWindow.bi2_title_flag2 = 0;
		document.getElementById('bi2_title_content_row').style.display = 'none';
		document.getElementById('bi2_title_cap').style.display = 'none';
		document.getElementById('bi2_form0').style.width = '100px';
	}
	else {
		aWindow.bi2_title_flag2 = 1;
		document.getElementById('bi2_title_content_row').style.display = 'table-row';
		document.getElementById('bi2_title_cap').style.display = 'inline';
		document.getElementById('bi2_form0').style.width = aWindow.bi2_w0+'px';
	}
}

aWindow.bi2_stretch_title = function(){
    var nv;
    if (aWindow.bi2_title_flag == 1) {
        aWindow.bi2_title_flag = 0;
        nv = aWindow.bi2_title_h_mid + 'px';
    }
    else {
        aWindow.bi2_title_flag = 1
        nv = aWindow.bi2_title_h_max + 'px';
    }
    document.getElementById('bi2_title_content').style.height = nv;
}

aWindow.bi2_close_title = function(){
	document.getElementById('bi2_title').style.display='none';
}

aWindow.bi2_close_shmot = function(){
    rm = document.getElementById('bi2_shmot');
    document.body.removeChild(rm);
}

aWindow.bi2_vselect = function (chk){
	if (chk) {
		document.getElementById('bi2_vselect').innerHTML=aWindow.bi2_mulselect+aWindow.bi2_conselect;
		
	}
	else{
		document.getElementById('bi2_vselect').innerHTML=aWindow.bi2_simselect+aWindow.bi2_conselect;
		
	}
}

aWindow.bi2_minimize_window = function(){
	if (aWindow.bi2_window_flag2 == 1) {
		aWindow.bi2_window_flag2 = 0;
		document.getElementById('bi2_window_content_row').style.display = 'none';
		document.getElementById('bi2_window_cap').style.display = 'none'
		document.getElementById('bi2_win1').style.width = '100px';
	}
	else {
		aWindow.bi2_window_flag2 = 1;
		document.getElementById('bi2_win1').style.width = aWindow.bi2_w1+'px';
		document.getElementById('bi2_window_content_row').style.display = 'table-row';
		document.getElementById('bi2_window_cap').style.display = 'inline';
	}
}

aWindow.bi2_close_window = function(){
	document.getElementById('bi2_window').style.display='none';
}

aWindow.bi2_error_window = function(err){
	document.getElementById('bi2_window_content').style.height = parseInt((aWindow.bi2_window_h_max*3)/5, 10) + 'px';
	bi2_err = document.getElementById('bi2_window_error');
	bi2_err.style.height = parseInt((aWindow.bi2_window_h_max*2)/5, 10) + 'px';
	bi2_err.style.display='block';
	htm = '<hr><div style=\"font-weight:bold; color:black; text-align:center;\" >Для заполнения базы вещей эти данные нужно отправить автору скрипта<br />'; 
	htm += '<textarea style=\"margin: 5px;\" readonly=\"readonly\" cols=\"96\" rows=\"6\">';
	htm += err;
	htm += '</textarea></div>';
	bi2_err.innerHTML = htm;
}

bi2_code +="\
bi2_auto_odev = function(va, rab){\
	bi2_odev_type=0;\
	bi2_odev_var=va;\
	bi2_odev_count=0;\
	bi2_odev_rab=rab;\
	bi2_odev_stat=true;\
	zz = document.getElementById('current_task');\
	zz.innerHTML='Ты одеваешься!';\
	bi2_odev_window();\
};\
\
bi2_odev_add = function(va, irab){\
	if (va==='n')\
		{rrab = resultaty[irab];index=raboty[irab].rus_name;}\
	else if (va==='z')\
		{rrab = resultaty_z[irab];index=raboty[irab].rus_name+'_(защита)'}\
	else if (va==='r')\
		{rrab = resultaty_r[irab];index=raboty[irab].rus_name+'_(передвижение)'}\
	if (!rrab||!rrab.items) return false;\
	for (ee = 0; ee < bi2_types.length; ++ee){\
		if (rrab.items[ee]&&rrab.items[ee].tid){\
			if (!bi2_odev_list[index]) bi2_odev_list[index]={};\
			bi2_odev_list[index][bi2_types[ee]] = rrab.items[ee].tid;\
		}\
	}\
	bi2_odev_save_list();\
	bi2_odev_spam_option();\
};\
\
bi2_odev_remove = function(va, irab){\
	if (va==='n')\
		{index=raboty[irab].rus_name;}\
	else if (va==='z')\
		{index=raboty[irab].rus_name+'_(защита)'}\
	else if (va==='r')\
		{index=raboty[irab].rus_name+'_(передвижение)'}\
	if (bi2_odev_list[index]){\
		delete bi2_odev_list[index];\
		alert(index+' удалено!')\
	}\
	bi2_odev_save_list();\
	bi2_odev_spam_option();\
};\
\
bi2_odev_save_list = function(){\
	tempo = 'aWindow.bi2_odev_list={';\
	for (ii in bi2_odev_list){\
		tempo+='\"'+ii+'\":';\
		tids = bi2_odev_list[ii];\
		tmp = '{';\
		for (ee = 0; ee < bi2_types.length; ++ee){\
			if (tids[bi2_types[ee]]){\
				tmp+=bi2_types[ee]+':'+tids[bi2_types[ee]]+', ';\
			}\
		}\
		tmp += '}';\
		tmp = tmp.replace(', }','}');\
		tempo+=tmp+', ';\
	};\
	tempo+='}';\
	tempo = tempo.replace(', }','}');\
	bi2_setValue(bi2_pre+'odev_list',tempo);\
};\
\
bi2_odev_spam_option = function(){\
	equip_select = document.getElementById('bi2_spam_select');\
	if (!equip_select) return;\
	equip_select.innerHTML='<option value=\"0\">Сохранённые наборы</option>';\
	arra={};\
	jj=0;\
	for (ii in bi2_odev_list) {arra[jj++]={ves:ii};}\
	qsort(arra,0,jj);\
	for (i=0;i<jj;++i){\
		ii=arra[i].ves;\
		t_op = document.createElement('option');\
		t_op.textContent = ii;\
		t_op.setAttribute('value',ii);\
		equip_select.appendChild(t_op);\
	}\
};\
\
bi2_odev_spam_go = function(){\
	equip_select = document.getElementById('bi2_spam_select');\
	name = equip_select.options[equip_select.selectedIndex].value;\
	irab=777;\
	resultaty[irab]={};\
	resultaty[irab].items={};\
	for (ee=0;ee<bi2_types.length;++ee){\
		resultaty[irab].items[ee] = {};\
		if (bi2_odev_list[name][bi2_types[ee]]){\
			resultaty[irab].items[ee].tid = bi2_odev_list[name][bi2_types[ee]];\
		}\
	}\
	bi2_auto_odev('n',irab);\
};\
\
bi2_odev_spam_rewrite = function(){\
	equip_select = document.getElementById('bi2_spam_select');\
	name = equip_select.options[equip_select.selectedIndex].value;\
	spam_value = document.getElementById('bi2_spam_new');\
	name2 = spam_value.value;\
	if (bi2_odev_list[name]){\
		bi2_odev_list[name2]=bi2_odev_list[name];\
		delete bi2_odev_list[name];\
		bi2_odev_save_list();\
		bi2_odev_spam_option();\
	}\
};\
\
bi2_odev_spam_del = function(){\
	equip_select = document.getElementById('bi2_spam_select');\
	name = equip_select.options[equip_select.selectedIndex].value;\
	if (bi2_odev_list[name]){\
		delete bi2_odev_list[name];\
		alert(name+' удалено!');\
		bi2_odev_save_list();\
		bi2_odev_spam_option();\
	}\
};\
\
bi2_odev_spam_save = function(){\
	spam_value = document.getElementById('bi2_spam_new');\
	name = spam_value.value;\
	if (bi2_odev_list[name]){\
		gu_gu = confirm('Перезаписать набор '+name+' ?');\
		if (!gu_gu) return;\
	}\
	if (!Wear||!Wear.wear) return;\
	bi2_odev_list[name]={};\
	for (ee=0;ee<bi2_types.length;++ee){\
		if (Wear.wear[bi2_types[ee]]){\
			bi2_odev_list[name][bi2_types[ee]] = Wear.wear[bi2_types[ee]].obj.item_id;\
		}\
	}\
	bi2_odev_save_list();\
	bi2_odev_spam_option();\
};\
\
bi2_odev_spam = function(){\
	if (!bi2_odevalo4ka) return;\
	wear_div = document.getElementById('window_inventory_content');\
	if (!wear_div) {setTimeout(bi2_odev_spam,2000);return}\
	if (!document.getElementById('wear')) {setTimeout(bi2_odev_spam,2000);return}\
	if (document.getElementById('bi2_wear_spam')) {setTimeout(bi2_odev_spam,5000);return};\
	var wear_spam = document.createElement('div');\
	wear_spam.setAttribute('id', 'bi2_wear_spam');\
	wear_spam.setAttribute('style', 'position: absolute; top: 5px; left: 15px; padding: 0px; margin: 0px;');\
	wear_div.appendChild(wear_spam);\
	var store_set_link = document.createElement('a');\
	store_set_link.setAttribute('href', '#');\
	store_set_link.setAttribute('title', 'Сохранить текущую экипировку как набор');\
	store_set_link.setAttribute('onclick', 'bi2_odev_spam_save(); return false;');\
	store_set_link.textContent = 'Сохранить  ';\
	wear_spam.appendChild(store_set_link);\
	var store_set_value = document.createElement('input');\
	store_set_value.setAttribute('id','bi2_spam_new');\
	store_set_value.setAttribute('type','text');\
	store_set_value.setAttribute('size','20');\
	store_set_value.setAttribute('value',' - Название набора -');\
	store_set_value.setAttribute('class','bi2_sel');\
	store_set_value.setAttribute('style', '-moz-user-select: text;');\
	wear_spam.appendChild(store_set_value);\
	var store_rewrite_link = document.createElement('a');\
	store_rewrite_link.setAttribute('href', '#');\
	store_rewrite_link.setAttribute('title', 'Заменить название текущего набора');\
	store_rewrite_link.setAttribute('onclick', 'bi2_odev_spam_rewrite(); return false;');\
	store_rewrite_link.textContent = '  Переименовать';\
	wear_spam.appendChild(store_rewrite_link);\
	var equip_select = document.createElement('select');\
	equip_select.setAttribute('id', 'bi2_spam_select');\
	equip_select.setAttribute('class','bi2_sel');\
	equip_select.setAttribute('style', 'width: 171px; max-width: 175px; margin-left: 123px; margin-right: 5px');\
	wear_spam.appendChild(equip_select);\
	bi2_odev_spam_option();\
	var delete_link = document.createElement('a');\
	delete_link.setAttribute('href', '#');\
	delete_link.setAttribute('title', 'Удалить выбранный набор');\
	delete_link.setAttribute('style', 'margin-right: 5px');\
	delete_link.setAttribute('onclick', 'confirm (\"Удалить набор?\")?bi2_odev_spam_del():void(0); return false;');\
	delete_link.textContent = '×';\
	wear_spam.appendChild(delete_link);\
	var equip_link = document.createElement('a');\
	equip_link.setAttribute('href', '#');\
	equip_link.setAttribute('id', 'equip_link');\
	equip_link.setAttribute('onclick', 'bi2_odev_spam_go(); return false;');\
	equip_link.textContent = 'Надеть';\
	wear_spam.appendChild(equip_link);\
	setTimeout(bi2_odev_spam,5000);\
};\
\
\
bi2_odev_window = function(){\
	if (!AjaxWindow.windows['inventory']){\
		if (bi2_odev_count++===0){\
			AjaxWindow.show('inventory');\
			setTimeout(bi2_odev_window, bi2_odev_time);\
			return;\
		}\
		else{\
			if(bi2_odev_count<bi2_odev_rep*5){\
				setTimeout(bi2_odev_window, bi2_odev_time);\
				return;\
			}\
		}\
	}\
	else{\
		if (!AjaxWindow.windows['inventory'].isReady){\
			if(bi2_odev_count++<bi2_odev_rep*5){\
				setTimeout(bi2_odev_window, bi2_odev_time);\
				return;\
			}\
		}\
	}\
	bi2_odev_count=0;\
	bi2_odevalka();\
};\
\
bi2_odev_zapusk = function(){\
	bi2_odev_type++;bi2_odev_count=0;\
	bi2_odevalka();\
\
};\
\
bi2_odev_control = function(typ, id){\
	zz = Wear.wear[bi2_types[bi2_odev_type]];\
	if (zz&&(zz.obj.item_id!=bi2_odev_item)){\
		if(bi2_odev_count++ <= bi2_odev_rep){\
			setTimeout(bi2_odev_control,bi2_odev_time);\
			return;\
		}\
		else{\
			bi2_odev_stat=false;\
		}\
	}\
	bi2_odev_zapusk();\
};\
\
bi2_odevalka = function(){\
	ee = bi2_odev_type;\
	irab=bi2_odev_rab;\
	if (ee >= bi2_types.length){\
		if (bi2_odev_stat) {document.getElementById('current_task').innerHTML='Ты оделся!'}\
		else {document.getElementById('current_task').innerHTML='Чёрт! Опять полураздет!'}\
		return;\
	}\
	if (bi2_odev_var==='n')\
		sid = resultaty[irab].items[ee].tid;\
	else if (bi2_odev_var==='z')\
		sid = resultaty_z[irab].items[ee].tid;\
	else if (bi2_odev_var==='r')\
		sid = resultaty_r[irab].items[ee].tid;\
	if (sid){\
		if (Wear.wear[bi2_types[ee]]&&(Wear.wear[bi2_types[ee]].obj.item_id===sid)){\
			bi2_odev_zapusk();\
			return;\
		}\
		var inv = Bag.getInstance().items;\
		for (vv in inv){\
			if (inv[vv].obj.item_id===sid){\
				Bag.getInstance().carry(vv);\
				bi2_odev_item=sid;\
				bi2_odev_control();\
				return;\
			}\
		}\
		bi2_odev_zapusk();return;\
	}\
	else{\
		bi2_odev_zapusk();\
		return;\
	}\
\
};\
";

aWindow.bi2_setValue = function(key,value) {

	window.setTimeout(function() {GM_setValue(key,value)}, 0);
};

aWindow.bi2_getValue = function(key) {
	window.setTimeout(function() {	aWindow.bi2_abyrvalg = GM_getValue(key);}, 1 );
};

bi2_code +="\
bi2_worker = function(schet){\
	for (vv in Bag.getInstance().items){\
		bi2_worker2(schet);\
		return;\
	}\
	if (!bi2_count_inv) AjaxWindow.show('inventory');\
	if (++bi2_count_inv < 15){\
		if (schet) {setTimeout(bi2_worker4,1000)}else{setTimeout(bi2_worker3,1000)}} \
	else {bi2_count_inv=0;bi2_worker2(schet)}\
}\
;";

bi2_code +="\
bi2_worker3 = function(){\
	for (vv in Bag.getInstance().items){\
		bi2_worker2(false);\
		return;\
	}\
	if (!bi2_count_inv) AjaxWindow.show('inventory');\
	if (++bi2_count_inv < 15){\
		setTimeout(bi2_worker3,1000)} \
	else {bi2_count_inv=0;bi2_worker2(false)}\
}\
;";

bi2_code +="\
bi2_worker4 = function(){\
	for (vv in Bag.getInstance().items){\
		bi2_worker2(true);\
		return;\
	}\
	if (!bi2_count_inv) AjaxWindow.show('inventory');\
	if (++bi2_count_inv < 15){\
		setTimeout(bi2_worker4,1000)} \
	else {bi2_count_inv=0;bi2_worker2(true)}\
}\
;";

aWindow.bi2_worker2 = function(schet){
    aWindow.bi2_process=true;
    aWindow.resultaty=[];
    aWindow.resultaty_z=[];
    aWindow.resultaty_r=[];
    aWindow.zaschita=null;
    aWindow.ezda = false;
    aWindow.rabnavyki=[];
    aWindow.rabnavyki_z=[];
    aWindow.bi2_khochuka = [];
	aWindow.pers = aWindow.Character;

	vse_vse = document.getElementById('bi2_skol_rabot_v').checked;
	vse_rab = document.getElementById('bi2_skol_rabot_r').checked;
	nesk_rab = document.getElementById('bi2_skol_rabot_n').checked;
	skil_rab = document.getElementById('bi2_skol_rabot_s').checked;
	item_rab = document.getElementById('bi2_skol_rabot_i').checked;
	aWindow.bi2_vse_raboty = vse_vse||vse_rab;
	vyb_rab = document.getElementById('bi2_rabota');
	aWindow.porabotaj=null;
	aWindow.porabotaj=[];
	if (vse_vse){
		for (r in aWindow.raboty){
			if ((r>0)&&(r<=111))
				aWindow.porabotaj[r]=true;
		}
	}
	else if (vse_rab){
		for (r in aWindow.raboty){
			if ((r>0)&&(r<100))
				aWindow.porabotaj[r]=true;
		}
	}
	else if (skil_rab){
		ns = document.getElementById('bi2_rabota20');
		var ss='';
		for (s in ns.options){
			if (ns.options[s].selected)
				if (ns.options[s].value > 0)
					ss=ns.options[s].value-1;
		}
		ss = aWindow.bi2_vse_navyki[ss];
		for (r in aWindow.raboty){
			if ((r>0)&&(r<100)){
				for (jj in aWindow.raboty[r].navyki)
					if (ss == jj)
						aWindow.porabotaj[r]=true;
			}
		}
	}
	else if (item_rab){
		is = document.getElementById('bi2_rabota99');
		var ii=0;
		for (i in is.options)
			if (is.options[i].selected)
				if (is.options[i].value > 0){
					ii=is.options[i].value;
				}
		for (r in aWindow.raboty){
			if ((r>0)&&(r<100)){
				for (jj in aWindow.raboty[r].resultaty.produkty)
					if (ii==jj)
						aWindow.porabotaj[r]=true;
			}
		}
	}
	else{
		for (r in vyb_rab.options){
			if (vyb_rab.options[r].selected){
				if (vyb_rab.options[r].value > 0) {
					aWindow.porabotaj[vyb_rab.options[r].value] = true;
				}
			}
		}
	}
	min_hp=parseInt(document.getElementById('bi2_fort_hp').value,10);
	aWindow.bi2_zdorov = (min_hp-100-(aWindow.pers.level-1)*aWindow.pers.lifePointPerHealthSkill)/(aWindow.pers.lifePointPerHealthSkill+aWindow.pers.lifePointPerHealthSkillBonus);
	test_vesch = document.getElementById('bi2_khochuka').checked;
	test_svoi_magaziny = document.getElementById('bi2_smo_mag').checked;
	if (test_vesch){
	    vyb_vesch = document.getElementById('bi2_dobavim_veschi');
	    for (v in vyb_vesch.options){
	        if (vyb_vesch.options[v].selected){
	            if (vyb_vesch.options[v].value > 0){
	                aWindow.bi2_khochuka[vyb_vesch.options[v].value] = true;
	            }
	        }
	    }
	}
	aWindow.bi2_khlam = document.getElementById('bi2_khlam').checked;
	iz_magazinov = document.getElementById('bi2_pokupka').checked;
	vse_veschi= document.getElementById('bi2_vse_vse').checked;
	aWindow.bablo = parseInt(document.getElementById('bi2_bablo').value,10);
	aWindow.bi2_millioner = document.getElementById('bi2_milion').checked;
	if (aWindow.bi2_millioner)
	    aWindow.bablo=1000000;
	plus_level = parseInt(document.getElementById('bi2_uroven').value,10);
	aWindow.ezda = document.getElementById('bi2_skorost').checked
	s_zaschitoj=document.getElementById('bi2_zaschita').checked;
	e_nov_rabota=document.getElementById('bi2_navyki').checked;
	nov_index=aWindow.raboty.length;
	if (e_nov_rabota){
		nr_malus = parseInt(document.getElementById('bi2_malus').value,10);
		nov_rabota={};
		nr_rabota_res=null;
		
		nvn_build=parseFloat(document.getElementById('bi2_build').value);
		nvn_punch=parseFloat(document.getElementById('bi2_punch').value);
		nvn_tough=parseFloat(document.getElementById('bi2_tough').value);
		nvn_endurance=parseFloat(document.getElementById('bi2_endurance').value);
		nvn_health=parseFloat(document.getElementById('bi2_health').value);
		nvn_ride=parseFloat(document.getElementById('bi2_ride').value);
		nvn_reflex=parseFloat(document.getElementById('bi2_reflex').value);
		nvn_dodge=parseFloat(document.getElementById('bi2_dodge').value);
		nvn_hide=parseFloat(document.getElementById('bi2_hide').value);
		nvn_swim=parseFloat(document.getElementById('bi2_swim').value);
		nvn_aim=parseFloat(document.getElementById('bi2_aim').value);
		nvn_shot=parseFloat(document.getElementById('bi2_shot').value);
		nvn_pitfall=parseFloat(document.getElementById('bi2_pitfall').value);
		nvn_finger_dexterity=parseFloat(document.getElementById('bi2_finger_dexterity').value);
		nvn_repair=parseFloat(document.getElementById('bi2_repair').value);
		nvn_leadership=parseFloat(document.getElementById('bi2_leadership').value);
		nvn_tactic=parseFloat(document.getElementById('bi2_tactic').value);
		nvn_trade=parseFloat(document.getElementById('bi2_trade').value);
		nvn_animal=parseFloat(document.getElementById('bi2_animali').value);
		nvn_appearance=parseFloat(document.getElementById('bi2_appearance').value);
		aWindow.raboty[nov_index] = {rus_name:'Конструктор', name:'constructor', malus:nr_malus, navyki:{build:nvn_build, punch:nvn_punch, tough:nvn_tough, endurance:nvn_endurance, health:nvn_health, ride:nvn_ride, reflex:nvn_reflex, dodge:nvn_dodge, hide:nvn_hide, swim:nvn_swim, aim:nvn_aim, shot:nvn_shot, pitfall:nvn_pitfall, finger_dexterity:nvn_finger_dexterity, repair:nvn_repair, leadership:nvn_leadership, tactic:nvn_tactic, trade:nvn_trade, animal:nvn_animal, appearance:nvn_appearance}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:0, producty:null}};
	}
	if (s_zaschitoj){
		aWindow.zaschita=null;
		aWindow.zaschita={};
		aWindow.zaschita.to = parseInt(document.getElementById('bi2_zaschitato').value,10);
		if (document.getElementById('bi2_zaschita_vm').checked){
			aWindow.zaschita.navyki={punch:1,tough:0.5,health:1,reflex:0.5,dodge:1,aim:1,tactic:1};
		}
		else if (document.getElementById('bi2_zaschita_vr').checked){
			aWindow.zaschita.navyki={shot:1,tough:0.5,health:1,reflex:0.5,dodge:1,aim:1,tactic:1};
		}
		else if (document.getElementById('bi2_zaschita_vd').checked){
			aWindow.zaschita.navyki={tough:0.5,health:1,reflex:0.5,dodge:1,tactic:1};
		}
		else if (document.getElementById('bi2_zaschita_vk').checked){
			aWindow.zaschita.navyki=aWindow.raboty[nov_index].navyki;
			e_nov_rabota=false;
		}
		else{
			aWindow.zaschita.navyki={dodge:1};
		}
	}
	else{
		aWindow.zaschita=null;
	}
	if (e_nov_rabota){
		if (vse_vse || vse_rab || nesk_rab) {
			aWindow.porabotaj[nov_index] = true;
		}
		else{
			aWindow.porabotaj=[];
			aWindow.porabotaj[nov_index] = true;
		}
	}

	sslot=document.getElementById('bi2_sloty').checked;
	if (sslot){
		aWindow.bi2_slots={};
		aWindow.bi2_slots.flag=true;
		aWindow.bi2_slots.head =document.getElementById('bi2_head').checked;
		aWindow.bi2_slots.body =document.getElementById('bi2_body').checked;
		aWindow.bi2_slots.foot =document.getElementById('bi2_foot').checked;
		aWindow.bi2_slots.neck =document.getElementById('bi2_neck').checked;
		aWindow.bi2_slots.right_arm =document.getElementById('bi2_right_arm').checked;
		aWindow.bi2_slots.left_arm =document.getElementById('bi2_left_arm').checked;
		aWindow.bi2_slots.yield =document.getElementById('bi2_yield').checked;
		aWindow.bi2_slots.animal =document.getElementById('bi2_animal').checked;
	}
	else{
		aWindow.bi2_slots=null;
	}
	if (!aWindow.bi2_inv_imported){
	    aWindow.bi2_iimport();
	    if (!aWindow.bi2_inv_imported){
	        new aWindow.HumanMessage('Предварительно необходимо импортировать багаж. Откройте и дождитесь загрузки.<br />После полной загрузки багажа окно можно свернуть или закрыть.');
	        aWindow.bi2_process=false;
	        return;
	    }
	}
	if (test_vesch&&test_svoi_magaziny){
	    aWindow.bi2_mimport();
	}
	
	if (aWindow.bi2_inv_imported)
	{
        aWindow.bi2_podschet(vse_veschi, iz_magazinov, plus_level, aWindow.pers);
    }
       
    if (aWindow.einfo!=''){
        aWindow.bi2_show_window();
        aWindow.bi2_error_window(aWindow.einfo+'\n'+aWindow.winfo);
    }
    else if (aWindow.winfo!=''){
        aWindow.bi2_show_window();
        aWindow.bi2_error_window(aWindow.winfo);
    }
    
    aWindow.all_def={navyki:{}};
	if (aWindow.zaschita){
		for (z in aWindow.zaschita.navyki) aWindow.all_def.navyki[z]=aWindow.zaschita.navyki[z];
	}
	else	aWindow.all_def.navyki = {aim:2,dodge:2,tactic:2,tough:1,reflex:1,health:1};
	if (schet){
	    aWindow.rekurs_time = 50000;
	    aWindow.rekurs_step = 0;
        aWindow.bi2_vybzap();
    }
    else{
        aWindow.bi2_vybvesch();
    }
}

aWindow.bi2_simselect='<select class=\"bi2_sel\" id=\"bi2_rabota\" size=\"1\" onchange=\"javascript:$(\'bi2_skol_rabot_o\').checked=true;\">';
aWindow.bi2_mulselect='<select title=\"Выбор нескольких работ &mdash; с нажатой клавишей Ctrl\" class=\"bi2_sel\" multiple=\"multiple\" id=\"bi2_rabota\" size=\"6\" onchange=\"javascript:$(\'bi2_skol_rabot_n\').checked=true;\">';
aWindow.bi2_conselect='\
<option value=\"0\">	- Выберите работу -	</option>\
<option value=\"101\">	Строительство в городе/форте	</option>\
<option value=\"111\">	Передвижение	</option>\
<option value=\"103\">	Атака форта	</option>\
<option value=\"104\">	Атака форта (меткость)	</option>\
<option value=\"105\">	Атака форта (уворот)	</option>\
<option value=\"106\">	Защита форта	</option>\
<option value=\"107\">	Защита форта (меткость)	</option>\
<option value=\"108\">	Защита форта (уворот)	</option>\
<option value=\"22\">	Выпас коров	</option>\
<option value=\"10\">	Выпас овец	</option>\
<option value=\"1\">	Выпас свиней	</option>\
<option value=\"25\">	Выработка камня	</option>\
<option value=\"55\">	Вырубка леса	</option>\
<option value=\"85\">	Добыча железа	</option>\
<option value=\"67\">	Добыча нефти	</option>\
<option value=\"32\">	Добыча самоцветов	</option>\
<option value=\"56\">	Добыча серебра	</option>\
<option value=\"40\">	Добыча угля	</option>\
<option value=\"50\">	Доставка амуниции	</option>\
<option value=\"17\">	Дубление кожи	</option>\
<option value=\"8\">	Жатва	</option>\
<option value=\"19\">	Захоронение	</option>\
<option value=\"79\">	Знахарство	</option>\
<option value=\"49\">	Изготовление гробов	</option>\
<option value=\"29\">	Клеймение скота	</option>\
<option value=\"60\">	Конокрадство	</option>\
<option value=\"83\">	Контрабанда	</option>\
<option value=\"78\">	Кража со взломом	</option>\
<option value=\"24\">	Лесопилка	</option>\
<option value=\"27\">	Лесоповал	</option>\
<option value=\"65\">	Мародёрство	</option>\
<option value=\"70\">	Мелкое воровство	</option>\
<option value=\"62\">	Миссионерство	</option>\
<option value=\"88\">	Набивка подков	</option>\
<option value=\"74\">	Нападение на дилижанс	</option>\
<option value=\"73\">	Нападение на повозку	</option>\
<option value=\"77\">	Нападение на поезд	</option>\
<option value=\"35\">	Объезд лошадей	</option>\
<option value=\"30\">	Ограждение пастбища	</option>\
<option value=\"28\">	Орошение	</option>\
<option value=\"48\">	Отлов лошадей	</option>\
<option value=\"75\">	Охота за преступниками	</option>\
<option value=\"52\">	Охота на бизона	</option>\
<option value=\"39\">	Охота на бобра	</option>\
<option value=\"58\">	Охота на волков	</option>\
<option value=\"66\">	Охота на гризли	</option>\
<option value=\"20\">	Охота на индейку	</option>\
<option value=\"51\">	Охота на койотов	</option>\
<option value=\"57\">	Охрана дилижанса	</option>\
<option value=\"59\">	Охрана каравана	</option>\
<option value=\"61\">	Охрана тюрьмы	</option>\
<option value=\"16\">	Охрана форта	</option>\
<option value=\"80\">	Парламентёрство	</option>\
<option value=\"76\">	Перевозка заключённых	</option>\
<option value=\"18\">	Поиск золота	</option>\
<option value=\"68\">	Поиски клада	</option>\
<option value=\"13\">	Помол зерна	</option>\
<option value=\"63\">	Пони-экспресс	</option>\
<option value=\"72\">	Преследование бандитов	</option>\
<option value=\"2\">	Присмотр за полем	</option>\
<option value=\"11\">	Продажа прессы	</option>\
<option value=\"37\">	Прокладка телеграфной линии	</option>\
<option value=\"31\">	Прорыв плотины	</option>\
<option value=\"33\">	Разметка приисков	</option>\
<option value=\"3\">	Расклейка плакатов	</option>\
<option value=\"45\">	Рекогносцировка	</option>\
<option value=\"23\">	Ремонт забора	</option>\
<option value=\"34\">	Ремонт повозок	</option>\
<option value=\"82\">	Речные перевозки	</option>\
<option value=\"7\">	Рыбалка	</option>\
<option value=\"42\">	Рыбная ловля	</option>\
<option value=\"38\">	Рытьё колодца	</option>\
<option value=\"86\">	Сбор агавы	</option>\
<option value=\"91\">	Сбор апельсинов	</option>\
<option value=\"14\">	Сбор кукурузы	</option>\
<option value=\"87\">	Сбор помидоров	</option>\
<option value=\"6\">	Сбор сахарного тростника	</option>\
<option value=\"4\">	Сбор табака	</option>\
<option value=\"15\">	Сбор фасоли	</option>\
<option value=\"5\">	Сбор хлопка	</option>\
<option value=\"9\">	Сбор ягод	</option>\
<option value=\"12\">	Сенокос	</option>\
<option value=\"69\">	Служба в армии	</option>\
<option value=\"71\">	Служба наёмником	</option>\
<option value=\"46\">	Сплав леса	</option>\
<option value=\"26\">	Спрямление русла	</option>\
<option value=\"44\">	Строительство ветряной мельницы	</option>\
<option value=\"43\">	Строительство вокзала	</option>\
<option value=\"21\">	Строительство железной дороги	</option>\
<option value=\"47\">	Строительство моста	</option>\
<option value=\"53\">	Строительство особняка	</option>\
<option value=\"84\">	Строительство ранчо	</option>\
<option value=\"41\">	Типография	</option>\
<option value=\"36\">	Торговля	</option>\
<option value=\"64\">	Торговля оружием с индейцами	</option>\
<option value=\"54\">	Торговля с индейцами	</option>\
<option value=\"90\">	Тушение пожара	</option>\
<option value=\"93\">	Чистка обуви	</option>\
<option value=\"92\">	Чистка хлева	</option>\
<option value=\"121\">	Стрелок vs стрелок атака	</option>\
<option value=\"125\">	Стрелок vs ударник атака	</option>\
<option value=\"123\">	Стрелок vs стрелок защита	</option>\
<option value=\"127\">	Стрелок vs ударник защита	</option>\
<option value=\"129\">	Стрелок vs все защита	</option>\
<option value=\"131\">	Стрелок vs2 стрелок атака	</option>\
<option value=\"135\">	Стрелок vs2 ударник атака	</option>\
<option value=\"133\">	Стрелок vs2 стрелок защита	</option>\
<option value=\"137\">	Стрелок vs2 ударник защита	</option>\
<option value=\"139\">	Стрелок vs2 все защита	</option>\
<option value=\"122\">	Ударник vs стрелок атака	</option>\
<option value=\"126\">	Ударник vs ударник атака	</option>\
<option value=\"124\">	Ударник vs стрелок защита	</option>\
<option value=\"128\">	Ударник vs ударник защита	</option>\
<option value=\"130\">	Ударник vs все защита	</option>\
<option value=\"132\">	Ударник vs2 стрелок атака	</option>\
<option value=\"136\">	Ударник vs2 ударник атака	</option>\
<option value=\"134\">	Ударник vs2 стрелок защита	</option>\
<option value=\"138\">	Ударник vs2 ударник защита	</option>\
<option value=\"140\">	Ударник vs2 все защита	</option>\
</select>\
';

aWindow.bi2_slot_selector = function(v_slot){
	document.getElementById('bi2_head').checked = (v_slot=='head');
	document.getElementById('bi2_body').checked = (v_slot=='body');
	document.getElementById('bi2_foot').checked = (v_slot=='foot');
	document.getElementById('bi2_neck').checked = (v_slot=='neck');
	document.getElementById('bi2_right_arm').checked = (v_slot=='right_arm');
	document.getElementById('bi2_left_arm').checked = (v_slot=='left_arm');
	document.getElementById('bi2_yield').checked = (v_slot=='yield');
	document.getElementById('bi2_animal').checked = (v_slot=='animal');
};

aWindow.bi2_ovselect = function(){
    vyb_vesch_options = document.getElementById('bi2_dobavim_veschi').options;
    for (v in vyb_vesch_options){
        vyb_vesch_options[v].selected = false;
    }
}

aWindow.bi2_show_shmot = function(irab){
    vv = null;
    if (aWindow.resultaty_r[irab]){
        vv = aWindow.resultaty_r[irab];
    }
    else if (aWindow.resultaty_z[irab]){
        vv = aWindow.resultaty_z[irab];
    }
    else if (aWindow.resultaty[irab]){
        vv = aWindow.resultaty[irab];
    }
    if (!vv) return;
    hti = '<table>';
    for (ii = 0; ii < vv.items.length; ++ii){
        sid = vv.items[ii].tid;
        if (sid){
            vesch = aWindow.items[sid];
            hti+='<tr><td><a class=\"tt2\" href=\"#\" ><span><strong>'+vesch.name+'</strong>';
            if (vesch.set.key){
                hti += '<br /><em>'+vesch.set.name+'</em>';
            }
            for (ind in vesch.bonus.attributes){
                hti += aWindow.bi2_a_print(ind, vesch.bonus.attributes[ind]);
            }
            for (ind in vesch.bonus.skills){
                hti += aWindow.bi2_s_print(ind, vesch.bonus.skills[ind]);
            }
            hti += '</span>';
            hti+='<div class=\"bag_item\" ><img src=\"'+ vesch.image_mini +'\" /></div>';
            hti+='</a></td></tr>';
        }
    }
    hti += '</table>';

    bi2_shmot_old = document.getElementById('bi2_shmot');
    bi2_shmot = null;
    html2='';
    
    if (!bi2_shmot){
		html2 += '<div id=\"bi2_shmo2\" style=\"width:' + 60 + 'px;\">\n';
        html2 += '<div style=\"background-color:##e8dab3; text-align:center; font-weight:bold; color:red;\">';
		html2 += '<span>';
		html2 += '<a href=\"javascript:bi2_close_shmot();\"' + aWindow.bi2_tlink + ' title=\"Закрыть\">*</a>';
		html2 += '</span>';
		html2 += '</div>'
		html2 += '<div id=\"bi2_shmot_content\">';
        html2 += hti;
        html2 += '</div>'        		
        html2 += '</div>';
		bi2_shmot = document.createElement('div');
		bi2_shmot.id = 'bi2_shmot';
		bi2_shmot.innerHTML = html2;
		bi2_shmot.setAttribute('style', 'position: absolute; right: ' + 51 + 'px; top: ' + 272 + 'px; z-index:251');
	}
	if (bi2_shmot_old)
	    document.body.replaceChild(bi2_shmot, bi2_shmot_old);
	else
	    document.body.appendChild(bi2_shmot);
	bi2_shmot.style.display = 'block';

}

aWindow.bi2_show_window = function(){
    bi2_window = document.getElementById('bi2_window');
    html1='';
    
    if (!bi2_window){
		html1 += '<div id=\"bi2_win1\" style=\"width:' + aWindow.bi2_w1 + 'px; text-align:left;\">\n';
		html1 += '<table class=\"shadow_table\" align=\"left\"><tbody>\n';
		html1 += '<tr>';
		html1 += '<td class=\"gran_vl\" />\n';
		html1 += '<td class=\"gran_v\" />\n';
		html1 += '<td class=\"gran_vp\" />\n';
		html1 += '</tr><tr>\n';
		html1 += '<td class=\"gran_l\" />\n';
		html1 += '<td style=\"background-color:#302010; text-align:center; font-weight:bold; color:white;\">';
		html1 += '<span>';
		html1 += '<a href=\"javascript:bi2_minimize_window();\"' + aWindow.bi2_tlink + ' title=\"Свернуть\">&nbsp;_&nbsp;</a>&nbsp;';
		html1 += '<a href=\"javascript:bi2_stretch_window();\"' + aWindow.bi2_tlink + ' title=\"-\">&nbsp;^&nbsp;</a>&nbsp;';
		html1 += '<a href=\"javascript:bi2_close_window();\"' + aWindow.bi2_tlink + ' title=\"Закрыть\">&nbsp;*&nbsp;</a>&nbsp;';
		html1 += '</span>';
		html1 += '<span id=\"bi2_window_cap\">Результаты</span>';
		html1 += '</td><td class=\"gran_p\" />\n'
		html1 += '</tr><tr id=\"bi2_window_content_row\">\n';
		html1 += '<td class=\"gran_l\" />\n';
		html1 += '<td id=\"bi2_window_content0\" class=\"shadow_content\" style=\"width:' + (aWindow.bi2_w1 - 12) + 'px;\" >';
		html1 += '<div id=\"bi2_window_content\" style=\"overflow: auto; height: ' + aWindow.bi2_window_h_max + 'px;\">';
		
		html1 += '</div><div id=\"bi2_window_error\" style=\"border: 2px; overflow: auto; display: none; \">';
		html1 += '</div></td><td class=\"gran_p\" />\n'
		html1 += '</tr><tr>\n';
		html1 += '<td class=\"gran_nl\" />\n';
		html1 += '<td class=\"gran_n\" />\n';
		html1 += '<td class=\"gran_np\" />\n';
		html1 += '</tr></tbody>\n';
		html1 += '</table>\n';
		html1 += '</div>';
		bi2_window = document.createElement('div');
		bi2_window.id = 'bi2_window';
		bi2_window.innerHTML = html1;
		
		bi2_window.setAttribute('style', 'position: absolute; left: ' + aWindow.bi2_l1 + 'px; top: ' + aWindow.bi2_t1 + 'px; z-index:250');
		document.body.appendChild(bi2_window);
	}
	bi2_window.style.display = 'block';
	if (aWindow.bi2_window_flag2 == 0){
	    aWindow.bi2_minimize_window();
	}
}

aWindow.bi2_show_panel = function(){
	bi2_title = document.getElementById('bi2_title');
	html0 = '';
	
	if (!bi2_title) {
		html0 += '<div id=\"bi2_form0\" style=\"width:' + aWindow.bi2_w0 + 'px; text-align:left;\">\n';
		html0 += '<table class=\"shadow_table\" align=\"left\"><tbody>\n';
		html0 += '<tr>';
		html0 += '<td class=\"gran_vl\" />\n';
		html0 += '<td class=\"gran_v\" />\n';
		html0 += '<td class=\"gran_vp\" />\n';
		html0 += '</tr><tr>\n';
		html0 += '<td class=\"gran_l\" />\n';
		html0 += '<td style=\"background-color:#302010; text-align:center; font-weight:bold; color:white;\">';
		html0 += '<span>';
		html0 += '<a href=\"javascript:bi2_minimize_title();\"' + aWindow.bi2_tlink + ' title=\"Свернуть\">&nbsp;_&nbsp;</a>&nbsp;';
		html0 += '<a href=\"javascript:bi2_stretch_title();\"' + aWindow.bi2_tlink + ' title=\"Развернуть\">&nbsp;^&nbsp;</a>&nbsp;';
		html0 += '<a href=\"javascript:bi2_close_title();\"' + aWindow.bi2_tlink + ' title=\"Закрыть\">&nbsp;*&nbsp;</a>&nbsp;';
		html0 += '</span>';
		html0 += '<span id=\"bi2_title_cap\" style=\"font-size:14px;\">Поиск&nbsp;&laquo;лучших&raquo;&nbsp;вещей</span>';
		html0 += '<input type=\"button\" value=\"Поиск\" style=\"float:right; font-weight:bold\" onclick=\"javascript:bi2_worker(true)\"/>';
		html0 += '</td><td class=\"gran_p\" />\n'
		html0 += '</tr><tr id=\"bi2_title_content_row\">\n';
		html0 += '<td class=\"gran_l\" />\n';
		html0 += '<td id=\"bi2_title_content0\" class=\"shadow_content\" style=\"width:' + (aWindow.bi2_w0 - 12) + 'px;\" >';
		html0 += '<div id=\"bi2_title_content\" style=\"overflow: auto; height: ' + aWindow.bi2_title_h_mid + 'px;\">';
		
		html0 += '\
<form id=\"bi2_form\">\
	<div id=\"bi2_vselect\">';
		html0 += aWindow.bi2_simselect;
		html0 += aWindow.bi2_conselect;
		
		html0 += '</div>\
	<div' + aWindow.bi2_vblock + '>\
	<div style=\"float:right;\" >Жизнь&nbsp;(форт)&nbsp;&nbsp;<input id=\"bi2_fort_hp\" name=\"bi2_fort_hp\ type=\"text\" value=\"0\" size=\"4\">&nbsp;</div>\
	<input type= \"button\" title=\"Показывает не больше семи предметов каждого типа (из всех, с выбранными параметрами отбора) с наибольшими ТО, без учёта комплектов.\" value=\"Вещи с ТО\" style=\"float:right; clear:right;\" onclick=\"javascript:bi2_worker(false)\"/>\
	<input id=\"bi2_skol_rabot_v\" name=\"bi2_skol_rabot\" type=\"radio\" value=\"v\" style=\"margin:auto 5px;\" /> Всё\
	<input id=\"bi2_skol_rabot_r\" name=\"bi2_skol_rabot\" type=\"radio\" value=\"r\" style=\"margin:auto 5px;\" /> Все&nbsp;работы<br />\
	<input id=\"bi2_skol_rabot_o\" name=\"bi2_skol_rabot\" type=\"radio\" value=\"o\" checked=\"checked\" style=\"margin:auto 5px;\" onchange=\"javascript:bi2_vselect(false);void(0)\" /> Одна&nbsp;работа<br />\
	<input id=\"bi2_skol_rabot_n\" name=\"bi2_skol_rabot\" type=\"radio\" value=\"n\" style=\"margin:auto 5px;\" onchange=\"javascript:bi2_vselect(true);void(0)\" /> Несколько&nbsp;работ<br />\
	<input id=\"bi2_skol_rabot_s\" name=\"bi2_skol_rabot\" type=\"radio\" value=\"s\" style=\"margin:auto 5px;\" /> Навык&nbsp;&nbsp;&nbsp;&nbsp;';

		html0 +='<select class=\"bi2_sel\" id=\"bi2_rabota20\" size=\"1\" onchange=\"javascript:$(\'bi2_skol_rabot_s\').checked=true;\">\
	<option value=\"0\">-</option>';
	for (ii=0;ii<aWindow.bi2_vse_navyki.length;++ii)
	{
		html0 += '<option value=\"'+(ii+1)+'\">	'+ aWindow.Character.skill_titles[aWindow.bi2_vse_navyki[ii]]+'</option>';
	};
		html0 += '\
	</select><br />\
	<input id=\"bi2_skol_rabot_i\" name=\"bi2_skol_rabot\" type=\"radio\" value=\"i\" style=\"margin:auto 5px;\" />&nbsp; Дроп&nbsp;&nbsp;&nbsp;&nbsp;';

	    html0 +='\
	<select class=\"bi2_sel\" id=\"bi2_rabota99\" size=\"1\" onchange=\"javascript:$(\'bi2_skol_rabot_i\').checked=true;\">\
	<option value=\"0\">-</option>';
	var tmp=[];
	for (ii=700;ii<800;++ii){
		tmp[ii]={};
		tmp[ii].ves = aWindow.items[ii] ? aWindow.items[ii].name : '-';
		tmp[ii].id = ii;
	}
	aWindow.qsort(tmp,700,799);
	for (ii=700;ii<800;++ii)
	{
		if (tmp[ii].ves !== '-')
			html0 += '<option value=\"'+tmp[ii].id+'\">	'+ tmp[ii].ves+'</option>';
	};

		html0 += '\
	</select><br />\
	\
	</div>\
	<!--<div style=\"text-align:left; font-weigth:normal; color:#b8a080; background-color:black; padding-left: 30px;\">Все&nbsp;работы</div>-->\
	<div' + aWindow.bi2_vblock + '>\
	    <span title=\"После перебора всех работ скрипт может обнаружить вещи, которые не использовались и подсчитать продажную стоимость этих вещей. При нехватке наличности эти вещи можно безбоязненно сбыть.\"><input id=\"bi2_khlam\" type=\"checkbox\" style=\"margin:auto 25px auto 29px;\" />\
		&nbsp; &nbsp;Поиск неиспользуемых вещей</span>\
	<!--<div style=\"text-align:left; font-weigth:normal; color:#b8a080; background-color:black; padding-left: 30px;\"><span id=\"bi2_sk_rabot\">Одна&nbsp;работа&nbsp;&nbsp;&nbsp;&nbsp;</span>\
	</div>-->\
		<span title=\"Дополнительно ищется набор предметов для максимальной скорости движения и с доступностью для выбранной работы. Полезно для отправки к удалённым работам, с последующим переодеванием в нормальные рабочие вещи.\">\
		<br><input id=\"bi2_skorost\" type=\"checkbox\" style=\"margin:auto 25px auto 29px;\" />\
		&nbsp;&nbsp; Быстрейшее&nbsp;передвижение к&nbsp;работе?<br/></span>\
	    <span id=\"sp_tst_st3456\" title=\"Хочется поработать, но немного не хватает ТО? Не беда, за деньги можно найти вещи, которые сделают доступной нужную работу.\">\
		<input id=\"bi2_pokupka\" type=\"checkbox\" style=\"margin:auto 25px auto 29px;\" onchange=\"javascript:if (checked) {$(\'bi2_ukr_bablo\').style.display=\'block\'}else{$(\'bi2_ukr_bablo\').style.display=\'none\'};void(0)\" />&nbsp;&nbsp;&nbsp; Докупаем вещи получше?<br /></span>\
		<div id=\"bi2_ukr_bablo\" style=\"display:none;\">\
		<span title=\"Средства, которые вы готовы заплатить за доступ к работам. Для самых богатых есть пункт ниже.\">\
		&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;<input id=\"bi2_bablo\" type=\"text\" value=\"0\" size=\"1\" onchange=\"javascript:value = parseInt(value,10);if((value<0)||isNaN(value))value=0;void(0)\" />\
		&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;Имеется&nbsp;денег&nbsp;на&nbsp;покупки<br /></span>\
		<span title=\"Вы готовы тратить и тратить любые суммы на экипирование себя любимого? Скрипт вам поможет, причём этот флажок значительно ускорит поиск необходимой &laquo;лучшей&raquo; вещи.\">\
		<input id=\"bi2_milion\" type=\"checkbox\" style=\"margin:auto 25px auto 29px;\" />&nbsp;&nbsp;&nbsp; Расходы неограничены<br /></span>\
		</div>\
		<span title=\"Трость, гаечный ключ и ботинки со шнурками... Этих или подобных вещей нет в вашем гардеробе, но представить, как изменилась бы ваша жизнь, если б они появились, очень хочется? Не беда, скрипт поможет. Правда, вещи для другого класса и пола надеть всё равно не получится, но всё, что подходит, будет принято во внимание при расчётах.\">\
		<input id=\"bi2_vse_vse\" type=\"checkbox\" style=\"margin:auto 25px auto 29px;\" />&nbsp;&nbsp;&nbsp; Мечтаем&nbsp;о&nbsp;квестовых&nbsp;и&nbsp;дропе?<br /></span>\
		<div' + aWindow.bi2_vblock + '>\
		<span title=\"Здесь можно выбрать определённую вещь и посмотреть, на скольких и каких работах она будет использоваться.\">\
		<input id=\"bi2_khochuka\" type=\"checkbox\" style=\"margin:auto 23px auto 23px;\" onchange=\"javascript:if (checked) {$(\'bi2_ukr_khochuka\').style.display=\'block\'}else{$(\'bi2_ukr_khochuka\').style.display=\'none\';bi2_ovselect();};void(0)\" />&nbsp;&nbsp; &nbsp; Полезность отсутствующих вещей</span>\
		<div id=\"bi2_ukr_khochuka\" style=\"display:none;\">\
		<span title=\"При выборе этого пункта в расчёт будут приняты все видимые вещи из ранее открывавшихся магазинов.\">\
		<input id=\"bi2_smo_mag\" type=\"checkbox\" style=\"margin:auto 23px auto 23px;\" >&nbsp;&nbsp; &nbsp; Импортировать вещи из магазина(-ов).</span>\
		<select title=\"Выбор нескольких вещей &mdash; с нажатой клавишей Ctrl\" class=\"bi2_sel\" multiple=\"multiple\" id=\"bi2_dobavim_veschi\" size=\"5\">;';
		
    for (vv = 1; vv < 900; ++vv){
        if ((vv >= 100)&&(vv < 200)) continue;
        if ((vv >= 700)&&(vv < 800)) continue;
        if (vv == 1) {html0+='<optgroup title=\"Холодное оружие\" label=\"Холодное оружие\">'}
        if (vv == 200) {html0+='<optgroup title=\"Головные уборы\" label=\"Головные уборы\">'}
        if (vv == 300) {html0+='<optgroup title=\"Одежда\" label=\"Одежда\">'}
        if (vv == 400) {html0+='<optgroup title=\"Обувь\" label=\"Обувь\">'}
        if (vv == 500) {html0+='<optgroup title=\"Шейные повязки\" label=\"Шейные повязки\">'}
        if (vv == 600) {html0+='<optgroup title=\"Животные\" label=\"Животные\">'}
        if (vv == 800) {html0+='<optgroup title=\"Стрелковое оружие\" label=\"Стрелковое оружие\">'}
        if (aWindow.items[vv]){
            html0 +='<option value=\"'+vv+'\">	'+aWindow.items[vv].name+'	</option>';
        }
    }
    html0 += '</optgroup><optgroup title=\"Остатки комплектов\" label=\"Остатки комплектов\">';
    html0 += '<option value=\"792\">	'+aWindow.items[792].name+'	</option>';
    html0 += '<option value=\"794\">	'+aWindow.items[794].name+'	</option>';
    html0 += '<option value=\"797\">	'+aWindow.items[797].name+'	</option>';
    html0 += '<option value=\"768\">	'+aWindow.items[768].name+'	</option>';
    html0 += '<option value=\"723\">	'+aWindow.items[723].name+'	</option>';
    html0 += '<option value=\"1715\">	'+aWindow.items[1715].name+'	</option>';
    html0 += '<option value=\"854\">	'+aWindow.items[854].name+'	</option>';		
    html0 += '</optgroup>';
html0 += '</select></div></div>\
		<span title=\"Живёте сегодняшним днём, но задумываетесь о будущем? Тогда можно посмотреть, какие вещи будут необходимы и полезны уровней через 5. Увеличивает отбор по уровню на заданное число. Навыки и характеристики применяются текущие.\">&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;<input id=\"bi2_uroven\" type=\"text\" value=\"0\" size=\"1\" onchange=\"javascript:value = parseInt(value,10);if(isNaN(value))value=0;void(0)\" />\
		&nbsp;&nbsp;&nbsp; &nbsp; Выбор уровня персонажа<br /></span>\
	<div' +
		aWindow.bi2_vblock +
		'>\
		<span title=\"При выборе этого пункта скрипт ищет вещи не с наибольшим ТО, а с ТО не меньше заданного, но с максимальными боевыми навыками.\"><input id=\"bi2_zaschita\" type=\"checkbox\" style=\"margin:auto 21px auto 23px;\" onchange=\"javascript:if (checked) {$(\'bi2_ukr_zaschita\').style.display=\'block\'}else{$(\'bi2_ukr_zaschita\').style.display=\'none\'};void(0)\" />&nbsp;&nbsp; &nbsp; Сопротивляемся&nbsp;нападающим?<br /></span>\
	<div id=\"bi2_ukr_zaschita\" style=\"display:none;\">\
		<span title=\"Боевые навыки: удар, меткость, увёртливость, тактика, здоровье (со значением 0,5 рефлекса и стойкости)\"><input id=\"bi2_zaschita_vm\" name=\"bi2_zaschita_v\" type=\"radio\" value=\"m\" style\"margin:auto 5px;\" />&nbsp;Ударник&nbsp;</span>\
		<span title=\"Боевые навыки: стрельба, меткость, увёртливость, тактика, здоровье (со значением 0,5 рефлекса и стойкости)\"><input id=\"bi2_zaschita_vr\" name=\"bi2_zaschita_v\" type=\"radio\" value=\"r\" style\"margin:auto 5px;\" />&nbsp;Стрелок&nbsp;</span>\
		<span title=\"Боевые навыки: увёртливость, тактика, здоровье (со значением 0,5 рефлекса и стойкости)\"><input id=\"bi2_zaschita_vd\" name=\"bi2_zaschita_v\" type=\"radio\" checked=\"checked\" value=\"d\" style\"margin:auto 5px;\" />&nbsp;&laquo;Выжить&nbsp;бы&raquo;<br /></span>\
		<span title=\"Боевые навыки: берутся из конструктора (ниже) все навыки с заявленным значением.\"><input id=\"bi2_zaschita_vk\" name=\"bi2_zaschita_v\" type=\"radio\" value=\"k\" style\"margin:auto 5px;\" />&nbsp;Используем&nbsp;навыки&nbsp;из&nbsp;конструктора<br /></span>\
		<span title=\"Для заданной работы (работ) ТО будут не меньше указанного. Все &laquo;излишки&raquo; скрипт попытается использовать на боевые навыки.\">&nbsp;&nbsp;&nbsp;&nbsp;<input id=\"bi2_zaschitato\" type=\"text\" value=\"' +
		aWindow.bi2_zaschitato +
		'\" size=\"1\" onchange=\"javascript:value = parseInt(value,10);if((value<0)||isNaN(value))value=0;void(0)\" />&nbsp; &nbsp; &nbsp; &nbsp; Минимум&nbsp;ТО&nbsp;(рабочих)&nbsp;<br /></span>\
		</div></div>\
		\
	<div' +
		aWindow.bi2_vblock +
		'>\
		<span title=\"Здесь можно выбрать слоты (части тела), которые будут браться для экипировки; то есть скрипт не будет подбирать другие (неодетые) предметы для отмеченных слотов.\"><input id=\"bi2_sloty\" value=\"bi2_sloty\" type=\"checkbox\" onchange=\"javascript:if (checked) {$(\'bi2_sloty_content\').style.display=\'block\'}else{$(\'bi2_sloty_content\').style.display=\'none\'};void(0)\" style=\"margin:auto 23px auto 23px;\" />&nbsp;&nbsp; &nbsp; Слоты для экипировки:<br /></span>\
		<div id=\"bi2_sloty_content\" style=\"display:none; \">\
	<div' +
		aWindow.bi2_vblock +
		'>\
		<input name=\"bi2_slot_selecter\" type=\"radio\" style=\"margin:auto auto auto 23px;\" onchange=\"javascript:bi2_slot_selector(\'head\');void(0);\"/>\
		<input id=\"bi2_head\" type=\"checkbox\" checked=\"1\" style=\"margin:auto 40px auto 44px;\" />Головной убор<br />\
		<input name=\"bi2_slot_selecter\" type=\"radio\" style=\"margin:auto auto auto 23px;\" onchange=\"javascript:bi2_slot_selector(\'neck\');void(0);\"/>\
		<input id=\"bi2_neck\" type=\"checkbox\" checked=\"1\" style=\"margin:auto 40px auto 44px;\" />Шейная повязка<br />\
		<input name=\"bi2_slot_selecter\" type=\"radio\" style=\"margin:auto auto auto 23px;\" onchange=\"javascript:bi2_slot_selector(\'body\');void(0);\"/>\
		<input id=\"bi2_body\" type=\"checkbox\" checked=\"1\" style=\"margin:auto 40px auto 44px;\" />Одежда<br />\
		<input name=\"bi2_slot_selecter\" type=\"radio\" style=\"margin:auto auto auto 23px;\" onchange=\"javascript:bi2_slot_selector(\'right_arm\');void(0);\"/>\
		<input id=\"bi2_right_arm\" type=\"checkbox\" checked=\"1\" style=\"margin:auto 40px auto 44px;\" />Дуэльное оружие<br />\
		<input name=\"bi2_slot_selecter\" type=\"radio\" style=\"margin:auto auto auto 23px;\" onchange=\"javascript:bi2_slot_selector(\'left_arm\');void(0);\"/>\
		<input id=\"bi2_left_arm\" type=\"checkbox\" checked=\"1\" style=\"margin:auto 40px auto 44px;\" />Фортовое оружие<br />\
		<input name=\"bi2_slot_selecter\" type=\"radio\" style=\"margin:auto auto auto 23px;\" onchange=\"javascript:bi2_slot_selector(\'foot\');void(0);\"/>\
		<input id=\"bi2_foot\" type=\"checkbox\" checked=\"1\" style=\"margin:auto 40px auto 44px;\" />Обувь<br />\
		<input name=\"bi2_slot_selecter\" type=\"radio\" style=\"margin:auto auto auto 23px;\" onchange=\"javascript:bi2_slot_selector(\'animal\');void(0);\"/>\
		<input id=\"bi2_animal\" type=\"checkbox\" checked=\"1\" style=\"margin:auto 40px auto 44px;\" />Верховое животное<br />\
		<input name=\"bi2_slot_selecter\" type=\"radio\" style=\"margin:auto auto auto 23px;\" onchange=\"javascript:bi2_slot_selector(\'yield\');void(0);\"/>\
		<input id=\"bi2_yield\" type=\"checkbox\" checked=\"1\" style=\"margin:auto 40px auto 44px;\" />Продукт<br />\
		</div></div></div>\
	<div' +
		aWindow.bi2_vblock +
		'>\
		<span title=\"Здесь можно составить произвольную &laquo;работу&raquo;, задав её сложность и любые необходимые навыки со значением от 0 до 5 (можно применять дробные числа).\n Используя ограничение по слотам и выбранный навык со значением 1, можно подбирать вещи для квестов вида {меткость = 27 с бонусом, приходи в чёрных лохмотьях и серых ботинках}.\n Либо, если задействована защита и соответствующий выбор конструктора, данные навыки рассматриваются как боевые и заменяют предустановки."><input id=\"bi2_navyki\" value=\"bi2_sloty\" type=\"checkbox\" onchange=\"javascript:if (checked) {$(\'bi2_navyki_content\').style.display=\'block\'}else{$(\'bi2_navyki_content\').style.display=\'none\'};void(0)\" style=\"margin:auto 21px auto 23px;\" />\
		&nbsp;&nbsp; &nbsp;Конструкция&nbsp;произвольных&nbsp;навыков<br /></span>\
		<div id=\"bi2_navyki_content\" style=\"display:none; \">\
	<div' +
		aWindow.bi2_vblock +
		'>\
		<input id=\"bi2_malus\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseInt(value,10);if((value< -32767)||(value>32767)||isNaN(value))value=0;void(0)\" />&nbsp;&laquo;Сложность&raquo; работы<br />\
	<div style=\"color:red; font-weight:bold;\">\
		<input id=\"bi2_build\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseFloat(value);if((value<0)||(value>5)||isNaN(value))value=0;void(0)\" />&nbsp;Строительство<br />\
		<input id=\"bi2_punch\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseFloat(value);if((value<0)||(value>5)||isNaN(value))value=0;void(0)\" />&nbsp;Удар<br />\
		<input id=\"bi2_tough\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseFloat(value);if((value<0)||(value>5)||isNaN(value))value=0;void(0)\" />&nbsp;Стойкость<br />\
		<input id=\"bi2_endurance\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseFloat(value);if((value<0)||(value>5)||isNaN(value))value=0;void(0)\" />&nbsp;Выносливость<br />\
		<input id=\"bi2_health\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseFloat(value);if((value<0)||(value>5)||isNaN(value))value=0;void(0)\" />&nbsp;Здоровье<br />\
	</div><div style=\"color:green; font-weight:bold;\">\
		<input id=\"bi2_ride\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseFloat(value);if((value<0)||(value>5)||isNaN(value))value=0;void(0)\" />&nbsp;Верховая езда<br />\
		<input id=\"bi2_reflex\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseFloat(value);if((value<0)||(value>5)||isNaN(value))value=0;void(0)\" />&nbsp;Реакция<br />\
		<input id=\"bi2_dodge\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseFloat(value);if((value<0)||(value>5)||isNaN(value))value=0;void(0)\" />&nbsp;Увёртливость<br />\
		<input id=\"bi2_hide\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseFloat(value);if((value<0)||(value>5)||isNaN(value))value=0;void(0)\" />&nbsp;Маскировка<br />\
		<input id=\"bi2_swim\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseFloat(value);if((value<0)||(value>5)||isNaN(value))value=0;void(0)\" />&nbsp;Плаванье<br />\
	</div><div style=\"color:blue; font-weight:bold;\">\
		<input id=\"bi2_aim\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseFloat(value);if((value<0)||(value>5)||isNaN(value))value=0;void(0)\" />&nbsp;Меткость<br />\
		<input id=\"bi2_shot\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseFloat(value);if((value<0)||(value>5)||isNaN(value))value=0;void(0)\" />&nbsp;Стрельба<br />\
		<input id=\"bi2_pitfall\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseFloat(value);if((value<0)||(value>5)||isNaN(value))value=0;void(0)\" />&nbsp;Установка ловушек<br />\
		<input id=\"bi2_finger_dexterity\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseFloat(value);if((value<0)||(value>5)||isNaN(value))value=0;void(0)\" />&nbsp;Проворство<br />\
		<input id=\"bi2_repair\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseFloat(value);if((value<0)||(value>5)||isNaN(value))value=0;void(0)\" />&nbsp;Ремонт<br />\
	</div><div style=\"color:#960; font-weight:bold;\">\
		<input id=\"bi2_leadership\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseFloat(value);if((value<0)||(value>5)||isNaN(value))value=0;void(0)\" />&nbsp;Руководство<br />\
		<input id=\"bi2_tactic\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseFloat(value);if((value<0)||(value>5)||isNaN(value))value=0;void(0)\" />&nbsp;Тактика<br />\
		<input id=\"bi2_trade\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseFloat(value);if((value<0)||(value>5)||isNaN(value))value=0;void(0)\" />&nbsp;Торговля<br />\
		<input id=\"bi2_animali\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseFloat(value);if((value<0)||(value>5)||isNaN(value))value=0;void(0)\" />&nbsp;Обращение&nbsp;с&nbsp;животными<br />\
		<input id=\"bi2_appearance\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseFloat(value);if((value<0)||(value>5)||isNaN(value))value=0;void(0)\" />&nbsp;Блеф<br />\
	</div>\
		</div></div></div>\
	</div>\
</form>';
		
		html0 += '</div>';
		html0 += '</td><td class=\"gran_p\" />\n'
		html0 += '</tr><tr>\n';
		html0 += '<td class=\"gran_nl\" />\n';
		html0 += '<td class=\"gran_n\" />\n';
		html0 += '<td class=\"gran_np\" />\n';
		html0 += '</tr></tbody>\n';
		html0 += '</table>\n';
		html0 += '</div>';
		
		bi2_title = document.createElement('div');
		bi2_title.id = 'bi2_title';
		bi2_title.innerHTML = html0;
		
		bi2_title.setAttribute('style', 'position: absolute; left: ' + aWindow.bi2_l0 + 'px; top: ' + aWindow.bi2_t0 + 'px; z-index:202');
		document.body.appendChild(bi2_title);
		}
	bi2_title.style.display = 'block';
		
}

var bi2_body, bi2_script, bi2_style, bi2_head; 
bi2_body = document.getElementsByTagName('body')[0];

bi2_script = document.createElement('script');
bi2_script.type = 'text/javascript';
bi2_script.innerHTML = bi2_code;
bi2_body.appendChild(bi2_script);

bi2_stext=''
bi2_stext+='.tt:hover{\n';
bi2_stext+='position:relative;\n';
bi2_stext+='z-index:23;\n';
bi2_stext+='}\n';
bi2_stext+='.tt span{\n';
bi2_stext+='display:none;\n';
bi2_stext+='}\n';
bi2_stext+='.tt:hover span{\n';
bi2_stext+='display:block;\n';
bi2_stext+='position:absolute;\n';
bi2_stext+='top:10px;\n';
bi2_stext+='left:15px;\n';
bi2_stext+='background:#b6ab92;\n';
bi2_stext+='border:2px solid #000;\n';
bi2_stext+='color:#000;\n';
bi2_stext+='opacity:0.8;\n';
bi2_stext+='z-index:20;\n';
bi2_stext+='padding:5px;\n';
bi2_stext+='font-size:12px;\n';
bi2_stext+='cursor:pointer;\n';
bi2_stext+='text-decoration:none;\n';
bi2_stext+='}\n';
bi2_stext+='.tt2:hover{\n';
bi2_stext+='position:relative;\n';
bi2_stext+='z-index:23;\n';
bi2_stext+='}\n';
bi2_stext+='.tt2 span{\n';
bi2_stext+='display:none;\n';
bi2_stext+='}\n';
bi2_stext+='.tt2:hover span{\n';
bi2_stext+='display:block;\n';
bi2_stext+='position:absolute;\n';
bi2_stext+='top:40px;\n';
bi2_stext+='left:-70px;\n';
bi2_stext+='background:#b6ab92;\n';
bi2_stext+='border:2px solid #000;\n';
bi2_stext+='color:#000;\n';
bi2_stext+='opacity:0.8;\n';
bi2_stext+='z-index:21;\n';
bi2_stext+='padding:5px;\n';
bi2_stext+='font-size:12px;\n';
bi2_stext+='cursor:pointer;\n';
bi2_stext+='text-decoration:none;\n';
bi2_stext+='font-weight:normal;\n';
bi2_stext+='}\n';
bi2_stext+='.tt3:hover{\n';
bi2_stext+='position:relative;\n';
bi2_stext+='z-index:23;\n';
bi2_stext+='}\n';
bi2_stext+='.tt3 span{\n';
bi2_stext+='display:none;\n';
bi2_stext+='}\n';
bi2_stext+='.tt3:hover span{\n';
bi2_stext+='display:block;\n';
bi2_stext+='position:absolute;\n';
bi2_stext+='top:40px;\n';
bi2_stext+='left:-100px;\n';
bi2_stext+='background:#b6ab92;\n';
bi2_stext+='border:2px solid #000;\n';
bi2_stext+='color:#000;\n';
bi2_stext+='opacity:0.8;\n';
bi2_stext+='z-index:21;\n';
bi2_stext+='padding:5px;\n';
bi2_stext+='font-size:12px;\n';
bi2_stext+='cursor:pointer;\n';
bi2_stext+='text-decoration:none;\n';
bi2_stext+='}\n';
bi2_stext +='\
.bi2_sel {\
    background-color: rgb(232, 218, 179);\
    font-size: 13px;\
}\
.bi2_sel optgroup {\
    background-color:#443;\
    color:white;\
}\
.bi2_sel optgroup option {\
    background-color: rgb(232, 218, 179);\
    color:black;\
}\n';

bi2_stext+='\
.jy_bi {\
	width:43px;\
	height:43px;\
	margin:0px;\
	padding:0px;\
	text-align: center;\
	font-size: 11px;\
	font-weight: bold;\
	font-style: normal;\
	background-image:url(../images/inventory/yield.png);\
	background-repeat: no-repeat;\
}';
bi2_stext+='\
.jy_bi img {\
	width:43px;\
	height:43px;\
}';
bi2_stext+='\
.jy_bi2 {\
	margin:0px;\
	padding:0px;\
	text-align: center;\
	font-size: 10px;\
	font-weight: bold;\
	text-align: center;\
	font-style: normal;\
}';
bi2_stext+='\
.gran_vl {\
    background: transparent url(images/border/edge_tl_small.png) no-repeat scroll 0% 0%; height: 6px; padding:0;\
}';
bi2_stext+='\
.gran_v {\
    background: transparent url(images/border/border_t.png) repeat-x scroll 0% 0%; padding:0;\
}';
bi2_stext+='\
.gran_vp {\
    background: transparent url(images/border/edge_tr_small.png) no-repeat scroll 0% 0%; padding:0; width: 6px; height: 6px;\
}';
bi2_stext+='\
.gran_l {\
    background: transparent url(images/border/border_l.png) repeat-y scroll 0% 0%; width: 6px; padding:0;\
}';
bi2_stext+='\
.gran_p {\
    background: transparent url(images/border/border_r.png) repeat-y scroll right center; padding:0; width: 6px;\
}';
bi2_stext+='\
.gran_nl {\
    background: transparent url(images/border/edge_bl.png) no-repeat scroll 0% 0%; height: 6px; width: 6px; padding:0;\
}';
bi2_stext+='\
.gran_n {\
    background: transparent url(images/border/border_b.png) repeat-x scroll 0% 0%; padding:0;\
}';
bi2_stext+='\
.gran_np {\
    background: transparent url(images/border/edge_br.png) no-repeat scroll 0% 0%; padding:0; height: 6px; width: 6px;\
}';

bi2_head = document.getElementsByTagName('head')[0];
bi2_style = document.createElement('style');
bi2_style.type = 'text/css';
if (bi2_style.styleSheet) {
     bi2_style.styleSheet.cssText = bi2_stext;
} else {
    if (bi2_style.innerText == '') {
	bi2_style.innerText = bi2_stext;
    } else {
	bi2_style.innerHTML = bi2_stext;
    }
}
bi2_head.appendChild(bi2_style);

aWindow.bi2_getValue(aWindow.bi2_pre+'odev_list');
aWindow.setTimeout(function() {eval(aWindow.bi2_abyrvalg)},500);

aWindow.bi2_odev_spam();


//======================================== INVENTORY (TheWest++) ====================================


function inv_updateTotalSellPrice (inv)
{
    var inv_TotalSellPrice = document.getElementById("inv_TotalSellPrice");
	if (!inv_TotalSellPrice)
	{
		inv_TotalSellPrice = document.createElement('div');
		inv_TotalSellPrice.setAttribute('id','inv_TotalSellPrice');
		inv.appendChild(inv_TotalSellPrice);
	}
	var equipworth=0;
	var bagworth=0; 
	var productworth=0; 
	var otherworth=0; 
	var bagInstance = unsafeWindow.Bag.getInstance();
	for(var p in bagInstance.items) 
	{ 
		var v = bagInstance.items[p].get_sell_price() * bagInstance.items[p].get_count_value();
		bagworth = bagworth + v;
		if (bagInstance.items[p].get_type()=='yield')
			productworth = productworth + v;
		else
			otherworth = otherworth + v;
	} 
	var w = unsafeWindow.Wear.wear;
	if (w.head) equipworth = equipworth + w .head.get_sell_price();
	if (w .body) equipworth = equipworth + w .body.get_sell_price();
	if (w .neck) equipworth = equipworth + w .neck.get_sell_price();
	if (w .right_arm) equipworth = equipworth + w .right_arm.get_sell_price();
	if (w .foot) equipworth = equipworth + w .foot.get_sell_price();
	if (w .yield) equipworth = equipworth + w .yield.get_sell_price();
	if (w .animal) equipworth = equipworth + w .animal.get_sell_price();

	if (w .yield) productworth = productworth + w .yield.get_sell_price();
	
	var total = equipworth + bagworth;
	inv_TotalSellPrice.innerHTML = '<span style="left:67px; top:401px; position: absolute;">Всего:&nbsp;<strong>'+total+' $</strong> (надето:&nbsp;<strong>'+equipworth+' $</strong>)</span><span style="left:435px; top:401px; position: absolute;">Багаж:&nbsp;<strong>'+bagworth+' $</strong> (продукты:&nbsp;<strong>'+productworth+' $</strong>)</span>';
}

function checkWindows_ToAddFeatures ( )
{
  var inv = document.getElementById("window_inventory_content");
  if (inv)
  {
	inv_updateTotalSellPrice(inv);	
  }  
  
  setTimeout ( checkWindows_ToAddFeatures, 2000 );
}

setTimeout ( checkWindows_ToAddFeatures, 2000 ); 


//==============================  FULL INVENTORY INFO  ===================================
 
 
(function(){
	var doc = document;
	var console = unsafeWindow.console;
	function $(id) { return(doc.getElementById(id)); }

	function numberFormat(num) {
		var cislo = '';
		num += '';
		while (num.length > 3) {
			cislo = num.substring(num.length - 3) + ' ' + cislo;
			num = num.substring(0,num.length - 3);
		}
		return num + ' ' + cislo;
	}
	
	function convertBagInfo(div) {

		var sell_value = new Array();
		sell_value['neck'] = 0;
		sell_value['head'] = 0;
		sell_value['right_arm'] = 0;
		sell_value['left_arm'] = 0;
		sell_value['body'] = 0;
		sell_value['yield'] = 0;
		sell_value['foot'] = 0;
		sell_value['animal'] = 0;
		sell_value['total'] = 0;
		
		var sell_value_equipped = 0;
		equipped = unsafeWindow.Wear.wear;
		inventory_value = 0;
		inventory = unsafeWindow.Bag.getInstance().items;
		if (equipped.animal) sell_value['animal'] += equipped.animal.get_sell_price();
		if (equipped.body) sell_value['body'] += equipped.body.get_sell_price();
		if (equipped.foot) sell_value['foot'] += equipped.foot.get_sell_price();
		if (equipped.head) sell_value['head'] += equipped.head.get_sell_price();
		if (equipped.neck) sell_value['neck'] += equipped.neck.get_sell_price();
		if (equipped.left_arm) sell_value['left_arm'] += equipped.left_arm.get_sell_price();
		if (equipped.right_arm) sell_value['right_arm'] += equipped.right_arm.get_sell_price();
		if (equipped.yield) sell_value['yield'] += equipped.yield.get_sell_price();
		for (var p in inventory) {
			sell_value[inventory[p].get_type()] += inventory[p].get_sell_price() * inventory[p].get_count_value();
		}
		sell_value['total'] = sell_value['neck'] + sell_value['head'] + sell_value['right_arm'] + sell_value['body'] + sell_value['yield'] + sell_value['foot'] + sell_value['animal'];

		code = '\
			<style type="text/css">\
				table.inventary {\
					padding:0px;\
					margin:10px;\
				}\
				table.inventary td {\
					text-align: right;\
					vertical-align: middle;\
					padding-bottom: 12px;\
					padding:0px;\
				}\
				table.inventary td.hr {\
					height:4px;\
					background:url(data:image/jpeg;base64,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);\
				}\
				table.inventary .type {\
					background:url(data:image/jpeg;base64,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%3D%3D);\
					width:80px;\
					height:50px;\
				}\
				table.inventary th.icon {\
					width:37px;\
				}\
				table.inventary .typebuyown {background-position:-85px 0px;}\
				table.inventary .typesell {background-position:85px 0px;}\
				table.inventary .icon {\
					width:37px;\
					height:40px;\
					background:url(data:image/jpeg;base64,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%3D);\
				}\
				table.inventary .sum {\
					height:30px;\
					font-weight:bold;\
				}\
				table.inventary .iconneck {background-position:0px -40px;}\
				table.inventary .iconhead {background-position:0px -80px;}\
				table.inventary .iconright_arm {background-position:0px -160px;}\
				table.inventary .iconleft_arm {background-position:0px -280px;}\
				table.inventary .iconbody {background-position:0px -240px;}\
				table.inventary .iconfoot {background-position:0px -200px;}\
				table.inventary .iconanimal {background-position:0px -120px;}\
				table.inventary .iconyield {background-position:0px 0px;}\
			</style>\
			<table border="0" cellspacing="0" cellpadding="0" class="inventary">\
				<tr>\
					<th class="iconheader"></th>\
					<th class="type typebuy"></th>\
					<th class="type typebuyown"></th>\
					<th class="type typesell"></th>\
				</tr>\
				<tr>\
					<td></td>\
					<td class="sum">' + numberFormat(sell_value['total']*8) + ' $</td>\
					<td class="sum">' + numberFormat(sell_value['total']*2) + ' $</td>\
					<td class="sum">' + numberFormat(sell_value['total']) + ' $</td>\
				</tr>\
				<tr>\
					<td colspan="4" class="hr"></td>\
				</tr>\
				<tr>\
					<td class="icon iconneck"></td>\
					<td>' + numberFormat(sell_value['neck']*8) + ' $</td>\
					<td>' + numberFormat(sell_value['neck']*2) + ' $</td>\
					<td>' + numberFormat(sell_value['neck']) + ' $</td>\
				</tr>\
				<tr>\
					<td colspan="4" class="hr"></td>\
				</tr>\
				<tr>\
					<td class="icon iconhead"></td>\
					<td>' + numberFormat(sell_value['head']*8) + ' $</td>\
					<td>' + numberFormat(sell_value['head']*2) + ' $</td>\
					<td>' + numberFormat(sell_value['head']) + ' $</td>\
				</tr>\
				<tr>\
					<td colspan="4" class="hr"></td>\
				</tr>\
				<tr>\
					<td class="icon iconright_arm"></td>\
					<td>' + numberFormat(sell_value['right_arm']*8) + ' $</td>\
					<td>' + numberFormat(sell_value['right_arm']*2) + ' $</td>\
					<td>' + numberFormat(sell_value['right_arm']) + ' $</td>\
				</tr>\
				<tr>\
					<td colspan="4" class="hr"></td>\
				</tr>\
				<tr>\
					<td class="icon iconleft_arm"></td>\
					<td>' + numberFormat(sell_value['left_arm']*8) + ' $</td>\
					<td>' + numberFormat(sell_value['left_arm']*2) + ' $</td>\
					<td>' + numberFormat(sell_value['left_arm']) + ' $</td>\
				</tr>\
				<tr>\
					<td colspan="4" class="hr"></td>\
				</tr>\
				<tr>\
					<td class="icon iconbody"></td>\
					<td>' + numberFormat(sell_value['body']*8) + ' $</td>\
					<td>' + numberFormat(sell_value['body']*2) + ' $</td>\
					<td>' + numberFormat(sell_value['body']) + ' $</td>\
				</tr>\
				<tr>\
					<td colspan="4" class="hr"></td>\
				</tr>\
				<tr>\
					<td class="icon iconfoot"></td>\
					<td>' + numberFormat(sell_value['foot']*8) + ' $</td>\
					<td>' + numberFormat(sell_value['foot']*2) + ' $</td>\
					<td>' + numberFormat(sell_value['foot']) + ' $</td>\
				</tr>\
				<tr>\
					<td colspan="4" class="hr"></td>\
				</tr>\
				<tr>\
					<td class="icon iconanimal"></td>\
					<td>' + numberFormat(sell_value['animal']*8) + ' $</td>\
					<td>' + numberFormat(sell_value['animal']*2) + ' $</td>\
					<td>' + numberFormat(sell_value['animal']) + ' $</td>\
				</tr>\
				<tr>\
					<td colspan="4" class="hr"></td>\
				</tr>\
				<tr>\
					<td class="icon iconyield"></td>\
					<td>' + numberFormat(sell_value['yield']*8) + ' $</td>\
					<td>' + numberFormat(sell_value['yield']*2) + ' $</td>\
					<td>' + numberFormat(sell_value['yield']) + ' $</td>\
				</tr>\
				<tr>\
					<td colspan="4" class="hr"></td>\
				</tr>\
				<tr>\
					<td colspan="4" class="hr"></td>\
				</tr>\
				<tr>\
					<td></td>\
					<td class="sum">' + numberFormat(sell_value['total']*8) + ' $</td>\
					<td class="sum">' + numberFormat(sell_value['total']*2) + ' $</td>\
					<td class="sum">' + numberFormat(sell_value['total']) + ' $</td>\
				</tr>\
				<tr>\
					<td class=""></th>\
					<td class="type typebuy"></th>\
					<td class="type typebuyown"></th>\
					<td class="type typesell"></th>\
				</tr>\
			</table>';
		bag = document.getElementById('bag');
		if (document.getElementById('calc')) {
			if (bag.style.display=='none') {
				bag.style.display = 'block';
				calc = document.getElementById('calc');
				calc.style.display = 'none';
			} else {
				bag.style.display = 'none';
				calc = document.getElementById('calc');
				calc.innerHTML = code;
				calc.style.display = 'block';
			}
		} else {
			bag.style.display = 'none';
			bagparent = bag.parentNode;
		    calc = document.createElement('div');
		    calc.innerHTML = code;
			calc.setAttribute('id','calc');
			calc.style.width = '330px';
			calc.style.height = '294px';
			calc.style.overflow = 'auto';
			calc.style.float = 'left';
			calc.style.padding = '5px 0 0 5px';
			calc.style.background = 'url(../images/bgdark.png)';
			bagparent.appendChild(calc);
		}
		calcbutton = document.getElementById('calcbutton');
		if (calcbutton.style.backgroundPosition!='37px 0px') calcbutton.style.backgroundPosition = '37px 0px';
		else calcbutton.style.backgroundPosition = '0px 0px';
	}
	
	function hookInventory(div) {
		if (!document.getElementById('window_inventory')) return;
		div = document.getElementById('window_inventory_content');
		titleRow = div.getElementsByTagName('h2')[0];
	    button = document.createElement('a');
		button.setAttribute('id','calcbutton');
		button.style.background = 'url(data:image/jpeg;base64,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)';
		button.style.width = '37px';
		button.style.height = '37px';
		button.style.position = 'absolute';
		button.style.top = '0px';
		button.style.right = '0px';
		button.style.cursor = 'pointer';
		button.style.display = 'block';
		titleRow.appendChild(button);
		button.addEventListener("click", function() { convertBagInfo(button); }, false);
	}
	
	var loc = doc.location;
	var o_show = unsafeWindow.AjaxWindow.setJSHTML;
	var f = function(div, content) {
		if (!div) return;
		var ret = o_show(div, content);
		hookInventory(div);
		return(ret);
	};
	for(var o in o_show) {
		f[o] = o_show[o];
	}
	unsafeWindow.AjaxWindow.setJSHTML = f;
	
})();


//======================================= DUEL LOGGING =====================================


(function(){
	var doc = document;
	var console = unsafeWindow.console;
	function $(id) { return(doc.getElementById(id)); }
	function xp1(x, p) {
		var r = doc.evaluate(x, p, null, 9, null).singleNodeValue;
		return(r);
	}
	function xp(x, p) {
		var r = doc.evaluate(x, p, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		var len = r.snapshotLength;
		var ar = new Array(len);
		for(var i=0; i<len; i++) {
			ar[i] = r.snapshotItem(i).textContent;
		}
		return(ar);
	}

	function __tf(template, name) {
		for(var elName in template)
		{
			if (template.hasOwnProperty(elName))
			{
				var p = template[elName];
				if (elName == name)
					return(p);
				if (p.children)
				{
					var q = __tf(p.children, name);
					if (q)
						return(q);
				}
			}
		}
		return(null);
	}
	function dc(template, parent)
	{
		for(var elName in template)
		{
			if (template.hasOwnProperty(elName))
			{
				var p = template[elName];
				p.el = doc.createElement(p.tag);
				if (parent)
					parent.appendChild(p.el);
				
				if (p.attrs)
				{
					for(var atName in p.attrs)
					{
						if (p.attrs.hasOwnProperty(atName))
						{
							var atValue = p.attrs[atName];
							if (atName == "text")
								p.el.textContent = atValue;
							else if (atName == "html")
								p.el.innerHTML = atValue;
							else
								p.el.setAttribute(atName, atValue);
						}
					}
				}
				
				if (p.children)
				{
					dc(p.children, p.el);
				}
			}
		}
		template.find = function(name) {
			return(__tf(template, name));
		};
		return(template);
	}
	function trim(str) {
		s = str.replace(/^(\s)*/, '');
		s = s.replace(/(\s)*$/, '');
		return s;
	}
	function whiteSpaceRemove(str) {
		s = str.replace(/\s+/g,' ');
		s = s.replace(/^(\s)*/, '');
		s = s.replace(/(\s)*$/, '');
		return s;
	}
	function antirtrim(str,num) {
		for (istr = str.length; istr<num; istr++)
			str = str + ' ';
		return str;
	}

	function convertTitle(title, player1, player2){
		var p1 = player1.split("\n");
		var p2 = player2.split("\n");
		p1_name = trim(p1[1]);
		p2_name = trim(p2[1]);
		var p1_level = parseInt(p1[2],10);
		p2_level = parseInt(p2[2],10);
		var p1_dlevel = parseInt(p1[3],10);
		var p2_dlevel = parseInt(p2[3],10);
		title = title.replace(p1_name,'[player]'+p1_name+'[/player] ('+p1_level+'/'+p1_dlevel+')');
		title = title.replace(p2_name,'[player]'+p2_name+'[/player] ('+p2_level+'/'+p2_dlevel+')');
		return title;
	}
	function convertHits(hits1, hits2) {
		var hits = antirtrim(p1_name,30)+p2_name+'\n';
		reg = new RegExp(".*: (.*)");
		for (i=0; i<hits1.length;i++) {
			if ((hits1[i].indexOf(':') != -1) || (i == hits1.length-1)) {
				if (hits1[i].indexOf(':') != -1) {hits1[i] = whiteSpaceRemove(hits1[i]).split(reg)[1];} else {hits1[i] = whiteSpaceRemove(hits1[i]);}
				if (hits1[i].indexOf('-') != -1){hits1[i] = hits1[i].substr(0,hits1[i].lastIndexOf(' '));}
				} else {
					hits1[i] = whiteSpaceRemove(hits1[i]);
					}
			if ((hits2[i].indexOf(':') != -1) || (i == hits2.length-1)) {
				if (hits2[i].indexOf(':') != -1) {hits2[i] = whiteSpaceRemove(hits2[i]).split(reg)[1];} else {hits2[i] = whiteSpaceRemove(hits2[i]);}
				if (hits2[i].indexOf('-') != -1){hits2[i] = hits2[i].substr(0,hits2[i].lastIndexOf(' '));}
				} else {
					hits2[i] = whiteSpaceRemove(hits2[i]);
					}

			hits += antirtrim(hits1[i],30)+hits2[i]+'\n';
			if (i == 3 || i == hits1.length-2) {hits += '\n';}
			}
	return hits+'\n';
	}
	function convertFlashHits(hits) {
		hits_pom = hits.split('|');
		var hits1_dmg = new Array();
		var hits1_int = new Array();
		var hits1 = new Array();
		var hits2 = new Array();
		var hits2_dmg = new Array();
		var hits2_int = new Array();
		for (i=0; i<8; i++) {
			hits2_dmg[i] = hits_pom[i];
		}
		for (i=8; i<16; i++) {
			hits1_dmg[i-8] = hits_pom[i];
		}
		for (i=16; i<24; i++) {
			hits1_int[i-16] = hits_pom[i];
		}
		for (i=24; i<32; i++) {
			hits2_int[i-24] = hits_pom[i];
		}
		n = 8;
		hits = '';
		hits1[8] = 0;
		hits2[8] = 0;
		for (i = 0; i<n; i++) {
			if (hits1_dmg[i] < 0 || hits2_dmg[i]<0) {n=i;}
			hits1_dmg[i] = Math.abs(hits1_dmg[i]);
			switch (hits1_int[i]) {
				case '1': {hits1[i] = 'Голова - '+hits1_dmg[i]; break;}
				case '2': {hits1[i] = 'Левое плечо - '+hits1_dmg[i]; break;}
				case '3': {hits1[i] = 'Правое плечо - '+hits1_dmg[i]; break;}
				case '4': {hits1[i] = 'Левая рука - '+hits1_dmg[i]; break;}
				case '5': {hits1[i] = 'Правая рука - '+hits1_dmg[i]; break;}
				default:  {hits1[i] = 'Мимо';}
			}
			if (hits1_dmg[i] == 0) {hits1[i] = 'Мимо';}
			hits1[8] += hits1_dmg[i];
			hits2_dmg[i] = Math.abs(hits2_dmg[i]);
			switch (hits2_int[i]) {
				case '1': {hits2[i] = 'Голова - '+hits2_dmg[i]; break;}
				case '2': {hits2[i] = 'Левое плечо - '+hits2_dmg[i]; break;}
				case '3': {hits2[i] = 'Правое плечо - '+hits2_dmg[i]; break;}
				case '4': {hits2[i] = 'Левая рука - '+hits2_dmg[i]; break;}
				case '5': {hits2[i] = 'Правая рука - '+hits2_dmg[i]; break;}
				default:  {hits2[i] = 'Мимо'; break;}
			}
			if (hits2_dmg[i] == 0) {hits2[i] = 'Мимо';}
			hits2[8] +=hits2_dmg[i];
			hits += antirtrim(hits1[i],30)+hits2[i]+'\n';
			if (i == 3) {hits += '\n';}
		}
		if (hits1[8] != 0) {hits1[8] = 'Суммарный урон - '+hits1[8];} else {hits1[8] = 'Всё мимо';}
		if (hits2[8] != 0) {hits2[8] = 'Суммарный урон - '+hits2[8];} else {hits2[8] = 'Всё мимо';}
		hits += '\n'+antirtrim(hits1[8],30)+hits2[8]+'\n\n';
		return hits;
	}
	
	function convertDuelReport(div) {
		var x = {};
		x.title = xp1('./table/tbody/tr[2]/td[2]/div/table/tbody/tr', div);
		x.p1 = xp1('./table/tbody/tr[2]/td[2]/div/div/table[1]/tbody/tr/td[1]', div);
		x.loc = xp1('./table/tbody/tr[2]/td[2]/div/div/table[1]/tbody/tr/td[3]', div);
		x.p2 = xp1('./table/tbody/tr[2]/td[2]/div/div/table[1]/tbody/tr/td[5]', div);
		var time = whiteSpaceRemove(trim(x.title.textContent).substring(trim(x.title.textContent).indexOf('\n')));
		var title = convertTitle(whiteSpaceRemove(trim(x.title.textContent).substring(0,trim(x.title.textContent).indexOf('\n'))), x.p1.textContent, x.p2.textContent)+'\n';
		var loc = whiteSpaceRemove(trim(x.loc.textContent).replace('\n',':'))+' ('+time+')\n\n';
		if (div.innerHTML.indexOf('<span style="font-size: 12px; font-weight: bold;">') != -1) {
			x.hitsBody = xp1('./table/tbody/tr[2]/td[2]/div/div/table[2]/tbody', div);
			x.p1hits = xp('./tr/td[1]', x.hitsBody);
			x.p2hits = xp('./tr/td[3]', x.hitsBody);
			x.outcome = xp1('./table/tbody/tr[2]/td[2]/div/div/h4', div);
			
			var hits = convertHits(x.p1hits,x.p2hits);
			var outcome = whiteSpaceRemove(x.outcome.textContent).replace(/\. /g,'.\n');
			} else {
				var x = document.getElementsByName('movie')[0].attributes; 
				var y = x.getNamedItem("value"); 
				var hits = y.value;
				hits = convertFlashHits(hits.substring(hits.indexOf('=')+1,hits.indexOf('&')));
				var outcome = y.value;
				outcome = whiteSpaceRemove(outcome.substring(outcome.lastIndexOf('=')+1)).replace(/\. /g,'.\n');
				}
		ttt = outcome.indexOf('не заработал');
		if (ttt===0)
			ttt = outcome.indexOf(', и') + 2;
		out2 = outcome.substring(0,ttt);
		out3 = outcome.substring(ttt);
		outcome = out2+'\n'+out3;
		var aim=new Array();dodge=new Array();var duel = unsafeWindow.Duel.getInstance();
		for (ii=1;ii<5;++ii){
			if (duel&&duel.dodge) {dodge[ii]=duel.dodge[ii]};
			if(duel&&duel.aim){aim[ii]=duel.aim[ii]}
		};
		out_duel='';
		if (aim[1]&&dodge[1]){
			out_duel = '\n\nПрицелы:\n';
			for (ii=1;ii<5;++ii){
				out_duel+=ii+'/'+(ii+4)+'     ';
				ta='';
				switch (aim[ii]){
				case 'rightarm':
					ta='Правая рука';
					break;
				case 'rightshoulder':
					ta='Правое плечо';
					break;
				case 'head':
					ta='Голова';
					break;
				case 'leftshoulder':
					ta='Левое плечо';
					break;
				case 'leftarm':
					ta='Левая рука';
					break;
				default:
					ta = 'Не определено';
				}
				out_duel+=ta+'\n';
			}
			out_duel += '\nУвороты:\n';
			for (ii=1;ii<5;++ii){
				out_duel+=ii+'/'+(ii+4)+'     ';
				ta='';
				switch (dodge[ii]){
				case 'left':
					ta='Влево';
					break;
				case 'right':
					ta='Вправо';
					break;
				case 'duck':
					ta='Приседание';
					break;
				case 'aim':
					ta='Стойка';
					break;
				default:
					ta = 'Не определено';
				}
				out_duel+=ta+'\n';
			}
		}
		code = title+'[code]'+loc+hits+outcome+out_duel+'[/code]'
		div.innerHTML = '<textarea style="width:100%;height:100%;">' + code + '</textarea>';
		div.childNodes[0].select();
	}
	
	function hookReport(div) {
		var titleRow = xp1('./table/tbody/tr[2]/td[2]/div/table/tbody/tr', div);
		if (!titleRow) return;

		if (!titleRow.textContent.match(/Дуэль:/))
			return;
		var t = dc({
			"th": { 
				tag: "th", 
				children: {
					"btn": {
						tag: "button",
						attrs: {
							text: " ",
							title: "Конвертировать в текстовый формат",
							style: "background-image: url('data:image/png;base64,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'); background-position: -1px 0px 0px 0px; border: none; width: 83px; height: 25px; cursor: pointer;"
						}
					}
				}
			}
		});
		titleRow.appendChild(t["th"].el);
		t.find("btn").el.addEventListener("click", function() { convertDuelReport(div); }, false);
	}
	
	var loc = doc.location;
	var o_show = unsafeWindow.AjaxWindow.setJSHTML;
	var f = function(div, content) {
		if (!div) return;
		var ret = o_show(div, content);
		hookReport(div);
		return(ret);
	};
	for(var o in o_show) {
		f[o] = o_show[o];
	}
	unsafeWindow.AjaxWindow.setJSHTML = f;
	
})();


//======================================= WORKS POSITIONS =====================================


(function(){
	var doc = document;
	var console = unsafeWindow.console;

	function getElementsByClassName(oElm, strTagName, strClassName){
		var arrElements = (strTagName == "*" && oElm.all)? oElm.all : oElm.getElementsByTagName(strTagName);
		var arrReturnElements = new Array();
		strClassName = strClassName.replace(/\-/g, "\\-");
		var oRegExp = new RegExp("(^|\\s)" + strClassName + "(\\s|$)");
		var oElement;
		for(var i=0; i<arrElements.length; i++){
			oElement = arrElements[i];
			if(oRegExp.test(oElement.className)){
				arrReturnElements.push(oElement);
			}
		}
		return (arrReturnElements)
	}

	function appendDiv(parentdiv,code,id) {
	    enddiv = document.createElement('div');
	    enddiv.id = id;
	    enddiv.innerHTML = code;
    	parentdiv.appendChild(enddiv);
	}
	
	function hookTaskQueue(div) {
		if (!div.getElementById('work_task_queue')&&!getElementsByClassName(div,'div','task_queue')[0]) return;
		if (div.getElementById('work_task_queue')) {
			var tasks = div.getElementById('work_task_queue');
			if (doc.getElementById('workList')) {
				var workList = doc.getElementById('workList');
				workList.style.height = '260px';
			}
		} else {
			var tasks = getElementsByClassName(div,'div','task_queue')[0];
		}
		appendDiv(tasks.parentNode,"",'work_positions');
		var tasksPos = doc.getElementById('work_positions');
		tasksjs = "var tasksPos = document.getElementById('work_positions');\
		var x = Tasks.last_pos.x;\
		var y = Tasks.last_pos.y;\
		for (var i = 0; i < Tasks.tasks.length; i++) {\
			mytask = Tasks.tasks[i];\
			if (mytask.type == 'way') {x=mytask.data_obj.to_x;y=mytask.data_obj.to_y;continue;}\
			taskhtml = '<img src=\"images/icons/center.png\"/>';\
			enddiv = document.createElement('a');\
			enddiv.setAttribute('class','work_position');\
			enddiv.setAttribute('style','margin:0 51px 0 25px;');\
			hreff = 'javascript:WMap.scroll_map_to_pos(parseInt(' + x + '),parseInt(' + y + '))';\
			enddiv.setAttribute('href',hreff);\
			enddiv.innerHTML = taskhtml;\
		  	tasksPos.appendChild(enddiv);\
		}";
	    enddiv = document.createElement('script');
    	enddiv.type = 'text/javascript';
	    enddiv.innerHTML = tasksjs;
    	tasksPos.appendChild(enddiv);
	}

	var loc = doc.location;
	var o_show = unsafeWindow.AjaxWindow.setJSHTML;
	var f = function(div, content) {
		if (!div) return;
		var ret = o_show(div, content);
		hookTaskQueue(div);
		return(ret);
	};
	for(var o in o_show) {
		f[o] = o_show[o];
	}
	unsafeWindow.AjaxWindow.setJSHTML = f;	  
})();


//======================================= QUEST HELPER =====================================


var labor_points_text={en:'Трудовые очки',cz:'Pracovní body',sk:'Pracovné body'};
var difficulty_text  ={en:'Требования',cz:'Obtížnost',sk:'Obtiažnosť'};

var gCount=0;
var gLang='en';


function getJobId(text){
  for (id in unsafeWindow.JobList) {
    aJob = unsafeWindow.JobList[id]; 
    if (aJob.name==text.substring(0,aJob.name.length))
      return id;
    for (t=0;t<aJob.yields.length;t++)
      if (aJob.yields[t]!==null && aJob.yields[t].name == text.substring(0,aJob.yields[t].name.length))
        return id;
  }
  return -1;
}

function searchForQuestRequirements() {
  if (window.document.getElementById('questFoot')){
    var qReqsTags = unsafeWindow.document.getElementsByTagName('DIV');
    try {
      for (i in qReqsTags) {
        if (qReqsTags[i].id=='questRequirements') {
          if (qReqsTags[i].previousSibling!==null && qReqsTags[i].previousSibling.tagName=='SCRIPT')
            continue;
          req=qReqsTags[i].firstChild;
          while(req.nextSibling && req.nextSibling.tagName=='DIV'){
            req=req.nextSibling;
            job_id=getJobId(req.innerHTML);

            if (job_id == -1) {
              req=req.nextSibling;
              continue;
            }
            
            var selectedJob=unsafeWindow.JobList[job_id];
            var jobImg='<div style="padding: 2px;"<img src="images/jobs/mini/'+selectedJob.shortName+'.png" alt=""></div>';
            var jobName='<div style="font-weight: bold;">'+selectedJob.name+'</div>';
            var jobPoints=(selectedJob.calcJobPoints(unsafeWindow.Character.bonus_skills)+unsafeWindow.WearSet.getWorkPointAddition(job_id)-selectedJob.malus);
            var playerJobInfo='<div style="padding: 1px; font-size: 10px;">'+labor_points_text[gLang]+': %1'.replace('%1','<strong'+(jobPoints<=0?' style="color:#A00"':'')+'>'+jobPoints+'</strong>')+'<br />'+difficulty_text[gLang]+': %1'.replace('%1','<strong>'+selectedJob.malus+'</strong>')+'</div>';
            var jobYields='<div>';
            for (t=0;t<selectedJob.yields.length;t++) {
              if (selectedJob.yields[t]!==null){
                jobYields+='<div class="popup_yield">';
                jobYields+='<div class="popup_yield_divider"></div>';
                jobYields+='<div class="popup_yield_image"><img src="images/items/yield/mini/'+selectedJob.yields[t].short+'.png" alt="'+selectedJob.yields[t].name+'" /></div>';
                jobYields+=selectedJob.yields[t].name;
               jobYields+='</div>';
             }
            }
            jobYields+='</div>';
       
            var jobPopup='<div style="text-align:center">'+jobImg+'<div class="popup_yield_divider"></div><div style="padding: 4px; text-align: center;">'+jobName+playerJobInfo+'<div style="font-size: 9px;">'+jobYields+'</div></div></div>';
            var popupScript="ar = new Array();ar.opacity=0.9;newPopup=new MousePopup('"+jobPopup+"',250,ar);$('customPopupId_"+gCount+"').addMousePopup(newPopup);";
            req.setAttribute("id","customPopupId_"+gCount);
            gCount++;
            var insertBeforeElement = qReqsTags[i];
            var newScriptElement = document.createElement('script');
            newScriptElement.setAttribute('type', 'text/javascript');
            newScriptElement.innerHTML = popupScript;
            insertBeforeElement.parentNode.insertBefore(newScriptElement, insertBeforeElement);
            req=req.nextSibling;
          }
        }
      }
    } catch(e) {}
  }
  setTimeout(function(){searchForQuestRequirements()},1000);
}

lang = window.location.href.substring(window.location.href.indexOf("//")+2,window.location.href.indexOf("//")+4);
if (labor_points_text[lang]) gLang=lang;
setTimeout(function(){searchForQuestRequirements()},1000);


//======================================= TW Pro RUS =====================================


function twpro_injectScript()
{
  TWPro.twpro_calculated = false;
  TWPro.twpro_failure = false;
  TWPro.twpro_failureInject = false;
  TWPro.twpro_failureRollback = new Array();
  TWPro.twpro_active = true;
  TWPro.twpro_jobs = new Array();
  TWPro.twpro_jobValues = new Object();
  TWPro.twpro_jobValues.swine = new Object();
  TWPro.twpro_jobValues.swine.erfahrung = 1;
  TWPro.twpro_jobValues.swine.lohn = 3;
  TWPro.twpro_jobValues.swine.glueck = 0;
  TWPro.twpro_jobValues.swine.gefahr = 1;
  TWPro.twpro_jobValues.scarecrow = new Object();
  TWPro.twpro_jobValues.scarecrow.erfahrung = 3;
  TWPro.twpro_jobValues.scarecrow.lohn = 1;
  TWPro.twpro_jobValues.scarecrow.glueck = 2;
  TWPro.twpro_jobValues.scarecrow.gefahr = 20;
  TWPro.twpro_jobValues.wanted = new Object();
  TWPro.twpro_jobValues.wanted.erfahrung = 3;
  TWPro.twpro_jobValues.wanted.lohn = 2;
  TWPro.twpro_jobValues.wanted.glueck = 0;
  TWPro.twpro_jobValues.wanted.gefahr = 10;
  TWPro.twpro_jobValues.tabacco = new Object();
  TWPro.twpro_jobValues.tabacco.erfahrung = 1;
  TWPro.twpro_jobValues.tabacco.lohn = 6;
  TWPro.twpro_jobValues.tabacco.glueck = 2;
  TWPro.twpro_jobValues.tabacco.gefahr = 2;
  TWPro.twpro_jobValues.cotton = new Object();
  TWPro.twpro_jobValues.cotton.erfahrung = 4;
  TWPro.twpro_jobValues.cotton.lohn = 1;
  TWPro.twpro_jobValues.cotton.glueck = 0;
  TWPro.twpro_jobValues.cotton.gefahr = 3;
  TWPro.twpro_jobValues.sugar = new Object();
  TWPro.twpro_jobValues.sugar.erfahrung = 2;
  TWPro.twpro_jobValues.sugar.lohn = 5;
  TWPro.twpro_jobValues.sugar.glueck = 4;
  TWPro.twpro_jobValues.sugar.gefahr = 1;
  TWPro.twpro_jobValues.angle = new Object();
  TWPro.twpro_jobValues.angle.erfahrung = 0;
  TWPro.twpro_jobValues.angle.lohn = 1;
  TWPro.twpro_jobValues.angle.glueck = 6;
  TWPro.twpro_jobValues.angle.gefahr = 2;
  TWPro.twpro_jobValues.cereal = new Object();
  TWPro.twpro_jobValues.cereal.erfahrung = 6;
  TWPro.twpro_jobValues.cereal.lohn = 2;
  TWPro.twpro_jobValues.cereal.glueck = 2;
  TWPro.twpro_jobValues.cereal.gefahr = 4;
  TWPro.twpro_jobValues.berry = new Object();
  TWPro.twpro_jobValues.berry.erfahrung = 6;
  TWPro.twpro_jobValues.berry.lohn = 2;
  TWPro.twpro_jobValues.berry.glueck = 5;
  TWPro.twpro_jobValues.berry.gefahr = 6;
  TWPro.twpro_jobValues.sheeps = new Object();
  TWPro.twpro_jobValues.sheeps.erfahrung = 5;
  TWPro.twpro_jobValues.sheeps.lohn = 3;
  TWPro.twpro_jobValues.sheeps.glueck = 0;
  TWPro.twpro_jobValues.sheeps.gefahr = 2;
  TWPro.twpro_jobValues.newspaper = new Object();
  TWPro.twpro_jobValues.newspaper.erfahrung = 1;
  TWPro.twpro_jobValues.newspaper.lohn = 6;
  TWPro.twpro_jobValues.newspaper.glueck = 2;
  TWPro.twpro_jobValues.newspaper.gefahr = 1;
  TWPro.twpro_jobValues.cut = new Object();
  TWPro.twpro_jobValues.cut.erfahrung = 7;
  TWPro.twpro_jobValues.cut.lohn = 5;
  TWPro.twpro_jobValues.cut.glueck = 3;
  TWPro.twpro_jobValues.cut.gefahr = 3;
  TWPro.twpro_jobValues.grinding = new Object();
  TWPro.twpro_jobValues.grinding.erfahrung = 7;
  TWPro.twpro_jobValues.grinding.lohn = 11;
  TWPro.twpro_jobValues.grinding.glueck = 0;
  TWPro.twpro_jobValues.grinding.gefahr = 5;
  TWPro.twpro_jobValues.corn = new Object();
  TWPro.twpro_jobValues.corn.erfahrung = 7;
  TWPro.twpro_jobValues.corn.lohn = 4;
  TWPro.twpro_jobValues.corn.glueck = 8;
  TWPro.twpro_jobValues.corn.gefahr = 5;
  TWPro.twpro_jobValues.beans = new Object();
  TWPro.twpro_jobValues.beans.erfahrung = 7;
  TWPro.twpro_jobValues.beans.lohn = 9;
  TWPro.twpro_jobValues.beans.glueck = 4;
  TWPro.twpro_jobValues.beans.gefahr = 5;
  TWPro.twpro_jobValues.fort_guard = new Object();
  TWPro.twpro_jobValues.fort_guard.erfahrung = 9;
  TWPro.twpro_jobValues.fort_guard.lohn = 3;
  TWPro.twpro_jobValues.fort_guard.glueck = 2;
  TWPro.twpro_jobValues.fort_guard.gefahr = 7;
  TWPro.twpro_jobValues.tanning = new Object();
  TWPro.twpro_jobValues.tanning.erfahrung = 15;
  TWPro.twpro_jobValues.tanning.lohn = 12;
  TWPro.twpro_jobValues.tanning.glueck = 5;
  TWPro.twpro_jobValues.tanning.gefahr = 18;
  TWPro.twpro_jobValues.digging = new Object();
  TWPro.twpro_jobValues.digging.erfahrung = 3;
  TWPro.twpro_jobValues.digging.lohn = 11;
  TWPro.twpro_jobValues.digging.glueck = 5;
  TWPro.twpro_jobValues.digging.gefahr = 7;
  TWPro.twpro_jobValues.grave = new Object();
  TWPro.twpro_jobValues.grave.erfahrung = 12;
  TWPro.twpro_jobValues.grave.lohn = 16;
  TWPro.twpro_jobValues.grave.glueck = 22;
  TWPro.twpro_jobValues.grave.gefahr = 9;
  TWPro.twpro_jobValues.turkey = new Object();
  TWPro.twpro_jobValues.turkey.erfahrung = 14;
  TWPro.twpro_jobValues.turkey.lohn = 3;
  TWPro.twpro_jobValues.turkey.glueck = 7;
  TWPro.twpro_jobValues.turkey.gefahr = 21;
  TWPro.twpro_jobValues.rail = new Object();
  TWPro.twpro_jobValues.rail.erfahrung = 18;
  TWPro.twpro_jobValues.rail.lohn = 10;
  TWPro.twpro_jobValues.rail.glueck = 5;
  TWPro.twpro_jobValues.rail.gefahr = 10;
  TWPro.twpro_jobValues.cow = new Object();
  TWPro.twpro_jobValues.cow.erfahrung = 17;
  TWPro.twpro_jobValues.cow.lohn = 5;
  TWPro.twpro_jobValues.cow.glueck = 0;
  TWPro.twpro_jobValues.cow.gefahr = 11;
  TWPro.twpro_jobValues.fence = new Object();
  TWPro.twpro_jobValues.fence.erfahrung = 11;
  TWPro.twpro_jobValues.fence.lohn = 7;
  TWPro.twpro_jobValues.fence.glueck = 5;
  TWPro.twpro_jobValues.fence.gefahr = 6;
  TWPro.twpro_jobValues.saw = new Object();
  TWPro.twpro_jobValues.saw.erfahrung = 12;
  TWPro.twpro_jobValues.saw.lohn = 23;
  TWPro.twpro_jobValues.saw.glueck = 6;
  TWPro.twpro_jobValues.saw.gefahr = 32;
  TWPro.twpro_jobValues.stone = new Object();
  TWPro.twpro_jobValues.stone.erfahrung = 8;
  TWPro.twpro_jobValues.stone.lohn = 17;
  TWPro.twpro_jobValues.stone.glueck = 9;
  TWPro.twpro_jobValues.stone.gefahr = 33;
  TWPro.twpro_jobValues.straighten = new Object();
  TWPro.twpro_jobValues.straighten.erfahrung = 22;
  TWPro.twpro_jobValues.straighten.lohn = 8;
  TWPro.twpro_jobValues.straighten.glueck = 15;
  TWPro.twpro_jobValues.straighten.gefahr = 12;
  TWPro.twpro_jobValues.wood = new Object();
  TWPro.twpro_jobValues.wood.erfahrung = 5;
  TWPro.twpro_jobValues.wood.lohn = 18;
  TWPro.twpro_jobValues.wood.glueck = 2;
  TWPro.twpro_jobValues.wood.gefahr = 21;
  TWPro.twpro_jobValues.irrigation = new Object();
  TWPro.twpro_jobValues.irrigation.erfahrung = 13;
  TWPro.twpro_jobValues.irrigation.lohn = 7;
  TWPro.twpro_jobValues.irrigation.glueck = 15;
  TWPro.twpro_jobValues.irrigation.gefahr = 6;
  TWPro.twpro_jobValues.brand = new Object();
  TWPro.twpro_jobValues.brand.erfahrung = 25;
  TWPro.twpro_jobValues.brand.lohn = 8;
  TWPro.twpro_jobValues.brand.glueck = 0;
  TWPro.twpro_jobValues.brand.gefahr = 35;
  TWPro.twpro_jobValues.wire = new Object();
  TWPro.twpro_jobValues.wire.erfahrung = 13;
  TWPro.twpro_jobValues.wire.lohn = 17;
  TWPro.twpro_jobValues.wire.glueck = 6;
  TWPro.twpro_jobValues.wire.gefahr = 0;
  TWPro.twpro_jobValues.dam = new Object();
  TWPro.twpro_jobValues.dam.erfahrung = 18;
  TWPro.twpro_jobValues.dam.lohn = 4;
  TWPro.twpro_jobValues.dam.glueck = 9;
  TWPro.twpro_jobValues.dam.gefahr = 41;
  TWPro.twpro_jobValues.gems = new Object();
  TWPro.twpro_jobValues.gems.erfahrung = 7;
  TWPro.twpro_jobValues.gems.lohn = 25;
  TWPro.twpro_jobValues.gems.glueck = 8;
  TWPro.twpro_jobValues.gems.gefahr = 4;
  TWPro.twpro_jobValues.claim = new Object();
  TWPro.twpro_jobValues.claim.erfahrung = 4;
  TWPro.twpro_jobValues.claim.lohn = 31;
  TWPro.twpro_jobValues.claim.glueck = 4;
  TWPro.twpro_jobValues.claim.gefahr = 29;
  TWPro.twpro_jobValues.chuck_wagon = new Object();
  TWPro.twpro_jobValues.chuck_wagon.erfahrung = 23;
  TWPro.twpro_jobValues.chuck_wagon.lohn = 5;
  TWPro.twpro_jobValues.chuck_wagon.glueck = 42;
  TWPro.twpro_jobValues.chuck_wagon.gefahr = 11;
  TWPro.twpro_jobValues.break_in = new Object();
  TWPro.twpro_jobValues.break_in.erfahrung = 32;
  TWPro.twpro_jobValues.break_in.lohn = 13;
  TWPro.twpro_jobValues.break_in.glueck = 10;
  TWPro.twpro_jobValues.break_in.gefahr = 52;
  TWPro.twpro_jobValues.trade = new Object();
  TWPro.twpro_jobValues.trade.erfahrung = 3;
  TWPro.twpro_jobValues.trade.lohn = 15;
  TWPro.twpro_jobValues.trade.glueck = 25;
  TWPro.twpro_jobValues.trade.gefahr = 12;
  TWPro.twpro_jobValues.mast = new Object();
  TWPro.twpro_jobValues.mast.erfahrung = 25;
  TWPro.twpro_jobValues.mast.lohn = 21;
  TWPro.twpro_jobValues.mast.glueck = 3;
  TWPro.twpro_jobValues.mast.gefahr = 14;
  TWPro.twpro_jobValues.spring = new Object();
  TWPro.twpro_jobValues.spring.erfahrung = 33;
  TWPro.twpro_jobValues.spring.lohn = 9;
  TWPro.twpro_jobValues.spring.glueck = 23;
  TWPro.twpro_jobValues.spring.gefahr = 19;
  TWPro.twpro_jobValues.beaver = new Object();
  TWPro.twpro_jobValues.beaver.erfahrung = 17;
  TWPro.twpro_jobValues.beaver.lohn = 32;
  TWPro.twpro_jobValues.beaver.glueck = 6;
  TWPro.twpro_jobValues.beaver.gefahr = 21;
  TWPro.twpro_jobValues.coal = new Object();
  TWPro.twpro_jobValues.coal.erfahrung = 14;
  TWPro.twpro_jobValues.coal.lohn = 30;
  TWPro.twpro_jobValues.coal.glueck = 0;
  TWPro.twpro_jobValues.coal.gefahr = 13;
  TWPro.twpro_jobValues.print = new Object();
  TWPro.twpro_jobValues.print.erfahrung = 20;
  TWPro.twpro_jobValues.print.lohn = 30;
  TWPro.twpro_jobValues.print.glueck = 5;
  TWPro.twpro_jobValues.print.gefahr = 7;
  TWPro.twpro_jobValues.fishing = new Object();
  TWPro.twpro_jobValues.fishing.erfahrung = 23;
  TWPro.twpro_jobValues.fishing.lohn = 6;
  TWPro.twpro_jobValues.fishing.glueck = 23;
  TWPro.twpro_jobValues.fishing.gefahr = 38;
  TWPro.twpro_jobValues.trainstation = new Object();
  TWPro.twpro_jobValues.trainstation.erfahrung = 47;
  TWPro.twpro_jobValues.trainstation.lohn = 12;
  TWPro.twpro_jobValues.trainstation.glueck = 7;
  TWPro.twpro_jobValues.trainstation.gefahr = 15;
  TWPro.twpro_jobValues.windmeel = new Object();
  TWPro.twpro_jobValues.windmeel.erfahrung = 43;
  TWPro.twpro_jobValues.windmeel.lohn = 42;
  TWPro.twpro_jobValues.windmeel.glueck = 6;
  TWPro.twpro_jobValues.windmeel.gefahr = 18;
  TWPro.twpro_jobValues.explore = new Object();
  TWPro.twpro_jobValues.explore.erfahrung = 45;
  TWPro.twpro_jobValues.explore.lohn = 1;
  TWPro.twpro_jobValues.explore.glueck = 22;
  TWPro.twpro_jobValues.explore.gefahr = 37;
  TWPro.twpro_jobValues.float = new Object();
  TWPro.twpro_jobValues.float.erfahrung = 45;
  TWPro.twpro_jobValues.float.lohn = 23;
  TWPro.twpro_jobValues.float.glueck = 0;
  TWPro.twpro_jobValues.float.gefahr = 52;
  TWPro.twpro_jobValues.bridge = new Object();
  TWPro.twpro_jobValues.bridge.erfahrung = 33;
  TWPro.twpro_jobValues.bridge.lohn = 17;
  TWPro.twpro_jobValues.bridge.glueck = 18;
  TWPro.twpro_jobValues.bridge.gefahr = 53;
  TWPro.twpro_jobValues.springe = new Object();
  TWPro.twpro_jobValues.springe.erfahrung = 45;
  TWPro.twpro_jobValues.springe.lohn = 29;
  TWPro.twpro_jobValues.springe.glueck = 0;
  TWPro.twpro_jobValues.springe.gefahr = 42;
  TWPro.twpro_jobValues.coffin = new Object();
  TWPro.twpro_jobValues.coffin.erfahrung = 8;
  TWPro.twpro_jobValues.coffin.lohn = 42;
  TWPro.twpro_jobValues.coffin.glueck = 15;
  TWPro.twpro_jobValues.coffin.gefahr = 20;
  TWPro.twpro_jobValues.dynamite = new Object();
  TWPro.twpro_jobValues.dynamite.erfahrung = 12;
  TWPro.twpro_jobValues.dynamite.lohn = 23;
  TWPro.twpro_jobValues.dynamite.glueck = 64;
  TWPro.twpro_jobValues.dynamite.gefahr = 93;
  TWPro.twpro_jobValues.coyote = new Object();
  TWPro.twpro_jobValues.coyote.erfahrung = 43;
  TWPro.twpro_jobValues.coyote.lohn = 15;
  TWPro.twpro_jobValues.coyote.glueck = 26;
  TWPro.twpro_jobValues.coyote.gefahr = 45;
  TWPro.twpro_jobValues.buffalo = new Object();
  TWPro.twpro_jobValues.buffalo.erfahrung = 62;
  TWPro.twpro_jobValues.buffalo.lohn = 24;
  TWPro.twpro_jobValues.buffalo.glueck = 0;
  TWPro.twpro_jobValues.buffalo.gefahr = 72;
  TWPro.twpro_jobValues.fort = new Object();
  TWPro.twpro_jobValues.fort.erfahrung = 71;
  TWPro.twpro_jobValues.fort.lohn = 33;
  TWPro.twpro_jobValues.fort.glueck = 17;
  TWPro.twpro_jobValues.fort.gefahr = 35;
  TWPro.twpro_jobValues.indians = new Object();
  TWPro.twpro_jobValues.indians.erfahrung = 14;
  TWPro.twpro_jobValues.indians.lohn = 11;
  TWPro.twpro_jobValues.indians.glueck = 63;
  TWPro.twpro_jobValues.indians.gefahr = 34;
  TWPro.twpro_jobValues.clearing = new Object();
  TWPro.twpro_jobValues.clearing.erfahrung = 8;
  TWPro.twpro_jobValues.clearing.lohn = 62;
  TWPro.twpro_jobValues.clearing.glueck = 9;
  TWPro.twpro_jobValues.clearing.gefahr = 16;
  TWPro.twpro_jobValues.silver = new Object();
  TWPro.twpro_jobValues.silver.erfahrung = 8;
  TWPro.twpro_jobValues.silver.lohn = 76;
  TWPro.twpro_jobValues.silver.glueck = 0;
  TWPro.twpro_jobValues.silver.gefahr = 32;
  TWPro.twpro_jobValues.diligence_guard = new Object();
  TWPro.twpro_jobValues.diligence_guard.erfahrung = 77;
  TWPro.twpro_jobValues.diligence_guard.lohn = 34;
  TWPro.twpro_jobValues.diligence_guard.glueck = 45;
  TWPro.twpro_jobValues.diligence_guard.gefahr = 43;
  TWPro.twpro_jobValues.wolf = new Object();
  TWPro.twpro_jobValues.wolf.erfahrung = 63;
  TWPro.twpro_jobValues.wolf.lohn = 21;
  TWPro.twpro_jobValues.wolf.glueck = 15;
  TWPro.twpro_jobValues.wolf.gefahr = 67;
  TWPro.twpro_jobValues.track = new Object();
  TWPro.twpro_jobValues.track.erfahrung = 60;
  TWPro.twpro_jobValues.track.lohn = 10;
  TWPro.twpro_jobValues.track.glueck = 30;
  TWPro.twpro_jobValues.track.gefahr = 33;
  TWPro.twpro_jobValues.ox = new Object();
  TWPro.twpro_jobValues.ox.erfahrung = 34;
  TWPro.twpro_jobValues.ox.lohn = 64;
  TWPro.twpro_jobValues.ox.glueck = 18;
  TWPro.twpro_jobValues.ox.gefahr = 43;
  TWPro.twpro_jobValues.guard = new Object();
  TWPro.twpro_jobValues.guard.erfahrung = 35;
  TWPro.twpro_jobValues.guard.lohn = 25;
  TWPro.twpro_jobValues.guard.glueck = 38;
  TWPro.twpro_jobValues.guard.gefahr = 4;
  TWPro.twpro_jobValues.bible = new Object();
  TWPro.twpro_jobValues.bible.erfahrung = 61;
  TWPro.twpro_jobValues.bible.lohn = 5;
  TWPro.twpro_jobValues.bible.glueck = 52;
  TWPro.twpro_jobValues.bible.gefahr = 77;
  TWPro.twpro_jobValues.ponyexpress = new Object();
  TWPro.twpro_jobValues.ponyexpress.erfahrung = 48;
  TWPro.twpro_jobValues.ponyexpress.lohn = 15;
  TWPro.twpro_jobValues.ponyexpress.glueck = 51;
  TWPro.twpro_jobValues.ponyexpress.gefahr = 44;
  TWPro.twpro_jobValues.weapons = new Object();
  TWPro.twpro_jobValues.weapons.erfahrung = 35;
  TWPro.twpro_jobValues.weapons.lohn = 15;
  TWPro.twpro_jobValues.weapons.glueck = 72;
  TWPro.twpro_jobValues.weapons.gefahr = 82;
  TWPro.twpro_jobValues.dead = new Object();
  TWPro.twpro_jobValues.dead.erfahrung = 14;
  TWPro.twpro_jobValues.dead.lohn = 14;
  TWPro.twpro_jobValues.dead.glueck = 90;
  TWPro.twpro_jobValues.dead.gefahr = 34;
  TWPro.twpro_jobValues.grizzly = new Object();
  TWPro.twpro_jobValues.grizzly.erfahrung = 78;
  TWPro.twpro_jobValues.grizzly.lohn = 25;
  TWPro.twpro_jobValues.grizzly.glueck = 35;
  TWPro.twpro_jobValues.grizzly.gefahr = 71;
  TWPro.twpro_jobValues.oil = new Object();
  TWPro.twpro_jobValues.oil.erfahrung = 25;
  TWPro.twpro_jobValues.oil.lohn = 83;
  TWPro.twpro_jobValues.oil.glueck = 20;
  TWPro.twpro_jobValues.oil.gefahr = 7;
  TWPro.twpro_jobValues.treasure_hunting = new Object();
  TWPro.twpro_jobValues.treasure_hunting.erfahrung = 20;
  TWPro.twpro_jobValues.treasure_hunting.lohn = 20;
  TWPro.twpro_jobValues.treasure_hunting.glueck = 83;
  TWPro.twpro_jobValues.treasure_hunting.gefahr = 24;
  TWPro.twpro_jobValues.army = new Object();
  TWPro.twpro_jobValues.army.erfahrung = 76;
  TWPro.twpro_jobValues.army.lohn = 55;
  TWPro.twpro_jobValues.army.glueck = 17;
  TWPro.twpro_jobValues.army.gefahr = 35;
  TWPro.twpro_jobValues.steal = new Object();
  TWPro.twpro_jobValues.steal.erfahrung = 50;
  TWPro.twpro_jobValues.steal.lohn = 48;
  TWPro.twpro_jobValues.steal.glueck = 74;
  TWPro.twpro_jobValues.steal.gefahr = 66;
  TWPro.twpro_jobValues.mercenary = new Object();
  TWPro.twpro_jobValues.mercenary.erfahrung = 52;
  TWPro.twpro_jobValues.mercenary.lohn = 92;
  TWPro.twpro_jobValues.mercenary.glueck = 23;
  TWPro.twpro_jobValues.mercenary.gefahr = 65;
  TWPro.twpro_jobValues.bandits = new Object();
  TWPro.twpro_jobValues.bandits.erfahrung = 75;
  TWPro.twpro_jobValues.bandits.lohn = 28;
  TWPro.twpro_jobValues.bandits.glueck = 85;
  TWPro.twpro_jobValues.bandits.gefahr = 83;
  TWPro.twpro_jobValues.aggression = new Object();
  TWPro.twpro_jobValues.aggression.erfahrung = 27;
  TWPro.twpro_jobValues.aggression.lohn = 78;
  TWPro.twpro_jobValues.aggression.glueck = 78;
  TWPro.twpro_jobValues.aggression.gefahr = 86;
  TWPro.twpro_jobValues.diligence_aggression = new Object();
  TWPro.twpro_jobValues.diligence_aggression.erfahrung = 73;
  TWPro.twpro_jobValues.diligence_aggression.lohn = 43;
  TWPro.twpro_jobValues.diligence_aggression.glueck = 95;
  TWPro.twpro_jobValues.diligence_aggression.gefahr = 67;
  TWPro.twpro_jobValues.bounty = new Object();
  TWPro.twpro_jobValues.bounty.erfahrung = 32;
  TWPro.twpro_jobValues.bounty.lohn = 92;
  TWPro.twpro_jobValues.bounty.glueck = 79;
  TWPro.twpro_jobValues.bounty.gefahr = 72;
  TWPro.twpro_jobValues.captured = new Object();
  TWPro.twpro_jobValues.captured.erfahrung = 69;
  TWPro.twpro_jobValues.captured.lohn = 23;
  TWPro.twpro_jobValues.captured.glueck = 85;
  TWPro.twpro_jobValues.captured.gefahr = 44;
  TWPro.twpro_jobValues.train = new Object();
  TWPro.twpro_jobValues.train.erfahrung = 87;
  TWPro.twpro_jobValues.train.lohn = 67;
  TWPro.twpro_jobValues.train.glueck = 92;
  TWPro.twpro_jobValues.train.gefahr = 96;
  TWPro.twpro_jobValues.burglary = new Object();
  TWPro.twpro_jobValues.burglary.erfahrung = 34;
  TWPro.twpro_jobValues.burglary.lohn = 80;
  TWPro.twpro_jobValues.burglary.glueck = 81;
  TWPro.twpro_jobValues.burglary.gefahr = 26;
  TWPro.twpro_jobValues.quackery = new Object();
  TWPro.twpro_jobValues.quackery.erfahrung = 50;
  TWPro.twpro_jobValues.quackery.lohn = 65;
  TWPro.twpro_jobValues.quackery.glueck = 52;
  TWPro.twpro_jobValues.quackery.gefahr = 67;
  TWPro.twpro_jobValues.peace = new Object();
  TWPro.twpro_jobValues.peace.erfahrung = 68;
  TWPro.twpro_jobValues.peace.lohn = 33;
  TWPro.twpro_jobValues.peace.glueck = 76;
  TWPro.twpro_jobValues.peace.gefahr = 44;
  TWPro.twpro_jobValues.ship = new Object();
  TWPro.twpro_jobValues.ship.erfahrung = 35;
  TWPro.twpro_jobValues.ship.lohn = 82;
  TWPro.twpro_jobValues.ship.glueck = 15;
  TWPro.twpro_jobValues.ship.gefahr = 14;
  TWPro.twpro_jobValues.smuggle = new Object();
  TWPro.twpro_jobValues.smuggle.erfahrung = 45;
  TWPro.twpro_jobValues.smuggle.lohn = 62;
  TWPro.twpro_jobValues.smuggle.glueck = 83;
  TWPro.twpro_jobValues.smuggle.gefahr = 56;
  TWPro.twpro_jobValues.ranch = new Object();
  TWPro.twpro_jobValues.ranch.erfahrung = 61;
  TWPro.twpro_jobValues.ranch.lohn = 28;
  TWPro.twpro_jobValues.ranch.glueck = 17;
  TWPro.twpro_jobValues.ranch.gefahr = 24;
  TWPro.twpro_jobValues.iron = new Object();
  TWPro.twpro_jobValues.iron.erfahrung = 32;
  TWPro.twpro_jobValues.iron.lohn = 52;
  TWPro.twpro_jobValues.iron.glueck = 15;
  TWPro.twpro_jobValues.iron.gefahr = 29;
  TWPro.twpro_jobValues.agave = new Object();
  TWPro.twpro_jobValues.agave.erfahrung = 42;
  TWPro.twpro_jobValues.agave.lohn = 25;
  TWPro.twpro_jobValues.agave.glueck = 12;
  TWPro.twpro_jobValues.agave.gefahr = 27;
  TWPro.twpro_jobValues.tomato = new Object();
  TWPro.twpro_jobValues.tomato.erfahrung = 12;
  TWPro.twpro_jobValues.tomato.lohn = 13;
  TWPro.twpro_jobValues.tomato.glueck = 7;
  TWPro.twpro_jobValues.tomato.gefahr = 11;
  TWPro.twpro_jobValues.horseshoe = new Object();
  TWPro.twpro_jobValues.horseshoe.erfahrung = 28;
  TWPro.twpro_jobValues.horseshoe.lohn = 14;
  TWPro.twpro_jobValues.horseshoe.glueck = 9;
  TWPro.twpro_jobValues.horseshoe.gefahr = 23;
  TWPro.twpro_jobValues.fire = new Object();
  TWPro.twpro_jobValues.fire.erfahrung = 41;
  TWPro.twpro_jobValues.fire.lohn = 15;
  TWPro.twpro_jobValues.fire.glueck = 65;
  TWPro.twpro_jobValues.fire.gefahr = 45;
  TWPro.twpro_jobValues.orange = new Object();
  TWPro.twpro_jobValues.orange.erfahrung = 25;
  TWPro.twpro_jobValues.orange.lohn = 14;
  TWPro.twpro_jobValues.orange.glueck = 10;
  TWPro.twpro_jobValues.orange.gefahr = 21;
  TWPro.twpro_jobValues.muck_out = new Object();
  TWPro.twpro_jobValues.muck_out.erfahrung = 5;
  TWPro.twpro_jobValues.muck_out.lohn = 4;
  TWPro.twpro_jobValues.muck_out.glueck = 2;
  TWPro.twpro_jobValues.muck_out.gefahr = 6;
  TWPro.twpro_jobValues.shoes = new Object();
  TWPro.twpro_jobValues.shoes.erfahrung = 2;
  TWPro.twpro_jobValues.shoes.lohn = 3;
  TWPro.twpro_jobValues.shoes.glueck = 3;
  TWPro.twpro_jobValues.shoes.gefahr = 2;
  TWPro.twpro_jobValues.construct = new Object();
  TWPro.twpro_jobValues.construct.erfahrung = 0;
  TWPro.twpro_jobValues.construct.lohn = 0;
  TWPro.twpro_jobValues.construct.glueck = 0;
  TWPro.twpro_jobValues.construct.gefahr = 0;
  TWPro.twpro_setBonusParsed = false;
  TWPro.twpro_setBonus = new Object();
  TWPro.twpro_setBonus.set_farmer = new Array();
  TWPro.twpro_setBonus.set_farmer[2] = new Object();
  TWPro.twpro_setBonus.set_farmer[2].bonus = new Object();
  TWPro.twpro_setBonus.set_farmer[2].bonus.attributes = new Object();
  TWPro.twpro_setBonus.set_farmer[2].bonus.attributes.strength = 1;
  TWPro.twpro_setBonus.set_farmer[2].bonus.attributes.flexibility = 1;
  TWPro.twpro_setBonus.set_farmer[2].bonus.skills = new Object();
  TWPro.twpro_setBonus.set_farmer[2].jobBonus = new Object();
  TWPro.twpro_setBonus.set_farmer[2].jobBonus.all = 0;
  TWPro.twpro_setBonus.set_farmer[2].jobBonus.cereal = 10;
  TWPro.twpro_setBonus.set_farmer[2].jobBonus.cut = 10;
  TWPro.twpro_setBonus.set_farmer[2].jobBonus.grinding = 10;
  TWPro.twpro_setBonus.set_farmer[2].speedBonus = 0;
  TWPro.twpro_setBonus.set_farmer[2].parsedBonus = new Object();
  TWPro.twpro_setBonus.set_farmer[3] = new Object();
  TWPro.twpro_setBonus.set_farmer[3].bonus = new Object();
  TWPro.twpro_setBonus.set_farmer[3].bonus.attributes = new Object();
  TWPro.twpro_setBonus.set_farmer[3].bonus.attributes.strength = 1;
  TWPro.twpro_setBonus.set_farmer[3].bonus.attributes.flexibility = 1;
  TWPro.twpro_setBonus.set_farmer[3].bonus.attributes.dexterity = 1;
  TWPro.twpro_setBonus.set_farmer[3].bonus.attributes.charisma = 1;
  TWPro.twpro_setBonus.set_farmer[3].bonus.skills = new Object();
  TWPro.twpro_setBonus.set_farmer[3].jobBonus = new Object();
  TWPro.twpro_setBonus.set_farmer[3].jobBonus.all = 0;
  TWPro.twpro_setBonus.set_farmer[3].jobBonus.cereal = 10;
  TWPro.twpro_setBonus.set_farmer[3].jobBonus.cut = 10;
  TWPro.twpro_setBonus.set_farmer[3].jobBonus.grinding = 10;
  TWPro.twpro_setBonus.set_farmer[3].jobBonus.cow = 20;
  TWPro.twpro_setBonus.set_farmer[3].jobBonus.wire = 20;
  TWPro.twpro_setBonus.set_farmer[3].jobBonus.horseshoe = 20;
  TWPro.twpro_setBonus.set_farmer[3].speedBonus = 0;
  TWPro.twpro_setBonus.set_farmer[3].parsedBonus = new Object();
  TWPro.twpro_setBonus.set_farmer[4] = new Object();
  TWPro.twpro_setBonus.set_farmer[4].bonus = new Object();
  TWPro.twpro_setBonus.set_farmer[4].bonus.attributes = new Object();
  TWPro.twpro_setBonus.set_farmer[4].bonus.attributes.strength = 2;
  TWPro.twpro_setBonus.set_farmer[4].bonus.attributes.flexibility = 2;
  TWPro.twpro_setBonus.set_farmer[4].bonus.attributes.dexterity = 2;
  TWPro.twpro_setBonus.set_farmer[4].bonus.attributes.charisma = 2;
  TWPro.twpro_setBonus.set_farmer[4].bonus.skills = new Object();
  TWPro.twpro_setBonus.set_farmer[4].jobBonus = new Object();
  TWPro.twpro_setBonus.set_farmer[4].jobBonus.all = 0;
  TWPro.twpro_setBonus.set_farmer[4].jobBonus.cereal = 10;
  TWPro.twpro_setBonus.set_farmer[4].jobBonus.cut = 10;
  TWPro.twpro_setBonus.set_farmer[4].jobBonus.grinding = 10;
  TWPro.twpro_setBonus.set_farmer[4].jobBonus.cow = 20;
  TWPro.twpro_setBonus.set_farmer[4].jobBonus.wire = 20;
  TWPro.twpro_setBonus.set_farmer[4].jobBonus.windmeel = 40;
  TWPro.twpro_setBonus.set_farmer[4].jobBonus.springe = 40;
  TWPro.twpro_setBonus.set_farmer[4].jobBonus.ranch = 40;
  TWPro.twpro_setBonus.set_farmer[4].jobBonus.horseshoe = 20;
  TWPro.twpro_setBonus.set_farmer[4].speedBonus = 0;
  TWPro.twpro_setBonus.set_farmer[4].parsedBonus = new Object();
  TWPro.twpro_setBonus.set_indian = new Array();
  TWPro.twpro_setBonus.set_indian[2] = new Object();
  TWPro.twpro_setBonus.set_indian[2].bonus = new Object();
  TWPro.twpro_setBonus.set_indian[2].bonus.attributes = new Object();
  TWPro.twpro_setBonus.set_indian[2].bonus.attributes.flexibility = 2;
  TWPro.twpro_setBonus.set_indian[2].bonus.skills = new Object();
  TWPro.twpro_setBonus.set_indian[2].bonus.skills.hide = 8;
  TWPro.twpro_setBonus.set_indian[2].jobBonus = new Object();
  TWPro.twpro_setBonus.set_indian[2].jobBonus.all = 0;
  TWPro.twpro_setBonus.set_indian[2].jobBonus.coyote = 30;
  TWPro.twpro_setBonus.set_indian[2].speedBonus = 15;
  TWPro.twpro_setBonus.set_indian[2].parsedBonus = new Object();
  TWPro.twpro_setBonus.set_indian[3] = new Object();
  TWPro.twpro_setBonus.set_indian[3].bonus = new Object();
  TWPro.twpro_setBonus.set_indian[3].bonus.attributes = new Object();
  TWPro.twpro_setBonus.set_indian[3].bonus.attributes.flexibility = 5;
  TWPro.twpro_setBonus.set_indian[3].bonus.skills = new Object();
  TWPro.twpro_setBonus.set_indian[3].bonus.skills.hide = 8;
  TWPro.twpro_setBonus.set_indian[3].bonus.skills.swim = 8;
  TWPro.twpro_setBonus.set_indian[3].jobBonus = new Object();
  TWPro.twpro_setBonus.set_indian[3].jobBonus.all = 0;
  TWPro.twpro_setBonus.set_indian[3].jobBonus.coyote = 30;
  TWPro.twpro_setBonus.set_indian[3].jobBonus.buffalo = 40;
  TWPro.twpro_setBonus.set_indian[3].speedBonus = 30;
  TWPro.twpro_setBonus.set_indian[3].parsedBonus = new Object();
  TWPro.twpro_setBonus.set_indian[4] = new Object();
  TWPro.twpro_setBonus.set_indian[4].bonus = new Object();
  TWPro.twpro_setBonus.set_indian[4].bonus.attributes = new Object();
  TWPro.twpro_setBonus.set_indian[4].bonus.attributes.flexibility = 8;
  TWPro.twpro_setBonus.set_indian[4].bonus.skills = new Object();
  TWPro.twpro_setBonus.set_indian[4].bonus.skills.hide = 8;
  TWPro.twpro_setBonus.set_indian[4].bonus.skills.swim = 8;
  TWPro.twpro_setBonus.set_indian[4].bonus.skills.pitfall = 8;
  TWPro.twpro_setBonus.set_indian[4].jobBonus = new Object();
  TWPro.twpro_setBonus.set_indian[4].jobBonus.all = 0;
  TWPro.twpro_setBonus.set_indian[4].jobBonus.coyote = 30;
  TWPro.twpro_setBonus.set_indian[4].jobBonus.buffalo = 40;
  TWPro.twpro_setBonus.set_indian[4].jobBonus.wolf = 50;
  TWPro.twpro_setBonus.set_indian[4].speedBonus = 44;
  TWPro.twpro_setBonus.set_indian[4].parsedBonus = new Object();
  TWPro.twpro_setBonus.set_indian[5] = new Object();
  TWPro.twpro_setBonus.set_indian[5].bonus = new Object();
  TWPro.twpro_setBonus.set_indian[5].bonus.attributes = new Object();
  TWPro.twpro_setBonus.set_indian[5].bonus.attributes.flexibility = 12;
  TWPro.twpro_setBonus.set_indian[5].bonus.skills = new Object();
  TWPro.twpro_setBonus.set_indian[5].bonus.skills.hide = 8;
  TWPro.twpro_setBonus.set_indian[5].bonus.skills.swim = 8;
  TWPro.twpro_setBonus.set_indian[5].bonus.skills.pitfall = 8;
  TWPro.twpro_setBonus.set_indian[5].bonus.skills.animal = 8;
  TWPro.twpro_setBonus.set_indian[5].jobBonus = new Object();
  TWPro.twpro_setBonus.set_indian[5].jobBonus.all = 0;
  TWPro.twpro_setBonus.set_indian[5].jobBonus.coyote = 30;
  TWPro.twpro_setBonus.set_indian[5].jobBonus.buffalo = 40;
  TWPro.twpro_setBonus.set_indian[5].jobBonus.wolf = 50;
  TWPro.twpro_setBonus.set_indian[5].jobBonus.grizzly = 60;
  TWPro.twpro_setBonus.set_indian[5].speedBonus = 60;
  TWPro.twpro_setBonus.set_indian[5].parsedBonus = new Object();
  TWPro.twpro_setBonus.set_mexican = new Array();
  TWPro.twpro_setBonus.set_mexican[2] = new Object();
  TWPro.twpro_setBonus.set_mexican[2].bonus = new Object();
  TWPro.twpro_setBonus.set_mexican[2].bonus.attributes = new Object();
  TWPro.twpro_setBonus.set_mexican[2].bonus.attributes.strength = 1;
  TWPro.twpro_setBonus.set_mexican[2].bonus.skills = new Object();
  TWPro.twpro_setBonus.set_mexican[2].jobBonus = new Object();
  TWPro.twpro_setBonus.set_mexican[2].jobBonus.all = 0;
  TWPro.twpro_setBonus.set_mexican[2].speedBonus = 12;
  TWPro.twpro_setBonus.set_mexican[2].parsedBonus = new Object();
  TWPro.twpro_setBonus.set_mexican[3] = new Object();
  TWPro.twpro_setBonus.set_mexican[3].bonus = new Object();
  TWPro.twpro_setBonus.set_mexican[3].bonus.attributes = new Object();
  TWPro.twpro_setBonus.set_mexican[3].bonus.attributes.strength = 2;
  TWPro.twpro_setBonus.set_mexican[3].bonus.skills = new Object();
  TWPro.twpro_setBonus.set_mexican[3].jobBonus = new Object();
  TWPro.twpro_setBonus.set_mexican[3].jobBonus.all = 0;
  TWPro.twpro_setBonus.set_mexican[3].jobBonus.agave = 60;
  TWPro.twpro_setBonus.set_mexican[3].speedBonus = 24;
  TWPro.twpro_setBonus.set_mexican[3].parsedBonus = new Object();
  TWPro.twpro_setBonus.set_mexican[4] = new Object();
  TWPro.twpro_setBonus.set_mexican[4].bonus = new Object();
  TWPro.twpro_setBonus.set_mexican[4].bonus.attributes = new Object();
  TWPro.twpro_setBonus.set_mexican[4].bonus.attributes.strength = 4;
  TWPro.twpro_setBonus.set_mexican[4].bonus.skills = new Object();
  TWPro.twpro_setBonus.set_mexican[4].jobBonus = new Object();
  TWPro.twpro_setBonus.set_mexican[4].jobBonus.all = 0;
  TWPro.twpro_setBonus.set_mexican[4].jobBonus.oil = 70;
  TWPro.twpro_setBonus.set_mexican[4].jobBonus.agave = 60;
  TWPro.twpro_setBonus.set_mexican[4].speedBonus = 36;
  TWPro.twpro_setBonus.set_mexican[4].parsedBonus = new Object();
  TWPro.twpro_setBonus.set_mexican[5] = new Object();
  TWPro.twpro_setBonus.set_mexican[5].bonus = new Object();
  TWPro.twpro_setBonus.set_mexican[5].bonus.attributes = new Object();
  TWPro.twpro_setBonus.set_mexican[5].bonus.attributes.strength = 6;
  TWPro.twpro_setBonus.set_mexican[5].bonus.skills = new Object();
  TWPro.twpro_setBonus.set_mexican[5].jobBonus = new Object();
  TWPro.twpro_setBonus.set_mexican[5].jobBonus.all = 0;
  TWPro.twpro_setBonus.set_mexican[5].jobBonus.oil = 70;
  TWPro.twpro_setBonus.set_mexican[5].jobBonus.smuggle = 80;
  TWPro.twpro_setBonus.set_mexican[5].jobBonus.agave = 60;
  TWPro.twpro_setBonus.set_mexican[5].speedBonus = 48;
  TWPro.twpro_setBonus.set_mexican[5].parsedBonus = new Object();
  TWPro.twpro_setBonus.set_mexican[6] = new Object();
  TWPro.twpro_setBonus.set_mexican[6].bonus = new Object();
  TWPro.twpro_setBonus.set_mexican[6].bonus.attributes = new Object();
  TWPro.twpro_setBonus.set_mexican[6].bonus.attributes.strength = 9;
  TWPro.twpro_setBonus.set_mexican[6].bonus.skills = new Object();
  TWPro.twpro_setBonus.set_mexican[6].jobBonus = new Object();
  TWPro.twpro_setBonus.set_mexican[6].jobBonus.all = 0;
  TWPro.twpro_setBonus.set_mexican[6].jobBonus.dynamite = 90;
  TWPro.twpro_setBonus.set_mexican[6].jobBonus.oil = 70;
  TWPro.twpro_setBonus.set_mexican[6].jobBonus.smuggle = 80;
  TWPro.twpro_setBonus.set_mexican[6].jobBonus.agave = 60;
  TWPro.twpro_setBonus.set_mexican[6].speedBonus = 60;
  TWPro.twpro_setBonus.set_mexican[6].parsedBonus = new Object();
  TWPro.twpro_setBonus.set_pilgrim_male = new Array();
  TWPro.twpro_setBonus.set_pilgrim_male[2] = new Object();
  TWPro.twpro_setBonus.set_pilgrim_male[2].bonus = new Object();
  TWPro.twpro_setBonus.set_pilgrim_male[2].bonus.attributes = new Object();
  TWPro.twpro_setBonus.set_pilgrim_male[2].bonus.skills = new Object();
  TWPro.twpro_setBonus.set_pilgrim_male[2].jobBonus = new Object();
  TWPro.twpro_setBonus.set_pilgrim_male[2].jobBonus.all = 0;
  TWPro.twpro_setBonus.set_pilgrim_male[2].jobBonus.construct = 5;
  TWPro.twpro_setBonus.set_pilgrim_male[2].speedBonus = 0;
  TWPro.twpro_setBonus.set_pilgrim_male[2].parsedBonus = new Object();
  TWPro.twpro_setBonus.set_pilgrim_male[3] = new Object();
  TWPro.twpro_setBonus.set_pilgrim_male[3].bonus = new Object();
  TWPro.twpro_setBonus.set_pilgrim_male[3].bonus.attributes = new Object();
  TWPro.twpro_setBonus.set_pilgrim_male[3].bonus.skills = new Object();
  TWPro.twpro_setBonus.set_pilgrim_male[3].jobBonus = new Object();
  TWPro.twpro_setBonus.set_pilgrim_male[3].jobBonus.all = 0;
  TWPro.twpro_setBonus.set_pilgrim_male[3].jobBonus.construct = 15;
  TWPro.twpro_setBonus.set_pilgrim_male[3].speedBonus = 0;
  TWPro.twpro_setBonus.set_pilgrim_male[3].parsedBonus = new Object();
  TWPro.twpro_setBonus.set_pilgrim_male[4] = new Object();
  TWPro.twpro_setBonus.set_pilgrim_male[4].bonus = new Object();
  TWPro.twpro_setBonus.set_pilgrim_male[4].bonus.attributes = new Object();
  TWPro.twpro_setBonus.set_pilgrim_male[4].bonus.skills = new Object();
  TWPro.twpro_setBonus.set_pilgrim_male[4].jobBonus = new Object();
  TWPro.twpro_setBonus.set_pilgrim_male[4].jobBonus.all = 0;
  TWPro.twpro_setBonus.set_pilgrim_male[4].jobBonus.construct = 30;
  TWPro.twpro_setBonus.set_pilgrim_male[4].speedBonus = 0;
  TWPro.twpro_setBonus.set_pilgrim_male[4].parsedBonus = new Object();
  TWPro.twpro_setBonus.set_pilgrim_male[5] = new Object();
  TWPro.twpro_setBonus.set_pilgrim_male[5].bonus = new Object();
  TWPro.twpro_setBonus.set_pilgrim_male[5].bonus.attributes = new Object();
  TWPro.twpro_setBonus.set_pilgrim_male[5].bonus.skills = new Object();
  TWPro.twpro_setBonus.set_pilgrim_male[5].jobBonus = new Object();
  TWPro.twpro_setBonus.set_pilgrim_male[5].jobBonus.all = 0;
  TWPro.twpro_setBonus.set_pilgrim_male[5].jobBonus.bible = 150;
  TWPro.twpro_setBonus.set_pilgrim_male[5].jobBonus.construct = 50;
  TWPro.twpro_setBonus.set_pilgrim_male[5].speedBonus = 0;
  TWPro.twpro_setBonus.set_pilgrim_male[5].parsedBonus = new Object();
  TWPro.twpro_setBonus.set_pilgrim_female = new Array();
  TWPro.twpro_setBonus.set_pilgrim_female[2] = new Object();
  TWPro.twpro_setBonus.set_pilgrim_female[2].bonus = new Object();
  TWPro.twpro_setBonus.set_pilgrim_female[2].bonus.attributes = new Object();
  TWPro.twpro_setBonus.set_pilgrim_female[2].bonus.skills = new Object();
  TWPro.twpro_setBonus.set_pilgrim_female[2].jobBonus = new Object();
  TWPro.twpro_setBonus.set_pilgrim_female[2].jobBonus.all = 0;
  TWPro.twpro_setBonus.set_pilgrim_female[2].jobBonus.construct = 5;
  TWPro.twpro_setBonus.set_pilgrim_female[2].speedBonus = 0;
  TWPro.twpro_setBonus.set_pilgrim_female[2].parsedBonus = new Object();
  TWPro.twpro_setBonus.set_pilgrim_female[3] = new Object();
  TWPro.twpro_setBonus.set_pilgrim_female[3].bonus = new Object();
  TWPro.twpro_setBonus.set_pilgrim_female[3].bonus.attributes = new Object();
  TWPro.twpro_setBonus.set_pilgrim_female[3].bonus.skills = new Object();
  TWPro.twpro_setBonus.set_pilgrim_female[3].jobBonus = new Object();
  TWPro.twpro_setBonus.set_pilgrim_female[3].jobBonus.all = 0;
  TWPro.twpro_setBonus.set_pilgrim_female[3].jobBonus.construct = 15;
  TWPro.twpro_setBonus.set_pilgrim_female[3].speedBonus = 0;
  TWPro.twpro_setBonus.set_pilgrim_female[3].parsedBonus = new Object();
  TWPro.twpro_setBonus.set_pilgrim_female[4] = new Object();
  TWPro.twpro_setBonus.set_pilgrim_female[4].bonus = new Object();
  TWPro.twpro_setBonus.set_pilgrim_female[4].bonus.attributes = new Object();
  TWPro.twpro_setBonus.set_pilgrim_female[4].bonus.skills = new Object();
  TWPro.twpro_setBonus.set_pilgrim_female[4].jobBonus = new Object();
  TWPro.twpro_setBonus.set_pilgrim_female[4].jobBonus.all = 0;
  TWPro.twpro_setBonus.set_pilgrim_female[4].jobBonus.construct = 30;
  TWPro.twpro_setBonus.set_pilgrim_female[4].speedBonus = 0;
  TWPro.twpro_setBonus.set_pilgrim_female[4].parsedBonus = new Object();
  TWPro.twpro_setBonus.set_pilgrim_female[5] = new Object();
  TWPro.twpro_setBonus.set_pilgrim_female[5].bonus = new Object();
  TWPro.twpro_setBonus.set_pilgrim_female[5].bonus.attributes = new Object();
  TWPro.twpro_setBonus.set_pilgrim_female[5].bonus.skills = new Object();
  TWPro.twpro_setBonus.set_pilgrim_female[5].jobBonus = new Object();
  TWPro.twpro_setBonus.set_pilgrim_female[5].jobBonus.all = 0;
  TWPro.twpro_setBonus.set_pilgrim_female[5].jobBonus.bible = 150;
  TWPro.twpro_setBonus.set_pilgrim_female[5].jobBonus.construct = 50;
  TWPro.twpro_setBonus.set_pilgrim_female[5].speedBonus = 0;
  TWPro.twpro_setBonus.set_pilgrim_female[5].parsedBonus = new Object();
  TWPro.twpro_setBonus.set_quackery = new Array();
  TWPro.twpro_setBonus.set_quackery[2] = new Object();
  TWPro.twpro_setBonus.set_quackery[2].bonus = new Object();
  TWPro.twpro_setBonus.set_quackery[2].bonus.attributes = new Object();
  TWPro.twpro_setBonus.set_quackery[2].bonus.attributes.dexterity = 1;
  TWPro.twpro_setBonus.set_quackery[2].bonus.skills = new Object();
  TWPro.twpro_setBonus.set_quackery[2].bonus.skills.endurance = 5;
  TWPro.twpro_setBonus.set_quackery[2].bonus.skills.trade = 5;
  TWPro.twpro_setBonus.set_quackery[2].jobBonus = new Object();
  TWPro.twpro_setBonus.set_quackery[2].jobBonus.all = 0;
  TWPro.twpro_setBonus.set_quackery[2].jobBonus.quackery = 30;
  TWPro.twpro_setBonus.set_quackery[2].speedBonus = 0;
  TWPro.twpro_setBonus.set_quackery[2].parsedBonus = new Object();
  TWPro.twpro_setBonus.set_quackery[3] = new Object();
  TWPro.twpro_setBonus.set_quackery[3].bonus = new Object();
  TWPro.twpro_setBonus.set_quackery[3].bonus.attributes = new Object();
  TWPro.twpro_setBonus.set_quackery[3].bonus.attributes.dexterity = 2;
  TWPro.twpro_setBonus.set_quackery[3].bonus.skills = new Object();
  TWPro.twpro_setBonus.set_quackery[3].bonus.skills.endurance = 10;
  TWPro.twpro_setBonus.set_quackery[3].bonus.skills.trade = 10;
  TWPro.twpro_setBonus.set_quackery[3].jobBonus = new Object();
  TWPro.twpro_setBonus.set_quackery[3].jobBonus.all = 0;
  TWPro.twpro_setBonus.set_quackery[3].jobBonus.quackery = 60;
  TWPro.twpro_setBonus.set_quackery[3].speedBonus = 0;
  TWPro.twpro_setBonus.set_quackery[3].parsedBonus = new Object();
  TWPro.twpro_setBonus.set_quackery[4] = new Object();
  TWPro.twpro_setBonus.set_quackery[4].bonus = new Object();
  TWPro.twpro_setBonus.set_quackery[4].bonus.attributes = new Object();
  TWPro.twpro_setBonus.set_quackery[4].bonus.attributes.dexterity = 4;
  TWPro.twpro_setBonus.set_quackery[4].bonus.skills = new Object();
  TWPro.twpro_setBonus.set_quackery[4].bonus.skills.endurance = 15;
  TWPro.twpro_setBonus.set_quackery[4].bonus.skills.trade = 15;
  TWPro.twpro_setBonus.set_quackery[4].jobBonus = new Object();
  TWPro.twpro_setBonus.set_quackery[4].jobBonus.all = 0;
  TWPro.twpro_setBonus.set_quackery[4].jobBonus.quackery = 90;
  TWPro.twpro_setBonus.set_quackery[4].speedBonus = 0;
  TWPro.twpro_setBonus.set_quackery[4].parsedBonus = new Object();
  TWPro.twpro_setBonus.set_quackery[5] = new Object();
  TWPro.twpro_setBonus.set_quackery[5].bonus = new Object();
  TWPro.twpro_setBonus.set_quackery[5].bonus.attributes = new Object();
  TWPro.twpro_setBonus.set_quackery[5].bonus.attributes.dexterity = 6;
  TWPro.twpro_setBonus.set_quackery[5].bonus.skills = new Object();
  TWPro.twpro_setBonus.set_quackery[5].bonus.skills.endurance = 20;
  TWPro.twpro_setBonus.set_quackery[5].bonus.skills.trade = 20;
  TWPro.twpro_setBonus.set_quackery[5].jobBonus = new Object();
  TWPro.twpro_setBonus.set_quackery[5].jobBonus.all = 0;
  TWPro.twpro_setBonus.set_quackery[5].jobBonus.quackery = 120;
  TWPro.twpro_setBonus.set_quackery[5].speedBonus = 0;
  TWPro.twpro_setBonus.set_quackery[5].parsedBonus = new Object();
  TWPro.twpro_setBonus.set_quackery[6] = new Object();
  TWPro.twpro_setBonus.set_quackery[6].bonus = new Object();
  TWPro.twpro_setBonus.set_quackery[6].bonus.attributes = new Object();
  TWPro.twpro_setBonus.set_quackery[6].bonus.attributes.dexterity = 9;
  TWPro.twpro_setBonus.set_quackery[6].bonus.skills = new Object();
  TWPro.twpro_setBonus.set_quackery[6].bonus.skills.tough = 18;
  TWPro.twpro_setBonus.set_quackery[6].bonus.skills.endurance = 20;
  TWPro.twpro_setBonus.set_quackery[6].bonus.skills.reflex = 18;
  TWPro.twpro_setBonus.set_quackery[6].bonus.skills.aim = 18;
  TWPro.twpro_setBonus.set_quackery[6].bonus.skills.shot = 18;
  TWPro.twpro_setBonus.set_quackery[6].bonus.skills.trade = 20;
  TWPro.twpro_setBonus.set_quackery[6].jobBonus = new Object();
  TWPro.twpro_setBonus.set_quackery[6].jobBonus.all = 0;
  TWPro.twpro_setBonus.set_quackery[6].jobBonus.quackery = 120;
  TWPro.twpro_setBonus.set_quackery[6].speedBonus = 0;
  TWPro.twpro_setBonus.set_quackery[6].parsedBonus = new Object();
  TWPro.twpro_setBonus.set_dancer = new Array();
  TWPro.twpro_setBonus.set_dancer[2] = new Object();
  TWPro.twpro_setBonus.set_dancer[2].bonus = new Object();
  TWPro.twpro_setBonus.set_dancer[2].bonus.attributes = new Object();
  TWPro.twpro_setBonus.set_dancer[2].bonus.attributes.charisma = 2;
  TWPro.twpro_setBonus.set_dancer[2].bonus.skills = new Object();
  TWPro.twpro_setBonus.set_dancer[2].bonus.skills.appearance = 10;
  TWPro.twpro_setBonus.set_dancer[2].jobBonus = new Object();
  TWPro.twpro_setBonus.set_dancer[2].jobBonus.all = 10;
  TWPro.twpro_setBonus.set_dancer[2].speedBonus = 0;
  TWPro.twpro_setBonus.set_dancer[2].parsedBonus = new Object();
  TWPro.twpro_setBonus.set_dancer[3] = new Object();
  TWPro.twpro_setBonus.set_dancer[3].bonus = new Object();
  TWPro.twpro_setBonus.set_dancer[3].bonus.attributes = new Object();
  TWPro.twpro_setBonus.set_dancer[3].bonus.attributes.charisma = 5;
  TWPro.twpro_setBonus.set_dancer[3].bonus.skills = new Object();
  TWPro.twpro_setBonus.set_dancer[3].bonus.skills.animal = 10;
  TWPro.twpro_setBonus.set_dancer[3].bonus.skills.appearance = 10;
  TWPro.twpro_setBonus.set_dancer[3].jobBonus = new Object();
  TWPro.twpro_setBonus.set_dancer[3].jobBonus.all = 25;
  TWPro.twpro_setBonus.set_dancer[3].speedBonus = 0;
  TWPro.twpro_setBonus.set_dancer[3].parsedBonus = new Object();
  TWPro.twpro_setBonus.set_dancer[4] = new Object();
  TWPro.twpro_setBonus.set_dancer[4].bonus = new Object();
  TWPro.twpro_setBonus.set_dancer[4].bonus.attributes = new Object();
  TWPro.twpro_setBonus.set_dancer[4].bonus.attributes.charisma = 9;
  TWPro.twpro_setBonus.set_dancer[4].bonus.skills = new Object();
  TWPro.twpro_setBonus.set_dancer[4].bonus.skills.finger_dexterity = 10;
  TWPro.twpro_setBonus.set_dancer[4].bonus.skills.animal = 10;
  TWPro.twpro_setBonus.set_dancer[4].bonus.skills.appearance = 10;
  TWPro.twpro_setBonus.set_dancer[4].jobBonus = new Object();
  TWPro.twpro_setBonus.set_dancer[4].jobBonus.all = 45;
  TWPro.twpro_setBonus.set_dancer[4].speedBonus = 0;
  TWPro.twpro_setBonus.set_dancer[4].parsedBonus = new Object();
  TWPro.twpro_setBonus.set_gentleman = new Array();
  TWPro.twpro_setBonus.set_gentleman[2] = new Object();
  TWPro.twpro_setBonus.set_gentleman[2].bonus = new Object();
  TWPro.twpro_setBonus.set_gentleman[2].bonus.attributes = new Object();
  TWPro.twpro_setBonus.set_gentleman[2].bonus.attributes.charisma = 1;
  TWPro.twpro_setBonus.set_gentleman[2].bonus.skills = new Object();
  TWPro.twpro_setBonus.set_gentleman[2].bonus.skills.appearance = 8;
  TWPro.twpro_setBonus.set_gentleman[2].jobBonus = new Object();
  TWPro.twpro_setBonus.set_gentleman[2].jobBonus.all = 5;
  TWPro.twpro_setBonus.set_gentleman[2].speedBonus = 0;
  TWPro.twpro_setBonus.set_gentleman[2].parsedBonus = new Object();
  TWPro.twpro_setBonus.set_gentleman[3] = new Object();
  TWPro.twpro_setBonus.set_gentleman[3].bonus = new Object();
  TWPro.twpro_setBonus.set_gentleman[3].bonus.attributes = new Object();
  TWPro.twpro_setBonus.set_gentleman[3].bonus.attributes.charisma = 3;
  TWPro.twpro_setBonus.set_gentleman[3].bonus.skills = new Object();
  TWPro.twpro_setBonus.set_gentleman[3].bonus.skills.leadership = 8;
  TWPro.twpro_setBonus.set_gentleman[3].bonus.skills.appearance = 8;
  TWPro.twpro_setBonus.set_gentleman[3].jobBonus = new Object();
  TWPro.twpro_setBonus.set_gentleman[3].jobBonus.all = 15;
  TWPro.twpro_setBonus.set_gentleman[3].speedBonus = 0;
  TWPro.twpro_setBonus.set_gentleman[3].parsedBonus = new Object();
  TWPro.twpro_setBonus.set_gentleman[4] = new Object();
  TWPro.twpro_setBonus.set_gentleman[4].bonus = new Object();
  TWPro.twpro_setBonus.set_gentleman[4].bonus.attributes = new Object();
  TWPro.twpro_setBonus.set_gentleman[4].bonus.attributes.charisma = 6;
  TWPro.twpro_setBonus.set_gentleman[4].bonus.skills = new Object();
  TWPro.twpro_setBonus.set_gentleman[4].bonus.skills.leadership = 8;
  TWPro.twpro_setBonus.set_gentleman[4].bonus.skills.trade = 8;
  TWPro.twpro_setBonus.set_gentleman[4].bonus.skills.appearance = 8;
  TWPro.twpro_setBonus.set_gentleman[4].jobBonus = new Object();
  TWPro.twpro_setBonus.set_gentleman[4].jobBonus.all = 30;
  TWPro.twpro_setBonus.set_gentleman[4].speedBonus = 0;
  TWPro.twpro_setBonus.set_gentleman[4].parsedBonus = new Object();
  TWPro.twpro_setBonus.set_gentleman[5] = new Object();
  TWPro.twpro_setBonus.set_gentleman[5].bonus = new Object();
  TWPro.twpro_setBonus.set_gentleman[5].bonus.attributes = new Object();
  TWPro.twpro_setBonus.set_gentleman[5].bonus.attributes.charisma = 10;
  TWPro.twpro_setBonus.set_gentleman[5].bonus.skills = new Object();
  TWPro.twpro_setBonus.set_gentleman[5].bonus.skills.leadership = 8;
  TWPro.twpro_setBonus.set_gentleman[5].bonus.skills.trade = 8;
  TWPro.twpro_setBonus.set_gentleman[5].bonus.skills.appearance = 16;
  TWPro.twpro_setBonus.set_gentleman[5].jobBonus = new Object();
  TWPro.twpro_setBonus.set_gentleman[5].jobBonus.all = 50;
  TWPro.twpro_setBonus.set_gentleman[5].speedBonus = 0;
  TWPro.twpro_setBonus.set_gentleman[5].parsedBonus = new Object();
  TWPro.twpro_invHash = '';
  TWPro.twpro_itemStorage = new Object();
  while(TWPro.twpro_active)
  {
    var twpro_matchtest;
    if(AjaxWindow.show.toString().search(/evalJS/) == -1)
    {
      if((AjaxWindow.show.toString().search(/if *\(data\.page *!= *undefined\) *{/) == -1) || (AjaxWindow.show.toString().search(/eval\(data\.js\);/) == -1))
      {
        TWPro.twpro_failureInject = true;
        break;
      }
      TWPro.twpro_failureRollback.unshift('AjaxWindow.show = '+AjaxWindow.show.toString());
      eval('AjaxWindow.show = '+AjaxWindow.show.toString().replace(/if *\(data\.page *!= *undefined\) *{/,'if(data.page!=undefined){TWPro.twpro_injectionSwitch(extendeName,\'page\',data,null);').replace(/eval\(data\.js\);/,'TWPro.twpro_injectionSwitch(extendeName,\'js\',data,\'js\');eval(data.js);TWPro.twpro_injectionSwitch(extendeName,\'after\',data,null);'));
    }
    else
    {
      if((AjaxWindow.show.toString().search(/if *\(data\.page *!= *undefined\) *{/) == -1) || (AjaxWindow.show.toString().search(/this\.evalJS\(\);/) == -1))
      {
        TWPro.twpro_failureInject = true;
        break;
      }
      TWPro.twpro_failureRollback.unshift('AjaxWindow.show = '+AjaxWindow.show.toString());
      eval('AjaxWindow.show = '+AjaxWindow.show.toString().replace(/if *\(data\.page *!= *undefined\) *{/,'if(data.page!=undefined){TWPro.twpro_injectionSwitch(extendeName,\'page\',data,null);').replace(/this\.evalJS\(\);/,'this.twpro_extendeName=extendeName;this.evalJS();'));
      if(Ajax.prototype.evalJS.toString().search(/eval\(this\.jsContent\);/) == -1)
      {
        TWPro.twpro_failureInject = true;
        break;
      }
      TWPro.twpro_failureRollback.unshift('Ajax.prototype.evalJS = '+Ajax.prototype.evalJS.toString());
      eval('Ajax.prototype.evalJS = '+Ajax.prototype.evalJS.toString().replace(/eval\(this\.jsContent\);/,'TWPro.twpro_injectionSwitch(this.twpro_extendeName,\'js\',this,\'jsContent\');eval(this.jsContent);TWPro.twpro_injectionSwitch(this.twpro_extendeName,\'after\',this,null);'));
    }
    if(Wear.add.toString().search(/}, *('*)over/) == -1)
    {
      TWPro.twpro_failureInject = true;
      break;
    }
    TWPro.twpro_failureRollback.unshift('Wear.add = '+Wear.add.toString());
    eval('Wear.add = '+Wear.add.toString().replace(/}, *('*)over/,'TWPro.twpro_changeItem();},$1over'));
    if(Wear.uncarry.toString().search(/}\.bind/) == -1)
    {
      TWPro.twpro_failureInject = true;
      break;
    }
    TWPro.twpro_failureRollback.unshift('Wear.uncarry = '+Wear.uncarry.toString());
    eval('Wear.uncarry = '+Wear.uncarry.toString().replace(/}\.bind/,'TWPro.twpro_changeItem();}.bind'));
    if(Bag.getInstance().add.toString().search(/}, *('*)over/) == -1)
    {
      TWPro.twpro_failureInject = true;
      break;
    }
    twpro_matchtest = Bag.getInstance().add.toString().match(/(["'])wear_["'] *\+ *item\.get_type\(\) *\+ *["']_highlight["']/g);
    if(twpro_matchtest == null)
    {
      TWPro.twpro_failureInject = true;
      break;
    }
    if(twpro_matchtest.length != 3)
    {
      TWPro.twpro_failureInject = true;
      break;
    }
    TWPro.twpro_failureRollback.unshift('Bag.getInstance().add = '+Bag.getInstance().add.toString());
    eval('Bag.getInstance().add = '+Bag.getInstance().add.toString().replace(/}, *('*)over/,'TWPro.twpro_changeItem();},$1over').replace(/(["'])wear_["'] *\+ *item\.get_type\(\) *\+ *["']_highlight["']/g,'(TWPro.twpro_activeJob())?($1$1):($1wear_$1+item.get_type()+$1_highlight$1)'));
    if(Bag.getInstance().carry.toString().search(/return true;}\.bind/) == -1)
    {
      TWPro.twpro_failureInject = true;
      break;
    }
    TWPro.twpro_failureRollback.unshift('Bag.getInstance().carry = '+Bag.getInstance().carry.toString());
    eval('Bag.getInstance().carry = '+Bag.getInstance().carry.toString().replace(/return true;}\.bind/,'TWPro.twpro_changeItem();return true;}.bind'));
    if(ItemPopup.prototype.getXHTML.toString().replace(/xhtml *\+= *(['"])<span class=(\\*)"item_popup_trader_price/) == -1)
    {
      TWPro.twpro_failureInject = true;
      break;
    }
    TWPro.twpro_failureRollback.unshift('ItemPopup.prototype.getXHTML = '+ItemPopup.prototype.getXHTML.toString());
    eval('ItemPopup.prototype.getXHTML = '+ItemPopup.prototype.getXHTML.toString().replace(/xhtml *\+= *(['"])<span class=(\\*)"item_popup_trader_price/,'xhtml+=TWPro.twpro_popup(item);xhtml+=$1<span class=$2"item_popup_trader_price'));
    break;
  }
  TWPro.twpro_world = window.location.hostname.substr(0,window.location.hostname.search(/\./));
  var twpro_support = document.createElement('div');
  twpro_support.id = 'twpro_support';
  twpro_support.style.position = 'absolute';
  twpro_support.style.color = '#656565';
  twpro_support.style.fontSize = '10px';
  twpro_support.style.marginLeft = '2px';
  twpro_support.style.marginTop = '9px';
  twpro_support.style.zIndex = '1';
  var twpro_supportLink = document.createElement('a');
  twpro_supportLink.id = 'twpro_supportLink';
  twpro_supportLink.href = 'http://dinaburg.ucoz.ru';
  twpro_supportLink.target = '_blank';
  twpro_supportLink.appendChild(document.createTextNode(""));
  var twpro_supportAuthor = document.createElement('a');
  twpro_supportAuthor.id = 'twpro_supportAuthor';
  if(TWPro.twpro_getAuthor())
  {
    twpro_supportAuthor.href = 'javascript:AjaxWindow.show(\'profile\',{char_id:84887},\'84887\');';
  }
  else
  {
    twpro_supportAuthor.href = 'http://forum.the-west.ru/member.php?u=4397';
    twpro_supportAuthor.target = '_blank';
  }
  twpro_supportAuthor.appendChild(document.createTextNode(""));
  twpro_support.appendChild(document.createTextNode("Эйб Линкольн освободил людей, а Сэм Кольт уравнял их в правах."));
  twpro_support.appendChild(twpro_supportLink);
  twpro_support.appendChild(document.createTextNode(""));
  twpro_support.appendChild(twpro_supportAuthor);
  if(!TWPro.twpro_active)
  {
    twpro_support.appendChild(document.createTextNode(" (global deaktiviert)"));
  }
  document.getElementById('main_container').insertBefore(twpro_support,document.getElementById('footer_server_time'));
  if(TWPro.twpro_failureInject)
  {
    TWPro.twpro_throwFailure();
  }
}

function twpro_throwFailure()
{
  if(TWPro.twpro_failure) return;
  TWPro.twpro_failure = true;
  for(var twpro_i=0;twpro_i<TWPro.twpro_failureRollback.length;twpro_i++)
  {
    eval(TWPro.twpro_failureRollback[twpro_i]);
  }
  document.getElementById('twpro_support').appendChild(document.createTextNode(" (deaktiviert durch Fehler)"));
}

function twpro_injectionSwitch(twpro_extendeName, twpro_injectionType, twpro_data, twpro_jsversion)
{
  if(TWPro.twpro_failure) return;
  if(twpro_extendeName==undefined)
  {
    return;
  }
  switch(twpro_injectionType)
  {
    case 'page':
    {
      if(twpro_extendeName == 'inventory')
      {
        TWPro.twpro_insertList(twpro_data);
      }
      if(twpro_extendeName == 'settings')
      {
        twpro_data.page = twpro_data.page.replace(/<img src="img\.php\?type=sig&amp;design=classic1&amp;player_id=(\d+)&time=(\d+)"/,'<img alt="" src="http://www.tw-pro.de/sig.php?server='+window.location.hostname+'&amp;player_id=$1&amp;time=$2" class="playerSignature" style="margin: 4px auto;"><input type="text" value="[url=http://www.tw-pro.de][img]http://www.tw-pro.de/sig.php?server='+window.location.hostname+'&amp;player_id=$1[/img][/url]" style="width: 468px; margin: 0 auto 4px 0;" onclick="this.focus(); this.select();" /><input type="text" value="&lt;a href=&quot;http://www.tw-pro.de&quot;&gt;&lt;img alt=&quot;&quot; src=&quot;http://www.tw-pro.de/sig.php?server='+window.location.hostname+'&amp;player_id=$1&quot; /&gt;&lt;/a&gt;" style="width: 468px; margin: 0 auto 16px 0;" onclick="this.focus(); this.select();" /><img src="img.php?type=sig&amp;design=classic1&amp;player_id=$1&time=$2"');
      }
      break;
    }
    case 'js':
    {
      if((twpro_extendeName == 'inventory') || (twpro_extendeName.substr(0,15) == 'building_tailor') || (twpro_extendeName.substr(0,17) == 'building_gunsmith') || (twpro_extendeName.substr(0,16) == 'building_general'))
      {
        TWPro.twpro_getPlace(twpro_data,twpro_extendeName,twpro_jsversion);
      }
      if(twpro_extendeName == 'settings')
      {
      }
      break;
    }
    case 'after':
    {
      if(twpro_extendeName == 'inventory')
      {
        TWPro.twpro_showList();
      }
      break;
    }
  }
}

function twpro_getAuthor()
{
  switch(TWPro.twpro_world)
  {
    case 'de1':
    case 'de2':
    case 'de3':
    case 'de4':
    case 'de5':
    case 'de6':
      return true;
  }
  return false;
}

function twpro_activeJob()
{
  if(TWPro.twpro_failure) return false;
  if((TWPro.twpro_calculated) && (document.getElementById("twpro_jobList")) && (document.getElementById("twpro_jobList").selectedIndex!=0))
  {
    return true;
  }
  else
  {
    return false;
  }
}

function twpro_getPlace(twpro_data,twpro_extendeName,twpro_jsversion)
{
  if(TWPro.twpro_failure) return;
  if(twpro_extendeName=='inventory')
  {
    if(twpro_data[twpro_jsversion].search(/wear_content\[i\]\);(\s*)\}/) == -1)
    {
      TWPro.twpro_throwFailure();
      return;
    }
    if(twpro_data[twpro_jsversion].search(/bag_content\[i\]\);(\s*)\}/) == -1)
    {
      TWPro.twpro_throwFailure();
      return;
    }

    twpro_data[twpro_jsversion] = twpro_data[twpro_jsversion].replace(/wear_content\[i\]\);(\s*)\}/,'wear_content[i]);$1};TWPro.twpro_initializeItems(\'wear\',null);').replace(/bag_content\[i\]\);(\s*)\}/,'bag_content[i]);$1};TWPro.twpro_initializeItems(\'bag\',null);');
  }
  else
  {
    if(twpro_data[twpro_jsversion].search(/var trader_inv/) == -1)
    {
      TWPro.twpro_throwFailure();
      return;
    }
    if((twpro_data[twpro_jsversion].search(/trader_inv\[i\]\);(\s*)\}/) == -1) && (twpro_data[twpro_jsversion].search(/trader_inv\[i\], *(['"])(\w*)['"]\);(\s*)\}/) == -1))
    {
      TWPro.twpro_throwFailure();
      return;
    }
    twpro_data[twpro_jsversion] = twpro_data[twpro_jsversion].replace(/var trader_inv/,'TWPro.twpro_initializeItems(\'own\',playerInventory);var trader_inv').replace(/trader_inv\[i\]\);(\s*)\}/,'trader_inv[i]);$1};TWPro.twpro_initializeItems(\'trader\',traderInventory);').replace(/trader_inv\[i\], *(['"])(\w*)['"]\);(\s*)\}/,'trader_inv[i],$1$2$1);$3};TWPro.twpro_initializeItems(\'trader\',traderInventory);');
  }
}

function twpro_popup(twpro_item)
{
  if(TWPro.twpro_failure) return '';
  var twpro_xhtml = '';
  if(TWPro.twpro_calculated && (twpro_item.twpro_place!=undefined))
  {
    if((twpro_item.twpro_place=='wear') || (twpro_item.twpro_place=='bag'))
    {
      if(document.getElementById("twpro_jobList") && (document.getElementById("twpro_jobList").selectedIndex!=0))
      {
        var twpro_selectedJob = parseInt(document.getElementById("twpro_jobList")[document.getElementById("twpro_jobList").selectedIndex].value);
        if(twpro_selectedJob>=0)
        {
          var twpro_job = TWPro.twpro_jobs[twpro_selectedJob];
          if(twpro_item.twpro_bonus==undefined)
          {
            TWPro.twpro_prepareItem(twpro_item);
            if(twpro_item.twpro_bonus)
            {
              for(var twpro_i=0;twpro_i<TWPro.twpro_jobs.length;twpro_i++)
              {
                twpro_item.twpro_jobbonus[TWPro.twpro_jobs[twpro_i].shortName] = TWPro.twpro_testItem(TWPro.twpro_jobs[twpro_i],twpro_item);
              }
            }
          }
          if(twpro_item.twpro_bonus)
          {
            var twpro_aktplus = twpro_item.twpro_jobbonus[TWPro.twpro_jobs[twpro_selectedJob].shortName];
            if(twpro_aktplus > 0)
            {
              twpro_xhtml+='<span class="item_popup_bonus">';
              twpro_xhtml+='+'+twpro_aktplus+' '+twpro_job.name;
              twpro_xhtml+='<br /></span><br />';
            }
          }
        }
      }
    }
    if(twpro_item.twpro_place=='trader')
    {
      if(twpro_item.twpro_bonus==undefined)
      {
        TWPro.twpro_prepareItem(twpro_item);
        if(twpro_item.twpro_bonus)
        {
          for(var twpro_i=0;twpro_i<TWPro.twpro_jobs.length;twpro_i++)
          {
            twpro_item.twpro_jobbonus[TWPro.twpro_jobs[twpro_i].shortName] = TWPro.twpro_testItem(TWPro.twpro_jobs[twpro_i],twpro_item);
          }
        }
      }
      if(twpro_item.twpro_bonus)
      {
        var twpro_j = 0;
        var twpro_plus = new Array();
        var twpro_better;
        for(var twpro_i=0;twpro_i<TWPro.twpro_jobs.length;twpro_i++)
        {
          twpro_better=twpro_item.twpro_jobbonus[TWPro.twpro_jobs[twpro_i].shortName]-TWPro.twpro_jobs[twpro_i].twpro_bestStats[twpro_item.type];
          if(twpro_better>0)
          {
            twpro_plus.push(twpro_better+' '+TWPro.twpro_jobs[twpro_i].name);
            twpro_j++;
          }
        }
        if(twpro_j>0)
        {
          twpro_plus.sort(TWPro.twpro_sortPlus);
          twpro_xhtml+='<span class="item_popup_bonus">';
          twpro_xhtml+='<table><tr><td>';
          for(var twpro_i=0;(twpro_i<twpro_plus.length)&&(twpro_i<33);twpro_i++)
          {
            twpro_xhtml+='<span style="white-space:nowrap;'
            if(TWPro.twpro_activeJob() && (twpro_plus[twpro_i].search(new RegExp(TWPro.twpro_jobs[parseInt(document.getElementById('twpro_jobList')[document.getElementById('twpro_jobList').selectedIndex].value)].name))!=-1))
            {
              twpro_xhtml+='color:rgb(78, 55, 7);';
            }
            twpro_xhtml+='">+'+twpro_plus[twpro_i]+'</span><br />';
            if(((twpro_j<=30) && (twpro_i==14)) || (((twpro_j>30) && (twpro_j<=33)) && (twpro_i==(Math.round(twpro_j/2)-1))) || ((twpro_j>33) && (twpro_i==16)))
            {
              twpro_xhtml+='</td><td>';
            }
          }
          if(twpro_i<twpro_plus.length)
          {
            twpro_xhtml+='...';
          }
          twpro_xhtml+='</td></tr></table>';
          twpro_xhtml+='</span><br />';
        }
      }
    }
  }
  return twpro_xhtml;
}

function twpro_insertList(twpro_data)
{
  if(TWPro.twpro_failure) return;
  if(TWPro.twpro_jobsort==undefined)
  {
    TWPro.twpro_jobsort = 'name';
  }
  TWPro.twpro_bag = new Object();
  TWPro.twpro_bag.twpro_priceWear = 0;
  TWPro.twpro_bag.twpro_priceBag = 0;
  TWPro.twpro_bag.twpro_priceItems = 0;
  TWPro.twpro_bag.twpro_priceYields = 0;
  TWPro.twpro_bag.twpro_countType = new Object();
  TWPro.twpro_bag.twpro_types = new Array();
  TWPro.twpro_setItems = new Object();
  TWPro.twpro_setItemsCount = new Object();
  for(var twpro_set in TWPro.twpro_setBonus)
  {
    TWPro.twpro_setItemsCount[twpro_set] = 0;
  }
  TWPro.twpro_invHashTest = new Array();
  for(var twpro_type in Character.itemLevelRequirementDecrease)
  {
    if((twpro_type!='all') && (!isNaN(Character.itemLevelRequirementDecrease[twpro_type])))
    {
      TWPro.twpro_bag.twpro_types.push(twpro_type);
      TWPro.twpro_bag.twpro_countType[twpro_type] = 0;
    }
  }
  var twpro_xhtml = '<table id="twpro_jobDisplay" style="display: inline;position: absolute; visibility:hidden; margin-left:20px;"><tr><td>';
  twpro_xhtml += '<a href="javascript:undefined;" onmouseup="TWPro.twpro_sortList(\'name\');" id="twpro_jobsort_link_name"><img id="twpro_jobsort_name" alt="" src="images/transparent.png" style="height: 17px;width: 20px;background-image: url(http://www.tw-pro.de/img/sort.png);background-position: '+((TWPro.twpro_jobsort == 'name')?('0px 0px'):('0px -17px'))+';" onmouseover="this.style.backgroundPosition=\'0px 0px\';" onmouseout="this.style.backgroundPosition=((TWPro.twpro_jobsort == \'name\')?(\'0px 0px\'):(\'0px -17px\'));"/></a>';
  twpro_xhtml += '<a href="javascript:undefined;" onmouseup="TWPro.twpro_sortList(\'erfahrung\');" id="twpro_jobsort_link_erfahrung"><img id="twpro_jobsort_erfahrung" alt="" src="images/transparent.png" style="height: 17px;width: 21px;background-image: url(http://www.tw-pro.de/img/sort.png);background-position: '+((TWPro.twpro_jobsort == 'erfahrung')?('-20px 0px'):('-20px -17px'))+';" onmouseover="this.style.backgroundPosition=\'-20px 0px\';" onmouseout="this.style.backgroundPosition=((TWPro.twpro_jobsort == \'erfahrung\')?(\'-20px 0px\'):(\'-20px -17px\'));"/></a>';
  twpro_xhtml += '<a href="javascript:undefined;" onmouseup="TWPro.twpro_sortList(\'lohn\');" id="twpro_jobsort_link_lohn"><img id="twpro_jobsort_lohn" alt="" src="images/transparent.png" style="height: 17px;width: 20px;background-image: url(http://www.tw-pro.de/img/sort.png);background-position: '+((TWPro.twpro_jobsort == 'lohn')?('-41px 0px'):('-41px -17px'))+';" onmouseover="this.style.backgroundPosition=\'-41px 0px\';" onmouseout="this.style.backgroundPosition=((TWPro.twpro_jobsort == \'lohn\')?(\'-41px 0px\'):(\'-41px -17px\'));"/></a>';
  twpro_xhtml += '<a href="javascript:undefined;" onmouseup="TWPro.twpro_sortList(\'glueck\');" id="twpro_jobsort_link_glueck"><img id="twpro_jobsort_glueck" alt="" src="images/transparent.png" style="height: 17px;width: 21px;background-image: url(http://www.tw-pro.de/img/sort.png);background-position: '+((TWPro.twpro_jobsort == 'glueck')?('-61px 0px'):('-61px -17px'))+';" onmouseover="this.style.backgroundPosition=\'-61px 0px\';" onmouseout="this.style.backgroundPosition=((TWPro.twpro_jobsort == \'glueck\')?(\'-61px 0px\'):(\'-61px -17px\'));"/></a>';
  twpro_xhtml += '<span id="twpro_aktuelleap" style="position:absolute;right:5px;visibility:hidden;"><span id="twpro_aktuelleapvalue" style="border-style:solid;border-width:1px;padding:2px;"></span> !</span></td></tr><tr><td><select id="twpro_jobList" size="1" onchange="TWPro.twpro_changeJob()" onclick="TWPro.twpro_clickList()" style="background-color: rgb(207, 195, 166); font-size: 10px; width:190px;"><option value="-1" id="twpro_wait" style="background-color: rgb(207, 195, 166);">Работы</option></select></td></tr></table>';
  twpro_data.page = twpro_data.page.replace(/<h2(.*)">(.+)<\/h2>/,'<h2$1white-space: nowrap;"><span id="twpro_bag" style="cursor: default;">$2</span>'+twpro_xhtml+'</h2>');
}

function twpro_sortList(twpro_jobSortItem)
{
  if(TWPro.twpro_failure) return;
  TWPro.twpro_jobsort = twpro_jobSortItem;
  TWPro.twpro_jobSortMark(twpro_jobSortItem,true);
  if(twpro_jobSortItem != 'name')
  {
    TWPro.twpro_jobSortMark('name',false);
  }
  if(twpro_jobSortItem != 'erfahrung')
  {
    TWPro.twpro_jobSortMark('erfahrung',false);
  }
  if(twpro_jobSortItem != 'lohn')
  {
    TWPro.twpro_jobSortMark('lohn',false);
  }
  if(twpro_jobSortItem != 'glueck')
  {
    TWPro.twpro_jobSortMark('glueck',false);
  }
  if(TWPro.twpro_calculated && document.getElementById("twpro_jobList"))
  {
    if(document.getElementById('twpro_wait').text == 'Сброс')
    {
      document.getElementById('twpro_wait').text = 'Ждите ...';
      var twpro_selectedJobName = 'none';
      if(document.getElementById("twpro_jobList").selectedIndex!=0)
      {
        var twpro_selectedJob = parseInt(document.getElementById("twpro_jobList")[document.getElementById("twpro_jobList").selectedIndex].value);
        if(twpro_selectedJob>=0)
        {
          twpro_selectedJobName = TWPro.twpro_jobs[twpro_selectedJob].shortName;
        }
      }
      document.getElementById("twpro_jobList").selectedIndex = 0;
      while(document.getElementById("twpro_jobList").lastChild.id != 'twpro_wait')
      {
        document.getElementById("twpro_jobList").removeChild(document.getElementById("twpro_jobList").lastChild);
      }
      TWPro.twpro_jobs.sort(TWPro.twpro_sortJobs);
      TWPro.twpro_insertListItems();
      for(var twpro_i=0;twpro_i<TWPro.twpro_jobs.length;twpro_i++)
      {
        TWPro.twpro_jobs[twpro_i].twpro_jobid = twpro_i;
      }
      for(var twpro_i=0;twpro_i<document.getElementById("twpro_jobList").options.length;twpro_i++)
      {
        var twpro_jobTest = parseInt(document.getElementById("twpro_jobList").options[twpro_i].value);
        if(twpro_jobTest>=0)
        {
          if(twpro_selectedJobName == TWPro.twpro_jobs[twpro_jobTest].shortName)
          {
            document.getElementById("twpro_jobList").selectedIndex = twpro_i;
          }
        }
      }
      document.getElementById('twpro_wait').text = 'Cброс';
    }
    else
    {
      TWPro.twpro_jobs.sort(TWPro.twpro_sortJobs);
    }
  }
  document.getElementById('twpro_jobsort_link_'+twpro_jobSortItem).blur();
}

function twpro_jobSortMark(twpro_jobSortItem,twpro_jobSortValue)
{
  if(TWPro.twpro_failure) return;
  var twpro_bgposition = '';
  switch(twpro_jobSortItem)
  {
    case 'name':
    {
      twpro_bgposition += '0px';
      break;
    }
    case 'erfahrung':
    {
      twpro_bgposition += '-20px';
      break;
    }
    case 'lohn':
    {
      twpro_bgposition += '-41px';
      break;
    }
    case 'glueck':
    {
      twpro_bgposition += '-61px';
      break;
    }
  }
  twpro_bgposition += ' ';
  if(twpro_jobSortValue)
  {
    twpro_bgposition += '0px';
  }
  else
  {
    twpro_bgposition += '-17px';
  }
  document.getElementById('twpro_jobsort_'+twpro_jobSortItem).style.backgroundPosition = twpro_bgposition;
}

function twpro_showList()
{
  if(TWPro.twpro_failure) return;
  $('twpro_jobsort_link_name').addMousePopup(new MousePopup('<b>по названию</b>',100,{opacity:0.95}));
  $('twpro_jobsort_link_erfahrung').addMousePopup(new MousePopup('<b>по опыту</b>',100,{opacity:0.95}));
  $('twpro_jobsort_link_lohn').addMousePopup(new MousePopup('<b>по заработку</b>',100,{opacity:0.95}));
  $('twpro_jobsort_link_glueck').addMousePopup(new MousePopup('<b>по удаче</b>',100,{opacity:0.95}));
  TWPro.twpro_bag.twpro_bagPopup = new MousePopup('',100,{opacity:0.95});
  TWPro.twpro_bag.twpro_bagPopup.twpro_refresh = function(){this.setXHTML(TWPro.twpro_getBagPopup());};
  TWPro.twpro_bag.twpro_bagPopup.twpro_refresh();
  $('twpro_bag').addMousePopup(TWPro.twpro_bag.twpro_bagPopup);

  if(TWPro.twpro_invHash==TWPro.twpro_invHashTest.join(','))
  {
    for(var twpro_wear in Wear.wear)
    {
      TWPro.twpro_prepareItem(Wear.wear[twpro_wear].obj);
      if(Wear.wear[twpro_wear].obj.twpro_bonus)
      {
        Wear.wear[twpro_wear].obj.twpro_jobbonus = TWPro.twpro_itemStorage[Wear.wear[twpro_wear].obj.item_id].twpro_jobbonus;
      }
    }
    for(var twpro_bag in Bag.getInstance().items)
    {
      TWPro.twpro_prepareItem(Bag.getInstance().items[twpro_bag].obj);
      if(Bag.getInstance().items[twpro_bag].obj.twpro_bonus)
      {
        Bag.getInstance().items[twpro_bag].obj.twpro_jobbonus = TWPro.twpro_itemStorage[Bag.getInstance().items[twpro_bag].obj.item_id].twpro_jobbonus;
      }
    }
    TWPro.twpro_insertListItems();
    document.getElementById('twpro_wait').text = 'Сброс';
  }
  document.getElementById('twpro_jobDisplay').style.visibility = 'visible';
}

function twpro_getBagPopup()
{
  if(TWPro.twpro_failure) return '';
  var twpro_xhtml='';
  twpro_xhtml+='<div class="item_popup">';
  twpro_xhtml+='<span class="item_popup_title">Данные багажа</span>';
  twpro_xhtml+='<span class="item_popup_requirement_text">Продажа:</span>';
  twpro_xhtml+='<table>';
  twpro_xhtml+='<tr><td class="item_popup_trader_price">Надето:&nbsp;&nbsp;</td>';
  twpro_xhtml+='<td class="item_popup_trader_price">'+TWPro.twpro_bag.twpro_priceWear+' $</td></tr>';
  twpro_xhtml+='<tr><td class="item_popup_trader_price">Багаж:&nbsp;&nbsp;</td>';
  twpro_xhtml+='<td class="item_popup_trader_price">'+TWPro.twpro_bag.twpro_priceBag+' $</td></tr>';
  twpro_xhtml+='<tr><td class="item_popup_trader_price">Вещи:&nbsp;&nbsp;</td>';
  twpro_xhtml+='<td class="item_popup_trader_price">'+TWPro.twpro_bag.twpro_priceItems+' $</td></tr>';
  twpro_xhtml+='<tr><td class="item_popup_trader_price">Продукты:&nbsp;&nbsp;</td>';
  twpro_xhtml+='<td class="item_popup_trader_price">'+TWPro.twpro_bag.twpro_priceYields+' $</td></tr>';
  twpro_xhtml+='<tr><td class="item_popup_trader_price">Всего:&nbsp;&nbsp;</td>';
  twpro_xhtml+='<td class="item_popup_trader_price">'+(TWPro.twpro_bag.twpro_priceWear+TWPro.twpro_bag.twpro_priceBag)+' $</td></tr>';
  twpro_xhtml+='</table>';
  twpro_xhtml+='<span class="item_popup_requirement_text">Предметы:</span>';
  twpro_xhtml+='<table>';
  twpro_xhtml+='<tr><td class="item_popup_trader_price">Головные уборы:&nbsp;&nbsp;</td>';
  twpro_xhtml+='<td class="item_popup_trader_price">'+TWPro.twpro_bag.twpro_countType['head']+'</td></tr>';
  twpro_xhtml+='<tr><td class="item_popup_trader_price">Шейные повязки:&nbsp;&nbsp;</td>';
  twpro_xhtml+='<td class="item_popup_trader_price">'+TWPro.twpro_bag.twpro_countType['neck']+'</td></tr>';
  twpro_xhtml+='<tr><td class="item_popup_trader_price">Дуэльное оружие:&nbsp;&nbsp;</td>';
  twpro_xhtml+='<td class="item_popup_trader_price">'+TWPro.twpro_bag.twpro_countType['right_arm']+'</td></tr>';
  twpro_xhtml+='<tr><td class="item_popup_trader_price">Одежда:&nbsp;&nbsp;</td>';
  twpro_xhtml+='<td class="item_popup_trader_price">'+TWPro.twpro_bag.twpro_countType['body']+'</td></tr>';
  twpro_xhtml+='<tr><td class="item_popup_trader_price">Обувь:&nbsp;&nbsp;</td>';
  twpro_xhtml+='<td class="item_popup_trader_price">'+TWPro.twpro_bag.twpro_countType['foot']+'</td></tr>';
  twpro_xhtml+='<tr><td class="item_popup_trader_price">Верховые животные:&nbsp;&nbsp;</td>';
  twpro_xhtml+='<td class="item_popup_trader_price">'+TWPro.twpro_bag.twpro_countType['animal']+'</td></tr>';
  twpro_xhtml+='<tr><td class="item_popup_trader_price">Все вещи:&nbsp;&nbsp;</td>';
  var twpro_all=TWPro.twpro_bag.twpro_countType['head']+TWPro.twpro_bag.twpro_countType['neck']+TWPro.twpro_bag.twpro_countType['right_arm']+TWPro.twpro_bag.twpro_countType['body']+TWPro.twpro_bag.twpro_countType['foot']+TWPro.twpro_bag.twpro_countType['animal'];
  twpro_xhtml+='<td class="item_popup_trader_price">'+twpro_all+'</td></tr>';
  twpro_xhtml+='<tr><td class="item_popup_trader_price">Продукты:&nbsp;&nbsp;</td>';
  twpro_xhtml+='<td class="item_popup_trader_price">'+TWPro.twpro_bag.twpro_countType['yield']+'</td></tr>';
  twpro_xhtml+='<tr><td class="item_popup_trader_price">Общее количество:&nbsp;&nbsp;</td>';
  twpro_xhtml+='<td class="item_popup_trader_price">'+(twpro_all+TWPro.twpro_bag.twpro_countType['yield'])+'</td></tr>';
  twpro_xhtml+='</table>';
  twpro_xhtml+='</div>';
  return twpro_xhtml;
}

function twpro_clickList()
{
  if(TWPro.twpro_failure) return;
  if(document.getElementById('twpro_wait').text != 'Ждите...' && document.getElementById('twpro_wait').text != 'Сброс')
  {
    document.getElementById('twpro_wait').text = 'Ждите...';
    window.setTimeout("TWPro.twpro_updateList()", 0);
  }
}

function twpro_updateList()
{
  if(TWPro.twpro_failure) return;
  if(!TWPro.twpro_calculated)
  {
    var twpro_jobCount = 0;
    for(var twpro_job in JobList)
    {
      TWPro.twpro_jobs[parseInt(twpro_job)]=JobList[twpro_job];
      TWPro.twpro_jobs[parseInt(twpro_job)].twpro_calculation = TWPro.twpro_jobs[parseInt(twpro_job)].formular.replace(/skills\./g,'Character.skills.');
      twpro_jobCount++;
    }
    TWPro.twpro_jobs[TWPro.twpro_jobs.length]=new Object();
    TWPro.twpro_jobs[TWPro.twpro_jobs.length-1].twpro_calculation='3 * Character.skills.build + 1 * Character.skills.repair + 1 * Character.skills.leadership';
    TWPro.twpro_jobs[TWPro.twpro_jobs.length-1].malus=0;
    TWPro.twpro_jobs[TWPro.twpro_jobs.length-1].name='Cтроительство города';
    TWPro.twpro_jobs[TWPro.twpro_jobs.length-1].shortName='construct';
    twpro_jobCount++;
    TWPro.twpro_jobs.sort(TWPro.twpro_sortJobs);
    while(TWPro.twpro_jobs.length>twpro_jobCount)
    {
      TWPro.twpro_jobs.pop();
    }
  }
  TWPro.twpro_calculateJobs();
  TWPro.twpro_insertListItems();
  document.getElementById('twpro_wait').text = 'Сброс';
}

function twpro_insertListItems()
{
  if(TWPro.twpro_failure) return;
  var twpro_jobList = document.getElementById('twpro_jobList');
  var twpro_jobElement;
  var twpro_apstmp;
  for(var twpro_i=0;twpro_i<TWPro.twpro_jobs.length;twpro_i++)
  {
    twpro_apstmp = TWPro.twpro_jobs[twpro_i].twpro_aps;
    if((TWPro.twpro_jobs[twpro_i].shortName=='construct') && (Character.characterClass=='worker'))
    {
      twpro_apstmp = Math.floor(twpro_apstmp*1.05);
    }
    twpro_jobElement = document.createElement('option');
    twpro_jobElement.value = twpro_i;
  twpro_jobElement.appendChild(document.createTextNode(((TWPro.twpro_jobs[twpro_i].name.length>25)?(TWPro.twpro_jobs[twpro_i].name.substr(0,23)+'...'):(TWPro.twpro_jobs[twpro_i].name)) + ' (' + twpro_apstmp + ' TO)'));  
    
	if(twpro_apstmp > 0)
    {
      twpro_jobElement.style.backgroundColor='rgb(160, 218, 120)';
    }
    else
    {
      twpro_jobElement.style.backgroundColor='rgb(232, 150, 120)';
    }
    twpro_jobList.appendChild(twpro_jobElement);
  }
}

function twpro_sortJobs(twpro_a,twpro_b)
{
  if(TWPro.twpro_failure) return 0;
  var twpro_a_str = twpro_a.name.toLowerCase().replace(/\xE4/g,'a').replace(/\xF6/g,'o').replace(/\xFC/g,'u').replace(/\xDF/g,'ss');
  var twpro_b_str = twpro_b.name.toLowerCase().replace(/\xE4/g,'a').replace(/\xF6/g,'o').replace(/\xFC/g,'u').replace(/\xDF/g,'ss');
  if(TWPro.twpro_jobsort == 'name')
  {
    return (twpro_a_str==twpro_b_str)?(0):((twpro_a_str>twpro_b_str)?(1):(-1));
  }
  else
  {
    return (TWPro.twpro_jobValues[twpro_a.shortName][TWPro.twpro_jobsort] == TWPro.twpro_jobValues[twpro_b.shortName][TWPro.twpro_jobsort])?((twpro_a_str==twpro_b_str)?(0):((twpro_a_str>twpro_b_str)?(1):(-1))):(TWPro.twpro_jobValues[twpro_b.shortName][TWPro.twpro_jobsort] - TWPro.twpro_jobValues[twpro_a.shortName][TWPro.twpro_jobsort]);
  }
}

function twpro_sortPlus(twpro_a,twpro_b)
{
  if(TWPro.twpro_failure) return 0;
  var twpro_a_num = parseInt(twpro_a.substring(0,twpro_a.search(/ /)));
  var twpro_b_num = parseInt(twpro_b.substring(0,twpro_b.search(/ /)));
  return twpro_b_num - twpro_a_num;
}

function twpro_initializeItems(twpro_place,twpro_itemlist)
{
  if(TWPro.twpro_failure) return;
  var twpro_i = 0;
  if(twpro_place=='wear')
  {
    for(var twpro_wear in Wear.wear)
    {
      Wear.wear[twpro_wear].obj.twpro_place = twpro_place;
      Wear.wear[twpro_wear].obj.twpro_html = document.getElementById('char_'+Wear.wear[twpro_wear].obj.type);
      TWPro.twpro_bag.twpro_priceWear+=Wear.wear[twpro_wear].obj.sell_price;
      TWPro.twpro_bag.twpro_countType[Wear.wear[twpro_wear].obj.type]++;
      if(Wear.wear[twpro_wear].obj.type=='yield')
      {
        TWPro.twpro_bag.twpro_priceYields+=Wear.wear[twpro_wear].obj.sell_price;
      }
      else
      {
        TWPro.twpro_bag.twpro_priceItems+=Wear.wear[twpro_wear].obj.sell_price;
      }
      if((Wear.wear[twpro_wear].obj.set!=null) && (TWPro.twpro_setItems[Wear.wear[twpro_wear].obj.item_id]==undefined))
      {
        TWPro.twpro_setItems[Wear.wear[twpro_wear].obj.item_id] = Wear.wear[twpro_wear].obj;
        TWPro.twpro_setItemsCount[Wear.wear[twpro_wear].obj.set.key]++;
      }
      if(TWPro.twpro_invHashTest[Wear.wear[twpro_wear].obj.item_id]==undefined)
      {
        TWPro.twpro_invHashTest[Wear.wear[twpro_wear].obj.item_id]=1;
      }
    }
  }
  if(twpro_place=='bag')
  {
    var twpro_itemcount;
    for(var twpro_bag in Bag.getInstance().items)
    {
      Bag.getInstance().items[twpro_bag].obj.twpro_place = twpro_place;
      Bag.getInstance().items[twpro_bag].obj.twpro_html = Bag.getInstance().items[twpro_bag].bag_item;
      if(Bag.getInstance().items[twpro_bag].count_text)
      {
        twpro_itemcount = parseInt(Bag.getInstance().items[twpro_bag].count_text.firstChild.data);
      }
      else
      {
        twpro_itemcount = 1;
      }
      TWPro.twpro_bag.twpro_priceBag+=twpro_itemcount*Bag.getInstance().items[twpro_bag].obj.sell_price;
      TWPro.twpro_bag.twpro_countType[Bag.getInstance().items[twpro_bag].obj.type]+=twpro_itemcount;
      if(Bag.getInstance().items[twpro_bag].obj.type=='yield')
      {
        TWPro.twpro_bag.twpro_priceYields+=twpro_itemcount*Bag.getInstance().items[twpro_bag].obj.sell_price;
      }
      else
      {
        TWPro.twpro_bag.twpro_priceItems+=twpro_itemcount*Bag.getInstance().items[twpro_bag].obj.sell_price;
      }
      if((Bag.getInstance().items[twpro_bag].obj.set!=null) && (TWPro.twpro_setItems[Bag.getInstance().items[twpro_bag].obj.item_id]==undefined))
      {
        TWPro.twpro_setItems[Bag.getInstance().items[twpro_bag].obj.item_id] = Bag.getInstance().items[twpro_bag].obj;
        TWPro.twpro_setItemsCount[Bag.getInstance().items[twpro_bag].obj.set.key]++;
      }
      if(TWPro.twpro_invHashTest[Bag.getInstance().items[twpro_bag].obj.item_id]==undefined)
      {
        TWPro.twpro_invHashTest[Bag.getInstance().items[twpro_bag].obj.item_id]=1;
      }
    }
  }
  if(twpro_place=='trader')
  {
    for(var twpro_obj in twpro_itemlist.items)
    {
      twpro_itemlist.items[twpro_obj].obj.twpro_place = twpro_place;
      twpro_itemlist.items[twpro_obj].obj.twpro_html = twpro_itemlist.items[twpro_obj].bag_item;
      twpro_itemlist.items[twpro_obj].popup.refresh();
      twpro_i++;
    }
  }
  if(twpro_place=='own')
  {
    for(var twpro_obj in twpro_itemlist.data)
    {
      twpro_itemlist.data[twpro_obj].twpro_place = twpro_place;
      twpro_i++;
    }
    for(var twpro_bag in twpro_itemlist.bags)
    {
      for(var twpro_obj in twpro_itemlist.bags[twpro_bag].items)
      {
        twpro_itemlist.bags[twpro_bag].items[twpro_obj].obj.twpro_html = twpro_itemlist.bags[twpro_bag].items[twpro_obj].bag_item;
      }
    }
  }
}

function twpro_calculateJobs()
{
  if(TWPro.twpro_failure) return;
  var twpro_setitembonus;
  var twpro_setitemjobname;
  for(var twpro_wear in Wear.wear)
  {
    TWPro.twpro_prepareItem(Wear.wear[twpro_wear].obj);
  }
  for(var twpro_bag in Bag.getInstance().items)
  {
    TWPro.twpro_prepareItem(Bag.getInstance().items[twpro_bag].obj);
  }
  TWPro.twpro_calculated = false;
  TWPro.twpro_setItemsCalc = new Object();
  TWPro.twpro_setItemsEffect = false;
  for(var twpro_i=0;twpro_i<TWPro.twpro_bag.twpro_types.length;twpro_i++)
  {
    TWPro.twpro_setItemsCalc[TWPro.twpro_bag.twpro_types[twpro_i]] = new Array(null);
  }
  TWPro.twpro_setCount = new Object();
  for(var twpro_setItemId in TWPro.twpro_setItems)
  {
    var twpro_setItem = TWPro.twpro_setItems[twpro_setItemId];
    if(twpro_setItem.twpro_wearable && (TWPro.twpro_setItemsCount[twpro_setItem.set.key]>=2))
    {
      TWPro.twpro_setItemsCalc[twpro_setItem.type].push(twpro_setItem);
      TWPro.twpro_setCount[twpro_setItem.set.key] = 0;
      TWPro.twpro_setItemsEffect = true;
    }
  }
  for(var twpro_i=0;twpro_i<TWPro.twpro_jobs.length;twpro_i++)
  {
    var twpro_job = TWPro.twpro_jobs[twpro_i];
    twpro_job.twpro_jobid = twpro_i;
    twpro_job.twpro_skill = eval(twpro_job.twpro_calculation);
    twpro_job.twpro_skills = twpro_job.twpro_calculation.replace(/ \+ \d+$/,'');
    twpro_job.twpro_attributes = twpro_job.twpro_skills;
    for(var twpro_attname in Character.skill_names)
    {
      for(var twpro_j=0;twpro_j<Character.skill_names[twpro_attname].length;twpro_j++)
      {
        twpro_job.twpro_attributes = twpro_job.twpro_attributes.replace(new RegExp('\\.'+Character.skill_names[twpro_attname][twpro_j],'g'),'.'+twpro_attname);
      }
    }
    if(TWPro.twpro_setItemsEffect && (!TWPro.twpro_setBonusParsed))
    {
      for(var twpro_itemSet in TWPro.twpro_setBonus)
      {
        var twpro_itemSetBouns = TWPro.twpro_setBonus[twpro_itemSet];
        for(var twpro_j=2;twpro_j<twpro_itemSetBouns.length;twpro_j++)
        {
          twpro_setitembonus = twpro_itemSetBouns[twpro_j];
          twpro_setitemjobname = twpro_job.shortName;
          twpro_setitembonus.parsedBonus[twpro_setitemjobname] = twpro_setitembonus.jobBonus.all + ((twpro_setitembonus.jobBonus[twpro_setitemjobname]==undefined)?(0):(twpro_setitembonus.jobBonus[twpro_setitemjobname])) + TWPro.twpro_testItem(twpro_job,twpro_setitembonus);
        }
      }
    }
    twpro_job.twpro_bestStats = new Object();
    for(var twpro_j=0;twpro_j<TWPro.twpro_bag.twpro_types.length;twpro_j++)
    {
      twpro_job.twpro_bestStats[TWPro.twpro_bag.twpro_types[twpro_j]] = 0;
    }
    for(var twpro_wear in Wear.wear)
    {
      TWPro.twpro_compareItem(twpro_job,Wear.wear[twpro_wear].obj);
    }
    for(var twpro_bag in Bag.getInstance().items)
    {
      TWPro.twpro_compareItem(twpro_job,Bag.getInstance().items[twpro_bag].obj);
    }
    twpro_job.twpro_aps = twpro_job.twpro_skill - twpro_job.malus;
    for(var twpro_type in twpro_job.twpro_bestStats)
    {
      twpro_job.twpro_aps += twpro_job.twpro_bestStats[twpro_type];
    }
    if(TWPro.twpro_setItemsEffect)
    {
      var twpro_setItem;
      twpro_job.twpro_parsedItemBonus = new Object();
      twpro_job.twpro_bestCombi = new Object();
      for(var twpro_type in twpro_job.twpro_bestStats)
      {
        twpro_job.twpro_bestCombi[twpro_type] = 0;
        for(var twpro_j=1;twpro_j<TWPro.twpro_setItemsCalc[twpro_type].length;twpro_j++)
        {
          twpro_setItem = TWPro.twpro_setItemsCalc[twpro_type][twpro_j];
          twpro_job.twpro_parsedItemBonus[twpro_setItem.item_id] = TWPro.twpro_testItem(twpro_job,twpro_setItem);
        }
      }
      twpro_job.twpro_noSetAps = twpro_job.twpro_aps;
    }
  }
  if(TWPro.twpro_setItemsEffect)
  {
    TWPro.twpro_calcSets();
  }
  TWPro.twpro_setBonusParsed = true;
  TWPro.twpro_invHash = TWPro.twpro_invHashTest.join(',');
  TWPro.twpro_calculated = true;
}

function twpro_calcSets()
{
  var twpro_testCombi = new Object();
  for(var twpro_i=0;twpro_i<TWPro.twpro_bag.twpro_types.length;twpro_i++)
  {
    twpro_testCombi[TWPro.twpro_bag.twpro_types[twpro_i]] = 0;
  }
  var twpro_setCounter = TWPro.twpro_setCount;
  TWPro.twpro_testnextvalid = new Array();
  var twpro_testnextvalid = TWPro.twpro_testnextvalid;
  TWPro.twpro_testnextnamen = new Object();
  var twpro_testnextnamen = TWPro.twpro_testnextnamen;
  for(var twpro_set in twpro_setCounter)
  {
    twpro_testnextnamen[twpro_set] = twpro_testnextvalid.push(0)-1;
  }
  var twpro_next = false;
  var twpro_set;
  do
  {
    for(var twpro_i=0;twpro_i<TWPro.twpro_jobs.length;twpro_i++)
    {
      var twpro_job = TWPro.twpro_jobs[twpro_i];
      var twpro_testAps = twpro_job.twpro_noSetAps;
      for(var twpro_type in twpro_testCombi)
      {
        if(twpro_testCombi[twpro_type]!=0)
        {
          twpro_testAps -= twpro_job.twpro_bestStats[twpro_type];
          var twpro_setItem = TWPro.twpro_setItemsCalc[twpro_type][twpro_testCombi[twpro_type]];
          twpro_testAps += twpro_job.twpro_parsedItemBonus[twpro_setItem.item_id];
        }
      }
      for(var twpro_set in twpro_setCounter)
      {
        if(twpro_setCounter[twpro_set]>0)
        {
          twpro_testAps += TWPro.twpro_setBonus[twpro_set][twpro_setCounter[twpro_set]].parsedBonus[twpro_job.shortName];
        }
      }
      if(twpro_testAps > twpro_job.twpro_aps)
      {
        twpro_job.twpro_aps = twpro_testAps;
        for(var twpro_type in twpro_testCombi)
        {
          twpro_job.twpro_bestCombi[twpro_type] = twpro_testCombi[twpro_type];
        }
      }
    }
    do
    {
      TWPro.anzahl3++;
      twpro_next = false;
      for(var twpro_type in twpro_testCombi)
      {
        var twpro_setItemsCalcType = TWPro.twpro_setItemsCalc[twpro_type];
        var twpro_testCombiType = twpro_testCombi[twpro_type];
        if(twpro_testCombiType!=0)
        {
          twpro_set = twpro_setItemsCalcType[twpro_testCombiType].set.key;
          if((--twpro_setCounter[twpro_set])==1)
          {
            twpro_testnextvalid[twpro_testnextnamen[twpro_set]] = 1;
          }
          else
          {
            twpro_testnextvalid[twpro_testnextnamen[twpro_set]] = 0;
          }
        }
        if((twpro_testCombiType+1) < twpro_setItemsCalcType.length)
        {
          twpro_set = twpro_setItemsCalcType[++twpro_testCombi[twpro_type]].set.key;
          if((++twpro_setCounter[twpro_set])==1)
          {
            twpro_testnextvalid[twpro_testnextnamen[twpro_set]] = 1;
          }
          else
          {
            twpro_testnextvalid[twpro_testnextnamen[twpro_set]] = 0;
          }
          twpro_next = true;
          break;
        }
        else
        {
          twpro_testCombi[twpro_type] = 0;
        }
      }
    }
    while((parseInt(twpro_testnextvalid.join(''),10)>0) && twpro_next);
  }
  while(twpro_next);
}

function twpro_prepareItem(twpro_item)
{
  if(TWPro.twpro_failure) return;
  var twpro_storedItem;
  if(TWPro.twpro_itemStorage[twpro_item.item_id] == undefined)
  {
    TWPro.twpro_itemStorage[twpro_item.item_id] = new Object();
    twpro_storedItem = TWPro.twpro_itemStorage[twpro_item.item_id];
  }
  else
  {
    twpro_storedItem = TWPro.twpro_itemStorage[twpro_item.item_id];
    if(twpro_item.twpro_bonus = twpro_storedItem.twpro_bonus)
    {
      twpro_item.twpro_jobbonus = new Object();
    }
    twpro_item.twpro_wearable = twpro_storedItem.twpro_wearable;
    return;
  }
  var twpro_i = 0;
  if(twpro_item.bonus.skills.length==undefined)
  {
    for(var twpro_skillname in twpro_item.bonus.skills)
    {
      twpro_i++;
    }
  }
  if(twpro_item.bonus.attributes.length==undefined)
  {
    for(var twpro_attname in twpro_item.bonus.attributes)
    {
      twpro_i++;
    }
  }
  if(twpro_i>0)
  {
    twpro_item.twpro_bonus = true;
    twpro_item.twpro_jobbonus = new Object();
    twpro_storedItem.twpro_jobbonus = new Object();
  }
  else
  {
    twpro_item.twpro_bonus = false;
  }
  twpro_item.twpro_wearable = TWPro.twpro_wearItem(twpro_item);
  twpro_storedItem.twpro_bonus = twpro_item.twpro_bonus;
  twpro_storedItem.twpro_wearable = twpro_item.twpro_wearable;
}

function twpro_wearItem(twpro_item)
{
  if(TWPro.twpro_failure) return false;
  if((twpro_item.characterClass!=null) && (twpro_item.characterClass!=Character.characterClass))
  {
    return false;
  }
  if((twpro_item.level!=null) && ((twpro_item.level-Character.itemLevelRequirementDecrease[twpro_item.type]-Character.itemLevelRequirementDecrease['all'])>Character.level))
  {
    return false;
  }
  if((twpro_item.characterSex!=null) && ((twpro_item.characterSex!=Character.characterSex) || (Character.characterClass=='greenhorn')))
  {
    return false;
  }
  return true;
}

function twpro_compareItem(twpro_job,twpro_item)
{
  if(TWPro.twpro_failure) return;
  var twpro_aktplus = TWPro.twpro_testItem(twpro_job,twpro_item);
  if(twpro_item.twpro_bonus)
  {
    twpro_item.twpro_jobbonus[twpro_job.shortName] = twpro_aktplus;
    TWPro.twpro_itemStorage[twpro_item.item_id].twpro_jobbonus[twpro_job.shortName] = twpro_aktplus;
  }
  if((twpro_aktplus>=twpro_job.twpro_bestStats[twpro_item.type]) && twpro_item.twpro_wearable)
  {
    twpro_job.twpro_bestStats[twpro_item.type] = twpro_aktplus;
  }
}

function twpro_testItem(twpro_job,twpro_item)
{
  if(TWPro.twpro_failure) return 0;
  if((!twpro_item.twpro_bonus) && (twpro_item.jobBonus==undefined))
  {
    return 0;
  }
  if(TWPro.twpro_itemStorage[twpro_item.item_id] != undefined)
  {
    if(TWPro.twpro_itemStorage[twpro_item.item_id].twpro_jobbonus[twpro_job.shortName] != undefined)
    {
      return TWPro.twpro_itemStorage[twpro_item.item_id].twpro_jobbonus[twpro_job.shortName];
    }
  }
  var twpro_aktskills = twpro_job.twpro_skills;
  var twpro_aktattributes = twpro_job.twpro_attributes;
  for(var twpro_skillname in twpro_item.bonus.skills)
  {
    twpro_aktskills = twpro_aktskills.replace(new RegExp('Character\\.skills\\.'+twpro_skillname,'g'),twpro_item.bonus.skills[twpro_skillname]);
  }
  twpro_aktskills = twpro_aktskills.replace(new RegExp('Character\\.skills\\.\\w+','g'),'0');
  for(var twpro_attname in twpro_item.bonus.attributes)
  {
    twpro_aktattributes = twpro_aktattributes.replace(new RegExp('Character\\.skills\\.'+twpro_attname,'g'),twpro_item.bonus.attributes[twpro_attname]);
  }
  twpro_aktattributes = twpro_aktattributes.replace(new RegExp('Character\\.skills\\.\\w+','g'),'0');
  return eval(twpro_aktskills)+eval(twpro_aktattributes);
}

function twpro_changeItem()
{
  if(TWPro.twpro_failure) return;
  TWPro.twpro_bag.twpro_priceWear = 0;
  TWPro.twpro_bag.twpro_priceBag = 0;
  TWPro.twpro_bag.twpro_priceItems = 0;
  TWPro.twpro_bag.twpro_priceYields = 0;
  TWPro.twpro_setItems = new Object();
  for(var twpro_set in TWPro.twpro_setBonus)
  {
    TWPro.twpro_setItemsCount[twpro_set] = 0;
  }
  for(var twpro_i=0;twpro_i<TWPro.twpro_bag.twpro_types.length;twpro_i++)
  {
    TWPro.twpro_bag.twpro_countType[TWPro.twpro_bag.twpro_types[twpro_i]] = 0;
  }
  
  TWPro.twpro_initializeItems('wear',null);
  TWPro.twpro_initializeItems('bag',null);
  TWPro.twpro_bag.twpro_bagPopup.twpro_refresh();
  TWPro.twpro_changeJob();
}

function twpro_changeJob()
{
  if(TWPro.twpro_failure) return;
  if(TWPro.twpro_calculated)
  {
    var twpro_jobList = document.getElementById('twpro_jobList');
    var twpro_selected = twpro_jobList.selectedIndex;
    twpro_jobList.style.backgroundColor = twpro_jobList[twpro_selected].style.backgroundColor;
    var twpro_selectedJob = parseInt(twpro_jobList[twpro_selected].value);
    for(var twpro_i=0;twpro_i<TWPro.twpro_bag.twpro_types.length;twpro_i++)
    {
      if(document.getElementById('char_'+TWPro.twpro_bag.twpro_types[twpro_i]))
      {
        document.getElementById('char_'+TWPro.twpro_bag.twpro_types[twpro_i]).className = 'wear_'+TWPro.twpro_bag.twpro_types[twpro_i];
      }
    }
    for(var twpro_wear in Wear.wear)
    {
      Wear.wear[twpro_wear].popup.refresh();
    }
    for(var twpro_bag in Bag.getInstance().items)
    {
      Bag.getInstance().items[twpro_bag].popup.refresh();
      Bag.getInstance().items[twpro_bag].obj.twpro_html.firstChild.className = '';
    }
    if(twpro_selectedJob>=0)
    {
      var twpro_job = TWPro.twpro_jobs[twpro_selectedJob];
      TWPro.twpro_highlight(twpro_job);
      var twpro_aktuelleap = twpro_job.twpro_skill - twpro_job.malus;
      var twpro_setCounter = new Object();
      for(var twpro_wear in Wear.wear)
      {
        if(Wear.wear[twpro_wear].obj.twpro_bonus)
        {
          twpro_aktuelleap += Wear.wear[twpro_wear].obj.twpro_jobbonus[twpro_job.shortName];
        }
        if(Wear.wear[twpro_wear].obj.set != null)
        {
          if(twpro_setCounter[Wear.wear[twpro_wear].obj.set.key]==undefined)
          {
            twpro_setCounter[Wear.wear[twpro_wear].obj.set.key] = 1;
          }
          else
          {
            twpro_setCounter[Wear.wear[twpro_wear].obj.set.key]++;
          }
        }
      }
      for(var twpro_set in twpro_setCounter)
      {
        if(twpro_setCounter[twpro_set]>=2)
        {
          twpro_aktuelleap += TWPro.twpro_setBonus[twpro_set][twpro_setCounter[twpro_set]].parsedBonus[twpro_job.shortName];
        }
      }
      if((twpro_job.shortName=='construct') && (Character.characterClass=='worker'))
      {
        twpro_aktuelleap = Math.floor(twpro_aktuelleap*1.05);
      }
      document.getElementById('twpro_aktuelleapvalue').innerHTML = twpro_aktuelleap+' TO';
      if(twpro_aktuelleap > 0)
      {
        if(twpro_aktuelleap >= twpro_job.twpro_aps)
        {
          document.getElementById('twpro_aktuelleapvalue').style.backgroundColor = 'rgb(160, 218, 120)';
        }
        else
        {
          document.getElementById('twpro_aktuelleapvalue').style.backgroundColor = 'rgb(230, 235, 108)';
        }
      }
      else
      {
        document.getElementById('twpro_aktuelleapvalue').style.backgroundColor = 'rgb(232, 150, 120)';
      }
      document.getElementById('twpro_aktuelleap').style.visibility = 'visible';
    }
    else
    {
      document.getElementById('twpro_aktuelleap').style.visibility = 'hidden';
    }
  }
}

function twpro_highlight(twpro_job)
{
  if(TWPro.twpro_failure) return;
  for(var twpro_wear in Wear.wear)
  {
    var twpro_item = Wear.wear[twpro_wear].obj;
    if(TWPro.twpro_setItemsEffect && (twpro_job.twpro_bestCombi[twpro_item.type] > 0))
    {
      if(TWPro.twpro_setItemsCalc[twpro_item.type][twpro_job.twpro_bestCombi[twpro_item.type]].item_id == twpro_item.item_id)
      {
        twpro_item.twpro_html.className=twpro_item.twpro_html.className+' wear_'+twpro_item.type+'_highlight';
      }
    }
    else
    {
      if((twpro_item.twpro_wearable) && ((twpro_item.type=='animal') || ((twpro_item.twpro_bonus==false) && (twpro_job.twpro_bestStats[twpro_item.type]==0)) || ((twpro_item.twpro_bonus==true) && (twpro_item.twpro_jobbonus[twpro_job.shortName]>=twpro_job.twpro_bestStats[twpro_item.type]))))
      {
        twpro_item.twpro_html.className=twpro_item.twpro_html.className+' wear_'+twpro_item.type+'_highlight';
      }
    }
  }
  for(var twpro_bag in Bag.getInstance().items)
  {
    var twpro_item = Bag.getInstance().items[twpro_bag].obj;
    if(TWPro.twpro_setItemsEffect && (twpro_job.twpro_bestCombi[twpro_item.type] > 0))
    {
      if(TWPro.twpro_setItemsCalc[twpro_item.type][twpro_job.twpro_bestCombi[twpro_item.type]].item_id == twpro_item.item_id)
      {
        twpro_item.twpro_html.firstChild.className='wear_yield_highlight';
      }
    }
    else
    {
      if((twpro_item.twpro_wearable) && ((twpro_item.type!='animal') && ((((twpro_item.type=='yield') || (twpro_item.type=='right_arm')) && (twpro_item.twpro_bonus==true) && (twpro_job.twpro_bestStats[twpro_item.type]>0) && (twpro_item.twpro_jobbonus[twpro_job.shortName]>=twpro_job.twpro_bestStats[twpro_item.type])) || ((twpro_item.type!='yield') && (twpro_item.type!='right_arm') && (((twpro_item.twpro_bonus==false) && (twpro_job.twpro_bestStats[twpro_item.type]==0)) || ((twpro_item.twpro_bonus==true) && (twpro_item.twpro_jobbonus[twpro_job.shortName]>=twpro_job.twpro_bestStats[twpro_item.type])))))))
      {
        twpro_item.twpro_html.firstChild.className='wear_yield_highlight';
      }
    }
  }
}

var twpro_scriptelement = document.createElement('script');
twpro_scriptelement.type='text/javascript';
twpro_scriptelement.text = 'if(window.TWPro==undefined)\n';
twpro_scriptelement.text += '{\n';
twpro_scriptelement.text += '  window.TWPro = new Object();\n';
twpro_scriptelement.text += '  TWPro.twpro_injectScript = '+twpro_injectScript.toString()+'\n';
twpro_scriptelement.text += '  TWPro.twpro_throwFailure = '+twpro_throwFailure.toString()+'\n';
twpro_scriptelement.text += '  TWPro.twpro_injectionSwitch = '+twpro_injectionSwitch.toString()+'\n';
twpro_scriptelement.text += '  TWPro.twpro_getAuthor = '+twpro_getAuthor.toString()+'\n';
twpro_scriptelement.text += '  TWPro.twpro_activeJob = '+twpro_activeJob.toString()+'\n';
twpro_scriptelement.text += '  TWPro.twpro_getPlace = '+twpro_getPlace.toString()+'\n';
twpro_scriptelement.text += '  TWPro.twpro_initializeItems = '+twpro_initializeItems.toString()+'\n';
twpro_scriptelement.text += '  TWPro.twpro_popup = '+twpro_popup.toString()+'\n';
twpro_scriptelement.text += '  TWPro.twpro_insertList = '+twpro_insertList.toString()+'\n';
twpro_scriptelement.text += '  TWPro.twpro_showList = '+twpro_showList.toString()+'\n';
twpro_scriptelement.text += '  TWPro.twpro_getBagPopup = '+twpro_getBagPopup.toString()+'\n';
twpro_scriptelement.text += '  TWPro.twpro_clickList = '+twpro_clickList.toString()+'\n';
twpro_scriptelement.text += '  TWPro.twpro_updateList = '+twpro_updateList.toString()+'\n';
twpro_scriptelement.text += '  TWPro.twpro_sortJobs = '+twpro_sortJobs.toString()+'\n';
twpro_scriptelement.text += '  TWPro.twpro_sortList = '+twpro_sortList.toString()+'\n';
twpro_scriptelement.text += '  TWPro.twpro_insertListItems = '+twpro_insertListItems.toString()+'\n';
twpro_scriptelement.text += '  TWPro.twpro_jobSortMark = '+twpro_jobSortMark.toString()+'\n';
twpro_scriptelement.text += '  TWPro.twpro_sortPlus = '+twpro_sortPlus.toString()+'\n';
twpro_scriptelement.text += '  TWPro.twpro_calculateJobs = '+twpro_calculateJobs.toString()+'\n';
twpro_scriptelement.text += '  TWPro.twpro_calcSets = '+twpro_calcSets.toString()+'\n';
twpro_scriptelement.text += '  TWPro.twpro_prepareItem = '+twpro_prepareItem.toString()+'\n';
twpro_scriptelement.text += '  TWPro.twpro_compareItem = '+twpro_compareItem.toString()+'\n';
twpro_scriptelement.text += '  TWPro.twpro_wearItem = '+twpro_wearItem.toString()+'\n';
twpro_scriptelement.text += '  TWPro.twpro_testItem = '+twpro_testItem.toString()+'\n';
twpro_scriptelement.text += '  TWPro.twpro_changeItem = '+twpro_changeItem.toString()+'\n';
twpro_scriptelement.text += '  TWPro.twpro_changeJob = '+twpro_changeJob.toString()+'\n';
twpro_scriptelement.text += '  TWPro.twpro_highlight = '+twpro_highlight.toString()+'\n';
twpro_scriptelement.text += '  TWPro.twpro_injectScript();\n';
twpro_scriptelement.text += '}';
document.body.appendChild(twpro_scriptelement);

/*
//====================================== The West Painted Portraits ====================================


var Greenhorn={
changeAvatar:function(div){
var img=div.getElementsByTagName('img');
var r1=new RegExp("images\/avatars\/greenhorn_woman\.jpg", "i");
var r2=new RegExp("images\/avatars\/greenhorn_woman_small\.png", "i");
for(var i in img){
if(r1.test(img[i].src))
img[i].src="http://dump.ninjapirat.org/files/greenhorn_woman.jpg";
if(r2.test(img[i].src)){
img[i].src="http://dump.ninjapirat.org/files/greenhorn_woman_small.jpg";
}
}
var img=div.getElementsByTagName('img');
var r1=new RegExp("images\/avatars\/greenhorn\.jpg", "i");
var r2=new RegExp("images\/avatars\/greenhorn_small\.png", "i");
for(var i in img){
if(r1.test(img[i].src))
img[i].src="http://dump.ninjapirat.org/files/greenhorn.jpg";
if(r2.test(img[i].src)){
img[i].src="http://dump.ninjapirat.org/files/greenhorn_small.jpg";
}
}
var img=div.getElementsByTagName('img');
var r1=new RegExp("images\/avatars\/mercenary\.jpg", "i");
var r2=new RegExp("images\/avatars\/mercenary_small\.png", "i");
for(var i in img){
if(r1.test(img[i].src))
img[i].src="http://i626.photobucket.com/albums/tt345/bushidoka/mercenary.jpg";
if(r2.test(img[i].src)){
img[i].src="http://i626.photobucket.com/albums/tt345/bushidoka/mercenary_small.jpg";
}
}
var img=div.getElementsByTagName('img');
var r1=new RegExp("images\/avatars\/mercenary_woman\.jpg", "i");
var r2=new RegExp("images\/avatars\/mercenary_woman_small\.png", "i");
for(var i in img){
if(r1.test(img[i].src))
img[i].src="http://i626.photobucket.com/albums/tt345/bushidoka/mercenary_woman.jpg";
if(r2.test(img[i].src)){
img[i].src="http://i626.photobucket.com/albums/tt345/bushidoka/mercenary_woman_small.jpg";
}
}
var r1=new RegExp("images\/avatars\/vagabond\.jpg", "i");
var r2=new RegExp("images\/avatars\/vagabond_small\.png", "i");
for(var i in img){
if(r1.test(img[i].src))
img[i].src="http://dump.ninjapirat.org/files/wanderer.jpg";
if(r2.test(img[i].src)){
img[i].src="http://dump.ninjapirat.org/files/wanderer_small.jpg";
}
}
var r1=new RegExp("images\/avatars\/vagabond_woman\.jpg", "i");
var r2=new RegExp("images\/avatars\/vagabond_woman_small\.png", "i");
for(var i in img){
if(r1.test(img[i].src))
img[i].src="http://dump.ninjapirat.org/files/vagabond_woman.jpg";
if(r2.test(img[i].src)){
img[i].src="http://dump.ninjapirat.org/files/vagabond_woman_small.jpg";
}
}
var r1=new RegExp("images\/avatars\/indian\.jpg", "i");
var r2=new RegExp("images\/avatars\/indian_small\.png", "i");
for(var i in img){
if(r1.test(img[i].src))
img[i].src="http://dump.ninjapirat.org/files/indian.jpg";
if(r2.test(img[i].src)){
img[i].src="http://dump.ninjapirat.org/files/indian_small.jpg";
}
}
var r1=new RegExp("images\/avatars\/indian_woman\.jpg", "i");
var r2=new RegExp("images\/avatars\/indian_woman_small\.png", "i");
for(var i in img){
if(r1.test(img[i].src))
img[i].src="http://dump.ninjapirat.org/files/indian_woman.jpg";
if(r2.test(img[i].src)){
img[i].src="http://dump.ninjapirat.org/files/indian_woman_small.jpg";
}
}
var r1=new RegExp("images\/avatars\/goldseeker\.jpg", "i");
var r2=new RegExp("images\/avatars\/goldseeker_small\.png", "i");
for(var i in img){
if(r1.test(img[i].src))
img[i].src="http://i042.radikal.ru/0911/0a/c1c59805679c.jpg";
if(r2.test(img[i].src)){
img[i].src="http://i035.radikal.ru/0911/88/621fed1e6846.png";
}
}
var r1=new RegExp("images\/avatars\/bountyhunter\.jpg", "i");
var r2=new RegExp("images\/avatars\/bountyhunter_small\.png", "i");
for(var i in img){
if(r1.test(img[i].src))
img[i].src="http://dump.ninjapirat.org/files/bountyhunter.jpg";
if(r2.test(img[i].src)){
img[i].src="http://dump.ninjapirat.org/files/bountyhunter_small.jpg";
}
}
var r1=new RegExp("images\/avatars\/gunslinger\.jpg", "i");
var r2=new RegExp("images\/avatars\/gunslinger_small\.png", "i");
for(var i in img){
if(r1.test(img[i].src))
img[i].src="http://dump.ninjapirat.org/files/gunslinger.jpg";
if(r2.test(img[i].src)){
img[i].src="http://dump.ninjapirat.org/files/gunslinger_small.jpg";
}
}
var r1=new RegExp("images\/avatars\/gunslinger_woman\.jpg", "i");
var r2=new RegExp("images\/avatars\/gunslinger_woman_small\.png", "i");
for(var i in img){
if(r1.test(img[i].src))
img[i].src="http://dump.ninjapirat.org/files/gunslinger_woman.jpg";
if(r2.test(img[i].src)){
img[i].src="http://dump.ninjapirat.org/files/gunslinger_woman_small.jpg";
}
}
var img=div.getElementsByTagName('img');
var r1=new RegExp("images\/avatars\/hangdog\.jpg", "i");
var r2=new RegExp("images\/avatars\/hangdog_small\.png", "i");
for(var i in img){
if(r1.test(img[i].src))
img[i].src="http://dump.ninjapirat.org/files/hangdog.jpg";
if(r2.test(img[i].src)){
img[i].src="http://dump.ninjapirat.org/files/hangdog_small.jpg";
}
}
var img=div.getElementsByTagName('img');
var r1=new RegExp("images\/avatars\/cowboy\.jpg", "i");
var r2=new RegExp("images\/avatars\/cowboy_small\.png", "i");
for(var i in img){
if(r1.test(img[i].src))
img[i].src="http://dump.ninjapirat.org/files/cowboy.jpg";
if(r2.test(img[i].src)){
img[i].src="http://dump.ninjapirat.org/files/cowboy_small.jpg";
}
}
var r1=new RegExp("images\/avatars\/worker\.jpg", "i");
var r2=new RegExp("images\/avatars\/worker_small\.png", "i");
for(var i in img){
if(r1.test(img[i].src))
img[i].src="http://dump.ninjapirat.org/files/worker.jpg";
if(r2.test(img[i].src)){
img[i].src="http://dump.ninjapirat.org/files/worker_small.jpg";
}
}
var r1=new RegExp("images\/avatars\/Cavalry_woman\.jpg", "i");
var r2=new RegExp("images\/avatars\/Cavalry_woman_small\.png", "i");
for(var i in img){
if(r1.test(img[i].src))
img[i].src="http://dump.ninjapirat.org/files/cavalry_woman.jpg";
if(r2.test(img[i].src)){
img[i].src="http://dump.ninjapirat.org/files/cavalry_woman_small.jpg";
}
}
var r1=new RegExp("images\/avatars\/Iroquois\.jpg", "i");
var r2=new RegExp("images\/avatars\/Iroquois_small\.png", "i");
for(var i in img){
if(r1.test(img[i].src))
img[i].src="http://dump.ninjapirat.org/files/Iroquois.jpg";
if(r2.test(img[i].src)){
img[i].src="http://dump.ninjapirat.org/files/Iroquois_small.jpg";
}
}
},
changeWestFunction:function(){
  var loc = document.location;
	var o_show = unsafeWindow.AjaxWindow.setJSHTML;
	var f = function(div, content) {
		if (!div) return;
		var ret = o_show(div, content);
		Greenhorn.changeAvatar(div);
		return(ret);
	};
	for(var o in o_show) {
		f[o] = o_show[o];
	}
  unsafeWindow.AjaxWindow.setJSHTML = f;
  },
  changePlayerAvatar:function(){
   
var r=new RegExp("images\/avatars\/greenhorn_woman_small\.png", "i");
   av=document.getElementById('avatar').getElementsByTagName('img')[0];
   if(r.test(av.src)){
   av.src="http://dump.ninjapirat.org/files/greenhorn_woman_small.jpg";
   }
var r=new RegExp("images\/avatars\/greenhorn_small\.png", "i");
   av=document.getElementById('avatar').getElementsByTagName('img')[0];
   if(r.test(av.src)){
   av.src="http://dump.ninjapirat.org/files/greenhorn_small.jpg";
   }
var r=new RegExp("images\/avatars\/mercenary_small\.png", "i");
   av=document.getElementById('avatar').getElementsByTagName('img')[0];
   if(r.test(av.src)){
   av.src="http://i626.photobucket.com/albums/tt345/bushidoka/mercenary_small.jpg";
   }
var r=new RegExp("images\/avatars\/mercenary_woman_small\.png", "i");
   av=document.getElementById('avatar').getElementsByTagName('img')[0];
   if(r.test(av.src)){
   av.src="http://i626.photobucket.com/albums/tt345/bushidoka/mercenary_woman_small.jpg";
   }
var r=new RegExp("images\/avatars\/vagabond_small\.png", "i");
   av=document.getElementById('avatar').getElementsByTagName('img')[0];
   if(r.test(av.src)){
   av.src="http://dump.ninjapirat.org/files/wanderer_small.jpg";
   }
var r=new RegExp("images\/avatars\/vagabond_woman_small\.png", "i");
   av=document.getElementById('avatar').getElementsByTagName('img')[0];
   if(r.test(av.src)){
   av.src="http://dump.ninjapirat.org/files/vagabond_woman_small.jpg";
   }
var r=new RegExp("images\/avatars\/indian_small\.png", "i");
   av=document.getElementById('avatar').getElementsByTagName('img')[0];
   if(r.test(av.src)){
   av.src="http://dump.ninjapirat.org/files/indian_small.jpg";
   }
var r=new RegExp("images\/avatars\/indian_woman_small\.png", "i");
   av=document.getElementById('avatar').getElementsByTagName('img')[0];
   if(r.test(av.src)){
   av.src="http://dump.ninjapirat.org/files/indian_woman_small.jpg";
   }
var r=new RegExp("images\/avatars\/goldseeker_small\.png", "i");
   av=document.getElementById('avatar').getElementsByTagName('img')[0];
   if(r.test(av.src)){
   av.src="http://i035.radikal.ru/0911/88/621fed1e6846.png";
   }
var r=new RegExp("images\/avatars\/bountyhunter_small\.png", "i");
   av=document.getElementById('avatar').getElementsByTagName('img')[0];
   if(r.test(av.src)){
   av.src="http://dump.ninjapirat.org/files/bountyhunter_small.jpg";
   }
var r=new RegExp("images\/avatars\/gunslinger_small\.png", "i");
   av=document.getElementById('avatar').getElementsByTagName('img')[0];
   if(r.test(av.src)){
   av.src="http://dump.ninjapirat.org/files/gunslinger_small.jpg";
   }
var r=new RegExp("images\/avatars\/gunslinger_woman_small\.png", "i");
   av=document.getElementById('avatar').getElementsByTagName('img')[0];
   if(r.test(av.src)){
   av.src="http://dump.ninjapirat.org/files/gunslinger_woman_small.jpg";
   }
var r=new RegExp("images\/avatars\/hangdog_small\.png", "i");
   av=document.getElementById('avatar').getElementsByTagName('img')[0];
   if(r.test(av.src)){
   av.src="http://dump.ninjapirat.org/files/hangdog_small.jpg";
   }     
var r=new RegExp("images\/avatars\/cowboy_small\.png", "i");
   av=document.getElementById('avatar').getElementsByTagName('img')[0];
   if(r.test(av.src)){
   av.src="http://dump.ninjapirat.org/files/cowboy_small.jpg";
   }
var r=new RegExp("images\/avatars\/worker_small\.png", "i");
   av=document.getElementById('avatar').getElementsByTagName('img')[0];
   if(r.test(av.src)){
   av.src="http://dump.ninjapirat.org/files/worker_small.jpg";
   }
var r=new RegExp("images\/avatars\/cavalry_woman_small\.png", "i");
   av=document.getElementById('avatar').getElementsByTagName('img')[0];
   if(r.test(av.src)){
   av.src="http://dump.ninjapirat.org/files/cavalry_woman_small.jpg";
   }  
var r=new RegExp("images\/avatars\/Iroquois_small\.png", "i");
   av=document.getElementById('avatar').getElementsByTagName('img')[0];
   if(r.test(av.src)){
   av.src="http://dump.ninjapirat.org/files/Iroquois_small.jpg";
   }  
}
};
Greenhorn.changeWestFunction();
Greenhorn.changePlayerAvatar();
*/

var al = document.getElementById('abdorment_left');
var ar = document.getElementById('abdorment_right');
var bc = document.getElementById('border_cap');

al.parentNode.removeChild(al);
ar.parentNode.removeChild(ar);
bc.parentNode.removeChild(bc);



// ============================= BUILDINGS MENU =======================================


var $=unsafeWindow.$;

footer_menu_left = document.getElementById('footer_menu_left');
  if (!footer_menu_left) { return; }
  else{
    footer_menu_left_more = document.createElement('div');
    footer_menu_left_more.setAttribute('id', 'footer_menu_left_more');
    footer_menu_left_more.setAttribute('class', 'homeless');
footer_menu_left_more.setAttribute('style', 'left: 140px; top: -130px; background-position: 0px 0px; padding-top: 3px; padding-left: 3px; width: 500px; height: 40px; position: absolute; z-index:2;  background: transparent repeat-x scroll 0 0;');    footer_menu_left.parentNode.insertBefore(footer_menu_left_more, footer_menu_left.nextSibling);

	
	addFooterIcon('javascript:if(Character.home_town != null) AjaxWindow.show(\'building_gunsmith\',{town_id:Character.home_town.town_id},Character.home_town.town_id);','footer_building_gunsmith','Оружейник');
    addFooterIcon('javascript:if(Character.home_town != null) AjaxWindow.show(\'building_tailor\',{town_id:Character.home_town.town_id},Character.home_town.town_id);','footer_building_tailor','Портной');
    addFooterIcon('javascript:if(Character.home_town != null) AjaxWindow.show(\'building_general\',{town_id:Character.home_town.town_id},Character.home_town.town_id);','footer_building_general','Магазин');
    addFooterIcon('javascript:if(Character.home_town != null) AjaxWindow.show(\'building_hotel\',{town_id:Character.home_town.town_id},Character.home_town.town_id);','footer_building_hotel','Отель');
    addFooterIcon('javascript:if(Character.home_town != null) AjaxWindow.show(\'building_bank\',{town_id:Character.home_town.town_id},Character.home_town.town_id);','footer_building_bank','Банк');
    addFooterIcon('javascript:if(Character.home_town != null) AjaxWindow.show(\'building_church\',{town_id:Character.home_town.town_id},Character.home_town.town_id);','footer_building_church','Церковь');
    addFooterIcon('javascript:if(Character.home_town != null) AjaxWindow.show(\'building_mortician\',{town_id:Character.home_town.town_id},Character.home_town.town_id);','footer_building_mortician','Могильщик');
    addFooterIcon('javascript:if(Character.home_town != null) AjaxWindow.show(\'building_cityhall\',{town_id:Character.home_town.town_id},Character.home_town.town_id);','footer_building_cityhall','Мэрия');
    addFooterIcon('javascript:if(Character.home_town != null) AjaxWindow.show(\'building_saloon\',{town_id:Character.home_town.town_id},Character.home_town.town_id);','footer_building_saloon','Салун');
	addFooterIcon('javascript:if(Character.home_town != null) ,{town_id:Character.home_town.town_id},Character.home_town.town_id);','footer_note','Блокнот');
	addFooterIcon('javascript:bi2_show_panel();void(0)','bi2_footer_link','Сундучок');
	addFooterIcon('javascript:if(Character.home_town != null) AjaxWindow.show(\'fingerboard\',{town_id:Character.home_town.town_id},Character.home_town.town_id);','footer_finger','В город');
	addFooterIcon('javascript:MoCheck.openMotivationWindow(\'motivation\', \'work\')' ,'footer_motiv','Мотивация');
}

function addFooterIcon(mylink,idname, title) {
	footer_menu_left_more = document.getElementById('footer_menu_left_more');
	if (!footer_menu_left_more) {return;}
	var iconlink = document.createElement('a');
	iconlink.setAttribute('href',mylink);
	iconlink.innerHTML = "<img id=\""+idname+"\" alt=\"\" src=\"images/transparent.png\"/>";
	footer_menu_left_more.appendChild(iconlink);
	addPop(idname,'<b>'+title+'</b>');
	if (idname=='footer_note') 
	{
	iconlink.addEventListener("click", openNotepadMainMenu, false);
	}
	return true;
};

function addPop (id,title){
	if ($(id))
		setTimeout(function() {$(id).addMousePopup(title)},2500)
}

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) {return;}
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('#footer_menu_left_more {position: relative; top:16px; margin: auto;}');
addGlobalStyle('#abdorment_middle {display:none;}');
addGlobalStyle('#footer_building_tailor {background-position:-37px 0;}');
addGlobalStyle('#footer_building_general {background-position:-74px 0;}');
addGlobalStyle('#footer_building_saloon {background-position:-111px 0;}');
addGlobalStyle('#footer_building_mortician {background-position:-148px 0;}');
addGlobalStyle('#footer_building_bank {background-position:-185px 0;}');
addGlobalStyle('#footer_building_church {background-position:-222px 0;}');
addGlobalStyle('#footer_building_hotel {background-position:-259px 0;}');
addGlobalStyle('#footer_building_cityhall {background-position:-296px 0;}');
addGlobalStyle('#footer_menu_left_more #footer_note {background-image:url(http://s48.radikal.ru/i119/0911/48/100e0b11975c.png); width:39px; height:37px;}');
addGlobalStyle('#footer_menu_left_more #bi2_footer_link {background-image:url(http://i025.radikal.ru/0911/22/3d3301b7b102.png); width:37px; height:38px;}');
addGlobalStyle('#footer_menu_left_more #footer_finger {background-image:url(http://i037.radikal.ru/0911/28/715ec6bf04e7.png); width:37px; height:37px;}');
addGlobalStyle('#footer_menu_left_more #footer_motiv {background-image:url(http://s006.radikal.ru/i213/1002/47/cf4c54d892f7.png); width:37px; height:37px;}');
addGlobalStyle('#footer_menu_left_more #footer_building_gunsmith, #footer_menu_left_more #footer_building_tailor,#footer_menu_left_more #footer_building_general,#footer_menu_left_more #footer_building_hotel,#footer_menu_left_more #footer_building_bank,#footer_menu_left_more #footer_building_church,#footer_menu_left_more #footer_building_mortician ,#footer_menu_left_more #footer_building_cityhall,#footer_menu_left_more #footer_building_saloon {background-image:url(data:image/png;base64,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%3D); width:37px; height:37px;}');


//====================================== NOTEPAD ====================================


var world=location.href.replace(/http:\/\/(.{1,6}?)\..*/i, "$1");
var loc=world.replace(/[0-9]*?$/, "");
var lang={};
lang.mainmenu={};
lang.valid={};
switch(loc){
case "cz":
break;
default:
lang.mainmenu.title="Заметки";
lang.mainmenu.savednotes="Заметки";
lang.mainmenu.nonotes="Заметок не найдено";
lang.writenew="Создать заметку";
lang.edit="Редактирование";
lang.title="Заголовок";
lang.text="Текст";
lang.save="Сохранить";
lang.valid.text="Вы должны ввести текст заметки";
lang.valid.title="Вы должны ввести название заметки";
lang.del="Удалить";
lang.edit="Редактировать";
lang.restart_confirm="Вы действительно хотите удалить все заметки?";
lang.name="Заметки";
break;
}
var notes=GM_getValue(world+"notes", false);
if(notes){
notes=notes.split("|");
}

function $(B) {
    if (!B) {
        return null;
    }
    if (B.htmlElement) {
        return Garbage.collect(B);
    }
    if ([window, document].contains(B)) {
        return B;
    }
    var A = $type(B);
    if (A == "string") {
        B = document.getElementById(B);
        A = B ? "element" : false;
    }
    if (A != "element") {
        return null;
    }
    if (B.htmlElement) {
        return Garbage.collect(B);
    }
    if (["object", "embed"].contains(B.tagName.toLowerCase())) {
        return B;
    }
    $extend(B, Element.prototype);
    B.htmlElement = function () {};
    return Garbage.collect(B);
}
function $ES(A, B) {
    return ($(B) || document).getElementsBySelector(A);
}
									
function NotepadShow(name, data){
var extendeName = name;
var params_str='';
if(!unsafeWindow.AjaxWindow.windows[extendeName]){
var xhtml='<div class="window_borders">';xhtml+='<h2 id="window_'+extendeName+'_title" class="window_title" style="background-image:url(http://i033.radikal.ru/0911/c6/b5d870e5aa15.png);"><span>'+extendeName+'</span></h2>';xhtml+='<a href="javascript:AjaxWindow.closeAll();" class="window_closeall"></a><a href="javascript:AjaxWindow.close(\''+extendeName+'\');" class="window_close"></a>';xhtml+='<div id="window_'+extendeName+'_content" class="window_content">'+data+'<div style="position:absolute;top:30px;right:30px;" id="tw_help_notepad_write_new"><img src="http://s41.radikal.ru/i093/0911/1e/204f291573ea.png" title="'+lang.writenew+'" style="cursor: pointer;" id="tw_help_notepad_write_new_img" /></div></div>';xhtml+='</div>';

var window_div=new unsafeWindow.Element('div',{'id':'window_'+extendeName,'class':'window'});
window_div.innerHTML=xhtml;
unsafeWindow.AjaxWindow.windows[extendeName]=window_div;
unsafeWindow.AjaxWindow.bringToTop(window_div);
unsafeWindow.AjaxWindow.windows[extendeName]=unsafeWindow.document.getElementById('windows').appendChild(window_div);
unsafeWindow.window_div=window_div;
unsafeWindow.document.getElementById('tw_help_notepad_write_new_img').addEventListener('click', WriteNewNote, false);
				      
unsafeWindow.document.getElementById(window_div.id);
var window_title_div=unsafeWindow.document.getElementById('window_'+extendeName+'_title');
window_title_div.addEventListener('dblclick',function(){window_div.centerLeft();window_div.setStyle('top',133);}, false);
unsafeWindow.document.getElementById('window_'+extendeName).makeDraggable({handle:window_title_div,onStart:function(){if($ES('.iframe_fixture',window_div).length>0){var el=$ES('.iframe_fixture',window_div);for(i in el){el[i].setStyle('display','block');}}},onComplete:function(){if($ES('.iframe_fixture',window_div).length>0){var el=$ES('.iframe_fixture',window_div);for(var i in el){el[i].setStyle('display','none');}}}});
window_div.addEventListener('mousedown',unsafeWindow.AjaxWindow.bringToTop.bind(this,[window_div]), false);
window_title_div.addEventListener('mousedown',unsafeWindow.AjaxWindow.bringToTop.bind(this,[window_div]), false);
}else{unsafeWindow.AjaxWindow.maximize(extendeName);}
unsafeWindow.AjaxWindow.windows[extendeName].isReady=true;
}

function openNotepadMainMenu(){
var mainmenu='<div style="float:left;"><b>'+lang.mainmenu.savednotes+':</b><table class="shadow_table"><tbody><tr><td class="edge_shadow_top_left"/><td class="border_shadow_top"/><td class="edge_shadow_top_right"/></tr><tr><td class="border_shadow_left"/><td class="shadow_content"><div><div style="overflow-y: auto;overflow-x: hidden;height:335px;width:auto;"><table class="table border" id="tw_help_show_notes" style="width:590px;"></table></div></div></td><td class="border_shadow_right"/></tr><tr><td class="edge_shadow_bottom_left"/><td class="border_shadow_bottom"/><td class="edge_shadow_bottom_right"/></tr></tbody></table>';
NotepadShow("tw_help_notepad", mainmenu);
showNotesTable('tw_help_show_notes');
}

function openNotepadNote(id){
var note=GM_getValue(world+"note_"+id).replace(/\n/g, "<br />");
var title=GM_getValue(world+"title_"+id);
var text="<div style='padding:10px;margin:0px auto;width:420px;border:black 2px double;'><style='text-align:center;'>"+title+"<br /><br />"+note+"</div>";
NotepadShow("tw_help_notepad_note", text);
}

function writeNote(){
var data='';
var title="";
var text="";
var window_title=lang.writenew;
if(arguments.length>0){
var uprid=arguments[0];
title=GM_getValue(world+'title_'+uprid);
text=GM_getValue(world+'note_'+uprid);
window_title=lang.edit;
}
data+="<h4 style='text-align:center;'>"+window_title+"</h4><br /><strong>"+lang.title+"</strong><br /><input type='text' id='tw_help_edit_note_title' value='"+title+"' maxlength='20' /><br /><strong>"+lang.text+"</strong><br /><textarea style='width:550px;height:275px;' id='tw_help_edit_note_text'>"+text+"</textarea><br /><button type='button' id='tw_help_edit_note_button'>"+lang.save+"</button>";
if(uprid){
data+="<input type='hidden' value='"+uprid+"' id='tw_help_edit_note_uprid' />";
}
NotepadShow('tw_help_edit_note', data);
unsafeWindow.document.getElementById('tw_help_edit_note_button').addEventListener('click', saveNote, false);
}

function saveNote(){
var edited=unsafeWindow.document.getElementById('tw_help_edit_note_uprid') ? unsafeWindow.document.getElementById('tw_help_edit_note_uprid').value : false;
var id=edited===false ? getFirstId() : edited;
var ids=GM_getValue(world+'notes', false);
var text=unsafeWindow.document.getElementById('tw_help_edit_note_text').value;
var title=unsafeWindow.document.getElementById('tw_help_edit_note_title').value;
if(!text){
alert(lang.valid.text);
return;
}
if(text==="tw-help({restart_notes;});"&&confirm(lang.restart_confirm)){
GM_setValue(world+"notes", false);
unsafeWindow.AjaxWindow.close('tw_help_edit_note');
showNotesTable('tw_help_show_notes');
return;
}
if(!title){
alert(lang.valid.title);
return;
}
if(edited===false){
if(ids===false)
ids=id+"|";
else {
ids=ids.split("|");
ids.push(id);
ids.sort(sortNumber);
ids=ids.join("|");
}
ids=ids.replace(/^\|/, "").replace(/\|$/, "");
GM_setValue(world+"notes", ids);
}
GM_setValue(world+"title_"+id, title);
GM_setValue(world+"note_"+id, text);
unsafeWindow.AjaxWindow.close('tw_help_edit_note');
showNotesTable('tw_help_show_notes');
}

function getFirstId(){
var ids=GM_getValue(world+'notes', false);
if(ids===0 || ids==='0')
ids="nullla";
if(ids==false){
return "0";
}
ids=ids.replace(/nullla/, "0");
ids=ids.split("|");
var old;
for(var i in ids){
if(old||old===0){
if(ids[i]-1!=old)
return ids[i]-1;
}
old=ids[i];
}
return parseInt(ids[i])+1;
}

function sortNumber(a,b){
return a - b;
}

function WriteNewNote(){
writeNote();
}

function editNote(ev){
var id=this.className;
writeNote(id);
}

function deleteNote(){
var id=this.className;
var ids=GM_getValue(world+"notes");
ids=ids.split("|");
var i=0;
while(ids[i]!=id){
i++;
}
ids.splice(i, 1);
GM_setValue(world+"notes", ids.join("|").replace(/\|$/, ""));
showNotesTable('tw_help_show_notes');
}

function showNotesTable(update, controls){
if(!controls){
controls=true;
}
var tbody=document.createElement('tbody');
var notes=GM_getValue(world+"notes", false);
var z=0;
if(notes||notes===0){
notes=notes.split("|");
}
else{
notes[0]=false;
}
for(z=0;notes[z]||notes[z]===0;z++){
var s=notes[z];
var gmv=GM_getValue(world+'note_'+s).replace(/\n/g, "");
if(gmv.length>50){
gmv=gmv.substr(0,50)+"...";
}
var a=document.createElement('a');
a.href="#";
a.innerHTML=GM_getValue(world+'title_'+s);
a.addEventListener('click', function(){openNotepadNote(s);return false;}, false);
var tr=document.createElement('tr');
tr.id='tw_help_notepad_note_'+s;
var td1=document.createElement('td');
td1.style.width="180px";  
td1.appendChild(a);
var td2=document.createElement('td');
td2.innerHTML=gmv;
td2.style.width="305px";
tr.appendChild(td1);
tr.appendChild(td2);
if(controls){
var td3=document.createElement('td');
td3.style.width="75px";
var del=document.createElement('img');
del.src="http://s46.radikal.ru/i112/0911/8f/8a000270ce6d.png";
del.title=lang.del;
del.style.cursor="pointer";
del.style.width="13px";
del.style.height="13px";
del.className=s;
del.addEventListener('click', deleteNote, false);
var edit=document.createElement('img');
edit.src="http://tw-help.ic.cz/img/gm_notepad_edit.png";
edit.title=lang.edit;
edit.style.cursor="pointer";
edit.style.width="25px";
edit.style.height="25px";
edit.className=s;
edit.addEventListener('click', editNote, false);
td3.appendChild(del);
td3.appendChild(edit);
tr.appendChild(td3);
tr.appendChild(td3);
}
tbody.appendChild(tr);
}
if(z===0){
var tr=document.createElement('tr');
tr.innerHTML="<td><b>"+lang.mainmenu.nonotes+"</b></td>";
tbody.appendChild(tr);
}
unsafeWindow.document.getElementById(update).innerHTML='';
unsafeWindow.document.getElementById(update).appendChild(tbody);
}

var m_d=unsafeWindow.document.getElementById('menu_duel');
m_d.parentNode.insertBefore(notes_img, m_d.nextSiblink);