// ==UserScript==
// @name           ZTravian Extra Tool
// @namespace      http://userscripts.org/scripts/show/158893
// @description    Shows Extra Tool
// @author         Zaialus
// @license        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html

// @include        http://*Ztravian.*
// @include        http://*theTravian.*

// @exclude     *.css
// @exclude     *.js
// @grant GM_addStyle
// @grant GM_getValue
// @grant GM_setValue
// @grant GM_deleteValue

// @version        1.4
// ==/UserScript==

(function () {
var RunTime = [ new Date().getTime() ];

function allInOneOpera () {
var version = '1.4';

notRunYet = false;
RunTime[2] = new Date().getTime();
var namespace = 'http://userscripts.org/scripts/show/158893';
var villages_id = [];
var village_aid = 0;
var village_aNum = 0;
var villages_count = 0;
var linkVSwitch = [];
var langs = ['auto','English (en)'];
var allCookies = ['next','village2','RBSetup','xy','ln2','src','vHint','bodyH'];
var crtPath = window.location.href;
var crtName = crtPath.match(/^.*\/\/(.+?)\//)[1];
var fullName = crtPath.match(/^.*\/\/.+\/+?/)[0];
var crtLang = crtName.split('.'); crtLang = crtLang[crtLang.length-1];
var flinks = new Object();
var windowID = []; // 0-Setup, 1-notes, 2-Reports, 3-links, 4-editLink
var pageElem3 = [
	'side_navi', // 0- left side. include menu, profile etc.
	'content', // 1- main block in center
	'side_info', // 2- right side. include village list, links, quest.
	'mid', // 3- central block. include left menu, main content and right menu
	'llist', // 4- links from plus
	'vlist', // 5- villages list
	'ltimeWrap', // 6- server time
	];
var pageElem4 = [
	'side_info', // 0- include profile.
	'content', // 1- main block in center
	'side_info', // 2- right side. include village list, links, quest.
	'mid', // 3- central block. include left menu, main content and right menu
	'llist', // 4- links from plus
	'vlist', // 5- villages list
	'betaBox', // 6- server time
	];
var ver4FL =  $g(pageElem3[0]) ? false: true;
var ver4nFL =  ver4FL && ($g('background')) ? true: false;

var pageElem = ver4FL ? pageElem4.slice() : pageElem3.slice();

var docDir = ['left', 'right'];
var ltr = true;
if (document.defaultView.getComputedStyle(document.body, null).getPropertyValue("direction") == 'rtl') { docDir = ['right', 'left']; ltr = false; }

var RB = new Object();
	RB.village_village2 = [0,0,0,0,0];
	RB.XY = [
		200, 10, // 0-Setup
		700, 430, // 1-Resource bar
		200, 100, // 2-Overview
		5, 400, // 3-Links
		400, 50, // 4-Report&Messages
		400, 130, // 5-Notes
		100, 50, // 6-Alerts
		10, 30, // 7-vlist
		10, 250, // 8-BIGicons
		200, 100, // 9-LinkEdit
		10, 250, // 10-attackInfo
		200, 100 // 11-attackFilter
		];
	RB.vHint = [];
	RB.bodyH = [0,0]; // 0-vlist,1-links

DICT = {
	en: {
		// ingame messages
		ok : "Ok",
		cancel : "Cancel",
		close : "Close",
		svers : "script version",
		settings : "settings",
		notes : "notes",
		links : "Links",
		linkname : "link name",
		del : "delete",
		edit : "edit",
		upside : "up side down",
		// settings
		onallp : "All pages",
		showls : "Show links",
		showlso : ['off','on','in window'],
		savedls : "saved links",
		savedd : "saved data",
		saveddh : 'including Links. If an Account deleted, or not on your computer.',
		savedelall : "delete all saved data",
		savedelallh : 'Are you sure you want to delete all data, including the links?',
		scrlang : "Script language",
		youlang : "your language",
	}
};

var img_car = "data:image/gif;base64,R0lGODlhEgAMAIQWAKuZY+DUr8q6iol4RWJTKPLpzPz79fn05sC2l9bNs8vCqdTOvOzm1dzTutvQsLWphrmvkdvVwuTdyKeacPr37efk2v///////////////////////////////////////yH5BAEAAB8ALAAAAAASAAwAAAVW4Cd+DTAQAjOua2CigMPO7hAIpjm3LkEAuEFlJyoUfrbgYkcpBAa4mwkyMxhdN+lgEGEdnNmA1ITwgsXiIGHCMgjQN9zrMZMABfIXQbFLAP4mJwRlIiEAOw==";
var img_def = "data:image/gif;base64,R0lGODlhEgAMAOMMAHJWAIpQAIFhAIxyH5l6AMeLAL2fAJmusNWzANStcOjMANDh4////////////////yH5BAEKAA8ALAAAAAASAAwAAARP8MmzpLXrXLkI+OBHVBtAEIahKOkJbI+JqqzhwnK6th48nLraaQBDmIItAAJWEMx2NkEB9igAkAbAFJYICLCCQGLT7V53ALH4spaELF1JBAA7";
var img_pref = "data:image/png;base64,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";
var img_view = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAMCAQAAADIBVVwAAAAAXNSR0IArs4c6QAAAPBJREFUGNNtkbEuBFEYhb+ZSHYjSgoFQaFbmSdQiWSbfYN5HYVWo9No9IqNeINtRYNssjRsITFEYu3/KWbGDNlTneLcc+/9DgCquZlL7zzl/he1yhgeh2pfxi4KV2ZyrRGqZmaqdt21Y31D1bfvV4QaGjdBkctboX56WEUpO47qOkNdn/N6Oi/9ZdWPajo9//OigcRLeTAe3JiqprQk8FjZFZ4Bki6xDJAC7K1OUEgYsUmf22B2wI53wJi1JthjyDcCJ8DQ+4+8M5qRFIYX9BqKNR49EzFTM7e8clB95ZdkDTzcbgHPG4rtbcoJMxfuwg8RxTrpF3oYEQAAAABJRU5ErkJggg==";
var img_del = "data:image/gif;base64,R0lGODlhEAAMAIABAP8AAP///yH5BAEKAAEALAAAAAAQAAwAAAIfTICmu5j8lAONMuOwvTLzun3HJI5WBKGotrYrlpZBAQA7";
var img_edit = "data:image/gif;base64,R0lGODlhEAAMAKEAAP///3HQAHV8bf///yH5BAEKAAMALAAAAAAQAAwAAAIinH+iyBnyGoIwREntE/hpilUe11QZWX5X+qEl5b6LNMVSAQA7";
var img_notes = "data:image/png;base64,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";
var img_save = "data:image/gif;base64,R0lGODlhLgAUAKUoAAAAABw5OTk5ORw5qjk5VTk5cTk5jjk5qhxVqjlVjlVVVTlVqlVVcTlVxlVVjlVVqlVVxlVxjlVxxnFxjnFxxnFx445xxo5x43GOjo6O446O/6qO46qO/3HGAKqqxqqq46qq/8aq/8bGxsbG48bG/8bj4+Pj4+P//////////////////////////////////////////////////////////////////////////////////////////////////yH5BAEKAD8ALAAAAAAuABQAAAb+wJ/w1ykaj8ikclkcDouoqHRKrVqv0aawg+16v53tN/opmzeZdMZCoYxRYe77Q9JYT5DH422CzkkZVScmDQR7Y31yY3SBU4MmCxeHX4lvKHQVjiYmJQsUk16VbxskblGPJSMDEqBYm35jGSQSp5upqhAOiKKxISAQwA0LCwMDwAm7sF8ZIM1qF23AD8iUvCfX2NnXFs4M3t4ReQsG2uXXr3Lm5RQgaQwAAiUlEcMH5OrYm5X6/P2bFBzcCZiwCcOBgwb8KTQhoshChRTSIAjgwYMIEQoOHijwsF9DIh35TWCl54GDBAkMqCzAMSTDMCBdypR58eOWDjVz6tzJs6cKTi1OmAgdusRJEAA7";
var img_underline = "data:image/gif;base64,R0lGODlhFwAQAIABAODg4AAAACH5BAEAAAEALAAAAAAXABAAQAIVjI+py+0Po5y02ouz3rxjAIbiSIIFADs=";
var img_tinfo = "data:image/gif;base64,R0lGODlhDAAMAMIEAACAgICAgICA/4D//////////////////yH5BAEKAAcALAAAAAAMAAwAAAMkeBohwio2R4OkhNQzqX9dplVf9pUjiaWgZ26TOALXR0fcBCkJADs=";
var img_up = "data:image/gif;base64,R0lGODlhDAAMAIABAHm94P///yH5BAEKAAEALAAAAAAMAAwAAAIXjA1we8mb3AtRvSohZjjq3nQeJTrlKRYAOw==";
var img_down = "data:image/gif;base64,R0lGODlhDAAMAIABAHm94P///yH5BAEKAAEALAAAAAAMAAwAAAIXhI+pF8vtQJhu0mUvyvrxzXWhZYyklBUAOw==";
var img_updown = "data:image/gif;base64,R0lGODlhDAAMAIABAHm94P///yH5BAEKAAEALAAAAAAMAAwAAAIajGGXB6jZ4gux0jUvdjlzuHxKJT1kCDUbahQAOw=="

/*********************** common library ****************************/

var useDOMs = typeof window.localStorage == 'undefined' ? false: true;
var khtmlFL = /khtml/i.test(navigator.appVersion);
if ( ! (typeof GM_getValue == 'undefined' || khtmlFL) ) {
	if( useDOMs )
	if( GM_getValue('brokenFF',0) == 1 ) useDOMs = false;
	else {
		GM_setValue('brokenFF',1);
		if( typeof window.localStorage.setItem != "undefined" ) GM_setValue('brokenFF',2);
	}
}
if (typeof GM_addStyle == 'undefined' ) {
  function GM_addStyle(css) {
    var head = document.getElementsByTagName('head')[0];
    if (head) {
      var style = document.createElement("style");
      style.type = "text/css";
      style.appendChild($t(css));
      head.appendChild(style);
    }
  }
}
function RB_getValue ( key, defaultValue ) {
	if( useDOMs ) {
		var value = window.localStorage.getItem(key);
		if( value == null ) value = defaultValue;
		return value;
	} else return GM_getValue( key, defaultValue );
}
function RB_setValue( key, value ) {
	if( useDOMs )
		window.localStorage.setItem( key, value );
	else
		GM_setValue( key, value );
}
function RB_deleteValue( key ) {
	if( useDOMs )
		window.localStorage.removeItem( key );
	else
		GM_deleteValue( key );
}
function $xf(xpath, xpt, startnode, aDoc) {
	var XPFirst = XPathResult.FIRST_ORDERED_NODE_TYPE;
	var XPList = XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE;
	var XPIterate = XPathResult.UNORDERED_NODE_ITERATOR_TYPE;
	var XPResult = XPathResult.ORDERED_NODE_SNAPSHOT_TYPE;
	if (!aDoc) aDoc = document;
	if (!startnode) startnode = document;
	var xpres = XPFirst;
	switch (xpt) {
		case 'i': xpres = XPIterator; break;
		case 'l': xpres = XPList; break;
		case 'r': xpres = XPResult; break;
	};
	var ret = aDoc.evaluate(xpath, startnode, null, xpres, null);
	return (xpres == XPFirst ? ret.singleNodeValue : ret);
};
function ajaxRequest(url, aMethod, param, onSuccess, onFailure) {
	var aR = new XMLHttpRequest();
	aR.onreadystatechange = function() {
		if( aR.readyState == 4 && (aR.status == 200 || aR.status == 304))
			onSuccess(aR);
		else if (aR.readyState == 4 && aR.status != 200) onFailure(aR);
	};
	aR.open(aMethod, url, true);
	if (aMethod == 'POST') aR.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8');
	aR.send(param);
};

Number.prototype.NaN0 = function(){return isNaN(this)?0:this;};
String.prototype.trim = function(){return this.replace(/&nbsp;/g,'').replace(/^\s+|\s+$/g,'');};
String.prototype.onlyText = function(){return this.replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/<[\s\S]+?>/g,'');};
String.prototype.firstText = function(){return this.replace(/&lt;/,'<').split('<')[0].trim();};
function $g(aID) {return (aID != '' ? document.getElementById(aID) : null);};
function $gn(aID) {return (aID != '' ? document.getElementsByName(aID) : null);};
function $gt(str,m) { return (typeof m == 'undefined' ? document:m).getElementsByTagName(str); };
function $gc(str,m) { return (typeof m == 'undefined' ? document:m).getElementsByClassName(str); };
function $at(aElem, att) {if (att !== undefined) {for (var xi = 0; xi < att.length; xi++) {aElem.setAttribute(att[xi][0], att[xi][1]); if (att[xi][0].toUpperCase() == 'TITLE') aElem.setAttribute('alt', att[xi][1]);};};};//Acr111-addAttributes
function $t(iHTML) {return document.createTextNode(iHTML);};
function $e(nElem, att) {var Elem = document.createElement(nElem); $at(Elem, att); return Elem;};
function $ee(nElem, oElem, att) {var Elem = $e(nElem, att); if (oElem !== undefined) if( typeof(oElem) == 'object' ) Elem.appendChild(oElem); else Elem.innerHTML = oElem; return Elem;};
function $c(iHTML, att) { return $ee('TD',iHTML,att); }
function $a(iHTML, att) { return $ee('A',iHTML,att); }
function $am(Elem, mElem) { if (mElem !== undefined) for(var i = 0; i < mElem.length; i++) { if( typeof(mElem[i]) == 'object' ) Elem.appendChild(mElem[i]); else Elem.appendChild($t(mElem[i])); } return Elem;};
function $em(nElem, mElem, att) {var Elem = $e(nElem, att); return $am(Elem, mElem);};
function offsetPosition ( el ) {var oL=0,oT=0; do {oL+=el.offsetLeft;oT+=el.offsetTop;} while(el=el.offsetParent ); return [oL,oT];}
function toNumber(aValue) {return parseInt(aValue.replace(/\W/g, "").replace(/\s/g, ""));};
function insertAfter(node, rN) {rN.parentNode.insertBefore(node, rN.nextSibling);};
function ajaxNDIV(aR) {var ad = $ee('div',aR.responseText,[['style','display:none;']]); return ad;};
function $ib(node, rN) {rN.parentNode.insertBefore(node, rN);};
function dummy() {return;};
jsVoid = 'javaScript:void(0)';
jsNone = 'return false;';
function esc(str) { return str.toString().replace(/@/g, "%40"); }
function unesc(str) { return str.replace(/%40/g, "@"); }
function newOption (node,text,value) { node.appendChild($ee('OPTION',text,[['value',value]])); }

/********************* travian library *****************************/

function id2xy(vid) {
	var arrXY = new Array;
	var ivid = parseInt(vid);
	arrXY[0] = ((ivid-1) % 801) - 400;
	arrXY[1] = 400 - Math.floor((ivid-1) / 801);
	return arrXY;
}

function xy2id(x, y) {
	return (1 + (parseInt(x) + 400) + (801 * Math.abs(parseInt(y) - 400)));
}

function getVid ( hr ) {
	var vIdH = hr.match(/[&\?][zd]=(\d+)/);
	if( vIdH ) vId = vIdH[1];
	else {
		vIdH = hr.match(/[&\?]x=(-?\d+)&y=(-?\d+)/);
		vId = vIdH ? xy2id(vIdH[1], vIdH[2]) : 0;
	}
	return vId;
}

function getVidFromCoords ( txt ) {
	var xy = new Array;
	if( /coordinateX/.test(txt) ) {
		xy[1] = txt.match(/coordinateX.+?(-?\d{1,3})/)[1];
		xy[2] = txt.match(/coordinateY.+?(-?\d{1,3})/)[1];
	} else
		xy = txt.match(/\((-?\d{1,3})\D+?(-?\d{1,3})\)/);
	return xy ? xy2id(xy[1],xy[2]): -1;
}

function getUserID() {
	var uLink = $xf("//div[@id='" + pageElem[0] + "']//a[contains(@href, 'profile.php')]");
	return (uLink) ? uLink.href.split("uid=")[1] : null;
};

/************* CSS & ID *****************/

var allIDs = [
	'flDIV', // 0-flDIV (class)
	'newDd', // 1-newDd (class)
	'RBSetup', // 2-RBSetup
	'rbLinks', // 3-rbLinks
	'flDIV', // 4-flDIV(num)
	'buttons', // 5- buttons (class)
	'existT',	// 6-mark for links (class)
/* images */
	'edit',	// 7- edit
	'del',	// 8- delete
/* no images */
	'mrgn', // 9- padding for image
	'selected', // 10- selected elements
	'tinfo' // 11- img_tinfo
	];

//RunTime[2] = new Date().getTime();
function randomizeIDs () {
	function replacer ( n ) {
		return rtStr[parseInt(n)];
	}
			//    0   1   2   3   4   5   6   7   8   9
	var rtStr = ['d','h','w','l','y','m','t','a','b','i'];
	var UUIDs = '';
	for( var i = 0; i < allIDs.length; i++ ) {
		do {
			var rID_num = (Math.round(Math.random()*Math.pow(10,Math.random()*3+5) + 1e3)).toString();
			var rID = rID_num.replace(/\d/g, replacer);
			var Rej = new RegExp(rID);
		} while( Rej.test(UUIDs) )
		UUIDs += rID + ',';
		allIDs[i] = rID;
	}
}
randomizeIDs();
//RunTime[3] = new Date().getTime();

acss =	"."+allIDs[0]+" {position:absolute;border:1px solid silver;text-align:center;background-color:yellow;border-radius:5px;}" +
	"."+allIDs[1]+" {width:100%;height:6px;text-align:center;background-color: #D0D0FF;cursor:move;font-size:6pt;}"+
	"table#"+allIDs[2]+" {width:auto;border-collapse:collapse; text-align:left; background-color:#F0F0F0; margin:1px;}" +
	"table#"+allIDs[2]+" td {background-color:transparent; border:1px solid silver; padding:2px;}" +
	"table#"+allIDs[2]+" td input {width:150px;text-align:right}" +
	"table#"+allIDs[3]+" {width:auto;border-collapse:collapse; background-color:white; margin:0px;}" +
	"table#"+allIDs[3]+" tr {border-collapse:collapse;} table#"+allIDs[3]+" tbody tr:hover {background-color:#E5E5F0;}" +
	"table#"+allIDs[3]+" td {white-space:nowrap;text-align:left;background-color:transparent;padding:0px 5px 1px;}" +
	"table#"+allIDs[3]+" thead td {font-weight:bold;color:#3C3C3C;} table#"+allIDs[3]+" a {font-size:12px;"+(ver4FL?"color:#252525;font-weight:normal;":"")+"}" +
	/* "table#vlist {border-collapse:collapse;}" + */"table#vlist tbody td {background-color:transparent;} table#vlist tr:hover {background-color:#E5E5F0;}" +
	"button."+allIDs[5]+" {color:black;border-width:2px;border-style:outset;border-color:#C6B7A2;background-color:#C6B7A2;padding:0px 5px;margin:1px 2px;}" +
	"span."+allIDs[6]+" { visibility:hidden; display:none; }" +
	"font: normal normal 600 "+(ver4FL?"14px/16px Arial":"12px/16px Verdana,Arial,Helvetica,sans-serif !important; z-index:19; text-align:center; position:absolute; visibility:hidden") +
	"; line-height:16px !important; width:22px !important; height:19px !important;}" +
	"table#"+allIDs[31]+" td a {color:black;font-weight:normal;}" +
 	"."+allIDs[7]+" { height:12px;width:16px;background: url("+img_edit+") no-repeat 0px 0px;cursor:pointer; }" +
	"."+allIDs[8]+" { height:12px;width:16px;background: url("+img_del+") no-repeat 0px 0px;cursor:pointer; }" +
	"."+allIDs[11]+" { height:12px;width:12px;background: url("+img_tinfo+") no-repeat 0px 0px;margin:0px 5px; }" +
	"img."+allIDs[9]+" {margin:0px 3px;} ."+allIDs[10]+" * {background-color:#ECECEC !important;}";

if( ver4FL ) acss += "table#vlist td{padding:0;line-height:16px;text-align:"+docDir[0]+";white-space:nowrap;}table#vlist thead td{background-color:#FFF;height:22px;text-align:center;padding:0px 3px;}" +
	"table#vlist td.dot{width:10px;padding:0 3px;}table#vlist td.link{padding-right:10px;}table#vlist thead td a{font-weight:bold;color:#3C3C3C;}" +
	"table#vlist tbody td{font-size:12px;padding:0 2px;}table#vlist td.hl{color:#FF8000;}table#vlist td.link{font-size:14px;}table#vlist {border-collapse:collapse;}" +
	"table#vlist td a{font-weight:normal;color:#252525;}table#vlist td a.active{font-weight:bold;color:#252525;}" + //#FF8000;
	"td.coords,th.coords a{white-space:normal !important;} #side_info .listing ul li:hover a {background-color:white;} #side_info .listing ul {padding-"+docDir[1]+":16px;}"+
	"#side_info #villageList a.attackVillageName {display:block !important; margin-"+docDir[0]+":17px !important;} #side_info #villageList img.attackIcon {float:"+docDir[0]+"}";

GM_addStyle(acss);

/*************tooltips elements*****************/

function updatePosition( wn, xy, sh ){
	var ttD = $g(wn);
	if( ! ttD ) return;
	var dW = ttD.clientWidth;
	var dH = ttD.clientHeight;
	var y = xy[1] + 8;
	if( sh ) {
		var x = RB.XY[sh*2];
	} else {
		var x = xy[0] + 8;
		if (x + dW > window.innerWidth + window.scrollX) x = x > dH + 16 ? x - dW - 16: 0;
	}
	ttD.style.left = x + "px";
	if (y + dH > window.innerHeight + window.scrollY) y = y > dH + 16 ? y - dH - 16: 0;
	ttD.style.top = y + "px";
};

/*************drag elements*****************/
var dragMaster = (function() {
	var dragObject;
	var mouseOffset;
	var mouseDownAt;
	function getMouseOffset(target, e) {
		var docPos = offsetPosition(target);
		return {x:e.pageX - docPos[0], y:e.pageY - docPos[1]};
	}
	function mouseUp(){
		if (mouseDownAt) {
			mouseDownAt = null;
		} else {
			savePosition(dragObject);
			dragObject = null;
		}
		document.removeEventListener('mousemove', mouseMove, true);
		document.removeEventListener('mouseup', mouseUp, true);
	}
	function mouseMove(e){
		if (mouseDownAt) if (Math.abs(mouseDownAt.x-e.pageX)<10 && Math.abs(mouseDownAt.y-e.pageY)<10) return;
		with(dragObject.style) {
			position = 'absolute';
			top = e.pageY - mouseOffset.y + 'px';
			left = e.pageX - mouseOffset.x + 'px';
		}
		mouseDownAt = null;
		return false;
	}
	function mouseDown(e) {
		if (e.which!=1) return;
		dragObject  = this.parentNode;
		mouseOffset = getMouseOffset(this, e);
		mouseDownAt = { x: e.pageX, y: e.pageY, dragObject: this };
		document.addEventListener('mousemove', mouseMove, true);
		document.addEventListener('mouseup', mouseUp, true);
		return false;
	}
	return {
		makeDraggable: function(element){
			element.addEventListener('mousedown', mouseDown, true);
		}
	}
}())
/**********end**drag elements*****************/

function savePosition(objName) {
	objNum = parseInt(objName.id.match(/\d+$/)[0]);
	if( objNum > 20 ) return;
	RB.XY[objNum*2] = objName.style.left.match(/^\d+/)[0];
	RB.XY[objNum*2+1] = objName.style.top.match(/^\d+/)[0];
	saveCookie('xy', 'XY');
}

var divSN = 100;
function makeFloat(flObj, ix, iy, sid) {
	flId = sid !== undefined ? sid : ++divSN;
	var zindex = 5999;
	switch (flId) {
		case 4:  zindex = 9999; break;
		case 21:  zindex = 10001; break;
	}
	bd = $e('div',[['id',allIDs[4] + flId],['class',allIDs[0]],['style','left:'+ ix +'px;top:'+ iy +'px;z-index:'+ zindex +';']]);
	bdr = $ee('div','',[['class',allIDs[1]],['onmousedown',jsNone]]);
	bd.appendChild(bdr);
	bd.appendChild(flObj);
	document.body.appendChild(bd);
	dragMaster.makeDraggable(bdr);
	return allIDs[4] + flId;
}

function makeFloatD(flObj, mNum) {
	var ix = RB.XY[mNum*2] < 1 ? 1: RB.XY[mNum*2];
	var iy = RB.XY[mNum*2+1] < xyBody[1] ? xyBody[1]: RB.XY[mNum*2+1];
	return makeFloat(flObj, ix, iy, mNum);
}

function closeWindowN ( num ) {
	if( windowID[num] == undefined ) return false;
	var wo = $g(windowID[num]);
	if( ! wo ) return false;
	wo.parentNode.removeChild(wo);
	windowID[num] = undefined;
	return true;
}

function bodyHide ( body ) {
	if( body[0].getAttribute('style',2) === null ) {
		body[0].setAttribute('style','display:none');
		RB.bodyH[body[1]] = 1;
		if( body[2] ) body[2].style.backgroundPosition = '0px -12px';
	} else {
		body[0].removeAttribute('style');
		RB.bodyH[body[1]] = 0;
		if( body[2] ) body[2].removeAttribute('style');
	}
	saveCookie('bodyH', 'bodyH');
}

/********************* messages & reports ***************************/

function deleteButtonAddT4() {
	if(($g("sAll"))) return;

	function removeBTX () {
		$g('sAll').checked = false;
	}

	var patt = [["administration","class","checkAll","delmsg"],
				["footer","id","markAll","del"]];
	var tt = /msg.php/.test(crtPath) ? 0: 1;
	var mtable = $xf('.//form/div[@class="'+patt[tt][0]+'"]','f',cont);
	if( ! (mtable) ) return;
	var cbDiv = $e('DIV',[[patt[tt][1],patt[tt][2]]]);
	cbDiv.innerHTML = '<input class="check" type="checkbox" id="sAll" name="sAll" onclick="$(this).up(\'form\').getElements(\'input[type=checkbox]\').each(function(element){element.checked=this.checked;},this);"/>';
	mtable.insertBefore(cbDiv, mtable.firstChild);

	var btn_del = $g(patt[tt][3]);
	if( btn_del ) {
		btn_del.addEventListener('click', removeBTX, true);
	}
}

function deleteButtonAdd() {
	if( ver4FL ) { deleteButtonAddT4(); return; }

	function removeBTX () {
		var rm = $g('s10');
		if( rm ) rm.parentNode.removeChild(rm);
		var rm = $g(btnID);
		if( rm ) rm.parentNode.removeChild(rm);
	}

	var mtable = $xf("//table[@id='overview']/tfoot/tr/th", "r");
	var btn_add = false;
	var plusFL = false;
	if ( mtable.snapshotLength == 3 ) {
		if( ! /checkbox/i.test(mtable.snapshotItem(0).innerHTML) ) {
			mtable.snapshotItem(0).innerHTML = '<input class="check" type="checkbox" id="s10" name="s10" onclick="checkedAll();">';
			btn_add = true;
			plusFL = true;
		}
	}
	var tm = $g('textmenu');
	if( /msg.php/.test(crtPath) ) {
		if( /\?t=1/.test(crtPath) )
		if( /\?t=2/.test(crtPath) ) btn_add = false;
	}
	
	var mtable = $gn('msg')[0];
	if( mtable ) {
		var i = crtPath.split("?")[1];
		if( i ) {
			i = i.replace(/t=\d&?/g,"");
			if( i ) mtable.action += '?' + i;
		}
	}

	if( plusFL ) {
		var btn_del = $g('btn_delete');
		if( btn_del ) {
			btn_del.addEventListener('click', removeBTX, true);
		}
	}
}

/************************* cookie ****************************/

var cookieDelim = [
	[")\\.([-\\.\\d]+)",'.','/'],
	[")@_(.*?)@#_",'@_','@#_']];

function loadVCookie ( nameCoockie, contentCookie, vID, cType ) {
	var cvID = vID || village_aid;
	var cvT = cType || 0;
	var RCookie = RB_getValue(GMcookieID + nameCoockie,'');
	var Rej = new RegExp("(" + cvID + cookieDelim[cvT][0]);
	var oneCookie = RCookie.match(Rej);
	if( cvT == 1 ) RB[contentCookie].length = 0;
	if( oneCookie != undefined ) {
		var cookieValue = oneCookie[2].split(cookieDelim[cvT][1]);
		var sI = cvT == 0 ? 0: 1;
		var contentLength = cvT == 0 ? RB[contentCookie].length: cookieValue[0].length == 0 ? 0: parseInt(cookieValue[0]);
		for( var j = 0; j < contentLength; j++ ) {
			RB[contentCookie][j] = cookieValue[j+sI] == undefined ? 0: cvT == 0 ? parseInt(cookieValue[j]): unesc(cookieValue[j+sI]);
		}
	} else for( var j = 0; j < RB[contentCookie].length; j++ ) RB[contentCookie][j] = 0;
}

function saveCookie ( nameCoockie, contentCookie ) {
	var newCookie = '';
	for( var j = 0; j < RB[contentCookie].length; j++ ) newCookie += RB[contentCookie][j] + '@_';
	RB_setValue(GMcookieID + nameCoockie, newCookie);
}

function loadCookie ( nameCoockie, contentCookie ) {
	var RCookie = RB_getValue(GMcookieID + nameCoockie,'');
	if( RCookie != '' ) {
		var cookieValue = RCookie.split('@_');
		for( var j = 0; j < RB[contentCookie].length; j++ )
			if( cookieValue[j] !== undefined ) if( cookieValue[j].length > 0 ) RB[contentCookie][j] = cookieValue[j];
	}
}

function loadAllCookie () {
	loadVCookie ( 'village2', 'village_village2' );

//	if( ! /^1\.6\./.test(RB.Setup[0]) ) RB.Setup = RB.dSetup.slice(); else RB.Setup[0] = version;
}

function addShowDistanceIn( ss, vt ) {
	var newP = $g(allIDs[0]);
	if( !(newP) ) newP = $e('DIV',[['style','float:'+docDir[1]+';'],['id',allIDs[0]]]);
	ss.parentNode.insertBefore(newP, ss);
	$gn('x')[0].addEventListener('keyup', function() { showDistanceIn( vt ) }, false);
	$gn('y')[0].addEventListener('keyup', function() { showDistanceIn( vt ) }, false);
	lastTimerP[2] = lastTimerP[0];
	showDistanceIn( vt );
}

var distInVilage = new Object;
var distInVilageFL = true;
function showDistanceIn ( vt ) { // travel time
	var dd = $g(allIDs[0]);
	if( ! dd ) return;
	var dX = parseInt($gn('x')[0].value);
	var dY = parseInt($gn('y')[0].value);
	var ddd = dd.firstChild;
	if( ddd ) dd.removeChild(ddd);
	lastTimerP[0] = lastTimerP[2];
	var xy = $g(allIDs[6]);
	if( xy ) xy.parentNode.removeChild(xy);
	if( isNaN(dX) || isNaN(dY) ) return;
	xy = xy2id(dX, dY);
	dd.appendChild(showAllTTime(vt,xy,RB.village_Var[1]));
	lastTimerP[2] = lastTimerP[0];
	lastTimerP[0] = lastTimerP[1];
	RB_setValue(GMcookieID + 'next', xy);
	if( distInVilageFL ) {
		var vLinks = $xf(vLinksPat,'l');
		for ( var vn = 0; vn < vLinks.snapshotLength; vn++ )
			distInVilage[villages_id[vn]] = vLinks.snapshotItem(vn).innerHTML;
		distInVilageFL = false;
	}
	ddd = ver4FL ? $gn('y')[0].parentNode.parentNode: $gn('y')[0].parentNode;
	if( typeof distInVilage[xy] != 'undefined' ) {
		ddd.appendChild($ee('SPAN',distInVilage[xy],[['style','margin:0px 5px;font-size:12px;'],['id',allIDs[6]]]));
	} else {
		var ht = getVTip(xy);
		if( ht != '' ) {
			ddd.appendChild($ee('SPAN',ht,[['style','color:'+vHColor+';margin:0px 5px;font-size:12px;'],['id',allIDs[6]]]));
		}
	}
}

/************************* other ****************************/

function addARLinks(myVid, aDirect) {
	var newLinks = $e('span');
	var armStyle = aDirect == 0 ? img_def : img_att;
	var ref = $ee('a', $e('img', [['src', armStyle]]), [['href', 'v2v.php?id=' + myVid], ['onClick', 'return false;']]);
		ref.addEventListener('click', function (x) { return function () { sendArmy(x); } } (myVid), false);
		newLinks.appendChild(ref);
	if (aDirect < 2) {
	var ref = $ee('a', $e('img', [['src', img_car]]), [['href', 'build.php?bid=17' + '&vid2=' + myVid], ['onClick', 'return false;']]);
		ref.addEventListener('click', function (x) { return function () { sendResourses(x); } } (myVid), false);
			newLinks.appendChild(ref);
	}
		return newLinks;
}

// begin Quick actions to my other villages

function vlist_addButtons () {
	var vlist = $g("vlist");
	if ( vlist ) {
		var villages = vlist.tBodies[0].rows;
		for ( var vn = 0; vn < villages.length; vn++ ) {
			var getTds = villages[vn].cells;

			var linkEl = $gt("a",getTds[1])[0];
			linkVSwitch[vn] = linkEl.getAttribute('href');
			var myVid = getVidFromCoords(getTds[2].innerHTML);
			villages_id[vn] = myVid;

			if( getTds[0].getAttribute('class').match(/hl/i) ) {
				village_aid = myVid; village_aNum = vn;
			}
			var newTD = $c( addARLinks(myVid,0));
			villages[vn].appendChild(newTD);
			linkHint(linkEl, myVid);
			villages_count++;
		}
		var villages_c = vlist.tHead.rows;
		newTH = $c('(' + villages_count + ')');
		villages_c[0].appendChild(newTH);
	} else {
		villages_count = 1;
		villages_id[0] = 0;
	}
}
// end Quick actions to my other villages

function fillXY ( nXY ) {
	if( /[&?]z=\d/.test(crtPath) ) return;
	var myVid = nXY || RB_getValue(GMcookieID + 'next', -1);
	if( myVid > 0 ) {
		var arXY = id2xy( myVid );
		if( $gn('x').length < 1 ) return;
		$gn('x')[0].value = arXY[0];
		$gn('y')[0].value = arXY[1];
	}
}

function fillXYtoRP() {
		myVid = RB_getValue(GMcookieID + 'next', -1);
	if (myVid > 0) {
	var arXY = id2xy(myVid);
		$gn('x')[0].value = arXY[0];
		$gn('y')[0].value = arXY[1];
		RB_setValue(GMcookieID + 'next', -1);
	}	
}

function sendArmy(myVid) {
	if ($gn('t9').length > 0) {
		fillXY( myVid );
		showDistanceIn(0);
} else {
	if (myVid != village_aid) RB_setValue(GMcookieID + 'next', myVid);
		document.location.href = 'v2v.php?id=' + myVid;
	}
		return false;
}

function sendResourses(myVid) {
	if ($gn('r1').length > 0) {
		fillXY( myVid );
		showDistanceIn(-1);
} else {
	if (RB.village_village2[0] != 0) {
	if (myVid != village_aid) RB_setValue(GMcookieID + 'next', myVid);
		document.location.href = 'build.php?id=' + RB.village_village2[0];
} else {
		document.location.href = 'build.php?bid=17' + '&vid2=' + myVid;
		}
	}
		return false;
}

/************************* Setup ***************************/

function okTD( funcOk, funcCancel, sp ) {
	var newBTO = $ee('BUTTON',gtext("ok"),[['class',allIDs[5]],['onClick',jsNone]]);
	newBTO.addEventListener('click', funcOk, true);
	var newBTX = $ee('BUTTON',gtext("cancel"),[['class',allIDs[5]],['onClick',jsNone]]);
	newBTX.addEventListener('click', funcCancel, true);
	var at = [['style','text-align:right']];
	if( parseInt(sp) != NaN ) at.push(['colspan',sp]);
	return $em('TD',[newBTO,newBTX],at);
}

function gtext ( txt ) {
	var ntxt = typeof DICT['en'][txt] == 'undefined' ? 'Error!': DICT['en'][txt];
	if( typeof DICT[LC] == 'undefined' ) return ntxt;
	if( typeof DICT[LC][txt] != 'undefined' ) ntxt = DICT[LC][txt];
	else if( typeof DICT[LC]["fb"] != 'undefined' )
		if( typeof DICT[DICT[LC]["fb"]] != 'undefined' )
			if( typeof DICT[DICT[LC]["fb"]][txt] != 'undefined' ) ntxt = DICT[DICT[LC]["fb"]][txt];
	return ntxt;
}

RB.dSetup = [//	0	1	2	3	4	5	6	7	8	9
	/* 0 */	version,0,	0,	0,	1,	7,	1,	1,	3,	0,
	/* 1 */		2,	1,	2,	0,	1,	1,	2,	0,	1,	2,
	/* 2 */		1,	1,	1,	10,	80,	1,	1,	0,	0,  0,
	/* 3 */		0,	15,	1,	1,	0,	0,	1,	1,	1,	0,
	/* 4 */		'',	'',	'',	'',	'',	0
			];
RB.Setup = RB.dSetup.slice();

function rbSetup () {
	// 0-type(Info,CheckBox,Text,SELect,SPan,Button), 1-setupNum, 2-text, 3-ext
	var aRBS = [
		['I', 0, gtext("onallp")],
			['SEL', 1, gtext("scrlang")+(LC != 'en' ? ' /language':''), langs],
		['I', 0, gtext("links")],
			['SEL',3, gtext("showls"), gtext("showlso")],
			['T', 'ln2', gtext("savedls")],
		['I', 0, gtext("savedd"), gtext("saveddh")],
			['B', 0, gtext("savedelall"), [gtext("del"),'allStorageDelete']],
		['I', 0, '']
	];

	if( closeWindowN(0) ) return;

	function setupSave() {
		var aS = $gt("SELECT",$g(allIDs[2]));
		for (var i = 0; i < aS.length; i++) RB.Setup[parseInt(aS[i].name)] = aS[i].value;
		var aS = $gt("INPUT",$g(allIDs[2]));
		for (var i = 0; i < aS.length; i++) {
			crtValue = aS[i].value;
			if( aS[i].type == 'checkbox') crtValue = (aS[i].checked == true ? '1' : '0');
			if( isNaN(aS[i].name) )
				RB_setValue(GMcookieID + aS[i].name, crtValue);
			else
				RB.Setup[parseInt(aS[i].name)] = crtValue;
		}
		saveCookie( 'RBSetup', 'Setup' );
		destroySetup();
		location.reload(true);
	}
	function destroySetup() {
		closeWindowN(0);
	}

	setupD = $e('TABLE',[['id',allIDs[2]]]);
	var newTR = $ee('TR',$c(gtext("svers")+': ' + version));//RB.Setup[0]));
	newTR.appendChild(okTD(setupSave,destroySetup));
	setupD.appendChild(newTR);

	for( var i = 0; i < aRBS.length; i++ ) {
		if( aRBS[i][0] == 'I' ) {
			var newTt = $ee('SPAN',aRBS[i][2]);
			if( typeof aRBS[i][3] == 'string' && aRBS[i][3].length > 1 ) {
				$at(newTt,[['title',aRBS[i][3]]]);
				newTt.appendChild(trImg(allIDs[11]));
			}
			var newTR = $ee('TR',$c(newTt,[['colspan','2'],['style','text-align:center']]));
		} else {
			var vN = isNaN(aRBS[i][1]) ? RB_getValue(GMcookieID + aRBS[i][1], "") : RB.Setup[aRBS[i][1]];
			var newTt = $ee('SPAN',aRBS[i][2]);
			var hn = aRBS[i][0] == 'SEL' ? 4: 3;
			if( typeof aRBS[i][hn] == 'string' && aRBS[i][hn].length > 1 ) {
				$at(newTt,[['title',aRBS[i][hn]]]);
				newTt.appendChild(trImg(allIDs[11]));
			}
			var newTR = $ee('TR',$c(newTt));
			switch( aRBS[i][0] ) {
				case 'CB': var newO = $e('INPUT',[['type', 'CHECKBOX']]); if(vN == 1) $at(newO, [['checked', true]]); break;
				case 'T': var newO = $e('INPUT',[['type', 'TEXT'],['value',vN]]); break;
				case 'SEL': var newO = $e('SELECT');
					for( var j = 0; j < aRBS[i][3].length; j++ ) newOption(newO, aRBS[i][3][j], j);
					newO.selected = vN; newO.value = parseInt(vN); break;
				case 'SP': var newO = $ee('SPAN',vN); break;
				case 'B': var newO = $ee('BUTTON',aRBS[i][3][0],[['class',allIDs[5]],['type', 'BUTTON'],['onClick',jsNone]]);
					newO.addEventListener('click', eval(aRBS[i][3][1]), true);
					break;
			}
			$at(newO, [['name', aRBS[i][1]]]);
			newTR.appendChild($c( newO, [['style','text-align:center;']]));
		}
		setupD.appendChild(newTR);
	}

	var newTR = $ee('TR',$em('TD',[gtext("youlang")+': ',$ee('b',navigator.language)]));
	newTR.appendChild(okTD(setupSave,destroySetup));
	setupD.appendChild(newTR);

	windowID[0] = makeFloatD(setupD, 0);
}

function allStorageDelete () {
	if( ! confirm(gtext("savedelallh")) ) return;
	for( var i = 0; i< allCookies.length; i++ ) {
		RB_deleteValue( GMcookieID + allCookies[i] );
	}
	document.location.href = fullName + 'logout.php';
}

function trImg ( cl, et ) {
	var ecl = [['class', cl],['src', 'assets/x.gif']];
	if( typeof et != 'undefined' ) ecl.push(['title',et]);
	return $e('IMG',ecl);
}

function sortLinks () {
	slt = slt ? false: true;
	redrawLinks();
}

function redrawLinks () {
	$g(windowID[5]).parentNode.removeChild($g(windowID[5]));
	showLinks();
}
var slt = true;
function showLinks () {
	function moveLinkUpDown ( num ) {
		switch ( num[1] ) {
			case 2:
				var oneLink = clinks[num[0]];
				clinks.splice(num[0], 1);
				clinks.splice(num[0]+num[2], 0, oneLink);
				RB_setValue(GMcookieID + "ln2", clinks.join("@@_")+"@@_");
				redrawLinks();
				break;
		}
	}
	function editCLink () {
		if( closeWindowN(6) ) return;

		function removeCLink ( num ) {
			eBody.removeChild($g('sn'+num));
		}
		function addCLink ( fl ) {
			var v = fl ? crtPath: '';
			var newA = trImg(allIDs[8],gtext("del"));
			newA.addEventListener('click', function(x) { return function() { removeCLink(x); }}(SN), false);
			eBody.appendChild($em('TR',[$c($e('INPUT',[['value',''],['name','lname'],['size',20]])), $c($e('INPUT',[['value',v],['name','lurl'],['size',50]])),$c(newA)],[['id','sn'+(SN++)]]));
		}
		function saveCLinks () {
			var names = $gn('lname');
			var urls = $gn('lurl');
			var newCL = '';
			for( var i = 0; i < names.length; i++ ) {
				if( urls[i].value.length < 3 ) continue;
				if( names[i].value.length == 0 ) {
					if( urls[i].value.length > 25 )
						newCL += esc(urls[i].value.slice(0,9) +'..'+ urls[i].value.slice(-14)) +"\/@_"+ esc(urls[i].value) +"@@_";
					else
						newCL += urls[i].value +"\/@_"+ esc(urls[i].value) +"@@_";
				} else newCL += esc(names[i].value) +"\/@_"+ esc(urls[i].value) +"@@_";
			}
			RB_setValue(GMcookieID + "ln2", newCL);
			cancelCLinks();
			redrawLinks();
		}
		function cancelCLinks () {
			closeWindowN(6);
		}

		var SN = 0;
		var eBody = $e('TBODY');
		var editLinks = $ee('TABLE',eBody);
		editLinks.appendChild($em('THEAD',[$ee('TR',okTD(saveCLinks,cancelCLinks,3)),$em('TR',[$c(gtext("linkname")),$c('URL',[['colspan',2]])])]));
		for( var i = 0; i < clinks.length; i++ ) {
			var oneLink = clinks[i].split("\/@_");
			var newA = trImg(allIDs[8],gtext("del"));
			newA.addEventListener('click', function(x) { return function() { removeCLink(x); }}(SN), false);
			eBody.appendChild($em('TR',[$c($e('INPUT',[['value',unesc(oneLink[0])],['name','lname'],['size',20]])), $c($e('INPUT',[['value',unesc(oneLink[1])],['name','lurl'],['size',50]])),$c(newA)],[['id','sn'+(SN++)]]));
		}
		var newA = $a('+',[['href',jsVoid],['title',"add new"],['style','color:red;']]);
		newA.addEventListener('click', function() { addCLink(false); }, true);
		var newB = $a('(+)',[['href',jsVoid],['title',"add current"],['style','color:red;']]);
		newB.addEventListener('click', function() { addCLink(true); }, true);
		editLinks.appendChild($ee('TFOOT',$em('TR',[$em('TD',[newA,' / ',newB],[['style','text-align:center;font-size:20px;']]),okTD(saveCLinks,cancelCLinks,2)])));

		windowID[6] = makeFloatD(editLinks, 9);
	}

	// free constant links
	var ln_cookie = RB_getValue(GMcookieID + "ln2", "");
	var clinks = ln_cookie.split("@@_");
	clinks.splice((clinks.length - 1), 1);

	var newTBody = $e('TBODY');
	if( RB.bodyH[1] == 1 ) $at(newTBody,[['style','display:none']]);

	rbLinks = $e('TABLE',[['id',allIDs[3]]]);
	var newTHead = $e('THEAD');
	var newTR = $e('TR');
	var editCL = trImg(allIDs[7],gtext("edit"));
	editCL.addEventListener('click', editCLink, false);
	var sortL = $ee('A',$e('IMG',[['src',img_updown]]),[['href',jsVoid],['title',gtext("upside")],['style','padding:0px 5px;']]);
	sortL.addEventListener('click', sortLinks, false);

	var newTD = $em('TD',[gtext("links"),': ',editCL,'',sortL],[['colspan','2']]);
	
	newTR.appendChild(newTD);
	newTHead.appendChild(newTR);
	rbLinks.appendChild(newTHead);

	for( var i = 0; i < clinks.length; i++ ) {
		var newTR = $e('TR');
		if( ! slt ) {
			if( i > 0 ) {
				var newA = $ee('A',$e('IMG',[['src',img_up]]),[['href',jsVoid]]);
				newA.addEventListener('click', function(x) { return function() { moveLinkUpDown(x); }}([i,2,-1]), false);
				var newTD = $c(newA);
			} else var newTD = $c($e('IMG',[['src', 'assets/x.gif'],['style','height:12px;width:12px;']]));

			if( i < clinks.length-1 ) {
				var newA = $ee('A',$e('IMG',[['src',img_down]]),[['href',jsVoid]]);
				newA.addEventListener('click', function(x) { return function() { moveLinkUpDown(x); }}([i,2,1]), false);
				newTD.appendChild(newA);
			} else newTD.appendChild($e('IMG',[['src', 'assets/x.gif'],['style','height:12px;width:12px;']]));

			newTR.appendChild(newTD);
		}
		var oneLink = clinks[i].split("\/@_");
		newTR.appendChild($c($a(unesc(oneLink[0]),[['href',unesc(oneLink[1])]]),[['colspan',(slt?3:2)]]));
		newTBody.appendChild(newTR);
	}
	rbLinks.appendChild(newTBody);

	if( RB.Setup[3] == 1 ) {
		windowID[5] = allIDs[3]+'F';
		$g(pageElem[2]).appendChild($ee('P',rbLinks,[['id',windowID[5]]]));
	} else {
		windowID[5] = makeFloatD(rbLinks, 3);
	}
}

/***************************** Activity Servers **********************************/

function viewMessageIW() {
	function selectMessage (num) {
		var allRows = $xf('.//tr[td/@class="sel"]','l',cont);
		var tds = allRows.snapshotItem(num).cells;
		$gt('INPUT',tds[0])[0].setAttribute('checked',true);
		var aLinks = $xf('.//a[contains(@href, "report.php?id=") or contains(@href, "msg.php?id=")]','f',tds[1]);
		var aLink = aLinks.getAttribute('href');

		var tV = /report/.test(aLink) ? 1: 0;
		viewMessageIWDisplay( aLink, tV , (num>12?offsetPosition(aLinks):false));
	}

	var allRows = $xf('.//tr[td/@class="sel"]','l',cont);
	for( var i = 0; i < allRows.snapshotLength; i++ ) {
		var td = allRows.snapshotItem(i).cells[1];
		var newImg = $e('IMG',[['src',img_view]]);
		newImg.addEventListener('click', function(x) { return function() { selectMessage(x); }}(i), false);
		if( ver4FL )
			$at(newImg,[['style','position:relative;float:'+docDir[0]+';'+(/report/.test(crtPath)?'':docDir[0]+':-6px;')]]);
		td.insertBefore(newImg, td.firstChild);
	}
}

function viewMessageIWClose() {
	closeWindowN(4);
}

function viewMessageIWDisplay( aLink, tV, xy ) {
	//var messCr = ver4FL ? './/div[@class="messages"]' : './/*[@id="content"]'; // all messages
	//var messCr = ver4FL ? './/div[@class="msg_head"]' : './/*[@id="write_head"]';
	var messCs = ver4FL ? './/div[@class="msg_content"]' : './/*[@id="write_content"]';
	//var messCr = ver4FL ? './/div[@class="msg_foot"]' : './/*[@id="write_foot"]';
	var viewPref = [
		[messCs,'messages','width:'+(ver4FL?'555px':'440px')+';background-color:white;padding:5px;text-align:left;'],
		['.//*[@id="report_surround"]','reports','width:'+(ver4FL?'540px':'500px')+';background-color:white;padding:5px;']];

	ajaxRequest(aLink, 'GET', null, function(ajaxResp) {
		viewMessageIWClose();
		var ad = ajaxNDIV(ajaxResp);
		var aV = $xf(viewPref[tV][0], 'f', ad);
		ad = null;
		if (aV) {
			var newBTX = $ee('BUTTON',gtext("close"),[['onClick',jsNone],['class',allIDs[5]],['style','direction:ltr']]); //margin:5px 5px 0px;
			newBTX.addEventListener('click', viewMessageIWClose, true);
			newBTX.disabled = false;
			var newD = $em('DIV',[$ee('DIV',aV,[['class',viewPref[tV][1]],['style',viewPref[tV][2]]]),newBTX],[['style','text-align:center;background-color:white;']]);
			windowID[4] = xy ? makeFloat(newD, xy[0], xy[1]): makeFloatD(newD, 4);
			if( ver4FL ) {
				var bigImg = $xf('.//img[contains(@class,"eportImage")]','f',aV);
				if( bigImg ) bigImg.parentNode.removeChild(bigImg);
			}
			if( xy ) updatePosition( windowID[4], xy, 4 );
		}
	}, dummy);
}

function SetBut() {
	var newT = $e('TABLE', [['style', 'width:auto;background-color:transparent;float:' + docDir[0] + ';border-collapse:collapse;' + (ver4FL ? '' : 'margin-' + docDir[0] + ':10px;')]]);
	var t = 0;
	var tdStyle = 'border:1px solid silver;background-color:white;';
	var newR = $e('TR'); {
	var alink = $a(' v' + version, [['href', namespace], ['style', 'font-size:14px;'], ['target', '_blank'], ['title', gtext("svers")]]);
	var aImg = $e('IMG', [['src', img_pref], ['title', gtext("settings")], ['style', 'height: 30px;margin-top: 20px;width: 30px;padding: 0px 2px;cursor: pointer;']]);
		aImg.addEventListener('click', rbSetup, false);
	var aImg2 = $e('IMG', [['src', img_notes], ['title', gtext("notes")], ['style', 'height: 30px;margin-top: 20px;width: 30px;padding: 0px 2px;cursor: pointer;']]);
		aImg2.addEventListener('click', rbNotes, false);
}
	var newS = $em('TH', [alink, aImg2, aImg], [['class', 'rb_head']]);
		newT.appendChild(newR);
		newR.appendChild(newS);
	if (ver4FL) {
		makeFloatD(newT, 0);
} else {
	var insPoint = $g('plus');
		$at(insPoint, [['style', 'margin-left:10px;margin-right:10px;']]);
		$at($g('mtop'), [['style', 'width:650px;']]);
		insPoint.parentNode.insertBefore(newT, insPoint);
	}
}
		
function rbNotes () {
	if( closeWindowN(3) ) return;

	function saveNotes () {
		RB_setValue(GMcookieID + 'notes',textNB.value);
		alert( 'saved' );
	}

	var nText = RB_getValue(GMcookieID + 'notes','');
	var newNB = $e('TABLE');
	var textNB = $ee('TEXTAREA', nText, [['cols', '60'], ['rows', '20'],['style', 'background-image: url('+img_underline+');background-repeat: repeat;']])
	newNB.appendChild($ee('TR',$c(textNB)));
	var saveB = $e('IMG',[['src',img_save]]);
	saveB.addEventListener('click', saveNotes, false);
	newNB.appendChild($ee('TR',$c(saveB,[['style','text-align: center']])));
	windowID[3] = makeFloatD( newNB, 5 );
}

function villageHintVillage4 () {
	var newdidVH = [];
	for( i = 0; i < villages_id.length; i++ )
		newdidVH[linkVSwitch[i].match(/newdid=(\d+)/i)[1]] = villages_id[i];
	var mLinks = $xf('.//tr/td[1]/a[contains(@href, "newdid=")]', 'r', cont);
	for( var j = 0; j < mLinks.snapshotLength; j++ ) {
		var mLID = mLinks.snapshotItem(j).getAttribute('href').match(/newdid=(\d+)/)[1];
		linkHint( mLinks.snapshotItem(j), newdidVH[mLID] );
	}
}

function linkHint ( aLink, vID ) {
	try {
		var avID = vID || getVid(aLink.getAttribute('href'));
		if( isNaN(avID) ) return;
	} catch(e) { return; }
	if( RB.vHint[avID] != undefined ) {
		aLink.appendChild($ee('SPAN',' '+RB.vHint[avID],[['style','color:'+vHColor+';']]));
	} else {
		var ht = getVTip(avID);
		if( ht != '' ) {
			var ltext = aLink.innerHTML.onlyText().length;
			if( ltext < 20 )
				aLink.appendChild($ee('SPAN',' '+ht.substr(0,20-ltext),[['style','color:'+vHColor+';']]));
		}
	}
}

function setLC () {
	if( RB.Setup[1] > 0 ) return langs[RB.Setup[1]].match(/\((\w+)\)/)[1];
	lang = navigator.language;
	if( /^ar/i.test(lang) ) return 'ar';
	else if( /^bs/i.test(lang) || crtLang == 'ba' ) return 'bs';
	else if( /^bg/i.test(lang) ) return 'bg';
	else return 'en';
}

/************************* begin test zone ***************************/

function getVTip (vID) {
	var newTip = '';
	if( RB.vHint[vID] != undefined ) newTip = RB.vHint[vID];
	else if( typeof flinks[vID] != 'undefined' ) newTip = flinks[vID];
	return newTip;
}

/************************** end test zone ****************************/

// start script
	RunTime[2] = new Date().getTime();
	if( ! ($g('l1')) ) return;
	var userID = getUserID();
	var GMcookieID = crtName + '-' + userID + '-';
	loadCookie ( 'RBSetup', 'Setup' );
	var xyBody = offsetPosition($xf('//body/div[@*="'+(ver4nFL?'background':'wrapper')+'"]'));

	loadCookie ( 'xy', 'XY' );
	loadCookie ( 'bodyH', 'bodyH' );
	
	vlist_addButtons();
	loadAllCookie();
	var LC = setLC();
	SetBut();

	var cont = $g(pageElem[1]);
	var contXY = offsetPosition( cont );
	var contRight = ltr ?  contXY[0] + cont.clientWidth : contXY[0];
	var contTop = contXY[1];

	if( /village4.php/.test(crtPath) ) villageHintVillage4();
	if( /(?:msg|report).php/.test(crtPath) ) { deleteButtonAdd(); viewMessageIW();  }
	if( crtPath.indexOf('v2v.php') != -1 ) fillXYtoRP();
	if( /build.php/.test(crtPath) ) {}
	
	if( RB.Setup[3] > 0 ) showLinks();
	if( RB.Setup[5] == 1 ) rbNotes();

/********** end of main code block ************/
}

function backupStart () {
	if(notRunYet) {
		var l4 = document.getElementById('l4');
		if( l4 ) allInOneOpera();
		else setTimeout(backupStart, 500);
	}
}

var notRunYet = true;
if( /khtml/i.test(navigator.appVersion) ) allInOneOpera();
else if (window.addEventListener) window.addEventListener("load",function () { if(notRunYet) allInOneOpera(); },false);
setTimeout(backupStart, 500);

})();