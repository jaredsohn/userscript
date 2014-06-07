// ==UserScript==
// @name           new market filter
// @namespace      http://*.travian*.*/build.php*
// @include        http://s*.travian.*/build.php*
// ==/UserScript==

acss =	"table#mbuyf {width:100%; border-collapse:collapse; border:1px solid silver; font-size:8pt; text-align:center; background-color:white; padding:2px; margin:1px;}" +
	"table#mbuyf tr {border-collapse:collapse; border:1px solid silver; text-align:center;}" +
	"table#mbuyf td {border:1px solid silver; background-color:transparent; padding:2px; border-collapse:collapse;}" +
	"table#mbuyf td.sf {background-color:#FFE4B5;}";

GM_addStyle(acss);

var GMcookieID = '';
var market_all = [];
var market_fi = [];
var market_fc = [];

function do_modify_html_it(doc, element, match_re, replace_string) {
    match_re = new RegExp(match_re);
    if (element.innerHTML) {
	element.innerHTML = element.innerHTML.replace(match_re, replace_string);
    };
};

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
function $at(aElem, att) {if (att !== undefined) {for (var xi = 0; xi < att.length; xi++) {aElem.setAttribute(att[xi][0], att[xi][1]); if (att[xi][0].toUpperCase() == 'TITLE') aElem.setAttribute('alt', att[xi][1]);};};};//Acr111-addAttributes
function $c(iHTML, att) {var aCell = document.createElement("TD"); aCell.innerHTML = iHTML; $at(aCell, att); return aCell;};
function $r(att) {var aRow = document.createElement("TR"); $at(aRow, att); return aRow;};
function $a(iHTML, att) {var aLink = document.createElement("A"); aLink.innerHTML = iHTML; $at(aLink, att); return aLink;};
function $img(att) {var aImg = document.createElement("IMG"); $at(aImg, att); return aImg;};
jsVoid = 'javaScript:void(0)';

