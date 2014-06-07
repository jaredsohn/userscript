// ==UserScript==
// @name           WF Colony Resource Link
// @namespace      http://unidomcorp.com
// @description    Creates a link for the Colony Mining directly to build_facility.php
// @include        http://*.war-facts.com/extras/colony_res.php*
// ==/UserScript==/* WF Colony Resource Link   by William Frye (aka Carabas)   For Warring Factions (http://war-facts.com/)   =========================================================   This script is provided "AS-IS" with no warranties    whatsoever, expressed or implied. USE AT YOUR OWN RISK.   =========================================================*/
var build = "http://"+window.location.hostname+"/build_facility?colony="+getURLParam('colony');var res = document.getElementsByTagName('table')[1];
for (var i = 1; i <=11; i++) {
	res.rows[i].cells[0].innerHTML = res.rows[i].cells[0].innerHTML.link(build+"&type=1&subtype="+i);
	res.rows[i].cells[0].childNodes[0].target = "maingame";
}


function getURLParam(strParamName){
	var strReturn = "";
	var strHref = window.location.href;
	if ( strHref.indexOf("?") > -1 ) {
		var strQueryString = strHref.substr(strHref.indexOf("?")).toLowerCase();
		var aQueryString = strQueryString.split("&");		for ( var iParam = 0; iParam < aQueryString.length; iParam++ ){			if (aQueryString[iParam].indexOf(strParamName + "=") > -1 ){				var aParam = aQueryString[iParam].split("=");				strReturn = aParam[1];				break;			}
		}	}
	return strReturn;
}