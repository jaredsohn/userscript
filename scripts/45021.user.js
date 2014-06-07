// ==UserScript==========
// @name JFarmer
// @author Jacky-Q - FDisk - Skeja
// @description Jack description of the farm machines, using various strategies to achieve the established automatic farm.
// @include http://*.travian.*/dorf1.php*
// ==/UserScript========
// TODO maybe graphical interface operation

// Languages

var sLang = "";
var resourceTypes;
var Options;

function detectLanguage() {
	if(sLang != "") {return;}
	var re = null; re = new RegExp("^http://[^/]*\.([a-zA-Z]{2,3})\/.*$", "i");
	var lang = window.location.href.match(re);
	if(!lang) {
		return;
	} else {
		sLang = lang.pop();
	}
}

detectLanguage();

switch(sLang) {
	case "jp":
	resourceTypes = ['木', '粘土', '鉄', '穀物'];
	Option = "<option value='0'> </ option> <option value='1'> 各資源均等 </ option> <option value='2' disabled='disabled'> sequential farming </ option> <option value='3'> カスタム </ option> <option value='4'> 農耕地 </ option> ";
	message = ["対象とLV ", ", 準備完了まであと ", " 分.", "不足人口の建設を停止すると自動", "各資源均等にLVあげる場合スペースを入力 resources in the order set in proportion to byte characters \",\"separated", "カンマ区切りで上げたい順に数字を入力(例:木>粘土>鉄>穀物の順序だと「0,1,2,3」と入力)対応する数字　 木,0 粘土,1 鉄,2 穀物,3 \", \" ", "最大記録ログ:", "最大記録数をセット (ログ記録数","in ", " days at ", "to begin building", ""];
	break;
	
	case "it":
		resourceTypes = ['Legno', 'Argilla', 'Ferro', 'Grano'];
		Option = "<option value='0'> </ option> <option value='1'> crescita proporzionale </ option> <option value='2' disabled='disabled'> ordine sequenziale </ option> <option value='3'> ordine a scelta </ option> <option value='4'> costruisce prima di overflow di risorse </ option> ";
		message = ["Risorse insufficienti per ",
			 ", pronte tra ",
			 " minuti.",
			 "popolazione insufficiente, la costruzione automatica è stata fermata",
			 "scrivere in ordine di legno, argilla, ferro e grano le proporzioni tra le produzioni orarie che dovranno avere, separate da \",\" (es: 10,12,8,6 )",
			 "mettere 0,1,2,3 rispettivamente per legno, argilla, ferro, grano separate dalla virgola \",\" per costruire le risorse secondo l'ordine immesso",
			 "Setta il numero massimo di report nel log :",
			 "imposta numero di report (attualmente",
			 "tra ",
			 " gg alle ",
			 "in costruzione",
			 ""];
		break;

	case "en":
	case "com":
	default: // default is english
		resourceTypes = ['Wood', 'Clay', 'Iron', 'Food'];
		Option = "<option value='0'> </ option> <option value='1'> proportion of farming </ option> <option value='2' disabled='disabled'> sequential farming </ option> <option value='3'> custom farming </ option> <option value='4'> warehouse explosion point farming </ option> ";
		message = ["Not enough resources for ", ", ready in ", " minutes.", "insufficient population, and stop the construction of automatic", "click wood, clay, iron, food resources in the order set in proportion to byte characters \",\"separated", "representatives to 0,1,2,3 respectively wood, clay, iron, grain imported from the definition of the construction sequence, and byte characters \", \" separated", "Please set the maximum number of log records :", "set log number (current","in ", " days at ", "to begin building", ""];
		break;
	}

// Positioning for the key nodes
var resourceMap = document.getElementById("lmid2").childNodes[2];
var resourceLine = document.getElementById("lres0").childNodes[1].firstChild.firstChild;
var wood = document.getElementById("lrpr").childNodes[3].childNodes[1];
var busy = document.getElementById("lbau1");

// Resource production rate
s1 = wood.childNodes[0].childNodes[4].firstChild.firstChild.nodeValue / 1;
s2 = wood.childNodes[2].childNodes[4].firstChild.firstChild.nodeValue / 1;
s3 = wood.childNodes[4].childNodes[4].firstChild.firstChild.nodeValue / 1;
s4 = wood.childNodes[6].childNodes[4].firstChild.firstChild.nodeValue / 1;

