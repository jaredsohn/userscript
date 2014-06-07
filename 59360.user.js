// ==UserScript==
// @name			Google Analytics 'View Reports' Link
// @author			Erik Vold
// @namespace		gaViewReportsLink
// @include			http://google.com/analytics/reporting/*
// @include			https://google.com/analytics/reporting/*
// @include			http://www.google.com/analytics/reporting/*
// @include			https://www.google.com/analytics/reporting/*
// @include			http://adwords.google.com/analytics/reporting/*
// @include			https://adwords.google.com/analytics/reporting/*
// @version			0.1
// @license			GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @datecreated		2009-09-08
// @lastupdated		2009-09-08
// @description		This userscript will make the 'View Reports' text into a link to the dashboard report.
// ==/UserScript==

var gaViewReportsLink=function(){
	var profile_dd = document.getElementById("profile");
	if (!profile_dd) return;
	var id = profile_dd.options[profile_dd.selectedIndex].value;
	if(!id) return;
	var viewLink=document.evaluate("//label[@for='profile']", document, null, 9, null).singleNodeValue;
	if(!viewLink) return;
	viewLink.innerHTML=' <a style="border:0;padding:0;" href="/analytics/reporting/dashboard?id='+id+'">View Reports</a>: ';
}
gaViewReportsLink();