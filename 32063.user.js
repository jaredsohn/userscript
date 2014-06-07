// ==UserScript==
// @name	Travian Village Center Numbers .1
// @namespace	Travian
// @author updated by bluelovers
// @description	Shows the current level of your buildings on the Village Center page. updated by  by bluelovers
// @include	http://*travian*/dorf2*
// @include	http://*travian*/dorf1*
// @exclude *.css
// @exclude *.js
// ==/UserScript==

// ›› Event listener starts things off once the page is done loading.
//window.addEventListener("load", init, false);

var tm_timeoutShow = 0;
var tm_timeoutHide = 0;
var tm_overUp = 0;

	var XPFirst = XPathResult.FIRST_ORDERED_NODE_TYPE;		// Constante que devuelve el primer elemento por XPath
	var XPList  = XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE;		// Constante que devuelve una lista de elementos por XPath
	var XPIter  = XPathResult.UNORDERED_NODE_ITERATOR_TYPE;		// Constante que deuvelve un iterador de elementos por XPath

// ›› Set styles.
function init(){
	var cssString = '.TMbuildingtags{' +
		'background-color:#FDF8C1;' +
		'border:thin solid #000000;' +

		'padding: 1px 1px 1px 0px;' +
		'padding-right: 1px;' +

		'-moz-border-radius: 5px;' +
		'-moz-user-select:none;' +

		'font-family: Verdana, Arial, Helvetica, sans-serif !important;' +
		'font-size:8pt;' +
		'font-weight:bold;' +
		'text-align:center;' +
		'position:absolute;' +
		'width:21px;' +
		'height:14px;' +
		'cursor:pointer;' +
		'visibility:hidden;' +
		'z-index:50;}' +

		'#QPD1BL{' +
			'position:absolute;' +
			'top:71px;' +
			'left:13px;' +
			'z-index:20;}' +

		'.QPdorf1BuildingLevel{' +
			'opacity:0.35;' +
			'-moz-border-radius:4.5em;' +
			'border-radius:4em;' +
			'width:22px;' +
			'height:20px;' +
			'cursor: pointer;' +
//			'visibility:hidden;' +
			'z-index:50;}' +

		'.tm_uplevel {' +
			'background-color: Magenta;' +
			'border:1px solid #000;' +
			'color: #FFFFFF;' +
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
			'font-family: Arial,Helvetica,sans-serif !important;' +
			'z-index: 100;}'
		;
//	addCSS(cssString);

	GM_addStyle(cssString);

	initSaveValue();

	if (location.href.indexOf('dorf1') != -1)		transformPageDorf1_addColorsToResourceFieldsLevels();
	if (location.href.indexOf('dorf2') != -1)		TM_ShowMainBuildingNumbers();;

	if (_getValue('tm_enable_upgrade', '1') != '0') {
		var div = document.createElement('div');
			div.id = 'tm_uplevel';
			div.className = 'tm_uplevel';
			div.innerHTML = 'Up';
			div.title = '升級此項目';
			div.style.display = 'none';
			div.addEventListener('mouseover', function() {tm_overUp = 1}, false);
			div.addEventListener('mouseout', function() {tm_overUp = 0;$('tm_uplevel').style.display = 'none'}, false);
			div.addEventListener('click', function () {myajax(this.getAttribute('msg'), upgradeBuilding); this.style.display = 'none'}, false);

			if (location.href.indexOf('dorf1') != -1) div.setAttribute('dorf1', true);

			$('lmid2').appendChild(div);
	}

	GM_registerMenuCommand('Travian: Center Number - ' + (_getValue('tm_enable_upgrade', '1') == '1' ? 'use fast upgrade' : 'not use fast upgrade'), function(){if(_getValue('tm_enable_upgrade', '1') == '1') {_setValue('tm_enable_upgrade', '0')} else {_setValue('tm_enable_upgrade', '1')};window.location.reload()});
}

function getActiveDid()
{
	var ex = "//a[contains(@href,'newdid')][@class='active_vl']";
	tag = document.evaluate(
		ex,
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);

	if (tag.snapshotLength)
	{
		temp = tag.snapshotItem(0).href.split("?")[1].split('&');
		return '&' + temp[0];
	}else{
//		errorMsg(text[27]);
		return "";
	}
}