// Global variables defined
//var resourceTypes = ['Legno', 'Argilla', 'Ferro', 'Grano'];
var strategys = new Array(null, 'onratio', 'onorder', 'oncustom', 'onfull');
var Target = 0;
var targetBuilding = '';
var targetLv = '';
var buildingId = 0;
var villageId = "";
var dragObj = null;
var mouseOffset = null;
var dragId;
foodSituation = resourceLine.childNodes[16].childNodes[2].nodeValue;
foodSituation = foodSituation.split("/");
var workeravailable = Math.max(3, foodSituation[1] / 1 - foodSituation[0] / 1);

// GM data storage
var taskList = (GM_getValue("taskList") == null || GM_getValue("taskList") == '') ? new Array() : GM_getValue("taskList").split(',');
//alert("taskList[0]== ''"+eval(taskList[0] == ''));
var logMessage = GM_getValue("logMessage") == null ? '': unescape(GM_getValue("logMessage"));
var logAmount = GM_getValue("logAmount") == null ? 10: GM_getValue("logAmount");
var myRace = getRace(); // (GM_getValue("race") == "Germanic" || GM_getValue("race") == "Farmer")  ? GM_getValue("race"):null;
var flag = GM_getValue("auto") == null ? false: GM_getValue("auto");
var strategyId = GM_getValue("strategy") == null ? 0: GM_getValue("strategy");
//alert("myRace="+myRace);
/** 
 * Automatic construction strategy: 
 1. Air (default), 
 2. Proportion 
 3. According to the fastest (lack of resources used), 
 4. According to custom order 
*/

var listBox = document.createElement("div");
listBox.id = "listBox";
listBox.style.cssFloat = 'left';
listBox.style.padding = '4px';
document.getElementById("lrpr").appendChild(listBox);

var sOption = document.createElement("select");
sOption.innerHTML = Option;
sOption.style.width = '160px';
sOption.style.cssFloat = 'left';
sOption.id = "sOption";
sOption.selectedIndex = strategyId / 1;
document.getElementById("lrpr").appendChild(sOption);
sOption.addEventListener('change', selectStrategy, false);

var box = document.createElement("input");
box.type = "checkbox";
box.id = "box";
box.style.cssFloat = 'left';
box.checked = flag;
document.getElementById("lrpr").appendChild(box);
box.addEventListener('click', checkAuto, false);


var MsgBox = createMsgBox();
log("");
MsgBox.addEventListener('click', deleteLog, false);




window.addEventListener('load', checkStrategy, false);
window.addEventListener('load', checkAuto, false);
//registerDrag();
//document.addEventListener('mousemove',mousemove,false);
//document.addEventListener('mouseup',mouseup,false);

//=========== Function District =====================
function checkAuto() {
	var box = document.getElementById("box");
	flag = box.checked;
	GM_setValue("auto", flag);
	 //	alert("taskList.length when checkAuto"+taskList.length);
	if (flag) {
		//getPersonPage();
		//if(myRace != null) {
			checkStrategy();
			startBuilding();
		//}
		 //		}else if(myRace == "Germanic"){
		 //			alert("What do you think, the stick?");
		 //			box.checked = false;
		 //		}else{
		 ////			alert("go to getPersonalPage.");
		 //		}
	}
}


function checkStrategy() {
	if (strategyId == '1' && taskList.length < 4) {
		reloadRatio(GM_getValue('ratio'));
	} else if (strategyId == '4') {
		checkLatest();
	}
	showTaskList();
}



/** 
 * CheckAvailble 
*/

function checkAvailable() {
	 //Are there scheduled
	if (taskList.length > 0 || myRace == "Romans") {
		 // Are there during construction
		if (busy == null) {
			 // Population is sufficient
			if (workeravailable > 3) {
				 // Enough resources to carry out construction
				_waitTime = checkResource();
				if (_waitTime == 0) {
					return true;
				} else {
					_timeStamp = Math.ceil(_waitTime / 60000);
					window.setTimeout("location.reload()", _timeStamp * 60000);
					log(message[0] + targetBuilding +" "+ (targetLv / 1 + 1) + message[1] + _timeStamp + message[2]);
				}
			} else {
				log(message[3]);
			}
		}
	}
	return false;
}


/**
  * checkResource
  * @param {String} option
  */
