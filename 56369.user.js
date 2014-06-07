// ==UserScript==
// @name			Google Analytics Row Limit Link
// @author			Erik Vold
// @namespace		gaRowLimitLink
// @include			https://www.google.com/analytics/reporting/*
// @include			https://adwords.google.com/analytics/reporting/*
// @match			https://www.google.com/analytics/reporting/*
// @match			https://adwords.google.com/analytics/reporting/*
// @version			0.1.3
// @license			GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @datecreated		2009-08-25
// @lastupdated		2009-12-18
// @description		This userscript will add a link to the result count, so that you can easily see all rows.
// ==/UserScript==

(function(){
	var addLink = function() {
		var prevBtn = document.evaluate("//div[@class='pagination_controls']/a[@title='previous']", document,null,9,null).singleNodeValue;
		if( !prevBtn ) return;

		var strSpan = prevBtn.previousSibling;
		if( strSpan.className != "button_label" ) strSpan = prevBtn.previousSibling.previousSibling;
		if( strSpan.className != "button_label" ) return;
		if( strSpan.getAttribute( "gaRowLimit" ) ) return;
		var strMatch = /(\d[\d\s,]*)-\s*(\d[\d\s,]*)of\s+(\d[\d\s,]*)/i.exec( strSpan.innerHTML );
		var totalRows = strMatch[3].replace(/[^\d]/g,"");
		strSpan.setAttribute( "gaRowLimit", totalRows );
		var trim=function(str){return str.replace(/\s*$/,"");}
		strSpan.innerHTML = trim(strMatch[1]) + " - " + trim(strMatch[2]) + " of " + '<a title="Display all ' + trim(strMatch[3]) + ' rows" href="javascript:table._toggleRowShow(' + totalRows + ');">' + trim(strMatch[3]) + '</a>';

		return;
	}

	document.addEventListener( "DOMNodeInserted", addLink, false );
	addLink();
})();