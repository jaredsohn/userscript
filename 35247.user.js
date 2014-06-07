// ==UserScript==
// @name           real RatioCalc
// @namespace      ru.zagrebelin.torrentsru
// @include        http://torrents.ru/forum/profile.php?*
// @include        http://pornolab.net/forum/profile.php?*
// ==/UserScript==
function $(id){return document.getElementById(id)}
function addGlobalStyle(css) { var head, style; head = document.getElementsByTagName('head')[0];if (!head) { return; } style = document.createElement('style');    style.type = 'text/css';    style.innerHTML = css;    head.appendChild(style);} 
function addClass(objNode, strNewClass ) {    replaceClass( objNode, strNewClass, '' );}
function replaceClass(objNode, strNewClass, strCurrClass) { var strOldClass = strNewClass; if ( strCurrClass && strCurrClass.length ){ strCurrClass = strCurrClass.replace( /s+(S)/g, '|$1' ); if ( strOldClass.length ) strOldClass += '|'; strOldClass += strCurrClass; } objNode.className = objNode.className.replace( new RegExp('(^|\s+)(' + strOldClass + ')($|\s+)', 'g'), '$1' ); objNode.className += ( (objNode.className.length)? ' ' : '' ) + strNewClass;}
function removeClass(objNode, strCurrClass ){replaceClass( objNode, '', strCurrClass );}
function xPathAll(s, parent){return document.evaluate(s, parent, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null)}
function xPathSingle(xpath, parent){return document.evaluate(xpath, parent, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;}

function parseCell(s){
	re=/([\d\.]+)\s([MGK]?B)/i;
	m=s.match(re)
	prefix = m[2]
	
	rc=parseFloat(m[1])
	if(prefix=="GB"){
		rc=rc*1024;
	}
	if(prefix=="KB"){
		rc=rc/1024;
	}
	return rc;
}

function addCell(row, s){
	td=document.createElement("td");
	td.appendChild(document.createTextNode(s));
	row.appendChild(td);
}

function calcAndDrawRowSumm(row){
	todayS = row.cells[2].textContent;
	totalS = row.cells[4].textContent;
	todayI = parseCell(todayS);
	totalI = parseCell(totalS);
	
	summI = todayI+totalI;
	summS = textCell(summI);
	
	addCell(row, summS)
	return summI;
}

function textCell(i){
	z=i/1024.0
	return z.toFixed(2)+" GB"
}

function createTextTd(text){
	td = document.createElement("td")
	td.appendChild(document.createTextNode(text))
	return td;
}

function calcAndDrawProposal(ul, dl, ratio, rows){
	ul1 = dl * ratio;
	dl1 = ul / ratio;
	if(dl1>=dl)
		addCell(rows[1], "+"+textCell(dl1-dl));
	else
		addCell(rows[1], " ");
	if(ul1>=ul)
		addCell(rows[2], "+"+textCell(ul1-ul));
	else
		addCell(rows[2], " ");
	addCell(rows[0], ratio);
	addCell(rows[3], " ");
	addCell(rows[4], " ");
	addCell(rows[5], " ");
}

tbl =  xPathSingle( "//table[contains(@class, 'ratio')]", document)
rows=tbl.rows

addCell(rows[0], "Вообще всего")
dl = calcAndDrawRowSumm(rows[1])
ul = calcAndDrawRowSumm(rows[2])
my = calcAndDrawRowSumm(rows[3])
bonus = calcAndDrawRowSumm(rows[4])

ratio = (ul+my+bonus)/dl;
addCell(rows[5], ratio.toFixed(2));

calcAndDrawProposal(ul, dl, 0.3, rows);
calcAndDrawProposal(ul, dl, 0.6, rows);
calcAndDrawProposal(ul, dl, 1.0, rows);
