// ==UserScript==
// @name            Travian: Center Numbers
// @autor           MeXaon (based travspeedster)
// @version         3
// @namespace       Travian
// @description     Travian: Village Center Numbers 3
// @include         http://*travian*/dorf2*
// @include	        http://*travian*/build.php?newdid*
// ==/UserScript==

// ›› Event listener starts things off once the page is done loading.

var tm_timeoutShow = 0;
var tm_timeoutHide = 0;
var tm_overUp = 0;

var _setValue, _getValue, _removeValue, glStorage, nameSpace = 'TM.';

function initSaveValue() {
	if (window.globalStorage) {
		glStorage = globalStorage.namedItem(nameSpace + document.domain)
		_setValue = function(name, value) {
			glStorage.setItem(name, value);
		};
		_getValue = function(name, defaultValue) {
			var data = glStorage.getItem(name);
			return (data) ? data.value : defaultValue;
		};
		_removeValue = function(name) {
			glStorage.removeItem(name);
		};
	} else if (typeof GM_setValue != "undefined") {
		_setValue = function(name, value) { GM_setValue(name, value)};
		_getValue = function(name,defaultValue) { return GM_getValue(name, defaultValue)};
		_removeValue = function(name) { GM_setValue(name, '')};
	} else {
		_setValue = function(name, value) {
			document.cookie = nameSpace + name + '=' + escape(value) + ';expires="";path=/';
		};
		_getValue = function(name, defaultValue) {
			var reg = new RegExp(nameSpace + name + "=([^;\n\r]*);?", "i");
			var data = reg.exec(document.cookie);
			if (data == null || data.length <= 1) {
			return defaultValue;	
			} else 	return unescape(data[1]);
		};
		_removeValue = function(name) {
			_setValue(name, '');
		};
	}
}
// ›› Set styles.
function init(){
	var cssString = '.TMbuildingtags{' +
		'background-color:#FDF8C1;' + 
		'border:thin solid #000000;' +
		'-moz-border-radius: 2em;' +
		'border-radius: 2em;' +
		'padding-top: 3px;' +
		'font-family: Verdana, Arial, Helvetica, sans-serif;' +
		'font-size:8pt;' +
		'font-weight:bold;' +
		'text-align:center;' +
		'position:absolute;' +
		'width:18px;' +
		'height:15px;' +
		'cursor:pointer;' +
		'visibility:hidden;' +
		'z-index:26;}' +
		'.tm_uplevel {' + 
			'background-color:#FDF8C1;' +
			'border:1px solid #000;' +
			'-moz-border-radius: 5px;' +
			'-moz-user-select:none;' +
			'padding: 0px;' +
			'font-size:10pt;' +
			'font-weight:bold;' +
			'text-align:center;' +
			'position: absolute;' +
			'width: 21px;' +
			'height: 18px;' +
			'cursor: pointer;' +
			'z-index: 100;}'
	GM_addStyle(cssString);
	initSaveValue();
	TM_ShowMainBuildingNumbers();
	GM_registerMenuCommand('Travian: Center Number - ' + (_getValue('tm_enable_upgrade', '1') == '1' ? 'use fast upgrade' : 'not use fast upgrade'), function(){if(_getValue('tm_enable_upgrade', '1') == '1') {_setValue('tm_enable_upgrade', '0')} else {_setValue('tm_enable_upgrade', '1')};window.location.reload()});
	if (_getValue('tm_enable_upgrade', '1') == '1') {
		var div = document.createElement('div');
		div.id = 'tm_uplevel';
		div.className = 'tm_uplevel';
		div. innerHTML = 'Up';
		div.style.display = 'none';
		div.addEventListener('mouseover', function() {tm_overUp = 1}, false);
		div.addEventListener('mouseout', function() {tm_overUp = 0;$('tm_uplevel').style.display = 'none'}, false);
		div.addEventListener('click', function () {myajax(this.getAttribute('msg'), upgradeBuilding); this.style.display = 'none'}, false);
		$('lmid2').appendChild(div);
	}
}