function xpath(xp)
{
    return document.evaluate(xp, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

/**
* xpathEvaluate Finds nodes in the HTML DOM using XPath expression.
* @param {String} xpathExpr XPath expression to be evaluated and found in the document.
* @return Node iterator with the nodes that obey the XPath expression.
*/
function xpathEvaluate(xpathExpr) {
	return document.evaluate(xpathExpr, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
}


/**
* xpathEvaluate Finds nodes in the HTML DOM using XPath expression.
* @param {Node} context Node from where to search.
* @param {String} xpathExpr XPath expression to be evaluated and found in the document.
* @return Node iterator with the nodes that obey the XPath expression.
*/
function xpathEvaluateInContext(context, xpathExpr) {
	return document.evaluate(xpathExpr, context, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
}

function createElementAppend(newElementTag, parentElement) {
	var newElement = document.createElement(newElementTag);
	parentElement.appendChild(newElement);
	return newElement;
}

function createElemAppendAndSetInner(newElementTag, parentElement, innerHTM) {
	var newElement = createElementAppend(newElementTag, parentElement);
	newElement.innerHTML = innerHTM;
	return newElement;
}

function transformPageDorf1_addColorsToResourceFieldsLevels() {

	var x = 25;
	var y = 60;

	var divF = xpathEvaluate('//div[@id="lmid2"]/div[contains(@id, "f")]').snapshotItem(0);
	var villageTypeNumber = parseInt(divF.id.substr(1));

	var resourceLevels = xpathEvaluate('//div[@id="lmid2"]/div[contains(@id, "f")]/img');
	var resourceAreas = xpathEvaluate('//div[@id="lmid2"]/map/area');

	var dorf1Info = "" + villageTypeNumber;
	// go through all 18 fields

	var positioningDIV = addDiv('QPD1BL', '', '', "lmid2");

	var len=resourceAreas.snapshotLength;
	var rfnum=0;
	var resLevel=-1;
	var currentResource;
	var maxLevel = 0;

//	for(var pos=1, i=0, len=resourceLevels.snapshotLength, rfnum=0, resLevel=-1; pos<19; pos++) {
	for(var i=0; i<18; i++) {

		currentArea = resourceAreas.snapshotItem(i);

		pos = (i + 1);

		// get the level of the current field
		if (i < len && i < 18 && resourceLevels.snapshotItem(i)) {
			currentResource = resourceLevels.snapshotItem(i);
   			rfnum = parseInt(currentResource.className.substr(2));
			// if the current position is the next image
			if (rfnum == pos) {
				resLevel = currentResource.src;
				resLevel = parseInt(resLevel.substring(resLevel.lastIndexOf("/") + 2, resLevel.lastIndexOf(".")));
//				i++;
			} else {
				resLevel = 0;
			}
		} else {
			resLevel = 0;
		}

		maxLevel = resLevel > maxLevel ? resLevel : maxLevel;

//		var resLink = createElementAppend('a', positioningDIV);
//		resLink.href = "build.php?id=" + pos;
//		resLink.id = "QPD1L"+pos;
//		resLink.className = "rf"+pos;
		var DIV = addDiv('', "rf"+pos+' QPdorf1BuildingLevel', " ", 'QPD1BL');

		if (0 && resLevel == 10 && maxLevel <= 10) {
//			DIV.style.visibility = "visible";
			DIV.style.backgroundColor = '#0e0';
		} else if (1 || resLevel > 0) {
//			DIV.style.visibility = "visible";

			if (resLevel > 10) {
				DIV.style.backgroundColor = 'red';
			} else if (resLevel == 10) {
				DIV.style.backgroundColor = '#0e0';
			} else if (resLevel == 20) {
				DIV.style.backgroundColor = 'blue';
			}

			DIV.setAttribute('href', currentArea.getAttribute('href'));
			DIV.setAttribute('title', currentArea.getAttribute('title'));

			DIV.setAttribute('coords', currentArea.getAttribute('coords'));
//			resLink.setAttribute('coords', currentArea.getAttribute('coords'));

			currentArea.setAttribute('dorf1', true);
			DIV.setAttribute('dorf1', true);
//			resLink.setAttribute('dorf1', true);

			currentArea.addEventListener('mouseover', function (ev) {tm_timeoutShow = setTimeout(overArea, 1500, ev)}, false);
			currentArea.addEventListener('mouseout', function () {clearTimeout(tm_timeoutShow);setTimeout(outArea, 500)}, false);

			DIV.addEventListener('mouseover', function (ev) {tm_timeoutShow = setTimeout(overArea, 1500, ev)}, false);
			DIV.addEventListener('mouseout', function () {clearTimeout(tm_timeoutShow);setTimeout(outArea, 500)}, false);

			DIV.addEventListener('click', function (event) {
				if(event.srcElement) event = event.srcElement; else event = event.target;

				window.location.href = event.getAttribute('href');
			}, false);

//			resLink.addEventListener('mouseover', function (ev) {tm_timeoutShow = setTimeout(overArea, 500, ev)}, false);
//			resLink.addEventListener('mouseout', function () {clearTimeout(tm_timeoutShow);setTimeout(outArea, 500)}, false);
		}
	}

//	alert(currentArea.getAttribute('coords'));
}

//›› Main.
function TM_ShowMainBuildingNumbers(){
	// ›› x and y offset in pixels added to every absolutely positioned style element
	var x = 152;
	var y = 160;
//	var x = 25;
//	var y = 60;

	// ›› could get this from the styles, but hard coding them is faster and allows for a simpler loop
	buildArr1 = new Array(21);
	buildArr1[0] = 318 + x;
	buildArr1[1] = 121 + x;
	buildArr1[2] = 204 + x;
	buildArr1[3] = 264 + x;
	buildArr1[4] = 338 + x;
	buildArr1[5] = 394 + x;
	buildArr1[6] = 86 + x;
	buildArr1[7] = 167 + x;
	buildArr1[8] = 253 + x;
	buildArr1[9] = 401 + x;
	buildArr1[10] = 72 + x;
	buildArr1[11] = 198 + x;
	buildArr1[12] = 161 + x;
	buildArr1[13] = 408 + x;
	buildArr1[14] = 90 + x;
	buildArr1[15] = 233 + x;
	buildArr1[16] = 360 + x;
	buildArr1[17] = 164 + x;
	buildArr1[18] = 292 + x;
	buildArr1[19] = 150 + x;
	buildArr1[20] = 266 + x;
	buildArr1[21] = 290 + x;

	buildArr2 = new Array(21);
	buildArr2[0] = 166 + y;
	buildArr2[1] = 82 + y;
	buildArr2[2] = 57 + y;
	buildArr2[3] = 47 + y;
	buildArr2[4] = 62 + y;
	buildArr2[5] = 111 + y;
	buildArr2[6] = 121 + y;
	buildArr2[7] = 128 + y;
	buildArr2[8] = 111 + y;
	buildArr2[9] = 152 + y;
	buildArr2[10] = 191 + y;
	buildArr2[11] = 156 + y;
	buildArr2[12] = 182 + y;
	buildArr2[13] = 210 + y;
	buildArr2[14] = 230 + y;
	buildArr2[15] = 226 + y;
	buildArr2[16] = 243 + y;
	buildArr2[17] = 266 + y;
	buildArr2[18] = 260 + y;
	buildArr2[19] = 297 + y;
	buildArr2[20] = 306 + y;
	buildArr2[21] = 356 + y;

	// ›› Map1 holds building names, level and building spot IDs in area elements (2 are duplicate walls to be ignored).
	var map1Element = document.getElementsByName('map1')[0];
	if (map1Element){

		// ›› Map1 ONLY has area children.
//		var areaElements = map1Element.childNodes;
		var areaElements = map1Element.getElementsByTagName('area');
		var BuildingLevel, smallDIV, coords;
		var BuildingURL = new Array(21);

		for (var i = 0; i < 22; i++) {
			BuildingLevel = /(\d+)/.exec(areaElements[i].getAttribute("title"));
			BuildingURL = areaElements[i].getAttribute("href");

			coords = areaElements[i].coords.split(',');

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

				smallDIV = addDiv('TMbuildingtag' + i, 'TMbuildingtags', BuildingLevel[0], false);
				smallDIV.style.top = buildArr2[i] + 'px';
				smallDIV.style.left = buildArr1[i] + 'px';

//				var coords = areaElements[i].getAttribute('coords').split(',');
//				smallDIV.style.top = parseInt(coords[1]) + parseInt(60) + 'px';
//				smallDIV.style.left = parseInt(coords[0]) + parseInt(95) + 'px';

				smallDIV.setAttribute('title', areaElements[i].getAttribute('title'));
				smallDIV.setAttribute('coords', areaElements[i].getAttribute('coords'));
				smallDIV.setAttribute('href', areaElements[i].getAttribute('href'));

				if (gid == 100) {
					smallDIV.setAttribute('coords', (buildArr1[i] - x - 68) + ',' + (buildArr2[i] - y + 5));
//					alert(areaElements[i].getAttribute('title'));
				}

				smallDIV.style.visibility = "visible";
				smallDIV.setAttribute('goto', BuildingURL);
				smallDIV.addEventListener('click', function() {
					window.location.href = this.getAttribute('goto');
					}, true);

				if (BuildingLevel[0] == getMaxLevel(gid)) {
					smallDIV.style.backgroundColor = '#0e0';
				} else {
					if (_getValue('tm_enable_upgrade', '1') != '0') {

						smallDIV.addEventListener('mouseover', function (ev) {tm_timeoutShow = setTimeout(overArea, 1500, ev)}, false);
						smallDIV.addEventListener('mouseout', function () {clearTimeout(tm_timeoutShow);setTimeout(outArea, 500)}, false);

						areaElements[i].addEventListener('mouseover', function (ev) {tm_timeoutShow = setTimeout(overArea, 1500, ev)}, false);
						areaElements[i].addEventListener('mouseout', function () {clearTimeout(tm_timeoutShow);setTimeout(outArea, 500)}, false);
					}
				}
			}
		}
	}
}

//function TM_ShowMainBuildingNumbers(){
//
//	// ›› x and y offset in pixels added to every absolutely positioned style element
////	var x = 152;
////	var y = 160;
//	var x = 25;
//	var y = 60;
//
//	// ›› could get this from the styles, but hard coding them is faster and allows for a simpler loop
//	buildArr1 = new Array(21);
//	buildArr1[0] = 318 + x;
//	buildArr1[1] = 121 + x;
//	buildArr1[2] = 204 + x;
//	buildArr1[3] = 264 + x;
//	buildArr1[4] = 338 + x;
//	buildArr1[5] = 394 + x;
//	buildArr1[6] = 86 + x;
//	buildArr1[7] = 167 + x;
//	buildArr1[8] = 253 + x;
//	buildArr1[9] = 401 + x;
//	buildArr1[10] = 72 + x;
//	buildArr1[11] = 198 + x;
//	buildArr1[12] = 161 + x;
//	buildArr1[13] = 408 + x;
//	buildArr1[14] = 90 + x;
//	buildArr1[15] = 233 + x;
//	buildArr1[16] = 360 + x;
//	buildArr1[17] = 164 + x;
//	buildArr1[18] = 292 + x;
//	buildArr1[19] = 150 + x;
//	buildArr1[20] = 266 + x;
//	buildArr1[21] = 290 + x;
//
//	buildArr2 = new Array(21);
//	buildArr2[0] = 166 + y;
//	buildArr2[1] = 82 + y;
//	buildArr2[2] = 57 + y;
//	buildArr2[3] = 47 + y;
//	buildArr2[4] = 62 + y;
//	buildArr2[5] = 111 + y;
//	buildArr2[6] = 121 + y;
//	buildArr2[7] = 128 + y;
//	buildArr2[8] = 111 + y;
//	buildArr2[9] = 152 + y;
//	buildArr2[10] = 191 + y;
//	buildArr2[11] = 156 + y;
//	buildArr2[12] = 182 + y;
//	buildArr2[13] = 210 + y;
//	buildArr2[14] = 230 + y;
//	buildArr2[15] = 226 + y;
//	buildArr2[16] = 243 + y;
//	buildArr2[17] = 266 + y;
//	buildArr2[18] = 260 + y;
//	buildArr2[19] = 297 + y;
//	buildArr2[20] = 306 + y;
//	buildArr2[21] = 356 + y;
//
//	// ›› Map1 holds building names, level and building spot IDs in area elements (2 are duplicate walls to be ignored).
//	var map1Element = document.getElementsByName('map1')[0];
//	if (map1Element){
//
//		// ›› Map1 ONLY has area children.
//		var areaElements = map1Element.getElementsByTagName('area');
//		var BuildingLevel, smallDIV, coords;
//		var BuildingURL = new Array(21);
//
//
//		for (var i = 0; i < 22; i++) {
////			GM_log("i=" + i + " >>>" + areaElements[i].nodeName)
//			BuildingLevel = /(\d+)/.exec(areaElements[i].getAttribute("title"));
//			BuildingURL = areaElements[i].getAttribute("href");
//
//			coords = areaElements[i].coords.split(',');
//
////			GM_log('BuildingLevel="' + BuildingLevel  + '" BuildingURL="' + BuildingURL + '"');
//
//			// ›› Only show spots with buildings on them.
//			if (BuildingLevel){
////				var imgId = parseInt(BuildingURL.match(/id\=(\d+)/).pop()) - 18;
////				if (imgId == 21) imgId = 'x1';
//////				GM_log(BuildingURL + ' ' + imgId);
////				if (imgId == 22) {
////					gid = 100;
////				} else {
////					var gid = document.evaluate('//img[@class="d' + imgId + '"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.getAttribute('src').match(/g(\d+)/).pop();
////				}
//////				GM_log('gid=' + gid);
////				smallDIV = addDiv('TMbuildingtag' + i,'TMbuildingtags',BuildingLevel[0],false);
//////				smallDIV.style.top = parseInt(coords[1]) + parseInt(60) + 'px';
//////				smallDIV.style.left = parseInt(coords[0]) + parseInt(95) + 'px';
////
////				smallDIV.style.top = buildArr2[i] + 'px';
////				smallDIV.style.left = buildArr1[i] + 'px';
////
////				smallDIV.style.visibility = "visible";
//////				GM_log('BuildingLevel=' + BuildingLevel + ' getMaxLevel(gid)=' + getMaxLevel(gid));
//////				if (BuildingLevel[0] == getMaxLevel(gid)) {
//////					smallDIV.style.backgroundColor = '#0e0';
//////				} else {
//////					if (_getValue('tm_enable_upgrade', '1') == '1') {
//////						areaElements[i].addEventListener('mouseover', function (ev) {tm_timeoutShow = setTimeout(overArea, 1000, ev)}, false);
//////						areaElements[i].addEventListener('mouseout', function () {clearTimeout(tm_timeoutShow);setTimeout(outArea, 500)}, false);
//////					} // if
//////				} // else if
////
////				smallDIV.setAttribute('goto', BuildingURL);
////				smallDIV.addEventListener('click', function() {
////					window.location.href = this.getAttribute('goto');
////					}, true);
////
////
////				if (BuildingLevel[0] == getMaxLevel(gid)) {
////					smallDIV.style.backgroundColor = '#0e0';
////				} else {
////					if (_getValue('tm_enable_upgrade', '1') != '0') {
////
////						smallDIV.addEventListener('mouseover', function (ev) {tm_timeoutShow = setTimeout(overArea, 1500, ev)}, false);
////						smallDIV.addEventListener('mouseout', function () {clearTimeout(tm_timeoutShow);setTimeout(outArea, 500)}, false);
////
////						areaElements[i].addEventListener('mouseover', function (ev) {tm_timeoutShow = setTimeout(overArea, 1500, ev)}, false);
////						areaElements[i].addEventListener('mouseout', function () {clearTimeout(tm_timeoutShow);setTimeout(outArea, 500)}, false);
////					}
////				}
//
//				var imgId = parseInt(BuildingURL.match(/id\=(\d+)/).pop()) - 18;
//				if (imgId == 21) imgId = 'x1';
////				GM_log(BuildingURL + ' ' + imgId);
//				if (imgId == 22) {
//					gid = 100;
//				} else {
//					var gid = document.evaluate('//img[@class="d' + imgId + '"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.getAttribute('src').match(/g(\d+)/).pop();
//				}
//
//
//				smallDIV = addDiv('TMbuildingtag' + i, 'TMbuildingtags', BuildingLevel[0], false);
//				smallDIV.style.top = buildArr2[i] + 'px';
//				smallDIV.style.left = buildArr1[i] + 'px';
//
////				var coords = areaElements[i].getAttribute('coords').split(',');
////				smallDIV.style.top = parseInt(coords[1]) + parseInt(60) + 'px';
////				smallDIV.style.left = parseInt(coords[0]) + parseInt(95) + 'px';
//
//				smallDIV.setAttribute('title', areaElements[i].getAttribute('title'));
//				smallDIV.setAttribute('coords', areaElements[i].getAttribute('coords'));
//
//				smallDIV.style.visibility = "visible";
//				smallDIV.setAttribute('goto', BuildingURL);
//				smallDIV.addEventListener('click', function() {
//					window.location.href = this.getAttribute('goto');
//					}, true);
//
//				if (BuildingLevel[0] == getMaxLevel(gid)) {
//					smallDIV.style.backgroundColor = '#0e0';
//				} else {
//					if (_getValue('tm_enable_upgrade', '1') != '0') {
//
//						smallDIV.addEventListener('mouseover', function (ev) {tm_timeoutShow = setTimeout(overArea, 1500, ev)}, false);
//						smallDIV.addEventListener('mouseout', function () {clearTimeout(tm_timeoutShow);setTimeout(outArea, 500)}, false);
//
//						areaElements[i].addEventListener('mouseover', function (ev) {tm_timeoutShow = setTimeout(overArea, 1500, ev)}, false);
//						areaElements[i].addEventListener('mouseout', function () {clearTimeout(tm_timeoutShow);setTimeout(outArea, 500)}, false);
//					}
//				}
//
//			} // if
//		} // for
//	} // if
//} // function

function find(xpath, xpres){
	var ret = document.evaluate(xpath, document, null, xpres, null);
	return  xpres == XPFirst ? ret.singleNodeValue : ret;
}

function myajax(url1, onfunc){
//	_log('+myajax\nParam: url='+url1);

//	alert(url1);

	var g = new XMLHttpRequest();
	g.onreadystatechange=function(){
		if(g.readyState==4 && g.status==200){
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
	var link = ansdoc.evaluate((location.href.indexOf('dorf1') != -1) ? '//a[contains(@href, "dorf1.php?a")]' : '//a[starts-with(@href, "dorf2.php?a=")]', ans, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

//	GM_log(link);
	if(link != null) {
//		alert(link.getAttribute('href')+getActiveDid());

//		GM_log(link.nodeName + ' ' + link.href);
		myajax(link.getAttribute('href')+getActiveDid(), function(){
//			window.location.reload();
			window.location.href = (location.href.indexOf('dorf1') != -1) ? 'dorf1.php' : 'dorf2.php';
		});
	} else {
		err = ansdoc.evaluate('//span[@class="c"]', ans, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
		alert(err.innerHTML);
	}
}

function overArea(ev){
//	GM_log('+overArea');
	if (!tm_timeoutShow) return;
	var obj = ev.target;
//	var coords = obj.coords.split(',');
	var coords = obj.getAttribute('coords').split(',');

	if (obj.getAttribute('dorf1')) {

		var x = 0 - 10;
		var y = 50;

		$('tm_uplevel').style.left = parseInt(coords[0]) + x + 'px';
		$('tm_uplevel').style.top  = parseInt(coords[1]) + y + 'px';
	} else {
		var x = 78;
		var y = 46-5;

		$('tm_uplevel').style.left = parseInt(coords[0]) + x + 'px';
		$('tm_uplevel').style.top  = parseInt(coords[1]) + y + 'px';
	}
	$('tm_uplevel').style.display = '';
	$('tm_uplevel').setAttribute('msg', obj.getAttribute('href'));
}

function outArea(){
//	GM_log('+outArea');
	if (tm_overUp != 1) $('tm_uplevel').style.display = 'none';
}

function $(name) { return document.getElementById(name) }

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

// ›› Adds a generic div.
//function addDiv(id,style,html,parent){
//	var body, div;
//	if (!parent){body = document.getElementsByTagName('body')[0];}else{body = document.getElementsByTagName(parent);}
//	if (!body) { return false; }
//	div = document.createElement('div');
//	div.id = id;
//	div.className = style;
//	if (html){div.innerHTML = html;}
//	body.appendChild(div);
//	return div;
//}

function addDiv(id, className, innerHtml, parentNodeId){
	var parentNode, div;
	parentNode = !parentNodeId ? document.getElementsByTagName('body')[0] : document.getElementById(parentNodeId);
	if (!parentNode) {return false;}
	div = document.createElement('div');
	if (id)			{div.id = id;}
	if (className)	{div.className = className;}
	if (innerHtml)	{div.innerHTML = innerHtml;}
	parentNode.appendChild(div);

//	document.getElementById('lmid2').appendChild(div);

	return div;
}

// ›› Add generic CSS.
function addCSS(cssString) {
	var style = document.createElement('STYLE');
	style.type = 'text/css';
	style.innerHTML = cssString;
	document.getElementsByTagName('HEAD')[0].appendChild(style);
}

var _setValue, _getValue, _removeValue, glStorage, nameSpace = 'TM.';

function initSaveValue() {
	/*if (window.globalStorage) {
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
	} else */ if (typeof GM_setValue != "undefined") {
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

var eventSource = (navigator.appName == 'Opera') ? document : window;
eventSource.addEventListener( 'load', init, false);