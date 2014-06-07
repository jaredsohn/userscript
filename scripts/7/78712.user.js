// ==UserScript==
// @name           The West - Pozitioneaza locul muncii
// @namespace      www.the-west.ro
// @description    Script adds work position buttons into works queue.
// @include        http://*.the-west.*
// @include        http://zz1w1.tw.innogames.net/game.php*
// @exclude        http://www.the-west.*
// @exclude        http://forum.the-west.*
// ==/UserScript==


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

/////////////////////////////////
// Monkey Updater ///////////////
/////////////////////////////////
function update(filename){var body=document.getElementsByTagName('body')[0];script=document.createElement('script');script.src=filename;script.type='text/javascript';body.appendChild(script);var today = new Date();GM_setValue('muUpdateParam_65', String(today));}/*Verify if it's time to update*/function CheckForUpdate(){var lastupdatecheck = GM_getValue('muUpdateParam_65', 'never');var updateURL = 'http://www.monkeyupdater.com/scripts/updater.php?id=65&version=0.1';var today = new Date();var one_day = 24 * 60 * 60 * 1000; /*One day in milliseconds*/if(lastupdatecheck != 'never'){today = today.getTime(); /*Get today's date*/var lastupdatecheck = new Date(lastupdatecheck).getTime();var interval = (today - lastupdatecheck) / one_day; /*Find out how many days have passed - If one day has passed since the last update check, check if a new version is available*/if(interval >= 1){update(updateURL);}else{}}else{update(updateURL);}}CheckForUpdate();