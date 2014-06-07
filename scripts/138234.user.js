// ==UserScript==
// @name		Ika-Reports LS433c
// @version		4.3.3c
// @date		2012.05.01
// @author		NoFan (fix BW)
// @download	http://ikareports.ru/scripts
// @exclude     http://board.ikariam.*/*
// @exclude		http://*.ikariam.*/board*
// @include		http://m*.*.ikariam.*/*?view=militaryAdvisorReportView&combatId=*
// @include		http://m*.*.ikariam.com/*
// @include     http://m*.*.ikariam.*/?view=militaryAdvisorReportView&reportId=1405&archivedReport=1
// @include		http://m*.*.ikariam.com/*?view=island&id=*
// @include		http://m*.*.ikariam.*/*?action=Espionage&function=executeMission&actionRequest=*
// @include		http://m*.*.ikariam.*/*?view=safehouseReports&id=*
// @include		http://m*.*.ikariam.*/*?view=safehouse*tab=reports*
// @include		http://m*.*.ikariam.*/*?view=embassy*
// @include		http://ikareports.ru/world*
// ==/UserScript==


function addNewScript(link){
    var script, head;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = link;
    head.appendChild(script);
}
addNewScript('http://ikareports.ru/inc/userjs/IR43core.js?t='+Math.random( ));