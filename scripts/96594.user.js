// ==UserScript==
// @name				سكربت لفلترة التقارير و تصفيتها By:KOPc
// @author				Heinzel, pinjam, to arabic by araby
// @namespace			http://userscripts.org
// @description			  سكربت يقوم بفلترة التقارير و تصفيتها حسب نوعها
// @include			http://*.tribalwars.ae/game.php?*screen=report*
// ==/UserScript==



/* Grundlegende Funktionen */
function _evaluate(path, context) {
	if(!context) {
		var context = document;
	}
	
	var XPath = document.evaluate(path, context, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var nodes = [];
	for(var x = 0; x < XPath.snapshotLength; x++) {
		nodes.push(XPath.snapshotItem(x));
	}
	
	return nodes;
}

if(!GM_getValue) {
	function GM_getValue(name, defaultValue) {
		var reg = new RegExp(name + "=(.+?);");
		var value = document.cookie.match(reg);
		if(value == null) {
			value = defaultValue;
		} else {
			value = value[1];
		}
		
		return value;
	}
	
	function GM_setValue(name, value) {
		var date = new Date();
		date.setYear(date.getYear()+1905);
		var expires = date.toGMTString();
		
		document.cookie = name + "=" + value + ";expires=" + expires;
	}
	
	function GM_deleteValue(name) {
		document.cookie = name + "=;expires=Sun, 27 Jun 1999 13:09:38 GMT";
	}
}


/* Objekte */
var CReport = function() {
	this.name = '';
	this.id = 0;
	this.green = 0;
	this.yellow = 0;
	this.red = 0;
	this.blue = 0;
	this.read = 0;
	this.text = 0;
        this.empty = 0;

}


/* Auslesefunktionen */
function getAllReports() {
	var reportElements = _evaluate('//span[contains(@id, "labelText[")]');
	var reports = [];
	
	for(var x = 0; x < reportElements.length; x++) {
		var Report = new CReport;
		Report.name = reportElements[x].textContent;
		Report.id = reportElements[x].id.replace(/labelText\[(\d+)\]/, "$1");
		if(reportElements[x].parentNode.firstChild.nodeType == 1){
			if (reportElements[x].parentNode.firstChild.src.indexOf('green.png')>0) {Report.green = 1;};
			if (reportElements[x].parentNode.firstChild.src.indexOf('yellow.png')>0) {Report.yellow = 1;};
			if (reportElements[x].parentNode.firstChild.src.indexOf('red.png')>0) {Report.red = 1;};
			if (reportElements[x].parentNode.firstChild.src.indexOf('blue.png')>0) {Report.blue = 1;};
if (reportElements[x].parentNode.firstChild.nextSibling.nextSibling.nodeName != 'SPAN') {
if (reportElements[x].parentNode.firstChild.nextSibling.nextSibling.src.indexOf('max_loot/0.png')>0) {Report.empty = 1;};
}


		}
		else
		{
			Report.text = 1;
		}
		if (reportElements[x].parentNode.parentNode.parentNode.parentNode.innerHTML.indexOf('جديد') == -1) Report.read = 1;
		reports.push(Report);
		
	}
	
	return reports;
}

function getCurrentGroup() {
	return document.getElementsByTagName("strong")[0].textContent.replace(/^\s*|\&gt\;|\&lt\;|\s*$|>|</g, "");
}

function getGroupName() {
	var field = document.getElementById('groupname');
	
	if(field.value != '') {
		var groupname = field.value;
		GM_setValue('DSMoveReports_groupname', groupname);
	} else if(GM_getValue('DSMoveReports_groupname', 0) !== 0) {
		var groupname = GM_getValue('DSMoveReports_groupname');
	} else {
		var groupname = '';
	}
	
	field.value = groupname;
	return groupname;
}

function getKeyword() {
	var field = document.getElementById('keyword');
	
	if(field.value != '') {
		var keyword = field.value;
		GM_setValue('DSMoveReports_keyword', keyword);
	} else if(GM_getValue('DSMoveReports_keyword', 0) !== 0) {
		var keyword = GM_getValue('DSMoveReports_keyword');
	} else {
		var keyword = '';
	}
	
	field.value = keyword;
	return keyword;
}


/* Ausführende Funktionen */
function setCheck(rid) {
	document.getElementsByName('id_' + rid)[0].checked = true;
}

function removeCheck(rid) {
	document.getElementsByName('id_' + rid)[0].checked = false;
}

function selectGroup(groupname) {
	try {
		var options = document.getElementsByName("group_id")[0].getElementsByTagName("option");
		var selected = false;
		
		for(var x = 0; x < options.length; x++) {
			if(options[x].textContent == groupname) {
				options[x].selected = true;
				selected = true;
			}
		}
		
		return selected;
	} catch(e) {
		return false;
	}
}

function submit() {
	_evaluate('//input[@value="Verschieben"]')[0].click();
}



/* Hauptfunktionen */

function moveAll() {
	var reports = getAllReports();
	for(var x = 0; x < reports.length; x++) {
		setCheck(reports[x].id);
	}
	submit();
function moveEmpty() {
 var reports = getAllReports(); for(var x = 0; x < reports.length; x++) {
 if(reports[x].empty) {
 setCheck(reports[x].id);
 } else {
 removeCheck(reports[x].id);
 }
 }
 submit(); 
}

function moveGreen() {
	var reports = getAllReports();
	for(var x = 0; x < reports.length; x++) {
		if(reports[x].green) {
			setCheck(reports[x].id);
		} else {
			removeCheck(reports[x].id);
		}
	}
	submit();
}

function moveYellow() {
	var reports = getAllReports();
	for(var x = 0; x < reports.length; x++) {
		if(reports[x].yellow) {
			setCheck(reports[x].id);
		} else {
			removeCheck(reports[x].id);
		}
	}
	submit();
}

function moveRed() {
	var reports = getAllReports();
	for(var x = 0; x < reports.length; x++) {
		if(reports[x].red) {
			setCheck(reports[x].id);
		} else {
			removeCheck(reports[x].id);
		}
	}
	submit();
}

function moveBlue() {
	var reports = getAllReports();
	for(var x = 0; x < reports.length; x++) {
		if(reports[x].blue) {
			setCheck(reports[x].id);
		} else {
			removeCheck(reports[x].id);
		}
	}
	submit();
}

function moveOthers() {
	var reports = getAllReports();
	for(var x = 0; x < reports.length; x++) {
		if(reports[x].text) {
			setCheck(reports[x].id);
		} else {
			removeCheck(reports[x].id);
		}
	}
	submit();
}

function moveRead() {
	var reports = getAllReports();
	for(var x = 0; x < reports.length; x++) {
		if(reports[x].read) {
			setCheck(reports[x].id);
		} else {
			removeCheck(reports[x].id);
		}
	}
	submit();
}

function moveUnread() {
	var reports = getAllReports();
	for(var x = 0; x < reports.length; x++) {
		if(!reports[x].read) {
			setCheck(reports[x].id);
		} else {
			removeCheck(reports[x].id);
		}
	}
	submit();
}

function moveReports() {
	var groupname = getGroupName();
	var keyword = getKeyword();
	var reports = getAllReports();
	var regExpr = new RegExp(keyword, "i");
	var checks = 0;
	
	for(var x = 0; x < reports.length; x++) {
		if(reports[x].name.match(regExpr)) {
			setCheck(reports[x].id);
			checks++;
		} else {
			removeCheck(reports[x].id);
		}
	}

	var error = false;
	if(checks === 0) {
		var error = 'لا يوجد تقرير بي هدا الاسم \n \n \n \n';
	} else if(groupname === '') {
		var error = 'كنت لا تزال بحاجة إلى تحديد اسم المجموعة في التقارير التي ينبغي النقل لها !\n \n \n \n';
	} else if(getCurrentGroup() == groupname) {
		var error = 'تقارير هي بالفعل في المجموعة المحددة!\n \n \n \n';
	} else if(selectGroup(groupname) === false) {
		var error = 'يجب اختيار احدى اسماء  المجموعات الموجوده	 \n \n \n \n';
	}
	
	if(error === false) {
		submit();
	} else {
		window.alert(error);
		return false;
	}
}

function createPreferencesMenu() {
	var tabs = _evaluate('//a[.="نشر التقرير"]/parent::td/parent::tr/parent::tbody');
	
	var row = document.createElement("tr");
	tabs[tabs.length-1].appendChild(row);
	
	var cell = document.createElement("td");
	row.appendChild(cell);

	var span = document.createElement("span");
	span.style.fontSize = '1.0em';

	span.innerHTML += "الكلمة الرئيسية في البحث: <br />";
	
	
	var input = document.createElement("input");
	input.type = 'text';
	input.id = 'keyword';
	input.style.textAlign = 'center';
	span.appendChild(input);
	span.innerHTML += "<br />نقل الى المجموعه:<br />";
	
	var input = document.createElement("input");
	input.type = 'text';
	input.id = 'groupname';
	input.style.textAlign = 'center';
	span.appendChild(input);
	span.innerHTML += "<br />";
	span.style.fontSize = '1.0em';
	
	var button = document.createElement("button");
	button.innerHTML = "نقل تقارير";
	button.style.fontSize = '0.9em';
	button.addEventListener('click', moveReports, false);
	span.appendChild(button);
	
	
	
	var span1 = document.createElement("span");
	span1.style.fontSize = '1.0em';

	span1.innerHTML += "<br /><br /><a href=/></a><br /><br />التصنيف حسب :<br />";

	var button1 = document.createElement("button");
	button1.innerHTML = "اخضر";
	button1.style.fontSize = '0.9em';
	button1.addEventListener('click', moveGreen, false);
	span1.appendChild(button1);

	var button2 = document.createElement("button");
	button2.innerHTML = "اصفر";
	button2.style.fontSize = '0.9em';
	button2.addEventListener('click', moveYellow, false);
	span1.appendChild(button2);

	var button3 = document.createElement("button");
	button3.innerHTML = "احمر";
	button3.style.fontSize = '0.9em';
	button3.addEventListener('click', moveRed, false);
	span1.appendChild(button3);

	var button4 = document.createElement("button");
	button4.innerHTML = "ازرق";
	button4.style.fontSize = '0.9em';
	button4.addEventListener('click', moveBlue, false);
	span1.appendChild(button4);
	
	var button5 = document.createElement("button");
	button5.innerHTML = "ارسل";
	button5.style.fontSize = '0.9em';
	button5.addEventListener('click', moveOthers, false);
	span1.appendChild(button5);

	var button6 = document.createElement("button");
	button6.innerHTML = "قديم";
	button6.style.fontSize = '0.9em';
	button6.addEventListener('click', moveRead, false);
	span1.appendChild(button6);

	var button8 = document.createElement("button");
	button8.innerHTML = "جديد";
	button8.style.fontSize = '0.9em';
	button8.addEventListener('click', moveUnread, false);
	span1.appendChild(button8);

	var button7 = document.createElement("button");
	button7.innerHTML = "اختر الكل";
	button7.style.fontSize = '0.9em';
	button7.addEventListener('click', moveAll, false);
	span1.appendChild(button7);

 var button9 = document.createElement("button");
 button9.innerHTML = "يقرأ";
 button9.style.fontSize = '0.9em';
 button9.addEventListener('click', moveEmpty, false);
 span1.appendChild(button9); 
	

	

	cell.appendChild(span1);
	
	cell.appendChild(span);
	
	getGroupName();
	getKeyword();
}

(function DSMoveReports() {
	createPreferencesMenu();
//document.getElementsByName("group_id")[0].value = "400";

})();