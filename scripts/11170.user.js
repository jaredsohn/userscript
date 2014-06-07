// --------------------------------------------------------------------
//
// Version 1.0.0
// 2007-08-05
// Copyright (c) 2007, J. S. Liang @ NCTU, Taiwan
// juishanliang.cs95[at]nctu.edu.tw
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://www.greasespot.net/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Travian Selling Assistant", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name		Travian Selling Assistant
// @description	Enhance the selling page of marketplace in Travian.
// @include		http://*.travian.*/build.php*
// ==/UserScript==

var LANG_ZH = new Array();
LANG_ZH['CPCTY1'] = '單位商人運載量: ';
LANG_ZH['CPCTY2'] = '使用預設值 ';
LANG_ZH['CPCTY3'] = '自訂 ';
LANG_ZH['RECORD1'] = '儲存過去最新 ';
LANG_ZH['RECORD2'] = ' 筆紀錄。';
LANG_ZH['DELETE'] = '刪除';
LANG_ZH['LUMBER'] = '木材';
LANG_ZH['CLAY'] = '磚塊';
LANG_ZH['IRON'] = '鋼鐵';
LANG_ZH['CROP'] = '穀物';
LANG_ZH['OFFER'] = '提供';
LANG_ZH['SEARCH'] = '搜尋';
LANG_ZH['MAXTIME'] = '單向運輸時間(小時)';
LANG_ZH['ALLIANCE'] = '聯盟';
LANG_ZH['UNLIMITED'] = '無上限';
LANG_ZH['YES'] = '是';
LANG_ZH['NO'] = '否';

var LANG_EN = new Array();
LANG_EN['CPCTY1'] = 'Each merchant can carry: ';
LANG_EN['CPCTY2'] = 'Default value';
LANG_EN['CPCTY3'] = 'Customize ';
LANG_EN['RECORD1'] = 'Save the latest ';
LANG_EN['RECORD2'] = ' records.';
LANG_EN['DELETE'] = 'Delete';
LANG_EN['LUMBER'] = 'Lumber';
LANG_EN['CLAY'] = 'Clay';
LANG_EN['IRON'] = 'Iron';
LANG_EN['CROP'] = 'Crop';
LANG_EN['OFFER'] = 'Offering';
LANG_EN['SEARCH'] = 'Searching';
LANG_EN['MAXTIME'] = 'Max Time';
LANG_EN['ALLIANCE'] = 'Alliance';
LANG_EN['UNLIMITED'] = 'Unlimited';
LANG_EN['YES'] = 'Yes';
LANG_EN['NO'] = 'No';

var LANG = LANG_EN;

