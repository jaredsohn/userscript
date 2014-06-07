// ==UserScript==
// @name			Google Analytics Row Limit
// @author			Erik Vold
// @namespace		gaRowLimit
// @include			https://www.google.com/analytics/reporting/*
// @include			https://adwords.google.com/analytics/reporting/*
// @version			0.2.1
// @license			GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @datecreated		2009-07-19
// @lastupdated		2009-11-14
// @description		Allows you to change row limit easily in Google Analytics via Greasemonkey menu command.
// ==/UserScript==

if ( unsafeWindow.table ) {
	gaRowLimit = function(str){
		if ( !str && unsafeWindow.ubiquityGMInput && unsafeWindow.ubiquityGMInput.length ) {
			var str = unsafeWindow.ubiquityGMInput;

			// reset for next execution
			unsafeWindow.ubiquityGMInput = "";
		}
		else if ( !str ) {
			var str = prompt("Row Limit:");
		}
		str = (str+"").replace(/^\s+/, '').replace(/\s+$/, '').toLowerCase();
		if( str == "*" || str == "all" || str == "every" ) {
			var prevBtn = document.evaluate("//div[@class='pagination_controls']/a[@title='previous']", document, null, 9, null).singleNodeValue;
			if( !prevBtn ) return false;

			var strSpan = prevBtn.previousSibling;
			if( strSpan.className != "button_label" ) {
				strSpan = prevBtn.previousSibling.previousSibling;
			}
			if( strSpan.className != "button_label" ) return false;

			if (strSpan.getAttribute("gaRowLimit") != null) {
				str = strSpan.getAttribute("gaRowLimit");
			}
			else {
				var strMatch = /(\d[\d\s,]*)-([\d\s,]*)+of\s+(\d[\d\s,]*)/i.exec(strSpan.innerHTML);
				if (strMatch == null) return false;
				str=strMatch[3];
			}
		}

		str=str.replace( /[\s,]/g, "" );
		unsafeWindow.table._toggleRowShow(str);
		return true;
	};

	GM_registerMenuCommand("Row Limit", gaRowLimit, "", "", "r");
}