function checkResource() {
	targetBuilding = resourceTypes[taskList[0] / 1];
	Target = taskList[0] / 1;
	var _level = 0;
	var siteNo = new Array();

	switch (Target) {
	case 0:
		{
			siteNo.length = 0;
			siteNo = [1, 3, 14, 17];
			break;
		}
	case 1:
		{
			siteNo.length = 0;
			siteNo = [5, 6, 16, 18];
			break;
		}
	case 2:
		{
			siteNo.length = 0;
			siteNo = [4, 7, 10, 11];
			break;
		}
	case 3:
		{
			siteNo.length = 0;
			siteNo = [2, 8, 9, 12, 13, 15];
			break;
		}
	}
	site1 = resourceMap.childNodes[siteNo[0] - 1].title;
	site2 = resourceMap.childNodes[siteNo[1] - 1].title;
	site3 = resourceMap.childNodes[siteNo[2] - 1].title;
	site4 = resourceMap.childNodes[siteNo[3] - 1].title;
	if (siteNo.length > 4) {
		site5 = resourceMap.childNodes[siteNo[4] - 1].title;
		site6 = resourceMap.childNodes[siteNo[5] - 1].title;
		var sites = new Array(site1, site2, site3, site4, site5, site6);
	} else {
		var sites = new Array(site1, site2, site3, site4);
	}
	for (var i = 0; i < sites.length; i++) {
		sites[i] = sites[i].substring(sites[i].lastIndexOf(' '), sites[i].length);
	}
	for (var i = sites.length - 1; i > 0; i--) {
		for (var j = 0; j < i; j++) {
			if (sites[j + 1] < sites[j]) {
				var temp = siteNo[j];
				siteNo[j] = siteNo[j + 1];
				siteNo[j + 1] = temp;
				temp = sites[j];
				sites[j] = sites[j + 1];
				sites[j + 1] = temp;
			}
		}
	}

	targetLv = _level = sites[0];
	buildingId = siteNo[0];
	 // Check whether there are sufficient resources required
	rq = getResourceRequirement(Target, (_level / 1));
	rs = new Array(4);
	temp = resourceLine.childNodes[3].firstChild.nodeValue;
	rs[0] = temp.substring(0, temp.toString().indexOf('/'));
	temp = resourceLine.childNodes[7].firstChild.nodeValue;
	rs[1] = temp.substring(0, temp.toString().indexOf('/'));
	temp = resourceLine.childNodes[11].firstChild.nodeValue;
	rs[2] = temp.substring(0, temp.toString().indexOf('/'));
	temp = resourceLine.childNodes[14].firstChild.nodeValue;
	rs[3] = temp.substring(0, temp.toString().indexOf('/'));
	var s = [s1, s2, s3, s4];
	_waitTime = 0;
	_waitTemp = 0;
	for (var index = 0; index < rq.length; index++) {
		if (rq[index] > rs[index]) {
			_waitTemp = ((rq[index] - rs[index]) / s[index]) * 60 * 60 * 1000;
			if(_waitTemp > _waitTime){
			_waitTime = _waitTemp;}
			//alert("wait : "+_waitTemp);}
		}
	}
	return _waitTime;
}

function getResourceRequirement(t, l) {
	var resources = new Array(4);
	switch (t) {
	case 0:
		{
			resources[0] = Math.round(Math.pow(1.67, l) * 40 / 5) * 5;
			resources[1] = Math.round(Math.pow(1.67, l) * 100 / 5) * 5;
			resources[2] = Math.round(Math.pow(1.67, l) * 50 / 5) * 5;
			resources[3] = Math.round(Math.pow(1.67, l) * 60 / 5) * 5;
			break;
		}
	case 1:
		{
			resources[0] = Math.round(Math.pow(1.67, l) * 80 / 5) * 5;
			resources[1] = Math.round(Math.pow(1.67, l) * 40 / 5) * 5;
			resources[2] = Math.round(Math.pow(1.67, l) * 80 / 5) * 5;
			resources[3] = Math.round(Math.pow(1.67, l) * 50 / 5) * 5;
			break;
		}
	case 2:
		{
			resources[0] = Math.round(Math.pow(1.67, l) * 100 / 5) * 5;
			resources[1] = Math.round(Math.pow(1.67, l) * 80 / 5) * 5;
			resources[2] = Math.round(Math.pow(1.67, l) * 30 / 5) * 5;
			resources[3] = Math.round(Math.pow(1.67, l) * 60 / 5) * 5;
			break;
		}
	case 3:
		{
			resources[0] = Math.round(Math.pow(1.67, l) * 70 / 5) * 5;
			resources[1] = Math.round(Math.pow(1.67, l) * 90 / 5) * 5;
			resources[2] = Math.round(Math.pow(1.67, l) * 70 / 5) * 5;
			resources[3] = Math.round(Math.pow(1.67, l) * 20 / 5) * 5;
			break;
		}
	}
	return resources;
}