function mainFunction(e) {
	if (location.href.match(/build.php/)) {
		if (location.href.indexOf('build.php?') != -1) {
			var cpcty = document.evaluate("//p//b", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
			var check = document.evaluate("//input[@name='dname']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0);

			if (cpcty != null && check != null) { setCookie('cpcty',cpcty.innerHTML); }
		}

		var check = document.evaluate("//input[@type='hidden' and @name='t' and @value='2']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0);
		
		if (location.href.match(/build.php\?(.*)&t=2/) || check != null) {
			var form = document.getElementsByName('id')[0].parentNode;
			var rName = [LANG['LUMBER'],LANG['CLAY'],LANG['IRON'],LANG['CROP']];

			//Option Panel
			var cpcty = getCookie('cpcty',0);
			
			var select1 = document.getElementsByName('rid1')[0];
			var select2 = document.getElementsByName('rid2')[0];
			var textbox1 = document.getElementsByName('m1')[0];
			var textbox2 = document.getElementsByName('m2')[0];
			var td1 = document.createElement('td');
			var td2 = document.createElement('td');

			var inputCpcty = document.createElement('input');
			inputCpcty.value = cpcty==0?500:cpcty;
			inputCpcty.disabled = true;
			inputCpcty.size = 4;
			inputCpcty.addEventListener('keyup', function(){ setCookie('cpcty',this.value); cpcty = this.value; refreshOptionPanel(); }, false);

			var radioDefault = newRadioInput('radioDefault',1,true);
			var radioCustomize = newRadioInput('radioDefault',0,false);
			var setCpctyBar = document.createElement('span');

			radioDefault.addEventListener('click', function(){ inputCpcty.disabled = true; }, false);
			radioCustomize.addEventListener('click', function(){ inputCpcty.disabled = false; }, false);

			setCpctyBar.appendChild(document.createTextNode(LANG['CPCTY1']));
			setCpctyBar.appendChild(radioDefault);
			setCpctyBar.appendChild(document.createTextNode(LANG['CPCTY2']));
			setCpctyBar.appendChild(radioCustomize);
			setCpctyBar.appendChild(document.createTextNode(LANG['CPCTY3']));
			setCpctyBar.appendChild(inputCpcty);
			form.parentNode.insertBefore(setCpctyBar, form);

			refreshOptionPanel();

			select1.parentNode.parentNode.insertBefore(td1, select1.parentNode.nextSibling);
			select2.parentNode.parentNode.insertBefore(td2, select2.parentNode.nextSibling);
			
			//Stored Records
			var inputMax = document.createElement('input');
			inputMax.type = 'text';
			inputMax.name = 'recMax';
			inputMax.value = getCookie('recMax',5);
			inputMax.setAttribute('size','2');
			inputMax.setAttribute('class','fm');
			
			var maximumBar = document.createElement('p');
			maximumBar.appendChild(document.createTextNode(LANG['RECORD1']));
			maximumBar.appendChild(inputMax);
			maximumBar.appendChild(document.createTextNode(LANG['RECORD2']));
			
			var place = document.getElementsByName('s1')[0];
			place.parentNode.insertBefore(maximumBar,place.nextSibling);
				
			form.addEventListener('submit', function(){
				var datum = '';
				datum = datum + document.getElementsByName('m1')[0].value + ',';
				datum = datum + document.getElementsByName('rid1')[0].value + ',';
				datum = datum + document.getElementsByName('m2')[0].value + ',';
				datum = datum + document.getElementsByName('rid2')[0].value + ',';
				datum = datum + document.getElementsByName('d1')[0].checked + ',';
				datum = datum + document.getElementsByName('d2')[0].value + ',';
				datum = datum + document.getElementsByName('ally')[0].checked;
				
				if (getCookie('record','') != '') {
					var data = getCookie('record','').split(';');
					if (data.length == 5) data.pop();
				} else var data = new Array();
				data.unshift(datum);
				setCookie('record',data.join(';'));
				
				return true;
			}, false);
			
			var data = getCookie('record','').split(';');
			if (data.length > 0 && data[0] != '') {
				var recordTable = document.createElement('table');
				recordTable.setAttribute('bgcolor','#C0C0C0');
				recordTable.setAttribute('cellspacing',1);
				recordTable.setAttribute('cellpadding',2);
				recordTable.setAttribute('class','tbg');
				var recordTr = document.createElement('tr');
				recordTr.setAttribute('class','rbg');
				recordTr.setAttribute('align','center');
				var recordTd0 = document.createElement('td');
				var recordTd1 = document.createElement('td');
				var recordTd2 = document.createElement('td');
				var recordTd3 = document.createElement('td');
				var recordTd4 = document.createElement('td');
				recordTd1.innerHTML = '<b>' + LANG['OFFER'] + '</b>';
				recordTd2.innerHTML = '<b>' + LANG['SEARCH'] + '</b>';
				recordTd3.innerHTML = '<b>' + LANG['MAXTIME'] + '</b>';
				recordTd4.innerHTML = '<b>' + LANG['ALLIANCE'] + '</b>';
				recordTr.appendChild(recordTd0);
				recordTr.appendChild(recordTd1);
				recordTr.appendChild(recordTd2);
				recordTr.appendChild(recordTd3);
				recordTr.appendChild(recordTd4);
				recordTable.appendChild(recordTr);
				
				for (var i=0;i < getCookie('recMax',5) && i < data.length;i++) {
					var imgDel = document.createElement('img');
					imgDel.src = 'http://img.travian.com/hki/img/un/a/del.gif';
					imgDel.width = 12;
					imgDel.height = 12;
					imgDel.setAttribute('border',0);
					imgDel.setAttribute('alt',LANG['DELETE']);
					imgDel.setAttribute('title',LANG['DELETE']);
					imgDel.setAttribute('list',i);
					imgDel.style.cursor = 'pointer';
					imgDel.addEventListener('click', function(){
						var list = this.getAttribute('list');
						recordTable.removeChild(this.parentNode.parentNode);
						
						var data = getCookie('record','').split(';');
						data.splice(this.getAttribute('list'),1);
						if (data.length > 0) setCookie('record',data.join(';'));
						else {
							setCookie('record','');
							recordTable.parentNode.removeChild(recordTable);
						}
					}, false);
					
					var datum = data[i].split(',');
					var m1 = datum[0];
					var rid1 = datum[1];
					var m2 = datum[2];
					var rid2 = datum[3];
					var d1 = datum[4]=='true'?true:false;
					var d2 = datum[5];
					var ally = datum[6]=='true'?true:false;
					
					var recordTr = document.createElement('tr');
					recordTr.setAttribute('bgcolor','#FFFFFF');
					recordTr.setAttribute('align','center');
					var recordTd0 = document.createElement('td');
					var recordTd1 = document.createElement('td');
					var recordTd2 = document.createElement('td');
					var recordTd3 = document.createElement('td');
					var recordTd4 = document.createElement('td');
					recordTd0.appendChild(imgDel);
					recordTd1.appendChild(imgUn(rid1));
					recordTd1.innerHTML = recordTd1.innerHTML + ' ' + m1;
					recordTd2.appendChild(imgUn(rid2));
					recordTd2.innerHTML = recordTd2.innerHTML + ' ' + m2;
					recordTd3.innerHTML = d1?d2:LANG['UNLIMITED'];
					recordTd4.innerHTML = ally?LANG['YES']:LANG['NO'];
					
					recordTr.appendChild(recordTd0);
					recordTr.appendChild(recordTd1);
					recordTr.appendChild(recordTd2);
					recordTr.appendChild(recordTd3);
					recordTr.appendChild(recordTd4);
					recordTr.style.cursor = 'pointer';
					
					recordTr.setAttribute('m1',m1);
					recordTr.setAttribute('rid1',rid1);
					recordTr.setAttribute('m2',m2);
					recordTr.setAttribute('rid2',rid2);
					recordTr.setAttribute('d1',d1);
					recordTr.setAttribute('d2',d2);
					recordTr.setAttribute('ally',ally);
					
					recordTr.addEventListener('mouseover', function(){ this.setAttribute('class','cbg1'); }, false);
					
					recordTr.addEventListener('mouseout', function(){ this.removeAttribute('class'); }, false);
					
					recordTr.addEventListener('click', function(){
						document.getElementsByName('m1')[0].value = this.getAttribute('m1');
						document.getElementsByName('m2')[0].value = this.getAttribute('m2');

						refreshSelect(select1,this.getAttribute('rid1'))
						refreshSelect(select2,this.getAttribute('rid2'))

						document.getElementsByName('d2')[0].value = this.getAttribute('d2');
						if (this.getAttribute('d1') == 'true') document.getElementsByName('d1')[0].setAttribute('checked','checked'); else document.getElementsByName('d1')[0].removeAttribute('checked');
						if (this.getAttribute('ally') == 'true') document.getElementsByName('ally')[0].setAttribute('checked','checked'); else document.getElementsByName('ally')[0].removeAttribute('checked');
					}, false);
					
					recordTable.appendChild(recordTr);
				}
				
				place.parentNode.insertBefore(recordTable,maximumBar.nextSibling);
				place.parentNode.insertBefore(document.createElement('p'),recordTable.nextSibling);
			}
		}
	}
	
	//Option Panel Functions
	function changeInput(select,input,v,upperBound) {
		return function(){
			if (input.value != '') var v1 = parseInt(input.value); else var v1 = 0;
			var v2 = parseInt(v);
			var sum = v1 + v2;
			
			if (upperBound) {
				var max = parseInt(document.getElementById('l' + select.value).innerHTML.split('/')[0]);
				if (sum <= max) input.value = sum;
			} else {input.value = sum;}
		}
	}
	
	function newOptionPanel(cpcty,select,input,upperBound) {
		var options = new Array();
		if (cpcty == 0){
			options = [100, 250, 500, 1000];
		} else {
			for (var i=0;i<4;i++) options[i] = cpcty*(i+1);
		}
		var optionPanel = document.createElement('nobr');
		for (var i=0;i<4;i++) {
			var link = document.createElement('a');
			link.setAttribute('class','f8'); 
			link.href = "javascript:void(0)";
			link.innerHTML = '(' + options[i] + ')';
			link.addEventListener('click', changeInput(select,input,options[i],upperBound), false);
			optionPanel.appendChild(link);
		}
		return optionPanel;
	}

	function newRadioInput(name,value,checked,enabled) {
		var myRadioInput = document.createElement('input');

		myRadioInput.type = 'radio';
		myRadioInput.name = name;
		myRadioInput.value = value;

		if (checked) {
			myRadioInput.setAttribute('checked','checked');
		} else {
			myRadioInput.removeAttribute('checked');
		}

		return myRadioInput;
	}

	function refreshOptionPanel() {
		td1.innerHTML = '';
		td2.innerHTML = '';
		td1.appendChild(newOptionPanel(cpcty,select1,textbox1,true));
		td2.appendChild(newOptionPanel(cpcty,select2,textbox2,false));
	}
	
	//Stored Record Functions
	function imgUn(rid) {
		var img = document.createElement('img');
		img.src = 'http://img.travian.com/hki/img/un/r/' + rid + '.gif';
		img.width = 18;
		img.height = 12;
		return img;
	}

	function refreshSelect(select,rid) {
		if (select.value != rid) {
			for (var i=0;i<select.childNodes.length;i++) {
				if (select.childNodes[i].value != undefined) {
					if (select.childNodes[i].value == rid) select.value = rid;
				}
			}
		}
	}

	//COOKIE functions
	function setCookie(c_name,value) {
		var exdate=new Date();
		var expiredays=365;
		exdate.setDate(exdate.getDate()+expiredays);
		document.cookie=c_name+ "=" + escape(value)+ ((expiredays==null) ? "" : ";expires=" + exdate.toGMTString())
	}
	
	function getCookie(c_name,defaultVal) {
		if (document.cookie.length>0) {
			c_start=document.cookie.indexOf(c_name + "=");
			if (c_start!=-1) {
				c_start=c_start + c_name.length+1;
				c_end=document.cookie.indexOf(";",c_start);
				if (c_end==-1) c_end=document.cookie.length;
				return unescape(document.cookie.substring(c_start,c_end));
			} 
		}
		return defaultVal;
	}
}

// GreaseMonkey executes his scripts in the DOMContentLoaded event, reason why it is possible to be executed directly,
// It operates on the contrary needs to add the function to this event
window.addEventListener('DOMContentLoaded', mainFunction, false);
if (document.body) mainFunction();