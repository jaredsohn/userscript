// ==UserScript==
// @name          LOR tracker 2011
// @description   Old column order in tracker page (section first)
// @include       http*://www.linux.org.ru/*tracker.jsp*
// @include       http*://linux.org.ru/*tracker.jsp*
// ==/UserScript==
//
// License: GPL
// Author:  ollowtf ( http://www.linux.org.ru/whois.jsp?nick=ollowtf )
// 
// based on LOR Tracker filter (http://userscripts.org/scripts/review/27005)
// by sdio ( http://www.linux.org.ru/whois.jsp?nick=sdio )
//
// Version: 0.2

var SHOWNICK = 1;

// ------------------------------------------------------------------------

var jq;

if (typeof(GM_log) == 'function') {
	// For FF, Mozilla (with greasemonkey sandbox)
	jq = unsafeWindow.$;
} else {
	// For Epiphany, Opera
	jq = $;
}

// ---

// add header column
jq('<th>Форум</th>').insertBefore(jq('table.message-table thead tr th:first'));

// get rows
var jTR = jq('div.forum table.message-table tbody tr');

jTR.each(function() {
		
	var firstTd = jq("td:first", this)[0];
	//var nick  = firstTd.childNodes[2].textContent.replace(/[в( )\n]/g, '');
			
	var isUnconfirmed = firstTd.innerHTML.indexOf('не подтверждено') != -1;
	var isMarkedAsAnswered = firstTd.innerHTML.indexOf('решено') != -1;
	var markImage = (isMarkedAsAnswered) ? (jq("td:first img", this)[0].outerHTML) : '';
			
	var nickNodeNumber = (isMarkedAsAnswered) ? 4:2;
	var nick  = firstTd.childNodes[nickNodeNumber].textContent.replace(/[в( )\n]/g, '');
			
	// link to topic
	var td1 = jq("td:first a", this)[0];
		
	// link to section
	var td2 = jq("td:first a.secondary", this)[0];
	
	// add section with check for unconfirmed
	var newTd=document.createElement("td");
   	newTd.innerHTML=td2.outerHTML + (isUnconfirmed ? ' ***' : '');
	this.insertBefore(newTd,firstTd);
	
	// replace topic
	var newOldTd = document.createElement("td");
	newOldTd.innerHTML= markImage+td1.outerHTML+ (SHOWNICK ? '('+nick+')': '');
    this.replaceChild(newOldTd,firstTd);
	 
});

