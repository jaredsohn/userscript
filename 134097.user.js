// ==UserScript==
// @name           Ersale movje Hamle Dar zire 1 Second// @namespace      shho2005@yahoo.com
// @description    Sakhte Movje Hamle zire 1 sanie
// @author         Serj_LV
// @license        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html

// @include        http://*.travian.*/build.php*
// @include        http://*/*.travian.*/build.php*
// @include        http://*.travian.*/a2b.php*
// @include        http://*/*.travian.*/a2b.php*
// @include        http://www.vfthis.net/*/build.php*
// @include        http://www.vfthis.net/*/a2b.php*

// @version        0.3
// ==/UserScript==

(function () {

function allInOneOpera () {
var version = '0.3';
var scriptURL = 'http://www.kurdupload.com/images/FGYHT8Ku1335005300/shoresh_hoseini.jpg';
notRunYet = false;
var defInterval = 100;

/*********************** common library ****************************/
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
function httpGet(url) {
	var xhttp = new XMLHttpRequest();
	xhttp.open("GET", url, false);
	xhttp.send(null);
	return xhttp.responseText;
}
function httpPost(url,data) {
	var xhttp = new XMLHttpRequest();
	data = encodeURI(data);
	xhttp.open("POST", url, false);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=utf-8");
	xhttp.send(data);
	return xhttp.responseText;
}
Number.prototype.NaN0 = function(){return isNaN(this)?0:this;};
String.prototype.trim = function(){return this.replace(/&nbsp;/g,'').replace(/^\s+|\s+$/g,'');};
String.prototype.onlyText = function(){return this.replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/<[\s\S]+?>/g,'');};
function $g(aID) {return (aID != '' ? document.getElementById(aID) : null);};
function $gn(aID) {return (aID != '' ? document.getElementsByName(aID) : null);};
function $gt(str,m) { return (typeof m == 'undefined' ? document:m).getElementsByTagName(str); };
function $gc(str,m) { return (typeof m == 'undefined' ? document:m).getElementsByClassName(str); };
function $at(aElem, att) {if (att !== undefined) {for (var xi = 0; xi < att.length; xi++) {aElem.setAttribute(att[xi][0], att[xi][1]); if (att[xi][0].toUpperCase() == 'TITLE') aElem.setAttribute('alt', att[xi][1]);};};};
function $t(iHTML) {return document.createTextNode(iHTML);};
function $e(nElem, att) {var Elem = document.createElement(nElem); $at(Elem, att); return Elem;};
function $ee(nElem, oElem, att) {var Elem = $e(nElem, att); if (oElem !== undefined) if( typeof(oElem) == 'object' ) Elem.appendChild(oElem); else Elem.innerHTML = oElem; return Elem;};
function $c(iHTML, att) { return $ee('TD',iHTML,att); }
function $a(iHTML, att) { return $ee('A',iHTML,att); }
function $am(Elem, mElem) { if (mElem !== undefined) for(var i = 0; i < mElem.length; i++) { if( typeof(mElem[i]) == 'object' ) Elem.appendChild(mElem[i]); else Elem.appendChild($t(mElem[i])); } return Elem;};
function $em(nElem, mElem, att) {var Elem = $e(nElem, att); return $am(Elem, mElem);};
function dummy() {return;};
jsNone = 'return false;';

function trImg ( cl, et ) {
	var ecl = [['class', cl],['src', 'img/x.gif']];
	if( typeof et != 'undefined' ) ecl.push(['title',et]);
	return $e('IMG',ecl);
}

function getRandom ( x ) {
	x = Math.round(x*0.9);
	return x+Math.round(Math.random()*x*0.2);
}

/********** begin of main code block ************/

function addWave () {
//	var rpPage = $ee('div',httpGet(a2bURL),[['style','display:none;']]);
//	var tInputs = $gt('INPUT',rpPage);
	var tInputs = $gt('INPUT',snd[0]);
	var needC = true;
	var sParams = '';
	var cDescr = '';

	for( var i=0; i< tInputs.length; i++ ) {
		t = tInputs[i].name;
		if( /redeployHero/.test(t) ) {
			sParams += "redeployHero=&";
		} else if ( /^t\d/.test(t) || /x|y/.test(t) ) {
			sParams += t + "=" + $gn(t)[0].value + "&";
		} else if ( t == "c" ) {
			if ( needC ) {
				var iAttackType = $gn('c');
				for (var q = 0; q < iAttackType.length; q++)
					if( iAttackType[q].checked ) {
						sParams += "c=" + (q+2) + "&";
						cDescr = iAttackType[q].parentNode.innerHTML.onlyText().trim();
					}
				needC = false;
			}
		} else {
			sParams += t + "=" + tInputs[i].value + "&";
		}
	}
	sParams = sParams.substring(0, sParams.length - 1);
	var rpPage = $ee('div',httpPost(a2bURL,sParams),[['style','display:none;']]);
	var err = $gc('error',rpPage);
	if( err.length > 0 && err[0].innerHTML.length > 1 ) {
		alert( err[0].innerHTML.onlyText() );
		return;
	}
	err = $gc('alert',rpPage);
	if( err.length > 0 && err[0].innerHTML.length > 1 ) {
		if( ! confirm(err[0].innerHTML.onlyText()) ) return;
	}
	tInputs = $gt('INPUT',rpPage);
	sParams = '';
	var tc = new Array(12);
	for( i=0; i< tInputs.length; i++ ) {
		t = tInputs[i].name;
		if( /^t\d/.test(t) ) {
			tc[t.match(/\d+/)[0]] = tInputs[i].value;
		} if( t == "c" ) {
			needC = tInputs[i].value;
		}
		sParams += t + "=" + tInputs[i].value + "&";
	}
	sParams = sParams.substring(0, sParams.length - 1);
	var remBtn = $c($a('-',[['href','#'],['onClick',jsNone]]),[['title','remove wave'],['rowspan',2]]);
	remBtn.appendChild($e('INPUT',[['type','hidden'],['value',sParams]]));
	remBtn.addEventListener('click',remWave,false);
	var nrow = $ee('TR',remBtn);
	for( i=1; i< 12; i++ ) {
		nrow.appendChild($c(tc[i]));
	}
	nrow.appendChild($c(needC,[['title',cDescr]]));
	var nbody = $ee('TBODY',nrow);
	tInputs = $gt('SELECT',rpPage);
	var nrow = $e('TR');
	nrow.appendChild($c(tInputs.length>0 ? tInputs[0]: '-',[['colspan',6]]));
	nrow.appendChild($c(tInputs.length>0 ? tInputs[0]: '-',[['colspan',6]]));
	nbody.appendChild(nrow);
	tbl.appendChild(nbody);
}

function remWave () {
	var tb = this.parentNode.parentNode;
	tb.parentNode.removeChild(tb);
}

function sendTroops (x) {
	var wBody = tbl.tBodies[x];
	var sParams = $gt('INPUT',wBody)[0].value;
	var	tInputs = $gt('SELECT',wBody);
	sParams += tInputs.length>0 ? "&"+ tInputs[0].name +"="+ tInputs[0].value: '';
	sParams += tInputs.length>1 ? "&"+ tInputs[1].name +"="+ tInputs[1].value: '';

	wlog += x+', ';
	if( x== wCount-1 ) {
		wlog += 'OK';
		setTimeout(function(){ document.location.href = fullName +'build.php?'+ (ver4FL?'tt=1&':'') +'id=39'; }, getRandom(1500));
	}
	cLog.innerHTML = wlog;
	ajaxRequest(a2bURL, "POST", sParams, dummy, dummy );
}

function sendWaves () {
	cLog = $c(wlog,[['colspan',13]]);
	tbl.tFoot.appendChild($ee('TR',cLog));
	wCount = tbl.tBodies.length;
	var nextWave = 10;
	var intWave = parseInt(interval.value).NaN0();
	if( intWave == 0 ) intWave = defInterval;
	for( var i=0; i<wCount; i++ ) {
		setTimeout(function(x){return function(){ sendTroops(x); }}(i), nextWave);
		nextWave += getRandom(intWave);
	}
}

var ver4FL = true;
if( /a2b.php/.test(window.location.href) ) {
	var build = $g('content');
	ver4FL = false;
} else {
	var build = $g('build');
	if( !(build) ) return;
	if( build.getAttribute('class') != 'gid16' ) return;
}
var snd = $gn('snd');
if( $gn('snd').length == 0 ) return;

var nation = ver4FL ? parseInt($gc('nationBig')[0].getAttribute('class').match(/\d+/)[0]).NaN0()-1:
	Math.floor(parseInt($gc('unit')[0].getAttribute('class').match(/\d+/)[0])/10);
if( nation < 0 ) return;

var a2bURL = ver4FL ? "build.php?tt=2&id=39": "a2b.php";
var wCount = 0;
var wlog = '';
var cLog;
var fullName = window.location.href.match(/^.*\/\/.+\/+?/)[0];
// build table header
var tbl = $e('TABLE',[['style','border:1px solid silver;']]);
var addBtn = $c($a('+',[['href','#'],['onClick',jsNone]]),[['title','append wave']]);
addBtn.addEventListener('click',addWave,false);
var hrow = $ee('TR',addBtn);
for( var i=1; i<11; i++ ) {
	hrow.appendChild($c(trImg('unit u'+(nation*10+i))));
}
$am(hrow,[$c(trImg('unit uhero')),$c('c')]);
tbl.appendChild($ee('THEAD',hrow));
if( ver4FL ) {
	var sendBtn = $g('btn_ok').cloneNode(true);
	sendBtn.removeAttribute('name');
	sendBtn.removeAttribute('id');
} else {
	i = $g('btn_ok').getAttribute('alt');
	var sendBtn = $ee('BUTTON',(i?i:'Go!'));
}
sendBtn.addEventListener('click',sendWaves,false);
var interval = $e('INPUT',[['type','text'],['value',defInterval],['size',4],['maxlength',4]]);
tbl.appendChild($ee('TFOOT',$ee('TR',$em('TD',['interval ',interval,' ms ',sendBtn,
	$a(' (v'+version+') ',[['href',scriptURL],['target','_blank']])],
	[['colspan',13],['style','text-align:center !important;']]))));

build.appendChild(tbl);

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