function deleteAdd() {
do_modify_html_it(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[3]/DIV[2]/FORM[1]/TABLE[1]/TFOOT[1]/TR[1]/TH[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,/&nbsp;/,'<input class="check" id="s10" name="s10" onclick="Allmsg(this.form);" type="checkbox">',null);
}

function getUserID() {
	dleft = "side_navi";
	var uLink = $xf("//div[@id='" + dleft + "']//a[contains(@href, 'spieler.php')]");
	return (uLink) ? uLink.href.split("uid=")[1] : null;
};

function applyFilter_hide() {
	var market = document.getElementById("range").getElementsByTagName("tbody")[0].getElementsByTagName("tr");
	for (mr in market) {
		var market_hide = [0,0,0];
		var mf = market_all[mr].split(";");
		for ( var i = 1; i < 3; i++ ) {
			for ( var j = 1; j < 5; j++ ) {
				if( mf[i-1] == market_fi[10*i+j-1]*j || market_fc[i] == 0 ) {
					market_hide[i] = 1;
				}
			}
		}
		if( market_fi[30] == 1 && mf[2] < 1 ) { market_hide[0] = 1; }
		if( market_fi[31] == 1 && mf[2] == 1 ) { market_hide[0] = 1; }
		if( market_fi[32] == 1 && mf[2] >= 1 ) { market_hide[0] = 1; }
		if( market_fi[33] == 1 && mf[2] > 1 ) { market_hide[0] = 1; }
		if( market_fc[3] == 0 ) { market_hide[0] = 1; }
		// apply filter
		if( market_hide[0]*market_hide[1]*market_hide[2] == 1 ) {
			market[mr].style.display = '';
		} else {
			market[mr].style.display = 'none';
		}
	}
}

function applyFilter_row( row ) {
	market_fc[row] = 0;
	for ( var i = 0; i < 4; i++ ) {
		var TD = document.getElementById('filter' + (row*10+i));
		if ( market_fi[row*10+i] != 0 ) {
			market_fc[row]++;
			TD.setAttribute('class', 'sf');
		} else {
			TD.removeAttribute('class');
		}
	}
}

function applyFilter( fi ) {
	var row = Math.round(fi/10);
	if( market_fi[fi] == 0 && ( market_fc[row] > 2 || row > 2 )) {
		for ( var i = 0; i < 4; i++ ) {
			market_fi[row*10+i] = 0;
		}
	}
	market_fi[fi] = 1 - market_fi[fi];
	applyFilter_row( row );
	applyFilter_hide();

	var mf_cookie = '';
	for( var i=1; i < 4; i++ ) {
		for ( var j=0; j < 4; j++ ) {
			mf_cookie += market_fi[i*10+j] + ',';
		}
		mf_cookie += ';';
	}
	GM_setValue(GMcookieID + "-mf", mf_cookie);
}

function market_restore() {
	var mf_cookie;
	mf_cookie = GM_getValue(GMcookieID + "-mf", "0,0,0,0,;0,0,0,0,;0,0,0,0,;");
	if ( mf_cookie == undefined ) return;
	var rows = [];
	rows = mf_cookie.split(";");
	for( var i=1; i < 4; i++ ) {
		var cels = [];
		cels = rows[i-1].split(",");
		for ( var j=0; j < 4; j++ ) {
			market_fi[i*10+j] = cels[j];
		}
		applyFilter_row( i );
	}
	applyFilter_hide();
}

function marketBuy() {

	if ( crtPath.indexOf('&t=1') == -1 && crtPage.indexOf('&t=1&u=') != -1 ) return;

	var resIMG = [];
	for ( var i=0; i<4; i++ ) {
		resIMG[i] = document.getElementById("resWrap").getElementsByTagName("table")[0].getElementsByTagName("tr")[0].getElementsByTagName("td")[i*2].getElementsByTagName("img")[0].getAttribute("alt");
	}

	// add new 2 field (ally & x/y)
	var market = document.getElementById("range").getElementsByTagName("thead")[0].getElementsByTagName("tr");
	market[0].getElementsByTagName("th")[0].setAttribute("colspan","7");

	var TM = [];
//	TM.push(market[1].getElementsByTagName("td")[0].childNodes.item(0).nodeValue);
	TM.push(market[1].getElementsByTagName("td")[0].innerHTML.replace(/<.*>/g, ""));
	TM.push(market[1].getElementsByTagName("td")[1].innerHTML.replace(/<.*>/g, ""));

	var newTD = document.createElement("td");
	newTD.innerHTML =  "Ally";
	market[1].appendChild(newTD);
	var newTD = document.createElement("td");
	newTD.innerHTML = "<sup>x</sup>/<sub>y</sub>";
	market[1].appendChild(newTD);

	document.getElementById("range").getElementsByTagName("tfoot")[0].getElementsByTagName("tr")[0].getElementsByTagName("td")[0].setAttribute("colspan","7");

	// create filter table
	var d = document.getElementById('build');
	var p = document.createElement('p');
	var newTABLE = document.createElement('table');
	p.appendChild(newTABLE);

	newTABLE.setAttribute('id', 'mbuyf');
	d.insertBefore(p, document.getElementById('range'));

	for( var i=1; i<3; i++ ) {
		var newTR = document.createElement('tr');
		var newTD = document.createElement('td');
		newTD.appendChild(document.createTextNode(TM[i-1]));
		newTR.appendChild(newTD);
		for( var j = 0; j < 4; j++ ) {
			var newTD = $c('', [['id', 'filter' + i + j]]);
			var newIMG = $img([['alt', resIMG[j]],['title', resIMG[j]],['class', 'r' + (j+1)],['src', 'img/x.gif']]);
			newTD.appendChild(newIMG);
			newTD.addEventListener('click', function(x) { return function() { applyFilter(x); }}(i*10+j), 0);
			newTR.appendChild(newTD);
			market_fi[i*10+j] = 0;
		}
		newTABLE.appendChild(newTR);
		market_fc[i] = 0;
	}

	var newTR = $r();
//	newTR.appendChild($c('&nbsp;'));
	newTR.appendChild($c(getUserID()));
	var aLabels = ['x<1', '1:1', 'x>=1', 'x>1'];
	for (var i = 0; i < 4; i++){
		var newTD = $c('', [['id', 'filter' + 3 + i]]);
		var ref = $a(aLabels[i], [['href', jsVoid]]);
		newTD.addEventListener('click', function(x) { return function() { applyFilter(x); }}(30+i), 0);
		newTD.appendChild(ref);
		newTR.appendChild(newTD);
		market_fi[30+i] = 0;
	};
	newTABLE.appendChild(newTR);

	// calculate offer/wanted rate
	var market = document.getElementById("range").getElementsByTagName("tbody")[0].getElementsByTagName("tr");
	for (mr in market)
	{
		var offer
		var wanted;

		offer = market[mr].getElementsByTagName("td")[0];
		wanted = market[mr].getElementsByTagName("td")[1];
		ally = market[mr].getElementsByTagName("td")[2];
		market[mr].getElementsByTagName("td")[4].setAttribute("style","font-size:8pt;");

		offer.value = parseInt( offer.childNodes.item(2).nodeValue );
		offer.type = offer.childNodes.item(1).getAttribute('class').substring(1);

		wanted.value = parseInt( wanted.childNodes.item(2).nodeValue );
		wanted.type = wanted.childNodes.item(1).getAttribute('class').substring(1);

		ally.value = ally.getAttribute('title');

		var mrate = Math.round(offer.value/wanted.value * 100)/100;

		var newTD = document.createElement("td");
		newTD.setAttribute("style","font-size:8pt;");
		newTD.innerHTML =  ally.value;
		market[mr].appendChild(newTD);

		var newTD = document.createElement("td");
		var aCol = ['black', 'white'];
		if ( mrate < 1.00) aCol = ['red', '#FFE1E1']; else if ( mrate > 1.00) aCol = ['darkgreen', '#C8FFC8'];
		newTD.setAttribute("style","font-size:8pt;background-color:" + aCol[1] + "; color:" + aCol[0] + ";");
		newTD.innerHTML = mrate;
		market[mr].appendChild(newTD);
		market_all[mr] = offer.type + ';' + wanted.type + ';' + mrate;
	}
	// restore filter settings
	market_restore();
}

function start_script() {
	GMcookieID = crtName + '-' + getUserID();

	if (crtPath.match(/(?:nachrichten|berichte).php/)) deleteAdd();
	if (crtPath.match(/build.php\?(.*)&t=1/)) marketBuy();
}

var crtPath = window.location.href;
var	crtName = crtPath.replace(/.*\/(.*)\/.*/, "$1");

window.addEventListener('load', start_script , false);
//window.onLoad = start_script();