/*
function checkRace(hxr2) {
	if (hxr2.readyState == 4) {
		if (hxr2.status == 200) {
			 //			alert("go to checkRace");
			var resText = hxr2.responseText;
			var rex = /race:<\/td><td>\W{2}\W?/i;
			var race = resText.match(rex).toString();
			if (race != null) {
				race = race.substring(12, 13);
				 //				alert("a"+race+"b");
				 //				alert("race == rierman  == "日耳"));
				if (race == "G") {
					 //					alert("Germanic here.");
					 //					myRace = "Germanic";
					alert("What do you think, the stick?");

				} else {
					 //					myRace = "Farmer";
					startBuilding();
				}
			}
			 			alert("myRace="+myRace);
			 //			GM_setValue("race",myRace);
			 //			location.reload(true);
		}
	}
}
	*/

function xpath(query, object) {
	if(!object) var object = document;
	return document.evaluate(query, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}
//alert(getRace());
function getRace() {
	var xpathResult = xpath("//img[@class='unit']");
	if (xpathResult.snapshotLength > 0) {
		var src = xpathResult.snapshotItem(0).src;
		var iTroopType = src.match(/([0-9]{1,2})\.gif/i);
		if(!iTroopType || !iTroopType[1]) {
			return null;
		}
		iTroopType = parseInt(iTroopType[1]);
		if(iTroopType > 20) {
			return "Gaul"; //gaul
		} else if(iTroopType > 10) {
			return "Germanic"; //teutons
		} else {
			return "Romans"; //Romans
		}
	} else {
			return null;
	}
} 



/**
 * startBuilding
 * 	 
 */
function startBuilding() {
	if (checkAvailable()) {
		 // 		alert(myRace);
		 //Get links
		 // 		alert("available!"+"\nbuildingId:"+buildingId);
		preUrl = "build.php?id=" + buildingId + "&temp=" + new Date().getTime();
		 // 		alert('preUrl='+preUrl);
		var xrq1 = new XMLHttpRequest();
		 // Default automatically in the fields of the state can not be sent: As the official script led to the conflict can not be directly exposed to GM script, the model should be used to resolve the incident.
		xrq1.open("GET", preUrl, true);
		xrq1.send(null);
		xrq1.onreadystatechange = function() {
			getVillageId(xrq1);
		};
	} else
	 // 		log("can not startBuilding");
	 return;
}

function getVillageId(xhr) {
	if (xhr.readyState == 4) {
		if (xhr.status == 200) {
			var resText = xhr.responseText;

			var rex = /dorf1\.php\?a=\d?\d&c=\w{3,}/;
			var link = resText.match(rex);
			 //		 	alert("link="+link);
			if (link == null || link == "") {
				 //		 		villageId=0;
				log("can not get link");
				return;
			} else {

				villageId = link.toString().substring(link.length - 4, link.length - 1);
			}
			xhr = new XMLHttpRequest();
			xhr.open("GET", link.toString() + "&temp=" + new Date().getTime(), true);
			xhr.send(null);
			 //Refresh pages success, a failure Tips
			xhr.onreadystatechange = function() {
				callback(xhr);
			};

			 //			location.replace(link.toString());
			 // 			return link;
		} else {
			return "error occurs.";
		}
	} else {
		return "error occurs.";
	}
}
/***
  * SelectStrategy
  * Set up farm strategy
  * 
  */
function selectStrategy() {
	strategyId = document.getElementById("sOption").selectedIndex;
	 // 	alert("strategyId="+strategyId);
	GM_setValue("strategy", strategyId);
	switch (strategyId) {
	case 1:
		{
			 // 			var r = window.prompt()
			 //			r1 = 29;r2 =31;r3=23;r4=19;
			var ratio = window.prompt(message[4]);
			 //		    var ratio=message.split(',');
			GM_setValue('ratio', ratio);
			reloadRatio(ratio);
			GM_setValue('taskList', taskList.toString());
			break;
		}
	case 2:
		{
			taskList = new Array();

			break;
		}
	case 3:
		{
			var list = window.prompt(message[5], "");
			if (list == "" || list == null) {
				taskList.length = 0;
				 //		 		GM_setValue("taskList",-1);
			} else {
				taskList = list.split(",");
				GM_setValue('taskList', list);
			}
			break;
		}
	case 4:
		{
			checkLatest();
			GM_setValue("taskList", taskList.toString());
			break;
		}
	default:
		break;
	}

	showTaskList();
}

/**
 * reloadRatio
 * @param {array} ratio 
 */
function reloadRatio(ratio) {
	 // 	alert('ratio='+ratio);
	ratio = ratio.split(',');
	r1 = ratio[0] / 1;
	r2 = ratio[1] / 1;
	r3 = ratio[2] / 1;
	r4 = ratio[3] / 1;
	var s = new Array(s1 / r1, s2 / r2, s3 / r3, s4 / r4);
	taskList = ['0', '1', '2', '3'];
	for (var i = s.length - 1; i > 0; i--) {
		for (var j = 0; j < i; j++) {
			if (s[j] > s[j + 1]) {
				_temp = s[j];
				s[j] = s[j + 1];
				s[j + 1] = _temp;
				_temp = taskList[j];
				taskList[j] = taskList[j + 1];
				taskList[j + 1] = _temp;

			}
		}
	}

}

function callback(xrq) {
	if (xrq.readyState == 4) {

		if (xrq.status == 200) {
			log(targetBuilding +" "+ (targetLv / 1 + 1) +" "+ message[11]);
			 //			alert("after log in  call funciton");
			taskList.shift();
			 //			var list='';
			 //			for each (ss in  taskList){
			 //				list += list+ss+",";
			 //			}
			 //			alert("taskList.length when callback"+taskList.length);
			GM_setValue("taskList", taskList.toString());
			location.assign('dorf1.php');
		} else {
			log(targetBuilding + "upgrade failure Bird");
		}
	}
}

function log(msg) {
	var _box = document.getElementById("MsgBox");
	 //TODO log of user settings
	if (_box == null) {
		_box = createMsgBox();
		_box.innerHTML = logMessage;
	}
	if (msg != null && msg != '') {
		 //		alert("logAmount="+logAmount);
		updatelogAmount(logAmount - 1);
		var time = new Date();
		_hour = time.getHours() >= 10 ? time.getHours() : "0" + time.getHours();
		_min = time.getMinutes() >= 10 ? time.getMinutes() : "0" + time.getMinutes();
		_waitTime = checkResource();
		_waitTime = Math.ceil(_waitTime / 60000);
		_h = Math.ceil(_waitTime / 60-1);
		_m = eval(_waitTime - (_h*60));
		//alert(_waitTime+" == "+_h+":"+_m);
		_hour = eval(_hour+_h);
		_min = eval(_min+_m);
		_day = 0;
		_d = "";
		while(_min >= 60){
			_min = _min - 60;
			_hour++;
		}
		while(_hour >= 24){
			_hour = _hour - 24;
			_day++;
		}
		if(_day > 0)
			_d = message[8]+_day+message[9];
		if(_min < 10)
			_min = "0"+_min;

		logMessage += "<li>" + msg + "  ("+ _d + _hour + ":" + _min + ")</li>";
		GM_setValue("logMessage", escape(logMessage));
	}
	_box.innerHTML = logMessage;

}

function updatelogAmount(len) {
	while (_box.childNodes.length > len) {
		_box.removeChild(_box.firstChild);
		logMessage = logMessage.substring(logMessage.indexOf('/') + 4, logMessage.length);
	}
}

/**
  * createLogConfig
  *  
  */
function createLogConfig(_box) {
	var _cf = document.createElement("span");
	_cf.id = "config";
	 //  	_cf.type = "button";
	_cf.innerHTML = message[7] + logAmount + ")";
	 //  	_box =document.getElementById("MsgBox");
	document.body.insertBefore(_cf, _box);
	_cf.addEventListener('click', setLogAmount, false);
}

function setLogAmount() {
	var _logAmount = window.prompt(message[6], '');
	if (_logAmount == "" || _logAmount == null) return;
	GM_setValue("logAmount", _logAmount);
	updatelogAmount(_logAmount / 1);
	document.getElementById("config").innerHTML = message[7] + _logAmount + ")";
}


function deleteLog() {
	_box = document.getElementById("MsgBox");
	GM_setValue('logMessage', '');
	document.body.removeChild(_box);

	 //	document.getElementById("lright1").removeChild(_box);
}

function createMsgBox() {
	_box = document.createElement("ul");
	_box.id = "MsgBox";
	 //	_box.style.backgroundColor = "lightgreen";
	 //	_box.style.top = "400px";
	 //	_box.style.left = "200px";
	_box.style.position = "right";
	document.body.appendChild(_box);
	createLogConfig(_box);

	return _box;
}

/**
 * showTaskList
 *  
 */
function showTaskList() {
	var listBox = document.getElementById("listBox");
	_addr1 = "<img src='/img/un/r/";
	_addr2 = ".gif' />";
	_listContext = "";
	 // 	alert("taskList.length when show taskList="+taskList.length);
	if (taskList != null && taskList.length > 0) {
		for (var i = 0; i < taskList.length; i++) {
			_listContext += _addr1 + (taskList[i] / 1 + 1) + _addr2;
		}
	}
	listBox.innerHTML = _listContext;
}



/**
 * checkRace
 *  
 */
function getPersonPage() {
	_t = document.getElementById("navi_table");
	var _page = _t.childNodes[1].firstChild.childNodes[1].childNodes[5].href;
	 // 	alert("_page="+_page);
	var hxq = new XMLHttpRequest();
	hxq.open("GET", _page, true);
	hxq.send(null);
	hxq.onreadystatechange = function() {
		checkRace(hxq);
	};
}

function registerDrag() {
	var _rs = resourceMap.childNodes;
	for (var i = 0; i < _rs.length; i++) {
		_rs[i].addEventListener('mousedown', mousedown, false);
		 //		_rs[i].addEventListener('mosuemove',mousemove,false);
	}
}



function mousedown(e) {
	dragObj = document.createElement("area");
	 //	fackObj.createAttribute('x',e.pageX);
	 //	fackObj.createAttribute('y',e.pageY);
	 //	dragObj = ;
	dragObj.setAttribute('x', e.pageX);
	dragObj.setAttribute('y', e.pageY);
	 //	mouseOffset = getMouseOffset(dragObj,e);
	 //	document.createAttribute('x');
	 //	document.createAttribute()
	 //		mouseOffset(e.target,e);
	dragId = e.target.href.match(/\d*/);
	e.target = dragObj;
	 //	alert(dragId);
	 //	alert(e.pageX);
	 //	fackObj.style.left =
}

function mousemove(ev) {
	 //	ev = ev || window.event;
	 // 	var mousePos = mouseCoords(ev);
	if (dragObj != null) {
		dragObj.x = ev.pageX;
		dragObj.y = ev.pageY;
		return false;
	}
}


function mouseup() {
	 //	alert(dragObj.x);
	if (dragObj != null) {
		if (dragObj.x > 600 && dragObj.y > 20) {
			addDragResource(dragId / 1);
			showTaskList();
		}
	}

	dragObj = null;
}

// TODO integrate various resources strategy checkreource () should be concerned about importation of the id. Judge to the lowest level output remodeling in the new function call
function addDragResource(id) {
	totalSiteNo = new Array([1, 3, 14, 17], [5, 6, 16, 18], [4, 7, 10, 11], [2, 8, 9, 12, 13, 15]);
}

function checkLatest() {
	var _r = new Array(4);
	var _s = [s1, s2, s3, s4];
	var _target = null;
	for (var i = 0; i < 4; i++) {
		if (4 * i + 3 > 11) {
			temp = resourceLine.childNodes[14].firstChild.nodeValue;
		} else {
			temp = resourceLine.childNodes[4 * i + 3].firstChild.nodeValue;

		}
		 //		alert(temp);
		_r[i] = temp.split('/');
		_r[i][2] = _s[i];
	}
	temp2 = 0;
	for (var i = 0; i < _r.length; i++) {
		_fulltime = Math.round((_r[i][1] / 1 - _r[i][0] / 1) / _r[i][2] * 60);
		 //		alert(_fulltime);
		if (temp2 < _fulltime) {
			_target = i;
			temp2 = _fulltime;
		}
	}
	taskList = new Array();
	taskList[0] = _target;
} 