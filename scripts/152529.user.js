// ==UserScript==
// @name           RuneTrack Cleaner
// @namespace      Bren
// @description    Cleans the RuneTrack window by removing unnecessary elements.
// @include        http://*.runetrack.com/contribute_name_change.php*
// @include        http://runetrack.com/contribute_name_change.php*
// @version        1.0
// ==/UserScript==

function addStyle(style) {
	var head = document.getElementsByTagName("head")[0];
	var ele = head.appendChild(window.document.createElement('style'));
	ele.innerHTML	= "* {font-family:Arial !important;font-size:10pt !important}"
					+ "body {overflow-y:hidden}"
					+ "form table {width:500px !important}"
					+ "form table tr:nth-last-child(4) td table tr:first-child {display:none}"
					+ "form table tr:nth-last-child(4) td table tr:last-child td ol {display:none}"
					+ "form table tr:nth-last-child(4) td table tr:last-child td br {display:none}"
					
					+ "form table tr:nth-last-child(4) td table tr:last-child td {font-size:0px !important;color:white}"
					+ "form table tr:nth-last-child(4) td table tr:last-child b {font-size:10pt !important;color:black !important;display:block;float:right}"

					+ "form table tr:nth-last-child(3) td {text-align:right}"
					+ "form table tr:nth-last-child(3) td font:nth-child(3) b {letter-spacing:3px;text-align:right !important;font-family:Courier New !important;font-size:13pt !important}"
					+ "form table tr:nth-last-child(3) td font:nth-child(3) b a {text-transform:uppercase}"
					+ "form table tr:nth-last-child(3) td input {text-align:left !important;font-size:13pt !important;font-family:Courier New !important;font-weight:bold;display:block;width:158px;margin-left:312px;letter-spacing:3px;padding-left:26px}"
					+ "form table tr:nth-last-child(3) td font:nth-child(3) {background:no-repeat url('http://i.imgur.com/j0y2u.png') !important;padding:7px 0 1px 0 !important;text-align:left !important;width:183px !important;display:block;margin-left:312px}"
					
					+ "form table tr:nth-last-child(3) td a {float:left}"
					+ "form table tr:nth-last-child(2) td br {display:none}"

					+ "form table tr:last-child td {text-align:right}"
					+ "form table tr:last-child td br {display:none}";
	return ele;
}

addStyle();