// ›› Main.
function TM_ShowMainBuildingNumbers(){

	// ›› Map1 holds building names, level and building spot IDs in area elements (2 are duplicate walls to be ignored).
	var map1Element = document.getElementsByName('map1')[0];
	if (map1Element){
	
		// ›› Map1 ONLY has area children. 
		var areaElements = map1Element.childNodes;	
		var BuildingLevel, smallDIV, coords;
		var BuildingURL = new Array(21);

		for (var i = 0; i < 22; i++) {
			BuildingLevel = /(\d+)/.exec(areaElements[i].getAttribute("title"));
			BuildingURL = areaElements[i].getAttribute("href");
			coords = areaElements[i].coords.split(',');
			
//			GM_log('BuildingLevel="' + BuildingLevel  + '" BuildingURL="' + BuildingURL + '"');

			// ›› Only show spots with buildings on them.
			if (BuildingLevel){
				var imgId = parseInt(BuildingURL.match(/id\=(\d+)/).pop()) - 18;
				if (imgId == 21) imgId = 'x1';
//				GM_log(BuildingURL + ' ' + imgId);
				if (imgId == 22) {
					gid = 100;
				} else {
					var gid = document.evaluate('//img[@class="d' + imgId + '"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.getAttribute('src').match(/g(\d+)/).pop();
				}
//				GM_log('gid=' + gid);
				smallDIV = addDiv('TMbuildingtag' + i,'TMbuildingtags',BuildingLevel[0],false);
				smallDIV.style.top = parseInt(coords[1]) + parseInt(60) + 'px';
				smallDIV.style.left = parseInt(coords[0]) + parseInt(95) + 'px';
				smallDIV.style.visibility = "visible";
//				GM_log('BuildingLevel=' + BuildingLevel + ' getMaxLevel(gid)=' + getMaxLevel(gid));
				if (BuildingLevel[0] == getMaxLevel(gid)) {
					smallDIV.style.backgroundColor = '#0e0';
				} else {
					if (_getValue('tm_enable_upgrade', '1') == '1') {
						areaElements[i].addEventListener('mouseover', function (ev) {tm_timeoutShow = setTimeout(overArea, 2000, ev)}, false);
						areaElements[i].addEventListener('mouseout', function () {clearTimeout(tm_timeoutShow);setTimeout(outArea, 500)}, false);
					} // if
				} // else if
			} // if
		} // for
	} // if
} // function

// ›› Adds a generic div.
function addDiv(id,style,html,parent){
	var body, div;
	if (!parent){body = document.getElementsByTagName('body')[0];}else{body = document.getElementsByTagName(parent);}
	if (!body) { return false; }
//	anchor = document.createElement('a')
	div = document.createElement('div');
	div.id = id;
	div.className = style;
	if (html){div.innerHTML = html;}
//	anchor.appendChild(div);
	document.getElementById('lmid2').appendChild(div);
	return div;
}

function getMaxLevel(gid) {
	var maxLevel;
	switch (gid) {
		case '5':
		case '6':
		case '7':
		case '8':
		case '9':
			maxLevel = 5;
			break;
		case '23':
		case '27':
			maxLevel = 10;
			break;
		case '40':
			maxLevel = 100;
			break;
		default:
			maxLevel = 20;
	}
	return (maxLevel)
}

function overArea(ev){
//	GM_log('+overArea');
	if (!tm_timeoutShow) return;
	var obj = ev.target;
	var coords = obj.coords.split(',');
	$('tm_uplevel').style.left = parseInt(coords[0]) + 78 + 'px';
	$('tm_uplevel').style.top  = parseInt(coords[1]) + 46 + 'px';
	$('tm_uplevel').style.display = '';
	$('tm_uplevel').setAttribute('msg', obj.href);
}

function outArea(){
//	GM_log('+outArea');
	if (tm_overUp != 1) $('tm_uplevel').style.display = 'none';
}

function $(name) { return document.getElementById(name) }

function myajax(url1, onfunc){
//	_log('+myajax\nParam: url='+url1);
	var g = new XMLHttpRequest();
	g.onreadystatechange=function(){
		if(g.readyState==4&&g.status==200){
			onfunc(g);
		};
	};
	g.open("GET",url1,true);
	g.send(null);
//	_log('-myajax');
}

function upgradeBuilding(z) {
	var ans = document.createElement('DIV');
	ans.innerHTML = z.responseText;
	var ansdoc = document.implementation.createDocument("", "", null);
	ansdoc.appendChild(ans);
	var link = ansdoc.evaluate('//a[starts-with(@href, "dorf2.php?a=")]', ans, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
//	GM_log(link);
	if(link) {
//		GM_log(link.nodeName + ' ' + link.href);
		myajax(link.href, function(){window.location.reload()});
	} else {
		err = ansdoc.evaluate('//span[@class="c"]', ans, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
		alert(err.innerHTML);
	}
}

init();