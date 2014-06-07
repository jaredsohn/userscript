// ==UserScript==
// @name           Orzone Time Report
// @namespace      DScript
// @description    Fixar tidsrapporteringen...
// @include        http://bapps.sch.se/tid_orzone*
// @include        https://bapps.sch.se/tid_orzone*
// @include        http://bapps.dcgroup.se/tid_orzone*
// ==/UserScript==

// Ny vecka!
if(/https?:\/\/bapps\..*.se\/tid_orzone\/rtnv.asp/.test(location.href)) {

	var today = new Date();
	var monday1 = new Date(today.getFullYear(),0,1);

        var year = location.href.substring(location.href.toLowerCase().indexOf('ar=')+3);

        if(year != today.getFullYear().toString())
		return;

	if(monday1.getDay() == 0)
	   monday1.setDate(2);

	if(monday1.getDay() != 1)
	   monday1.setDate(9-monday1.getDay())

	var weeksSince = Math.ceil((today - monday1) / (7*24*60*60*1000));

	document.forms[0].zVecka.selectedIndex = weeksSince-1;
}